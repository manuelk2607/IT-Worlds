import {neon} from '@neondatabase/serverless';
import type {Env} from './index.ts';

const WINDOW=600_000;
const limits={login:{peer:12,global:60},callback:{peer:24,global:120},backchannel:{peer:30,global:120}} as const;
export type AuthAttempt=keyof typeof limits;
const tables=['worlds_auth_transactions','worlds_auth_sessions','worlds_auth_replays','worlds_auth_rate_buckets'] as const;
// Six complete windows generate at most 1,800 peer rows + 18 global rows.
export const CLEANUP_BATCH=2000;

export async function takeAuthAttempt(request:Request,env:Env,purpose:AuthAttempt,now=Date.now()){
 const key=env.NEON_AUTH_COOKIE_SECRET;
 if(!key)throw new Error('Missing rate-limit key');
 const expiry=(Math.floor(now/WINDOW)+1)*WINDOW;
 const ip=request.headers.get('CF-Connecting-IP')?.toLowerCase()??'';
 // Cloudflare supplies this address. Missing/malformed addresses share a bucket;
 // never trust browser-controlled forwarding headers.
 const peer=/^[0-9a-f:.]{3,45}$/.test(ip)?ip:'unknown';
 const bytes=new TextEncoder();
 const hmac=await crypto.subtle.importKey('raw',bytes.encode(key),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const signature=await crypto.subtle.sign('HMAC',hmac,bytes.encode(`worlds-auth-rate:v1:${purpose}:${expiry}:${peer}`));
 const digest=Array.from(new Uint8Array(signature),byte=>byte.toString(16).padStart(2,'0')).join('');
 const sql=neon(env.DATABASE_URL);
 const [{allowed}]=await sql`SELECT public.worlds_take_auth_attempt(
  ${`global:${purpose}:${expiry}`},${`peer:${digest}`},${expiry},${limits[purpose].global},${limits[purpose].peer}
 ) AS allowed`;
 return {allowed:allowed===true,retryAfter:Math.max(1,Math.ceil((expiry-now)/1000))};
}

export async function cleanupWorldsAuth(env:Env,now=Date.now()){
 if(env.WORLDS_AUTH_ENABLED!=='true')return 0;
 const sql=neon(env.DATABASE_URL);
 // Static identifiers, parameterized cutoff/limit, no active rows and no user data
 // returned. At most one bounded batch per table for each scheduled invocation.
 const results=await sql.transaction(tables.map(table=>sql.query(
  `WITH removed AS (
    DELETE FROM public.${table} WHERE expires <= $1 AND id IN (
      SELECT id FROM public.${table} WHERE expires <= $1 ORDER BY expires,id LIMIT $2
    ) RETURNING 1
  ) SELECT count(*)::int AS removed FROM removed`,[now,CLEANUP_BATCH])));
 return results.reduce((sum,rows)=>sum+Number(rows[0]?.removed??0),0);
}
