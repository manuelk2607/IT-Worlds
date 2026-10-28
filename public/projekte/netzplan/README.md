# IT-Worlds · netzplan

Deutsch: Vollständiges lokales Lernprojekt. Node.js ab 22.22, Terminal und Editor erforderlich. Keine Installation fremder Pakete, keine Netzwerkzugriffe. In einem neuen eigenen Übungsordner entpacken. Website-Anleitung: https://it-worlds.maki26.workers.dev/projekte/netzplan/

English: Complete local learning project. Requires Node.js 22.22+, a terminal and editor. No external packages or network requests. Extract into a new practice folder. Guide: https://it-worlds.maki26.workers.dev/en/projekte/netzplan/

```sh
node --experimental-strip-types --test project.test.ts
node --experimental-strip-types cli.ts sample.json
```

DE: Erst Ergebnis vorhersagen, dann starten, Tests ausführen, einen Negativfall herstellen und anschließend den korrekten Zustand wiederherstellen. Kleine, eigene Testdaten verwenden. Eingaben sind auf 64 KiB begrenzt; die Datei während des Lesens nicht verändern. Diese Übung ist kein sicherer Ausführungsdienst für fremde Dateien. Nur die eigenen temporären Tests räumen ihre Testordner auf. Der CLI liest; er löscht oder verändert keine Nutzerdaten.

EN: Predict the outcome, run it, execute tests, create a negative case and restore the correct state. Use small test data you own. Input is limited to 64 KiB; do not change the file during reading. This exercise is not a secure execution service for hostile files. Only temporary tests clean up their own directories. The CLI reads and never deletes or modifies user data.

Exit 0: successful calculation/check. Exit 2: invalid input/configuration. Integrity verify additionally uses exit 1 for actual differences. Every assertion is visible in project.test.ts. The full course guide explains expected results, limits and transfer tasks.
