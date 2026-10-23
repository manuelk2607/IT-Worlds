import { t } from './browser-i18n';
import { initNavigation } from './navigation';
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
initNavigation(closeMenu);
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

matchMedia('(min-width: 901px)').addEventListener('change',closeMenu);
document.addEventListener('click',event=>{if(event.target instanceof Node&&!mobileNav.contains(event.target)&&!menuButton.contains(event.target))closeMenu();});
export {};
