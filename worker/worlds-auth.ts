import {neon} from '@neondatabase/serverless';
import {PostgresAuthStore} from '@worlds-hub/auth/postgres-store';
import {backchannelLogout,callback,logout,session,startLogin,SESSION_COOKIE,type AuthConfig} from '@worlds-hub/auth';
import {parseSessionData} from '@neondatabase/auth/server';
import type {Env} from './index.ts';

export interface AppIdentity {user:{id:string;name:string;email:string};source:'legacy'|'worlds';csrf?:string;cookies:string[]}
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex','X-Content-Type-Options':'nosniff'}});
export function worldsConfig(env:Env):AuthConfig|null {
 if(env.WORLDS_AUTH_ENABLED!=='true')return null;
 if(!env.WORLDS_ORIGIN||!env.WORLDS_ISSUER||!env.WORLDS_CLIENT_ID)throw new Error('Incomplete Worlds configuration');
 const origin=new URL(env.WORLDS_ORIGIN);
 if(origin.protocol!=='https:'||origin.origin!==env.WORLDS_ORIGIN)throw new Error('Invalid Worlds origin');
 const sql=neon(env.DATABASE_URL);
 return {origin:origin.origin,issuer:env.WORLDS_ISSUER,clientId:env.WORLDS_CLIENT_ID,resource:env.WORLDS_RESOURCE,
  algorithm:'EdDSA',reauthEnabled:false,store:new PostgresAuthStore((text,values)=>sql.query(text,values)),
  returnPaths:['/konto/','/en/konto/','/fortschritt/','/en/fortschritt/'],signedOutPaths:{de:'/konto/',en:'/en/konto/'}};
}
export async function worldsRoute(request:Request,env:Env):Promise<Response|null>{
 const url=new URL(request.url);
 if(!url.pathname.startsWith('/auth/')&&url.pathname!=='/api/worlds/status')return null;
 try{
  const config=worldsConfig(env);if(!config)return url.pathname==='/api/worlds/status'?reply({enabled:false}):reply({error:'NOT_FOUND'},404);
  if(url.origin!==config.origin)return reply({error:'INVALID_ORIGIN'},403);
  if(url.pathname==='/api/worlds/status'){
   if(request.method!=='GET')return reply({error:'METHOD_NOT_ALLOWED'},405);
   const central=await session(request,config);
   const account=central?await resolveIdentity(request,env,async()=>reply({},401)):null;
   const state=account instanceof Response?(await account.json() as {error:string}).error:account?'LINKED':null;
   return reply({enabled:true,authenticated:!!central,accountState:state,csrf:central?.csrf});
  }
  let response:Response;
  if(url.pathname==='/auth/login')response=await startLogin(request,config);
  else if(url.pathname==='/auth/callback')response=await callback(request,config);
  else if(url.pathname==='/auth/logout')response=await logout(request,config);
  else if(url.pathname==='/auth/backchannel-logout')response=await backchannelLogout(request,config);
  else return reply({error:'NOT_FOUND'},404);
  response.headers.set('X-Robots-Tag','noindex');return response;
 }catch{return reply({error:'WORLDS_AUTH_UNAVAILABLE'},503);}
}
export async function resolveIdentity(request:Request,env:Env,legacy:()=>Promise<Response>):Promise<AppIdentity|Response>{
 const config=worldsConfig(env);
 if(config&&(request.headers.get('cookie')??'').split(';').some(value=>value.trim().startsWith(SESSION_COOKIE+'='))){
  if(new URL(request.url).origin!==config.origin)return reply({error:'INVALID_ORIGIN'},403);
  const central=await session(request,config);if(!central)return reply({error:'UNAUTHENTICATED'},401);
  const sql=neon(env.DATABASE_URL);
  // The verified issuer/sub are the only lookup keys; never email or browser IDs.
  // The restricted role cannot read the Auth directory. The narrow DB function
  // preserves local account deletion/bans on every request after linking.
  const [,rows]=await sql.transaction([
   sql`SELECT set_config('app.worlds_issuer',${central.issuer},true),set_config('app.worlds_subject',${central.sub},true)`,
   sql`SELECT local_user_id,public.worlds_account_active(local_user_id) AS active FROM public.worlds_identity_links WHERE issuer=${central.issuer} AND subject=${central.sub}`,
  ]);
  const id=rows[0]?.local_user_id;
  if(typeof id!=='string')return reply({error:'ACCOUNT_LINK_REQUIRED'},403);
  if(rows[0]?.active!==true)return reply({error:'ACCOUNT_UNAVAILABLE'},403);
  return {user:{id,name:central.name??'',email:central.email??''},source:'worlds',csrf:central.csrf,cookies:[]};
 }
 const response=await legacy();if(!response.ok)return reply({error:'AUTH_UNAVAILABLE'},503);
 const parsed=parseSessionData(await response.json());
 if(!parsed.user||!parsed.session)return reply({error:'UNAUTHENTICATED'},401);
 return {user:{id:parsed.user.id,name:parsed.user.name,email:parsed.user.email},source:'legacy',cookies:response.headers.getSetCookie()};
}
export function identityResponse(identity:AppIdentity|Response){
 if(identity instanceof Response)return identity;
 const response=reply({user:identity.user,source:identity.source,csrf:identity.csrf});
 for(const cookie of identity.cookies)response.headers.append('Set-Cookie',cookie);
 return response;
}
