import {osCourse} from './course-os.ts';
import {markdownCourse} from './course-markdown.ts';
import {pythonCourse} from './course-python.ts';
import {devopsCourse} from './course-devops.ts';
import {securityCourse} from './course-security.ts';
import {networkCourse} from './course-networks.ts';
import {linuxCourse} from './course-linux.ts';
import {basicsCourse} from './course-basics.ts';
import {webCourse} from './course-web.ts';
import {typescriptCourse} from './course-typescript.ts';
import { databaseCourse } from './course-databases.ts';
import { apiCourse } from './course-apis.ts';
import { aiCourse } from './course-ai.ts';
import { aiAdvanced } from './course-ai-advanced.ts';
import { aiArchitectures } from './course-ai-architectures.ts';
import { latexCourse } from './course-latex.ts';
import { latexTechnical } from './course-latex-technical.ts';
import { latexAdvanced } from './course-latex-advanced.ts';
import { coursePath, chapterProgressId, localizeQuestion, type Course } from './course-types.ts';
import type { LearningPath } from './content.ts';
import type { Locale } from '../lib/locale.ts';
export { coursePath, chapterProgressId } from './course-types.ts';

export const courses: Course[] = [
  basicsCourse, typescriptCourse, pythonCourse, markdownCourse, webCourse, databaseCourse, apiCourse, networkCourse, osCourse, linuxCourse, securityCourse, devopsCourse,
  { ...aiCourse, chapters: [...aiCourse.chapters, ...aiAdvanced, ...aiArchitectures] },
  { ...latexCourse, chapters: [...latexCourse.chapters, ...latexTechnical, ...latexAdvanced] },
];
export const courseChapters = courses.flatMap(course => course.chapters.map(chapter => ({ course, chapter, id: chapterProgressId(course, chapter), url: coursePath(course, chapter) })));
export const courseQuestions = (locale: Locale) => courses.flatMap(course => course.chapters.flatMap(chapter => chapter.questions.map((question, index) => localizeQuestion(course, chapter, question, index, locale))));
export const courseLearningPaths = (locale: Locale): LearningPath[] => courses.map(course => ({
  id: `kurs-${course.id}`, course: course.id, title: course.title[locale], description: course.description[locale],
  level: 'einstieg', icon: course.id === 'ki' ? 'network' : 'code', color: course.id === 'ki' ? 'purple' : 'blue',
  prerequisites: course.prerequisites[locale], steps: course.chapters.map(chapter => ({
    topic: course.topic, title: chapter.title[locale], available: true, href: coursePath(course, chapter), contentId: chapterProgressId(course, chapter),
  })),
}));
