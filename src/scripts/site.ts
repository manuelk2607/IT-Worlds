import { t, locale } from './browser-i18n';
const themeButton = document.querySelector<HTMLButtonElement>('[data-theme-toggle]')!;
const themeMedia = matchMedia('(prefers-color-scheme: dark)');
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? t('Helles Design aktivieren', 'Switch to light mode') : t('Dunkles Design aktivieren', 'Switch to dark mode'));
  themeButton.querySelector('[data-theme-icon]')!.textContent = dark ? '☀' : '◐';
}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('it-worlds-theme', theme); } catch { /* The current page still switches without storage. */ }
  updateThemeButton();
});
themeMedia.addEventListener('change', () => {
  let preference: string | null = null;
  try { preference = localStorage.getItem('it-worlds-theme'); } catch { /* Use system preference. */ }
  if (preference !== 'light' && preference !== 'dark') document.documentElement.dataset.theme = themeMedia.matches ? 'dark' : 'light';
  updateThemeButton();
});
updateThemeButton();
document.querySelector<HTMLAnchorElement>('[data-language-switch]')!.addEventListener('click', event => {
  const link = event.currentTarget as HTMLAnchorElement;
  const url = new URL(link.href);
  url.search = location.search;
  url.hash = location.hash;
  link.href = url.href;
});
const menuButton = document.querySelector<HTMLButtonElement>(
  ".mobile-menu-button",
)!;
const mobileNav = document.querySelector<HTMLElement>("#mobile-nav")!;
const closeMenu = () => {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", t("Menü öffnen", "Open menu"));
};
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  mobileNav.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? t("Menü schließen", "Close menu") : t("Menü öffnen", "Open menu"),
  );
});
mobileNav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
const dialog = document.querySelector<HTMLDialogElement>("#search-dialog")!;
const input = document.querySelector<HTMLInputElement>("#global-search")!;
const items = [...document.querySelectorAll<HTMLElement>("[data-search-item]")];
const openSearch = () => {
  dialog.showModal();
  input.focus();
};
document
  .querySelectorAll("[data-open-search]")
  .forEach((button) => button.addEventListener("click", openSearch));
document
  .querySelector("[data-close-search]")!
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (
    e.target === dialog &&
    (e.clientX < dialog.getBoundingClientRect().left ||
      e.clientX > dialog.getBoundingClientRect().right ||
      e.clientY < dialog.getBoundingClientRect().top ||
      e.clientY > dialog.getBoundingClientRect().bottom)
  )
    dialog.close();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && dialog.open) {
    e.preventDefault();
    dialog.close();
    return;
  }
  if (
    e.key === "/" &&
    !dialog.open &&
    !(
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      (e.target instanceof HTMLElement && e.target.isContentEditable)
    )
  ) {
    e.preventDefault();
    openSearch();
  }
});
input.addEventListener("input", () => {
  const query = input.value.trim().toLocaleLowerCase(locale);
  let count = 0;
  items.forEach((item) => {
    item.hidden = !item.dataset.searchText!.includes(query);
    if (!item.hidden) count++;
  });
  document.querySelector<HTMLElement>("#search-empty")!.hidden = count > 0;
});

export {};
