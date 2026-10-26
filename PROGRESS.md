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
| Mehr Aufgaben und fachliche Bewertungsrubriken | **Bestätigte Inhaltslücke.** Die 30 Profile erkennen Konstruktionen, bewerten aber keine vollständige Lösung oder fachliche Qualität. | mittel | LaTeX/Typst, Kurse |
| Schreibtrainer: zusammenhängende Texte | **Bestätigt offen.** Von Zeichen/Buchstabengruppen über Wörter/Sätze zu kurzen Absätzen staffeln; DE/EN, Zeichensetzung, Zahlen, Fortschritt und Messregeln ergänzen. | mittel | Schreibtrainer |
| Größere Praxisprojekte | **Bestätigte Ausbauoption.** Mehrseitiges Webprojekt, SQL/API-Praxis und betreutes Cloud-/DevOps-Projekt nach Nutzerbedarf; keine Platzhalter veröffentlichen. | hoch | Kurse, Praxislabore |
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
3. P2/P3 erst nach Abschluss oder ausdrücklicher Neugewichtung der extern blockierten P1-Punkte beginnen.
