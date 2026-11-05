import assert from 'node:assert/strict';
import {createHash,createHmac,randomUUID} from 'node:crypto';
import {neon} from '@neondatabase/serverless';
import {SignJWT,exportJWK,generateKeyPair} from 'jose';
import pilot,{PILOT_ORIGIN} from '../worker/sso-pilot.ts';

assert.equal(process.env.IT_WORLDS_SSO_TEST_BRANCH,'br-little-base-baqt6cy6');
const database=new URL(process.env.DATABASE_URL!);
assert.equal(database.hostname,'ep-falling-fog-bad7v2ou.c-8.eu-central-1.aws.neon.tech');
assert.equal(database.username,'it_worlds_app');
const sql=neon(database.href);
const issuer='https://pilot-fixture.example.invalid',client='it-pilot-fixture';
const keys=await generateKeyPair('EdDSA',{extractable:true});
const jwk={...await exportJWK(keys.publicKey),kid:'test',alg:'EdDSA',use:'sig'};
const secret=randomUUID(),ip='192.0.2.91';
const env={
 ASSETS:{fetch:async()=>new Response('account fixture')},
 DATABASE_URL:database.href,NEON_AUTH_BASE_URL:'',NEON_AUTH_COOKIE_SECRET:secret,
 WORLDS_AUTH_ENABLED:'true',WORLDS_ORIGIN:PILOT_ORIGIN,WORLDS_PILOT_DATABASE_HOST:database.hostname,
 WORLDS_ISSUER:issuer,WORLDS_CLIENT_ID:client,WORLDS_RESOURCE:PILOT_ORIGIN+'/api',
};
const endpoint=(Math.floor(Date.now()/600_000)+1)*600_000;
assert.ok(endpoint-Date.now()>30_000,'Start fixture away from the rate-window boundary');
const rateIds=['login','callback'].flatMap(purpose=>[
 `global:${purpose}:${endpoint}`,
 'peer:'+createHmac('sha256',secret).update(`worlds-auth-rate:v1:${purpose}:${endpoint}:${ip}`).digest('hex'),
]);
assert.equal((await sql`SELECT count(*)::int AS n FROM public.worlds_auth_rate_buckets WHERE id=ANY(${rateIds}::text[])`)[0]?.n,0);
const ownedTransactions:string[]=[],ownedSessions:string[]=[];
const digest=(value:string)=>createHash('sha256').update(value).digest('hex');
const fetchBefore=globalThis.fetch;
let authorization:URL|undefined;
let exchanges=0;
globalThis.fetch=async(input,init)=>{
 const url=new URL(input instanceof Request?input.url:String(input));
 if(url.origin!==issuer){
  assert.equal(url.hostname,database.hostname.replace(/^[^.]+\./,'api.'),'Unexpected external target');
  return fetchBefore(input,init);
 }
 if(url.pathname==='/.well-known/openid-configuration')return Response.json({
  issuer,authorization_endpoint:issuer+'/authorize',token_endpoint:issuer+'/token',
  jwks_uri:issuer+'/jwks',response_types_supported:['code'],subject_types_supported:['public'],
  id_token_signing_alg_values_supported:['EdDSA'],code_challenge_methods_supported:['S256'],
 });
 if(url.pathname==='/jwks')return Response.json({keys:[jwk]});
 assert.equal(url.pathname,'/token');
 assert.ok(authorization);
 const form=new URLSearchParams(String(init?.body));
 assert.equal(form.get('code'),'fixture-code');
 assert.equal(form.get('client_id'),client);
 assert.equal(form.get('redirect_uri'),PILOT_ORIGIN+'/auth/callback');
 assert.equal(form.get('resource'),env.WORLDS_RESOURCE);
 assert.equal(createHash('sha256').update(form.get('code_verifier')??'').digest('base64url'),authorization.searchParams.get('code_challenge'));
 exchanges++;
 const idToken=await new SignJWT({nonce:authorization.searchParams.get('nonce'),email:'fixture@example.invalid',email_verified:true})
  .setProtectedHeader({alg:'EdDSA',kid:'test'}).setIssuer(issuer).setAudience(client)
  .setSubject('fixture-'+secret).setIssuedAt().setExpirationTime('5m').sign(keys.privateKey);
 return Response.json({access_token:'server-only-fixture-access',token_type:'Bearer',id_token:idToken});
};
const call=(path:string,init?:RequestInit)=>{
 const headers=new Headers(init?.headers);
 headers.set('CF-Connecting-IP',ip);
 return pilot.fetch(new Request(PILOT_ORIGIN+path,{...init,headers}),env);
};
function trackCookie(response:Response,name:string,owned:string[]){
 const header=response.headers.getSetCookie().find(value=>value.startsWith(name+'='));
 assert.ok(header);
 assert.match(header,/HttpOnly; Secure; SameSite=Lax/);
 assert.doesNotMatch(header,/Domain=|server-only-fixture-access/);
 const pair=header.split(';')[0];
 owned.push(digest(pair.slice(name.length+1)));
 return pair;
}
try{
 const started=await call('/auth/login?next=%2Fen%2Fkonto%2F&ui_locales=en',{method:'POST',headers:{origin:PILOT_ORIGIN}});
 assert.equal(started.status,303);
 authorization=new URL(started.headers.get('location')!);
 assert.equal(authorization.origin,issuer);
 assert.equal(authorization.searchParams.get('code_challenge_method'),'S256');
 assert.equal(authorization.searchParams.get('ui_locales'),'en');
 const transaction=trackCookie(started,'__Host-worlds-transaction',ownedTransactions);
 const path='/auth/callback?'+new URLSearchParams({code:'fixture-code',state:authorization.searchParams.get('state')!});
 assert.equal((await call(path)).status,400,'Callback requires the browser transaction');
 const callbacks=await Promise.all([call(path,{headers:{cookie:transaction}}),call(path,{headers:{cookie:transaction}})]);
 const callback=callbacks.find(response=>response.status===303);
 assert.ok(callback,'One callback must create the session');
 const session=trackCookie(callback,'__Host-worlds-session',ownedSessions);
 assert.equal(callbacks.filter(response=>response.status===303).length,1);
 assert.equal(exchanges,1,'Duplicate callback never exchanges the code again');
 assert.equal(callback.headers.get('location'),'/en/konto/');
 assert.equal(callback.headers.get('x-robots-tag'),'noindex, nofollow');
 const status=await call('/api/worlds/status',{headers:{cookie:session}});
 const account=await status.json() as {authenticated:boolean;accountState:string;csrf:string};
 assert.equal(account.authenticated,true);
 assert.equal(account.accountState,'ACCOUNT_LINK_REQUIRED');
 assert.equal((await call('/api/progress',{headers:{cookie:session}})).status,403);
 const logout=(csrf:string)=>call('/auth/logout?locale=en',{method:'POST',headers:{origin:PILOT_ORIGIN,cookie:session},body:new URLSearchParams({csrf})});
 assert.equal((await logout('invalid')).status,403);
 const signedOut=await logout(account.csrf);
 assert.equal(signedOut.status,303);
 assert.equal(signedOut.headers.get('location'),'/en/konto/');
 assert.equal((await call('/api/session',{headers:{cookie:session}})).status,401);
 console.log('PASS: isolated Worker routes with signed test issuer and real Neon: PKCE, browser binding, single-use callback, denied unlinked progress and CSRF-protected logout.');
}finally{
 globalThis.fetch=fetchBefore;
 await sql.transaction([
  sql`DELETE FROM public.worlds_auth_transactions WHERE id=ANY(${ownedTransactions}::text[])`,
  sql`DELETE FROM public.worlds_auth_sessions WHERE id=ANY(${ownedSessions}::text[])`,
  sql`DELETE FROM public.worlds_auth_rate_buckets WHERE id=ANY(${rateIds}::text[])`,
 ]);
}
