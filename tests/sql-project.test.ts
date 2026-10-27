import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const enabled=process.env.IT_WORLDS_SQL_TEST==='1';
test('SQL capstone runs actual constraints, NULL aggregates, ties and savepoint restoration',{skip:enabled?false:'Enable with the existing separate PostgreSQL 18 test database'},()=>{
 const container=process.env.IT_WORLDS_SQL_CONTAINER;
 if(container)assert.match(container,/^it-worlds-capstone-test-[a-z0-9-]+$/);
 else{assert.equal(process.env.PGDATABASE,'it_worlds_examples_test');assert.equal(process.env.PGUSER,'it_worlds_test');assert(['localhost','127.0.0.1'].includes(process.env.PGHOST??''));}
 const source=(name:string)=>readFileSync(new URL(`../public/projekte/lernbericht/${name}`,import.meta.url),'utf8');
 const sql=source('test.sql').replace('\\ir schema.sql',()=>source('schema.sql')).replace('\\ir queries.sql',()=>source('queries.sql'));
 const args=['-X','-q','-A','-t','-v','ON_ERROR_STOP=1'];
 const result=spawnSync(container?'docker':process.env.IT_WORLDS_PSQL??'psql',container?['exec','-i',container,'psql','-U','it_worlds_test','-d','it_worlds_examples_test',...args]:args,{input:sql,encoding:'utf8',timeout:15000,env:{...process.env,PGCONNECT_TIMEOUT:'5'}});
 assert.ifError(result.error);assert.equal(result.status,0,result.stderr);assert(result.stdout.includes('SQL project passed; its transaction was rolled back.'));
});
