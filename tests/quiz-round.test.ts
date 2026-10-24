import test from 'node:test';
import assert from 'node:assert/strict';
import {quizRound,roundSize,roundSeed} from '../src/lib/quiz-round.ts';
test('quiz rounds are bounded, repeatable, unique and leave the question pool intact',()=>{
 const pool=Array.from({length:30},(_,index)=>({id:index}));const before=[...pool];
 assert.deepEqual(quizRound(pool,'5'),pool.slice(0,5));
 assert.equal(quizRound(pool,'10').length,10);assert.equal(quizRound(pool,'20').length,20);
 assert.deepEqual(quizRound(pool,'alle'),pool);assert.deepEqual(quizRound([], '10'),[]);
 assert.deepEqual(quizRound(pool.slice(0,2),'10',12).length,2);
 const first=quizRound(pool,'alle',12);assert.deepEqual(first,quizRound(pool,'alle',12));
 assert.notDeepEqual(first,quizRound(pool,'alle',13));assert.equal(new Set(first).size,pool.length);
 assert.deepEqual(new Set(first),new Set(pool));assert.deepEqual(pool,before);
 assert.deepEqual(quizRound(pool,'10',0),quizRound(pool,'10',0));
 for(const value of [null,'','-1','100','undefined'])assert.equal(roundSize(value),'10');
 assert.equal(roundSize('alle'),'alle');assert.equal(roundSeed('ffffffff'),4294967295);
 for(const value of [null,'','0','fffffffff','FFFFFFFF','zzzzzzzz','-0000001'])assert.equal(roundSeed(value),undefined);
});
