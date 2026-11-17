import {mkdtemp,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {verifyReleaseArtifact} from './release-artifact.ts';
import {productionReleaseArgs,verifyActiveSessionReceiver,verifyWorldsProductionSchema} from './worlds-production.ts';
import {parseWorldsLinkTarget} from '../worker/worlds-production.ts';
const args=process.argv.slice(2);
if(args.some(value=>!['--dry-run','--worlds-production','--enable-worlds-linking','--enable-worlds-profiles'].includes(value)))throw new Error('Unsupported release argument');
const dryRun=args.includes('--dry-run');
const worldsProduction=args.includes('--worlds-production');
const enableLinking=args.includes('--enable-worlds-linking');
const enableProfiles=args.includes('--enable-worlds-profiles');
if((enableLinking||enableProfiles)&&!worldsProduction)throw new Error('Worlds feature flags require --worlds-production');
const linkTarget=enableLinking?parseWorldsLinkTarget(process.env.WORLDS_LINK_TARGET):null;
if(enableLinking&&(!linkTarget||!enableProfiles||process.env.WORLDS_HUB_SESSION_EVENT_JWK!==undefined)){
 throw new Error('The scoped link release requires one approved account pair and --enable-worlds-profiles, and retains the existing session-event key.');
}
const root=fileURLToPath(new URL('../',import.meta.url));
const temporary=await mkdtemp(join(tmpdir(),'it-worlds-release-'));
const assets=join(temporary,'assets');
const targetSecretFile=join(temporary,'link-target.json');
const env:NodeJS.ProcessEnv={...process.env,ASTRO_TELEMETRY_DISABLED:'1',IT_WORLDS_DIST:assets,WRANGLER_LOG_PATH:process.env.WRANGLER_LOG_PATH??join(temporary,'wrangler.log')};
delete env.IT_WORLDS_PRODUCTION_DATABASE_URL;
delete env.IT_WORLDS_MIGRATION_DATABASE_URL;
delete env.WORLDS_LINK_TARGET;
function node(script:string,args:string[]=[]){
 const result=spawnSync(process.execPath,['--experimental-strip-types',join(root,script),...args],{cwd:root,env,stdio:'inherit'});
 if(result.error)throw result.error;
 if(result.status!==0)throw new Error(`Release check failed: ${script} (${result.signal??result.status})`);
}
let keepArtifact=false;
try{
 const build=spawnSync(process.execPath,[join(root,'node_modules/astro/bin/astro.mjs'),'build','--outDir',assets],{cwd:root,env,stdio:'inherit'});
 if(build.error)throw build.error;if(build.status!==0)throw new Error('Isolated release build failed');
 console.log(`Release artifact: ${await verifyReleaseArtifact(assets)} files; no synchronisation copies.`);
 node('scripts/seo-check.ts');node('scripts/links-check.ts');
 let worldsArgs:string[]=[];
 if(worldsProduction){
  const databaseUrl=process.env.IT_WORLDS_PRODUCTION_DATABASE_URL;
  if(enableLinking&&!dryRun)await verifyActiveSessionReceiver();
  worldsArgs=productionReleaseArgs(databaseUrl,process.env.WORLDS_HUB_SESSION_EVENT_JWK,{dryRun,enableLinking,enableProfiles,keepActiveSessionEventKey:enableLinking});
  if(!dryRun)await verifyWorldsProductionSchema(databaseUrl!,process.env.IT_WORLDS_MIGRATION_DATABASE_URL,{enableProfiles});
  if(linkTarget&&!dryRun){
   await writeFile(targetSecretFile,JSON.stringify({WORLDS_LINK_TARGET:JSON.stringify(linkTarget)}),{mode:0o600,flag:'wx'});
   worldsArgs.push('--secrets-file',targetSecretFile);
  }
 }
 // The directory flag overrides only the asset location; routing and existing bindings remain configured in wrangler.jsonc.
 const deployment=spawnSync(process.execPath,[join(root,'node_modules/wrangler/bin/wrangler.js'),'deploy','--assets',assets,'--keep-vars',...worldsArgs,...(dryRun?['--dry-run']:[])],{cwd:root,env,stdio:'inherit'});
 if(deployment.error)throw deployment.error;if(deployment.status!==0)throw new Error('Wrangler release failed');
 if(!dryRun){
  console.log('Deployment completed; verifying public delivery.');
  try{if(enableLinking)await verifyActiveSessionReceiver();node('scripts/seo-check.ts',['--live']);}
  catch(error){keepArtifact=true;console.error(`Deployment completed, but public verification failed. Exact artifact retained: ${assets}`);throw error;}
 }
}finally{
 await rm(targetSecretFile,{force:true});
 // Only remove the temporary directory created by this invocation, never dist/ or user files.
 if(!keepArtifact)await rm(temporary,{recursive:true,force:true});
}
