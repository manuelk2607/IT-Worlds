# Lernbeispiele praktisch prüfen

Die Prüfungen lesen die veröffentlichten Listings direkt aus den Kursdaten. Erfolgreiche Ausführung belegt die konkrete Aufgabe und ihre erwarteten Ergebnisse, keine vollständige Fachgebietsabdeckung oder unabhängige Begutachtung.

| Bereich | Tatsächliche Prüfung |
| --- | --- |
| TypeScript | Sämtliche Kurslistings mit striktem Compiler; weitere Ausführungs-/Grenztests der Modelle |
| Python | Python 3.12+, eigenständige Programme, JSON-Eingaben, Grenzen, Fehler und unveränderte Eingabedateien |
| Markdown | Astro-Renderer, Überschriften, Code, Links, Alt-Text, Tabelle und Aufgabenlisten; enthaltenes TypeScript strikt und ausführbar |
| Typst | Acht Dokumente mit CLI 0.15.1, echter BibLaTeX-Datei, Rechenwerten und geänderten Daten; falscher Literaturverweis muss scheitern |
| PostgreSQL | Acht Listings in frischen Sitzungen auf PostgreSQL 18; Ergebnisse, NULL, Constraints, Parameter, Rollback, Migration/Default und zwei konkurrierende Platzvergaben |
| Linux/Bash | Syntax aller sechs Listings; fünf echte isolierte Versuche mit Argumentgrenzen, Modus 640, Pipe-Ausgabe, eigenem Hintergrundprozess und wiederhergestellten Bytes; beschädigtes Backup muss scheitern |
| Container | Tatsächlicher veröffentlichter Dockerlauf im separaten Linux-CI-Job |

Das systemd-Listing wird syntaktisch geprüft. Seine Ausgabe benötigt einen laufenden Benutzer-systemd und zugängliche Journale auf einem echten Linux-System; dafür wird kein simulierter Diensterfolg behauptet. LaTeX erhält in diesem Paket keine neue Compilerprüfung. Reale assistive Technologie und Feldmessungen bleiben gesonderte Aufgaben.

## Lokal

`npm test`, `npm run check` und `npm run build` verwenden. Python ab 3.12 muss verfügbar sein. `IT_WORLDS_PYTHON` kann seinen Pfad setzen. Mit `IT_WORLDS_TYPST` lässt sich das offizielle Typst-0.15.1-CLI angeben; ohne Installation wird dessen Fall sichtbar übersprungen. Das offizielle Linux-Archiv und sein SHA-256 sind im CI-Workflow festgelegt; lokal wurde das macOS-ARM-Archiv gegen den offiziellen Digest geprüft.

SQL-Prüfung ausschließlich auf einer eigenen lokalen Testdatenbank aktivieren: `IT_WORLDS_SQL_TEST=1`, `PGDATABASE=it_worlds_examples_test`, `PGUSER=it_worlds_test`, explizite `PGHOST`/`PGPORT`; optional `IT_WORLDS_PSQL` für den Clientpfad. Host muss localhost/127.0.0.1 oder der private, neu angelegte Testsocket sein. Der Test verweigert andere Ziele. Acht Listings verwenden temporäre Tabellen; der Paralleltest erzeugt eine eindeutig benannte eigene Tabelle und entfernt genau diese anschließend. Keine Produktions- oder Neon-Zugangsdaten verwenden.

CI prüft Node 22.22/24, die Typst-Dokumente, Bash-Listings auf Linux sowie im eigenen PostgreSQL-Job die drei SQL-Fälle gegen ein mit Digest festgelegtes PostgreSQL-18-Image. Der normale Node-Job überspringt SQL bewusst, wenn keine Testdatenbank konfiguriert ist. Ein übersprungener Fall ist kein Ausführungsnachweis.

Zwei echte Neon-Accounts einschließlich Sessions, Fortschritt, RLS und Widerruf prüft der ausdrücklich gestartete Entwicklungstest in [ACCOUNTS.md](ACCOUNTS.md). Zugangsdaten, Mailadressen und Cookies werden nicht protokolliert.
