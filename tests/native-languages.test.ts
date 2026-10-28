import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {languageExamples} from '../src/data/language-examples.ts';
import {courses,chapterProgressId} from '../src/data/courses.ts';

test('every new chapter publishes the exact native listing tested here',()=>{
 const keys=Object.keys(languageExamples);assert.equal(keys.length,24);
 for(const course of courses.filter(course=>['java','c-cpp','go','rust'].includes(course.id))){
  assert.equal(course.chapters.length,6);
  for(const chapter of course.chapters){const key=chapterProgressId(course,chapter);const example=languageExamples[key];assert(example,key);assert(example.code.endsWith('\n'),`${key}: source files end with a newline`);assert(chapter.sections.some(section=>section.code===example.code&&section.language===example.language),key);}
 }
});

for(const language of ['Java','C','C++','Go','Rust']as const)test(`published ${language} programs compile and meet output/failure contracts`,context=>{
 const compiler=language==='Java'?process.env.IT_WORLDS_JAVAC??'javac':language==='C'?process.env.IT_WORLDS_CC??'clang':language==='C++'?process.env.IT_WORLDS_CXX??'clang++':language==='Go'?process.env.IT_WORLDS_GO??'go':process.env.IT_WORLDS_RUSTC??'rustc';
 const available=spawnSync(compiler,[language==='Go'?'version':'--version'],{encoding:'utf8',timeout:10000});
 if(available.error||available.status!==0){if(process.env.IT_WORLDS_NATIVE_TEST==='1')assert.fail(`Required compiler unavailable: ${compiler}`);context.skip(`No ${language} compiler; required in dedicated language CI`);return;}
 const root=mkdtempSync(join(tmpdir(),'it-worlds-native-'));
 const env={...process.env,GOTOOLCHAIN:'local',GOPROXY:'off',GOSUMDB:'off',GOCACHE:join(root,'go-cache'),GOENV:'off'};
 const run=(command:string,args:string[])=>spawnSync(command,args,{cwd:root,env,encoding:'utf8',timeout:60000,maxBuffer:2*1024*1024});
 const check=(result:ReturnType<typeof run>,description:string)=>{assert.ifError(result.error);assert.equal(result.status,0,`${description}\n${result.stderr}\n${result.stdout}`);};
 try{
  for(const [id,example]of Object.entries(languageExamples).filter(([,example])=>example.language===language)){
   const source=join(root,language==='Java'?'Main.java':language==='C'?'main.c':language==='C++'?'main.cpp':language==='Go'?'main.go':'main.rs');writeFileSync(source,example.code);
   const binary=join(root,'lesson');
   const args=language==='Java'?['--release','21','-Xlint:all','-Werror','-d',root,source]:language==='Go'?['build','-o',binary,source]:language==='Rust'?['--edition=2024','-Dwarnings',source,'-o',binary]:[`-std=${language==='C'?'c17':'c++20'}`,'-Wall','-Wextra','-Wpedantic','-Werror','-fsanitize=address,undefined','-fno-omit-frame-pointer',source,'-o',binary];
   check(run(compiler,args),`${id} compilation`);
   const execute=(args:string[])=>language==='Java'?run(process.env.IT_WORLDS_JAVA??'java',['-cp',root,'Main',...args]):run(binary,args);
   const result=execute(example.args??[]);check(result,`${id} execution`);assert.equal(result.stdout.replace(/\r\n/g,'\n'),example.stdout,id);assert.equal(result.stderr,'',id);
   if(id.endsWith('-abschluss')){
    for(const [args,want]of [[[], '0\n'],[['0'],'0\n'],[['10','20','30'],'60\n']]as const){const good=execute([...args]);check(good,id);assert.equal(good.stdout,want,id);}
    const maximum=language==='Go'?'9223372036854775807':language==='Rust'?'18446744073709551615':'2147483647';
    for(const args of [['-1'],['15x'],['abc'],[maximum,'1']]){const bad=execute(args);assert.ifError(bad.error);assert.equal(bad.status,2,`${id}: ${args}`);assert.equal(bad.stdout,'');assert(bad.stderr.trim(),id);}
   }
  }
  if(language==='Rust'){
   for(const [name,code,diagnostic]of [
    ['moved','fn main(){let first=String::from("SQL");let owner=first;println!("{first} {owner}");}','E0382'],
    ['overlap','fn main(){let mut title=String::from("SQL");let view=&title;title.push(\'!\');println!("{view}");}','E0502'],
   ]){const file=join(root,`${name}.rs`);writeFileSync(file,code);const bad=run(compiler,['--edition=2024',file,'-o',join(root,name)]);assert.ifError(bad.error);assert.notEqual(bad.status,0);assert(bad.stderr.includes(diagnostic),bad.stderr);}
  }
  if(language==='C++'){
   const file=join(root,'copy.cpp');writeFileSync(file,'#include <memory>\nint main(){auto owner=std::make_unique<int>(42);auto copy=owner;}\n');const bad=run(compiler,['-std=c++20',file,'-o',join(root,'copy')]);assert.ifError(bad.error);assert.notEqual(bad.status,0,'unique_ptr copying must be rejected');
  }
 }finally{rmSync(root,{recursive:true,force:true});}
});
