import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {linuxCourse} from '../src/data/course-linux.ts';

test('published user systemd lab creates, diagnoses and removes only its own units',{skip:process.env.IT_WORLDS_SYSTEMD_TEST!=='1'},()=>{
 assert.equal(process.platform,'linux','A real Linux user systemd manager is required');
 const ready=spawnSync('systemctl',['--user','show-environment'],{encoding:'utf8',timeout:10000});
 assert.equal(ready.status,0,'Start a logged-in Linux user session with its own user systemd manager');
 const chapter=linuxCourse.chapters.find(chapter=>chapter.id==='dienste')!;
 const sections=chapter.sections.filter(section=>section.language==='Shell'&&section.code);
 assert.equal(sections.length,2);
 for(const section of sections){
  const result=spawnSync('bash',['--noprofile','--norc','-e'],{input:section.code,encoding:'utf8',timeout:30000,env:{...process.env,LC_ALL:'C'}});
  assert.ifError(result.error);assert.equal(result.status,0,result.stdout+'\n'+result.stderr);
  if(section.code!.includes('systemd-run'))assert.match(result.stdout,/IT-Worlds: own user service failure diagnosed/);
 }
});
