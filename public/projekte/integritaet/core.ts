import{readdir,lstat}from'node:fs/promises';import{join}from'node:path';import{createHash}from'node:crypto';import{readBounded}from'./input.ts';
export interface Entry{name:string;size:number;sha256:string}
const validName=(name:string)=>/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(name);
export async function snapshot(directory:string):Promise<Entry[]>{
 const root=await lstat(directory);if(!root.isDirectory()||root.isSymbolicLink())throw new Error('Use a real, flat practice directory');
 const files=await readdir(directory,{withFileTypes:true});if(files.length>32)throw new Error('At most 32 files allowed');
 const result:Entry[]=[];
 for(const file of files.sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0)){
  if(!file.isFile()||!validName(file.name))throw new Error('Only regular files with simple names; no links or directories');
  const data=await readBounded(join(directory,file.name));result.push({name:file.name,size:data.length,sha256:createHash('sha256').update(data).digest('hex')});
 }
 return result;
}
export function parseManifest(value:unknown):Entry[]{
 if(!Array.isArray(value)||value.length>32)throw new Error('Invalid manifest');const names=new Set<string>();
 return value.map((v:unknown)=>{if(!v||typeof v!=='object'||!('name'in v)||typeof v.name!=='string'||!validName(v.name)||names.has(v.name)||!('size'in v)||typeof v.size!=='number'||!Number.isInteger(v.size)||v.size<0||v.size>65536||!('sha256'in v)||typeof v.sha256!=='string'||! /^[a-f0-9]{64}$/.test(v.sha256))throw new Error('Invalid manifest entry');names.add(v.name);return{name:v.name,size:v.size,sha256:v.sha256};});
}
export function compare(expected:readonly Entry[],actual:readonly Entry[]){
 const old=new Map(expected.map(v=>[v.name,v])),now=new Map(actual.map(v=>[v.name,v]));
 return{added:[...now.keys()].filter(name=>!old.has(name)).sort(),removed:[...old.keys()].filter(name=>!now.has(name)).sort(),changed:[...old.keys()].filter(name=>now.has(name)&&(old.get(name)!.sha256!==now.get(name)!.sha256||old.get(name)!.size!==now.get(name)!.size)).sort()};
}
