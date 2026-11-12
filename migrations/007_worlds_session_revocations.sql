CREATE TABLE public.worlds_session_revocations (
 issuer text NOT NULL CHECK (length(issuer) BETWEEN 1 AND 2048),
 subject text NOT NULL CHECK (length(subject) BETWEEN 1 AND 512),
 revoked_through bigint NOT NULL CHECK (revoked_through > 0),
 PRIMARY KEY (issuer,subject)
);
-- statement
REVOKE ALL ON public.worlds_session_revocations FROM PUBLIC;
-- statement
GRANT SELECT,INSERT,UPDATE(revoked_through) ON public.worlds_session_revocations TO it_worlds_app;
-- statement
-- The existing identity-link table forces RLS even for its owner. Permit
-- the migration owner to evaluate the narrowly scoped definer function.
CREATE POLICY worlds_session_revocation_owner_read ON public.worlds_identity_links
 FOR SELECT TO CURRENT_USER USING (true);
-- statement
CREATE FUNCTION public.worlds_native_session_allowed(account_id uuid,identity_issuer text,issued_at bigint)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT NOT EXISTS (
  SELECT 1 FROM public.worlds_identity_links l
  JOIN public.worlds_session_revocations r USING (issuer,subject)
  WHERE l.local_user_id=account_id AND l.issuer=identity_issuer
    AND r.revoked_through>=issued_at
 );
$$;
-- statement
REVOKE ALL ON FUNCTION public.worlds_native_session_allowed(uuid,text,bigint) FROM PUBLIC;
-- statement
GRANT EXECUTE ON FUNCTION public.worlds_native_session_allowed(uuid,text,bigint) TO it_worlds_app;
