import {orderingChallenges,orderingPath} from './practice-challenges.ts';
import {exercises,exercisePath} from './exercises.ts';
import {courses,courseChapters} from './courses.ts';
import {practiceProjects} from './practice-projects.ts';
import {courseCatalogTopic} from './topic-categories.ts';
import type {Bilingual,Course} from './course-types.ts';
import type {Level} from './content.ts';
export type PracticeKind='editor'|'chapter'|'document'|'project'|'ordering';
export interface PracticeItem {id:string;kind:PracticeKind;topics:string[];courses:Course['id'][];level:Level;title:Bilingual;task:Bilingual;href:string;context:Bilingual;chapter?:string}
const emptyContext={de:'Einstiegsaufgabe',en:'Introductory task'};
export const practiceItems:PracticeItem[]=[
 ...orderingChallenges.map(item=>({id:`ordering-${item.id}`,kind:'ordering' as const,topics:[item.topic],courses:[item.course],level:item.level,title:item.title,task:item.task,href:orderingPath(item.id),context:courses.find(course=>course.id===item.course)!.title})),
 ...exercises.map(item=>({id:`editor-${item.id}`,kind:(['typst','latex'].includes(item.course??'')?'document':'editor') as PracticeKind,chapter:item.chapter,topics:[courseCatalogTopic({id:item.course??'',topic:item.topic})],courses:item.course?[item.course]:[],level:item.level,title:item.title,task:item.task,href:exercisePath(item),context:courses.find(course=>course.id===item.course)?.title??emptyContext})),
 ...courseChapters.map(({course,chapter,id,url})=>({id:`chapter-${id}`,kind:(['typst','latex'].includes(course.id)?'document':'chapter') as PracticeKind,chapter:chapter.id,topics:[courseCatalogTopic(course)],courses:[course.id],level:chapter.level,title:chapter.title,task:chapter.exercise,href:`${url}#aufgabe`,context:course.title})),
 ...practiceProjects.map(project=>({id:`project-${project.id}`,kind:'project' as const,topics:[...new Set(project.courses.map(id=>courseCatalogTopic(courses.find(course=>course.id===id)!)))],courses:project.courses as Course['id'][],level:project.level,title:project.title,task:project.description,href:project.path,context:{de:'Vollständiges lokales Praxisprojekt',en:'Complete local practice project'}})),
];
export const practiceKindLabels:Record<PracticeKind,Bilingual>={ordering:{de:'Ablauf ordnen',en:'Order a sequence'},editor:{de:'Browser-Modellaufgabe',en:'Browser model exercise'},chapter:{de:'Kapitelaufgabe mit Lösung',en:'Chapter task with solution'},document:{de:'Externe Dokumentaufgabe',en:'External document task'},project:{de:'Lokales Praxisprojekt',en:'Local practice project'}};
/** One canonical location per card; all associations still participate in filtering. */
export function practiceHierarchy(items:readonly PracticeItem[]){
 const groups=new Map<string,Map<string,PracticeItem[]>>();
 for(const item of items){const topic=item.topics[0]!,course=item.courses[0]??'einstieg';
  if(!groups.has(topic))groups.set(topic,new Map());const subgroups=groups.get(topic)!;
  if(!subgroups.has(course))subgroups.set(course,[]);subgroups.get(course)!.push(item);
 }
 return [...groups].map(([topic,subgroups])=>({topic,subgroups:[...subgroups].map(([course,items])=>({course,items}))}));
}
