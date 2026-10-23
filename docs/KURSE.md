# KI- und LaTeX-Kurse

Stand: 23. Oktober 2026. 8 Datenbank-, 7 API-, 14 KI- und 13 LaTeX-Kapitel sind auf Deutsch und Englisch verfügbar. Die vier Folgen behandeln Grundlagen, Vertiefung und fortgeschrittene Projekte; sie ersetzen keine eigenständige Praxis oder Fachbegutachtung. LaTeX bleibt unter Programmiersprachen → Auszeichnungs- & Satzsprachen.

## Lernfolge

KI: Lernaufgaben → lineare Algebra → Wahrscheinlichkeit → Ableitungen/Backpropagation → ML/Evaluation → mehrschichtige Netze → vollständiges Training → Optimierung → CNN/Transferlernen → RNN/LSTM → Transformer → LLM/LoRA/RAG → VAE/GAN/Diffusion → Anwendungen, Grenzen und Abschlussprojekt.

LaTeX: Einrichtung → Syntax → Dokumentstruktur → Typografie → Mathematik → Ausrichtungen/Matrizen → Tabellen → Grafiken → Querverweise → BibLaTeX/Biber → Pakete/eigene Befehle → Fehlerdiagnose → komplexer Abschlussbericht.

Jedes Kapitel enthält Lernziele, erklärende Abschnitte, eine Praxisaufgabe mit aufklappbarer Lösung, zwei Quizfragen und konkrete Quellen. Vorheriges/nächstes Kapitel, Voraussetzungen, Inhaltsverzeichnis und zwei Kurslernwege verbinden die Inhalte. Formeln werden beim Build mit KaTeX als HTML und zugängliches MathML erzeugt. Die Beispiele sind eigenständig; die Website führt Python oder LaTeX nicht aus.

## Integration

- `src/data/course-types.ts`: strikt typisierte zweisprachige Daten und gemeinsame Builder.
- `course-ai*.ts` und `course-latex*.ts`: Texte, Beispiele, Aufgaben und Fragen.
- `course-sources.ts`: 50 neue Primärbelege mit Herausgeber, Version, Abschnitt, URL und Lesedatum.
- `courses.ts`: gemeinsame Kursliste, Kapitel-IDs, Quizfragen und Lernpfade. Keine getrennte Kopie der DE-/EN-Inhalte.
- `CourseView.astro`: gemeinsame Kapitel-/Übersichtsansicht; `courses.css`: responsive Darstellung.
- Routen: `/themen/ki-neuronale-netze/kurs/[kapitel]/` und `/themen/programmiersprachen/latex/[kapitel]/`; Englisch zusätzlich unter `/en/`. Ohne Kapitel erscheint die Kursübersicht.
- Suche, Quellenverzeichnis, Sitemap, Themenansichten und Lernstand übernehmen dieselben Daten.

Das Quiz filtert nach Thema, Kurs, Stufe und Kapitel. Links verwenden `?kurs=ki&kapitel=transformer`; `?frage=ki-transformer-1` öffnet eine einzelne Frage. Nach der Antwortprüfung werden sämtliche Optionen erklärt. Neustart beginnt den Durchlauf neu; freiwillig gespeicherter Account-Fortschritt bleibt erhalten.

Neue Fortschrittskennungen sind `ki-[kapitel]` beziehungsweise `latex-[kapitel]`; Frage-IDs ergänzen `-1` oder `-2`. Die vorhandene API validiert sie gegen die gemeinsame Inhaltsliste. Keine Datenbankmigration, Änderung der Zugriffsrechte oder Löschung bestehender Lernstände.

## Prüfung und Grenzen

Alle acht Python-Beispiele wurden mit Python 3.12 und PyTorch 2.14.1 ausgeführt. Zwölf LaTeX-Beispiele wurden mit dem eingebauten Tectonic/XeTeX-Compiler erfolgreich übersetzt. Der BibLaTeX-Beispieltext erreicht den Biber-Schritt; die vollständige Literaturpipeline ist lokal mangels Biber nicht geprüft. Der angegebene Ablauf (LaTeX → Biber → LaTeX → LaTeX) setzt eine vollständige TeX-Installation voraus.

Automatische Tests prüfen Sprachparität, eindeutige IDs, Quellenbezüge, Formelrendering, Quizlösungen und Filterkombinationen. Handrechnungen prüfen ausgewählte Zahlenbeispiele. Quellenabgleich und technische Prüfung sind kein unabhängiges Fachreview; dieses steht aus.

## Ergänzung: Datenbanken und APIs

Acht SQL-Kapitel führen von Modellierung über Abfragen, Joins, Auswertungen und Transaktionen bis zu Parametern, Plänen und Migration/Restore. Sieben API-Kapitel behandeln HTTP, OpenAPI, Laufzeitvalidierung, Fehler, Objektberechtigungen, Idempotenz/Versionskonflikte und Vertragstests. Beide Folgen haben aufeinander aufbauende Aufgaben und Abschlussprojekte. Alle acht SQL-Beispiele wurden in isoliertem PostgreSQL 18 geprüft, alle sieben TypeScript-Beispiele streng typgeprüft und ausgeführt. Der API-Test prüft zusätzlich ungültige Daten, HTTP-Fehler und veraltete Versionen. Ein eigener Dump/Restore-Test verwendet ausschließlich eine lokale Testdatenbank.

Daten: `course-databases.ts`, `course-apis.ts`, `course-foundation-sources.ts`; 17 zusätzliche Primärquellen und 30 Fragen. Fortschrittskennungen beginnen mit `datenbanken-` beziehungsweise `apis-`. Die bisherigen KI-/LaTeX-Kapitel wurden nicht verändert. Die nun vier Kurse nutzen dieselbe Darstellung, Suche, Quizfilter, Lernpfade und Fortschrittsvalidierung. Gesamt: 42 Kapitel und 94 Fragen.

## Aktueller Ausbau · 23.10.2026

Zehn Kursfolgen mit 84 Kapiteln und 178 Fragen. Neue Dateien: course-basics.ts (7), course-typescript.ts (8), course-web.ts (8), course-linux.ts (6), course-networks.ts (6), course-security.ts (7). Alle zweisprachig mit Aufgabe, Lösung und zwei erklärten Fragen pro Kapitel. Quellenregister laufen zentral in content.ts zusammen. runtime kennzeichnet Browser-/Node-Beispiele; related nennt ergänzende Kurse. Alle TypeScript-Listings werden streng geprüft, lokale Modelle zusätzlich ausgeführt. Details: [WEITERENTWICKLUNG.md](WEITERENTWICKLUNG.md).
