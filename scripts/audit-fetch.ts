import{setTimeout}from'node:timers/promises';
// Retry transport errors and transient HTTP failures, never content mismatches or permanent responses.
export async function auditFetch(input:string|URL,init:RequestInit={},fetcher:typeof fetch=fetch,pause:(ms:number)=>Promise<unknown>=setTimeout):Promise<Response>{
 for(let attempt=0;attempt<3;attempt++){
  try{
   const response=await fetcher(input,{...init,signal:init.signal??AbortSignal.timeout(15000)});
   if(attempt===2||(response.status!==429&&response.status<500))return response;
   await response.body?.cancel();
  }catch(error){if(attempt===2)throw new Error(`Public audit request failed after 3 attempts: ${input}`,{cause:error});}
  await pause(500*(attempt+1));
 }
 throw new Error('Public audit attempts exhausted');
}
