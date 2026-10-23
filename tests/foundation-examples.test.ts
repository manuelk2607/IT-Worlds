import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {apiCourse} from '../src/data/course-apis.ts';

test('published API examples execute and validate HTTP, data and conflict cases',()=>{
 const dir=mkdtempSync(join(tmpdir(),'it-worlds-api-'));
 try {
  writeFileSync(join(dir,'package.json'),'{"type":"module"}');
  for(const chapter of apiCourse.chapters){
   const code=chapter.sections.find(section=>section.language==='TypeScript')!.code!;
   const filename=join(dir,chapter.id+'.ts');
   const extra=chapter.id==='client' ? `
import assert from 'node:assert/strict';
await assert.rejects(()=>readCourse(new Response(null,{status:404})),/HTTP 404/);
for(const value of [null,{}, {id:'7',title:'SQL'},{id:0,title:'SQL'},{id:7,title:''}])
 assert.throws(()=>parseCourse(value),/Invalid course/);
` : '';
   writeFileSync(filename,code+'\n'+extra);
   const output=execFileSync(process.execPath,['--experimental-strip-types',filename],{encoding:'utf8',timeout:10000});
   if(chapter.id==='http')assert.match(output,/201 true\nSQL/);
   if(chapter.id==='konkurrenz')assert.equal(output.trim(),'204\n412\nSQL basics');
   if(chapter.id==='rechte')assert.equal(output.trim(),'true\nfalse');
   if(chapter.id==='vertrag') {
    const contract=JSON.parse(output);
    assert.equal(contract.openapi,'3.1.1');
    assert.equal(contract.paths['/courses/{id}'].get.parameters[0].required,true);
   }
   if(chapter.id==='abschluss')assert.match(output,/3 contract cases passed/);
  }
 } finally {rmSync(dir,{recursive:true,force:true});}
});
