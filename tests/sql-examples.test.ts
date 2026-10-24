import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync,spawn} from 'node:child_process';
import {randomUUID} from 'node:crypto';
import {databaseCourse} from '../src/data/course-databases.ts';
const enabled=process.env.IT_WORLDS_SQL_TEST==='1';
const psql=process.env.IT_WORLDS_PSQL??'psql';
const args=['-X','-q','-A','-t','-v','ON_ERROR_STOP=1','-v','VERBOSITY=sqlstate','-P','pager=off'];
function guard(){
 assert.equal(process.env.PGDATABASE,'it_worlds_examples_test','Use a separate empty practice database');
 assert.equal(process.env.PGUSER,'it_worlds_test');assert.ok(process.env.PGPORT);
 assert.ok(['localhost','127.0.0.1'].includes(process.env.PGHOST??'')||/^\/private\/tmp\/it-worlds-postgres\.[A-Za-z0-9]+$/.test(process.env.PGHOST??''),'Only a local test database is allowed');
}
function run(code:string){
 const result=spawnSync(psql,args,{input:code,encoding:'utf8',timeout:20000,env:{...process.env,PGCONNECT_TIMEOUT:'5'}});
 assert.ifError(result.error);return result;
}
function succeed(code:string){const result=run(code);assert.equal(result.status,0,result.stderr);return result.stdout.trim().split('\n').filter(Boolean);}
function listing(id:string){const code=databaseCourse.chapters.find(chapter=>chapter.id===id)?.sections.find(section=>section.language==='SQL')?.code;assert.ok(code,id);return code;}
test('all published PostgreSQL listings produce their documented results',{skip:enabled?false:'Set IT_WORLDS_SQL_TEST=1 for a separate local PostgreSQL 18 database'},()=>{
 guard();const version=Number(succeed('SHOW server_version_num;')[0]);assert.ok(version>=180000&&version<190000,'PostgreSQL 18 required');
 assert.deepEqual(succeed(listing('modell')),['1|SQL|45','2|HTTP|30']);
 assert.deepEqual(succeed(listing('abfragen')),['2|HTTP','3|Draft','3']);
 assert.deepEqual(succeed(listing('beziehungen')),['SQL|Ada','SQL|Lin','HTTP|']);
 assert.deepEqual(succeed(listing('auswerten')).map(row=>row.replace(/60\.0+/g,'60')),['1|2|60','1|40|60','2|80|60','3|60|60']);
 assert.deepEqual(succeed(listing('transaktionen')),['1','2'],'ROLLBACK restores the original capacity');
 assert.deepEqual(succeed(listing('parameter')),['1'],'The injection-shaped value is data, not another predicate');
 const plans=succeed(listing('plaene'));
 assert.equal(plans.filter(line=>line==='9000|Course 9000').length,2,'Data results must be visible separately from their plans');
 assert.equal(plans.filter(line=>line.startsWith('Execution Time:')).length,2);
 assert.deepEqual(succeed(listing('abschluss')),['2']);
 assert.deepEqual(succeed(listing('abschluss')+"\nINSERT INTO courses(id,title) VALUES(3,'CSS'); SELECT published FROM courses WHERE id=3;"),['2','f'],'New rows use the migrated default');
});
test('published SQL constraints and NULL handling reject invalid cases',{skip:!enabled},()=>{
 guard();
 const failures:[string,string,string][]=[
  ['modell',"INSERT INTO courses VALUES(1,'Duplicate',10);",'23505'],
  ['modell',"INSERT INTO courses VALUES(3,NULL,10);",'23502'],
  ['modell',"INSERT INTO courses VALUES(3,'Bad',0);",'23514'],
  ['beziehungen',"INSERT INTO enrolments VALUES(12,999,'Unmatched');",'23503'],
  ['beziehungen',"INSERT INTO enrolments VALUES(12,NULL,'Missing');",'23502'],
  ['abschluss',"INSERT INTO courses VALUES(3,'Missing',NULL);",'23502'],
 ];
 for(const [id,sql,state]of failures){const result=run(listing(id)+'\n'+sql);assert.notEqual(result.status,0);assert.ok(result.stderr.includes(state),`${id}: expected SQLSTATE ${state}`);}
 assert.deepEqual(succeed(listing('abfragen')+'\nSELECT count(*) FROM courses WHERE minutes=NULL; SELECT id FROM courses WHERE minutes<40;'),['2|HTTP','3|Draft','3','0','2']);
});
test('the published guarded UPDATE claims one remaining place across independent sessions',{skip:!enabled},async()=>{
 guard();const name='it_worlds_test_capacity_'+randomUUID().replaceAll('-','');
 const update=listing('transaktionen').match(/UPDATE capacity[\s\S]*?RETURNING remaining;/)?.[0];assert.ok(update);
 succeed(`CREATE TABLE ${name}(id integer PRIMARY KEY,remaining integer CHECK(remaining>=0)); INSERT INTO ${name} VALUES(1,1);`);
 const claim=()=>new Promise<string[]>((resolve,reject)=>{
  const child=spawn(psql,args,{env:{...process.env,PGCONNECT_TIMEOUT:'5'},timeout:15000});let output='',error='';
  child.stdout.on('data',(data:Buffer)=>{output+=data.toString();});child.stderr.on('data',(data:Buffer)=>{error+=data.toString();});
  child.on('error',reject);child.on('close',code=>{if(code!==0)reject(new Error(`Local SQL claim failed (${code}): ${error}`));else resolve(output.trim().split('\n').filter(Boolean));});
  child.stdin.end(`BEGIN; ${update.replace('UPDATE capacity',`UPDATE ${name}`)} SELECT pg_sleep(0.05); COMMIT;`);
 });
 try{
  const attempts=await Promise.all([claim(),claim()]);
  assert.equal(attempts.flat().filter(value=>value==='0').length,1,'Exactly one session claims the last place');
  assert.deepEqual(succeed(`SELECT remaining FROM ${name};`),['0']);
 }finally{succeed(`DROP TABLE ${name};`);}
});
