// Run the exact downloadable project's tests, including actual local HTTP requests.
import '../public/projekte/auslieferung/check.test.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync,spawn} from 'node:child_process';
import {once} from 'node:events';
import {createDemoServer} from '../public/projekte/auslieferung/demo.ts';
import {fileURLToPath} from 'node:url';
import {projectArchives} from '../src/data/practice-projects.ts';
test('downloadable release project contains exactly the tested source files',()=>{
 for(const project of projectArchives){
 const archive=fileURLToPath(new URL(`../public/downloads/${project.id}.zip`,import.meta.url));
 const listing=spawnSync('unzip',['-Z1',archive],{encoding:'utf8'});assert.equal(listing.status,0);
 assert.deepEqual(listing.stdout.trim().split('\n').sort(),[...project.files].sort());
 for(const name of project.files){const unpacked=spawnSync('unzip',['-p',archive,name]);assert.equal(unpacked.status,0);assert.deepEqual(unpacked.stdout,readFileSync(new URL(`../${project.source}${name}`,import.meta.url)));}
 }
});
test('the published CLI reports actual HTTP outcomes with exit codes 0, 1 and 2',async()=>{
 const run=(args:string[])=>new Promise<{code:number|null;output:string}>((resolve,reject)=>{
  const child=spawn(process.execPath,['--experimental-strip-types',fileURLToPath(new URL('../public/projekte/auslieferung/cli.ts',import.meta.url)),...args],{timeout:10000});let output='';
  child.stdout.on('data',(data:Buffer)=>output+=data.toString());child.stderr.on('data',(data:Buffer)=>output+=data.toString());child.once('error',reject);child.once('close',code=>resolve({code,output}));
 });
 for(const fault of ['none','missing']as const){
  const server=createDemoServer(fault);server.listen(0,'127.0.0.1');await once(server,'listening');const address=server.address();assert(address&&typeof address!=='string');
  try{const result=await run([`http://127.0.0.1:${address.port}/`]);assert.equal(result.code,fault==='none'?0:1);assert(result.output.includes(fault==='none'?'PASS: missing route':'FAIL: missing route'));}
  finally{server.close();server.closeAllConnections();await once(server,'close');}
 }
 assert.equal((await run([])).code,2);
});
