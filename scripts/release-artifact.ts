import {readdir,stat} from 'node:fs/promises';
import {join} from 'node:path';
export async function verifyReleaseArtifact(directory:string):Promise<number>{
 let count=0;
 async function visit(path:string){
  for(const entry of await readdir(path,{withFileTypes:true})){
   if(entry.isSymbolicLink())throw new Error(`Unexpected symlink in release: ${entry.name}`);
   if(/ \d+(?:\.|$)/.test(entry.name))throw new Error(`Possible synchronisation copy in release: ${entry.name}`);
   if(entry.isDirectory())await visit(join(path,entry.name));
   else if(entry.isFile())count++;
  }
 }
 await visit(directory);
 for(const path of ['index.html','en/index.html','404.html','en/404/index.html','sitemap.xml','robots.txt']){
  if(!(await stat(join(directory,path))).isFile())throw new Error(`Missing release file: ${path}`);
 }
 return count;
}
