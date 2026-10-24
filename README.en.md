# IT-Worlds

**Understand IT. Discover connections. Test your knowledge.**

[English website](https://it-worlds.maki26.workers.dev/en/) · [German website](https://it-worlds.maki26.workers.dev/) · [Practice editors](https://it-worlds.maki26.workers.dev/en/uebungen/) · [Deutsche README](README.md)

A German/English learning platform covering ten IT topics, from programming and databases to AI, networks, security and Linux. All learning content and quizzes remain accessible without signing in. An optional account synchronises read introductions and chapters, practised questions and correct answers across devices. Light and dark modes are available, with the choice saved in your browser.

The site contains ten topics, ten introductions, ten local editors and eleven available courses with 92 chapters, 194 explained quiz questions and 155 primary sources. New courses cover IT foundations, TypeScript, web development, Linux, networks and security. Cloud & DevOps now adds eight chapters; three guided routes connect existing chapters into complete project-oriented sequences. Independent expert review is pending. A new learning start, filtered catalogue, chapter-text search, synchronised quiz filters and grouped progress improve orientation.

[SQL course](https://it-worlds.maki26.workers.dev/en/themen/datenbanken/kurs/) · [API course](https://it-worlds.maki26.workers.dev/en/themen/apis/kurs/) · [AI course](https://it-worlds.maki26.workers.dev/en/themen/ki-neuronale-netze/kurs/) · [LaTeX course](https://it-worlds.maki26.workers.dev/en/themen/programmiersprachen/latex/) · [Course architecture](docs/KURSE.md)

LaTeX, Typst and Markdown form the **Markup & typesetting languages** area within Programming languages.

## Development

Requires Node.js 22.22.0 or newer and npm; tested with Node.js 26.8.1.

```bash
npm ci
npm run dev
```

The static Astro site runs on port 4321 without secrets. For accounts, configure an isolated Neon development branch and the ignored `.dev.vars`, then run `npm run dev:full` on port 8787. Rebuild after changing content. See [account setup](docs/ACCOUNTS.md) and [deployment](docs/CLOUDFLARE.md) (German).

```bash
npm test
npm run check
npm run build
npm run deploy:check
```

Astro builds static pages. A TypeScript Cloudflare Worker provides same-origin authentication and progress APIs, backed by Neon Managed Auth and Postgres. A restricted database role and row-level security isolate personal progress. Email verification is disabled by the owner's choice; password reset uses Neon's shared mail service and its sending limits.

German content is in `src/data/content.ts`, English in `src/data/content.en.ts`. Bilingual course data lives in `src/data/course-*.ts`, aggregated by `courses.ts`. Keep IDs aligned so both languages share progress. Own code and web examples use TypeScript; Python, SQL and LaTeX examples retain their language. See [contribution rules](CONTRIBUTING.md), [architecture](docs/TECHNIK.md), [source records](docs/QUELLEN.md) and [validation](docs/VALIDIERUNG.md).

A bilingual sitemap, canonical and language links, robots rules, structured data and social preview images support discovery. See [editor details](docs/EDITOR.md) and [SEO](docs/SEO.md) (German).

No project licence has been selected. Public visibility alone does not grant a general licence to reuse the code or learning content.
