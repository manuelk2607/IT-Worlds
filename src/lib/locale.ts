export type Locale = 'de' | 'en';
export function translate(locale: Locale) { return (german: string, english: string) => locale === 'en' ? english : german; }
export function localePath(locale: Locale, path: string) { return locale === 'en' ? `/en${path}` : path; }
export function switchLocalePath(path: string) { return path === '/en' || path.startsWith('/en/') ? path.slice(3) || '/' : `/en${path}`; }
