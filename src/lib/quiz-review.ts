import type {ProgressItem} from './progress.ts';
export type QuizReview = 'alle' | 'offen' | 'wiederholen' | 'richtig';
export function quizReview(value:string|null):QuizReview {
 return value==='offen'||value==='wiederholen'||value==='richtig'?value:'alle';
}
// A manual checkmark is practised, but does not establish a correct answer.
export function reviewQuestionIds(items:readonly ProgressItem[],review:QuizReview):Set<string>|null {
 if(review==='alle'||review==='offen')return review==='alle'?null:new Set(items.filter(item=>item.kind==='question'&&item.completed).map(item=>item.contentId));
 return new Set(items.filter(item=>item.kind==='question'&&item.completed&&(review==='richtig'?item.solved:!item.solved)).map(item=>item.contentId));
}
export function matchesReview(id:string,review:QuizReview,ids:Set<string>|null):boolean {
 return ids===null|| (review==='offen'?!ids.has(id):ids.has(id));
}
