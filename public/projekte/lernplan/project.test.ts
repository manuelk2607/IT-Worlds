import test from 'node:test';import assert from 'node:assert/strict';import{parseSessions,report}from'./core.ts';
test('independent report expectations, zero denominator and domain boundaries',()=>{
 assert.deepEqual(report(parseSessions([{id:'sql-a',topic:'SQL',minutes:30,done:true},{id:'sql-b',topic:'SQL',minutes:45,done:false},{id:'net',topic:'Netzwerke',minutes:15,done:true}])),{minutes:90,completedMinutes:45,completionPercent:50,topics:[{topic:'Netzwerke',minutes:15},{topic:'SQL',minutes:75}]});
 assert.equal(report([]).completionPercent,null);assert.equal(report(parseSessions([{id:'x',topic:'SQL',minutes:0,done:true}])).completionPercent,null);
 for(const value of [null,{},Array(101).fill({}),[{id:'a',topic:'SQL',minutes:-1,done:true}],[{id:'a',topic:'SQL',minutes:481,done:true}],[{id:'a',topic:'SQL',minutes:1,done:'false'}]])assert.throws(()=>parseSessions(value));
 const valid={id:'a',topic:'SQL',minutes:15,done:false};assert.throws(()=>parseSessions([valid,valid]));assert.equal(report(parseSessions([valid])).completedMinutes,0);
});
