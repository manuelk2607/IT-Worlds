import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readdirSync,readFileSync,statSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,basename} from 'node:path';
import {spawnSync} from 'node:child_process';
import {linuxCourse} from '../src/data/course-linux.ts';
const bash=process.env.IT_WORLDS_BASH??'bash';
function execute(code:string,dir:string,syntax=false,owned?:Set<string>){
 const tracker="trap 'if [ -n \"${practice_dir-}\" ]; then printf \"\\nIT_WORLDS_TEST_DIR:%s\\n\" \"$practice_dir\"; fi' EXIT";
 const result=spawnSync(bash,syntax?['--noprofile','--norc','-n']:['--noprofile','--norc'],{input:syntax?code:tracker+'\n'+code,cwd:dir,encoding:'utf8',timeout:5000,env:{...process.env,TMPDIR:dir,BASH_ENV:'',ENV:'',LC_ALL:'C'}});
 assert.ifError(result.error);
 // BSD mktemp can use the OS temp directory instead of the TMPDIR environment.
 const match=result.stdout.match(/\nIT_WORLDS_TEST_DIR:([^\n]+)\n/);
 if(match){const path=match[1]!;assert.ok(path.startsWith(tmpdir()+'/')&&basename(path).startsWith('tmp.'));owned?.add(path);result.stdout=result.stdout.replace(match[0],'');}
 return result;
}
test('published shell labs run in owned temporary paths, preserve quoting and restore actual bytes',{skip:process.platform==='win32'},()=>{
 const dir=mkdtempSync(join(tmpdir(),'it-worlds-shell space-'));
 const owned=new Set<string>();
 try{
  for(const chapter of linuxCourse.chapters)for(const section of chapter.sections){
   if(section.language!=='Shell'||!section.code)continue;
   assert.equal(execute(section.code,dir,true).status,0,`${chapter.id} syntax`);
   // A user systemd manager is a real host prerequisite, not a simulated service.
   if(chapter.id==='dienste')continue;
   const result=execute(section.code,dir,false,owned);assert.equal(result.status,0,`${chapter.id}: ${result.stderr}`);
   if(chapter.id==='shell')assert.equal(result.stdout,'<Learning notes>\n$label\n');
   if(chapter.id==='datenstroeme')assert.deepEqual(result.stdout.trim().split('\n').map(value=>value.trim()),['2','No matching line']);
   if(chapter.id==='prozesse')assert.equal(result.stdout.trim(),'Background job ended with nonzero status');
   if(chapter.id==='wiederherstellung')assert.equal(result.stdout.trim(),'Restore verified');
  }
  assert.equal(owned.size,2);
  const paths=[...owned].flatMap(folder=>readdirSync(folder,{recursive:true,encoding:'utf8'}).map(name=>join(folder,name)));
  const notes=paths.find(path=>path.endsWith('/learning notes.txt'));assert.ok(notes);
  assert.equal(statSync(notes).mode&0o777,0o640);assert.equal(readFileSync(notes,'utf8'),'SQL\n');
  for(const [name,expected]of [['original.txt','Changed\n'],['backup.txt','SQL\n'],['restored.txt','SQL\n']]as const){
   const path=paths.find(path=>path.endsWith('/'+name));assert.ok(path,name);assert.equal(readFileSync(path,'utf8'),expected);
  }
 }finally{for(const path of owned)rmSync(path,{recursive:true,force:true});rmSync(dir,{recursive:true,force:true});}
});
test('the published restore lab reports failure when its own backup bytes are damaged',{skip:process.platform==='win32'},()=>{
 const dir=mkdtempSync(join(tmpdir(),'it-worlds-bad-restore-'));
 const owned=new Set<string>();
 try{
  const source=linuxCourse.chapters.find(chapter=>chapter.id==='wiederherstellung')!.sections.find(section=>section.language==='Shell')!.code!;
  const damaged=source.replace('cp "$practice_dir/backup.txt"',`printf 'Damaged\\n' > "$practice_dir/backup.txt"\ncp "$practice_dir/backup.txt"`);
  assert.notEqual(damaged,source);
  const result=execute(damaged,dir,false,owned);assert.equal(result.status,1);assert.match(result.stderr,/Restore failed/);assert.doesNotMatch(result.stdout,/Restore verified/);
 }finally{for(const path of owned)rmSync(path,{recursive:true,force:true});rmSync(dir,{recursive:true,force:true});}
});
