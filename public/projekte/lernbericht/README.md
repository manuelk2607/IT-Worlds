# SQL learning report / SQL-Lernbericht

PostgreSQL 18 and psql. Create a separate empty database named `it_worlds_examples_test` for practice; never use a production database. Set your usual PGHOST, PGPORT, PGUSER and PGDATABASE connection variables, keeping passwords out of files and command arguments.

PostgreSQL 18 und psql. Verwende eine eigene leere Übungsdatenbank `it_worlds_examples_test`, keine Produktionsdatenbank. Setze die üblichen Verbindungsvariablen PGHOST, PGPORT, PGUSER und PGDATABASE. Keine Passwörter in Dateien oder Befehlsargumenten ablegen.

```sh
psql -X -v ON_ERROR_STOP=1 -f lab.sql
psql -X -v ON_ERROR_STOP=1 -f test.sql
```

The project uses only temporary tables/views inside an explicit transaction, ending in ROLLBACK. Insertion errors in test.sql are deliberately caught in subtransactions. An unexpected error stops psql and closes the connection, rolling back the open transaction. No existing tables or migrations are modified. Do not remove the BEGIN/database guard/ROLLBACK while experimenting.

Das Projekt nutzt nur temporäre Tabellen/Views in einer expliziten Transaktion mit abschließendem ROLLBACK. Erwartete Fehler in test.sql werden in Untertransaktionen abgefangen. Ein unerwarteter Fehler beendet psql; das Schließen der Verbindung verwirft die offene Transaktion. Bestehende Tabellen und Migrationen bleiben unberührt. Entferne beim Experimentieren nicht BEGIN, Datenbankprüfung oder ROLLBACK.

Baseline summary / Ausgangsauswertung:

| Course / Kurs | Enrolled / Anmeldungen | Completed / Abschlüsse | Completion % / Abschlussquote | Average / Mittelwert |
| --- | --- | --- | --- | --- |
| SQL | 2 | 1 | 50.0 | 90.0 |
| HTTP | 2 | 2 | 100.0 | 80.0 |
| Linux | 0 | 0 | NULL | NULL |

Draft is unpublished and absent. Two HTTP results with score 80 share rank 1. Completing Lin's SQL enrolment makes SQL 100% complete, average 82.5. Rolling back to the savepoint restores the original 50% / 90.0.

Draft ist unveröffentlicht und fehlt. Die beiden HTTP-Ergebnisse mit 80 Punkten teilen Rang 1. Lins SQL-Abschluss erhöht die SQL-Quote auf 100% bei Mittelwert 82,5. Die Rückkehr zum Savepoint stellt 50% / 90,0 wieder her.

Tasks: explain why COUNT(e.learner_id) is used rather than COUNT(*); explain NULL rather than 0 for the empty course; predict the result if the completion filter moves into WHERE; add a fourth published course without enrolments and preserve every test; test a failed foreign key and a duplicate enrolment.

Aufgaben: Begründe COUNT(e.learner_id) statt COUNT(*), NULL statt 0 beim leeren Kurs und die Wirkung eines Abschlussfilters in WHERE. Ergänze einen vierten veröffentlichten Kurs ohne Anmeldungen und passe die erwartete Kurszahl an, ohne die NULL-Tests zu entfernen. Prüfe fehlende Fremdschlüsselziele und doppelte Anmeldungen.

Complete reference: schema.sql and queries.sql. Full negative assertions: test.sql. Learning guide: https://it-worlds.maki26.workers.dev/projekte/lernbericht/
