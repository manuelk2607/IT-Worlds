export interface QuizFilter { topic: string; course: string; level: string; chapter: string; question: string }
export function matchesQuizFilter(item: { topic?: string; course?: string; level?: string; chapter?: string; question?: string }, filter: QuizFilter): boolean {
  return (Object.keys(filter) as (keyof QuizFilter)[]).every(key => filter[key] === 'alle' || filter[key] === '' || item[key] === filter[key]);
}
export interface QuizCourse {id:string; topic:string}
export interface QuizChapter {id:string; course:string; level:string}
export function reconcileQuizFilter(filter:QuizFilter,changed:'topic'|'course'|'level'|'chapter',courses:readonly QuizCourse[],chapters:readonly QuizChapter[]):QuizFilter {
 const next={...filter,question:''};
 if(changed==='topic') {
  if(!courses.some(course=>course.id===next.course&&(next.topic==='alle'||course.topic===next.topic)))next.course='alle';
  next.chapter='alle';
 }
 if(changed==='course') {
  const course=courses.find(course=>course.id===next.course);
  if(course)next.topic=course.topic;
  next.chapter='alle';
 }
 if(changed==='chapter') {
  const chapter=chapters.find(chapter=>chapter.id===next.chapter);
  const course=courses.find(course=>course.id===chapter?.course);
  if(chapter&&course){next.course=course.id;next.topic=course.topic;next.level=chapter.level;}
 }
 if(changed==='level'&&next.chapter!=='alle'&&!chapters.some(chapter=>chapter.id===next.chapter&&(next.level==='alle'||chapter.level===next.level)))next.chapter='alle';
 return next;
}
