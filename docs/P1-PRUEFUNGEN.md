# P1-Prüfungen · 25. Oktober 2026

Technische Pakete öffentlich freigegeben: Quellcommit 9ccd793, erfolgreiche Quality 40237691162 und Cloudflare-Version 7f5d4d27-b4c3-4353-ac77-8161225c44a3. Der [Versionsnachweis](VALIDIERUNG.md) dokumentiert Migration und öffentliche Prüfung. Die beiden externen Nachweise unten bleiben ausdrücklich offen.

## Wiederholbare technische Prüfungen

- `npm run test:development`: bestehende private development-Runtime als `IT_WORLDS_RUNTIME_FILE`, bestehende private Testaccountdatei als `IT_WORLDS_TEST_CREDENTIALS`. Der Runner startet ausschließlich einen eigenen Worker auf localhost:8790 und beendet ihn anschließend. Keine Produktion, keine geheimen Ausgaben.
- Die Folge prüft zwei echte Sessions/Fortschritte, RLS und die Schreibtrainer-API einschließlich tatsächlich abgewartetem 60-Sekunden-Fenster. Die Replays sind erzeugte Protokolltests, kein Nachweis menschlichen Tippens. Testkonten bleiben nur auf development; Anzeige wird nach dem Test deaktiviert.
- `IT_WORLDS_GODOT=/absoluter/pfad/zur/Godot-4.5-Binaerdatei node --experimental-strip-types --test tests/godot-examples.test.ts`: temporäre Projektkopie, tatsächlicher Import, Pfeile/diagonale Geschwindigkeit, Wände, Area2D-Kontakt, genau fünf Punkte, Abschluss und fünf Neustarts. Archiv und Quelldateien werden bytegleich verglichen.
- `IT_WORLDS_SYSTEMD_TEST=1 node --experimental-strip-types --test tests/systemd-examples.test.ts`: unter Linux in einer regulären Benutzersitzung mit laufendem Benutzer-systemd und lesbarem Journal. Führt genau den veröffentlichten Shellblock aus; zufällig benannte eigene Test-Unit, erwarteter Exit 17, Result und Journal. Bereinigung nur dieser Unit.
- CI enthält separate Godot-4.5- und Linux-systemd-Jobs. Offizielle Godot-Downloads werden vor Ausführung per SHA-256 geprüft. Die Linux-Vorbereitung betrifft ausschließlich den kurzlebigen GitHub-Runner. Gewöhnliche Docker-Container ohne delegierte Kontrollgruppen reichen nicht aus; hierfür keine bestehenden Container oder Host-Kontrollgruppen ändern.

## Extern blockierte Nachweise

### Unabhängiges Fachreview und assistive Nutzerprüfung

Technische Tests, Quellenabgleich und die eigene Browserprüfung ersetzen diesen Nachweis nicht. Benötigt werden fachkundige unabhängige Prüfpersonen und reale Nutzer assistiver Technik. Der Prüfstand umfasst 18 Kurse/145 Kapitel/300 Fragen sowie DE/EN; Prüfperson, Version/Commit, geprüfte Kapitel/Fragen, Befunde, Korrekturen und Nachprüfung sind festzuhalten. Besonders prüfen: korrekte Aussagen/Antworterklärungen, Lernvoraussetzungen, Formeln/Beispielgrenzen, nachvollziehbare Navigation, Sprache, Fokus, Tastatur, Screenreader und Zoom. Erst tatsächlich geprüfte Teilmengen freigeben; keine pauschale Zertifizierung.

Aktuell: **offen**. Keine externe Prüfung oder Teilnahme behauptet.

### Tatsächliche Passwort-Wiederherstellung per Mail

Technisch geprüft: ungültiger Reset-Token abgewiesen, fehlerhafte Mail abgewiesen, unbekannter Account erhält neutrale Antwort, fremde Origin abgewiesen. Der gemeinsame Neon-Maildienst ist konfiguriert; Mailverifizierung bleibt wie gewünscht ausgeschaltet. Ein erfolgreicher API-Request beweist keine Zustellung.

Benötigt wird ein kontrolliertes Testpostfach. Ablauf: eigenes Testkonto auf development, Reset anfordern, Empfang/Spam/Absender und korrekten Sprachlink prüfen, Passwort über empfangenen Link ändern, altes Passwort abweisen, mit neuem Passwort anmelden, alten Link erneut und nach Ablauf abweisen. Tokens/Passwörter niemals im Protokoll speichern. Nutzer entscheidet über ein reales Postfach; kein fremder oder öffentlicher Wegwerf-Maildienst wird ungefragt verwendet.

Aktuell: **offen**, weil kein kontrolliertes Postfach für diesen Test verfügbar ist. Die vorhandenen example.invalid-Testkonten können keine Mail empfangen.

## Technische Quellen

Gelesen am 25.10.2026:

- systemd project, systemd 262, [systemd-run: Description, --unit, --wait](https://www.freedesktop.org/software/systemd/man/latest/systemd-run.html); vorhandene systemctl-/journalctl-Belege ergänzen den Kurs.
- Godot Engine contributors, Godot 4.5, [Command line tutorial: --headless, --import, --script](https://docs.godotengine.org/en/4.5/tutorials/editor/command_line_tutorial.html).
- Neon, laufende Dokumentation, [Auth production checklist: Email provider requirements](https://neon.com/docs/auth/production-checklist). Shared-Mailversand und tatsächlicher Empfang sind getrennt zu prüfen.
