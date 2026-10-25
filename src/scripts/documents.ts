import {projectLimits, sourceText, type ProjectFile} from '../lib/document-project.ts';
import type {DocumentReport} from '../lib/document-analysis.ts';
import {documentMessages} from '../data/document-messages.ts';
import {compilerDiagnostics} from '../lib/compiler-diagnostics.ts';
const root=document.querySelector<HTMLElement>('[data-document-check]');
if(root) {
 const locale=root.dataset.locale==='en'?'en':'de';const t=(de:string,en:string)=>locale==='de'?de:en;
 const get=<T extends HTMLElement>(name:string)=>root.querySelector<T>(`[data-doc-${name}]`)!;
 const format=get<HTMLSelectElement>('format'), main=get<HTMLSelectElement>('main'), input=get<HTMLInputElement>('files'), folder=get<HTMLInputElement>('folder');
 folder.setAttribute('webkitdirectory','');
 const run=get<HTMLButtonElement>('analyze'), compile=get<HTMLButtonElement>('compile'), results=get<HTMLElement>('results'),status=get<HTMLElement>('status');
 const preview=get<HTMLTextAreaElement>('preview'), source=get<HTMLSelectElement>('source');
 let files:ProjectFile[]=[], zip:Uint8Array|undefined, report:DocumentReport|undefined, worker:Worker|undefined, timer:ReturnType<typeof setTimeout>|undefined, generation=0;
 let compileController:AbortController|undefined;const outputUrls:string[]=[];
 const clearOutputs=()=>{for(const url of outputUrls)URL.revokeObjectURL(url);outputUrls.length=0;get('output').replaceChildren();};
 const stop=()=>{worker?.terminate();worker=undefined;clearTimeout(timer);};
 const error=(code:string)=>{status.textContent=code in documentMessages?documentMessages[code as keyof typeof documentMessages][locale]:t('Prüfung fehlgeschlagen. Bitte Projekt erneut auswählen.','Check failed. Select the project again.');};
 const clear=()=>{generation++;stop();compileController?.abort();clearOutputs();files=[];zip=undefined;report=undefined;input.value='';folder.value='';preview.value='';source.replaceChildren();main.replaceChildren();main.disabled=true;run.disabled=true;results.hidden=true;status.textContent='';};
 const selectedFormat=()=>format.value==='latex'?'latex':'typst';
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
   get('compilation').textContent=t('Kompilierung: nicht ausgeführt. Statische Befunde sind kein Kompiliernachweis.','Compilation: not run. Static findings are not compilation evidence.');
   get('inventory').textContent=t('Dateien: ','Files: ')+value.files.join(', ')+t('. Erkannte Pakete: ','. Detected packages: ')+(value.packages.join(', ')||'—');
   const list=get('diagnostics');list.replaceChildren();
   for(const d of value.diagnostics){
     const li=document.createElement('li');li.dataset.severity=d.severity;
     const button=document.createElement('button');button.type='button';button.textContent=`${d.file}:${d.line}:${d.column} · ${t(d.severity==='error'?'Fehler':d.severity==='warning'?'Warnung':'Hinweis',d.severity)}`;
     button.addEventListener('click',()=>showSource(d.file,d.line,d.column));li.append(button);
     const paragraph=document.createElement('p');paragraph.textContent=documentMessages[d.code as keyof typeof documentMessages]?.[locale]??d.code;li.append(paragraph);
     if(d.detail){const detail=document.createElement('code');detail.textContent=d.detail;li.append(detail);}list.append(li);
   }
   if(!value.diagnostics.length){const li=document.createElement('li');li.textContent=t('Keine der unterstützten Auffälligkeiten gefunden. Kompiliere das Projekt zusätzlich und kontrolliere das Ergebnis selbst.','None of the supported issues found. Also compile the project and review the result yourself.');list.append(li);}
   source.replaceChildren(...value.checkedFiles.map(path=>new Option(path,path)));
   const initialSource=files.find(f=>f.path===value.main);preview.value=initialSource?sourceText(initialSource):'';source.value=value.main;
   const url=new URL('/dokumentpruefung/',location.origin);url.searchParams.set('format',value.format);history.replaceState(null,'',`${location.pathname}${url.search}`);
   get<HTMLAnchorElement>('course').href=`${locale==='en'?'/en':''}/themen/programmiersprachen/${value.format}/projektpruefung/`;
   status.textContent=t('Lokale Analyse abgeschlossen.','Local analysis complete.');
   get('results').querySelector<HTMLElement>('h2')?.focus();
 };
 const job=(analyze:boolean)=>{
   stop();compileController?.abort();clearOutputs();const own=++generation;run.disabled=true;main.disabled=true;results.hidden=true;
   status.textContent=t('Projekt wird lokal geprüft …','Checking the project locally …');
   worker=new Worker(new URL('./document-worker.ts',import.meta.url),{type:'module'});
   timer=setTimeout(()=>{if(own!==generation)return;stop();run.disabled=!main.value;main.disabled=false;error('TIMEOUT');},8000);
   worker.onerror=()=>{if(own!==generation)return;stop();error('ZIP');main.disabled=false;run.disabled=!main.value;};
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
   worker.postMessage({files,zip,format:selectedFormat(),main:analyze?main.value:''});
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
 format.addEventListener('change',()=>{generation++;if(files.length||zip)job(false);});main.addEventListener('change',()=>{stop();compileController?.abort();clearOutputs();generation++;report=undefined;results.hidden=true;run.disabled=!main.value;});
 run.addEventListener('click',()=>job(true));get('clear').addEventListener('click',clear);source.addEventListener('change',()=>showSource(source.value));
 get('demo').addEventListener('click',()=>{clear();const latex=selectedFormat()==='latex';files=[{path:latex?'main.tex':'main.typ',bytes:new TextEncoder().encode(latex?'\\documentclass{article}\n\\begin{document}\n\\section{Test}\\label{intro}\nSee \\ref{missing}.\n\\includegraphics{missing.png}\n\\end{document}':'= Example <intro>\nSee @missing.\n#image("missing.png")')}];job(false);});
 get('download').addEventListener('click',()=>{if(!report)return;const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download='it-worlds-document-report.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 compile.addEventListener('click',async()=>{
   if(!report)return;const own=generation;compile.disabled=true;let transmissionStarted=false;clearOutputs();
   const target=get('compilation');target.textContent=t('Verfügbarkeit der isolierten Laufzeit wird geprüft …','Checking isolated runtime availability …');
   try{
     const response=await fetch('/api/documents/status',{cache:'no-store',signal:AbortSignal.timeout(5000)});
     const service:unknown=await response.json();if(own!==generation)return;
     if(!response.ok||!service||typeof service!=='object'||!('available'in service)||service.available!==true){target.textContent=t('Keine isolierte Kompilierung eingerichtet. Die Dateien bleiben lokal. Kompiliere im externen Editor; der lokale Bericht bleibt verfügbar.','No isolated compiler is configured. Files remain local. Compile in the external editor; the local report remains available.');return;}
     compileController=new AbortController();const deadline=setTimeout(()=>compileController?.abort(),75000);
     transmissionStarted=true;report.compilation='unconfirmed';
     target.textContent=t('Quellen werden einmalig zur isolierten Kompilierung übertragen …','Sending sources once for isolated compilation …');
     const encode=(bytes:Uint8Array)=>{let text='';for(let i=0;i<bytes.length;i+=8192)text+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(text);};
     let compiled:Response;
     try{compiled=await fetch('/api/documents/compile',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({format:report.format,main:report.main,files:files.map(f=>({path:f.path,base64:encode(f.bytes)}))}),signal:compileController.signal});}finally{clearTimeout(deadline);}
     const value:unknown=await compiled.json();if(own!==generation)return;
     if(!compiled.ok||!value||typeof value!=='object'||!('success'in value)||typeof value.success!=='boolean'){target.textContent=t('Kompilierung fehlgeschlagen oder Dienst ausgelastet. Der lokale Bericht bleibt erhalten.','Compilation failed or the service is busy. Your local report is retained.');return;}
     clearOutputs();target.textContent=value.success?t('Kompilierung erfolgreich. Prüfe zusätzlich Inhalt, Quellen, Lesbarkeit und Lernziel.','Compilation succeeded. Also review content, sources, readability and the learning goal.'):t('Der Compiler meldet Fehler. Lies die erste sinnvolle Diagnose und korrigiere die Quelle im Editor.','The compiler reports errors. Read the first meaningful diagnostic and correct the source in your editor.');
     report.compilation=value.success?'passed':'failed';report.compiledAt=new Date().toISOString();report.engine='engine'in value&&typeof value.engine==='string'?value.engine.slice(0,100):undefined;
     if('log'in value&&typeof value.log==='string'){
      const list=document.createElement('ul');list.className='document-diagnostics';
      for(const diagnostic of compilerDiagnostics(value.log,files.map(f=>f.path))){const li=document.createElement('li');li.dataset.severity=diagnostic.severity;const jump=document.createElement('button');jump.textContent=`${diagnostic.file}:${diagnostic.line}:${diagnostic.column}`;jump.addEventListener('click',()=>showSource(diagnostic.file,diagnostic.line,diagnostic.column));const detail=document.createElement('p');detail.textContent=diagnostic.detail;const help=document.createElement('p');help.textContent=documentMessages[diagnostic.code as keyof typeof documentMessages][locale];li.append(jump,detail,help);list.append(li);}get('output').append(list);
      const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent=t('Vollständige Compilerdiagnose des letzten Schritts','Full compiler diagnostics for the last step');const log=document.createElement('pre');log.textContent=value.log.slice(-60000);details.append(summary,log);get('output').append(details);
     }
     const blob=(base64:string,type:string)=>{if(base64.length>12*1024*1024)throw new Error('SIZE');const bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0));const url=URL.createObjectURL(new Blob([bytes],{type}));outputUrls.push(url);return url;};
     if(value.success&&'pdf'in value&&typeof value.pdf==='string'){const link=document.createElement('a');link.href=blob(value.pdf,'application/pdf');link.download='it-worlds-document.pdf';link.className='button secondary';link.textContent=t('Erzeugtes PDF herunterladen','Download generated PDF');get('output').append(link);}
     if(value.success&&'previews'in value&&Array.isArray(value.previews))value.previews.slice(0,3).forEach((png:unknown,index:number)=>{if(typeof png!=='string'||!png.startsWith('iVBORw0KGgo'))return;const image=document.createElement('img');image.src=blob(png,'image/png');image.alt=t(`PDF-Vorschau: Seite ${index+1}`,`PDF preview: page ${index+1}`);image.loading='lazy';get('output').append(image);});
   }catch{if(own===generation)target.textContent=transmissionStarted?t('Die Kompilieranfrage konnte nicht bestätigt werden. Die lokale Analyse bleibt erhalten.','The compilation request could not be confirmed. Your local analysis is retained.'):t('Prüfdienst nicht erreichbar. Es wurden keine Quellen übertragen.','Compilation service unavailable. No sources were transmitted.');}finally{compile.disabled=false;}
 });
 const params=new URLSearchParams(location.search);const initial=params.get('format');if(initial==='latex'||initial==='typst')format.value=initial;
 const example=params.get('beispiel');
 if(example&&/^(?:typst|latex)-[a-z0-9-]+-\d{1,2}$/.test(example)){
  const own=generation;
  void fetch(`/dokumentbeispiele/${example}.json`,{signal:AbortSignal.timeout(5000)}).then(async response=>{
   if(!response.ok)throw new Error('EXAMPLE');const data:unknown=await response.json();
   if(own!==generation)return;
   if(!data||typeof data!=='object'||!('format'in data)||!['typst','latex'].includes(String(data.format))||!('files'in data)||!Array.isArray(data.files))throw new Error('EXAMPLE');
   const next:ProjectFile[]=data.files.map((value:unknown)=>{if(!value||typeof value!=='object'||!('path'in value)||typeof value.path!=='string'||!('text'in value)||typeof value.text!=='string')throw new Error('EXAMPLE');return{path:value.path,bytes:new TextEncoder().encode(value.text)};});
   format.value=String(data.format);files=next;job(false);
  }).catch(()=>{if(own===generation)status.textContent=t('Das Kursbeispiel konnte nicht geladen werden. Du kannst weiterhin ein eigenes Projekt wählen.','The course example could not be loaded. You can still select your own project.');});
 }
 window.addEventListener('pagehide',clear);
}
