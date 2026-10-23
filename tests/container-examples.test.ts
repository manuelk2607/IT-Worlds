import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
import {devopsCourse} from '../src/data/course-devops.ts';
test('published container experiment runs with a read-only source and no external container network',{
 skip:process.env.IT_WORLDS_DOCKER!=='1'?'Set IT_WORLDS_DOCKER=1 with a running Docker Engine; CI runs this on Linux.':false,
},()=>{
 const directory=mkdtempSync(join(tmpdir(),'it worlds container-'));
 const chapter=devopsCourse.chapters.find(chapter=>chapter.id==='container')!;
 const code=chapter.sections.find(section=>section.language==='TypeScript')!.code!;
 const command=chapter.sections.find(section=>section.language==='Shell')!.code!;
 try{
  writeFileSync(join(directory,'hello.ts'),code);
  const output=execFileSync('/bin/bash',['--noprofile','--norc','-c',command],{cwd:directory,encoding:'utf8',timeout:120000});
  assert.equal(output.trim(),'Container lesson');
  assert.equal(readFileSync(join(directory,'hello.ts'),'utf8'),code);
 }finally{rmSync(directory,{recursive:true,force:true});}
});
