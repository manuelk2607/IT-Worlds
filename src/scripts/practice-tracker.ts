import {practiceRecord,practiceStorage,practiceIsSaved,setPracticeStatus} from './practice-client.ts';
import {readPracticeRecord,type PracticeStatus} from '../lib/practice-record.ts';
import {t} from './browser-i18n.ts';
for(const root of document.querySelectorAll<HTMLElement>('[data-practice-tracker]')){
 const id=root.dataset.practiceTracker!,select=root.querySelector<HTMLSelectElement>('[data-practice-status]')!,message=root.querySelector<HTMLElement>('[data-practice-save-message]')!;
 const render=()=>{const record=practiceRecord(id);select.disabled=false;select.value=record.status;message.textContent=record.status==='complete'?record.source==='model'?t('Begrenzte Modellprüfung bestanden.','Limited model check passed.'):t('Als selbst bearbeitet markiert.','Marked complete by self-assessment.'):'';if(!practiceIsSaved(id))message.textContent=t('Nicht gespeichert; Status geht beim Neuladen verloren.','Not saved; status will be lost on reload.');};
 select.addEventListener('change',()=>{const saved=setPracticeStatus(id,select.value as PracticeStatus);render();message.textContent=saved?t('Auf diesem Gerät gespeichert.','Saved on this device.'):t('Speichern nicht möglich. Status gilt nur bis zum Neuladen.','Saving unavailable. Status lasts only until reload.');});
 document.addEventListener('practice-state-change',render);render();
 if(!readPracticeRecord(practiceStorage,id).available)message.textContent=t('Gerätespeicher nicht verfügbar; Änderungen gehen beim Neuladen verloren.','Device storage unavailable; changes will be lost on reload.');
}
