# KI- und LaTeX-Kurse

Stand: 23. Oktober 2026. 14 KI- und 13 LaTeX-Kapitel sind auf Deutsch und Englisch verfügbar. Beide Folgen behandeln Grundlagen, Vertiefung und fortgeschrittene Projekte; sie ersetzen keine eigenständige Praxis oder Fachbegutachtung. LaTeX bleibt unter Programmiersprachen → Auszeichnungs- & Satzsprachen.

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
