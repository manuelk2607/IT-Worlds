# Quizzes und Lernspiele

## Lernprinzip

Jede Aufgabe prüft ein benanntes Lernziel aus einem Artikel. Eine Auswertung erklärt die Lösung und typische Fehlannahmen. Ein Ergebnis wie „drei von fünf richtig“ ist eine Rückmeldung zum aktuellen Versuch, keine verlässliche Einstufung der gesamten IT-Kompetenz.

Die vorgeschlagene erste Version hat ein einfaches Quizformat und genau ein kleines Spiel. Weitere Formate bleiben Ideen, bis der Einstieg mit Testpersonen funktioniert.

## Quizformate

| Format | Geeignet für | Einordnung |
| --- | --- | --- |
| Single Choice | einen Begriff oder Zusammenhang unterscheiden | erster Kandidat für die Startversion |
| Multiple Choice | mehrere zutreffende Aussagen erkennen | später; Anzahl möglicher Antworten und Wertung klar erklären |
| Zuordnung | Begriff und Bedeutung verbinden | spätere Ergänzung mit Tastaturalternative |
| Reihenfolge | einen Ablauf nachvollziehen | Grundlage für das erste Lernspiel |
| Szenariofrage | Wissen in einer Alltagssituation anwenden | nach ersten Erfahrungen ergänzen |

Für eine Frage werden später eine stabile ID, das Lernziel, die verknüpften Artikel, die Schwierigkeit, die Antwortoptionen, die Lösung und eine Erklärung je Option benötigt. Eine Änderung der Frage kann eine Inhaltsversion erfordern, damit gespeicherte Ergebnisse einordbar bleiben.

Falsche Antworten sollen plausible Missverständnisse abbilden. Fangfragen, unnötige Verneinungen und lediglich auswendig gelernte Produktdetails sind wenig geeignet. Die Position der richtigen Antwort darf sich nicht aus einem Muster ergeben.

## Beispiel einer Aufgabe als Entwurf

**Lernziel:** Die Rolle von DNS erklären.

**Frage:** Ein Browser kennt für einen Domainnamen noch keine IP-Adresse. Wofür wird in diesem Zusammenhang DNS verwendet?

- **A:** Um den Domainnamen in eine passende IP-Adresse aufzulösen. **Richtig:** DNS liefert hier Adressinformationen; die Website-Inhalte werden anschließend über weitere Schritte angefragt.
- **B:** Um den HTML-Inhalt der Website zu übertragen. **Falsch:** Dafür dient die spätere HTTP-Anfrage und -Antwort.
- **C:** Um die Verbindung automatisch zu verschlüsseln. **Falsch:** Bei HTTPS übernimmt TLS die Transportverschlüsselung; DNS allein erledigt das nicht.

Diese Entwurfsfrage ist ein Beispiel für den Aufbau, kein fertiger Fragenkatalog.

## Spielideen nach Aufwand und Nutzen

Aufwand ist relativ eingeschätzt und umfasst Gestaltung, verständliche Rückmeldungen und Zugänglichkeit.

| Spiel | Aufgabe und Lernziel | Aufwand | Priorität |
| --- | --- | --- | --- |
| Paketreise | Schritte einer vereinfachten Webanfrage ordnen und ihre Aufgaben erklären | klein bis mittel | erste Version |
| Binärlabor | Bits umschalten und die entstehende Dezimalzahl herleiten | klein | frühe Erweiterung |
| Begriffe-Memory | Fachbegriffe passenden Erklärungen zuordnen | klein | optionale Wiederholung |
| Phishing-Detektiv | Hinweise in fiktiven Nachrichten markieren und begründen | mittel | nach Aufbau der Sicherheitsartikel |
| Debugging-Mission | Fehler in kurzen Codebeispielen finden | mittel | nach Aufbau der Programmierartikel |
| Netzwerk-Puzzle | Komponenten verbinden und den Paketweg nachvollziehen | mittel bis groß | spätere Vertiefung |
| SQL-Werkstatt | Abfragen gegen einen vorbereiteten Beispieldatensatz lösen | groß | später, mit isolierter Ausführung |
| IT-Escape-Room | mehrere gelernte Konzepte in einer Geschichte kombinieren | groß | langfristige Idee |

## Paketreise als erste kleine Spielidee

**Szenario:** Eine neue HTTPS-Verbindung wird aufgebaut; DNS-Antwort und Verbindung liegen für diese Übung noch nicht im Cache vor. Die Darstellung nutzt einen vereinfachten Ablauf für HTTPS über TCP. Andere Protokollvarianten werden als Vertiefung erklärt.

**Aufgabe:** Stationskarten ordnen: DNS-Auflösung → TCP-Verbindung → TLS-Aushandlung → HTTP-Anfrage → HTTP-Antwort → Darstellung im Browser.

**Rückmeldung:** Jede Station erläutert ihre Aufgabe. Bei Fehlern erscheinen ein Hinweis und der passende Artikellink. Die Browserdarstellung wird bewusst vereinfacht; echte Seiten können weitere Anfragen und parallele Abläufe auslösen.

**Bedienung:** Karten lassen sich über Schaltflächen oder Tastatur verschieben; Drag-and-drop kann zusätzlich angeboten werden. Die Aufgabe funktioniert ohne Zeitlimit. „Neu versuchen“ und „Lösung mit Erklärung ansehen“ stehen jederzeit bereit.

## Motivation und Fortschritt

Für den Anfang reichen abgeschlossene Kapitel und nachvollziehbare Ergebnisse pro Versuch. Später wären freiwillige Lernziele, thematische Abzeichen und Wiederholungen nach zeitlichem Abstand denkbar. Eine unterbrochene Lernserie sollte bisherige Erfolge nicht entwerten.

Lokal gespeicherter Fortschritt wäre gerätebezogen und kann beim Löschen von Browserdaten verloren gehen. Das muss verständlich erklärt und zurücksetzbar sein. Konten und geräteübergreifende Synchronisierung werden erst bei belegtem Bedarf geplant.

Öffentliche Ranglisten oder verbindliche Prüfungen würden andere Anforderungen an Fairness und Manipulationsschutz stellen. Bei frei zugänglichen Selbsttests dürfen Antworten im Browser sichtbar sein.

## Qualitätskriterien

- Eine Aufgabe prüft Wissen aus dem zugeordneten Inhalt und erklärt die Lösung.
- Alle Antwortwege, einschließlich falscher Antworten und Wiederholungen, sind verständlich.
- Die Aufgabe ist auf kleinen Bildschirmen und ohne Maus vollständig bedienbar.
- Erfolg oder Fehler werden mit Text vermittelt; Animationen sind optional.
- Eine Frage vermeidet Mehrdeutigkeit oder benennt ausdrücklich ihre Annahmen.
- Technische Simulationen zeigen ihre Vereinfachungen und Grenzen.
