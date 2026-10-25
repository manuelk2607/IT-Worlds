// Runs only inside the disposable, networkless compiler container, never directly on the host.
import {cpSync, existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {join,dirname,basename} from 'node:path';
const format=process.argv[2], main=process.argv[3];
if(!['latex','typst'].includes(format??'')||!main||main.startsWith('/')||main.split('/').includes('..'))process.exit(2);
cpSync('/input','/work/project',{recursive:true});
const project='/work/project';
const cwd=format==='latex'?join(project,dirname(main)):project;
const entry='./'+(format==='latex'?basename(main):main);
let output='';let failed=false;
const run=(command:string,args:string[])=>{
 const result=spawnSync(command,args,{cwd,encoding:'utf8',timeout:15000,maxBuffer:256*1024,env:{...process.env,openout_any:'p',shell_escape:'f',MKTEXPK:'0',MKTEXTFM:'0',TEXMFOUTPUT:cwd}});
 output=(result.stdout??'')+(result.stderr??'');
 if(result.error)output+='\n'+result.error.message;
 if(result.status!==0)failed=true;
 return result.status===0;
};
if(format==='typst') run('typst',['compile','--root',cwd,'--ignore-system-fonts','--font-path',cwd,'--diagnostic-format','short',entry,'/work/result.pdf']);
else {
 const args=['-no-shell-escape','-no-parse-first-line','-interaction=nonstopmode','-halt-on-error','-file-line-error','-jobname=itworlds',entry];
 if(run('xelatex',args)) {
   if(existsSync(join(cwd,'itworlds.bcf')))run('biber',['itworlds']);
   else if(existsSync(join(cwd,'itworlds.aux'))&&readFileSync(join(cwd,'itworlds.aux'),'utf8').includes('\\bibdata'))run('bibtex',['itworlds']);
   if(!failed){run('xelatex',args);if(!failed)run('xelatex',args);}
 }
}
const path=format==='typst'?'/work/result.pdf':join(cwd,'itworlds.pdf');
let pdf:string|undefined;const previews:string[]=[];
if(!failed&&existsSync(path)&&statSync(path).size<=8*1024*1024){
 const bytes=readFileSync(path);
 if(bytes.subarray(0,5).toString()==='%PDF-'){
   pdf=bytes.toString('base64');
   // Raster previews avoid executing PDF actions or embedded scripts in the web page.
   const preview=spawnSync('pdftoppm',['-png','-r','72','-f','1','-l','3','-scale-to','1000',path,'/work/page'],{encoding:'utf8',timeout:10000,maxBuffer:64*1024});
   if(preview.status===0)for(const file of readdirSync('/work').filter(name=>/^page-\d+\.png$/.test(name)).sort()){
     const image=readFileSync(join('/work',file));if(image.length<=1024*1024)previews.push(image.toString('base64'));
   }
 }
}
if(!failed&&!pdf)output+='\nIT-Worlds: no valid PDF within the 8 MiB output limit was produced.';
if(pdf&&!previews.length)output+='\nIT-Worlds: raster preview unavailable within resource limits; PDF download is available.';
if(format==='latex'&&dirname(main)!=='.')output=output.replace(/^(\.\/)?([^:\n]+):(\d+):/gm,(match:string,_prefix:string|undefined,file:string,line:string)=>file.startsWith('/')?match:`${dirname(main)}/${file}:${line}:`);
console.log(JSON.stringify({success:!!pdf,log:output.slice(-60000),pdf,previews,engine:format==='typst'?'Typst 0.15.1':'XeLaTeX + BibTeX/Biber'}));
