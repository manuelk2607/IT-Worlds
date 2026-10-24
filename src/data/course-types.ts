import type { Level, SourceId, Question } from './content.ts';
import type { Locale } from '../lib/locale.ts';

export type Bilingual = { de: string; en: string };
export const text = (de: string, en: string): Bilingual => ({ de, en });
export interface CourseSection {
  title: Bilingual;
  paragraphs: Bilingual[];
  runtime?: 'browser' | 'node';
  formula?: string;
  code?: string;
  language?: 'Python' | 'LaTeX' | 'BibTeX' | 'Shell' | 'SQL' | 'TypeScript' | 'HTML' | 'CSS' | 'JSON' | 'YAML' | 'Dockerfile' | 'Markdown' | 'Typst' | 'GDScript' | 'C#' | 'C++';
}
export interface CourseQuestion {
  prompt: Bilingual;
  options: { text: Bilingual; explanation: Bilingual }[];
  answer: number;
  source: SourceId;
}
export interface Chapter {
  id: string;
  title: Bilingual;
  level: Level;
  goals: Bilingual[];
  sections: CourseSection[];
  exercise: Bilingual;
  solution: Bilingual;
  sources: SourceId[];
  questions: CourseQuestion[];
}
export interface Course {
  id: 'ki' | 'latex' | 'datenbanken' | 'apis' | 'typescript' | 'web' | 'grundlagen' | 'linux' | 'netzwerke' | 'sicherheit' | 'devops' | 'python' | 'betriebssysteme' | 'markdown' | 'typst' | 'hardware' | 'tippen' | 'spiele';
  topic: string;
  slug: string;
  title: Bilingual;
  description: Bilingual;
  prerequisites: Bilingual;
  related?: Course['id'][];
  chapters: Chapter[];
}
export const option = (de: string, en: string, reasonDe: string, reasonEn: string) => ({ text: text(de, en), explanation: text(reasonDe, reasonEn) });
export function coursePath(course: Course, chapter?: Chapter): string {
  return `/themen/${course.topic}/${course.slug}/${chapter ? `${chapter.id}/` : ''}`;
}
export function chapterProgressId(course: Course, chapter: Chapter): string { return `${course.id}-${chapter.id}`; }
export function localizeQuestion(course: Course, chapter: Chapter, question: CourseQuestion, index: number, locale: Locale): Question {
  return { id: `${chapterProgressId(course, chapter)}-${index + 1}`, topic: course.topic, course: course.id, chapter: chapter.id,
    level: chapter.level, prompt: question.prompt[locale], answer: question.answer, source: question.source,
    options: question.options.map(value => ({ text: value.text[locale], explanation: value.explanation[locale] })) };
}

// Shared structure keeps translations, exercises and quiz IDs aligned.
export const question = (prompt: Bilingual, source: SourceId, answer: number, options: CourseQuestion['options']): CourseQuestion => ({ prompt, source, answer, options });
export const chapter = (id: string, title: Bilingual, level: Level, goals: Bilingual[], sections: Chapter['sections'], exercise: Bilingual, solution: Bilingual, sources: SourceId[], questions: CourseQuestion[]): Chapter => ({ id, title, level, goals, sections, exercise, solution, sources, questions });
