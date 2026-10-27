import {createServer} from 'node:http';
export type Fault='none'|'status'|'type'|'content'|'schema'|'missing'|'redirect'|'oversize'|'slow';
export const faults:Fault[]=['none','status','type','content','schema','missing','redirect','oversize','slow'];
/** Read-only localhost teaching service; no account, real user data or remote binding. */
export function createDemoServer(fault:Fault='none'){
 return createServer((request,response)=>{
  response.setHeader('X-Content-Type-Options','nosniff');response.setHeader('Cache-Control','no-store');
  const send=(status:number,type:string,body:string)=>{response.writeHead(status,{'Content-Type':type});response.end(body);};
  if(request.method!=='GET'){send(405,'text/plain','Method not allowed');return;}
  switch(request.url){
   case '/':
    if(fault==='redirect'){response.writeHead(302,{Location:'/health'});response.end();return;}
    if(fault==='slow'){const timer=setTimeout(()=>send(200,'text/html','<h1>Learning catalog</h1>'),1000);response.once('close',()=>clearTimeout(timer));return;}
    send(fault==='status'?500:200,fault==='type'?'application/json':'text/html; charset=utf-8',fault==='oversize'?'X'.repeat(70000):fault==='content'?'<h1>Old release</h1>':'<!doctype html><html lang="en"><title>Learning catalog</title><h1>Learning catalog</h1><p>A read-only teaching service.</p></html>');return;
   case '/health':send(200,'application/json',JSON.stringify({status:'ok',schema:1}));return;
   case '/api/courses':send(200,'application/json',JSON.stringify(fault==='schema'?[{id:'1',title:7}]:[{id:1,title:'HTTP foundations'},{id:2,title:'Delivery checks'}]));return;
   default:send(fault==='missing'?200:404,'text/plain','Not found');
  }
 });
}
