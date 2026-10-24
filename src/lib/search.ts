export type SearchKind = 'topic' | 'course' | 'chapter' | 'path' | 'exercise' | 'source';
export interface SearchEntry {
 id: string;
 kind: SearchKind;
 title: string;
 description: string;
 context: string;
 url: string;
 text: string;
}
export function normalizeSearch(value: string): string {
 return value.normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase().replace(/ß/g,'ss').replace(/[^\p{L}\p{N}+#]+/gu,' ').trim();
}
const prepared=new WeakMap<SearchEntry,{title:string;context:string;haystack:string}>();
function prepare(entry:SearchEntry) {
 let value=prepared.get(entry);
 if(!value){const title=normalizeSearch(entry.title),context=normalizeSearch(entry.context);value={title,context,haystack:`${title} ${context} ${normalizeSearch(entry.text)}`};prepared.set(entry,value);}
 return value;
}
export function searchEntries(entries: SearchEntry[], query: string, kind = 'all', limit = 12): SearchEntry[] {
 const normalized = normalizeSearch(query);
 const terms = normalized.split(/\s+/).filter(Boolean);
 return entries.filter(entry=>kind==='all'||entry.kind===kind).map((entry,index)=>{
  const {title,context,haystack}=prepare(entry);
  if(!terms.every(term=>haystack.includes(term))) return {entry,index,score:-1};
  const score = terms.length ? (title===normalized?100:0)+(title.includes(normalized)?40:0)+terms.reduce((sum,term)=>sum+(title.includes(term)?10:context.includes(term)?4:1),0)
   : entry.kind==='course'?20:entry.kind==='topic'?10:0;
  return {entry,index,score};
 }).filter(item=>item.score>=0).sort((a,b)=>b.score-a.score||a.index-b.index).slice(0,limit).map(item=>item.entry);
}
export function isSearchEntry(value: unknown): value is SearchEntry {
 if(!value||typeof value!=='object')return false;
 for(const key of ['id','kind','title','description','context','url','text'])if(!(key in value)||typeof (value as Record<string,unknown>)[key]!=='string')return false;
 const item=value as Record<string,string>;
 return ['topic','course','chapter','path','exercise','source'].includes(item.kind)&&/^\/(?!\/)/.test(item.url)&&!/[\\\u0000-\u0020]/.test(item.url);
}
