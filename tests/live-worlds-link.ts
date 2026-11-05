import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {neon} from '@neondatabase/serverless';
import {prepareLink,confirmLink,type LegacyProof} from '@worlds-hub/auth/linking';
import {hash} from '@worlds-hub/auth/store';
import {PostgresAuthStore} from '@worlds-hub/auth/postgres-store';
import {worldsLinkStore} from '../worker/worlds-link-store.ts';

assert.equal(process.env.IT_WORLDS_SSO_TEST_BRANCH,'br-little-base-baqt6cy6');
const ownerUrl=new URL(process.env.DATABASE_URL_UNPOOLED!);
const runtimeUrl=new URL(process.env.DATABASE_URL!);
assert.equal(ownerUrl.hostname,'ep-falling-fog-bad7v2ou.c-8.eu-central-1.aws.neon.tech');
assert.equal(runtimeUrl.hostname,ownerUrl.hostname);
assert.equal(runtimeUrl.username,'it_worlds_app');
const owner=neon(ownerUrl.href),runtime=neon(runtimeUrl.href);
const sessions=new PostgresAuthStore((text,values)=>runtime.query(text,values));
const issuer='https://link-fixture.example.invalid',subject=randomUUID(),localId=randomUUID();
const sessionId=await hash(randomUUID()),otherSessionId=await hash(randomUUID());
const now=Date.now();
const central={issuer,subject,sessionId,authenticatedAt:now-290_000};
const legacy:LegacyProof={accountId:localId,authenticatedAt:now,method:'password'};
const store=worldsLinkStore(runtimeUrl.href,central,legacy);
const other=worldsLinkStore(runtimeUrl.href,{...central,sessionId:otherSessionId},legacy);
const seedSession=(id:string)=>sessions.putSession(id,{
 issuer,sub:subject,csrf:'fixture',expires:now+120_000,authenticatedAt:central.authenticatedAt,
});
try{
 await owner`INSERT INTO neon_auth."user"(id,name,email,"emailVerified",role)
  VALUES(${localId},'Link fixture',${localId+'@example.invalid'},true,'user')`;
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
 console.log('PASS: restricted Neon link adapter enforces proof freshness, session isolation and revocation, account bans, one parallel confirmation, and conflict rollback.');
}finally{
 await sessions.deleteSession(sessionId);
 await sessions.deleteSession(otherSessionId);
 await owner.transaction([
  owner`DELETE FROM public.worlds_link_audit WHERE issuer=${issuer} AND subject=${subject} AND local_user_id=${localId}`,
  owner`DELETE FROM neon_auth."user" WHERE id=${localId}`,
 ]);
}
