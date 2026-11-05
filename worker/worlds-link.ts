import {parseSessionData} from '@neondatabase/auth/server';
import {sameOrigin,session} from '@worlds-hub/auth';
import {centralProof,confirmLink,prepareLink,type LegacyProof} from '@worlds-hub/auth/linking';
import {worldsConfig,worldsLinkEnabled,worldsReply} from './worlds-auth.ts';
import {worldsLinkStore} from './worlds-link-store.ts';
import {takeAuthAttempt} from './worlds-maintenance.ts';
import type {Env} from './index.ts';

export async function worldsLinkRoute(request:Request,env:Env,legacySession:()=>Promise<Response>):Promise<Response|null>{
 const path=new URL(request.url).pathname;
 const prepare=path==='/api/worlds/link/prepare';
 if(!prepare&&path!=='/api/worlds/link/confirm')return null;
 if(!worldsLinkEnabled(env))return worldsReply({error:'NOT_FOUND'},404);
 const config=worldsConfig(env);
 if(!config)return worldsReply({error:'NOT_FOUND'},404);
 if(request.method!=='POST')return worldsReply({error:'METHOD_NOT_ALLOWED'},405);
 if(new URL(request.url).origin!==config.origin||!sameOrigin(request,config.origin))return worldsReply({error:'INVALID_ORIGIN'},403);
 const body:unknown=await request.json().catch(()=>null);
 if(!body||typeof body!=='object'||Array.isArray(body))return worldsReply({error:'INVALID_REQUEST'},400);
 const input=body as Record<string,unknown>;
 const fields=prepare?['csrf']:['csrf','proof'];
 if(Object.keys(input).some(field=>!fields.includes(field))||typeof input.csrf!=='string'||
   (!prepare&&(typeof input.proof!=='string'||!/^[A-Za-z0-9_-]{32,128}$/.test(input.proof)))){
  return worldsReply({error:'INVALID_REQUEST'},400);
 }
 const {allowed,retryAfter}=await takeAuthAttempt(request,env,'link');
 if(!allowed){
  const response=worldsReply({error:'RATE_LIMITED'},429);
  response.headers.set('Retry-After',String(retryAfter));
  return response;
 }
 const current=await session(request,config);
 if(!current||input.csrf!==current.csrf)return worldsReply({error:'INVALID_CSRF'},403);
 const central=await centralProof(request,config).catch(()=>null);
 if(!central)return worldsReply({error:'CENTRAL_REAUTH_REQUIRED'},403);
 const upstream=await legacySession();
 if(!upstream.ok)return worldsReply({error:'LEGACY_AUTH_UNAVAILABLE'},503);
 const silent=()=>{};
 const local=parseSessionData(await upstream.json(),{error:silent,warn:silent,info:silent,debug:silent});
 const now=Date.now();
 if(!local.session||!local.user||local.session.userId!==local.user.id||local.session.expiresAt.getTime()<=now||
    local.session.createdAt.getTime()>now||local.session.createdAt.getTime()<=now-300_000||
    typeof local.user.email!=='string'||typeof current.email!=='string'){
  return worldsReply({error:'LEGACY_REAUTH_REQUIRED'},403);
 }
 const proof:LegacyProof={accountId:local.user.id,authenticatedAt:local.session.createdAt.getTime(),method:'managed-reauth'};
 const store=worldsLinkStore(env.DATABASE_URL,central,proof);
 const existing=await store.lookup(central.issuer,central.subject);
 if(existing)return worldsReply({error:'LINK_ALREADY_EXISTS'},409);
 if(prepare){
  const staged=await prepareLink(central,proof,store,now);
  return worldsReply({proof:staged,worldsEmail:current.email,localEmail:local.user.email});
 }
 try{
  await confirmLink(input.proof as string,central.sessionId,store,now);
  return worldsReply({linked:true});
 }catch(error){
  if(error instanceof Error&&error.message==='Expired, replayed or conflicting link')return worldsReply({error:'LINK_REFUSED'},409);
  throw error;
 }
}
