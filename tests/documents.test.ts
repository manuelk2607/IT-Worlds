import test from 'node:test';
import assert from 'node:assert/strict';
import {deflateRawSync} from 'node:zlib';
import {readProjectZip,crc32,projectPath,validateProject,sourceText,resolveProjectPath,ProjectError} from '../src/lib/document-project.ts';
import {analyzeDocument,maskSource} from '../src/lib/document-analysis.ts';
import {documentRequest} from '../worker/documents.ts';
import {compilerDiagnostics} from '../src/lib/compiler-diagnostics.ts';
const file=(path:string,text:string)=>({path,bytes:new TextEncoder().encode(text)});
function zip(items:{name:string;content:string;method?:number;attrs?:number;declared?:number}[]){
 const locals:Buffer[]=[],central:Buffer[]=[];let offset=0;
 for(const item of items){
  const content=Buffer.from(item.content),name=Buffer.from(item.name),packed=item.method===8?deflateRawSync(content):content;
  const local=Buffer.alloc(30);local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt16LE(0x800,6);local.writeUInt16LE(item.method??0,8);local.writeUInt32LE(crc32(content),14);local.writeUInt32LE(packed.length,18);local.writeUInt32LE(item.declared??content.length,22);local.writeUInt16LE(name.length,26);
  locals.push(local,name,packed);
  const entry=Buffer.alloc(46);entry.writeUInt32LE(0x02014b50);entry.writeUInt16LE(0x0314,4);entry.writeUInt16LE(20,6);entry.writeUInt16LE(0x800,8);entry.writeUInt16LE(item.method??0,10);entry.writeUInt32LE(crc32(content),16);entry.writeUInt32LE(packed.length,20);entry.writeUInt32LE(item.declared??content.length,24);entry.writeUInt16LE(name.length,28);entry.writeUInt32LE(item.attrs??0,38);entry.writeUInt32LE(offset,42);central.push(entry,name);offset+=local.length+name.length+packed.length;
 }
 const directory=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(items.length,8);end.writeUInt16LE(items.length,10);end.writeUInt32LE(directory.length,12);end.writeUInt32LE(offset,16);
 return Buffer.concat([...locals,directory,end]);
}
test('project intake rejects traversal, absolute paths, aliases, executable files and overlarge payloads',()=>{
 for(const path of ['../main.tex','/main.tex','C:main.tex','a\\main.tex','a/./main.tex','a//main.tex','.env','a/../b.typ','a\0.typ'])assert.throws(()=>projectPath(path),ProjectError);
 assert.throws(()=>validateProject([file('x.typ',''),file('X.typ','')]),/DUPLICATE/);
 assert.throws(()=>validateProject([file('script.exe','x')]),/TYPE/);
 assert.throws(()=>validateProject([{path:'huge.tex',bytes:new Uint8Array(2097153)}]),/SIZE/);
 assert.throws(()=>sourceText({path:'x.tex',bytes:new Uint8Array([0xff])}),/ENCODING/);
 assert.equal(resolveProjectPath('chapters/one.typ','../img/a.png'),'img/a.png');
 assert.equal(resolveProjectPath('main.typ','../secret.txt'),null);
});
test('ZIP intake accepts stored/deflated multi-file projects and verifies actual CRC/size',async()=>{
 const files=await readProjectZip(zip([{name:'main.typ',content:'#include "part.typ"',method:8},{name:'part.typ',content:'= Title'}]));
 assert.equal(files.length,2);assert.equal(sourceText(files[1]!), '= Title');
 const broken=zip([{name:'main.typ',content:'abc'}]);broken[30+'main.typ'.length]=0;
 await assert.rejects(readProjectZip(broken),/ZIP/);
 await assert.rejects(readProjectZip(zip([{name:'main.typ',content:'A'.repeat(20000),method:8} ])),/SIZE/);
 // Lying central/local output sizes cannot bypass the streaming size guard.
 await assert.rejects(readProjectZip(zip([{name:'main.typ',content:'X'.repeat(8000),method:8,declared:2}])),/SIZE/);
});
test('ZIP rejects symlinks, nested archives, duplicate case, encryption and corrupt directories',async()=>{
 for(const items of [[{name:'../main.tex',content:'x'}],[{name:'bad.zip',content:'x'}],[{name:'link.tex',content:'target',attrs:0xa1ff0000}],[{name:'A.typ',content:'x'},{name:'a.typ',content:'x'}]])await assert.rejects(readProjectZip(zip(items)),ProjectError);
 const encrypted=zip([{name:'x.typ',content:'x'}]);encrypted.writeUInt16LE(0x801,6);encrypted.writeUInt16LE(0x801,31+5+8);
 await assert.rejects(readProjectZip(encrypted),ProjectError);
 await assert.rejects(readProjectZip(new Uint8Array(100)),/ZIP/);
});
test('LaTeX analyzer follows multi-file resources and explains missing references without execution',()=>{
 const main=file('main.tex','\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\input{chapters/one}\n\\ref{missing}\n\\end{document}');
 const report=analyzeDocument([main,file('chapters/one.tex','\\section{Hello}\\label{hello}\n\\includegraphics{image.png}'),file('image.png','binary')],'latex','main.tex');
 assert.deepEqual(report.checkedFiles,['main.tex','chapters/one.tex']);
 assert.equal(report.compilation,'not-run');assert.deepEqual(report.packages,['amsmath']);
 const ref=report.diagnostics.find(d=>d.code==='REFERENCE');assert.equal(ref?.line,5);assert.equal(ref?.column,1);
 assert.equal(report.diagnostics.filter(d=>d.severity==='error').length,0);
 const broken=analyzeDocument([file('a.tex','\\begin{document}\n{broken\n\\end{itemize}\n}')],'latex','a.tex');
 assert(broken.diagnostics.some(d=>d.code==='ENVIRONMENT'));
 assert(analyzeDocument([file('a.tex','}')],'latex','a.tex').diagnostics.some(d=>d.code==='BRACE_CLOSE'));
 assert(!analyzeDocument([file('a.tex','{}')],'latex','a.tex').diagnostics.some(d=>d.code.startsWith('BRACE')));
});
test('comments, escaped percent and verbatim do not become LaTeX findings',()=>{
 const text='\\documentclass{article}\n\\begin{document}\n% \\ref{fake}\n\\verb|\\ref{fake}|\n\\begin{verbatim}\n\\ref{fake}\n\\end{verbatim}\n\\end{document}';
 const report=analyzeDocument([file('a.tex',text)],'latex','a.tex');
 assert(!report.diagnostics.some(d=>d.code==='REFERENCE'));
 assert.equal(maskSource('a\\%still%gone','latex'),'a\\%still     ');
});
test('Typst analysis follows modules, reads bibliography, detects missing literal references and preserves positions',()=>{
 const report=analyzeDocument([file('main.typ','#include "chapters/result.typ"\n#bibliography("refs.bib")\nSee @paper.'),file('chapters/result.typ','= Result <result>\nSee @missing.'),file('refs.bib','@book{paper, title={A}}')],'typst','main.typ');
 assert(report.checkedFiles.includes('refs.bib'));assert.equal(report.diagnostics.filter(d=>d.code==='REFERENCE').length,1);assert.equal(report.diagnostics.find(d=>d.code==='REFERENCE')?.file,'chapters/result.typ');
 const code=file('main.typ','/* @fake /* @nested */ */\n`@raw`\n= Title <ok>\nSee @ok.\n#import "@preview/test:1.0.0": item');
 assert(!analyzeDocument([code],'typst','main.typ').diagnostics.some(d=>d.code==='REFERENCE'));
});
test('dependency cycles, duplicate labels and unsafe resource paths are bounded findings',()=>{
 const r=analyzeDocument([file('main.typ','#include "other.typ"\n= A <same>\n#image("../../secret.png")'),file('other.typ','#include "main.typ"\n= B <same>')],'typst','main.typ');
 for(const code of ['CYCLE','DUPLICATE_LABEL','UNSAFE_PATH'])assert(r.diagnostics.some(d=>d.code===code),code);
});
test('compiler endpoint fails closed without configuration and rejects cross-origin uploads',async()=>{
 const status=await documentRequest(new Request('https://example.test/api/documents/status'),{});assert.deepEqual(await status.json(),{available:false});
 const denied=await documentRequest(new Request('https://example.test/api/documents/compile',{method:'POST',headers:{origin:'https://evil.test'},body:'{}'}),{});assert.equal(denied.status,403);
 const missing=await documentRequest(new Request('https://example.test/api/documents/compile',{method:'POST',headers:{origin:'https://example.test'},body:'{}'}),{});assert.equal(missing.status,503);
});
test('compiler positions only link to actual project files and map errors to useful teaching hints',()=>{
 const items=compilerDiagnostics('main.typ:7:8: error: cannot reference heading without numbering\n./main.tex:8: Undefined control sequence.\n/etc/passwd:1:1: error: test',['main.typ','main.tex']);
 assert.equal(items.length,2);assert.equal(items[0]?.code,'COMPILER_NUMBERING');assert.equal(items[0]?.column,8);assert.equal(items[1]?.code,'COMPILER_NAME');assert.equal(items[1]?.column,1);
});
test('literal filecontents bibliography is recognised as generated data rather than a missing upload',()=>{
 const report=analyzeDocument([file('main.tex','\\begin{filecontents*}{references.bib}\n@article{paper, title={Title}}\n\\end{filecontents*}\n\\documentclass{article}\n\\usepackage{biblatex}\n\\addbibresource{references.bib}\n\\begin{document}\\textcite{paper}\\end{document}')],'latex','main.tex');
 assert(!report.diagnostics.some(d=>['MISSING_FILE','REFERENCE'].includes(d.code)));
 assert(report.diagnostics.some(d=>d.code==='STATIC_LIMIT'));
});
test('Typst URLs and comment markers inside quoted values remain intact while real comments are masked',()=>{
 const text='#let url = "https://example.test/path"\n// @not-a-reference\n= Result <ok>\nSee @ok.';
 const masked=maskSource(text,'typst');assert(masked.includes('https://example.test/path'));assert(!masked.includes('@not-a-reference'));
 assert(!analyzeDocument([file('main.typ',text)],'typst','main.typ').diagnostics.some(d=>d.code==='REFERENCE'));
});
test('LaTeX includes share the main working directory, including a surrounding exported project folder',()=>{
 const report=analyzeDocument([file('project/main.tex','\\documentclass{article}\n\\begin{document}\n\\input{chapters/one}\n\\end{document}'),file('project/chapters/one.tex','\\input{chapters/two}'),file('project/chapters/two.tex','\\section{Result}')],'latex','project/main.tex');
 assert.deepEqual(report.checkedFiles,['project/main.tex','project/chapters/one.tex','project/chapters/two.tex']);assert(!report.diagnostics.some(d=>d.code==='MISSING_FILE'));
});
