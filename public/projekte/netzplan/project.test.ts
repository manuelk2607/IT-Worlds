import test from 'node:test';import assert from 'node:assert/strict';import{network,plan}from'./core.ts';
test('IPv4 range calculations include /0, /31, /32 and upper address boundary',()=>{
 const v=network('lab','192.0.2.17/28');assert.deepEqual([v.network,v.last,v.addresses],['192.0.2.16','192.0.2.31',16]);
 assert.equal(network('all','0.0.0.0/0').addresses,4294967296);assert.equal(network('all','0.0.0.0/0').last,'255.255.255.255');
 assert.equal(network('pair','198.51.100.0/31').addresses,2);assert.equal(network('single','255.255.255.255/32').last,'255.255.255.255');
 for(const input of ['192.0.2.1/33','192.0.2.1/-1','192.0.2.256/24','192.00.2.1/24','192.0.2.1/024','::1/128'])assert.throws(()=>network('invalid',input));
});
test('overlapping, nested and duplicate plans fail; adjacent ranges remain separate',()=>{
 assert.equal(plan([{name:'a',cidr:'192.0.2.0/28'},{name:'b',cidr:'192.0.2.16/28'}]).length,2);
 for(const cidr of ['192.0.2.0/28','192.0.2.8/29','192.0.2.0/24'])assert.throws(()=>plan([{name:'a',cidr:'192.0.2.0/28'},{name:'b',cidr}]));
 assert.throws(()=>plan([{name:'a',cidr:'192.0.2.0/28'},{name:'a',cidr:'192.0.2.16/28'}]));assert.throws(()=>plan([]));
});
