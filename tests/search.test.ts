import test from 'node:test';
import assert from 'node:assert/strict';
import {createSearchIndex} from '../src/lib/search-index.ts';
import {normalizeSearch,searchEntries,isSearchEntry} from '../src/lib/search.ts';
import {courses,courseChapters} from '../src/data/courses.ts';
import {sources} from '../src/data/content.ts';
import {glossary} from '../src/data/glossary.ts';

test('search indexes every available chapter once and keeps language-specific links',()=>{
 for(const locale of ['de','en'] as const){
  const entries=createSearchIndex(locale);
  assert(entries.every(isSearchEntry));
  assert.equal(new Set(entries.map(item=>item.id)).size,entries.length);
  assert.equal(entries.filter(item=>item.kind==='chapter').length,courseChapters.length);
  assert.equal(entries.filter(item=>item.kind==='course').length,courses.length);
  assert.equal(entries.filter(item=>item.kind==='source').length,Object.keys(sources).length);
  assert(entries.every(item=>locale==='en'?item.url.startsWith('/en/'):!item.url.startsWith('/en/')));
 }
});
test('global search finds source metadata and routes to a visible evidence card in either language',()=>{
 for(const locale of ['de','en'] as const){
  const entries=createSearchIndex(locale);
  const result=searchEntries(entries,'count expression','source').find(entry=>entry.id==='source-exerciseCount')!;
  assert.ok(result);
  const url=new URL(result.url,'https://example.com');
  assert.equal(url.pathname,locale==='en'?'/en/quellen/':'/quellen/');
  assert.equal(url.hash,'#quelle-exerciseCount');
  assert.equal(url.searchParams.get('suche'),sources.exerciseCount.title);
  assert.ok(searchEntries(entries,'versionskonflikt','exercise').some(entry=>entry.id==='exercise-api-versionskonflikt'));
  assert.ok(searchEntries(entries,'3.12 sum','source').some(entry=>entry.id==='source-pythonBuiltins'));
  const typesetting=searchEntries(entries,locale==='de'?'Dokumentenerstellung Typst':'document creation Typst','topic').find(entry=>entry.id==='typesetting');
  assert.equal(typesetting?.url,locale==='en'?'/en/textsatz/':'/textsatz/');
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
 for(const url of ['/\\other.test','/\t/other.test','/\n/other.test',' /themen/'])assert(!isSearchEntry({...entry,url}),JSON.stringify(url));
 assert(!isSearchEntry({...entry,kind:'unknown'}));
 assert(!isSearchEntry({...entry,title:123}));
});
test('search includes descriptions and bilingual glossary aliases with stable anchor links',()=>{
 const entry={id:'description-only',kind:'chapter' as const,title:'Example',description:'an otherwise unindexed learning goal',context:'Course',url:'/example/',text:''};
 assert.equal(searchEntries([entry],'unindexed learning goal')[0]?.id,entry.id);
 for(const locale of ['de','en']as const){
  const index=createSearchIndex(locale);assert.equal(index.filter(item=>item.kind==='glossary').length,glossary.length);
  assert(searchEntries(index,'foreign key','glossary').some(item=>item.url===`${locale==='en'?'/en':''}/glossar/#begriff-fremdschluessel`));
  assert(glossary.every(term=>term.title.de&&term.title.en&&term.definition.de&&term.definition.en&&sources[term.source]));
 }
});
