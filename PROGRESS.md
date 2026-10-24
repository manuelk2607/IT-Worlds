# IT-Worlds · Arbeitscheckpoint

## Abschluss · 24. Oktober 2026
Ziel dieser Runde: tatsächliche Praxis- und Orientierungslücken schließen, bestehende Funktionen und Nutzerarbeit erhalten. Arbeitsbranch `codex/cloudstand-lokal`; Nutzercommit `43a48e5` unverändert in der Historie.

Abgeschlossen und auf GitHub: `19ea45e` (13 neue kursbezogene Aufgaben, eigene DE/EN-Adressen, Katalogfilter, Kapitel-/Themen-/Such-/SEO-Verknüpfung), `8bfd4ac` (204 Quellen nach Text, Thema und Herausgeber filtern), `25cf8eb` (globale Quellensuche, direkte Belegkarten, bessere Aufgabenbegriffe, lesbarere Quellenmetadaten). Vorhandene zehn Übungsadressen und Entwurfsschlüssel erhalten. KI und LaTeX inhaltlich nicht erweitert.

Veröffentlicht: Version `b54243e9-3627-496e-a8f4-66c0c378638f`, Deployment `513face4-f18e-43cb-9be9-04b6c0ebe106`, 24.10.2026 15:53:22 Europe/Stockholm, 100 %. 368 öffentliche Sprachseiten bytegleich; Account/Subdomain/Einstellungen und vier Bindings unverändert. Keine DB-/Authänderung.

Verifikation: 64 Tests mit Typst 0.15.1, 60 erfolgreich/4 lokale SQL-/Docker-Skips; 156 strikte Dateien ohne Meldungen; 374 HTML-Seiten/25.207 interne Verweise; Dry-Run, Live-Audit und Browser erfolgreich. GitHub-Run 40100011712: Node 22.22/24 und vorhandene PostgreSQL-/Dockerbeispiele erfolgreich. Neue Aufgaben, Entwurf/Undo/Reset, Themen-/Kurs-/Stufen-/Quellenfilter, DE/EN, globale Suche, Mobilmenü, helle/dunkle Ansicht, Quiz samt allen Erklärungen und Neustart sowie beide 404-Varianten geprüft. Eigener Testserver beendet; Browser-Viewport zurückgesetzt.

## Nächster sinnvoller Schritt / Grenzen
Weitere aufeinander aufbauende Aufgaben je Kapitel und größere Praxisprojekte priorisieren; danach echtes systemd-Benutzerlabor. Unabhängiges Fachreview, assistive Nutzerprüfung/Feldmessungen und kontrollierter Mail-/Passwort-Reset-Test bleiben offen. Der Editor ist ein begrenztes lokales Lernmodell, kein vollständiger Interpreter. Neue Datenbankarbeit laut `.clinerules` ausschließlich über MCP `it-worlds`; in dieser Runde keine Schemaarbeit.

Lokales `dist/` zeigte nummerierte Ordnerkopien und fehlende Pfade; isolierte Builds außerhalb des Arbeitsordners waren korrekt. Ursache der lokalen Umbenennungen nicht abschließend geklärt. Für Browser/Release isolierte Artefakte verwenden; Details und Nachweise in `docs/VALIDIERUNG.md`.
