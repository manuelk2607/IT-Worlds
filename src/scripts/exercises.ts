import {practiceRecord,savePracticeRecord,setPracticeStatus} from './practice-client.ts';
import {practiceAttempt} from '../lib/practice-record.ts';
import {exerciseDraftKey,loadExerciseDraft,saveExerciseDraft,type DraftStorage} from '../lib/exercise-draft.ts';
import { exercises } from '../data/exercises';
import { checkExercise } from '../lib/exercise-checker';
import { t, locale } from './browser-i18n';
for (const element of document.querySelectorAll<HTMLElement>('[data-exercise]')) {
  const exercise = exercises.find(item=>item.id===element.dataset.exercise)!;
  const editor = element.querySelector<HTMLTextAreaElement>('[data-editor]')!;
  const feedback = element.querySelector<HTMLElement>('[data-exercise-feedback]')!;
  const output = element.querySelector<HTMLElement>('[data-exercise-output]')!;
  const lineCount = element.querySelector<HTMLElement>('[data-line-count]')!;
  const lines = () => { const count=editor.value.split('\n').length;lineCount.textContent=t(`${count} ${count===1?"Zeile":"Zeilen"}`,`${count} ${count===1?"line":"lines"}`); };
  const draftStatus=element.querySelector<HTMLElement>('[data-draft-status]')!;
  const undo=element.querySelector<HTMLButtonElement>('[data-undo-exercise]')!;
  let previous:string|undefined;
  const storage:DraftStorage={getItem:key=>localStorage.getItem(key),setItem:(key,value)=>localStorage.setItem(key,value),removeItem:key=>localStorage.removeItem(key)};
  const key=exerciseDraftKey(exercise.id);
  const say=(message:string)=>{if(draftStatus.textContent!==message)draftStatus.textContent=message;};
  const persist=()=>{
    const state=saveExerciseDraft(storage,key,exercise.starter,editor.value);
    say(state==='saved'?t('Entwurf auf diesem Gerät gespeichert.','Draft saved on this device.'):state==='cleared'?t('Startvorlage aktiv; kein gespeicherter Entwurf.','Starter template active; no saved draft.'):t('Speichern ist hier nicht möglich. Beim Neuladen geht deine Eingabe verloren.','Saving is unavailable here. Reloading will discard your input.'));
  };
  const restored=loadExerciseDraft(storage,key,exercise.starter);editor.value=restored.value;
  if(restored.status==='restored')say(t('Gespeicherten Entwurf wiederhergestellt.','Saved draft restored.'));
  if(restored.status==='outdated')say(t('Die Aufgabe wurde aktualisiert. Du beginnst mit der aktuellen Vorlage.','The exercise was updated. Starting with the current template.'));
  if(restored.status==='unavailable')say(t('Speichern ist hier nicht möglich. Beim Neuladen geht deine Eingabe verloren.','Saving is unavailable here. Reloading will discard your input.'));
  const clear = () => { feedback.textContent='';feedback.classList.remove('passed');output.hidden=true;lines(); };
  editor.addEventListener('input',()=>{setPracticeStatus(`editor-${exercise.id}`,'active');previous=undefined;undo.hidden=true;clear();persist();});
  const replace=(value:string)=>{if(value!==editor.value){previous=editor.value;undo.hidden=false;}editor.value=value;setPracticeStatus(`editor-${exercise.id}`,'active');clear();persist();editor.focus();};
  undo.addEventListener('click',()=>{if(previous===undefined)return;editor.value=previous;setPracticeStatus(`editor-${exercise.id}`,'active');previous=undefined;undo.hidden=true;clear();persist();editor.focus();});
  element.querySelector('[data-check-exercise]')!.addEventListener('click',()=>{
    const result=checkExercise(exercise.id,editor.value,locale);
    savePracticeRecord(`editor-${exercise.id}`,practiceAttempt(practiceRecord(`editor-${exercise.id}`),result.passed));
    feedback.textContent=result.message;
    feedback.classList.toggle('passed',result.passed);
    element.querySelector<HTMLElement>('[data-exercise-output-text]')!.textContent=result.output;
    output.hidden=false;
  });
  element.querySelector('[data-reset-exercise]')!.addEventListener('click',()=>replace(exercise.starter));
  element.querySelector('[data-load-solution]')!.addEventListener('click',()=>replace(exercise.solution));
  lines();
}
