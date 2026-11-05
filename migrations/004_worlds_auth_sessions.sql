-- Private server-only opaque-session storage for this application's OIDC client.
CREATE TABLE public.worlds_auth_transactions(id text PRIMARY KEY,payload jsonb NOT NULL,expires bigint NOT NULL);
-- statement
CREATE INDEX worlds_auth_transactions_expiry ON public.worlds_auth_transactions(expires);
-- statement
CREATE TABLE public.worlds_auth_sessions(id text PRIMARY KEY,issuer text NOT NULL,subject text NOT NULL,sid text,payload jsonb NOT NULL,expires bigint NOT NULL);
-- statement
CREATE INDEX worlds_auth_sessions_identity ON public.worlds_auth_sessions(issuer,subject,sid);
-- statement
CREATE INDEX worlds_auth_sessions_expiry ON public.worlds_auth_sessions(expires);
-- statement
CREATE TABLE public.worlds_auth_replays(id text PRIMARY KEY,expires bigint NOT NULL);
-- statement
CREATE INDEX worlds_auth_replays_expiry ON public.worlds_auth_replays(expires);
-- statement
REVOKE ALL ON public.worlds_auth_transactions,public.worlds_auth_sessions,public.worlds_auth_replays FROM PUBLIC;
-- statement
GRANT SELECT,INSERT,DELETE ON public.worlds_auth_transactions,public.worlds_auth_sessions,public.worlds_auth_replays TO it_worlds_app;
-- statement
CREATE FUNCTION public.worlds_account_active(account_id uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT EXISTS(SELECT 1 FROM neon_auth."user" u WHERE u.id=account_id
 AND (u.banned IS DISTINCT FROM true OR u."banExpires"<now()));
$$;
-- statement
REVOKE ALL ON FUNCTION public.worlds_account_active(uuid) FROM PUBLIC;
-- statement
GRANT EXECUTE ON FUNCTION public.worlds_account_active(uuid) TO it_worlds_app;
