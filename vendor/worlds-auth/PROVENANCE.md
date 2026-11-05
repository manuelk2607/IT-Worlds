# Gemeinsames Worlds-Auth-Modul

Unveränderte Quelldateien aus `manuelk2607/Worlds-Hub`, Commit `80db3d7`, Verzeichnis `packages/auth` (oidc.ts, store.ts, linking.ts, postgres-links.ts, postgres-store.ts, package.json). Lokal als `file:vendor/worlds-auth` eingebunden, damit private Repository-Zugangsdaten weder beim Build noch zur Laufzeit benötigt werden. Updates immer aus derselben zentralen Quelle übernehmen und prüfen, keine parallele Auth-Implementierung pflegen.

Browsercode importiert dieses serverseitige Paket nicht. Jede App verwendet eigene Datenbank, Client-ID und hostgebundene opaque Sitzung. Keine zentralen Rollen oder E-Mail-Mappings.
