import { t, locale } from './browser-i18n';
const chips = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-topic-filter]"),
];
const cards = [...document.querySelectorAll<HTMLElement>("[data-topic-card]")];
const input = document.querySelector<HTMLInputElement>("#topic-search")!;
let selected = "alle";
function filterTopics() {
  const query = input.value.trim().toLocaleLowerCase(locale);
  let count = 0;
  cards.forEach((card) => {
    card.hidden = !(
      (selected === "alle" || card.dataset.group === selected) &&
      card.dataset.search!.includes(query)
    );
    if (!card.hidden) count++;
  });
  document.querySelector<HTMLElement>("#topics-empty")!.hidden = count !== 0;
  document.querySelector<HTMLElement>("[data-grid-note]")!.hidden =
    selected !== "alle" || query !== "";
  document.querySelector<HTMLElement>("#topic-result-count")!.textContent =
    t(`${count} Themenwelten gefunden`, `${count} topics found`);
  chips.forEach((chip) => {
    const active = chip.dataset.topicFilter === selected;
    chip.setAttribute("aria-pressed", String(active));
    chip.classList.toggle("active", active);
  });
}
chips.forEach((chip) =>
  chip.addEventListener("click", () => {
    selected = chip.dataset.topicFilter!;
    filterTopics();
  }),
);
input.addEventListener("input", filterTopics);
document.querySelector("#reset-topic-filter")!.addEventListener("click", () => {
  selected = "alle";
  input.value = "";
  filterTopics();
  input.focus();
});

export {};
