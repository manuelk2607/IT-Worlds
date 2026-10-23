import type {ProgressItem} from '../lib/progress.ts';
import {t} from './browser-i18n.ts';
const groups=[...document.querySelectorAll<HTMLDetailsElement>('[data-progress-group]')];
const view=document.querySelector<HTMLSelectElement>('#progress-view');
const topic=document.querySelector<HTMLSelectElement>('#progress-topic');
const unfinished=document.querySelector<HTMLInputElement>('#progress-unfinished');
let latest:readonly ProgressItem[]=[];
export function renderProgressDashboard(items:readonly ProgressItem[]) {
 latest=items;
 if(!view||!topic||!unfinished)return;
 const done=new Set(items.filter(item=>item.completed).map(item=>`${item.kind}:${item.contentId}`));
 let visible=0;
 for(const group of groups) {
  const entries=[...group.querySelectorAll<HTMLElement>('[data-progress-entry]')];
  let completed=0;
  for(const entry of entries){const read=done.has(`${entry.dataset.kind}:${entry.dataset.itemId}`);if(read)completed++;entry.hidden=unfinished.checked&&read;}
  group.querySelector('[data-group-count]')!.textContent=t(`${completed} / ${entries.length} bearbeitet`,`${completed} / ${entries.length} completed`);
  group.querySelector<HTMLProgressElement>('[data-group-progress]')!.value=completed;
  const next=entries.find(entry=>!done.has(`${entry.dataset.kind}:${entry.dataset.itemId}`));
  const resume=group.querySelector<HTMLAnchorElement>('[data-group-resume]')!;
  resume.href=next?.querySelector<HTMLAnchorElement>('[data-entry-link]')!.href??resume.dataset.overview!;
  resume.textContent=next?t('Nächsten offenen Schritt öffnen →','Open the next unfinished step →'):t('Alles bearbeitet · erneut ansehen →','All completed · review again →');
  group.hidden=(view.value!=='all'&&group.dataset.view!==view.value)||(topic.value!=='all'&&group.dataset.topic!==topic.value)||(unfinished.checked&&completed===entries.length);
  if(!group.hidden)visible++;
 }
 document.querySelector<HTMLElement>('#progress-filter-status')!.textContent=visible?t(`${visible} ${visible===1?'Gruppe':'Gruppen'} in deiner Auswahl. Öffne eine Gruppe oder setze dort direkt fort.`,`${visible} ${visible===1?'group':'groups'} in your selection. Expand a group or continue there.`):t('Keine offenen Inhalte für diese Auswahl. Ändere die Filter oder zeige auch Bearbeitetes.','No unfinished content for this selection. Change filters or include completed items.');
}
for(const control of [view,topic,unfinished])if(control){control.disabled=false;control.addEventListener('change',()=>renderProgressDashboard(latest));}
