import {exerciseDraftKey,draftLimit} from '../lib/exercise-draft.ts';
// Read-only migration aid: never delete or overwrite a user's existing editor draft.
for(const root of document.querySelectorAll<HTMLElement>('[data-external-document-exercise]')){
 try{
  const raw=localStorage.getItem(exerciseDraftKey(root.dataset.externalDocumentExercise!));if(!raw||raw.length>131072)continue;
  const draft:unknown=JSON.parse(raw);if(!draft||typeof draft!=='object'||!('code'in draft)||typeof draft.code!=='string'||draft.code.length>draftLimit)continue;
  const code=draft.code;const button=root.querySelector<HTMLButtonElement>('[data-legacy-draft-download]')!;button.hidden=false;
  button.addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([code],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='it-worlds-previous-draft.typ';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 }catch{/* External workflow remains usable without local storage or a valid old draft. */}
}
