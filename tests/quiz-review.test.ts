import test from 'node:test';
import assert from 'node:assert/strict';
import {quizReview,reviewQuestionIds,matchesReview,type QuizReview} from '../src/lib/quiz-review.ts';
import type {ProgressItem} from '../src/lib/progress.ts';
const item=(contentId:string,completed:boolean,solved:boolean,kind:ProgressItem['kind']='question'):ProgressItem=>({contentId,completed,solved,kind,updatedAt:'2026-10-24T09:00:00Z'});
test('personal quiz pools use the latest saved question state and ignore lesson marks',()=>{
 const items=[item('correct',true,true),item('repeat',true,false),item('unmarked',false,true),item('same-id',true,true,'lesson')];
 const ids=['correct','repeat','unmarked','same-id','unseen'];
 const select=(review:QuizReview)=>{const snapshot=reviewQuestionIds(items,review);return ids.filter(id=>matchesReview(id,review,snapshot));};
 assert.deepEqual(select('alle'),ids);
 assert.deepEqual(select('offen'),['unmarked','same-id','unseen']);
 assert.deepEqual(select('wiederholen'),['repeat']);
 assert.deepEqual(select('richtig'),['correct']);
 assert.deepEqual(['offen','wiederholen','richtig','other','',null].map(quizReview),['offen','wiederholen','richtig','alle','alle','alle']);
});
test('a saved answer cannot mutate the snapshot of a running round',()=>{
 const items=[item('question',true,false)];const ids=reviewQuestionIds(items,'wiederholen');
 items[0]=item('question',true,true);
 assert.equal(matchesReview('question','wiederholen',ids),true);
 assert.equal(matchesReview('question','wiederholen',reviewQuestionIds(items,'wiederholen')),false);
 assert.equal(matchesReview('question','richtig',reviewQuestionIds(items,'richtig')),true);
});
