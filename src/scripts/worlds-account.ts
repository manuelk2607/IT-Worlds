import {t} from './browser-i18n';
import {worldsStatusReady} from './progress-client';
const panel=document.querySelector<HTMLElement>('[data-worlds-panel]');
if(panel){
 try{
  const status=await worldsStatusReady;
  if(status){
   if(status.enabled)document.documentElement.dataset.worldsAuth='true';
   else delete document.documentElement.dataset.worldsAuth;
   panel.closest('[data-auth-configuration-pending]')?.removeAttribute('data-auth-configuration-pending');
   panel.hidden=status.enabled!==true;
   if(status.enabled&&status.authenticated){
    panel.querySelector<HTMLElement>('[data-worlds-login]')!.hidden=true;
    panel.querySelector<HTMLElement>('[data-worlds-message]')!.textContent=status.accountState==='LINKED'
     ?t('Du bist mit deinem verknüpften IT-Worlds-Account angemeldet.','You are signed in to your linked IT-Worlds account.')
     :status.accountState==='ACCOUNT_UNAVAILABLE'?t('Dein IT-Worlds-Account ist derzeit nicht verfügbar.','Your IT-Worlds account is currently unavailable.')
     :t('Deine zentrale Anmeldung ist aktiv. Für vorhandene Lernstände ist eine bestätigte Kontoverknüpfung erforderlich.','Your central sign-in is active. Existing learning records require a verified account link.');
    const form=panel.querySelector<HTMLFormElement>('[data-worlds-logout]')!;
    form.hidden=false;form.querySelector<HTMLInputElement>('[name=csrf]')!.value=status.csrf??'';
    if(status.linkEnabled&&status.accountState==='ACCOUNT_LINK_REQUIRED'&&status.csrf)enableLink(panel,status.csrf);
   }
  }else throw new Error('Unavailable sign-in configuration');
 }catch{
  panel.hidden=false;
  panel.querySelector<HTMLElement>('[data-worlds-message]')!.textContent=t('Die Anmeldung ist gerade nicht erreichbar. Bitte versuche es erneut.','Sign-in is temporarily unavailable. Please try again.');
 }
}

function enableLink(panel:HTMLElement,csrf:string){
 const section=panel.querySelector<HTMLElement>('[data-worlds-link]')!;
 const review=section.querySelector<HTMLButtonElement>('[data-worlds-link-review]')!;
 const confirm=section.querySelector<HTMLButtonElement>('[data-worlds-link-confirm]')!;
 const summary=section.querySelector<HTMLElement>('[data-worlds-link-summary]')!;
 const message=section.querySelector<HTMLElement>('[data-worlds-link-status]')!;
 let proof:string|undefined;
 section.hidden=false;
 async function submit(step:'prepare'|'confirm'){
  review.disabled=true;
  confirm.disabled=true;
  message.textContent='';
  try{
   const response=await fetch('/api/worlds/link/'+step,{method:'POST',credentials:'same-origin',
    headers:{'Content-Type':'application/json'},body:JSON.stringify(step==='prepare'?{csrf}:{csrf,proof})});
   const result=await response.json() as {error?:string;proof?:string;worldsEmail?:string;localEmail?:string;linked?:boolean};
   if(!response.ok){
    message.textContent=result.error==='CENTRAL_REAUTH_REQUIRED'
     ?t('Bitte bestätige zuerst deine Worlds-Anmeldung.','Please confirm your Worlds sign-in first.')
     :result.error==='LEGACY_REAUTH_REQUIRED'
      ?t('Der Nachweis für dein bisheriges IT-Worlds-Konto fehlt. Die Übernahme ist noch nicht abgeschlossen.','Proof for your existing IT-Worlds account is missing. Migration is not complete yet.')
      :result.error==='RATE_LIMITED'
       ?t('Zu viele Versuche. Bitte versuche es in einigen Minuten erneut.','Too many attempts. Please try again in a few minutes.')
       :t('Die Verknüpfung konnte nicht bestätigt werden. Prüfe beide Konten erneut.','The link could not be confirmed. Please review both accounts again.');
    proof=undefined;
    summary.hidden=true;
    return;
   }
   if(step==='confirm'&&result.linked){location.reload();return;}
   if(!result.proof||!result.worldsEmail||!result.localEmail)throw new Error('Incomplete preview');
   proof=result.proof;
   summary.querySelector<HTMLElement>('[data-worlds-link-central]')!.textContent=result.worldsEmail;
   summary.querySelector<HTMLElement>('[data-worlds-link-local]')!.textContent=result.localEmail;
   summary.hidden=false;
   confirm.focus();
  }catch{
   proof=undefined;
   summary.hidden=true;
   message.textContent=t('Kontoverknüpfung gerade nicht erreichbar.','Account linking is temporarily unavailable.');
  }finally{review.disabled=false;confirm.disabled=false;}
 }
 review.addEventListener('click',()=>void submit('prepare'));
 confirm.addEventListener('click',()=>{if(proof)void submit('confirm');});
}
