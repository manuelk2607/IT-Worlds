export interface Session{id:string;topic:string;minutes:number;done:boolean}
export function parseSessions(value:unknown):Session[]{
 if(!Array.isArray(value)||value.length>100)throw new Error('Expected an array of at most 100 sessions');
 const ids=new Set<string>();
 return value.map((entry:unknown,index)=>{
  if(!entry||typeof entry!=='object'||!('id'in entry)||typeof entry.id!=='string'||!/^[a-z0-9-]{1,40}$/.test(entry.id)||ids.has(entry.id)||!('topic'in entry)||typeof entry.topic!=='string'||!entry.topic.trim()||entry.topic.length>60||!('minutes'in entry)||typeof entry.minutes!=='number'||!Number.isInteger(entry.minutes)||entry.minutes<0||entry.minutes>480||!('done'in entry)||typeof entry.done!=='boolean')throw new Error(`Invalid session at position ${index+1}`);
  ids.add(entry.id);return{id:entry.id,topic:entry.topic.trim(),minutes:entry.minutes,done:entry.done};
 });
}
export function report(sessions:readonly Session[]){
 const topics=new Map<string,number>();let minutes=0,completedMinutes=0;
 for(const session of sessions){minutes+=session.minutes;if(session.done)completedMinutes+=session.minutes;topics.set(session.topic,(topics.get(session.topic)??0)+session.minutes);}
 return{minutes,completedMinutes,completionPercent:minutes===0?null:Math.round(completedMinutes/minutes*1000)/10,topics:[...topics].sort(([a],[b])=>a<b?-1:a>b?1:0).map(([topic,minutes])=>({topic,minutes}))};
}
