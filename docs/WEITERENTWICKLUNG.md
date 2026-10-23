# Iterative Weiterentwicklung · 23. Oktober 2026

## Ausgangspunkt

Commit 61810f3: zehn Themenwelten, vier Kursfolgen mit 42 Kapiteln, 94 Fragen und 86 Primärquellen. Sieben Themenwelten haben außerhalb der vorhandenen Unterkurse nur einen kurzen Einstieg. KI und LaTeX werden inhaltlich zunächst nicht erweitert. Nutzerdatei `.clinerules` bleibt erhalten.

## Paket 1 · Orientierung und Suche

- Neuer Lernstart `/lernen/` mit drei konkreten Zielen: Grundlagen, einen Kurs durcharbeiten, Wissen prüfen.
- Kurskatalog trennt vollständig verfügbare Kurse von den drei älteren, teilweise geplanten Lernpfaden. Titel-/Themenfilter erhalten ihre Auswahl in der URL und beim Sprachwechsel.
- Themenkarten nennen verfügbare Kapitel statt pauschal nur einen Einstieg. Hauptnavigation ist auf fünf Lernziele reduziert; Quellen und Einstiegshilfe bleiben im Mobilmenü und Footer erreichbar.
- Kurse und Themen besitzen sichtbare Breadcrumbs; Kapitel liefern eine entsprechende strukturierte Hierarchie. Auf Mobilgeräten ist das Kursverzeichnis zunächst geschlossen, damit die Lektion direkt erreichbar ist.
- Suche lädt ihren sprachspezifischen Index erst beim Öffnen. Sie durchsucht auch Kapiteltexte, kombiniert mehrere Wörter, normalisiert Umlaute, gewichtet Titel und begrenzt die Ergebnisliste. Filter nach Inhaltstyp sowie Tastaturbedienung ergänzt. Statische JSON-Indizes enthalten ausschließlich öffentliche Lerninhalte.
- Geprüfte SQL-Kapitelseite: 76.317 auf 22.174 HTML-Bytes reduziert (rund 71 %), bevor weitere Inhalte hinzukommen. Der Suchindex ist nicht mehr auf jeder Seite als lange Linkliste eingebettet.
- 24 Tests, strikte Prüfung und Build erfolgreich. Lokal geprüft: Kapitelsuche, Enter-Navigation, Kursfilter samt Leerzustand und Reset, Mobilmenü, geschlossene mobile Kapitelübersicht, Dark Mode und Seitenbreite.

Weitere Pakete und Veröffentlichung werden nach Umsetzung ergänzt. Unabhängiges Fachreview bleibt eine gesonderte Aufgabe.
