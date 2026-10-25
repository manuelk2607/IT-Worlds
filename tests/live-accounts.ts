// Explicit integration test. Never targets production or prints credentials/session data.
import {randomUUID,randomBytes} from 'node:crypto';
import {readFile,writeFile} from 'node:fs/promises';
import {neon} from '@neondatabase/serverless';
import {parseSessionData} from '@neondatabase/auth/server';
import {questions} from '../src/data/content.ts';
import {lessonIds} from '../src/lib/progress.ts';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
type Credentials={name:string;email:string;password:string};
let phase='configuration';
function ensure(value:unknown,label:string):asserts value {if(!value)throw new Error(label);}
export class Client{
 cookies=new Map<string,string>();
 readonly base:URL;
 constructor(base:URL){this.base=base;}
 async request(path:string,body?:unknown,origin=this.base.origin){
  const headers=new Headers({origin});
  if(this.cookies.size)headers.set('cookie',[...this.cookies].map(([name,value])=>`${name}=${value}`).join('; '));
  if(body!==undefined)headers.set('content-type','application/json');
  const response=await fetch(new URL(path,this.base),{method:body===undefined?'GET':'POST',headers,body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(20000)});
  for(const cookie of response.headers.getSetCookie()){
   const pair=cookie.split(';')[0]!;const split=pair.indexOf('=');const name=pair.slice(0,split),value=pair.slice(split+1);
   if(value)this.cookies.set(name,value);else this.cookies.delete(name);
  }
  return {status:response.status,data:await response.json() as unknown};
 }
}
async function main(){
 const {IT_WORLDS_TEST_BASE_URL,IT_WORLDS_TEST_CREDENTIALS,IT_WORLDS_TEST_BRANCH,DATABASE_URL,NEON_AUTH_BASE_URL}=process.env;
 ensure(IT_WORLDS_TEST_BRANCH==='development'&&IT_WORLDS_TEST_BASE_URL&&IT_WORLDS_TEST_CREDENTIALS&&DATABASE_URL&&NEON_AUTH_BASE_URL,'Development-only configuration required');
 const base=new URL(IT_WORLDS_TEST_BASE_URL);
 ensure(base.hostname==='localhost'&&base.protocol==='http:','Localhost HTTP test server required; Neon does not treat numeric loopback as localhost');
 ensure(new URL(NEON_AUTH_BASE_URL).hostname.startsWith('ep-jolly-darkness-ba9m7fit.'),'The existing development Auth branch is required');
 ensure(new URL(DATABASE_URL).hostname.startsWith('ep-jolly-darkness-ba9m7fit-pooler.'),'The restricted development database is required');
 let credentials:Credentials[];
 try{credentials=JSON.parse(await readFile(IT_WORLDS_TEST_CREDENTIALS,'utf8')) as Credentials[];}
 catch(error){
  if(!(error instanceof Error&&'code' in error&&error.code==='ENOENT'))throw error;
  credentials=['A','B'].map(label=>({name:`IT-Worlds test only ${label}`,email:`it-worlds-e2e-${randomUUID()}@example.invalid`,password:randomBytes(32).toString('base64url')}));
  await writeFile(IT_WORLDS_TEST_CREDENTIALS,JSON.stringify(credentials),{mode:0o600,flag:'wx'});
 }
 ensure(Array.isArray(credentials)&&credentials.length===2&&credentials.every(value=>value.name.startsWith('IT-Worlds test only ')&&value.email.endsWith('@example.invalid')&&value.password.length>=32),'Use only generated disposable test credentials');
 const clients=[new Client(base),new Client(base)];const users:string[]=[];
 for(const [index,client]of clients.entries()){
  phase=`test account ${index+1} sign-in/registration`;
  const account=credentials[index]!;
  let result=await client.request('/api/auth/sign-in/email',{email:account.email,password:account.password});
  if(result.status!==200)result=await client.request('/api/auth/sign-up/email',account);
  ensure(result.status===200,`Authentication HTTP ${result.status}`);
  const session=await client.request('/api/auth/get-session?disableCookieCache=true');
  const parsed=parseSessionData(session.data);ensure(session.status===200&&parsed.user&&parsed.session,'Live session required');users.push(parsed.user.id);
 }
 const [a,b]=clients as [Client,Client];const [userA,userB]=users as [string,string];ensure(userA!==userB,'Sessions must be independent');
 phase='incorrect password';
 ensure((await new Client(base).request('/api/auth/sign-in/email',{email:credentials[0]!.email,password:randomBytes(32).toString('base64url')})).status===401,'Incorrect password must fail');
 phase='guest and request-boundary checks';
 ensure((await new Client(base).request('/api/progress')).status===401,'Guest progress must be protected');
 const lessonA=lessonIds[0]!,lessonB=lessonIds[1]!;
 const mark=(contentId:string,completed:boolean)=>({kind:'lesson',contentId,completed});
 ensure((await a.request('/api/progress',mark(lessonA,true),'https://untrusted.example.invalid')).status===403,'Cross-origin mutation must fail');
 ensure((await a.request('/api/progress',mark('missing-course-id',true))).status===400,'Unknown content must fail');
 phase='independent saved progress and forged user identity';
 ensure((await a.request('/api/progress',mark(lessonA,true))).status===200,'Save account A');
 ensure((await b.request('/api/progress',mark(lessonB,true))).status===200,'Save account B');
 const sql=neon(DATABASE_URL);
 const items=async(client:Client)=>{
  const response=await client.request('/api/progress');ensure(response.status===200&&response.data&&typeof response.data==='object'&&'items'in response.data&&Array.isArray(response.data.items),'Load saved progress');
  return response.data.items as {kind:string;contentId:string;completed:boolean;solved:boolean}[];
 };
 ensure((await items(a)).some(item=>item.contentId===lessonA&&item.completed),'Account A restores its progress');
 ensure(!(await items(a)).some(item=>item.contentId===lessonB&&item.completed),'Account A cannot read B progress');
 ensure(!(await items(b)).some(item=>item.contentId===lessonA&&item.completed),'Account B cannot read A progress');
 ensure((await a.request('/api/progress',{...mark(lessonA,false),userId:userB})).status===200,'Forged client identity is ignored');
 const [,foreign]=await sql.transaction([sql`SELECT set_config('app.user_id',${userB},true)`,sql`SELECT completed FROM public.learning_progress WHERE user_id=${userB} AND content_id=${lessonA}`]);
 ensure(foreign.length===0||foreign.every(row=>row.completed===false),'Forged identity did not write another account');
 phase='wrong/correct/manual/unmarked quiz states';
 const question=questions[0]!;
 const answer=async(selectedOption:number)=>{
  const result=await a.request('/api/progress',{kind:'question',contentId:question.id,completed:true,selectedOption});ensure(result.status===200,'Save quiz answer');
  return (await items(a)).find(item=>item.kind==='question'&&item.contentId===question.id)!;
 };
 await a.request('/api/progress',{kind:'question',contentId:question.id,completed:false});
 ensure(!(await answer((question.answer+1)%question.options.length)).solved,'Wrong answer is not solved');
 ensure((await answer(question.answer)).solved,'Correct answer is solved');
 ensure((await answer((question.answer+1)%question.options.length)).solved,'A prior correct answer is retained until unmarked');
 await a.request('/api/progress',{kind:'question',contentId:question.id,completed:false});
 ensure(!(await items(a)).find(item=>item.contentId===question.id)!.solved,'Removing the mark clears solved state');
 await a.request('/api/progress',{kind:'question',contentId:question.id,completed:true});
 ensure(!(await items(a)).find(item=>item.contentId===question.id)!.solved,'A manual mark alone does not establish correctness');
 phase='direct restricted-role and RLS checks';
 const roles=await sql`SELECT rolsuper,rolbypassrls FROM pg_roles WHERE rolname=current_user`;
 ensure(roles.length===1&&roles[0]!.rolsuper===false&&roles[0]!.rolbypassrls===false,'Runtime role must not bypass RLS');
 ensure((await sql`SELECT 1 FROM public.learning_progress`).length===0,'No context exposes no progress');
 const [,own]=await sql.transaction([sql`SELECT set_config('app.user_id',${userA},true)`,sql`SELECT user_id FROM public.learning_progress`]);
 ensure(own.length>0&&own.every(row=>row.user_id===userA),'Context A exposes only account A');
 async function denied(run:()=>Promise<unknown>){try{await run();return false;}catch(error){return !!error&&typeof error==='object'&&'code'in error&&error.code==='42501';}}
 ensure(await denied(()=>sql.transaction([sql`SELECT set_config('app.user_id',${userA},true)`,sql`INSERT INTO public.learning_progress(user_id,kind,content_id,completed,solved) VALUES(${userB},'lesson','rls-test-only',true,false)`])),'A foreign insert must be denied by RLS');
 ensure(await denied(()=>sql`SELECT 1 FROM neon_auth."user" LIMIT 0`),'Runtime role cannot read Auth users');
 phase='session restoration, sign-out and server-side revocation';
 const restored=new Client(base);restored.cookies=new Map(a.cookies);ensure((await restored.request('/api/progress')).status===200,'A restored session remains valid');
 const stale=new Client(base);stale.cookies=new Map(a.cookies);
 ensure((await a.request('/api/auth/sign-out',{})).status===200,'Sign out account A');
 ensure((await a.request('/api/progress')).status===401,'Signed-out client has no progress access');
 ensure((await stale.request('/api/progress')).status===401,'Revoked session cannot reuse old cookies');
 ensure((await b.request('/api/progress')).status===200,'Account B remains signed in independently');
 await b.request('/api/auth/sign-out',{});
 console.log('PASS: two real development accounts; independent sessions/progress; wrong/correct/manual/reset states; origin/content checks; restricted role and RLS; restoration, sign-out and revoked cookies. Credentials remain only in the private local file.');
}
if(import.meta.url===pathToFileURL(resolve(process.argv[1]??'')).href){
 try{await main();}catch{console.error(`FAIL: live account checks at ${phase}. No credentials or response payloads logged.`);process.exitCode=1;}
}
