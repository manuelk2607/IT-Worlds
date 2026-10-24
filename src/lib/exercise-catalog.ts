import type { Exercise } from '../data/exercise-types.ts';
import type { Locale } from './locale.ts';
import { normalizeSearch } from './search.ts';
export interface ExerciseSelection {search:string; topic:string; course:string; level:string}
export const emptyExerciseSelection = (): ExerciseSelection => ({search:'',topic:'alle',course:'alle',level:'alle'});
export function readExerciseSelection(params: URLSearchParams, exercises: readonly Exercise[]): ExerciseSelection {
  const selection = emptyExerciseSelection();
  selection.search = params.get('suche') ?? '';
  const topic = params.get('thema');
  const course = params.get('kurs');
  const level = params.get('stufe');
  if (exercises.some(item=>item.topic===topic)) selection.topic = topic!;
  if (exercises.some(item=>item.course===course && (selection.topic==='alle' || item.topic===selection.topic))) selection.course = course!;
  if (['einstieg','vertiefung','profi'].includes(level ?? '')) selection.level = level!;
  return selection;
}
export function matchesExercise(exercise: Exercise, selection: ExerciseSelection, locale: Locale, context = ''): boolean {
  return (selection.topic==='alle' || exercise.topic===selection.topic) && (selection.course==='alle' || exercise.course===selection.course) && (selection.level==='alle' || exercise.level===selection.level) && normalizeSearch(selection.search).split(' ').filter(Boolean).every(word=>normalizeSearch(`${exercise.title[locale]} ${exercise.task[locale]} ${exercise.format} ${context}`).includes(word));
}
export function exerciseSelectionUrl(url: URL, selection: ExerciseSelection): URL {
  const next = new URL(url);
  for (const [name, value] of [['suche',selection.search.trim()],['thema',selection.topic],['kurs',selection.course],['stufe',selection.level]]) {
    if (!value || value==='alle') next.searchParams.delete(name); else next.searchParams.set(name,value);
  }
  return next;
}
