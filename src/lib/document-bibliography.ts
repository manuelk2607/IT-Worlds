/** Literal BibTeX entry keys only. Fields, macros and bibliographic validity are not evaluated. */
export function bibliographyEntries(text:string):{key:string;offset:number}[] {
 const entries:{key:string;offset:number}[]=[];
 let i=0;
 while(i<text.length){
  if(text[i]==='%'){const end=text.indexOf('\n',i);i=end<0?text.length:end+1;continue;}
  if(text[i]!=='@'){i++;continue;}
  const start=i;const header=/^@([a-zA-Z]+)\s*([{(])\s*/.exec(text.slice(i,i+200));
  if(!header){i++;continue;}
  i+=header[0].length;
  if(!/^(?:comment|preamble|string)$/i.test(header[1]!)){
   const key=/^([^\s,{}()"=]+)\s*,/.exec(text.slice(i,i+300));
   if(key)entries.push({key:key[1]!,offset:start});
  }
  const curly=header[2]==='{';let depth=curly?1:0,quoted=false;
  while(i<text.length){
   const char=text[i++];if(char==='\\'){i++;continue;}
   if(char==='"'&&depth===(curly?1:0)){quoted=!quoted;continue;}
   if(quoted)continue;
   if(char==='{')depth++;
   else if(char==='}'){depth--;if(curly&&depth===0)break;}
   else if(char===')'&&!curly&&depth===0)break;
  }
 }
 return entries;
}
