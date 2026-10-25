import {documentTasks} from '../data/document-tasks.ts';
import {maskSource, type DocumentReport} from './document-analysis.ts';
import {sourceText, fileExtension, type ProjectFile} from './document-project.ts';
export interface RequirementFinding {id:string; detected:boolean; file?:string; line?:number; column?:number}
export interface TaskCheck {id:string; findings:RequirementFinding[]}
/** Evidence of literal constructs only, never execution, correctness or an automatic grade. */
export function checkDocumentTask(files:ProjectFile[],report:DocumentReport,taskId:string):TaskCheck|undefined {
 const task=documentTasks.find(task=>task.id===taskId&&task.format===report.format);if(!task)return;
 const sources=files.filter(file=>report.checkedFiles.includes(file.path)&&fileExtension(file.path)===(report.format==='latex'?'tex':'typ')).map(file=>({file:file.path,text:maskSource(sourceText(file),report.format)}));
 return {id:task.id,findings:task.requirements.map(requirement=>{
  for(const source of sources){
   // Quoted Typst values must not satisfy headings, references or code-construct requirements.
   const text=report.format==='typst'&&requirement.id!=='module'?source.text.replace(/"(?:\\.|[^"\\])*"/g,s=>s.replace(/[^\n]/g,' ')):source.text;
   const match=requirement.pattern.exec(text);if(!match)continue;
   const prefix=text.slice(0,match.index);return{id:requirement.id,detected:true,file:source.file,line:prefix.split('\n').length,column:match.index-prefix.lastIndexOf('\n')};
  }
  return{id:requirement.id,detected:false};
 })};
}
