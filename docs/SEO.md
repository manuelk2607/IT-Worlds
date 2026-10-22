# Öffentliche Auffindbarkeit

Die Lernseiten sind statisches HTML ohne Anmeldung. Navigation und Themenkarten enthalten echte Links, sodass Inhalte ohne JavaScript entdeckt werden können. `/uebungen/` verlinkt alle zehn Aufgaben. Die öffentliche GitHub-README und der About-Link führen zur Website.

## Implementiert

- `/sitemap.xml`: 36 öffentliche Lernseiten: 18 auf Deutsch und 18 auf Englisch; persönliche Seiten und Fehlerseiten sind ausgeschlossen. Gegenseitige `hreflang`-Verknüpfungen inklusive `x-default` sind enthalten.
- `/robots.txt`: Lerninhalte sind crawlbar; `/api/` ist ausgeschlossen und die Sitemap verlinkt. Account- und Lernstandsseiten bleiben crawlbar, damit deren `noindex, follow` gelesen werden kann.
- Jede öffentliche Seite hat eine eigene absolute HTTPS-Canonical-URL ohne Quiz-Filterparameter, passende Sprache, Titel und Beschreibung.
- Open Graph und Twitter-Card-Metadaten enthalten Titel, Beschreibung und eigene PNG-Vorschaubilder mit 1200 × 630 Pixeln auf Deutsch bzw. Englisch. Die SVG-Quelldateien liegen in `src/assets/`.
- JSON-LD beschreibt Website, Herausgeber, Seite und Breadcrumbs; Themeneinstiege zusätzlich als LearningResource. Es werden keine Bewertungen, Zertifikate oder abgeschlossenen Kurse behauptet.
- Reguläre Lernseiten und API-Aufrufe auf dem Projekt-Host werden von HTTP dauerhaft mit Status 308 auf HTTPS umgeleitet; localhost bleibt für Entwicklung verfügbar. Nur HTML-/API-Routen laufen dafür zuerst durch den Worker; statische Dateien bleiben im Asset-Pfad.
- 404 bleibt HTTP 404. Konto, Lernstand und Fehlerseiten tragen `noindex`.

`npm run seo:check` prüft den Build: Sitemap, Sprachpaare, Canonicals, Überschriften, Titel, Beschreibungen, JSON-LD, Bilder und Indexierungsregeln. `npm run seo:check -- --live` prüft zusätzlich öffentliche Antworten mit Crawler-User-Agent, Status 200, fehlende blockierende X-Robots-Tag-Header und identischen HTML-Inhalt. Das ist eine technische Prüfung, kein Nachweis eines tatsächlichen Googlebot-Besuchs.

## Suchmaschinen und Grenzen

Der vom Betreiber bereitgestellte Google-Search-Console-Verifizierungstag ist dauerhaft im gemeinsamen HTML-Head eingebunden. Nach dem Deployment kann die HTML-Tag-Methode in der Search Console bestätigt werden. Das Einbinden allein bestätigt weder die Property noch eine Indexierung; den Tag für spätere Eigentumsprüfungen erhalten.

Die Sitemap wird über robots.txt bekannt gemacht. Ob, wann und mit welcher Platzierung eine Suchmaschine indexiert, liegt beim Suchdienst. Es wurde keine Indexierung oder Rankingposition versprochen und keine verifizierte Search-Console-Property angelegt. Eine bestätigte Property kann später Crawling-/Indexierungsberichte liefern und die direkte Sitemap-Einreichung ermöglichen. Sie ist für öffentlich crawlbare Seiten keine Zugangsvoraussetzung.

Ein unabhängiges Fachreview, vollständiger inhaltlicher Ausbau, hilfreiche eigenständige Inhalte und echte externe Verweise bleiben wichtig. Keine Suchwortlisten, künstlichen Bewertungen oder versteckten Texte ergänzen. Bei einem späteren Domainwechsel müssen Site-URL, Canonicals, Sprachbezüge, Sitemap und Weiterleitungen gemeinsam angepasst werden.

Am 22. Oktober 2026 gelesene offizielle Grundlagen:

- [Google: Sitemap erstellen und einreichen](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), Abschnitte Sitemap location / How to submit a sitemap.
- [Google: Sprachversionen](https://developers.google.com/search/docs/specialty/international/localized-versions), HTML tags / Guidelines for all methods.
- [Google: Canonicals](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), rel=canonical / Use a sitemap.
- [Google: noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), Implementing noindex / Debugging noindex issues.

Diese technischen Quellen gehören nicht zum fachlichen Quellenzähler der Lerninhalte.
