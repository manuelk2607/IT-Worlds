import test from 'node:test';
import assert from 'node:assert/strict';
import {courses,filteredCourses,parseSaved,selectionFrom,selectionUrl} from './catalog.ts';
test('catalog combines text, topic and bookmarks and recovers from missing matches',()=>{
 assert.equal(filteredCourses({query:'responsive',topic:'web',savedOnly:false},new Set()).length,1);
 assert.equal(filteredCourses({query:'responsive',topic:'data',savedOnly:false},new Set()).length,0);
 assert.deepEqual(filteredCourses({query:'',topic:'all',savedOnly:true},new Set(['sql'])).map(course=>course.id),['sql']);
 assert.equal(filteredCourses({query:'',topic:'all',savedOnly:false},new Set()).length,6);
 assert.equal(new Set(courses.map(course=>course.id)).size,6);
});
test('bookmark parsing rejects corrupt data and unknown identifiers without losing page availability',()=>{
 for(const value of ['invalid','{}','null','[1,true,"missing"]'])assert.equal(parseSaved(value).size,0);
 assert.deepEqual([...parseSaved('["sql","sql","html","missing"]')],['sql','html']);
});
test('filter URLs preserve unrelated parameters and constrain invalid values',()=>{
 const state=selectionFrom(new URLSearchParams('q=SQL&topic=unknown&saved=1'));assert.deepEqual(state,{query:'SQL',topic:'all',savedOnly:true});
 const url=selectionUrl(new URL('http://localhost/index.html?keep=1#courses'),state);assert.equal(url.searchParams.get('keep'),'1');assert.equal(url.hash,'#courses');
 assert.deepEqual(selectionFrom(url.searchParams),state);
 assert.equal(selectionUrl(url,{query:'',topic:'all',savedOnly:false}).search,'?keep=1');
 assert.equal(selectionFrom(new URLSearchParams('q='+ 'x'.repeat(1000))).query.length,100);
});
