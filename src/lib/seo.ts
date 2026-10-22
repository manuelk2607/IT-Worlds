import { topics, paths, sources } from '../data/content.ts';
import { localePath, type Locale } from './locale.ts';
export const SITE_URL = 'https://it-worlds.maki26.workers.dev';
export const publicPaths = ['/', '/lernpfade/', '/quiz/', '/quellen/', '/uebungen/',
  ...topics.map(topic=>`/themen/${topic.id}/`), ...paths.map(path=>`/lernpfade/${path.id}/`)];
export const publicUrls = publicPaths.flatMap(path=>(['de','en'] as const).map(locale=>new URL(localePath(locale,path),SITE_URL).href));
export function pageSeo(pathname: string, locale: Locale, title: string, description: string) {
  const canonical = new URL(pathname,SITE_URL).href;
  const germanPath = pathname.replace(/^\/en(?=\/|$)/,'') || '/';
  const noindex = /^\/(konto|fortschritt|404)(\/|\.html|$)/.test(germanPath);
  const languages = {de:new URL(germanPath,SITE_URL).href,en:new URL(`/en${germanPath}`,SITE_URL).href};
  const topic = topics.find(item=>germanPath===`/themen/${item.id}/`);
  const webPage = {
    '@type': topic?.lesson ? ['WebPage','LearningResource'] : ['WebPage'],
    '@id':`${canonical}#page`,url:canonical,name:title,description,inLanguage:locale,
    isPartOf:{'@id':`${SITE_URL}/#website`},isAccessibleForFree:true,
    ...(topic?.lesson ? {learningResourceType:'Introductory article',educationalLevel:'Beginner',citation:topic.lesson.sources.map(id=>sources[id].url)} : {}),
  };
  const graph = [
    {'@type':'WebSite','@id':`${SITE_URL}/#website`,url:`${SITE_URL}/`,name:'IT-Worlds',inLanguage:['de','en'],publisher:{'@id':`${SITE_URL}/#organization`}},
    {'@type':'Organization','@id':`${SITE_URL}/#organization`,name:'IT-Worlds',url:`${SITE_URL}/`,sameAs:['https://github.com/manuelk2607/IT-Worlds']},
    webPage,
    ...(germanPath==='/' ? [] : [{'@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:locale==='de'?'Startseite':'Home',item:new URL(localePath(locale,'/'),SITE_URL).href},
      {'@type':'ListItem',position:2,name:title,item:canonical},
    ]}]),
  ];
  return {canonical,languages,noindex,image:`${SITE_URL}/images/social-${locale}.png`,
    structuredData:JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')};
}
