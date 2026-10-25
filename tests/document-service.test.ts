import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {randomBytes} from 'node:crypto';
import {mkdtemp,writeFile,utimes,access,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {cleanupExpiredProjects} from '../services/document-compiler/runner.ts';
test('expired owned jobs are deleted; current and unrelated directories remain',async()=>{
 const expired=await mkdtemp(join(tmpdir(),'it-worlds-document-')),current=await mkdtemp(join(tmpdir(),'it-worlds-document-')),unrelated=await mkdtemp(join(tmpdir(),'it-worlds-document-'));
 try{
  await writeFile(join(expired,'.it-worlds-job'),'IT-Worlds document job v1\n');await writeFile(join(current,'.it-worlds-job'),'IT-Worlds document job v1\n');await writeFile(join(unrelated,'keep.txt'),'Keep this.');
  const old=new Date(Date.now()-3600000);await utimes(join(expired,'.it-worlds-job'),old,old);
  await cleanupExpiredProjects();await assert.rejects(access(expired));await access(current);await access(join(unrelated,'keep.txt'));
 }finally{await Promise.all([expired,current,unrelated].map(dir=>rm(dir,{recursive:true,force:true})));}
});
test('private compiler API enforces bearer authentication, project validation and produces a real PDF',{skip:process.env.IT_WORLDS_COMPILER_TEST!=='1',timeout:30000},async()=>{
 const token=randomBytes(32).toString('hex');const child=spawn(process.execPath,['--experimental-strip-types','services/document-compiler/server.ts'],{env:{...process.env,IT_WORLDS_COMPILER_TOKEN:token,IT_WORLDS_COMPILER_PORT:'0'},stdio:['ignore','pipe','pipe']});
 try{
  const base=await new Promise<string>((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Service startup timed out')),10000);child.once('error',reject);createInterface({input:child.stdout}).once('line',line=>{clearTimeout(timer);const port=line.match(/127\.0\.0\.1:(\d+)/)?.[1];if(!port)reject(new Error('Missing local port'));else resolve(`http://127.0.0.1:${port}`);});});
  assert.equal((await fetch(base+'/status')).status,401);
  const headers={authorization:`Bearer ${token}`,'content-type':'application/json'};
  assert.deepEqual(await(await fetch(base+'/status',{headers})).json(),{available:true});
  const post=(body:unknown)=>fetch(base+'/compile',{method:'POST',headers,body:JSON.stringify(body)});
  assert.equal((await post({format:'typst',main:'../bad.typ',files:[{path:'../bad.typ',base64:'eA=='}]})).status,422);
  const response=await post({format:'typst',main:'main.typ',files:[{path:'main.typ',base64:Buffer.from('= Hello\nComplete source project.').toString('base64')}]});
  assert.equal(response.status,200);const result=await response.json();assert.equal(result.success,true);assert(Buffer.from(result.pdf,'base64').subarray(0,5).toString()==='%PDF-');assert(result.previews.length>0);assert.equal(response.headers.get('cache-control'),'no-store');
 }finally{child.kill('SIGTERM');}
});
