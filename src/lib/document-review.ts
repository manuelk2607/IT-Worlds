import {courseChapters} from '../data/courses.ts';
import type {DocumentTask} from '../data/document-tasks.ts';
import {text,type Bilingual} from '../data/course-types.ts';
import {exercises} from '../data/exercises.ts';
export interface DocumentReviewCriterion {id:string;label:Bilingual}
/** Reuse the actual chapter's assignment and learning goals; these criteria require the learner's judgement. */
export function documentReview(task:DocumentTask){
 const entry=courseChapters.find(item=>item.id===task.progressId);
 if(!entry)throw new Error(`Unknown document review chapter: ${task.progressId}`);
 const exercise=task.id!==task.progressId?exercises.find(item=>item.id===task.id):undefined;
 return {
  exercise:exercise?.task??entry.chapter.exercise,solution:exercise?text(exercise.solution,exercise.solution):entry.chapter.solution,code:!!exercise,
  criteria:[
   ...(exercise?[{id:'task',label:exercise.task}]:entry.chapter.goals.map((goal,index):DocumentReviewCriterion=>({id:`goal-${index+1}`,label:goal}))),
   {id:'assignment',label:text('Ich habe die vollständige Aufgabe bearbeitet und Unterschiede zur erklärten Musterlösung nachvollzogen.','I completed the full assignment and understood differences from the explained model solution.')},
   {id:'compiler',label:text('Ich habe die aktuelle Fassung im externen Editor kompiliert und die Compilerhinweise geprüft.','I compiled the current version in the external editor and checked compiler messages.')},
   {id:'output',label:text('Ich habe das fertige Dokument auf Lesbarkeit, Inhalt, Formeln, Verweise und benötigte Ressourcen geprüft.','I reviewed the finished document for readability, content, equations, references and required resources.')},
  ] satisfies DocumentReviewCriterion[],
 };
}
