import {locale,t} from './browser-i18n';
import {searchEntries,isSearchEntry,type SearchEntry} from '../lib/search';
const dialog=document.querySelector<HTMLDialogElement>('#search-dialog')!;
const input=document.querySelector<HTMLInputElement>('#global-search')!;
const filter=document.querySelector<HTMLSelectElement>('#search-kind')!;
const results=document.querySelector<HTMLElement>('#search-results')!;
const status=document.querySelector<HTMLElement>('#search-status')!;
const retry=document.querySelector<HTMLButtonElement>('[data-search-retry]')!;
let entries: SearchEntry[]|undefined;
let loading: Promise<void>|undefined;
function render() {
 if(!entries)return;
 const matches=searchEntries(entries,input.value,filter.value,12);
 results.replaceChildren();
 for(const entry of matches){
  const link=document.createElement('a');link.href=entry.url;link.dataset.searchItem='';
  const copy=document.createElement('span');copy.className='search-result-copy';
  const title=document.createElement('strong');title.textContent=entry.title;
  const context=document.createElement('small');context.textContent=entry.context;
  const description=document.createElement('span');description.className='search-result-description';description.textContent=entry.description;
  copy.append(title,context,description);link.append(copy);results.append(link);
 }
 status.textContent=matches.length ? input.value.trim()?t(`${matches.length} ${matches.length===1?"passendes Ergebnis":"passende Ergebnisse"}, höchstens 12 angezeigt.`,`${matches.length} matching ${matches.length===1?"result":"results"}, up to 12 shown.`):filter.value==='source'?t('Suche nach Titel, Herausgeber oder Abschnitt.','Search by title, publisher or section.'):t('Wähle einen Kurs oder suche nach einem Thema.','Choose a course or search for a topic.') : t('Keine Treffer. Kürze die Suche oder wähle „Alles“.','No results. Shorten your search or choose “Everything”.');
}
async function loadIndex() {
 if(entries){render();return;}
 if(loading)return loading;
 status.textContent=t('Suche wird geladen …','Loading search …');retry.hidden=true;
 loading=(async()=>{
  try{
   const response=await fetch(locale==='en'?'/en/suche.json':'/suche.json',{credentials:'omit'});
   if(!response.ok)throw new Error('Search unavailable');
   const data: unknown=await response.json();
   if(!Array.isArray(data)||!data.every(isSearchEntry))throw new Error('Invalid search index');
   entries=data;
   render();
  }catch{
   status.textContent=t('Die Suche konnte nicht geladen werden. Du kannst sie erneut laden oder die Themenübersicht nutzen.','Search could not load. Retry or use the topic overview.');retry.hidden=false;
  }finally{loading=undefined;}
 })();
 return loading;
}
function openSearch(){
 document.querySelector<HTMLButtonElement>('.mobile-menu-button[aria-expanded="true"]')?.click();
 if(!dialog.open)dialog.showModal();input.focus();void loadIndex();
}
document.querySelectorAll('[data-open-search]').forEach(button=>button.addEventListener('click',openSearch));
document.querySelector('[data-close-search]')!.addEventListener('click',()=>dialog.close());
retry.addEventListener('click',()=>{void loadIndex();});
input.addEventListener('input',render);filter.addEventListener('change',render);
dialog.addEventListener('click',event=>{
 // Same-page fragment links do not reload the page, so close the modal before navigation.
 if(event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.target instanceof Element&&event.target.closest('a[href]'))dialog.close();
 if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}
});
document.addEventListener('keydown',event=>{
 const target=event.target;
 if(event.key==='/'&&!dialog.open&&!(target instanceof HTMLInputElement||target instanceof HTMLTextAreaElement||target instanceof HTMLSelectElement||target instanceof HTMLElement&&target.isContentEditable)){
  event.preventDefault();openSearch();
 }
});
input.addEventListener('keydown',event=>{
 if(event.key==='ArrowDown'){event.preventDefault();results.querySelector<HTMLAnchorElement>('a')?.focus();}
 if(event.key==='Enter'){const first=results.querySelector<HTMLAnchorElement>('a');if(first){event.preventDefault();first.click();}}
});
results.addEventListener('keydown',event=>{
 const links=[...results.querySelectorAll<HTMLAnchorElement>('a')];
 const index=links.indexOf(document.activeElement as HTMLAnchorElement);
 if(event.key==='ArrowDown'){event.preventDefault();links[Math.min(index+1,links.length-1)]?.focus();}
 if(event.key==='ArrowUp'){event.preventDefault();if(index<=0)input.focus();else links[index-1]?.focus();}
});
