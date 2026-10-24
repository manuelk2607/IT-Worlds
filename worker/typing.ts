import {neon} from '@neondatabase/serverless';
import {parseSessionData} from '@neondatabase/auth/server';
import {parseTypingTrace,rankedText,rankedTraceValid,scoreTyping,typingLessons,typingTexts} from '../src/lib/typing.ts';
import type {Env} from './index.ts';
const object=(v:unknown):Record<string,unknown>=>v!==null&&typeof v==='object'&&!Array.isArray(v)?v as Record<string,unknown>:{};
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function typingRequest(request:Request,env:Env,getSession:()=>Promise<Response>):Promise<Response>{
 const url=new URL(request.url),path=url.pathname.slice('/api/typing/'.length);const sql=neon(env.DATABASE_URL);
 if(path==='leaderboard'&&request.method==='GET'){
  const locale=url.searchParams.get('locale')??'de',period=url.searchParams.get('period')??'day',metric=url.searchParams.get('metric')??'wpm';
  if(!['de','en'].includes(locale)||!['day','week','month','all'].includes(period)||!['wpm','kpm','accuracy'].includes(metric))return reply({error:'INVALID_FILTER'},400);
  const items=await sql`SELECT display_name,wpm,kpm,accuracy FROM public.typing_board(${locale},${period},${metric})`;return reply({items});
 }
 const auth=await getSession();if(!auth.ok)return reply({error:'AUTH_UNAVAILABLE'},503);const session=parseSessionData(await auth.json());if(!session.user||!session.session)return reply({error:'UNAUTHENTICATED'},401);
 const user=session.user.id,cookies=auth.headers.getSetCookie();const send=(value:unknown,status=200)=>{const response=reply(value,status);for(const cookie of cookies)response.headers.append('Set-Cookie',cookie);return response;};
 if(path==='me'&&request.method==='GET'){
  const [,profiles,runs]=await sql.transaction([sql`SELECT set_config('app.user_id',${user},true)`,sql`SELECT display_name,visible FROM public.typing_profiles WHERE user_id=${user}`,sql`SELECT lesson,mode,locale,wpm,kpm,accuracy,ended_at FROM public.typing_runs WHERE user_id=${user} AND ended_at IS NOT NULL ORDER BY ended_at DESC LIMIT 30`]);return send({profile:profiles[0]??null,runs});
 }
 if(request.method!=='POST')return send({error:'NOT_FOUND'},404);const data=object(await request.json().catch(()=>null));
 if(path==='profile'){
  const name=typeof data.name==='string'?data.name.trim():'';if(typeof data.visible!=='boolean'||name.length>24||!/^[\p{L}\p{N} _-]*$/u.test(name)||(data.visible&&name.length<2))return send({error:'INVALID_PROFILE'},400);
  await sql.transaction([sql`SELECT set_config('app.user_id',${user},true)`,sql`INSERT INTO public.typing_profiles(user_id,display_name,visible) VALUES(${user},${name},${data.visible}) ON CONFLICT(user_id) DO UPDATE SET display_name=EXCLUDED.display_name,visible=EXCLUDED.visible`]);return send({saved:true});
 }
 if(path==='start'){
  if(data.locale!=='de'&&data.locale!=='en'||data.mode!=='practice'&&data.mode!=='ranked')return send({error:'INVALID_TEST'},400);
  const lesson=typingLessons.find(l=>l.id===data.lesson&&!['free','adaptive'].includes(l.id));if(!lesson)return send({error:'INVALID_LESSON'},400);
  const target=data.mode==='ranked'?rankedText(data.locale):lesson.id==='text'?typingTexts[data.locale].repeat(8):lesson.text;
  const [,,rows]=await sql.transaction([sql`SELECT set_config('app.user_id',${user},true)`,sql`SELECT pg_advisory_xact_lock(hashtextextended(${user},3))`,sql`INSERT INTO public.typing_runs(user_id,mode,locale,lesson,target) SELECT ${user},${data.mode},${data.locale},${lesson.id},${target} WHERE NOT EXISTS(SELECT 1 FROM public.typing_runs WHERE user_id=${user} AND started_at>now()-interval '10 seconds') AND (SELECT count(*) FROM public.typing_runs WHERE user_id=${user} AND started_at>now()-interval '5 minutes')<10 RETURNING id,target`]);
  return rows.length?send({id:rows[0].id,text:rows[0].target,duration:60000}):send({error:'RATE_LIMITED'},429);
 }
 if(path==='finish'){
  const trace=parseTypingTrace(data);if(typeof data.id!=='string'||!/^[0-9a-f-]{36}$/i.test(data.id)||!trace||typeof data.elapsed!=='number'||!Number.isInteger(data.elapsed)||data.elapsed<1||data.elapsed>60000)return send({error:'INVALID_RESULT'},400);
  const [,rows]=await sql.transaction([sql`SELECT set_config('app.user_id',${user},true)`,sql`SELECT id,target,mode,started_at,ended_at FROM public.typing_runs WHERE id=${data.id} AND user_id=${user}`]);
  const run=rows[0];if(!run)return send({error:'NOT_FOUND'},404);if(run.ended_at)return send({error:'ALREADY_SUBMITTED'},409);
  const elapsed=Date.now()-new Date(String(run.started_at)).getTime(),score=scoreTyping(String(run.target),trace,data.elapsed);
  if(!score||elapsed>120000||data.elapsed>elapsed+1000)return send({error:'INVALID_RESULT'},422);
  if(run.mode==='ranked'&&(data.elapsed!==60000||!rankedTraceValid(trace,elapsed)))return send({error:'INVALID_TEST'},422);
  const eligible=run.mode==='ranked'&&score.accuracy>=90&&score.retained>=20&&score.wpm<=200;
  const [,saved]=await sql.transaction([sql`SELECT set_config('app.user_id',${user},true)`,sql`UPDATE public.typing_runs SET ended_at=clock_timestamp(),duration=${data.elapsed},characters=${score.characters},wpm=${score.wpm},kpm=${score.kpm},accuracy=${score.accuracy},weakness=${JSON.stringify(score.weakness)}::jsonb,eligible=${eligible} WHERE id=${data.id} AND user_id=${user} AND ended_at IS NULL RETURNING id`]);
  return saved.length?send({saved:true,ranked:eligible,score}):send({error:'ALREADY_SUBMITTED'},409);
 }
 return send({error:'NOT_FOUND'},404);
}
