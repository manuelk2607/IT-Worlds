import { redirectToHttps } from '../src/lib/transport.ts';
import {typingRequest} from './typing.ts';
import { handleAuthProxyRequest, parseSessionData } from '@neondatabase/auth/server';
import { neon } from '@neondatabase/serverless';
import { isCorrectAnswer, parseProgressChange, type ProgressItem } from '../src/lib/progress.ts';

export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DATABASE_URL: string;
  NEON_AUTH_BASE_URL: string;
  NEON_AUTH_COOKIE_SECRET: string;
}
const authMethods: Record<string, string> = {
  'get-session': 'GET',
  'sign-up/email': 'POST',
  'sign-in/email': 'POST',
  'sign-out': 'POST',
  'request-password-reset': 'POST',
  'reset-password': 'POST',
};
function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
export function isSameOriginMutation(request: Request) {
  return request.headers.get('origin') === new URL(request.url).origin && request.headers.get('sec-fetch-site') !== 'cross-site';
}
async function authRequest(request: Request, env: Env, path: string) {
  const response = await handleAuthProxyRequest({
    request, path, baseUrl: env.NEON_AUTH_BASE_URL,
    cookieSecret: env.NEON_AUTH_COOKIE_SECRET, sameSite: 'lax',
  });
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Content-Type-Options', 'nosniff');
  return new Response(response.body, { status: response.status, headers });
}
async function getProgress(request: Request, env: Env) {
  // Revalidate with Neon for every data request; never trust a browser-supplied user ID or cached session alone.
  const sessionUrl = new URL('/api/auth/get-session?disableCookieCache=true', request.url);
  const response = await authRequest(new Request(sessionUrl, { headers: request.headers }), env, 'get-session');
  if (!response.ok) return json({ error: 'AUTH_UNAVAILABLE' }, 503);
  const session = parseSessionData(await response.json());
  if (!session.user || !session.session) return json({ error: 'UNAUTHENTICATED' }, 401);
  const sql = neon(env.DATABASE_URL);
  const userId = session.user.id;
  const sessionCookies = response.headers.getSetCookie();
  const mapRows = (rows: Record<string, unknown>[]): ProgressItem[] => rows.map(row => ({
    kind: row.kind as ProgressItem['kind'], contentId: String(row.content_id),
    completed: row.completed === true, solved: row.solved === true, updatedAt: String(row.updated_at),
  }));
  if (request.method === 'GET') {
    const [, rows] = await sql.transaction([
      sql`SELECT set_config('app.user_id', ${userId}, true)`,
      sql`SELECT kind, content_id, completed, solved, updated_at FROM public.learning_progress WHERE user_id = ${userId} ORDER BY updated_at DESC`,
    ]);
    const result = json({ items: mapRows(rows) });
    sessionCookies.forEach(cookie => result.headers.append('Set-Cookie', cookie));
    return result;
  }
  const change = parseProgressChange(await request.json().catch(() => null));
  if (!change) return json({ error: 'INVALID_PROGRESS' }, 400);
  const [, rows] = await sql.transaction([
    sql`SELECT set_config('app.user_id', ${userId}, true)`,
    sql`INSERT INTO public.learning_progress (user_id, kind, content_id, completed, solved)
      VALUES (${userId}, ${change.kind}, ${change.contentId}, ${change.completed}, ${isCorrectAnswer(change)})
      ON CONFLICT (user_id, kind, content_id) DO UPDATE
      SET completed = EXCLUDED.completed,
          solved = EXCLUDED.completed AND (learning_progress.solved OR EXCLUDED.solved),
          updated_at = now()
      RETURNING kind, content_id, completed, solved, updated_at`,
  ]);
  const result = json({ item: mapRows(rows)[0] });
  sessionCookies.forEach(cookie => result.headers.append('Set-Cookie', cookie));
  return result;
}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const redirect = redirectToHttps(request);
    if (redirect) return redirect;
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) {
      const response = await env.ASSETS.fetch(request);
      if (response.status === 404 && url.pathname.startsWith('/en/')) {
        const translated = await env.ASSETS.fetch(new Request(new URL('/en/404/', url), request));
        return new Response(translated.body, { status: 404, headers: translated.headers });
      }
      return response;
    }
    if (!['GET', 'POST'].includes(request.method)) return json({ error: 'METHOD_NOT_ALLOWED' }, 405);
    if (request.method !== 'GET' && !isSameOriginMutation(request)) return json({ error: 'INVALID_ORIGIN' }, 403);
    if (request.method === 'POST' && !request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'JSON_REQUIRED' }, 415);
    if (Number(request.headers.get('content-length') ?? 0) > 8192) return json({ error: 'REQUEST_TOO_LARGE' }, 413);
    if(request.method==='POST') {
      const reader=request.body?.getReader();
      const chunks: Uint8Array[]=[];let bytes=0;
      if(reader)for(;;){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>8192){await reader.cancel();return json({error:'REQUEST_TOO_LARGE'},413);}chunks.push(value);}
      const body=new Uint8Array(bytes);let offset=0;for(const chunk of chunks){body.set(chunk,offset);offset+=chunk.byteLength;}
      request=new Request(request,{body});
    }
    if (!env.NEON_AUTH_BASE_URL || !env.NEON_AUTH_COOKIE_SECRET || !env.DATABASE_URL) return json({ error: 'SERVICE_UNAVAILABLE' }, 503);
    try {
      if(url.pathname.startsWith('/api/typing/'))return await typingRequest(request,env,()=>authRequest(new Request(new URL('/api/auth/get-session?disableCookieCache=true',request.url),{headers:request.headers}),env,'get-session'));
      if (url.pathname === '/api/progress') return await getProgress(request, env);
      if (url.pathname.startsWith('/api/auth/')) {
        const path = url.pathname.slice('/api/auth/'.length);
        if (authMethods[path] !== request.method) return json({ error: 'NOT_FOUND' }, 404);
        return await authRequest(request, env, path);
      }
      return json({ error: 'NOT_FOUND' }, 404);
    } catch {
      // Never log credentials, auth payloads, cookies, email addresses or database errors.
      return json({ error: 'SERVICE_UNAVAILABLE' }, 503);
    }
  },
};
