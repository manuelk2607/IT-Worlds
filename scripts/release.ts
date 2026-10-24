import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {verifyReleaseArtifact} from './release-artifact.ts';
const args=process.argv.slice(2);
if(args.some(value=>value!=='--dry-run'))throw new Error('Supported release argument: --dry-run');
const dryRun=args.includes('--dry-run');
const root=fileURLToPath(new URL('../',import.meta.url));
const temporary=await mkdtemp(join(tmpdir(),'it-worlds-release-'));
const assets=join(temporary,'assets');
const env={...process.env,ASTRO_TELEMETRY_DISABLED:'1',IT_WORLDS_DIST:assets,WRANGLER_LOG_PATH:process.env.WRANGLER_LOG_PATH??join(temporary,'wrangler.log')};
function node(script:string,args:string[]=[]){
 const result=spawnSync(process.execPath,['--experimental-strip-types',join(root,script),...args],{cwd:root,env,stdio:'inherit'});
 if(result.error)throw result.error;
 if(result.status!==0)throw new Error(`Release check failed: ${script} (${result.signal??result.status})`);
}
try{
 const build=spawnSync(process.execPath,[join(root,'node_modules/astro/bin/astro.mjs'),'build','--outDir',assets],{cwd:root,env,stdio:'inherit'});
 if(build.error)throw build.error;if(build.status!==0)throw new Error('Isolated release build failed');
 console.log(`Release artifact: ${await verifyReleaseArtifact(assets)} files; no synchronisation copies.`);
 node('scripts/seo-check.ts');node('scripts/links-check.ts');
 // The directory flag overrides only the asset location; routing and existing bindings remain configured in wrangler.jsonc.
 const deployment=spawnSync(process.execPath,[join(root,'node_modules/wrangler/bin/wrangler.js'),'deploy','--assets',assets,...(dryRun?['--dry-run']:[])],{cwd:root,env,stdio:'inherit'});
 if(deployment.error)throw deployment.error;if(deployment.status!==0)throw new Error('Wrangler release failed');
 if(!dryRun)node('scripts/seo-check.ts',['--live']);
}finally{
 // Only remove the temporary directory created by this invocation, never dist/ or user files.
 await rm(temporary,{recursive:true,force:true});
}
