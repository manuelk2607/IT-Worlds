CREATE FUNCTION public.worlds_cleanup_expired_link_proofs() RETURNS integer
LANGUAGE sql SECURITY DEFINER SET search_path='' AS $$
 WITH expired AS (
  SELECT proof_hash FROM public.worlds_link_proofs
  WHERE expires_at<=now() ORDER BY expires_at,proof_hash LIMIT 500
 ), removed AS (
  DELETE FROM public.worlds_link_proofs
  WHERE expires_at<=now() AND proof_hash IN (SELECT proof_hash FROM expired)
  RETURNING 1
 )
 SELECT count(*)::integer FROM removed;
$$;
-- statement
REVOKE ALL ON FUNCTION public.worlds_cleanup_expired_link_proofs() FROM PUBLIC;
-- statement
GRANT EXECUTE ON FUNCTION public.worlds_cleanup_expired_link_proofs() TO it_worlds_app;
