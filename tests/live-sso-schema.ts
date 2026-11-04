// Explicit database-only pilot test. Fixtures roll back in a PL/pgSQL subtransaction.
import assert from 'node:assert/strict';
import {neon} from '@neondatabase/serverless';
import {randomUUID} from 'node:crypto';

const connection=process.env.DATABASE_URL_UNPOOLED;
assert.equal(process.env.IT_WORLDS_SSO_TEST_BRANCH,'br-little-base-baqt6cy6','Explicit isolated test branch required');
assert.ok(connection,'Owner URL required');
assert.equal(new URL(connection).hostname,'ep-falling-fog-bad7v2ou.c-8.eu-central-1.aws.neon.tech','Never run against production');
const sql=neon(connection);
const runtimeConnection=process.env.DATABASE_URL;
assert.ok(runtimeConnection,'Restricted runtime URL required');
assert.equal(new URL(runtimeConnection).hostname,new URL(connection).hostname);
assert.equal(new URL(runtimeConnection).username,'it_worlds_app');
const runtime=neon(runtimeConnection);
const roles=await runtime`SELECT rolsuper,rolbypassrls FROM pg_roles WHERE rolname=current_user`;
assert.equal(roles[0]?.rolsuper,false);assert.equal(roles[0]?.rolbypassrls,false);
const before=await sql`SELECT count(*)::int AS n FROM public.worlds_identity_links`;
const a=randomUUID(),b=randomUUID();
try {
await sql.transaction([
 sql`INSERT INTO neon_auth."user"(id,name,email,"emailVerified",role) VALUES(${a},'SSO schema fixture A',${a+'@example.invalid'},true,'user'),(${b},'SSO schema fixture B',${b+'@example.invalid'},true,'user')`,
 sql`INSERT INTO public.learning_progress(user_id,kind,content_id,completed) VALUES(${a},'lesson','sso-isolation-test-a',true),(${b},'lesson','sso-isolation-test-b',true)`,
]);
await runtime.query(`DO $$
DECLARE a uuid := '${a}'; b uuid := '${b}'; n integer; accepted boolean;
BEGIN
 BEGIN
  PERFORM set_config('app.user_id',a::text,true),set_config('app.worlds_issuer','https://identity.example.invalid',true),
   set_config('app.worlds_subject','subject-a',true),set_config('app.worlds_session','session-a',true);
  INSERT INTO public.worlds_link_proofs VALUES ('proof-a','https://identity.example.invalid','subject-a',a,'session-a',now()+interval '5 minutes');
  WITH claimed AS (
   DELETE FROM public.worlds_link_proofs WHERE proof_hash='proof-a' AND session_hash='session-a' AND expires_at>now()
   RETURNING issuer,subject,local_user_id
  ), inserted AS (
   INSERT INTO public.worlds_identity_links(issuer,subject,local_user_id) SELECT issuer,subject,local_user_id FROM claimed
   RETURNING issuer,subject,local_user_id
  ), audited AS (
   INSERT INTO public.worlds_link_audit(issuer,subject,local_user_id,event)
   SELECT issuer,subject,local_user_id,'linked' FROM inserted RETURNING id
  ) SELECT EXISTS(SELECT 1 FROM audited) INTO accepted;
  IF NOT accepted THEN RAISE EXCEPTION 'Atomic link failed'; END IF;
  SELECT count(*) INTO n FROM public.worlds_identity_links WHERE local_user_id=a;
  IF n<>1 THEN RAISE EXCEPTION 'Historical owner mapping missing'; END IF;
  SELECT count(*) INTO n FROM public.worlds_link_proofs WHERE proof_hash='proof-a';
  IF n<>0 THEN RAISE EXCEPTION 'Consumed proof remains reusable'; END IF;
  INSERT INTO public.worlds_link_proofs VALUES('proof-conflict','https://identity.example.invalid','subject-a',a,'session-a',now()+interval '5 minutes');
  PERFORM set_config('app.worlds_session','wrong-session',true);
  DELETE FROM public.worlds_link_proofs WHERE proof_hash='proof-conflict';
  GET DIAGNOSTICS n=ROW_COUNT;
  IF n<>0 THEN RAISE EXCEPTION 'Foreign session consumed proof'; END IF;
  PERFORM set_config('app.worlds_session','session-a',true);
  BEGIN
   WITH claimed AS (DELETE FROM public.worlds_link_proofs WHERE proof_hash='proof-conflict' RETURNING issuer,subject,local_user_id)
   INSERT INTO public.worlds_identity_links(issuer,subject,local_user_id) SELECT issuer,subject,local_user_id FROM claimed;
   RAISE EXCEPTION 'Existing mapping overwritten';
  EXCEPTION WHEN unique_violation THEN NULL; END;
  SELECT count(*) INTO n FROM public.worlds_link_proofs WHERE proof_hash='proof-conflict';
  IF n<>1 THEN RAISE EXCEPTION 'Conflict failed to roll back proof consumption'; END IF;
  PERFORM set_config('app.worlds_issuer','https://other-issuer.example.invalid',true);
  SELECT count(*) INTO n FROM public.worlds_identity_links;
  IF n<>0 THEN RAISE EXCEPTION 'Foreign issuer mapping exposed'; END IF;
  PERFORM set_config('app.worlds_issuer','https://identity.example.invalid',true);
  SELECT count(*) INTO n FROM public.learning_progress WHERE user_id=b;
  IF n<>0 THEN RAISE EXCEPTION 'Foreign progress exposed'; END IF;
  BEGIN
   INSERT INTO public.worlds_identity_links VALUES('https://identity.example.invalid','subject-a',b,now());
   RAISE EXCEPTION 'Foreign account write accepted';
  EXCEPTION WHEN insufficient_privilege OR unique_violation THEN NULL; END;
  BEGIN
   UPDATE public.worlds_identity_links SET local_user_id=b;
   RAISE EXCEPTION 'Mapping overwrite accepted';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  PERFORM set_config('app.worlds_subject','subject-b',true),set_config('app.worlds_session','session-b',true),set_config('app.user_id',b::text,true);
  SELECT count(*) INTO n FROM public.worlds_identity_links;
  IF n<>0 THEN RAISE EXCEPTION 'Foreign identity mapping exposed'; END IF;
  PERFORM set_config('app.worlds_issuer','',true),set_config('app.worlds_subject','',true),set_config('app.user_id','',true);
  SELECT count(*) INTO n FROM public.learning_progress;
  IF n<>0 THEN RAISE EXCEPTION 'Anonymous progress exposed'; END IF;
  SELECT count(*) INTO n FROM public.worlds_identity_links;
  IF n<>0 THEN RAISE EXCEPTION 'Anonymous mapping exposed'; END IF;
  RAISE SQLSTATE 'Z0001' USING MESSAGE='Successful test: roll back fixtures';
 EXCEPTION WHEN SQLSTATE 'Z0001' THEN NULL;
 END;
END $$`);
assert.equal((await sql`SELECT count(*)::int AS n FROM neon_auth."user" WHERE id IN (${a},${b}) AND role='user'`)[0]?.n,2);
const after=await sql`SELECT count(*)::int AS n FROM public.worlds_identity_links`;
assert.deepEqual(after,before);
console.log('PASS: real Neon atomic mapping, historical UUID, role preservation, issuer/account/session isolation, proof consumption and conflict rollback, anonymous RLS, immutable mapping, fixture rollback.');
} finally {
 await sql.transaction([
  sql`DELETE FROM public.learning_progress WHERE user_id IN (${a},${b})`,
  sql`DELETE FROM neon_auth."user" WHERE id IN (${a},${b})`,
 ]);
}
