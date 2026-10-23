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

test('published TypeScript course examples execute with boundary and mutation checks',async()=>{
 const {typescriptCourse}=await import('../src/data/course-typescript.ts');
 const dir=mkdtempSync(join(tmpdir(),'it-worlds-ts-'));
 try {
  writeFileSync(join(dir,'package.json'),'{"type":"module"}');
  for(const chapter of typescriptCourse.chapters){
   const code=chapter.sections.find(section=>section.language==='TypeScript')!.code!;
   const filename=join(dir,chapter.id+'.ts');
   let extra='';
   if(chapter.id==='zustaende')extra=`
import assert from 'node:assert/strict';
for(const value of [NaN,Infinity,-1,1.5,null,undefined,{}])assert.equal(parseMinutes(value).ok,false);
assert.deepEqual(parseMinutes(0),{ok:true,value:0});
`;
   if(chapter.id==='projekt')extra=`
assert.deepEqual(summarise([]),{titles:[],minutes:0});
assert.throws(()=>summarise([tasks[0],tasks[0]]),/Duplicate ID/);
const before=JSON.stringify(tasks);summarise(tasks);assert.equal(JSON.stringify(tasks),before);
`;
   writeFileSync(filename,code+'\n'+extra);
   const output=execFileSync(process.execPath,['--experimental-strip-types',filename],{encoding:'utf8',timeout:10000});
   if(chapter.id==='erste-schritte')assert.equal(output.trim(),'3 false');
   if(chapter.id==='funktionen')assert.equal(output.trim(),'30\n15\n0');
   if(chapter.id==='asynchron')assert.equal(output.trim(),'30\nMissing lesson');
  }
 } finally {rmSync(dir,{recursive:true,force:true});}
});
