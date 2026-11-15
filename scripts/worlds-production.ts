import {createHash} from 'node:crypto';
import {readFile,readdir} from 'node:fs/promises';
import {neon} from '@neondatabase/serverless';
import {isITWorldsProductionDatabase,isITWorldsProductionMigrationDatabase,WORLDS_PRODUCTION_ROLE,WORLDS_PRODUCTION_VARS} from '../worker/worlds-production.ts';

const migrationNames=['003_worlds_identity_links.sql','004_worlds_auth_sessions.sql','005_worlds_auth_maintenance.sql','006_worlds_link_cleanup.sql','007_worlds_session_revocations.sql'] as const;

export function productionReleaseArgs(
 databaseUrl:string|undefined,sessionEventJwk:string|undefined,{dryRun=false,enableLinking=false}={},
){
 const fallback='postgresql://it_worlds_app@ep-broad-unit-baisjndz-pooler.c-8.eu-central-1.aws.neon.tech/IT-Worlds';
 if(!isITWorldsProductionDatabase(databaseUrl??(dryRun?fallback:undefined)))throw new Error('Worlds release requires the reviewed IT-Worlds production runtime database.');
 const vars:Record<string,string>={
  ...WORLDS_PRODUCTION_VARS,
  WORLDS_LINK_ENABLED:String(enableLinking),
  WORLDS_REAUTH_VERIFIED:String(enableLinking),
 };
 if(sessionEventJwk!==undefined||enableLinking){
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

export async function verifyWorldsProductionSchema(databaseUrl:string,migrationUrl:string|undefined){
 if(!isITWorldsProductionDatabase(databaseUrl))throw new Error('Refusing schema check outside IT-Worlds production.');
 if(!migrationUrl||!isITWorldsProductionMigrationDatabase(migrationUrl)){
  throw new Error('The schema check requires the direct IT-Worlds production migration connection.');
 }
 const directory=new URL('../migrations/',import.meta.url),expected=new Map<string,string>();
 const available=new Set(await readdir(directory));
 for(const name of migrationNames){
  if(!available.has(name))throw new Error(`Missing migration source: ${name}`);
  expected.set(name,createHash('sha256').update(await readFile(new URL(name,directory),'utf8')).digest('hex'));
 }
 const migrationSql=neon(migrationUrl);
 const rows=await migrationSql`SELECT name,sha256 FROM public.schema_migrations WHERE name = ANY(${[...migrationNames]})`;
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
}
