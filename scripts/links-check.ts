import {readdir,readFile} from 'node:fs/promises';
import {resolve,join,relative,extname} from 'node:path';
const root=resolve('dist');
async function files(directory:string):Promise<string[]> {return(await Promise.all((await readdir(directory,{withFileTypes:true})).map(entry=>entry.isDirectory()?files(join(directory,entry.name)):[join(directory,entry.name)]))).flat();}
const paths=await files(root),known=new Set(paths),html=new Map<string,string>();
for(const path of paths)if(extname(path)==='.html'&&!/ \d+\.html$/.test(path))html.set(path,await readFile(path,'utf8'));
const ids=new Map([...html].map(([path,body])=>[path,new Set([...body.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]))]));
const problems:string[]=[];let count=0;
for(const[path,body]of html){
 const route='/'+relative(root,path).replace(/index\.html$/,'');
 for(const match of body.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const value=match[1]!.replaceAll('&amp;','&');
  if(!value||/^(?:data:|mailto:|tel:)/.test(value))continue;
  const url=new URL(value,'https://it-worlds.maki26.workers.dev'+route);
  if(url.origin!=='https://it-worlds.maki26.workers.dev')continue;
  if(url.pathname.startsWith('/api/'))continue;
  const target=join(root,decodeURIComponent(url.pathname));
  const file=known.has(target)?target:known.has(join(target,'index.html'))?join(target,'index.html'):undefined;
  count++;
  if(!file){if(url.pathname==='/404/'||url.pathname==='/en/404/')continue;problems.push(`${route}: missing ${url.pathname}`);continue;}
  if(url.hash&&ids.has(file)&&!ids.get(file)!.has(decodeURIComponent(url.hash.slice(1))))problems.push(`${route}: missing anchor ${url.pathname+url.hash}`);
 }
}
if(problems.length){console.error([...new Set(problems)].join('\n'));process.exitCode=1;}
else console.log(`PASS: ${count} internal links, assets and anchors in ${html.size} HTML pages.`);
