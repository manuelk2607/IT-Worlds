import test from 'node:test';
import assert from 'node:assert/strict';
import {guidedLearningPaths} from '../src/data/learning-paths.ts';
import {courseChapters} from '../src/data/courses.ts';
import {parseProgressChange} from '../src/lib/progress.ts';
test('guided routes contain real sequenced chapters, explicit outcomes and shared progress IDs',()=>{
 const de=guidedLearningPaths('de'),en=guidedLearningPaths('en');
 assert.deepEqual(de.map(path=>path.id),['erste-website','apis-und-daten','systeme-entwerfen']);
 for(const [index,path]of de.entries()){
  assert(path.outcome&&path.prerequisites&&path.steps.length>=10);
  assert.notEqual(path.outcome,en[index]!.outcome);
  assert.equal(new Set(path.steps.map(step=>step.contentId)).size,path.steps.length);
  assert(new Set(path.steps.map(step=>step.topic)).size>=2);
  for(const [position,step]of path.steps.entries()){
   assert(step.available&&step.note&&step.href&&step.contentId);
   const entry=courseChapters.find(entry=>entry.id===step.contentId);assert(entry);
   assert.equal(step.href,entry.url);assert.equal(step.title,entry.chapter.title.de);
   assert.equal(en[index]!.steps[position]!.title,entry.chapter.title.en);
   assert.notEqual(step.note,en[index]!.steps[position]!.note);
   assert(parseProgressChange({kind:'lesson',contentId:step.contentId,completed:true}));
  }
 }
 const web=de[0]!.steps.map(step=>step.contentId);
 assert(web.indexOf('typescript-asynchron')<web.indexOf('web-fehlerzustaende'));
 assert(web.indexOf('typescript-funktionen')<web.indexOf('web-dom'));
 const api=de[1]!.steps.map(step=>step.contentId);
 assert(api.indexOf('datenbanken-parameter')<api.indexOf('apis-client'));
 assert(api.indexOf('apis-rechte')<api.indexOf('apis-abschluss'));
});

test('route continuation uses shared chapter identity, respects sequence and ignores unrelated completions',async()=>{
 const {routeProgress}=await import('../src/lib/learning-route.ts');
 const steps=[{id:'a',url:'/a/',title:'A'},{id:'b',url:'/b/',title:'B'},{id:'c',url:'/c/',title:'C'}];
 assert.equal(routeProgress(steps,new Set()).next?.id,'a');
 const state=routeProgress(steps,new Set(['a','c','unrelated']));
 assert.deepEqual([state.completed,state.total,state.next?.id],[2,3,'b']);
 assert.equal(routeProgress(steps,new Set(['a','b','c'])).next,undefined);
 assert.deepEqual(routeProgress([],new Set(['unrelated'])),{completed:0,total:0,next:undefined});
});
