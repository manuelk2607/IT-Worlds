# Inhaltskonzept

## Themen ordnen und Wissen verbinden

Die Themenwelten in der [README](../README.md#mögliche-themenwelten) bilden die oberste Ebene. Innerhalb einer Welt gibt es einzelne Artikel, Begriffserklärungen und zusammenhängende Lernpfade. Schlagwörter verbinden verwandte Themen über die Welten hinweg.

Schwierigkeit und Voraussetzungen getrennt angeben: „Einführung“ bedeutet nicht automatisch „ohne Vorwissen“. Ein kurzer Hinweis wie „Du solltest bereits wissen, was ein Client ist“ hilft mehr als ein abstraktes Level.

## Vorschlag für den ersten Inhaltssatz

Sechs Artikel bilden ein kleines, verbundenes Startangebot. Die Titel sind Arbeitsvorschläge, die Artikel selbst sind noch nicht geschrieben.

| Artikel | Primäre Welt | Lernziel |
| --- | --- | --- |
| Bits und Bytes verstehen | IT-Grundlagen | Bit und Byte unterscheiden und einfache Größenangaben einordnen |
| Client und Server | Internet und Netzwerke | Rollen bei einer Anfrage anhand eines Beispiels erklären |
| IP-Adressen und Ports | Internet und Netzwerke | Adressierung und die Zuordnung zu einem Dienst unterscheiden |
| Was macht DNS? | Internet und Netzwerke | Namensauflösung erklären und von der eigentlichen Inhaltsanfrage trennen |
| HTTP und HTTPS | Internet und Netzwerke | Anfrage und Antwort verstehen und die Rolle der Transportverschlüsselung einordnen |
| Vom Browser zur Website | Internet und Netzwerke | Die zuvor erklärten Schritte zu einem Gesamtbild verbinden |

Der Lernpfad „Vom Browser zur Website“ führt von Client/Server über IP, DNS und HTTP(S) zum Gesamtbild. „Bits und Bytes“ ist ein ergänzender Grundlagenartikel. Erweiterte Details wie DNS-Cache, Verbindungswiederverwendung oder HTTP/3 gehören in deutlich gekennzeichnete Vertiefungen.

## Einheitlicher Artikelaufbau

1. **Leitfrage und Lernziel:** Was kann ich nach dem Lesen erklären?
2. **Voraussetzungen:** nötiges Vorwissen mit Links.
3. **Kurz erklärt:** die Kernaussage in wenigen Sätzen.
4. **Anschauliches Beispiel:** eine konkrete Situation, bei Bedarf mit Diagramm.
5. **Genauer betrachtet:** technische Erklärung und Grenzen einer verwendeten Analogie.
6. **Häufige Missverständnisse:** zum Beispiel „HTTPS bedeutet, dass eine Website vertrauenswürdig ist“.
7. **Wissen prüfen:** passende Quizfragen oder ein Lernspiel mit Rückverweisen.
8. **Weiterlernen und Quellen:** verwandte Inhalte, Primärquellen und Prüfdatum.

Als Richtwert eignen sich fünf bis zehn Minuten Lesezeit. Ein komplizierter Zusammenhang kann mehrere kurze Artikel rechtfertigen; die Länge ist kein Selbstzweck.

## Geplante Inhaltsmetadaten

Diese Felder beschreiben ein mögliches späteres Inhaltsmodell, noch kein implementiertes Dateiformat:

| Feld | Zweck |
| --- | --- |
| Stabile ID und URL-Kennung | Artikel, Fragen und Übersetzungen dauerhaft zuordnen |
| Titel, Kurzbeschreibung, Sprache | Suche und Vorschauen |
| Primäre Themenwelt und Schlagwörter | Navigation und Querverweise |
| Lernziele, Schwierigkeit, Voraussetzungen | passende Lernwege |
| Erstellungs-, Änderungs- und fachliches Prüfdatum | Aktualität nachvollziehbar machen |
| Verantwortliche Person und Status | Entwurf, geprüft oder veröffentlicht unterscheiden |
| Quellen mit Titel, URL und Abrufdatum | Aussagen überprüfen |
| Verwandte Artikel, Quiz- und Spielkennungen | Erklärung und Übung verbinden |
| Rechtehinweise für Text und Medien | Herkunft und erlaubte Verwendung festhalten |

Das fachliche Prüfdatum wird nur nach einer tatsächlichen Prüfung aktualisiert. Eine Rechtschreibkorrektur ist keine erneute fachliche Freigabe.

## Informationen sammeln und pflegen

Empfohlener Ablauf: Frage aus der Zielgruppe sammeln → passende Quellen auswählen → eigene Erklärung schreiben → fachlich gegenlesen → Übung zuordnen → veröffentlichen → nach Themenänderungen erneut prüfen.

- Originaldokumentation, Standards und seriöse Bildungsangebote bevorzugen.
- Fremde Texte zusammenfassen und verlinken; Übernahmen und Abbildungen nur mit passenden Rechten und Kennzeichnung verwenden.
- Grundlagen und zeitabhängige Produktinformationen sichtbar unterscheiden.
- Versionsabhängige Anleitungen mit Version und Rahmenbedingungen versehen.
- Veraltete oder widersprüchliche Informationen über die Korrekturvorlage melden.
- KI-unterstützte Entwürfe vor Veröffentlichung fachlich prüfen und ihre Quellen tatsächlich aufrufen.

Für stabile Grundlagen kann eine jährliche Sichtung ein Ausgangspunkt sein; schnell veränderliche Themen brauchen kürzere Abstände oder eine ereignisbezogene Prüfung. Der Pflegeplan muss zum verfügbaren Redaktionsteam passen.

## Geeignete Ausgangspunkte für spätere Recherche

Diese Links sind eine Quellen-Startliste, keine bereits ausgewertete Artikelsammlung:

| Bereich | Ausgangspunkt |
| --- | --- |
| Web und HTTP | [MDN Web Docs](https://developer.mozilla.org/de/) und [IETF-Standards](https://www.rfc-editor.org/) |
| Sicherheit | [BSI](https://www.bsi.bund.de/) und [OWASP](https://owasp.org/) |
| Versionsverwaltung | [Git-Dokumentation](https://git-scm.com/doc) |
| Datenbanken | [PostgreSQL-Dokumentation](https://www.postgresql.org/docs/) |
| Barrierefreiheit | [W3C Web Accessibility Initiative](https://www.w3.org/WAI/) |

Das Lesen und Verlinken einer Quelle erlaubt nicht automatisch, deren Texte oder Medien zu übernehmen. Für Bibliothek, Laufzeit oder Betriebssystem später jeweils die zugehörige offizielle Dokumentation ergänzen.
