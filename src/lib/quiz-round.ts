export type RoundSize='5'|'10'|'20'|'alle';
export function roundSize(value:string|null):RoundSize{return value==='5'||value==='20'||value==='alle'?value:'10';}
export function quizRound<T>(pool:readonly T[],size:RoundSize,seed?:number):T[]{
 const result=[...pool];
 if(seed!==undefined){
  let state=seed>>>0||0x9e3779b9;
  for(let index=result.length-1;index>0;index--){
   state^=state<<13;state^=state>>>17;state^=state<<5;
   const target=Math.floor((state>>>0)/0x100000000*(index+1));
   [result[index],result[target]]=[result[target]!,result[index]!];
  }
 }
 return size==='alle'?result:result.slice(0,Number(size));
}
export function roundSeed(value:string|null):number|undefined {
 return value&&/^[0-9a-f]{8}$/.test(value)?Number.parseInt(value,16):undefined;
}
