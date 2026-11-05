import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {neon} from '@neondatabase/serverless';
import {PostgresAuthStore} from '@worlds-hub/auth/postgres-store';
import {hash} from '@worlds-hub/auth/store';
import {token,SESSION_COOKIE} from '@worlds-hub/auth';
import {resolveIdentity} from '../worker/worlds-auth.ts';
import type {Env} from '../worker/index.ts';
assert.equal(process.env.IT_WORLDS_SSO_TEST_BRANCH,'br-little-base-baqt6cy6');
const ownerUrl=process.env.DATABASE_URL_UNPOOLED!,runtimeUrl=process.env.DATABASE_URL!;
assert.equal(new URL(ownerUrl).hostname,'ep-falling-fog-bad7v2ou.c-8.eu-central-1.aws.neon.tech');
assert.equal(new URL(runtimeUrl).hostname,new URL(ownerUrl).hostname);
assert.equal(new URL(runtimeUrl).username,'it_worlds_app');
const owner=neon(ownerUrl),runtime=neon(runtimeUrl);
const store=new PostgresAuthStore((text,values)=>runtime.query(text,values));
const id=randomUUID(),raw=token(),sessionKey=await hash(raw),txKey=await hash(token()),replay=await hash(token()),otherKey=await hash(token());
const issuer='https://identity.example.invalid',subject=randomUUID();
const identity={issuer,sub:subject,csrf:token(),expires:Date.now()+60_000,email:'fixture@example.invalid',name:'SSO fixture'};
const env:Env={ASSETS:{fetch:async()=>new Response()},DATABASE_URL:runtimeUrl,NEON_AUTH_BASE_URL:'https://legacy.example.invalid/auth',NEON_AUTH_COOKIE_SECRET:'test-only',WORLDS_AUTH_ENABLED:'true',WORLDS_ORIGIN:'https://app.example.invalid',WORLDS_ISSUER:issuer,WORLDS_CLIENT_ID:'fixture'};
const request=(cookie=SESSION_COOKIE+'='+raw)=>new Request(env.WORLDS_ORIGIN+'/api/session',{headers:{cookie}});
let legacyCalled=false;
const legacy=async()=>{legacyCalled=true;return Response.json({user:null,session:null});};
try{
 await owner`INSERT INTO neon_auth."user"(id,name,email,"emailVerified",role) VALUES(${id},'SSO fixture',${id+'@example.invalid'},true,'user')`;
 await store.putTransaction(txKey,{verifier:'test-verifier',nonce:'nonce',state:'state',next:'/konto/',expires:Date.now()+60_000});
 const transactions=await Promise.all([store.takeTransaction(txKey),store.takeTransaction(txKey)]);
 assert.equal(transactions.filter(Boolean).length,1,'Transaction must be consumed once across independent requests');
 assert.equal((await Promise.all([store.claimReplay(replay,Date.now()+60_000),store.claimReplay(replay,Date.now()+60_000)])).filter(Boolean).length,1);
 await store.putSession(sessionKey,identity);
 let result=await resolveIdentity(request(),env,legacy);
 assert.ok(result instanceof Response);assert.equal(result.status,403);assert.equal(legacyCalled,false);
 await owner`INSERT INTO public.worlds_identity_links(issuer,subject,local_user_id) VALUES(${issuer},${subject},${id})`;
 result=await resolveIdentity(request(),env,legacy);
 assert.ok(!(result instanceof Response));assert.equal(result.user.id,id);assert.equal(result.source,'worlds');
 await owner`UPDATE neon_auth."user" SET banned=true WHERE id=${id}`;
 result=await resolveIdentity(request(),env,legacy);
 assert.ok(result instanceof Response);assert.equal(result.status,403,'Local ban must block an otherwise valid central session');
 await owner`UPDATE neon_auth."user" SET "banExpires"=now()-interval '1 minute' WHERE id=${id}`;
 result=await resolveIdentity(request(),env,legacy);assert.ok(!(result instanceof Response),'Expired ban respects local semantics');
 const duplicate=await resolveIdentity(request(SESSION_COOKIE+'='+raw+'; '+SESSION_COOKIE+'='+token()),env,legacy);
 assert.ok(duplicate instanceof Response);assert.equal(duplicate.status,401);assert.equal(legacyCalled,false);
 await store.putSession(otherKey,{...identity,issuer:'https://other.example.invalid'});
 await store.revokeIdentity(issuer,subject);
 assert.equal(await store.getSession(sessionKey),null);assert.ok(await store.getSession(otherKey));
 await store.deleteSession(otherKey);
 await store.putSession(otherKey,{...identity,expires:Date.now()-1});assert.equal(await store.getSession(otherKey),null);
 console.log('PASS: real Postgres opaque sessions, concurrent single-use transactions/replays, local ID mapping, no email matching/fallback, local ban/expiry, issuer-scoped revocation and session expiry.');
}finally{
 await store.deleteSession(sessionKey);await store.deleteSession(otherKey);
 await owner.transaction([
  owner`DELETE FROM public.worlds_auth_transactions WHERE id=${txKey}`,
  owner`DELETE FROM public.worlds_auth_replays WHERE id=${replay}`,
  owner`DELETE FROM neon_auth."user" WHERE id=${id}`,
 ]);
}
