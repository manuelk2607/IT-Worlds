import type { Source } from './content.ts';
const source = (url: string, title: string, publisher: string, version: string, section: string): Source => ({url, evidenceUrl:url, title, publisher, version, section, reviewedAt:'2026-10-24', description:section});
export const exerciseSources = {
  pythonBuiltins: source('https://docs.python.org/3.12/library/functions.html#sum', 'Built-in Functions', 'Python Software Foundation', 'Python 3.12.15 documentation', 'sum; min; max; len · iterable values, initial value and element count'),
  exerciseLabels: source('https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label', 'HTML label element', 'MDN Web Docs', 'Living reference · accessed 2026-10-24', 'Associating a label with a form control; explicit for/id association'),
  exerciseCount: source('https://www.postgresql.org/docs/18/functions-aggregate.html', 'Aggregate Functions', 'PostgreSQL Global Development Group', 'PostgreSQL 18', '9.21 · Table 9.62 · count(*) and count(expression); NULL values'),
  exerciseTypstRef: source('https://typst.app/docs/reference/model/ref/', 'Reference', 'Typst', 'Typst 0.15.1 · documentation accessed 2026-10-24', 'Normal references; referenceable numbered elements; @label syntax'),
} satisfies Record<string, Source>;
