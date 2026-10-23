import { topics, questions } from '../data/content.ts';
import { courseChapters } from '../data/courses.ts';

export type ProgressKind = 'lesson' | 'question';
export interface ProgressItem {
  kind: ProgressKind;
  contentId: string;
  completed: boolean;
  solved: boolean;
  updatedAt: string;
}
export interface ProgressChange {
  kind: ProgressKind;
  contentId: string;
  completed: boolean;
  selectedOption?: number;
}
export const lessonIds = [...topics.filter(topic => topic.lesson).map(topic => topic.id), ...courseChapters.map(chapter => chapter.id)];
export const questionIds = questions.map(question => question.id);
export function parseProgressChange(value: unknown): ProgressChange | null {
  if (!value || typeof value !== 'object') return null;
  if (!('kind' in value) || !('contentId' in value) || !('completed' in value)) return null;
  const { kind, contentId, completed } = value;
  if ((kind !== 'lesson' && kind !== 'question') || typeof contentId !== 'string' || typeof completed !== 'boolean') return null;
  if (!(kind === 'lesson' ? lessonIds : questionIds).includes(contentId)) return null;
  const selectedOption = 'selectedOption' in value ? value.selectedOption : undefined;
  if (selectedOption !== undefined) {
    const question = questions.find(question => question.id === contentId);
    if (kind !== 'question' || !completed || !question || typeof selectedOption !== 'number' || !Number.isInteger(selectedOption) || selectedOption < 0 || selectedOption >= question.options.length) return null;
    return { kind, contentId, completed, selectedOption };
  }
  return { kind, contentId, completed };
}
export function isCorrectAnswer(change: ProgressChange): boolean {
  return change.kind === 'question' && change.completed && change.selectedOption !== undefined && questions.find(question => question.id === change.contentId)?.answer === change.selectedOption;
}
