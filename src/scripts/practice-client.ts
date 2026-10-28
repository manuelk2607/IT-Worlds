import {readPracticeRecord,writePracticeRecord,emptyPracticeRecord,type PracticeRecord,type PracticeStatus} from '../lib/practice-record.ts';
import type {DraftStorage} from '../lib/exercise-draft.ts';
export const practiceStorage:DraftStorage={getItem:key=>localStorage.getItem(key),setItem:(key,value)=>localStorage.setItem(key,value),removeItem:key=>localStorage.removeItem(key)};
const temporary=new Map<string,PracticeRecord>();
export const practiceIsSaved=(id:string)=>!temporary.has(id);
export const practiceRecord=(id:string)=>temporary.get(id)??readPracticeRecord(practiceStorage,id).record;
export function savePracticeRecord(id:string,record:PracticeRecord,notify=true):boolean{
 const saved=writePracticeRecord(practiceStorage,id,record);if(saved)temporary.delete(id);else temporary.set(id,record);
 if(notify)document.dispatchEvent(new CustomEvent('practice-state-change',{detail:{id,saved}}));return saved;
}
export function setPracticeStatus(id:string,status:PracticeStatus):boolean{return savePracticeRecord(id,{...practiceRecord(id),status,source:'self',updatedAt:new Date().toISOString()});}
export const practiceLabels={de:{open:'Offen',active:'In Arbeit',review:'Wiederholen',complete:'Abgeschlossen'},en:{open:'Not started',active:'In progress',review:'Review needed',complete:'Completed'}};
window.addEventListener('storage',event=>{if(event.key?.startsWith('it-worlds-practice:v1:')){temporary.delete(event.key.slice('it-worlds-practice:v1:'.length));document.dispatchEvent(new CustomEvent('practice-state-change'));}});
export {emptyPracticeRecord};
