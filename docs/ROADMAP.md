# Roadmap

Die Reihenfolge beschreibt vorgeschlagene Ausbaustufen, keine zugesagten Termine. Umfang und Prioritäten werden nach Rückmeldungen angepasst.

## Aktueller Website-Rahmen

- [x] Zehn Themenwelten mit Einstieg, Vertiefung und Profi-Themen strukturieren.
- [x] Startseite, Themen- und Lernpfadseiten mit responsivem Layout umsetzen.
- [x] Themen- und Lernpfadsuche sowie Themen- und Stufenfilter bereitstellen.
- [x] Zehn kurze Einstiegsartikel und zehn passende Quizfragen mit Primärquellen hinterlegen.
- [x] 19 Originalquellen mit Herausgeber, Version, Abschnitt und Lesedatum dokumentieren.
- [x] LaTeX, Typst und Markdown als Unterbereich von Programmiersprachen einordnen.
- [x] Projektcode einschließlich Tests, Hilfsskripten und Astro-Konfiguration auf TypeScript vereinheitlichen.
- [ ] Unabhängiges Fachreview der Einstiege und Quizfragen durchführen.
- [ ] Lernpfade vollständig ausarbeiten und für Vertiefung/Profi passende Belege recherchieren.

Der frühere Vorschlag „Vom Browser zur Website“ bleibt eine mögliche spätere inhaltliche Ausbaustufe. Die drei derzeit sichtbaren Lernpfade sind Skizzen, keine abgeschlossenen Kurse. Details im [Website-Aufbau](WEBSITE-AUFBAU.md).

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

## Offene Entscheidungen

| Frage | Vorschlag für den Einstieg | Anlass zur Neubewertung |
| --- | --- | --- |
| Für wen schreiben wir zuerst? | deutschsprachige Interessierte ohne tiefes Vorwissen | Rückmeldung aus Zielgruppengesprächen |
| Breite oder Tiefe? | ein verbundener Lernpfad, dazu eine Themenlandkarte | der erste Pfad wird verständlich und zuverlässig genutzt |
| Welche Technik? | statische Artikel mit gezielten interaktiven Komponenten | umfangreiche dynamische Anforderungen |
| Brauchen wir Nutzerkonten? | freiwillige Accounts für Synchronisierung; Inhalte frei | weitere persönliche Funktionen |
| Wie werden Inhalte gepflegt? | Markdown und Review im Repository | Redaktion benötigt eine andere Oberfläche |
| Wie lizenzieren wir das Projekt? | Code, Lerntexte und Fremdmaterial getrennt beurteilen | vor entsprechenden externen Beiträgen und Veröffentlichung |

Konkrete nächste Arbeitspakete: die zehn Einstiege und Fragen fachlich gegenlesen lassen, einen Lernpfad vollständig ausarbeiten und die Beleglage für Vertiefungs- und Profi-Inhalte aufbauen.
