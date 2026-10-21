import * as de from '../data/content.ts';
import * as en from '../data/content.en.ts';
import type { Locale } from './locale.ts';
export { translate, localePath, switchLocalePath, type Locale } from './locale.ts';
export function getContent(locale: Locale) {
  const content = locale === 'en' ? en : de;
  return { ...content, topicById: (id: string) => content.topics.find(topic => topic.id === id), levelName: (id: de.Level) => content.levels.find(level => level.id === id)!.name };
}
