import test from'node:test';import assert from'node:assert/strict';import{emptyPracticeRecord}from'../src/lib/practice-record.ts';import{exportPracticeRecords,planPracticeImport,practiceBackupLimit}from'../src/lib/practice-backup.ts';
const stamp='2026-10-28T10:00:00.000Z',now=Date.parse(stamp);
test('backup round-trips known notes and converts imported model evidence to self-assessment',()=>{
 const record={...emptyPracticeRecord(),status:'complete' as const,source:'model' as const,attempts:3,updatedAt:stamp};const text=exportPracticeRecords(['a','b'],id=>id==='a'?record:emptyPracticeRecord());
 const result=planPracticeImport(text,new Set(['a']),new Map(),new Map(),now);assert.equal(result.changes.length,1);assert.equal(result.changes[0]!.record.source,'self');assert.equal(result.changes[0]!.record.status,'complete');assert.equal(result.changes[0]!.record.attempts,3);assert(!text.includes('"id": "b"'));
 assert.equal(planPracticeImport(text,new Set(['a']),new Map([['a',record]]),new Map(),now).older,1);assert.equal(planPracticeImport(text,new Set(),new Map(),new Map(),now).unknown,1);
});
test('invalid, duplicate, future and oversized backups fail before returning an import plan',()=>{
 const record={version:1,...emptyPracticeRecord(),updatedAt:stamp},row={id:'a',record};for(const text of ['{','x'.repeat(practiceBackupLimit+1),JSON.stringify({version:2,items:[]}),JSON.stringify({version:1,items:[row,row]}),JSON.stringify({version:1,items:[{...row,record:{...record,status:'bogus'}}]}),JSON.stringify({version:1,items:[{...row,record:{...record,updatedAt:'2100-01-01'}}]})])assert.throws(()=>planPracticeImport(text,new Set(['a']),new Map(),new Map(),now));
});
test('project imports derive completion from known checklist steps and never invent unknown milestones',()=>{
 const text=exportPracticeRecords(['project-x'],()=>({...emptyPracticeRecord(),status:'complete',steps:['one','unknown'],updatedAt:stamp}));const result=planPracticeImport(text,new Set(['project-x']),new Map(),new Map([['project-x',['one','two']]]),now);assert.deepEqual(result.changes[0]!.record.steps,['one']);assert.equal(result.changes[0]!.record.status,'active');
});
