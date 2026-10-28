import test from'node:test';import assert from'node:assert/strict';import{mkdtemp,writeFile,unlink,symlink,mkdir,rm}from'node:fs/promises';import{tmpdir}from'node:os';import{join}from'node:path';import{snapshot,compare,parseManifest}from'./core.ts';
test('real file changes are distinguished from added and removed files',async()=>{
 const root=await mkdtemp(join(tmpdir(),'it-worlds-integrity-'));
 try{await writeFile(join(root,'a.txt'),'alpha');await writeFile(join(root,'b.txt'),'beta');const before=await snapshot(root);assert.equal(before.length,2);assert.equal(before[0]!.sha256,'8ed3f6ad685b959ead7022518e1af76cd816f8e8ec7ccdda1ed4018e8f2223f8');assert.deepEqual(compare(before,await snapshot(root)),{added:[],removed:[],changed:[]});
  await writeFile(join(root,'a.txt'),'ALPHA');await unlink(join(root,'b.txt'));await writeFile(join(root,'c.txt'),'new');assert.deepEqual(compare(before,await snapshot(root)),{added:['c.txt'],removed:['b.txt'],changed:['a.txt']});assert.deepEqual(parseManifest(before),before);
 }finally{await rm(root,{recursive:true,force:true});}
});
test('oversized files, links, directories and unsafe manifest paths are rejected',async()=>{
 const root=await mkdtemp(join(tmpdir(),'it-worlds-integrity-limits-'));
 try{await writeFile(join(root,'big.txt'),Buffer.alloc(65537));await assert.rejects(snapshot(root));await unlink(join(root,'big.txt'));await symlink(join(root,'missing'),join(root,'link'));await assert.rejects(snapshot(root));await unlink(join(root,'link'));await mkdir(join(root,'nested'));await assert.rejects(snapshot(root));
  for(const name of ['../escape','/absolute','a/b','a\\b','.hidden'])assert.throws(()=>parseManifest([{name,size:1,sha256:'a'.repeat(64)}]));assert.throws(()=>parseManifest([{name:'a.txt',size:-1,sha256:'a'.repeat(64)}]));
 }finally{await rm(root,{recursive:true,force:true});}
});
