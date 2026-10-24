import { normalizeSearch } from './search.ts';
export interface SourceSelection {search:string; topic:string; publisher:string}
export const emptySourceSelection = ():SourceSelection => ({search:'',topic:'alle',publisher:'alle'});
export function readSourceSelection(params:URLSearchParams,topicIds:readonly string[],publishers:readonly string[]):SourceSelection {
  const selection=emptySourceSelection();
  selection.search=params.get('suche')??'';
  const topic=params.get('thema'),publisher=params.get('herausgeber');
  if(topicIds.includes(topic??''))selection.topic=topic!;
  if(publishers.includes(publisher??''))selection.publisher=publisher!;
  return selection;
}
export function matchesSource(searchText:string,topicIds:readonly string[],publisher:string,selection:SourceSelection):boolean {
  return (selection.topic==='alle'||topicIds.includes(selection.topic))&&(selection.publisher==='alle'||publisher===selection.publisher)&&normalizeSearch(selection.search).split(' ').filter(Boolean).every(word=>normalizeSearch(searchText).includes(word));
}
export function sourceSelectionUrl(url:URL,selection:SourceSelection):URL {
  const next=new URL(url);
  for(const [name,value] of [['suche',selection.search.trim()],['thema',selection.topic],['herausgeber',selection.publisher]]){
    if(!value||value==='alle')next.searchParams.delete(name);else next.searchParams.set(name,value);
  }
  return next;
}
