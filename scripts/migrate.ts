import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { neon } from '@neondatabase/serverless';

const connection = process.env.DATABASE_URL_UNPOOLED;
if (!connection || new URL(connection).hostname.includes('-pooler')) throw new Error('Use DATABASE_URL_UNPOOLED for migrations.');
const sql = neon(connection);
await sql`CREATE TABLE IF NOT EXISTS public.schema_migrations (name text PRIMARY KEY, sha256 text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())`;
const directory = new URL('../migrations/', import.meta.url);
for (const name of (await readdir(directory)).filter(name => name.endsWith('.sql')).sort()) {
  const source = await readFile(new URL(name, directory), 'utf8');
  const sha256 = createHash('sha256').update(source).digest('hex');
  const applied = await sql`SELECT sha256 FROM public.schema_migrations WHERE name = ${name}`;
  if (applied.length) {
    if (applied[0].sha256 !== sha256) throw new Error(`Applied migration changed: ${name}`);
    continue;
  }
  await sql.transaction([
    ...source.split('-- statement').map(statement => sql.query(statement)),
    sql`INSERT INTO public.schema_migrations (name, sha256) VALUES (${name}, ${sha256})`,
  ]);
  console.log(`Applied ${name}`);
}
