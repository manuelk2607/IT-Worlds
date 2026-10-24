# Website-Aufbau

Der erste Rahmen macht die breite Themenlandkarte benutzbar. Das Ziel ist Wissen für Anfänger bis Profis; umfassende Abdeckung entsteht durch weitere Inhalte und Fachreviews, nicht allein durch diese Seitenstruktur.

## Seiten und Navigation

| Seite                | Inhalt                                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `/`                  | Einstieg, zehn durchsuchbare Themenwelten, Gruppenfilter, Lernpfade, Quellenanspruch, Quiz-Einstieg       |
| `/themen/[slug]/`    | Beschreibung, Voraussetzungen, drei Lernstufen, gegebenenfalls erster Artikel, passende Quellen           |
| `/lernpfade/`        | Dreizehn verfügbare Kursfolgen mit Themen-/Titelfilter und drei vollständig verfügbare Querverbindungspfade                                                            |
| `/lernpfade/[slug]/` | Voraussetzungen, Schritte, tatsächliche Verfügbarkeit und Verknüpfung zur Themenwelt                      |
| `/uebungen/` | Zehn Editor-Aufgaben mit lokalem Prüfer, Hinweisen und Musterlösungen |
| `/quiz/`             | 254 Fragen, Themen-, Kurs-, Kapitel- und Stufenwahl, Erklärung zu jeder Antwort, Beleg, Runden mit 5/10/20/allen Fragen, reproduzierbares Mischen und gezielte Wiederholung                      |
| `/quellen/`          | 200 Originalquellen mit Herausgeber, Version, Abschnitt, Lesedatum und gelesenem Dokumentationsquelltext |

Die globale Suche lädt ihren sprachspezifischen JSON-Index erst beim Öffnen und durchsucht Themen, Kurse, alle 122 Kapiteltexte, Lernpfade und Übungen. Mehrere Wörter werden kombiniert; Titel sind höher gewichtet. Ein Inhaltstypfilter sowie Pfeiltasten, Enter und Escape unterstützen die Bedienung. /lernen/ bietet Orientierung; /lernpfade/ bietet verfügbare Kurse und durchgehende Querverbindungspfade.

Die Seiten stehen zusätzlich unter `/en/` vollständig auf Englisch bereit. Der Sprachschalter erhält die entsprechende Seite, Suchparameter und Sprungmarken. Jede Themenwelt enthält unter `#uebungseditor` eine passende Aufgabe. Eingaben werden lokal in einem begrenzten Lernmodell geprüft; der Quiz-/Lesefortschritt wird dadurch nicht automatisch geändert.

Das helle oder dunkle Design lässt sich im Kopfbereich umstellen und bleibt im Browser gespeichert.

`/konto/` bietet Registrierung, Anmeldung und Passwort-Zurücksetzen; `/fortschritt/` zeigt freiwillig gespeicherten Lernfortschritt. Die englischen Varianten liegen ebenfalls unter `/en/`. Alle Seiten und Lerninhalte bleiben für Gäste erreichbar.

## Themenlandkarte

Die Hauptnavigation wird von `src/scripts/navigation.ts` gesteuert. Auf der Startseite teilen sich „Entdecken“ und „Themenwelten“ einen aktiven Zustand für Desktop, Mobilmenü und `aria-current`. Klicks starten Scrollen und Unterstrich mit gleicher Dauer und Beschleunigung; ein weiterer Klick ersetzt die laufende Animation. Manuelles Scrollen aktualisiert die Markierung, Rad-/Touch-/Tastatureingaben unterbrechen den automatischen Übergang. Hash-Links, Zurück/Vorwärts, Sprachwechsel und die Systemeinstellung für reduzierte Bewegung werden berücksichtigt. Scrollziele verwenden denselben Abstand wie native Ankerlinks, auch bei kleinerem Mobilheader.

Die fünf gewünschten Kernbereiche sind **Programmiersprachen**, **Datenbanken**, **Website bauen**, **KI und neuronale Netze** sowie **APIs und Schnittstellen**. Als ergänzende Grundlagen sind **IT-Grundlagen**, **Internet und Netzwerke**, **IT-Sicherheit**, **Cloud und DevOps** sowie **Betriebssysteme und Linux** angelegt. Git, Testing, Algorithmen, Softwarearchitektur, Datenschutz und Barrierefreiheit sind als Querschnittsthemen eingebunden.

Unter **Programmiersprachen → Auszeichnungs- & Satzsprachen** stehen außerdem LaTeX, Typst und Markdown. LaTeX wird als System zur Dokumentaufbereitung und zum Textsatz eingeordnet; Typst verbindet Markup, Textsatz und Scripting, Markdown strukturiert Dokumente in Klartext. LaTeX besitzt 13 verfügbare Kapitel zu Einrichtung, Text- und Formelsatz, Tabellen, Grafiken, Literatur und komplexen Dokumenten. Eine zusätzliche Themenwelt ist dafür nicht nötig.

Die Web-Lernwege verwenden TypeScript. JavaScript wird dort nur bei Bedarf als zugrunde liegende Browser-Laufzeit oder zum Vergleich erklärt. Astro baut die Website; TypeScript bleibt die Sprache für Anwendungslogik, Tests, Hilfsskripte und Konfiguration.

| Stufe      | Ziel                                                        | Beispiele                                                      |
| ---------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| Einstieg   | Begriffe verstehen und erste einfache Aufgaben lösen        | HTML-Elemente, SQL-SELECT, Variablen                           |
| Vertiefung | Inhalte verbinden und eigenständig umsetzen                 | API-Clients, Datenmodellierung, Tests, Training und Evaluation |
| Profi      | Architektur und Grenzen anhand von Anforderungen beurteilen | Konsistenz, Performance, Sicherheitsarchitektur, MLOps         |

Lernstufe und Vorwissen werden getrennt angegeben. Beispielsweise ist das vorhandene PyTorch-Strukturbeispiel ein Einstieg in das Framework, setzt aber Python-Klassen voraus.

## Verfügbare und geplante Inhalte

Verfügbar sind zehn Einstiege und 122 Kurskapitel: Grundlagen 7, Betriebssystemkonzepte 6, Linux 6, Netzwerke 8, Sicherheit 7, TypeScript 8, Python 8, Markdown 6, Typst 8, Web 8, SQL 8, APIs 7, Cloud/DevOps 8, KI 14 und LaTeX 13. Insgesamt 254 Fragen und 200 Quellen. Fortschritt zählt 132 lesbare Inhalte und 254 Fragen mit stabilen IDs. Kursgruppen, Ansicht-/Themenfilter und der nächste offene Schritt verbessern die Übersicht. Alle zehn Themenwelten besitzen nun mindestens eine vollständig verfügbare Kursfolge. Drei Querverbindungspfade nutzen 13, 14 und 10 vorhandene Kapitel mit identischen Fortschrittskennungen.

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
