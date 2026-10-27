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
 {id:'reach',de:'2 · G und H aus der Grundstellung',en:'2 · Reach G and H',text:'fgf jhj gh hg fad hag gfall hall '.repeat(4)},
 {id:'upper',de:'3 · Obere Reihe',en:'3 · Upper row',text:'qwertz uiopü wer tip tor rot wir '.repeat(5)},
 {id:'lower',de:'4 · Untere Reihe, Ä und ß',en:'4 · Lower row, Ä and ß',text:'yxcv bnm vbn cxy am an man name ä ß '.repeat(5)},
 {id:'capitals',de:'5 · Großbuchstaben',en:'5 · Capitals',text:'Anna Max Lara Otto Tina Paul Das Wort Die Zeit '.repeat(4)},
 {id:'numbers',de:'6 · Zahlen',en:'6 · Numbers',text:'12345 67890 42 100 2026 18 30 64 '.repeat(5)},
 {id:'symbols',de:'7 · Satz- und Sonderzeichen',en:'7 · Punctuation and symbols',text:'Hallo, Welt! Ja? (Text) 50% + 2 = 4; @ # / : - _ '.repeat(4)},
 {id:'words',de:'8 · Wörter (Basis)',en:'8 · Words (basic)',text:'lernen lesen schreiben leise sicher klar genau '.repeat(5)},
 {id:'text',de:'9 · Kurzer Lesetext',en:'9 · Short reading text',text:''},
 {id:'sentences',de:'10 · Zusammenhängende Sätze',en:'10 · Connected sentences',text:''},
 {id:'paragraphs',de:'11 · Ein vollständiger Absatz',en:'11 · A complete paragraph',text:''},
 {id:'technical',de:'12 · Alltagstext mit Zahlen und Zeichen',en:'12 · Everyday text with numbers and symbols',text:''},
 {id:'adaptive',de:'Schwächen gezielt wiederholen',en:'Repeat weak characters',text:''},
 {id:'free',de:'Eigenen Text üben',en:'Practise a custom text',text:''},
];
type TypingLocale='de'|'en';
export interface TypingLessonGuide {introduced:string; prerequisite:string; description:Record<TypingLocale,string>}
const lowerLetters='abcdefghijklmnopqrstuvwxyzäöüß';
const upperLetters=lowerLetters.toLocaleUpperCase('de-DE');
export const typingLessonGuides:Record<string,TypingLessonGuide>={
 home:{introduced:'asdfjklö ',prerequisite:'',description:{de:'Beginne mit kurzen Folgen aus der Grundstellung. Genauigkeit zählt vor Tempo.',en:'Start with short home-row sequences. Focus on accuracy before speed.'}},
 reach:{introduced:'gh',prerequisite:'home',description:{de:'Erreiche G und H mit den Zeigefingern und kehre zu F und J zurück.',en:'Reach G and H with your index fingers, then return to F and J.'}},
 upper:{introduced:'qwertzuiopü',prerequisite:'reach',description:{de:'Erweitere die Grundstellung um die obere Buchstabenreihe.',en:'Extend your home position to the upper letter row.'}},
 lower:{introduced:'yxcvbnmäß',prerequisite:'upper',description:{de:'Ergänze die untere Reihe sowie Ä und ß. Die bisherigen Buchstaben bleiben verfügbar.',en:'Add the lower row plus Ä and ß. Earlier letters remain available.'}},
 capitals:{introduced:upperLetters,prerequisite:'lower',description:{de:'Übe Großschreibung mit der Umschalttaste der jeweils anderen Hand.',en:'Practise capitals using Shift with the opposite hand.'}},
 numbers:{introduced:'0123456789',prerequisite:'capitals',description:{de:'Übe einzelne Zahlen und Zahlengruppen, bevor sie in längeren Texten vorkommen.',en:'Practise numbers and digit groups before meeting them in longer texts.'}},
 symbols:{introduced:',.!?()%+=;@#/:_-',prerequisite:'numbers',description:{de:'Führe Satzzeichen und Sonderzeichen vor den Textaufgaben ein.',en:'Introduce punctuation and symbols before the text challenges.'}},
 words:{introduced:'',prerequisite:'lower',description:{de:'Verbinde bekannte Buchstaben zu kurzen Wörtern.',en:'Connect familiar letters into short words.'}},
 text:{introduced:'',prerequisite:'symbols',description:{de:'Ein kurzer wiederholter Lesetext als Übergang zu längeren Aufgaben.',en:'A short repeated reading text introduces longer tasks.'}},
 sentences:{introduced:'',prerequisite:'symbols',description:{de:'Schreibe drei aufeinander aufbauende Sätze mit Großschreibung und Satzzeichen.',en:'Type three connected sentences with capitals and punctuation.'}},
 paragraphs:{introduced:'',prerequisite:'sentences',description:{de:'Übe einen zusammenhängenden Absatz ohne Wiederholung. Halte den Lesefluss und korrigiere am Textende.',en:'Practise a connected paragraph without repetition. Keep reading and correct at the end.'}},
 technical:{introduced:'',prerequisite:'paragraphs',description:{de:'Bearbeite eine realistische Notiz mit Zahlen, Klammern, Prozentzeichen und Uhrzeit.',en:'Work through a realistic note with numbers, brackets, percentages and a time.'}},
 adaptive:{introduced:'',prerequisite:'',description:{de:'Wiederhole die häufig verfehlten Zeichen deiner lokalen Ergebnisse.',en:'Repeat frequently missed characters from your local results.'}},
 free:{introduced:'',prerequisite:'',description:{de:'Wähle deinen eigenen Text. Er bleibt ausschließlich in diesem Browser.',en:'Choose your own text. It stays entirely in this browser.'}},
};
const connectedTexts:Record<string,Record<TypingLocale,string>>={
 sentences:{de:'Am Morgen öffnet Mia ihr Heft. Sie liest die Aufgabe und setzt ein klares Ziel. Danach schreibt sie ruhig weiter, prüft jedes Wort und macht eine kurze Pause.',en:'In the morning, Mia opens her notebook. She reads the task and sets a clear goal. Then she keeps typing calmly, checks each word and takes a short break.'},
 paragraphs:{de:'Unsere Lerngruppe plant einen gemeinsamen Nachmittag. Zuerst sammeln wir Fragen, dann ordnen wir die Themen auf einem Blatt. Jede Person übernimmt einen kleinen Teil und erklärt später ihre Lösung. Wenn etwas unklar bleibt, suchen wir gemeinsam nach einem Beispiel. Wir prüfen die Notizen, ergänzen fehlende Schritte und lesen den Text noch einmal laut. Am Ende teilen wir den fertigen Plan und legen die nächste Pause fest.',en:'Our study group is planning an afternoon together. First we collect questions, then we arrange the topics on a sheet of paper. Each person takes a small part and explains their solution later. When something remains unclear, we look for an example together. We check the notes, add missing steps and read the text aloud once more. At the end we share the finished plan and decide when to take our next break.'},
 technical:{de:'Notiz für das Team: Am 18. Juni treffen wir uns um 14:30 Uhr im Raum 42. Bitte bringt 2 Entwürfe und eine Liste mit 5 Fragen mit. Ziel ist ein klarer Bericht (maximal 3 Seiten). Wir prüfen zuerst die Quellen, danach die Tabellen. Sind mindestens 90% der Angaben belegt? Offene Punkte schreiben wir in die Liste; Änderungen kennzeichnen wir mit Datum. Zum Schluss speichern wir die Datei und vereinbaren den nächsten Termin.',en:'Note for the team: On 18 June, we meet at 14:30 in room 42. Please bring 2 drafts and a list of 5 questions. Our goal is a clear report (no more than 3 pages). We check the sources first, then the tables. Do sources support at least 90% of the claims? We add open points to the list; changes receive a date. Finally, we save the file and arrange the next meeting.'},
};
/** The same fixed lesson text is used locally and by the account API. Ranked text stays stable. */
export function typingLessonText(id:string,locale:TypingLocale):string|undefined {
 if(connectedTexts[id])return connectedTexts[id][locale];
 if(id==='words'&&locale==='en')return 'learn read write calm clear safe accurate '.repeat(5);
 if(id==='text')return typingTexts[locale].repeat(8);
 const lesson=typingLessons.find(item=>item.id===id);
 return lesson?.text||undefined;
}
export function typingTargetKey(target:string,locale:TypingLocale):string {
 let hash=2166136261;for(const char of target.normalize('NFC'))hash=Math.imul(hash^char.codePointAt(0)!,16777619);
 return `${locale}-${hash>>>0}`;
}
/** Replay edits in code points, matching the scorer's backspace semantics. */
export function typingEdit(previous:string,next:string):{removed:number;added:string[]} {
 const before=Array.from(previous.normalize('NFC')),after=Array.from(next.normalize('NFC'));
 let common=0;while(common<before.length&&common<after.length&&before[common]===after[common])common++;
 return {removed:before.length-common,added:after.slice(common)};
}
export interface TypingTextProgress {total:number;entered:number;retained:number;complete:boolean;errors:{position:number;expected:string;actual:string}[]}
export function typingTextProgress(target:string,input:string):TypingTextProgress {
 const goal=Array.from(target.normalize('NFC')),typed=Array.from(input.normalize('NFC'));
 const errors=typed.flatMap((char,index)=>char===goal[index]?[]:[{position:index+1,expected:goal[index]??'',actual:char}]);
 const retained=typed.reduce((sum,char,index)=>sum+Number(char===goal[index]),0);
 return{total:goal.length,entered:Math.min(typed.length,goal.length),retained,complete:goal.length>0&&typed.length===goal.length&&errors.length===0,errors};
}
export const fingerFor=(char:string):number=>{
 const c=char.toLocaleLowerCase();if(c===' ')return 4;
 const groups=['^1qay<>','2wsx','3edc','45rtfgvb',' ','67zuhjnm','8ik,','9ol.','0ß´püöä-+#'];
 return groups.findIndex(group=>group.includes(c));
};
export function parseTypingTrace(value:unknown):TypingTrace|null{
 if(!value||typeof value!=='object'||!('keys'in value)||!('times'in value)||typeof value.keys!=='string'||!Array.isArray(value.times)||value.times.length>1200||!value.times.every(t=>typeof t==='number'))return null;
 return {keys:value.keys,times:value.times};
}
