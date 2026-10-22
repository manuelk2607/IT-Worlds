# Übungseditoren

Unter `/uebungen/` und `/en/uebungen/` gibt es eine Übersicht. Jede der zehn Themenwelten enthält einen Editor unter `#uebungseditor`. Alle Aufgaben funktionieren ohne Anmeldung.

Vorlage bearbeiten, **Aufgabe prüfen** wählen und die Modellausgabe mit dem Lernziel vergleichen. Hinweise und Musterlösung sind ausklappbar. Eine Lösung lässt sich in den Editor laden; Zurücksetzen stellt die Startvorlage wieder her. Das Textfeld bleibt mit Tab regulär verlassbar. Eingaben werden beim Neuladen verworfen und nicht an den Server geschickt.

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

## Erweitern

`src/data/exercises.ts` enthält Vorlagen, Aufgaben, Hilfen, Lösungen und Beleg-IDs. `src/lib/exercise-checker.ts` prüft reine Daten ohne Seiteneffekte. Oberfläche und Bedienung liegen in `ExerciseEditor.astro`, `src/scripts/exercises.ts` und `src/styles/exercises.css`.

Neue Aufgaben brauchen ein klar definiertes akzeptiertes Format, verständliche Rückmeldung, Übersetzungen und einen Beleg zum Lernziel. Erfolgreiche und fehlgeschlagene Fälle sowie sinnvolle alternative Lösungen testen. Keinen `eval`-, Function-, HTML- oder Shell-Ausführungspfad ergänzen. Eine spätere vollständige Laufzeit wäre eine gesonderte Architekturänderung.

Editor-Ergebnisse verändern den Account-Lernstand nicht. Dieser zählt weiterhin gelesene Einstiege und bearbeitete bzw. richtig beantwortete Quizfragen; eine Beispielprüfung ist kein Zertifikat.
