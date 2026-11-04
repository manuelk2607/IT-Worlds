# Isolierter Worlds-Hub-SSO-Pilot

Stand 2026-11-04. Kein produktiver Auth-Cutover; bestehende Anmeldung bleibt aktiv.

## Wiederherstellung und Migration

- Git-Basis `codex/cloudstand-lokal` / `2d6d204`, Featurebranch `feature/worlds-hub-sso-pilot`.
- Neon-Projekt `lingering-morning-59761503`, Datenbank `IT-Worlds`.
- Sicherung `br-calm-hill-bagafc1b`, Produktions-LSN `0/279A488`.
- Daraus wiederhergestellter Development-Zweig `br-little-base-baqt6cy6`, Name `development-worlds-hub-sso-20261104`, Endpoint `ep-falling-fog-bad7v2ou`, Status ready. Ablaufzeit `2026-11-05T23:00:00Z`, 0.25 CU, vorhandener Suspend-Standard, Free-Organisation bestätigt.
- Vorher/nachher: Produktion und Wiederherstellung jeweils 14 Fortschrittszeilen, aggregierte Prüfsumme `493a65672dba70fa8a09f4e431604285`; beide Schreibtrainertabellen leer. Keine persönlichen Datensätze ausgegeben. Bestehende drei Fortschrittstabellen behalten ENABLE/FORCE RLS.
- Migration `003_worlds_identity_links.sql` über den vorhandenen prüfsummengebundenen Runner nur im Testzweig angewendet. SHA-256 `a99dca606c5b977c81e0ffca822b7897ada0d533f51eea1f21f0065bf7671173`. Produktion hat weiterhin keine Mapping-Tabelle.

Neue Links/Proofs referenzieren die tatsächlich vorhandene UUID in `neon_auth.user`; Audit behält historische UUIDs. Bestehende verwaiste Fortschritts-IDs werden weder beansprucht noch umgeschrieben. Kein Matching nach E-Mail. Neue RLS-Regeln benötigen serverseitig validierte `app.worlds_issuer`, `app.worlds_subject`, bei Proofs zusätzlich `app.worlds_session` und die frisch nachgewiesene lokale `app.user_id`. Immer transaktionslokal setzen, niemals aus Request-Bodys übernehmen. Runtime darf Links nicht aktualisieren/löschen und Audit nicht ändern. Unlinking benötigt einen eigenen geprüften Pfad.

## Tatsächliche Prüfung

`tests/live-sso-schema.ts` verlangt die exakte isolierte Branch-/Endpoint-Kombination sowie getrennte Owner- und `it_worlds_app`-Verbindungen. Owner legt nur zwei zufällige synthetische Konten und Testfortschritt an. Prüfung läuft als echte Runtime-Rolle ohne Superuser/BYPASSRLS. Mapping-/Proof-/Auditänderungen rollen in einer Subtransaktion zurück; finally entfernt ausschließlich die erzeugten Testkonten und deren Fortschritt. Verbindungswerte wurden direkt aus der vorhandenen Neon-CLI nur im Prozessspeicher übergeben.

Bestanden: atomare Zuordnung mit Audit und Proof-Verbrauch, historische UUID, unveränderte Rolle, andere Session, anderer Issuer, anderes Konto, anonymer Zugriff, gesperrtes Überschreiben, Unique-Konflikt mit Proof-Rollback, Fixture-Rollback. Nachher erneut dieselbe Prüfsumme und 14 bestehende Fortschrittszeilen. Das belegt Datenbankverhalten, keinen abgeschlossenen Browser-SSO oder echte konkurrierende Bestätigungen über zwei Verbindungen.

Regulär: 133 Tests, 123 bestanden/10 wegen fehlender separater Compiler-/Docker-/SQL-Umgebung übersprungen; `npm run check` 275 Dateien ohne Fehler/Warnungen; Build 534 Seiten. Keine sichtbare UI geändert.

## Sicherheitsbefund und nächste Schritte

Bestehender Lockfile: `better-auth@1.7.6`; Audit eine kritische und elf niedrige transitive Meldungen. Primärquellen am 2026-11-04 gelesen:
- https://github.com/advisories/GHSA-965c-763c-88jm (Magic Link + Social/Generic OAuth + entsprechende State-/Identifier-Speicherung)
- https://github.com/advisories/GHSA-r4xp-prcw-77qf (OAuth-Proxy-Plugin + ungeeigneter Secret + Cookie-State + implizites Linking)

IT-Worlds betreibt keinen eigenen Better-Auth-Server mit diesen Plugins, sondern einen allowlist-beschränkten Managed-Auth-Proxy. Der Paketbefund allein beweist keinen ausnutzbaren Produktionspfad. Kompatibles SDK-/Paketupdate und Managed-Konfiguration vor SSO-Aktivierung prüfen; kein ungetesteter Force-Upgrade.

Nächster Schritt: OIDC-/Session-Adapter hinter Featureflag, lokale ID nur aus validierter zentraler Sitzung plus Mapping, bisheriges Neon-Login parallel. Frischen signierten `auth_time`, zwei unabhängige Konten/Verbindungen und Browserablauf wirklich prüfen. Erst danach produktive Migration/Clientaktivierung. Die Datenwiederherstellung ersetzt keine vollständige Deployment-/Featureflag-Rollbackabnahme.
