import { translate, localePath, type Locale } from '../lib/locale.ts';
export const locale: Locale = document.documentElement.lang === 'en' ? 'en' : 'de';
export const t = translate(locale);
export const pagePath = (path: string) => localePath(locale, path);
