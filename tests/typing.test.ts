import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreTyping,rankedTraceValid,parseTypingTrace,fingerFor} from '../src/lib/typing.ts';
import {halfAdder,gameStep} from '../src/lib/labs.ts';
test('typing replay preserves corrected mistakes and computes documented units',()=>{
 const score=scoreTyping('abc',{keys:'ax\bbc',times:[100,200,300,400,500]},60000)!;
 assert.equal(score.characters,4);assert.equal(score.correct,3);assert.equal(score.mistakes,1);assert.equal(score.retained,3);assert.equal(score.accuracy,75);assert.equal(score.wpm,0.6);assert.equal(score.kpm,4);
 assert.equal(score.weakness.b,1);
 assert.equal(scoreTyping('a',{keys:'a',times:[-1]},1000),null);
 assert.equal(scoreTyping('a',{keys:'a',times:[1001]},1000),null);
 assert.equal(scoreTyping('a',{keys:'a',times:[]},1000),null);
 assert.equal(parseTypingTrace({keys:'abc',times:['1']}),null);
 assert.equal(rankedTraceValid({keys:'a'.repeat(20),times:Array.from({length:20},(_,i)=>i*100)},1000),false);
 assert.equal(rankedTraceValid({keys:'a'.repeat(20),times:Array.from({length:20},(_,i)=>i*100)},61000),true);
 assert.equal(fingerFor('f'),3);assert.equal(fingerFor('J'),5);
});
test('lab arithmetic and collision boundaries match the teaching models',()=>{
 assert.deepEqual(halfAdder(true,true),{sum:0,carry:1});assert.deepEqual(halfAdder(true,false),{sum:1,carry:0});
 assert.deepEqual(gameStep(160,100,1,0),{x:160,y:100});assert.deepEqual(gameStep(0,0,-1,-1),{x:0,y:0});assert.deepEqual(gameStep(160,0,1,0),{x:170,y:0});
});
