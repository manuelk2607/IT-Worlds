import test from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { courses, courseChapters, coursePath, courseQuestions, chapterProgressId } from '../src/data/courses.ts';
import { sources, questions } from '../src/data/content.ts';
import { parseProgressChange, isCorrectAnswer } from '../src/lib/progress.ts';
import { matchesQuizFilter } from '../src/lib/quiz-filter.ts';
import {courseCatalogTopic,TYPESETTING_TOPIC_ID,TYPESETTING_TOPIC_PATH} from '../src/data/topic-categories.ts';

test('course chapters are bilingual, sourced, navigable and eligible for progress', () => {
  assert.equal(new Set(courseChapters.map(item => item.id)).size, courseChapters.length);
  for (const course of courses) {
    for (const level of ['einstieg', 'vertiefung', 'profi']) assert(course.chapters.some(chapter => chapter.level === level));
    for (const chapter of course.chapters) {
      assert(chapter.sections.length >= 2 && chapter.questions.length >= 2);
      for (const localized of [chapter.title, ...chapter.goals, chapter.exercise, chapter.solution, ...chapter.sections.flatMap(section => [section.title, ...section.paragraphs])]) {
        assert(localized.de.trim() && localized.en.trim());
        assert.notEqual(localized.de, localized.en);
      }
      for (const source of chapter.sources) assert(sources[source], `${course.id}/${chapter.id}: ${source}`);
      for (const section of chapter.sections) if (section.formula) {
        const html = katex.renderToString(section.formula, { throwOnError: true, trust: false });
        assert(html.includes('<math'), 'Accessible MathML must be generated');
      }
      assert(coursePath(course, chapter).startsWith(`/themen/${course.topic}/`));
      assert(!/TODO|lorem ipsum/i.test(JSON.stringify(chapter)));
    }
  }
  for (const item of courseChapters) assert(parseProgressChange({kind:'lesson',contentId:item.id,completed:true}));
});
test('every course answer can be recorded and is graded against its stable ID', () => {
  for (const question of courseQuestions('de')) {
    const change = parseProgressChange({kind:'question',contentId:question.id,completed:true,selectedOption:question.answer});
    assert(change && isCorrectAnswer(change));
    assert(!isCorrectAnswer({...change,selectedOption:(question.answer+1)%question.options.length}));
    assert.equal(questions.filter(item=>item.id===question.id).length,1);
  }
});
test('typesetting is a separate visible topic while legacy course URLs and progress IDs stay stable',()=>{
 const latex=courses.find(course=>course.id==='latex')!;const typst=courses.find(course=>course.id==='typst')!;
 assert.equal(courseCatalogTopic(latex),TYPESETTING_TOPIC_ID);assert.equal(courseCatalogTopic(typst),TYPESETTING_TOPIC_ID);
 assert.equal(TYPESETTING_TOPIC_PATH,'/textsatz/');
 assert.equal(coursePath(latex),'/themen/programmiersprachen/latex/');
 assert.equal(coursePath(typst),'/themen/programmiersprachen/typst/');
 assert.equal(chapterProgressId(latex,latex.chapters[0]),`latex-${latex.chapters[0].id}`);
});
test('quiz filters combine topic, course, level, chapter and exact question without fallback', () => {
  const items = questions.map(q => ({topic:q.topic,course:q.course,level:q.level,chapter:q.course ? `${q.course}-${q.chapter}` : '',question:q.id}));
  const filter = {topic:'alle',course:'ki',level:'alle',chapter:'ki-transformer',question:''};
  assert.equal(items.filter(item=>matchesQuizFilter(item,filter)).length,2);
  assert.equal(items.filter(item=>matchesQuizFilter(item,{...filter,level:'einstieg'})).length,0);
  assert.equal(items.filter(item=>matchesQuizFilter(item,{...filter,course:'latex'})).length,0);
  assert.equal(items.filter(item=>matchesQuizFilter(item,{...filter,question:'ki-transformer-1'})).length,1);
});
test('worked arithmetic agrees with stated learning examples', () => {
  assert.equal((2-5)*2,-6);
  assert.equal(0.5*(2*1.6+0.3-5)**2,1.125);
  assert.equal(((1-2)**2+(6-4)**2)/2,2.5);
  assert(Math.abs(80/260-0.3076923076923077)<1e-12);
  assert.equal(2*8+8+8*2+2,42);
  assert.equal(Math.floor((32+2-3)/2)+1,16);
  assert.equal(8*3*3*3+8,224);
  assert.equal(Math.sqrt(0.64)*2+Math.sqrt(0.36)*-1,1);
});

test('changing quiz scope removes conflicting descendants and preserves explicit level choices',async()=>{
 const {reconcileQuizFilter}=await import('../src/lib/quiz-filter.ts');
 const catalog=[{id:'ki',topic:'ki-neuronale-netze'},{id:'latex',topic:'programmiersprachen'}];
 const chapters=[{id:'ki-transformer',course:'ki',level:'profi'},{id:'latex-start',course:'latex',level:'einstieg'}];
 const current={topic:'ki-neuronale-netze',course:'ki',level:'profi',chapter:'ki-transformer',question:'ki-transformer-1'};
 assert.deepEqual(reconcileQuizFilter({...current,topic:'programmiersprachen'},'topic',catalog,chapters),{topic:'programmiersprachen',course:'alle',level:'profi',chapter:'alle',question:''});
 assert.equal(reconcileQuizFilter({...current,course:'latex'},'course',catalog,chapters).topic,'programmiersprachen');
 const selected=reconcileQuizFilter({...current,chapter:'latex-start'},'chapter',catalog,chapters);
 assert.equal(selected.course,'latex');assert.equal(selected.level,'einstieg');
 assert.equal(reconcileQuizFilter({...current,level:'einstieg'},'level',catalog,chapters).chapter,'alle');
 assert.equal(reconcileQuizFilter({...current,level:'alle'},'level',catalog,chapters).chapter,'ki-transformer');
});
