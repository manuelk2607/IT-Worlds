\set ON_ERROR_STOP on
BEGIN;
SET LOCAL statement_timeout='5s';
DO $$ BEGIN
 IF current_database()<>'it_worlds_examples_test' THEN
  RAISE EXCEPTION 'Use the separate it_worlds_examples_test practice database.';
 END IF;
END $$;
\ir schema.sql
\ir queries.sql
SAVEPOINT before_completion;
UPDATE enrolments SET status='completed',minutes=95,score=75
WHERE learner_id=2 AND course_id=1;
SELECT title,enrolled,completed,completion_percent,average_score
FROM course_summary WHERE id=1;
ROLLBACK TO before_completion;
SELECT title,enrolled,completed,completion_percent,average_score
FROM course_summary WHERE id=1;
ROLLBACK;
-- All tables and views created by this transaction are gone.
