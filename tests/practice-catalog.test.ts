import test from 'node:test';
import assert from 'node:assert/strict';
import {practiceItems} from '../src/data/practice-catalog.ts';
import {courses,courseChapters} from '../src/data/courses.ts';
import {practiceProjects} from '../src/data/practice-projects.ts';
import {courseCatalogTopic,TYPESETTING_TOPIC_ID} from '../src/data/topic-categories.ts';
import {normalizeSearch} from '../src/lib/search.ts';
import {emptyPracticeSelection,readPracticeSelection,matchesPractice,practiceSelectionUrl,type PracticeMetadata} from '../src/lib/practice-catalog.ts';
const indexed:PracticeMetadata[]=practiceItems.map(item=>({...item,text:normalizeSearch(`${item.title.de} ${item.task.de} ${item.context.de}`)}));

test('practice catalogue exposes every existing chapter task once with its stable solution anchor',()=>{
 assert.equal(new Set(practiceItems.map(item=>item.id)).size,practiceItems.length);
 assert.equal(practiceItems.filter(item=>item.id.startsWith('chapter-')).length,courseChapters.length);
 for(const entry of courseChapters){
  const item=practiceItems.find(item=>item.id===`chapter-${entry.id}`)!;
  assert(item,entry.id);assert.equal(item.href,`${entry.url}#aufgabe`);
  assert.equal(item.task,entry.chapter.exercise);assert.equal(item.title,entry.chapter.title);
  assert.deepEqual(item.courses,[entry.course.id]);assert.deepEqual(item.topics,[courseCatalogTopic(entry.course)]);
 }
 for(const item of practiceItems){assert.match(item.href,/^\/(?!\/)/);assert(item.task.de&&item.task.en);assert(item.courses.every(id=>courses.some(course=>course.id===id)));}
});
test('shared projects remain discoverable through each associated course and topic',()=>{
 for(const project of practiceProjects){
  const item=indexed.find(item=>item.id===`project-${project.id}`)!;assert(item);
  for(const course of project.courses){assert(matchesPractice(item,{...emptyPracticeSelection(),course,kind:'project'}));}
  for(const topic of item.topics){assert(matchesPractice(item,{...emptyPracticeSelection(),topic,kind:'project'}));}
 }
 const rust=indexed.filter(item=>matchesPractice(item,{...emptyPracticeSelection(),course:'rust',kind:'chapter'}));
 const documents=indexed.filter(item=>matchesPractice(item,{...emptyPracticeSelection(),kind:'document'}));
 assert.equal(documents.length,30);assert(documents.every(item=>item.courses.every(id=>['typst','latex'].includes(id))));
 assert.equal(rust.length,6);assert(rust.every(item=>item.id.startsWith('chapter-rust-')));
 assert.equal(indexed.filter(item=>matchesPractice(item,{...emptyPracticeSelection(),course:'rust',kind:'editor'})).length,0);
});
test('practice filters combine terms and scopes while rejecting unknown or conflicting URL state',()=>{
 const value=readPracticeSelection(new URLSearchParams('kurs=rust&format=chapter&stufe=vertiefung&suche=RESULT%20FEHLERPFADE'),indexed);
 const matching=indexed.filter(item=>matchesPractice(item,value));assert(matching.length>0);assert(matching.every(item=>item.courses.includes('rust')&&item.level==='vertiefung'));
 assert.equal(readPracticeSelection(new URLSearchParams({thema:TYPESETTING_TOPIC_ID,kurs:'java'}),indexed).course,'alle');
 assert.deepEqual(readPracticeSelection(new URLSearchParams('thema=invalid&kurs=invalid&stufe=invalid&format=invalid'),indexed),emptyPracticeSelection());
 assert.equal(readPracticeSelection(new URLSearchParams({suche:'x'.repeat(101)}),indexed).search.length,100);
 const item={...indexed[0]!,text:normalizeSearch('Änderung NULL Referenz')};
 assert(matchesPractice(item,{...emptyPracticeSelection(),search:'null ANDERUNG'}));
 assert(!matchesPractice(item,{...emptyPracticeSelection(),search:'null fehlt'}));
});
test('practice URL round trips preserve unrelated parameters, locale and anchors; reset removes filter state',()=>{
 const url=new URL('https://example.test/en/uebungen/?keep=1#aufgaben');
 const value={search:'Borrowing',topic:'programmiersprachen',course:'rust',level:'vertiefung',kind:'chapter'};
 const updated=practiceSelectionUrl(url,value);assert.equal(updated.pathname,url.pathname);assert.equal(updated.hash,url.hash);assert.equal(updated.searchParams.get('keep'),'1');
 assert.deepEqual(readPracticeSelection(updated.searchParams,indexed),value);
 assert.equal(practiceSelectionUrl(updated,emptyPracticeSelection()).href,url.href);
 assert.equal(url.search,'?keep=1');
});
