/** Local-only full-stack preview; ephemeral service token stays in process memory. */
import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import {documentRequest} from '../worker/documents.ts';
const token=randomBytes(32).toString('hex');
const upstream=new URL(process.env.IT_WORLDS_PREVIEW_ORIGIN??'http://127.0.0.1:4323');
if(!['localhost','127.0.0.1'].includes(upstream.hostname))throw new Error('Preview upstream must be localhost.');
const child=spawn(process.execPath,['--experimental-strip-types','services/document-compiler/server.ts'],{env:{...process.env,IT_WORLDS_COMPILER_TOKEN:token,IT_WORLDS_COMPILER_PORT:'8795'},stdio:['ignore','inherit','inherit']});
const server=createServer(async(req,res)=>{
 try{
  const url=new URL(req.url??'/','http://127.0.0.1:8796');
  if(url.pathname.startsWith('/api/documents/')){
   const chunks:Buffer[]=[];let size=0;for await(const chunk of req){const b=Buffer.from(chunk);size+=b.length;if(size>12*1024*1024){res.writeHead(413);res.end();return;}chunks.push(b);}
   const headers=new Headers();for(const[key,value]of Object.entries(req.headers))if(typeof value==='string')headers.set(key,value);
   const body=req.method==='GET'||req.method==='HEAD'?undefined:Buffer.concat(chunks);
   const result=await documentRequest(new Request(url,{method:req.method,headers,body}),{DOCUMENT_COMPILER_URL:'http://127.0.0.1:8795',DOCUMENT_COMPILER_TOKEN:token});
   res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer()));
  }else{
   const result=await fetch(new URL(url.pathname+url.search,upstream));res.writeHead(result.status,Object.fromEntries([...result.headers].filter(([key])=>!['content-encoding','content-length','transfer-encoding'].includes(key))));res.end(Buffer.from(await result.arrayBuffer()));
  }
 }catch{res.writeHead(502);res.end('Preview unavailable');}
});
server.listen(8796,'127.0.0.1',()=>console.log('Document preview: http://127.0.0.1:8796'));
const stop=()=>{child.kill('SIGTERM');server.close(()=>process.exit());};process.on('SIGINT',stop);process.on('SIGTERM',stop);child.on('exit',()=>server.close());
