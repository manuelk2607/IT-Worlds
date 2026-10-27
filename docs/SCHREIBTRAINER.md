# Schreibtrainer

`/schreibtrainer/` und `/en/schreibtrainer/` bieten zwölf gestufte Lektionen, eine adaptive Zeichenwiederholung und eigene Texte. Alle Übungen bleiben ohne Konto zugänglich.

Der Lernweg führt von Grundstellung und G/H über die weiteren Buchstabenreihen, Großschreibung, Zahlen und Sonderzeichen zu Wörtern, Sätzen, einem vollständigen Absatz und einer realistischen Teamnotiz. Die drei neuen Textaufgaben sind eigens verfasste DE/EN-Übungstexte ohne übernommene fremde Passagen. Ihre Längen sind vergleichbar. Voraussetzungen werden empfohlen, nicht durch Zugangssperren erzwungen. Tests prüfen die Zeichenmenge jeder Lektion einschließlich ihrer Voraussetzungen.

`typingLessonText` liefert denselben festen Text für Browser und Konto-API. Die bestehenden Ranglistentexte und Messregeln bleiben unverändert. Eigene und adaptive Texte werden weiterhin ausschließlich lokal verwendet. Die zusätzlichen Lektionen passen in die bestehende Datenstruktur; keine Migration erforderlich.

Der Fortschrittsbalken zählt korrekt verbleibende Zielzeichen. Nach dem Lauf erscheinen noch nicht geschriebene Zeichen, die ersten fünf verbliebenen Abweichungen mit Position und die Gesamtzahl aller Fehlanschläge einschließlich korrigierter Fehler. „Vollständig und korrekt“ bewertet nur den Endtext, keine Fingerhaltung oder menschliche Teilnahme. WPM/KPM und Genauigkeit behalten ihre dokumentierten Replayregeln.

Vorhandene lokale Ergebnisse bleiben im Schlüssel `it-worlds-typing:v1` erhalten. Neue Ergebnisse enthalten zusätzlich einen aus Text und Sprache abgeleiteten Vergleichsschlüssel und den Endtextstatus. Vergleiche und Diagramm verwenden nur denselben tatsächlichen Text in derselben Sprache. Alte Ergebnisse ohne Vergleichsschlüssel bleiben in der allgemeinen Historie sichtbar und fließen weiterhin in die lokale Schwächenwiederholung ein; sie werden nicht mit möglicherweise geänderten Texten verglichen. Es werden höchstens die bisherigen 50 lokalen Ergebnisse aufbewahrt. Der Schlüssel ist keine Sicherheitsfunktion und wird nicht an den Server gesendet.

Eigene Texte werden durchgehend in Unicode-Codepunkten ausgewertet und korrigiert; Emoji erzeugen beim Löschen keinen zusätzlichen Backspace im Replay. Das ist keine Messung von Fingerhaltung oder Graphemgruppen.

Die drei neuen Textlektionen wurden mit zwei echten development-Sessions in beiden Sprachen geprüft: identischer Servertext, private Konto-Historie und keine Aufnahme der Übungsrunden in Ranglisten. Die bestehenden Timing-/Replay-/Sichtbarkeits- und RLS-Negativtests bestehen ebenfalls. Veröffentlichung und übrige Nachweise stehen in `PROGRESS.md`.
