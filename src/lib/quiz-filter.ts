export interface QuizFilter { topic: string; course: string; level: string; chapter: string; question: string }
export function matchesQuizFilter(item: { topic?: string; course?: string; level?: string; chapter?: string; question?: string }, filter: QuizFilter): boolean {
  return (Object.keys(filter) as (keyof QuizFilter)[]).every(key => filter[key] === 'alle' || filter[key] === '' || item[key] === filter[key]);
}
