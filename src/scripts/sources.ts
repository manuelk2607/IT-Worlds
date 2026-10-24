import {readSourceSelection,matchesSource,sourceSelectionUrl,type SourceSelection} from '../lib/source-catalog.ts';
import {t} from './browser-i18n.ts';
const root=document.querySelector<HTMLElement>('[data-source-catalog]')!;
const search=root.querySelector<HTMLInputElement>('#source-search')!;
const topic=root.querySelector<HTMLSelectElement>('#source-topic')!;
const publisher=root.querySelector<HTMLSelectElement>('#source-publisher')!;
// Cache searchable text once, including metadata in collapsed evidence disclosures.
const cards=[...root.querySelectorAll<HTMLElement>('[data-source]')].map(card=>({card,text:card.textContent??'',topics:(card.dataset.sourceTopics??'').split(' '),publisher:card.dataset.sourcePublisher??''}));
function filter(){
  const selection:SourceSelection={search:search.value,topic:topic.value,publisher:publisher.value};let count=0;
  for(const entry of cards){entry.card.hidden=!matchesSource(entry.text,entry.topics,entry.publisher,selection);if(!entry.card.hidden)count++;}
  root.querySelector('[data-source-count]')!.textContent=t(`${count} ${count===1?'Quelle':'Quellen'} gefunden`,`${count} ${count===1?'source':'sources'} found`);
  root.querySelector<HTMLElement>('[data-sources-empty]')!.hidden=count>0;
  history.replaceState(history.state,'',sourceSelectionUrl(new URL(location.href),selection));
}
function restore(){const selection=readSourceSelection(new URLSearchParams(location.search),[...topic.options].map(option=>option.value),[...publisher.options].map(option=>option.value));search.value=selection.search;topic.value=selection.topic;publisher.value=selection.publisher;filter();}
search.addEventListener('input',filter);topic.addEventListener('change',filter);publisher.addEventListener('change',filter);
root.querySelector('[data-reset-sources]')!.addEventListener('click',()=>{search.value='';topic.value=publisher.value='alle';filter();search.focus();});
window.addEventListener('popstate',restore);restore();
