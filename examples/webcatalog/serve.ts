import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const allowed:Record<string,{file:string;type:string}>={
 '/':{file:'index.html',type:'text/html'},'/index.html':{file:'index.html',type:'text/html'},'/course.html':{file:'course.html',type:'text/html'},'/about.html':{file:'about.html',type:'text/html'},
 '/style.css':{file:'style.css',type:'text/css'},'/app.js':{file:'dist/app.js',type:'text/javascript'},'/catalog.js':{file:'dist/catalog.js',type:'text/javascript'},
};
const server=createServer(async(request,response)=>{
 const path=new URL(request.url??'/', 'http://localhost').pathname,asset=allowed[path];response.setHeader('X-Content-Type-Options','nosniff');
 if(request.method!=='GET'||!asset){response.writeHead(404,{'Content-Type':'text/plain'});response.end('Not found');return;}
 try{const data=await readFile(new URL(asset.file,import.meta.url));response.writeHead(200,{'Content-Type':asset.type+'; charset=utf-8','Cache-Control':'no-store'});response.end(data);}
 catch{response.writeHead(503,{'Content-Type':'text/plain'});response.end('Build first: npm run build');}
});
server.listen(8811,'127.0.0.1',()=>console.log('Catalog project: http://127.0.0.1:8811/'));
server.on('error',()=>{console.error('Unable to start the project server. Check port 8811.');process.exitCode=1;});
for(const signal of ['SIGINT','SIGTERM']as const)process.on(signal,()=>{server.close();server.closeAllConnections();});
