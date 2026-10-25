/** Private sidecar API. Bind localhost; expose only through an authenticated TLS proxy on a dedicated compiler host. */
import {createServer} from 'node:http';
import {timingSafeEqual} from 'node:crypto';
import {compileProject,cleanupExpiredProjects,compilerAvailable} from './runner.ts';
import {projectLimits,type ProjectFile} from '../../src/lib/document-project.ts';
const token=process.env.IT_WORLDS_COMPILER_TOKEN;
if(!token||token.length<32)throw new Error('IT_WORLDS_COMPILER_TOKEN must contain at least 32 characters.');
await cleanupExpiredProjects();
setInterval(()=>void cleanupExpiredProjects().catch(()=>{}),5*60*1000).unref();
const expected=Buffer.from(`Bearer ${token}`);let active=0;let windowStart=Date.now(),attempts=0;
const server=createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json');res.setHeader('X-Content-Type-Options','nosniff');
 const reply=(status:number,data:unknown)=>{res.statusCode=status;res.end(JSON.stringify(data));};
 const auth=Buffer.from(req.headers.authorization??'');
 if(auth.length!==expected.length||!timingSafeEqual(auth,expected)){reply(401,{error:'UNAUTHORISED'});return;}
 if(req.method==='GET'&&req.url==='/status'){reply(200,{available:await compilerAvailable()});return;}
 if(req.method!=='POST'||req.url!=='/compile'){reply(404,{error:'NOT_FOUND'});return;}
 if(Date.now()-windowStart>3600000){windowStart=Date.now();attempts=0;}
 if(attempts>=60){reply(429,{error:'RATE_LIMIT'});return;}
 if(active>=1){reply(429,{error:'BUSY'});return;}active++;
 attempts++;
 try{
  let size=0;const chunks:Buffer[]=[];
  for await(const chunk of req){const bytes=Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk);size+=bytes.length;if(size>12*1024*1024){reply(413,{error:'SIZE'});return;}chunks.push(bytes);}
  const body:unknown=JSON.parse(Buffer.concat(chunks).toString('utf8'));
  if(!body||typeof body!=='object'||!('format'in body)||!['latex','typst'].includes(String(body.format))||!('main'in body)||typeof body.main!=='string'||!('files'in body)||!Array.isArray(body.files)||body.files.length>projectLimits.files)throw new Error('INPUT');
  const files:ProjectFile[]=body.files.map((file:unknown)=>{
   if(!file||typeof file!=='object'||!('path'in file)||typeof file.path!=='string'||!('base64'in file)||typeof file.base64!=='string'||file.base64.length>Math.ceil(projectLimits.file/3)*4||file.base64.length%4!==0||!/^[A-Za-z0-9+/]*={0,2}$/.test(file.base64))throw new Error('INPUT');
   return {path:file.path,bytes:Buffer.from(file.base64,'base64')};
  });
  reply(200,await compileProject(files,body.format==='latex'?'latex':'typst',body.main));
 }catch{reply(422,{error:'COMPILATION_FAILED'});}finally{active--;}
});
server.requestTimeout=15000;server.headersTimeout=10000;
server.listen(Number(process.env.IT_WORLDS_COMPILER_PORT??8795),'127.0.0.1',()=>{const address=server.address();if(address&&typeof address==='object')console.log(`Private document compiler listening on 127.0.0.1:${address.port}`);});
