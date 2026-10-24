import{t}from'./browser-i18n.ts';
for(const region of document.querySelectorAll<HTMLElement>('[data-code-example]')){
 const button=region.querySelector<HTMLButtonElement>('[data-copy-code]')!;
 const code=region.querySelector('code')!,status=region.querySelector<HTMLElement>('[data-copy-status]')!;
 if(!navigator.clipboard?.writeText)continue;
 button.hidden=false;
 button.addEventListener('click',async()=>{
  button.disabled=true;status.textContent='';
  try{
   await navigator.clipboard.writeText(code.textContent??'');
   button.textContent=t('Kopiert ✓','Copied ✓');
   status.textContent=t('Der vollständige Code wurde kopiert.','The complete code was copied.');
  }catch{
   status.textContent=t('Kopieren ist hier nicht verfügbar. Markiere den Code und kopiere ihn über dein Browsermenü.','Copying is unavailable here. Select the code and copy it using your browser menu.');
   region.querySelector<HTMLElement>('pre')!.focus();
  }finally{button.disabled=false;}
 });
}
