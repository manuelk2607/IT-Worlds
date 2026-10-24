import { getContent, localePath, type Locale } from './i18n.ts';
import { courses, coursePath } from '../data/courses.ts';
import { exercises, exercisePath } from '../data/exercises.ts';
import type { SearchEntry } from './search.ts';
export function createSearchIndex(locale: Locale): SearchEntry[] {
 const {topics,paths,levelName}=getContent(locale);
 return [
  ...courses.map(course=>({id:`course-${course.id}`,kind:'course' as const,title:course.title[locale],description:course.description[locale],context:locale==='de'?'Kurs · alle Kapitel verfügbar':'Course · all chapters available',url:localePath(locale,coursePath(course)),text:course.prerequisites[locale]+' '+course.chapters.map(c=>c.title[locale]).join(' ')})),
  ...topics.map(topic=>({id:`topic-${topic.id}`,kind:'topic' as const,title:topic.title,description:topic.short,context:locale==='de'?'Themenwelt':'Topic',url:localePath(locale,`/themen/${topic.id}/`),text:`${topic.description} ${topic.tags.join(' ')} ${Object.values(topic.curriculum).flat().join(' ')}`})),
  ...courses.flatMap(course=>course.chapters.map(chapter=>({id:`chapter-${course.id}-${chapter.id}`,kind:'chapter' as const,title:chapter.title[locale],description:chapter.goals.map(g=>g[locale]).join(' '),context:`${course.title[locale]} · ${levelName(chapter.level)}`,url:localePath(locale,coursePath(course,chapter)),text:chapter.sections.map(s=>s.title[locale]+' '+s.paragraphs.map(p=>p[locale]).join(' ')).join(' ')}))),
  ...paths.filter(path=>!path.course).map(path=>({id:`path-${path.id}`,kind:'path' as const,title:path.title,description:path.description,context:path.steps.every(step=>step.available)?(locale==='de'?'Lernpfad · alle Schritte verfügbar':'Learning path · all steps available'):(locale==='de'?'Lernpfad · teilweise geplant':'Learning path · partly planned'),url:localePath(locale,`/lernpfade/${path.id}/`),text:(path.outcome??'')+' '+path.steps.map(s=>s.title+' '+(s.note??'')).join(' ')})),
  ...exercises.map(exercise=>({id:`exercise-${exercise.id}`,kind:'exercise' as const,title:exercise.title[locale],description:exercise.task[locale],context:[locale==='de'?'Editor-Aufgabe':'Editor exercise',levelName(exercise.level),courses.find(item=>item.id===exercise.course)?.title[locale]??topics.find(item=>item.id===exercise.topic)!.title].join(' · '),url:localePath(locale,exercisePath(exercise)),text:exercise.task[locale]+' '+exercise.format})),
 ];
}
