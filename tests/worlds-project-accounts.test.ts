import assert from 'node:assert/strict';
import {execFile,execFileSync} from 'node:child_process';
import {randomUUID} from 'node:crypto';
import {readFile,readdir} from 'node:fs/promises';
import {test} from 'node:test';
import {promisify} from 'node:util';

test('PostgreSQL preserves native progress and allocates one scoped profile under concurrent creation',
 {skip:process.env.IT_WORLDS_SQL_TEST!=='1'},async()=>{
 assert.equal(process.env.PGHOST,'127.0.0.1','Use an explicit isolated loopback SQL server');
 const base=process.env.PGDATABASE??'postgres';
 const db='it_worlds_profiles_'+randomUUID().replaceAll('-','');
 const psql=['-X','-q','-t','-A','-v','ON_ERROR_STOP=1'];
 const run=(schema:string,statement:string)=>execFileSync('psql',[...psql,'-d',schema],{input:statement,encoding:'utf8'}).trim();
 const runAsync=promisify(execFile);
 const query=async(statement:string)=>(await runAsync('psql',[...psql,'-d',db,'-c',statement])).stdout.trim();
 const old='10000000-0000-4000-8000-000000000001';
 const later='10000000-0000-4000-8000-000000000002';
 const absent='10000000-0000-4000-8000-000000000003';
 const issuer='https://test-issuer.invalid';
 const proof='synthetic-csrf';
 const create=(subject:string,binding:string,csrf=proof)=>
  `SET ROLE it_worlds_app; SELECT public.worlds_create_project_account('${issuer}','${subject}','${binding}','${csrf}');`;
 const roleCreated=run(base,"SELECT 1 FROM pg_roles WHERE rolname='it_worlds_app'")==='';
 if(roleCreated)run(base,'CREATE ROLE it_worlds_app NOLOGIN NOSUPERUSER NOBYPASSRLS');
 assert.equal(run(base,"SELECT NOT rolsuper AND NOT rolbypassrls FROM pg_roles WHERE rolname='it_worlds_app'"),'t');
 let databaseCreated=false;
 try{
  run(base,'CREATE DATABASE '+db);databaseCreated=true;
  run(db,'CREATE SCHEMA neon_auth; CREATE TABLE neon_auth."user"(id uuid PRIMARY KEY,banned boolean,"banExpires" timestamptz);');
  const directory=new URL('../migrations/',import.meta.url);
  const names=(await readdir(directory)).filter(name=>/^00[1-8]_/.test(name)).sort();
  assert.equal(names.length,8);
  for(const name of names.slice(0,7))run(db,'BEGIN; '+await readFile(new URL(name,directory),'utf8')+'\nCOMMIT;');
  run(db,`INSERT INTO neon_auth."user"(id) VALUES ('${old}');
   INSERT INTO public.learning_progress(user_id,kind,content_id,completed) VALUES ('${old}','lesson','legacy',true);
   INSERT INTO public.typing_profiles(user_id,display_name) VALUES ('${old}','Legacy');
   INSERT INTO public.typing_runs(user_id,mode,locale,lesson,target) VALUES ('${old}','practice','en','first','abc');
   INSERT INTO public.worlds_identity_links(issuer,subject,local_user_id) VALUES ('${issuer}','prior','${old}');`);
  const fingerprint=()=>run(db,`SELECT md5((SELECT to_jsonb(p)::text FROM public.learning_progress p WHERE p.user_id='${old}')
    ||(SELECT to_jsonb(p)::text FROM public.typing_profiles p WHERE p.user_id='${old}')
    ||(SELECT to_jsonb(r)::text FROM public.typing_runs r WHERE r.user_id='${old}')
    ||(SELECT to_jsonb(l)::text FROM public.worlds_identity_links l WHERE l.local_user_id='${old}'));`);
  const original=fingerprint();assert.match(original,/^[a-f0-9]{32}$/);
  const migration=await readFile(new URL(names[7],directory),'utf8');
  run(db,`BEGIN;
   ALTER TABLE public.learning_progress DROP CONSTRAINT learning_progress_user_id_fkey;
   ALTER TABLE public.typing_profiles DROP CONSTRAINT typing_profiles_user_id_fkey;
   ALTER TABLE public.typing_runs DROP CONSTRAINT typing_runs_user_id_fkey;
   INSERT INTO public.learning_progress(user_id,kind,content_id,completed) VALUES ('${absent}','lesson','recovery-history',true);
   ${migration}
   DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.learning_progress WHERE user_id='${absent}' AND completed)
      OR EXISTS (SELECT 1 FROM public.it_project_accounts WHERE id='${absent}')
      OR (SELECT count(*) FROM pg_constraint WHERE contype='f' AND conrelid IN (
       'public.learning_progress'::regclass,'public.typing_profiles'::regclass,'public.typing_runs'::regclass
      ))<>0
    THEN RAISE EXCEPTION 'Changed production recovery history'; END IF;
   END $$;
   ROLLBACK;`);
  assert.equal(run(db,"SELECT to_regclass('public.it_project_accounts') IS NULL"),'t');
  assert.equal(fingerprint(),original);
  run(db,'ALTER TABLE public.learning_progress RENAME CONSTRAINT learning_progress_user_id_fkey TO fixture_native_owner_fk;');
  run(db,'BEGIN; '+migration+'\nCOMMIT;');
  assert.equal(fingerprint(),original);
  assert.equal(run(db,`SELECT public.worlds_account_active('${old}')`),'t');
  run(db,`UPDATE neon_auth."user" SET banned=true WHERE id='${old}'`);
  assert.equal(run(db,`SELECT public.worlds_account_active('${old}')`),'f');

  run(db,`INSERT INTO public.worlds_auth_sessions(id,issuer,subject,payload,expires)
   SELECT id,'${issuer}',subject,'{"csrf":"${proof}","authenticatedAt":1000}'::jsonb,9999999999999
   FROM (VALUES ('one','new'),('two','new'),('revoked','blocked'),('legacy','prior')) AS fixtures(id,subject);
   INSERT INTO public.worlds_session_revocations VALUES ('${issuer}','blocked',1000);`);
  assert.equal(await query(create('new','one','incorrect')),'f');
  assert.equal(await query(create('alien','one')),'f');
  assert.equal(await query(create('blocked','revoked')),'f');
  assert.equal(await query(create('prior','legacy')),'f');
  assert.deepEqual((await Promise.all([query(create('new','one')),query(create('new','two'))])).sort(),['f','t']);
  const created=run(db,`SELECT local_user_id FROM public.worlds_identity_links WHERE issuer='${issuer}' AND subject='new'`);
  assert.match(created,/^[a-f0-9-]{36}$/);
  assert.equal(run(db,`SELECT count(*) FROM public.it_project_accounts WHERE legacy_user_id IS NULL`),'1');
  assert.equal(run(db,`SELECT count(*) FROM public.worlds_link_audit WHERE subject='new' AND local_user_id='${created}'`),'1');
  assert.equal(run(db,`SELECT public.worlds_account_active('${created}') AND NOT EXISTS
    (SELECT 1 FROM neon_auth."user" WHERE id='${created}')`),'t');

  const asOwner=(id:string,statement:string)=>`SET ROLE it_worlds_app; SET app.user_id='${id}'; ${statement}`;
  assert.equal(run(db,asOwner(created,`SELECT public.worlds_account_active('${created}')`)),'t');
  run(db,asOwner(created,`INSERT INTO public.learning_progress(user_id,kind,content_id) VALUES ('${created}','lesson','worlds');`));
  run(db,asOwner(created,`INSERT INTO public.typing_profiles(user_id,display_name) VALUES ('${created}','Worlds');
   INSERT INTO public.typing_runs(user_id,mode,locale,lesson,target) VALUES ('${created}','practice','en','worlds','abc');`));
  assert.equal(run(db,asOwner(created,'SELECT content_id FROM public.learning_progress')),'worlds');
  assert.equal(run(db,asOwner(created,'SELECT display_name FROM public.typing_profiles')),'Worlds');
  assert.equal(run(db,asOwner(created,'SELECT lesson FROM public.typing_runs')),'worlds');
  assert.equal(run(db,asOwner(old,'SELECT content_id FROM public.learning_progress')),'legacy');
  await assert.rejects(query(asOwner(absent,`INSERT INTO public.learning_progress(user_id,kind,content_id) VALUES ('${absent}','lesson','unowned');`)),
   /foreign key constraint/);
  await assert.rejects(query("SET ROLE it_worlds_app; SELECT legacy_user_id FROM public.it_project_accounts;"),/permission denied/);

  // An earlier standalone Worker can still save progress for a newly
  // registered native learner. Managed Auth does not need its own trigger.
  run(db,`INSERT INTO neon_auth."user"(id) VALUES ('${later}');`);
  run(db,asOwner(later,`INSERT INTO public.learning_progress(user_id,kind,content_id) VALUES ('${later}','lesson','after');`));
  assert.equal(run(db,`SELECT legacy_user_id FROM public.it_project_accounts WHERE id='${later}'`),later);
  run(db,`DELETE FROM neon_auth."user" WHERE id='${old}';`);
  assert.equal(run(db,`SELECT (SELECT count(*)::text FROM public.typing_runs WHERE user_id='${old}')
    ||(SELECT count(*) FROM public.typing_profiles WHERE user_id='${old}')
    ||(SELECT count(*) FROM public.learning_progress WHERE user_id='${old}')
    ||(SELECT count(*) FROM public.worlds_identity_links WHERE subject='prior')`),'0000');
  assert.equal(run(db,asOwner(created,'SELECT content_id FROM public.learning_progress')),'worlds');
 }finally{
  if(databaseCreated)run(base,'DROP DATABASE '+db);
  if(roleCreated)run(base,'DROP ROLE it_worlds_app');
 }
});
