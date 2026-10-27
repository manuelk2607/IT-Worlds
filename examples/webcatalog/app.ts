import {courses,filteredCourses,parseSaved,selectionFrom,selectionUrl,type Course,type Selection} from './catalog.ts';
const storageKey='it-worlds-catalog-project:v1';let saved=new Set<string>(),storageAvailable=true;
try{saved=parseSaved(localStorage.getItem(storageKey));}catch{storageAvailable=false;}
const status=document.querySelector<HTMLElement>('#status');
function saveButton(course:Course):HTMLButtonElement{
 const button=document.createElement('button');button.type='button';
 const update=()=>{button.textContent=saved.has(course.id)?'Remove bookmark':'Bookmark';button.setAttribute('aria-label',button.textContent+' '+course.title);button.setAttribute('aria-pressed',String(saved.has(course.id)));};update();
 button.addEventListener('click',()=>{
  if(saved.has(course.id))saved.delete(course.id);else saved.add(course.id);
  try{localStorage.setItem(storageKey,JSON.stringify([...saved]));storageAvailable=true;}catch{storageAvailable=false;}
  update();if(status)status.textContent=storageAvailable?'Bookmarks saved on this device.':'Storage unavailable. Bookmarks work until you leave this page.';
  document.dispatchEvent(new Event('catalog-bookmarks'));
 });return button;
}
const list=document.querySelector<HTMLElement>('#courses');
if(list){
 const query=document.querySelector<HTMLInputElement>('#query')!,topic=document.querySelector<HTMLSelectElement>('#topic')!,savedOnly=document.querySelector<HTMLInputElement>('#saved-only')!,form=document.querySelector<HTMLFormElement>('#filters')!;
 const render=(syncUrl:boolean)=>{
  const selection:Selection={query:query.value.trim().slice(0,100),topic:topic.value,savedOnly:savedOnly.checked};
  const matches=filteredCourses(selection,saved);list.replaceChildren();
  for(const course of matches){
   const card=document.createElement('article'),heading=document.createElement('h2'),link=document.createElement('a'),summary=document.createElement('p');
   link.href=`course.html?id=${encodeURIComponent(course.id)}`;link.textContent=course.title;heading.append(link);summary.textContent=course.summary;card.append(heading,summary,saveButton(course));list.append(card);
  }
  document.querySelector<HTMLElement>('#count')!.textContent=`${matches.length} ${matches.length===1?'course':'courses'} found.`;
  document.querySelector<HTMLElement>('#empty')!.hidden=matches.length!==0;
  if(syncUrl)history.replaceState(null,'',selectionUrl(new URL(location.href),selection));
 };
 const restore=()=>{const state=selectionFrom(new URLSearchParams(location.search));query.value=state.query;topic.value=state.topic;savedOnly.checked=state.savedOnly;render(false);};
 form.addEventListener('submit',event=>{event.preventDefault();render(true);});query.addEventListener('input',()=>render(true));topic.addEventListener('change',()=>render(true));savedOnly.addEventListener('change',()=>render(true));
 document.querySelector<HTMLButtonElement>('#clear')!.addEventListener('click',()=>{query.value='';topic.value='all';savedOnly.checked=false;render(true);query.focus();});
 document.addEventListener('catalog-bookmarks',()=>{if(savedOnly.checked){render(false);query.focus();}});window.addEventListener('popstate',restore);restore();
}
const detail=document.querySelector<HTMLElement>('#course-detail');
if(detail){
 const id=new URLSearchParams(location.search).get('id'),course=courses.find(item=>item.id===id);
 const heading=document.querySelector<HTMLElement>('#course-title')!;
 if(course){heading.textContent=course.title;document.title=course.title+' | Learning catalog';const summary=document.createElement('p');summary.textContent=course.summary;detail.append(summary,saveButton(course));}
 else{heading.textContent='Course not found';const message=document.createElement('p');message.textContent='Choose an existing course from the catalog.';detail.append(message);}
}
if(!storageAvailable&&status)status.textContent='Storage unavailable. All course content remains accessible.';
