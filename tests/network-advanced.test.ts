import test from 'node:test';import assert from 'node:assert/strict';import{mkdtempSync,writeFileSync,rmSync}from'node:fs';import{join}from'node:path';import{tmpdir}from'node:os';import{execFileSync}from'node:child_process';
import{networkExtensions}from'../src/data/course-network-advanced.ts';
test('IPv6 and route examples reject malformed input and respect prefix boundaries',()=>{
 const directory=mkdtempSync(join(tmpdir(),'it-worlds-net-advanced-'));
 try{writeFileSync(join(directory,'package.json'),'{"type":"module"}');
  for(const chapter of networkExtensions){const code=chapter.sections.find(section=>section.code)!.code!;
   const extra=chapter.id==='ipv6'?String.raw`
assert.deepEqual(expandIPv6('::'),Array(8).fill(0));assert.deepEqual(expandIPv6('::1'),[0,0,0,0,0,0,0,1]);
assert.deepEqual(expandIPv6('2001:0DB8:0:0:0:0:0:1'),expandIPv6('2001:db8::1'));
assert.deepEqual(expandIPv6('1:2:3:4:5:6:7::'),[1,2,3,4,5,6,7,0]);
for(const input of ['',':',':::','1::2::3','1:2:3:4:5:6:7:8::','1:2:3:4:5:6:7','1:2:3:4:5:6:7:8:9','10000::','gg::','::ffff:192.0.2.1','fe80::1%eth0','[::1]'])assert.throws(()=>expandIPv6(input),input);
`:String.raw`
const before=JSON.stringify(routes);
assert.equal(routeTo('192.0.2.127',routes)?.via,'documentation-net');assert.equal(routeTo('192.0.2.128',routes)?.via,'more-specific');
assert.equal(routeTo('192.0.2.130',[...routes].reverse())?.via,'more-specific');assert.equal(JSON.stringify(routes),before);
assert.equal(routeTo('192.0.2.1',[]),undefined);
assert.equal(routeTo('255.255.255.255',[{network:'255.255.255.255',prefix:32,via:'host'}])?.via,'host');
assert.equal(ipv4Number('0.0.0.0'),0);assert.equal(ipv4Number('255.255.255.255'),4294967295);
for(const input of ['1.2.3','01.2.3.4','256.0.0.1','-1.2.3.4','1..2.3','1.2.3.4.5'])assert.throws(()=>routeTo(input,routes));
for(const prefix of [-1,33,0.5,NaN,Infinity])assert.throws(()=>routeTo('192.0.2.1',[{network:'0.0.0.0',prefix,via:'x'}]));
assert.throws(()=>routeTo('192.0.2.1',[{network:'192.0.2.1',prefix:24,via:'x'}]));
assert.throws(()=>routeTo('192.0.2.1',[routes[0]!,routes[0]!]));
`;
   const path=join(directory,chapter.id+'.ts');writeFileSync(path,"import assert from 'node:assert/strict';\n"+code+'\n'+extra);
   const output=execFileSync(process.execPath,['--experimental-strip-types',path],{encoding:'utf8',timeout:10000});assert.equal(output.trim(),chapter.id==='ipv6'?'2001:db8:0:0:0:0:0:1':'more-specific\ndefault');
  }
 }finally{rmSync(directory,{recursive:true,force:true});}
});
