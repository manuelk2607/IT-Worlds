export const draftLimit=8000;
export interface DraftStorage {getItem(key:string):string|null;setItem(key:string,value:string):void;removeItem(key:string):void}
export type DraftLoad={status:'empty'|'restored'|'outdated'|'unavailable';value:string};
export const exerciseDraftKey=(id:string)=>`it-worlds-exercise-draft:v1:${id}`;
export function loadExerciseDraft(storage:DraftStorage,key:string,starter:string):DraftLoad{
 try{
  const raw=storage.getItem(key);if(raw===null)return {status:'empty',value:starter};
  if(raw.length>131072){storage.removeItem(key);return {status:'outdated',value:starter};}
  let value:unknown;try{value=JSON.parse(raw);}catch{storage.removeItem(key);return {status:'outdated',value:starter};}
  if(!value||typeof value!=='object'||!('version'in value)||value.version!==1||!('starter'in value)||value.starter!==starter||!('code'in value)||typeof value.code!=='string'||value.code.length>draftLimit){
   storage.removeItem(key);return {status:'outdated',value:starter};
  }
  return {status:'restored',value:value.code};
 }catch{return {status:'unavailable',value:starter};}
}
export function saveExerciseDraft(storage:DraftStorage,key:string,starter:string,code:string):'saved'|'cleared'|'unavailable'{
 if(code.length>draftLimit)return 'unavailable';
 try{
  if(code===starter){storage.removeItem(key);return 'cleared';}
  storage.setItem(key,JSON.stringify({version:1,starter,code}));return 'saved';
 }catch{return 'unavailable';}
}
