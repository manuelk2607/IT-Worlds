# Iterative Weiterentwicklung · 23. Oktober 2026

## Ausgangspunkt

Commit 61810f3: zehn Themenwelten, vier Kursfolgen mit 42 Kapiteln, 94 Fragen und 86 Primärquellen. Sieben Themenwelten haben außerhalb der vorhandenen Unterkurse nur einen kurzen Einstieg. KI und LaTeX werden inhaltlich zunächst nicht erweitert. Nutzerdatei `.clinerules` bleibt erhalten.

## Paket 1 · Orientierung und Suche

- Neuer Lernstart `/lernen/` mit drei konkreten Zielen: Grundlagen, einen Kurs durcharbeiten, Wissen prüfen.
- Kurskatalog trennt vollständig verfügbare Kurse von den drei älteren, teilweise geplanten Lernpfaden. Titel-/Themenfilter erhalten ihre Auswahl in der URL und beim Sprachwechsel.
- Themenkarten nennen verfügbare Kapitel statt pauschal nur einen Einstieg. Hauptnavigation ist auf fünf Lernziele reduziert; Quellen und Einstiegshilfe bleiben im Mobilmenü und Footer erreichbar.
- Kurse und Themen besitzen sichtbare Breadcrumbs; Kapitel liefern eine entsprechende strukturierte Hierarchie. Auf Mobilgeräten ist das Kursverzeichnis zunächst geschlossen, damit die Lektion direkt erreichbar ist.
- Suche lädt ihren sprachspezifischen Index erst beim Öffnen. Sie durchsucht auch Kapiteltexte, kombiniert mehrere Wörter, normalisiert Umlaute, gewichtet Titel und begrenzt die Ergebnisliste. Filter nach Inhaltstyp sowie Tastaturbedienung ergänzt. Statische JSON-Indizes enthalten ausschließlich öffentliche Lerninhalte.
- Geprüfte SQL-Kapitelseite: 76.317 auf 22.174 HTML-Bytes reduziert (rund 71 %), bevor weitere Inhalte hinzukommen. Der Suchindex ist nicht mehr auf jeder Seite als lange Linkliste eingebettet.
- 24 Tests, strikte Prüfung und Build erfolgreich. Lokal geprüft: Kapitelsuche, Enter-Navigation, Kursfilter samt Leerzustand und Reset, Mobilmenü, geschlossene mobile Kapitelübersicht, Dark Mode und Seitenbreite.

Weitere Pakete und Veröffentlichung werden nach Umsetzung ergänzt. Unabhängiges Fachreview bleibt eine gesonderte Aufgabe.

## Paket 2 · TypeScript-Kurs

Acht Kapitel ergänzen Programmiergrundlagen, Funktionen, Listen/Objekte, unbekannte Daten und Zustände, asynchrone Ergebnisse, Tests, Generics und einen Aufgabenplaner. Jedes Kapitel hat eine eigene Aufgabe mit begründeter Lösung und zwei Quizfragen. Alle acht veröffentlichten Programme wurden separat strikt typgeprüft und ausgeführt; automatisierte Zusatzfälle prüfen ungültige Zahlen, leere Listen, doppelte IDs und unveränderte Eingaben. Quellen: TypeScript-Handbook, Node-22.22-Testläufer und die konkret verwendeten MDN-Laufzeitfunktionen. Keine JavaScript-Quelldateien oder JavaScript-Lernbeispiele ergänzt.

## Paket 3 · Webkurs

Acht Kapitel verbinden semantisches HTML, CSS-Boxmodell, responsive Raster, Formulare, DOM-Interaktion mit TypeScript, Fehlerzustände, Tastaturzugang und Veröffentlichung. Alle 16 Fragen erklären jede Option. Praktisch geprüft: Boxbreiten 224/200 Pixel, ein-/zweispaltiges Raster bei 390/1280 Pixeln, Label-Zuordnung und ungültige/gültige Formeingabe, Zähler mit Maus und Leertaste, Fehler plus erfolgreicher Wiederholungsversuch, sichtbarer Sprunglink und Fokus auf dem Hauptinhalt. TypeScript-Listings werden jetzt insgesamt automatisiert streng geprüft; Browsercode ist als solcher gekennzeichnet. Der enthaltene Node-Auslieferungstest hat HTML 200 und fehlende Route 404 bestätigt. Die isolierten HTML-Demos senden keine echten persönlichen Daten.

## Paket 4 · IT-Grundlagen

Sieben Kapitel führen von Binärdarstellung und UTF-8 über JSON, isolierte Dateioperationen und Git zu Suchalgorithmen, kontrollierter Fehlersuche und einem validierten Datenprojekt. 14 Fragen erklären alle Antwortmöglichkeiten. Die Programme werden ausgeführt und streng geprüft; Zusatztests prüfen JSON-Syntax und Fachvertrag, binäre Suche über leere/einzelne/mehrere Einträge, Zahlenüberlauf sowie den Unterschied zwischen vorgemerkter Git-Version und späterer Arbeitsänderung. Dateien und Git-Repository der Beispiele bleiben strikt temporär.

## Paket 5 · Quiz und persönlicher Lernstand

Quizfilter begrenzen nach Themen-/Kurswahl die tatsächlich angebotenen Kurse und Kapitel; ein Kapitel setzt Kurs, Thema und Lernstufe konsistent. Ein Themenwechsel entfernt unpassende Unterfilter, ein Stufenwechsel entfernt unpassende Kapitel. Exakte Fragenlinks bleiben möglich. Die Auswahl nennt ihre Fragenzahl und erklärt den Rundenneustart. Die Filterlogik ist mit Konflikt- und Grenzfällen getestet; zwei Fragen, alle Erklärungen, Ergebnis und Neustart wurden im Browser geprüft.

Der Lernstand gruppiert Kapitel und Fragen in zugänglichen aufklappbaren Kursgruppen. Ansicht, Thema und „Nur offene Inhalte“ reduzieren die Übersicht. Jede Gruppe nennt ihren Fortschritt und verlinkt den nächsten offenen Schritt. Einstiege bleiben separat erreichbar; alle Inhalte auch ohne erreichbaren Account-Dienst lesbar. Suche normalisiert den bereits geladenen Index nur einmal pro Eintrag, sodass weitere Tastatureingaben die langen Kapiteltexte nicht wiederholt aufbereiten.

## Paket 6 · Linux

Sechs Kapitel mit zwölf Fragen erklären Quoting, Pfade und Rechte, Pipes und Rückgabestatus, eigene Prozesse, systemd-Diagnose und eine Wiederherstellungsprobe. Portable Shell-Beispiele laufen in einem isolierten temporären Verzeichnis; Tests prüfen Leerzeichen, 640-Rechte, Nichttreffer, kontrolliertes Beenden des eigenen Jobs sowie erfolgreiche und absichtlich beschädigte Wiederherstellung. Die rein lesenden systemd-Befehle wurden gegen die offiziellen Handbücher abgeglichen; eine Live-Ausführung bleibt mangels laufender Linux-/systemd-Umgebung offen. Keine fremden Prozesse oder Dienste werden verändert.

## Paket 7 · Netzwerke

Sechs Kapitel und zwölf Fragen verbinden URL-Bestandteile, IPv4/CIDR, DNS/TTL, TCP/UDP, TLS und HTTP-Caches. Lokale Modelle sind ausdrücklich keine Live-Netztests. Alle TypeScript-Listings werden ausgeführt und streng geprüft; Zusatzfälle decken Präfixgrenzen, ungültige Zeiten, exakte Origins einschließlich Port/Benutzerinformationen sowie aktuelle und veraltete ETags ab. Geteilte Nachrichten werden anhand eines klar begrenzten ASCII-Modells erklärt, ohne TCP-Nachrichtengrenzen oder einen vollständigen DNS-Resolver zu behaupten.

## Paket 8 · Sicherheit

Sieben Kapitel mit 14 Fragen zu Bedrohungsmodell, Authentifizierung/MFA, Eingaben, Eigentümerregeln, sicherer Textausgabe, CSRF und Auditdaten. Alle Modelle benennen ihren begrenzten Umfang; sie ersetzen keine produktive Authentifizierungs- oder CSRF-Bibliothek. Automatisierte Beispiele prüfen Wertebereiche und Auswahllisten, getrennte Identitäten, fehlenden/fremden Origin und Auditkennungen einschließlich Zeilenumbrüchen und Längengrenzen. Kein Schema oder Account-Verfahren geändert.

## Verbleibende priorisierte Arbeiten

- Cloud & DevOps besitzt weiterhin den kurzen belegten Einstieg, aber noch keine vollständige Kursfolge. Nächstes Inhaltspaket: reproduzierbarer Build/CI, Container und persistente Daten, Konfiguration/Secrets, Auslieferung, Beobachtbarkeit und kontrollierter Rollback.
- Drei ältere themenübergreifende Lernpfade enthalten weiterhin ausdrücklich geplante Schritte. Diese gezielt auf jetzt verfügbare Kapitel umstellen und als durchgehende Lernwege überarbeiten; keine automatischen Ersatzlinks mit unpassenden Inhalten.
- Unabhängiges Fachreview sämtlicher Kurse und Fragen bleibt ausstehend. Der dokumentierte Quellenabgleich ist davon getrennt.
- systemd-Beispiele auf einer laufenden Linux-Testumgebung praktisch prüfen. Portable Shellfälle sind lokal getestet; Docker ist vorhanden, aber sein Dienst läuft nicht.
- Felddaten zu Ladezeit, Interaktionszeit und Layoutstabilität erfassen; aus lokalen Funktionsprüfungen keine echten Core-Web-Vitals-Werte ableiten.
