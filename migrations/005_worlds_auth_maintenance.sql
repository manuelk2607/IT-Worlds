CREATE TABLE public.worlds_auth_rate_buckets (
 id text PRIMARY KEY,
 hits integer NOT NULL CHECK (hits BETWEEN 1 AND 1200),
 expires bigint NOT NULL
);
-- statement
CREATE INDEX worlds_auth_rate_expiry ON public.worlds_auth_rate_buckets(expires);
-- statement
REVOKE ALL ON public.worlds_auth_rate_buckets FROM PUBLIC;
-- statement
GRANT SELECT,INSERT,UPDATE,DELETE ON public.worlds_auth_rate_buckets TO it_worlds_app;
-- statement
CREATE FUNCTION public.worlds_take_auth_attempt(
 global_id text, peer_id text, deadline bigint, global_limit integer, peer_limit integer
) RETURNS boolean LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
BEGIN
 INSERT INTO public.worlds_auth_rate_buckets AS b(id,hits,expires) VALUES(global_id,1,deadline)
 ON CONFLICT(id) DO UPDATE SET hits=b.hits+1 WHERE b.hits<global_limit;
 IF NOT FOUND THEN RETURN false; END IF;
 INSERT INTO public.worlds_auth_rate_buckets AS b(id,hits,expires) VALUES(peer_id,1,deadline)
 ON CONFLICT(id) DO UPDATE SET hits=b.hits+1 WHERE b.hits<peer_limit;
 -- The exception rolls back the global increment as well. One blocked peer
 -- cannot exhaust the global allowance by retrying after its own limit.
 IF NOT FOUND THEN RAISE SQLSTATE 'ZW001'; END IF;
 RETURN true;
EXCEPTION WHEN SQLSTATE 'ZW001' THEN
 RETURN false;
END;
$$;
-- statement
REVOKE ALL ON FUNCTION public.worlds_take_auth_attempt(text,text,bigint,integer,integer) FROM PUBLIC;
-- statement
GRANT EXECUTE ON FUNCTION public.worlds_take_auth_attempt(text,text,bigint,integer,integer) TO it_worlds_app;
