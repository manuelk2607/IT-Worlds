import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {checkDeployment,deploymentBase} from './check.ts';
import {createDemoServer,type Fault} from './demo.ts';
async function fixture<T>(fault:Fault,run:(base:string)=>Promise<T>):Promise<T>{
 const server=createDemoServer(fault);server.listen(0,'127.0.0.1');await once(server,'listening');
 const address=server.address();assert(address&&typeof address!=='string');
 try{return await run(`http://127.0.0.1:${address.port}/`);}finally{server.close();server.closeAllConnections();await once(server,'close');}
}
test('real HTTP release project verifies the complete read-only contract',async()=>{
 const results=await fixture('none',base=>checkDeployment(base));assert.equal(results.length,4);assert(results.every(item=>item.ok));
});
test('release project detects wrong status, type, HTML, JSON schema, soft 404, redirect and body limit',async()=>{
 for(const fault of ['status','type','content','schema','missing','redirect','oversize']as const){
  const results=await fixture(fault,base=>checkDeployment(base));assert(results.some(item=>!item.ok),fault);assert(results.some(item=>item.ok),fault);
 }
});
test('release project enforces a real network timeout and rejects unsafe configuration',async()=>{
 const results=await fixture('slow',base=>checkDeployment(base,{timeoutMs:50}));assert.equal(results[0]?.ok,false);assert.equal(results[1]?.ok,true);
 for(const value of ['https://user:password@example.invalid/','http://example.invalid/','https://example.invalid/?token=secret','file:///tmp/a','https://example.invalid/#token'])assert.throws(()=>deploymentBase(value));
 assert.equal(deploymentBase('http://127.0.0.1:8810/sub').pathname,'/sub/');
 await assert.rejects(()=>checkDeployment('http://localhost/',{timeoutMs:0}));
});
