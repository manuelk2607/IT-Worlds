import {neon} from '@neondatabase/serverless';
import {parseSessionData} from '@neondatabase/auth/server';
import {readCookie,sameOrigin,session,SESSION_COOKIE} from '@worlds-hub/auth';
import {hash} from '@worlds-hub/auth/store';
import type {Env} from './index.ts';
import {worldsConfig,worldsLinkTarget,worldsProfilesEnabled,worldsReply} from './worlds-auth.ts';
import {takeAuthAttempt} from './worlds-maintenance.ts';

export async function worldsProfileRoute(request:Request,env:Env,legacySession:()=>Promise<Response>){
 if(new URL(request.url).pathname!=='/api/worlds/profile')return null;
 if(!worldsProfilesEnabled(env))return worldsReply({error:'NOT_FOUND'},404);
 const config=worldsConfig(env);
 if(!config)return worldsReply({error:'NOT_FOUND'},404);
 if(request.method!=='POST')return worldsReply({error:'METHOD_NOT_ALLOWED'},405);
 if(new URL(request.url).origin!==config.origin||!sameOrigin(request,config.origin))return worldsReply({error:'INVALID_ORIGIN'},403);

 const current=await session(request,config);
 const binding=readCookie(request,SESSION_COOKIE);
 if(!current||!binding)return worldsReply({error:'UNAUTHENTICATED'},401);
 if(worldsLinkTarget(env)?.subject===current.sub)return worldsReply({error:'EXISTING_PROFILE'},409);
 const input:unknown=await request.json().catch(()=>null);
 if(!input||typeof input!=='object'||Array.isArray(input)||
  Object.keys(input).length!==1||!('csrf' in input)||input.csrf!==current.csrf){
  return worldsReply({error:'INVALID_CSRF'},403);
 }
 const {allowed,retryAfter}=await takeAuthAttempt(request,env,'profile');
 if(!allowed){
  const response=worldsReply({error:'RATE_LIMITED'},429);
  response.headers.set('Retry-After',String(retryAfter));return response;
 }
 if(!env.WORLDS_PILOT_ONLY){
  const native=await legacySession();
  if(!native.ok)return worldsReply({error:'LEGACY_AUTH_UNAVAILABLE'},503);
  const known=parseSessionData(await native.json());
  if(known.user&&known.session)return worldsReply({error:'EXISTING_PROFILE'},409);
 }
 const sql=neon(env.DATABASE_URL);
 const [result]=await sql`SELECT public.worlds_create_project_account(
  ${current.issuer},${current.sub},${await hash(binding)},${current.csrf}
 ) AS created`;
 return result?.created===true?worldsReply({created:true},201):worldsReply({error:'PROFILE_NOT_CREATED'},409);
}
