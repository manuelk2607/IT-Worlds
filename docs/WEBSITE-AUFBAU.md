# Website-Aufbau

Der erste Rahmen macht die breite Themenlandkarte benutzbar. Das Ziel ist Wissen für Anfänger bis Profis; umfassende Abdeckung entsteht durch weitere Inhalte und Fachreviews, nicht allein durch diese Seitenstruktur.

## Seiten und Navigation

| Seite                | Inhalt                                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `/`                  | Einstieg, 14 Themenkacheln, Gruppenfilter, Lernpfade, Quellenanspruch, Quiz-Einstieg       |
| `/themen/[slug]/`    | Beschreibung, Voraussetzungen, drei Lernstufen, gegebenenfalls erster Artikel, passende Quellen           |
| `/lernpfade/`        | 18 verfügbare Kursfolgen mit Themen-/Titelfilter und drei vollständig verfügbare Querverbindungspfade                                                            |
| `/lernpfade/[slug]/` | Voraussetzungen, Schritte, tatsächliche Verfügbarkeit und Verknüpfung zur Themenwelt                      |
| `/uebungen/` | Zehn Editor-Aufgaben mit lokalem Prüfer, Hinweisen und Musterlösungen |
| `/projekte/{kurskatalog,lernbericht,auslieferung}/` | Drei vollständige Praxisprojekte mit DE/EN-Anleitung, Abnahme, getesteten Referenzdateien und ZIP-Download |
| `/glossar/` | 15 zweisprachige Begriffe mit Suche, Themenfilter, Primärbeleg und Kurs-/Projektverknüpfung |
| `/schreibtrainer/` | Zwölf gestufte QWERTZ-Lektionen plus adaptive/eigene Texte, Textfortschritt, lokale Historie, optionale Konto-Ergebnisse und Rangliste |
| `/dokumentpruefung/` | Sicherer lokaler Quellen-/ZIP-Import für LaTeX/Typst, statische Diagnostik und 31 Selbstprüfprofile mit bewusster Kapitelmarkierung |
| `/quiz/`             | 300 Fragen, Themen-, Kurs-, Kapitel- und Stufenwahl, Erklärung zu jeder Antwort, Beleg, Runden mit 5/10/20/allen Fragen, reproduzierbares Mischen und gezielte Wiederholung                      |
| `/quellen/`          | 239 Originalquellen mit Herausgeber, Version, Abschnitt, Lesedatum und gelesenem Dokumentationsquelltext |

Die globale Suche lädt ihren sprachspezifischen JSON-Index erst beim Öffnen und durchsucht Themen, Kurse, alle 145 Kapiteltexte einschließlich Lernzielen, Lernpfade, Übungen/Projekte, Quellen und Glossarbegriffe. Mehrere Wörter werden kombiniert; Titel sind höher gewichtet. Ein Inhaltstypfilter sowie Pfeiltasten, Enter und Escape unterstützen die Bedienung. /lernen/ bietet Orientierung; /lernpfade/ bietet verfügbare Kurse und durchgehende Querverbindungspfade. Glossarfilter bleiben in der URL und beim Sprachwechsel erhalten; die vollständigen Begriffe sind auch ohne Skripte lesbar.

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

Verfügbar sind zehn Einstiege und 145 Kurskapitel: Hardware 6, Tastschreiben 3, Spieleentwicklung 5, Grundlagen 7, Betriebssystemkonzepte 6, Linux 6, Netzwerke 8, Sicherheit 7, TypeScript 8, Python 8, Markdown 6, Typst 16, Web 8, SQL 8, APIs 7, Cloud/DevOps 8, KI 14 und LaTeX 14. Insgesamt 300 Fragen und 239 Quellen. Fortschritt zählt 155 lesbare Inhalte und 300 Fragen mit stabilen IDs. Kursgruppen, Ansicht-/Themenfilter und der nächste offene Schritt verbessern die Übersicht. Alle Themenbereiche besitzen eine verfügbare Kursfolge. Drei Querverbindungspfade nutzen 13, 14 und 10 vorhandene Kapitel mit identischen Fortschrittskennungen. Die zusätzlichen Projekte werden mit den zugehörigen Kursen verlinkt; sie erzeugen keine neuen Fortschritts-IDs und verändern keine gespeicherten Daten.

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
