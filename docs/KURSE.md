# Kursarchitektur und Lernfolgen

Stand: 25. Oktober 2026; Veröffentlichung siehe VALIDIERUNG.md. 18 Kursfolgen mit 145 Kapiteln und 290 Kursfragen; einschließlich der Einstiegsfragen insgesamt 300 Quizfragen. Die Folgen decken ihren jeweils beschriebenen Umfang ab; sie sind keine vollständige Expertenausbildung in sämtlichen Fachgebieten. Alle Kapitel stehen auf Deutsch und Englisch ohne Account bereit. LaTeX, Typst und Markdown bleiben unter Programmiersprachen → Auszeichnungs- & Satzsprachen. Die öffentliche Referenzversion ist getrennt in VALIDIERUNG.md dokumentiert.

| Folge | Kapitel | Schwerpunkt |
| --- | --- | --- |
| IT-Grundlagen | 7 | Daten, Dateien, Git, Algorithmen und Fehlersuche |
| TypeScript | 8 | Sprache, sichere Daten, asynchrone Abläufe, Tests und Projekt |
| Python | 8 | Sprache, Dateien/JSON, Tests und Kommandozeilenprojekt |
| Markdown | 6 | Struktur, Code, Links/Bilder, GFM, sichere Ausgabe und README |
| Typst | 16 | Grundlagen, Mathematik, Literatur, Funktionen, Module/Pakete, Daten, Kontext, Publikationen, Präsentationen und Builds |
| Web | 8 | Semantik, CSS, Layout, Formulare, DOM, Zustände, Tastatur und Auslieferung |
| Datenbanken | 8 | Modell, SQL, Joins, Transaktionen, Parameter, Pläne und Restore |
| APIs | 7 | HTTP, Verträge, Clients, Fehler, Rechte und konkurrierende Änderungen |
| Netzwerke | 8 | Adressen, CIDR, DNS, Transport, TLS, IPv6, Routing und Caches |
| Betriebssystemkonzepte | 6 | Prozesse, Scheduling, Speicher, Nebenläufigkeit, Dateien und FIFO |
| Linux | 6 | Terminal, Rechte, Pipes, Prozesse, Dienste und Wiederherstellung |
| Sicherheit | 7 | Bedrohungen, Identität, Eingaben, Rechte, XSS/CSRF und Audit |
| Cloud & DevOps | 8 | Dienstmodelle, Builds, CI, Container, Secrets, SLO und Delivery |
| KI | 14 | Mathematik, Lernen, Training, Architekturen, generative Modelle und Grenzen |
| LaTeX | 14 | Syntax, Struktur, Satz, Mathematik, Tabellen, Grafiken, Literatur und Projektprüfung |
| Hardware & Software | 6 | Logik, Rechner, Komponenten, Booten, Montage und Leistung |
| Tastschreiben | 3 | Grundstellung, Aufbau und lokale Auswertung; Online-Ranking deaktiviert |
| Spieleentwicklung | 5 | Mechanik, Bewegung, Godot-Projekt, Unity und Unreal; Godot-Engineprüfung offen |

## Gemeinsames Inhaltsmodell

`src/data/course-types.ts` definiert strikt typisierte zweisprachige Kapitel, Abschnitte, Lernziele, Aufgaben/Lösungen und Fragen. Die Dateien `course-*.ts` verwenden dieselben Builder; Titel, Antwortindizes und IDs werden nicht separat übersetzt. `courses.ts` erzeugt die gemeinsamen Kapitel-, Quiz- und Fortschrittslisten. Quellenregister werden in `content.ts` zusammengeführt; jeder Beleg nennt Herausgeber, Fassung, Abschnitt, URL und Lesedatum.

`CourseView.astro` stellt Kursübersichten und Kapitel dar. Breadcrumbs, mobile Kapitelübersicht, vorheriger/nächster Schritt, Aufgabenlösung, Quellen und Quizlinks greifen auf die gemeinsamen Daten zu. Formeln werden beim Build mit KaTeX als HTML und MathML erzeugt. `runtime` unterscheidet Browser- und Node-Beispiele; Python, SQL, Shell und LaTeX behalten ihre Fachsprache. Der Browser führt die vollständigen Kurslistings nicht automatisch aus.

Routen leiten sich aus Themenwelt, Kursslug und Kapitel-ID ab; Englisch ergänzt `/en/`. Suche, Sitemap, Themenansichten, Quiz und Lernstand nutzen dieselben Daten. Neue Kurse benötigen keine eigenen Darstellungsseiten. `related` verknüpft passende Kursübersichten.

## Geführte Wege und persönlicher Fortschritt

`learning-paths.ts` verbindet vorhandene Kapitel zu drei vollständigen Wegen: Website (13 Schritte), APIs/Daten (14), Systementwurf (10). Jedes Ziel nennt Voraussetzungen, Zweck der Schritte und ein überprüfbares Projektergebnis. Titel, URLs und Fortschrittskennungen werden aus den Kursdaten bezogen. Kurs und Querverbindungspfad teilen denselben Kapitelstand. `LearningRoute.astro` bietet den ersten ungelesenen Schritt oder die Wiederholung eines vollständig gelesenen Weges an.

Kapitelkennungen folgen `[kurs]-[kapitel]`, Fragen ergänzen `-1` beziehungsweise `-2`. Bestehende veröffentlichte Kennungen bleiben stabil. Die API validiert sie gegen die gemeinsame Inhaltsliste; neue Inhalte benötigen dafür keine Schemaänderung. Accounts ergänzen nur geräteübergreifenden Fortschritt.

## Quiz und Prüfung

Thema, Kurs, Kapitel und Stufe begrenzen den Fragenpool. Runden umfassen 5, 10, 20 oder alle passenden Fragen; optionales Mischen bleibt über eine Kennung im Link reproduzierbar. `?frage=ki-transformer-1` öffnet eine konkrete Frage. Jede Antwortoption erhält eine Erklärung und einen Beleg. Das Ergebnis verlinkt Fehler zum Nachlesen und Wiederholen. Ein Neustart derselben Runde behält deren Reihenfolge; gespeicherter Lernstand bleibt erhalten.

`npm test`, `npm run check` und `npm run build` prüfen Struktur, Übersetzungen, IDs, Quellen, Formeln und ausführbare Beispiele. Zusätzliche Tests führen TypeScript-, Python- und portable Shellbeispiele aus. Der Linux-CI-Job führt das veröffentlichte Dockerbeispiel tatsächlich aus; lokal wird es ohne das ausdrückliche Testflag übersprungen. SQL-Beispiele wurden separat in einem isolierten PostgreSQL-18-Cluster geprüft. Alle 30 LaTeX-/Typst-Beispiele einschließlich Biber wurden am 25. Oktober in isolierten Containern gebaut; dies ist ein historischer lokaler Beispielnachweis. IT-Worlds kompiliert Nutzerprojekte nicht; Compiler und PDF-Kontrolle bleiben in Overleaf/typst.app. Ein echtes systemd-Benutzerlabor bleibt offen. Frühere Prüfstände stehen in [VALIDIERUNG.md](VALIDIERUNG.md). KI bleibt in diesem Ausbau unverändert.

Quellenabgleich und technische Prüfung ersetzen kein unabhängiges Fachreview. Der neue Textsatz-Ausbau ergänzt LaTeX und Typst; technische Diagnostik, Build und fachliche Qualitätsbewertung sind getrennt. Kurse, Beispiele und Uploadprüfung: [DOKUMENTPRUEFUNG.md](DOKUMENTPRUEFUNG.md). Weitere Ausbaupakete: [AUSBAU.md](AUSBAU.md); Veröffentlichung: [CLOUDFLARE.md](CLOUDFLARE.md).
