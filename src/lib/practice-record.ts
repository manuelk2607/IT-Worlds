import type {DraftStorage} from './exercise-draft.ts';
export const practiceStatuses=['open','active','review','complete'] as const;
export type PracticeStatus=typeof practiceStatuses[number];
export interface PracticeRecord {status:PracticeStatus;source:'self'|'model';attempts:number;steps:string[];updatedAt:string}
export const emptyPracticeRecord=():PracticeRecord=>({status:'open',source:'self',attempts:0,steps:[],updatedAt:''});
export const practiceRecordKey=(id:string)=>`it-worlds-practice:v1:${id}`;
export function parsePracticeRecord(v:unknown):PracticeRecord|null{
  if(!v||typeof v!=='object'||!('version'in v)||v.version!==1||!('status'in v)||!practiceStatuses.includes(v.status as PracticeStatus)||!('source'in v)||!['self','model'].includes(String(v.source))||!('attempts'in v)||typeof v.attempts!=='number'||!Number.isInteger(v.attempts)||v.attempts<0||v.attempts>100000||!('steps'in v)||!Array.isArray(v.steps)||v.steps.length>50||!v.steps.every((s:unknown)=>typeof s==='string'&&/^[a-z0-9-]{1,80}$/.test(s))||!('updatedAt'in v)||typeof v.updatedAt!=='string'||!Number.isFinite(Date.parse(v.updatedAt)))return null;
 return {status:v.status as PracticeStatus,source:v.source as PracticeRecord['source'],attempts:v.attempts,steps:[...new Set(v.steps as string[])],updatedAt:v.updatedAt};
}
export function readPracticeRecord(storage:DraftStorage,id:string):{record:PracticeRecord;available:boolean}{
 try{
  const raw=storage.getItem(practiceRecordKey(id));if(!raw)return{record:emptyPracticeRecord(),available:true};
  if(raw.length>8192)return{record:emptyPracticeRecord(),available:true};
  let v:unknown;try{v=JSON.parse(raw);}catch{return{record:emptyPracticeRecord(),available:true};}
  return{record:parsePracticeRecord(v)??emptyPracticeRecord(),available:true};
 }catch{return{record:emptyPracticeRecord(),available:false};}
}
export function writePracticeRecord(storage:DraftStorage,id:string,record:PracticeRecord):boolean{
 try{storage.setItem(practiceRecordKey(id),JSON.stringify({version:1,...record}));return true;}catch{return false;}
}
/** A changed draft invalidates a previous model result; reading a chapter never implies task completion. */
export function practiceAttempt(record:PracticeRecord,passed:boolean):PracticeRecord{return{...record,status:passed?'complete':'review',source:'model',attempts:Math.min(100000,record.attempts+1),updatedAt:new Date().toISOString()};}
export function projectChecklist(record:PracticeRecord,allowed:readonly string[],step:string,checked:boolean):PracticeRecord{
 const selected=new Set(record.steps.filter(id=>allowed.includes(id)));
 if(allowed.includes(step)){if(checked)selected.add(step);else selected.delete(step);}
 return{...record,steps:[...selected],source:'self',status:allowed.length>0&&selected.size===allowed.length?'complete':selected.size?'active':'open',updatedAt:new Date().toISOString()};
}
