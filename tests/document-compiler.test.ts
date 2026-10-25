import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {compileProject,sandboxArgs} from '../services/document-compiler/runner.ts';
import {courses} from '../src/data/courses.ts';
const file=(path:string,text:string)=>({path,bytes:new TextEncoder().encode(text)});
const enabled=process.env.IT_WORLDS_COMPILER_TEST==='1';
test('compiler sandbox configuration bounds privileges, writes, network, memory and process count',()=>{
 const args=sandboxArgs('it-worlds-doc-test','/tmp/it-worlds-test','typst','main.typ');
 for(const text of ['--read-only','--network','none','--cap-drop','ALL','--security-opt','no-new-privileges','--memory','512m','--pids-limit','64','--cpus','1','--user'])assert(args.includes(text));
 assert(!args[args.indexOf('--user')+1]!.startsWith('0:'));
 assert(args.some(arg=>arg.endsWith('target=/input,readonly')));assert(!args.includes('--privileged'));
});
test('published Typst and LaTeX examples really compile in fresh networkless containers, including Biber',{skip:!enabled,timeout:240000},async()=>{
 const failures:string[]=[];
 for(const course of courses.filter(c=>['latex','typst'].includes(c.id))){let count=0;
  for(const chapter of course.chapters){
   for(const section of chapter.sections){if(section.language!==(course.id==='typst'?'Typst':'LaTeX')||!section.code)continue;
    const extra=chapter.sections.filter(s=>s.language==='BibTeX'&&s.code).map(s=>file('works.bib',s.code!));
    const extension=course.id==='typst'?'typ':'tex';
    const result=await compileProject([file(`main.${extension}`,section.code),...extra],course.id==='typst'?'typst':'latex',`main.${extension}`);
    if(!result.success)failures.push(`${course.id}/${chapter.id}: ${result.log.slice(-4000)}`);
    else{assert(result.pdf&&Buffer.from(result.pdf,'base64').subarray(0,5).toString()==='%PDF-');assert(result.previews.length>0);}count++;
   }
  }
  assert.equal(count,course.id==='typst'?16:14);
 }
 assert.deepEqual(failures,[]);
});
test('real compiler rejects bad syntax, missing packages, project escape and infinite evaluation, leaving no own containers',{skip:!enabled,timeout:120000},async()=>{
 const cases=[['typst','#let x = (\nBroken'],['typst','#include "../outside.typ"'],['typst','#import "@preview/nonexistent:99.0.0": *\nHello'],['latex','\\documentclass{article}\n\\begin{document}\n\\unknowncommand\n\\end{document}'],['latex','\\documentclass{article}\n\\begin{document}\n\\loop\\iftrue\\repeat\\end{document}']] as const;
 for(const[format,code]of cases){const ext=format==='typst'?'typ':'tex';const result=await compileProject([file(`main.${ext}`,code)],format,`main.${ext}`);assert.equal(result.success,false,`${format}: ${result.log}`);assert.equal(result.pdf,undefined);}
 const output=execFileSync('docker',['ps','-a','--filter','name=it-worlds-doc-','--format','{{.Names}}'],{encoding:'utf8'});assert.equal(output.trim(),'');
});
test('TeX shell escape remains disabled during actual compilation',{skip:!enabled,timeout:30000},async()=>{
 const code='\\documentclass{article}\n\\begin{document}\n\\immediate\\write18{touch /work/project/escape.txt}\n\\IfFileExists{escape.txt}{\\errmessage{Shell escape executed}}{Shell escape stayed disabled.}\n\\end{document}';
 const result=await compileProject([file('main.tex',code)],'latex','main.tex');assert(result.success,result.log);assert(!result.log.includes('Shell escape executed'));
});
test('selected main paths handle nested LaTeX folders and leading dashes without changing compiler options',{skip:!enabled,timeout:30000},async()=>{
 const files=[file('project/main.tex','\\documentclass{article}\n\\begin{document}\n\\input{chapters/one}\n\\end{document}'),file('project/chapters/one.tex','\\input{chapters/two}'),file('project/chapters/two.tex','\\section{Result} Complete nested project.')];
 const result=await compileProject(files,'latex','project/main.tex');assert(result.success,result.log);
 files[2]=file('project/chapters/two.tex','\\unknowncommand');const failed=await compileProject(files,'latex','project/main.tex');assert.equal(failed.success,false);assert.match(failed.log,/project\/chapters\/two\.tex:1:/);
 const dash=await compileProject([file('-example.typ','= A normal file')],'typst','-example.typ');assert(dash.success,dash.log);
});
