import {execFile} from 'node:child_process';
import {mkdtemp, mkdir,writeFile, rm, readdir, lstat, readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {randomUUID} from 'node:crypto';
import {validateProject,type ProjectFile,type DocumentFormat} from '../../src/lib/document-project.ts';
import {sourceCandidates} from '../../src/lib/document-analysis.ts';
export interface CompileResult {success:boolean;log:string;pdf?:string;previews:string[];engine:string}
const jobStamp='IT-Worlds document job v1\n';
const exec=(command:string,args:string[],timeout:number,maxBuffer=16*1024*1024)=>new Promise<string>((resolve,reject)=>{
 execFile(command,args,{timeout,maxBuffer,encoding:'utf8'},(error,stdout)=>error?reject(error):resolve(stdout));
});
export async function compilerAvailable():Promise<boolean>{
 if(process.getuid?.()===0)return false;
 try{await exec('docker',['image','inspect','it-worlds-document-compiler:2026-10-25','--format','{{.Id}}'],2000,4096);return true;}catch{return false;}
}
export async function cleanupExpiredProjects():Promise<void>{
 for(const entry of await readdir(tmpdir(),{withFileTypes:true})){
  if(!entry.isDirectory()||!/^it-worlds-document-[A-Za-z0-9]{6}$/.test(entry.name))continue;
  const dir=join(tmpdir(),entry.name),marker=join(dir,'.it-worlds-job');
  try{
   const info=await lstat(dir),stamp=await lstat(marker);
   if(info.uid!==(process.getuid?.()??info.uid)||Date.now()-stamp.mtimeMs<15*60*1000||!stamp.isFile()||stamp.isSymbolicLink()||stamp.size!==jobStamp.length)continue;
   if(await readFile(marker,'utf8')!==jobStamp)continue;
   await rm(dir,{recursive:true,force:true});
  }catch{ /* A different finishing job can remove its own directory during the scan. */ }
 }
}
export function sandboxArgs(name:string,input:string,format:DocumentFormat,main:string):string[]{
 const uid=process.getuid?.()??65532,gid=process.getgid?.()??65532;
 if(uid===0)throw new Error('Compiler host must run as an unprivileged user.');
 return ['run','--rm','--name',name,'--network','none','--read-only','--cap-drop','ALL','--security-opt','no-new-privileges','--pids-limit','64','--memory','512m','--memory-swap','512m','--cpus','1','--ulimit','nofile=128:128','--ulimit','fsize=16777216:16777216','--tmpfs',`/work:rw,noexec,nosuid,nodev,size=96m,uid=${uid},gid=${gid},mode=0700`,'--tmpfs',`/tmp:rw,noexec,nosuid,nodev,size=16m,uid=${uid},gid=${gid}`,'--mount',`type=bind,source=${input},target=/input,readonly`,'--user',`${uid}:${gid}`,'it-worlds-document-compiler:2026-10-25',format,main];
}
export async function compileProject(input:ProjectFile[],format:DocumentFormat,main:string):Promise<CompileResult>{
 const files=validateProject(input);
 if(!sourceCandidates(files,format).includes(main))throw new Error('MAIN');
 const dir=await mkdtemp(join(tmpdir(),'it-worlds-document-'));const name=`it-worlds-doc-${randomUUID()}`;
 try{
  await writeFile(join(dir,'.it-worlds-job'),jobStamp,{mode:0o600});
  for(const file of files){const path=join(dir,file.path);await mkdir(dirname(path),{recursive:true,mode:0o755});await writeFile(path,file.bytes,{mode:0o644});}
  // Keep mkdtemp's 0700 mode; the container runs as the same unprivileged UID.
  const raw=await exec('docker',sandboxArgs(name,dir,format,main),65000);
  const value:unknown=JSON.parse(raw.trim());
  if(!value||typeof value!=='object'||!('success'in value)||typeof value.success!=='boolean'||!('log'in value)||typeof value.log!=='string'||!('previews'in value)||!Array.isArray(value.previews)||!('engine'in value)||typeof value.engine!=='string')throw new Error('RESULT');
  return {success:value.success,log:value.log,engine:value.engine,pdf:'pdf'in value&&typeof value.pdf==='string'?value.pdf:undefined,previews:value.previews.filter((item):item is string=>typeof item==='string').slice(0,3)};
 }finally{
  // Timeout/disconnect of the CLI must not leave the actual compiler container running.
  await exec('docker',['rm','-f',name],5000,4096).catch(()=>{});
  await rm(dir,{recursive:true,force:true});
 }
}
