# Projektvorgaben

- Für den Projektcode TypeScript verwenden: Anwendung, Browser-Skripte, Tests, Hilfsskripte und unterstützte Konfigurationsdateien als `.ts`/`.tsx` anlegen. In Astro-Dateien ist Frontmatter ebenfalls TypeScript. Keine neuen JavaScript-Quelldateien oder JavaScript-Codebeispiele ergänzen; vorhandene bei Änderungen nach TypeScript migrieren.
- TypeScript strikt prüfen; `any`, `@ts-ignore` oder deaktivierte Prüfungen sind kein Ersatz für eine korrekte Migration. Browser-Builds dürfen selbstverständlich generiertes JavaScript enthalten; `dist/` und Abhängigkeiten werden nicht manuell umgeschrieben.
- Für neue Web-Lernbeispiele TypeScript verwenden. JavaScript darf zur Erklärung der Browser-Laufzeit oder zum Vergleich erwähnt werden; andere Themen wie Python, SQL oder LaTeX behalten ihre jeweilige Sprache.
- Typst und LaTeX bilden die eigenständige sichtbare Themenkategorie „Textsatz & Dokumentenerstellung“; Typst als empfohlenen modernen Einstieg hervorheben. Markdown bleibt bei „Programmiersprachen“. Die historischen Kurs-URLs unter `/themen/programmiersprachen/` als Kompatibilitätsrouten und alle stabilen Fortschritts-IDs erhalten.
- Fachliche Aussagen und Quizfragen benötigen tatsächlich gelesene Quellen mit Version beziehungsweise Ausgabe, Abschnitt und Lesedatum. Quellenabgleich und unabhängiges Fachreview unterscheiden.
- Die Cloud-Aufgabe ist bereits isoliert. Vorhandenen Checkout verwenden; keinen zusätzlichen Git-Worktree ohne ausdrücklichen Auftrag erstellen.
- Bei Code- oder Inhaltsänderungen `npm test`, `npm run check` und `npm run build` ausführen. Betroffene Interaktionen zusätzlich im Browser prüfen. Änderungen und Dateien des Nutzers erhalten.

- Deutsch und Englisch vollständig pflegen; stabile Inhalts-IDs, Quellenmetadaten und Quizlösungen müssen übereinstimmen. Übersetzungen in src/data/content.en.ts und sichtbaren UI-Texten ergänzen.
- Alle Lerninhalte bleiben für Gäste zugänglich. Accounts ergänzen ausschließlich persönlichen Fortschritt. Geplante Inhalte nicht abhackbar machen.
- Auth über Neon Managed Auth und den gleichursprünglichen Worker-Proxy betreiben. Nutzer-ID ausschließlich aus einer live validierten Session ableiten; RLS und eingeschränkte Runtime-Rolle erhalten. Owner-URLs, Passwörter und Cookies niemals in Frontend, Git oder Logs ablegen.
- Schemaänderungen zuerst auf development testen, als neue Migration mit Prüfsumme versionieren und erst danach auf main anwenden. Bereits angewendete Migrationen nicht ändern. Accounts mit zwei getrennten Sessions und RLS prüfen.
- Sprachwechsel, helles/dunkles Design, mobile Navigation und beide 404-Varianten bei betroffenen Änderungen zusätzlich im Browser prüfen.
