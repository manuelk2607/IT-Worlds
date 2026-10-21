(() => {
  let preference: string | null = null;
  try { preference = localStorage.getItem('it-worlds-theme'); } catch { /* Storage can be unavailable in private browsing. */ }
  document.documentElement.dataset.theme = preference === 'light' || preference === 'dark' ? preference : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
})();
