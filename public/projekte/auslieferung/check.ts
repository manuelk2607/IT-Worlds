export interface CheckResult {name:string;ok:boolean;detail:string}
export interface CheckOptions {timeoutMs?:number;maxBytes?:number}
export function deploymentBase(value:string):URL {
 const url=new URL(value);
 if(url.username||url.password||url.search||url.hash||!['http:','https:'].includes(url.protocol))throw new Error('Use a base URL without credentials, query or fragment.');
 if(url.protocol==='http:'&&!['localhost','127.0.0.1','[::1]'].includes(url.hostname))throw new Error('Use HTTPS, except for loopback development.');
 if(!url.pathname.endsWith('/'))url.pathname+='/';return url;
}
async function boundedBody(response:Response,maxBytes:number):Promise<string>{
 const reader=response.body?.getReader();if(!reader)return '';
 const decoder=new TextDecoder('utf-8',{fatal:true});let total=0,text='';
 try{while(true){const {done,value}=await reader.read();if(done)break;total+=value.length;if(total>maxBytes)throw new Error('Response body exceeds the limit.');text+=decoder.decode(value,{stream:true});}return text+decoder.decode();}
 finally{await reader.cancel().catch(()=>undefined);reader.releaseLock();}
}
const object=(value:unknown):value is Record<string,unknown>=>typeof value==='object'&&value!==null&&!Array.isArray(value);
/** Real HTTP checks. GET only, no credentials, redirects rejected, bounded body and timeout per route. */
export async function checkDeployment(value:string,options:CheckOptions={}):Promise<CheckResult[]>{
 const base=deploymentBase(value),timeoutMs=options.timeoutMs??3000,maxBytes=options.maxBytes??65536;
 if(!Number.isInteger(timeoutMs)||timeoutMs<1||timeoutMs>30000||!Number.isInteger(maxBytes)||maxBytes<1||maxBytes>1048576)throw new Error('Invalid limits.');
 const checks=[
  {name:'homepage',path:'',status:200,type:'text/html',verify:(body:string)=>body.includes('<h1>Learning catalog</h1>')},
  {name:'health',path:'health',status:200,type:'application/json',verify:(body:string)=>{const data:unknown=JSON.parse(body);return object(data)&&data.status==='ok'&&data.schema===1;}},
  {name:'catalog',path:'api/courses',status:200,type:'application/json',verify:(body:string)=>{const data:unknown=JSON.parse(body);return Array.isArray(data)&&data.length>0&&data.every(item=>object(item)&&Number.isSafeInteger(item.id)&&Number(item.id)>0&&typeof item.title==='string'&&item.title.trim().length>0);}},
  {name:'missing route',path:'missing-release-probe',status:404,type:'text/plain',verify:(body:string)=>body==='Not found'},
 ];
 const results:CheckResult[]=[];
 for(const check of checks){
  let response:Response|undefined;
  try{
   response=await fetch(new URL(check.path,base),{redirect:'error',credentials:'omit',signal:AbortSignal.timeout(timeoutMs),headers:{Accept:check.type}});
   if(response.status!==check.status)throw new Error(`Expected HTTP ${check.status}; received ${response.status}.`);
   const type=response.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase();
   if(type!==check.type)throw new Error(`Expected ${check.type}; received ${type??'no content type'}.`);
   if(!check.verify(await boundedBody(response,maxBytes)))throw new Error('Response content violates the contract.');
   results.push({name:check.name,ok:true,detail:'Status, content type and content match.'});
  }catch(error){results.push({name:check.name,ok:false,detail:error instanceof SyntaxError?'Response is not valid JSON.':error instanceof Error?error.message:'Request failed.'});}
  finally{if(response?.body&&!response.body.locked)await response.body.cancel().catch(()=>undefined);}
 }
 return results;
}
