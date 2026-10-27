# HTTP release lab / HTTP-Abnahmelabor

Eigenständiges IT-Worlds-Lernprojekt, ausschließlich TypeScript, ohne zusätzliche Pakete.
Original teaching project, TypeScript only, no additional packages required.

Voraussetzung / prerequisite: Node.js 22.22 oder neuer / or later.

## Ausführen / Run

Terminal 1:

```sh
node --experimental-strip-types serve.ts
```

Terminal 2:

```sh
node --experimental-strip-types cli.ts http://127.0.0.1:8810/
node --experimental-strip-types --test check.test.ts
```

Vier PASS-Zeilen und Exitcode 0 / Four PASS lines and exit code 0.

## Fehler und Wiederanlauf / Faults and recovery

Beende ausschließlich deinen gestarteten Server mit Ctrl-C und starte ihn mit einem Fehler:
Stop only the server you started with Ctrl-C and restart with a fault:

```sh
node --experimental-strip-types serve.ts missing
```

Der Prüfer muss die fehlende Route mit HTTP 200 ablehnen (Exitcode 1).
The checker must reject the missing route returning HTTP 200 (exit code 1).

Weitere Fehler / other faults: `status`, `type`, `content`, `schema`, `redirect`, `oversize`, `slow`.
`slow` benötigt einen Test mit kürzerem Timeout, wie in check.test.ts.
`slow` requires a shorter timeout, as shown in check.test.ts.

Starte abschließend ohne Fehler neu und prüfe erneut alle vier Routen.
Finally restart without a fault and check all four routes again.

## Vertrag / Contract

| Route | Status | Content-Type | Inhalt / Contents |
| --- | --- | --- | --- |
| / | 200 | text/html | h1: Learning catalog |
| /health | 200 | application/json | status=ok, schema=1 |
| /api/courses | 200 | application/json | nonempty array, positive integer id, nonempty title |
| /missing-release-probe | 404 | text/plain | Not found |

Der Prüfer sendet nur GET, keine Cookies oder Zugangsdaten, folgt keinen Redirects und begrenzt jede Antwort auf 64 KiB und 3 Sekunden. Die vier Routen werden unabhängig ausgewertet. Syntaxfehler beim Aufruf ergeben Exitcode 2. Eine unterbrochene Verbindung ist kein erfolgreicher Vertragstest.

The checker sends only GET, no cookies or credentials, follows no redirects and limits each response to 64 KiB and 3 seconds. It evaluates the four routes independently. Invalid invocation gives exit code 2. An interrupted connection is not a passing contract test.

Der Demonstrationsserver bindet ausschließlich 127.0.0.1:8810. Er ist ein lesender Übungsdienst ohne Konten oder Produktionsdaten. Der Checker ist auf diesen Vertrag zugeschnitten: Eine beliebige andere Website wird ihn normalerweise nicht erfüllen. Für einen eigenen Dienst zuerst den tatsächlichen Vertrag festlegen. Lokales Bestehen belegt weder öffentliche DNS-/TLS-Auslieferung noch Browserbedienbarkeit. Eine Rückkehr zu früherem Code stellt keine Daten wieder her. Lösche oder verändere keine fremden Dienste für dieses Labor.

The demo binds only to 127.0.0.1:8810. It is a read-only learning service with no accounts or production data. The checker targets this particular contract: an arbitrary website normally will not match it. Define your own service contract before adapting it. Local success proves neither public DNS/TLS delivery nor browser usability. Returning to old code does not restore data. Do not delete or modify unrelated services for this lab.

Lernanleitung / learning guide: https://it-worlds.maki26.workers.dev/projekte/auslieferung/
