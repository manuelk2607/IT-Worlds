import{t}from'./browser-i18n.ts';
for(const root of document.querySelectorAll<HTMLElement>('[data-cpu-project]')){
 interface Row{pc:number;op:string;before:number;after:number;next:number}
 const data:unknown=JSON.parse(root.dataset.trace??'[]');
 const valid=(v:unknown):v is Row=>!!v&&typeof v==='object'&&'pc'in v&&typeof v.pc==='number'&&'op'in v&&typeof v.op==='string'&&'before'in v&&typeof v.before==='number'&&'after'in v&&typeof v.after==='number'&&'next'in v&&typeof v.next==='number';
 if(!Array.isArray(data)||data.length>1000||!data.every(valid))continue;const trace:Row[]=data;let index=0;
 const state=root.querySelector<HTMLElement>('[data-cpu-state]')!,history=root.querySelector<HTMLOListElement>('[data-cpu-history]')!,next=root.querySelector<HTMLButtonElement>('[data-cpu-next]')!;
 next.addEventListener('click',()=>{const row=trace[index];if(!row)return;const li=document.createElement('li');li.textContent=`PC ${row.pc} · ${row.op} · ACC ${row.before} → ${row.after}`;history.append(li);index++;state.textContent=row.op==='halt'?t(`Angehalten nach ${index} Schritten · ACC ${row.after}`,`Halted after ${index} steps · ACC ${row.after}`):`PC ${row.next} · ACC ${row.after}`;next.disabled=index===trace.length;});
 root.querySelector('[data-cpu-reset]')!.addEventListener('click',()=>{index=0;state.textContent='PC 0 · ACC 0';history.replaceChildren();next.disabled=false;});
}
