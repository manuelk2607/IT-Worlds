import {chapter,question,text,type Bilingual,type Chapter,type CourseSection} from './course-types.ts';
import type {Level,SourceId} from './content.ts';
type Answer=[Bilingual,Bilingual];
export const a=(de:string,en:string,whyDe:string,whyEn:string):Answer=>[text(de,en),text(whyDe,whyEn)];
export function ask(prompt:Bilingual,source:SourceId,right:Answer,wrong:Answer,other:Answer){
  const offset=prompt.de.length%3;
  const choices=[right,wrong,other];
  const ordered=[...choices.slice(offset),...choices.slice(0,offset)];
  return question(prompt,source,(3-offset)%3,ordered.map(([label,explanation])=>({text:label,explanation})));
}
export function unit(id:string,title:Bilingual,level:Level,goal:Bilingual,concept:Bilingual,practice:Bilingual,exercise:Bilingual,solution:Bilingual,sources:SourceId[],questions:Chapter['questions'],example?:Pick<CourseSection,'code'|'language'>):Chapter{
  return chapter(id,title,level,[goal],[{title:text('Verstehen und einordnen','Understand the concept'),paragraphs:[concept]},{title:text('Nachvollziehen und überprüfen','Work through and verify'),paragraphs:[practice],...example}],exercise,solution,sources,questions);
}
