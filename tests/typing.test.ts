import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreTyping,rankedTraceValid,parseTypingTrace,fingerFor,typingLessons,typingLessonGuides,typingLessonText,typingTextProgress,typingTargetKey,rankedText,typingTexts} from '../src/lib/typing.ts';
import {halfAdder,gameStep} from '../src/lib/labs.ts';
import {typingEdit} from '../src/lib/typing.ts';
test('custom-text edits keep Unicode corrections consistent with scored replay',()=>{
 let previous='',keys='';
 for(const next of ['😀','😀x','😀','😀ö','😀ö🚀','😀ö']){
  const edit=typingEdit(previous,next);keys+='\b'.repeat(edit.removed)+edit.added.join('');previous=next;
 }
 const score=scoreTyping('😀ö',{keys,times:Array.from(keys,(_,i)=>i*100)},60000)!;
 assert.equal(score.retained,2);assert.equal(score.characters,4);assert.equal(score.mistakes,2);
 assert.equal(typingTextProgress('😀ö',previous).complete,true);
 assert.deepEqual(typingEdit('😀',''),{removed:1,added:[]});
 assert.deepEqual(typingEdit('o\u0308','ö'),{removed:0,added:[]});
});
test('typing replay preserves corrected mistakes and computes documented units',()=>{
 const score=scoreTyping('abc',{keys:'ax\bbc',times:[100,200,300,400,500]},60000)!;
 assert.equal(score.characters,4);assert.equal(score.correct,3);assert.equal(score.mistakes,1);assert.equal(score.retained,3);assert.equal(score.accuracy,75);assert.equal(score.wpm,0.6);assert.equal(score.kpm,4);
 assert.equal(score.weakness.b,1);
 assert.equal(scoreTyping('a',{keys:'a',times:[-1]},1000),null);
 assert.equal(scoreTyping('a',{keys:'a',times:[1001]},1000),null);
 assert.equal(scoreTyping('a',{keys:'a',times:[]},1000),null);
 assert.equal(parseTypingTrace({keys:'abc',times:['1']}),null);
 assert.equal(rankedTraceValid({keys:'a'.repeat(20),times:Array.from({length:20},(_,i)=>i*100)},1000),false);
 assert.equal(rankedTraceValid({keys:'a'.repeat(20),times:Array.from({length:20},(_,i)=>i*100)},61000),true);
 assert.equal(fingerFor('f'),3);assert.equal(fingerFor('J'),5);
});
test('lab arithmetic and collision boundaries match the teaching models',()=>{
 assert.deepEqual(halfAdder(true,true),{sum:0,carry:1});assert.deepEqual(halfAdder(true,false),{sum:1,carry:0});
 assert.deepEqual(gameStep(160,100,1,0),{x:160,y:100});assert.deepEqual(gameStep(0,0,-1,-1),{x:0,y:0});assert.deepEqual(gameStep(160,0,1,0),{x:170,y:0});
});
test('typing progression never requires characters before introduction and has distinct bilingual text challenges',()=>{
 const keys=(id:string,seen=new Set<string>()):string=>{assert(!seen.has(id),'No prerequisite cycle');seen.add(id);const guide=typingLessonGuides[id];assert(guide,id);return(guide.prerequisite?keys(guide.prerequisite,seen):'')+guide.introduced;};
 for(const lesson of typingLessons){
  const guide=typingLessonGuides[lesson.id];assert(guide.description.de&&guide.description.en);
  if(['adaptive','free'].includes(lesson.id))continue;
  for(const locale of ['de','en']as const){
   const text=typingLessonText(lesson.id,locale)!;assert(text.length>20&&text.length<2000);
   const allowed=new Set(keys(lesson.id));
   for(const char of text)assert(allowed.has(char),`${lesson.id}/${locale} requires unintroduced ${char}`);
  }
 }
 for(const id of ['sentences','paragraphs','technical']){
  const de=typingLessonText(id,'de')!,en=typingLessonText(id,'en')!;assert.notEqual(de,en);
  assert(de.split('. ').length>=3&&en.split('. ').length>=3);
  assert(Math.abs(de.length-en.length)/Math.max(de.length,en.length)<.2,'Comparable text length');
 }
 assert.equal(rankedText('de'),typingTexts.de.repeat(16));assert.equal(rankedText('en'),typingTexts.en.repeat(16));
 assert.equal(typingLessonText('untrusted','de'),undefined);
});
test('text progress distinguishes missing, incorrect, corrected and extra characters using Unicode positions',()=>{
 assert.deepEqual(typingTextProgress('a ö','a x'),{total:3,entered:3,retained:2,complete:false,errors:[{position:3,expected:'ö',actual:'x'}]});
 assert.equal(typingTextProgress('a ö','a ').complete,false);
 assert.equal(typingTextProgress('a ö','a o\u0308').complete,true);
 assert.equal(typingTextProgress('a','aa').complete,false);
 assert.equal(typingTextProgress('','').complete,false);
 assert.equal(typingTextProgress('😀a','😀b').errors[0]?.position,2);
 assert.notEqual(typingTargetKey('text','de'),typingTargetKey('text','en'));
 assert.notEqual(typingTargetKey('text','de'),typingTargetKey('text updated','de'));
});
