import{open}from'node:fs/promises';import{constants}from'node:fs';
/** Bounded regular-file reader for local practice; not a filesystem sandbox. */
export async function readBounded(path:string):Promise<Buffer>{
 const handle=await open(path,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);
 try{const stat=await handle.stat();if(!stat.isFile()||stat.size>65536)throw new Error('Expected a regular file of at most 64 KiB');const buffer=Buffer.alloc(65537);let bytesRead=0;while(bytesRead<buffer.length){const part=await handle.read(buffer,bytesRead,buffer.length-bytesRead,bytesRead);if(part.bytesRead===0)break;bytesRead+=part.bytesRead;}if(bytesRead>65536||bytesRead!==stat.size)throw new Error('File too large or changed during reading');return buffer.subarray(0,bytesRead);}finally{await handle.close();}
}
