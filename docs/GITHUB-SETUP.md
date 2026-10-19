# GitHub-Einrichtung

## Stand

Das Repository heißt [manuelk2607/IT-Worlds](https://github.com/manuelk2607/IT-Worlds). Der lokale Git-Remote wurde auf die neue URL aktualisiert. Der lokale Arbeitsordner kann weiterhin `IT-Welten` heißen; das ändert den Repository-Namen nicht.

README, Konzeptdokumente und Beitragsvorlagen sind Bestandteil dieses Einrichtungspakets. **Die unten vorgeschlagene Beschreibung und die Topics sind noch nicht in den GitHub-Metadaten gesetzt.** Die verfügbare GitHub-Anbindung bietet dafür keine Schreibfunktion; die lokale GitHub-CLI erhält aktuell eine Zugriffssperre. Diese Datei hält die vollständigen Angaben zur direkten Übernahme fest.

## Beschreibung für den About-Bereich

> Deutschsprachige IT-Wissensplattform im Aufbau: verständliche Artikel, kuratierte Quellen, Lernpfade, Quizzes und Lernspiele rund um die IT-Welt.

Eine Website-URL erst eintragen, wenn eine tatsächlich verfügbare Projektwebsite existiert.

## Topics

Mit „Tags“ sind hier GitHub-Topics für Auffindbarkeit gemeint. Release-Tags sind erst für spätere veröffentlichte Versionen sinnvoll.

```text
information-technology
computer-science
education
learning-platform
knowledge-base
interactive-learning
gamification
quiz
learning-games
german
```

Framework-Topics wie `astro` oder `nextjs` erst ergänzen, wenn eine entsprechende Entscheidung getroffen und die Technik tatsächlich eingesetzt wurde.

## Angaben übernehmen

Im Repository rechts neben **About** das Zahnrad öffnen und Beschreibung sowie Topics eintragen. Alternativ in einer Umgebung mit funktionierender GitHub-CLI-Anmeldung und passenden Repository-Rechten ausführen:

```bash
gh repo edit manuelk2607/IT-Worlds \
  --description 'Deutschsprachige IT-Wissensplattform im Aufbau: verständliche Artikel, kuratierte Quellen, Lernpfade, Quizzes und Lernspiele rund um die IT-Welt.' \
  --add-topic information-technology,computer-science,education,learning-platform,knowledge-base,interactive-learning,gamification,quiz,learning-games,german
```

Der Befehl ergänzt Topics. Vorhandene Topics werden nicht entfernt. Nach erfolgreicher Übernahme diesen Status und den entsprechenden Punkt in der [Roadmap](ROADMAP.md) aktualisieren.

## Beitragsvorlagen

- **Inhalt vorschlagen:** Thema, Zielgruppe, Lernziel und Quellen sammeln.
- **Idee oder Lernspiel vorschlagen:** Nutzen, Ablauf, Aufwand und Erfolgskriterien beschreiben.
- **Fehler oder Korrektur melden:** betroffene Stelle, Problem und begründete Korrektur erfassen.
- **Pull Request:** Zweck, Dokumentationsprüfung und Quellen nachvollziehbar machen.

Die Issue-Formulare vergeben noch keine Labels automatisch. So sind sie ohne zusätzliche Label-Einrichtung verwendbar.

## Sinnvolle spätere Repository-Pflege

- Kleine Änderungen über Pull Requests prüfen, sobald mehrere Personen mitarbeiten.
- Bei Bedarf Labels wie `content`, `learning-game`, `documentation` und `decision` einführen.
- Arbeitspakete zunächst in Issues pflegen; ein Projektboard erst bei genügend paralleler Arbeit ergänzen.
- Automatische Build- und Inhaltsprüfungen nach der Technikauswahl einrichten.
- Lizenzmodell für Programmcode und eigene Bildungsinhalte bewusst auswählen; Rechte an Fremdmaterial separat dokumentieren.
- Sicherheitsmeldungen und einen passenden Kontakt vor Einführung von Konten oder Serverfunktionen planen.

Eine Lizenz, Release-Version, Roadmap-Frist oder eine produktive Website wird durch dieses Konzeptpaket nicht behauptet.
