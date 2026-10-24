import { exercises, exercisePath } from '../data/exercises.ts';
import {getContent} from './i18n.ts';
import { topics, paths, sources } from '../data/content.ts';
import { courses, courseChapters, coursePath } from '../data/courses.ts';
import { localePath, type Locale } from './locale.ts';
export const SITE_URL = 'https://it-worlds.maki26.workers.dev';
export const publicPaths = ['/', '/lernen/', '/lernpfade/', '/quiz/', '/quellen/', '/uebungen/', '/schreibtrainer/',
  ...exercises.filter(exercise=>exercise.id!==exercise.topic).map(exercisePath), ...topics.map(topic=>`/themen/${topic.id}/`), ...paths.map(path=>`/lernpfade/${path.id}/`), ...courses.map(course => coursePath(course)), ...courseChapters.map(chapter => chapter.url)];
export const publicUrls = publicPaths.flatMap(path=>(['de','en'] as const).map(locale=>new URL(localePath(locale,path),SITE_URL).href));
export function pageSeo(pathname: string, locale: Locale, title: string, description: string) {
  const canonical = new URL(pathname,SITE_URL).href;
  const germanPath = pathname.replace(/^\/en(?=\/|$)/,'') || '/';
  const noindex = /^\/(konto|fortschritt|404)(\/|\.html|$)/.test(germanPath);
  const languages = {de:new URL(germanPath,SITE_URL).href,en:new URL(`/en${germanPath}`,SITE_URL).href};
  const topic = topics.find(item=>germanPath===`/themen/${item.id}/`);
  const exercise = exercises.find(item=>item.id!==item.topic && exercisePath(item)===germanPath);
  const chapterEntry = courseChapters.find(item => item.url === germanPath);
  const chapter = chapterEntry?.chapter;
  const course = chapterEntry?.course ?? courses.find(item=>coursePath(item)===germanPath);
  const localized = getContent(locale);
  const breadcrumbItems = [{name:locale==='de'?'Startseite':'Home',path:'/'}];
  if(exercise) {breadcrumbItems.push({name:locale==='de'?'Übungen':'Exercises',path:'/uebungen/'});const parent=courses.find(item=>item.id===exercise.course);if(parent)breadcrumbItems.push({name:parent.title[locale],path:coursePath(parent)});}
  if(course){breadcrumbItems.push({name:locale==='de'?'Kurse':'Courses',path:'/lernpfade/'},{name:localized.topicById(course.topic)!.title,path:`/themen/${course.topic}/`});if(chapter)breadcrumbItems.push({name:course.title[locale],path:coursePath(course)});}
  if(germanPath!=='/')breadcrumbItems.push({name:title,path:germanPath});
  const webPage = {
    '@type': topic?.lesson || chapter || exercise ? ['WebPage','LearningResource'] : ['WebPage'],
    '@id':`${canonical}#page`,url:canonical,name:title,description,inLanguage:locale,
    isPartOf:{'@id':`${SITE_URL}/#website`},isAccessibleForFree:true,
    ...(topic?.lesson ? {learningResourceType:'Introductory article',educationalLevel:'Beginner',citation:topic.lesson.sources.map(id=>sources[id].url)} : {}),
    ...(exercise ? {learningResourceType:'Practice exercise',educationalLevel:localized.levelName(exercise.level),citation:exercise.sources.map(id=>sources[id].url)} : {}),
    ...(chapter ? {learningResourceType:'Lesson',educationalLevel:localized.levelName(chapter.level),citation:chapter.sources.map(id=>sources[id].url)} : {}),
  };
  const graph = [
    {'@type':'WebSite','@id':`${SITE_URL}/#website`,url:`${SITE_URL}/`,name:'IT-Worlds',inLanguage:['de','en'],publisher:{'@id':`${SITE_URL}/#organization`}},
    {'@type':'Organization','@id':`${SITE_URL}/#organization`,name:'IT-Worlds',url:`${SITE_URL}/`,sameAs:['https://github.com/manuelk2607/IT-Worlds']},
    webPage,
    ...(germanPath==='/' ? [] : [{'@type':'BreadcrumbList',itemListElement:[
      ...breadcrumbItems.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:new URL(localePath(locale,item.path),SITE_URL).href})),
    ]}]),
  ];
  return {canonical,languages,noindex,image:`${SITE_URL}/images/social-${locale}.png`,
    structuredData:JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')};
}
