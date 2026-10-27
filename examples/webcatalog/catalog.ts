export const courses=[
 {id:'html',title:'HTML foundations',topic:'web',summary:'Structure a page with meaningful elements.'},
 {id:'css',title:'Responsive CSS',topic:'web',summary:'Adapt layouts to wide and narrow screens.'},
 {id:'typescript',title:'TypeScript data',topic:'code',summary:'Validate values before using them.'},
 {id:'python',title:'Python foundations',topic:'code',summary:'Explain a small program step by step.'},
 {id:'sql',title:'SQL relationships',topic:'data',summary:'Connect tables and preserve empty groups.'},
 {id:'reports',title:'Reports and NULL',topic:'data',summary:'Distinguish missing data from a zero value.'},
] as const;
export type Course=(typeof courses)[number];
export interface Selection {query:string;topic:string;savedOnly:boolean}
export const normalize=(value:string)=>value.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/ß/g,'ss');
export function selectionFrom(params:URLSearchParams):Selection {
 const topic=params.get('topic')??'all';return{query:(params.get('q')??'').trim().slice(0,100),topic:['all','web','code','data'].includes(topic)?topic:'all',savedOnly:params.get('saved')==='1'};
}
export function parseSaved(raw:string|null):Set<string>{
 try{const value:unknown=JSON.parse(raw??'[]');return new Set(Array.isArray(value)?value.filter((id):id is string=>typeof id==='string'&&courses.some(course=>course.id===id)):[]);}catch{return new Set();}
}
export function filteredCourses(selection:Selection,saved:ReadonlySet<string>):Course[]{
 const words=normalize(selection.query).split(/\s+/).filter(Boolean);
 return courses.filter(course=>(selection.topic==='all'||course.topic===selection.topic)&&(!selection.savedOnly||saved.has(course.id))&&words.every(word=>normalize(course.title+' '+course.summary).includes(word)));
}
export function selectionUrl(url:URL,selection:Selection):URL {
 const next=new URL(url);for(const key of ['q','topic','saved'])next.searchParams.delete(key);
 if(selection.query)next.searchParams.set('q',selection.query);if(selection.topic!=='all')next.searchParams.set('topic',selection.topic);if(selection.savedOnly)next.searchParams.set('saved','1');return next;
}
