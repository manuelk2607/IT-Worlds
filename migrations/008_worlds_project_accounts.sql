-- Keep the historical UUID and its existing deletion semantics for native accounts.
CREATE TABLE public.it_project_accounts (
 id uuid PRIMARY KEY,
 legacy_user_id uuid UNIQUE REFERENCES neon_auth."user"(id) ON DELETE CASCADE,
 CHECK (legacy_user_id IS NULL OR id = legacy_user_id)
);
-- statement
INSERT INTO public.it_project_accounts(id,legacy_user_id)
SELECT id,id FROM neon_auth."user";
-- statement
ALTER TABLE public.learning_progress DROP CONSTRAINT learning_progress_user_id_fkey,
 ADD CONSTRAINT learning_progress_user_id_fkey FOREIGN KEY(user_id)
 REFERENCES public.it_project_accounts(id) ON DELETE CASCADE;
-- statement
ALTER TABLE public.typing_profiles DROP CONSTRAINT typing_profiles_user_id_fkey,
 ADD CONSTRAINT typing_profiles_user_id_fkey FOREIGN KEY(user_id)
 REFERENCES public.it_project_accounts(id) ON DELETE CASCADE;
-- statement
ALTER TABLE public.typing_runs DROP CONSTRAINT typing_runs_user_id_fkey,
 ADD CONSTRAINT typing_runs_user_id_fkey FOREIGN KEY(user_id)
 REFERENCES public.it_project_accounts(id) ON DELETE CASCADE;
-- statement
ALTER TABLE public.worlds_identity_links DROP CONSTRAINT worlds_identity_links_local_user_id_fkey,
 ADD CONSTRAINT worlds_identity_links_local_user_id_fkey FOREIGN KEY(local_user_id)
 REFERENCES public.it_project_accounts(id) ON DELETE CASCADE;
-- statement
ALTER TABLE public.it_project_accounts ENABLE ROW LEVEL SECURITY;
-- statement
REVOKE ALL ON public.it_project_accounts FROM PUBLIC;
-- statement
GRANT SELECT(id),INSERT(id) ON public.it_project_accounts TO it_worlds_app;
-- statement
CREATE POLICY own_project_account_read ON public.it_project_accounts FOR SELECT TO it_worlds_app
 USING (id=NULLIF(current_setting('app.user_id',true),'')::uuid);
-- statement
CREATE POLICY own_project_account_create ON public.it_project_accounts FOR INSERT TO it_worlds_app
 WITH CHECK (id=NULLIF(current_setting('app.user_id',true),'')::uuid AND legacy_user_id IS NULL);
-- statement
-- Native-only builds may still register a user. Preserve their first write if
-- the Worker is rolled back, without modifying the managed Auth schema.
CREATE FUNCTION public.worlds_register_native_owner() RETURNS trigger
 LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
 DECLARE owner_id uuid := (to_jsonb(NEW)->>TG_ARGV[0])::uuid;
 BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.it_project_accounts WHERE id=owner_id) THEN
   INSERT INTO public.it_project_accounts(id,legacy_user_id)
   SELECT id,id FROM neon_auth."user" WHERE id=owner_id ON CONFLICT(id) DO NOTHING;
  END IF;
  RETURN NEW;
 END;
 $$;
-- statement
REVOKE ALL ON FUNCTION public.worlds_register_native_owner() FROM PUBLIC;
-- statement
CREATE TRIGGER ensure_learning_progress_owner BEFORE INSERT OR UPDATE OF user_id ON public.learning_progress
 FOR EACH ROW EXECUTE FUNCTION public.worlds_register_native_owner('user_id');
-- statement
CREATE TRIGGER ensure_typing_profile_owner BEFORE INSERT OR UPDATE OF user_id ON public.typing_profiles
 FOR EACH ROW EXECUTE FUNCTION public.worlds_register_native_owner('user_id');
-- statement
CREATE TRIGGER ensure_typing_run_owner BEFORE INSERT OR UPDATE OF user_id ON public.typing_runs
 FOR EACH ROW EXECUTE FUNCTION public.worlds_register_native_owner('user_id');
-- statement
CREATE TRIGGER ensure_worlds_link_owner BEFORE INSERT OR UPDATE OF local_user_id ON public.worlds_identity_links
 FOR EACH ROW EXECUTE FUNCTION public.worlds_register_native_owner('local_user_id');
-- statement
-- Also used by the previous Worker version, which can read newly created profiles.
CREATE OR REPLACE FUNCTION public.worlds_account_active(account_id uuid) RETURNS boolean
 LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT EXISTS (SELECT 1 FROM public.it_project_accounts WHERE id=account_id AND legacy_user_id IS NULL)
 OR EXISTS (SELECT 1 FROM neon_auth."user" u WHERE u.id=account_id
  AND (u.banned IS DISTINCT FROM true OR u."banExpires"<now()));
 $$;
-- statement
CREATE FUNCTION public.worlds_create_project_account(p_issuer text,p_subject text,p_session text,p_csrf text)
 RETURNS boolean LANGUAGE plpgsql SET search_path='' AS $$
 DECLARE profile_id uuid := gen_random_uuid();
 BEGIN
  IF NOT EXISTS (
   SELECT 1 FROM public.worlds_auth_sessions s
   WHERE s.id=p_session AND s.issuer=p_issuer AND s.subject=p_subject
     AND s.payload->>'csrf'=p_csrf AND s.expires>extract(epoch FROM now())*1000
     AND NOT EXISTS (
      SELECT 1 FROM public.worlds_session_revocations r
      WHERE r.issuer=s.issuer AND r.subject=s.subject
        AND r.revoked_through>=coalesce((s.payload->>'authenticatedAt')::bigint,0)
     )
  ) THEN RETURN false; END IF;
  PERFORM set_config('app.worlds_issuer',p_issuer,true);
  PERFORM set_config('app.worlds_subject',p_subject,true);
  PERFORM set_config('app.user_id',profile_id::text,true);
  IF EXISTS (SELECT 1 FROM public.worlds_identity_links WHERE issuer=p_issuer AND subject=p_subject)
   THEN RETURN false; END IF;
  INSERT INTO public.it_project_accounts(id) VALUES (profile_id);
  INSERT INTO public.worlds_identity_links(issuer,subject,local_user_id) VALUES (p_issuer,p_subject,profile_id);
  INSERT INTO public.worlds_link_audit(issuer,subject,local_user_id,event) VALUES (p_issuer,p_subject,profile_id,'linked');
  RETURN true;
 EXCEPTION WHEN unique_violation THEN RETURN false;
 END;
 $$;
-- statement
REVOKE ALL ON FUNCTION public.worlds_create_project_account(text,text,text,text) FROM PUBLIC;
-- statement
GRANT EXECUTE ON FUNCTION public.worlds_create_project_account(text,text,text,text) TO it_worlds_app;
