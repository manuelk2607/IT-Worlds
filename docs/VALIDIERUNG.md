# Validierung

## Lernwege und Cloud & DevOps · 24. Oktober 2026

Veröffentlicht: 24.10.2026 02:08:24 Europe/Stockholm, Version c8ebeb2c-242a-40b0-9013-b4f23096942b, Deployment 1c10f650-6ee4-419c-a9d1-73b5ebbd9998, 100 % Traffic. Elf Kurse, 92 Kapitel, 194 Fragen, 155 Quellen. 35 lokale Tests (34 bestanden, Container lokal ohne Engine übersprungen), 108 Dateien strikt ohne Meldungen, 272 HTML-Seiten, 17.847 interne Links/Assets/Anker, 266 öffentliche Sprachseiten. Deployment-Vorschau erfolgreich. GitHub-Run 40043330066 bestand auf Node 22.22.0/24 und führte das echte Docker-Beispiel erfolgreich aus.

Öffentlicher Audit aller 266 URLs: indexierbar, Canonicals/Sprachen, Metadaten, strukturierte Daten, HTTPS und bytegleiche Auslieferung bestätigt. DevOps-Kapitel mit Formel, Aufgabenlösung und gefiltertem Zwei-Fragen-Quiz im Browser geprüft; Antwort samt allen Erklärungen sichtbar. Geführter Weg mit 13 verfügbaren Schritten und Gastzustand öffentlich bestätigt. Lokal mit simuliertem Account zusätzlich Fortsetzen, geteilte Kapitelkennungen, 13/13, nur offene Inhalte, Englisch und mobile Tastaturnavigation geprüft. Dies ist kein neuer tatsächlicher Neon-Accounttest. Cloudflare-Account/Subdomain, bestehende Einstellungen und vier Bindings vor/nach Veröffentlichung identisch.

## Python und kurze Quizrunden · 24. Oktober 2026

37 Tests: 36 bestanden, ein lokaler Containerfall übersprungen. 113 Dateien strikt ohne Meldungen. 292 HTML-Seiten, 19.174 interne Links/Assets/Anker, 286 öffentliche Sprachseiten im lokalen SEO-Audit. Python 3.12.6 führt sämtliche Listings und zusätzliche Grenz-/Fehlerfälle aus. Veröffentlicht um 02:18:33 Europe/Stockholm: Version af5f9f59-aa9d-4c5f-80b8-7ab7e57e7f77, Deployment 83741850-9dcf-4ce0-bf37-52db12dfe174, 100 % Traffic. Cloudflare-Einstellungen unverändert. Öffentlicher Abgleich aller 286 Sprachseiten erfolgreich. Englisches Python-Abschlusskapitel und deutscher gefilterter Quiz-Einstieg öffentlich im Browser bestätigt. GitHub-Run 40044291333 erfolgreich, einschließlich realem Containerfall.


## Aktuelle iterative Erweiterung · 23. Oktober 2026

Zehn Kursfolgen, 84 Kapitel, 178 Fragen und 139 Quellen. Neu: Grundlagen 7, TypeScript 8, Web 8, Linux 6, Netzwerke 6, Sicherheit 7. Bestehende SQL-/API-/KI-/LaTeX-IDs erhalten. KI und LaTeX inhaltlich unverändert. UX: Lernstart, Kurskatalog, Breadcrumbs, verzögert geladene Kapitelsuche, passende Quiz-Auswahllisten und gruppierter Lernstand mit Fortsetzen.

- 31 Tests bestanden; 100 Dateien strikt geprüft, keine Fehler/Warnungen/Hinweise.
- Build: 252 HTML-Seiten. SEO-Audit: 246 öffentliche Sprachseiten mit Canonicals, hreflang, Metadaten, Sitemap und strukturierten Daten.
- Interner Audit: 16.254 Links, Assets und Sprungmarken in allen 252 HTML-Seiten geprüft. Wiederholbar mit npm run links:check.
- Deployment-Vorschau erfolgreich: 965,48 KiB, gzip 275,04 KiB. Keine zusätzlichen Abhängigkeiten.
- Alle neuen TypeScript-Listings strikt geprüft; lokale Node-Modelle ausgeführt. Zusätzliche Fälle für Wertebereiche, unbekannte Daten, Suche, Summenüberlauf, Origins, ETags, Eigentümerregeln und Auditkennungen.
- Portable Shellfälle in isolierten temporären Ordnern ausgeführt: Quoting/Leerzeichen, Rechte, Pipe-Status, eigener Prozess und korrekte/beschädigte Wiederherstellung. Linux-systemd-Liveprüfung offen; lokaler Docker-Dienst läuft nicht.
- Browser lokal: Suche/Enter, Kurs- und Quizfilter, Fragen samt sämtlichen Erklärungen, Ergebnis und Neustart; gruppierte Fortschrittsansicht und Themenfilter; mobile Navigation/Kapitelübersicht; Webbeispiele (Formular, Grid, Boxmodell, Tastatur, Zähler, Fehler/Wiederholung). Sicherheitsbeispiel zeigt Markup als Text und erzeugt kein strong-Element.

Grenzen: Kein neuer angemeldeter Ende-zu-Ende-Test; Auth und Datenbankschema wurden nicht verändert. Quellenabgleich ist kein unabhängiges Fachreview. Keine Core-Web-Vitals-Feldmessung behauptet. Cloud & DevOps und drei themenübergreifende Pfadskizzen bleiben nächste priorisierte Aufgaben, siehe AUSBAU.md.

Veröffentlichung: 23.10.2026 22:22:53 Europe/Stockholm, Version 51a5ae9c-3253-4d71-873f-db912367cf55, Deployment 2c0d7304-78a5-4405-aa2c-cd9d771c63bb, 100 % Traffic. Vorhandener Account, Subdomain, vier Bindings und Einstellungen vor/nach Veröffentlichung identisch. Der am 24.10. wiederholte öffentliche SEO-Abgleich bestätigt alle 246 URLs samt bytegleicher Auslieferung und HTTPS-Weiterleitung. Der Audit liest den lokalen Buildstand jetzt vor den Netzwerkprüfungen ein und verwendet höchstens vier parallele Anfragen; ein nachfolgender Build vermischt dadurch nicht mehr die geprüften Stände.

## Vorherige Prüfstände


## Datenbank-/API-Ausbau · 23. Oktober 2026

Priorisierte Erweiterung: acht SQL- und sieben API-Kapitel mit 15 Aufgaben, vollständigen Beispielen und 30 Fragen. Gesamt: 42 Kurskapitel, 94 Quizfragen, 86 Primärquellen und 52 lesbare Inhalte mit optionalem Fortschritt. Die bisherigen KI-/LaTeX-Inhalte bleiben unverändert. Analyse aller anderen Themen und offene Arbeitspakete: [AUSBAU.md](AUSBAU.md).

- `npm test`: 21 Tests erfolgreich. Der neue Test führt alle sieben API-Beispiele aus und prüft zusätzlich fehlerhafte Antwortdaten, HTTP 404, Vertragsfälle und veraltete Schreibversionen. Bestehende Tests prüfen auch alle neuen Quizlösungen, Übersetzungen, Quellen und Fortschrittskennungen.
- `npm run check`: 74 Dateien; keine Fehler, Warnungen oder Hinweise. Alle sieben veröffentlichten TypeScript-Beispiele zusätzlich mit strenger separater Typprüfung geprüft.
- `npm run build`: 142 HTML-Seiten. `npm run deploy:check`: erfolgreich, 729,50 KiB / gzip 196,96 KiB.
- Alle acht vollständigen SQL-Beispiele in einem isolierten PostgreSQL-18-Cluster ausgeführt; erwartete Zeilenwerte, Rollback, Parameterbindung, Migration und Index-Scan geprüft. Zusätzlich eigene Testtabelle exportiert, in eine neue Datenbank wiederhergestellt und Ergebnis 2|SQL,HTTP bestätigt. Keine vorhandene oder produktive Datenbank verwendet.
- 15.129 interne Links/Sprungmarken geprüft; beabsichtigte Fehlerseiten separat. Alle 17 neuen Quellen-URLs liefern HTTP 200.
- `npm run seo:check -- --live`: alle 136 öffentlichen URLs mit korrekten Metadaten und bytegleicher Auslieferung; HTTPS-Weiterleitung geprüft.
- Browser: neue Kapitelnavigation, Aufgabenlösung, deutsches SQL-Quiz mit richtiger/falscher Antwort und allen Erklärungen, Ergebnis 1/2, Neustart, Filter ohne Treffer, Zurücksetzen und Sprachwechsel mit erhaltenen Filtern. Englische Kapiteltitelsuche, mobile Navigation bei 390 × 844, helles/dunkles Design und Seitenbreite ohne horizontalen Überlauf geprüft. Öffentlich zusätzlich API-Quiz, Kursübergang SQL → APIs und DE-/EN-404-Seiten samt HTTP 404 geprüft.

Veröffentlicht **23.10.2026, 21:06:28 (Europe/Stockholm)**: Worker it-worlds, Version **a75d5b7f-af72-4571-a6f7-da8a3df927ad**, 100 % Traffic; Deployment **9deb6277-49ec-4fe9-88ea-25cd9b0167df**. Account, Subdomain, bestehende vier Bindings und Worker-Einstellungen vor/nach Veröffentlichung verglichen und erhalten. README, GitHub-Beschreibung und SQL-Topic aktualisiert.

Grenzen: Quellenabgleich und technische Tests sind kein unabhängiges Fachreview. Kein erneuter angemeldeter Ende-zu-Ende-Test; die neuen Account-Kennungen und Antwortbewertungen sind automatisiert geprüft. Die Kursbeispiele sind lokale Lernprogramme und keine neuen Produktionsendpunkte. Die übrigen Themen besitzen weiterhin ihren bisherigen Einstieg und Editor; keine pauschale Vollständigkeit aller Themen wird behauptet.

## Kursausbau · 23. Oktober 2026

14 KI- und 13 LaTeX-Kapitel in Deutsch und Englisch, 27 Aufgaben mit Lösungen, 54 neue Quizfragen (insgesamt 64), zwei verfügbare Kurslernwege und 69 Primärquellen. Kapitel sind in Themenansichten, Suche, Fortschritt, Quellenverzeichnis und Sitemap eingebunden. Bisherige IDs und lokale Nutzerdateien bleiben erhalten. Keine Änderung am Account-Schema.

| Prüfung | Ergebnis |
| --- | --- |
| npm test | 20 Tests bestanden, einschließlich Kurs-IDs, Übersetzungen, Quellen, Formelrendering, Antwortbewertung und Filterkombinationen |
| npm run check | 70 Dateien, 0 Fehler/Warnungen/Hinweise |
| npm run build | 104 HTML-Seiten |
| npm run deploy:check | Erfolgreich; 655,50 KiB / gzip 172,18 KiB |
| npm run seo:check -- --live | 98 öffentliche URLs mit korrekten Metadaten und bytegleicher öffentlicher Auslieferung; HTTPS-Weiterleitung geprüft |
| Interne Links | 9.253 Links und Sprungmarken in 104 Seiten geprüft; beabsichtigter Fehlerseitenlink separat als 404 geprüft |
| Quellenlinks | Alle 69 kanonischen Quellen-URLs liefern HTTP 200 |
| Python-Beispiele | Alle acht mit Python 3.12 und PyTorch 2.14.1 ausgeführt |
| LaTeX-Beispiele | Zwölf erfolgreich mit Tectonic/XeTeX kompiliert; Literaturbeispiel benötigt lokal fehlendes Biber |

Browserprüfung: Kapitel-/Abschnittsnavigation, Aufgabenlösung, Suche nach BibLaTeX, Kapitelquiz mit falscher und richtiger Antwort und allen Optionserklärungen, Ergebnis 1/2, Neustart, leere Filterkombination und Zurücksetzen. Der Sprachwechsel erhält Kurs-/Kapitel-/Stufenfilter. Mobile Navigation und Kapitelansicht mit 390 × 844 sowie Desktop mit 1280 × 900 geprüft; kein horizontaler Seitenüberlauf. Helles/dunkles Design und gerenderte Attention-Formel geprüft. Öffentlich zusätzlich deutsches KI- und englisches LaTeX-Quiz sowie beide Fehlerseiten getestet. Die Account-Fortschrittskennungen und serverseitige Antwortbewertung sind automatisiert geprüft; ein erneuter angemeldeter End-to-End-Test ist für diese Erweiterung nicht behauptet.

Tatsächliches Deployment: **23.10.2026, 15:21:02 (Europe/Stockholm)** auf [it-worlds.maki26.workers.dev](https://it-worlds.maki26.workers.dev/). Version **f436f2c9-44b0-4323-b211-e2387777f900**, 100 % Traffic; Deployment **7a2168fe-aab5-4c7f-aca2-4e024265402d**. Lokale Anmeldung verwendet; Account, Subdomain, alle vier Bindings und bisherige Worker-Einstellungen vor/nach Veröffentlichung verglichen und unverändert. GitHub-Beschreibung und Topics um die Kurse ergänzt.

Grenzen: Quellenabgleich ist kein unabhängiges Fachreview. Dieses bleibt offen. Der vollständige BibLaTeX/Biber-Build ist mangels lokalem Biber ungeprüft. Die Kurse vermitteln definierte Grundlagen und fortgeschrittene Anwendungen, keine umfassende fachliche Zertifizierung.

## Historischer Prüfstand vom 22. Oktober 2026

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

## Isolierter Veröffentlichungsablauf · lokaler Folgestand

38 Tests: 37 bestanden, ein lokaler Docker-Fall übersprungen; 117 Dateien strikt ohne Meldungen. Neues Release-Artefakt enthält 372 Dateien, keine Synchronisationskopien. Der isolierte Dry-Run prüft 292 HTML-Seiten, 286 öffentliche URLs und 19.863 interne Verweise; Wrangler erhält die temporären Assets unter Beibehaltung der vorhandenen Konfiguration. Noch kein echter Deploy über das neue Hilfsskript behauptet.

## Betriebssystemkurs · lokaler Folgestand

39 Tests: 38 bestanden, lokaler Docker-Fall übersprungen; alle neuen OS-Listings streng typgeprüft und ausgeführt, Hardlinks real geprüft. 120 Dateien strikt ohne Meldungen; 308 HTML-Seiten, 302 öffentliche Sprachseiten, 20.917 interne Verweise. Quellenabschnitte und tatsächlich gelesene Onlinefassungen abgeglichen. Browser: DE/EN, aufklappbare Lösung, gerenderte MathML-Formel und Volltextsuche. Veröffentlichung mit neuem Releaseablauf folgt.
