# IT-Worlds · Arbeitscheckpoint

## Abgeschlossenes Kontingentpaket · 24. Oktober 2026
Informationsarchitektur, Benutzerführung und vernachlässigte Inhalte in geprüften Paketen erweitert. `.clinerules` unverändert und unversioniert erhalten; KI und LaTeX inhaltlich nicht weiter ausgebaut.

## Tatsächlicher Stand
- 10 Themenwelten, 13 Kursfolgen, 108 Kapitel, 226 erklärte Fragen und 181 Lernquellen, vollständig DE/EN. Dazu zehn Einstiege und zehn Übungseditoren. Neue Folgen dieses Kontingents: Cloud/DevOps, Python, Betriebssystemkonzepte; Netzwerke um IPv6 und Routing ergänzt.
- Drei durchgehende Lernwege mit 13/14/10 realen Schritten. Gemeinsame Kapitelkennungen, nächster ungelesener Schritt, Fortschritt und Wiederholung auch in Kurskarten. Themenpläne berücksichtigen sämtliche Kurse pro Thema.
- Quiz: 5/10/20/alle, reproduzierbares Mischen, Neustart derselben Runde, gezielte Fehlerlinks, konsistente Direktfilter. Aufklappbare Filter und größere kleine Texte verbessern die Mobilansicht. Gemeinsame Kopierknöpfe für Code; Suche weist ungültige Ergebnis-URLs ab.
- Releases verwenden frische isolierte Artefakte mit SEO-/Linkprüfung und anschließendem öffentlichem Bytevergleich. Transiente Netzfehler werden begrenzt wiederholt; bei fehlgeschlagener Postdeployprüfung bleibt das Artefakt erhalten.

## Veröffentlichung und Sicherung
- Cloudflare öffentlich: Version 3c3a56d6-38ed-4cbd-b3ed-d35611997784, Deployment f72fbf6c-04c5-44ff-89a7-b476a29b6cd1, 24.10.2026 02:45:22 Europe/Stockholm, 100 % Traffic. Account, Subdomain, Einstellungen und vier Bindings erhalten; am 24.10. nach Wiederaufnahme erneut bestätigt.
- GitHub main und codex/cloudstand-lokal: Code bis 3c3b565 gesichert. Letzte Änderung korrigiert die npm-10-Override-Auflösung; Bibliotheksversionen und öffentlich ausgelieferter Code bleiben gleich. GitHub-Run 40076879059 vollständig erfolgreich: Node 22.22.0, Node 24 und echter Linux-Containerfall. Beschreibung, Website-Link, Tags und DE/EN-README aktualisiert.

## Verifikation
- 41 lokale Tests: 40 bestanden, ein Containerfall ohne laufende lokale Engine übersprungen; derselbe echte Containerfall besteht in CI. 127 Dateien strikt ohne Fehler/Warnungen/Hinweise.
- Build: 312 HTML-Seiten; 21.515 interne Links/Assets/Anker. Alle 306 öffentlichen Sprachseiten erneut bytegleich und indexierbar geprüft; HTTPS-Weiterleitung und DE/EN-404 bestätigt. Isolierte Deployment-Vorschau erfolgreich.
- Vollständiger npm-Audit: null Schwachstellen. Eng begrenzte Zod-/Undici-Korrekturen samt Lockdatei; npm 10 installiert in CI erfolgreich. Auth-Konfiguration, Datenbankschema und RLS unverändert.
- Browser: DE/EN, Designs, mobile Navigation/Escape/Fokus, Suche, mehrkursige Themenpläne, Quiz samt Erklärungen/Ergebnis/Neustart, Codekopie zeichengetreu auf der öffentlichen Website. Fortschritt mit lokaler simulierter Session: TypeScript 5/8 → nächstes Testkapitel, Web 8/8 → Wiederholung. Temporären Fixture-Server beendet.

## Verbleibende priorisierte Aufgaben
1. Unabhängiges Fachreview; Quellenabgleich ist davon getrennt.
2. Neuer echter angemeldeter E2E-Test mit getrennten Nutzern auf isoliertem Entwicklungsbranch; die neue UI-Prüfung verwendete simulierte Sessions.
3. Assistive Nutzerprüfungen und Core-Web-Vitals-Felddaten; systemd-/reales IPv6-Labor.
4. Weitere vollständige Inhaltspakete: Typst/Markdown, NoSQL/Replikation, Webhooks/GraphQL und größeres Betriebsprojekt. Abgeschlossene Kurse beschreiben ihren definierten Umfang, keine vollständigen Fachgebiete.

Details: docs/VALIDIERUNG.md, docs/WEITERENTWICKLUNG.md und docs/AUSBAU.md. Keine offenen Implementierungsänderungen dieses Pakets.
