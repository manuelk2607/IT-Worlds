import {t} from './browser-i18n';
import {normalizeSearch} from '../lib/search';
const input=document.querySelector<HTMLInputElement>('#course-search')!;
const topic=document.querySelector<HTMLSelectElement>('#course-topic')!;
const cards=[...document.querySelectorAll<HTMLElement>('[data-catalog-course]')];
const indexed=cards.map(card=>({card,text:normalizeSearch(card.dataset.title??'')}));
const groups=[...document.querySelectorAll<HTMLElement>('[data-course-group]')];
function filter(){
 const words=normalizeSearch(input.value).split(' ').filter(Boolean);let count=0;
 for(const {card,text} of indexed){card.hidden=!(topic.value==='alle'||topic.value===card.dataset.topic)||!words.every(word=>text.includes(word));if(!card.hidden)count++;}
 for(const group of groups){const visible=[...group.querySelectorAll<HTMLElement>('[data-catalog-course]')].filter(card=>!card.hidden).length;group.hidden=visible===0;group.querySelector('[data-course-group-count]')!.textContent=t(`${visible} ${visible===1?'Kurs':'Kurse'}`,`${visible} ${visible===1?'course':'courses'}`);}
 document.querySelector('#course-count')!.textContent=t(`${count} ${count===1?"Kurs":"Kurse"} gefunden`,`${count} ${count===1?"course":"courses"} found`);
 document.querySelector<HTMLElement>('#courses-empty')!.hidden=count>0;
 const url=new URL(location.href);if(input.value.trim())url.searchParams.set('suche',input.value.trim());else url.searchParams.delete('suche');if(topic.value!=='alle')url.searchParams.set('thema',topic.value);else url.searchParams.delete('thema');history.replaceState(history.state,'',url);
}
input.addEventListener('input',filter);topic.addEventListener('change',filter);
document.querySelector('#reset-course-filter')!.addEventListener('click',()=>{input.value='';topic.value='alle';filter();input.focus();});
function restore(){const params=new URLSearchParams(location.search);input.value=(params.get('suche')??'').slice(0,100);const selected=params.get('thema');topic.value=[...topic.options].some(option=>option.value===selected)?selected!:'alle';filter();}
window.addEventListener('popstate',restore);restore();
