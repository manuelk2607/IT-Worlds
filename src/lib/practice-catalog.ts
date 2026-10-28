import {practiceStatuses,type PracticeStatus} from './practice-record.ts';
import {normalizeSearch} from './search.ts';
export interface PracticeSelection {search:string;topic:string;course:string;level:string;kind:string;status?:string}
/** Text is normalized once when indexing; shared projects keep every course/topic association. */
export interface PracticeMetadata {id:string;topics:readonly string[];courses:readonly string[];level:string;kind:string;text:string}
export const emptyPracticeSelection=():PracticeSelection=>({search:'',topic:'alle',course:'alle',level:'alle',kind:'alle',status:'alle'});
export function readPracticeSelection(params:URLSearchParams,items:readonly PracticeMetadata[]):PracticeSelection{
 const value=emptyPracticeSelection();value.search=(params.get('suche')??'').slice(0,100);
 for(const [field,param]of [['level','stufe'],['kind','format']]as const){const selected=params.get(param);if(items.some(item=>item[field]===selected))value[field]=selected!;}
 const status=params.get('status');if(practiceStatuses.includes(status as PracticeStatus))value.status=status!;
 const topic=params.get('thema'),course=params.get('kurs');
 if(topic&&items.some(item=>item.topics.includes(topic)))value.topic=topic;
 if(course&&items.some(item=>item.courses.includes(course)&&(value.topic==='alle'||item.topics.includes(value.topic))))value.course=course;
 return value;
}
export function matchesPractice(item:PracticeMetadata,value:PracticeSelection,status:PracticeStatus='open'):boolean{
 return(!value.status||value.status==='alle'||value.status===status)&&(value.topic==='alle'||item.topics.includes(value.topic))&&(value.course==='alle'||item.courses.includes(value.course))&&(['level','kind']as const).every(key=>value[key]==='alle'||value[key]===item[key])&&normalizeSearch(value.search).split(' ').filter(Boolean).every(word=>item.text.includes(word));
}
export function practiceSelectionUrl(url:URL,value:PracticeSelection):URL{
 const next=new URL(url);
 for(const [field,param]of [['search','suche'],['topic','thema'],['course','kurs'],['level','stufe'],['kind','format'],['status','status']]as const){if(!value[field]||value[field]==='alle')next.searchParams.delete(param);else next.searchParams.set(param,value[field].trim());}
 return next;
}
