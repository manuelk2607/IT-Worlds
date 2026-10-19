# IT-Worlds

**IT verstehen. Zusammenhänge entdecken. Wissen spielerisch testen.**

IT-Worlds soll eine deutschsprachige Wissens- und Lernplattform für die IT-Welt werden. Verständliche Artikel, kuratierte Quellen, Lernpfade, Quizzes und kleine Spiele sollen zusammenführen, was sonst über viele Websites verteilt ist.

> **Status: Konzept und Repository-Aufbau.** Dieses Repository enthält die Projektplanung und Vorlagen für Beiträge. Eine Website, ausführbare Spiele oder eine technische Projektstruktur sind noch nicht implementiert. Alle beschriebenen Funktionen und Technikentscheidungen sind Vorschläge.

## Die Idee

Jede Themenwelt verbindet drei Zugänge:

- **Verstehen:** kurze Erklärungen, anschauliche Beispiele, ein Glossar und weiterführende Quellen.
- **Verbinden:** Lernpfade zeigen Voraussetzungen und Zusammenhänge zwischen Themen.
- **Anwenden:** Quizzes mit begründeten Antworten und kleine Spiele machen Wissen überprüfbar.

Ein möglicher Lernweg: „Wie kommt eine Website in meinen Browser?“ → Artikel zu Client und Server, IP, DNS und HTTPS → kurze Verständnisfragen → ein Spiel, in dem die Stationen einer Webanfrage geordnet werden.

## Mögliche Themenwelten

| Themenwelt | Beispiele |
| --- | --- |
| IT-Grundlagen | Bits und Bytes, Hardware, Software, Datenformate |
| Internet und Netzwerke | IP, DNS, HTTP, Routing, WLAN |
| Programmierung | Algorithmen, Programmiersprachen, Debugging, Git |
| Webentwicklung | HTML, CSS, JavaScript, APIs, Barrierefreiheit |
| Betriebssysteme und Administration | Linux, Windows, Prozesse, Rechte, Kommandozeile |
| IT-Sicherheit und Datenschutz | Phishing, Authentifizierung, Verschlüsselung, Datensparsamkeit |
| Datenbanken und Daten | Datenmodelle, SQL, Backups, Datenqualität |
| Cloud und DevOps | Hosting, Container, CI/CD, Monitoring |
| KI und maschinelles Lernen | Modelle, Training, Grenzen, verantwortlicher Einsatz |
| IT im Alltag und Beruf | Fehlersuche, digitale Kompetenzen, Berufsbilder |

Die breite Themenlandkarte ist das langfristige Ziel. Für die erste Version empfiehlt sich ein zusammenhängender Lernpfad mit sechs Artikeln, 24 geprüften Quizfragen und einem kleinen Lernspiel; siehe [Roadmap](docs/ROADMAP.md).

## Ideen für Quizzes und Spiele

- **Wissensquiz:** eine Frage beantworten und direkt erfahren, warum eine Antwort passt.
- **Paketreise:** die Stationen einer Webanfrage in eine sinnvolle Reihenfolge bringen.
- **Binärlabor:** Zahlen zwischen Dezimal- und Binärdarstellung übersetzen.
- **Phishing-Detektiv:** Hinweise in fiktiven Nachrichten erkennen und begründen.
- **Debugging-Mission:** einen kleinen Fehler finden und die Wirkung der Korrektur erklären.
- **SQL-Werkstatt:** später Abfragen an einem vorbereiteten Übungsdatensatz lösen.

Lernen steht im Vordergrund: Wiederholungen und Hinweise statt Punktabzug; Zeitdruck und öffentliche Ranglisten gehören nicht zum vorgeschlagenen Einstieg. Weitere Ideen und Prioritäten stehen im [Lernspielkonzept](docs/LERNSPIELE.md).

## Planung im Repository

| Dokument | Inhalt |
| --- | --- |
| [Produktkonzept](docs/KONZEPT.md) | Zielgruppen, Nutzerwege, Navigation und Gestaltungsideen |
| [Inhaltskonzept](docs/INHALTE.md) | Themenstruktur, Artikelaufbau, Quellen und Qualität |
| [Quizzes und Lernspiele](docs/LERNSPIELE.md) | Spielideen, Lernziele, Rückmeldungen und Bewertung |
| [Technische Ansätze](docs/TECHNIK.md) | Vergleich möglicher Architekturen und eine vorläufige Empfehlung |
| [Roadmap](docs/ROADMAP.md) | Kleine erste Version, Ausbaustufen und offene Entscheidungen |
| [GitHub-Einrichtung](docs/GITHUB-SETUP.md) | Beschreibung, Topics und weiterer Repository-Aufbau |
| [Mitwirken](CONTRIBUTING.md) | Ideen, Inhalte und Korrekturen beitragen |

## Technische Richtung

Ein Ansatz mit statisch erzeugten Artikeln und gezielt eingebauten interaktiven Komponenten erscheint für den Einstieg passend, beispielsweise Astro mit Markdown/MDX und TypeScript. Eine stärker anwendungsorientierte Lösung mit Next.js oder ein dokumentationsorientierter Aufbau mit Docusaurus sind Alternativen. Die [Gegenüberstellung](docs/TECHNIK.md) erläutert die Abwägung; ein Framework ist noch nicht festgelegt.

Für die erste Version wären weder ein Konto noch eine Datenbank nötig. Damit können Inhalte und Lernmechanik zuerst erprobt werden. Konten, synchronisierter Lernfortschritt, ein CMS oder Community-Funktionen wären spätere Erweiterungen.

## Mitwirken und Projektstatus

Ideen, Quellenhinweise und fachliche Korrekturen sind willkommen. Dafür stehen [Issue-Vorlagen](https://github.com/manuelk2607/IT-Worlds/issues/new/choose) bereit. Bitte vor einem Beitrag die [Hinweise zur Mitarbeit](CONTRIBUTING.md) lesen.

Der Projektname lautet **IT-Worlds**; das Repository liegt unter [manuelk2607/IT-Worlds](https://github.com/manuelk2607/IT-Worlds).

**Lizenz:** Noch nicht festgelegt. Die Lizenzierung von künftigem Programmcode, eigenen Lerninhalten und Materialien Dritter wird vor deren Veröffentlichung geklärt. Der öffentliche Repository-Status allein vergibt keine allgemeine Nutzungslizenz.
