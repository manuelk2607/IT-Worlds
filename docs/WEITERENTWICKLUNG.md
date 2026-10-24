# Iterative Weiterentwicklung · 23. Oktober 2026

## Ausgangspunkt

Commit 61810f3: zehn Themenwelten, vier Kursfolgen mit 42 Kapiteln, 94 Fragen und 86 Primärquellen. Sieben Themenwelten haben außerhalb der vorhandenen Unterkurse nur einen kurzen Einstieg. KI und LaTeX werden inhaltlich zunächst nicht erweitert. Nutzerdatei `.clinerules` bleibt erhalten.

## Paket 1 · Orientierung und Suche

- Neuer Lernstart `/lernen/` mit drei konkreten Zielen: Grundlagen, einen Kurs durcharbeiten, Wissen prüfen.
- Kurskatalog trennt vollständig verfügbare Kurse von den drei älteren, teilweise geplanten Lernpfaden. Titel-/Themenfilter erhalten ihre Auswahl in der URL und beim Sprachwechsel.
- Themenkarten nennen verfügbare Kapitel statt pauschal nur einen Einstieg. Hauptnavigation ist auf fünf Lernziele reduziert; Quellen und Einstiegshilfe bleiben im Mobilmenü und Footer erreichbar.
- Kurse und Themen besitzen sichtbare Breadcrumbs; Kapitel liefern eine entsprechende strukturierte Hierarchie. Auf Mobilgeräten ist das Kursverzeichnis zunächst geschlossen, damit die Lektion direkt erreichbar ist.
- Suche lädt ihren sprachspezifischen Index erst beim Öffnen. Sie durchsucht auch Kapiteltexte, kombiniert mehrere Wörter, normalisiert Umlaute, gewichtet Titel und begrenzt die Ergebnisliste. Filter nach Inhaltstyp sowie Tastaturbedienung ergänzt. Statische JSON-Indizes enthalten ausschließlich öffentliche Lerninhalte.
- Geprüfte SQL-Kapitelseite: 76.317 auf 22.174 HTML-Bytes reduziert (rund 71 %), bevor weitere Inhalte hinzukommen. Der Suchindex ist nicht mehr auf jeder Seite als lange Linkliste eingebettet.
- 24 Tests, strikte Prüfung und Build erfolgreich. Lokal geprüft: Kapitelsuche, Enter-Navigation, Kursfilter samt Leerzustand und Reset, Mobilmenü, geschlossene mobile Kapitelübersicht, Dark Mode und Seitenbreite.

Weitere Pakete und Veröffentlichung werden nach Umsetzung ergänzt. Unabhängiges Fachreview bleibt eine gesonderte Aufgabe.

## Paket 2 · TypeScript-Kurs

Acht Kapitel ergänzen Programmiergrundlagen, Funktionen, Listen/Objekte, unbekannte Daten und Zustände, asynchrone Ergebnisse, Tests, Generics und einen Aufgabenplaner. Jedes Kapitel hat eine eigene Aufgabe mit begründeter Lösung und zwei Quizfragen. Alle acht veröffentlichten Programme wurden separat strikt typgeprüft und ausgeführt; automatisierte Zusatzfälle prüfen ungültige Zahlen, leere Listen, doppelte IDs und unveränderte Eingaben. Quellen: TypeScript-Handbook, Node-22.22-Testläufer und die konkret verwendeten MDN-Laufzeitfunktionen. Keine JavaScript-Quelldateien oder JavaScript-Lernbeispiele ergänzt.

## Paket 3 · Webkurs

Acht Kapitel verbinden semantisches HTML, CSS-Boxmodell, responsive Raster, Formulare, DOM-Interaktion mit TypeScript, Fehlerzustände, Tastaturzugang und Veröffentlichung. Alle 16 Fragen erklären jede Option. Praktisch geprüft: Boxbreiten 224/200 Pixel, ein-/zweispaltiges Raster bei 390/1280 Pixeln, Label-Zuordnung und ungültige/gültige Formeingabe, Zähler mit Maus und Leertaste, Fehler plus erfolgreicher Wiederholungsversuch, sichtbarer Sprunglink und Fokus auf dem Hauptinhalt. TypeScript-Listings werden jetzt insgesamt automatisiert streng geprüft; Browsercode ist als solcher gekennzeichnet. Der enthaltene Node-Auslieferungstest hat HTML 200 und fehlende Route 404 bestätigt. Die isolierten HTML-Demos senden keine echten persönlichen Daten.

## Paket 4 · IT-Grundlagen

Sieben Kapitel führen von Binärdarstellung und UTF-8 über JSON, isolierte Dateioperationen und Git zu Suchalgorithmen, kontrollierter Fehlersuche und einem validierten Datenprojekt. 14 Fragen erklären alle Antwortmöglichkeiten. Die Programme werden ausgeführt und streng geprüft; Zusatztests prüfen JSON-Syntax und Fachvertrag, binäre Suche über leere/einzelne/mehrere Einträge, Zahlenüberlauf sowie den Unterschied zwischen vorgemerkter Git-Version und späterer Arbeitsänderung. Dateien und Git-Repository der Beispiele bleiben strikt temporär.

## Paket 5 · Quiz und persönlicher Lernstand

Quizfilter begrenzen nach Themen-/Kurswahl die tatsächlich angebotenen Kurse und Kapitel; ein Kapitel setzt Kurs, Thema und Lernstufe konsistent. Ein Themenwechsel entfernt unpassende Unterfilter, ein Stufenwechsel entfernt unpassende Kapitel. Exakte Fragenlinks bleiben möglich. Die Auswahl nennt ihre Fragenzahl und erklärt den Rundenneustart. Die Filterlogik ist mit Konflikt- und Grenzfällen getestet; zwei Fragen, alle Erklärungen, Ergebnis und Neustart wurden im Browser geprüft.

Der Lernstand gruppiert Kapitel und Fragen in zugänglichen aufklappbaren Kursgruppen. Ansicht, Thema und „Nur offene Inhalte“ reduzieren die Übersicht. Jede Gruppe nennt ihren Fortschritt und verlinkt den nächsten offenen Schritt. Einstiege bleiben separat erreichbar; alle Inhalte auch ohne erreichbaren Account-Dienst lesbar. Suche normalisiert den bereits geladenen Index nur einmal pro Eintrag, sodass weitere Tastatureingaben die langen Kapiteltexte nicht wiederholt aufbereiten.

## Paket 6 · Linux

Sechs Kapitel mit zwölf Fragen erklären Quoting, Pfade und Rechte, Pipes und Rückgabestatus, eigene Prozesse, systemd-Diagnose und eine Wiederherstellungsprobe. Portable Shell-Beispiele laufen in einem isolierten temporären Verzeichnis; Tests prüfen Leerzeichen, 640-Rechte, Nichttreffer, kontrolliertes Beenden des eigenen Jobs sowie erfolgreiche und absichtlich beschädigte Wiederherstellung. Die rein lesenden systemd-Befehle wurden gegen die offiziellen Handbücher abgeglichen; eine Live-Ausführung bleibt mangels laufender Linux-/systemd-Umgebung offen. Keine fremden Prozesse oder Dienste werden verändert.

## Paket 7 · Netzwerke

Sechs Kapitel und zwölf Fragen verbinden URL-Bestandteile, IPv4/CIDR, DNS/TTL, TCP/UDP, TLS und HTTP-Caches. Lokale Modelle sind ausdrücklich keine Live-Netztests. Alle TypeScript-Listings werden ausgeführt und streng geprüft; Zusatzfälle decken Präfixgrenzen, ungültige Zeiten, exakte Origins einschließlich Port/Benutzerinformationen sowie aktuelle und veraltete ETags ab. Geteilte Nachrichten werden anhand eines klar begrenzten ASCII-Modells erklärt, ohne TCP-Nachrichtengrenzen oder einen vollständigen DNS-Resolver zu behaupten.

## Paket 8 · Sicherheit

Sieben Kapitel mit 14 Fragen zu Bedrohungsmodell, Authentifizierung/MFA, Eingaben, Eigentümerregeln, sicherer Textausgabe, CSRF und Auditdaten. Alle Modelle benennen ihren begrenzten Umfang; sie ersetzen keine produktive Authentifizierungs- oder CSRF-Bibliothek. Automatisierte Beispiele prüfen Wertebereiche und Auswahllisten, getrennte Identitäten, fehlenden/fremden Origin und Auditkennungen einschließlich Zeilenumbrüchen und Längengrenzen. Kein Schema oder Account-Verfahren geändert.

## Verbleibende priorisierte Arbeiten

- Cloud & DevOps besitzt weiterhin den kurzen belegten Einstieg, aber noch keine vollständige Kursfolge. Nächstes Inhaltspaket: reproduzierbarer Build/CI, Container und persistente Daten, Konfiguration/Secrets, Auslieferung, Beobachtbarkeit und kontrollierter Rollback.
- Die früheren drei Lernpfad-Skizzen sind inzwischen vollständig auf verfügbare Kapitel umgestellt (Paket 10).
- Unabhängiges Fachreview sämtlicher Kurse und Fragen bleibt ausstehend. Der dokumentierte Quellenabgleich ist davon getrennt.
- systemd-Beispiele auf einer laufenden Linux-Testumgebung praktisch prüfen. Portable Shellfälle sind lokal getestet; Docker ist vorhanden, aber sein Dienst läuft nicht.
- Felddaten zu Ladezeit, Interaktionszeit und Layoutstabilität erfassen; aus lokalen Funktionsprüfungen keine echten Core-Web-Vitals-Werte ableiten.

## Wiederaufnahme · 24. Oktober 2026

Die wegen des früheren Kontingentlimits unterbliebene GitHub-Sicherung wurde nach erfolgreicher Wiederholungsprüfung abgeschlossen (ee175c6). Öffentlicher SEO-Abgleich: 246 URLs, HTTP 200, passende Indexierungsdaten und bytegleich zum Build; HTTPS-Weiterleitung bestätigt. Der Audit liest den lokalen Stand vor den Netzwerkanfragen vollständig ein und begrenzt die Parallelität auf vier. Die automatische GitHub-Prüfung ergänzt Mindestversion Node 22.22.0 und Node 24 mit Lockdateiinstallation, Tests, Typprüfung, Build, SEO und internen Links. Kein automatischer Produktionsdeploy und keine Produktionszugangsdaten im Workflow.

## Paket 9 · Cloud & DevOps

Acht Kapitel mit 16 Fragen und Aufgaben/Lösungen schließen die bislang fehlende Kursfolge für Cloud/DevOps: Dienstmodelle, Buildartefakte und Lockdateien, CI, Container/Persistenz, Konfiguration/Secrets, SLI/SLO und Monitoring, Rollback/Datenkompatibilität sowie HTTP-Auslieferungsvertrag. 16 Primärbelege am 24.10. gelesen. Alle TypeScript-Listings streng geprüft und lokal ausgeführt; zusätzliche Fälle prüfen Standard-SHA-256-Digest, öffentliche Feldprojektion, leere/ungültige Messungen sowie Status-, Inhaltstyp-, Inhalts- und 404-Fehler. Eine separate CI-Prüfung führt den veröffentlichten Containerbefehl auf Linux aus; lokal wird dieser Fall ohne laufende Docker-Engine ausdrücklich übersprungen. Der erste Qualitätsworkflow (523383f) bestand auf Node 22.22.0 und Node 24.

Lokaler Stand: elf Kurse, 92 Kapitel, 194 Fragen, 155 Quellen, 272 HTML-Seiten und 266 öffentliche Sprachseiten. Kapitel-Suche, Quizfilter und Fortschrittskennungen leiten sich aus denselben Daten ab. Browserprüfung: gerenderte Formel, Kapitelnavigation, Aufgabenlösung, Fragenauswahl und Feedback für eine falsche Antwort mit sämtlichen Erklärungen. Die allgemeine Quellenzeile nennt kein hart codiertes Lesedatum mehr; Fassungen und Termine stehen pro Beleg. Am 24.10.2026 öffentlich veröffentlicht; Nachweis siehe VALIDIERUNG.md.

Container-Verifikation abgeschlossen: GitHub-Run 40041998694 bestand auf Node 22.22.0 und Node 24; der zusätzliche Linux-Job führte den unveränderten veröffentlichten Dockerbefehl mit schreibgeschützter Quelldatei und isoliertem Containernetz aus. Die Ausgabe und der unveränderte Dateiinhalt wurden geprüft. Die lokale Docker-/systemd-Umgebung bleibt davon getrennt.

## Paket 10 · Durchgehende Lernwege und Fortsetzen

Die bisherigen drei Skizzen verweisen jetzt auf tatsächlich verfügbare Kapitel: Website (13 Schritte), APIs/Daten (14) und Systementwurf (10). Ein zentrales zweisprachiges Register bezieht Titel, URLs und Fortschrittskennungen aus den Kursdaten; jeder Schritt erklärt seinen Zweck und jeder Weg nennt ein konkretes Projektergebnis. Keine duplizierten Lektionen oder künstlichen Abschlusskennungen. Kursübersichten und Lernwege bieten den ersten offenen Schritt an; vollständig gelesene Wege bieten eine Wiederholung an. Der Katalog beginnt wieder mit Grundlagen, TypeScript und Web statt einer zufälligen Reihenfolge zuletzt ergänzter Kurse.

Mit einem ausschließlich lokalen simulierten Account geprüft: anfangs 2/13 gelesen, nach Markierung 3/13 und nächster Formularschritt; derselbe Stand in der Web-Kursübersicht 3/8; anschließend 13/13 mit Wiederholung. Der Filter „Nur offene Inhalte“ blendet die vollständig gelesene Webgruppe aus. Englischer Lernweg übernimmt 13/13 und verlinkt englische Kapitel. Dies prüft die Oberfläche und ihre API-Verarbeitung, nicht eine neue echte Neon-Anmeldung. Backend und Schema unverändert.

Kursseiten markieren in der Hauptnavigation nun „Kurse“. Escape aus dem Mobilmenü gibt den Fokus an den Auslöser zurück; Tastaturaktivierung von Start-/Themenankern fokussiert die passende Überschrift ohne zusätzlichen Sprung. Der Sprachlink übernimmt aktuelle Query/Anker auch beim Fokussieren oder Öffnen des Kontextmenüs.

## Paket 11 · Python als vollständige Einsteigerfolge

Acht Kapitel mit 16 erklärten Fragen: Interpreter/venv, Werte, Kontrollfluss, Sammlungen, Funktionen/Verträge, UTF-8/JSON, Module/Tests und ein lesendes Kommandozeilenprojekt zur Lernzeit-Auswertung. 14 offizielle Python-3.12-Belege tatsächlich gelesen. Keine zusätzlichen Pakete. Alle Python-Listings werden durch einen TypeScript-Test auf Syntax und Ausführung geprüft; zusätzliche Eingaben prüfen bool, negative/zu große Minuten, leere und beschädigte Daten, ungültiges UTF-8, fehlende Dateien, --help und unveränderte Eingabedateien. Lokal Python 3.12.6; CI wählt ausdrücklich Python 3.12.

Aktuell zwölf Kurse, 100 Kapitel, 210 Fragen, 169 Quellen; 292 HTML-Seiten/286 öffentliche Sprachseiten. Umfang ist ein abgeschlossener Grundkurs mit Transferprojekt, keine Behauptung einer vollständigen Python-Expertenausbildung.

## Paket 12 · Überschaubare Quizrunden

Standardmäßig zehn Fragen; wählbar sind 5, 10, 20 oder alle passenden Fragen. Optionales Mischen verwendet eine im Link gespeicherte Auswahlkennung: erneutes Laden, Teilen und Sprachwechsel behalten dieselbe Reihenfolge. Antworten und Antwortreihenfolge bleiben unverändert. „Dieselbe Runde wiederholen“ setzt Antworten zurück und behält die Auswahl; eine neue zufällige Runde trifft eine neue Auswahl. Ergebnislisten verlinken bei Fehlern direkt zum passenden Kapitel und zur einzelnen Frage. Filter-/Rundenwechsel starten ausdrücklich neu. Ohne Browser-JavaScript bleiben sämtliche Fragen und Lösungen lesbar.

Geprüft: Grenzen/Leermengen/Einzigartigkeit und unveränderter Fragenpool; fünf gemischte Python-Fragen im Browser vollständig beantwortet, Ergebnis 1/5 und vier korrekte Nachlese-/Wiederholungslinks, Neustart derselben Auswahl und Englisch mit gleicher Frage-ID. Eingangsfragen sind bis zum fertigen Filterzustand verborgen; die zuvor kurz sichtbare unpassende Standardfrage entfällt.

## Paket 13 · Verlässlicher Release-Build

Frischer temporärer Build außerhalb synchronisierter Projektordner, Pflichtdatei-/Konfliktkopien-/Symlinkprüfung, SEO- und Linkaudit vor Upload, öffentlicher bytegenauer Abgleich nach echtem Deploy. Bestehende Account-/Routing-/Bindingkonfiguration bleibt erhalten. Der normale dist-Build wird weder gelöscht noch für den Upload verwendet. Tests prüfen fehlende Dateien, beide Sprachen, Konfliktdateien/-ordner und Symlinks. Dry-Run erfolgreich. Neue Lerninhalte benötigen keine zusätzliche Buildabhängigkeit.

## Paket 14 · Betriebssystemkonzepte

Die bisher überwiegend auf Bedienung ausgerichtete Betriebssystemwelt erhält sechs eigene Kapitel: Prozesse/Zustände, Round Robin, Adressraum/Paging, Nebenläufigkeit/Mutex, Dateisystem/Hardlinks/Persistenz und FIFO-Seitenaustausch als Abschlussprojekt. Acht tatsächlich gelesene OSTEP-1.10-Kapitel; vorhandenen Node-Dateisystembeleg wiederverwendet und um gelesene API-Abschnitte ergänzt. Zwölf neue erklärte Fragen, sechs Aufgaben/Lösungen. Kein echter Scheduler und keine echte Seitentabelle werden verändert. Der Hardlinkversuch läuft tatsächlich in seinem eigenen temporären Ordner.

Alle Listings streng geprüft/ausgeführt. Weitere Fälle prüfen Prozessübergänge, Schedulinggrenzen/Unveränderlichkeit, Adress-/Framegrenzen und fehlende Zuordnung, beide verlorenen Schreibreihenfolgen, Schreiben vor Lesen, leere/wiederholte Referenzen und Belady-Gegenbeispiel (9/10 Misses). Lokal 39 Tests (38 pass/1 Docker-Skip), 120 strikte Dateien, 308 HTML-Seiten/302 öffentliche Sprachseiten und 20.917 interne Verweise. Browser DE/EN: Formel als MathML ohne Renderfehler, Aufgabenlösung und Volltextsuche „Belady“ mit genau passendem Abschlusskapitel. Quellenabgleich ist kein unabhängiges Fachreview.

## Paket 15 · IPv6/Routing und vollständige Themenpläne

Netzwerkkurs nun acht Kapitel: IPv6-Textformen und längstes passendes Routingpräfix ergänzen die bestehende Folge vor dem unveränderten Abschlussprojekt. Vier neue RFC-Belege (4291, 5952, 3849, 5737); CIDR-Beleg um tatsächlich gelesene Weiterleitungsabschnitte ergänzt. Alle vier neuen Fragen erläutern jede Option. Modelle senden keine Pakete und ändern keine Netzkonfiguration. Tests prüfen Kompressionsfehler, volle/komprimierte Formen, Grenzen und Dokumentationsadressen, /0-/25-/32-Auswahl, Reihenfolgeunabhängigkeit, fehlende Routen sowie ungültige, doppelte und ungerichtete Präfixe.

Themenpläne berücksichtigten zuvor nur den ersten Kurs außer LaTeX. Die gemeinsame TopicCurriculum-Komponente gruppiert jetzt sämtliche Kurse nach Stufe: Bei mehreren Folgen native aufklappbare Gruppen, bei einer Folge direkt geöffnet. Python/TypeScript/LaTeX und Betriebssysteme/Linux bleiben damit jeweils sichtbar und vollständig erreichbar. Bestehende Stufenanker bleiben stabil; die Funktion benötigt kein Browser-Skript. Themenbeschreibungen nennen die inzwischen verfügbaren Kurse. Browserprüfung: Python-Gruppe zeigt alle drei Einstiegskapitel; IPv6/Routing in der Kapitelnavigation.

## Paket 16 · Code übernehmen und in Kurskarten fortsetzen

CodeExample.astro stellt Kurs- und Einstiegslistings mit einem gemeinsamen Kopierknopf dar. Die Zwischenablage wird ausschließlich nach Klick beschrieben; Erfolg oder manuelle Alternative werden verständlich gemeldet. Ohne passende Browserfunktion bleibt der Code normal markierbar. Größere Code-/Quizschrift verbessert die mobile Lesbarkeit. Browserprüfung: englischer Code stimmt zeichengetreu mit der geschriebenen Zwischenablage überein.

Kurskarten zeigen angemeldet ihren Kapitelstand und verlinken den ersten ungelesenen Schritt; vollständig gelesene Kurse bieten Wiederholung. Mit lokaler simulierter Session: TypeScript 5/8 → Testkapitel, Web 8/8 → Wiederholung des ersten Kapitels, Zähler sichtbar. Kein neuer tatsächlicher Neon-Accounttest. Suchindexvalidierung weist zusätzlich Backslash- und Steuerzeichen-URLs ab.

Beim öffentlichen Netzwerkrelease trat ein vorübergehender Verbindungsfehler zur HTTP-Weiterleitungsprüfung auf; Veröffentlichung war bereits erfolgt. Ein unabhängiger HTTP-Abruf bestätigte danach Status 308 und das korrekte HTTPS-Ziel. Live-Audits wiederholen Transportfehler/429/5xx jetzt maximal dreimal. Permanente Fehler und falsche Inhalte bleiben Fehler. Ein nach Veröffentlichung fehlgeschlagener Audit bewahrt sein exaktes temporäres Artefakt für gezielte Wiederholung auf. Tests prüfen diese Grenzen.

## Paket 17 · Gezielt geschlossene Abhängigkeitslücken

Der vollständige npm-Audit fand veraltetes Zod in den exakten Pins von @neondatabase/auth und auth-ui sowie Undici in der lokalen Miniflare-Laufzeit. Eng begrenzte Overrides verwenden Zod 4.6.7 in beiden Neon-Paketen und Undici 7.30.1 ausschließlich unter Miniflare. Der separate Undici-8-Zweig von Astro bleibt erhalten. Kein Downgrade von Wrangler, kein npm audit fix --force, keine Auth-/Schema-/RLS-Änderung. Lockdatei aktualisiert; vollständiger Audit meldet null Schwachstellen. Ein bereits vorher vorhandener Better-Auth-Peer-Hinweis wird dadurch nicht als neuer Fehler ausgegeben oder durch sachfremde Versionswechsel verdeckt.

Gelesene Meldungen: [Zod](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5), [Undici EventSource](https://github.com/advisories/GHSA-4qv8-2p9j-2685), [Undici Integrität](https://github.com/advisories/GHSA-f72v-6w45-q472), [Undici Content-Encoding](https://github.com/advisories/GHSA-xjj6-f33q-929c). Diese technischen Abhängigkeitsbelege sind von den 181 Lernquellen getrennt. Eine neue vollständige Anmeldung mit echten Testaccounts bleibt separat offen; lokale UI-Sessions wurden simuliert.

Die erste CI-Prüfung der Sicherheitskorrektur scheiterte unter npm 10 an der verschachtelten Undici-Override-Auflösung. Die Vorgabe ist nun versionsspezifisch (`undici@7.29.1` → `7.30.1`); der Undici-8-Zweig bleibt unverändert. Ein expliziter `npm@10.9.4 ci --dry-run --ignore-scripts` bestätigt die Lockdatei. Erneute lokale Tests, Typprüfung, Build und öffentlicher bytegleicher Audit aller 306 URLs bestanden. Die veröffentlichte Version enthält bereits dieselben korrigierten Bibliotheksversionen; die Folgekorrektur betrifft die reproduzierbare Installation.

## Neues Kontingent · Editorentwürfe und Wiederherstellung

Gesamtanalyse: bestehende Kurse, Navigation und Prüfungen bleiben erhalten; konkrete Lücken sind Entwurfsverlust, fehlende Markdown-/Typst-Kurse und persönliche Quizwiederholung. Erster abgeschlossener Schritt: versionsgebundene lokale Entwürfe pro Aufgabe mit Größen-/Formatprüfung, Sprachparität und verständlicher Speicherfehlerbehandlung. Ersetzen durch Musterlösung oder Vorlage lässt sich unmittelbar rückgängig machen. Keine Serverübertragung oder neue Account-/Schemafunktion. 44 Tests (43 bestanden, ein lokaler Docker-Skip), 129 strikte Dateien ohne Meldungen, Build erfolgreich. Browser bestätigt Reload, DE/EN, beide Rückgängig-Fälle und dauerhaften Reset.

### Markdown-Kurs abgeschlossen

Sechs DE/EN-Kapitel, zwölf erklärte Fragen, sechs neue Primärquellen; unter Programmiersprachen → Auszeichnungs-/Satzsprachen. Struktur, Code, Links/Bilder, GFM-Dialekt, sichere Ausgabe und vollständiges Mini-README. Eigene SVG, keine fremden Bilder. 46 Tests (45 pass, ein lokaler Docker-Skip), 132 strikte Dateien ohne Meldung, 328 HTML-Seiten. Kapitelquiz samt aller Erklärungen im Browser geprüft. Veröffentlichung folgt gebündelt mit Typst.

### Typst-Kurs abgeschlossen

Acht vollständige DE/EN-Kapitel und 16 erklärte Fragen: Einrichtung, Markup, Set/Show, Mathematik, Tabellen/Grafiken, Literatur, Vorlagen und fertiger Bericht. Keine neue Hauptkategorie. Alle acht Dokumente mit Typst 0.15.1 real kompiliert; SVG aus eigenen Bytes und vollständige works.bib, ohne externe Pakete. Rechenwerte und erwartetes Scheitern bei falschem Literaturverweis geprüft; vier repräsentative Ausgaben visuell kontrolliert. Gesamtstand: 15 Kurse, 122 Kapitel, 254 Fragen, 200 Quellen. 47 Tests (46 pass, ein lokaler Docker-Skip), 135 Dateien strikt ohne Meldung, 348 HTML-Seiten. Gemeinsame Navigation/Quiz/Suche/Fortschritt integrieren die stabilen neuen IDs automatisch.

### Persönliche Quiz-Wiederholung und echte Accounts

Aus dem Lernstand direkt offene bzw. bearbeitete, noch nicht richtig beantwortete Fragen üben. Standfilter mit Themen-/Kurs-/Kapitel-/Stufenwahl kombinierbar; DE/EN und URL teilen die Auswahl. Der Pool bleibt während einer Runde stabil, dieselbe Runde bleibt wiederholbar; erst eine neue Runde berücksichtigt neue gespeicherte Ergebnisse. Ohne Account bleiben alle Fragen zugänglich. Leere persönliche Auswahl erklärt den Zustand und bietet alle Fragen derselben fachlichen Auswahl an.

Wiederverwendbarer echter Entwicklungstest mit zwei unabhängigen Accounts einschließlich RLS, ungültigen Anfragen und widerrufenen Sessions erfolgreich. Browser prüfte Anmeldung, Fortschrittszähler und persönlichen Wiederholungsablauf. Details in ACCOUNTS.md. Der bestehende Zustand „mindestens einmal richtig bis zum Entfernen der Markierung“ bleibt erhalten und wird erklärt. Der SQL-/Linux-Praxisabgleich, zusätzliche Aufgaben pro Kurs und ein unabhängiges Inhaltsreview bleiben sinnvolle nächste Pakete.

### Praktische SQL-/Bash-Prüfung und verspätete Fortschrittsantworten

Acht veröffentlichte SQL-Listings gegen eine eigene lokale PostgreSQL-18.6-Instanz ausgeführt. NULL-, Constraint-, Parameter-, Rollback- und Migrationsfälle sowie zwei unabhängige konkurrierende Platzvergaben erfolgreich. EXPLAIN-Lektion korrigiert: Planausgabe und tatsächliche Datenzeile werden getrennt gezeigt. Gelesene PostgreSQL-18-Abschnitte zu Plänen und Isolation am 24. Oktober nachgeführt. Eigener CI-Job verwendet ein festes PostgreSQL-Image.

Bash prüft fünf reale isolierte Beispiele einschließlich Dateirechten, Pipes, eigenem Prozess und Byte-Wiederherstellung; beschädigte Sicherung wird korrekt abgewiesen. Dienstdiagnose wird nur syntaktisch geprüft und bleibt ein reales Benutzer-systemd-Labor. Ein gezielter Clientfehler ist abgesichert: Nach Abmeldung oder Accountwechsel dürfen spät eintreffende Fortschrittsantworten keine alten Daten wieder in den sichtbaren Zustand eintragen. Negativtests prüfen beide Fälle, erfolgreiche Antworten ersetzen nur die passende Inhaltsart/ID.

### Kompaktere Kapitelansicht

Mobile Prüfung mit 390px: Doppelter Kursname und wiederholte Lernzielbeschreibung im Kapitelkopf entfernt; Ziele stehen weiterhin im eigenen Abschnitt. Die Kopfzeile nennt Kapitel X von Y. SEO-Beschreibung bleibt vollständig. Markdown, Typst und LaTeX erhalten dieselbe vorhandene Auszeichnungs-/Satzsprachen-Kennzeichnung. Suchtreffer, Tastaturöffnung, mobile Standfilter, Escape-Fokusrückkehr, MathML, helles Design und fehlendes horizontales Überlaufen geprüft.

Abschluss der Runde: Alle Pakete veröffentlicht, öffentliche Version 323ad148-67c5-4332-87be-8c5244b6ce3b. 56 Tests (55 pass/1 lokaler Docker-Skip), 142 Dateien strikt, 348 HTML-Seiten, 24.009 interne Verweise und 342 öffentliche Sprachseiten geprüft. CI 40085060165 mit Node 22.22/24, PostgreSQL und Docker grün. Konkrete Grenzen und nächste Aufgaben stehen in VALIDIERUNG.md, BEISPIELTESTS.md und AUSBAU.md.

## Kursübungen und Quellenorientierung · 24. Oktober 2026

13 neue vollständige Editor-Aufgaben ergänzen die zehn bisherigen Themeneditoren. Jede besitzt DE/EN-Routen, feste Lernziele, begrenztes akzeptiertes Format, berechnete Ausgabe, Hinweis, Musterlösung und Quellenkarten. Verknüpfung mit Kurs, Kapitel, Themenwelt, Suche, Sitemap und strukturierten Daten. Katalog mit Text-/Themen-/Kurs-/Stufenfilter, URL-Abgleich, Leerzustand und Reset. Stabile bisherige IDs und Entwurfsschlüssel bleiben erhalten; KI und LaTeX werden inhaltlich nicht erweitert.

204 Quellen sind nun über Text, Abschnitt, Version, Themenwelt und Herausgeber auffindbar. Themenzuordnung aus tatsächlichen Inhaltsverweisen; keine manuelle zweite Belegliste. Filter und Sprachwechsel synchron. Die Prüfung der Zuordnungen bleibt beim statischen Seitenaufbau; der Browser lädt nur die kleine Filterlogik.

Weitere sinnvolle Aufgaben bleiben: mehrere abgestufte Übungen je Kapitel, umfangreichere Abschlussprojekte, echtes systemd-Benutzerlabor, unabhängiges Fachreview und assistive Nutzerprüfung. Der Editor bleibt ein lokales begrenztes Lernmodell; Ergebnisse sind kein Ausführungsnachweis vollständiger Programme.

Die globale Suche findet jetzt auch sämtliche 204 Quellen über Titel, Herausgeber, Fassung und Abschnitt. Ein Treffer führt zur passenden Quellenkarte mit sichtbarem Belegstand; Quellen lassen sich als eigener Inhaltstyp auswählen. Aufgaben werden zusätzlich über ihre Hilfen und stabilen Begriffe gefunden. Quellenmetadaten sind auf Desktop und Mobilgeräten größer gesetzt.
