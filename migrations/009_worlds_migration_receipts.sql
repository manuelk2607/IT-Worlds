ALTER TABLE public.worlds_link_audit
 ADD COLUMN receipt_eligible boolean NOT NULL DEFAULT false,
 ADD COLUMN receipt_reported_at timestamptz,
 ADD COLUMN receipt_conflict_at timestamptz;
-- statement
-- Keep the runtime's existing RLS and column grants. Only the migration owner
-- can read and update the queue directly, even with FORCE ROW LEVEL SECURITY.
CREATE POLICY worlds_receipts_owner ON public.worlds_link_audit TO CURRENT_USER
 USING (true) WITH CHECK (true);
-- statement
UPDATE public.worlds_link_audit audit
SET receipt_eligible=true
FROM public.worlds_identity_links link
JOIN public.it_project_accounts account ON account.id=link.local_user_id
WHERE account.legacy_user_id=link.local_user_id
 AND (audit.issuer,audit.subject,audit.local_user_id)=(link.issuer,link.subject,link.local_user_id)
 AND audit.event='linked'
 AND audit.id=(
  SELECT max(previous.id) FROM public.worlds_link_audit previous
  WHERE (previous.issuer,previous.subject,previous.local_user_id)=(link.issuer,link.subject,link.local_user_id)
 );
-- statement
CREATE INDEX worlds_receipts_pending ON public.worlds_link_audit(issuer,id)
 WHERE receipt_eligible AND receipt_reported_at IS NULL AND receipt_conflict_at IS NULL;
-- statement
CREATE INDEX worlds_receipts_history ON public.worlds_link_audit(issuer,subject,local_user_id,id)
 WHERE receipt_eligible;
-- statement
CREATE FUNCTION public.worlds_classify_migration_receipt() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
BEGIN
 NEW.receipt_reported_at := NULL;
 NEW.receipt_conflict_at := NULL;
 NEW.receipt_eligible := NEW.event='linked' AND EXISTS (
  SELECT 1 FROM public.worlds_identity_links link
  JOIN public.it_project_accounts account ON account.id=link.local_user_id
  WHERE account.legacy_user_id=link.local_user_id
   AND (link.issuer,link.subject,link.local_user_id)=(NEW.issuer,NEW.subject,NEW.local_user_id)
 );
 RETURN NEW;
END;
$$;
-- statement
REVOKE ALL ON FUNCTION public.worlds_classify_migration_receipt() FROM PUBLIC;
-- statement
CREATE TRIGGER worlds_classify_migration_receipt BEFORE INSERT ON public.worlds_link_audit
 FOR EACH ROW EXECUTE FUNCTION public.worlds_classify_migration_receipt();
-- statement
CREATE FUNCTION public.worlds_queue_migration_revocation() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE receipt_id bigint;
BEGIN
 IF (SELECT event FROM public.worlds_link_audit audit
     WHERE audit.receipt_eligible
      AND (audit.issuer,audit.subject,audit.local_user_id)=(OLD.issuer,OLD.subject,OLD.local_user_id)
     ORDER BY audit.id DESC LIMIT 1)='linked'
 THEN
  INSERT INTO public.worlds_link_audit(issuer,subject,local_user_id,event)
  VALUES (OLD.issuer,OLD.subject,OLD.local_user_id,'unlinked') RETURNING id INTO receipt_id;
  UPDATE public.worlds_link_audit SET receipt_eligible=true WHERE id=receipt_id;
 END IF;
 RETURN OLD;
END;
$$;
-- statement
REVOKE ALL ON FUNCTION public.worlds_queue_migration_revocation() FROM PUBLIC;
-- statement
CREATE TRIGGER worlds_queue_migration_revocation AFTER DELETE ON public.worlds_identity_links
 FOR EACH ROW EXECUTE FUNCTION public.worlds_queue_migration_revocation();
-- statement
CREATE FUNCTION public.worlds_pending_migration_receipts(identity_issuer text)
RETURNS TABLE(revision text, subject text, local_user_id uuid, event text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 SELECT audit.id::text,audit.subject,audit.local_user_id,audit.event
 FROM public.worlds_link_audit audit
 WHERE audit.issuer=identity_issuer AND audit.receipt_eligible
   AND audit.receipt_reported_at IS NULL AND audit.receipt_conflict_at IS NULL
 ORDER BY audit.id LIMIT 10;
$$;
-- statement
CREATE FUNCTION public.worlds_finish_migration_receipt(identity_issuer text, receipt_id bigint, accepted boolean)
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path='' AS $$
 WITH written AS (
  UPDATE public.worlds_link_audit
  SET receipt_reported_at=CASE WHEN accepted THEN now() END,
      receipt_conflict_at=CASE WHEN NOT accepted THEN now() END
  WHERE issuer=identity_issuer AND id=receipt_id AND accepted IS NOT NULL
   AND receipt_eligible AND receipt_reported_at IS NULL AND receipt_conflict_at IS NULL
  RETURNING 1
 )
 SELECT EXISTS(SELECT 1 FROM written);
$$;
-- statement
REVOKE ALL ON FUNCTION public.worlds_pending_migration_receipts(text), public.worlds_finish_migration_receipt(text,bigint,boolean) FROM PUBLIC;
-- statement
GRANT EXECUTE ON FUNCTION public.worlds_pending_migration_receipts(text), public.worlds_finish_migration_receipt(text,bigint,boolean) TO it_worlds_app;
