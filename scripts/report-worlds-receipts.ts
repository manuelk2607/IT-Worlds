import {reportITWorldsMigrationReceipts} from '../worker/worlds-receipts.ts';
import {WORLDS_PRODUCTION_VARS} from '../worker/worlds-production.ts';

try{
 if(process.argv.length!==2||!process.env.WORLDS_MIGRATION_RECEIPT_PRIVATE_JWK){
  throw new Error('The exact runtime target and dedicated receipt key are required.');
 }
 const env={...process.env,...WORLDS_PRODUCTION_VARS};
 console.log(JSON.stringify(await reportITWorldsMigrationReceipts(env)));
}catch{
 console.error('Receipt delivery did not complete. Check the target and signing configuration, then retry.');
 process.exitCode=1;
}
