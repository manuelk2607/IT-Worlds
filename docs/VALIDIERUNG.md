# Validierung und Veröffentlichung

Prüfstand: **21. Oktober 2026**, Europe/Stockholm.

## Tatsächliche Übernahme und Erhalt lokaler Dateien

Das ZIP enthielt vollständigen Quellcode und `it-worlds-changes.patch`. Nach Prüfung von Vorgaben, Dateien, Remote und Arbeitsbaum wurde `git apply --check` erfolgreich ausgeführt und der Patch auf `codex/cloudstand-lokal` angewendet. Direkt danach stimmten die Projektdateien mit dem ZIP-Quellstand überein. Basis war `cab9f38864d090591878da130430443fe7480a77`.

Der ursprüngliche Checkout wurde wiederverwendet. Die späteren Account-, Sprach- und Designänderungen wurden vor der Übernahme gegen die jeweiligen Ausgangsdateien geprüft. Die zwischenzeitlich vorhandene Nutzerdatei `.clinerules` blieb erhalten und wird nicht in unseren Commit aufgenommen. Secrets und generierte Verzeichnisse bleiben außerhalb der Versionsverwaltung.

## Umgesetzter Umfang

Zehn Themenwelten, jeweils drei Themenstufen, drei Lernpfad-Skizzen, fünf Einstiege, fünf Fragen und 14 Quellen. LaTeX, Typst und Markdown bleiben ein Unterbereich der Programmiersprachen. Die vorhandenen Inhalte und sämtliche sichtbaren UI-Texte stehen auf Deutsch und Englisch bereit. Beide Sprachen verwenden dieselben Inhaltskennungen und denselben Lernstand.

Freiwillige Accounts ergänzen gelesene Einstiege, bearbeitete Fragen, jemals richtig beantwortete Fragen und eine persönliche Übersicht. Alle Inhalte bleiben für Gäste zugänglich. Helles und dunkles Design sind umschaltbar und im Browser gespeichert. Geplante Lektionen bleiben als geplant gekennzeichnet und sind nicht abhackbar. Eigener Code, Tests, Skripte und Konfiguration bleiben strikt geprüftes TypeScript.

## Automatisierte Prüfungen

| Prüfung | Ergebnis |
| --- | --- |
| `npm ci` | Lockfile-Installation erfolgreich, Node.js 26.8.1; Audit meldet 0 bekannte Schwachstellen |
| `npm test` | 10 Tests bestanden: Inhalte/Quellen, Sprachparität, Fortschrittsvalidierung und Auth-Fehlermeldungen |
| `npm run check` | 41 Dateien, 0 Fehler, 0 Warnungen, 0 Hinweise |
| `npm run build` | 40 HTML-Seiten erzeugt |
| `npm run deploy:check` | Worker-Dry-Run erfolgreich, 488,46 KiB / gzip 115,50 KiB |
| API-/Datenbank-Integration | 11 Prüfungen auf isoliertem development bestanden |
| Öffentliche HTTP-Prüfung | 48 reguläre HTML-/CSS-/JS-/Asset-Antworten bytegleich zum Build; beide Fehlerseiten zusätzlich bytegleich mit HTTP 404 |
| Verzeichnisrouten | HTTP 307 für URLs ohne abschließenden Slash |
| `npm run ready` öffentlich | Startseite, Quiz und Quellen erfolgreich |

npm meldet Peer-Dependency-Konflikte und veraltete transitive Mail-/UI-Pakete aus dem Neon-SDK. Die Lockfile-Installation, Typprüfung und getesteten Auth-Laufwege funktionieren. Optionale Installationsskripte von core-js, esbuild, fsevents und workerd bleiben blockiert; vorhandene Plattformpakete reichen für Build und lokale Worker-Laufzeit. Keine Abhängigkeiten oder generierten JavaScript-Dateien wurden manuell umgeschrieben.

Die 11 Integrationsprüfungen umfassen: nicht angemeldeten Zugriff ablehnen, Cross-Origin-POST ablehnen, geplante Inhalte und ungültigen Antwortindex ablehnen, vom Browser behauptete Nutzer-ID ignorieren, zwei Nutzer in der API isolieren, ohne RLS-Kontext keine Zeilen, mit Kontext nur eigene Zeilen, fremden Insert ablehnen, Auth-Nutzertabelle für die Runtime-Rolle sperren und widerrufene Session ablehnen.

## Browserprüfung

Lokal und nach Veröffentlichung wurden relevante Abläufe im Browser geprüft:

- Registrierung ohne Verifizierungsmail, Anmeldung, falsches Passwort mit passender Fehlermeldung, Abmeldung und erneute Anmeldung.
- Gelesenen Einstieg und richtige/falsche Frage speichern; Wiederherstellung nach Navigation, Neuladen und Sprachwechsel. Auf der öffentlichen Website nach erneuter Anmeldung 1 Einstieg, 1 bearbeitete und 1 richtige Frage wiederhergestellt.
- Alle 15 englischen Antwortmöglichkeiten mit ihrer jeweiligen Erklärung und ihrem Originalbeleg. Die 15 deutschen Varianten waren bereits beim ursprünglichen Import geprüft.
- Öffentlicher vollständiger Fünf-Fragen-Gastdurchlauf mit einer falschen Antwort: 4 von 5, Ergebnis, Neustart und Neuladen erfolgreich.
- Globale Suche nach Typst, Themenfilter, leere Ergebnisse und mobile Navigation bei 390 × 844. Desktop bei 1280 × 900 geprüft.
- Sprachwechsel erhält die entsprechende Seite, Query und Sprungmarke; Designwechsel bleibt nach Neuladen und Navigation erhalten. Beide Designs und Sprachen visuell geprüft.
- Quellenverzeichnis mit 14 ausklappbaren Belegangaben, Quellenlinks sowie deutsche/englische 404-Seiten und Rückkehr zur Startseite.
- Gäste können Lerntexte und Quiz weiterhin vollständig nutzen.

## Tatsächliches Deployment

- Worker: **it-worlds**, Subdomain **maki26**.
- URL: **https://it-worlds.maki26.workers.dev**
- Veröffentlichung: **21. Oktober 2026, 09:04 Uhr (Europe/Stockholm)**.
- Aktive Version: **`16cdffb6-c708-4fa8-893c-66a9ba78e6c0`**, Traffic **100 %**.
- Deployment-ID: `e43642cf-0a94-4375-901e-6b58127dffa2`.
- Bestehende lokale Wrangler-OAuth-Anmeldung genutzt. Kein Cloud-Chat-Token erforderlich.
- Einstellungen vor/nach Deploy verglichen: Compatibility-Datum, Flags, Nutzungsmodell standard, Placement, Tags, Tail Consumers, Logpush und Preview-Einstellung erhalten.
- Gezielt ergänzt: ASSETS-Binding sowie DATABASE_URL, NEON_AUTH_BASE_URL und NEON_AUTH_COOKIE_SECRET als geheime Bindings. Ihre Werte stehen nicht im Repository.
- Neon-Projekt **IT-Worlds** in Frankfurt mit getrennten main-/development-Branches. Rollen-Einrichtung und Migration zuerst auf development geprüft, danach auf main angewendet. Worker nutzt ausschließlich die eingeschränkte Anwendungsrolle.

Die vorherige Version `a653c29f-e503-4b03-96a3-029e14032181` vom 20. Oktober 2026 war der erste statische Deploy. Der Cloud-Chat selbst hatte zuvor noch nicht veröffentlicht.

## Quellen, GitHub und offene Punkte

Alle 14 kanonischen Quellen und offiziellen Dokumentationsquelltexte wurden bei der lokalen Übernahme per HTTPS geladen; ihre SHA-256-Summen stimmten mit `QUELLEN.md` überein. Relevante Abschnitte wurden gelesen und mit Artikeln und Quizlösungen abgeglichen. Die Übersetzung erhält Quellen, Lesedaten und Lösungen. **Das ersetzt kein unabhängiges Fachreview; dieses bleibt offen.** Vollständige Vertiefungs-/Profi-Kurse bleiben geplant.

Auf GitHub wurden Beschreibung, Homepage und 13 passende Topics gesetzt und per API zurückgelesen. Deutsche/englische README sowie Betriebs-, Aufbau- und Accountdokumentation gehören zum veröffentlichten Quellstand. „Tags“ meint hier Topics, keine Release-Tags.

E-Mail-Verifizierung ist auf ausdrücklichen Wunsch deaktiviert. Ein eigener SMTP-Anbieter ist keine Voraussetzung für die getestete Registrierung/Anmeldung. Passwort-Zurücksetzen verwendet den gemeinsamen Neon-Maildienst und dessen Limits; tatsächlicher E-Mail-Empfang und vollständiger Wiederherstellungsablauf wurden nicht geprüft.
