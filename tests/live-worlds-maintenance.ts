import assert from 'node:assert/strict';
import {createHmac,randomUUID} from 'node:crypto';
import {neon} from '@neondatabase/serverless';
import {cleanupWorldsAuth,takeAuthAttempt,CLEANUP_BATCH} from '../worker/worlds-maintenance.ts';
import {worldsRoute} from '../worker/worlds-auth.ts';
import type {Env} from '../worker/index.ts';

assert.equal(process.env.IT_WORLDS_SSO_TEST_BRANCH,'br-little-base-baqt6cy6');
const url=new URL(process.env.DATABASE_URL!);
assert.equal(url.hostname,'ep-falling-fog-bad7v2ou.c-8.eu-central-1.aws.neon.tech');
assert.equal(url.username,'it_worlds_app');
const sql=neon(url.href);
const origin='https://app.example.invalid';
const env:Env={ASSETS:{fetch:async()=>new Response()},DATABASE_URL:url.href,
 NEON_AUTH_BASE_URL:'https://legacy.example.invalid/auth',NEON_AUTH_COOKIE_SECRET:randomUUID(),
 WORLDS_AUTH_ENABLED:'true',WORLDS_ORIGIN:origin,WORLDS_ISSUER:'https://identity.example.invalid',WORLDS_CLIENT_ID:'fixture'};
const prefix='test:'+randomUUID()+':',pattern=prefix+'%';
const request=new Request(origin+'/auth/login?ui_locales=en',{method:'POST',headers:{origin,'cf-connecting-ip':'192.0.2.88',accept:'text/html'}});
const now=Date.now(),deadline=(Math.floor(now/600_000)+1)*600_000;
const globalKey=`global:login:${deadline}`;
const peerKey='peer:'+createHmac('sha256',env.NEON_AUTH_COOKIE_SECRET).update(`worlds-auth-rate:v1:login:${deadline}:192.0.2.88`).digest('hex');
const original=await sql`SELECT count(*)::int AS n FROM public.worlds_auth_rate_buckets WHERE id=${globalKey}`;
assert.equal(original[0]?.n,0,'Run only on the unused isolated branch');
const attempt=(peer:string)=>sql`SELECT public.worlds_take_auth_attempt(${prefix+'global'},${prefix+peer},${now+600_000},4,2) AS allowed`;
try{
 const results=await Promise.all(Array.from({length:6},()=>attempt('peer-a')));
 assert.equal(results.filter(rows=>rows[0]?.allowed).length,2);
 assert.equal((await sql`SELECT hits FROM public.worlds_auth_rate_buckets WHERE id=${prefix+'global'}`)[0]?.hits,2,'Rejected peers must not spend global allowance');
 assert.equal((await attempt('peer-b'))[0]?.allowed,true);
 assert.equal((await attempt('peer-c'))[0]?.allowed,true);
 assert.equal((await attempt('peer-d'))[0]?.allowed,false);
 assert.equal((await sql`SELECT count(*)::int AS n FROM public.worlds_auth_rate_buckets WHERE id=${prefix+'peer-d'}`)[0]?.n,0);

 const requestResults=await Promise.all(Array.from({length:13},()=>takeAuthAttempt(request,env,'login',now)));
 assert.equal(requestResults.filter(result=>result.allowed).length,12);
 assert.ok(requestResults.every(result=>result.retryAfter>0&&result.retryAfter<=600));
 assert.ok(Date.now()<deadline,'Fixture crossed its rate window');
 const response=await worldsRoute(request,env);
 assert.equal(response?.status,429);assert.equal(response?.headers.get('content-language'),'en');
 assert.ok(Number(response?.headers.get('retry-after'))>0);
 assert.match(await response!.text(),/Too many sign-in attempts/);
 const buckets=await sql`SELECT id,hits FROM public.worlds_auth_rate_buckets WHERE id IN (${globalKey},${peerKey})`;
 assert.equal(buckets.length,2);assert.ok(buckets.every(row=>row.hits===12&&!String(row.id).includes('192.0.2.88')));

 await sql`INSERT INTO public.worlds_auth_transactions(id,payload,expires)
  SELECT ${prefix}||g,'{}',${now-1} FROM generate_series(1,${CLEANUP_BATCH+1}) g`;
 await sql`INSERT INTO public.worlds_auth_transactions VALUES (${prefix+'active'},'{}',${now+60_000})`;
 await sql`INSERT INTO public.worlds_auth_sessions VALUES (${prefix+'expired'},'fixture','fixture',NULL,'{}',${now-1})`;
 await sql`INSERT INTO public.worlds_auth_replays VALUES (${prefix+'expired'},${now-1})`;
 await sql`INSERT INTO public.worlds_auth_rate_buckets VALUES (${prefix+'expired'},1,${now-1})`;
 assert.equal(await cleanupWorldsAuth({...env,WORLDS_AUTH_ENABLED:'false'},now),0);
 await cleanupWorldsAuth(env,now);
 assert.equal((await sql`SELECT count(*)::int AS n FROM public.worlds_auth_transactions WHERE id LIKE ${pattern} AND expires<=${now}`)[0]?.n,1);
 const expired=await sql`SELECT
  EXISTS(SELECT 1 FROM public.worlds_auth_sessions WHERE id=${prefix+'expired'}) OR
  EXISTS(SELECT 1 FROM public.worlds_auth_replays WHERE id=${prefix+'expired'}) OR
  EXISTS(SELECT 1 FROM public.worlds_auth_rate_buckets WHERE id=${prefix+'expired'}) AS remaining`;
 assert.equal(expired[0]?.remaining,false);
 assert.equal((await sql`SELECT count(*)::int AS n FROM public.worlds_auth_transactions WHERE id=${prefix+'active'}`)[0]?.n,1);
 console.log('PASS: isolated Neon atomic peer/global budgets, rejected-peer rollback, private keys, 429/Retry-After, bounded expiry cleanup and active-row preservation.');
}finally{
 await sql.transaction([
  sql`DELETE FROM public.worlds_auth_transactions WHERE id LIKE ${pattern}`,
  sql`DELETE FROM public.worlds_auth_sessions WHERE id LIKE ${pattern}`,
  sql`DELETE FROM public.worlds_auth_replays WHERE id LIKE ${pattern}`,
  sql`DELETE FROM public.worlds_auth_rate_buckets WHERE id LIKE ${pattern} OR id IN (${globalKey},${peerKey})`,
 ]);
}
