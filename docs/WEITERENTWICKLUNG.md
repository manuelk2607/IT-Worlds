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

## Paket 2 · TypeScript-Kurs

Acht Kapitel ergänzen Programmiergrundlagen, Funktionen, Listen/Objekte, unbekannte Daten und Zustände, asynchrone Ergebnisse, Tests, Generics und einen Aufgabenplaner. Jedes Kapitel hat eine eigene Aufgabe mit begründeter Lösung und zwei Quizfragen. Alle acht veröffentlichten Programme wurden separat strikt typgeprüft und ausgeführt; automatisierte Zusatzfälle prüfen ungültige Zahlen, leere Listen, doppelte IDs und unveränderte Eingaben. Quellen: TypeScript-Handbook, Node-22.22-Testläufer und die konkret verwendeten MDN-Laufzeitfunktionen. Keine JavaScript-Quelldateien oder JavaScript-Lernbeispiele ergänzt.

## Paket 3 · Webkurs

Acht Kapitel verbinden semantisches HTML, CSS-Boxmodell, responsive Raster, Formulare, DOM-Interaktion mit TypeScript, Fehlerzustände, Tastaturzugang und Veröffentlichung. Alle 16 Fragen erklären jede Option. Praktisch geprüft: Boxbreiten 224/200 Pixel, ein-/zweispaltiges Raster bei 390/1280 Pixeln, Label-Zuordnung und ungültige/gültige Formeingabe, Zähler mit Maus und Leertaste, Fehler plus erfolgreicher Wiederholungsversuch, sichtbarer Sprunglink und Fokus auf dem Hauptinhalt. TypeScript-Listings werden jetzt insgesamt automatisiert streng geprüft; Browsercode ist als solcher gekennzeichnet. Der enthaltene Node-Auslieferungstest hat HTML 200 und fehlende Route 404 bestätigt. Die isolierten HTML-Demos senden keine echten persönlichen Daten.

## Paket 4 · IT-Grundlagen

Sieben Kapitel führen von Binärdarstellung und UTF-8 über JSON, isolierte Dateioperationen und Git zu Suchalgorithmen, kontrollierter Fehlersuche und einem validierten Datenprojekt. 14 Fragen erklären alle Antwortmöglichkeiten. Die Programme werden ausgeführt und streng geprüft; Zusatztests prüfen JSON-Syntax und Fachvertrag, binäre Suche über leere/einzelne/mehrere Einträge, Zahlenüberlauf sowie den Unterschied zwischen vorgemerkter Git-Version und späterer Arbeitsänderung. Dateien und Git-Repository der Beispiele bleiben strikt temporär.
