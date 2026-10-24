import test from 'node:test';
import assert from 'node:assert/strict';
import {acceptProgressResponse} from '../src/lib/progress-response.ts';
import type {ProgressItem} from '../src/lib/progress.ts';
const item=(kind:ProgressItem['kind'],contentId:string,completed=true):ProgressItem=>({kind,contentId,completed,solved:kind==='question'&&completed,updatedAt:'2026-10-24T09:00:00Z'});
test('late progress responses cannot restore signed-out data or overwrite a different account',()=>{
 const response=item('question','same-id');
 const signedOut={user:null,items:[] as ProgressItem[]};
 assert.equal(acceptProgressResponse(signedOut,'old-account',response),false);assert.deepEqual(signedOut.items,[]);
 const own=[item('lesson','new-account-lesson')];const switched={user:{id:'new-account'},items:own};
 assert.equal(acceptProgressResponse(switched,'old-account',response),false);assert.equal(switched.items,own);
 assert.deepEqual(switched,{user:{id:'new-account'},items:[item('lesson','new-account-lesson')]});
});
test('a current-session save replaces only the matching kind and stable content ID',()=>{
 const lesson=item('lesson','same-id'),other=item('question','other-id');
 const state={user:{id:'current-account'},items:[lesson,item('question','same-id',false),other]};
 const saved=item('question','same-id');
 assert.equal(acceptProgressResponse(state,'current-account',saved),true);
 assert.deepEqual(state.items,[lesson,other,saved]);
 assert.equal(state.items.filter(value=>value.kind==='question'&&value.contentId==='same-id').length,1);
});
