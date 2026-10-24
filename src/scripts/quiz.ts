import {quizRound,roundSize,roundSeed} from '../lib/quiz-round';
import { t } from './browser-i18n';
import { recordQuestion } from './progress-client';
import { matchesQuizFilter, reconcileQuizFilter, type QuizFilter } from '../lib/quiz-filter';
const sections = [...document.querySelectorAll<HTMLElement>("[data-question]")];
const selection = document.querySelector<HTMLSelectElement>("#quiz-topic")!;
const courseSelect = document.querySelector<HTMLSelectElement>('#quiz-course')!;
const levelSelect = document.querySelector<HTMLSelectElement>('#quiz-level')!;
const chapterSelect = document.querySelector<HTMLSelectElement>('#quiz-chapter')!;
const courseOptions=[...courseSelect.options],chapterOptions=[...chapterSelect.options];
const empty = document.querySelector<HTMLElement>('#quiz-empty')!;
const sizeSelect=document.querySelector<HTMLSelectElement>('#quiz-size')!;
const shuffle=document.querySelector<HTMLInputElement>('#quiz-shuffle')!;
let seed:number|undefined;
let missed:HTMLElement[]=[];
let exactQuestion = '';
const progress =
  document.querySelector<HTMLProgressElement>("#question-progress")!;
const result = document.querySelector<HTMLElement>("#quiz-result")!;
const progressContainer =
  document.querySelector<HTMLElement>("#quiz-progress")!;
let active: HTMLElement[] = [];
let position = 0;
let score = 0;

function resetQuiz(focus = false,keepRound=false) {
  const pool = sections.filter(section => matchesQuizFilter(section.dataset, {
    topic: selection.value, course: courseSelect.value, level: levelSelect.value,
    chapter: chapterSelect.value, question: exactQuestion,
  }));
  if(!keepRound)active=quizRound(pool,roundSize(sizeSelect.value),shuffle.checked?seed:undefined);
  missed=[];
  document.querySelector("#quiz-review")!.setAttribute("hidden", "");
  document.querySelector("#quiz-pool-status")!.textContent = t(
    `${active.length} von ${pool.length} passenden Fragen in dieser Runde. Filteränderungen starten neu.`,
    `${active.length} of ${pool.length} matching questions in this round. Changing filters starts again.`);

  const courseName=courseSelect.selectedOptions[0]?.textContent??'';
  document.querySelector('#quiz-selection-summary')!.textContent=[selection.selectedOptions[0]?.textContent,courseSelect.value!=='alle'?courseName:'',chapterSelect.value!=='alle'?chapterSelect.selectedOptions[0]?.textContent?.replace(`${courseName} · `,''):'',levelSelect.value!=='alle'?levelSelect.selectedOptions[0]?.textContent:''].filter(Boolean).join(' · ');
  position = 0;
  score = 0;
  progress.max = Math.max(1, active.length);
  progress.value = 0;
  result.hidden = true;
  progressContainer.hidden = active.length === 0;
  empty.hidden = active.length > 0;
  sections.forEach((section) => {
    section.hidden = true;
    const form = section.querySelector<HTMLFormElement>("form")!;
    form.reset();
    form.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      input.disabled = false;
      input.closest("label")!.classList.remove("correct", "incorrect");
    });
    form.dataset.answered = "false";
    form.querySelector<HTMLElement>(".check-answer")!.hidden = false;
    form.querySelector<HTMLElement>(".quiz-feedback")!.hidden = true;
    form.querySelector<HTMLElement>(".next-question")!.hidden = true;
    form
      .querySelectorAll<HTMLElement>("[data-explanation]")
      .forEach((item) => (item.hidden = true));
  });
  if (active.length) showQuestion(focus);
}
function showQuestion(focus: boolean) {
  sections.forEach((section) => (section.hidden = true));
  active[position].hidden = false;
  document.querySelector("#question-count")!.textContent =
    t(`Frage ${position + 1} von ${active.length}`, `Question ${position + 1} of ${active.length}`);
  if (focus) {
    const legend = active[position].querySelector("legend")!;
    legend.setAttribute("tabindex", "-1");
    legend.focus();
  }
}
sections.forEach((section) => {
  const form = section.querySelector<HTMLFormElement>("form")!;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.dataset.answered === "true") return;
    const chosen = form.querySelector<HTMLInputElement>("input:checked");
    if (!chosen) {
      form.reportValidity();
      return;
    }
    const correct = Number(chosen.value) === Number(form.dataset.answer);
    if (correct) score++;
    else missed.push(section);
    form.dataset.answered = "true";
    void recordQuestion(section.dataset.question!, Number(chosen.value));
    const feedback = form.querySelector<HTMLElement>(".quiz-feedback")!;
    feedback.classList.toggle("success", correct);
    form.querySelector(".feedback-heading")!.textContent = correct
      ? t("Genau, das passt!", "Exactly right!")
      : t("Hier steckt dein nächstes Aha.", "Here is your next discovery.");
    form.querySelectorAll<HTMLElement>('[data-explanation]').forEach(explanation => { explanation.hidden = false; });
    form.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      input.disabled = true;
      if (Number(input.value) === Number(form.dataset.answer))
        input.closest("label")!.classList.add("correct");
      else if (input.checked)
        input.closest("label")!.classList.add("incorrect");
    });
    feedback.hidden = false;
    form.querySelector<HTMLElement>(".check-answer")!.hidden = true;
    const next = form.querySelector<HTMLButtonElement>(".next-question")!;
    next.hidden = false;
    if (position === active.length - 1) next.textContent = t("Ergebnis ansehen →", "See results →");
    else next.textContent = t("Nächste Frage →", "Next question →");
    progress.value = position + 1;
    next.focus();
  });
  form.querySelector(".next-question")!.addEventListener("click", () => {
    position++;
    if (position < active.length) showQuestion(true);
    else {
      sections.forEach((item) => (item.hidden = true));
      progressContainer.hidden = true;
      result.hidden = false;
      document.querySelector("#quiz-score")!.textContent =
        t(`${score} von ${active.length} ${active.length === 1 ? "Frage richtig beantwortet" : "Fragen richtig beantwortet"}.`, `${score} of ${active.length} ${active.length === 1 ? 'question' : 'questions'} answered correctly.`);
      showReview();
      result.querySelector<HTMLElement>("h2")!.focus();
    }
  });
});
const controls = [[selection, 'thema'], [courseSelect, 'kurs'], [levelSelect, 'stufe']] as const;
function readLocation() {
  courseSelect.replaceChildren(...courseOptions);chapterSelect.replaceChildren(...chapterOptions);
  const params = new URLSearchParams(location.search);
  for (const [select, key] of controls) select.value = [...select.options].some(option => option.value === params.get(key)) ? params.get(key)! : 'alle';
  const chapter = [...chapterSelect.options].find(option => option.dataset.course === params.get('kurs') && option.dataset.chapter === params.get('kapitel'));
  chapterSelect.value = chapter?.value ?? 'alle';
  exactQuestion = sections.some(section => section.dataset.question === params.get('frage')) ? params.get('frage')! : '';
  if(exactQuestion) {
    const item=sections.find(section=>section.dataset.question===exactQuestion)!;
    selection.value=item.dataset.topic!;courseSelect.value=item.dataset.course||'alle';levelSelect.value=item.dataset.level!;chapterSelect.value=item.dataset.chapter||'alle';
  }
  sizeSelect.value=roundSize(params.get('anzahl'));
  seed=roundSeed(params.get('mischen'));shuffle.checked=seed!==undefined;
  syncOptions();
  resetQuiz();
}
function updateLocation() {
  const url = new URL(location.href);
  for (const [select, key] of controls) {
    if (select.value === 'alle') url.searchParams.delete(key);
    else url.searchParams.set(key, select.value);
  }
  const chapter = chapterSelect.selectedOptions[0];
  if (chapter?.dataset.chapter) {
    url.searchParams.set('kapitel', chapter.dataset.chapter);
    url.searchParams.set('kurs', chapter.dataset.course!);
    courseSelect.value = chapter.dataset.course!;
  } else url.searchParams.delete('kapitel');
  if(sizeSelect.value==='10')url.searchParams.delete('anzahl');else url.searchParams.set('anzahl',sizeSelect.value);
  if(shuffle.checked&&seed!==undefined)url.searchParams.set('mischen',seed.toString(16).padStart(8,'0'));else url.searchParams.delete('mischen');
  url.searchParams.delete('frage');
  exactQuestion = '';
  history.replaceState(null, '', url);
  resetQuiz();
}
const courseCatalog=[...courseSelect.options].filter(option=>option.value!=='alle').map(option=>({id:option.value,topic:option.dataset.topic!}));
const chapterCatalog=[...chapterSelect.options].filter(option=>option.value!=='alle').map(option=>({id:option.value,course:option.dataset.course!,level:option.dataset.level!}));
function syncOptions() {
 const selectedCourse=courseSelect.value,selectedChapter=chapterSelect.value;
 courseSelect.replaceChildren(...courseOptions.filter(option=>option.value==='alle'||selection.value==='alle'||option.dataset.topic===selection.value));
 courseSelect.value=selectedCourse;
 chapterSelect.replaceChildren(...chapterOptions.filter(option=>{
  const chapter=chapterCatalog.find(chapter=>chapter.id===option.value);
  const course=courseCatalog.find(course=>course.id===chapter?.course);
  return !chapter||((courseSelect.value==='alle'||chapter.course===courseSelect.value)&&(selection.value==='alle'||course?.topic===selection.value)&&(levelSelect.value==='alle'||chapter.level===levelSelect.value));
 }));
 chapterSelect.value=selectedChapter;
}

function changeFilter(changed:'topic'|'course'|'level'|'chapter') {
 const current:QuizFilter={topic:selection.value,course:courseSelect.value,level:levelSelect.value,chapter:chapterSelect.value,question:exactQuestion};
 const next=reconcileQuizFilter(current,changed,courseCatalog,chapterCatalog);
 selection.value=next.topic;courseSelect.value=next.course;levelSelect.value=next.level;chapterSelect.value=next.chapter;
 syncOptions();updateLocation();
}
selection.addEventListener('change',()=>changeFilter('topic'));
courseSelect.addEventListener('change',()=>changeFilter('course'));
levelSelect.addEventListener('change',()=>changeFilter('level'));
chapterSelect.addEventListener('change',()=>changeFilter('chapter'));
document.querySelector('#clear-quiz-filters')!.addEventListener('click', () => {
  for (const [select] of controls) select.value = 'alle';
  chapterSelect.value = 'alle';sizeSelect.value='10';shuffle.checked=false;seed=undefined;
  syncOptions();updateLocation();
});
window.addEventListener('popstate', readLocation);
document
  .querySelector("#restart-quiz")!
  .addEventListener("click", () => resetQuiz(true,true));
function showReview(){
 const list=document.querySelector<HTMLElement>('#quiz-review-list')!;list.replaceChildren();
 for(const section of missed){
  const item=document.createElement('li');const title=document.createElement('p');
  title.textContent=section.querySelector('legend')!.textContent;item.append(title);
  const read=document.createElement('a');read.className='text-link';read.href=section.dataset.reviewHref!;
  read.textContent=t('Passenden Inhalt nachlesen →','Read the related lesson →');item.append(read);
  const retry=document.createElement('a');retry.className='text-link';
  const url=new URL(location.pathname,location.origin);url.searchParams.set('frage',section.dataset.question!);
  retry.href=url.href;retry.textContent=t('Diese Frage wiederholen →','Retry this question →');item.append(retry);list.append(item);
 }
 document.querySelector<HTMLElement>('#quiz-review')!.hidden=missed.length===0;
}
sizeSelect.addEventListener('change',updateLocation);
function newSeed(){return crypto.getRandomValues(new Uint32Array(1))[0]!;}
shuffle.addEventListener('change',()=>{seed=shuffle.checked?newSeed():undefined;updateLocation();});
document.querySelector('#new-quiz-round')!.addEventListener('click',()=>{shuffle.checked=true;seed=newSeed();updateLocation();showQuestion(true);});
readLocation();
