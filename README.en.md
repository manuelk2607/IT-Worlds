# IT-Worlds

**Typesetting and document checks · 25 October 2026:** Typst has 16 chapters/32 course questions and LaTeX 14/28. Edit and review PDFs in Overleaf or typst.app. IT-Worlds safely checks individual sources, multi-file projects and ZIPs locally in your browser, with source positions, explanations and 30 chapter profiles. No document uploads, compiler servers or additional running services. Optionally mark the matching chapter in existing learning progress after your own review. [Workflow and limits](docs/DOKUMENTPRUEFUNG.md).

**Understand IT. Discover connections. Test your knowledge.**

[English website](https://it-worlds.maki26.workers.dev/en/) · [German website](https://it-worlds.maki26.workers.dev/) · [Practice editors](https://it-worlds.maki26.workers.dev/en/uebungen/) · [Deutsche README](README.md)

A German/English learning platform covering 13 IT topics, from programming and databases to AI, networks, security and Linux. All learning content and quizzes remain accessible without signing in. An optional account synchronises read introductions and chapters, practised questions and correct answers across devices. Light and dark modes are available, with the choice saved in your browser.

The current content includes 14 topic cards, 18 courses, 145 chapters, 300 explained quiz questions and 239 primary sources. “Typesetting & document creation” brings Typst and LaTeX together in a dedicated portal while retaining the existing course URLs. Hardware, typing practice and game-development foundations extend the original topics. Typing offers optional private account results and an opt-in pseudonymous leaderboard with server-side scoring. CI runs actual Godot gameplay and the Linux/systemd user lab. Independent expert review is pending. [P1 checks and limits](docs/P1-PRUEFUNGEN.md), [release evidence](docs/VALIDIERUNG.md).

**Practice and orientation · 27 October 2026:** Three complete downloadable reference projects connect the courses to real local tests: a [multi-page course catalog](https://it-worlds.maki26.workers.dev/en/projekte/kurskatalog/), [SQL learning report](https://it-worlds.maki26.workers.dev/en/projekte/lernbericht/) and [HTTP acceptance project](https://it-worlds.maki26.workers.dev/en/projekte/auslieferung/). A [glossary](https://it-worlds.maki26.workers.dev/en/glossar/) links 15 terms to courses and primary sources. Twelve typing stages lead to connected German/English texts. Typesetting tasks include explicit self-review rubrics, without automatic assessment of subject quality.

[Markdown course](https://it-worlds.maki26.workers.dev/en/themen/programmiersprachen/markdown/) · [Typst course](https://it-worlds.maki26.workers.dev/en/themen/programmiersprachen/typst/) · [SQL course](https://it-worlds.maki26.workers.dev/en/themen/datenbanken/kurs/) · [API course](https://it-worlds.maki26.workers.dev/en/themen/apis/kurs/) · [AI course](https://it-worlds.maki26.workers.dev/en/themen/ki-neuronale-netze/kurs/) · [LaTeX course](https://it-worlds.maki26.workers.dev/en/themen/programmiersprachen/latex/) · [Course architecture](docs/KURSE.md)

Typst and LaTeX form the dedicated **Typesetting & document creation** topic, with Typst highlighted as the recommended modern starting point. Markdown remains with **Programming languages**.

## Development

Requires Node.js 22.22.0 or newer, npm and Python 3.12+ for the executable learning-example tests; tested with Node.js 26.8.1.

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

Practical checks and their limits: [learning examples](docs/BEISPIELTESTS.md) (German).
