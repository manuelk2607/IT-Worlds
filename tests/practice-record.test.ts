import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyPracticeRecord,readPracticeRecord,writePracticeRecord,practiceRecordKey,practiceAttempt,projectChecklist} from '../src/lib/practice-record.ts';
import {practiceItems,practiceHierarchy} from '../src/data/practice-catalog.ts';
import {emptyPracticeSelection,matchesPractice,readPracticeSelection} from '../src/lib/practice-catalog.ts';
const memory=()=>{const data=new Map<string,string>();return{data,getItem:(key:string)=>data.get(key)??null,setItem:(key:string,value:string)=>{data.set(key,value);},removeItem:(key:string)=>{data.delete(key);}};};
test('task records round-trip independently of language, account reading state and other task keys',()=>{
 const storage=memory(),record=practiceAttempt(emptyPracticeRecord(),false);
 assert(writePracticeRecord(storage,'editor-a',record));assert.deepEqual(readPracticeRecord(storage,'editor-a').record,record);
 assert.equal(readPracticeRecord(storage,'chapter-b').record.status,'open');assert.equal(record.status,'review');assert.equal(record.attempts,1);
 const passed=practiceAttempt(record,true);assert.equal(passed.status,'complete');assert.equal(passed.source,'model');assert.equal(passed.attempts,2);
 assert.equal(practiceAttempt({...passed,attempts:100000},false).attempts,100000);
});
test('corrupt, oversized and unsupported records do not prevent practice; blocked storage is explicit',()=>{
 const storage=memory();for(const value of ['{','x'.repeat(8193),JSON.stringify({version:2}),JSON.stringify({version:1,...emptyPracticeRecord(),status:'bogus'})]){storage.setItem(practiceRecordKey('x'),value);assert.equal(readPracticeRecord(storage,'x').record.status,'open');}
 const blocked={getItem:()=>{throw new Error('blocked');},setItem:()=>{throw new Error('quota');},removeItem:()=>{}};
 assert.equal(readPracticeRecord(blocked,'x').available,false);assert.equal(writePracticeRecord(blocked,'x',practiceAttempt(emptyPracticeRecord(),true)),false);
});
test('project checklist counts only known distinct milestones and reopens after an unchecked step',()=>{
 let record=projectChecklist(emptyPracticeRecord(),['start','test'],'start',true);assert.equal(record.status,'active');
 record=projectChecklist(record,['start','test'],'unknown',true);assert.deepEqual(record.steps,['start']);
 record=projectChecklist(record,['start','test'],'test',true);assert.equal(record.status,'complete');assert.equal(record.source,'self');
 record=projectChecklist(record,['start','test'],'start',false);assert.equal(record.status,'active');assert.deepEqual(record.steps,['test']);
 assert.equal(projectChecklist(record,[],'test',true).status,'open');
});
test('practice hierarchy assigns each card once while status is independent of metadata',()=>{
 const flattened=practiceHierarchy(practiceItems).flatMap(group=>group.subgroups.flatMap(sub=>sub.items));
 for(const group of practiceHierarchy(practiceItems))for(const subgroup of group.subgroups)for(const item of subgroup.items)assert.equal(group.topic,item.topics[0]);
 assert.equal(flattened.length,practiceItems.length);assert.equal(new Set(flattened.map(item=>item.id)).size,practiceItems.length);
 const item={id:'x',topics:['hardware'],courses:['hardware'],level:'einstieg',kind:'chapter',text:'cpu'};
 const value={...emptyPracticeSelection(),status:'complete'};assert(!matchesPractice(item,value,'active'));assert(matchesPractice(item,value,'complete'));
 assert.equal(readPracticeSelection(new URLSearchParams('status=review'),[item]).status,'review');assert.equal(readPracticeSelection(new URLSearchParams('status=malicious'),[item]).status,'alle');
});

 test('account review evidence excludes reading, unfinished and foreign questions without inferring task completion',async()=>{
 const{practiceQuizEvidence}=await import('../src/lib/practice-feedback.ts');const items=[{kind:'question' as const,contentId:'a',completed:true,solved:false,updatedAt:''},{kind:'question' as const,contentId:'b',completed:true,solved:true,updatedAt:''},{kind:'question' as const,contentId:'c',completed:false,solved:false,updatedAt:''},{kind:'lesson' as const,contentId:'a',completed:true,solved:false,updatedAt:''}];
 assert.deepEqual(practiceQuizEvidence(items,['a','b','c']),{answered:2,correct:1,review:['a']});assert.equal(practiceQuizEvidence(items,['unknown']).answered,0);
 });
