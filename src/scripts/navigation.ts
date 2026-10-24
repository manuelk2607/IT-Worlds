/** One state owns the links, underline and cancellable homepage scroll. */
export function initNavigation(closeMenu: () => void): void {
  const nav = document.querySelector<HTMLElement>('.desktop-nav')!;
  const indicator = nav.querySelector<HTMLElement>('.nav-indicator')!;
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-id]')];
  const header = document.querySelector<HTMLElement>('.site-header')!;
  const section = document.getElementById('themenwelten');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = '';
  let animation = 0;
  let measurement = 0;
  let destination: 'home' | 'themen' | null = null;

  function scrollOffset(): number {
    // Match native fragment navigation, including the smaller mobile header.
    return Math.max(header.offsetHeight + 24, parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
  }

  function placeIndicator(): void {
    const active = nav.querySelector<HTMLAnchorElement>('a.active');
    if (!active || !nav.offsetWidth) return;
    indicator.style.transform = `translateX(${active.offsetLeft}px) scaleX(${active.offsetWidth})`;
    nav.dataset.indicatorReady = '';
  }

  function activate(id: string): void {
    if (current === id) return;
    current = id;
    for (const link of links) {
      const active = link.dataset.navId === id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', section ? 'location' : 'page');
      else link.removeAttribute('aria-current');
    }
    placeIndicator();
  }

  function syncPosition(): void {
    measurement = 0;
    if (section && !destination) {
      nav.style.removeProperty('--nav-duration');
      activate(section.getBoundingClientRect().top <= scrollOffset() + 1 ? 'themen' : 'home');
    }
  }

  function cancelScroll(): void {
    cancelAnimationFrame(animation);
    animation = 0;
    destination = null;
    syncPosition();
  }

  function navigate(id: 'home' | 'themen', keyboard = false): void {
    if (!section) return;
    cancelAnimationFrame(animation);
    destination = id;
    const start = window.scrollY;
    const top = id === 'home' ? 0 : start + section.getBoundingClientRect().top - scrollOffset();
    const end = Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));
    const distance = end - start;
    const duration = reducedMotion.matches ? 0 : Math.min(520, Math.max(240, Math.abs(distance) * .35));
    nav.style.setProperty('--nav-duration', `${duration}ms`);
    activate(id);
    if(keyboard){
      const target=id==='themen'?section.querySelector<HTMLElement>('h2')??section:document.querySelector<HTMLElement>('main h1');
      if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
    }
    const started = performance.now();
    function frame(now: number): void {
      const progress = duration === 0 ? 1 : Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
      if (progress < 1) animation = requestAnimationFrame(frame);
      else {
        animation = 0;
        destination = null;
        syncPosition();
      }
    }
    animation = requestAnimationFrame(frame);
  }

  activate(nav.querySelector<HTMLAnchorElement>('a.active')?.dataset.navId ?? '');
  new ResizeObserver(placeIndicator).observe(nav);
  document.fonts.ready.then(placeIndicator);

  if (!section) return;
  // Apply fragment state before the first scroll event, including direct links.
  const fragmentTarget = location.hash === '#themenwelten';
  if (fragmentTarget) destination = 'themen';
  activate(fragmentTarget ? 'themen' : 'home');
  window.addEventListener('pageshow', event => {
    if (!event.persisted && fragmentTarget) navigate('themen');
    else syncPosition();
  });
  window.addEventListener('scroll', () => {
    if (!destination && !measurement) measurement = requestAnimationFrame(syncPosition);
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (destination) navigate(destination);
    else syncPosition();
  });
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || (url.hash !== '' && url.hash !== '#themenwelten')) return;
    event.preventDefault();
    closeMenu();
    if (url.href !== location.href) history.pushState(null, '', url);
    navigate(url.hash ? 'themen' : 'home',event.detail===0);
  });
  const restore = () => navigate(location.hash === '#themenwelten' ? 'themen' : 'home');
  window.addEventListener('popstate', restore);
  window.addEventListener('hashchange', restore);
  window.addEventListener('wheel', cancelScroll, { passive: true });
  window.addEventListener('touchstart', cancelScroll, { passive: true });
  document.addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape'].includes(event.key)) cancelScroll();
  });
  reducedMotion.addEventListener('change', () => { if (destination) navigate(destination); });
}
