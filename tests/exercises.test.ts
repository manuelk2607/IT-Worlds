import test from 'node:test';
import assert from 'node:assert/strict';
import { exercises } from '../src/data/exercises.ts';
import { topics, sources, questions } from '../src/data/content.ts';
import { checkExercise } from '../src/lib/exercise-checker.ts';

test('every topic has a sourced introduction, question and bilingual editor task',()=>{
  assert.equal(topics.filter(topic=>topic.lesson).length,10);
  assert.equal(questions.filter(question=>!question.course).length,10);
  assert.equal(new Set(exercises.map(exercise=>exercise.topic)).size,10);
  for(const topic of topics){
    assert.ok(topic.lesson);
    const exercise=exercises.find(item=>item.topic===topic.id)!;
    assert.ok(exercise);
    assert.ok(questions.some(question=>question.topic===topic.id));
    for(const id of exercise.sources){assert.ok(sources[id]);assert.ok(topic.lesson.sources.includes(id));}
    for(const locale of ['de','en'] as const){
      assert.ok(exercise.title[locale]&&exercise.task[locale]&&exercise.hint[locale]);
      assert.equal(checkExercise(topic.id,exercise.starter,locale).passed,false,topic.id);
      assert.equal(checkExercise(topic.id,exercise.solution,locale).passed,true,topic.id);
    }
  }
});
test('editors accept meaningful equivalent answers and expose computed model output',()=>{
  assert.equal(checkExercise('datenbanken',"select  title from courses where level='Beginner'",'en').passed,true);
  assert.equal(checkExercise('betriebssysteme','chmod o=,u=wr,g=r notes.txt','de').passed,true);
  assert.equal(checkExercise('website-bauen','<H1>Heading</H1>\n<P>Some text.</P>','en').passed,true);
  assert.equal(checkExercise('it-sicherheit','{"factors":["totp","fingerprint"]}','en').passed,true);
  const output=JSON.parse(checkExercise('it-grundlagen','{"text":"A€","bytes":4}','en').output);
  assert.deepEqual(output.bytes,[65,226,130,172]);
  assert.match(checkExercise('datenbanken',"SELECT title FROM courses WHERE level = 'Beginner';",'en').output,/SQL basics/);
});
test('incomplete, unsafe and out-of-scope input is rejected without executing it',()=>{
  for(const [topic,input] of [
    ['website-bauen','<h1> </h1><p> </p>'],
    ['website-bauen','<img src="https://example.com/"><script>throw 1</script>'],
    ['datenbanken',"SELECT title FROM courses; DROP TABLE courses;"],
    ['programmiersprachen','result = 17 // 3\nraise Exception()'],
    ['it-sicherheit','{"factors":["password","pin"]}'],
    ['it-sicherheit','{"factors":["constructor","totp"]}'],
    ['betriebssysteme','chmod 777 notes.txt'],
    ['betriebssysteme','chmod 640 notes.txt; rm -rf /'],
    ['netzwerke','{"ttl":300,"elapsed":120,"remaining":300}'],
    ['cloud-devops','{"containers":[{"name":"same","image":"course-demo:1"},{"name":"same","image":"course-demo:1"}]}'],
    ['apis','null'],['apis','not JSON'],['unknown','{}'],['apis','x'.repeat(8001)],
  ])assert.equal(checkExercise(topic,input,'en').passed,false,topic);
});
