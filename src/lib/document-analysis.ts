import {fileExtension, sourceText, validateProject, projectLimits, resolveProjectPath, type ProjectFile, type DocumentFormat} from './document-project.ts';
export interface Diagnostic { code:string; severity:'error'|'warning'|'info'; file:string; line:number; column:number; detail:string }
export interface DocumentReport {
  format:DocumentFormat; main:string; diagnostics:Diagnostic[]; files:string[]; packages:string[]; commands:string[];
  compilation:'not-run'|'passed'|'failed'|'unconfirmed'; engine?:string; compiledAt?:string; truncated:boolean; checkedFiles:string[];
}
export function sourceCandidates(files:ProjectFile[],format:DocumentFormat):string[] {
  return files.filter(file=>fileExtension(file.path)===(format==='latex'?'tex':'typ')).map(file=>file.path);
}
/** Mask comments, strings/raw snippets while retaining offsets and line breaks. Deliberately not a language interpreter. */
export function maskSource(text:string, format:DocumentFormat):string {
  const chars = text.split('');
  const blank=(start:number,end:number)=>{for(let i=start;i<end;i++)if(chars[i]!=='\n'&&chars[i]!=='\r')chars[i]=' ';};
  let i=0;
  while(i<text.length) {
    if(format==='typst'&&text[i]==='"'){i++;while(i<text.length){if(text[i]==='\\'){i+=2;continue;}if(text[i++]==='"')break;}continue;}
    if(format==='latex' && text[i]==='%') {let end=text.indexOf('\n',i);if(end<0)end=text.length;blank(i,end);i=end;continue;}
    if(format==='latex' && text.startsWith('\\verb',i)) { const start=i; i+=5;if(text[i]==='*')i++;const delimiter=text[i];if(delimiter){i++;while(i<text.length&&text[i]!==delimiter&&text[i]!=='\n')i++;i++;blank(start,i);}continue; }
    if(format==='latex' && text.startsWith('\\begin{verbatim}',i)) {const end=text.indexOf('\\end{verbatim}',i+16);const to=end<0?text.length:end+14;blank(i,to);i=to;continue;}
    if(format==='typst' && text.startsWith('//',i)) {let end=text.indexOf('\n',i);if(end<0)end=text.length;blank(i,end);i=end;continue;}
    if(format==='typst' && text.startsWith('/*',i)) {const start=i;let depth=1;i+=2;while(i<text.length&&depth){if(text.startsWith('/*',i)){depth++;i+=2;}else if(text.startsWith('*/',i)){depth--;i+=2;}else i++;}blank(start,i);continue;}
    if(format==='typst' && text[i]==='`') {const start=i;while(text[i]==='`')i++;const count=i-start;const marker='`'.repeat(count);const end=text.indexOf(marker,i);i=end<0?text.length:end+count;blank(start,i);continue;}
    if(text[i]==='\\')i+=2;else i++;
  }
  return chars.join('');
}
export function analyzeDocument(input:ProjectFile[],format:DocumentFormat,main:string):DocumentReport {
  const files=validateProject(input);
  if(!sourceCandidates(files,format).includes(main))throw new Error('MAIN');
  const report:DocumentReport={format,main,diagnostics:[],files:files.map(f=>f.path),packages:[],commands:[],compilation:'not-run',truncated:false,checkedFiles:[]};
  const sources=new Map(files.filter(f=>['tex','typ','sty','cls','bib'].includes(fileExtension(f.path))).map(f=>[f.path,sourceText(f)]));
  const labels=new Map<string,{file:string;offset:number}[]>(),references:{key:string;file:string;offset:number}[]=[];
  const generated=new Set<string>();
  const visited=new Set<string>(),active=new Set<string>();
  const add=(code:string,severity:Diagnostic['severity'],file:string,offset:number,detail='')=>{
    if(report.diagnostics.length>=projectLimits.diagnostics){report.truncated=true;return;}
    const text=sources.get(file)??'';const prefix=text.slice(0,offset);const last=prefix.lastIndexOf('\n');
    report.diagnostics.push({code,severity,file,line:prefix.split('\n').length,column:offset-last,detail});
  };
  const label=(key:string,file:string,offset:number)=>labels.set(key,[...(labels.get(key)??[]),{file,offset}]);
  const link=(file:string,target:string,offset:number,extensions:string[],traverse:boolean)=>{
    const path=resolveProjectPath(format==='latex'?main:file,target);
    if(!path){add('UNSAFE_PATH','error',file,offset,target);return;}
    const alternatives=[path,...extensions.map(ext=>`${path}.${ext}`)];const found=alternatives.find(p=>report.files.includes(p)||generated.has(p));
    if(!found){add('MISSING_FILE','error',file,offset,target);return;}
    if(traverse)visit(found);
  };
  const visit=(file:string)=>{
    if(active.has(file)){add('CYCLE','warning',file,0);return;}
    if(visited.has(file))return;
    visited.add(file);active.add(file);
    const raw=sources.get(file);if(raw===undefined){active.delete(file);return;}
    report.checkedFiles.push(file);
    if(fileExtension(file)==='bib') {for(const match of raw.matchAll(/@\w+\s*\{\s*([^,\s]+)\s*,/g))label(match[1]!,file,match.index);active.delete(file);return;}
    const text=maskSource(raw,format);
    if(format==='latex') {
      for(const match of text.matchAll(/\\begin\{filecontents\*?\}(?:\[[^\]]*\])?\s*\{([^{}\n]+)\}([\s\S]*?)\\end\{filecontents\*?\}/g)){
        const path=resolveProjectPath(main,match[1]!);if(!path){add('UNSAFE_PATH','error',file,match.index,match[1]);continue;}
        generated.add(path);
        if(path.endsWith('.bib')&&!sources.has(path))for(const entry of match[2]!.matchAll(/@\w+\s*\{\s*([^,\s]+)\s*,/g))label(entry[1]!,file,match.index+match[0].indexOf(match[2]!)+entry.index);
        add('STATIC_LIMIT','info',file,match.index);
      }
      const stack:{name:string;index:number}[]=[];const braces:number[]=[];
      for(let i=0;i<text.length;i++){if(text[i]==='\\'){i++;continue;}if(text[i]==='{')braces.push(i);if(text[i]==='}'&&braces.pop()===undefined)add('BRACE_CLOSE','error',file,i);}
      for(const offset of braces)add('BRACE_OPEN','error',file,offset);
      for(const m of text.matchAll(/\\(begin|end)\s*\{([^{}]+)\}/g)){
        if(m[1]==='begin')stack.push({name:m[2]!,index:m.index});else{const start=stack.pop();if(!start||start.name!==m[2])add('ENVIRONMENT','error',file,m.index,`${start?.name??'—'} → ${m[2]}`);}
      }
      for(const env of stack)add('ENVIRONMENT_OPEN','error',file,env.index,env.name);
      for(const m of text.matchAll(/\\([a-zA-Z@]+)\*?/g)) {
        const cmd=m[1]!;if(report.commands.length<500&&!report.commands.includes(cmd))report.commands.push(cmd);
        if(['write','write18','openout','openin','read','directlua','inputminted','catcode','csname','special'].includes(cmd))add('DYNAMIC_TEX','warning',file,m.index,cmd);
      }
      for(const m of text.matchAll(/\\(?:usepackage|RequirePackage)(?:\s*\[[^\]]*\])?\s*\{([^{}]+)\}/g)) {
        for(const pkg of m[1]!.split(',').map(p=>p.trim())){if(!report.packages.includes(pkg))report.packages.push(pkg);const local=resolveProjectPath(main,`${pkg}.sty`);if(local&&sources.has(local))visit(local);}
      }
      for(const m of text.matchAll(/\\(?:input|include)\s*\{([^{}]+)\}/g))link(file,m[1]!,m.index,['tex'],true);
      for(const m of text.matchAll(/\\includegraphics(?:\s*\[[^\]]*\])?\s*\{([^{}]+)\}/g))link(file,m[1]!,m.index,['pdf','png','jpg','jpeg'],false);
      for(const m of text.matchAll(/\\(?:addbibresource|bibliography)(?:\s*\[[^\]]*\])?\s*\{([^{}]+)\}/g))for(const target of m[1]!.split(','))link(file,target.trim(),m.index,['bib'],true);
      for(const m of text.matchAll(/\\label\s*\{([^{}]+)\}/g))label(m[1]!,file,m.index);
      for(const m of text.matchAll(/\\(?:ref|eqref|pageref|autoref|cref|Cref|cite|parencite|textcite)(?:\s*\[[^\]]*\]){0,2}\s*\{([^{}]+)\}/g))for(const key of m[1]!.split(','))references.push({key:key.trim(),file,offset:m.index});
      if(file===main){
        if(!/\\documentclass(?:\s*\[[^\]]*\])?\s*\{/.test(text))add('DOCUMENTCLASS','warning',file,0);
        if(!/\\begin\s*\{document\}/.test(text)||!/\\end\s*\{document\}/.test(text))add('DOCUMENT_BODY','warning',file,0);
        if(!/\\(?:section|chapter)\*?\s*\{/.test(text))add('HEADINGS','info',file,0);
      }
      if(/\\(?:input|include)\b(?!\s*\{)/.test(text)||/\\(?:newcommand|def|catcode|csname|graphicspath|includeonly)\b/.test(text))add('STATIC_LIMIT','info',file,0);
    } else {
      // Typst markup brackets, code expressions and mathematical delimiters need the compiler for full grammar validation.
      for(const m of text.matchAll(/#?(?:include|import)\s+"([^"\n]+)"/g)) {
        const target=m[1]!;
        if(target.startsWith('@')){report.packages.push(target);add('PACKAGE','info',file,m.index,target);}else link(file,target,m.index,[],true);
      }
      for(const m of text.matchAll(/\b(?:image|bibliography|read|csv|json|yaml|toml)\s*\(\s*"([^"\n]+)"/g))link(file,m[1]!,m.index,[],m[0].includes('bibliography'));
      // Remove quoted strings before locating labels/references to avoid interpreting URLs and email addresses in data.
      const visible=text.replace(/"(?:\\.|[^"\\])*"/g,s=>s.replace(/[^\n]/g,' '));
      for(const m of visible.matchAll(/<([\p{L}\p{N}_:.-]+)>/gu))label(m[1]!,file,m.index);
      for(const m of visible.matchAll(/(?<![\p{L}\p{N}_\\])@([\p{L}\p{N}_:.-]+)/gu))references.push({key:m[1]!.replace(/\.+$/,''),file,offset:m.index});
      if(file===main&&!/^\s*=+\s+\S/m.test(text))add('HEADINGS','info',file,0);
      if(/\b(?:eval|plugin|query|state|label)\s*\(/.test(text))add('STATIC_LIMIT','info',file,0);
    }
    active.delete(file);
  };
  visit(main);
  for(const [key,locations]of labels)if(locations.length>1)for(const loc of locations)add('DUPLICATE_LABEL','warning',loc.file,loc.offset,key);
  for(const ref of references)if(!labels.has(ref.key))add('REFERENCE','warning',ref.file,ref.offset,ref.key);
  report.packages=[...new Set(report.packages)];
  report.diagnostics.sort((a,b)=>a.file.localeCompare(b.file)||a.line-b.line||a.column-b.column);
  return report;
}
