import {readProjectZip, validateProject, ProjectError, type ProjectFile, type DocumentFormat} from '../lib/document-project.ts';
import {analyzeDocument, sourceCandidates} from '../lib/document-analysis.ts';
import {checkDocumentTask} from '../lib/document-task-check.ts';
interface Job {files:ProjectFile[]; zip?:Uint8Array; format:DocumentFormat; main:string; task?:string}
self.addEventListener('message',async(event:MessageEvent<Job>)=>{
  try {
    const files=event.data.zip?await readProjectZip(event.data.zip):validateProject(event.data.files);
    const candidates=sourceCandidates(files,event.data.format);
    if(!event.data.main)self.postMessage({candidates,files});
    else {
      const report=analyzeDocument(files,event.data.format,event.data.main);
      if(event.data.task)report.task=checkDocumentTask(files,report,event.data.task);
      self.postMessage({report});
    }
  }catch(error){self.postMessage({error:error instanceof ProjectError?error.code:error instanceof Error&&error.message==='MAIN'?'MAIN':'ZIP'});}
});
