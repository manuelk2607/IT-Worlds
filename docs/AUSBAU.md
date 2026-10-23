# Inhaltsausbau und Prioritäten

Analyse vom 23. Oktober 2026: Vor dieser Erweiterung besaßen alle neun Themenwelten außerhalb KI je einen Einstiegsartikel, eine Frage und einen begrenzten lokalen Übungseditor. LaTeX ist ein Unterbereich der Programmiersprachen und wurde ebenso wie KI bewusst nicht erweitert. Die Themenpläne zeigten für die anderen Bereiche noch keine durchgehenden Lektionen.

## Abgeschlossene Erweiterung

Datenbanken und APIs wurden wegen ihres gemeinsamen Praxisnutzens priorisiert: Ein Kurskatalog verbindet Modellierung, SQL und Konsistenz mit HTTP-Vertrag, TypeScript-Client und Objektberechtigungen. Acht beziehungsweise sieben vollständige Kapitel enthalten Lernziele, Voraussetzungen, Erklärungen, eigenständige Beispiele, Aufgaben mit Lösungen und je zwei begründete Quizfragen auf drei Stufen. Die Kapitel sind in die vorhandene Suche, Quellen, Lernpfade, Themenpläne, Sitemap und den freiwilligen Lernstand integriert. Die beiden Abschlussprojekte verlinken den jeweils ergänzenden Kurs.

Abgeschlossen ist dieser definierte Kursumfang. Datenbanken als Gesamtgebiet (etwa Replikation, verteilte Konsistenz, NoSQL) und APIs als Gesamtgebiet (etwa OAuth-Protokollimplementierung, Webhooks, GraphQL) sind damit nicht vollständig abgedeckt. Ein unabhängiges Fachreview steht aus.

## Verbleibende Bereiche

| Priorität | Bereich / aktueller Stand | Nächstes zusammenhängendes Arbeitspaket | Abhängigkeit und Aufwand |
| --- | --- | --- | --- |
| 1 | Programmiersprachen: Python-Einstieg, Editor, LaTeX-Kurs | TypeScript-Grundlagen, Funktionen, Datenstrukturen, Fehler und Tests; danach Python-Pfad | Grundlage für weitere Webpraxis; mittel |
| 2 | Website bauen: HTML-Einstieg und Editor | Semantisches HTML, CSS/Layout, Formulare, DOM mit TypeScript, Barrierefreiheit, Performance und Deployment | TypeScript-Basis; hoch |
| 3 | IT-Sicherheit: MFA-Einstieg und Editor | Bedrohungsmodell, Authentifizierung/Autorisierung, Injection, XSS/CSRF, Secrets und sichere Änderungen | Neue SQL-/API-Kurse vorhanden; hoch, Review nötig |
| 4 | IT-Grundlagen: UTF-8-Einstieg und Editor | Binärdarstellung, Dateien/Prozesse, Algorithmen, Git, Debugging und Tests | Einstieg ohne Zusatzwissen; mittel |
| 5 | Betriebssysteme/Linux: Rechte-Einstieg und Editor | Dateisystem, Shell/Pipes, Prozesse, Dienste, Benutzer, Logs und Wiederherstellung | Isolierte Übungsumgebung; mittel |
| 6 | Netzwerke: DNS-Einstieg und Editor | IP/Ports, Routing, TCP/UDP, DNS-Diagnose, TLS und systematische Fehlersuche | Grundlagen; hoch |
| 7 | Cloud/DevOps: Container-Einstieg und Editor | Reproduzierbare Builds, Images, CI/CD, Konfiguration, Observability, Rollback | Linux und Tests; hoch |
| Ergänzung | Datenbanken: 8 Kurskapitel | Rechte/RLS, Sperrdiagnose, Replikation, NoSQL und Restore-Übungen für Lernende | SQL-Kurs; mittel bis hoch |
| Ergänzung | APIs: 7 Kurskapitel | Echter Fetch-Lebenszyklus, Pagination, Rate-Limits, Webhooks und OAuth | TypeScript und Sicherheitsgrundlagen; mittel bis hoch |

Die drei früheren Lernpfad-Skizzen bleiben als solche gekennzeichnet: Die neuen Kurse ersetzen noch keinen vollständigen Website- oder Systemarchitekturpfad. Die zehn vorhandenen Editoren prüfen begrenzte Lernmodelle; sie sind keine neuen SQL-/TypeScript-Laufzeitumgebungen. Praxiscode wird in einer eigenen lokalen Umgebung ausgeführt.

## Funktionslücken und Abnahme

Vorhandene Komponenten tragen neue Kurse ohne separate Seitenkopien. Die zuvor auf zwei Kurs-IDs und KI begrenzte Integration wurde für weitere Kurse geöffnet; neue Themenpläne verlinken tatsächliche Kapitel statt geplanter Stichworte. Verbleibend: zugängliche Ausführungsumgebungen für größere Übungen, Lernendentests der Aufgaben, unabhängige fachliche Begutachtung und die drei älteren Lernpfad-Skizzen. Jeder weitere Kurs muss Quellenlektüre, Übersetzungen, ausführbare Beispiele, Erklärungen jeder Antwort und Browserprüfung vollständig mitbringen.
