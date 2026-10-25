# Schlanke LaTeX-/Typst-Dokumentprüfung · 25. Oktober 2026

## Entscheidung und Kosten

Die Bearbeitung und tatsächliche Kompilierung finden ausschließlich in **Overleaf** beziehungsweise dem offiziellen Editor auf **typst.app** statt. IT-Worlds importiert Quellen und prüft ausgewählte Muster lokal im Browser. Kein eigener LaTeX-/Typst-Editor, OAuth, Kompilierungsserver, kostenpflichtiger API-Dienst, Storage oder zusätzlicher Cloudflare-/Neon-Dienst wurde ergänzt. Die Dokumentprüfung verursacht keine zusätzlichen serverseitigen Verarbeitungskosten; der vorhandene Websitebetrieb und optionale Accountfortschritt bleiben bestehen. Externe Anbieter haben eigene Tarife und Nutzungsgrenzen.

Die frühere Typst-Verweisübung behält ihre URL, Vorlage, Hinweis und Lösung; statt eines eigenen Editors führt sie jetzt zum offiziellen Editor und Quellenimport. Bereits vorhandene lokale Entwürfe können unverändert heruntergeladen werden. Neue Dokumententwürfe werden nicht lokal gespeichert.

Die zuvor nur lokal erprobte Compilerinfrastruktur, ihre Worker-Proxy-Endpunkte, Konfigurationstypen, Vorschauhelfer und der zusätzliche Compiler-CI-Job wurden entfernt. Der frühere Stand bleibt in Git nachvollziehbar. Keine bestehenden Docker-Container, Images oder Dienste wurden für diese Vereinfachung verändert. PDF-Vorschau und weitere Prüfmechanismen bleiben P2, ausschließlich bei geringem Aufwand und ohne zusätzliche laufende Kosten.

## Ablauf

1. Im Kurs oder direkt bei der Aufgabe den gut sichtbaren Link **In Overleaf/typst.app bearbeiten** öffnen.
2. Aufgabe extern bearbeiten, dort kompilieren und PDF sowie Warnungen kontrollieren.
3. Vollständige Quellen als ZIP exportieren oder `.tex`-/`.typ`-Dateien und benötigte Ressourcen auswählen. Alternativ einen Projektordner auswählen. Kein PDF-only-Import: PDFs sind nur als eingebundene Projektressourcen erlaubt.
4. In `/dokumentpruefung/` beziehungsweise `/en/dokumentpruefung/` Format, optional die Kapitelaufgabe und ausdrücklich die Hauptdatei auswählen. Kurslinks wählen das passende Profil vor.
5. **Lokal analysieren**: Fundstelle anklicken, Erklärung lesen und Änderung im externen Editor vornehmen. Anschließend neu exportieren und prüfen. Öffentliche Kursbeispiele können zum Ausprobieren einzeln geladen werden; dafür werden nur diese bereits öffentlichen Beispiele abgerufen.
6. Optional Bericht als JSON herunterladen. Er enthält Befunde, Dateinamen und Aufgabenmerkmale, keine vollständigen Quellen. Erst nach eigener Kontrolle das zugehörige Kapitel bewusst als gelesen markieren.

Die 30 Kapitelprofile verwenden stabile bestehende Kapitel-IDs. Ein zusätzliches Profil übernimmt die vorhandene Typst-Verweisübung und ordnet deren bewusste Fortschrittsmarkierung dem zugehörigen Kapitel zu. Fortschritt nutzt unverändert die vorhandene freiwillige Anmeldung und `/api/progress`. Gespeichert wird nur die explizite Kapitelmarkierung: kein Dokument, kein Befundbericht, kein zusätzlicher Bewertungs- oder Prüfdatensatz und keine automatische Lösungsgutschrift. Gäste können alles prüfen und Berichte herunterladen. Wer Fortschritt speichern möchte, meldet sich sinnvollerweise vor dem Import an; ein Seitenwechsel erhält das private Projekt bewusst nicht. Es gibt keine Schemaänderung oder Produktionsmigration.

## Tatsächliche Prüfungen und Grenzen

| Bereich | Was IT-Worlds statisch prüft | Was extern/selbst geprüft wird |
| --- | --- | --- |
| LaTeX | ausgewählte Klammer-/Umgebungsmuster, wörtliche Klasse/Dokumentstruktur, Paketinventar, direkte input/include-Verknüpfungen, Ressourcen, Marken, Verweise und BibTeX-Schlüssel | vollständige Grammatik, Makroexpansion, Paket-/Klassenverhalten, Compilerwahl, Literatur-Buildkette und PDF |
| Typst | direkte include/import-Verknüpfungen, Ressourcen, Marken, Verweise, BibTeX-Schlüssel und Paketabhängigkeiten | vollständige Grammatik, Auswertung, dynamische Pfade/Labels, Pakete, Typen, Layout, Nummerierung und PDF |
| Kapitelaufgaben | 30 Profile suchen gezielt nach Literal-Konstruktionen, etwa einer Formel, Tabelle, Grafik, Literaturquelle, Funktion, Assertion oder Buildparametern; erkannte Fundstellen und Erklärung je Merkmal | tatsächliches Verhalten, korrekte Rechnung, sinnvolle Verwendung, vollständige Aufgabenlösung, Lesbarkeit und fachliche Qualität |

**„Konstruktion gefunden“ bedeutet keinen bestandenen Kurs und keinen Kompiliernachweis.** Nicht direkt gefundene Konstruktionen können über eigene Makros oder dynamischen Code entstehen. Kommentare und einfache Raw-/Verbatim-Blöcke werden aus der Mustersuche entfernt; Typst-Zeichenketten zählen nicht als Aufgabenmerkmale. Nur erreichbare Quellen des gewählten Hauptdokuments werden geprüft. Die Mustersuche ist kein vollständiger Parser oder Interpreter; Warnungen können falsch positiv oder unvollständig sein. Erkannte dynamische Konstruktionen erhalten entsprechende Grenzenhinweise. Der Bericht führt immer `compilation: not-run`.

LaTeX-Einbindungen werden relativ zum Verzeichnis der Hauptdatei aufgelöst; Typst-Einbindungen relativ zur jeweils enthaltenden Datei innerhalb der Projektwurzel. Literal erzeugte filecontents-Literatur wird begrenzt berücksichtigt. Externe Typst-Pakete und Fonts werden nicht heruntergeladen. Typst-Web-App-Archive enthalten private Pakete und reine Web-App-Fonts nicht automatisch. Nicht unterstützte Exportdateien werden mit verständlicher Meldung abgewiesen; größere Projekte sollten als kleine vollständige Fehlerprobe exportiert werden.

## Sicherheit und Datenschutz

Gemeinsame `document-project.ts`-Aufnahme für beide Formate: relative normalisierte Pfade, keine absoluten/Laufwerkspfade, Traversal, versteckten Dateien, Steuerzeichen, case-insensitiven Duplikate oder Programme. Maximal 64 Dateien/ZIP-Einträge, 8 MiB insgesamt, 2 MiB je Datei, ZIP-Kompression höchstens 100:1, Pfadtiefe 8. UTF-8 für Quellen und Dateinamen. Zulässige Ressourcen sind unter anderem `.bib`, Bilder, Daten und Fonts; sie werden nicht ausgeführt, eingebettet oder extern geladen.

ZIP-Zentralverzeichnis vor Dekomprimierung prüfen; Header, echte Größe und CRC kontrollieren. Nur normale Stored-/Deflate-ZIPs; keine Verschlüsselung, Symlinks, verschachtelten Archive, ZIP64 oder Mehrteiler. Streaming-Dekomprimierung ist begrenzt. Ohne Browserunterstützung wird zum lokalen Entpacken/Ordnerimport angeleitet. Ein kurzlebiger Web Worker erhält höchstens acht Sekunden und wird bei Projekt-/Format-/Aufgabenwechsel, Entfernen oder Verlassen beendet. Maximal 200 allgemeine Diagnosen. Quelle und Befunde erscheinen nur als Text; die Quellenansicht ist schreibgeschützt.

Dokumente und Befunde bleiben im Arbeitsspeicher des Browsers, ohne Upload, Cookies, Datenbank oder Local Storage. Entfernen und Seitenwechsel verwerfen sie. Ausgewähltes Format/Aufgaben-ID dürfen in der URL stehen, niemals Quelldaten. Reguläre Website-/Anmeldeanfragen sind unabhängig davon; die Prüflaufzeit selbst hat keinen Netzwerkzugriff im Code und verwendet weder fremde APIs noch einen Backend-Fallback.

## Architektur und Betrieb

Astro erzeugt die beiden Sprachseiten und öffentlichen Beispiel-JSONs als statische Assets des vorhandenen Cloudflare Workers. `documents.ts` steuert Import/Ergebnisse, `document-worker.ts` führt Aufnahme und Analyse aus. `document-analysis.ts` ist die gemeinsame formatspezifische Basis; `document-task-check.ts` ergänzt Kapitelmerkmale aus `document-tasks.ts`. Vorhandene `ProgressToggle`-/Fortschrittskomponenten werden wiederverwendet. Keine neue npm-Abhängigkeit. Cloudflare-Konfiguration, Bindings und Secrets werden erhalten.

Der ursprüngliche Dokumentprüfungsrelease hielt das Ranglistenbackend deaktiviert. Der spätere P1-Abschluss prüft es mit zwei echten development-Sessions, RLS, Timing/Replay und Produktionsmigration getrennt; siehe [DREI-LERNBEREICHE.md](DREI-LERNBEREICHE.md). Die Dokumentprüfung nutzt unverändert nur den bestehenden Kapitel-Lernfortschritt und speichert keine Dokumente.

## Belege, Verifikation und offene Aufgaben

Technische Originaldokumentation tatsächlich gelesen am 25.10.2026:

- Overleaf, aktuelle Webdokumentation, Abschnitt „How to download Overleaf projects“: [Downloading a project](https://docs.overleaf.com/managing-projects-and-files/downloading-a-project).
- Typst GmbH, aktuelle Web-App-Dokumentation, „Project archive“/„Backup project“ und ausgeschlossene Ressourcen: [Export and Preview](https://typst.app/docs/web-app/export-and-preview/).
- Cloudflare, aktuelle Workers-Dokumentation, statische Assets: [Static Assets](https://developers.cloudflare.com/workers/static-assets/).

Automatisierte ZIP-/Grenz-/Negativtests, Aufgabenprofile/IDs/Sprachen, erreichbare Teilprojekte, Fundstellen, Kommentare und fehlende Konstruktionen sind Teil von `npm test`. Dazu `npm run check`, `npm run build`, `npm run deploy:check` und Browserprüfungen beider Formate/Sprachen. Die früher am 25.10. tatsächlich ausgeführten 30 Dokumentkompilierungen sind historischer Beispielnachweis, keine öffentliche Kompilierfunktion und kein bei jedem Import ausgeführter Test. Aktuelle Ergebnisse und Veröffentlichungsnachweis: [VALIDIERUNG.md](VALIDIERUNG.md).

- P2: Erweiterte konservative Diagnostik; echte PDF-Vorschau nur bei verifiziert geringem Entwicklungs-/Betriebsaufwand ohne zusätzlichen kostenpflichtigen Dienst.
- Unabhängiges Fachreview, assistive Nutzerprüfung und Erprobung mit Lernenden bleiben offen.
- Vollständige fachliche Aufgabenbewertung bleibt von statischen Merkmalen und Kompilierung getrennt.
