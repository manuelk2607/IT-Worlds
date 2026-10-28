# Website-Aufbau

Der erste Rahmen macht die breite Themenlandkarte benutzbar. Das Ziel ist Wissen für Anfänger bis Profis; umfassende Abdeckung entsteht durch weitere Inhalte und Fachreviews, nicht allein durch diese Seitenstruktur.

## Seiten und Navigation

| Seite                | Inhalt                                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `/`                  | Einstieg, 14 Themenkacheln, Gruppenfilter, Lernpfade, Quellenanspruch, Quiz-Einstieg       |
| `/themen/[slug]/`    | Beschreibung, Voraussetzungen, drei Lernstufen, gegebenenfalls erster Artikel, passende Quellen           |
| `/lernpfade/`        | 22 verfügbare, nach Themen gruppierte Kursfolgen mit Themen-/Titelfilter und vier vollständig verfügbaren Querverbindungspfaden                                                            |
| `/lernpfade/[slug]/` | Voraussetzungen, Schritte, tatsächliche Verfügbarkeit und Verknüpfung zur Themenwelt                      |
| `/uebungen/` | 203 nach Thema/Kurs gegliederte Aufgaben und Projekte, Suche, sechs kombinierte Filter, lokale Aufgabenstände und Sicherung |
| `/uebungen/ablauf/[id]/` | Vier tastaturbedienbare Ablaufaufgaben mit Modellergebnis, gezieltem Feedback und erklärter Lösung |
| `/projekte/{kurskatalog,lernbericht,auslieferung,lernplan,netzplan,cpu,integritaet}/` | Sieben vollständige DE/EN-Praxisprojekte mit Zielen, Voraussetzungen, Schritten, Tests, Abnahme, Referenzdateien, ZIP und lokaler Checkliste |
| `/glossar/` | 15 zweisprachige Begriffe mit Suche, Themenfilter, Primärbeleg und Kurs-/Projektverknüpfung |
| `/schreibtrainer/` | Zwölf gestufte QWERTZ-Lektionen plus adaptive/eigene Texte, Textfortschritt, lokale Historie, optionale Konto-Ergebnisse und Rangliste |
| `/dokumentpruefung/` | Sicherer lokaler Quellen-/ZIP-Import für LaTeX/Typst, statische Diagnostik und 31 Selbstprüfprofile mit bewusster Kapitelmarkierung |
| `/quiz/`             | 348 Fragen, Themen-, Kurs-, Kapitel- und Stufenwahl, Erklärung zu jeder Antwort, Beleg, Runden mit 5/10/20/allen Fragen, reproduzierbares Mischen und gezielte Wiederholung                      |
| `/quellen/`          | 273 Originalquellen mit Herausgeber, Version, Abschnitt, Lesedatum und gelesenem Dokumentationsquelltext |

Die globale Suche lädt ihren sprachspezifischen JSON-Index erst beim Öffnen und durchsucht Themen, Kurse, alle 169 Kapiteltexte einschließlich Lernzielen, Aufgaben und erklärten Lösungen, Lernpfade, Übungen/Projekte, Quellen und Glossarbegriffe. Mehrere Wörter werden kombiniert; Titel sind höher gewichtet. Ein Inhaltstypfilter sowie Pfeiltasten, Enter und Escape unterstützen die Bedienung. /lernen/ bietet Orientierung; /lernpfade/ bietet verfügbare Kurse und durchgehende Querverbindungspfade. Glossarfilter bleiben in der URL und beim Sprachwechsel erhalten; die vollständigen Begriffe sind auch ohne Skripte lesbar.

Die Seiten stehen zusätzlich unter `/en/` vollständig auf Englisch bereit. Der Sprachschalter erhält die entsprechende Seite, Suchparameter und Sprungmarken. Jede Themenwelt enthält unter `#uebungseditor` eine passende Aufgabe. Eingaben werden lokal in einem begrenzten Lernmodell geprüft; der Quiz-/Lesefortschritt wird dadurch nicht automatisch geändert.

Das helle oder dunkle Design lässt sich im Kopfbereich umstellen und bleibt im Browser gespeichert.

`/konto/` bietet Registrierung, Anmeldung und Passwort-Zurücksetzen; `/fortschritt/` zeigt freiwillig gespeicherten Lernfortschritt. Die englischen Varianten liegen ebenfalls unter `/en/`. Alle Seiten und Lerninhalte bleiben für Gäste erreichbar.

## Themenlandkarte

Die Hauptnavigation wird von `src/scripts/navigation.ts` gesteuert. Auf der Startseite teilen sich „Entdecken“ und „Themenwelten“ einen aktiven Zustand für Desktop, Mobilmenü und `aria-current`. Klicks starten Scrollen und Unterstrich mit gleicher Dauer und Beschleunigung; ein weiterer Klick ersetzt die laufende Animation. Manuelles Scrollen aktualisiert die Markierung, Rad-/Touch-/Tastatureingaben unterbrechen den automatischen Übergang. Hash-Links, Zurück/Vorwärts, Sprachwechsel und die Systemeinstellung für reduzierte Bewegung werden berücksichtigt. Scrollziele verwenden denselben Abstand wie native Ankerlinks, auch bei kleinerem Mobilheader.

Die fünf gewünschten Kernbereiche sind **Programmiersprachen**, **Datenbanken**, **Website bauen**, **KI und neuronale Netze** sowie **APIs und Schnittstellen**. Als ergänzende Grundlagen sind **IT-Grundlagen**, **Internet und Netzwerke**, **IT-Sicherheit**, **Cloud und DevOps** sowie **Betriebssysteme und Linux** angelegt. Git, Testing, Algorithmen, Softwarearchitektur, Datenschutz und Barrierefreiheit sind als Querschnittsthemen eingebunden.

Die eigene Themenkachel **Textsatz & Dokumentenerstellung** bündelt Typst und LaTeX. Typst steht als empfohlener moderner Einstieg zuerst; LaTeX folgt als etabliertes TeX- und Vorlagenökosystem. Markdown bleibt als Klartext-Dokumentationssprache bei **Programmiersprachen**. Die Kachel führt zum bestehenden Portal `/textsatz/`; frühere Kurs-URLs unter `/themen/programmiersprachen/` bleiben als stabile Kompatibilitätsrouten bestehen und verwenden weiterhin dieselben Fortschrittskennungen.

Die Web-Lernwege verwenden TypeScript. JavaScript wird dort nur bei Bedarf als zugrunde liegende Browser-Laufzeit oder zum Vergleich erklärt. Astro baut die Website; TypeScript bleibt die Sprache für Anwendungslogik, Tests, Hilfsskripte und Konfiguration.

| Stufe      | Ziel                                                        | Beispiele                                                      |
| ---------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| Einstieg   | Begriffe verstehen und erste einfache Aufgaben lösen        | HTML-Elemente, SQL-SELECT, Variablen                           |
| Vertiefung | Inhalte verbinden und eigenständig umsetzen                 | API-Clients, Datenmodellierung, Tests, Training und Evaluation |
| Profi      | Architektur und Grenzen anhand von Anforderungen beurteilen | Konsistenz, Performance, Sicherheitsarchitektur, MLOps         |

Lernstufe und Vorwissen werden getrennt angegeben. Beispielsweise ist das vorhandene PyTorch-Strukturbeispiel ein Einstieg in das Framework, setzt aber Python-Klassen voraus.

## Verfügbare und geplante Inhalte

Verfügbar sind zehn Einstiege und 169 Kurskapitel: Hardware 6, Tastschreiben 3, Spieleentwicklung 5, Grundlagen 7, Betriebssystemkonzepte 6, Linux 6, Netzwerke 8, Sicherheit 7, TypeScript 8, Python 8, Markdown 6, Typst 16, Web 8, SQL 8, APIs 7, Cloud/DevOps 8, KI 14 und LaTeX 14. Java 6, C/C++ 6, Go 6 und Rust 6 ergänzen diese Folgen. Insgesamt 348 Fragen und 273 Quellen. Fortschritt zählt 179 lesbare Inhalte und 348 Fragen mit stabilen IDs. Kursgruppen, Ansicht-/Themenfilter und der nächste offene Schritt verbessern die Übersicht. Alle Themenbereiche besitzen eine verfügbare Kursfolge. Vier Querverbindungspfade nutzen 13, 14, 10 und 14 vorhandene Kapitel mit identischen Fortschrittskennungen. Die zusätzlichen Projekte werden mit den zugehörigen Kursen verlinkt; sie verändern keine bestehenden Konto-Fortschritts-IDs oder gespeicherten Kontodaten. Ihre getrennten lokalen Aufgaben-/Checklistenstände verwenden eigene Kennungen.

Projektmetadaten und Archive werden zentral in `src/data/practice-projects.ts` geführt. `npm run package:projects` erstellt die ZIPs aus den gepflegten Referenzquellen; Tests vergleichen jeden Archiveintrag mit seiner Quelle. Der Webkatalog liegt unter `examples/webcatalog/`, SQL-/HTTP-Dateien unter `public/projekte/`. Ausführbare SQL- und HTTP-Tests prüfen reale Fehlerfälle; keine simulierte Cloud-Veröffentlichung wird als echte Abnahme ausgegeben. Das Glossar liegt in `src/data/glossary.ts` und verwendet das bestehende Quellenregister.

Kapitelrouten, Datenmodell und Erweiterung sind in [KURSE.md](KURSE.md) beschrieben.

## Inhalte erweitern

`src/data/content.ts` und `src/data/content.en.ts` sind die gemeinsame Datenbasis beider Sprachen. Inhaltskennungen und Quellenverknüpfungen bleiben identisch. Eine Erweiterung folgt diesem Ablauf:

1. Lernziel, Zielgruppe, Voraussetzungen und Fachumfang festlegen.
2. Passende Primärquellen tatsächlich lesen. Herausgeber, Version, konkreten Abschnitt, URL und Lesedatum erfassen; bei veränderlichen Quellen möglichst einen unveränderlichen Stand referenzieren.
3. Den Inhalt eigenständig zusammenfassen, Beispiele als solche kennzeichnen und Grenzen nennen.
4. Eine Frage mit genau einer eindeutigen Lösung, Erklärung je Antwort und konkretem Quellenverweis ergänzen.
5. Fachlich gegenlesen lassen. Ein Quellenabgleich allein ist kein unabhängiges Fachreview.
6. Erst dann einen geplanten Pfadschritt als verfügbar markieren und Inhaltsprüfungen, Typprüfung, Build sowie betroffene Browserabläufe ausführen.

Ein freiwilliger Account speichert bearbeitete Fragen, richtige Antworten und gelesene Einstiege in Neon Postgres. Gäste können das Quiz vollständig ohne Anmeldung nutzen. Nach Neuladen, Themenwechsel oder Neustart beginnt der aktuelle Durchlauf neu; der persönliche Lernstand bleibt erhalten und kann über die Checkboxen geändert werden. Siehe [Accounts](ACCOUNTS.md). Die SQL- und PyTorch-Beispiele auf den Themenseiten werden angezeigt, nicht ausgeführt.


## Sprachkurse und Aufgabenübersicht · 27. Oktober 2026

Die Programmiersprachen-Themenseite bietet eine zielbezogene Wahl zwischen sechs Programmiersprachen sowie direkte Links zu Markdown und dem Textsatzportal. Der Kurskatalog gruppiert Karten unter sichtbaren Themenüberschriften; Filter blenden leere Gruppen aus. Kapitel- und Aufgabenkennungen bleiben unverändert.

`practice-catalog.ts` leitet 203 Einträge aus den bestehenden Browser-/Dokumentaufgaben, allen 169 Kapitelaufgaben, sieben Projekten und vier Ablaufaufgaben ab. Keine zweite Kopie der Aufgaben oder Lösungen. Mehrfachzuordnungen von Projekten bleiben erhalten. Arbeitsweise, Thema, Kurs, Stufe, Bearbeitungsstatus und Suchbegriffe lassen sich kombinieren, verlinken, zurücksetzen und mit Browsernavigation wiederherstellen. Java/C/C++/Go/Rust haben Kapitelaufgaben für lokale Entwicklungsumgebungen; es wird keine Browserkompilierung vorgetäuscht. Die ersten 18 Treffer erscheinen mit Nachladebutton und Zielfokus; ohne Skripte sind alle Karten lesbar. Der Client indexiert nur die gerenderten Metadaten statt sämtlicher Kurstexte in sein Skript zu importieren.

Die 24 vollständigen nativen Listings liegen in `language-examples.ts`. Kurse und Compilerregression verwenden exakt dieselben Quellen. Der zusätzliche CI-Job übersetzt Java auf Ziel 21, C17/C++20 mit Warnungen/Sanitizern, Go 1.27.3 und Rust 1.99.1/Edition 2024. Er prüft Ausgaben, CLI-Grenzen/Fehler und ausdrücklich abgewiesene Besitz-/Borrowing-Fälle. Eigener Websitecode und Tests bleiben TypeScript. Der Lernpfad „Vom Rechner zum sicheren Speicherzugriff“ verbindet Hardware und bestehende C/C++-/Rust-Kapitel mit einem überprüfbaren CLI und Zugriffsprotokoll als Ziel.

## Aufgabenstände und neue Projekte · 28. Oktober 2026

Jede Karte erscheint genau einmal unter ihrem ersten Thema und Kurs; sekundäre Zuordnungen bleiben filterbar. Direkte Kapitel-/Aufgabenanker, Kursquizze und geführte Lernwege sind verknüpft. Die kompakte Themenübersicht und Hilfe lassen sich besonders auf Mobilgeräten einklappen. Konto-Quizdaten werden nur für tatsächlich bearbeitete bekannte Fragen ausgewertet; ungelesene oder unversuchte Inhalte gelten nicht als Schwäche. Ein gespeichertes richtiges Ergebnis ist keine vollständige Kompetenzbewertung.

`practice-record.ts` verwaltet gerätegebundene Zustände `open/active/review/complete`, Herkunft `self/model`, begrenzte Versuche und Checklisten unter `it-worlds-practice:v1:`. Lesen allein erledigt keine Aufgabe. Änderungen, Musterlösung laden, Zurücksetzen und Undo invalidieren das alte Modellergebnis. Selbstmarkierungen/Projektchecklisten sind ausdrücklich Selbsteinschätzungen. Speicherfehler bleiben sichtbar und verwenden nur vorübergehenden Arbeitsspeicher. Ohne JavaScript sind Inhalte lesbar und Speicherelemente deaktiviert. Bestehende Entwürfe sowie Konto-, Quiz- und Lesefortschritte bleiben unverändert. **Diese neuen Aufgabenstände werden nicht mit dem Konto synchronisiert.**

Die Sicherung enthält nur bekannte lokale Aufgabenkennungen/-stände, keine Dokumente, Codeentwürfe oder Kontodaten. Import: maximal 512 KiB, 500 Einträge, strikte Version/Status/Datum/Kennungen und begrenzte Schritte; Vorschau vor Bestätigung. Unbekannte Einträge werden übersprungen, neuere/gleiche lokale Stände bleiben erhalten (erneute Prüfung beim Übernehmen). Importierte Abschlüsse zählen immer als Selbsteinschätzung, Projektabschlüsse nur bei vollständig vorhandenen bekannten Checklistenpunkten. Keine Übertragung an externe Dienste.

Vier zusätzliche Projekte sind als eigenständige lokale Downloads vollständig ausführbar: Lernzeitbericht aus validiertem JSON (Einstieg), kanonischer IPv4-Netzplan ohne Netzkonfiguration (Vertiefung), eigene fünfteilige Akkumulator-Befehlssprache mit Schritt-/Zahlenlimits (Vertiefung), begrenztes SHA-256-Dateiinventar ohne Änderungen an geprüften Dateien (Profi). Die 29 Referenzdateien und vier ZIPs werden in der Testsuite einschließlich tatsächlicher CLIs und Fehlercodes geprüft. Begrenzte Dateiaufnahme vermeidet Symlinks und übergroße Eingaben; sie ist kein Sandbox- oder Snapshotversprechen für feindlich gleichzeitig veränderte Dateisysteme. Integritätsprüfung prüft Unterschiede, nicht Authentizität.

Vier Ablaufaufgaben ordnen explizite Schritte dieser Modelle; nicht jede reale Arbeitsweise besitzt eine einzige Reihenfolge. Beim CPU-Projekt steuert die Vorschau ausschließlich einen getesteten festen Trace; beliebiger Nutzerprogrammcode wird auf der Website nicht ausgeführt. Die externe LaTeX-/Typst-Bearbeitung und lokale statische Dokumentprüfung bleiben erhalten.
