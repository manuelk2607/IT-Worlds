import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker,{type Env} from '../worker/index.ts';
import {worldsConfig,resolveIdentity,worldsRoute} from '../worker/worlds-auth.ts';
import {sessionEventContentType,sessionRevocationPath,signSessionRevocation} from '@worlds-hub/auth/session-revocation';
const env:Env={ASSETS:{fetch:async()=>new Response('asset')},DATABASE_URL:'postgres://app:example@db.test/app',NEON_AUTH_BASE_URL:'https://legacy.test/auth',NEON_AUTH_COOKIE_SECRET:'test-only'};
test('central sign-out checks the signature and fences linked native sessions by their original creation time',async t=>{
 const origin='https://app.test',issuer='https://identity.test',audience=origin+sessionRevocationPath;
 const pair=await crypto.subtle.generateKey('Ed25519',true,['sign','verify']);
 const {kty,crv,x}=await crypto.subtle.exportKey('jwk',pair.publicKey);
 const kid='fixture',subject='opaque-test-subject',id='9988225e-4a4a-42a0-96b7-170c292ca598',other='ad0ea58a-751c-4fb4-a32a-20799ab35a94';
 const config={...env,WORLDS_AUTH_ENABLED:'true',WORLDS_ORIGIN:origin,WORLDS_ISSUER:issuer,WORLDS_CLIENT_ID:'test',
  WORLDS_HUB_SESSION_EVENT_JWK:JSON.stringify({kid,kty,crv,x})};
 const now=Date.now(),cutoff=Math.floor(now/1000)*1000-1000;
 let stored=0,writes=0;
 t.mock.method(globalThis,'fetch',async(input:string|URL|Request,init?:RequestInit)=>{
  assert.equal(new URL(input instanceof Request?input.url:String(input)).hostname,'api.test');
  const {query,params}=JSON.parse(String(init?.body)) as {query:string;params:string[]};
  if(query.includes('INSERT INTO public.worlds_session_revocations')||query.includes('INSERT INTO worlds_session_revocations')){
   assert.deepEqual(params.slice(0,3),[issuer,subject,String(cutoff)]);writes++;stored=Math.max(stored,Number(params[2]));
   return Response.json({fields:[],rows:[],rowCount:0});
  }
  assert.match(query,/worlds_native_session_allowed/);assert.equal(params[1],issuer);
  const allowed=params[0]!==id||Number(params[2])>stored;
  return Response.json({fields:[{name:'allowed',dataTypeID:16}],rows:[[allowed?'t':'f']],rowCount:1});
 });
 const deliver=async(body:string,settings=config)=>{
  const response=await worldsRoute(new Request(audience,{method:'POST',headers:{'Content-Type':sessionEventContentType},body}),settings);
  assert.ok(response);
  return response;
 };
 const event={eventId:'synthetic-it-event-01',identityIssuer:issuer,subject,revokedThrough:cutoff};
 const signed=(signer:string)=>signSessionRevocation(event,signer,audience,{kid,privateKey:pair.privateKey},now);
 const previous=await signed('https://worlds-hub.maki26.workers.dev');
 assert.equal((await deliver(previous,{...config,WORLDS_HUB_SESSION_EVENT_JWK:'invalid'})).status,404);
 assert.equal((await deliver(await signed('https://wrong.test'))).status,400);assert.equal(writes,0);
 const native=(accountId:string,issuedAt:number,sessionUser=accountId)=>resolveIdentity(new Request(origin+'/api/session'),config,async()=>{
  const dates={createdAt:new Date(issuedAt).toISOString(),updatedAt:new Date(now).toISOString()};
  return Response.json({user:{id:accountId,name:'Existing',email:'fixture@example.test',...dates},session:{
   id:'legacy-session',userId:sessionUser,expiresAt:new Date(now+60_000).toISOString(),...dates}});
 });
 assert.equal((await native(id,cutoff-1000) as {source:string}).source,'legacy');
 assert.equal((await deliver(previous)).status,202);
 assert.equal((await deliver(previous)).status,202);assert.equal(writes,2);
 assert.equal((await native(id,cutoff-1000) as Response).status,401);
 assert.equal((await native(id,cutoff+999) as Response).status,401);
 assert.equal((await native(id,cutoff+1000) as {source:string}).source,'legacy');
 assert.equal((await native(other,cutoff-1000) as {source:string}).source,'legacy');
 assert.equal((await native(id,cutoff+1000,other) as Response).status,401);
});
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
test('a direct sign-in link retains rate limits, PKCE and host-only state without a local credential form',async t=>{
 const config={...env,WORLDS_AUTH_ENABLED:'true',WORLDS_ORIGIN:'https://app.test',WORLDS_ISSUER:'https://identity.test',WORLDS_CLIENT_ID:'test'};
 const queries:string[]=[];let requests=0;
 t.mock.method(globalThis,'fetch',async(input:string|URL|Request,init?:RequestInit)=>{
  requests++;const url=new URL(input instanceof Request?input.url:String(input));
  if(url.origin==='https://identity.test')return Response.json({issuer:'https://identity.test',authorization_endpoint:'https://identity.test/authorize',token_endpoint:'https://identity.test/token',jwks_uri:'https://identity.test/jwks',code_challenge_methods_supported:['S256'],response_types_supported:['code'],subject_types_supported:['public'],id_token_signing_alg_values_supported:['EdDSA']});
  assert.ok(url.hostname.endsWith('.test'));const body=JSON.parse(String(init?.body)) as {query:string};queries.push(body.query);
  return Response.json(body.query.includes('worlds_take_auth_attempt')?{fields:[{name:'allowed',dataTypeID:16}],rows:[['t']],rowCount:1}:{fields:[],rows:[],rowCount:1});
 });
 assert.equal((await worldsRoute(new Request('https://app.test/auth/start'),config))!.status,403);
 assert.equal((await worldsRoute(new Request('https://app.test/auth/start',{method:'POST'}),config))!.status,405);assert.equal(requests,0);
 const response=(await worldsRoute(new Request('https://app.test/auth/start?ui_locales=en',{headers:{'sec-fetch-mode':'navigate','sec-fetch-dest':'document'}}),config))!;
 assert.equal(response.status,303);const target=new URL(response.headers.get('location')!);assert.equal(target.searchParams.get('redirect_uri'),'https://app.test/auth/callback');assert.equal(target.searchParams.get('ui_locales'),'en');assert.equal(target.searchParams.get('code_challenge_method'),'S256');
 assert.match(response.headers.get('set-cookie')!,/HttpOnly; Secure; SameSite=Lax/);assert.doesNotMatch(response.headers.get('set-cookie')!,/Domain=/);assert.ok(queries.some(sql=>sql.includes('worlds_take_auth_attempt')));assert.ok(queries.some(sql=>sql.includes('INSERT INTO public.worlds_auth_transactions')));
});
