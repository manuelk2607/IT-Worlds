import assert from 'node:assert/strict';
import {test} from 'node:test';
import pilot,{PILOT_ORIGIN} from '../worker/sso-pilot.ts';
const host='ep-isolated-example.c-8.eu-central-1.aws.neon.tech';
const env={ASSETS:{fetch:async()=>new Response('fixture')},DATABASE_URL:`postgresql://it_worlds_app:test@${host}/it`,
 NEON_AUTH_BASE_URL:'https://not-to-be-called.test',NEON_AUTH_COOKIE_SECRET:'test-only',
 WORLDS_ORIGIN:PILOT_ORIGIN,WORLDS_PILOT_DATABASE_HOST:host};
test('pilot rejects mismatched or privileged databases and other hosts',async()=>{
 const request=new Request(PILOT_ORIGIN+'/konto/');
 assert.equal((await pilot.fetch(request,{...env,DATABASE_URL:env.DATABASE_URL.replace(host,'production.test')})).status,503);
 assert.equal((await pilot.fetch(request,{...env,DATABASE_URL:env.DATABASE_URL.replace('it_worlds_app','neondb_owner')})).status,503);
 assert.equal((await pilot.fetch(new Request('https://it-worlds.maki26.workers.dev/konto/'),env)).status,503);
});
test('pilot response is private and legacy provider is unreachable even if configured',async()=>{
 const get=(path:string)=>pilot.fetch(new Request(PILOT_ORIGIN+path),env);
 const page=await get('/konto/');assert.equal(await page.text(),'fixture');
 assert.equal(page.headers.get('x-robots-tag'),'noindex, nofollow');assert.equal(page.headers.get('cache-control'),'no-store');
 assert.equal((await get('/api/auth/get-session')).status,404);
 assert.equal((await get('/api/session')).status,401);
 assert.equal((await get('/sitemap.xml')).status,404);
 assert.deepEqual(await (await get('/api/worlds/status')).json(),{enabled:false});
});
