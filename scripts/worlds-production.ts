import {createHash} from 'node:crypto';
import {readFile,readdir} from 'node:fs/promises';
import {neon} from '@neondatabase/serverless';
import {sessionEventContentType,sessionRevocationPath} from '@worlds-hub/auth/session-revocation';
import {isITWorldsProductionDatabase,isITWorldsProductionMigrationDatabase,WORLDS_PRODUCTION_ORIGIN,WORLDS_PRODUCTION_ROLE,WORLDS_PRODUCTION_VARS} from '../worker/worlds-production.ts';

const migrationNames=['003_worlds_identity_links.sql','004_worlds_auth_sessions.sql','005_worlds_auth_maintenance.sql','006_worlds_link_cleanup.sql','007_worlds_session_revocations.sql'] as const;

type ReleaseOptions={
 dryRun?:boolean;enableLinking?:boolean;enableProfiles?:boolean;enableSelfService?:boolean;keepActiveSessionEventKey?:boolean;
};

export function productionReleaseArgs(
 databaseUrl:string|undefined,sessionEventJwk:string|undefined,
 {dryRun=false,enableLinking=false,enableProfiles=false,enableSelfService,keepActiveSessionEventKey=false}:ReleaseOptions={},
){
 const fallback='postgresql://it_worlds_app@ep-broad-unit-baisjndz-pooler.c-8.eu-central-1.aws.neon.tech/IT-Worlds';
 if(!isITWorldsProductionDatabase(databaseUrl??(dryRun?fallback:undefined)))throw new Error('Worlds release requires the reviewed IT-Worlds production runtime database.');
 if(enableSelfService&&(!enableLinking||!enableProfiles))throw new Error('Self-service linking requires Worlds linking and profiles.');
 const vars:Record<string,string>={
  ...WORLDS_PRODUCTION_VARS,
  WORLDS_LINK_ENABLED:String(enableLinking),
  WORLDS_REAUTH_VERIFIED:String(enableLinking),
  WORLDS_PROFILES_ENABLED:String(enableProfiles),
 };
 // Omit the flag on routine releases so Wrangler keeps the active production mode.
 if(enableSelfService!==undefined)vars.WORLDS_LINK_SELF_SERVICE=String(enableSelfService);
 if(sessionEventJwk!==undefined||(enableLinking&&!keepActiveSessionEventKey)){
  let key:unknown;
  try{key=JSON.parse(sessionEventJwk??'');}catch{}
  const jwk=key as {kid?:unknown;kty?:unknown;crv?:unknown;x?:unknown;d?:unknown}|undefined;
  if(!jwk||typeof jwk.kid!=='string'||!/^[A-Za-z0-9_-]{1,64}$/.test(jwk.kid)||jwk.kty!=='OKP'||
    jwk.crv!=='Ed25519'||typeof jwk.x!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(jwk.x)||jwk.d!==undefined){
   throw new Error('Worlds release requires the pinned Hub session-event public JWK.');
  }
  const {kid,kty,crv,x}=jwk;
  vars.WORLDS_HUB_SESSION_EVENT_JWK=JSON.stringify({kid,kty,crv,x});
 }
 return Object.entries(vars).flatMap(([name,value])=>['--var',`${name}:${value}`]);
}

export async function verifyActiveSessionReceiver(){
 const response=await fetch(WORLDS_PRODUCTION_ORIGIN+sessionRevocationPath,{
  method:'POST',redirect:'manual',signal:AbortSignal.timeout(10_000),
  headers:{'Content-Type':sessionEventContentType},body:'unsigned-release-readiness-check',
 });
 if(response.status!==400||(await response.json() as {err?:unknown}).err!=='invalid_request'){
  throw new Error('The production Worlds session-event receiver is inactive.');
 }
}

export async function verifyWorldsProductionSchema(databaseUrl:string,migrationUrl:string|undefined,{enableProfiles=false}={}){
 if(!isITWorldsProductionDatabase(databaseUrl))throw new Error('Refusing schema check outside IT-Worlds production.');
 if(!migrationUrl||!isITWorldsProductionMigrationDatabase(migrationUrl)){
  throw new Error('The schema check requires the direct IT-Worlds production migration connection.');
 }
 const directory=new URL('../migrations/',import.meta.url),expected=new Map<string,string>();
 const available=new Set(await readdir(directory));
 const required=enableProfiles?[...migrationNames,'008_worlds_project_accounts.sql','009_worlds_migration_receipts.sql']:migrationNames;
 for(const name of required){
  if(!available.has(name))throw new Error(`Missing migration source: ${name}`);
  expected.set(name,createHash('sha256').update(await readFile(new URL(name,directory),'utf8')).digest('hex'));
 }
 const migrationSql=neon(migrationUrl);
 const rows=await migrationSql`SELECT name,sha256 FROM public.schema_migrations WHERE name = ANY(${required})`;
 for(const [name,sha256] of expected)if(!rows.some(row=>row.name===name&&row.sha256===sha256))throw new Error(`Worlds production migration missing or changed: ${name}`);

 const runtimeSql=neon(databaseUrl);
 const [runtime]=await runtimeSql`
  SELECT current_user::text AS role, NOT rolsuper AND NOT rolbypassrls AS restricted,
   has_table_privilege(current_user,'public.schema_migrations','SELECT') AS reads_ledger,
   row_security_active('public.learning_progress') AS progress_rls,
   row_security_active('public.worlds_identity_links') AS links_rls
  FROM pg_catalog.pg_roles WHERE rolname=current_user
 `;
 if(runtime?.role!==WORLDS_PRODUCTION_ROLE||runtime.restricted!==true||runtime.reads_ledger!==false||
   runtime.progress_rls!==true||runtime.links_rls!==true){
  throw new Error('The IT-Worlds runtime connection does not satisfy the production role and RLS checks.');
 }
 if(enableProfiles){
  const [profiles]=await runtimeSql`
   SELECT row_security_active('public.it_project_accounts') AS projects_rls,
    NOT has_column_privilege(current_user,'public.it_project_accounts','legacy_user_id','SELECT') AS private_legacy_id,
    has_function_privilege(current_user,'public.worlds_create_project_account(text,text,text,text)','EXECUTE') AS can_create
  `;
  if(profiles?.projects_rls!==true||profiles.private_legacy_id!==true||profiles.can_create!==true){
   throw new Error('The IT-Worlds runtime connection does not satisfy the project profile checks.');
  }
 }
}
