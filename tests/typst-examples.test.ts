import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,rmSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {typstCourse} from '../src/data/course-typst.ts';
const binary=process.env.IT_WORLDS_TYPST??'typst';
const installed=spawnSync(binary,['--version'],{encoding:'utf8',timeout:10000});
const missing=installed.error!==undefined&&'code' in installed.error&&installed.error.code==='ENOENT';
test('all published Typst documents compile with their actual bibliography and computed values',{skip:missing&&!process.env.IT_WORLDS_TYPST?'Typst is not installed; CI installs pinned 0.15.1':false},()=>{
 assert.ifError(installed.error);assert.equal(installed.status,0);assert.match(installed.stdout,/typst 0\.15\.1/);
 const dir=mkdtempSync(join(tmpdir(),'it-worlds-typst-'));
 const run=(cwd:string,args:string[])=>{const result=spawnSync(binary,args,{cwd,encoding:'utf8',timeout:30000});assert.ifError(result.error);return result;};
 try{
  let count=0;
  for(const chapter of typstCourse.chapters){
   const cwd=join(dir,chapter.id);mkdirSync(cwd);
   for(const section of chapter.sections){
    if(section.language==='BibTeX'&&section.code)writeFileSync(join(cwd,'works.bib'),section.code);
    if(section.language!=='Typst'||!section.code)continue;
    writeFileSync(join(cwd,'main.typ'),section.code);
    const result=run(cwd,['compile','--ignore-system-fonts','main.typ','main.pdf']);
    assert.equal(result.status,0,`${chapter.id}: ${result.stderr}`);assert.equal(result.stderr,'',chapter.id);
    const pdf=readFileSync(join(cwd,'main.pdf'));assert.equal(pdf.subarray(0,5).toString(),'%PDF-');assert.ok(pdf.length>1000);count++;
    if(chapter.id==='mathematik'||chapter.id==='abschluss'){
     writeFileSync(join(cwd,'values.typ'),section.code+'\n#assert.eq(mean, 20)\n'+(chapter.id==='abschluss'?'#assert.eq(total, 40)':''));
     const checked=run(cwd,['compile','values.typ','values.pdf']);assert.equal(checked.status,0,checked.stderr);
    }
    if(chapter.id==='abschluss'){
     writeFileSync(join(cwd,'changed.typ'),section.code.replace('#let second = 25','#let second = 35')+'\n#assert.eq(total, 50)\n#assert.eq(mean, 25)');
     const changed=run(cwd,['compile','changed.typ','changed.pdf']);assert.equal(changed.status,0,changed.stderr);
    }
    if(chapter.id==='literatur'){
     writeFileSync(join(cwd,'bad-key.typ'),section.code.replace('@typst-docs','@missing-key'));
     assert.notEqual(run(cwd,['compile','bad-key.typ','bad-key.pdf']).status,0,'A misspelled citation must fail');
    }
   }
  }
  assert.equal(count,16);
 }finally{rmSync(dir,{recursive:true,force:true});}
});
