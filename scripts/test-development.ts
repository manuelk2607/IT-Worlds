// Own localhost Worker + existing restricted development secrets; never production.
import {readFile,mkdtemp,writeFile,rm,open} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawn} from 'node:child_process';
import {setTimeout} from 'node:timers/promises';
const runtimeFile=process.env.IT_WORLDS_RUNTIME_FILE,credentials=process.env.IT_WORLDS_TEST_CREDENTIALS;
if(!runtimeFile||!credentials)throw new Error('Provide private development runtime and test-account file paths.');
const raw:unknown=JSON.parse(await readFile(runtimeFile,'utf8'));
if(!raw||typeof raw!=='object')throw new Error('Invalid runtime file');
const runtime=raw as Record<string,unknown>;
for(const key of ['DATABASE_URL','NEON_AUTH_BASE_URL','NEON_AUTH_COOKIE_SECRET'])if(typeof runtime[key]!=='string')throw new Error('Missing runtime binding');
const database=new URL(String(runtime.DATABASE_URL)),auth=new URL(String(runtime.NEON_AUTH_BASE_URL));
if(database.username!=='it_worlds_app'||!database.hostname.startsWith('ep-jolly-darkness-ba9m7fit-pooler.')||!auth.hostname.startsWith('ep-jolly-darkness-ba9m7fit.'))throw new Error('Restricted development branch required');
const directory=await mkdtemp(join(tmpdir(),'it-worlds-p1-development-'));
const envFile=join(directory,'runtime.env'),log=await open(join(directory,'worker.log'),'wx',0o600);
await writeFile(envFile,['DATABASE_URL','NEON_AUTH_BASE_URL','NEON_AUTH_COOKIE_SECRET'].map(key=>`${key}=${JSON.stringify(runtime[key])}`).join('\n'),{mode:0o600,flag:'wx'});
const env={...process.env,...Object.fromEntries(Object.entries(runtime).filter((pair):pair is [string,string]=>typeof pair[1]==='string')),IT_WORLDS_TEST_BRANCH:'development',IT_WORLDS_TEST_BASE_URL:'http://localhost:8790',IT_WORLDS_TEST_CREDENTIALS:credentials};
const worker=spawn('npm',['exec','--','wrangler','dev','--local','--ip','127.0.0.1','--port','8790','--env-file',envFile],{stdio:['ignore',log.fd,log.fd],detached:true});
let stopping=false;
const stop=()=>{if(stopping)return;stopping=true;try{if(worker.pid)process.kill(-worker.pid,'SIGTERM');}catch{/* Already stopped. */}};
process.on('SIGTERM',stop);process.on('SIGINT',stop);
try{
 let ready=false;
 for(let i=0;i<60&&!stopping;i++){
  if(worker.exitCode!==null)break;
  try{const response=await fetch('http://localhost:8790/api/auth/get-session?disableCookieCache=true',{signal:AbortSignal.timeout(3000)});if(response.status===200){ready=true;break;}}catch{/* Worker starting. */}
  await setTimeout(500);
 }
 if(!ready)throw new Error(`Development Worker did not become ready. Private log: ${join(directory,'worker.log')}`);
 if(process.argv.includes('--serve')){
  console.log('Development Worker ready at http://localhost:8790; Ctrl-C stops only this test server.');
  await new Promise<void>(resolve=>{process.once('SIGINT',resolve);process.once('SIGTERM',resolve);worker.once('exit',()=>resolve());});
 }else{
  for(const file of process.argv.includes('--typing-only')?['tests/live-typing.ts']:['tests/live-accounts.ts','tests/live-typing.ts','tests/live-reset.ts']){
   const child=spawn(process.execPath,['--experimental-strip-types',file],{env,stdio:'inherit'});
   const code=await new Promise<number|null>(resolve=>child.once('exit',resolve));
   if(code!==0)throw new Error(`Development checks failed: ${file}`);
  }
 }
}finally{
 stop();await log.close();await rm(envFile,{force:true});
}
