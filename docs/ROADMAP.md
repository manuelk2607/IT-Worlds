# Roadmap

Die Reihenfolge beschreibt vorgeschlagene Ausbaustufen, keine zugesagten Termine. Umfang und Prioritäten werden nach Rückmeldungen angepasst.

## Phase 0: Konzept und Repository

Dieses Dokumentationspaket umfasst:

- [x] Projektziel, Zielgruppenhypothesen und Themenwelten formulieren.
- [x] Artikelstruktur, Quellenprinzipien und Inhaltsmodell skizzieren.
- [x] Quizzes und Lernspiele mit Lernzielen sammeln.
- [x] Technische Ansätze vergleichen und eine vorläufige Empfehlung begründen.
- [x] README, Beitragsleitfaden sowie Issue- und Pull-Request-Vorlagen vorbereiten.
- [x] Repository-Beschreibung und GitHub-Topics zur Übernahme vorbereiten.
- [ ] Beschreibung und Topics in den GitHub-Metadaten übernehmen; siehe [Einrichtungsstatus](GITHUB-SETUP.md).
- [ ] Zielgruppe, Lizenzmodell und technische Richtung festlegen.

## Phase 1: Ein vollständiger Lernpfad als erste Version

**Ziel:** Eine Person kann „Vom Browser zur Website“ ohne Konto durcharbeiten und den Ablauf danach nachvollziehen.

Vorgeschlagener Umfang:

- Sechs geprüfte Artikel aus dem [Inhaltskonzept](INHALTE.md).
- Eine Startseite, zwei Themenübersichten und eine geordnete Lernpfadansicht.
- Ein kleines Glossar zu den verwendeten Begriffen und eine Suche.
- Je Artikel vier Single-Choice-Fragen, insgesamt 24 Fragen mit Erklärungen.
- Das Spiel „Paketreise“ als Wiederholung des Gesamtzusammenhangs.
- Mobile Darstellung und vollständige Bedienung per Tastatur.

Der Einstieg braucht noch keine Anmeldung, öffentliche Rangliste, automatische Newsimporte oder Ausführung von Nutzer-Code. Optionaler lokaler Fortschritt kann ergänzt werden, wenn er beim ersten Nutzertest hilft.

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
- Bei nachgewiesenem Bedarf lokale Lesezeichen, Wiederholungen und Fortschritt ergänzen.
- Suche und Querverweise anhand tatsächlich gestellter Fragen verbessern.

## Phase 3: Persönliches Lernen und größere Übungen

- Konten und synchronisierte Lernstände nur bei erkennbarem Nutzen ergänzen.
- Ein CMS erwägen, wenn die Redaktion am Git-Workflow scheitert.
- Isolierte Praxisumgebungen für SQL oder Programmierung gesondert konzipieren.
- Weitere Sprachen, Community-Beiträge und freiwillige Lernziele prüfen.

## Offene Entscheidungen

| Frage | Vorschlag für den Einstieg | Anlass zur Neubewertung |
| --- | --- | --- |
| Für wen schreiben wir zuerst? | deutschsprachige Interessierte ohne tiefes Vorwissen | Rückmeldung aus Zielgruppengesprächen |
| Breite oder Tiefe? | ein verbundener Lernpfad, dazu eine Themenlandkarte | der erste Pfad wird verständlich und zuverlässig genutzt |
| Welche Technik? | statische Artikel mit gezielten interaktiven Komponenten | umfangreiche dynamische Anforderungen |
| Brauchen wir Nutzerkonten? | zunächst ohne Konto | belegter Wunsch nach Synchronisierung |
| Wie werden Inhalte gepflegt? | Markdown und Review im Repository | Redaktion benötigt eine andere Oberfläche |
| Wie lizenzieren wir das Projekt? | Code, Lerntexte und Fremdmaterial getrennt beurteilen | vor entsprechenden externen Beiträgen und Veröffentlichung |

Konkrete nächste Arbeitspakete nach dem Konzept: Zielgruppe festhalten, den Lernpfad fachlich skizzieren, zwei Artikelentwürfe mit Quizfragen gegenlesen lassen und erst danach einen kleinen technischen Prototyp planen.
