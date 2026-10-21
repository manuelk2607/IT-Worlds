import { readFile, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { neon } from '@neondatabase/serverless';

// Run once per branch with owner credentials. Only the restricted output belongs in Worker secrets.
const { DATABASE_URL, DATABASE_URL_UNPOOLED, NEON_AUTH_BASE_URL, IT_WORLDS_SECRETS_FILE } = process.env;
if (!DATABASE_URL || !DATABASE_URL_UNPOOLED || !NEON_AUTH_BASE_URL || !IT_WORLDS_SECRETS_FILE) {
  throw new Error('Set database URLs, NEON_AUTH_BASE_URL and an ignored IT_WORLDS_SECRETS_FILE.');
}
if (new URL(DATABASE_URL_UNPOOLED).hostname.includes('-pooler')) throw new Error('Owner migration URL must be unpooled.');
interface RuntimeSecrets { DATABASE_URL: string; NEON_AUTH_BASE_URL: string; NEON_AUTH_COOKIE_SECRET: string }
const previous: RuntimeSecrets | null = await readFile(IT_WORLDS_SECRETS_FILE, 'utf8').then(JSON.parse).catch((error: NodeJS.ErrnoException) => {
  if (error.code === 'ENOENT') return null;
  throw error;
});
const sql = neon(DATABASE_URL_UNPOOLED);
const roles = await sql`SELECT rolsuper, rolcreatedb, rolcreaterole, rolinherit, rolbypassrls FROM pg_roles WHERE rolname = 'it_worlds_app'`;
if (roles.length && !previous) throw new Error('Role exists: recover its runtime secrets instead of replacing credentials.');
if (roles.some(role => role.rolsuper || role.rolcreatedb || role.rolcreaterole || role.rolinherit || role.rolbypassrls)) throw new Error('Existing application role has unexpected privileges.');
const password = previous ? new URL(previous.DATABASE_URL).password : randomBytes(32).toString('hex');
if (!/^[a-f0-9]{64}$/.test(password)) throw new Error('Unexpected application password format.');
if (!roles.length) await sql.query(`CREATE ROLE it_worlds_app WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS PASSWORD '${password}'`);
const application = new URL(DATABASE_URL);
application.username = 'it_worlds_app';
application.password = password;
if (previous && (previous.DATABASE_URL !== application.toString() || previous.NEON_AUTH_BASE_URL !== NEON_AUTH_BASE_URL)) throw new Error('Runtime file belongs to a different branch.');
const runtime: RuntimeSecrets = {
  DATABASE_URL: application.toString(), NEON_AUTH_BASE_URL,
  NEON_AUTH_COOKIE_SECRET: previous?.NEON_AUTH_COOKIE_SECRET ?? randomBytes(48).toString('base64url'),
};
await neon(runtime.DATABASE_URL)`SELECT 1`;
if (!previous) await writeFile(IT_WORLDS_SECRETS_FILE, JSON.stringify(runtime), { mode: 0o600, flag: 'wx' });
console.log('Restricted runtime role verified; secrets remain in the specified local file.');
