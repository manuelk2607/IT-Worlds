import {t} from './browser-i18n.ts';
import {normalizeSearch} from '../lib/search.ts';
import {emptyPracticeSelection,readPracticeSelection,matchesPractice,practiceSelectionUrl,type PracticeMetadata,type PracticeSelection} from '../lib/practice-catalog.ts';
const root=document.querySelector<HTMLElement>('[data-practice-catalog]')!;
const search=root.querySelector<HTMLInputElement>('#exercise-search')!;
const topic=root.querySelector<HTMLSelectElement>('#exercise-topic')!,course=root.querySelector<HTMLSelectElement>('#exercise-course')!,level=root.querySelector<HTMLSelectElement>('#exercise-level')!,kind=root.querySelector<HTMLSelectElement>('#exercise-kind')!;
const more=root.querySelector<HTMLButtonElement>('[data-practice-more]')!;
const indexed=[...root.querySelectorAll<HTMLElement>('[data-practice-card]')].map(card=>({card,item:{id:card.dataset.practiceCard!,topics:(card.dataset.topics??'').split(' ').filter(Boolean),courses:(card.dataset.courses??'').split(' ').filter(Boolean),level:card.dataset.level!,kind:card.dataset.kind!,text:normalizeSearch(card.dataset.search??'')} satisfies PracticeMetadata}));
const items=indexed.map(entry=>entry.item);let limit=18;
function selection():PracticeSelection{return{search:search.value,topic:topic.value,course:course.value,level:level.value,kind:kind.value};}
function render(sync=true){
 const current=selection();
 if(current.course!=='alle'&&!items.some(item=>item.courses.includes(current.course)&&(current.topic==='alle'||item.topics.includes(current.topic))))course.value=current.course='alle';
 for(const option of course.options)option.disabled=option.value!=='alle'&&!items.some(item=>item.courses.includes(option.value)&&(current.topic==='alle'||item.topics.includes(current.topic)));
 const matches=indexed.filter(entry=>matchesPractice(entry.item,current));const visible=new Set(matches.slice(0,limit).map(entry=>entry.item.id));
 for(const {card,item}of indexed)card.hidden=!visible.has(item.id);
 root.querySelector('[data-exercise-count]')!.textContent=t(Math.min(limit,matches.length)+' von '+matches.length+' passenden Aufgaben angezeigt',Math.min(limit,matches.length)+' of '+matches.length+' matching tasks shown');
 root.querySelector<HTMLElement>('[data-exercises-empty]')!.hidden=matches.length>0;more.hidden=matches.length<=limit;
 if(sync)history.replaceState(history.state,'',practiceSelectionUrl(new URL(location.href),current));
 return matches;
}
function apply(value:PracticeSelection){search.value=value.search;topic.value=value.topic;course.value=value.course;level.value=value.level;kind.value=value.kind;}
function restore(){limit=18;apply(readPracticeSelection(new URLSearchParams(location.search),items));render(false);}
search.addEventListener('input',()=>{limit=18;render();});
for(const select of [topic,course,level,kind])select.addEventListener('change',()=>{limit=18;render();});
root.querySelector('[data-reset-exercise-filter]')!.addEventListener('click',()=>{limit=18;apply(emptyPracticeSelection());render();search.focus();});
more.addEventListener('click',()=>{const previous=limit;limit+=18;const matches=render(false);matches[previous]?.card.querySelector<HTMLAnchorElement>('h3 a')?.focus();});
window.addEventListener('popstate',restore);restore();
