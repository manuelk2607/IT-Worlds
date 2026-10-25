import {projectLimits, sourceText, type ProjectFile} from '../lib/document-project.ts';
import type {DocumentReport} from '../lib/document-analysis.ts';
import {documentMessages} from '../data/document-messages.ts';
import {documentTasks} from '../data/document-tasks.ts';
const root=document.querySelector<HTMLElement>('[data-document-check]');
if(root) {
 const locale=root.dataset.locale==='en'?'en':'de';const t=(de:string,en:string)=>locale==='de'?de:en;
 const get=<T extends HTMLElement>(name:string)=>root.querySelector<T>(`[data-doc-${name}]`)!;
 const format=get<HTMLSelectElement>('format'), main=get<HTMLSelectElement>('main'), input=get<HTMLInputElement>('files'), folder=get<HTMLInputElement>('folder');
 folder.setAttribute('webkitdirectory','');
 const task=get<HTMLSelectElement>('task');
 const run=get<HTMLButtonElement>('analyze'), results=get<HTMLElement>('results'),status=get<HTMLElement>('status');
 const preview=get<HTMLTextAreaElement>('preview'), source=get<HTMLSelectElement>('source');
 let files:ProjectFile[]=[], zip:Uint8Array|undefined, report:DocumentReport|undefined, worker:Worker|undefined, timer:ReturnType<typeof setTimeout>|undefined, generation=0;
 const stop=()=>{worker?.terminate();worker=undefined;clearTimeout(timer);};
 const error=(code:string)=>{status.textContent=code in documentMessages?documentMessages[code as keyof typeof documentMessages][locale]:t('Prüfung fehlgeschlagen. Bitte Projekt erneut auswählen.','Check failed. Select the project again.');};
 const clear=()=>{generation++;stop();files=[];zip=undefined;report=undefined;input.value='';folder.value='';preview.value='';source.replaceChildren();main.replaceChildren(new Option(t('Zuerst Projekt auswählen','Select a project first'),''));main.disabled=true;run.disabled=true;results.hidden=true;hideProgress();status.textContent='';};
 const selectedFormat=()=>format.value==='latex'?'latex':'typst';
 const hideProgress=()=>root.querySelectorAll<HTMLElement>('[data-doc-task-progress]').forEach(panel=>panel.hidden=true);
 const refreshTasks=()=>{const previous=task.value;task.replaceChildren(new Option(t('Allgemeine Projektprüfung','General project check'),''),...documentTasks.filter(item=>item.format===selectedFormat()).map(item=>new Option(item.title[locale],item.id)));if(documentTasks.some(item=>item.id===previous&&item.format===selectedFormat()))task.value=previous;};
 const syncSelection=()=>{const params=new URLSearchParams({format:selectedFormat()});if(task.value)params.set('aufgabe',task.value);history.replaceState(null,'',`${location.pathname}?${params}`);};
 const showSource=(path:string,line=1,column=1)=>{
   const file=files.find(f=>f.path===path);
   try{preview.value=file?sourceText(file):t('ZIP-Quelle: entpacke das Projekt lokal für die Quellansicht. Positionsangaben stehen im Bericht.','ZIP source: extract the project locally to inspect source text. Positions are included in the report.');}catch{preview.value=t('Binäre Ressource – keine Textvorschau.','Binary resource – no text preview.');}
   source.value=path;
   const offset=preview.value.split('\n').slice(0,line-1).reduce((n,s)=>n+s.length+1,0)+column-1;
   preview.focus();preview.setSelectionRange(offset,Math.min(preview.value.length,offset+1));
 };
 const render=(value:DocumentReport)=>{
   report=value;results.hidden=false;
   const count=value.diagnostics.filter(d=>d.severity==='error').length;
   get('summary').textContent=t(`Geprüfte Quelldateien: ${value.checkedFiles.length}. Fehler: ${count}. Weitere Hinweise: ${value.diagnostics.length-count}.`,`Source files checked: ${value.checkedFiles.length}. Errors: ${count}. Other findings: ${value.diagnostics.length-count}.`)+(value.truncated?t(' Weitere Befunde abgeschnitten; behebe zuerst diese Fehler.',' Further findings truncated; fix these first.'):'');
   get<HTMLAnchorElement>('editor').href=value.format==='latex'?'https://www.overleaf.com/':'https://typst.app/';
   get('inventory').textContent=t('Dateien: ','Files: ')+value.files.join(', ')+t('. Erkannte Pakete: ','. Detected packages: ')+(value.packages.join(', ')||'—');
   const list=get('diagnostics');list.replaceChildren();
   for(const d of value.diagnostics){
     const li=document.createElement('li');li.dataset.severity=d.severity;
     const button=document.createElement('button');button.type='button';button.textContent=`${d.file}:${d.line}:${d.column} · ${t(d.severity==='error'?'Fehler':d.severity==='warning'?'Warnung':'Hinweis',d.severity)}`;
     button.addEventListener('click',()=>showSource(d.file,d.line,d.column));li.append(button);
     const paragraph=document.createElement('p');paragraph.textContent=documentMessages[d.code as keyof typeof documentMessages]?.[locale]??d.code;li.append(paragraph);
     if(d.detail){const detail=document.createElement('code');detail.textContent=d.detail;li.append(detail);}list.append(li);
   }
   if(!value.diagnostics.length){const li=document.createElement('li');li.textContent=t('Keine der unterstützten Auffälligkeiten gefunden. Kompiliere im externen Editor und kontrolliere das PDF und deine Lösung selbst.','None of the supported issues found. Compile in the external editor and review the PDF and your solution yourself.');list.append(li);}
   source.replaceChildren(...value.checkedFiles.map(path=>new Option(path,path)));
   const initialSource=files.find(f=>f.path===value.main);preview.value=initialSource?sourceText(initialSource):'';source.value=value.main;
   const selected=documentTasks.find(item=>item.id===value.task?.id);const requirements=get('requirements');requirements.replaceChildren();get('task-results').hidden=!selected;
   if(selected&&value.task)for(const finding of value.task.findings){
    const rule=selected.requirements.find(rule=>rule.id===finding.id)!;const li=document.createElement('li');
    const title=document.createElement('strong');title.textContent=rule.label[locale]+': '+(finding.detected?t('Konstruktion gefunden','Construct detected'):t('Nicht direkt gefunden','Not directly detected'));
    const help=document.createElement('p');help.textContent=rule.help[locale];li.append(title,help);
    if(finding.file){const jump=document.createElement('button');jump.type='button';jump.textContent=`${finding.file}:${finding.line}:${finding.column}`;jump.addEventListener('click',()=>showSource(finding.file!,finding.line,finding.column));li.append(jump);}requirements.append(li);
   }
   root.querySelectorAll<HTMLElement>('[data-doc-task-progress]').forEach(panel=>panel.hidden=panel.dataset.docTaskProgress!==selected?.id);
   const params=new URLSearchParams({format:value.format});if(selected)params.set('aufgabe',selected.id);history.replaceState(null,'',`${location.pathname}?${params}`);
   get<HTMLAnchorElement>('course').href=`${locale==='en'?'/en':''}/themen/programmiersprachen/${value.format}/${selected?.chapter??'projektpruefung'}/#aufgabe`;
   status.textContent=t('Lokale Analyse abgeschlossen.','Local analysis complete.');
   get('results').querySelector<HTMLElement>('h2')?.focus();
 };
 const job=(analyze:boolean)=>{
   stop();const own=++generation;run.disabled=true;main.disabled=true;results.hidden=true;hideProgress();
   status.textContent=t('Projekt wird lokal geprüft …','Checking the project locally …');
   try{worker=new Worker(new URL('./document-worker.ts',import.meta.url),{type:'module'});}catch{main.disabled=false;run.disabled=!main.value;error('BROWSER');return;}
   timer=setTimeout(()=>{if(own!==generation)return;stop();run.disabled=!main.value;main.disabled=false;error('TIMEOUT');},8000);
   worker.onerror=()=>{if(own!==generation)return;stop();error('BROWSER');main.disabled=false;run.disabled=!main.value;};
   worker.onmessage=(event:MessageEvent<{error?:string;candidates?:string[];report?:DocumentReport;files?:ProjectFile[]}>)=>{
     if(own!==generation)return;stop();main.disabled=false;run.disabled=false;
     if(event.data.error){error(event.data.error);run.disabled=!main.value;return;}
     if(event.data.files){files=event.data.files;zip=undefined;}
     if(event.data.candidates){main.replaceChildren(new Option(t('Hauptdatei auswählen','Choose the main file'),''),...event.data.candidates.map(p=>new Option(p,p)));
       if(event.data.candidates.length===1)main.value=event.data.candidates[0]!;
       main.disabled=!event.data.candidates.length;run.disabled=!main.value;status.textContent=event.data.candidates.length?t('Projekt bereit. Hauptdatei wählen und analysieren.','Project ready. Choose the main file and analyse.') : documentMessages.MAIN[locale];
     }
     if(event.data.report)render(event.data.report);
   };
   worker.postMessage({files,zip,format:selectedFormat(),main:analyze?main.value:'',task:task.value});
 };
 const load=async(list:FileList|null)=>{
   const selected=list?Array.from(list):[];clear();if(!selected.length)return;const own=generation;
   if(selected.length>projectLimits.files){error('COUNT');return;}
   if(selected.reduce((n,f)=>n+f.size,0)>projectLimits.upload){error('SIZE');return;}
   let nextZip:Uint8Array|undefined;let nextFiles:ProjectFile[]=[];
   if(selected.some(f=>f.name.toLowerCase().endsWith('.zip'))){if(selected.length!==1){error('ZIP');return;}nextZip=new Uint8Array(await selected[0]!.arrayBuffer());}
   else {if(selected.some(f=>f.size>projectLimits.file)){error('SIZE');return;}nextFiles=await Promise.all(selected.map(async file=>({path:file.webkitRelativePath||file.name,bytes:new Uint8Array(await file.arrayBuffer())})));}
   if(own!==generation)return;files=nextFiles;zip=nextZip;job(false);
 };
 input.addEventListener('change',()=>void load(input.files).catch(()=>error('ZIP')));folder.addEventListener('change',()=>void load(folder.files).catch(()=>error('ZIP')));
 format.addEventListener('change',()=>{generation++;stop();report=undefined;results.hidden=true;hideProgress();refreshTasks();syncSelection();if(files.length||zip)job(false);});task.addEventListener('change',()=>{generation++;stop();report=undefined;results.hidden=true;hideProgress();syncSelection();main.disabled=main.options.length<2;run.disabled=!main.value;status.textContent='';if((files.length||zip)&&main.options.length<2)job(false);});main.addEventListener('change',()=>{stop();generation++;report=undefined;results.hidden=true;hideProgress();run.disabled=!main.value;});
 run.addEventListener('click',()=>job(true));get('clear').addEventListener('click',clear);source.addEventListener('change',()=>showSource(source.value));
 get('demo').addEventListener('click',()=>{clear();const latex=selectedFormat()==='latex';files=[{path:latex?'main.tex':'main.typ',bytes:new TextEncoder().encode(latex?'\\documentclass{article}\n\\begin{document}\n\\section{Test}\\label{intro}\nSee \\ref{missing}.\n\\includegraphics{missing.png}\n\\end{document}':'= Example <intro>\nSee @missing.\n#image("missing.png")')}];job(false);});
 get('download').addEventListener('click',()=>{if(!report)return;const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download='it-worlds-document-report.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 const params=new URLSearchParams(location.search);const initial=params.get('format');if(initial==='latex'||initial==='typst')format.value=initial;refreshTasks();
 const initialTask=params.get('aufgabe');if(documentTasks.some(item=>item.id===initialTask&&item.format===selectedFormat()))task.value=initialTask!;
 const example=params.get('beispiel');
 if(example&&/^(?:typst|latex)-[a-z0-9-]+-\d{1,2}$/.test(example)){
  const own=generation;
  void fetch(`/dokumentbeispiele/${example}.json`,{signal:AbortSignal.timeout(5000)}).then(async response=>{
   if(!response.ok)throw new Error('EXAMPLE');const data:unknown=await response.json();
   if(own!==generation)return;
   if(!data||typeof data!=='object'||!('format'in data)||!['typst','latex'].includes(String(data.format))||!('files'in data)||!Array.isArray(data.files))throw new Error('EXAMPLE');
   const next:ProjectFile[]=data.files.map((value:unknown)=>{if(!value||typeof value!=='object'||!('path'in value)||typeof value.path!=='string'||!('text'in value)||typeof value.text!=='string')throw new Error('EXAMPLE');return{path:value.path,bytes:new TextEncoder().encode(value.text)};});
   format.value=String(data.format);refreshTasks();files=next;job(false);
  }).catch(()=>{if(own===generation)status.textContent=t('Das Kursbeispiel konnte nicht geladen werden. Du kannst weiterhin ein eigenes Projekt wählen.','The course example could not be loaded. You can still select your own project.');});
 }
 window.addEventListener('pagehide',clear);
}
