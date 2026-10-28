# Roadmap

Die Reihenfolge beschreibt vorgeschlagene Ausbaustufen, keine zugesagten Termine. Umfang und Prioritäten werden nach Rückmeldungen angepasst.

## Entwicklungsstand · 28. Oktober 2026

22 Kurse mit 169 Kapiteln, insgesamt 348 Quizfragen und 273 Quellen. Typst umfasst 16 Kapitel/32 Fragen, LaTeX 14/28. Der öffentliche Versionsstand steht in VALIDIERUNG.md. Die technischen P1-Prüfungen für Rangliste, Godot und Linux/systemd sind abgeschlossen; unabhängiges Review und tatsächlicher Reset-Mailempfang bleiben gesondert offen.

- [x] Gemeinsamen Textsatz-Einstieg, prominentere Typst-/LaTeX-Navigation, Kursvergleiche und Querverweise ergänzen; bestehende URLs und Fortschrittskennungen erhalten.
- [x] Typst um Programmierung, Module/Pakete, Datenberichte, Kontext, wissenschaftliche Publikationen, Präsentationen, automatisierte Builds und Projektabgabe erweitern; LaTeX-Diagnosekapitel ergänzen.
- [x] Einzeldatei-/ZIP-Workflows mit Hauptdateiauswahl, lokaler Analyse, positionsbezogenen Hinweisen und Prüfreport für LaTeX und Typst implementieren.
- [x] P0: Overleaf/typst.app direkt in Kursen und Aufgaben verlinken; Quellen ausschließlich sicher lokal im Browser prüfen und verständlich erklären.
- [x] P1: Mehrteilige Projekte/ZIPs, 30 Kapitel-Aufgabenprofile und bewusste bestehende Lernfortschrittsmarkierung integrieren.
- [x] Eigenen Kompilierungsdienst samt API/CI/Setup zugunsten des einfachen kostenlosen Browserworkflows entfernen. PDF und tatsächliche Kompilierung bleiben im externen Editor.
- [ ] P2: Zusätzliche Diagnostik/PDF-Vorschau ausschließlich ohne zusätzliche laufende Kosten und bei geringem Wartungsaufwand prüfen. Kein Compilerhost ist Voraussetzung für diesen Release.
- [x] P1: Ranking-/Zwei-Account-/RLS-/Timing-/Replaytests, Godot-Ausführung und Browserprüfungen bestehen. Additive Produktionsmigration 002 nach development-Audit angewendet und Onlinefunktionen öffentlich aktiviert; Versionsnachweis in VALIDIERUNG.md. Details: [DREI-LERNBEREICHE.md](DREI-LERNBEREICHE.md).
- [x] P1: Linux/systemd-Benutzerlabor mit eigener transienter Unit und Fehler-/Journalnachweis, DE/EN und echter Linux-CI-Prüfung ergänzen.
- [ ] P1 · extern blockiert: unabhängiges Fachreview und assistive Nutzerprüfung; geeignete externe Prüfpersonen fehlen.
- [ ] P1 · extern blockiert: vollständige Passwort-Wiederherstellung einschließlich tatsächlichem Mailempfang; kontrolliertes Testpostfach fehlt. Negative API-Pfade sind geprüft. [Prüfabläufe](P1-PRUEFUNGEN.md).
- [x] Aufgabenbezogene Selbstprüfrubriken für alle 30 Textsatzkapitel und die Typst-Verweisaufgabe: vorhandene Lernziele, Aufgabe/Musterlösung, bewusste Compiler-/Ausgabekontrolle und bestehende Fortschrittsmarkierung; keine automatische fachliche Benotung.
- [x] Drei vollständige lokale Praxisprojekte mit getesteten Referenzen/ZIPs und DE/EN-Anleitungen: mehrseitiger Webkatalog, relationaler SQL-Lernbericht und HTTP-Abnahme mit Fehlerdiagnose/Wiederanlauf.
- [x] Übungsübersicht nach Themen/Kursen, sechs kombinierte Filter, Kurs-/Quiz-/Pfadlinks, getrennte lokale Selbst-/Modellstände mit Sicherung und Wiederholhinweisen.
- [x] Vier weitere vollständige lokale Projekte (Lernzeitbericht, IPv4-Netzplan, Registermaschine, SHA-256-Inventar), wiederaufnehmbare Checklisten für alle sieben Projekte, vier Ablaufaufgaben und fester interaktiver CPU-Trace; DE/EN.
- [x] Kleines DE/EN-Glossar mit 15 quellengebundenen Begriffen, kombinierten Filtern, Kursverknüpfungen und globaler Suche ergänzen. Suchbeschreibungen/Lernziele tatsächlich durchsuchen.
- [ ] P3: Weitere Visualisierungen nach Bedarf. Kompilierung bleibt von fachlicher Bewertung getrennt.

Architektur, Datenschutz, Limits, lokale Bedienung und aktuelle Freigabegrenzen: [DOKUMENTPRUEFUNG.md](DOKUMENTPRUEFUNG.md).

## Aktueller Website-Rahmen

- [x] Zehn Themenwelten mit Einstieg, Vertiefung und Profi-Themen strukturieren.
- [x] Startseite, Themen- und Lernpfadseiten mit responsivem Layout umsetzen.
- [x] Themen- und Lernpfadsuche sowie Themen- und Stufenfilter bereitstellen.
- [x] Zehn kurze Einstiegsartikel und zehn passende Quizfragen mit Primärquellen hinterlegen.
- [x] 200 Originalquellen mit Herausgeber, Version, Abschnitt und Lesedatum dokumentieren.
- [x] Typst und LaTeX als eigene Themenkategorie „Textsatz & Dokumentenerstellung“ bündeln, Typst hervorheben und bisherige Kurs-URLs/Fortschritts-IDs erhalten; Markdown bleibt bei Programmiersprachen.
- [x] Projektcode einschließlich Tests, Hilfsskripten und Astro-Konfiguration auf TypeScript vereinheitlichen.
- [ ] Unabhängiges Fachreview der Einstiege und Quizfragen durchführen.
- [x] KI- und LaTeX-Kursfolgen mit 27 Kapiteln, 54 zusätzlichen Fragen und Belegen ausarbeiten.
- [x] Drei themenübergreifende Lernwege mit 13/14/10 verfügbaren Kapitelschritten ausarbeiten.

22 Kursfolgen mit 169 Kapiteln und vier vollständige geführte Lernwege stehen bereit. Hinzu kommen sieben vollständige lokale Praxisprojekte, darunter: HTTP-Abnahme mit Fehlerdiagnose/Wiederanlauf, relationaler SQL-Lernbericht und mehrseitiger TypeScript-Katalog mit Suche/Filtern/Lesezeichen. Archive enthalten die tatsächlich getesteten Quellen; eigene DE/EN-Projektanleitungen verbinden sie mit den bestehenden Kursen. Details im [Website-Aufbau](WEBSITE-AUFBAU.md).

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

- [x] Zusammenhängende Sätze, einen vollständigen Absatz und einen Alltagstext mit Zahlen und Sonderzeichen ergänzen. Zwölf gestufte Lektionen plus adaptive/eigene Texte; vorhandene IDs und Ranglistentexte erhalten.
- [x] Zeichenmengen und Voraussetzungen ausdrücklich definieren; fehlende G/H-/Ä-/ß-Einführung ergänzen. Regressionstest stellt sicher, dass kein Übungstext unbekannte Zeichen verlangt.
- [x] Textfortschritt, verbleibende Fehlerpositionen, korrigierte Fehlanschläge und vollständigen Endtext anzeigen. Bestwerte für denselben tatsächlichen Text und dieselbe Sprache vergleichen; alte Historie erhalten.
- [x] Eigene DE/EN-Texte mit vergleichbarer Länge erstellen; keine fremden Textpassagen übernommen. Beschreibung und Grenzen: [SCHREIBTRAINER.md](SCHREIBTRAINER.md).

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

Aktuell: 22 Kursfolgen/169 Kapitel/348 Fragen/273 Quellen, 14 Themenkacheln und sieben zusätzliche Praxisprojekte. Verbindlicher aktueller Paket- und Veröffentlichungsstand: [PROGRESS.md](../PROGRESS.md). Unabhängiges Fachreview und assistive Nutzerprüfungen bleiben offen; weitere Projekte anhand von Lernendenfeedback priorisieren.


### Sprach- und Strukturpaket · 27.10.2026

Java, C/C++, Go und Rust sind als vier vollständige, abgegrenzte Sechskapitelfolgen umgesetzt (24 Listings/48 Fragen/33 neue Belege). Aufgabenübersicht, Themenwahl, Kursgruppen und vierter geführter Lernpfad sind integriert. Lokale und öffentliche Browser-/Releaseprüfung abgeschlossen; Quellstand ec9db5c, sieben erfolgreiche CI-Jobs und 512 bytegeprüfte öffentliche Sprachseiten. Vollständiger Veröffentlichungsnachweis in PROGRESS.md/VALIDIERUNG.md. Weitere Sprachkapitel erst anhand konkreter Inhaltslücken, kein pauschaler Anspruch auf vollständige Sprachreferenzen. Unabhängiges Fach-/assistives Review und echter Reset-Mailtest bleiben extern offen.
