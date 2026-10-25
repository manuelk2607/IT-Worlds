// Explicit development-only integration test. Prints labels, never auth/SQL payloads.
import {readFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {setTimeout} from 'node:timers/promises';
import {neon} from '@neondatabase/serverless';
import {parseSessionData} from '@neondatabase/auth/server';
import {Client} from './live-accounts.ts';
import {rankedText} from '../src/lib/typing.ts';

let phase='configuration';
function ensure(value:unknown,label:string):asserts value {if(!value)throw new Error(label);}
function record(value:unknown):Record<string,unknown>{ensure(value&&typeof value==='object'&&!Array.isArray(value),'Object response required');return value as Record<string,unknown>;}
function items(value:unknown):Record<string,unknown>[] {const list=record(value).items;ensure(Array.isArray(list),'Items required');return list.map(record);}
async function main(){
 const {IT_WORLDS_TEST_BRANCH,IT_WORLDS_TEST_BASE_URL,IT_WORLDS_TEST_CREDENTIALS,DATABASE_URL,NEON_AUTH_BASE_URL}=process.env;
 ensure(IT_WORLDS_TEST_BRANCH==='development'&&IT_WORLDS_TEST_BASE_URL&&IT_WORLDS_TEST_CREDENTIALS&&DATABASE_URL&&NEON_AUTH_BASE_URL,'Development configuration required');
 const base=new URL(IT_WORLDS_TEST_BASE_URL);
 ensure(base.protocol==='http:'&&base.hostname==='localhost','Localhost only');
 ensure(new URL(DATABASE_URL).hostname==='ep-jolly-darkness-ba9m7fit-pooler.c-8.eu-central-1.aws.neon.tech','Restricted development DB only');
 ensure(new URL(DATABASE_URL).username==='it_worlds_app'&&new URL(NEON_AUTH_BASE_URL).hostname.startsWith('ep-jolly-darkness-ba9m7fit.'),'Development role/Auth only');
 const raw:unknown=JSON.parse(await readFile(IT_WORLDS_TEST_CREDENTIALS,'utf8'));
 ensure(Array.isArray(raw)&&raw.length===2,'Existing disposable test accounts required');
 const clients=[new Client(base),new Client(base)] as const;
 const users:string[]=[];
 try{
  for(const [index,client] of clients.entries()){
   phase=`sign-in ${index+1}`;const credentials=record(raw[index]);
   ensure(typeof credentials.email==='string'&&credentials.email.endsWith('@example.invalid')&&typeof credentials.password==='string','Test credentials only');
   ensure((await client.request('/api/auth/sign-in/email',{email:credentials.email,password:credentials.password})).status===200,'Sign-in failed');
   const session=parseSessionData((await client.request('/api/auth/get-session?disableCookieCache=true')).data);ensure(session.user&&session.session,'Live session required');users.push(session.user.id);
  }
  const [a,b]=clients;const [userA,userB]=users as [string,string];ensure(userA!==userB,'Independent users required');
  const guest=new Client(base),sql=neon(DATABASE_URL);
  phase='boundaries';
  ensure((await guest.request('/api/typing/me')).status===401,'Guest private data');
  ensure((await a.request('/api/typing/profile',{name:'test',visible:true},'https://untrusted.example.invalid')).status===403,'Origin protection');
  ensure((await a.request('/api/typing/finish',{id:'-'.repeat(36),keys:'a',times:[1],elapsed:1})).status===400,'Malformed UUID');
  ensure((await a.request('/api/typing/start',{locale:'de',mode:'ranked',lesson:'free'})).status===400,'Unknown/unrankable lesson');
  ensure((await guest.request('/api/typing/leaderboard?period=invalid')).status===400,'Leaderboard input');
  const name='Test '+randomUUID().slice(0,8),nameB='Test '+randomUUID().slice(0,8);
  ensure((await a.request('/api/typing/profile',{name,visible:false})).status===200,'Private profile');
  ensure((await b.request('/api/typing/profile',{name,visible:false})).status===409,'Duplicate display name must be explained');
  ensure((await b.request('/api/typing/profile',{name:nameB,visible:false,userId:userA})).status===200,'Own profile despite forged identity');
  phase='restricted role and RLS';
  const roles=await sql`SELECT rolsuper,rolbypassrls FROM pg_roles WHERE rolname=current_user`;
  ensure(roles[0]?.rolsuper===false&&roles[0]?.rolbypassrls===false,'No RLS bypass');
  for(const table of ['typing_profiles','typing_runs']){
   ensure((await sql.query(`SELECT user_id FROM public.${table}`)).length===0,'No context sees no data');
   const [,own]=await sql.transaction([sql`SELECT set_config('app.user_id',${userA},true)`,sql.query(`SELECT user_id FROM public.${table}`)]);
   ensure(own.every(row=>row.user_id===userA),'RLS own rows');
   const [,foreign]=await sql.transaction([sql`SELECT set_config('app.user_id',${userA},true)`,sql.query(`UPDATE public.${table} SET user_id=$1 WHERE user_id=$1 RETURNING user_id`,[userB])]);
   ensure(foreign.length===0,'Foreign update is invisible');
  }
  let denied=false;
  try{await sql.transaction([sql`SELECT set_config('app.user_id',${userA},true)`,sql`INSERT INTO public.typing_profiles(user_id,display_name) VALUES(${userB},'foreign')`]);}catch(error){denied=!!error&&typeof error==='object'&&'code'in error&&error.code==='42501';}
  ensure(denied,'Foreign insert denied');
  phase='concurrent start, live 60-second window';
  const starts=await Promise.all([a.request('/api/typing/start',{mode:'ranked',locale:'de',lesson:'text'}),a.request('/api/typing/start',{mode:'ranked',locale:'de',lesson:'text'})]);
  ensure(starts.map(x=>x.status).sort().join(',')==='200,429','Concurrent starts rate limited');
  const startA=record(starts.find(x=>x.status===200)!.data);
  const startBResponse=await b.request('/api/typing/start',{mode:'ranked',locale:'en',lesson:'text'});
  ensure(startBResponse.status===200,'Start B');const startB=record(startBResponse.data);
  ensure(startA.text===rankedText('de')&&startB.text===rankedText('en'),'Server chooses the common text');
  const keys=rankedText('de').slice(0,100),times=Array.from(keys,(_,i)=>500+i*400);
  const submission={id:startA.id,keys,times,elapsed:60000};
  ensure((await b.request('/api/typing/finish',submission)).status===404,'Foreign run ID hidden');
  ensure((await a.request('/api/typing/finish',submission)).status===422,'Early finish rejected');
  ensure((await a.request('/api/typing/finish',{...submission,times:[-1,...times.slice(1)]})).status===422,'Invalid replay rejected');
  console.log('PASS: two sessions, origin/UUID/profile boundaries, RLS, atomic start and early/foreign finish. Waiting for the real server window.');
  await setTimeout(61000);
  phase='ranked finish, replay attacks and visibility';
  const finishes=await Promise.all([a.request('/api/typing/finish',{...submission,userId:userB,wpm:9999}),a.request('/api/typing/finish',submission)]);
  ensure(finishes.map(x=>x.status).sort().join(',')==='200,409','Exactly one concurrent finish');
  const saved=record(finishes.find(x=>x.status===200)!.data),score=record(saved.score);
  ensure(saved.ranked===true&&score.wpm===20&&score.accuracy===100,'Server recomputes score');
  const keysB=rankedText('en').slice(0,100);
  ensure((await b.request('/api/typing/finish',{id:startB.id,keys:keysB,times:times.map(()=>500),elapsed:60000})).status===422,'Burst replay rejected');
  ensure((await b.request('/api/typing/finish',{id:startB.id,keys:keysB,times,elapsed:60000})).status===200,'Independent B result');
  ensure((await a.request('/api/typing/finish',submission)).status===409,'Duplicate replay rejected');
  const privateBoard=items((await guest.request('/api/typing/leaderboard?locale=de&period=all')).data);
  ensure(!privateBoard.some(row=>row.display_name===name),'Private opt-in default');
  ensure((await a.request('/api/typing/profile',{name,visible:true})).status===200,'Opt-in');
  for(const period of ['day','week','month','all'])for(const metric of ['wpm','kpm','accuracy']){
   const response=await guest.request(`/api/typing/leaderboard?locale=de&period=${period}&metric=${metric}`);ensure(response.status===200,'Public board');
   const board=items(response.data),own=board.filter(row=>row.display_name===name);
   ensure(own.length===1&&own[0]!.wpm===20,'Best visible result once');
   ensure(board.every(row=>Object.keys(row).sort().join(',')==='accuracy,display_name,kpm,wpm'),'Only public projection');
   ensure(!board.some(row=>row.display_name===nameB),'Language/private separation');
  }
  ensure((await a.request('/api/typing/profile',{name,visible:false})).status===200,'Opt-out');
  ensure(!items((await guest.request('/api/typing/leaderboard?locale=de&period=all')).data).some(row=>row.display_name===name),'Opt-out immediate');
  const me=record((await a.request('/api/typing/me')).data);ensure(Array.isArray(me.runs)&&me.runs.length>0,'Account history');
  phase='sign-out revocation';const stale=new Client(base);stale.cookies=new Map(a.cookies);
  ensure((await a.request('/api/auth/sign-out',{})).status===200,'Sign out');
  ensure((await stale.request('/api/typing/me')).status===401,'Revoked session');
  console.log('PASS: real 60-second DE/EN runs; server scores; duplicate/foreign/early/burst rejection; two-account RLS; all leaderboard filters, fixed projection, opt-in/out and revocation. Generated traces test protocol, not human typing.');
 }finally{
  for(const client of clients){await client.request('/api/typing/profile',{name:'',visible:false}).catch(()=>undefined);await client.request('/api/auth/sign-out',{}).catch(()=>undefined);}
 }
}
try{await main();}catch{console.error(`FAIL: live typing checks at ${phase}. No credentials or payloads logged.`);process.exitCode=1;}
