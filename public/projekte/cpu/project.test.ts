import test from 'node:test';import assert from 'node:assert/strict';import{parseProgram,runMachine}from'./core.ts';
test('machine fetches instructions, tracks accumulator and halts with exact trace',()=>{
 const result=runMachine(parseProgram([{op:'set',value:2},{op:'add',value:3},{op:'out'},{op:'halt'}]));assert.deepEqual(result.output,[5]);assert.equal(result.steps,4);assert.deepEqual(result.trace.map(row=>[row.pc,row.before,row.after]),[[0,0,2],[1,2,5],[2,5,5],[3,5,5]]);
 assert.deepEqual(runMachine(parseProgram([{op:'jump',value:2},{op:'out'},{op:'halt'}])).output,[]);
});
test('machine rejects unknown code, invalid jumps, overflow, missing halt and endless loops',()=>{
 for(const code of [[{op:'eval',value:'process.exit()'}],[{op:'jump',value:-1}],[{op:'set',value:1.5}],[]])assert.throws(()=>parseProgram(code));
 assert.throws(()=>runMachine(parseProgram([{op:'jump',value:0}]),5),/Step limit/);
 assert.throws(()=>runMachine(parseProgram([{op:'set',value:2147483647},{op:'add',value:1},{op:'halt'}])),/range/);
 assert.throws(()=>runMachine(parseProgram([{op:'out'}])),/counter/);assert.throws(()=>runMachine([{op:'halt'}],0));
});
