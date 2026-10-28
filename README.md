# IT-Worlds

**IT verstehen. Zusammenhänge entdecken. Wissen spielerisch testen.**

**Textsatz und Dokumentprüfung · 25.10.2026:** Typst mit 16 Kapiteln/32 Kursfragen und LaTeX mit 14/28. Bearbeitung und PDF-Kontrolle finden in Overleaf beziehungsweise typst.app statt. IT-Worlds prüft Einzeldateien, mehrteilige Projekte und ZIPs sicher lokal im Browser, mit Fundstellen, Erklärungen und 30 Kapitelprofilen. Keine Dokumentuploads, eigenen Kompilierungsserver oder zusätzlichen laufenden Dienste. Optional wird das zugehörige Kapitel nach eigener Kontrolle im bestehenden Lernfortschritt markiert. [Ablauf und Grenzen](docs/DOKUMENTPRUEFUNG.md).

[Website auf Deutsch](https://it-worlds.maki26.workers.dev) · [Website in English](https://it-worlds.maki26.workers.dev/en/) · [Übungseditoren](https://it-worlds.maki26.workers.dev/uebungen/) · [English README](README.en.md)

IT-Worlds ist eine deutsch-englische IT-Lernplattform mit 14 Themenkacheln. Alle Inhalte, Quellen und Quizfragen sind ohne Anmeldung zugänglich. Ein freiwilliger Account speichert gelesene Einstiege und Kapitel, bearbeitete Fragen und richtig beantwortete Fragen geräteübergreifend. Ein optionales dunkles Design ergänzt das helle Design; die Auswahl bleibt im Browser gespeichert.

**Inhaltsstand (28.10.2026):** 14 Themenkacheln, 22 Kursfolgen mit **169 Kapiteln, 348 erklärten Quizfragen und 273 Primärquellen**. Java, C/C++, Go und Rust ergänzen TypeScript und Python durch jeweils sechs Kapitel mit vollständig ausführbaren und in der CI geprüften Listings. Vier geführte Lernwege verbinden Themen. Die Übungsübersicht gliedert 203 Aufgaben und Projekte nach Thema und Kurs, mit kombinierter Suche sowie Themen-, Kurs-, Stufen-, Typ- und Statusfiltern. Sieben vollständige Praxisprojekte und vier interaktive Ablaufaufgaben verbinden Erklärungen, getestete Referenzen und Downloads. Aufgabenstände und Projektchecklisten lassen sich auf dem Gerät wiederaufnehmen und als JSON sichern; sie sind vom Konto-Lese-/Quizstand getrennt. Selbstbestätigte Ergebnisse und bestandene begrenzte Modellprüfungen werden unterschieden. „Textsatz & Dokumentenerstellung“ bündelt Typst und LaTeX in einem eigenen Portal; die bisherigen Kurs-URLs bleiben kompatibel. Hardware, Schreibübungen und Spielegrundlagen ergänzen die ursprünglichen IT-Themen. Der Schreibtrainer bietet optionale private Konto-Ergebnisse und eine freiwillige pseudonyme Rangliste mit serverseitiger Auswertung. Godot-Spielablauf und Linux/systemd-Benutzerlabor werden in der CI tatsächlich ausgeführt. Ein unabhängiges Fachreview steht aus. [P1-Prüfungen und Grenzen](docs/P1-PRUEFUNGEN.md), [Veröffentlichungsnachweis](docs/VALIDIERUNG.md).

**Praxis und Orientierung (27.10.2026):** Drei vollständige, herunterladbare Referenzprojekte verbinden Web-/TypeScript-, SQL- und API-/Betriebskurse mit realen lokalen Tests: [mehrseitiger Kurskatalog](https://it-worlds.maki26.workers.dev/projekte/kurskatalog/), [SQL-Lernbericht](https://it-worlds.maki26.workers.dev/projekte/lernbericht/) und [HTTP-Abnahme](https://it-worlds.maki26.workers.dev/projekte/auslieferung/). Das [Glossar](https://it-worlds.maki26.workers.dev/glossar/) verknüpft 15 Begriffe mit Kursen und Primärquellen. Zwölf Trainerstufen führen bis zu zusammenhängenden DE/EN-Texten; Textsatzaufgaben ergänzen explizite Selbstprüfrubriken ohne automatische fachliche Benotung.

**Orientierung:** [Lernstart](https://it-worlds.maki26.workers.dev/lernen/) → [Kurskatalog](https://it-worlds.maki26.workers.dev/lernpfade/) → Kapitel mit Aufgaben, Lösungen und Quiz. Die Suche durchsucht auch Kapiteltexte und lädt ihren Index erst bei Bedarf. Quizfilter grenzen Kurse/Kapitel und optional den gespeicherten Lösungsstand ein; der persönliche Lernstand gruppiert Inhalte und führt zum nächsten offenen Schritt.

[Markdown-Kurs](https://it-worlds.maki26.workers.dev/themen/programmiersprachen/markdown/) · [Typst-Kurs](https://it-worlds.maki26.workers.dev/themen/programmiersprachen/typst/) · [Python-Kurs](https://it-worlds.maki26.workers.dev/themen/programmiersprachen/python/) · [SQL-Kurs](https://it-worlds.maki26.workers.dev/themen/datenbanken/kurs/) · [API-Kurs](https://it-worlds.maki26.workers.dev/themen/apis/kurs/) · [KI-Kurs](https://it-worlds.maki26.workers.dev/themen/ki-neuronale-netze/kurs/) · [LaTeX-Kurs](https://it-worlds.maki26.workers.dev/themen/programmiersprachen/latex/) · [Kursarchitektur](docs/KURSE.md) · [Prioritäten und offene Inhalte](docs/AUSBAU.md)

## Themenwelten

Programmiersprachen · Datenbanken · Website bauen · KI & neuronale Netze · APIs & Schnittstellen · IT-Grundlagen · Internet & Netzwerke · IT-Sicherheit · Cloud & DevOps · Betriebssysteme & Linux · Hardware · 10-Finger-Schreiben · Spieleentwicklung.

Typst und LaTeX stehen unter **Textsatz & Dokumentenerstellung**; Typst ist der empfohlene moderne Einstieg. Markdown bleibt als Dokumentationssprache bei **Programmiersprachen**. Die Inhalte unterscheiden Programmierung, Dokumentstruktur und Textsatz.

## Lokal entwickeln

Voraussetzung: Node.js ab 22.22.0, npm und Python ab 3.12 für die ausführbaren Lernbeispieltests. Mit Node.js 26.8.1 geprüft.

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

Die native Compilerregression in `tests/native-languages.test.ts` führt die veröffentlichten Java-/C-/C++-/Go-/Rust-Listings aus. Lokal fehlende oder für das Ziel zu alte Compiler werden übersprungen; der eigene CI-Job installiert die festgelegten Versionen und verlangt jeden Compiler mit `IT_WORLDS_NATIVE_TEST=1`. Optionale lokale Pfade: `IT_WORLDS_JAVAC`, `IT_WORLDS_JAVA`, `IT_WORLDS_CC`, `IT_WORLDS_CXX`, `IT_WORLDS_GO` und `IT_WORLDS_RUSTC`. Nutzerprogramme werden auf der Website nicht ausgeführt.

```bash
npm test
npm run check
npm run build
npm run deploy:check
npm run seo:check
npm run links:check
```

`npm run ready` prüft HTTP-Seiten eines laufenden Servers; die Adresse lässt sich mit `IT_WORLDS_URL` setzen. Die [praktischen Beispieltests](docs/BEISPIELTESTS.md) und [echten Accounttests](docs/ACCOUNTS.md) erklären Voraussetzungen und Grenzen. Suche, Filter, mobiles Menü, Quiz samt Erklärungen und Neustart, Quellenlinks, Designs, Sprachwechsel und 404-Seiten zusätzlich im Browser prüfen.

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
| [Dokumentprüfung](docs/DOKUMENTPRUEFUNG.md) | Externe Editoren, Quellen-/ZIP-Import, lokale Aufgabenprüfung, Datenschutz und Grenzen |
| [Schreibtrainer](docs/SCHREIBTRAINER.md) | Stufen, Texte, Messregeln, Historie und Konto-Prüfnachweise |
| [SEO](docs/SEO.md) | Sitemap, Indexierbarkeit und Suchmaschinen |
| [Quellen](docs/QUELLEN.md) | Tatsächlich gelesene Primärquellen und Grenzen des Reviews |
| [Validierung](docs/VALIDIERUNG.md) | Durchgeführte Prüfungen und Deployment-Nachweis |
| [Roadmap](docs/ROADMAP.md) | Inhaltlicher Ausbau und offene Entscheidungen |
| [GitHub](docs/GITHUB-SETUP.md) | Beschreibung, Website-Link und Topics |
| [Mitwirken](CONTRIBUTING.md) | Beiträge, Übersetzungen und Quellenregeln |

Inhaltsdaten liegen in `src/data/content.ts` und `src/data/content.en.ts`; die neuen Blöcke werden aus `expansion.ts` und `expansion.en.ts` ergänzt; Die Kursdaten liegen in `src/data/course-*.ts`, zusammengeführt in `courses.ts`; stabile IDs verbinden beide Sprachen mit demselben Lernstand. Eigener Code, Tests, Skripte und unterstützte Konfigurationen verwenden strikt geprüftes TypeScript. Native Lernbeispiele (unter anderem Java, C/C++, Go, Rust, Python, SQL und LaTeX) behalten ihre Sprache. Verbindliche Regeln: [AGENTS.md](AGENTS.md).

## Mitwirken und Rechte

Ideen, Quellenhinweise und fachliche Korrekturen sind willkommen: [Issue-Vorlagen](https://github.com/manuelk2607/IT-Worlds/issues/new/choose). Das [Produktkonzept](docs/KONZEPT.md), [Inhaltskonzept](docs/INHALTE.md) und [Lernspielkonzept](docs/LERNSPIELE.md) dokumentieren weitere Ziele; sie beschreiben teilweise noch geplante Funktionen.

**Lizenz:** Noch nicht festgelegt. Der öffentliche Repository-Status allein vergibt keine allgemeine Nutzungslizenz. Rechte an Programmcode, eigenen Lerntexten und Fremdmaterial sind getrennt zu klären.

Praktische Prüfungen und ihre Grenzen: [Lernbeispiele](docs/BEISPIELTESTS.md).
