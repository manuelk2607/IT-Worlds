import { exercises } from '../data/exercises';
import { checkExercise } from '../lib/exercise-checker';
import { t, locale } from './browser-i18n';
for (const element of document.querySelectorAll<HTMLElement>('[data-exercise]')) {
  const exercise = exercises.find(item=>item.topic===element.dataset.exercise)!;
  const editor = element.querySelector<HTMLTextAreaElement>('[data-editor]')!;
  const feedback = element.querySelector<HTMLElement>('[data-exercise-feedback]')!;
  const output = element.querySelector<HTMLElement>('[data-exercise-output]')!;
  const lineCount = element.querySelector<HTMLElement>('[data-line-count]')!;
  const lines = () => { const count=editor.value.split('\n').length;lineCount.textContent=t(`${count} ${count===1?"Zeile":"Zeilen"}`,`${count} ${count===1?"line":"lines"}`); };
  const clear = () => { feedback.textContent='';feedback.classList.remove('passed');output.hidden=true;lines(); };
  editor.addEventListener('input',clear);
  element.querySelector('[data-check-exercise]')!.addEventListener('click',()=>{
    const result=checkExercise(exercise.topic,editor.value,locale);
    feedback.textContent=result.message;
    feedback.classList.toggle('passed',result.passed);
    element.querySelector<HTMLElement>('[data-exercise-output-text]')!.textContent=result.output;
    output.hidden=false;
  });
  element.querySelector('[data-reset-exercise]')!.addEventListener('click',()=>{editor.value=exercise.starter;clear();editor.focus();});
  element.querySelector('[data-load-solution]')!.addEventListener('click',()=>{editor.value=exercise.solution;clear();editor.focus();});
  lines();
}
