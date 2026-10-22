# Validierung und Veröffentlichung

Prüfstand: **22. Oktober 2026**, Europe/Stockholm.

## Umfang

- Fünf neue Einstiege: UTF-8 und Byteanzahl, DNS-Rollen und TTL, MFA-Faktoren, Docker-Images/Container sowie einfache Linux-Dateirechte. Insgesamt zehn Einstiege und zehn Quizfragen für alle zehn Themenwelten.
- Zehn editierbare Aufgaben mit lokaler Modellprüfung, Hinweisen, Musterlösung, Ausgabe und Reset. Alle Inhalte und Bedienoberflächen auf Deutsch und Englisch, ohne Anmeldung nutzbar.
- 19 offizielle Quellen. Fünf Quellen neu gelesen und Docker erneut abgeglichen; Versionen, Abschnitte, Lesedatum, feste Beleg-URLs und SHA-256 stehen in [QUELLEN.md](QUELLEN.md). Neue Texte und Übungsdaten sind eigene Formulierungen.
- Sitemap für 36 öffentliche Sprachseiten, robots.txt, Canonicals, hreflang/x-default, Titel/Beschreibungen, JSON-LD, zwei PNG-Vorschaubilder und permanente HTTPS-Weiterleitung regulärer HTML-/API-Routen.

## Prüfungen

| Prüfung | Ergebnis |
| --- | --- |
| npm test | 16 Tests bestanden |
| npm run check | 56 Dateien; 0 Fehler, Warnungen und Hinweise |
| npm run build | 42 HTML-Seiten, robots.txt und sitemap.xml erzeugt |
| npm run deploy:check | Erfolgreich; 511,54 KiB / gzip 122,15 KiB |
| npm run seo:check | 36 öffentliche URLs und ihre Metadaten geprüft |
| npm run seo:check -- --live | 36 öffentliche Crawler-Antworten bytegleich, Status 200, kein blockierender X-Robots-Tag; HTTP-Startseite leitet mit 308 auf HTTPS |
| Öffentliche Auslieferung | 55 reguläre HTML-/CSS-/JS-/Asset-Antworten bytegleich; DE/EN-Fehlerseiten zusätzlich bytegleich mit HTTP 404 |
| API/RLS auf development | 11 Integrationsprüfungen bestanden; keine Schemaänderung erforderlich |

Die Inhaltstests prüfen Quellenverknüpfungen und Sprachparität. Editortests prüfen alle Musterlösungen, unvollständige Vorlagen, alternative SQL-/HTML-/chmod-Formate sowie ungültige und schädliche Eingaben. Die Transportprüfung erhält Pfad/Query und lässt localhost unverändert.

Im Browser: alle zehn Editoren in beiden Sprachen (20 Abläufe) mit Fehlerfeedback, Hinweis, Lösung, Prüfung und Reset. Alle 15 neuen Antwortmöglichkeiten jeweils auf Deutsch und Englisch (30 Abläufe) mit Erklärung und Beleglink. Mobilansicht 390 × 844, Desktop 1280 × 1000, neue Navigation, Sprachwechsel und dunkles Design geprüft.

Auf der öffentlichen Website: SQL-Editor liefert beide Beginner-Kurse; UTF-8-Editor liefert [65, 226, 130, 172] und vier Bytes. Neuer Einstieg und neue Quizfrage lassen sich mit Account speichern. Nach Sprachwechsel und erneuter Anmeldung wurden 1/10 Einstiege, 1/10 Fragen und eine richtige Antwort wiederhergestellt. Testaccount am Ende abgemeldet. Alle bisherigen Inhaltskennungen bleiben erhalten; bestehende Fortschrittsdaten wurden nicht migriert oder gelöscht.

## Tatsächliches Deployment

- URL: **https://it-worlds.maki26.workers.dev**
- Worker: **it-worlds**, Subdomain **maki26**.
- Zeitpunkt: **22.10.2026, 19:56:43 (Europe/Stockholm)**.
- Aktive Version: **`fa8de230-b8fb-4a06-8337-be4b09193b33`**, 100 % Traffic.
- Deployment-ID: `2e582bc2-999d-4159-960b-a45acbe85014`.
- Vorhandene lokale Wrangler-Anmeldung genutzt. Bestehende Bindings, Secrets, Compatibility-Datum/Flags, Nutzungsmodell, Placement, Tags, Tail Consumers, Logpush und workers.dev-/Preview-Einstellungen erhalten und verglichen. Gezielt geändert wurde die Worker-Ausführung vor regulären HTML-Routen für HTTPS. Statische Dateien bleiben Assets.

README, Editor-/SEO-/Quellen-/Betriebsdokumentation und GitHub-Beschreibung/Topics sind auf den neuen Stand angepasst. Der lokale Checkout wird weiterverwendet; die vorhandene Nutzerdatei .clinerules bleibt unangetastet und wird nicht committed.

## Grenzen

Die Editor-Prüfer sind begrenzte Lernmodelle, keine vollständigen Interpreter oder Compiler. Nutzereingaben werden nicht als Programm ausgeführt und nicht an Server gesendet. Editor-Ergebnisse zählen nicht zusätzlich im Account-Lernstand.

Ein unabhängiges Fachreview und vollständige Vertiefungs-/Profi-Kurse stehen weiterhin aus. Die Suchseiten sind technisch öffentlich crawlbar; die externe site:-Suchabfrage lieferte am Prüftag noch keinen Indexierungsnachweis. Es wurde keine Search-Console-Property verifiziert und keine Rankingposition versprochen. Details: [SEO.md](SEO.md). Die tatsächliche Passwort-Reset-Mailzustellung wurde weiterhin nicht geprüft.

Der [vorherige Prüfstand vom 21. Oktober](https://github.com/manuelk2607/IT-Worlds/blob/0e6e9cbe2ce33ab407bb6fc6a36c564a1903181e/docs/VALIDIERUNG.md) dokumentiert ZIP-/Patch-Übernahme, ursprüngliche Quellenlektüre und Account-Einrichtung.
