# Accounts und Lernfortschritt

Accounts sind freiwillig. Alle Lernseiten, Quellen und Quizfragen bleiben öffentlich. Die persönliche Übersicht liegt unter `/fortschritt/` bzw. `/en/fortschritt/`. Beide Sprachen teilen dieselben Daten.

## Neon-Projekt

- Projekt **IT-Worlds**, Region **AWS Frankfurt (`aws-eu-central-1`)**, Postgres 18.
- `main` dient der öffentlichen Website; `development` isoliert lokale Tests.
- Neon Managed Auth (Better Auth) verwaltet Nutzer, Passwörter und Sessions.
- E-Mail/Passwort-Anmeldung und Registrierung sind aktiviert. Auf ausdrücklichen Wunsch des Betreibers ist **keine E-Mail-Verifizierung** erforderlich. Eine angegebene Adresse ist deshalb kein bestätigter Identitätsnachweis.
- Es gibt keinen eigenen SMTP-Dienst. Passwort-Zurücksetzen verwendet Neons gemeinsamen Maildienst mit dessen Sendelimits. Der tatsächliche E-Mail-Empfang wurde nicht geprüft; Registrierung und Anmeldung hängen nicht vom Mailversand ab.
- Auf `main` ist `https://it-worlds.maki26.workers.dev` als vertrauenswürdige Domain eingetragen; localhost ist dort deaktiviert. Für lokale Tests den Entwicklungsbranch verwenden.

## Einrichtung und Migrationen

Neon-Anmeldung bzw. Konsole verwenden; keine Secrets in Chat oder Git kopieren. Für einen neuen Branch Managed Auth aktivieren und branchspezifische Owner-Verbindungsdaten in einer ignorierten `.env.development` ablegen:

```dotenv
DATABASE_URL=postgresql://OWNER:SECRET@POOLED_HOST/DATABASE_NAME?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://OWNER:SECRET@DIRECT_HOST/DATABASE_NAME?sslmode=require
NEON_AUTH_BASE_URL=https://BRANCH_AUTH_HOST/DATABASE_NAME/auth
IT_WORLDS_SECRETS_FILE=.dev.vars.runtime.json
```

`DATABASE_NAME` branchgenau ersetzen: Produktion/main verwendet seit 29.10.2026 exakt `IT-Worlds`, development weiterhin `neondb`. Auth-URL immer aus der jeweiligen Neon-Integration übernehmen. Beim produktiven Auth-Neuaufbau wurden die alten Accounts ersetzt; eine erneute Registrierung ist erforderlich. Alte Fortschritte werden neuen Benutzerkennungen nicht automatisch zugeordnet.

Dies sind Platzhalter. Die gepoolte URL dient der Laufzeit, die direkte URL Einrichtung und Migrationen. Dateien sollten nur für den eigenen Nutzer lesbar sein.

```bash
node --env-file=.env.development scripts/provision-runtime.ts
node --env-file=.env.development scripts/migrate.ts
```

Die Einrichtung erzeugt `it_worlds_app` mit minimalen Rechten und eine JSON-Datei mit `DATABASE_URL` dieser Rolle, `NEON_AUTH_BASE_URL` und zufälligem `NEON_AUTH_COOKIE_SECRET`. Sie gibt keine Geheimnisse aus. Bei vorhandener Rolle muss deren bestehende Runtime-Datei verwendet werden; Zugangsdaten werden nicht still ersetzt. Runtime-Dateien dem richtigen Branch zuordnen und sicher aufbewahren.

Für Wrangler lokal diese drei Werte als `NAME="WERT"` in `.dev.vars` hinterlegen. Niemals die Owner-Verbindung als Worker-Secret verwenden. Dann `npm run dev:full` starten. `.dev.vars*`, `.env*` und lokale Neon-Metadaten nicht committen.

`scripts/migrate.ts` registriert SHA-256-Prüfsummen in `schema_migrations`. Änderungen an angewendeten Migrationen werden abgewiesen. Neue Änderungen erhalten eine neue SQL-Datei. Erst auf `development` testen, danach bewusst auf `main` anwenden. Neon-Auth-Tabellen bleiben vom Managed-Dienst verwaltet.

## Modell und Berechtigungen

`learning_progress` enthält pro Nutzer, Inhaltsart und Inhaltskennung eine Zeile. `completed` bedeutet gelesen bzw. bearbeitet; `solved` bedeutet mindestens einmal richtig beantwortet. Manuelles Abhaken einer Frage erzeugt keine richtige Quizantwort. Entfernen der Markierung setzt auch `solved` zurück. Quiz-Neustart ändert nur den aktuellen Durchlauf.

158 verfügbare Einstiege/Kurskapitel und 300 Fragen sind speicherbar. Geplante Pfadschritte sind nicht freischaltbar. Der Worker prüft Kennungen, Datentypen und Antwortindex; die Lösung stammt aus den Inhaltsdaten. Nutzer-IDs stammen ausschließlich aus der live validierten Session.

Die Rolle hat SELECT/INSERT/UPDATE/DELETE auf Fortschrittsdaten, keinen Zugriff auf die Auth-Nutzertabelle und kein `BYPASSRLS`. Erzwungene RLS bindet Zeilen an den transaktionslokalen Kontext `app.user_id`. Ohne Kontext sind keine Fortschrittsdaten sichtbar. Der Fremdschlüssel entfernt Fortschrittszeilen bei einer vom Betreiber veranlassten Nutzerlöschung mit.

## Tests und Grenzen

Registrierung, falsches Passwort, erneute Anmeldung, Abmeldung, Wiederherstellung, Sprachwechsel, falsche/richtige Quizantworten und Entfernen von Markierungen prüfen. Zwei Sessions dürfen fremde Daten weder lesen noch schreiben. Die Rolle zusätzlich direkt prüfen: ohne Kontext keine Zeilen, mit Kontext nur eigene, fremde Inserts abgewiesen, Auth-Tabelle gesperrt. Cross-Origin-Mutationen und ungültige Inhaltskennungen müssen scheitern.

Keine Passwörter, E-Mail-Adressen, Cookies oder Verbindungsstrings in Logs und Screenshots aufnehmen. Tests verwenden eigens erzeugte Accounts. Ein echtes Mailzustellungs- und Wiederherstellungsszenario bleibt mit einem kontrollierten Postfach zu prüfen. Löschoberfläche, soziale Anmeldung und Zertifikate gehören nicht zum aktuellen Umfang. Der Schreibtrainer ergänzt ausschließlich freiwillige pseudonyme Ranglistenprofile; Konto-Ergebnisse bleiben privat.

## Tatsächliche Prüfung · 24. Oktober 2026

`tests/live-accounts.ts` prüft zwei echte Testaccounts ausschließlich am bestehenden Entwicklungsbranch und einem lokalen Worker. Beide Accounts besitzen reservierte example.invalid-Adressen, keine Mailverifizierung und unabhängig validierte Sessions. Registrierung, falsches Passwort, Wiederanmeldung, Sitzungswiederherstellung, getrennte Fortschritte, ignorierte fremde Nutzer-ID, falsche/richtige/manuell markierte und zurückgesetzte Antworten, Cross-Origin-/Kennungsablehnung, RLS ohne/mit Kontext, abgewiesener fremder Insert, gesperrte Auth-Tabelle sowie Abmeldung und alte widerrufene Cookies waren erfolgreich. Kein Schema und keine Produktionseinstellung geändert.

Lokal **http://localhost:8788** verwenden: Neons aktivierte localhost-Ausnahme umfasst hier nicht die numerische Adresse 127.0.0.1. Runtime-Werte müssen zur eingeschränkten development-Rolle gehören. Mit `wrangler dev --local --env-file PRIVATE_RUNTIME_ENV --port 8788` starten. Danach `IT_WORLDS_TEST_BRANCH=development`, `IT_WORLDS_TEST_BASE_URL=http://localhost:8788` und `IT_WORLDS_TEST_CREDENTIALS` auf eine private lokale Datei setzen und `node --env-file=PRIVATE_RUNTIME_ENV --experimental-strip-types tests/live-accounts.ts` ausführen. Das Programm verweigert andere Hosts/Branches, erzeugt beim ersten Lauf zwei eigene Testaccounts und verwendet ihre private Datei danach erneut. Keine Testnutzer werden ungefragt gelöscht; die zwei Accounts bleiben ausschließlich im Entwicklungsbranch. Der Test läuft bewusst separat von `npm test`.

Der Browser prüfte zusätzlich die tatsächliche Anmeldung, gespeicherte Zähler, den Wiederholungslink aus der Übersicht, die stabile laufende Runde trotz gespeicherter richtiger Antwort, Wiederholen derselben Runde und die leere Auswahl einer neuen Runde. Persönliche Quizfilter verwenden den gespeicherten Stand beim Start: offen, bearbeitet/noch nicht richtig oder richtig. Ein einmal richtig gelöster Zustand bleibt bis zum Entfernen der Markierung erhalten. Eine manuelle Markierung ist kein Nachweis einer richtigen Antwort. Mailzustellung und echter Passwort-Reset per kontrolliertem Postfach bleiben separat offen.
