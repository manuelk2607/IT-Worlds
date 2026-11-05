import worker,{type Env} from './index.ts';

interface PilotEnv extends Env { WORLDS_PILOT_DATABASE_HOST?:string }
export const PILOT_ORIGIN='https://it-worlds-sso-pilot.maki26.workers.dev';
function isolated(env:PilotEnv):boolean {
 try{
  const db=new URL(env.DATABASE_URL);
  return env.WORLDS_ORIGIN===PILOT_ORIGIN&&
    /^ep-[a-z0-9-]+\.c-[0-9]+\.eu-central-1\.aws\.neon\.tech$/.test(env.WORLDS_PILOT_DATABASE_HOST??'')&&
    db.hostname===env.WORLDS_PILOT_DATABASE_HOST&&
    db.username==='it_worlds_app'&&db.protocol==='postgresql:'&&!!env.NEON_AUTH_COOKIE_SECRET;
 }catch{return false;}
}
function privateResponse(response:Response){
 const headers=new Headers(response.headers);
 headers.set('X-Robots-Tag','noindex, nofollow');
 headers.set('Cache-Control','no-store');
 return new Response(response.body,{status:response.status,headers});
}
export default {
 async fetch(request:Request,env:PilotEnv){
  const url=new URL(request.url);
  if(url.origin!==PILOT_ORIGIN||!isolated(env))return privateResponse(new Response('Pilot unavailable',{status:503}));
  if(url.pathname==='/robots.txt')return privateResponse(new Response('User-agent: *\nAllow: /\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}}));
  if(url.pathname==='/sitemap.xml'||url.pathname.startsWith('/api/auth/'))return privateResponse(new Response(null,{status:404}));
  // Force isolation even if copied settings contain an old provider URL.
  return privateResponse(await worker.fetch(request,{...env,WORLDS_PILOT_ONLY:true,NEON_AUTH_BASE_URL:''}));
 },
 async scheduled(event:unknown,env:PilotEnv){
  if(isolated(env))await worker.scheduled(event,env);
 },
};
