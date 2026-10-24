import type { Level, SourceId } from './content.ts';
import type { Bilingual, Course } from './course-types.ts';
export interface Exercise {
  /** Stable across translations; legacy topic IDs also preserve existing draft keys. */
  id: string;
  topic: string;
  level: Level;
  course?: Course['id'];
  chapter?: string;
  title: Bilingual;
  task: Bilingual;
  format: string;
  starter: string;
  solution: string;
  hint: Bilingual;
  sources: SourceId[];
}
export function exercisePath(exercise: Pick<Exercise, 'id' | 'topic'>): string {
  return exercise.id === exercise.topic ? `/themen/${exercise.topic}/#uebungseditor` : `/uebungen/${exercise.id}/`;
}
