# IT-Worlds · Arbeitscheckpoint

## Ziel
Informationsarchitektur, Benutzerführung und vernachlässigte Inhalte iterativ verbessern; vollständige geprüfte Pakete veröffentlichen. `.clinerules` unverändert erhalten. KI und LaTeX vorerst nicht ausbauen.

## Gesicherter Stand
- GitHub main und codex/cloudstand-lokal: 0ec1697, alle drei CI-Jobs erfolgreich (40044291333). Vorherige Pakete: Orientierung/Suche, Grundlagen, TypeScript/Web, Linux/Netzwerk/Sicherheit, Cloud/DevOps, vollständige geführte Wege, Python und Quizrunden.
- Öffentlich 24.10.2026 02:18:33 Europe/Stockholm: Version af5f9f59-aa9d-4c5f-80b8-7ab7e57e7f77, Deployment 83741850-9dcf-4ce0-bf37-52db12dfe174, 100 % Traffic. Account/Subdomain/Einstellungen/vier Bindings erhalten.
- Zwölf Kurse, 100 Kapitel, 210 Fragen, 169 Quellen; 110 lesbare Inhalte, jeweils DE/EN. Drei geführte Wege mit 13/14/10 realen Schritten und gemeinsamem Fortschritt. Quiz: 5/10/20/alle, reproduzierbares Mischen, gezielte Fehlerlinks.

## Verifikation
37 Tests (36 bestanden, Docker lokal ohne Engine übersprungen; echter Linux-Containerfall in CI erfolgreich), 113 Dateien strikt ohne Meldungen. 292 HTML-Seiten, 286 öffentliche URLs; öffentlicher bytegleicher Abgleich erfolgreich. Python-Listings lokal auf 3.12.6 und CI auf 3.12 ausgeführt, Grenz-/Fehlerfälle und unveränderte Eingaben geprüft. Browser: DE/EN, mobil/Designs, Menü/Tastatur, vollständige Quizrunde/Feedback/Ergebnis/Neustart/Einzelfrage, geführte Wege. Lernstand mit lokal simulierter Session geprüft, keine neue tatsächliche Neon-Anmeldung behauptet.

## Laufendes Paket und nächster Schritt
- Isolierter Release-Build implementiert: frischer temporärer Ordner, Pflichtdateien/Konfliktkopien/Symlinks, SEO/interne Verweise vor Upload, öffentliche Auslieferung danach, nur eigenen temporären Ordner entfernen. 38 Tests (37 pass/1 Skip), 117 strikte Dateien; Dry-Run erfolgreich mit 372 Artefaktdateien/286 URLs/19.863 internen Verweisen.
- Releasepaket sichern und mit dem nächsten vollständigen Inhaltspaket tatsächlich einsetzen. Nächste priorisierte Inhaltslücke: Betriebssystemkonzepte (Prozesse/Scheduling, Adressräume/Paging, Nebenläufigkeit und Dateipersistenz); bestehender Linuxkurs behandelt hauptsächlich Bedienung.

## Grenzen
Kein unabhängiges Fachreview, kein neuer echter angemeldeter E2E-Test, keine systemd-Liveprüfung oder Core-Web-Vitals-Feldmessung. Backend/Auth/Schema unverändert. Quell- und Nutzerdateien nicht pauschal bereinigen. Kontingent bis zur Ausführungsgrenze produktiv weiterverwenden, geprüfte Meilensteine früh sichern.
