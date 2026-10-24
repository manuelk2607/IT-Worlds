import test from'node:test';import assert from'node:assert/strict';
import{exerciseDraftKey,loadExerciseDraft,saveExerciseDraft,type DraftStorage}from'../src/lib/exercise-draft.ts';
function memory(){const items=new Map<string,string>();const storage:DraftStorage={getItem:key=>items.get(key)??null,setItem:(key,value)=>{items.set(key,value);},removeItem:key=>{items.delete(key);}};return {items,storage};}
test('editor drafts preserve exact text across languages and reset without affecting other tasks',()=>{
 const{storage}=memory(),key=exerciseDraftKey('apis'),other=exerciseDraftKey('linux');
 assert.deepEqual(loadExerciseDraft(storage,key,'starter'),{status:'empty',value:'starter'});
 const code='\n<script>literal text</script>\n€  ';
 assert.equal(saveExerciseDraft(storage,key,'starter',code),'saved');
 assert.deepEqual(loadExerciseDraft(storage,key,'starter'),{status:'restored',value:code});
 saveExerciseDraft(storage,other,'other','my work');
 assert.equal(saveExerciseDraft(storage,key,'starter','starter'),'cleared');
 assert.equal(loadExerciseDraft(storage,key,'starter').status,'empty');
 assert.equal(loadExerciseDraft(storage,other,'other').value,'my work');
 assert.equal(saveExerciseDraft(storage,key,'starter',''),'saved');assert.equal(loadExerciseDraft(storage,key,'starter').value,'');
});
test('invalid or outdated editor drafts never replace the current exercise template',()=>{
 const{items,storage}=memory(),key=exerciseDraftKey('apis');
 for(const value of ['broken','null','[]','{}',JSON.stringify({version:2,starter:'s',code:'x'}),JSON.stringify({version:1,starter:'old',code:'x'}),JSON.stringify({version:1,starter:'s',code:42}),JSON.stringify({version:1,starter:'s',code:'x'.repeat(8001)}),'x'.repeat(131073)]){
  items.set(key,value);assert.deepEqual(loadExerciseDraft(storage,key,'s'),{status:'outdated',value:'s'});assert.equal(items.has(key),false);
 }
 assert.equal(saveExerciseDraft(storage,key,'s','x'.repeat(8000)),'saved');assert.equal(loadExerciseDraft(storage,key,'s').value.length,8000);
 assert.equal(saveExerciseDraft(storage,key,'s','x'.repeat(8001)),'unavailable');
});
test('blocked storage and quota failures leave the editor usable',()=>{
 const blocked:DraftStorage={getItem(){throw new Error('blocked');},setItem(){throw new Error('quota');},removeItem(){throw new Error('blocked');}};
 assert.deepEqual(loadExerciseDraft(blocked,'key','starter'),{status:'unavailable',value:'starter'});
 assert.equal(saveExerciseDraft(blocked,'key','starter','draft'),'unavailable');assert.equal(saveExerciseDraft(blocked,'key','starter','starter'),'unavailable');
});
