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
