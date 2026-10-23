import { t } from './browser-i18n';
import { recordQuestion } from './progress-client';
import { matchesQuizFilter } from '../lib/quiz-filter';
const sections = [...document.querySelectorAll<HTMLElement>("[data-question]")];
const selection = document.querySelector<HTMLSelectElement>("#quiz-topic")!;
const courseSelect = document.querySelector<HTMLSelectElement>('#quiz-course')!;
const levelSelect = document.querySelector<HTMLSelectElement>('#quiz-level')!;
const chapterSelect = document.querySelector<HTMLSelectElement>('#quiz-chapter')!;
const empty = document.querySelector<HTMLElement>('#quiz-empty')!;
let exactQuestion = '';
const progress =
  document.querySelector<HTMLProgressElement>("#question-progress")!;
const result = document.querySelector<HTMLElement>("#quiz-result")!;
const progressContainer =
  document.querySelector<HTMLElement>("#quiz-progress")!;
let active: HTMLElement[] = [];
let position = 0;
let score = 0;

function resetQuiz(focus = false) {
  active = sections.filter(section => matchesQuizFilter(section.dataset, {
    topic: selection.value, course: courseSelect.value, level: levelSelect.value,
    chapter: chapterSelect.value, question: exactQuestion,
  }));
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
      result.querySelector<HTMLElement>("h2")!.focus();
    }
  });
});
const controls = [[selection, 'thema'], [courseSelect, 'kurs'], [levelSelect, 'stufe']] as const;
function readLocation() {
  const params = new URLSearchParams(location.search);
  for (const [select, key] of controls) select.value = [...select.options].some(option => option.value === params.get(key)) ? params.get(key)! : 'alle';
  const chapter = [...chapterSelect.options].find(option => option.dataset.course === params.get('kurs') && option.dataset.chapter === params.get('kapitel'));
  chapterSelect.value = chapter?.value ?? 'alle';
  exactQuestion = sections.some(section => section.dataset.question === params.get('frage')) ? params.get('frage')! : '';
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
  url.searchParams.delete('frage');
  exactQuestion = '';
  history.replaceState(null, '', url);
  resetQuiz();
}
for (const [select] of controls) select.addEventListener('change', () => {
  if (select === courseSelect || select === selection) chapterSelect.value = 'alle';
  updateLocation();
});
chapterSelect.addEventListener('change', updateLocation);
document.querySelector('#clear-quiz-filters')!.addEventListener('click', () => {
  for (const [select] of controls) select.value = 'alle';
  chapterSelect.value = 'alle';
  updateLocation();
});
window.addEventListener('popstate', readLocation);
document
  .querySelector("#restart-quiz")!
  .addEventListener("click", () => resetQuiz(true));
readLocation();
