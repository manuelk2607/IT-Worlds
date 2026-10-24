import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {pythonCourse} from '../src/data/course-python.ts';
const python=process.env.IT_WORLDS_PYTHON??'python3';
test('published Python listings run, reject bad data and preserve input files',()=>{
 const directory=mkdtempSync(join(tmpdir(),'it-worlds-python-'));
 const run=(args:string[])=>{const result=spawnSync(python,args,{cwd:directory,encoding:'utf8',timeout:10000});assert.ifError(result.error);return result;};
 try{
  assert.equal(run(['-c','import sys; assert sys.version_info >= (3,12)']).status,0,'Python 3.12+ is required for the published examples');
  writeFileSync(join(directory,'lessons.json'),'["Python", "SQL"]');
  for(const chapter of pythonCourse.chapters)for(const section of chapter.sections){
   if(section.language!=='Python'||!section.code)continue;
   const filename=`${chapter.id}.py`;writeFileSync(join(directory,filename),section.code);
   assert.equal(run(['-m','py_compile',filename]).status,0,`Syntax: ${filename}`);
   if(chapter.id==='abschluss')continue;
   const result=run([filename]);assert.equal(result.status,0,result.stderr);
   const expected:Record<string,string>={werte:'Total: 750 cents\n3.5 3\n123',kontrollfluss:'12',sammlungen:'API 1\nPython 2',funktionen:'2',dateien:"['Python', 'SQL']"};
   if(expected[chapter.id])assert.equal(result.stdout.trim(),expected[chapter.id]);
   if(chapter.id==='tests')assert.match(result.stderr,/Ran 3 tests/);
  }
  const input='[{"topic":"Python","minutes":25},{"topic":"SQL","minutes":15}]';writeFileSync(join(directory,'sessions.json'),input);
  assert.equal(run(['abschluss.py','sessions.json']).stdout.trim(),'40 minutes');
  assert.equal(readFileSync(join(directory,'sessions.json'),'utf8'),input);
  assert.equal(run(['abschluss.py','--help']).status,0);
  assert.equal(run(['abschluss.py','missing.json']).status,2);
  for(const input of ['{','{}','[true]','[{"topic":"Python","minutes":true}]','[{"topic":" ","minutes":1}]','[{"topic":"Python","minutes":-1}]','[{"topic":"Python","minutes":1441}]']){
   writeFileSync(join(directory,'bad.json'),input);assert.equal(run(['abschluss.py','bad.json']).status,2,input);
  }
  writeFileSync(join(directory,'invalid.json'),Buffer.from([0xff]));assert.equal(run(['abschluss.py','invalid.json']).status,2);
  const check=run(['-c',String.raw`
from abschluss import total_minutes
from funktionen import full_hours
from dateien import load_topics
from pathlib import Path
assert total_minutes([]) == 0
assert total_minutes([{'topic':'X','minutes':1440,'ignored':True}]) == 1440
assert [full_hours(x) for x in [0,59,60,125]] == [0,0,1,2]
for bad in [True, -1, 1.5, '60', None]:
    try: full_hours(bad)
    except ValueError: pass
    else: raise AssertionError(bad)
Path('empty.json').write_text('[]', encoding='utf-8')
assert load_topics(Path('empty.json')) == []
Path('names.json').write_text('[" Python ","SQL"]', encoding='utf-8')
assert load_topics(Path('names.json')) == ['Python','SQL']
`]);assert.equal(check.status,0,check.stderr);
 }finally{rmSync(directory,{recursive:true,force:true});}
});
