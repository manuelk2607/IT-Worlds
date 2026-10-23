import test from 'node:test';
import assert from 'node:assert/strict';
import {createSearchIndex} from '../src/lib/search-index.ts';
import {normalizeSearch,searchEntries,isSearchEntry} from '../src/lib/search.ts';
import {courses,courseChapters} from '../src/data/courses.ts';

test('search indexes every available chapter once and keeps language-specific links',()=>{
 for(const locale of ['de','en'] as const){
  const entries=createSearchIndex(locale);
  assert(entries.every(isSearchEntry));
  assert.equal(new Set(entries.map(item=>item.id)).size,entries.length);
  assert.equal(entries.filter(item=>item.kind==='chapter').length,courseChapters.length);
  assert.equal(entries.filter(item=>item.kind==='course').length,courses.length);
  assert(entries.every(item=>locale==='en'?item.url.startsWith('/en/'):!item.url.startsWith('/en/')));
 }
});
test('search combines words, folds accents and finds concepts inside chapter text',()=>{
 assert.equal(normalizeSearch('  Äpfel & ÜBERGÄNGE '),'apfel ubergange');
 const en=createSearchIndex('en');
 assert(searchEntries(en,'transactions snapshot','chapter').some(item=>item.id==='chapter-datenbanken-transaktionen'));
 const de=createSearchIndex('de');
 assert(searchEntries(de,'Fremdschlüssel','chapter').some(item=>item.id==='chapter-datenbanken-beziehungen'));
 assert.equal(searchEntries(de,'impossiblewordxyz').length,0);
 assert(searchEntries(de,'','course').every(item=>item.kind==='course'));
 assert(searchEntries(de,'','all',3).length===3);
});
test('search ranks exact titles and rejects malformed or unsafe result URLs',()=>{
 const entry={id:'1',kind:'topic' as const,title:'SQL',description:'SQL lernen',context:'Thema',url:'/themen/datenbanken/',text:'SQL basics'};
 assert.equal(searchEntries([{...entry,id:'2',title:'SQL weiterdenken'},entry],'SQL')[0].id,'1');
 assert(!isSearchEntry({...entry,url:'javascript:alert(1)'}));
 assert(!isSearchEntry({...entry,url:'//other.test'}));
 assert(!isSearchEntry({...entry,kind:'unknown'}));
 assert(!isSearchEntry({...entry,title:123}));
});
