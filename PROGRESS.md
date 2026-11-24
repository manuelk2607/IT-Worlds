# IT-Worlds – Fortschritt

## Selbstständige Übernahme bestehender IT-Worlds-Konten vorbereitet

Der Nur-Lese-Abgleich zählt zwei Altprofile mit den bisherigen IDs,
davon eines bereits mit Worlds verknüpft. Das zweite Profil kann der
Kontoinhaber nach Freischaltung selbst übernehmen. Die Kontoseite verlangt
die frische Worlds-Anmeldung und die frische IT-Worlds-Anmeldung.
Vorschau und Bestätigung verwenden die nachgewiesenen Konten. Die lokale
ID bleibt erhalten. Ein anderes Altprofil kann mit derselben Vorschau
nicht bestätigt werden.

Der bisherige Modus für ein einzelnes Kontopaar bleibt Standard. Die
Selbstübernahme wird ausdrücklich per `--enable-worlds-self-service-linking`
aktiviert und setzt die eingespielte Migration 009 voraus. Der vorhandene
signierte Nachweisversand bleibt nutzbar. Die Freischaltung benötigt keine
Schemaänderung. Rücknahmeversion `163de77f` erhält die vorhandene Zuordnung,
die Worlds-Anmeldung und den privaten Versandweg zum Hub.

141 lokale Tests bestanden, 11 optionale übersprungen. Typprüfung, Build,
SEO, Linkprüfung und Cloudflare-Trockenlauf mit eigener Freischaltung
bestanden. Der neue Modus bleibt bis zur produktiven Freigabe geschlossen.
[GitHub](https://github.com/manuelk2607/IT-Worlds/actions/runs/45397308296)
bestand für `73847b4` einschließlich Node 22, Node 24 und PostgreSQL 18.

## Zentraler IT-Worlds-Migrationsnachweis – 24.11.2026

Produktiver Nur-Lese-Abgleich: ein bestehender, bestätigter Altprofil-Link
mit Audit-Eintrag. Migration 009 verwendet das bestehende Audit als
Warteschlange. Sie nimmt nur bestätigte Altprofile und deren Widerruf
auf. Neue Lernprofile, Lernstände und bisherige Zuordnungen bleiben in
IT-Worlds. Die eingeschränkte Anwendungsrolle kann nur einen begrenzten
Stapel abrufen und den Versand quittieren. Direkter Zugriff auf die
Audit-Daten und die native Konto-ID bleibt gesperrt.

Der gemeinsame signierte Sender verwendet ausschließlich den
IT-Worlds-Endpunkt des Hubs. Er benötigt das eigene Worker-Secret
`WORLDS_MIGRATION_RECEIPT_PRIVATE_JWK` mit `kid`. Der freigegebene
Einzelversand mit der eingeschränkten Anwendungsrolle wurde vom Hub
bestätigt. Der IT-Datenbankabgleich zeigt Revision 1 und keinen Konflikt.

Cloudflare hat den separaten Zeitplan abgewiesen, da das kostenlose
Kontingent für fünf Zeitpläne ausgeschöpft ist. Der Hub verwendet seinen
vorhandenen Zeitplan für den täglichen internen Aufruf um 03:17 UTC.
Der signierte Sender lässt keine Weiterleitung zu und verwendet dafür
Cloudflares unterstützte Einstellung `manual` mit expliziter 3xx-Ablehnung.
Worker `163de77f-5c7a-4353-8589-483df8c8de50` läuft zu 100 % mit derselben
Konfiguration und privatem Dienstaufruf. Die echte lokale Worker-Laufzeit
hat Signatur und Quittung mit Testdaten durchgespielt. Die
[GitHub-Prüfung](https://github.com/manuelk2607/IT-Worlds/actions/runs/45387815080)
bestand auf Node 22 und 24 mit PostgreSQL 18. Der Hub hat den internen
Dienst produktiv verbunden. Der erste tägliche Lauf steht aus.
Für eine Rücknahme zuerst den Hub auf `59d1b615` und danach IT-Worlds auf
`50474787` zurücksetzen. Migration 009 bleibt dabei wirksam.

Lokal bestätigt: 140 bestandene Tests, 11 optionale Skips, Typprüfung,
534 gebaute Seiten, SEO- und Linkprüfung. Die Migration wurde zusätzlich
mit einem nicht privilegierten PostgreSQL-Schemaeigentümer getestet:
Altprofil erfassen, quittieren und nach Löschung korrekt widerrufen.
Astro 7.4.7 und Better Auth 1.7.14 beheben die beim Audit gefundenen
Sicherheitsmeldungen. Das Laufzeit-Audit meldet null Befunde. Der Patch
benötigt Node 22.23.4 oder neuer. Die angepasste
[GitHub-Prüfung](https://github.com/manuelk2607/IT-Worlds/actions/runs/45266022475)
bestand auf Node 22 und 24 einschließlich PostgreSQL 18. Der
Cloudflare-Probelauf und die Kontoseite mit simulierten Antworten
bestanden in Chromium DE bei 1440 px und WebKit EN bei 320 px.

Migration 009, SHA-256
`9363932778f76631589d3c67edd30b200e8ee227c92d0807f99a3e28599cdaa5`.
Der vollständige GitHub-Stand für die Veröffentlichung ist `7d0c93c`.
Die produktive Freigabe liegt vor. Die Neon-Sicherung ohne Compute
`br-purple-hill-bauxj1e4` ist bereit, Wiederherstellungspunkt `0/2B81188`.
Der unmittelbare Ausgangspunkt war `0/2BC7C90`. Die Transaktion 009 wurde
mit der geprüften Prüfsumme und genau einem offenen Nachweis angewendet.
Zwei Profile, 17 Lernfortschritte und deren Zuordnungen stimmen vor und
nach der Migration per Prüfsumme überein. Die Anwendungsrolle kann das
Audit weiterhin nicht direkt lesen. Die Quelle und das Release des
Einzelversands `50474787-6c8f-4b8f-a572-f53e57b8b11c` behielten alle 14
vorhandenen Worker-Bindungen sowie den neuen privaten Schlüssel. DE/EN,
Anmeldeoberfläche, Abmelde-Empfänger und 528 öffentliche SEO-Seiten sind
live geprüft. Rücknahmeversion vor dem Einzelversand `b2ef4a0c`.

## Übernahme eines vorhandenen Lernstands produktiv bestätigt

Der Kontoinhaber hat den alten Lernstand im Browser geöffnet und sich
danach neu beim bisherigen IT-Anbieter angemeldet. Die frische Sitzung
gehört zum selben vorhandenen Profil mit drei Lernfortschritten. Die
bereits bestätigte zentrale Identität stimmt in Music-Worlds und Slop
Urself überein. Für die erste Übernahme ist nur dieses Paar vorgesehen.

Die Produktionsroute bleibt ohne gültige private Paar-Konfiguration
geschlossen. Vorschau und Bestätigung prüfen weiterhin beide frischen
Sitzungen. Andere Konten sind ausgeschlossen; für das ausgewählte Konto
ist eine doppelte Profilerstellung während der Übernahme gesperrt. Der
Release erhält den laufenden Hub-Prüfschlüssel und den Schalter für neue
Lernprofile. Es ist keine weitere Migration nötig. Die Übernahme entsteht
erst durch die persönliche Bestätigung nach der Vorschau im Browser.
Die produktive Rücknahmeversion ist `aa30a5b2-9eaf-41a1-a895-0db596a19e40`.

139 von 150 Tests bestanden (11 optionale übersprungen), dazu
Typprüfung, Build und Release-Trockenlauf. Der gezielte Routentest
prüfte falsche zentrale und lokale Konten sowie die Sperre für ein
doppeltes Lernprofil. Chromium DE am Desktop und EN bei 320 px prüfte
mit simulierten Sitzungen die Sichtbarkeit, doppelte Kontovorschau,
Tastaturfokus und Fehleranzeige. [GitHub Quality](https://github.com/manuelk2607/IT-Worlds/actions/runs/44174022817)
bestand für `54fa77d`. Nach Zustimmung wurde der Worker
`b2ef4a0c-faca-46ee-bdd4-bd16f60c82c2` zu 100 % aktiviert. Bereite
Neon-Sicherung ohne Compute: `br-rough-pine-ba27cunb`, LSN `0/2ACF218`.
Live bestätigt: keine sichtbare oder nutzbare Kontoverknüpfung für
anonyme Besucher, bisherige Anmeldung und aktiver Hub-Abmelde-Empfänger.
Die persönliche Bestätigung beider Konten im Browser war erfolgreich.
Die Datenbank bestätigt genau eine Zuordnung und einen Audit-Eintrag,
eine aktive Worlds-Sitzung, dieselbe Profil-UUID und unveränderte
Prüfsummen für alle drei Fortschritte des Kontos. IT-Worlds enthält
weiterhin insgesamt 17 Fortschrittszeilen. Das zweite Altprofil bleibt
unverknüpft und benötigt einen eigenen Eigentumsnachweis.

## Lernprofil für bestätigte Worlds-Konten produktiv – 17.11.2026

Die DE/EN-Kontoseite erlaubt bei bestätigter Worlds-Anmeldung die bewusste
Anlage eines IT-Lernprofils mit derselben zentralen Identität. Eine aktive
bisherige IT-Sitzung verhindert ein zweites Profil. Profile, Zuordnungen
und Audit entstehen gemeinsam. Der Rücksprung öffnet anschließend dieselbe
Lernseite. Die Profilerstellung ist standardmäßig geschlossen.

Migration 008 legt eine projektinterne UUID-Tabelle an. Lernstände,
Schreibtrainer und Profile bleiben in IT-Worlds. Bestehende UUIDs, Fortschrittswerte
und Löschbeziehungen wurden lokal vor und nach dem Umbau verglichen. Der
bisherige Worker kann vorhandene und neue Lernprofile lesen. Native
Bestandsprofile und spätere native Schreibzugriffe bleiben beim Rücksetzen
des Workers möglich.

Der erste produktive Lauf rollte vollständig zurück. Die drei Fremdschlüssel
der Inhaltsdaten waren nach einer früheren Auth-Wiederherstellung bereits
entfernt. Die Migration erkennt jetzt vorhandene Fremdschlüssel anhand
ihrer Definition. In Produktion wird nur der Fremdschlüssel der Zuordnung
umgestellt. Die 13 historischen Fortschrittszeilen ohne aktuelles Konto
behalten ihre bisherigen IDs und erhalten keine Zuordnung. Der lokale
PostgreSQL-Test deckt beide Schemas und den vollständigen Rollback ab.

138 Tests bestanden, elf optionale übersprungen. PostgreSQL 17 prüfte
Migration und Rollback, verlässliche Zuordnung bei zwei parallelen
Anfragen, Rollenrechte, Lernstand, Schreibtrainer und native Löschkaskade.
Chromium DE (1440 px) und WebKit EN (320 px) bestanden die gebaute
Kontoseite mit simulierten Antworten. Typprüfung und Build mit 534 Seiten
bestanden. Der Produktions-Trockenlauf prüfte 40.228 interne Links.

Der Produktionsabgleich vom 17.11. bestätigt das geprüfte Schema: 001–007
sind angewendet, 008 fehlt, der einzige native Fremdschlüssel der vier
betroffenen Tabellen gehört `worlds_identity_links`. Von 17
Fortschrittszeilen gehören 13 zu keiner aktuellen nativen Identität. Es
gibt zwei native Konten und noch keine Worlds-Zuordnung.

Nach ausdrücklicher Zustimmung: Sicherung `br-lively-forest-ba8hp4o5`
ohne Compute war bereit, LSN `0/2A90CA0`. Ausschließlich `008` aus
`31c8bbb` (SHA-256 `cbb692d87755bb610ee2aa3058f72775bd4bcb24eceb4602b824c69e83286fd8`)
angewendet. Die Transaktion bestätigte unveränderte Prüfsummen für zwei
native Konten und deren Provider-Zuordnungen, 17 Lernfortschritte, leere
Schreibtrainer-Tabellen und null Worlds-Zuordnungen. Beide nativen
Projekt-IDs entsprechen den bisherigen Konto-IDs. Die 13 historischen
Fortschrittszeilen erhielten keine neue Zuordnung.

Der Worker `aa30a5b2-9eaf-41a1-a895-0db596a19e40` läuft mit 100 % Traffic
(Deployment `edab1eb9-34a2-43d8-b462-466d4e6e4b21`). Der Release bestand
den Datenbankrollencheck, 534 Seiten, 40.228 Linkziele und die Live-SEO-Prüfung.
Live bestätigt: DE/EN-Konto, PKCE, anonyme Profilerstellung 401,
Kontoverknüpfung 404 und aktiver Abmelde-Empfänger (unsigniert 400).
Eine echte Profilanlage mit einem angemeldeten Produktionskonto wurde
nicht ausgelöst. Rücknahmeversion mit aktiver Abmeldung:
`acb62c46-94bb-41e1-8abd-7391e10f51b2`. Die kompatible Zuordnungstabelle
bleibt bei einer Worker-Rücknahme erhalten. Vorhandene Altkonten benötigen
weiterhin einen eigenen Eigentumsnachweis.

## Worlds-Anmeldung produktiv – 15.11.2026

`88f2b00` läuft auf [IT-Worlds](https://it-worlds.maki26.workers.dev/) mit 100 %
Traffic. Worker `db925d3d-0b15-4412-b0f0-fd4be9e902b7`, Deployment
`3a07c3b6-5f42-449b-b226-cc8ea5367fee`. Der Anmeldelink führt zum Hub. Die
bisherige Anmeldung bleibt für vorhandene Konten erreichbar. Die alte
Registrierung und die Kontoverknüpfung sind geschlossen.

Migrationen 003–007 und ihre Prüfsummen wurden in einer Transaktion auf Neon
Main (`br-long-violet-ba34agj1`) eingespielt. Vor und nach dem Eingriff
stimmten Zahl und Prüfsummen für zwei Konten, zwei Provider-Zuordnungen, 17
Lernfortschrittszeilen und die leeren Schreibtrainer-Tabellen überein.
Die Tabelle der Worlds-Zuordnungen ist leer. Bereite Sicherung
`br-blue-violet-banwatv7` am LSN `0/295F008`. Cloudflare-Rücknahme auf
`706415e9-38b0-4938-bc4e-d3de256e043c` (Deployment
`951b5a20-df96-4f2f-acb0-c6d699a5ea3c`). Die additiven Tabellen können dort
bestehen bleiben.

[GitHub Quality](https://github.com/manuelk2607/IT-Worlds/actions/runs/43763897479)
bestand für den veröffentlichten Commit. Der Release prüfte 534 gebaute
Seiten, 40.228 interne Links, produktive Migrationsprüfsummen, die
eingeschränkte Worker-Rolle und öffentliche SEO. Live geprüft sind
DE/EN-Kontoseiten, anonymer Fortschrittszugriff (401), ungültiger Callback
(400) und geschlossene Verknüpfung (404). Chromium erreichte Worlds Hub mit
dem registrierten PKCE-Rücksprung und einem sicheren Host-Cookie. Der
Kontoinhaber bestätigte die aktive zentrale Sitzung und den Hinweis zur
erforderlichen Kontoverknüpfung. Nach lokaler IT-Worlds-Abmeldung gelang
die erneute Anmeldung über die zentrale Sitzung ohne erneute Passworteingabe.

Offen sind der Eigentumsnachweis für beide Altkonten sowie die
Produktivfreigabe von Verknüpfung und zentralem Widerruf.

## Rücksprung zur Lernseite nach Worlds-Anmeldung

Der Worlds-Login bewahrt erlaubte Lernseiten einschließlich Quiz-Auswahl und
Abschnittsanker. Der Rücksprung geht über die lokalisierte Kontoseite. Nach
bestätigter Verknüpfung öffnet sie die ursprüngliche Seite. Die erneute
Anmeldung für die Übernahme behält das Ziel ebenfalls. Der Worker speichert
das geprüfte Ziel in der bestehenden PKCE-Transaktion. Externe Ziele,
verschachtelte Weiterleitungen sowie Auth- und API-Routen werden verworfen.

137 Tests bestanden, zehn optionale übersprungen. Astro-Check und Build
bestanden. Chromium und WebKit prüften mit simulierten Antworten den
Rücksprung auf eine DE-Lektion am Desktop und ein EN-Quiz mobil sowie den
Verbleib auf der Kontoseite bei offener Verknüpfung oder ungültigem Ziel.
Der Produktivstart aus `a81a43a` bestand GitHub **43763608425**.

## Produktivstart mit geschlossener Kontoverknüpfung

`npm run deploy:worlds` stellt den registrierten Worlds-Login und Rücksprung
bereit. Beide Verknüpfungsschalter sind ausdrücklich aus. Vorhandene
IT-Worlds-Konten können sich im Übergang weiter anmelden. Die
Verknüpfungsrouten antworten mit 404. Beide Phasen verlangen die exakte
Produktions-Origin, den registrierten Client, die eingeschränkte Rolle und
die geprüften Migrationen 003–007. Für die spätere Verknüpfung ist
`--enable-worlds-linking` mit öffentlichem Hub-Widerrufsschlüssel erforderlich.
Dieses zweite Deployment folgt erst nach dem echten beiderseitigen
Anmeldenachweis.

135 Tests bestanden, zehn optionale übersprungen. Astro-Check, Build und
Cloudflare-Trockenlauf mit 1.263 Assets sowie 40.228 geprüften internen
Links bestanden. `5ddc122` bestand GitHub **43763380425**. Der aktuelle
Produktivstand und die Datenbanksicherung stehen oben.

## Bestehendes Konto im Worlds-Übergang

Die normale Anmeldung führt zu Worlds Hub. Für bisherige IT-Worlds-Konten
zeigt die Kontoseite einen separaten, standardmäßig geschlossenen Zugang.
Bei ausstehender Verknüpfung bleibt die Worlds-Sitzung während der erneuten
Anmeldung des bisherigen Kontos erhalten. Danach führt der Fokus zur Prüfung
beider Konten. Der Worker verweigert neue lokale Registrierungen im Worlds-Modus
und blendet den bisherigen Zugang im isolierten OIDC-Pilot aus.

135 Tests bestanden, zehn optionale übersprungen. Astro-Check und Build mit
534 Seiten bestanden. Chromium und WebKit prüften mit simulierten Antworten
Deutsch am Desktop und Englisch auf Mobilgeräten: Worlds-Link, Tastaturzugang
zum bisherigen Formular, Bestätigung und Anzeige beider Konten. Die echte
Provider-Abnahme und IT-Worlds-Produktivaktivierung stehen aus.
Die vorherige Release-Prüfung für `d7647db` war in GitHub **43763012428** grün.

## Abgesicherter Worlds-Produktivpfad – 15.11.2026

Ein eigener Release-Modus aktiviert Worlds nur für die exakte öffentliche
IT-Worlds-Origin, den registrierten Client, die Ressource und die eingeschränkte
Runtime-Rolle auf der Produktionsdatenbank. Er verlangt Migrationen 003–007
mit unveränderten Prüfsummen sowie den fest angehefteten öffentlichen Hub-
Abmeldeschlüssel. Gewöhnliche Releases behalten ihre bisherigen Bindings;
falscher Host, Datenbank, Rolle, Client, Pilotflag oder fehlende Linking-Gates
werden vor Aktivierung abgewiesen.

Lokal bestanden 132 Tests bei 10 dokumentierten optionalen Laufzeit-Skips,
Astro-Check für 297 Dateien ohne Befund und Build mit 534 Seiten. Der isolierte
Produktions-Trockenlauf prüfte 717 Artefaktdateien, 528 kanonische Seiten,
40.228 interne Ziele, 1.263 Worker-Assets und alle acht Worlds-Bindings ohne
Upload. Die manuell für exakt `feature/worlds-hub-sso-pilot` gestartete
GitHub-Quality-Prüfung **43730755667** bestand Commit `1546f67` vollständig in
Node 22 und 24 einschließlich aller veröffentlichten Beispielprojekte.

Die lesende Produktionsprüfung fand zwei bisherige Konten ohne verifizierte
E-Mail, 17 Lernfortschrittszeilen und ausschließlich Migrationen 001–002.
Der Worker-Rolle fehlt absichtlich Leserecht für die Migrationshistorie.
Der Release prüft deshalb die Prüfsummen über die direkte Owner-Verbindung
(`IT_WORLDS_MIGRATION_DATABASE_URL`) und prüft Rollenrechte und Zeilensicherheit
separat über `IT_WORLDS_PRODUCTION_DATABASE_URL`. Beide Verbindungen bleiben
im Prüfprozess. Der Live-Vorlauf las die produktive Historie und stoppte wie
erwartet vor der fehlenden Migration 003. 133 Unit-Tests bestanden, zehn
optionale Prüfungen übersprungen. Der zusätzliche gezielte Vorlauftest prüft
auch manipulierte Prüfsummen und zu weit reichende Runtime-Rechte.
Astro-Check und Build bestanden.

Offen sind der frische Wiederherstellungspunkt, die autorisierte Anwendung
von 003–007, die echte Anmeldeprüfung und der Eigentumsnachweis beider Konten
vor Freigabe der Verknüpfung. Produktion und Datenbank wurden nicht verändert.

## Zentrale Abmeldung – 12.11.2026

Der Worlds-Client 0.1.5 akzeptiert signierte Sitzungswiderrufe vom Hub.
Migration 007 speichert die Widerrufsgrenze. Bei verknüpften Konten prüft
IT-Worlds auch das ursprüngliche Ausstellungsdatum bisheriger Native-Sitzungen
und sperrt deren Projektzugriff bei einem Widerruf. Die Anwendung benötigt
dafür keinen direkten Zugriff auf die Anbietertabelle. Eine neue Worlds-Sitzung
und der Zugriff anderer Konten bleiben möglich.

129 lokale Tests bestanden, 10 optionale Laufzeittests übersprungen.
Astro-Check und Build bestanden. Migration 007 wurde lokal mit erzwungener
Zeilensicherheit und der eingeschränkten Worker-Rolle geprüft. Für die
Pilotabnahme sind Migration 007 und der öffentliche
`WORLDS_HUB_SESSION_EVENT_JWK` erforderlich. Produktionsaktivierung steht aus.

## Zentrale Anmeldelinks – 08.11.2026

Worlds-Modus: Anmeldeaktionen in Navigation und Kontoseite sind normale Links zu
`/auth/start`; lokale Zugangsdatenformulare bleiben ausgeblendet. Die öffentliche
Konfigurationsantwort wird einmal pro Seite geladen und gemeinsam verwendet.
Bestehende Sitzungs-/Fortschrittsauflösung bleibt erhalten; ohne aktivierten
Worlds-Modus bleibt die bisherige Anmeldung verwendbar. Bei unbekannter
Konfiguration zeigt die Kontoseite einen Fehler statt paralleler Zugangsdaten.
Hinweise auf ein nicht mehr sichtbares lokales Anmeldeformular wurden korrigiert.

Gemeinsamer Auth-Client 0.1.3 mit geprüftem Subtree und Dateiprüfsummen vendort.
Neue GET-Route bewahrt Rate-Limits, PKCE, erlaubte Rücksprünge und hostgebundene
Cookies; POST ohne Origin-/CSRF-Nachweis bleibt gesperrt. 128 Tests bestanden,
10 umgebungsbedingt übersprungen; Astro-Check 293 Dateien ohne Befund und Build
mit 534 Seiten erfolgreich. Chromium/WebKit in DE/EN bei 320/1280 px bestätigten
Links, ausgeblendete lokale Formulare, Legacy-Modus, Sprach-/Designwechsel,
Mobilmenü und beide 404-Varianten mit lokalen Testantworten.

Produktion read-only: 2 native Konten, beide ohne bestätigte E-Mail, eines mit
aktiver Sitzung, 17 Fortschrittszeilen. Keine produktive Mapping-Tabelle vorhanden;
keine Konten verschoben oder produktive Anmeldung umgestellt. GitHub-CI
`42515340829` für `321fe36` erfolgreich (Anwendung `e0202c5`). Der erste Lauf
beanstandete die neue dynamische Route im statischen Linkprüfer; ausschließlich
`/auth/start` als getestete Worker-Route ergänzt. Lokal 40.228 interne Links und
528 öffentliche SEO-Seiten geprüft, vollständige erneute CI erfolgreich.
Offene Abnahme:
echter Provider-/Eigentums-/Rollen-/Daten-/Rücknahmeablauf; eigene Cloudflare-
Pilotberechtigung fehlt weiterhin. Vorhandene Tokens anderer Projekte werden
nicht verwendet. Providerfehler als vollständige Dokumentansicht separat offen.

Stand: 01.11.2026. Arbeitsbranch: `codex/cloudstand-lokal`. Diese Datei beschreibt den aktuellen, verifizierten Stand; ältere Zwischenstände wurden aufgelöst und widersprüchliche Hinweise durch spätere Nachweise ersetzt.

## 1. Offene Aufgaben & geplante Features

### Worlds-Hub-SSO-Pilot (04.11.2026, separater Featurebranch)

Nachprüfung 07.11.2026. Der gemeinsame OIDC-Client ist auf Version 0.1.1
aktualisiert. Ein frischer zentraler Nachweis wird mit `max_age=300`
angefordert und im signierten ID-Token geprüft. Der reale Hub-QA-Anbieter
hat aktuelle und ältere Sitzungen mit positivem Zeitfenster bestätigt.
127 Tests bestanden, zehn umgebungsbedingt übersprungen. Astro-Check für
293 Dateien sowie Build mit 534 Seiten erfolgreich. Der vollständige
IT-Browserpilot bleibt Voraussetzung der Aktivierung.

Bereitstellungsstand 05.11.: atomare Rate-Budgets und begrenzter Ablauf-Cleanup auf isoliertem Neon-Zweig real geprüft. Separates Cloudflare-Pilotprofil mit deaktiviertem Flag, gesperrtem Legacy-Proxy und noindex im Trockenlauf erfolgreich. 127 Tests bestanden/10 übersprungen; Typprüfung und Build grün. Kein produktives Schema und kein Worker verändert. Cloudflare-Anmeldung muss erneuert werden; anschließend exakten Callback und echte Browser-SSO-Abnahme ausführen. Details in `docs/WORLDS-SSO-PILOT.md`.

Fortsetzung 05.11.: OIDC-Routen, eigener Postgres-Sessionstore, gemeinsame lokale Identitätsauflösung für Fortschritt/Trainer und DE/EN-Kontokarte implementiert. Featureflag standardmäßig aus. Migration 004 und tatsächlicher isolierter Session-/Mapping-/Kontosperren-Test bestanden; keine Produktionsmigration oder Aktivierung. Gemeinsame Quelle Worlds-Hub `80db3d7`. 135 Tests: 125 bestanden/10 umgebungsbedingt übersprungen; Typprüfung und Build erfolgreich. Lokale visuelle DE/EN-/Mobil-/Theme-/404-Abnahme mit simulierten Zuständen, kein echter Browser-SSO-Nachweis. Aktuelle Grenzen und nächster Schritt in `docs/WORLDS-SSO-PILOT.md`.

Isolierte Wiederherstellung aus der vorhandenen Sicherung durchgeführt. Additive Migration 003 ausschließlich auf `development-worlds-hub-sso-20261104` angewendet, echte eingeschränkte Runtime-Verbindung mit atomarer Zuordnung, RLS-/Issuer-/Session-Isolation und Transaktionsrollback erfolgreich geprüft. Produktion weiter ohne Mapping-Tabelle und mit identischer Prüfsumme ihrer 14 Fortschrittszeilen. Details, Branch-Ablaufzeit, Migrationsprüfsumme und Wiederanlauf in `docs/WORLDS-SSO-PILOT.md`.

Prüfungen: 123 Tests bestanden, 10 umgebungsbedingt übersprungen, Astro-Check ohne Fehler/Warnungen, 534 Seiten gebaut. Bestehender Audit-Befund: eine kritische/elf niedrige transitive Meldungen bei Better Auth und Abhängigkeiten; tatsächliche Plugin-Anwendbarkeit und kompatibles Update vor Aktivierung prüfen. Noch kein OIDC-Browserpilot und kein produktiver SSO-Cutover.

### P0 – kritisch

Keine bestätigten offenen P0-Probleme. Öffentliche Kernfunktionen, Auth-Grundpfade, Datenbankzugriff, RLS, 404-Verhalten, SEO-Ausgabe und statische Seitenerzeugung sind releasegeprüft.

### P1 – wichtig

| Status | Aufgabe | Abhängigkeit | Nächster Schritt |
| --- | --- | --- | --- |
| Extern blockiert | Unabhängiges fachliches und assistives Review. Eigene Quellen-, Compiler- und Browserprüfungen ersetzen diesen Nachweis nicht. | Fachkundige und assistive Prüfpersonen | Abläufe aus `docs/P1-PRUEFUNGEN.md` mit unabhängigen Personen durchführen, Befunde dokumentieren und beheben. |
| Extern blockiert | Erfolgreichen Passwort-Reset einschließlich tatsächlichem Mailempfang prüfen. Negative Token-, Mail-, Origin- und Unbekannt-Nutzer-Pfade sind bereits getestet. | Kontrolliertes Development-Postfach | Reset-Mail empfangen, Link verwenden und Wiederherstellung vollständig nachweisen. |
| Ergänzende Produktionsverifikation | Nach dem autorisierten Neuaufbau von Managed Auth sind Registrierung, Sitzung, Fortschritt, Ab-/Anmeldung und Wiederherstellung mit einem Wegwerfkonto geprüft. Eine isolierte Zwei-Konten-/RLS- sowie Schreibtrainer-Schreibprüfung im neuen Produktions-Authbestand fehlt noch. | Zwei wegwerfbare Testkonten; keine Besitzer- oder Fremddaten verändern | Kontoisolation, fremde IDs, Profil/Run/Opt-in und eigene Fortschritte gezielt prüfen; Testdaten anschließend nur nach sicherer Zuordnung bereinigen. |
| Nutzeraktion | Der frühere Eigentümeraccount wurde beim ausdrücklich autorisierten Auth-Neuaufbau ersetzt. | Eigentümer | Neu registrieren. Alte 13 Fortschrittszeilen nicht automatisch zuordnen oder löschen. |

### P2 – Erweiterungen

| Status | Aufgabe | Abhängigkeit | Nächster Schritt |
| --- | --- | --- | --- |
| Bestätigt offen | Lernwege, Suche, Filter, Fortschritt und Dokumentprüfung mit realen Lernenden beobachten. | Freiwillige Testpersonen | Kurze kontrollierte Lernendenstudie durchführen und konkrete UX-Befunde priorisieren. |
| Geplant, nicht zugesagt | Erweiterte statische Dokumentdiagnostik und gegebenenfalls PDF-Vorschau. | Nur browserlokal oder anderweitig sicher, kostenfrei und wartungsarm | Nutzen und Sicherheitsgrenzen prüfen; keinen eigenen öffentlichen Compilerdienst aufbauen. |
| Optional | Verwaiste Auth-/Fortschritts- und Wegwerftestdaten bereinigen. | Sichere Identifikation; ausdrückliche Freigabe | Erst Bestände aggregiert prüfen und Sicherungsbranch erhalten; keine automatische Kontenzuordnung. |
| Optional | Weitere Praxisprojekte, Medien und Visualisierungen. | Nachgewiesener Lernbedarf und geprüfte Quellen | Nur vollständige, getestete Pakete ergänzen; bestehende ausgereifte Bereiche nicht wiederholen. |

### P3 – optional

| Status | Aufgabe | Abhängigkeit |
| --- | --- | --- |
| Vermutete Verbesserung | Weitere Gamification, Duelle und Community-Funktionen | Erst nach Nutzungsfeedback sowie Datenschutz-/Moderationskonzept priorisieren. |
| Vermutete Verbesserung | CMS/Redaktionsworkflow | Repository-Pflege funktioniert; nur bei nachgewiesenem Redaktionsbedarf prüfen. |
| Vermutete Verbesserung | Weitere Sprachen und Community-Beiträge | Rechte, Reviewverfahren und dauerhafte Pflegekapazität klären. |
| Rechteinhaberentscheidung | Projektlizenz abschließend festlegen | Entscheidung des Rechteinhabers. |

## 2. Bereits implementiert

### Informationsarchitektur, Navigation und Barrierefreiheit

- Statische Astro-Website mit TypeScript, Deutsch/Englisch, Hell-/Dunkelmodus, responsiver Haupt- und Mobilnavigation, Suche, Themen-/Kurs-/Quiz-/Quellenfiltern, Breadcrumbs, 404-Seiten und SEO-Metadaten.
- „Textsatz & Dokumentenerstellung“ ist eine eigene Themenkategorie statt eines Hauptmenü-Reiters. Typst wird als Einstieg hervorgehoben; LaTeX und Typst bleiben übersichtlich getrennt. Alte DE/EN-Kurs- und Kapitel-URLs unter `/themen/programmiersprachen/{typst,latex}/` bleiben kompatibel; IDs und Lernfortschritte wurden nicht verändert.
- Globale Suche schließt bei Treffern den Dialog, setzt brauchbaren Zielfokus und durchsucht auch Aufgaben, Lösungen, Beschreibungen und Lernziele.
- Mobilmenü, Escape-/Fokusverhalten, reduzierte Ansichten, 390-px-Layout und beide Designs wurden wiederholt in DE/EN geprüft.

### Inhalte, Kurse und Lernpfade

- Aktueller veröffentlichter Ausbau umfasst 14 Themen, 22 Kurse, 169 Kapitel, 348 Quizfragen und 273 Quellen. Inhalte und Quellenverknüpfungen sind zweisprachig; bestehende IDs/URLs bleiben stabil.
- Java, C/C++, Go und Rust besitzen jeweils sechs vollständige DE/EN-Kapitel, zusammen 24 getestete Listings, 48 erklärte Fragen und 33 gelesene Primärquellen. Ziele: Java 21, C17/C++20, Go 1.27.3, Rust 1.99.1/Edition 2024. C und C++ werden getrennt erklärt.
- Hardware-Folge, Spieleentwicklung mit Godot/Unity/Unreal-Grundlagen, Linux/systemd-Benutzerlabor, KI, LaTeX/Typst und weitere Themen sind in die vorhandene Kursstruktur integriert.
- Vier geführte Lernpfade; der Hardware-/Systempfad „Vom Rechner zum sicheren Speicherzugriff“ verbindet 14 Kapitel aus Grundlagen, Hardware, C/C++ und Rust mit überprüfbarem CLI-/Zugriffsprotokoll.
- Glossar mit 15 zweisprachigen, quellengebundenen Begriffen, Kurs-/Projektverknüpfungen und kombinierbaren Filtern.

### Übungen und Praxisprojekte

- 203 Aufgaben/Projekte: 169 Kapitelaufgaben, 23 eigenständige Übungen, sieben Projekte und vier Ablaufaufgaben. Eindeutige Themen-/Kursgliederung, Textsuche sowie kombinierte Themen-, Kurs-, Stufen-, Typ- und Statusfilter mit URL-/Sprachzustand, Leerzustand, Reset, 18/36-Nachladen und Zielfokus.
- Direkte Verknüpfungen zu Kursen, Kapiteln, Quizzen und Lernpfaden. Lesen allein erledigt keine Aufgabe.
- Gerätegebundene Selbst-/Modellstände bleiben getrennt von Konto-Lese- und Quizdaten. Entwurfsänderung, Lösung laden, Reset und Undo invalidieren veraltete Modellergebnisse; bestehende Entwürfe bleiben erhalten. Speicherfehler werden sichtbar behandelt.
- Sieben Projekte mit wiederaufnehmbaren Checklisten. Vollständige Referenzprojekte: TypeScript-Webkatalog, PostgreSQL-Lernbericht, HTTP-Vertragsprüfer, Lernzeit-JSON, IPv4-Netzplan, eigene Registermaschine und SHA-256-Inventar. Getestete Referenzen, echte CLIs/Fehlerfälle und bytegeprüfte ZIPs; keine beliebige Browser-Codeausführung.
- Vier tastaturbedienbare Ablaufaufgaben mit Fehlpositionsfeedback und Lösungen sowie interaktiver CPU-Trace mit Neustart.
- Lokale JSON-Sicherung mit Vorschau/Bestätigung, 512-KiB-/500-Einträge-Limits, Versions-, Datums- und Kennungsprüfung sowie Erhalt neuerer Zustände. Importierte Abschlüsse bleiben Selbsteinschätzungen; keine externe Übertragung.

### Schreibtrainer, Rangliste und Lernfortschritt

- QWERTZ-Trainer unter `/schreibtrainer/` und `/en/schreibtrainer/` mit zwölf gestuften DE/EN-Lektionen, zusammenhängenden Sätzen, Absätzen und Alltagstexten, eigener lokaler Texteingabe, Fingerhinweisen, Textfortschritt, konkreten Fehlern, lokaler Historie, getrennten Bestwerten und adaptiven Übungen.
- Konto-Rangliste mit Live-Session, Same-Origin-Prüfung, serverseitiger Startzeit, Replay, Ergebnisberechnung, atomarer Einmalabgabe, Rate-Limits, pseudonymem Opt-in und UTC-Zeiträumen. RLS und feste öffentliche Projektion verhindern Fremdzugriff.
- Additive Migration `002_typing.sql`, Prüfsumme `480f256914ca3f553f2a0570d5cea40035d9988f06849effc002bcc87f7ab92f`, auf Development und nach bestandenem Audit auf Main angewendet. Eingeschränkte Runtime besitzt kein `BYPASSRLS`.
- Zwei echte Development-Konten prüften RLS, fremde IDs/Origin, konkurrierende Starts/Abgaben, 61-Sekunden-Replays, frühe/Burst-/wiederholte Abgaben, Ranglistenfilter, Opt-in/out und widerrufene Sitzungen. Behoben wurden State-Races, doppelte Starts, Namenskollisionen und fehlerhafte UUID-Behandlung.

### Dokumentprüfung und Textsatz

- Sichtbare Links zu Overleaf und typst.app; Bearbeitung erfolgt extern. IT-Worlds importiert begrenzte `.tex`-/`.typ`-Einzeldateien und sichere ZIP-Projekte lokal im Web Worker.
- Gemeinsame statische Analyse für LaTeX/Typst: Hauptdatei, Struktur, Positionen, Referenzen/Ressourcen, Marken/Literatur, doppelte Kennungen, Quellenansicht und verständlicher Bericht. Path Traversal, ZIP-Bombs und übermäßige Ressourcen werden begrenzt bzw. abgewiesen.
- 31 Aufgabenprofile mit Lernzielen, Musterlösungen, bewussten Selbstprüfrubriken und optionaler bestehender Kapitelmarkierung. JSON weist Selbstauskunft aus; Kompilierung wird nicht vorgetäuscht.
- Typst: 16 Kapitel/32 Fragen; LaTeX: 14 Kapitel/28 Fragen. Frühere IDs bleiben erhalten. Alte Typst-Editorentwürfe sind nur lesbar als Download verfügbar.
- Der experimentelle Compilercontainer/Worker-Proxy wurde nach erfolgreichen lokalen Sicherheits- und Beispieltests bewusst aus dem öffentlichen Produkt entfernt. Keine öffentliche Kompilierungsinfrastruktur, kein kostenpflichtiger Dienst; tatsächliche PDF-/Compilerkontrolle bleibt im externen Editor.

### Hardware, Spiele und technische Labore

- Interaktive Halbaddierer-, CPU-Schritt-/Bootfolge- und 2D-Kollisionsmodelle sind tastatur- und buttonbedienbar.
- Godot-4.5-Projekt wurde mit offiziell geprüftem Engine-Download importiert. Engine-Test deckt Bewegung, diagonale Geschwindigkeit, Wände/Area2D, fünf Punkte, Abschluss und fünf Neustarts ab; Resetfehler durch alte Physikkontakte wurde behoben. ZIP entspricht den Quellen.
- Reproduzierbares DE/EN-Linux/systemd-Benutzerlabor mit temporärer Unit, Exit 17, Result-/Journalnachweis und gezielter Bereinigung. Kein privilegierter Container erforderlich.

### Datenbank, Auth und Betrieb

- Neon-Projekt **IT-Worlds** (`lingering-morning-59761503`), Main `br-long-violet-ba34agj1`. Produktionsdatenbank wurde nach isoliertem Test und ausdrücklicher Freigabe regulär von `neondb` in exakt `IT-Worlds` umbenannt; Datenbank-ID 88355 blieb erhalten. Development `br-silent-glade-bamm5co5` bleibt bei `neondb`.
- Sicherungsbranch `before-production-db-rename-20261029` (`br-summer-sun-banaln05`, LSN `0/24C42C0`, ohne Compute) enthält den vorherigen Auth-/Fortschrittsbestand und muss erhalten bleiben.
- Managed Better Auth wurde für den neuen Datenbankpfad offiziell neu provisioniert; öffentliche vertrauenswürdige Origin wieder gesetzt. Drei alte Auth-Identitäten/Sitzungen wurden mit Freigabe ersetzt. 13 alte Fortschrittszeilen blieben unverändert, sind aber verwaist; kein automatisches Mapping und keine Bereinigung.
- Cloudflare-Secrets `DATABASE_URL` und `NEON_AUTH_BASE_URL` verwenden den neuen DB-/Auth-Pfad. Rolle, Passwort und Cookie-Secret blieben erhalten; `ASSETS`, `DATABASE_URL`, `NEON_AUTH_BASE_URL` und `NEON_AUTH_COOKIE_SECRET` sind vorhanden.
- Öffentlicher Wegwerfkonto-Test nach Neuaufbau: Registrierung, Sitzung, Fortschritt speichern, Abmelden, Anmelden, Wiederherstellen und eigene Testmarkierung zurücknehmen jeweils erfolgreich. Gastzugriffe auf private Fortschritt-/Trainerdaten liefern 401.
- Isolierter Prüfbranch `db-rename-safety-20261029` (`br-curly-shape-bakpwy1u`) belegt Rename, Auth-Neuaufbau und Registrierung. Seine Löschung bleibt ohne ausdrückliche branchgenaue Freigabe unzulässig.

## 3. Tests & Veröffentlichungen

### Aktueller öffentlicher Stand

- Live: https://it-worlds.maki26.workers.dev
- Letzter vollständiger Release am 30.10.2026 aus Quellstand `4cb1a0f` einschließlich CSS-Korrektur `78288de3dcf22a9ef9daa94b625501c83c81810e`.
- Aktive Cloudflare-Version `706415e9-38b0-4938-bc4e-d3de256e043c`, Deployment `951b5a20-df96-4f2f-acb0-c6d699a5ea3c`, 100 % Traffic.
- Build-, Artefakt-, SEO- und Linkprüfungen bestanden; alle 528 öffentlichen kanonischen DE/EN-Seiten stimmten exakt mit dem Releaseartefakt überein. Der frühere HTTP-500/10013-Uploadfehler trat nicht mehr auf; Ursache blieb unbekannt.
- Account, Subdomain, Einstellungen und vier Bindings blieben beim Release identisch. Smoke: Auth 200, Gastfortschritt 401, Gast-Trainerkonto 401, Rangliste 200, DE/EN-404 jeweils 404.
- Die CSS-Filtertoolbar ist als Raster mit zwei Spalten mobil und drei Desktop veröffentlicht; einzelne sichtbare Karten füllen ihre Gruppe. Lokal auf 390/1280 px ohne Überlauf geprüft. Keine zusätzliche öffentliche Browserprüfung dieses identischen CSS-Artefakts beim letzten Release.

### Aktuellste vollständige Prüfungen

- Funktionsstand: 133 Tests, 125 bestanden, acht optionale Laufzeit-Skips; alle fünf nativen Compilergruppen tatsächlich ausgeführt.
- Nach DB/Auth-Umstellung: 133 Tests, 123 bestanden, zehn optionale Laufzeit-Skips; keine Fehler. Abweichung entsteht durch optionale Laufzeitumgebung, nicht durch einen bekannten Produktfehler.
- Astro-Typprüfung: 274 Dateien ohne Fehler, Warnungen oder Hinweise. Produktions-Build: 534 Seiten. Kein separates Lint-Skript vorhanden.
- Release-Dry-Run: 528 kanonische Sprachseiten, 40.224 interne Ziele, 716 Artefaktdateien.
- Lokale Browserprüfung deckte Suche/Filter/Reload/Sprachwechsel, Aufgabenstatus, Modelle/Undo, Projektchecklisten, Ablaufaufgaben, CPU, ZIP-Downloads, JSON-Backupimport, Quiz, Mobilmenü, Escape, beide Designs und beide 404 ab. Testmarkierungen wurden zurückgesetzt; Nutzerstände blieben erhalten.

### Relevante Releases und Commits

- Übungen/Praxisprojekte: `5056acf91c2e0f88d808121579565df32ee42929`, Quality `40775678818`, Release vom 28.10. Version `2ed95a39-4a64-47ab-a7a5-35d8a02c5af4`, Deployment `58f53f10-5a02-456c-9ecd-bc6e2d4936a4`.
- Java/C/C++/Go/Rust und Struktur: `ec9db5c693967bf0a121be69588055ce44f377e4`, Quality `40647404074`, Release-Version `88f84534-212b-4c1e-96d0-c87aeca1d4b5`.
- Praxisprojekte/Trainer/Glossar: `059ac2a5d7c087416e22c316cb75b8132f07a7e8`, Version `87c9d6fa-9ff0-49df-8a0a-4ed9fa85ac9b`.
- Textsatz-Themenkategorie: `41ed34b`, Quality `40336730526`, Version `3383c337-abf5-4ffb-82e1-1ea513a92792`.
- Ranking/Godot/systemd: `9ccd793`, Quality `40237691162`, Version `7f5d4d27-b4c3-4353-ac77-8161225c44a3`.
- Schlanke Dokumentprüfung: `4b902cd`, Quality `40179580624`, Version `677144d2-3d90-413b-bc98-35b955122f8e`.
- Datenbank-/Auth-Dokumentation: `625c1bb`, `e84b1f7`, `0a47e01`, `4cb1a0f`; Abschluss-/Release-Dokumentation `cb268ca`.

### Bekannte Grenzen der Nachweise

- Kein unabhängiges Fach-/Accessibility-Review und keine reale Lernendenstudie.
- Kein erfolgreicher echter Reset-Mail-Empfang mangels kontrolliertem Postfach.
- Keine öffentliche Serverkompilierung für LaTeX/Typst; statische Analyse behauptet keine vollständige Syntax- oder Kompilierungsvalidierung.
- Die letzte CSS-Veröffentlichung wurde bytegenau geprüft, aber nicht nochmals als vollständiger öffentlicher Browserdurchgang wiederholt.
- Die Automatisierung `cloudflare-deployment-pr-fen` bestand zuletzt weiter, weil ihre Löschung ohne ausdrückliche Nutzerfreigabe abgelehnt wurde. Ohne ausstehende Änderungen darf sie keinen erneuten Deploy auslösen.

## 4. Historie & Hinweise

### Verbindliche technische Entscheidungen

- Eigenen Projektcode, Astro-Konfiguration, Tests und Skripte ausschließlich in streng typisiertem TypeScript pflegen. Generiertes Browser-JavaScript und Abhängigkeiten nicht manuell umschreiben. Python-, SQL- und LaTeX-Beispiele behalten ihre Sprache.
- Inhalte und Aussagen benötigen tatsächlich gelesene Quellen mit Herausgeber, Version, Abschnitt, URL und Lesedatum. Quellenabgleich ist kein unabhängiges Fachreview. Jede Quizantwort besitzt eine Erklärung.
- Bestehende URLs, Kurs-/Kapitel-/Aufgaben-/Frage-IDs, Nutzerdaten und Lernfortschritte erhalten. Schemaänderungen zuerst auf Development testen und als prüfsummengebundene Migration ausrollen.
- Frontend niemals mit Owner-/`BYPASSRLS`-Rolle verbinden. Auth über Neon Managed Better Auth und Same-Origin-Worker; RLS bleibt erzwungen.
- Dokumentbearbeitung erfolgt extern in Overleaf bzw. typst.app. Keine eigene Editor-, OAuth- oder öffentliche Compilerinfrastruktur aufbauen, solange die schlanke lokale Analyse den Lernzweck erfüllt.
- Cloudflare-Worker `it-worlds` verwendet `dist/` als statische Assets, HTML-Verzeichnisrouten und eigene 404-Seiten. Vor Deploy Build/Checks ausführen und bestehende Bindings/Einstellungen vor und nachher vergleichen.

### Abgelöste Zwischenstände

- Hinweise „CSS noch nicht veröffentlicht“ und „Cloudflare HTTP 500/10013 blockiert den Release“ sind seit dem erfolgreichen Release vom 30.10. erledigt.
- Der isolierte DB-Vorversuch mit Produktion bei `neondb` ist historisch. Produktion heißt jetzt `IT-Worlds`; der spätere autorisierte Auth-Neuaufbau ersetzt die frühere Entscheidung, auf eine Umbenennung zu verzichten.
- Frühere Hinweise auf ungeprüftes Ranking, Godot-Projekt, systemd-Labor, zusammenhängende Schreibtrainertexte, Bewertungsrubriken oder fehlende größere Praxisprojekte sind durch spätere Tests und Releases erledigt.
- Der private Compilercontainer/Proxy war ein Sicherheitsprototyp und wurde bewusst entfernt. Das ist keine unvollständige Produktfunktion.
- Historische niedrigere Inhalts-/Seiten-/Testzählungen dokumentieren frühere Releases und sind keine aktuellen Sollwerte.

### Private Nachweise und Rückfallinformationen

- Kanonische private Produktionskonfiguration: `work/runtime-main.json`; Vor-Rename-Sicherung: `work/runtime-main-before-rename.json`. Keine geheimen Werte ausgeben oder in Git übernehmen.
- Cloudflare-Releaseprotokoll: `/private/tmp/it-worlds-daily-20261030-release.log`; Einstellungsnachweise: `work/cloudflare-daily-20261030-before.json` und `work/cloudflare-daily-20261030-after.json`.
- Verifizierte Node-22-Laufzeit für Releases: `/private/tmp/it-worlds-node22-official/node-v22.22.0-darwin-arm64/bin/node`; `NODE_OPTIONS=--dns-result-order=ipv4first`. Releasehelper `scripts/release.ts` baut isoliert, deployt Assets und prüft alle öffentlichen Seiten.
- Sicherungsbranch `br-summer-sun-banaln05` nicht löschen. Prüfbranch `br-curly-shape-bakpwy1u` nur nach ausdrücklicher branchgenauer Freigabe entfernen.

### Nächste Fortsetzung

Zuerst die ergänzende Zwei-Konten-/RLS-/Trainerprüfung im neuen Produktions-Authbestand sicher abschließen und den Befund hier dokumentieren. Danach sind die beiden extern blockierten P1-Nachweise – unabhängiges Fach-/assistives Review und echter Reset-Mail-Empfang – die wichtigsten offenen Punkte. Ohne verfügbare externe Voraussetzungen mit der Lernendenstudie oder einem klar begrenzten, vollständigen P2-Inhaltspaket fortfahren; abgeschlossene technische Pakete nicht erneut implementieren.
