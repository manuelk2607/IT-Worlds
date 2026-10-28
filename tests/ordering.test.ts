import test from'node:test';import assert from'node:assert/strict';import{checkOrder,moveOrderedStep}from'../src/lib/ordering.ts';import{orderingChallenges}from'../src/data/practice-challenges.ts';import{runMachine,parseProgram}from'../public/projekte/cpu/core.ts';import{sources}from'../src/data/content.ts';
test('sequence feedback locates the first dependency violation and rejects missing or duplicate steps',()=>{
 const expected=['parse','validate','sum','ratio'];assert(checkOrder(expected,expected).passed);assert.equal(checkOrder(expected,['validate','parse','sum','ratio']).firstWrong,0);assert.equal(checkOrder(expected,['parse','sum','validate','ratio']).firstWrong,1);assert(!checkOrder(expected,['parse','validate']).passed);assert(!checkOrder(expected,['parse','validate','sum','sum']).passed);
 const original=['b','a','c'];assert.deepEqual(moveOrderedStep(original,1,-1),['a','b','c']);assert.deepEqual(original,['b','a','c']);assert.deepEqual(moveOrderedStep(original,0,-1),original);assert.deepEqual(moveOrderedStep(original,2,1),original);
});
test('the CPU ordering task follows the actual tested reference trace; all steps have bilingual explanations and sources',()=>{
 const cpu=orderingChallenges.find(item=>item.id==='cpu-trace')!;assert.deepEqual(cpu.steps.map(step=>step.id),runMachine(parseProgram([{op:'set',value:2},{op:'add',value:3},{op:'out'},{op:'halt'}])).trace.map(row=>row.op));
 assert.equal(new Set(orderingChallenges.map(item=>item.id)).size,orderingChallenges.length);
 for(const item of orderingChallenges){assert.equal(new Set(item.steps.map(step=>step.id)).size,item.steps.length);assert(item.steps.every(step=>step.title.de&&step.title.en&&step.why.de&&step.why.en));assert(item.sources.every(id=>sources[id]));}
});
