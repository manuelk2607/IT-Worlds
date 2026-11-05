import {t} from './browser-i18n';
const panel=document.querySelector<HTMLElement>('[data-worlds-panel]');
if(panel){
 try{
  const response=await fetch('/api/worlds/status',{credentials:'same-origin',cache:'no-store'});
  if(response.ok){
   const status=await response.json() as {enabled?:boolean;authenticated?:boolean;accountState?:string;csrf?:string};
   panel.hidden=status.enabled!==true;
   if(status.enabled&&status.authenticated){
    panel.querySelector<HTMLElement>('[data-worlds-login]')!.hidden=true;
    panel.querySelector<HTMLElement>('[data-worlds-message]')!.textContent=status.accountState==='LINKED'
     ?t('Du bist mit deinem verknüpften IT-Worlds-Account angemeldet.','You are signed in to your linked IT-Worlds account.')
     :status.accountState==='ACCOUNT_UNAVAILABLE'?t('Dein IT-Worlds-Account ist derzeit nicht verfügbar.','Your IT-Worlds account is currently unavailable.')
     :t('Deine zentrale Anmeldung ist aktiv. Für vorhandene Lernstände ist eine bestätigte Kontoverknüpfung erforderlich. Diese wird im Pilot separat freigegeben.','Your central sign-in is active. Existing learning records require a verified account link. Linking is enabled separately in the pilot.');
    const form=panel.querySelector<HTMLFormElement>('[data-worlds-logout]')!;
    form.hidden=false;form.querySelector<HTMLInputElement>('[name=csrf]')!.value=status.csrf??'';
   }
  }
 }catch{/* Legacy login remains available during pilot outages. */}
}
