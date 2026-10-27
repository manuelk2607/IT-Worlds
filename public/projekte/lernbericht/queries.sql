CREATE TEMP VIEW course_summary AS
SELECT c.id,c.title,count(e.learner_id) AS enrolled,
 count(e.learner_id) FILTER(WHERE e.status='completed') AS completed,
 round(100.0*count(e.learner_id) FILTER(WHERE e.status='completed')
       /nullif(count(e.learner_id),0),1) AS completion_percent,
 round(avg(e.score) FILTER(WHERE e.status='completed'),1) AS average_score
FROM courses c LEFT JOIN enrolments e ON e.course_id=c.id
WHERE c.published
GROUP BY c.id,c.title;

CREATE TEMP VIEW completed_results AS
SELECT e.course_id,l.name,e.score,
 dense_rank() OVER(PARTITION BY e.course_id ORDER BY e.score DESC) AS rank
FROM enrolments e JOIN learners l ON l.id=e.learner_id
WHERE e.status='completed';

SELECT title,enrolled,completed,completion_percent,average_score
FROM course_summary ORDER BY id;
SELECT course_id,name,score,rank FROM completed_results ORDER BY course_id,name;
