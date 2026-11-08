# IT-Worlds – Fortschritt


## Zentrale Anmeldelinks – 08.11.2026

Worlds-Modus: Anmeldeaktionen in Navigation und Kontoseite sind normale Links zu
`/auth/start`; lokale Zugangsdatenformulare bleiben ausgeblendet. Die öffentliche
Konfigurationsantwort wird einmal pro Seite geladen und gemeinsam verwendet.
Bestehende Sitzungs-/Fortschrittsauflösung bleibt erhalten; ohne aktivierten
Worlds-Modus bleibt die bisherige Anmeldung verwendbar. Bei unbekannter
Konfiguration zeigt die Kontoseite einen Fehler statt paralleler Zugangsdaten.
Hinweise auf ein nicht mehr sichtbares lokales Anmeldeformular wurden korrigiert.

Gemeinsamer Auth-Client 0.1.3 mit geprüftem Subtree und Dateiprüfsummen vendort.
Neue GET-Route bewahrt Rate-Limits, PKCE, erlaubte Rücksprünge und hostgebundene
Cookies; POST ohne Origin-/CSRF-Nachweis bleibt gesperrt. 128 Tests bestanden,
10 umgebungsbedingt übersprungen; Astro-Check 293 Dateien ohne Befund und Build
mit 534 Seiten erfolgreich. Chromium/WebKit in DE/EN bei 320/1280 px bestätigten
Links, ausgeblendete lokale Formulare, Legacy-Modus, Sprach-/Designwechsel,
Mobilmenü und beide 404-Varianten mit lokalen Testantworten.

Produktion read-only: 2 native Konten, beide ohne bestätigte E-Mail, eines mit
aktiver Sitzung, 17 Fortschrittszeilen. Keine produktive Mapping-Tabelle vorhanden;
keine Konten verschoben oder produktive Anmeldung umgestellt. GitHub-CI
`42515340829` für `321fe36` erfolgreich (Anwendung `e0202c5`). Der erste Lauf
beanstandete die neue dynamische Route im statischen Linkprüfer; ausschließlich
`/auth/start` als getestete Worker-Route ergänzt. Lokal 40.228 interne Links und
528 öffentliche SEO-Seiten geprüft, vollständige erneute CI erfolgreich.
Offene Abnahme:
echter Provider-/Eigentums-/Rollen-/Daten-/Rücknahmeablauf; eigene Cloudflare-
Pilotberechtigung fehlt weiterhin. Vorhandene Tokens anderer Projekte werden
nicht verwendet. Providerfehler als vollständige Dokumentansicht separat offen.

Stand: 01.11.2026. Arbeitsbranch: `codex/cloudstand-lokal`. Diese Datei beschreibt den aktuellen, verifizierten Stand; ältere Zwischenstände wurden aufgelöst und widersprüchliche Hinweise durch spätere Nachweise ersetzt.

## 1. Offene Aufgaben & geplante Features

### Worlds-Hub-SSO-Pilot (04.11.2026, separater Featurebranch)

Nachprüfung 07.11.2026. Der gemeinsame OIDC-Client ist auf Version 0.1.1
aktualisiert. Ein frischer zentraler Nachweis wird mit `max_age=300`
angefordert und im signierten ID-Token geprüft. Der reale Hub-QA-Anbieter
hat aktuelle und ältere Sitzungen mit positivem Zeitfenster bestätigt.
127 Tests bestanden, zehn umgebungsbedingt übersprungen. Astro-Check für
293 Dateien sowie Build mit 534 Seiten erfolgreich. Der vollständige
IT-Browserpilot bleibt Voraussetzung der Aktivierung.

Bereitstellungsstand 05.11.: atomare Rate-Budgets und begrenzter Ablauf-Cleanup auf isoliertem Neon-Zweig real geprüft. Separates Cloudflare-Pilotprofil mit deaktiviertem Flag, gesperrtem Legacy-Proxy und noindex im Trockenlauf erfolgreich. 127 Tests bestanden/10 übersprungen; Typprüfung und Build grün. Kein produktives Schema und kein Worker verändert. Cloudflare-Anmeldung muss erneuert werden; anschließend exakten Callback und echte Browser-SSO-Abnahme ausführen. Details in `docs/WORLDS-SSO-PILOT.md`.

Fortsetzung 05.11.: OIDC-Routen, eigener Postgres-Sessionstore, gemeinsame lokale Identitätsauflösung für Fortschritt/Trainer und DE/EN-Kontokarte implementiert. Featureflag standardmäßig aus. Migration 004 und tatsächlicher isolierter Session-/Mapping-/Kontosperren-Test bestanden; keine Produktionsmigration oder Aktivierung. Gemeinsame Quelle Worlds-Hub `80db3d7`. 135 Tests: 125 bestanden/10 umgebungsbedingt übersprungen; Typprüfung und Build erfolgreich. Lokale visuelle DE/EN-/Mobil-/Theme-/404-Abnahme mit simulierten Zuständen, kein echter Browser-SSO-Nachweis. Aktuelle Grenzen und nächster Schritt in `docs/WORLDS-SSO-PILOT.md`.

Isolierte Wiederherstellung aus der vorhandenen Sicherung durchgeführt. Additive Migration 003 ausschließlich auf `development-worlds-hub-sso-20261104` angewendet, echte eingeschränkte Runtime-Verbindung mit atomarer Zuordnung, RLS-/Issuer-/Session-Isolation und Transaktionsrollback erfolgreich geprüft. Produktion weiter ohne Mapping-Tabelle und mit identischer Prüfsumme ihrer 14 Fortschrittszeilen. Details, Branch-Ablaufzeit, Migrationsprüfsumme und Wiederanlauf in `docs/WORLDS-SSO-PILOT.md`.

Prüfungen: 123 Tests bestanden, 10 umgebungsbedingt übersprungen, Astro-Check ohne Fehler/Warnungen, 534 Seiten gebaut. Bestehender Audit-Befund: eine kritische/elf niedrige transitive Meldungen bei Better Auth und Abhängigkeiten; tatsächliche Plugin-Anwendbarkeit und kompatibles Update vor Aktivierung prüfen. Noch kein OIDC-Browserpilot und kein produktiver SSO-Cutover.

### P0 – kritisch

Keine bestätigten offenen P0-Probleme. Öffentliche Kernfunktionen, Auth-Grundpfade, Datenbankzugriff, RLS, 404-Verhalten, SEO-Ausgabe und statische Seitenerzeugung sind releasegeprüft.

### P1 – wichtig

| Status | Aufgabe | Abhängigkeit | Nächster Schritt |
| --- | --- | --- | --- |
| Extern blockiert | Unabhängiges fachliches und assistives Review. Eigene Quellen-, Compiler- und Browserprüfungen ersetzen diesen Nachweis nicht. | Fachkundige und assistive Prüfpersonen | Abläufe aus `docs/P1-PRUEFUNGEN.md` mit unabhängigen Personen durchführen, Befunde dokumentieren und beheben. |
| Extern blockiert | Erfolgreichen Passwort-Reset einschließlich tatsächlichem Mailempfang prüfen. Negative Token-, Mail-, Origin- und Unbekannt-Nutzer-Pfade sind bereits getestet. | Kontrolliertes Development-Postfach | Reset-Mail empfangen, Link verwenden und Wiederherstellung vollständig nachweisen. |
| Ergänzende Produktionsverifikation | Nach dem autorisierten Neuaufbau von Managed Auth sind Registrierung, Sitzung, Fortschritt, Ab-/Anmeldung und Wiederherstellung mit einem Wegwerfkonto geprüft. Eine isolierte Zwei-Konten-/RLS- sowie Schreibtrainer-Schreibprüfung im neuen Produktions-Authbestand fehlt noch. | Zwei wegwerfbare Testkonten; keine Besitzer- oder Fremddaten verändern | Kontoisolation, fremde IDs, Profil/Run/Opt-in und eigene Fortschritte gezielt prüfen; Testdaten anschließend nur nach sicherer Zuordnung bereinigen. |
| Nutzeraktion | Der frühere Eigentümeraccount wurde beim ausdrücklich autorisierten Auth-Neuaufbau ersetzt. | Eigentümer | Neu registrieren. Alte 13 Fortschrittszeilen nicht automatisch zuordnen oder löschen. |

### P2 – Erweiterungen

| Status | Aufgabe | Abhängigkeit | Nächster Schritt |
| --- | --- | --- | --- |
| Bestätigt offen | Lernwege, Suche, Filter, Fortschritt und Dokumentprüfung mit realen Lernenden beobachten. | Freiwillige Testpersonen | Kurze kontrollierte Lernendenstudie durchführen und konkrete UX-Befunde priorisieren. |
| Geplant, nicht zugesagt | Erweiterte statische Dokumentdiagnostik und gegebenenfalls PDF-Vorschau. | Nur browserlokal oder anderweitig sicher, kostenfrei und wartungsarm | Nutzen und Sicherheitsgrenzen prüfen; keinen eigenen öffentlichen Compilerdienst aufbauen. |
| Optional | Verwaiste Auth-/Fortschritts- und Wegwerftestdaten bereinigen. | Sichere Identifikation; ausdrückliche Freigabe | Erst Bestände aggregiert prüfen und Sicherungsbranch erhalten; keine automatische Kontenzuordnung. |
| Optional | Weitere Praxisprojekte, Medien und Visualisierungen. | Nachgewiesener Lernbedarf und geprüfte Quellen | Nur vollständige, getestete Pakete ergänzen; bestehende ausgereifte Bereiche nicht wiederholen. |

### P3 – optional

| Status | Aufgabe | Abhängigkeit |
| --- | --- | --- |
| Vermutete Verbesserung | Weitere Gamification, Duelle und Community-Funktionen | Erst nach Nutzungsfeedback sowie Datenschutz-/Moderationskonzept priorisieren. |
| Vermutete Verbesserung | CMS/Redaktionsworkflow | Repository-Pflege funktioniert; nur bei nachgewiesenem Redaktionsbedarf prüfen. |
| Vermutete Verbesserung | Weitere Sprachen und Community-Beiträge | Rechte, Reviewverfahren und dauerhafte Pflegekapazität klären. |
| Rechteinhaberentscheidung | Projektlizenz abschließend festlegen | Entscheidung des Rechteinhabers. |

## 2. Bereits implementiert

### Informationsarchitektur, Navigation und Barrierefreiheit

- Statische Astro-Website mit TypeScript, Deutsch/Englisch, Hell-/Dunkelmodus, responsiver Haupt- und Mobilnavigation, Suche, Themen-/Kurs-/Quiz-/Quellenfiltern, Breadcrumbs, 404-Seiten und SEO-Metadaten.
- „Textsatz & Dokumentenerstellung“ ist eine eigene Themenkategorie statt eines Hauptmenü-Reiters. Typst wird als Einstieg hervorgehoben; LaTeX und Typst bleiben übersichtlich getrennt. Alte DE/EN-Kurs- und Kapitel-URLs unter `/themen/programmiersprachen/{typst,latex}/` bleiben kompatibel; IDs und Lernfortschritte wurden nicht verändert.
- Globale Suche schließt bei Treffern den Dialog, setzt brauchbaren Zielfokus und durchsucht auch Aufgaben, Lösungen, Beschreibungen und Lernziele.
- Mobilmenü, Escape-/Fokusverhalten, reduzierte Ansichten, 390-px-Layout und beide Designs wurden wiederholt in DE/EN geprüft.

### Inhalte, Kurse und Lernpfade

- Aktueller veröffentlichter Ausbau umfasst 14 Themen, 22 Kurse, 169 Kapitel, 348 Quizfragen und 273 Quellen. Inhalte und Quellenverknüpfungen sind zweisprachig; bestehende IDs/URLs bleiben stabil.
- Java, C/C++, Go und Rust besitzen jeweils sechs vollständige DE/EN-Kapitel, zusammen 24 getestete Listings, 48 erklärte Fragen und 33 gelesene Primärquellen. Ziele: Java 21, C17/C++20, Go 1.27.3, Rust 1.99.1/Edition 2024. C und C++ werden getrennt erklärt.
- Hardware-Folge, Spieleentwicklung mit Godot/Unity/Unreal-Grundlagen, Linux/systemd-Benutzerlabor, KI, LaTeX/Typst und weitere Themen sind in die vorhandene Kursstruktur integriert.
- Vier geführte Lernpfade; der Hardware-/Systempfad „Vom Rechner zum sicheren Speicherzugriff“ verbindet 14 Kapitel aus Grundlagen, Hardware, C/C++ und Rust mit überprüfbarem CLI-/Zugriffsprotokoll.
- Glossar mit 15 zweisprachigen, quellengebundenen Begriffen, Kurs-/Projektverknüpfungen und kombinierbaren Filtern.

### Übungen und Praxisprojekte

- 203 Aufgaben/Projekte: 169 Kapitelaufgaben, 23 eigenständige Übungen, sieben Projekte und vier Ablaufaufgaben. Eindeutige Themen-/Kursgliederung, Textsuche sowie kombinierte Themen-, Kurs-, Stufen-, Typ- und Statusfilter mit URL-/Sprachzustand, Leerzustand, Reset, 18/36-Nachladen und Zielfokus.
- Direkte Verknüpfungen zu Kursen, Kapiteln, Quizzen und Lernpfaden. Lesen allein erledigt keine Aufgabe.
- Gerätegebundene Selbst-/Modellstände bleiben getrennt von Konto-Lese- und Quizdaten. Entwurfsänderung, Lösung laden, Reset und Undo invalidieren veraltete Modellergebnisse; bestehende Entwürfe bleiben erhalten. Speicherfehler werden sichtbar behandelt.
- Sieben Projekte mit wiederaufnehmbaren Checklisten. Vollständige Referenzprojekte: TypeScript-Webkatalog, PostgreSQL-Lernbericht, HTTP-Vertragsprüfer, Lernzeit-JSON, IPv4-Netzplan, eigene Registermaschine und SHA-256-Inventar. Getestete Referenzen, echte CLIs/Fehlerfälle und bytegeprüfte ZIPs; keine beliebige Browser-Codeausführung.
- Vier tastaturbedienbare Ablaufaufgaben mit Fehlpositionsfeedback und Lösungen sowie interaktiver CPU-Trace mit Neustart.
- Lokale JSON-Sicherung mit Vorschau/Bestätigung, 512-KiB-/500-Einträge-Limits, Versions-, Datums- und Kennungsprüfung sowie Erhalt neuerer Zustände. Importierte Abschlüsse bleiben Selbsteinschätzungen; keine externe Übertragung.

### Schreibtrainer, Rangliste und Lernfortschritt

- QWERTZ-Trainer unter `/schreibtrainer/` und `/en/schreibtrainer/` mit zwölf gestuften DE/EN-Lektionen, zusammenhängenden Sätzen, Absätzen und Alltagstexten, eigener lokaler Texteingabe, Fingerhinweisen, Textfortschritt, konkreten Fehlern, lokaler Historie, getrennten Bestwerten und adaptiven Übungen.
- Konto-Rangliste mit Live-Session, Same-Origin-Prüfung, serverseitiger Startzeit, Replay, Ergebnisberechnung, atomarer Einmalabgabe, Rate-Limits, pseudonymem Opt-in und UTC-Zeiträumen. RLS und feste öffentliche Projektion verhindern Fremdzugriff.
- Additive Migration `002_typing.sql`, Prüfsumme `480f256914ca3f553f2a0570d5cea40035d9988f06849effc002bcc87f7ab92f`, auf Development und nach bestandenem Audit auf Main angewendet. Eingeschränkte Runtime besitzt kein `BYPASSRLS`.
- Zwei echte Development-Konten prüften RLS, fremde IDs/Origin, konkurrierende Starts/Abgaben, 61-Sekunden-Replays, frühe/Burst-/wiederholte Abgaben, Ranglistenfilter, Opt-in/out und widerrufene Sitzungen. Behoben wurden State-Races, doppelte Starts, Namenskollisionen und fehlerhafte UUID-Behandlung.

### Dokumentprüfung und Textsatz

- Sichtbare Links zu Overleaf und typst.app; Bearbeitung erfolgt extern. IT-Worlds importiert begrenzte `.tex`-/`.typ`-Einzeldateien und sichere ZIP-Projekte lokal im Web Worker.
- Gemeinsame statische Analyse für LaTeX/Typst: Hauptdatei, Struktur, Positionen, Referenzen/Ressourcen, Marken/Literatur, doppelte Kennungen, Quellenansicht und verständlicher Bericht. Path Traversal, ZIP-Bombs und übermäßige Ressourcen werden begrenzt bzw. abgewiesen.
- 31 Aufgabenprofile mit Lernzielen, Musterlösungen, bewussten Selbstprüfrubriken und optionaler bestehender Kapitelmarkierung. JSON weist Selbstauskunft aus; Kompilierung wird nicht vorgetäuscht.
- Typst: 16 Kapitel/32 Fragen; LaTeX: 14 Kapitel/28 Fragen. Frühere IDs bleiben erhalten. Alte Typst-Editorentwürfe sind nur lesbar als Download verfügbar.
- Der experimentelle Compilercontainer/Worker-Proxy wurde nach erfolgreichen lokalen Sicherheits- und Beispieltests bewusst aus dem öffentlichen Produkt entfernt. Keine öffentliche Kompilierungsinfrastruktur, kein kostenpflichtiger Dienst; tatsächliche PDF-/Compilerkontrolle bleibt im externen Editor.

### Hardware, Spiele und technische Labore

- Interaktive Halbaddierer-, CPU-Schritt-/Bootfolge- und 2D-Kollisionsmodelle sind tastatur- und buttonbedienbar.
- Godot-4.5-Projekt wurde mit offiziell geprüftem Engine-Download importiert. Engine-Test deckt Bewegung, diagonale Geschwindigkeit, Wände/Area2D, fünf Punkte, Abschluss und fünf Neustarts ab; Resetfehler durch alte Physikkontakte wurde behoben. ZIP entspricht den Quellen.
- Reproduzierbares DE/EN-Linux/systemd-Benutzerlabor mit temporärer Unit, Exit 17, Result-/Journalnachweis und gezielter Bereinigung. Kein privilegierter Container erforderlich.

### Datenbank, Auth und Betrieb

- Neon-Projekt **IT-Worlds** (`lingering-morning-59761503`), Main `br-long-violet-ba34agj1`. Produktionsdatenbank wurde nach isoliertem Test und ausdrücklicher Freigabe regulär von `neondb` in exakt `IT-Worlds` umbenannt; Datenbank-ID 88355 blieb erhalten. Development `br-silent-glade-bamm5co5` bleibt bei `neondb`.
- Sicherungsbranch `before-production-db-rename-20261029` (`br-summer-sun-banaln05`, LSN `0/24C42C0`, ohne Compute) enthält den vorherigen Auth-/Fortschrittsbestand und muss erhalten bleiben.
- Managed Better Auth wurde für den neuen Datenbankpfad offiziell neu provisioniert; öffentliche vertrauenswürdige Origin wieder gesetzt. Drei alte Auth-Identitäten/Sitzungen wurden mit Freigabe ersetzt. 13 alte Fortschrittszeilen blieben unverändert, sind aber verwaist; kein automatisches Mapping und keine Bereinigung.
- Cloudflare-Secrets `DATABASE_URL` und `NEON_AUTH_BASE_URL` verwenden den neuen DB-/Auth-Pfad. Rolle, Passwort und Cookie-Secret blieben erhalten; `ASSETS`, `DATABASE_URL`, `NEON_AUTH_BASE_URL` und `NEON_AUTH_COOKIE_SECRET` sind vorhanden.
- Öffentlicher Wegwerfkonto-Test nach Neuaufbau: Registrierung, Sitzung, Fortschritt speichern, Abmelden, Anmelden, Wiederherstellen und eigene Testmarkierung zurücknehmen jeweils erfolgreich. Gastzugriffe auf private Fortschritt-/Trainerdaten liefern 401.
- Isolierter Prüfbranch `db-rename-safety-20261029` (`br-curly-shape-bakpwy1u`) belegt Rename, Auth-Neuaufbau und Registrierung. Seine Löschung bleibt ohne ausdrückliche branchgenaue Freigabe unzulässig.

## 3. Tests & Veröffentlichungen

### Aktueller öffentlicher Stand

- Live: https://it-worlds.maki26.workers.dev
- Letzter vollständiger Release am 30.10.2026 aus Quellstand `4cb1a0f` einschließlich CSS-Korrektur `78288de3dcf22a9ef9daa94b625501c83c81810e`.
- Aktive Cloudflare-Version `706415e9-38b0-4938-bc4e-d3de256e043c`, Deployment `951b5a20-df96-4f2f-acb0-c6d699a5ea3c`, 100 % Traffic.
- Build-, Artefakt-, SEO- und Linkprüfungen bestanden; alle 528 öffentlichen kanonischen DE/EN-Seiten stimmten exakt mit dem Releaseartefakt überein. Der frühere HTTP-500/10013-Uploadfehler trat nicht mehr auf; Ursache blieb unbekannt.
- Account, Subdomain, Einstellungen und vier Bindings blieben beim Release identisch. Smoke: Auth 200, Gastfortschritt 401, Gast-Trainerkonto 401, Rangliste 200, DE/EN-404 jeweils 404.
- Die CSS-Filtertoolbar ist als Raster mit zwei Spalten mobil und drei Desktop veröffentlicht; einzelne sichtbare Karten füllen ihre Gruppe. Lokal auf 390/1280 px ohne Überlauf geprüft. Keine zusätzliche öffentliche Browserprüfung dieses identischen CSS-Artefakts beim letzten Release.

### Aktuellste vollständige Prüfungen

- Funktionsstand: 133 Tests, 125 bestanden, acht optionale Laufzeit-Skips; alle fünf nativen Compilergruppen tatsächlich ausgeführt.
- Nach DB/Auth-Umstellung: 133 Tests, 123 bestanden, zehn optionale Laufzeit-Skips; keine Fehler. Abweichung entsteht durch optionale Laufzeitumgebung, nicht durch einen bekannten Produktfehler.
- Astro-Typprüfung: 274 Dateien ohne Fehler, Warnungen oder Hinweise. Produktions-Build: 534 Seiten. Kein separates Lint-Skript vorhanden.
- Release-Dry-Run: 528 kanonische Sprachseiten, 40.224 interne Ziele, 716 Artefaktdateien.
- Lokale Browserprüfung deckte Suche/Filter/Reload/Sprachwechsel, Aufgabenstatus, Modelle/Undo, Projektchecklisten, Ablaufaufgaben, CPU, ZIP-Downloads, JSON-Backupimport, Quiz, Mobilmenü, Escape, beide Designs und beide 404 ab. Testmarkierungen wurden zurückgesetzt; Nutzerstände blieben erhalten.

### Relevante Releases und Commits

- Übungen/Praxisprojekte: `5056acf91c2e0f88d808121579565df32ee42929`, Quality `40775678818`, Release vom 28.10. Version `2ed95a39-4a64-47ab-a7a5-35d8a02c5af4`, Deployment `58f53f10-5a02-456c-9ecd-bc6e2d4936a4`.
- Java/C/C++/Go/Rust und Struktur: `ec9db5c693967bf0a121be69588055ce44f377e4`, Quality `40647404074`, Release-Version `88f84534-212b-4c1e-96d0-c87aeca1d4b5`.
- Praxisprojekte/Trainer/Glossar: `059ac2a5d7c087416e22c316cb75b8132f07a7e8`, Version `87c9d6fa-9ff0-49df-8a0a-4ed9fa85ac9b`.
- Textsatz-Themenkategorie: `41ed34b`, Quality `40336730526`, Version `3383c337-abf5-4ffb-82e1-1ea513a92792`.
- Ranking/Godot/systemd: `9ccd793`, Quality `40237691162`, Version `7f5d4d27-b4c3-4353-ac77-8161225c44a3`.
- Schlanke Dokumentprüfung: `4b902cd`, Quality `40179580624`, Version `677144d2-3d90-413b-bc98-35b955122f8e`.
- Datenbank-/Auth-Dokumentation: `625c1bb`, `e84b1f7`, `0a47e01`, `4cb1a0f`; Abschluss-/Release-Dokumentation `cb268ca`.

### Bekannte Grenzen der Nachweise

- Kein unabhängiges Fach-/Accessibility-Review und keine reale Lernendenstudie.
- Kein erfolgreicher echter Reset-Mail-Empfang mangels kontrolliertem Postfach.
- Keine öffentliche Serverkompilierung für LaTeX/Typst; statische Analyse behauptet keine vollständige Syntax- oder Kompilierungsvalidierung.
- Die letzte CSS-Veröffentlichung wurde bytegenau geprüft, aber nicht nochmals als vollständiger öffentlicher Browserdurchgang wiederholt.
- Die Automatisierung `cloudflare-deployment-pr-fen` bestand zuletzt weiter, weil ihre Löschung ohne ausdrückliche Nutzerfreigabe abgelehnt wurde. Ohne ausstehende Änderungen darf sie keinen erneuten Deploy auslösen.

## 4. Historie & Hinweise

### Verbindliche technische Entscheidungen

- Eigenen Projektcode, Astro-Konfiguration, Tests und Skripte ausschließlich in streng typisiertem TypeScript pflegen. Generiertes Browser-JavaScript und Abhängigkeiten nicht manuell umschreiben. Python-, SQL- und LaTeX-Beispiele behalten ihre Sprache.
- Inhalte und Aussagen benötigen tatsächlich gelesene Quellen mit Herausgeber, Version, Abschnitt, URL und Lesedatum. Quellenabgleich ist kein unabhängiges Fachreview. Jede Quizantwort besitzt eine Erklärung.
- Bestehende URLs, Kurs-/Kapitel-/Aufgaben-/Frage-IDs, Nutzerdaten und Lernfortschritte erhalten. Schemaänderungen zuerst auf Development testen und als prüfsummengebundene Migration ausrollen.
- Frontend niemals mit Owner-/`BYPASSRLS`-Rolle verbinden. Auth über Neon Managed Better Auth und Same-Origin-Worker; RLS bleibt erzwungen.
- Dokumentbearbeitung erfolgt extern in Overleaf bzw. typst.app. Keine eigene Editor-, OAuth- oder öffentliche Compilerinfrastruktur aufbauen, solange die schlanke lokale Analyse den Lernzweck erfüllt.
- Cloudflare-Worker `it-worlds` verwendet `dist/` als statische Assets, HTML-Verzeichnisrouten und eigene 404-Seiten. Vor Deploy Build/Checks ausführen und bestehende Bindings/Einstellungen vor und nachher vergleichen.

### Abgelöste Zwischenstände

- Hinweise „CSS noch nicht veröffentlicht“ und „Cloudflare HTTP 500/10013 blockiert den Release“ sind seit dem erfolgreichen Release vom 30.10. erledigt.
- Der isolierte DB-Vorversuch mit Produktion bei `neondb` ist historisch. Produktion heißt jetzt `IT-Worlds`; der spätere autorisierte Auth-Neuaufbau ersetzt die frühere Entscheidung, auf eine Umbenennung zu verzichten.
- Frühere Hinweise auf ungeprüftes Ranking, Godot-Projekt, systemd-Labor, zusammenhängende Schreibtrainertexte, Bewertungsrubriken oder fehlende größere Praxisprojekte sind durch spätere Tests und Releases erledigt.
- Der private Compilercontainer/Proxy war ein Sicherheitsprototyp und wurde bewusst entfernt. Das ist keine unvollständige Produktfunktion.
- Historische niedrigere Inhalts-/Seiten-/Testzählungen dokumentieren frühere Releases und sind keine aktuellen Sollwerte.

### Private Nachweise und Rückfallinformationen

- Kanonische private Produktionskonfiguration: `work/runtime-main.json`; Vor-Rename-Sicherung: `work/runtime-main-before-rename.json`. Keine geheimen Werte ausgeben oder in Git übernehmen.
- Cloudflare-Releaseprotokoll: `/private/tmp/it-worlds-daily-20261030-release.log`; Einstellungsnachweise: `work/cloudflare-daily-20261030-before.json` und `work/cloudflare-daily-20261030-after.json`.
- Verifizierte Node-22-Laufzeit für Releases: `/private/tmp/it-worlds-node22-official/node-v22.22.0-darwin-arm64/bin/node`; `NODE_OPTIONS=--dns-result-order=ipv4first`. Releasehelper `scripts/release.ts` baut isoliert, deployt Assets und prüft alle öffentlichen Seiten.
- Sicherungsbranch `br-summer-sun-banaln05` nicht löschen. Prüfbranch `br-curly-shape-bakpwy1u` nur nach ausdrücklicher branchgenauer Freigabe entfernen.

### Nächste Fortsetzung

Zuerst die ergänzende Zwei-Konten-/RLS-/Trainerprüfung im neuen Produktions-Authbestand sicher abschließen und den Befund hier dokumentieren. Danach sind die beiden extern blockierten P1-Nachweise – unabhängiges Fach-/assistives Review und echter Reset-Mail-Empfang – die wichtigsten offenen Punkte. Ohne verfügbare externe Voraussetzungen mit der Lernendenstudie oder einem klar begrenzten, vollständigen P2-Inhaltspaket fortfahren; abgeschlossene technische Pakete nicht erneut implementieren.
