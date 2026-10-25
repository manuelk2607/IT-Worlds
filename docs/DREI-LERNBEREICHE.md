# Drei neue Lernbereiche · lokaler Zwischenstand

Abgleich am 25.10.2026 im Textsatz-Auftrag: serieller Build und Deploy-Dry-Run inzwischen erfolgreich; sechs falsche Links auf nicht vorhandene Übungseditoren führen jetzt zum tatsächlichen Labor. Der frühere parallele Modulfehler wurde dabei nicht reproduziert. Ranking-/RLS-/Zwei-Account-/Replay-/Godot- und weitere eigene Freigabeprüfungen dieses Bereichs bleiben offen; keine Veröffentlichung oder Produktionsmigration erfolgt. Der historische Prüfstand unten bleibt als Kontext erhalten.

Die neuen Themen Hardware & Software, 10-Finger-Schreiben und Spieleentwicklung ergänzen vorhandene Kurse und Komponenten. Alle Inhalte sind deutsch/englisch; Gäste können lokale Übungen verwenden. Neue Inhalte und Werkzeuge sind noch nicht veröffentlicht.

Der Trainer berechnet Werte aus dem Eingabereplay. Ein Normwort umfasst fünf Zeichen; die Messung beginnt mit explizitem Start. Netto-WPM verwendet korrekt verbleibende Zeichen, KPM alle druckbaren Eingaben. Korrekturen löschen frühere Fehlanschläge nicht aus der Genauigkeit. Lokale Historie ist kein verifizierter Wettbewerb. Serverprüfungen erschweren offensichtliche Manipulation; sie beweisen keinen menschlichen Teilnehmer.

Die additive Migration 002_typing.sql ist nur auf development angewendet. Konto- und Ranglistenfunktionen benötigen vor Freigabe echte Zwei-Account-/RLS-, Timing-, Replay- und Doppelabgabetests. Produktionsdaten und vorhandene Migrationen wurden nicht verändert. Das eigene Godot-Projekt ist als ZIP verfügbar, aber noch nicht in der Engine ausgeführt. Keine weitergehenden Projekte, Videos, Duelle oder vollständige Expertenausbildung behaupten.

Automatisch: 66 Tests, davon 61 erfolgreich und 5 lokale Laufzeit-Skips; 171 strikt geprüfte Dateien ohne Meldungen; isolierter Build 422 Seiten. Browser: Start, Eingabe, Auswertung und lokale Speicherung einer Gastübung geprüft. Umfangreiche weitere Browser- und Backendprüfungen bleiben offen. Der Auftrag hat die erlaubte Kontingentgrenze überschritten; weitere Entwicklung wurde beendet. Details und nächster Schritt in [PROGRESS.md](../PROGRESS.md).

Abschlusskorrektur: Der zuvor erfolgreiche isolierte Build (422 Seiten) wurde durch die letzten parallel gestarteten Build-/Releaseprüfungen nicht erneut bestätigt. Abschließender npm-Build und Deploy-Dry-Run schlugen fehl (Modul-/Linkprüfung; Logs im privaten temporären Verzeichnis). Vor Freigabe seriell wiederholen und Ursachen prüfen. Kein Deployment durchgeführt.
