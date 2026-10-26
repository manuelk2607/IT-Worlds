import type {Topic} from './content.ts';
import type {Locale} from '../lib/locale.ts';

export const TYPESETTING_TOPIC_ID = 'textsatz-dokumentenerstellung';
export const TYPESETTING_TOPIC_PATH = '/textsatz/';

export function typesettingTopic(locale:Locale):Topic {
  const t=(de:string,en:string)=>locale==='en'?en:de;
  return {
    id:TYPESETTING_TOPIC_ID,
    title:t('Textsatz & Dokumentenerstellung','Typesetting & document creation'),
    short:t('Strukturierte Dokumente mit Typst und LaTeX gestalten.','Create structured documents with Typst and LaTeX.'),
    icon:'document',color:'purple',group:'bauen',
    description:t('Lerne Typst als empfohlenen modernen Einstieg und LaTeX als etabliertes TeX-Ökosystem kennen. Erstelle Projekte extern, prüfe Quellen lokal und behalte deinen Lernfortschritt.','Learn Typst as the recommended modern starting point and LaTeX as the established TeX ecosystem. Create projects externally, check sources locally and retain your learning progress.'),
    tags:['Typst','LaTeX',t('Dokumentprüfung','Document checks')],
    prerequisites:t('Keine Textsatzkenntnisse erforderlich.','No typesetting experience required.'),
    curriculum:{
      einstieg:[t('Typst zuerst kennenlernen','Start with Typst'),t('LaTeX-Grundlagen einordnen','Understand LaTeX foundations'),t('Dokumente strukturieren','Structure documents')],
      vertiefung:[t('Mathematik, Tabellen & Grafiken','Mathematics, tables & figures'),t('Literatur & Verweise','Bibliography & references'),t('Projekte lokal prüfen','Check projects locally')],
      profi:[t('Vorlagen & eigene Funktionen','Templates & custom functions'),t('Komplexe Dokumente planen','Plan complex documents'),t('Barrierefreiheit & Qualität','Accessibility & quality')],
    },
    sources:['typst','latex'],
  };
}

export function courseCatalogTopic(course: { id: string; topic: string }): string {
  return course.id === 'latex' || course.id === 'typst' ? TYPESETTING_TOPIC_ID : course.topic;
}

export function isTypesettingCourse(course: { id: string }): boolean {
  return course.id === 'latex' || course.id === 'typst';
}
