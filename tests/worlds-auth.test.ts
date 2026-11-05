import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker,{type Env} from '../worker/index.ts';
import {worldsConfig,resolveIdentity,worldsRoute} from '../worker/worlds-auth.ts';
const env:Env={ASSETS:{fetch:async()=>new Response('asset')},DATABASE_URL:'postgres://app:example@db.test/app',NEON_AUTH_BASE_URL:'https://legacy.test/auth',NEON_AUTH_COOKIE_SECRET:'test-only'};
test('Worlds pilot is disabled without explicit configuration and never changes legacy identity',async()=>{
 assert.equal(worldsConfig(env),null);
 assert.deepEqual(await (await worldsRoute(new Request('https://app.test/api/worlds/status'),env))!.json(),{enabled:false});
 assert.equal((await worker.fetch(new Request('https://app.test/auth/login',{method:'POST'}),env)).status,404);
 const dates={createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
 const result=await resolveIdentity(new Request('https://app.test/api/session'),env,async()=>Response.json({user:{id:'historical-id',name:'Existing name',email:'existing@example.test',...dates},session:{id:'legacy-session',expiresAt:new Date(Date.now()+60_000).toISOString(),...dates}}));
 assert.ok(!(result instanceof Response));assert.equal(result.user.id,'historical-id');assert.equal(result.source,'legacy');
});
test('enabled pilot rejects incomplete config, noncanonical origin and anonymous access',async()=>{
 assert.throws(()=>worldsConfig({...env,WORLDS_AUTH_ENABLED:'true'}));
 assert.throws(()=>worldsConfig({...env,WORLDS_AUTH_ENABLED:'true',WORLDS_ORIGIN:'http://app.test',WORLDS_ISSUER:'https://identity.test',WORLDS_CLIENT_ID:'test'}));
 const config={...env,WORLDS_AUTH_ENABLED:'true',WORLDS_ORIGIN:'https://app.test',WORLDS_ISSUER:'https://identity.test',WORLDS_CLIENT_ID:'test'};
 assert.equal((await worldsRoute(new Request('https://evil.test/auth/login',{method:'POST'}),config))!.status,403);
 assert.equal((await worldsRoute(new Request('https://app.test/auth/login',{method:'POST',headers:{origin:'https://evil.test'}}),config))!.status,403);
 assert.equal((await worldsRoute(new Request('https://app.test/auth/callback?code=unbound'),config))!.status,400);
 assert.equal((await worldsRoute(new Request('https://app.test/auth/backchannel-logout'),config))!.status,405);
 const anonymous=await resolveIdentity(new Request('https://app.test/api/session'),env,async()=>Response.json({user:null,session:null}));
 assert.ok(anonymous instanceof Response);assert.equal(anonymous.status,401);
});
