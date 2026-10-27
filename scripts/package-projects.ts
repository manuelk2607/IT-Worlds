import {mkdtemp,copyFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {projectArchives} from '../src/data/practice-projects.ts';
const directory=await mkdtemp(join(tmpdir(),'it-worlds-project-'));
try{
 for(const project of projectArchives){
  const source=fileURLToPath(new URL(`../${project.source}`,import.meta.url));const archive=join(directory,`${project.id}.zip`);
  execFileSync('zip',['-q','-X',archive,...project.files],{cwd:source});
  await copyFile(archive,new URL(`../public/downloads/${project.id}.zip`,import.meta.url));
  console.log(`Packaged ${project.files.length} source files for ${project.id}.`);
 }
}finally{await rm(directory,{recursive:true,force:true});}
