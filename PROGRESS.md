# Laufend · Übungsorganisation und Praxisprojekte · fortgesetzt 29.10.2026

Auftrag: Übungen übersichtlich nach Themen/Kursen strukturieren, Praxisprojekte vervollständigen, technisch sinnvolle Restaufgaben abarbeiten. Ausgangspunkt daf6654; vorhandene URLs, Kennungen und Nutzerdaten erhalten. Kein erneutes breites Audit nötig.

## Implementiert und verifiziert

- 203 Aufgaben/Projekte mit eindeutiger Themen-/Kursgliederung, Suche, kombinierten Themen-/Kurs-/Stufen-/Typ-/Statusfiltern, Kurs-/Quiz-/Lernpfadlinks und Wiederholhinweisen aus tatsächlich bearbeiteten Konto-Fragen. Lesen erledigt keine Aufgabe.
- Gerätegebundene Selbst-/Modellstände getrennt von Konto-Lese-/Quizdaten. Entwurfsänderungen, Lösung laden, Reset und Undo invalidieren alte Modellergebnisse. Bestehende Entwürfe erhalten. Speicherfehler sichtbar; ohne Skripte bleiben Inhalte lesbar und Speicherelemente deaktiviert.
- Alle sieben Projekte mit wiederaufnehmbaren Selbstprüfchecklisten. Vier neue vollständige DE/EN-CLI-Projekte: Lernzeit-JSON, IPv4-Netzplan, eigene Registermaschine, SHA-256-Inventar. Getestete Referenzen, echte CLIs/Fehlerfälle und bytegeprüfte ZIPs; keine beliebige Codeausführung im Browser.
- Vier tastaturbedienbare Ablaufaufgaben mit Fehlpositionsfeedback und erklärten Lösungen; fester interaktiver CPU-Trace mit Neustart. Suche, Quellenregister (273), SEO und interne Verknüpfungen integriert.
- Lokale JSON-Sicherung mit Vorschau/Bestätigung, 512-KiB-/500-Einträge-Limits, Version-/Datums-/Kennungsprüfung und Erhalt neuerer Stände. Importierte Abschlüsse immer Selbsteinschätzung; Projektabschlüsse nur mit bekannten vollständigen Checklisten. Keine Kontosynchronisierung oder externe Übertragung dieser Dateien.
- Letzte CSS-Korrektur: Filtertoolbar tatsächlich als Raster (2 Spalten mobil/3 Desktop); einzelne sichtbare Karten füllen ihre Gruppe ohne leere Rasterplätze. Auf 390/1280 px geprüft, kein Seitenüberlauf (375/1265 px Inhaltsbreite); einzelne Desktopkarte 1185 px breit. Diese Korrektur ist noch nicht gepusht/veröffentlicht.

## Prüfungen

Nach letzter CSS-Korrektur: 133 Tests, 125 bestanden, acht optionale Laufzeit-Skips; alle fünf nativen Compilergruppen tatsächlich ausgeführt. Typprüfung 274 Dateien ohne Fehler/Warnungen/Hinweise, Build 534 Seiten. Kein separates Lint-Skript. Dry-Run des Funktionspakets: 528 kanonische Sprachseiten, 40.224 interne Ziele, 716 Artefaktdateien. Logs: /private/tmp/it-worlds-practice-layout-{tests,types,build}.log.

Browser lokal: Statusfilter/Reload/Sprachwechsel, Modellfehler/Erfolg/Undo mit erhaltenem Originalentwurf, Projektabschluss im Katalog, Checklisten-Reset/Undo/Wiederaufnahme, Ablaufaufgabe falsch/richtig/Reihenfolge erhalten, CPU-Halt/Reset, tatsächlicher CPU-Download mit Tests/CLI. JSON-Export von sechs eigenen Testständen, bestätigter Import, ältere/gleiche Daten übersprungen und ungültige/übergroße Dateien abgewiesen. Globale Suche/Enter-Sprung, beide Designs, Mobilmenü/Escape und beide 404 geprüft. Eigene Testmarkierungen zurückgesetzt, Nutzerstände nicht gelöscht.

## Bereits veröffentlicht / aktueller Freigabeschritt

Funktionspaket **5056acf91c2e0f88d808121579565df32ee42929** auf codex/cloudstand-lokal gepusht; [Quality 40775678818](https://github.com/manuelk2607/IT-Worlds/actions/runs/40775678818) mit sieben erfolgreichen Jobs. Cloudflare **28.10.2026 22:57:10 Europe/Stockholm**, Version **2ed95a39-4a64-47ab-a7a5-35d8a02c5af4**, Deployment **58f53f10-5a02-456c-9ecd-bc6e2d4936a4**, 100 %. Alle 528 öffentlichen Sprachseiten und vier neuen ZIPs bytegleich. Auth200/Fortschritt401/Trainerkonto401/Rangliste200-no-store/beide404. Account/Subdomain/Einstellungen/vier Bindings unverändert. Öffentlicher Themenfilter/DE→EN-Zustand/Projektlink/CPU-Schritt/Reset geprüft.

**Nächster Schritt:** die oben bereits getestete CSS-Korrektur committen/pushen, sieben CI-Jobs abwarten, abschließend deployen und öffentliche Auslieferung/Einstellungen prüfen. Danach diesen Abschnitt und docs/VALIDIERUNG.md mit dem finalen Release ergänzen; eigene localhost:8790-Instanz beenden und temporären Browser-Viewport zurücksetzen. Keine Funktion erneut implementieren. Bei Unterbrechung zuerst Git und /private/tmp/it-worlds-practice-layout-deployment.log abgleichen; nicht blind erneut deployen.

## Extern offen

P1: unabhängige fachkundige/assistive Prüfpersonen sowie kontrolliertes development-Postfach für echten Reset-Empfang (docs/P1-PRUEFUNGEN.md). Quellen-/Compiler-/Browserprüfungen ersetzen diese Nachweise nicht. Lernendenstudie braucht Teilnehmende; Lizenzentscheidung den Rechteinhaber. PDF-Vorschau/zusätzliche Diagnostik nur bei sicherem, kostenfreiem und geringem Aufwand; Kompilierung bleibt extern. Weitere Medien/Projekte/Community/CMS/Duelle bleiben bedarfsabhängige Optionen, keine bestätigten Defekte. Keine bekannten technisch offenen P0-/P1-Implementierungen dieses Pakets; Gesamtprojekt nicht pauschal abgeschlossen.

---

# Abgeschlossen · Sprachkurse und Kurs-/Übungsstruktur · 28.10.2026

Auftrag fortgesetzt vom sauberen Ausgangspunkt a4463a1. Technisch umsetzbare bekannte Restaufgaben abgeglichen; externe Prüfaufgaben bleiben offen. Drei abgeschlossene Pakete:

- **Sprachkurse:** Java, C/C++, Go und Rust mit jeweils sechs vollständigen DE/EN-Kapiteln, 24 exakt getesteten Listings, Aufgaben/Lösungen, 48 erklärten Fragen und 33 tatsächlich gelesenen Primärquellen. Sprachwahl nach Lernziel, C und C++ ausdrücklich getrennt erklärt. Ziel Java 21, C17/C++20, Go 1.27.3, Rust 1.99.1/Edition 2024. Eigener Websitecode/Tests bleiben TypeScript; keine Nutzer-Codeausführung oder neue Abhängigkeit.
- **Kurs-/Übungsstruktur:** gruppierter Kurskatalog, 195 aus vorhandenen Daten abgeleitete Aufgaben/Projekte mit kombinierten Text-/Themen-/Kurs-/Stufen-/Arbeitsweisenfiltern, URL-/Sprachzustand, Leerzustand, Reset und 18er-Nachladen mit Zielfokus. Alle 169 Kapitelaufgaben über stabile #aufgabe-Anker; 30 Textsatzaufgaben als externe Dokumentaufgaben. Mehrfachzuordnungen der Projekte erhalten. Globale Suche findet Aufgaben/Lösungen. Kopierbare Startbefehle in eigenen Codeblöcken.
- **Lernpfad:** vierter geführter Weg „Vom Rechner zum sicheren Speicherzugriff“, 14 vorhandene Kapitel aus Grundlagen/Hardware/C/C++/Rust, konkrete Voraussetzungen und überprüfbares CLI-/Zugriffsprotokoll als Ziel. Derselbe Kapitelstand zählt weiter; bestehende IDs/URLs/Nutzerdaten unverändert, keine Migration.

## Verifikation

114 Tests: 106 bestanden, acht optionale lokale Laufzeit-Skips. Alle fünf nativen Compilergruppen liefen ohne Skip; tatsächliche Ausgaben, CLI-Format-/Negativ-/Überlaufverträge sowie abgewiesene Rust-Move-/Borrowing- und C++-Kopierfälle geprüft. Linux-CI fand fehlende finale C-Quelldatei-Zeilenumbrüche und ein älteres JDK im allgemeinen Runner; beides korrigiert, vollständiger erfolgreicher Nachlauf. Check 233 Dateien ohne Fehler/Warnungen/Hinweise, Build 518 Seiten. Release-Dry-Run und tatsächlicher Release: 512 kanonische Sprachseiten, 37.325 interne Links/Assets/Anker. Kein separates Lint-Skript.

Browser lokal: Filterkombinationen/Konflikte, Nachladen 18→36/Zielfokus, Leerzustand/Reset, DE/EN-Zustand, Kursgruppen/Suche, neuer Pfad, vier Sprachfamilien/Listings/Startbefehle, Aufgaben/Lösungen, Rust-Quiz falsch/richtig/alle Erklärungen/1-von-2-Abschluss/Neustart sowie englisches Java-Feedback. Globale Suche findet ParseIntError aus der Aufgabe und navigiert per Enter. Tatsächliche 390px-/1280px-Ansichten, beide Designs und Mobilmenü/Escape ohne Seitenüberlauf. Readiness und beide Sprach-404 funktionieren.

## Veröffentlichung

Quellstand **ec9db5c693967bf0a121be69588055ce44f377e4** auf `codex/cloudstand-lokal` gepusht; Hauptimplementierung 124a7e0, Portabilitätskorrekturen f65ceea/ec9db5c. GitHub [Quality 40647404074](https://github.com/manuelk2607/IT-Worlds/actions/runs/40647404074): alle sieben Jobs erfolgreich (Node 22.22/24, PostgreSQL, Container, Godot, systemd, native Sprachen).

Cloudflare am **28.10.2026 08:03:59 Europe/Stockholm**: Version **88f84534-212b-4c1e-96d0-c87aeca1d4b5**, Deployment **4c5e4ab2-d9f9-44b6-8357-b329db1e5146**, 100 % Traffic. Alle 512 öffentlichen Sprachseiten stimmen mit exakt dem veröffentlichten Releaseartefakt überein. Öffentliche Readiness besteht; Auth200, Gastfortschritt/Trainerkonto401, Rangliste200 mit no-store und beide HTTP-404 geprüft. Account/Subdomain/workers.dev-Status, sämtliche Einstellungen und vier Bindings vorher/nachher identisch. Keine Authkonfiguration oder Produktionsdatenbank geändert.

Öffentlicher Browser: Rust-Aufgabenfilter 6→2, Kapitel-/Aufgaben-/Quizsprung und richtige Abschlussantwort mit jeder Erklärung/Quelle; englischer Kursfilter und 14-Schritte-Pfad; globale Aufgaben-Suche/Enter-Sprung und veröffentlichte Sprachwahl geprüft. Belegbild im privaten Aufgabenworkspace outputs/it-worlds-sprachkurse-live.jpg. Temporären Viewport zurückgesetzt. Eigener lokaler Testserver beendet.

## Offen / nächster konkreter Schritt

Externe P1-Voraussetzungen: unabhängige fachkundige/assistive Prüfpersonen und kontrolliertes development-Postfach für echten Reset-Empfang (docs/P1-PRUEFUNGEN.md). Quellenabgleich/Compiler-/Browserprüfungen ersetzen diese Nachweise nicht. Lernenden-UX-Erprobung braucht Teilnehmende. PDF-Vorschau/zusätzliche Dokumentdiagnostik nur sicher, kostenlos und wartungsarm; Kompilierung bleibt extern. Lizenzentscheidung beim Rechteinhaber. Zusätzliche Projekte, Medien, Visualisierungen, Duelle/Community/CMS sind bedarfsabhängige Optionen, keine bestätigten Defekte oder zugesagten Prototypen. Java/C/C++/Go/Rust und diese Strukturpakete nicht erneut implementieren. Nächster Lauf: anhand konkreter Rückmeldungen oder verfügbarer externer Prüfpersonen priorisieren; keine bekannten technisch offenen P0-/P1-Implementierungen in diesem Paket. Gesamtprojekt ausdrücklich nicht pauschal abgeschlossen.

---

# Abgeschlossen · Praxisprojekte, Trainer und Glossar · 27.10.2026

Ziel: die dokumentierten Restaufgaben priorisiert abschließen, bestehende Daten/URLs erhalten. Die folgenden unabhängigen P2-Pakete sind technisch abgeschlossen und veröffentlicht; das Gesamtprojekt wird wegen externer Reviews und weiterer bedarfsabhängiger Aufgaben nicht als abgeschlossen erklärt.

## Abgeschlossene Pakete

- **Schreibtrainer:** zwölf gestufte Lektionen, eigene DE/EN-Sätze/Absätze/Alltagstexte, Voraussetzungen, Textfortschritt und konkrete Endfehler. Lokale Historie erhalten, Bestwerte nach Text/Sprache getrennt. Unicode-Korrekturen stimmen mit der Replayauswertung überein. Rankingtexte/-regeln und Datenmodell unverändert.
- **Dokumentprüfung:** getrennte Marken-/Literatur-Namensräume, begrenzter BibTeX-Scanner, bibitem/Typst-cite und doppelte Kennungen. Alle 31 Profile verwenden bestehende Ziele, Aufgaben und Lösungen für bewusste Selbstprüfrubriken; erst nach Bestätigung optionale vorhandene Kapitelmarkierung. JSON kennzeichnet Selbstauskunft, Kompilierung bleibt extern/not-run.
- **Drei vollständige Praxisprojekte:** DE/EN-Anleitungen mit Abnahme/Transfer, getestete Quelldateien und bytegeprüfte ZIPs für mehrseitigen TypeScript-Webkatalog, relationalen SQL-Lernbericht sowie echten HTTP-Vertragsprüfer mit Fehlerdiagnose/Wiederanlauf. Gemeinsame Metadaten verbinden Kurse, Lernstart, Übungen, Suche und Sitemap. Keine neuen Website-Abhängigkeiten oder Fortschritts-IDs.
- **Glossar/Suche:** 15 zweisprachige quellengebundene Begriffe, Kurs-/Projektverknüpfungen, kombinierte Filter und URL-/Sprachzustand. Beschreibungen/Lernziele werden nun tatsächlich durchsucht. Same-Page-Suchtreffer schließen den Dialog und erhalten einen brauchbaren Zielfokus. Belege am 27.10. erneut gelesen; kein unabhängiges Fachreview behauptet.

## Verifikation

103 Tests: 95 bestanden, acht optionale lokale Laufzeit-Skips. Astro-Check 221 Dateien ohne Fehler/Warnungen/Hinweise, Build 452 Seiten, Releaseprüfung 446 kanonische Sprachseiten und 31.891 interne Ziele. Kein gesondertes Lint-Skript. GitHub Quality [40426819774](https://github.com/manuelk2607/IT-Worlds/actions/runs/40426819774): alle sechs Jobs erfolgreich (Node 22/24, tatsächliche PostgreSQL-/Container-/Godot-/systemd-Beispiele).

Zusätzlich tatsächlich geprüft: SQL-Projekt unter PostgreSQL 18 im eigenen netzlosen Container, anschließend 0 öffentliche Tabellen und Container automatisch entfernt; bestehender postgres:15 unverändert. Frisch entpackter Web-ZIP-Download mit eigener Installation, Build und 3/3 Tests erfolgreich. Echte HTTP-CLI-Prüfungen mit Exit 0/1/2. Zwei vorhandene development-Konten prüfen alle drei neuen Textlektionen DE/EN, private Historie und Nichtaufnahme in Rankings; kompletter 60-Sekunden-/RLS-/Replay-/Origin-/Timing-/Sichtbarkeits-/Widerrufstest ebenfalls erfolgreich. Keine Produktionsaccounts, neuen Zugangsdaten oder Migrationen.

Browser lokal: Trainer DE/EN, Restfehler, Abschluss, Reset, Historienerhalt/Sprachtrennung und Unicodekorrektur; Dokumentprüfung/Selbstprüfung/Musterlösung/Reset; Webreferenz mit kombinierten Filtern, Lesezeichen, Detail, Reload, Leerzustand und Fokus. Glossar DE/EN einschließlich Quellen, Sprachzustand und Tastatur-Suchsprung. Alle drei Projektanleitungen und Glossar in echtem schmalem 390px-iframe-Ansichtsbereich ohne Seitenüberlauf, beide Designs. Native Viewport-Override wurde nicht übernommen; keine daraus abgeleitete mobile Behauptung. Frühere Trainer-/Dokument-Mobilmenüprüfungen bleiben gültig.

## Veröffentlichung

Quellcommit `059ac2a5d7c087416e22c316cb75b8132f07a7e8` auf `codex/cloudstand-lokal` gepusht. Cloudflare am **27.10.2026 09:40:45 Europe/Stockholm**: Version `87c9d6fa-9ff0-49df-8a0a-4ed9fa85ac9b`, Deployment `1b1928b0-e1d5-4a12-8dd8-1213622e1c84`, 100 % Traffic. Der erste sofortige HTML-Nachvergleich schlug fehl; erneute vollständige Prüfung gegen exakt dasselbe erhaltene Releaseartefakt besteht für alle 446 öffentlichen Seiten. Alle drei öffentlichen ZIPs bytegleich. Auth200, Gastfortschritt/Trainerkonto401, Rangliste200/no-store und beide Sprach-404 geprüft. Account/Subdomain/workers.dev/Preview-Status sowie Einstellungen und vier Bindings vorher/nachher identisch.

Öffentlicher Browser: Glossarfilter/Sprachzustand, globale Suche und Enter-Sprung mit geschlossenem Dialog/Zielfokus; Typst-Beispiel mit positionsbezogener Warnung/Fehler und 0/4 bewussten Selbstprüfkriterien; neue englische Absatzlektion mit Voraussetzung/408 Zielzeichen; drei Projektkarten im Lernstart. Belegbild im privaten Aufgabenworkspace gesichert. Veröffentlichung und technische Nachprüfung abgeschlossen.

## Offen / nächster konkreter Schritt

Externe P1-Voraussetzungen abarbeiten: unabhängige fachkundige/assistive Prüfpersonen und kontrolliertes development-Postfach für echten Reset-Empfang (Prüfabläufe in docs/P1-PRUEFUNGEN.md). Lernenden-UX-Erprobung benötigt reale Teilnehmende. PDF-Vorschau bleibt P2 ausschließlich bei sicherem, kostenfreiem und geringem Aufwand; tatsächliche Kompilierung/PDF-Kontrolle bleiben im externen Editor. Lizenzentscheidung benötigt den Rechteinhaber. Weitere Projekte, Visualisierungen, Gamification/Duelle, Community, CMS und Sprachen sind bedarfsabhängige P3-Optionen, keine bestätigten Defekte oder zugesagten Prototypen. Technische Pakete nicht erneut analysieren oder implementieren. Kein erneuter Code-Deploy für diesen reinen Dokumentationsnachweis nötig.
---

# Abgeschlossen · Textsatz als Themenkategorie · 26.10.2026

Ziel: den Hauptmenüpunkt „LaTeX & Typst“ entfernen und beide Lernbereiche als eigenständige Themenkachel „Textsatz & Dokumentenerstellung“ in Navigation, Suche, Filter und Breadcrumbs integrieren, ohne Inhalte, URLs oder Lernfortschritt zu verlieren.

Umgesetzt: DE/EN-Themenportal unter den bestehenden `/textsatz/`-Routen, responsive Themenkachel mit eigenem Dokument-Icon und 30 verfügbaren Kapiteln, Typst als empfohlener Einstieg vor LaTeX, direkte Links zu typst.app/Overleaf und zur lokalen Dokumentprüfung. Haupt- und Mobilnavigation enthalten keinen eigenen Textsatz-Reiter mehr; auf Portal- und Kursseiten ist „Themenwelten“ aktiv. Programmiersprachen zeigen nur TypeScript, Python und Markdown; LaTeX/Typst werden dort nicht mehr als zweite Kategorie angeboten. Suche sowie Kurs-, Übungs-, Quiz-, Fortschritts- und Quellenfilter verwenden die neue sichtbare Kategorie aus einer gemeinsamen Metadatenquelle. Breadcrumbs der Kurse und Dokumentprüfung führen über das Portal.

Kompatibilität: Die vorhandenen DE/EN-Kurs- und Kapitel-URLs unter `/themen/programmiersprachen/{typst,latex}/` bleiben unverändert erreichbar. Kurs-, Kapitel-, Aufgaben- und Frage-IDs sowie gespeicherte Fortschrittsdaten wurden nicht geändert. Keine Datenbank-, Worker- oder Deploymentänderung.

Verifiziert: 87 Tests (80 bestanden, 7 optionale Laufzeit-Skips), Astro-Check für 197 Dateien ohne Fehler/Warnungen/Hinweise, Build mit 444 Seiten, Release-Dry-Run mit 438 kanonischen zweisprachigen Seiten und 30.778 internen Links/Assets/Ankern. Browser: Haupt- und Mobilnavigation ohne alten Reiter, DE/EN-Portal, 390×844, Themenkachel, Typst-Hervorhebung, externe Editor-/Prüflinks, Suchtreffer, Quizfilter mit 60 Typst-/LaTeX-Fragen, Quellenfilter mit 46 zugeordneten Belegen, Programmiersprachen ohne doppelte Kurse sowie unveränderte Typst-Kompatibilitätsroute und sichtbare/strukturierte Breadcrumbs über Themenwelten → Textsatz geprüft.

Veröffentlicht: Quellcommit `41ed34b` auf `codex/cloudstand-lokal`; GitHub-Quality `40336730526` mit allen sechs Jobs erfolgreich. Cloudflare-Deployment am 26.10.2026 um 15:09 Uhr Europe/Stockholm: Version `3383c337-abf5-4ffb-82e1-1ea513a92792`, Deployment `23dc4329-08a5-47ee-bca1-12e460595e48`, 100 % Traffic. Öffentlicher Nachvergleich aller 438 Seiten erfolgreich; Readiness für Start, Quiz und Quellen sowie DE/EN-Portal, Quellenfilter, Kompatibilitätsrouten und beide 404-Sprachen geprüft. Compatibility-Datum, Routing, Nutzungsmodell und die vier bestehenden Bindings blieben erhalten.

Offen bleibt ausschließlich der zuvor dokumentierte externe P1-Bedarf: unabhängige fachkundige/assistive Prüfpersonen und ein kontrolliertes development-Testpostfach. Die Textsatz-Navigation selbst hat keine bekannte offene Aufgabe.

---

# Vorheriger Auftrag · P1-Abschluss · 25.10.2026

Ziel: die fünf konsolidierten P1-Pakete unten abarbeiten, keine P2/P3-Erweiterung. Vorhandener Dokumentationsdiff bleibt erhalten. Reihenfolge: (1) Ranking-Audit/echte development-Sessions und Fehler beheben, (2) Godot-Engine-/Browserprüfungen, (3) reproduzierbares Linux-/systemd-Labor, (4) Auth-Reset-Fehlerpfade und erreichbare technische Accessibility-Prüfungen, (5) Gesamttests/Check/Build und präziser Abschluss.

Stand: drei technische P1-Pakete abgeschlossen und öffentlich veröffentlicht. Migration 002 nach bestandenem Audit auch auf main angewendet (unveränderte Prüfsumme; neue Tabellen mit erzwungener RLS; eingeschränkte Runtime ohne Kontext sieht keine Daten). Unabhängiges Fach-/assistives Review und tatsächlicher Reset-Mailempfang bleiben mangels Prüfpersonen bzw. kontrolliertem Postfach extern blockiert; keine P2/P3-Arbeit begonnen.

Paket 1 verifiziert: `test:development` startet einen eigenen localhost-Worker mit bestehender eingeschränkter development-Rolle. Zwei echte Accounts/Sessions, alter Fortschrittstest, Ranking-RLS, fremde IDs/Origin, konkurrierende Starts (200/429), echte 61 Sekunden Serverwartezeit mit DE/EN-Protokollreplays, konkurrierende Abgaben (200/409), frühe/Burst-/wiederholte Abgaben, alle Ranglistenfilter, feste öffentliche Projektion, Opt-in/out und widerrufene Session bestehen. Keine menschliche Tippleistung behauptet. Reset-Negativpfade (ungültiger Token, fehlerhafte Mail, neutrale Unbekannt-Antwort, fremde Origin) bestehen; echter Mailempfang bleibt blockiert. Behoben: veränderbare Trainerzustände während Requests, doppelte Starts/Speicher-Race, unklare Namenskollision und ungültige UUID mit Serverfehler. Feature im Arbeitsstand zum Test aktiviert; Produktion noch nicht migriert/veröffentlicht.

Paket 2 verifiziert: Godot 4.5 (offizieller SHA-256 geprüft) importiert das Projekt; Engine-Test prüft Bewegung/diagonale Geschwindigkeit, echte Wände/Area2D-Kontakte, genau fünf Punkte, Abschluss und fünf Neustarts. Neustartfehler durch alte Physik-Kontakte behoben; ZIP entspricht Quellen. Linux/systemd-Benutzerlabor mit eigener temporärer Unit, Exit 17, Result-/Journalnachweis und gezielter Bereinigung DE/EN im vorhandenen Kapitel integriert. Offizielle systemd-run-Quelle gelesen (Register nun 239 Quellen). Kein privilegierter Container erforderlich; lokaler Container ohne delegierte Kontrollgruppen ist dafür ungeeignet, sein Prototyp-Dockerfile wurde entfernt.

Git: cc21b52 auf codex/cloudstand-lokal gepusht. GitHub Quality 40215505510: alle sechs Jobs erfolgreich (Node 22/24, echte SQL-/Containerbeispiele, echtes Linux/systemd-Labor und Godot 4.5). Lokal 85 Tests: 78 pass/7 optionale Skips; Engine separat 2/2 erfolgreich; check 196 Dateien ohne Meldungen; Build 444 Seiten; deploy:check 438 kanonische Sprachseiten/31.730 Links erfolgreich.

Browser abgeschlossen: echte development-Anmeldung, private Kontohistorie, Profil speichern, leere öffentliche Rangliste, gesperrte Einstellungen während Requests, Kontospeicherung, konsistente Endwerte/Reset, Ranglistenbestwertfilter und nicht gewerteter Abbruch bestätigt. DE/EN, beide Designs, 390px ohne Überlauf, Mobilmenü/Escape/Fokus, Hardware-Halbaddierer/12 CPU-Schritte/Reset, Spiele-Buttons/Pfeile/Reset, Linux-Labor und beide 404 geprüft. Eigener Text bleibt lokal. Erneut 85 Tests (78 pass/7 optionale Skips), check 196 Dateien ohne Meldungen, Build 444 Seiten; kein gesondertes Lint-Skript vorhanden.

Veröffentlichung verifiziert: Quellcommit 9ccd793 auf codex/cloudstand-lokal, Quality 40237691162 vollständig erfolgreich. Deployment am 25.10.2026 22:56:18 Europe/Stockholm: Version 7f5d4d27-b4c3-4353-ac77-8161225c44a3, Deployment 0fc157cf-8e24-4ca1-b650-4c989e4a95f8, 100 % Traffic. Alle 438 öffentlichen Sprachseiten stimmen mit dem Build überein; 31.730 Links geprüft. Öffentliche DE/EN-Rangliste lädt (200/no-store), Gäste können keine Konto-Ergebnisse lesen (401), Ranked-Start fordert verständlich Anmeldung; Gastübungen bleiben verfügbar. Auth200, Fortschritt401, beide404. CF-Account/Subdomain/Einstellungen/vier Bindings vor/nach identisch. Produktionsdaten: 13 frühere Fortschrittszeilen erhalten, keine Testprofile oder Testläufe auf main. Eigenes experimentelles Linux-Image entfernt; bestehender PostgreSQL-Container unverändert.

Nächster sinnvoller Schritt benötigt externe Voraussetzungen: unabhängige fachkundige und assistive Prüfpersonen sowie ein kontrolliertes development-Testpostfach für echten Reset-Empfang. Prüfabläufe in docs/P1-PRUEFUNGEN.md. Diese beiden P1-Punkte nicht als erledigt markieren oder durch simulierte Tests ersetzen. Technische Pakete und Freigabe nicht erneut analysieren; bei Fortsetzung Git und diese Nachweise abgleichen.

---

# Abgeschlossen · Schlanke Dokumentprüfung · 25.10.2026

Ziel: ausschließlich externe Bearbeitung in Overleaf/typst.app; sichere lokale Quellen-/ZIP-Prüfung ohne eigenen Kompilierungsdienst oder zusätzliche laufende Kosten. P0: Editorlinks/Import/Diagnostik. P1: Mehrteiler/Aufgabenprüfungen/manuell bestätigter bestehender Kapitel-Lernfortschritt. Danach Tests, Browserprüfung, GitHub-Push und Deploy mit erhaltenen Einstellungen. Keine Dokument- oder Datenbankmigration geplant. Der bislang unveröffentlichte Ranking-Backendstand darf ohne seine ausstehenden Prüfungen nicht aktiviert werden.

Implementiert: externer Editor-/Export-/Quellenimport für beide Formate, Compilerdienst/Proxy/CI entfernt, 30 Kapitelprofile plus bestehende Typst-Verweisaufgabe. Gemeinsame sichere Projektaufnahme/ZIPs/Workerlimits erhalten. Bewusster bestehender Kapitel-Lernfortschritt; kein neues Schema oder Dokumentenspeicher. Alte Typst-Editorentwürfe read-only als Download verfügbar. Ungeprüftes Rankingbackend samt Online-UI deaktiviert, lokale Übungen erhalten.

Verifiziert: 83 Tests (78 pass/5 optionale Laufzeit-Skips), 191 Dateien strikt ohne Meldungen, 444 HTML-Seiten, Dry-Run/438 Sprachseiten/31.728 interne Links. Browser: tatsächliche ZIP-Importe beider Formate, fehlerhafte Quellen, unsicherer ZIP-Pfad, Fundstellen, Entfernen, DE/EN, hell/dunkel und mobil. CF-Account/Subdomain/vier Bindings gelesen, Einstellungen für Nachvergleich gesichert; Login erneuert. Keine bestehenden Docker-Container oder Images verändert.

Abgeschlossen: Quellcommit 4b902cd auf codex/cloudstand-lokal gepusht; GitHub-Quality 40179580624 erfolgreich. Öffentlich veröffentlicht am 25.10.2026 10:11:42 Europe/Stockholm: Version 677144d2-3d90-413b-bc98-35b955122f8e, Deployment 1475cda0-30b8-47ed-bd46-49669f2662f0 mit 100 % Traffic. Alle 438 Sprachseiten bytegleich geprüft. Öffentliche LaTeX-Analyse und echter Typst-Mehrdatei-ZIP-Import funktionieren im Browser. CF-Einstellungen und vier Bindings unverändert; Auth200/Gastfortschritt401/Ranking503/entfernter Compiler404/beide404 geprüft. Dokumentation: docs/VALIDIERUNG.md und docs/DOKUMENTPRUEFUNG.md.

Offen außerhalb dieses abgeschlossenen Auftrags: P2-Verbesserungen nur ohne zusätzliche laufende Kosten/hohen Aufwand; unabhängiges Fach-/assistives Review; ungeprüftes Rankingbackend und Godot-Engineprüfung aus früherem Auftrag. Keine Kompilierungsserver einrichten. Nächster Entwicklungslauf soll vom aktuellen Git-Stand ausgehen und diese bereits abgeschlossenen Pakete nicht wiederholen.

---

# Vorheriger Auftrag · LaTeX-/Typst-Dokumentprüfung · 25.10.2026

Auftrag: LaTeX-Restaufgaben, gemeinsamer Export-/Upload-/Prüfworkflow, Typst vertiefen und hervorheben. Vorherige Roadmap-Änderungen erhalten. Details und Freigabegrenzen: docs/DOKUMENTPRUEFUNG.md.

Implementiert: lokal arbeitende, begrenzte Einzeldatei-/ZIP-Aufnahme in Web Worker; LaTeX-/Typst-Analyse mit Positionen, Hauptdatei, Referenzen/Ressourcen, Quellenansicht und Bericht. DE/EN-Routen /textsatz/ und /dokumentpruefung/, gemeinsame Navigation/Suche/Kurslinks; Kursbeispiele direkt in Prüfung ladbar. Typst acht zusätzliche Kapitel (nun 16/32 Fragen), LaTeX Diagnosekapitel (nun 14/28). Stabile frühere IDs erhalten. Zwölf Analyse-/ZIP-/Diagnostiktests bestehen. Gesamter lokaler Stand: 13 Themen/18 Kurse/145 Kapitel/300 Fragen/238 Quellen.

Separater eigener Compilercontainer und privater TS-Dienst mit Worker-Proxy implementiert. Nur eigene Container it-worlds-doc-* erstellt/entfernt; bestehende Container nicht bearbeitet. Docker lokal gestartet, eigenes Image gebaut. Alle 30 Kursbeispiele inklusive Biber erfolgreich kompiliert; sieben separate Compiler-/Diensttests inklusive ungültiger Syntax, fehlender Pakete, Projektausbruch, Endlosschleife, echtem Shell-Escape-Ablehnungstest, Auth und Löschung bestehen. Keine neue öffentliche Hosting-Ressource, kein Deploy, keine Datenbankänderung. Bei fehlender Dienstkonfiguration bleibt Kompilierung verfügbar:false; Quellen bleiben dann lokal.

Verifiziert: npm test 85 Tests (75 bestanden, 10 optionale Laufzeit-Skips), check 193 Dateien ohne Meldungen, serieller Build 444 HTML-Seiten, deploy:check mit 438 SEO-/Sprachseiten und 31.602 Links/Ankern erfolgreich. Die sieben echten Compiler-/Diensttests liefen zusätzlich ohne Skips. Browser: DE/EN, 390px/950px/1280px ohne Seitenüberlauf, Designs/Mobilmenü/Escape, Einzeldateien und ZIP, Hauptdatei, Quellpositionen, echte Typst-/Biber-PDF-Rastervorschau, neue Quizfrage mit Erklärungen/Ergebnis/Neustart und klare Nichtverfügbarkeit ohne Dienst am echten lokalen Worker. Entfernen leert Quelle und Ergebnisse. 22 neue DE/EN-Routen und beide Worker-404-Sprachen per HTTP geprüft; allgemeiner Ready-Check bestanden.

Offen: dauerhafter separater Compilerhost mit unabhängiger Sicherheitsprüfung und öffentlicher Konfiguration; Fachreview/assistive Nutzerprüfung; optionale fachliche Bewertungsrubriken. Der frühere Schreibtrainer-/Hardware-/Spiele-Freigabestand bleibt gesondert offen. Keine automatische Restart-/Fortsetzungszusage; nächster Entwicklungslauf muss diesen Stand mit Git abgleichen. Veröffentlichung/Pushergebnis weiterhin keines.

---

# IT-Worlds · Zwischenstand drei Lernbereiche

## Stand / Budget · 24.10.2026
Nutzerauftrag aus eingefügtem Text: drei integrierte Lernbereiche, maximal ca. 50 % Kontingent. Gemessener Start 1 %, Abschlussmessung 55 %: Budget leider überschritten; keine weiteren Pakete beginnen. Arbeitsbranch codex/cloudstand-lokal, vorheriger Stand 64f71e5. Nutzer stellt klar: .clinerules-Toolbeschränkung betrifft diese Arbeit nicht; verbundener Neon-Connector ist verwendbar, Datei unverändert.

## Lokal implementiert
13 Themen, 18 Kurse, 136 Kapitel, 282 Quizfragen, 226 Quellen. Neue Hardware-Folge (6 Kapitel), Spieleentwicklung (5 einschließlich eigenständiger Unity-/Unreal-Grundlagen), Tastschreiben (3). DE/EN, Suche, Themenkarten, Kurs-/Kapitel-/Fortschrittsverknüpfungen; Lehrlabore für Halbaddierer, CPU-Schritte/Bootfolge und ein tastatur-/buttonbedienbares 2D-Kollisionsmodell. Eigenes Godot-4.5-Projekt mit vier Quelldateien und ZIP; noch nicht in Godot ausgeführt.

QWERTZ-Trainer unter /schreibtrainer/ und /en/schreibtrainer/: zehn Lektionstypen, Hinweise/Fingerzuordnung, lokale Historie/Bestwerte/Schwächen, adaptive Zeichenfolge, eigene Texte, 60-Sekunden-Fenster, Replay-Auswertung für WPM/KPM/Genauigkeit/Fehlerquote. Eigene Texte bleiben lokal. Browser: freie Übung mit asdf gestartet/beendet, 100 % Genauigkeit und lokale Speicherung sichtbar. Bild im Aufgabenworkspace work/three-areas-local-trainer.png.

## Datenbank / Backend vorbereitet, NICHT produktionsfreigegeben
Bestehendes Neon-Projekt lingering-morning-59761503. development br-silent-glade-bamm5co5 inspiziert (learning_progress, schema_migrations, neon_auth.user); Owner BYPASSRLS=true, Runtime-Rolle false. Additive 002_typing.sql nur auf development per MCP-Transaktion inklusive Prüfsumme angewendet: 480f256914ca3f553f2a0570d5cea40035d9988f06849effc002bcc87f7ab92f. Neue typing_profiles/typing_runs, RLS, eingeschränkte Rechte, public.typing_board mit expliziter Sichtbarkeit und festen Projektionen. Keine bestehende Migration geändert, keine Produktionsmigration.

Worker-Routen für Start/Finish/Profil/Me/Leaderboard implementiert: Live-Session, gleiche Origin, Serverstartzeit, Replay, Ergebnisberechnung, atomare Einmalabgabe, Startlimit, pseudonyme Opt-in-Anzeige, UTC-Zeiträume. Noch NICHT mit zwei echten Sessions, fremden IDs, manipulierten/doppelten Abgaben oder realem 60-Sekunden-Test geprüft. Keine Behauptung eines produktionsreifen Rankings. Die öffentliche Website bleibt Version b54243e9-3627-496e-a8f4-66c0c378638f.

## Verifikation / Nächster Schritt
66 Tests: 61 bestanden, 5 lokale Laufzeit-Skips. 171 Dateien strikt ohne Fehler/Warnungen/Hinweise. Buildfehler durch leere neue Einstiegsfragen-Gruppen behoben; isolierter Build 422 Seiten erfolgreich. Abschließender npm-build und Deploy-Dry-Run in /private/tmp/it-worlds-three-final-build.log bzw. it-worlds-three-deploycheck.log. Eigener Testserver/Tab schließen. Kein Deployment und kein GitHub-Push dieses Zwischenstands.

Zuerst Backend-/RLS-/Zwei-Account-/Replaytests auf development, Browsertests für beide Sprachen/Designs/Mobilansicht sowie Godot-Import/Spielablauf abschließen. Ranglisten-Sichtbarkeit, Herkunft, Timing- und Eingabegrenzen prüfen und UI-Regeln mit Servergrenzen abgleichen. Erst danach additive Migration auf main und Veröffentlichung mit erhaltenen Cloudflare-Einstellungen. Medien/Videos, größere Projekte, zusätzliche Statistiken, Gamification und Duelle offen; keine Platzhalter dafür veröffentlicht. Fachreview bleibt offen.

Abschlusskorrektur: Der zuvor erfolgreiche isolierte Build (422 Seiten) wurde durch die letzten parallel gestarteten Build-/Releaseprüfungen nicht erneut bestätigt. Abschließender npm-Build und Deploy-Dry-Run schlugen fehl (Modul-/Linkprüfung; Logs im privaten temporären Verzeichnis). Vor Freigabe seriell wiederholen und Ursachen prüfen. Kein Deployment durchgeführt.

## Konsolidierter Aufgabenabgleich · 25.10.2026

Dieser Abschnitt ersetzt verstreute historische „offen“-Hinweise in älteren Protokollen. Die dort beschriebenen früheren Compiler-, Inhaltsausbau- und Releasepakete sind abgeschlossen oder bewusst nicht Teil des aktuellen Releases.

### P0 · kritisch

Keine bestätigten P0-Probleme im veröffentlichten Stand. Dokumentprüfung, Auth-Grundpfade, 404-Verhalten, SEO-Generierung und statische Website-Funktionen sind releasegeprüft.

### P1 · wichtig

| Aufgabe | Status und Abgrenzung | Aufwand | Bereich |
| --- | --- | --- | --- |
| Ranking-/Schreibtrainer-Backend sicher freigeben | **Erledigt/verifiziert.** Echte development-Konten/RLS/Timing-/Replaytests, Produktionsmigration und öffentliche Aktivierung mit erhaltenen Daten; Versionsnachweis oben. | hoch | Neon, Worker, Datenschutz, Schreibtrainer |
| Godot-Projekt und Browserprüfungen abschließen | **Erledigt/verifiziert.** Engine-/Browserprüfungen, korrigierter Reset, bytegleiches ZIP und CI-Regressionsprüfung. | mittel | Spieleentwicklung, QA |
| Unabhängiges Fach- und assistives Review | **Extern blockiert.** Prüfpersonen fehlen. Eigene Browser-/Quellenprüfungen sind kein Ersatz für den unabhängigen Nachweis. | hoch | Inhalte, Barrierefreiheit, UX |
| Kontrollierten Mail-/Passwort-Reset-Test durchführen | **Extern blockiert.** Negative API-Pfade geprüft; kontrolliertes Postfach für echten Empfang und erfolgreiche Wiederherstellung fehlt. | mittel | Auth, Betrieb |
| Linux/systemd-Benutzerlabor | **Erledigt/verifiziert.** Reproduzierbarer Benutzerlaborblock im vorhandenen DE/EN-Kapitel und echter Linux-CI-Lauf samt Bereinigung. | mittel | Betriebssysteme/Linux, QA |

### P2 · Erweiterungen

| Aufgabe | Status und Abgrenzung | Aufwand | Bereich |
| --- | --- | --- | --- |
| Konservative Dokumentdiagnostik und PDF-Vorschau bewerten | **Geplant, nicht zugesagt.** Nur bei browser-/kostenfreiem, sicherem und wartungsarmem Betrieb; kein eigener Compilerhost ist Voraussetzung. | hoch | LaTeX/Typst, Sicherheit |
| Aufgabenbezogene Bewertungsrubriken | **Erledigt/veröffentlicht.** Alle 31 vorhandenen Profile mit Lernzielen, Musterlösungen, manueller Compiler-/PDF-Kontrolle und bewusster Fortschrittsmarkierung. Fachliche Qualität wird durch Selbsteinschätzung, nicht automatische Benotung, bewertet. | mittel | LaTeX/Typst, Kurse |
| Schreibtrainer: zusammenhängende Texte | **Erledigt/veröffentlicht.** Zwölf Stufen, eigene DE/EN-Sätze/Absätze/Alltagstexte, Fortschritt/Fehlerdiagnose und erhaltene Historie. Neue Übungen mit zwei development-Konten tatsächlich geprüft. | mittel | Schreibtrainer |
| Größere Praxisprojekte | **Drei vollständige Referenzprojekte erledigt/veröffentlicht.** Mehrseitiger Webkatalog, echter PostgreSQL-Bericht und HTTP-Abnahme mit Fehlerdiagnose/Wiederanlauf. Weitere Projekte nur bei nachgewiesenem Bedarf. | hoch | Kurse, Praxislabore |
| Benutzerfreundlichkeit mit Lernenden erproben | **Bestätigt offen.** Lernwege, Suche, Filter, Fortschritt und Dokumentprüfung mit realen Lernenden beobachten und Befunde in UX-Änderungen überführen. | mittel | UX, Navigation |

### P3 · optional

| Aufgabe | Status und Abgrenzung | Aufwand | Bereich |
| --- | --- | --- | --- |
| Weitere Visualisierungen, Gamification und Duelle | **Vermutete Verbesserung, kein bestätigter Fehler.** Erst nach Nutzungsfeedback priorisieren. | hoch | UX, Lernspiele |
| CMS/Redaktionsworkflow | **Vermutete Verbesserung.** Repository-Pflege funktioniert; CMS erst bei nachgewiesenem Redaktionsbedarf prüfen. | hoch | Wartbarkeit |
| Weitere Sprachen und Community-Beiträge | **Vermutete Verbesserung.** Erst Rechte, Review und Pflegekapazität klären. | hoch | Inhalte, Übersetzung |

### Veraltete oder bereits umgesetzte „offene“ Hinweise

- Editorlinks, sicherer Einzel-/ZIP-Import, 30 Aufgabenprofile, bestehender Fortschritt, SEO, Dark Mode, Deutsch/Englisch und der veröffentlichte Cloudflare-Deploy sind **erledigt**; ältere Dokumente nennen diese teils noch als Planung.
- Compilercontainer, Worker-Proxy, PDF-Vorschau und Compiler-CI sind **bewusst entfernt**, nicht unvollständig. Historische Kompilierungstests belegen Beispiele, keine öffentliche Nutzerkompilierung.
- Alte Zählungen in `docs/AUSBAU.md`, `docs/INHALTE.md`, `docs/VALIDIERUNG.md` und `docs/DREI-LERNBEREICHE.md` sind historische Protokolle; der aktuelle Stand steht am Anfang dieser Datei und in der aktuellen Roadmap.
- Keine unmarkierten TODO/FIXME-Implementierungsmarker wurden im produktiven TypeScript/Astro-Code gefunden. UI-Treffer für „offen“ sind Nutzerstatus, keine fehlenden Implementierungen.

### Empfohlene Reihenfolge

1. Externe Prüfpersonen und kontrolliertes development-Postfach bereitstellen; verbleibende P1-Nachweise durchführen und daraus Befunde beheben.
2. Abgeschlossene Ranking-/Godot-/systemd-Pakete nicht wiederholen; Regressionen laufen in vorhandenen Tests/CI.
3. Der Gesamtauftrag gewichtet unabhängige P2-Pakete ausdrücklich neu: die oben beschriebenen lokalen Pakete fertig prüfen und veröffentlichen; extern blockierte P1-Punkte bleiben offen.
