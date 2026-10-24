# IT-Worlds

**IT verstehen. Zusammenhänge entdecken. Wissen spielerisch testen.**

[Website auf Deutsch](https://it-worlds.maki26.workers.dev) · [Website in English](https://it-worlds.maki26.workers.dev/en/) · [Übungseditoren](https://it-worlds.maki26.workers.dev/uebungen/) · [English README](README.en.md)

IT-Worlds ist eine deutsch-englische IT-Lernplattform mit zehn Themenwelten. Alle Inhalte, Quellen und Quizfragen sind ohne Anmeldung zugänglich. Ein freiwilliger Account speichert gelesene Einstiege und Kapitel, bearbeitete Fragen und richtig beantwortete Fragen geräteübergreifend. Ein optionales dunkles Design ergänzt das helle Design; die Auswahl bleibt im Browser gespeichert.

**Stand (24.10.2026):** Zehn Themenwelten, zehn Einstiegsartikel, zehn lokale Übungseditoren und elf verfügbare Kursfolgen mit **92 Kapiteln, 194 erklärten Quizfragen und 155 Primärquellen**. Neue Folgen: IT-Grundlagen, TypeScript, Webentwicklung, Linux, Netzwerke und Sicherheit. SQL, APIs, KI und LaTeX bleiben integriert. Cloud & DevOps ergänzt nun acht Kapitel; drei geführte Lernwege verbinden vorhandene Kapitel durchgehend zu konkreten Projektzielen. Ein unabhängiges Fachreview steht aus.

**Orientierung:** [Lernstart](https://it-worlds.maki26.workers.dev/lernen/) → [Kurskatalog](https://it-worlds.maki26.workers.dev/lernpfade/) → Kapitel mit Aufgaben, Lösungen und Quiz. Die Suche durchsucht auch Kapiteltexte und lädt ihren Index erst bei Bedarf. Quizfilter grenzen passende Kurse/Kapitel ein; der persönliche Lernstand gruppiert Inhalte und führt zum nächsten offenen Schritt.

[SQL-Kurs](https://it-worlds.maki26.workers.dev/themen/datenbanken/kurs/) · [API-Kurs](https://it-worlds.maki26.workers.dev/themen/apis/kurs/) · [KI-Kurs](https://it-worlds.maki26.workers.dev/themen/ki-neuronale-netze/kurs/) · [LaTeX-Kurs](https://it-worlds.maki26.workers.dev/themen/programmiersprachen/latex/) · [Kursarchitektur](docs/KURSE.md) · [Prioritäten und offene Inhalte](docs/AUSBAU.md)

## Themenwelten

Programmiersprachen · Datenbanken · Website bauen · KI & neuronale Netze · APIs & Schnittstellen · IT-Grundlagen · Internet & Netzwerke · IT-Sicherheit · Cloud & DevOps · Betriebssysteme & Linux.

LaTeX, Typst und Markdown gehören unter **Programmiersprachen → Auszeichnungs- & Satzsprachen**. Die Inhalte unterscheiden Programmierung, Dokumentstruktur und Textsatz.

## Lokal entwickeln

Voraussetzung: Node.js ab 22.22.0 und npm. Mit Node.js 26.8.1 geprüft.

```bash
npm ci
npm run dev
```

Astro startet auf Port 4321. Inhalte, Übersetzungen, Suche, Filter und Quiz funktionieren ohne Zugangsdaten. Persönliche Funktionen benötigen die Worker-API und einen Neon-Entwicklungsbranch. Dessen drei Laufzeitwerte lokal in der ignorierten `.dev.vars` hinterlegen; siehe [Accounts und Datenbank](docs/ACCOUNTS.md).

```bash
npm run dev:full
```

Das baut die statischen Seiten und startet den lokalen Cloudflare Worker auf Port 8787. Nach Inhaltsänderungen erneut bauen. `npm run worker:dev` startet nur den Worker mit dem vorhandenen Build; `npm run preview` zeigt ausschließlich den statischen Build.

## Prüfen und veröffentlichen

```bash
npm test
npm run check
npm run build
npm run deploy:check
npm run seo:check
npm run links:check
```

`npm run ready` prüft HTTP-Seiten eines laufenden Servers; die Adresse lässt sich mit `IT_WORLDS_URL` setzen. Accounts mit getrennten Testnutzern prüfen. Suche, Filter, mobiles Menü, Quiz samt Erklärungen und Neustart, Quellenlinks, Designs, Sprachwechsel und 404-Seiten zusätzlich im Browser prüfen.

Die Website läuft auf dem bestehenden Cloudflare Worker **it-worlds**. `npm run deploy` veröffentlicht nach Prüfung von Account, Einstellungen und Bindings. Zugangsdaten gehören in lokale ignorierte Dateien bzw. Cloudflare Secrets. Der Cloud-Chat-Token ist dafür nicht erforderlich.

## Architektur und Dokumentation

Astro erzeugt statische Seiten mit TypeScript und CSS. Ein kleiner TypeScript-Worker ergänzt Authentifizierung und persönliche Fortschrittsdaten. Neon Managed Auth übernimmt Accounts und Sessions; Neon Postgres speichert den Lernstand. Der Worker verwendet eine eingeschränkte Datenbankrolle mit Row Level Security. Gäste erhalten denselben Lerninhalt.

| Dokument | Inhalt |
| --- | --- |
| [Website-Aufbau](docs/WEBSITE-AUFBAU.md) | Seiten, Sprachen, Themen und Verfügbarkeit |
| [Technik](docs/TECHNIK.md) | Architektur, Datenfluss und Projektdateien |
| [Accounts](docs/ACCOUNTS.md) | Neon, Rollen, Migrationen, Sessions und Mailkonfiguration |
| [Cloudflare](docs/CLOUDFLARE.md) | Bestandsprüfung, Secrets und Veröffentlichung |
| [Übungseditoren](docs/EDITOR.md) | Aufgabenformate, Bedienung und Grenzen |
| [SEO](docs/SEO.md) | Sitemap, Indexierbarkeit und Suchmaschinen |
| [Quellen](docs/QUELLEN.md) | Tatsächlich gelesene Primärquellen und Grenzen des Reviews |
| [Validierung](docs/VALIDIERUNG.md) | Durchgeführte Prüfungen und Deployment-Nachweis |
| [Roadmap](docs/ROADMAP.md) | Inhaltlicher Ausbau und offene Entscheidungen |
| [GitHub](docs/GITHUB-SETUP.md) | Beschreibung, Website-Link und Topics |
| [Mitwirken](CONTRIBUTING.md) | Beiträge, Übersetzungen und Quellenregeln |

Inhaltsdaten liegen in `src/data/content.ts` und `src/data/content.en.ts`; die neuen Blöcke werden aus `expansion.ts` und `expansion.en.ts` ergänzt; Die Kursdaten liegen in `src/data/course-*.ts`, zusammengeführt in `courses.ts`; stabile IDs verbinden beide Sprachen mit demselben Lernstand. Eigener Code, Tests, Skripte und unterstützte Konfigurationen verwenden strikt geprüftes TypeScript. Python-, SQL- und LaTeX-Beispiele behalten ihre Sprache. Verbindliche Regeln: [AGENTS.md](AGENTS.md).

## Mitwirken und Rechte

Ideen, Quellenhinweise und fachliche Korrekturen sind willkommen: [Issue-Vorlagen](https://github.com/manuelk2607/IT-Worlds/issues/new/choose). Das [Produktkonzept](docs/KONZEPT.md), [Inhaltskonzept](docs/INHALTE.md) und [Lernspielkonzept](docs/LERNSPIELE.md) dokumentieren weitere Ziele; sie beschreiben teilweise noch geplante Funktionen.

**Lizenz:** Noch nicht festgelegt. Der öffentliche Repository-Status allein vergibt keine allgemeine Nutzungslizenz. Rechte an Programmcode, eigenen Lerntexten und Fremdmaterial sind getrennt zu klären.
