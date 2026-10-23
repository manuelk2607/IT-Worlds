import test from 'node:test';
import assert from 'node:assert/strict';
import * as de from '../src/data/content.ts';
import * as en from '../src/data/content.en.ts';
import { switchLocalePath } from '../src/lib/locale.ts';
import { courseChapters } from '../src/data/courses.ts';

test('language versions share content IDs, quiz solutions and availability', () => {
  assert.deepEqual(en.topics.map(topic=>topic.id),de.topics.map(topic=>topic.id));
  assert.deepEqual(en.questions.map(q=>[q.id,q.topic,q.answer,q.source]),de.questions.map(q=>[q.id,q.topic,q.answer,q.source]));
  assert.deepEqual(Object.keys(en.sources),Object.keys(de.sources));
  assert.deepEqual(en.paths.map(path=>path.steps.map(step=>[step.topic,step.available])),de.paths.map(path=>path.steps.map(step=>[step.topic,step.available])));
  for(const path of en.paths)for(const step of path.steps)if(step.available)assert.equal(step.title,step.contentId ? courseChapters.find(item=>item.id===step.contentId)?.chapter.title.en : en.topics.find(topic=>topic.id===step.topic)?.lesson?.title);
});
test('English lessons and quiz explanations are translated without changing source metadata', () => {
  for(const [index,topic] of en.topics.entries()){
    assert.notEqual(topic.short,de.topics[index].short);
    if(topic.lesson)assert.notEqual(topic.lesson.paragraphs[0],de.topics[index].lesson?.paragraphs[0]);
  }
  for(const [index,question] of en.questions.entries()) {
    assert.notEqual(question.prompt,de.questions[index].prompt);
    for(const [optionIndex,option]of question.options.entries()) {
      if(option.explanation === de.questions[index].options[optionIndex].explanation) assert.match(option.explanation,/^(?:[\d\W]+|max\([\d\W]+\)[\d\W]+|floor\([\d\W]+\)[\d\W]+)$/u, 'Only language-neutral arithmetic may be shared');
    }
  }
  for(const id of Object.keys(de.sources) as de.SourceId[])assert.deepEqual([en.sources[id].url,en.sources[id].reviewedAt],[de.sources[id].url,de.sources[id].reviewedAt]);
});
test('language switch retains the corresponding page route', () => {
  for(const route of ['/','/themen/programmiersprachen/','/quiz/','/fortschritt/'])assert.equal(switchLocalePath(switchLocalePath(route)),route);
});
