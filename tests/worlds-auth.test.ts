import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker,{type Env} from '../worker/index.ts';
import {worldsConfig,resolveIdentity,worldsRoute,worldsLinkEnabled,worldsLinkTarget} from '../worker/worlds-auth.ts';
import {worldsLinkRoute} from '../worker/worlds-link.ts';
import {worldsProfileRoute} from '../worker/worlds-profile.ts';
import {WORLDS_PRODUCTION_VARS} from '../worker/worlds-production.ts';
import {accountPath,worldsLoginHref} from '../src/lib/account-return.ts';
import {sessionEventContentType,sessionRevocationPath,signSessionRevocation} from '@worlds-hub/auth/session-revocation';
import {hash} from '@worlds-hub/auth/store';
const env:Env={ASSETS:{fetch:async()=>new Response('asset')},DATABASE_URL:'postgres://app:example@db.test/app',NEON_AUTH_BASE_URL:'https://legacy.test/auth',NEON_AUTH_COOKIE_SECRET:'test-only'};
test('production linking fails closed without a scoped pair and excludes other accounts',async t=>{
 const origin='https://app.test',issuer='https://identity.test';
 const localUserId='883ad974-e817-4c5c-b158-92b253f87cae';
 const options={...env,WORLDS_AUTH_ENABLED:'true',WORLDS_LINK_ENABLED:'true',WORLDS_REAUTH_VERIFIED:'true',
  WORLDS_PROFILES_ENABLED:'true',WORLDS_CLIENT_ID:'test',WORLDS_ORIGIN:origin,WORLDS_ISSUER:issuer};
 const target=JSON.stringify({subject:'approved',localUserId});
 assert.equal(worldsLinkEnabled({...options,WORLDS_ORIGIN:WORLDS_PRODUCTION_VARS.WORLDS_ORIGIN}),false);
 assert.equal(worldsLinkEnabled({...options,WORLDS_LINK_TARGET:'{}'}),false);
 const scoped={...options,WORLDS_LINK_TARGET:target};
 let sub='different';
 let legacyReads=0;
 t.mock.method(globalThis,'fetch',async (_input:unknown,init?:RequestInit)=>{
  const {query}=JSON.parse(String(init?.body)) as {query:string};
  if(query.includes('worlds_take_auth_attempt'))return Response.json({fields:[{name:'allowed',dataTypeID:16}],rows:[['t']]});
  assert.match(query,/SELECT payload FROM public.worlds_auth_sessions/);
  const now=Date.now();
  const payload={issuer,sub,email:'fixture@example.invalid',csrf:'csrf-proof',authenticatedAt:now-1000,expires:now+60_000};
  return Response.json({fields:[{name:'payload',dataTypeID:3802}],rows:[[JSON.stringify(payload)]]});
 });
 const legacy=async()=>{
  legacyReads++;
  const other='e65d7acb-2373-428c-96d2-3e80715774ba';
  const now=Date.now();
  const dates={createdAt:new Date(now-1000).toISOString(),updatedAt:new Date(now).toISOString()};
  return Response.json({user:{...dates,id:other,email:'other@example.invalid'},session:{...dates,id:'fixture',userId:other,expiresAt:new Date(now+60_000).toISOString()}});
 };
 const request=(path:string,body:object)=>new Request(origin+path,{method:'POST',
  headers:{origin,'content-type':'application/json',cookie:'__Host-worlds-session='+'a'.repeat(43)},body:JSON.stringify(body)});
 for(const [step,body] of [['prepare',{csrf:'csrf-proof'}],['confirm',{csrf:'csrf-proof',proof:'a'.repeat(43)}]] as const){
  assert.equal((await worldsLinkRoute(request('/api/worlds/link/'+step,body),scoped,legacy))?.status,404);
 }
 assert.equal(legacyReads,0);
 sub='approved';
 for(const [step,body] of [['prepare',{csrf:'csrf-proof'}],['confirm',{csrf:'csrf-proof',proof:'a'.repeat(43)}]] as const){
  const rejected=await worldsLinkRoute(request('/api/worlds/link/'+step,body),scoped,legacy);
  assert.equal(rejected?.status,409);
  assert.deepEqual(await rejected?.json(),{error:'LINK_REFUSED'});
 }
 assert.equal((await worldsProfileRoute(request('/api/worlds/profile',{csrf:'csrf-proof'}),scoped,legacy))?.status,409);
 assert.equal(legacyReads,2);
});
test('a new IT-Worlds profile requires an enabled, same-origin authenticated POST',async()=>{
 const origin='https://it-worlds.test';
 const settings={...env,WORLDS_AUTH_ENABLED:'true',WORLDS_PROFILES_ENABLED:'true',WORLDS_ORIGIN:origin,
  WORLDS_ISSUER:'https://hub.test/auth',WORLDS_CLIENT_ID:'test'};
 const legacy=async()=>{throw new Error('Should deny before accessing the legacy provider');};
 const req=(method='POST',requestOrigin=origin)=>new Request(origin+'/api/worlds/profile',{method,headers:{origin:requestOrigin}});
 assert.equal((await worldsProfileRoute(req(),{...settings,WORLDS_PROFILES_ENABLED:'false'},legacy))?.status,404);
 assert.equal((await worldsProfileRoute(req('GET'),settings,legacy))?.status,405);
 assert.equal((await worldsProfileRoute(req('POST','https://untrusted.test'),settings,legacy))?.status,403);
 assert.equal((await worldsProfileRoute(req(),settings,legacy))?.status,401);
});

test('production self-service requires two fresh sessions and confirmation of the reviewed legacy account',async t=>{
 const {WORLDS_ORIGIN:origin,WORLDS_ISSUER:issuer}=WORLDS_PRODUCTION_VARS;
 const olderPair=JSON.stringify({subject:'scoped-owner',localUserId:'10000000-0000-4000-8000-000000000001'});
 const database='postgresql://it_worlds_app@ep-broad-unit-baisjndz-pooler.c-8.eu-central-1.aws.neon.tech/IT-Worlds';
 const sessionKey=JSON.stringify({kid:'fixture',kty:'OKP',crv:'Ed25519',x:'A'.repeat(43)});
 const scoped={...env,...WORLDS_PRODUCTION_VARS,DATABASE_URL:database,WORLDS_LINK_ENABLED:'true',WORLDS_REAUTH_VERIFIED:'true',
  WORLDS_PROFILES_ENABLED:'true',WORLDS_HUB_SESSION_EVENT_JWK:sessionKey,WORLDS_LINK_TARGET:olderPair};
 const settings={...scoped,WORLDS_LINK_SELF_SERVICE:'true'};
 assert.equal(worldsLinkTarget(scoped)?.subject,'scoped-owner');
 assert.equal(worldsLinkTarget(settings),null);
 assert.equal(worldsLinkEnabled({...settings,WORLDS_LINK_TARGET:'{}'}),false);
 assert.equal(worldsLinkEnabled({...settings,WORLDS_LINK_TARGET:undefined}),true);
 assert.equal(worldsLinkEnabled({...settings,WORLDS_PILOT_ONLY:true}),false);
 assert.equal(worldsLinkEnabled({...settings,WORLDS_REAUTH_VERIFIED:'false'}),false);
 assert.throws(()=>worldsConfig({...settings,WORLDS_HUB_SESSION_EVENT_JWK:undefined}),/production target/);

 const subject='another-owner',localId='10000000-0000-4000-8000-000000000002',differentId='10000000-0000-4000-8000-000000000003';
 const browserSession='a'.repeat(43),centralBinding=await hash(browserSession),csrf='fixture-csrf',now=Date.now();
 let linked=false,stagedHash='',legacyReads=0;
 const proofAge={central:1000,legacy:1000};
 const result=(name:string,dataTypeID:number,rows:string[][])=>({fields:[{name,dataTypeID}],rows});
 t.mock.method(globalThis,'fetch',async (_input:unknown,init?:RequestInit)=>{
  type Query={query:string;params:string[]};
  const body=JSON.parse(String(init?.body)) as Query&{queries?:Query[]};
  if(body.query?.includes('worlds_take_auth_attempt'))return Response.json(result('allowed',16,[['t']]));
  if(body.query?.includes('SELECT payload FROM public.worlds_auth_sessions')){
   assert.equal(body.params[0],centralBinding);
   const payload={issuer,sub:subject,email:'worlds@example.invalid',csrf,authenticatedAt:now-proofAge.central,expires:now+60_000};
   return Response.json(result('payload',3802,[[JSON.stringify(payload)]]));
  }
  assert.ok(body.queries);
  const [scope,operation]=body.queries;
  assert.match(scope.query,/worlds_account_active/);
  const scopedId=scope.params[0];
  assert.ok([localId,differentId].includes(scopedId));
  const batch=(response:unknown)=>Response.json({results:[{fields:[],rows:[]},response]});
  if(operation.query.startsWith('SELECT local_user_id')){
   assert.deepEqual(operation.params,[issuer,subject]);
   return batch(result('local_user_id',2950,linked?[[localId]]:[]));
  }
  if(operation.query.startsWith('INSERT INTO worlds_link_proofs')){
   assert.deepEqual(operation.params.slice(1,5),[issuer,subject,localId,centralBinding]);
   stagedHash=operation.params[0];
   return batch({fields:[],rows:[]});
  }
  assert.match(operation.query,/WITH claimed AS \(/);
  assert.equal(operation.params[1],centralBinding);
  linked=scopedId===localId&&operation.params[0]===stagedHash;
  return batch(result('linked',16,[[linked?'t':'f']]));
 });
 const local=(id=localId)=>async()=>{
  legacyReads++;
  const dates={createdAt:new Date(now-proofAge.legacy),updatedAt:new Date(now)};
  return Response.json({user:{...dates,id,email:'old-it@example.invalid'},
   session:{...dates,id:'legacy-session',userId:id,expiresAt:new Date(now+60_000)}});
 };
 const request=(step:string,body:object)=>new Request(origin+'/api/worlds/link/'+step,{method:'POST',
  headers:{origin,'content-type':'application/json',cookie:'__Host-worlds-session='+browserSession},body:JSON.stringify(body)});
 assert.equal((await worldsLinkRoute(request('prepare',{csrf}),scoped,local()))?.status,404);
 assert.equal((await worldsLinkRoute(request('prepare',{csrf,localUserId:localId}),settings,local()))?.status,400);
 proofAge.central=310_000;
 assert.deepEqual(await (await worldsLinkRoute(request('prepare',{csrf}),settings,local()))?.json(),{error:'CENTRAL_REAUTH_REQUIRED'});
 assert.equal(legacyReads,0);
 proofAge.central=1000;
 proofAge.legacy=310_000;
 assert.deepEqual(await (await worldsLinkRoute(request('prepare',{csrf}),settings,local()))?.json(),{error:'LEGACY_REAUTH_REQUIRED'});
 proofAge.legacy=1000;
 const preview=await worldsLinkRoute(request('prepare',{csrf}),settings,local());
 assert.equal(preview?.status,200);
 const review=await preview!.json() as {proof:string;worldsEmail:string;localEmail:string};
 assert.deepEqual(review,{proof:review.proof,worldsEmail:'worlds@example.invalid',localEmail:'old-it@example.invalid'});
 assert.equal(await hash(review.proof),stagedHash);
 assert.equal(linked,false);
 assert.equal((await worldsLinkRoute(request('confirm',{csrf,proof:review.proof}),settings,local(differentId)))?.status,409);
 assert.equal(linked,false);
 assert.deepEqual(await (await worldsLinkRoute(request('confirm',{csrf,proof:review.proof}),settings,local()))?.json(),{linked:true});
 assert.equal((await worldsLinkRoute(request('confirm',{csrf,proof:review.proof}),settings,local()))?.status,409);
});

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
test('production sign-in is independent of the explicit linking and revocation gates',async()=>{
 const production={...env,...WORLDS_PRODUCTION_VARS,WORLDS_LINK_ENABLED:'false',WORLDS_REAUTH_VERIFIED:'false'};
 const origin=production.WORLDS_ORIGIN;
 assert.throws(()=>worldsConfig(production),/production target/);
 const database='postgresql://it_worlds_app@ep-broad-unit-baisjndz-pooler.c-8.eu-central-1.aws.neon.tech/IT-Worlds';
 const signIn={...production,DATABASE_URL:database};
 assert.equal(worldsConfig(signIn)?.reauthEnabled,false);
 const status=await (await worker.fetch(new Request(origin+'/api/worlds/status'),signIn)).json();
 assert.equal(status.enabled,true);
 assert.equal(status.linkEnabled,false);
 assert.equal(status.legacySignInAvailable,true);
 for(const path of ['prepare','confirm']){
  const response=await worker.fetch(new Request(origin+'/api/worlds/link/'+path,{
   method:'POST',headers:{origin,'content-type':'application/json'},body:'{}',
  }),signIn);
  assert.equal(response.status,404);
 }
 assert.throws(()=>worldsConfig({...signIn,WORLDS_LINK_ENABLED:'true'}),/production target/);
 const withoutTarget={...signIn,WORLDS_LINK_ENABLED:'true',WORLDS_REAUTH_VERIFIED:'true'};
 assert.equal(worldsConfig(withoutTarget)?.reauthEnabled,false);
 const linking={...withoutTarget,WORLDS_LINK_TARGET:JSON.stringify({subject:'fixture',localUserId:'e621e1e0-2164-4cfb-ae8c-87863fb169db'})};
 assert.throws(()=>worldsConfig(linking),/production target/);
 const publicKey='{"kid":"fixture","kty":"OKP","crv":"Ed25519","x":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}';
 assert.equal(worldsConfig({...linking,WORLDS_HUB_SESSION_EVENT_JWK:publicKey})?.reauthEnabled,true);
});
test('transition offers the previous sign-in for existing accounts and rejects new local registrations',async t=>{
 const origin='https://app.test';
 const config={...env,WORLDS_AUTH_ENABLED:'true',WORLDS_ORIGIN:origin,WORLDS_ISSUER:'https://identity.test',WORLDS_CLIENT_ID:'test'};
 t.mock.method(globalThis,'fetch',async()=>{throw new Error('Unauthorized legacy registration must not contact the provider');});
 const status=async(settings:Env)=>await (await worker.fetch(new Request(origin+'/api/worlds/status'),settings)).json();
 assert.equal((await status(config)).legacySignInAvailable,true);
 assert.equal((await status({...config,WORLDS_PILOT_ONLY:true})).legacySignInAvailable,false);
 assert.equal((await status({...config,NEON_AUTH_BASE_URL:''})).legacySignInAvailable,false);
 const register=await worker.fetch(new Request(origin+'/api/auth/sign-up/email',{
  method:'POST',headers:{origin,'content-type':'application/json'},body:'{}',
 }),config);
 assert.equal(register.status,404);
});
test('a direct sign-in link retains rate limits, PKCE and host-only state without a local credential form',async t=>{
 const config={...env,WORLDS_AUTH_ENABLED:'true',WORLDS_ORIGIN:'https://app.test',WORLDS_ISSUER:'https://identity.test',WORLDS_CLIENT_ID:'test'};
 const queries:string[]=[],destinations:string[]=[];let requests=0;
 t.mock.method(globalThis,'fetch',async(input:string|URL|Request,init?:RequestInit)=>{
  requests++;const url=new URL(input instanceof Request?input.url:String(input));
  if(url.origin==='https://identity.test')return Response.json({issuer:'https://identity.test',authorization_endpoint:'https://identity.test/authorize',token_endpoint:'https://identity.test/token',jwks_uri:'https://identity.test/jwks',code_challenge_methods_supported:['S256'],response_types_supported:['code'],subject_types_supported:['public'],id_token_signing_alg_values_supported:['EdDSA']});
  assert.ok(url.hostname.endsWith('.test'));const body=JSON.parse(String(init?.body)) as {query:string;params:string[]};queries.push(body.query);
  if(body.query.includes('INSERT INTO public.worlds_auth_transactions')){
   destinations.push((JSON.parse(body.params[1]!) as {next:string}).next);
  }
  return Response.json(body.query.includes('worlds_take_auth_attempt')?{fields:[{name:'allowed',dataTypeID:16}],rows:[['t']],rowCount:1}:{fields:[],rows:[],rowCount:1});
 });
 assert.equal((await worldsRoute(new Request('https://app.test/auth/start'),config))!.status,403);
 assert.equal((await worldsRoute(new Request('https://app.test/auth/start',{method:'POST'}),config))!.status,405);assert.equal(requests,0);
 const response=(await worldsRoute(new Request('https://app.test/auth/start?ui_locales=en',{headers:{'sec-fetch-mode':'navigate','sec-fetch-dest':'document'}}),config))!;
 assert.equal(response.status,303);const target=new URL(response.headers.get('location')!);assert.equal(target.searchParams.get('redirect_uri'),'https://app.test/auth/callback');assert.equal(target.searchParams.get('ui_locales'),'en');assert.equal(target.searchParams.get('code_challenge_method'),'S256');
 assert.match(response.headers.get('set-cookie')!,/HttpOnly; Secure; SameSite=Lax/);assert.doesNotMatch(response.headers.get('set-cookie')!,/Domain=/);assert.ok(queries.some(sql=>sql.includes('worlds_take_auth_attempt')));assert.ok(queries.some(sql=>sql.includes('INSERT INTO public.worlds_auth_transactions')));
 const navigation={headers:{'sec-fetch-mode':'navigate','sec-fetch-dest':'document'}};
 const quiz='/en/quiz/?frage=example#quiz';
 assert.equal((await worldsRoute(new Request('https://app.test'+worldsLoginHref('en',quiz),navigation),config))!.status,303);
 const malicious='/en/konto/?'+new URLSearchParams({next:'//evil.test/'});
 const attack='/auth/start?'+new URLSearchParams({next:malicious,ui_locales:'en'});
 assert.equal((await worldsRoute(new Request('https://app.test'+attack,navigation),config))!.status,303);
 assert.deepEqual(destinations,['/en/konto/',accountPath('en',quiz),'/en/konto/']);
});
