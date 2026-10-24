import test from 'node:test';import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';import {execFileSync} from 'node:child_process';
import {osCourse} from '../src/data/course-os.ts';
test('OS examples check scheduling, translation, races, hard links and FIFO anomalies',()=>{
 const directory=mkdtempSync(join(tmpdir(),'it-worlds-os-'));
 try{
  writeFileSync(join(directory,'package.json'),'{"type":"module"}');
  for(const chapter of osCourse.chapters)for(const[index,section]of chapter.sections.entries()){
   if(section.language!=='TypeScript'||!section.code)continue;
   let extra='';
   if(chapter.id==='prozesse')extra=String.raw`
assert.throws(()=>transition('blocked','dispatch'));
assert.equal(transition('running','preempt'),'ready');
`;
   if(chapter.id==='scheduling')extra=String.raw`
const jobs=[{id:'A',work:3},{id:'B',work:2}];const before=JSON.stringify(jobs);
assert.deepEqual(roundRobin(jobs,1),['A:1','B:1','A:1','B:1','A:1']);assert.equal(JSON.stringify(jobs),before);
assert.deepEqual(roundRobin([],2),[]);
for(const q of [0,-1,0.5,101,NaN,Infinity])assert.throws(()=>roundRobin(jobs,q));
assert.throws(()=>roundRobin([{id:'A',work:1},{id:'A',work:2}],1));
assert.throws(()=>roundRobin([{id:'A',work:0}],1));
`;
   if(chapter.id==='speicher')extra=String.raw`
assert.equal(physicalAddress(31,new Map([[1,5]])),95);
assert.throws(()=>physicalAddress(32,new Map([[1,5]])),/not mapped/);
for(const address of [-1,64,NaN,Infinity,0.5])assert.throws(()=>physicalAddress(address,new Map([[0,0]])));
for(const frame of [-1,8,NaN,0.5])assert.throws(()=>physicalAddress(0,new Map([[0,frame]])));
assert.equal(physicalAddress(0,new Map([[0,0]])),0);
assert.equal(physicalAddress(63,new Map([[3,7]])),127);
`;
   if(chapter.id==='nebenlaeufigkeit')extra=String.raw`
assert.equal(counterTrace([readA,readB,writeB,writeA]),1);
assert.equal(counterTrace([readB,writeB,readA,writeA]),2);
assert.throws(()=>counterTrace([writeA]),/before read/);
`;
   if(chapter.id==='abschluss')extra=String.raw`
assert.deepEqual(fifoPages([],3),{hits:0,misses:0});
assert.deepEqual(fifoPages([7,7,7],1),{hits:2,misses:1});
const references=[1,2,3,4,1,2,5,1,2,3,4,5],before=[...references];
assert.equal(fifoPages(references,3).misses,9);assert.equal(fifoPages(references,4).misses,10);assert.deepEqual(references,before);
for(const capacity of [0,-1,101,0.5,NaN,Infinity])assert.throws(()=>fifoPages([],capacity));
for(const page of [-1,0.5,NaN,Infinity])assert.throws(()=>fifoPages([page],3));
`;
   const file=join(directory,`${chapter.id}-${index}.ts`);writeFileSync(file,"import assert from 'node:assert/strict';\n"+section.code+'\n'+extra);
   const output=execFileSync(process.execPath,['--experimental-strip-types',file],{encoding:'utf8',timeout:10000});
   const expected:Record<string,string>={prozesse:'running\nblocked\nready',scheduling:'A:2, B:2, A:1',speicher:'83\n35',nebenlaeufigkeit:'1\n2',dateisystem:'2\nlesson',abschluss:'{ hits: 2, misses: 4 }'};
   assert.equal(output.trim(),expected[chapter.id]);
  }
 }finally{rmSync(directory,{recursive:true,force:true});}
});
