import {normalizeSearch} from '../lib/search.ts';
import {t} from './browser-i18n.ts';
const root=document.querySelector<HTMLElement>('[data-glossary]');
if(root){
 const query=root.querySelector<HTMLInputElement>('[data-glossary-search]')!,topic=root.querySelector<HTMLSelectElement>('[data-glossary-topic]')!;
 const cards=Array.from(root.querySelectorAll<HTMLElement>('[data-glossary-item]')).map(card=>({card,text:normalizeSearch(card.dataset.search??'')}));
 const render=(sync:boolean)=>{
  const words=normalizeSearch(query.value).split(' ').filter(Boolean);let count=0;
  for(const {card,text}of cards){card.hidden=(topic.value!=='all'&&card.dataset.topic!==topic.value)||!words.every(word=>text.includes(word));if(!card.hidden)count++;}
  root.querySelector<HTMLElement>('[data-glossary-status]')!.textContent=t(`${count} von ${cards.length} Begriffen`,`${count} of ${cards.length} terms`);
  root.querySelector<HTMLElement>('[data-glossary-empty]')!.hidden=count>0;
  if(sync){const url=new URL(location.href);url.searchParams.delete('suche');url.searchParams.delete('thema');if(query.value.trim())url.searchParams.set('suche',query.value.trim().slice(0,100));if(topic.value!=='all')url.searchParams.set('thema',topic.value);history.replaceState(null,'',url);}
 };
 const restore=()=>{const params=new URLSearchParams(location.search);query.value=(params.get('suche')??'').slice(0,100);const chosen=params.get('thema');topic.value=Array.from(topic.options).some(option=>option.value===chosen)?chosen!:'all';render(false);};
 query.addEventListener('input',()=>render(true));topic.addEventListener('change',()=>render(true));root.querySelector('[data-glossary-reset]')!.addEventListener('click',()=>{query.value='';topic.value='all';render(true);query.focus();});window.addEventListener('popstate',restore);restore();
}
