import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProgressChange, isCorrectAnswer } from '../src/lib/progress.ts';

test('only available lessons and known questions can become progress', () => {
  assert.equal(parseProgressChange({kind:'lesson',contentId:'planned-future-lesson',completed:true}),null);
  assert.equal(parseProgressChange({kind:'question',contentId:'unknown',completed:true}),null);
  assert.equal(parseProgressChange({kind:'lesson',contentId:'datenbanken',completed:'true'}),null);
  assert.ok(parseProgressChange({kind:'lesson',contentId:'datenbanken',completed:true}));
});
test('answers are validated and evaluated on the server', () => {
  assert.equal(parseProgressChange({kind:'question',contentId:'python-division',completed:true,selectedOption:9}),null);
  const correct=parseProgressChange({kind:'question',contentId:'python-division',completed:true,selectedOption:0});
  assert.ok(correct);
  assert.equal(isCorrectAnswer(correct),true);
  assert.equal(isCorrectAnswer({...correct,selectedOption:2}),false);
  assert.equal(isCorrectAnswer({...correct,selectedOption:undefined}),false);
});
