import { localePath, type Locale } from './locale.ts';

const learningPage = /^\/(?:en\/)?(?:(?:themen|lernpfade|projekte|uebungen)(?:\/[a-z0-9-]+)*\/|(?:lernen|quiz|glossar|quellen|fortschritt|schreibtrainer|textsatz|dokumentpruefung)\/)?$/;

export function learningReturnPath(value: string | null) {
  if (!value || value.length > 1200 || /[\u0000-\u001f\u007f\\]/.test(value)) return null;
  const pathname = value.split(/[?#]/, 1)[0] ?? '';
  return learningPage.test(pathname) ? value : null;
}

export function accountPath(locale: Locale, next: string | null) {
  const path = localePath(locale, '/konto/');
  const destination = learningReturnPath(next);
  return destination ? path + '?' + new URLSearchParams({ next: destination }) : path;
}

export function worldsLoginHref(locale: Locale, next: string | null, reauth = false) {
  const params = new URLSearchParams({ next: accountPath(locale, next), ui_locales: locale });
  if (reauth) params.set('reauth', '1');
  return (reauth ? '/auth/login?' : '/auth/start?') + params;
}

export function allowAccountReturn(value: string | null, locale: Locale) {
  const prefix = accountPath(locale, null) + '?';
  if (!value?.startsWith(prefix)) return null;
  const next = learningReturnPath(new URLSearchParams(value.slice(prefix.length)).get('next'));
  // Accept only the canonical single parameter produced by the app.
  return next && value === accountPath(locale, next) ? value : null;
}
