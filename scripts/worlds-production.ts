import {createHash} from 'node:crypto';
import {readFile,readdir} from 'node:fs/promises';
import {neon} from '@neondatabase/serverless';
import {isITWorldsProductionDatabase,WORLDS_PRODUCTION_VARS} from '../worker/worlds-production.ts';

const migrationNames=['003_worlds_identity_links.sql','004_worlds_auth_sessions.sql','005_worlds_auth_maintenance.sql','006_worlds_link_cleanup.sql','007_worlds_session_revocations.sql'] as const;

export function productionReleaseArgs(databaseUrl:string|undefined,sessionEventJwk:string|undefined,dryRun=false){
 const fallback='postgresql://it_worlds_app@ep-broad-unit-baisjndz-pooler.c-8.eu-central-1.aws.neon.tech/IT-Worlds';
 if(!isITWorldsProductionDatabase(databaseUrl??(dryRun?fallback:undefined)))throw new Error('Worlds release requires the reviewed IT-Worlds production runtime database.');
 let key:unknown;
 try{key=JSON.parse(sessionEventJwk??(dryRun?'{"kid":"dry-run","kty":"OKP","crv":"Ed25519","x":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}':''));}catch{}
 const jwk=key as {kid?:unknown;kty?:unknown;crv?:unknown;x?:unknown}|undefined;
 if(!jwk||typeof jwk.kid!=='string'||!/^[A-Za-z0-9_-]{1,64}$/.test(jwk.kid)||jwk.kty!=='OKP'||jwk.crv!=='Ed25519'||typeof jwk.x!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(jwk.x))throw new Error('Worlds release requires the pinned Hub session-event public JWK.');
 return [...Object.entries(WORLDS_PRODUCTION_VARS),['WORLDS_HUB_SESSION_EVENT_JWK',JSON.stringify(jwk)]]
  .flatMap(([name,value])=>['--var',`${name}:${value}`]);
}

export async function verifyWorldsProductionSchema(databaseUrl:string){
 if(!isITWorldsProductionDatabase(databaseUrl))throw new Error('Refusing schema check outside IT-Worlds production.');
 const directory=new URL('../migrations/',import.meta.url),expected=new Map<string,string>();
 const available=new Set(await readdir(directory));
 for(const name of migrationNames){
  if(!available.has(name))throw new Error(`Missing migration source: ${name}`);
  expected.set(name,createHash('sha256').update(await readFile(new URL(name,directory),'utf8')).digest('hex'));
 }
 const sql=neon(databaseUrl);
 const rows=await sql`SELECT name,sha256 FROM public.schema_migrations WHERE name = ANY(${migrationNames as unknown as string[]})`;
 for(const [name,sha256] of expected)if(!rows.some(row=>row.name===name&&row.sha256===sha256))throw new Error(`Worlds production migration missing or changed: ${name}`);
}
