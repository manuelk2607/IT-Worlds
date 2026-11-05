import {neon} from '@neondatabase/serverless';
import type {CentralProof,LegacyProof} from '@worlds-hub/auth/linking';
import {PostgresLinkStore} from '@worlds-hub/auth/postgres-links';

/**
 * Server-side adapter for already verified proofs. HTTP handlers must obtain
 * both proofs from their authentication services, never from request data.
 */
export function worldsLinkStore(databaseUrl:string,central:CentralProof,legacy:LegacyProof) {
 const sql=neon(databaseUrl);
 return new PostgresLinkStore(async(text,parameters)=>{
  // Scope every statement independently, including retries. If the central
  // session has expired or been revoked, empty settings fail the RLS policies.
  const [,rows]=await sql.transaction([
   sql`WITH permission AS (
     SELECT public.worlds_account_active(${legacy.accountId}::uuid)
       AND EXISTS (
        SELECT 1 FROM public.worlds_auth_sessions
        WHERE id=${central.sessionId} AND issuer=${central.issuer} AND subject=${central.subject}
          AND payload->>'authenticatedAt'=${String(central.authenticatedAt)}
          AND expires>extract(epoch FROM clock_timestamp())*1000
       ) AS allowed
    )
    SELECT set_config('app.user_id',CASE WHEN allowed THEN ${legacy.accountId} ELSE '' END,true),
      set_config('app.worlds_issuer',CASE WHEN allowed THEN ${central.issuer} ELSE '' END,true),
      set_config('app.worlds_subject',CASE WHEN allowed THEN ${central.subject} ELSE '' END,true),
      set_config('app.worlds_session',CASE WHEN allowed THEN ${central.sessionId} ELSE '' END,true)
    FROM permission`,
   sql.query(text,parameters),
  ]);
  return rows;
 });
}
