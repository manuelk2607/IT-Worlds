import {neon} from '@neondatabase/serverless';
import {migrationReceiptSender} from '@worlds-hub/auth/migration-receipts';
import type {PgQuery} from '@worlds-hub/auth/postgres-links';
import {isITWorldsProductionTarget,WORLDS_PRODUCTION_ORIGIN,WORLDS_PRODUCTION_VARS} from './worlds-production.ts';

type ReceiptEnv=Parameters<typeof isITWorldsProductionTarget>[0]&{WORLDS_MIGRATION_RECEIPT_PRIVATE_JWK?:string};

export async function reportITWorldsMigrationReceipts(env:ReceiptEnv,query?:PgQuery){
 const privateJwk=env.WORLDS_MIGRATION_RECEIPT_PRIVATE_JWK;
 if(!privateJwk)return;
 if(!env.DATABASE_URL||!isITWorldsProductionTarget(env))throw new Error('Receipts require the exact IT-Worlds production target.');
 let kid:unknown;
 try{kid=JSON.parse(privateJwk)?.kid;}catch{}
 if(typeof kid!=='string')throw new Error('A dedicated receipt signing key is required.');
 const issuer=WORLDS_PRODUCTION_VARS.WORLDS_ISSUER;
 const send=await migrationReceiptSender({
  project:'it-worlds',origin:WORLDS_PRODUCTION_ORIGIN,identityIssuer:issuer,
  url:'https://worlds-hub.maki26.workers.dev/api/migrations/receipts/it-worlds',kid,privateJwk,
 });
 const sql=neon(env.DATABASE_URL);
 const execute:PgQuery=query??((statement,params)=>sql.query(statement,params));
 const pending=await execute('SELECT * FROM public.worlds_pending_migration_receipts($1)',[issuer]);
 const totals={acknowledged:0,conflict:0};
 for(const row of pending){
  const revision=Number(row.revision);
  if(!Number.isSafeInteger(revision)||revision<1||typeof row.subject!=='string'||
   typeof row.local_user_id!=='string'||(row.event!=='linked'&&row.event!=='unlinked')){
   throw new Error('Invalid IT-Worlds migration audit record.');
  }
  const result=await send({
   revision,subject:row.subject,localAccountId:row.local_user_id,
   state:row.event==='linked'?'confirmed':'revoked',
  });
  const [written]=await execute('SELECT public.worlds_finish_migration_receipt($1,$2,$3) AS written',
   [issuer,revision,result==='acknowledged']);
  if(written?.written===true)totals[result]++;
 }
 return totals;
}
