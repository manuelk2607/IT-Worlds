# Roadmap

Die Reihenfolge beschreibt vorgeschlagene Ausbaustufen, keine zugesagten Termine. Umfang und Prioritäten werden nach Rückmeldungen angepasst.

## Lokaler Entwicklungsstand · 25. Oktober 2026

18 Kurse mit 145 Kapiteln, insgesamt 300 Quizfragen und 238 Quellen. Veröffentlichung der vereinfachten Dokumentprüfung wird in VALIDIERUNG.md nachgewiesen. Typst umfasst 16 Kapitel/32 Fragen, LaTeX 14/28. Der zuletzt dokumentierte öffentliche Stand bleibt separat in VALIDIERUNG.md festgehalten. Die historischen Phasen unten sind keine Freigabe des lokalen Zwischenstands.

- [x] Gemeinsamen Textsatz-Einstieg, prominentere Typst-/LaTeX-Navigation, Kursvergleiche und Querverweise ergänzen; bestehende URLs und Fortschrittskennungen erhalten.
- [x] Typst um Programmierung, Module/Pakete, Datenberichte, Kontext, wissenschaftliche Publikationen, Präsentationen, automatisierte Builds und Projektabgabe erweitern; LaTeX-Diagnosekapitel ergänzen.
- [x] Einzeldatei-/ZIP-Workflows mit Hauptdateiauswahl, lokaler Analyse, positionsbezogenen Hinweisen und Prüfreport für LaTeX und Typst implementieren.
- [x] P0: Overleaf/typst.app direkt in Kursen und Aufgaben verlinken; Quellen ausschließlich sicher lokal im Browser prüfen und verständlich erklären.
- [x] P1: Mehrteilige Projekte/ZIPs, 30 Kapitel-Aufgabenprofile und bewusste bestehende Lernfortschrittsmarkierung integrieren.
- [x] Eigenen Kompilierungsdienst samt API/CI/Setup zugunsten des einfachen kostenlosen Browserworkflows entfernen. PDF und tatsächliche Kompilierung bleiben im externen Editor.
- [ ] P2: Zusätzliche Diagnostik/PDF-Vorschau ausschließlich ohne zusätzliche laufende Kosten und bei geringem Wartungsaufwand prüfen. Kein Compilerhost ist Voraussetzung für diesen Release.
- [ ] P1: Vorherigen Hardware-/Schreibtrainer-/Spiele-Zwischenstand freigeben: echte Ranking-/Zwei-Account-/RLS-/Timing-/Replaytests, Godot-Ausführung und ausstehende Browserprüfungen; erst danach Produktionsmigration und Aktivierung der Online-Rangliste. Der aktuelle Release hält diese Funktionen deaktiviert; lokale Übungen bleiben verfügbar. Details: [DREI-LERNBEREICHE.md](DREI-LERNBEREICHE.md) und [PROGRESS.md](../PROGRESS.md).
- [ ] P2: Unabhängiges Fachreview, assistive Nutzerprüfung und Erprobung der erweiterten Textsatz-Lernwege.
- [ ] P3: Über die 30 statischen Kapitelprofile hinausgehende fachliche Bewertungsrubriken und weitere Visualisierungen. Kompilierung bleibt von fachlicher Bewertung getrennt.

Architektur, Datenschutz, Limits, lokale Bedienung und aktuelle Freigabegrenzen: [DOKUMENTPRUEFUNG.md](DOKUMENTPRUEFUNG.md).

## Aktueller Website-Rahmen

- [x] Zehn Themenwelten mit Einstieg, Vertiefung und Profi-Themen strukturieren.
- [x] Startseite, Themen- und Lernpfadseiten mit responsivem Layout umsetzen.
- [x] Themen- und Lernpfadsuche sowie Themen- und Stufenfilter bereitstellen.
- [x] Zehn kurze Einstiegsartikel und zehn passende Quizfragen mit Primärquellen hinterlegen.
- [x] 200 Originalquellen mit Herausgeber, Version, Abschnitt und Lesedatum dokumentieren.
- [x] LaTeX, Typst und Markdown als Unterbereich von Programmiersprachen einordnen.
- [x] Projektcode einschließlich Tests, Hilfsskripten und Astro-Konfiguration auf TypeScript vereinheitlichen.
- [ ] Unabhängiges Fachreview der Einstiege und Quizfragen durchführen.
- [x] KI- und LaTeX-Kursfolgen mit 27 Kapiteln, 54 zusätzlichen Fragen und Belegen ausarbeiten.
- [x] Drei themenübergreifende Lernwege mit 13/14/10 verfügbaren Kapitelschritten ausarbeiten.

18 Kursfolgen mit 145 Kapiteln und drei vollständige geführte Lernwege stehen bereit. Markdown und Typst sind mit sechs bzw. 16 Kapiteln verfügbar; ein größeres Betriebsprojekt bleibt offen. Details im [Website-Aufbau](WEBSITE-AUFBAU.md).

- [x] Zehn lokale Übungseditoren mit Hinweisen und Musterlösungen ergänzen.
- [x] Sitemap, Canonicals, Sprachbezüge und Social-Metadaten ergänzen.

## Phase 0: Konzept und Repository

Dieses Dokumentationspaket umfasst:

- [x] Projektziel, Zielgruppenhypothesen und Themenwelten formulieren.
- [x] Artikelstruktur, Quellenprinzipien und Inhaltsmodell skizzieren.
- [x] Quizzes und Lernspiele mit Lernzielen sammeln.
- [x] Technische Ansätze vergleichen und eine vorläufige Empfehlung begründen.
- [x] README, Beitragsleitfaden sowie Issue- und Pull-Request-Vorlagen vorbereiten.
- [x] Repository-Beschreibung und GitHub-Topics zur Übernahme vorbereiten.
- [x] Beschreibung, Website-Link und Topics in den GitHub-Metadaten pflegen; siehe [Einrichtungsstatus](GITHUB-SETUP.md).
- [x] Breite Themenlandkarte vom Einstieg bis zum Profi sowie Astro für den ersten Website-Rahmen festlegen.
- [ ] Lizenzmodell und unabhängige fachliche Prüfung klären.

## Phase 1: Ein vollständiger Lernpfad als erste Version

**Ziel:** Eine Person kann „Vom Browser zur Website“ ohne Konto durcharbeiten und den Ablauf danach nachvollziehen.

Vorgeschlagener Umfang:

- Sechs geprüfte Artikel aus dem [Inhaltskonzept](INHALTE.md).
- Eine Startseite, zwei Themenübersichten und eine geordnete Lernpfadansicht.
- Ein kleines Glossar zu den verwendeten Begriffen und eine Suche.
- Je Artikel vier Single-Choice-Fragen, insgesamt 24 Fragen mit Erklärungen.
- Das Spiel „Paketreise“ als Wiederholung des Gesamtzusammenhangs.
- Mobile Darstellung und vollständige Bedienung per Tastatur.

Der Einstieg braucht noch keine Anmeldung, öffentliche Rangliste, automatische Newsimporte oder Ausführung von Nutzer-Code. Freiwillige Accounts speichern inzwischen den persönlichen Fortschritt.

**Vor Umsetzung klären:** Zielgruppe und Schwierigkeitsgrad, redaktionell prüfende Person, Framework und Hosting sowie Rechte an eigenen Texten und Medien.

**Die erste Version ist bereit für einen kleinen Praxistest, wenn:**

- alle sechs Artikel Lernziele, Quellen und ein tatsächliches fachliches Prüfdatum haben;
- alle 24 Fragen fachlich geprüft und mit verständlichen Erklärungen versehen sind;
- falsche Antworten zu hilfreichen Erklärungen führen;
- Paketreise und Artikel denselben fachlichen Ablauf erklären;
- ein vollständiger Lernweg auf dem Smartphone und ohne Maus funktioniert;
- Links, Inhaltsverweise und die Website-Erzeugung fehlerfrei geprüft wurden.

## Phase 2: Rückmeldungen einarbeiten und Themen erweitern

- Den ersten Lernpfad mit einigen Personen aus der Zielgruppe beobachten und Stolperstellen beheben.
- Eine weitere Welt nach Interesse und redaktioneller Kapazität ergänzen, etwa IT-Sicherheit oder Programmiergrundlagen.
- Binärlabor oder Phishing-Detektiv passend zu den neuen Artikeln entwickeln.
- Wiederholungen und Lesezeichen bei Bedarf ergänzen; persönlicher Fortschritt ist bereits verfügbar.
- Suche und Querverweise anhand tatsächlich gestellter Fragen verbessern.

## Phase 3: Persönliches Lernen und größere Übungen

- [x] Freiwillige Accounts und synchronisierten Lernstand auf Wunsch des Betreibers ergänzen.
- Ein CMS erwägen, wenn die Redaktion am Git-Workflow scheitert.
- Isolierte Praxisumgebungen für SQL oder Programmierung gesondert konzipieren.
- [x] Deutsch/Englisch und optionales dunkles Design ergänzen.
- Weitere Sprachen, Community-Beiträge und freiwillige Lernziele prüfen.

### LaTeX-/Typst-Projektprüfung · von Planung zur lokalen Implementierung

Der aktualisierte Nutzerauftrag vom 25. Oktober vereinfacht die Umsetzung: externe Bearbeitung/Compiler in Overleaf und typst.app, sichere lokale Quellen-/ZIP-Analyse in IT-Worlds mit Aufgabenmerkmalen und optionaler bewusster Kapitelmarkierung. Der frühere eigene Compilerprototyp wurde entfernt. Kein zusätzlicher Compilerhost und keine neuen laufenden Kosten erforderlich. PDF-Vorschau bleibt P2 unter den oben genannten Aufwand-/Kostenbedingungen; vollständige fachliche Bewertung bleibt getrennt.

### P2 · Schreibtrainer mit zusammenhängenden Texten

- [ ] Die späteren Herausforderungen des 10-Finger-Trainers um zusammenhängende Texte ergänzen. Der Lernweg soll von Zeichen und Buchstabengruppen über Wörter und Sätze bis zu kurzen, realistischen Absätzen führen, statt dauerhaft nur einzelne Zeichenfolgen zu verwenden.
- [ ] Texte nach bereits eingeführten Tasten, Länge, Zeichensetzung, Großschreibung, Zahlen, Sonderzeichen und Schwierigkeitsgrad staffeln. Neue Zeichen dürfen erst verlangt werden, wenn sie im Lernpfad eingeführt wurden.
- [ ] Für Textlektionen Fortschritt, Genauigkeit, Fehlerstellen, WPM/KPM und wiederkehrende Schwächen verständlich auswerten. Korrekturen und übersprungene Zeichen müssen konsistent mit den vorhandenen Messregeln behandelt werden.
- [ ] Deutsche und englische Übungstexte eigenständig und sprachgerecht verfassen, ihre Schwierigkeit vergleichbar halten und Rechte sowie Quellen vor einer Veröffentlichung klären.

## Offene Entscheidungen

| Frage | Vorschlag für den Einstieg | Anlass zur Neubewertung |
| --- | --- | --- |
| Für wen schreiben wir zuerst? | deutschsprachige Interessierte ohne tiefes Vorwissen | Rückmeldung aus Zielgruppengesprächen |
| Breite oder Tiefe? | ein verbundener Lernpfad, dazu eine Themenlandkarte | der erste Pfad wird verständlich und zuverlässig genutzt |
| Welche Technik? | statische Artikel mit gezielten interaktiven Komponenten | umfangreiche dynamische Anforderungen |
| Brauchen wir Nutzerkonten? | freiwillige Accounts für Synchronisierung; Inhalte frei | weitere persönliche Funktionen |
| Wie werden Inhalte gepflegt? | Inhaltsdaten in TypeScript und Review im Repository | Redaktion benötigt eine andere Oberfläche |
| Wie lizenzieren wir das Projekt? | Code, Lerntexte und Fremdmaterial getrennt beurteilen | vor entsprechenden externen Beiträgen und Veröffentlichung |

Konkrete nächste Arbeitspakete: die verfügbaren Inhalte unabhängig fachlich gegenlesen lassen, die Kurse mit Lernenden erproben und die geführten Lernwege mit Lernenden erproben.

Aktuelle Prioritäten, abgeschlossene Teilbereiche und verbleibende fachliche Lücken: [AUSBAU.md](AUSBAU.md).

Aktuell: fünfzehn Kursfolgen/122 Kapitel/254 Fragen. Lernstart, Kursfilter, Kapitelsuche, synchronisierte Quizfilter und gruppierter Lernstand umgesetzt. Cloud-&-DevOps-Kurs und drei durchgängige Querverbindungspfade sind ergänzt. Python und Betriebssystemkonzepte sind ergänzt; unabhängiges Fachreview, weitere Praxisprojekte und assistive Nutzerprüfungen folgen.
