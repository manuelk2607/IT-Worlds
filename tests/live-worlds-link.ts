import assert from 'node:assert/strict';
import {createHmac,randomUUID} from 'node:crypto';
import {neon} from '@neondatabase/serverless';
import {prepareLink,confirmLink,type LegacyProof} from '@worlds-hub/auth/linking';
import {hash} from '@worlds-hub/auth/store';
import {PostgresAuthStore} from '@worlds-hub/auth/postgres-store';
import {worldsLinkStore} from '../worker/worlds-link-store.ts';
import {worldsLinkRoute} from '../worker/worlds-link.ts';

assert.equal(process.env.IT_WORLDS_SSO_TEST_BRANCH,'br-little-base-baqt6cy6');
const ownerUrl=new URL(process.env.DATABASE_URL_UNPOOLED!);
const runtimeUrl=new URL(process.env.DATABASE_URL!);
assert.equal(ownerUrl.hostname,'ep-falling-fog-bad7v2ou.c-8.eu-central-1.aws.neon.tech');
assert.equal(runtimeUrl.hostname,ownerUrl.hostname);
assert.equal(runtimeUrl.username,'it_worlds_app');
const owner=neon(ownerUrl.href),runtime=neon(runtimeUrl.href);
const sessions=new PostgresAuthStore((text,values)=>runtime.query(text,values));
const issuer='https://link-fixture.example.invalid',subject=randomUUID(),localId=randomUUID();
const otherLocalId=randomUUID();
const sessionId=await hash(randomUUID()),otherSessionId=await hash(randomUUID());
const browserSession=randomUUID().replaceAll('-','');
const browserSessionId=await hash(browserSession);
const browserSubject=randomUUID(),origin='https://link-app.example.invalid',csrf='fixture-csrf';
const rateSecret=randomUUID(),ip='192.0.2.92';
const now=Date.now();
const deadline=(Math.floor(now/600_000)+1)*600_000;
assert.ok(deadline-now>30_000,'Start away from the rate-window boundary');
const rateGlobal='global:link:'+deadline;
const ratePeer='peer:'+createHmac('sha256',rateSecret).update(`worlds-auth-rate:v1:link:${deadline}:${ip}`).digest('hex');
assert.equal((await runtime`SELECT count(*)::int AS n FROM public.worlds_auth_rate_buckets WHERE id=${rateGlobal}`)[0]?.n,0);
const central={issuer,subject,sessionId,authenticatedAt:now-290_000};
const legacy:LegacyProof={accountId:localId,authenticatedAt:now,method:'password'};
const store=worldsLinkStore(runtimeUrl.href,central,legacy);
const other=worldsLinkStore(runtimeUrl.href,{...central,sessionId:otherSessionId},legacy);
const seedSession=(id:string)=>sessions.putSession(id,{
 issuer,sub:subject,csrf:'fixture',expires:now+120_000,authenticatedAt:central.authenticatedAt,
});
try{
 await owner`INSERT INTO neon_auth."user"(id,name,email,"emailVerified",role)
  VALUES(${localId},'Link fixture',${localId+'@example.invalid'},true,'user'),
        (${otherLocalId},'Second link fixture',${otherLocalId+'@example.invalid'},true,'user')`;
 await seedSession(sessionId);
 await seedSession(otherSessionId);
 const expired=await prepareLink(central,legacy,store,now);
 await assert.rejects(()=>confirmLink(expired,sessionId,store,now+10_000),/Expired/);
 const proof=await prepareLink(central,legacy,store,now);
 await assert.rejects(()=>confirmLink(proof,otherSessionId,other,now),/Expired/);
 await owner`UPDATE neon_auth."user" SET banned=true WHERE id=${localId}`;
 await assert.rejects(()=>confirmLink(proof,sessionId,store,now),/Expired/);
 await owner`UPDATE neon_auth."user" SET banned=false WHERE id=${localId}`;
 const attempts=await Promise.allSettled([confirmLink(proof,sessionId,store,now),confirmLink(proof,sessionId,store,now)]);
 assert.equal(attempts.filter(result=>result.status==='fulfilled').length,1);
 const [link]=await owner`SELECT local_user_id FROM public.worlds_identity_links WHERE issuer=${issuer} AND subject=${subject}`;
 assert.equal(link?.local_user_id,localId);
 assert.equal((await owner`SELECT count(*)::int AS n FROM public.worlds_link_audit WHERE local_user_id=${localId}`)[0]?.n,1);
 const conflict=await prepareLink(central,legacy,store,now);
 await assert.rejects(()=>confirmLink(conflict,sessionId,store,now),/conflicting/);
 assert.equal((await owner`SELECT count(*)::int AS n FROM public.worlds_link_proofs WHERE proof_hash=${await hash(conflict)}`)[0]?.n,1);
 await sessions.deleteSession(sessionId);
 await assert.rejects(()=>confirmLink(conflict,sessionId,store,now),/Expired/);
 await assert.rejects(()=>prepareLink(central,legacy,store,now));
 await owner`DELETE FROM public.worlds_identity_links WHERE issuer=${issuer} AND subject=${subject} AND local_user_id=${localId}`;
 await sessions.putSession(browserSessionId,{issuer,sub:browserSubject,csrf,email:'central@example.invalid',expires:now+120_000,authenticatedAt:now});
 const env={ASSETS:{fetch:async()=>new Response()},DATABASE_URL:runtimeUrl.href,NEON_AUTH_BASE_URL:'https://legacy.example.invalid/auth',
  NEON_AUTH_COOKIE_SECRET:rateSecret,WORLDS_AUTH_ENABLED:'true',WORLDS_ORIGIN:origin,WORLDS_ISSUER:issuer,WORLDS_CLIENT_ID:'fixture',
  WORLDS_LINK_ENABLED:'true',WORLDS_REAUTH_VERIFIED:'true'};
 const managed=(id=localId,created=now)=>async()=>Response.json({
  session:{userId:id,createdAt:new Date(created),updatedAt:new Date(now),expiresAt:new Date(now+120_000)},
  user:{id,email:'legacy@example.invalid',createdAt:new Date(now),updatedAt:new Date(now)},
 });
 const route=(step:string,body:Record<string,unknown>,read=managed(),options=env)=>worldsLinkRoute(
  new Request(origin+'/api/worlds/link/'+step,{method:'POST',
   headers:{origin,'Content-Type':'application/json',cookie:'__Host-worlds-session='+browserSession,'CF-Connecting-IP':ip},body:JSON.stringify(body)}),options,read);
 assert.equal((await route('prepare',{csrf},managed(),{...env,WORLDS_REAUTH_VERIFIED:'false'}))?.status,404);
 assert.equal((await route('prepare',{csrf,accountId:localId}))?.status,400);
 assert.equal((await route('prepare',{csrf:'wrong'}))?.status,403);
 assert.equal((await route('prepare',{csrf},managed(localId,now-300_001)))?.status,403);
 const preview=await route('prepare',{csrf});
 assert.equal(preview?.status,200);
 const staged=await preview!.json() as {proof:string;worldsEmail:string;localEmail:string};
 assert.equal(staged.worldsEmail,'central@example.invalid');
 assert.equal(staged.localEmail,'legacy@example.invalid');
 assert.equal((await route('confirm',{csrf,proof:staged.proof},managed(otherLocalId)))?.status,409);
 assert.equal((await route('confirm',{csrf,proof:staged.proof}))?.status,200);
 assert.equal((await route('confirm',{csrf,proof:staged.proof}))?.status,409);
 assert.equal((await route('confirm',{csrf,proof:staged.proof}))?.status,429);
 const [confirmed]=await owner`SELECT local_user_id FROM public.worlds_identity_links WHERE issuer=${issuer} AND subject=${browserSubject}`;
 assert.equal(confirmed?.local_user_id,localId);
 await owner`UPDATE public.worlds_link_proofs SET expires_at=now()-interval '1 second' WHERE issuer=${issuer} AND subject=${subject} AND local_user_id=${localId}`;
 assert.equal((await runtime`SELECT public.worlds_cleanup_expired_link_proofs() AS removed`)[0]?.removed,2);
 console.log('PASS: restricted Neon link adapter and two-step HTTP handler enforce freshness, CSRF, account review, session isolation, one confirmation, rollback and proof cleanup.');
}finally{
 await sessions.deleteSession(sessionId);
 await sessions.deleteSession(otherSessionId);
 await sessions.deleteSession(browserSessionId);
 await runtime`DELETE FROM public.worlds_auth_rate_buckets WHERE id IN (${rateGlobal},${ratePeer})`;
 await owner.transaction([
  owner`DELETE FROM public.worlds_link_audit WHERE issuer=${issuer} AND subject IN (${subject},${browserSubject}) AND local_user_id=${localId}`,
  owner`DELETE FROM neon_auth."user" WHERE id IN (${localId},${otherLocalId})`,
 ]);
}
