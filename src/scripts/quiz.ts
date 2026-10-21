import { t } from './browser-i18n';
import { recordQuestion } from './progress-client';
const sections = [...document.querySelectorAll<HTMLElement>("[data-question]")];
const selection = document.querySelector<HTMLSelectElement>("#quiz-topic")!;
const progress =
  document.querySelector<HTMLProgressElement>("#question-progress")!;
const result = document.querySelector<HTMLElement>("#quiz-result")!;
const progressContainer =
  document.querySelector<HTMLElement>("#quiz-progress")!;
let active: HTMLElement[] = [];
let position = 0;
let score = 0;

function resetQuiz(focus = false) {
  active = sections.filter(
    (section) =>
      selection.value === "alle" || section.dataset.topic === selection.value,
  );
  position = 0;
  score = 0;
  progress.max = active.length;
  progress.value = 0;
  result.hidden = true;
  progressContainer.hidden = false;
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
  showQuestion(focus);
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
    form.querySelector<HTMLElement>(
      `[data-explanation="${chosen.value}"]`,
    )!.hidden = false;
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
const initialTopic = new URLSearchParams(location.search).get("thema");
if (
  initialTopic &&
  [...selection.options].some((option) => option.value === initialTopic)
)
  selection.value = initialTopic;
selection.addEventListener("change", () => {
  const url = new URL(location.href);
  if (selection.value === "alle") url.searchParams.delete("thema");
  else url.searchParams.set("thema", selection.value);
  history.replaceState(null, "", url);
  resetQuiz();
});
document
  .querySelector("#restart-quiz")!
  .addEventListener("click", () => resetQuiz(true));
resetQuiz();
