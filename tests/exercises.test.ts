import test from 'node:test';
import assert from 'node:assert/strict';
import { exercises, exercisePath } from '../src/data/exercises.ts';
import { courses, coursePath } from '../src/data/courses.ts';
import { publicPaths, pageSeo } from '../src/lib/seo.ts';
import { createSearchIndex } from '../src/lib/search-index.ts';
import { emptyExerciseSelection, exerciseSelectionUrl, matchesExercise, readExerciseSelection } from '../src/lib/exercise-catalog.ts';
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
test('course tasks have stable unique IDs, bilingual metadata and working course/chapter/search/SEO routes',()=>{
  assert.equal(new Set(exercises.map(item=>item.id)).size,exercises.length);
  const urls=new Set<string>();
  for(const exercise of exercises){
    assert.match(exercise.id,/^[a-z0-9-]+$/);
    assert.ok(exercise.sources.length);
    for(const id of exercise.sources)assert.ok(sources[id]);
    const url=exercisePath(exercise);assert.ok(!urls.has(url));urls.add(url);
    if(exercise.course){
      const course=courses.find(item=>item.id===exercise.course)!;
      assert.ok(course);assert.equal(exercise.topic,course.topic);
      assert.ok(course.chapters.some(item=>item.id===exercise.chapter));
      assert.ok(publicPaths.includes(url));
      assert.ok(!['ki','latex'].includes(course.id));
      const seo=JSON.parse(pageSeo(url,'de',exercise.title.de,exercise.task.de).structuredData);
      const page=seo['@graph'].find((item:{learningResourceType?:string})=>item.learningResourceType==='Practice exercise');
      assert.deepEqual(page.citation,exercise.sources.map(id=>sources[id].url));
      assert.ok(seo['@graph'].at(-1).itemListElement.some((item:{item:string})=>item.item.endsWith(coursePath(course))));
    }else assert.equal(exercise.id,exercise.topic);
    for(const locale of ['de','en'] as const){
      assert.ok(exercise.title[locale]&&exercise.task[locale]&&exercise.hint[locale]);
      assert.equal(checkExercise(exercise.id,exercise.starter,locale).passed,false,exercise.id+' starter');
      assert.equal(checkExercise(exercise.id,exercise.solution,locale).passed,true,exercise.id+' solution');
      const entry=createSearchIndex(locale).find(item=>item.id===`exercise-${exercise.id}`)!;
      assert.equal(entry.url,`${locale==='en'?'/en':''}${url}`);
    }
  }
});
test('course models compute equivalent answers, boundaries and informative negative results',()=>{
  const good:[string,string][]=[
    ['typescript-filter','const result: number[] = minutes.filter((n) => n > 29)'],
    ['typescript-filter','const result:number[]=minutes.filter(n=>n!==15);'],
    ['python-summe','result = sum( minutes, start=0 )'],
    ['python-summe','result=sum(minutes,0)'],
    ['markdown-gliederung',' # Notes #\n\n  ## Course ##\n   ### DNS ###'],
    ['web-formularlabel',"<LABEL for='contact'>Contact</LABEL>\n<INPUT required='' name='contact' type='EMAIL' id='contact' />"],
    ['sql-null-zaehlen','select count( * ) from enrolments where course_id=01'],
    ['typst-verweis','#set heading(numbering: "1.1")\n= Findings <findings-1>\nRead @findings-1.'],
  ];
  for(const [id,input] of good)assert.equal(checkExercise(id,input,'en').passed,true,id+' equivalent');
  assert.deepEqual(JSON.parse(checkExercise('typescript-filter',exercises.find(item=>item.id==='typescript-filter')!.starter,'en').output).result,[45]);
  assert.equal(JSON.parse(checkExercise('python-summe','result = len(minutes)','en').output).result,3);
  assert.equal(JSON.parse(checkExercise('sql-null-zaehlen','SELECT COUNT(learner) FROM enrolments WHERE course_id = 1;','en').output).count,2);
  assert.equal(JSON.parse(checkExercise('sql-null-zaehlen','SELECT COUNT(*) FROM enrolments;','en').output).count,4);
  assert.equal(JSON.parse(checkExercise('web-formularlabel',exercises.find(item=>item.id==='web-formularlabel')!.starter,'en').output).associated,false);
});
test('course task formats reject code execution, duplicate HTML attributes, empty headings and wrong targets',()=>{
  const bad:[string,string][]=[
    ['typescript-filter','const result: number[] = minutes.filter(n => n >= 30); alert(1)'],
    ['typescript-filter','const result: number[] = minutes.filter(if => if >= 30);'],
    ['typescript-filter','const result: number[] = minutes.filter(n => value >= 30);'],
    ['typescript-filter','const result: number[] = minutes.filter(n => n >= 030);'],
    ['python-summe','result = sum(minutes)\n__import__("os").system("echo bad")'],
    ['python-summe','result = max(minutes, 0)'],
    ['markdown-gliederung','# ###\n## Course\n### DNS'],
    ['markdown-gliederung','# Title\n## Course\n#### DNS'],
    ['markdown-gliederung','# Title\n## Course\n### Course'],
    ['web-formularlabel','<label for="x">X</label><input id="x" id="x" type="email" required>'],
    ['web-formularlabel','<label for="x">X</label><input id="x" type="email" required onclick="bad()">'],
    ['web-formularlabel','<label for="x">X</label><input id="x" type="email">'],
    ['web-formularlabel','<label for="x"> </label><input id="x" type="email" required>'],
    ['sql-null-zaehlen','SELECT COUNT(*) FROM enrolments WHERE course_id=1; DELETE FROM enrolments;'],
    ['typst-verweis','#set heading(numbering: "1.1")\n= Method <method>\nRead @methods.'],
    ['typst-verweis','#read("/secret")'],
  ];
  for(const [id,input] of bad)assert.equal(checkExercise(id,input,'en').passed,false,id+' rejects '+input);
  for(const exercise of exercises)assert.equal(checkExercise(exercise.id,'x'.repeat(8001),'en').passed,false);
});
test('exercise filters reconcile topic/course, preserve unrelated URL state and match translated search words',()=>{
  const selected=readExerciseSelection(new URLSearchParams('thema=programmiersprachen&kurs=python&stufe=einstieg&suche=Minuten'),exercises);
  assert.equal(exercises.filter(item=>matchesExercise(item,selected,'de')).length,1);
  assert.equal(readExerciseSelection(new URLSearchParams('thema=datenbanken&kurs=python'),exercises).course,'alle');
  assert.deepEqual(readExerciseSelection(new URLSearchParams('thema=unknown&kurs=unknown&stufe=unknown'),exercises),emptyExerciseSelection());
  const url=exerciseSelectionUrl(new URL('https://example.com/uebungen/?keep=1&thema=old#tasks'),selected);
  assert.equal(url.searchParams.get('keep'),'1');assert.equal(url.hash,'#tasks');
  assert.equal(url.searchParams.get('kurs'),'python');
  const reset=exerciseSelectionUrl(url,emptyExerciseSelection());assert.equal(reset.search,'?keep=1');
  assert.ok(matchesExercise(exercises.find(item=>item.id==='web-formularlabel')!,{...emptyExerciseSelection(),search:'explicit label'},'en'));
});
test('systems and operations models require correct types, fixed givens and computed results',()=>{
  const cases:[string,string][]=[
    ['json-typen','{"minutes":30,"done":"false"}'],
    ['json-typen','{"minutes":30,"done":false,"extra":true}'],
    ['api-versionskonflikt','{"ifMatch":"v2","currentEtag":"v2","status":412,"applied":false}'],
    ['api-versionskonflikt','{"ifMatch":"v1","currentEtag":"v2","status":"412","applied":false}'],
    ['ipv4-netzadresse','{"address":"192.0.2.17","prefix":24,"network":"192.0.2.16"}'],
    ['ipv4-netzadresse','{"address":"192.0.2.17","prefix":28,"network":"192.0.2.31"}'],
    ['paging-adresse','{"virtualAddress":69,"pageSize":16,"frame":3,"virtualPage":4,"offset":4,"physicalAddress":53}'],
    ['paging-adresse','{"virtualAddress":53,"pageSize":16,"frame":3,"virtualPage":4,"offset":5,"physicalAddress":53}'],
    ['objekt-berechtigung','{"authenticated":true,"user":"Ada","owner":"Ada","allowed":false}'],
    ['objekt-berechtigung','{"authenticated":true,"user":"Lin","owner":"Ada","allowed":"false"}'],
    ['sli-ziel','{"requests":1000,"successful":992,"targetPercent":99,"successPercent":99.2,"meetsTarget":false}'],
    ['sli-ziel','{"requests":0,"successful":992,"targetPercent":99,"successPercent":99.2,"meetsTarget":true}'],
    ['bash-pipefail','set -o pipefail\nfalse | true\ncat /secret'],
    ['bash-pipefail','set -o pipefail\ntrue | true'],
  ];
  for(const [id,input] of cases)assert.equal(checkExercise(id,input,'en').passed,false,id);
  for(const id of ['json-typen','api-versionskonflikt','ipv4-netzadresse','paging-adresse','objekt-berechtigung','sli-ziel']){
    for(const input of ['null','[]','not JSON','{"minutes":NaN}'])assert.equal(checkExercise(id,input,'en').passed,false,id);
  }
  assert.equal(JSON.parse(checkExercise('bash-pipefail','set +o pipefail\nfalse | true','en').output).pipelineStatus,0);
  assert.equal(JSON.parse(checkExercise('bash-pipefail','set -o pipefail\nfalse | true','en').output).pipelineStatus,1);
  assert.equal(JSON.parse(checkExercise('ipv4-netzadresse','{}','en').output).expectedNetwork,'192.0.2.16');
  assert.equal(JSON.parse(checkExercise('paging-adresse','{}','en').output).expected.physicalAddress,53);
  assert.equal(JSON.parse(checkExercise('sli-ziel','{}','en').output).expected.successPercent,99.2);
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
