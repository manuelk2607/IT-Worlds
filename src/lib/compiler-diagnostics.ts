import type {Diagnostic} from './document-analysis.ts';
/** Parse positions only for actual project files. Engine messages remain text, never HTML. */
export function compilerDiagnostics(log:string,paths:string[]):Diagnostic[]{
 const result:Diagnostic[]=[];
 for(const line of log.slice(-60000).split('\n')){
  const match=line.match(/^(?:\.\/|\/work\/project\/)?(.+?):(\d+)(?::(\d+))?:\s*(.*)$/);
  if(!match||!paths.includes(match[1]!))continue;
  const detail=match[4]!.slice(0,1000);const lower=detail.toLowerCase();
  const code=lower.includes('without numbering')?'COMPILER_NUMBERING':lower.includes('undefined control')||lower.includes('unknown variable')?'COMPILER_NAME':lower.includes('not found')||lower.includes('cannot find')?'COMPILER_RESOURCE':'COMPILER_ERROR';
  result.push({code,severity:lower.startsWith('warning')?'warning':'error',file:match[1]!,line:Math.min(1000000,Number(match[2])),column:Math.min(1000000,Number(match[3]??1)),detail});
  if(result.length>=100)break;
 }
 return result;
}
