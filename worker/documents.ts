export interface DocumentCompilerEnv {DOCUMENT_COMPILER_URL?:string; DOCUMENT_COMPILER_TOKEN?:string}
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
export async function documentRequest(request:Request,env:DocumentCompilerEnv):Promise<Response>{
 const path=new URL(request.url).pathname;
 const status=path==='/api/documents/status';
 if((status&&request.method!=='GET')||(!status&&request.method!=='POST'))return Response.json({error:'METHOD_NOT_ALLOWED'},{status:405,headers});
 if(!status&&(request.headers.get('origin')!==new URL(request.url).origin||request.headers.get('sec-fetch-site')==='cross-site'))return Response.json({error:'INVALID_ORIGIN'},{status:403,headers});
 if(!env.DOCUMENT_COMPILER_URL||!env.DOCUMENT_COMPILER_TOKEN)return Response.json(status?{available:false}:{error:'COMPILER_UNAVAILABLE'},{status:status?200:503,headers});
 const url=new URL(env.DOCUMENT_COMPILER_URL);
 if(url.protocol!=='https:'&&!(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname)))return Response.json({available:false},{status:503,headers});
 url.pathname=status?'/status':'/compile';url.search='';url.hash='';
 try{
  let body:Uint8Array<ArrayBuffer>|undefined;
  if(!status){
   if(!request.headers.get('content-type')?.startsWith('application/json'))return Response.json({error:'CONTENT_TYPE'},{status:415,headers});
   if(Number(request.headers.get('content-length'))>12*1024*1024)return Response.json({error:'SIZE'},{status:413,headers});
   const reader=request.body?.getReader();if(!reader)return Response.json({error:'INPUT'},{status:400,headers});
   const chunks:Uint8Array[]=[];let size=0;
   while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>12*1024*1024){await reader.cancel();return Response.json({error:'SIZE'},{status:413,headers});}chunks.push(value);}
   body=new Uint8Array(size);let offset=0;for(const chunk of chunks){body.set(chunk,offset);offset+=chunk.length;}
  }
  const upstream=await fetch(url,{method:request.method,headers:{Authorization:`Bearer ${env.DOCUMENT_COMPILER_TOKEN}`,'Content-Type':'application/json'},body,redirect:'error',signal:AbortSignal.timeout(status?5000:70000)});
  // The service contract returns bounded JSON, never HTML or directly executable PDFs.
  const reader=upstream.body?.getReader();if(!reader)throw new Error('EMPTY');let size=0;const chunks:Uint8Array[]=[];
  while(true){const{done,value}=await reader.read();if(done)break;size+=value.length;if(size>16*1024*1024){await reader.cancel();throw new Error('SIZE');}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  const data:unknown=JSON.parse(new TextDecoder().decode(bytes));
  return Response.json(data,{status:upstream.status,headers});
 }catch{return Response.json(status?{available:false}:{error:'COMPILER_UNAVAILABLE'},{status:503,headers});}
}
