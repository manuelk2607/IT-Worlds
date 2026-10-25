import test from 'node:test';
import assert from 'node:assert/strict';
import {documentTasks} from '../src/data/document-tasks.ts';
import {analyzeDocument} from '../src/lib/document-analysis.ts';
import {checkDocumentTask} from '../src/lib/document-task-check.ts';
import {parseProgressChange} from '../src/lib/progress.ts';
import {courses} from '../src/data/courses.ts';
const file=(path:string,text:string)=>({path,bytes:new TextEncoder().encode(text)});
test('every typesetting chapter has a bilingual task profile and an existing progress ID',()=>{
 const chapters=courses.filter(course=>['latex','typst'].includes(course.id)).flatMap(course=>course.chapters.map(chapter=>`${course.id}-${chapter.id}`));
 assert.equal(documentTasks.length,31);assert.deepEqual([...new Set(documentTasks.map(t=>t.progressId))].sort(),chapters.sort());
 for(const task of documentTasks){
  assert(parseProgressChange({kind:'lesson',contentId:task.progressId,completed:true}));
  assert(task.title.de&&task.title.en);assert(task.requirements.length>0);
  assert.equal(new Set(task.requirements.map(rule=>rule.id)).size,task.requirements.length);
  for(const rule of task.requirements)assert(rule.label.de&&rule.label.en&&rule.help.de&&rule.help.en);
 }
});
test('LaTeX task matches reachable constructs with positions, never disconnected files or comments',()=>{
 const files=[file('main.tex','\\documentclass{article}\n\\begin{document}\n\\input{part}\n\\ref{method}\n\\end{document}'),file('part.tex','\\section{Method}\\label{method}'),file('unrelated.tex','\\begin{equation}x=1\\end{equation}')];
 const report=analyzeDocument(files,'latex','main.tex');const task=checkDocumentTask(files,report,'latex-abschlussprojekt')!;
 assert.equal(task.findings.find(rule=>rule.id==='math')?.detected,false);
 assert.deepEqual(task.findings.find(rule=>rule.id==='heading'),{id:'heading',detected:true,file:'part.tex',line:1,column:1});
 assert.equal(task.findings.find(rule=>rule.id==='reference')?.line,4);
 const commented=[file('main.tex','% \\label{x}\n\\verb|\\ref{x}|')];
 assert(checkDocumentTask(commented,analyzeDocument(commented,'latex','main.tex'),'latex-verweise')!.findings.every(rule=>!rule.detected));
 assert.equal(report.compilation,'not-run');
});
test('Typst task ignores strings/comments/raw text and follows included files',()=>{
 const files=[file('main.typ','#include "body.typ"\n// #assert(false)\n#let note = "@fake <fake>"\n`#assert(false)`'),file('body.typ','= Result <result>\nSee @result.')];
 const report=analyzeDocument(files,'typst','main.typ');
 assert(checkDocumentTask(files,report,'typst-projektpruefung')!.findings.every(rule=>rule.detected));
 const programming=checkDocumentTask(files,report,'typst-programmieren')!;
 assert.equal(programming.findings.find(rule=>rule.id==='function')?.detected,true);
 assert.equal(programming.findings.find(rule=>rule.id==='assert')?.detected,false);
 const quoted=[file('main.typ','#let text = "@fake <fake> table() image()"')];
 assert(checkDocumentTask(quoted,analyzeDocument(quoted,'typst','main.typ'),'typst-tabellen-grafiken')!.findings.every(rule=>!rule.detected));
});
test('task mismatch and arbitrary progress IDs cannot create task results; missing constructs stay explicit',()=>{
 const files=[file('main.typ','= A heading')];const report=analyzeDocument(files,'typst','main.typ');
 assert.equal(checkDocumentTask(files,report,'latex-struktur'),undefined);
 assert.equal(checkDocumentTask(files,report,'untrusted-id'),undefined);
 const findings=checkDocumentTask(files,report,'typst-projektpruefung')!.findings;
 assert.equal(findings.filter(rule=>!rule.detected).length,2);
 assert(findings.filter(rule=>!rule.detected).every(rule=>rule.file===undefined));
 assert.equal(parseProgressChange({kind:'lesson',contentId:'untrusted-id',completed:true}),null);
});
test('literal LaTeX math forms are recognised without evaluating their results',()=>{
 for(const math of ['$x=1$',String.raw`\(x=1\)`,String.raw`\[x=1\]`,String.raw`\begin{align}x&=1\end{align}`]){
  const files=[file('main.tex',math)];assert.equal(checkDocumentTask(files,analyzeDocument(files,'latex','main.tex'),'latex-mathematik')?.findings[0]?.detected,true,math);
 }
});
test('the existing Typst reference exercise keeps its chapter progress and exposes an incorrect target',()=>{
 const starter='#set heading(numbering: "1.1")\n= Method <method>\nRead @methods.';
 const files=[file('main.typ',starter)];const broken=analyzeDocument(files,'typst','main.typ');
 assert(broken.diagnostics.some(item=>item.code==='REFERENCE'));
 assert(checkDocumentTask(files,broken,'typst-verweis')!.findings.every(item=>item.detected));
 const corrected=[file('main.typ',starter.replace('@methods','@method'))];
 assert(!analyzeDocument(corrected,'typst','main.typ').diagnostics.some(item=>item.code==='REFERENCE'));
 assert.equal(documentTasks.find(task=>task.id==='typst-verweis')?.progressId,'typst-tabellen-grafiken');
});
