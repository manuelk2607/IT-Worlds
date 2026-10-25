# Aktiver Auftrag · P1-Abschluss · 25.10.2026

Ziel: die fünf konsolidierten P1-Pakete unten abarbeiten, keine P2/P3-Erweiterung. Vorhandener Dokumentationsdiff bleibt erhalten. Reihenfolge: (1) Ranking-Audit/echte development-Sessions und Fehler beheben, (2) Godot-Engine-/Browserprüfungen, (3) reproduzierbares Linux-/systemd-Labor, (4) Auth-Reset-Fehlerpfade und erreichbare technische Accessibility-Prüfungen, (5) Gesamttests/Check/Build und präziser Abschluss.

Stand: Development-Branch, Migration 002 und Auth ohne Verifizierung bestätigt; bestehende private Runtime-/Testaccountdateien verfügbar. Ranking bleibt bis bestandenen Prüfungen deaktiviert. Ein unabhängiges menschliches Fach-/assistives Review und ein tatsächlicher Reset-Mailempfang können ohne externe Prüfpersonen bzw. kontrolliertes Postfach nicht als erledigt gelten. Kein solcher Nachweis wird simuliert. Laufend: Ranking-Implementierung und Testvoraussetzungen prüfen.

Paket 1 verifiziert: `test:development` startet einen eigenen localhost-Worker mit bestehender eingeschränkter development-Rolle. Zwei echte Accounts/Sessions, alter Fortschrittstest, Ranking-RLS, fremde IDs/Origin, konkurrierende Starts (200/429), echte 61 Sekunden Serverwartezeit mit DE/EN-Protokollreplays, konkurrierende Abgaben (200/409), frühe/Burst-/wiederholte Abgaben, alle Ranglistenfilter, feste öffentliche Projektion, Opt-in/out und widerrufene Session bestehen. Keine menschliche Tippleistung behauptet. Reset-Negativpfade (ungültiger Token, fehlerhafte Mail, neutrale Unbekannt-Antwort, fremde Origin) bestehen; echter Mailempfang bleibt blockiert. Behoben: veränderbare Trainerzustände während Requests, doppelte Starts/Speicher-Race, unklare Namenskollision und ungültige UUID mit Serverfehler. Feature im Arbeitsstand zum Test aktiviert; Produktion noch nicht migriert/veröffentlicht.

Paket 2 laufend: verifizierte Godot-4.5-Binärdatei (SHA-256 abb7cabe99fead0bd63ce03bd8c611734b2941f9b90051e8e3b5c6691527954d) in eigener temporärer Kopie. Echter Engine-Test fand einen Neustartfehler durch alte Kollisionsereignisse; Korrektur und erneuter Test laufen. Eigenes Linux-Laborimage gebaut; unprivilegierter systemd-Benutzermanager wird geprüft. Nächster Schritt: Engine-Regressionsprüfung und systemd-Liveprüfung abschließen; danach Browserprüfung und ggf. Produktionsmigration. Keine bestehenden Container geändert.

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
| Ranking-/Schreibtrainer-Backend sicher freigeben | **Bestätigt offen.** Zwei echte Konten, RLS, fremde/duplizierte/manipulierte Abgaben sowie Timing-/Replay-Grenzen auf development prüfen; danach erst Produktionsmigration und Aktivierung. Online bleibt bis dahin absichtlich deaktiviert. | hoch | Neon, Worker, Datenschutz, Schreibtrainer |
| Godot-Projekt und Browserprüfungen abschließen | **Bestätigt offen.** In Godot 4.5 importieren und Spielablauf/Reset prüfen; ergänzende DE/EN-, Mobil- und Tastaturprüfung dokumentieren. | mittel | Spieleentwicklung, QA |
| Unabhängiges Fach- und assistives Review | **Bestätigt offen.** Quellenabgleich ist kein Fachreview. Kurse/Quizze, Textsatz-Lernwege, Tastaturbedienung und Screenreader-/Kontrast-/Feldtests mit unabhängigen Personen prüfen. | hoch | Inhalte, Barrierefreiheit, UX |
| Kontrollierten Mail-/Passwort-Reset-Test durchführen | **Bestätigt offen.** Anmeldung und Fortschritt sind vorhanden; tatsächliche Mailzustellung und Reset in einem kontrollierten Postfach fehlen als Nachweis. | mittel | Auth, Betrieb |
| Linux/systemd-Benutzerlabor | **Bestätigt offen, nicht kritisch.** Ein reproduzierbares Linux-/systemd-Testsystem fehlt; kein Produktionsdienst darf dafür verändert werden. | mittel | Betriebssysteme/Linux, QA |

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

1. Unabhängiges Fach-/assistives Review und kontrollierter Auth-Mailtest als Freigabegrundlage.
2. Ranking-/RLS-/Replay- und Godot-Prüfungen isoliert auf development; nur bei bestandenem Audit Produktionsmigration und schrittweise Aktivierung.
3. Linux/systemd-Labor sowie Lernenden-Erprobung, daraus konkrete UX- und Inhaltskorrekturen.
4. Schreibtrainer-Texte und zusätzliche Aufgaben/Rubriken mit geprüften Inhalten.
5. Nur bei nachgewiesen kleinem Aufwand: Dokumentdiagnostik/PDF-Vorschau; P3-Ideen zuletzt.
