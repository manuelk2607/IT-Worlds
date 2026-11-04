-- Additive pilot schema. Existing progress IDs and Auth settings are untouched.
CREATE TABLE public.worlds_identity_links (
 issuer text NOT NULL CHECK (length(issuer) BETWEEN 1 AND 2048),
 subject text NOT NULL CHECK (length(subject) BETWEEN 1 AND 512),
 local_user_id uuid NOT NULL REFERENCES neon_auth."user"(id) ON DELETE CASCADE,
 linked_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (issuer,subject),
 UNIQUE (local_user_id)
);
-- statement
CREATE TABLE public.worlds_link_proofs (
 proof_hash text PRIMARY KEY,
 issuer text NOT NULL,
 subject text NOT NULL,
 local_user_id uuid NOT NULL REFERENCES neon_auth."user"(id) ON DELETE CASCADE,
 session_hash text NOT NULL,
 expires_at timestamptz NOT NULL
);
-- statement
CREATE INDEX worlds_link_proofs_expiry ON public.worlds_link_proofs(expires_at);
-- statement
CREATE TABLE public.worlds_link_audit (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 issuer text NOT NULL,
 subject text NOT NULL,
 local_user_id uuid NOT NULL,
 event text NOT NULL CHECK(event IN ('linked','unlinked')),
 occurred_at timestamptz NOT NULL DEFAULT now()
);
-- statement
ALTER TABLE public.worlds_identity_links ENABLE ROW LEVEL SECURITY;
-- statement
ALTER TABLE public.worlds_identity_links FORCE ROW LEVEL SECURITY;
-- statement
ALTER TABLE public.worlds_link_proofs ENABLE ROW LEVEL SECURITY;
-- statement
ALTER TABLE public.worlds_link_proofs FORCE ROW LEVEL SECURITY;
-- statement
ALTER TABLE public.worlds_link_audit ENABLE ROW LEVEL SECURITY;
-- statement
ALTER TABLE public.worlds_link_audit FORCE ROW LEVEL SECURITY;
-- statement
CREATE POLICY worlds_own_link_read ON public.worlds_identity_links FOR SELECT TO it_worlds_app
 USING (issuer=NULLIF(current_setting('app.worlds_issuer',true),'')
 AND subject=NULLIF(current_setting('app.worlds_subject',true),''));
-- statement
CREATE POLICY worlds_own_link_insert ON public.worlds_identity_links FOR INSERT TO it_worlds_app
 WITH CHECK (issuer=NULLIF(current_setting('app.worlds_issuer',true),'')
 AND subject=NULLIF(current_setting('app.worlds_subject',true),'')
 AND local_user_id=NULLIF(current_setting('app.user_id',true),'')::uuid);
-- statement
CREATE POLICY worlds_own_proof ON public.worlds_link_proofs FOR ALL TO it_worlds_app
 USING (issuer=NULLIF(current_setting('app.worlds_issuer',true),'')
 AND subject=NULLIF(current_setting('app.worlds_subject',true),'')
 AND session_hash=NULLIF(current_setting('app.worlds_session',true),'')
 AND local_user_id=NULLIF(current_setting('app.user_id',true),'')::uuid)
 WITH CHECK (issuer=NULLIF(current_setting('app.worlds_issuer',true),'')
 AND subject=NULLIF(current_setting('app.worlds_subject',true),'')
 AND session_hash=NULLIF(current_setting('app.worlds_session',true),'')
 AND local_user_id=NULLIF(current_setting('app.user_id',true),'')::uuid);
-- statement
CREATE POLICY worlds_own_audit ON public.worlds_link_audit FOR INSERT TO it_worlds_app
 WITH CHECK (issuer=NULLIF(current_setting('app.worlds_issuer',true),'')
 AND subject=NULLIF(current_setting('app.worlds_subject',true),'')
 AND local_user_id=NULLIF(current_setting('app.user_id',true),'')::uuid);
-- statement
REVOKE ALL ON public.worlds_identity_links,public.worlds_link_proofs,public.worlds_link_audit FROM PUBLIC;
-- statement
GRANT SELECT,INSERT ON public.worlds_identity_links TO it_worlds_app;
-- statement
GRANT SELECT,INSERT,DELETE ON public.worlds_link_proofs TO it_worlds_app;
-- statement
GRANT INSERT ON public.worlds_link_audit TO it_worlds_app;
-- statement
GRANT SELECT(id) ON public.worlds_link_audit TO it_worlds_app;
-- statement
CREATE POLICY worlds_own_audit_return ON public.worlds_link_audit FOR SELECT TO it_worlds_app
 USING (issuer=NULLIF(current_setting('app.worlds_issuer',true),'')
 AND subject=NULLIF(current_setting('app.worlds_subject',true),'')
 AND local_user_id=NULLIF(current_setting('app.user_id',true),'')::uuid);
-- statement
GRANT USAGE ON SEQUENCE public.worlds_link_audit_id_seq TO it_worlds_app;
