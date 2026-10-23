# Zu IT-Worlds beitragen

IT-Worlds besitzt einen ersten Website-Rahmen; die meisten Lerninhalte befinden sich noch in der Konzeptphase. Hilfreich sind insbesondere belegte Inhalte, fachliche Korrekturen und verständliche Lernaufgaben. Der aktuelle Umfang steht im [Website-Aufbau](docs/WEBSITE-AUFBAU.md).

## Ideen und Korrekturen

Bitte zuerst die [vorhandenen Issues](https://github.com/manuelk2607/IT-Worlds/issues) und die [Planungsdokumente](README.md#architektur-und-dokumentation) ansehen. Für neue Beiträge stehen [Issue-Formulare](https://github.com/manuelk2607/IT-Worlds/issues/new/choose) bereit.

- Ein Inhaltsvorschlag nennt die Frage der Zielgruppe, ein Lernziel und geeignete Quellen.
- Eine Spielidee erklärt, welches Wissen sie prüft und wie die Rückmeldung beim Lernen hilft.
- Eine Korrektur verlinkt die betroffene Stelle und begründet die Verbesserung, möglichst mit einer verlässlichen Quelle.

Ideen sind Vorschläge für die Planung. Ein Issue ist noch keine Zusage, dass die Funktion umgesetzt wird.

## Änderungen im Repository

Projektcode, Tests, Hilfsskripte und unterstützte Konfigurationsdateien in TypeScript schreiben; das gilt auch für neue Web-Lernbeispiele. JavaScript kann als Laufzeit oder zum Vergleich erklärt werden. Andere Lernsprachen wie Python, SQL und LaTeX bleiben erhalten. Weitere Vorgaben stehen in [AGENTS.md](AGENTS.md).

1. Einen eigenen Branch für eine zusammenhängende Änderung verwenden.
2. Lerntexte und sichtbare UI auf Deutsch und Englisch pflegen; Fachbegriffe erklären und Quellen verlinken. Stabile IDs und Quellenmetadaten beibehalten.
3. Relative Links innerhalb des Repositorys verwenden und verknüpfte Dokumente konsistent halten.
4. Bei fachlichen Aussagen Ursprung, Aktualität und Grenzen prüfen.
5. Im Pull Request Zweck, Umfang und erfolgte Prüfungen beschreiben.

Für Änderungen an Website oder Inhaltsdaten bitte `npm test`, `npm run check` und `npm run build` ausführen. Suche, Filter und Quiz bei betroffenen Änderungen zusätzlich im Browser prüfen. Für reine Dokumentationsänderungen reichen die Prüfung der Markdown-Darstellung, interner Links und gegebenenfalls YAML-Vorlagen. Keine Abhängigkeiten nur für eine Textänderung ergänzen.

Themen, Artikel, Quizfragen und Quellen liegen in `src/data/content.ts`; Übersetzungen in `src/data/content.en.ts`. Neue Fachbehauptungen und Fragen benötigen eine konkrete, tatsächlich gelesene Primärquelle mit Version, Abschnitt und Lesedatum. Alle Antwortmöglichkeiten brauchen eine Erklärung. Quellenabgleich und unabhängiges Fachreview sind unterschiedliche Schritte; geplante Inhalte dürfen nicht als fertig erscheinen.

Accounts sind freiwillig; Gäste behalten Zugriff auf alle Inhalte. Für persönliche Daten nur serverseitig validierte Sessions, die eingeschränkte Neon-Rolle und erzwungene RLS verwenden. Neue Migrationen zuerst auf development testen. Secrets nicht committen oder protokollieren. Bei Account-Änderungen zwei getrennte Sessions, fremde Datenzugriffe und Wiederherstellung prüfen; bei UI-Änderungen beide Sprachen, Designs und Mobilansicht testen. Siehe [Accounts](docs/ACCOUNTS.md).

## Schreiben und Lernaufgaben gestalten

- Eine konkrete Frage pro Artikel beantworten und das nötige Vorwissen nennen.
- Beispiele, Aussagen und Entwürfe klar unterscheiden.
- Quellen in eigenen Worten zusammenfassen; Rechte an Bildern und übernommenen Texten beachten.
- Bei Quizfragen eine eindeutige Lösung und hilfreiche Erklärungen für alle Optionen vorsehen.
- Übungen ohne unnötigen Zeitdruck und mit Tastaturalternative planen.
- Hinweise zu Simulationen und vereinfachten Abläufen ausdrücklich nennen.

## Rechte und Umgang miteinander

Eine Projektlizenz ist noch nicht ausgewählt. Vor größeren externen Text-, Bild- oder Codebeiträgen wird das Lizenzmodell geklärt; Beiträge sollen keine pauschale Rechteübertragung voraussetzen. Für kleine Vorschläge und Korrekturen bitte nur eigene Formulierungen und zulässige Quellenangaben verwenden.

Sachlich und respektvoll zusammenarbeiten, Kritik konkret begründen und keine privaten Daten oder Zugangsdaten in Issues oder Pull Requests einstellen.

## Kurskapitel

Neue Kursinhalte in den typisierten zweisprachigen Daten unter `src/data/course-*.ts` pflegen. Kapitel- und Frage-IDs nach Veröffentlichung stabil halten. Lernziele, Voraussetzungen, Aufgabe mit Lösung, Quellen und Erklärungen jeder Quizoption ergänzen. Ausführbare Beispiele separat mit der angegebenen Umgebung prüfen und nicht ausgeführte Teile ausdrücklich dokumentieren. Struktur und Prüfverfahren: [KURSE.md](docs/KURSE.md).
