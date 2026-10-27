-- Run only through lab.sql or test.sql, inside their transaction.
CREATE TEMP TABLE learners (
 id integer PRIMARY KEY,
 name text NOT NULL CHECK (length(trim(name))>0)
) ON COMMIT DROP;
CREATE TEMP TABLE courses (
 id integer PRIMARY KEY,
 title text NOT NULL CHECK (length(trim(title))>0),
 published boolean NOT NULL DEFAULT false
) ON COMMIT DROP;
CREATE TEMP TABLE enrolments (
 learner_id integer REFERENCES learners(id) NOT NULL,
 course_id integer REFERENCES courses(id) NOT NULL,
 status text NOT NULL CHECK(status IN ('active','completed')),
 minutes integer CHECK(minutes>=0),
 score integer CHECK(score BETWEEN 0 AND 100),
 PRIMARY KEY(learner_id,course_id),
 CHECK(status<>'completed' OR (minutes IS NOT NULL AND score IS NOT NULL))
) ON COMMIT DROP;
INSERT INTO learners VALUES(1,'Ada'),(2,'Lin'),(3,'Sam');
INSERT INTO courses VALUES(1,'SQL',true),(2,'HTTP',true),(3,'Linux',true),(4,'Draft',false);
INSERT INTO enrolments VALUES
 (1,1,'completed',80,90),(2,1,'active',NULL,NULL),
 (1,2,'completed',70,80),(2,2,'completed',60,80);
