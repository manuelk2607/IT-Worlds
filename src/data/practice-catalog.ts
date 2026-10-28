import {exercises,exercisePath} from './exercises.ts';
import {courses,courseChapters} from './courses.ts';
import {practiceProjects} from './practice-projects.ts';
import {courseCatalogTopic} from './topic-categories.ts';
import type {Bilingual,Course} from './course-types.ts';
import type {Level} from './content.ts';
export type PracticeKind='editor'|'chapter'|'document'|'project';
export interface PracticeItem {id:string;kind:PracticeKind;topics:string[];courses:Course['id'][];level:Level;title:Bilingual;task:Bilingual;href:string;context:Bilingual}
const emptyContext={de:'Einstiegsaufgabe',en:'Introductory task'};
export const practiceItems:PracticeItem[]=[
 ...exercises.map(item=>({id:`editor-${item.id}`,kind:'editor' as const,topics:[courseCatalogTopic({id:item.course??'',topic:item.topic})],courses:item.course?[item.course]:[],level:item.level,title:item.title,task:item.task,href:exercisePath(item),context:courses.find(course=>course.id===item.course)?.title??emptyContext})),
 ...courseChapters.map(({course,chapter,id,url})=>({id:`chapter-${id}`,kind:(['typst','latex'].includes(course.id)?'document':'chapter') as PracticeKind,topics:[courseCatalogTopic(course)],courses:[course.id],level:chapter.level,title:chapter.title,task:chapter.exercise,href:`${url}#aufgabe`,context:course.title})),
 ...practiceProjects.map(project=>({id:`project-${project.id}`,kind:'project' as const,topics:[...new Set(project.courses.map(id=>courseCatalogTopic(courses.find(course=>course.id===id)!)))],courses:project.courses as Course['id'][],level:'profi' as const,title:project.title,task:project.description,href:project.path,context:{de:'Vollständiges lokales Praxisprojekt',en:'Complete local practice project'}})),
];
export const practiceKindLabels:Record<PracticeKind,Bilingual>={editor:{de:'Browser-Modellaufgabe',en:'Browser model exercise'},chapter:{de:'Kapitelaufgabe mit Lösung',en:'Chapter task with solution'},document:{de:'Externe Dokumentaufgabe',en:'External document task'},project:{de:'Lokales Praxisprojekt',en:'Local practice project'}};
