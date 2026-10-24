import test from 'node:test';import assert from 'node:assert/strict';import{auditFetch}from'../scripts/audit-fetch.ts';
const pause=async()=>{};
test('public audits retry transient requests but retain permanent failures',async()=>{
 let attempts=0;
 const retried=await auditFetch('https://example.test/',{},async()=>{attempts++;if(attempts===1)throw new Error('temporary network failure');return new Response('ok');},pause);
 assert.equal(attempts,2);assert.equal(await retried.text(),'ok');
 attempts=0;assert.equal((await auditFetch('https://example.test/',{},async()=>{attempts++;return new Response(null,{status:attempts===1?429:200});},pause)).status,200);assert.equal(attempts,2);
 attempts=0;assert.equal((await auditFetch('https://example.test/',{},async()=>{attempts++;return new Response(null,{status:404});},pause)).status,404);assert.equal(attempts,1);
 attempts=0;assert.equal((await auditFetch('https://example.test/',{},async()=>{attempts++;return new Response(null,{status:503});},pause)).status,503);assert.equal(attempts,3);
 attempts=0;await assert.rejects(()=>auditFetch('https://example.test/',{},async()=>{attempts++;throw new Error('offline');},pause),/after 3 attempts/);assert.equal(attempts,3);
});
