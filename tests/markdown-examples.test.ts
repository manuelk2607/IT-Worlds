import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createSatteriMarkdownProcessor} from '@astrojs/markdown-satteri';
import {markdownCourse} from '../src/data/course-markdown.ts';

test('published Markdown renders its documented structure, links and GFM extensions',async()=>{
 const renderer=await createSatteriMarkdownProcessor({syntaxHighlight:false});
 const rendered=new Map<string,string>();
 for(const chapter of markdownCourse.chapters)for(const section of chapter.sections){
  if(section.language!=='Markdown'||!section.code)continue;
  rendered.set(chapter.id,(await renderer.render(section.code)).code);
 }
 assert.equal(rendered.size,5);
 assert.match(rendered.get('struktur')??'',/<h1[^>]*>Learning journal<\/h1>/);
 assert.match(rendered.get('struktur')??'',/<h3[^>]*>First entry<\/h3>/);
 assert.match(rendered.get('listen-code')??'',/<ol>/);
 assert.match(rendered.get('listen-code')??'',/<blockquote>/);
 assert.match(rendered.get('listen-code')??'',/class="language-typescript"/);
 assert.match(rendered.get('links-bilder')??'',/alt="Read the task, attempt a solution, check the result"/);
 assert.ok(existsSync(new URL('../public/examples/markdown/learning-cycle.svg',import.meta.url)));
 const table=rendered.get('dialekte')??'';
 assert.match(table,/<table>/);
 assert.match(table,/<td>Read \| practise<\/td>/);
 assert.equal((table.match(/type="checkbox"/g)??[]).length,2);
 assert.equal((table.match(/checked/g)??[]).length,1);
 assert.match(rendered.get('abschluss')??'',/href="https:\/\/it-worlds\.maki26\.workers\.dev\/en\/themen\/programmiersprachen\/typescript\/"/);
});

test('TypeScript inside the published Markdown fences is strict and produces the stated outputs',()=>{
 const dir=mkdtempSync(join(tmpdir(),'it-worlds-markdown-'));
 try{
  const files:string[]=[];
  for(const chapter of markdownCourse.chapters)for(const section of chapter.sections){
   if(section.language!=='Markdown'||!section.code)continue;
   for(const [index,match]of [...section.code.matchAll(/^```typescript\n([\s\S]*?)\n```$/gm)].entries()){
    const file=join(dir,`${chapter.id}-${index}.ts`);writeFileSync(file,match[1]!);files.push(file);
    const result=execFileSync(process.execPath,['--experimental-strip-types',file],{encoding:'utf8',timeout:10000});
    assert.equal(result.trim(),chapter.id==='abschluss'?'40 minutes':'50');
   }
  }
  assert.equal(files.length,2);
  execFileSync(process.execPath,[fileURLToPath(new URL('../node_modules/typescript/bin/tsc',import.meta.url)),'--ignoreConfig','--strict','--noEmit','--target','ES2023','--module','ESNext','--moduleDetection','force','--types','node','--typeRoots',fileURLToPath(new URL('../node_modules/@types',import.meta.url)),...files],{encoding:'utf8',timeout:30000});
 }finally{rmSync(dir,{recursive:true,force:true});}
});
