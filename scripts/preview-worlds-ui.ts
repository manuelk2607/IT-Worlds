// Local visual fixture only. Never contacts an IdP or grants a real session.
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');
const types:Record<string,string>={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.woff2':'font/woff2'};
createServer(async(req,res)=>{
 const url=new URL(req.url??'/','http://localhost:4188');
 const json=(data:unknown,status=200)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
 const mode=new URL(req.headers.referer??'http://localhost').searchParams.get('preview');
 if(url.pathname==='/api/worlds/status'){
  json({enabled:mode!=='disabled',authenticated:mode==='active'||mode==='link',csrf:'visual-fixture-only',
   accountState:'ACCOUNT_LINK_REQUIRED',linkEnabled:mode==='link'});return;
 }
 if(mode==='link'&&req.method==='POST'){
  if(url.pathname==='/api/worlds/link/prepare'){
   json({proof:'visual-fixture-only',worldsEmail:'worlds@example.invalid',localEmail:'it@example.invalid'});return;
  }
  if(url.pathname==='/api/worlds/link/confirm'){json({error:'LINK_REFUSED'},409);return;}
 }
 if(url.pathname==='/api/session'){json({error:'UNAUTHENTICATED'},401);return;}
 if(url.pathname.startsWith('/api/')||url.pathname.startsWith('/auth/')){json({error:'VISUAL_FIXTURE_ONLY'},503);return;}
 let path=resolve(root,'.'+decodeURIComponent(url.pathname));
 if(path!==root&&!path.startsWith(root+sep)){res.writeHead(400);res.end();return;}
 try{if((await stat(path)).isDirectory())path=resolve(path,'index.html');const bytes=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]??'application/octet-stream'});res.end(bytes);}
 catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(resolve(root,url.pathname.startsWith('/en/')?'en/404/index.html':'404.html')));}
}).listen(4188,'127.0.0.1',()=>console.log('Visual fixture only: http://localhost:4188/konto/?preview=active'));
