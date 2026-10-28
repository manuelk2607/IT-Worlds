import{parsePracticeRecord,type PracticeRecord}from'./practice-record.ts';
export const practiceBackupLimit=512*1024;
export interface PracticeImport{changes:{id:string;record:PracticeRecord}[];unknown:number;older:number}
export function exportPracticeRecords(ids:readonly string[],load:(id:string)=>PracticeRecord):string{
 return JSON.stringify({version:1,items:ids.map(id=>({id,record:load(id)})).filter(item=>!!item.record.updatedAt).map(item=>({id:item.id,record:{version:1,...item.record}}))},null,2);
}
/** Imported notes are self-assessments. They never establish a verified check or change account data. */
export function planPracticeImport(text:string,known:ReadonlySet<string>,current:ReadonlyMap<string,PracticeRecord>,checklists:ReadonlyMap<string,readonly string[]>=new Map(),now=Date.now()):PracticeImport{
 if(text.length>practiceBackupLimit)throw new Error('TOO_LARGE');let value:unknown;try{value=JSON.parse(text);}catch{throw new Error('INVALID_FORMAT');}
 if(!value||typeof value!=='object'||!('version'in value)||value.version!==1||!('items'in value)||!Array.isArray(value.items)||value.items.length>500)throw new Error('INVALID_FORMAT');
 const result:PracticeImport={changes:[],unknown:0,older:0},seen=new Set<string>();
 for(const item of value.items){
  if(!item||typeof item!=='object'||!('id'in item)||typeof item.id!=='string'||item.id.length>100||seen.has(item.id)||!('record'in item))throw new Error('INVALID_RECORD');seen.add(item.id);
  const parsed=parsePracticeRecord(item.record);if(!parsed||Date.parse(parsed.updatedAt)>now+300000||Date.parse(parsed.updatedAt)<0)throw new Error('INVALID_RECORD');
  if(!known.has(item.id)){result.unknown++;continue;}
  if(Date.parse(current.get(item.id)?.updatedAt??'')>=Date.parse(parsed.updatedAt)){result.older++;continue;}
  let record:PracticeRecord={...parsed,source:'self'};const allowed=checklists.get(item.id);
  if(allowed){const steps=record.steps.filter(step=>allowed.includes(step));record={...record,steps,status:allowed.length>0&&steps.length===allowed.length?'complete':steps.length?'active':'open'};}
  result.changes.push({id:item.id,record});
 }
 return result;
}
