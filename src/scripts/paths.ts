import {t} from './browser-i18n';
import {normalizeSearch} from '../lib/search';
const input=document.querySelector<HTMLInputElement>('#course-search')!;
const topic=document.querySelector<HTMLSelectElement>('#course-topic')!;
const cards=[...document.querySelectorAll<HTMLElement>('[data-catalog-course]')];
function filter(){
 const words=normalizeSearch(input.value).split(' ').filter(Boolean);let count=0;
 for(const card of cards){card.hidden=!(topic.value==='alle'||topic.value===card.dataset.topic)||!words.every(word=>normalizeSearch(card.dataset.title??'').includes(word));if(!card.hidden)count++;}
 document.querySelector('#course-count')!.textContent=t(`${count} ${count===1?"Kurs":"Kurse"} gefunden`,`${count} ${count===1?"course":"courses"} found`);
 document.querySelector<HTMLElement>('#courses-empty')!.hidden=count>0;
 const url=new URL(location.href);if(input.value.trim())url.searchParams.set('suche',input.value.trim());else url.searchParams.delete('suche');if(topic.value!=='alle')url.searchParams.set('thema',topic.value);else url.searchParams.delete('thema');history.replaceState(null,'',url);
}
input.addEventListener('input',filter);topic.addEventListener('change',filter);
document.querySelector('#reset-course-filter')!.addEventListener('click',()=>{input.value='';topic.value='alle';filter();input.focus();});
const params=new URLSearchParams(location.search);input.value=params.get('suche')??'';const selected=params.get('thema');if([...topic.options].some(option=>option.value===selected))topic.value=selected!;filter();
