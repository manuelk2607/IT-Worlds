# Drei neue Lernbereiche · Stand und historische Prüfungen

## Aktueller P1-Abschluss · 25.10.2026

Zwei echte development-Konten/RLS, tatsächliches 60-Sekunden-Serverfenster, DE/EN-Replays, fremde/frühe/konkurrierende/doppelte/Burst-Abgaben, pseudonyme Opt-in/out-Sichtbarkeit und alle Ranglistenfilter erfolgreich geprüft. Der Server berechnet Werte aus dem festen Text und Replay; erfundene Score-/Nutzerfelder werden ignoriert. Namenskollisionen liefern verständlich 409, ungültige UUIDs 400. Clientzustände sind während Requests gesperrt; Endwerte sind konsistent.

Migration 002_typing.sql mit unveränderter SHA-256 480f256914ca3f553f2a0570d5cea40035d9988f06849effc002bcc87f7ab92f nach development-Tests auf main angewendet. Vorhandene Fortschrittsdaten erhalten; beide neuen Tabellen erzwingen RLS. Eingeschränkte Produktionsrolle ohne BYPASSRLS, ohne Kontext keine privaten Zeilen.

Godot 4.5 tatsächlich ausgeführt: Import, Bewegung, diagonale Geschwindigkeit, echte Kollision, fünf Punkte, Abschluss und fünf Neustarts. Alte Kollisionsereignisse beim Neustart durch eindeutige Area2D-Zuordnung und verzögerte Aktivierung behoben. ZIP und Quellen bytegleich.

Browser: echte development-Anmeldung, Historie, Profil/Speicherung, Ranglistenabbruch, Hardware-Halbaddierer/CPU/Reset, Spiele-Buttons/Pfeile/Reset, DE/EN, beide Designs, Mobilmenü/Escape/Fokus, 390px ohne Seitenüberlauf und beide 404-Seiten. GitHub Quality 40215505510: sechs Jobs erfolgreich einschließlich Godot und Linux/systemd. [P1-Prüfungen und externe Grenzen](P1-PRUEFUNGEN.md), [öffentlicher Versionsnachweis](VALIDIERUNG.md).

## Historischer Stand vor P1-Freigabe

Historischer Abgleich vor dem Release am 25.10.2026: serieller Build und Deploy-Dry-Run inzwischen erfolgreich; sechs falsche Links auf nicht vorhandene Übungseditoren führen jetzt zum tatsächlichen Labor. Der frühere parallele Modulfehler wurde dabei nicht reproduziert. Ranking-/RLS-/Zwei-Account-/Replay-/Godot- und weitere eigene Freigabeprüfungen bleiben offen. Der spätere Release unten veröffentlicht die statischen Inhalte und lokalen Übungen, aktiviert aber weder das ungeprüfte Rankingbackend noch dessen Produktionsmigration.

Die neuen Themen Hardware & Software, 10-Finger-Schreiben und Spieleentwicklung ergänzen vorhandene Kurse und Komponenten. Alle Inhalte sind deutsch/englisch; Gäste können lokale Übungen verwenden. Die statischen Inhalte und lokalen Übungen sind mit der vereinfachten Dokumentprüfung vom 25.10.2026 veröffentlicht; Versionsnachweis in VALIDIERUNG.md. Online-Konto-/Ranglistenfunktionen sind über release-features.ts ausdrücklich deaktiviert und bleiben ein eigener Prüfumfang.

Der Trainer berechnet Werte aus dem Eingabereplay. Ein Normwort umfasst fünf Zeichen; die Messung beginnt mit explizitem Start. Netto-WPM verwendet korrekt verbleibende Zeichen, KPM alle druckbaren Eingaben. Korrekturen löschen frühere Fehlanschläge nicht aus der Genauigkeit. Lokale Historie ist kein verifizierter Wettbewerb. Serverprüfungen erschweren offensichtliche Manipulation; sie beweisen keinen menschlichen Teilnehmer.

Die additive Migration 002_typing.sql ist nur auf development angewendet. Konto- und Ranglistenfunktionen benötigen vor Freigabe echte Zwei-Account-/RLS-, Timing-, Replay- und Doppelabgabetests. Produktionsdaten und vorhandene Migrationen wurden nicht verändert. Das eigene Godot-Projekt ist als ZIP verfügbar, aber noch nicht in der Engine ausgeführt. Keine weitergehenden Projekte, Videos, Duelle oder vollständige Expertenausbildung behaupten.

Historische Verifikation des ursprünglichen Auftrags (aktuelle Releaseprüfungen in VALIDIERUNG.md): 66 Tests, davon 61 erfolgreich und 5 lokale Laufzeit-Skips; 171 strikt geprüfte Dateien ohne Meldungen; isolierter Build 422 Seiten. Browser: Start, Eingabe, Auswertung und lokale Speicherung einer Gastübung geprüft. Umfangreiche weitere Browser- und Backendprüfungen bleiben offen. Der ursprüngliche Auftrag hat die erlaubte Kontingentgrenze überschritten; weitere Entwicklung wurde damals beendet. Details und aktueller Stand in [PROGRESS.md](../PROGRESS.md).

Abschlusskorrektur: Der zuvor erfolgreiche isolierte Build (422 Seiten) wurde durch die letzten parallel gestarteten Build-/Releaseprüfungen nicht erneut bestätigt. Abschließender npm-Build und Deploy-Dry-Run schlugen fehl (Modul-/Linkprüfung; Logs im privaten temporären Verzeichnis). Vor Freigabe seriell wiederholen und Ursachen prüfen. Kein Deployment durchgeführt.
