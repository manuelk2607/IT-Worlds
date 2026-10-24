import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm,symlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {verifyReleaseArtifact} from '../scripts/release-artifact.ts';
test('release artifacts require both languages and reject sync conflicts and symlinks',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'it-worlds-artifact-test-'));
 const file=async(path:string)=>{await mkdir(dirname(join(directory,path)),{recursive:true});await writeFile(join(directory,path),'test');};
 try{
  await assert.rejects(()=>verifyReleaseArtifact(directory));
  for(const path of ['index.html','en/index.html','404.html','en/404/index.html','sitemap.xml','robots.txt'])await file(path);
  assert.equal(await verifyReleaseArtifact(directory),6);
  await file('sitemap 3.xml');await assert.rejects(()=>verifyReleaseArtifact(directory),/synchronisation copy/);await rm(join(directory,'sitemap 3.xml'));
  await mkdir(join(directory,'_astro 2'));await assert.rejects(()=>verifyReleaseArtifact(directory),/synchronisation copy/);await rm(join(directory,'_astro 2'),{recursive:true});
  await symlink(join(directory,'index.html'),join(directory,'linked.html'));await assert.rejects(()=>verifyReleaseArtifact(directory),/symlink/);
 }finally{await rm(directory,{recursive:true,force:true});}
});
