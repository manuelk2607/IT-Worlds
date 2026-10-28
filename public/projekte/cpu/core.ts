export type Instruction={op:'set'|'add'|'jump';value:number}|{op:'out'|'halt'};
export function parseProgram(value:unknown):Instruction[]{
 if(!Array.isArray(value)||!value.length||value.length>128)throw new Error('Expected 1 to 128 instructions');
 return value.map((v:unknown)=>{
  if(!v||typeof v!=='object'||!('op'in v))throw new Error('Invalid instruction');
  if(v.op==='out'||v.op==='halt')return{op:v.op};
  if((v.op==='set'||v.op==='add'||v.op==='jump')&&'value'in v&&typeof v.value==='number'&&Number.isInteger(v.value)&&v.value>=-2147483648&&v.value<=2147483647){if(v.op==='jump'&&(v.value<0||v.value>=value.length))throw new Error('Jump outside program');return{op:v.op,value:v.value};}
  throw new Error('Unsupported instruction or operand');
 });
}
export function runMachine(program:readonly Instruction[],limit=100){
 if(!Number.isInteger(limit)||limit<1||limit>1000)throw new Error('Step limit must be 1 to 1000');
 let pc=0,acc=0;const output:number[]=[],trace:{pc:number;op:Instruction['op'];before:number;after:number;next:number}[]=[];
 for(let step=0;step<limit;step++){
  const instruction=program[pc];if(!instruction)throw new Error('Program counter outside program');const before=acc,from=pc;pc++;
  if(instruction.op==='set')acc=instruction.value;if(instruction.op==='add')acc+=instruction.value;if(instruction.op==='jump')pc=instruction.value;if(instruction.op==='out')output.push(acc);
  if(!Number.isInteger(acc)||acc<-2147483648||acc>2147483647)throw new Error('Accumulator outside signed 32-bit model range');
  trace.push({pc:from,op:instruction.op,before,after:acc,next:pc});
  if(instruction.op==='halt')return{output,steps:trace.length,trace};
 }
 throw new Error('Step limit reached; program did not halt');
}
