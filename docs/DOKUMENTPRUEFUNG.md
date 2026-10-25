# Dokumentprüfung und Textsatz-Ausbau · 25. Oktober 2026

## Auftrag und Abgrenzung

LaTeX fertigstellen, Typst vertiefen und sichtbarer machen; externe Bearbeitung in Overleaf beziehungsweise der offiziellen Typst-Web-App, anschließend Einzeldateien/ZIP in IT-Worlds prüfen. Bestehende URLs, Kapitel- und Fortschrittskennungen bleiben erhalten. Der frühere Schreibtrainer-/Hardware-Zwischenstand bleibt erhalten und ist ein eigener Freigabeumfang.

## Arbeitspakete

- [x] Gemeinsame begrenzte Projektaufnahme für Einzeldateien und ZIP, formatspezifische statische Diagnostik mit Positionen, Hauptdateiauswahl, Datenschutz und Negativtests.
- [x] Externe Editor-/Exportanleitungen, Kursverknüpfungen und prominenter Textsatz-Einstieg mit Typst/LaTeX-Vergleich.
- [x] Typst-Kapitel zu Programmierung, Modulen/Paketen, Daten, Kontext, Präsentationen und reproduzierbaren Publikationen samt Übungen und erklärten Quizfragen; LaTeX-Abgabe-/Diagnosekapitel.
- [x] Echte Kompilierung ausschließlich in isolierter Laufzeit mit Ressourcenlimits lokal geprüft; fehlende Laufzeit ehrlich anzeigen. Keine Kompilierung nicht vertrauenswürdiger Quellen auf dem Host.
- [x] Tests, Typprüfung, serieller Build, Release-Dry-Run und Browserprüfung; offene Grenzen dokumentiert.

## Tatsächlich geprüfte Infrastruktur und Schnittstellen

Der bestehende Worker liefert statische Astro-Dateien und Account-APIs aus. Cloudflare dokumentiert 128 MB pro Worker-Isolate einschließlich WASM; ein Worker ist keine beliebige native TeX-/Typst-Laufzeit. Keine neue kostenpflichtige Hosting-Ressource eingerichtet. Die vorhandene Docker-App wurde am 25. Oktober gestartet. Ausschließlich ein eigenes Compilerimage und neue kurzlebige Testcontainer wurden verwendet; bestehende Container wurden weder geändert noch gestoppt oder neu gestartet.

Die offizielle Typst-Dokumentation beschreibt „Project archive“/„Backup project“ als ZIP mit Quellen; private Pakete und Web-App-Schriften fehlen. Die ausgewertete Dokumentation bietet für diesen Ablauf keine benötigte Editor-Einbettung oder Rückgabe-API; der Exportworkflow genügt. Overleafs dokumentierte API öffnet Vorlagen; Projektquellen werden als ZIP exportiert.

Gelesen am 25.10.2026: [Typst Export and Preview](https://typst.app/docs/web-app/export-and-preview/), [Overleaf API](https://www.overleaf.com/devs), [Overleaf-Export](https://www.overleaf.com/learn/how-to/Exporting_your_work_from_Overleaf), [Worker-Grenzen](https://developers.cloudflare.com/workers/platform/limits/), [TeX-Live-Sicherheit](https://tug.org/texlive/doc/texlive-en/texlive-en.html#x1-110001.4). Diese technischen Belege sind von fachlichen Lernquellen und einem unabhängigen Fachreview getrennt.

## Architektur und tatsächlicher Umfang

`document-project.ts` validiert Projektpfade und Dateiarten. ZIPs werden zuerst anhand des Zentralverzeichnisses geprüft, anschließend begrenzt im Stream entpackt; tatsächliche Größe und CRC müssen stimmen. Verschachtelte Archive, Verschlüsselung, Symlinks, mehrteilige Datenträger und ZIP64 sind ausgeschlossen. Limits: 8 MiB Upload/entpacktes Gesamtprojekt, 2 MiB je Datei, 64 Archiveinträge/Dateien, Verhältnis maximal 100:1. Textdateien benötigen UTF-8. Keine externe ZIP-Bibliothek ergänzt; Browser ohne Deflate-Unterstützung nutzen entpackte Dateien oder den Ordnerdialog.

Ein kurzlebiger Web Worker führt die lokale Analyse aus und wird nach acht Sekunden abgebrochen. LaTeX: direkt erkennbare Gruppen/Umgebungen, Einbindungen, Literatur, Bilder, Labels, Verweise, Paketinventar und Hinweise auf dynamische Befehle. Typst: direkte Imports/Includes, Ressourcen, Literaturschlüssel, Labels und Referenzen. Kommentare und einfache Raw-/Verbatim-Blöcke werden berücksichtigt. Das ist **kein vollständiger Sprachparser oder Makrointerpreter**; dynamische Namen, lokale Pfadkonventionen und komplexe Pakete können zusätzliche Compilerprüfung benötigen. Warnungen sind keine sichere Feststellung eines Angriffs oder eines fachlichen Fehlers.

LaTeX wird im Verzeichnis der gewählten Hauptdatei gestartet; auch eingebundene LaTeX-Dateien teilen dieses Arbeitsverzeichnis. Die Analyse verwendet dieselbe Basis. Typst löst Imports und Ressourcen relativ zur jeweils enthaltenen Datei innerhalb der Projektwurzel auf. Ein echter verschachtelter LaTeX-Dreiteiler und Hauptdateinamen mit führendem Bindestrich sind geprüft; Quelldateinamen werden als Pfade übergeben und können keine CLI-Optionen ersetzen. Compilerpositionen werden auf die hochgeladenen Projektpfade zurückgeführt.

`/textsatz/` und `/en/textsatz/` verbinden Entscheidungshilfe, Kurse und Projektweg. `/dokumentpruefung/` und die englische Route bieten Dateiauswahl, ZIP, explizite Hauptdatei, statischen Bericht, klickbare Quellpositionen und JSON-Download. Kursbeispiele laden ihre öffentlichen Daten einzeln bei Bedarf aus `/dokumentbeispiele/*.json`; die komplette Kursdatenbank landet nicht im Prüfbundle. Quellen werden nicht in URLs, Browser-Speicher oder Datenbank geschrieben.

## Echte Kompilierung und PDF

`services/document-compiler/` enthält den privaten TypeScript-Dienst und einen Docker-Runner. Pro Auftrag neuer `it-worlds-doc-<UUID>`-Container: kein Netzwerk, schreibgeschütztes Image und Eingabe-Mount, keine Linux-Capabilities, no-new-privileges, unprivilegierte UID, Standard-Seccomp, 512 MiB RAM ohne zusätzlichen Swap, eine CPU, 64 Prozesse, begrenzte Dateigröße, private tmpfs-Verzeichnisse mit noexec/nosuid/nodev. Keine Host-Secrets, Docker-Sockets oder fremden Verzeichnisse im Container. XeLaTeX verwendet `-no-shell-escape` und keine First-Line-Formatwahl; Biber/BibTeX werden nur explizit durch den festen Ablauf gestartet. Keine Ausführung von Uploadskripten oder latexmkrc.

Die Laufzeit umfasst Typst 0.15.1 sowie Debian-Bookworm-TeX-Live 2022 mit deutschen/englischen Sprachdateien, Standardfonts, XeLaTeX, BibTeX und Biber 2.18. Das ist ein definierter Offline-Paketbestand, keine Zusage beliebiger Paket-/Compilerkompatibilität. Typst-Pakete werden nicht nachgeladen; abhängige Projekte melden die fehlende Ressource. Die Image-Basis und das offizielle Typst-Image sind per Digest gebunden. Für einen Betrieb müssen Debian-Sicherheitsaktualisierungen und das eigene Image regelmäßig neu gebaut und geprüft werden.

Jeder Compilerprozess hat 15 Sekunden; der gesamte Containerauftrag 65 Sekunden plus begrenzte Entfernung. Ein Auftrag gleichzeitig und maximal 60 Versuche je laufender Dienstinstanz/Stunde. Private Eingabeordner bleiben 0700; der Container verwendet dieselbe unprivilegierte UID. Nach Erfolg, Fehler oder Zeitüberschreitung werden eigener Container und eigenes temporäres Verzeichnis entfernt. Markierte verwaiste Aufträge werden bei Dienststart und alle fünf Minuten nach 15 Minuten gelöscht. Ein ausgeschalteter Host kann erst beim nächsten Dienststart aufräumen. Für harte Löschfristen braucht der Betreiber zusätzlich überwachte Host-Lifecycle-Regeln.

PDF maximal 8 MiB; Vorschau ausschließlich als im selben Container gerasterte PNG-Bilder der ersten drei Seiten. Keine aktive PDF-Einbettung im Browser. Der Download bleibt separat verfügbar. Compilerdiagnosen werden als Text dargestellt; bekannte Fehler erhalten didaktische Hinweise und verlinken nur tatsächlich vorhandene Projektdateien. Der herunterladbare Bericht unterscheidet nicht gestartet, bestätigt erfolgreich, bestätigt fehlgeschlagen und unbestätigte Anfrage. Inhaltliche Richtigkeit und visuelle Qualität werden nicht automatisch bescheinigt.

Gelesene technische Grundlagen: [Docker Run](https://docs.docker.com/engine/containers/run/), [None-Netzwerk](https://docs.docker.com/engine/network/drivers/none/), [Seccomp](https://docs.docker.com/engine/security/seccomp/), offizielle [Typst-Container](https://github.com/typst/typst/pkgs/container/typst/). Ein Container ist eine Schutzschicht; der öffentliche Dienst gehört auf einen eigenen, gewarteten Compilerhost ohne fremde Daten oder andere Anwendungscontainer. Ein unabhängiger Sicherheitstest steht vor der öffentlichen Aktivierung aus.

## Lokal prüfen und betreiben

```sh
docker build -t it-worlds-document-compiler:2026-10-25 services/document-compiler
IT_WORLDS_COMPILER_TEST=1 node --experimental-strip-types --test tests/document-compiler.test.ts tests/document-service.test.ts
npm run dev -- --port 4339 --host 127.0.0.1
IT_WORLDS_PREVIEW_ORIGIN=http://127.0.0.1:4339 node --experimental-strip-types scripts/preview-documents.ts
```

Die lokale vollständige Vorschau läuft auf 127.0.0.1:8796; ihr privater Prüfdienst auf 8795. Der Vorschauhelfer erzeugt ein Token nur im Prozessspeicher und beendet seinen eigenen Dienst beim Beenden. Keine Zugangsdaten in Befehle oder Repository schreiben.

Für einen dauerhaften Dienst `services/document-compiler/server.ts` unter einem unprivilegierten Dienstkonto auf einem separaten Compilerhost betreiben, Token sicher über `IT_WORLDS_COMPILER_TOKEN` bereitstellen und einen authentifizierten TLS-Proxy mit Upload-/Ratenlimits davorschalten. Der Dienst selbst bindet ausschließlich Loopback. Der Website-Worker benötigt anschließend `DOCUMENT_COMPILER_URL` und `DOCUMENT_COMPILER_TOKEN` als zusätzliche Secrets. Bestehende Bindings/Secrets erhalten. Ohne beide Werte meldet `/api/documents/status` available:false; der Browser überträgt dann keine Quellen. Diese Produktionskonfiguration wurde **nicht** vorgenommen.

## Lerninhalte und offene Freigabe

Abschlussprüfung: `npm test` 85 Tests, davon 75 bestanden/10 optionale Laufzeit-Skips; `npm run check` 193 Dateien ohne Fehler/Warnungen/Hinweise; `npm run build` 444 HTML-Seiten; `npm run deploy:check` bestanden mit 438 öffentlichen Sprachseiten und 31.602 internen Links/Ankern. Sieben echte Compiler-/Diensttests zusätzlich ohne Skips erfolgreich, einschließlich aller 30 Kursbeispiele und Biber. Der vorbereitete neue GitHub-Job wurde noch nicht gepusht/remote ausgeführt. Native Typst-/SQL-/Container-Tests sind im allgemeinen Lauf mangels expliziter Voraussetzungen optional; die 30 Textsatzbeispiele wurden tatsächlich separat im eigenen Compilerimage ausgeführt.

Browser: gebaute DE/EN-Seiten bei 390/950/1280px ohne horizontalen Seitenüberlauf; helle/dunkle Ansicht, Mobilmenü und Escape-Fokus. Einzeldatei-/ZIP-Mehrteiler, Hauptdatei, klickbare Fehlerstelle, Typst- und Biber-PDF mit gerasterter Vorschau, Entfernen der Quelle sowie neue Quizfrage mit sämtlichen Erklärungen, Ergebnis und Neustart geprüft. Am echten lokalen Worker gibt es ohne Compiler-Secrets eine klare Nichtverfügbarkeitsmeldung bei weiterhin funktionierender lokaler Analyse. HTTP prüfte 22 neue Sprachrouten und beide echten 404-Sprachen; der allgemeine Ready-Check bestand. Keine neue echte Accountanmeldung durchgeführt; stabile bestehende und neue Kapitel-/Quiz-IDs werden automatisiert vom unveränderten Fortschrittsmodell akzeptiert.

Typst: 16 Kapitel/32 erklärte Fragen; LaTeX: 14 Kapitel/28 Fragen. Bestehende IDs und URLs bleiben erhalten. Neue Kapitel-/Quizkennungen werden vom bestehenden Fortschrittssystem erfasst. Eine Projektprüfung markiert keine Inhalte automatisch als verstanden; der Kurs führt zur eigenen Kontrolle und der vorhandenen Gelesen-Markierung. Die grundsätzliche Notwendigkeit eines unabhängigen Fachreviews bleibt bestehen.

- [ ] Permanenten isolierten Compilerhost auswählen, betreiben und unabhängig sicherheitsprüfen; öffentliche Secrets/Proxy konfigurieren und Ende-zu-Ende prüfen.
- [ ] Unabhängiges Fachreview und Prüfung mit assistiver Technik/Lernenden.
- [ ] Optional: kursspezifische Bewertungsrubriken, zusätzliche Paketbestände, mehrseitige positionsgenaue PDF-Quellzuordnung. Fachliche Bewertung bleibt von technischer Kompilierung getrennt.
- [ ] Releaseumfang vom noch nicht freigegebenen Schreibtrainer-/Hardware-/Spiele-Zwischenstand trennen oder dessen ausstehende Prüfungen abschließen; Backendprüfungen und Produktionsmigration bleiben separat offen.
