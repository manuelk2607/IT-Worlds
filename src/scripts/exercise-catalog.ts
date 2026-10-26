import { exercises } from '../data/exercises.ts';
import { exerciseCatalogTopic, exerciseSelectionUrl, matchesExercise, readExerciseSelection, type ExerciseSelection } from '../lib/exercise-catalog.ts';
import { t, locale } from './browser-i18n.ts';
const root = document.querySelector<HTMLElement>('[data-exercise-catalog]')!;
const search = root.querySelector<HTMLInputElement>('#exercise-search')!;
const topic = root.querySelector<HTMLSelectElement>('#exercise-topic')!;
const course = root.querySelector<HTMLSelectElement>('#exercise-course')!;
const level = root.querySelector<HTMLSelectElement>('#exercise-level')!;
const cards = [...root.querySelectorAll<HTMLElement>('[data-exercise-card]')];
function filter() {
  if (course.value !== 'alle' && !exercises.some(item=>item.course===course.value && (topic.value==='alle'||exerciseCatalogTopic(item)===topic.value))) course.value='alle';
  for (const option of course.options) option.disabled = option.value !== 'alle' && topic.value !== 'alle' && !exercises.some(item=>item.course===option.value && exerciseCatalogTopic(item)===topic.value);
  const selection:ExerciseSelection = {search:search.value,topic:topic.value,course:course.value,level:level.value};
  let count = 0;
  for (const card of cards) {
    const exercise = exercises.find(item=>item.id===card.dataset.exerciseCard)!;
    card.hidden = !matchesExercise(exercise,selection,locale,card.dataset.context);
    if (!card.hidden) count++;
  }
  root.querySelector('[data-exercise-count]')!.textContent = t(`${count} ${count===1?'Aufgabe':'Aufgaben'} gefunden`,`${count} ${count===1?'task':'tasks'} found`);
  root.querySelector<HTMLElement>('[data-exercises-empty]')!.hidden = count > 0;
  history.replaceState(history.state,'',exerciseSelectionUrl(new URL(location.href),selection));
}
function restore() {
  const selection = readExerciseSelection(new URLSearchParams(location.search),exercises);
  search.value=selection.search;topic.value=selection.topic;course.value=selection.course;level.value=selection.level;filter();
}
search.addEventListener('input',filter);
for (const select of [topic,course,level]) select.addEventListener('change',filter);
root.querySelector('[data-reset-exercise-filter]')!.addEventListener('click',()=>{search.value='';topic.value=course.value=level.value='alle';filter();search.focus();});
window.addEventListener('popstate',restore);
restore();
