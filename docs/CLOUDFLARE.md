# Cloudflare Worker veröffentlichen

Ziel ist der bereits vorhandene Worker **it-worlds** unter **https://it-worlds.maki26.workers.dev**, Account-Subdomain **maki26**. Die erste statische Version wurde am 20. Oktober 2026 tatsächlich veröffentlicht. Der aktuelle Deployment-Nachweis steht im [Prüfprotokoll](VALIDIERUNG.md).

## Konfiguration und Bestand

`wrangler.jsonc` liefert Astro-Dateien aus `dist/` als Static Assets aus. `auto-trailing-slash` erzeugt HTML-Verzeichnisrouten; `404-page` nutzt die eigene deutsche Fehlerseite. `worker/index.ts` wird für API- und HTML-Routen zuerst aufgerufen. Reguläre HTTP-Lernseiten und APIs werden mit 308 auf HTTPS umgeleitet; englische unbekannte Routen erhalten die englische Fehlerseite mit HTTP 404. Statische Dateien bleiben im Asset-Pfad. Reguläre Lerninhalte bleiben statisch.

Vor jedem Deployment Account, Workers-Subdomain, vorhandene Bindings und Einstellungen prüfen. Das ursprüngliche Compatibility-Datum `2026-10-19`, Flags, Nutzungsmodell `standard`, Placement, Tags, Tail Consumers und deaktiviertes Logpush werden erhalten. Preview-URLs bleiben deaktiviert; `keep_vars` bleibt aktiviert. Die workers.dev-Adresse wurde für die beauftragte Website aktiviert.

Die Erweiterung ergänzt das Asset-Binding **ASSETS** und die drei persönlichen Laufzeit-Secrets. Weitere bestehende Bindings nicht entfernen. `keep_vars` ersetzt die Bestandsprüfung nicht.

## Anmeldung und Secrets

Die vorhandene lokale Wrangler-OAuth-Anmeldung wird verwendet und bei Bedarf regulär erneuert. Der Cloud-Chat-Token ist nicht automatisch lokal vorhanden und für diesen Deploy nicht nötig. Keine Secrets in Chat, Git oder Logs ausgeben.

```bash
npm exec -- wrangler whoami
```

Das Neon-Produktionsschema zunächst nach erfolgreichem Test auf development einrichten; siehe [Accounts](ACCOUNTS.md). Die lokale, ignorierte Runtime-JSON muss die **eingeschränkte** Anwendungs-URL und die Auth-Werte von main enthalten:

- `DATABASE_URL`: gepoolte Verbindung von `it_worlds_app`, keine Owner-Rolle.
- `NEON_AUTH_BASE_URL`: Auth-Endpunkt von main.
- `NEON_AUTH_COOKIE_SECRET`: zufälliger Schlüssel, mindestens 32 Zeichen; bestehende Werte bei normalen Deployments erhalten.

```bash
npm exec -- wrangler secret bulk /sicherer/pfad/runtime-main.json
```

Dateien und Werte geheim halten; der Befehl benötigt nur den lokalen Pfad, keine Werte im Terminalargument. Neon muss die öffentliche Origin als vertrauenswürdige Domain erlauben. Auf main ist localhost deaktiviert.

## Prüfen und veröffentlichen

```bash
npm ci
npm test
npm run check
npm run build
npm run deploy:check
npm run deploy
IT_WORLDS_URL=https://it-worlds.maki26.workers.dev npm run ready
```

`deploy:check` und `deploy` erzeugen einen frischen Astro-Build in einem eigenen temporären Ordner außerhalb synchronisierter Projektverzeichnisse. Vor dem Upload prüfen sie erforderliche Dateien, mögliche Synchronisationskopien, SEO und sämtliche internen Links/Anker. Wrangler erhält ausschließlich diesen Assetordner; Routing, Account und Bindings stammen weiterhin aus wrangler.jsonc. Nach einem echten Deploy vergleicht der Ablauf alle öffentlichen Sitemap-Seiten bytegenau mit diesem Artefakt. Nach erfolgreicher Prüfung entfernt er nur seinen eigenen temporären Ordner. Scheitert die öffentliche Prüfung nach bereits erfolgreicher Veröffentlichung, bleibt das Artefakt unter dem ausgegebenen lokalen Pfad für eine Wiederholung erhalten; die Fehlermeldung unterscheidet beide Zustände. Transportfehler und HTTP 429/5xx werden maximal dreimal versucht, falsche Inhalte oder permanente Statusfehler werden nicht als Erfolg behandelt. Der normale Build in dist/ bleibt für Entwicklung und Vorschau erhalten. Einzelne Audits können über IT_WORLDS_DIST einen expliziten Build prüfen.

Ein Dry-Run bestätigt keine Veröffentlichung. Danach aktive Version und erhaltene Einstellungen auslesen, gebaute Dateien mit öffentlicher Auslieferung vergleichen und DE/EN-404 mit Status 404 prüfen. Im öffentlichen Browser zusätzlich Suche, Filter, mobiles Menü, Übungseditoren mit Hinweis/Lösung/Reset, Quiz mit falschen Antworten, Erklärungen, Ergebnis, Neustart, Quellenlinks, Sprachwechsel und beide Designs prüfen. Einen Testaccount registrieren, Fortschritt speichern, abmelden, erneut anmelden und Wiederherstellung prüfen.

## Historischer Cloud-Stand

Der Cloud-Chat hatte wegen fehlenden Laufzeitzugriffs und Problemen beim Speichern der Umgebung noch nicht veröffentlicht. Das ZIP enthielt Code und Patch. Diese Einschränkungen blockierten den lokalen Deploy nicht.

Gelesene Grundlagen: [Wrangler-Konfiguration](https://developers.cloudflare.com/workers/wrangler/configuration/), [HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/), [Worker Settings API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/settings/methods/get/). Deployment- und Auth-Dokumentation sind von den Quellen der Lerntexte getrennt.
