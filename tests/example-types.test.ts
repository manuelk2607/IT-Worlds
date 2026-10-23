import test from 'node:test';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {courses} from '../src/data/courses.ts';
test('all published TypeScript examples pass strict type checking',()=>{
 const dir=mkdtempSync(join(tmpdir(),'it-worlds-typecheck-'));
 try{
  const files:string[]=[];
  for(const course of courses)for(const chapter of course.chapters)for(const [index,section]of chapter.sections.entries())if(section.language==='TypeScript'&&section.code){
   const path=join(dir,`${course.id}-${chapter.id}-${index}.ts`);writeFileSync(path,section.code);files.push(path);
  }
  execFileSync(process.execPath,[fileURLToPath(new URL('../node_modules/typescript/bin/tsc',import.meta.url)),'--ignoreConfig','--strict','--noEmit','--target','ES2023','--module','ESNext','--moduleResolution','Bundler','--moduleDetection','force','--lib','ES2023,DOM','--types','node','--typeRoots',fileURLToPath(new URL('../node_modules/@types',import.meta.url)),...files],{encoding:'utf8',timeout:30000});
 }finally{rmSync(dir,{recursive:true,force:true});}
});
