import {practiceRecord,savePracticeRecord,practiceIsSaved,practiceStorage} from './practice-client.ts';
import {projectChecklist,emptyPracticeRecord,readPracticeRecord,type PracticeRecord} from '../lib/practice-record.ts';
import {t} from './browser-i18n.ts';
for(const root of document.querySelectorAll<HTMLElement>('[data-project-progress]')){
 const id=`project-${root.dataset.projectProgress}`,inputs=[...root.querySelectorAll<HTMLInputElement>('[data-project-step]')],allowed=inputs.map(input=>input.dataset.projectStep!),message=root.querySelector<HTMLElement>('[data-project-save]')!,undo=root.querySelector<HTMLButtonElement>('[data-project-undo]')!;let previous:PracticeRecord|undefined;
 function render(){const record=practiceRecord(id),done=record.steps.filter(step=>allowed.includes(step)),next=allowed.find(step=>!done.includes(step));for(const input of inputs){input.disabled=false;input.checked=done.includes(input.dataset.projectStep!);}root.querySelector<HTMLButtonElement>('[data-project-reset]')!.disabled=false;
  root.querySelector('[data-project-count]')!.textContent=t(`${done.length} von ${allowed.length} Schritten selbst bestätigt`,`${done.length} of ${allowed.length} steps self-confirmed`);root.querySelector<HTMLProgressElement>('[data-project-meter]')!.value=done.length;
  const link=root.querySelector<HTMLAnchorElement>('[data-project-resume]')!;link.href=`#${next??allowed[0]??'inhalt'}`;link.textContent=next?(done.length?t('Beim nächsten offenen Schritt fortsetzen →','Resume at the next unfinished step →'):t('Projekt beginnen →','Start project →')):t('Alles selbst geprüft · noch einmal ansehen →','All self-checked · review again →');
  if(!practiceIsSaved(id)||!readPracticeRecord(practiceStorage,id).available)message.textContent=t('Nicht gespeichert. Checkliste bleibt nur bis zum Neuladen erhalten.','Not saved. Checklist lasts only until reload.');
 }
 const save=(record:PracticeRecord)=>{const saved=savePracticeRecord(id,record);message.textContent=saved?t('Checkliste auf diesem Gerät gespeichert.','Checklist saved on this device.'):t('Nicht gespeichert; Änderungen gehen beim Neuladen verloren.','Not saved; changes will be lost on reload.');render();};
 for(const input of inputs)input.addEventListener('change',()=>{previous=undefined;undo.hidden=true;save(projectChecklist(practiceRecord(id),allowed,input.dataset.projectStep!,input.checked));});
 root.querySelector('[data-project-reset]')!.addEventListener('click',()=>{previous=practiceRecord(id);save({...emptyPracticeRecord(),updatedAt:new Date().toISOString()});undo.hidden=false;});
 undo.addEventListener('click',()=>{if(previous){save({...previous,updatedAt:new Date().toISOString()});previous=undefined;undo.hidden=true;}});
 document.addEventListener('practice-state-change',render);render();
}
