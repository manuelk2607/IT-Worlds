import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile,readdir} from 'node:fs/promises';
import {productionReleaseArgs,verifyWorldsProductionSchema} from '../scripts/worlds-production.ts';
import {isITWorldsProductionDatabase,isITWorldsProductionMigrationDatabase,isITWorldsProductionTarget,WORLDS_PRODUCTION_VARS} from '../worker/worlds-production.ts';

const database='postgresql://it_worlds_app@ep-broad-unit-baisjndz-pooler.c-8.eu-central-1.aws.neon.tech/IT-Worlds';
const jwk='{"kid":"fixture","kty":"OKP","crv":"Ed25519","x":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}';

test('production Worlds target is exact and never accepts owner, another database, host or pilot',()=>{
 assert.equal(isITWorldsProductionDatabase(database),true);
 for(const invalid of [database.replace('it_worlds_app','neondb_owner'),database.replace('/IT-Worlds','/neondb'),database.replace('ep-broad-unit-baisjndz','ep-other')])assert.equal(isITWorldsProductionDatabase(invalid),false);
 const target={...WORLDS_PRODUCTION_VARS,DATABASE_URL:database,WORLDS_LINK_ENABLED:'false',WORLDS_REAUTH_VERIFIED:'false'};
 assert.equal(isITWorldsProductionTarget(target),true);
 assert.equal(isITWorldsProductionTarget({...target,WORLDS_PILOT_ONLY:true}),false);
 assert.equal(isITWorldsProductionTarget({...target,WORLDS_CLIENT_ID:'other'}),false);
 assert.equal(isITWorldsProductionTarget({...target,WORLDS_LINK_ENABLED:'true'}),false);
 assert.equal(isITWorldsProductionTarget({...target,WORLDS_REAUTH_VERIFIED:undefined}),false);
});

test('production release defaults to sign-in only and enables linking explicitly with a public key',()=>{
 const args=productionReleaseArgs(database,undefined);
 for(const [name,value] of Object.entries(WORLDS_PRODUCTION_VARS))assert.ok(args.includes(`${name}:${value}`));
 assert.ok(args.includes('WORLDS_LINK_ENABLED:false'));
 assert.ok(args.includes('WORLDS_REAUTH_VERIFIED:false'));
 assert.ok(args.includes('WORLDS_PROFILES_ENABLED:false'));
 const profiles=productionReleaseArgs(database,undefined,{enableProfiles:true});
 assert.ok(profiles.includes('WORLDS_PROFILES_ENABLED:true'));
 assert.ok(profiles.includes('WORLDS_LINK_ENABLED:false'));
 const linking=productionReleaseArgs(database,jwk,{enableLinking:true});
 assert.ok(linking.includes('WORLDS_LINK_ENABLED:true'));
 assert.ok(linking.includes('WORLDS_REAUTH_VERIFIED:true'));
 assert.ok(linking.includes(`WORLDS_HUB_SESSION_EVENT_JWK:${jwk}`));
 assert.ok(productionReleaseArgs(database,jwk).includes(`WORLDS_HUB_SESSION_EVENT_JWK:${jwk}`));
 assert.throws(()=>productionReleaseArgs(database,undefined,{enableLinking:true}),/public JWK/);
 const keepKey=productionReleaseArgs(database,undefined,{enableLinking:true,enableProfiles:true,keepActiveSessionEventKey:true});
 assert.ok(keepKey.includes('WORLDS_PROFILES_ENABLED:true')&&keepKey.includes('WORLDS_LINK_ENABLED:true'));
 assert.ok(!keepKey.some(arg=>arg.startsWith('WORLDS_HUB_SESSION_EVENT_JWK:')));
 assert.throws(()=>productionReleaseArgs(database,'{}'),/public JWK/);
 assert.throws(()=>productionReleaseArgs(database,jwk.replace('}',',"d":"private"}')),/public JWK/);
 assert.throws(()=>productionReleaseArgs(undefined,jwk),/production runtime database/);
 assert.doesNotThrow(()=>productionReleaseArgs(undefined,undefined,{dryRun:true}));
});

test('checking migration receipts requires a separate direct owner connection to the exact database',async()=>{
 const owner=database.replace('it_worlds_app','neondb_owner');
 assert.equal(isITWorldsProductionMigrationDatabase(owner.replace('-pooler','')),true);
 for(const invalid of [undefined,database,owner,owner.replace('-pooler','').replace('/IT-Worlds','/neondb')]){
  assert.equal(isITWorldsProductionMigrationDatabase(invalid),false);
  await assert.rejects(verifyWorldsProductionSchema(database,invalid),/direct IT-Worlds production migration connection/);
 }
});

test('release preflight verifies the ledger as owner and checks RLS as the application role',async t=>{
 const migrationDir=new URL('../migrations/',import.meta.url);
 const names=(await readdir(migrationDir)).filter(name=>/^00[3-9]_/.test(name)).sort();
 const receipts=await Promise.all(names.map(async name=>[
  name,createHash('sha256').update(await readFile(new URL(name,migrationDir))).digest('hex')
 ]));
 const owner=database.replace('it_worlds_app','neondb_owner').replace('-pooler','');
 let runtimeReadsLedger=false;
 let corruptReceipt=false;
 let migrationLevel=7;
 let profileRls=true;
 t.mock.method(globalThis,'fetch',async (_input:RequestInfo|URL,init?:RequestInit)=>{
  const connection=new URL(new Headers(init?.headers).get('neon-connection-string')!);
  const {query}=JSON.parse(String(init?.body)) as {query:string};
  if(query.includes('SELECT name,sha256')){
   assert.equal(connection.username,'neondb_owner');
   assert.equal(connection.hostname,new URL(owner).hostname);
   const throughLevel=receipts.filter(([name])=>Number(name.slice(0,3))<=migrationLevel);
   return Response.json({
    fields:['name','sha256'].map(name=>({name,dataTypeID:25})),
    rows:corruptReceipt?[[throughLevel[0][0],'wrong'],...throughLevel.slice(1)]:throughLevel
   });
  }
  assert.match(query,/row_security_active/);
  assert.equal(connection.username,'it_worlds_app');
  if(query.includes('public.it_project_accounts')){
   return Response.json({fields:['projects_rls','private_legacy_id','can_create'].map(name=>({name,dataTypeID:16})),
    rows:[[profileRls?'t':'f','t','t']]});
  }
  return Response.json({
   fields:[{name:'role',dataTypeID:25},...['restricted','reads_ledger','progress_rls','links_rls'].map(name=>({name,dataTypeID:16}))],
   rows:[['it_worlds_app','t',runtimeReadsLedger?'t':'f','t','t']]
  });
 });
 await verifyWorldsProductionSchema(database,owner);
 await assert.rejects(verifyWorldsProductionSchema(database,owner,{enableProfiles:true}),/008_worlds_project_accounts/);
 migrationLevel=8;
 await assert.rejects(verifyWorldsProductionSchema(database,owner,{enableProfiles:true}),/009_worlds_migration_receipts/);
 migrationLevel=9;
 await verifyWorldsProductionSchema(database,owner,{enableProfiles:true});
 profileRls=false;
 await assert.rejects(verifyWorldsProductionSchema(database,owner,{enableProfiles:true}),/project profile checks/);
 runtimeReadsLedger=true;
 await assert.rejects(verifyWorldsProductionSchema(database,owner),/production role and RLS checks/);
 corruptReceipt=true;
 await assert.rejects(verifyWorldsProductionSchema(database,owner),/production migration missing or changed/);
});
