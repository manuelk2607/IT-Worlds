import '../public/projekte/lernplan/project.test.ts';
import '../public/projekte/netzplan/project.test.ts';
import '../public/projekte/cpu/project.test.ts';
import '../public/projekte/integritaet/project.test.ts';
import test from 'node:test';import assert from 'node:assert/strict';import{spawnSync}from'node:child_process';import{mkdtempSync,writeFileSync,rmSync}from'node:fs';import{tmpdir}from'node:os';import{join}from'node:path';import{fileURLToPath}from'node:url';
import{projectGuides}from'../src/data/project-guides.ts';import{projectMilestones}from'../src/data/project-milestones.ts';import{courses}from'../src/data/courses.ts';
test('downloaded practice CLIs execute actual fixtures and reject malformed or oversized input',()=>{
 const root=mkdtempSync(join(tmpdir(),'it-worlds-project-cli-'));
 try{const broken=join(root,'broken.json'),large=join(root,'large.json');writeFileSync(broken,'{');writeFileSync(large,'x'.repeat(65537));
  for(const id of ['lernplan','netzplan','cpu']){
   const folder=fileURLToPath(new URL(`../public/projekte/${id}/`,import.meta.url));
   const run=(args:string[])=>spawnSync(process.execPath,['--experimental-strip-types',join(folder,'cli.ts'),...args],{cwd:folder,encoding:'utf8',timeout:10000});
   const good=run(['sample.json']);assert.equal(good.status,0,good.stderr);const value=JSON.parse(good.stdout);
   if(id==='lernplan')assert.deepEqual([value.minutes,value.completedMinutes,value.completionPercent],[90,45,50]);
   if(id==='netzplan')assert.deepEqual(value.map((n:{network:string})=>n.network),['192.0.2.16','198.51.100.0']);
   if(id==='cpu')assert.deepEqual([value.output,value.steps],[[5],4]);
   for(const args of [[],[broken],[large],['sample.json','extra']]){const bad=run(args);assert.equal(bad.status,2,`${id}: ${bad.stderr}`);assert.equal(bad.stdout,'');}
  }
  const folder=fileURLToPath(new URL('../public/projekte/integritaet/',import.meta.url)),cli=join(folder,'cli.ts'),fixture=join(folder,'fixtures');
  const run=(args:string[])=>spawnSync(process.execPath,['--experimental-strip-types',cli,...args],{encoding:'utf8',timeout:10000});
  const initial=run(['create',fixture]);assert.equal(initial.status,0,initial.stderr);const manifest=join(root,'baseline.json');writeFileSync(manifest,initial.stdout);assert.equal(run(['verify',fixture,manifest]).status,0);
  const changed=JSON.parse(initial.stdout);changed[0].sha256='0'.repeat(64);writeFileSync(manifest,JSON.stringify(changed));const mismatch=run(['verify',fixture,manifest]);assert.equal(mismatch.status,1);assert.deepEqual(JSON.parse(mismatch.stdout).changed,['a.txt']);assert.equal(run(['verify',fixture,broken]).status,2);
 }finally{rmSync(root,{recursive:true,force:true});}
});
test('each project has a complete sequenced guide, stable checklist, real course links and all source files',()=>{
 for(const project of projectGuides){assert(project.goals.length>=3);assert(project.prerequisites.de&&project.prerequisites.en&&project.result.de&&project.result.en);assert.equal(project.steps.length,4);assert.equal(new Set(project.steps.map(step=>step.id)).size,4);assert(project.steps.every(step=>step.paragraphs.every(p=>p.de&&p.en)));assert.deepEqual(projectMilestones[project.id]!.map(s=>s.id),project.steps.map(s=>s.id));assert(project.courses.every(id=>courses.some(course=>course.id===id)));assert(project.files.includes('project.test.ts'));}
});
