import assert from 'node:assert/strict';
import {generateKeyPairSync} from 'node:crypto';
import {test} from 'node:test';
import {jwtVerify} from 'jose';
import {reportITWorldsMigrationReceipts} from '../worker/worlds-receipts.ts';
import {WORLDS_PRODUCTION_VARS} from '../worker/worlds-production.ts';

test('IT-Worlds signs only reviewed queue events for its fixed Hub endpoint and retries on delivery failure',async t=>{
 const {privateKey,publicKey}=generateKeyPairSync('ed25519');
 const env={
  ...WORLDS_PRODUCTION_VARS,
  DATABASE_URL:'postgres://it_worlds_app@ep-broad-unit-baisjndz-pooler.c-8.eu-central-1.aws.neon.tech/IT-Worlds',
  WORLDS_LINK_ENABLED:'true',
  WORLDS_REAUTH_VERIFIED:'true',
  WORLDS_MIGRATION_RECEIPT_PRIVATE_JWK:JSON.stringify({kid:'fixture',...privateKey.export({format:'jwk'})}),
 };
 const issuer=WORLDS_PRODUCTION_VARS.WORLDS_ISSUER;
 const url='https://worlds-hub.maki26.workers.dev/api/migrations/receipts/it-worlds';
 const owner='10000000-0000-4000-8000-000000000001';
 const receipts=[{revision:'2',subject:'subject',local_user_id:owner,event:'linked'},
  {revision:'5',subject:'subject',local_user_id:owner,event:'unlinked'}];
 const updates:unknown[][]=[];
 const query=async(text:string,params:unknown[])=>{
  assert.equal(params[0],issuer);
  if(text.includes('worlds_pending_migration_receipts'))return receipts;
  assert.match(text,/worlds_finish_migration_receipt/);
  updates.push(params);
  return [{written:true}];
 };
 let refuse=true;
 const states:unknown[]=[];
 const refs=new Set<unknown>();
 const send=t.mock.method(globalThis,'fetch',async(target:unknown,options:RequestInit)=>{
  assert.equal(target,url);
  assert.equal(options.redirect,'manual');
  const {payload}=await jwtVerify(String(options.body),publicKey,{
   issuer:WORLDS_PRODUCTION_VARS.WORLDS_ORIGIN,audience:url,typ:'worlds-migration-receipt+jwt',
  });
  assert.equal(payload.identity_issuer,issuer);
  assert.equal(payload.sub,'subject');
  assert.equal(JSON.stringify(payload).includes(owner),false);
  refs.add(payload.account_ref);
  if(refuse)return Response.json({}, {status:503});
  states.push(payload.state);
  return Response.json({result:'stored'});
 });
 const unused=async()=>{throw Error('Unexpected database request');};
 assert.equal(await reportITWorldsMigrationReceipts({...env,WORLDS_MIGRATION_RECEIPT_PRIVATE_JWK:undefined},unused),undefined);
 await assert.rejects(reportITWorldsMigrationReceipts({...env,DATABASE_URL:env.DATABASE_URL.replace('it_worlds_app','neondb_owner')},unused),/exact IT-Worlds/);
 await assert.rejects(reportITWorldsMigrationReceipts({...env,WORLDS_PILOT_ONLY:true},unused),/exact IT-Worlds/);
 assert.equal(send.mock.callCount(),0);
 await assert.rejects(reportITWorldsMigrationReceipts(env,query),/refused delivery/);
 assert.deepEqual(updates,[]);
 refuse=false;
 assert.deepEqual(await reportITWorldsMigrationReceipts(env,query),{acknowledged:2,conflict:0});
 assert.deepEqual(states,['confirmed','revoked']);
 assert.equal(refs.size,1);
 assert.deepEqual(updates,[[issuer,2,true],[issuer,5,true]]);
});
