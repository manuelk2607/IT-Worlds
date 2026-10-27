# Mehrseitiger TypeScript-Katalog / Multi-page TypeScript catalog

Node.js 22.22+ and npm. No runtime dependencies. TypeScript 6.0.3 is the only build dependency, matching IT-Worlds.

Node.js 22.22+ und npm. Keine Laufzeitabhängigkeiten. TypeScript 6.0.3 ist die einzige Build-Abhängigkeit, wie bei IT-Worlds.

```sh
npm install
npm test
npm run build
npm start
```

Open / Öffne http://127.0.0.1:8811/ . Stop only your own server with Ctrl-C / Beende nur deinen eigenen Server mit Ctrl-C.

Three pages: index.html (catalog), course.html?id=sql (detail), about.html (scope/checklist). Source data and filtering are in catalog.ts; DOM operations are in app.ts. TypeScript emits dist/app.js and dist/catalog.js; do not edit those generated files. The static local server has a fixed file allowlist and binds only to localhost.

Drei Seiten: index.html (Katalog), course.html?id=sql (Detail), about.html (Umfang/Prüfliste). catalog.ts enthält Beispieldaten und Filter, app.ts die DOM-Bedienung. Der Compiler erzeugt dist/app.js und dist/catalog.js; bearbeite nur die TypeScript-Quellen. Der lokale Server liefert nur ausdrücklich erlaubte Dateien und bindet ausschließlich localhost.

Try: search Responsive; combine topic Data (zero matches); clear filters; bookmark SQL; open its detail; reload; enable Bookmarked only. Test course.html?id=missing. Check Tab/Enter/Space, 390px width and a system dark theme. Disable browser storage: course access must still work. The unknown identifier is a helpful client-rendered state, not a server-side HTTP 404; unknown URL paths do receive HTTP 404.

Prüfe: Suche Responsive, kombiniere Thema Data (leer), setze Filter zurück, merke SQL vor, öffne das Detail, lade neu und filtere Bookmarked only. Öffne course.html?id=missing. Prüfe Tab/Enter/Leertaste, 390px und dunkles Systemdesign. Bei gesperrtem Browserspeicher bleiben die Inhalte erreichbar. Eine unbekannte ID erzeugt einen verständlichen Clientzustand, keinen serverseitigen HTTP 404; unbekannte URL-Pfade liefern tatsächlich HTTP 404.

Transfer: add one course with a stable new ID and an existing topic, update the expected count test, compile and verify its detail and bookmark. Then add a new topic consistently to HTML options, URL validation and tests. Use textContent for data: a title containing `<img src=x>` must appear as literal text, not an image.

Transfer: Ergänze einen Kurs mit stabiler neuer ID und vorhandenem Thema, passe die erwartete Anzahl an und prüfe nach dem Build Detail/Lesezeichen. Ergänze danach ein neues Thema konsistent in HTML-Auswahl, URL-Prüfung und Tests. Daten werden mit textContent eingefügt: `<img src=x>` in einem Titel muss Text bleiben.

The six course records are fictional practice metadata, not six new IT-Worlds lessons. The example interface is English; the accompanying IT-Worlds guide and this README cover both languages. Bookmarks use the separate local key it-worlds-catalog-project:v1; no account or actual learning progress is modified. General project licensing remains a separate repository decision.

Die sechs Datensätze sind Übungsmetadaten, keine sechs neuen IT-Worlds-Lektionen. Die Beispieloberfläche ist englisch; Anleitung und README sind zweisprachig. Lesezeichen verwenden den getrennten lokalen Schlüssel it-worlds-catalog-project:v1; keine Accounts oder tatsächlichen Lernfortschritte werden geändert. Die allgemeine Projektlizenz bleibt eine gesonderte Repositoryentscheidung.
