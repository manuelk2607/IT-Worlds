import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
import {devopsCourse} from '../src/data/course-devops.ts';
test('DevOps examples check artifacts, public output, measurement boundaries and delivery failures',()=>{
 const directory=mkdtempSync(join(tmpdir(),'it-worlds-devops-'));
 try{
  writeFileSync(join(directory,'package.json'),'{"type":"module"}');
  for(const chapter of devopsCourse.chapters)for(const[index,section]of chapter.sections.entries()){
   if(section.language!=='TypeScript'||!section.code)continue;
   let extra='';
   if(chapter.id==='build')extra=String.raw`
import assert from 'node:assert/strict';
assert.equal(digest(''),'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
assert.equal(digest('SQL').length,64);
`;
   if(chapter.id==='konfiguration')extra=String.raw`
import assert from 'node:assert/strict';
assert.deepEqual(publicSettings({PUBLIC_TITLE:'  Learning ',privateField:'test-only'}),{title:'Learning'});
for(const input of [null,{}, {PUBLIC_TITLE:''},{PUBLIC_TITLE:'   '},{PUBLIC_TITLE:42}])assert.throws(()=>publicSettings(input));
`;
   if(chapter.id==='messen')extra=String.raw`
import assert from 'node:assert/strict';
assert.equal(evaluateSlo(0,0,1),null);
assert.deepEqual(evaluateSlo(9,10,0.9),{ratio:0.9,met:true});
assert.deepEqual(evaluateSlo(8,10,0.9),{ratio:0.8,met:false});
for(const values of [[-1,1,1],[2,1,1],[0,-1,1],[0,1,1.1],[0,1,-0.1],[0,1,NaN],[0,Infinity,0.9],[0.5,1,0.9]] as const)assert.throws(()=>evaluateSlo(...values));
`;
   if(chapter.id==='abschluss')extra=String.raw`
await assert.rejects(()=>verifyDelivery(async()=>new Response(null,{status:500})),/Homepage status/);
await assert.rejects(()=>verifyDelivery(async()=>new Response('<h1>Wrong</h1>',{headers:{'Content-Type':'text/html'}})),/Homepage content/);
await assert.rejects(()=>verifyDelivery(async()=>new Response('<h1>Learning</h1>',{headers:{'Content-Type':'text/html'}})),/Missing route status/);
const paths:string[]=[];await verifyDelivery(async path=>{paths.push(path);return correct(path);});
assert.deepEqual(paths,['/','/missing-learning-route/']);
`;
   const path=join(directory,`${chapter.id}-${index}.ts`);writeFileSync(path,section.code+'\n'+extra);
   const output=execFileSync(process.execPath,['--experimental-strip-types',path],{encoding:'utf8',timeout:10000});
   if(chapter.id==='build')assert.equal(output.trim(),'true\nfalse');
   if(chapter.id==='container')assert.equal(output.trim(),'Container lesson');
   if(chapter.id==='abschluss')assert.equal(output.trim(),'Delivery contract checked');
  }
 }finally{rmSync(directory,{recursive:true,force:true});}
});
