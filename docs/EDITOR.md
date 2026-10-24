# Übungseditoren

Unter `/uebungen/` und `/en/uebungen/` gibt es 23 Aufgaben, filterbar nach Suchtext, Thema, Kurs und Lernstufe. Filter stehen in der URL, bleiben beim Sprachwechsel erhalten und lassen sich zurücksetzen. Ein Themenwechsel entfernt einen unpassenden Kursfilter; leere Auswahlen werden erklärt. Ohne Skript bleiben sämtliche Aufgabenlinks erreichbar.

Die zehn bisherigen Themeneditoren behalten `#uebungseditor`, ihre Adressen und Entwurfsschlüssel. 13 neue Kursaufgaben besitzen eigene Adressen `/uebungen/<id>/` bzw. `/en/uebungen/<id>/`. Kursübersicht, zugehöriges Kapitel, Themenwelt, Suche und Sitemap verlinken dieselbe Aufgabe. Alle Aufgaben funktionieren ohne Anmeldung.

Vorlage bearbeiten, **Aufgabe prüfen** wählen und die Modellausgabe mit dem Lernziel vergleichen. Hinweise und Musterlösung sind ausklappbar. Eine Lösung lässt sich in den Editor laden; Zurücksetzen stellt die Startvorlage wieder her. Das Textfeld bleibt mit Tab regulär verlassbar. Entwürfe werden pro Aufgabe auf diesem Gerät im Browser gespeichert und bei Neuladen oder Sprachwechsel wiederhergestellt. Sie werden nicht an einen Server geschickt und nicht über den Account synchronisiert. Zurücksetzen entfernt nur den Entwurf dieser Aufgabe; die letzte Ersetzung durch Vorlage oder Musterlösung kann über „Letzte Ersetzung rückgängig“ zurückgenommen werden. Nach eigener weiterer Eingabe wird diese Rückgängig-Option ausgeblendet. Bei nicht verfügbarem Browserspeicher bleibt die Bearbeitung nutzbar und weist auf die fehlende Speicherung hin. Veraltete Entwürfe zu einer geänderten Vorlage werden verworfen, damit das Aufgabenformat konsistent bleibt.

## Was geprüft wird

| Themenwelt | Aufgabe und begrenztes Format |
| --- | --- |
| Programmiersprachen | Python-Zuweisung mit 17, 3 und einem der Operatoren `/`, `//`, `%` |
| Datenbanken | Ein SQL-SELECT auf einen festen lokalen Kursdatensatz; optional Gleichheitsfilter |
| Website bauen | Eine nicht leere h1-Überschrift und ein p-Absatz ohne Attribute oder weitere Tags |
| KI | Import und Basisklasse der vorgegebenen PyTorch-Klassenstruktur |
| APIs | Ausgewählte Felder einer OpenAPI-3.1.1-Beschreibung in JSON |
| IT-Grundlagen | UTF-8-Byteanzahl; lokale TextEncoder-Codierung durch den Prüfer |
| Netzwerke | Rest-TTL eines vereinfachten Cache-Modells |
| IT-Sicherheit | Verschiedene Kategorien in einem selbst entworfenen MFA-JSON-Lernmodell |
| Cloud & DevOps | Zwei verschieden benannte Instanzen desselben Images im eigenen JSON-Lernmodell |
| Linux | Dreistellige oktale oder vollständige symbolische chmod-Zuweisung für eine reguläre Beispieldatei |

Dies sind keine vollständigen Compiler, Interpreter, SQL-Datenbanken, Docker-/Auth-Konfigurationen oder Shells. Die Prüfer erkennen nur den jeweils beschriebenen Ausschnitt. Sie führen weder eingegebenen Code aus noch rendern sie HTML. Ausgaben werden als Text eingefügt. Es gibt keine Netzwerkabfragen, Containerstarts, Modelltrainings oder Dateiveränderungen durch die Aufgaben.

Die Vorlagen sind eigene Beispiele. Die verknüpften Quellen belegen die geübten Konzepte; das [Quellenprotokoll](QUELLEN.md) enthält den gelesenen Stand. Musterlösungen, falsche Eingaben, alternative Formatierungen sowie schädliche und nicht unterstützte Eingaben werden in `tests/exercises.test.ts` geprüft. Ein unabhängiges Fachreview bleibt offen.

## Kursaufgaben · 24. Oktober 2026

| Kurs | Geübtes Lernziel | Stufe |
| --- | --- | --- |
| IT-Grundlagen | JSON-Zahlen und Wahrheitswerte passend zum Vertrag | Einstieg |
| TypeScript | Array.filter samt einschließender Grenze | Einstieg |
| Python | Summe statt Maximum oder Elementanzahl | Einstieg |
| Markdown | ATX-Gliederung mit drei Ebenen | Einstieg |
| Webentwicklung | Explizite label/for/id-Verknüpfung | Vertiefung |
| SQL | COUNT(*) gegenüber COUNT einer NULL enthaltenden Spalte | Vertiefung |
| Typst | Nummerierte Überschrift, Label und Verweis | Vertiefung |
| Netzwerke | IPv4-Netzadresse aus /28 | Vertiefung |
| Betriebssysteme | Virtuelle Seite, Offset und physische Adresse | Vertiefung |
| Linux | Pipeline-Status mit pipefail | Vertiefung |
| Sicherheit | Objektberechtigung trotz erfolgreicher Anmeldung | Vertiefung |
| APIs | Versionskonflikt durch If-Match mit 412 ablehnen | Profi |
| Cloud & DevOps | Erfolgsanteil im definierten Messfenster gegen SLO prüfen | Profi |

## Erweitern

`src/data/exercises.ts` bündelt die bestehenden Themenaufgaben und `src/data/course-exercises.ts`. Der gemeinsame Typ enthält stabile `id`, Thema, Stufe und optionale Kurs-/Kapitelzuordnung. `exercisePath` erhält die alten Adressen. `src/lib/exercise-checker.ts` und `course-exercise-checker.ts` prüfen reine Daten ohne Seiteneffekte. `exercise-catalog.ts` hält Filterlogik und URL-Abgleich separat testbar. Oberfläche und Bedienung liegen in `ExerciseEditor.astro`, `src/scripts/exercises.ts` und `src/styles/exercises.css`.

Neue Aufgaben brauchen ein klar definiertes akzeptiertes Format, verständliche Rückmeldung, Übersetzungen und einen Beleg zum Lernziel. Erfolgreiche und fehlgeschlagene Fälle sowie sinnvolle alternative Lösungen testen. Keinen `eval`-, Function-, HTML- oder Shell-Ausführungspfad ergänzen. Eine spätere vollständige Laufzeit wäre eine gesonderte Architekturänderung.

Editor-Ergebnisse verändern den Account-Lernstand nicht. Dieser zählt weiterhin gelesene Einstiege und bearbeitete bzw. richtig beantwortete Quizfragen; eine Beispielprüfung ist kein Zertifikat.
