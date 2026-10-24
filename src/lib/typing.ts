export interface TypingScore {characters:number;correct:number;mistakes:number;retained:number;accuracy:number;errorRate:number;kpm:number;wpm:number;weakness:Record<string,number>}
export interface TypingTrace {keys:string;times:number[]}
export const typingDuration=60000;
export function scoreTyping(target:string,trace:TypingTrace,elapsed:number):TypingScore|null{
 const keys=Array.from(trace.keys.normalize('NFC')),goal=Array.from(target.normalize('NFC'));
 if(!Number.isFinite(elapsed)||elapsed<1||elapsed>180000||keys.length>1200||keys.length!==trace.times.length)return null;
 let previous=0,characters=0,correct=0;const buffer:string[]=[],weakness:Record<string,number>={};
 for(let i=0;i<keys.length;i++){
  const time=trace.times[i],key=keys[i];if(!Number.isInteger(time)||time<previous||time>elapsed)return null;previous=time;
  if(key==='\b'){buffer.pop();continue;}
  if(/[\u0000-\u001f\u007f]/u.test(key))return null;
  const expected=goal[buffer.length];characters++;if(key===expected)correct++;else if(expected)weakness[expected]=(weakness[expected]??0)+1;buffer.push(key);
 }
 const retained=buffer.reduce((sum,key,i)=>sum+Number(key===goal[i]),0),minutes=elapsed/60000;
 const accuracy=characters?correct/characters*100:0;
 return {characters,correct,mistakes:characters-correct,retained,accuracy,errorRate:characters?100-accuracy:0,kpm:characters/minutes,wpm:retained/5/minutes,weakness};
}
export function rankedTraceValid(trace:TypingTrace,serverElapsed:number):boolean{
 const keys=Array.from(trace.keys);
 if(serverElapsed<60000||serverElapsed>90000||keys.length<20||keys.length>1000||trace.times.length!==keys.length)return false;
 const gaps=trace.times.slice(1).map((time,i)=>time-trace.times[i]);
 // Plausibility checks deter obvious fabricated bursts; they cannot prove a human typist.
 return trace.times.every((time,i)=>Number.isInteger(time)&&time>=0&&time<=typingDuration&&(i===0||time>=trace.times[i-1]))&&gaps.filter(gap=>gap<8).length<=Math.max(3,gaps.length*0.05)&&gaps.reduce((sum,n)=>sum+n,0)/gaps.length>=35;
}
export const typingTexts={
 de:'Die kleine Reise beginnt am Morgen. Wir lesen einen Text, setzen klare Ziele und lernen Schritt für Schritt. Ruhe und genaue Eingaben helfen beim Üben. ',
 en:'The small journey starts in the morning. We read a text, set clear goals and learn step by step. Calm and accurate input help us practise. ',
};
export const rankedText=(locale:'de'|'en')=>typingTexts[locale].repeat(16);
export const typingLessons=[
 {id:'home',de:'1 · Grundstellung',en:'1 · Home row',text:'asdf jklö fj dk sl aö asdf jklö '.repeat(5)},
 {id:'upper',de:'2 · Obere Reihe',en:'2 · Upper row',text:'qwertz uiopü wer tip tor rot wir '.repeat(5)},
 {id:'lower',de:'3 · Untere Reihe',en:'3 · Lower row',text:'yxcv bnm vbn cxy am an man name '.repeat(5)},
 {id:'capitals',de:'4 · Großbuchstaben',en:'4 · Capitals',text:'Anna Max Lara Otto Tina Paul Das Wort Die Zeit '.repeat(4)},
 {id:'numbers',de:'5 · Zahlen',en:'5 · Numbers',text:'12345 67890 42 100 2026 18 30 64 '.repeat(5)},
 {id:'symbols',de:'6 · Satz- und Sonderzeichen',en:'6 · Punctuation and symbols',text:'Hallo, Welt! Ja? (Text) 50% + 2 = 4; @ # / : - _ '.repeat(4)},
 {id:'words',de:'7 · Wörter',en:'7 · Words',text:'lernen lesen schreiben leise sicher klar genau '.repeat(5)},
 {id:'text',de:'8 · Fließtext',en:'8 · Connected text',text:''},
 {id:'adaptive',de:'9 · Schwächen wiederholen',en:'9 · Repeat weak characters',text:''},
 {id:'free',de:'10 · Eigener Text',en:'10 · Custom text',text:''},
];
export const fingerFor=(char:string):number=>{
 const c=char.toLocaleLowerCase();if(c===' ')return 4;
 const groups=['^1qay<>','2wsx','3edc','45rtfgvb',' ','67zuhjnm','8ik,','9ol.','0ß´püöä-+#'];
 return groups.findIndex(group=>group.includes(c));
};
export function parseTypingTrace(value:unknown):TypingTrace|null{
 if(!value||typeof value!=='object'||!('keys'in value)||!('times'in value)||typeof value.keys!=='string'||!Array.isArray(value.times)||value.times.length>1200||!value.times.every(t=>typeof t==='number'))return null;
 return {keys:value.keys,times:value.times};
}
