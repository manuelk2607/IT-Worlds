\set ON_ERROR_STOP on
BEGIN;
SET LOCAL statement_timeout='5s';
DO $$ BEGIN
 IF current_database()<>'it_worlds_examples_test' THEN RAISE EXCEPTION 'Separate practice database required.'; END IF;
END $$;
\ir schema.sql
\ir queries.sql
DO $$ BEGIN
 IF (SELECT count(*) FROM course_summary)<>3 THEN RAISE EXCEPTION 'Published courses only'; END IF;
 IF NOT EXISTS(SELECT FROM course_summary WHERE id=1 AND enrolled=2 AND completed=1 AND completion_percent=50 AND average_score=90) THEN RAISE EXCEPTION 'SQL totals'; END IF;
 IF NOT EXISTS(SELECT FROM course_summary WHERE id=3 AND enrolled=0 AND completed=0 AND completion_percent IS NULL AND average_score IS NULL) THEN RAISE EXCEPTION 'Empty course is not a zero score or 100 percent'; END IF;
 IF (SELECT count(*) FROM completed_results WHERE course_id=2 AND rank=1)<>2 THEN RAISE EXCEPTION 'Tied scores share rank'; END IF;
 BEGIN
  INSERT INTO enrolments VALUES(99,1,'active',NULL,NULL);
  RAISE EXCEPTION 'Foreign key not enforced';
 EXCEPTION WHEN foreign_key_violation THEN NULL; END;
 BEGIN
  INSERT INTO enrolments VALUES(1,1,'active',NULL,NULL);
  RAISE EXCEPTION 'Duplicate enrolment accepted';
 EXCEPTION WHEN unique_violation THEN NULL; END;
 BEGIN
  INSERT INTO enrolments VALUES(3,1,'completed',NULL,90);
  RAISE EXCEPTION 'Incomplete completed result accepted';
 EXCEPTION WHEN check_violation THEN NULL; END;
 BEGIN
  INSERT INTO enrolments VALUES(3,1,'completed',10,110);
  RAISE EXCEPTION 'Out-of-range score accepted';
 EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
SAVEPOINT completion;
UPDATE enrolments SET status='completed',minutes=95,score=75 WHERE learner_id=2 AND course_id=1;
DO $$ BEGIN
 IF NOT EXISTS(SELECT FROM course_summary WHERE id=1 AND completed=2 AND completion_percent=100 AND average_score=82.5) THEN RAISE EXCEPTION 'Updated totals'; END IF;
END $$;
ROLLBACK TO completion;
DO $$ BEGIN
 IF NOT EXISTS(SELECT FROM course_summary WHERE id=1 AND completed=1 AND completion_percent=50) THEN RAISE EXCEPTION 'Savepoint restoration'; END IF;
END $$;
ROLLBACK;
SELECT 'SQL project passed; its transaction was rolled back.';
