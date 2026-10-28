# Validierung

## Sprachkurse und Kurs-/Übungsstruktur · 28. Oktober 2026

**Lokal verifiziert; Veröffentlichung dieses Pakets noch ausstehend.** Vier neue DE/EN-Kurse Java, C/C++, Go und Rust: 24 Kapitel mit vollständigen Listings, Aufgaben/Lösungen und 48 erklärten Fragen, 33 neue gelesene Primärquellen. Gesamt 22 Kurse/169 Kapitel/348 Fragen/272 Quellen. Kein Anspruch auf vollständige Sprachreferenzen. Vier geführte Lernwege, gruppierter Kurskatalog und einheitliche Übersicht über 195 vorhandene Aufgaben/Projekte; alle 30 Textsatz-Kapitelaufgaben als externe Dokumentaufgaben. Bestehende URLs/IDs, Konten und Lernstände erhalten; keine Migration oder neue Website-Abhängigkeit.

114 Tests: 106 bestanden, acht optionale lokale Laufzeit-Skips. Die fünf neuen Sprachcompilergruppen liefen ohne Skip: Ziel Java 21 auf JDK 26, Clang 21 C17/C++20 mit Warnungen als Fehler und ASan/UBSan, Go 1.27.3 sowie Rust 1.99.1/Edition 2024. Exakte veröffentlichte Listings, CLI-Ergebnis-/Format-/Negativ-/Überlaufverträge und absichtlich abgewiesene Rust-Borrows/Moves bzw. C++-Besitzkopie geprüft. Testverträge stammen aus Eingabe-/Ausgaberegeln. Neuer verpflichtender nativer CI-Job ergänzt; dessen öffentlicher Nachweis folgt erst nach Push.

Check: 233 Dateien ohne Fehler/Warnungen/Hinweise. Build: 518 Seiten. Release-Dry-Run: 512 kanonische Sprachseiten und 37.325 interne Links/Assets/Anker erfolgreich. Kein gesondertes Lint-Skript. Readiness für Start/Quiz/Quellen und DE/EN-HTTP-404 erfolgreich.

Browser: Nachladen 18→36 mit Fokus auf dem ersten neuen Treffer; alle Filter kombiniert, widersprüchlicher Kurs zurückgesetzt, Leerzustand/Reset, URL-/Sprachzustand, Kursgruppen und Suche. Aufgabenklassifikation im Browser entdeckt und korrigiert, danach beide Sprachen mit 30 Dokumentaufgaben bestätigt. Neuer 14-Schritte-Lernpfad, alle vier Sprachfamilien, kopierbare Startbefehle, Aufgaben-/Lösungsanzeige und Quellenlinks. Rust-Quiz falsch/richtig, jede Antworterklärung, Abschluss 1/2, gezielte Wiederholung und Neustart; englische Java-Antwort samt Erklärungen. Globale Suche findet ParseIntError aus dem Aufgabentext und navigiert per Enter zum richtigen Kapitel. Tatsächlich 390px/1280px, beide Designs, Mobilmenü/Escape und Codeblöcke ohne Seitenüberlauf geprüft. Keine native mobile Plattform oder unabhängige assistive Prüfung behauptet.

Bestehende lokale Cloudflare-Anmeldung erneuert. Account, maki26-Subdomain, workers.dev-Status und vier Bindings vor Release gesichert; Nachvergleich nach Veröffentlichung ausstehend. Aktueller Release-/CI-/Commitstand verbindlich in PROGRESS.md. Externe Fach-/assistive Prüfung und kontrollierter tatsächlicher Reset-Mailempfang bleiben offen.


## Praxisprojekte, Schreibtrainer, Dokumentprüfung und Glossar · 27. Oktober 2026

**Veröffentlicht:** Quellcommit `059ac2a5d7c087416e22c316cb75b8132f07a7e8` auf `codex/cloudstand-lokal`. GitHub-[Quality 40426819774](https://github.com/manuelk2607/IT-Worlds/actions/runs/40426819774) mit allen sechs Jobs erfolgreich: Node 22.22/24, PostgreSQL, Container, Godot und echtes Linux/systemd. Cloudflare am 27.10.2026 um 09:40:45 Europe/Stockholm: Version `87c9d6fa-9ff0-49df-8a0a-4ed9fa85ac9b`, Deployment `1b1928b0-e1d5-4a12-8dd8-1213622e1c84`, 100 % Traffic unter [IT-Worlds](https://it-worlds.maki26.workers.dev/).

Drei vollständige lokale Praxisprojekte (mehrseitiger TypeScript-Katalog, SQL-Lernbericht, echte HTTP-Vertragsabnahme) mit DE/EN-Anleitungen, Abnahme, Transfer, Quelldateien und bytegeprüften ZIPs. Zwölf Trainerstufen mit eigenen zusammenhängenden DE/EN-Texten, Textfortschritt, Endfehlern und erhaltenen lokalen Ergebnissen. Dokumentprüfung trennt Literatur-/Markenziele und bietet für alle 31 vorhandenen Profile explizite Selbstprüfrubriken mit bewusster bestehender Kapitelmarkierung. 15 quellengebundene Glossarbegriffe, kombinierte Filter, Kurslinks und globale Suche; Beschreibungen/Lernziele sind nun suchbar. Same-Page-Suchtreffer schließen das Modal und fokussieren das Ziel. Keine neuen Website-Abhängigkeiten, Fortschritts-IDs, Migrationen, Compiler- oder Speicherdienste.

Lokal: 103 Tests (95 bestanden/8 optionale Laufzeit-Skips); check 221 Dateien ohne Meldungen; Build 452 HTML-Seiten; Release-Dry-Run mit 446 kanonischen Sprachseiten und 31.891 internen Links/Assets/Ankern. Kein gesondertes Lint-Skript. SQL-Projekt separat wirklich unter PostgreSQL 18 in eigenem netzlosen Container erfolgreich ausgeführt; anschließend keine öffentlichen Tabellen, eigener Container automatisch entfernt, bestehender postgres:15 unverändert. Frisch entpackter Webprojekt-ZIP mit eigener Installation, Build und 3/3 Tests erfolgreich. HTTP-Prüfer samt echten Negativfällen und CLI-Exitcodes 0/1/2 geprüft. Alle drei Archive entsprechen exakt ihren gepflegten Quellen.

Zwei vorhandene development-Konten/Sessions prüfen alle drei neuen Textlektionen in DE/EN mit identischen Servertexten, privater Konto-Historie und Nichtaufnahme der Übungsrunden in die Rangliste. Der gesamte bestehende 60-Sekunden-/Replay-/Timing-/Origin-/RLS-/Sichtbarkeits-/Widerrufstest besteht ebenfalls. Keine menschliche Tippleistung aus automatischen Eingaben behauptet. Keine Testaccounts oder Testläufe in Produktion angelegt.

Browser lokal: Trainer-Endfehler/Abschluss/Reset/Historie/Sprachtrennung; korrigiertes Unicode-Replay; Dokumentdiagnosen/Selbstprüfung/Musterlösung/Reset; tatsächlicher Webkatalog mit Filtern/Lesezeichen/Detail/Reload/Leermenge/Fokus. Glossar DE/EN, Quellenmetadaten, URL-/Sprachzustand, Tastatur-Suchsprung. Glossar und drei Projektanleitungen in schmalem 390px-iframe-Ansichtsbereich ohne Seitenüberlauf, hell/dunkel; der native Browser-Viewport-Override wurde nicht übernommen und nicht als Nachweis benutzt.

Der erste sofortige öffentliche HTML-Nachvergleich meldete eine abweichende Startseite. Nach erneuter Prüfung stimmen **alle 446 öffentlichen Seiten mit exakt demselben erhaltenen Releaseartefakt** überein. Kein erneuter Deploy oder veränderter Vergleichsbuild. Alle drei öffentlichen ZIPs ebenfalls bytegleich. Readiness Start/Quiz/Quellen erfolgreich; Auth-Session200, Gastfortschritt/Trainerkonto401, öffentliche Rangliste200/no-store, beide fehlenden Sprachrouten404. Account, Subdomain, workers.dev/Preview-Status, Einstellungen und vier Bindings vor/nach identisch.

Öffentlicher Browser: Glossarfilter und Sprachzustand, globale Suche/Enter/Sprungziel mit geschlossenem Dialog; Typst-Beispiel mit positionsbezogenem Fehler/Warnung, klarer statischer Prüfgrenze und 0/4 bewussten Selbstprüfkriterien; neue englische Absatzlektion mit Voraussetzung und 408 Zielzeichen; alle drei Projektkarten im Lernstart. Belegbild im privaten Aufgabenworkspace gesichert.

Offen bleiben unabhängiges Fach-/assistives Review, Lernenden-Erprobung und kontrollierter tatsächlicher Passwort-Reset-Mailempfang. PDF-Vorschau bleibt eine bedarfsabhängige P2-Erweiterung unter den Sicherheits-/Kosten-/Wartungsbedingungen; tatsächliche Kompilierung und PDF-Kontrolle finden extern statt. Aktueller fortsetzbarer Aufgabenstand: [PROGRESS.md](../PROGRESS.md).

## P1-Abschluss · 25. Oktober 2026

85 Unit-/Inhaltstests: 78 bestanden, sieben lokale Laufzeit-Skips. Strikte Prüfung: 196 Dateien ohne Meldungen; Build 444 HTML-Seiten. Dry-Run: 438 kanonische Sprachseiten und 31.730 interne Links/Assets/Anker erfolgreich. Kein eigenes Lint-Skript vorhanden. GitHub Quality [40215505510](https://github.com/manuelk2607/IT-Worlds/actions/runs/40215505510): alle sechs Jobs erfolgreich, einschließlich Node 22/24, Docker, SQL, echtem Godot und Linux/systemd.

Godot zusätzlich lokal 2/2: Archiv bytegleich, echte Bewegung/Kollision/Kontakt/Punkte/Abschluss/fünf Neustarts. Gefundenen Neustartfehler korrigiert. Das Linux/systemd-Labor erzeugt ausschließlich eine eigene zufällige Benutzer-Unit, prüft Exit 17, Result und Journal und bereinigt sie; eigener CI-Schritt bestätigt keine verbliebenen Units.

`test:development` vollständig erfolgreich: zwei echte Konten/Sessions und bestehender Fortschritt/RLS; Ranking mit echter 61-Sekunden-Wartezeit, DE/EN-Protokollreplays, Serverwertung, fremden/frühen/Burst-/doppelten/konkurrierenden Abgaben, atomarer Startbegrenzung, allen Ranglistenfiltern, fester öffentlicher Projektion, Opt-in/out und widerrufener Session. Erzeugte Replays sind kein Nachweis menschlichen Tippens. Reset-Negativtests bestehen; tatsächlicher Mailempfang und erfolgreicher Mail-Reset bleiben offen.

Browser: echte Entwicklungssession, Kontohistorie/Speicherung, Profil und Ranglistenabbruch; lokale Endwerte/Reset, privater eigener Text; DE/EN/hell/dunkel, 390px ohne Überlauf, Mobilmenü/Escape/Fokus, Hardware-Gatter/CPU/Reset, Spiele-Buttons/Pfeile/Reset, Linux-Labor und beide 404. Bestehende Container unverändert.

Migration 002 mit unveränderter Prüfsumme nach development-Audit auf main angewendet; alte Migration und 13 bestehende Fortschrittszeilen nicht bearbeitet. Beide neuen Tabellen erzwingen RLS; Produktionsruntime ohne BYPASSRLS und ohne Kontext keine privaten Daten. Nach Freigabe weiterhin 13 Fortschrittszeilen und keine Testprofile/-läufe auf main.

**Öffentlich veröffentlicht am 25.10.2026 22:56:18 Europe/Stockholm:** Quellcommit `9ccd793ed3ccc04d9a718abaa4d7b338d76e98b2`, Quality [40237691162](https://github.com/manuelk2607/IT-Worlds/actions/runs/40237691162) mit allen sechs Jobs erfolgreich. Version `7f5d4d27-b4c3-4353-ac77-8161225c44a3`, Deployment `0fc157cf-8e24-4ca1-b650-4c989e4a95f8`, 100 % Traffic unter [IT-Worlds](https://it-worlds.maki26.workers.dev/). Alle 438 öffentlichen Sprachseiten stimmen mit dem Release-Build überein.

Öffentlicher Browser: DE/EN-Rangliste lädt mit verständlichem Leerzustand; Ranked-Start ohne Konto fordert Anmeldung. Private Konto-/Fortschritts-APIs 401, öffentliche Rangliste 200/no-store, Auth-Session 200, beide unbekannten Sprachrouten 404. Keine Produktionstestkonten angelegt. CF-Account/Subdomain/workers.dev/Preview-Status, Compatibility-Datum/-Flags, Usage-Modell, Placement, Tags, Tail Consumers, Logpush und vier Bindings vor/nach identisch. Eigenes Linux-Experimentimage entfernt, bestehender PostgreSQL-Container unverändert.

Extern offen: unabhängiges Fach-/assistives Review und kontrolliertes Reset-Postfach. Details: [P1-PRUEFUNGEN.md](P1-PRUEFUNGEN.md).

## Schlanke Dokumentprüfung · 25. Oktober 2026 · Releaseprüfung

Externe Bearbeitung/PDF-Kompilierung in Overleaf und typst.app; lokale sichere Einzeldatei-/ZIP-Prüfung, 30 Kapitelprofile plus bestehende Typst-Verweisaufgabe, Fundstellen/Erklärungen und bewusst bestätigter vorhandener Kapitel-Lernfortschritt. Eigene Compilerinfrastruktur/API/zusätzlicher CI-Job entfernt. Keine neuen Abhängigkeiten, Secrets, Dienste oder Datenbankmigration. Vorheriges ungeprüftes Ranglistenbackend deaktiviert; lokale Übungen erhalten.

83 Tests: 78 bestanden, fünf optionale lokale Laufzeittests (Docker, PostgreSQL und Typst-CLI) übersprungen. Strikte Typprüfung: 191 Dateien ohne Fehler/Warnungen/Hinweise. Build: 444 HTML-Seiten. Release-Dry-Run: 438 kanonische Sprachseiten, 31.728 interne Links/Assets/Anker, keine Synchronisationskopien. Aktuelle Quellen mit GitHub abgeglichen; Cloudflare-Anmeldung erfolgreich erneuert. Vorhandener Account ec3c070d8e4f88d2fc533d7d797f2daa, Subdomain maki26, Worker it-worlds und vier Bindings vorab gelesen; keine Compiler-Secrets vorhanden.

Browser lokal: echte LaTeX- und Typst-Mehrdatei-ZIPs über den nativen Dateidialog, Hauptdatei, erreichbare Teilquellen, Aufgabenmerkmale und Quellsprung. Fehlerhafte .tex- und .typ-Dateien liefern konkrete Diagnosen; ZIP mit ../-Pfad wird abgewiesen. Quellenansicht schreibgeschützt, kein Compilerbutton, genau eine passende Fortschrittskontrolle. Entfernen leert Quellen/Ergebnisse/Fortschrittspanels. DE/EN-Wechsel, hell/dunkel, Mobilmenü/Escape sowie 390px ohne horizontalen Seitenüberlauf geprüft. Die erhaltene Typst-Verweisübung bietet externen Editor, Vorlage, Hinweis, Lösung und Quellenimport ohne eigenen Editor. Kein neuer echter Accounttest in diesem Durchlauf; Kapitel-IDs/API-Verträge werden automatisiert geprüft, Datenmodell und Auth bleiben unverändert. HTTP: neue Routen 200, beide unbekannten Sprachrouten 404, ungeprüfte Ranking-API 503 ohne DB-Zugriff.

**Tatsächlich veröffentlicht am 25.10.2026, 10:11:42 Europe/Stockholm:** Quellcommit `4b902cd482e02c6c4f145a4caff7add5cabfec54` auf `codex/cloudstand-lokal` gepusht. GitHub-[Quality-Run 40179580624](https://github.com/manuelk2607/IT-Worlds/actions/runs/40179580624) erfolgreich. Worker-Version `677144d2-3d90-413b-bc98-35b955122f8e`, Deployment `1475cda0-30b8-47ed-bd46-49669f2662f0`, 100 % Traffic unter [IT-Worlds](https://it-worlds.maki26.workers.dev/). Der Release-Audit bestätigt alle 438 öffentlichen Sprachseiten bytegleich zum Build. Vereinzelte Asset-Übertragungsfehler wurden vom Upload erfolgreich wiederholt; es blieb kein fehlgeschlagener Deploy zurück.

Account-Subdomain, workers.dev-Aktivierung, deaktivierte Preview-URLs, Compatibility-Datum/-Flags, Usage-Modell, Placement, Tags, Tail Consumers, Logpush und die vier bestehenden Bindings nachher erneut ausgelesen und mit dem Vorabstand identisch verglichen. Keine neuen Compiler-Secrets oder sonstigen Dienste. Auth-Session-Endpunkt öffentlich 200, Gastfortschritt 401, deaktiviertes Ranking 503, entfernter Compiler-Status-Endpunkt 404. Beide Sprachvarianten unbekannter Routen liefern 404.

Öffentlicher Browser: LaTeX-Kursbeispiel mit vier Aufgabenmerkmalen und null Befunden geprüft; echtes zweidateiliges Typst-ZIP importiert, Hauptdatei ausgewählt, beide Quelldateien und drei Aufgabenmerkmale korrekt erkannt, null Befunde. Beide verweisen zur Kompilierung ausschließlich auf den passenden externen Editor. Keine öffentlich behauptete Vollsyntaxprüfung, automatische Benotung oder PDF-Erzeugung. Screenshot-Nachweise liegen im Aufgabenworkspace unter `work/document-check-public.png` und `work/document-check-public-typst.png`.

Die folgenden Abschnitte dokumentieren frühere Zustände und sind keine Beschreibung der aktuellen Architektur.

## Lokale Textsatz-Erweiterung · 25. Oktober 2026 · nicht veröffentlicht

Typst 16 Kapitel/32 Fragen, LaTeX 14/28; insgesamt 13 Themen, 18 Kurse, 145 Kapitel, 300 Quizfragen, 238 Quellen. Gemeinsame DE/EN-Projektprüfung, Einzeldateien/ZIP, explizite Hauptdatei, statische Befunde mit Positionen und getrennte Kompilierung. Neues eigenes Compilerimage; keine bestehenden Container verändert. Echte Kompilierung aller 30 LaTeX-/Typst-Beispiele inklusive Literatur/Biber erfolgreich. Zusätzlich fehlerhafte Syntax, fehlende Pakete, ausbrechender Typst-Pfad, Endlosschleife und tatsächlich deaktiviertes TeX-Shell-Escape geprüft. Privater Dienst: Bearer-Pflicht, ungültige Projekte abgewiesen, gültiges PDF/PNG; automatische Löschung eigener verwaister Jobs geprüft. Sieben separate Compiler-/Diensttests bestanden. Neue CI-Prüfung vorbereitet, noch nicht auf GitHub ausgeführt.

Lokaler Browser: Typst-Kursbeispiel übernommen, echte Kompilierung mit PDF-Download und PNG-Vorschau; mehrteilige Dateiauswahl und ZIP auf Englisch bei 390px, richtige Hauptdatei und zwei Dateien ohne falsche Referenzwarnung erkannt. Fehlerpositionen springen zur Quellstelle; Designwechsel und mobiles Menü mit Escape-Fokusrückkehr geprüft. Weitere abschließende Browserprüfungen und allgemeiner Teststand stehen im Abschlussprotokoll in DOKUMENTPRUEFUNG.md.

Serieller Build: 444 HTML-Seiten. Release-Dry-Run erfolgreich: 438 öffentliche Sprachseiten mit SEO/Sprachbezügen und 31.602 interne Links/Assets/Anker geprüft; Wrangler-Dry-Run bestanden. Sechs ältere Sprunglinks zeigten auf nicht vorhandene Übungseditoren in den neuen Themenwelten; sie führen jetzt zum vorhandenen Labor. Der frühere parallele Buildfehler wurde im aktuellen seriellen Ablauf nicht reproduziert. Das ersetzt nicht die offenen Ranking-/RLS-/Godot-Prüfungen des vorherigen Arbeitsauftrags.

Kein Deploy, kein GitHub-Push, keine Produktionsmigration, kein öffentlich eingerichteter Compilerhost. Ohne zusätzliche Compiler-Secrets bleibt die lokale Analyse nutzbar, eine echte öffentliche Kompilierung ist nicht verfügbar. Einzelheiten, Sicherheits- und Hostinggrenzen: [DOKUMENTPRUEFUNG.md](DOKUMENTPRUEFUNG.md). Die früheren öffentlichen Nachweise unten bleiben unverändert.

## Aktuelle Entwicklungsrunde · Kursübungen und Quellenorientierung

**Veröffentlicht und öffentlich geprüft:** Quellstand **25cf8eb**, Worker-Version **b54243e9-3627-496e-a8f4-66c0c378638f**, Deployment **513face4-f18e-43cb-9be9-04b6c0ebe106**, 24.10.2026 **15:53:22 Europe/Stockholm**, 100 % Traffic. Vorhandener Nutzercommit 43a48e5 erhalten. Drei abgeschlossene Pakete: 19ea45e (13 zusätzliche Kursaufgaben und Katalog), 8bfd4ac (Quellenfilter), 25cf8eb (globale Quellensuche und lesbarere Belegstände).

15 Kurse, 122 Kapitel, 254 erklärte Quizfragen, **23 Editor-Aufgaben und 204 Primärquellen**. 64 Tests mit vorhandenem Typst 0.15.1: **60 erfolgreich, vier lokale SQL-/Dockerfälle ohne Laufzeit übersprungen**. Ohne den expliziten Typst-Pfad wird zusätzlich der Compilerfall übersprungen. 156 Dateien strikt ohne Fehler/Warnungen/Hinweise. `npm test`, `npm run check`, `npm run build` und `npm run deploy:check` ausgeführt. GitHub-Run **40100011712** bestätigt Node 22.22.0, Node 24, die vorhandenen echten PostgreSQL-Beispiele und das Dockerbeispiel erfolgreich.

374 HTML-Seiten und **25.207 interne Verweise** geprüft. Sämtliche **368 öffentlichen Sprachseiten** stimmen bytegleich mit dem separat gebauten Deployment-Artefakt überein. Sitemap, robots, eindeutige Titel, Beschreibungen, Canonicals, Sprachalternativen, strukturierte Daten, Vorschaubilder und HTTP-zu-HTTPS geprüft. Beide unbekannten Sprachrouten liefern HTTP 404 samt passender Fehlerseite. Lokale Wrangler-Anmeldung, Account, Subdomain, Worker-Einstellungen und alle vier vorhandenen Bindings vorher/nachher bestätigt. Keine Produktionsdatenbank, Authkonfiguration oder Geheimnisse geändert.

Browser: alle 13 neuen Aufgaben mit ihren Lösungen auf Deutsch geprüft, sieben System-/Betriebsaufgaben zusätzlich Englisch. Starterfehler, alternative Eingaben und Format-/Typfehler automatisch geprüft. Neue Entwürfe sind getrennt gespeichert und bleiben bei Sprachwechsel erhalten; Reset und Undo funktionieren. Kurs-/Themen-/Stufenfilter einschließlich widersprüchlicher Kursauswahl, Leerzustand und Reset; Quellensuche nach Titel/Abschnitt/Version, Themenwelt und Herausgeber; Sprachwechsel erhält Filter. Globale Suche findet Quellen, führt per Enter zur richtigen Karte und findet Aufgabenbegriffe. Belegstand mit Ausgabe, Abschnitt und Lesedatum ausklappbar. Quellenmetadaten haben auch mobil 13,6 px statt unter 11 px.

Öffentlich zusätzlich: TypeScript-Aufgabe gelöst, globale deutsche/englische Suche und Quellenfilter bedient, Kapitelquiz mit richtiger und falscher Antwort samt Erklärung jeder Option, Ergebnis 1/2 und Neustart auf 0/2. Mobilmenü sowie 390px- und 1280px-Darstellung in hell/dunkel ohne horizontales Überlaufen. Belegbild der veröffentlichten Übungsübersicht lokal gesichert; temporärer Browser-Viewport zurückgesetzt. Eigener lokaler Worker-Testserver beendet.

Im lokalen `dist/` wurden nummerierte Ordnerkopien und fehlende erwartete Pfade beobachtet. Außerhalb des Arbeitsordners erzeugte Artefakte waren korrekt. Die Ursache dieser lokalen Umbenennung ist nicht abschließend geklärt. Browser und Release wurden deshalb mit isolierten Artefakten geprüft; `scripts/release.ts` verwendet diese bereits. Die Quelldateien und veröffentlichten Assets sind intakt.

Offen: weitere abgestufte Aufgaben je Kapitel, größere Abschlussprojekte, echtes systemd-Benutzerlabor, unabhängiges Fachreview, assistive Nutzerprüfung/Feldmessungen und kontrollierter Mail-/Passwort-Reset-Test. Editorprüfungen bleiben begrenzte lokale Lernmodelle. KI und LaTeX wurden inhaltlich nicht weiter ausgebaut.

## Vorheriger Abschluss · 24. Oktober 2026, 12:15

**Veröffentlicht und geprüft:** Quellstand b0c60b5, Worker-Version 323ad148-67c5-4332-87be-8c5244b6ce3b, Deployment c7901b38-a832-4334-bedb-7bed78e6a48d, 24.10.2026 12:15 Europe/Stockholm, 100 % Traffic. 15 Kurse, 122 Kapitel, 254 erklärte Fragen und 200 Primärquellen. 56 lokale Tests: 55 erfolgreich, ein Dockerfall ohne lokale Engine übersprungen. 142 Dateien strikt ohne Fehler/Warnungen/Hinweise. Build: 348 HTML-Seiten; 24.009 interne Verweise. Dry-Run erfolgreich. GitHub-Run 40085060165: Node 22.22/24, echte PostgreSQL-Beispiele und echtes Dockerbeispiel jeweils erfolgreich.

342 öffentliche Sprachseiten stimmen bytegleich mit genau dem ausgelieferten Artefakt überein; Sitemap, robots, Metadaten, Sprachen, strukturierte Daten und Vorschaubilder geprüft. Der erste Abschlussabruf scheiterte an einer vorübergehenden Netzwerkverbindung; Wiederholung desselben erhaltenen Artefakts mit IPv4-Priorität erfolgreich. HTTP leitet mit 308 nach HTTPS. Account, Subdomain, Worker-Einstellungen und sämtliche vier Bindings vorher/nachher unverändert bestätigt. Kein Produktionsschema und keine Authkonfiguration geändert.

Öffentlicher Browser: korrigiertes SQL-Listing, Kapitelposition 7/8, neues Markdown-Quiz mit sämtlichen Erklärungen und Gastzugang, deutsche/englische Fehlerseiten und Kurskatalog bestätigt. Mobil mit 390px: persönliche Standfilter, Tastatursuche nach Typst-Literatur, Escape-Fokusrückkehr, MathML und helles Design ohne horizontales Überlaufen. Kompakter Kapitelkopf behält die vollständige SEO-Beschreibung.

Echte Zwei-Account-/RLS-/Widerrufsprüfung auf development erfolgreich. Ein neuer Typst-Kapitelstand wurde im Browser gespeichert und nach DE/EN-Wechsel wiederhergestellt. Das Entfernen erhielt einmal während lokaler Worker-Neuladungen HTTP 503; die Oberfläche zeigte den Fehler und behielt den bestätigten Stand. Der erneute Versuch speicherte erfolgreich. Testmarkierung entfernt, Browser-Testkonto abgemeldet; eigene Testserver und die ausschließlich lokale PostgreSQL-Testinstanz beendet. Zwei eigene Testaccounts bleiben in development mit privater lokaler Zugangsdaten-Datei.

Offen: unabhängiges Fachreview, reale assistive Nutzerprüfung/Feldmessungen, Benutzer-systemd-Labor, weitere Aufgaben je Kurs und kontrollierter Mail-/Passwort-Reset-Test. Historische Paketstände folgen mit ihren damaligen Grenzen.

## Vorheriger Releaseprüfstand · 24. Oktober 2026, 02:45

13 Kurse, 108 Kapitel, 226 erklärte Fragen und 181 Lernquellen. 41 lokale Tests: 40 bestanden, Container lokal ohne Engine übersprungen. 127 Dateien strikt ohne Meldungen; Build 312 HTML-Seiten; 21.515 interne Verweise. Alle 306 öffentlichen URLs nach Wiederaufnahme erneut bytegleich, indexierbar und mit passenden Sprach-/SEO-Daten bestätigt. Deployment-Vorschau und vollständiger npm-Audit erfolgreich (null Schwachstellen). npm 10.9.4 prüft die Lockdatei; GitHub-Run 40076879059 besteht tatsächlich auf Node 22.22.0 und 24 sowie mit dem veröffentlichten Dockerbefehl auf Linux.

Öffentliche Version 3c3a56d6-38ed-4cbd-b3ed-d35611997784, Deployment f72fbf6c-04c5-44ff-89a7-b476a29b6cd1, 24.10.2026 02:45:22 Europe/Stockholm, 100 % Traffic. Account, Subdomain, Einstellungen und vier Bindings unverändert bestätigt. Die nachfolgende npm-10-Korrektur 3c3b565 verändert die Installationsauflösung, keine ausgelieferten Bibliotheksversionen.

Öffentlicher Browser: englische Codekopie zeichengetreu, IPv6-Direktquiz mit synchronem Thema/Kapitel/Stufe, richtige/falsche Antwort und alle Erklärungen, Ergebnis 1/2, Nachlese-/Wiederholungslinks und Neustart. Mobilmenü schließt per Escape und gibt den Fokus zurück; Katalog zeigt 13 Kurse ohne horizontales Überlaufen. Gastsession HTTP 200, persönlicher Fortschritt ohne Session HTTP 401; beide fehlenden Sprachrouten HTTP 404. Eine neue echte Anmeldung mit getrennten Nutzern, unabhängiges Fachreview, assistive Nutzerprüfung und Feldmessungen bleiben offen.

Die folgenden Abschnitte dokumentieren frühere Paketprüfstände.


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

38 Tests: 37 bestanden, ein lokaler Docker-Fall übersprungen; 117 Dateien strikt ohne Meldungen. Neues Release-Artefakt enthält 372 Dateien, keine Synchronisationskopien. Der isolierte Dry-Run prüft 292 HTML-Seiten, 286 öffentliche URLs und 19.863 interne Verweise; Wrangler erhält die temporären Assets unter Beibehaltung der vorhandenen Konfiguration. Erster echter Deploy über das neue Hilfsskript am 24.10.2026 02:27:10 Europe/Stockholm erfolgreich: Version 5d728fc5-edbd-4340-a4f9-ba69093ff6ec, Deployment 4b19a9b4-f738-4d41-9642-6585fc812b07, 100 % Traffic. Öffentlicher bytegleicher Audit aller 302 URLs erfolgreich. Account/Subdomain und sämtliche bestehenden Einstellungen/vier Bindings erhalten. Temporärer Artefaktordner anschließend entfernt.

## Betriebssystemkurs · lokaler Folgestand

39 Tests: 38 bestanden, lokaler Docker-Fall übersprungen; alle neuen OS-Listings streng typgeprüft und ausgeführt, Hardlinks real geprüft. 120 Dateien strikt ohne Meldungen; 308 HTML-Seiten, 302 öffentliche Sprachseiten, 20.917 interne Verweise. Quellenabschnitte und tatsächlich gelesene Onlinefassungen abgeglichen. Browser: DE/EN, aufklappbare Lösung, gerenderte MathML-Formel und Volltextsuche. Öffentlich veröffentlicht mit dem neuen Releaseablauf; Nachweis direkt darüber. GitHub-Run 40045017232 erfolgreich, einschließlich Container auf Linux.

## IPv6/Routing und Themenpläne · 24. Oktober 2026

40 Tests: 39 bestanden, lokaler Docker-Fall übersprungen. 123 Dateien strikt ohne Meldungen. 312 HTML-Seiten, 306 öffentliche Sprachseiten, 21.299 interne Verweise; isolierter Dry-Run erfolgreich. Browser: Python-Kapitel in mehrkursigem Themenplan, IPv6-/Routingnavigation, englische Betriebssystem-/Linux-Gruppen mobil ohne horizontales Überlaufen. GitHub-Run 40045578991 erfolgreich. Öffentlich veröffentlicht: Version 5e807d42-7989-4082-a4df-e711a6bec061. Der direkt anschließende öffentliche Audit brach beim HTTP-Verbindungsaufbau ab; der spätere unabhängige Abruf bestätigte 308 und das korrekte HTTPS-Ziel. Der nächste Release-Audit umfasst den vollständigen aktuellen Stand.

## Codekomfort und robuste Audits · lokaler Folgestand

41 Tests: 40 bestanden, lokaler Docker-Fall übersprungen; 127 strikte Dateien ohne Meldungen. Browser: Kopierstatus und zeichengetreuer englischer Zwischenablageinhalt; Kurskarten mit simuliertem Account 5/8 und 8/8 samt korrekten Fortsetzen-/Wiederholungszielen. Eigene Code- und Nutzerdateien bleiben erhalten.

## Release 24. Oktober · Markdown/Typst und Editorentwürfe

Quellstand `59c837c`, GitHub-Quality auf Node 22.22 und 24 sowie Containerprüfung erfolgreich (Run 40080918164). 47 lokale Tests: 46 erfolgreich, ein Dockerfall lokal ohne Engine übersprungen; 135 Dateien strikt ohne Meldung. 348 HTML-Seiten, 342 öffentliche Sprachseiten und 24.003 interne Links/Assets/Anker geprüft. Acht Typst-Dokumente tatsächlich mit 0.15.1 kompiliert; Markdown-Listings gerendert und enthaltenes TypeScript ausgeführt. `deploy:check` und tatsächlicher Release erfolgreich. Öffentliche Version `ae669219-257f-407a-8f71-c264a9694810`; alle 342 Crawlerantworten entsprechen dem Build. Account, Workers-Subdomain, Bindings und Einstellungen vorher/nachher identisch. Öffentliche Typst-Kursübersicht im Browser bestätigt. Quellenabgleich ersetzt kein unabhängiges Fachreview.

## Persönliche Wiederholung veröffentlicht

Quellstand aeb3296, GitHub-Run 40083172487 mit Node 22.22/24 und realem Containerfall erfolgreich. 49 lokale Tests (48 erfolgreich/1 Docker-Skip), 138 Dateien strikt. Version d8985117-8935-41ec-b315-c671630c72eb auf dem bestehenden Worker veröffentlicht; 342 öffentliche Seiten entsprechen dem Build. Echte Zwei-Account-/RLS-/Widerrufsprüfung auf development und Anmeldung im Browser erfolgreich. Persönliche Runde bleibt nach erfolgreicher Antwort stabil; identische Wiederholung, neue leere Auswahl, englischer Hinweis und Weiterüben-Button bestätigt.
