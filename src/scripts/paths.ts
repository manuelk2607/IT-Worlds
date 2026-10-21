import { t } from './browser-i18n';
const buttons = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-path-filter]"),
];
const cards = [...document.querySelectorAll<HTMLElement>("[data-path-level]")];
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    const filter = button.dataset.pathFilter;
    let count = 0;
    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    cards.forEach((card) => {
      card.hidden = filter !== "alle" && card.dataset.pathLevel !== filter;
      if (!card.hidden) count++;
    });
    document.querySelector("#path-count")!.textContent = t(`${count} Lernpfade`, `${count} learning paths`);
  }),
);

export {};
