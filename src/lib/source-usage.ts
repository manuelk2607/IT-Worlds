import {orderingChallenges} from '../data/practice-challenges.ts';
import {sources,topics,type SourceId} from '../data/content.ts';
import {courses} from '../data/courses.ts';
import {exercises} from '../data/exercises.ts';
import {practiceProjects} from '../data/practice-projects.ts';
import {courseCatalogTopic,TYPESETTING_TOPIC_ID} from '../data/topic-categories.ts';
import {exerciseCatalogTopic} from './exercise-catalog.ts';
/** Reference usage, rather than title keywords, determines a source's topic membership. */
export function sourceTopicIndex():Record<SourceId,string[]> {
  const entries=Object.keys(sources).map((id):[string,string[]]=>[id,[]]);
  const result=Object.fromEntries(entries) as Record<SourceId,string[]>;
  const add=(id:SourceId,topic:string)=>{if(!result[id].includes(topic))result[id].push(topic);};
  for(const topic of topics)for(const id of [...topic.sources,...(topic.lesson?.sources??[]),...(topic.subareas??[]).flatMap(area=>area.sources)])add(id,topic.id);
  for(const course of courses)for(const chapter of course.chapters)for(const id of [...chapter.sources,...chapter.questions.map(question=>question.source)])add(id,courseCatalogTopic(course));
  for(const exercise of exercises)for(const id of exercise.sources)add(id,exerciseCatalogTopic(exercise));
  for(const item of orderingChallenges)for(const id of item.sources)add(id,item.topic);
  for(const project of practiceProjects)for(const courseId of project.courses){const course=courses.find(course=>course.id===courseId)!;for(const id of project.sources)add(id,courseCatalogTopic(course));}
  // The portal itself compares both systems and therefore cites their official introductions.
  add('typst',TYPESETTING_TOPIC_ID);add('latex',TYPESETTING_TOPIC_ID);
  return result;
}
export const sourcePublishers=[...new Set(Object.values(sources).map(source=>source.publisher))].sort((a,b)=>a.localeCompare(b));
