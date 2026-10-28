import {practiceQuizEvidence} from '../lib/practice-feedback.ts';
import {t,locale,pagePath} from './browser-i18n.ts';
import {normalizeSearch} from '../lib/search.ts';
import {learningState,learningReady} from './progress-client.ts';
import {practiceRecord,setPracticeStatus,practiceLabels,practiceStorage,practiceIsSaved} from './practice-client.ts';
import {readPracticeRecord,type PracticeStatus} from '../lib/practice-record.ts';
import {emptyPracticeSelection,readPracticeSelection,matchesPractice,practiceSelectionUrl,type PracticeMetadata,type PracticeSelection} from '../lib/practice-catalog.ts';
const root=document.querySelector<HTMLElement>('[data-practice-catalog]')!;
const search=root.querySelector<HTMLInputElement>('#exercise-search')!;
const topic=root.querySelector<HTMLSelectElement>('#exercise-topic')!,course=root.querySelector<HTMLSelectElement>('#exercise-course')!,level=root.querySelector<HTMLSelectElement>('#exercise-level')!,kind=root.querySelector<HTMLSelectElement>('#exercise-kind')!,status=root.querySelector<HTMLSelectElement>('#exercise-status')!;
const more=root.querySelector<HTMLButtonElement>('[data-practice-more]')!;
const indexed=[...root.querySelectorAll<HTMLElement>('[data-practice-card]')].map(card=>({card,item:{id:card.dataset.practiceCard!,topics:(card.dataset.topics??'').split(' ').filter(Boolean),courses:(card.dataset.courses??'').split(' ').filter(Boolean),level:card.dataset.level!,kind:card.dataset.kind!,text:normalizeSearch(card.dataset.search??'')} satisfies PracticeMetadata}));
const items=indexed.map(entry=>entry.item);let limit=18;
const records=new Map(items.map(item=>[item.id,practiceRecord(item.id)]));
function selection():PracticeSelection{return{search:search.value,topic:topic.value,course:course.value,level:level.value,kind:kind.value,status:status.value};}
function render(sync=true){
 const current=selection();
 if(current.course!=='alle'&&!items.some(item=>item.courses.includes(current.course)&&(current.topic==='alle'||item.topics.includes(current.topic))))course.value=current.course='alle';
 for(const option of course.options)option.disabled=option.value!=='alle'&&!items.some(item=>item.courses.includes(option.value)&&(current.topic==='alle'||item.topics.includes(current.topic)));
 const matches=indexed.filter(entry=>matchesPractice(entry.item,current,records.get(entry.item.id)!.status));const visible=new Set(matches.slice(0,limit).map(entry=>entry.item.id));
 const needsReview=new Map<string,{title:string;id:string}>();let complete=0,review=0,active=0,model=0;
 for(const {card,item}of indexed){
  const record=records.get(item.id)!;card.hidden=!visible.has(item.id);
  if(record.status==='complete'){complete++;if(record.source==='model')model++;}if(record.status==='review')review++;if(record.status==='active')active++;
  const cardSelect=card.querySelector<HTMLSelectElement>('[data-card-status-select]');if(cardSelect){cardSelect.disabled=false;cardSelect.value=record.status;}
  card.querySelector('[data-card-status]')!.textContent=practiceLabels[locale][record.status]+(record.status==='complete'?(record.source==='model'?t(' · Modellprüfung bestanden',' · model check passed'):t(' · selbst eingeschätzt',' · self-assessed')):'');
  const quizIds=(card.dataset.questionIds??'').split(' ').filter(Boolean);
  const evidence=practiceQuizEvidence(learningState.user?learningState.items:[],quizIds);
  card.querySelector('[data-card-quiz]')!.textContent=evidence.answered?t(`Konto-Quiz: ${evidence.correct}/${evidence.answered} bearbeitete Fragen bereits richtig gelöst.`,`Account quiz: ${evidence.correct}/${evidence.answered} practised questions already solved correctly.`):'';
  for(const questionId of evidence.review)needsReview.set(questionId,{title:card.querySelector('[data-practice-title]')!.textContent??'',id:questionId});
 }
 for(const group of root.querySelectorAll<HTMLElement>('[data-practice-course-group]'))group.hidden=!group.querySelector('[data-practice-card]:not([hidden])');
 for(const group of root.querySelectorAll<HTMLElement>('[data-practice-topic-group]')){const count=group.querySelectorAll('[data-practice-card]:not([hidden])').length;group.hidden=count===0;group.querySelector('[data-group-count]')!.textContent=t(`${count} angezeigt`,`${count} shown`);}
 root.querySelector('[data-exercise-count]')!.textContent=t(Math.min(limit,matches.length)+' von '+matches.length+' passenden Aufgaben angezeigt',Math.min(limit,matches.length)+' of '+matches.length+' matching tasks shown');
 root.querySelector('[data-practice-summary]')!.textContent=t(`Abgeschlossen: ${complete} (davon Modellprüfungen: ${model}); in Arbeit: ${active}; Wiederholen: ${review}.`,`${complete} completed (${model} model checks), ${active} in progress, ${review} for review.`);
 const weaknesses=root.querySelector<HTMLElement>('[data-practice-weaknesses]')!;weaknesses.replaceChildren();
 if(review){const link=document.createElement('a');link.href=pagePath('/uebungen/?status=review#aufgaben');link.textContent=t('Aufgaben mit Wiederholbedarf öffnen →','Open tasks needing review →');weaknesses.append(link);}
 if(needsReview.size){const text=document.createElement('p');text.textContent=t(`Konto: ${needsReview.size} bearbeitete Fragen noch ohne richtige Lösung. Keine vollständige Kompetenzbewertung.`,`Account: ${needsReview.size} practised questions without a correct solution yet. Not a complete skill assessment.`);weaknesses.append(text);
  const list=document.createElement('ul');for(const question of [...needsReview.values()].slice(0,5)){const li=document.createElement('li'),a=document.createElement('a');a.href=pagePath(`/quiz/?frage=${encodeURIComponent(question.id)}`);a.textContent=t('Wiederholen: ','Review: ')+question.title;li.append(a);list.append(li);}weaknesses.append(list);
 }
 const warning=root.querySelector<HTMLElement>('[data-practice-storage-warning]')!;warning.hidden=items.every(item=>practiceIsSaved(item.id))&&readPracticeRecord(practiceStorage,items[0]!.id).available;warning.textContent=t('Gerätespeicherung nicht möglich. Neue Statusänderungen gelten nur bis zum Neuladen.','Device storage unavailable. New status changes last only until reload.');
 root.querySelector<HTMLElement>('[data-exercises-empty]')!.hidden=matches.length>0;more.hidden=matches.length<=limit;
 if(sync)history.replaceState(history.state,'',practiceSelectionUrl(new URL(location.href),current));
 return matches;
}
function apply(value:PracticeSelection){search.value=value.search;topic.value=value.topic;course.value=value.course;level.value=value.level;kind.value=value.kind;status.value=value.status??'alle';}
function restore(){limit=18;apply(readPracticeSelection(new URLSearchParams(location.search),items));render(false);}
search.addEventListener('input',()=>{limit=18;render();});
for(const select of [topic,course,level,kind,status])select.addEventListener('change',()=>{limit=18;render();});
for(const {card,item}of indexed)card.querySelector<HTMLSelectElement>('[data-card-status-select]')?.addEventListener('change',event=>{const selected=(event.currentTarget as HTMLSelectElement).value as PracticeStatus;const saved=setPracticeStatus(item.id,selected);if(card.hidden)status.focus();root.querySelector('[data-practice-action]')!.textContent=practiceLabels[locale][selected]+': '+(saved?t('gespeichert','saved'):t('nicht gespeichert','not saved'));card.querySelector('[data-card-save]')!.textContent=saved?t('Auf diesem Gerät gespeichert.','Saved on this device.'):t('Nur vorübergehend; Gerätespeicherung fehlgeschlagen.','Temporary only; device saving failed.');});
root.querySelector('[data-reset-exercise-filter]')!.addEventListener('click',()=>{limit=18;apply(emptyPracticeSelection());render();search.focus();});
more.addEventListener('click',()=>{const previous=limit;limit+=18;const matches=render(false);matches[previous]?.card.querySelector<HTMLAnchorElement>('[data-practice-title]')?.focus();});
document.addEventListener('practice-state-change',()=>{for(const item of items)records.set(item.id,practiceRecord(item.id));render(false);});
document.addEventListener('learning-state-change',()=>render(false));void learningReady.then(()=>render(false));
window.addEventListener('popstate',restore);restore();
