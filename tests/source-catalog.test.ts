import test from 'node:test';
import assert from 'node:assert/strict';
import {sources,topics} from '../src/data/content.ts';
import {courses} from '../src/data/courses.ts';
import {exercises} from '../src/data/exercises.ts';
import {sourceTopicIndex,sourcePublishers} from '../src/lib/source-usage.ts';
import {matchesSource,readSourceSelection,sourceSelectionUrl,emptySourceSelection} from '../src/lib/source-catalog.ts';
import {courseCatalogTopic,TYPESETTING_TOPIC_ID} from '../src/data/topic-categories.ts';
import {exerciseCatalogTopic} from '../src/lib/exercise-catalog.ts';
test('source topic membership follows actual course, question and exercise references without duplicates',()=>{
  const index=sourceTopicIndex();
  assert.deepEqual(Object.keys(index).sort(),Object.keys(sources).sort());
  for(const ids of Object.values(index)){assert.equal(new Set(ids).size,ids.length);assert(ids.every(id=>id===TYPESETTING_TOPIC_ID||topics.some(topic=>topic.id===id)));}
  for(const course of courses)for(const chapter of course.chapters)for(const id of [...chapter.sources,...chapter.questions.map(item=>item.source)])assert(index[id].includes(courseCatalogTopic(course)));
  for(const exercise of exercises)for(const id of exercise.sources)assert(index[id].includes(exerciseCatalogTopic(exercise)));
  assert(index.typst.includes(TYPESETTING_TOPIC_ID));assert(index.latex.includes(TYPESETTING_TOPIC_ID));
  assert(index.exerciseCount.includes('datenbanken'));assert(index.exerciseLabels.includes('website-bauen'));
});
test('source filters combine words, metadata, real topic usage and publisher without losing URL state',()=>{
  const selection=readSourceSelection(new URLSearchParams('thema=programmiersprachen&herausgeber=Python+Software+Foundation&suche=sum+3.12'),topics.map(item=>item.id),sourcePublishers);
  const source=sources.pythonBuiltins;
  assert(matchesSource(`${source.title} ${source.section} ${source.version}`,sourceTopicIndex().pythonBuiltins,source.publisher,selection));
  assert(!matchesSource(source.title,['datenbanken'],source.publisher,selection));
  assert(!matchesSource(source.title,['programmiersprachen'],'other',selection));
  assert.deepEqual(readSourceSelection(new URLSearchParams('thema=unknown&herausgeber=unknown'),[],[]),emptySourceSelection());
  const url=sourceSelectionUrl(new URL('https://example.com/en/quellen/?keep=1#verzeichnis'),selection);
  assert.equal(url.hash,'#verzeichnis');assert.equal(url.searchParams.get('keep'),'1');
  assert.deepEqual(readSourceSelection(url.searchParams,topics.map(item=>item.id),sourcePublishers),selection);
  assert.equal(sourceSelectionUrl(url,emptySourceSelection()).search,'?keep=1');
  assert.equal(matchesSource('ATX-Überschriften',[],source.publisher,{...emptySourceSelection(),search:'atx uberschriften'}),true);
  const typesetting=readSourceSelection(new URLSearchParams(`thema=${TYPESETTING_TOPIC_ID}`),[...topics.map(item=>item.id),TYPESETTING_TOPIC_ID],sourcePublishers);
  assert.equal(typesetting.topic,TYPESETTING_TOPIC_ID);
  assert(matchesSource(sources.typst.title,sourceTopicIndex().typst,sources.typst.publisher,typesetting));
});
