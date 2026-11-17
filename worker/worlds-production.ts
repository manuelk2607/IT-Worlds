export const WORLDS_PRODUCTION_ORIGIN='https://it-worlds.maki26.workers.dev';
export const WORLDS_PRODUCTION_DATABASE_HOST='ep-broad-unit-baisjndz.c-8.eu-central-1.aws.neon.tech';
export const WORLDS_PRODUCTION_DATABASE='IT-Worlds';
export const WORLDS_PRODUCTION_ROLE='it_worlds_app';
export const WORLDS_PRODUCTION_VARS=Object.freeze({
 WORLDS_AUTH_ENABLED:'true',
 WORLDS_ORIGIN:WORLDS_PRODUCTION_ORIGIN,
 WORLDS_ISSUER:'https://ep-bold-boat-batl101c.neonauth.c-8.eu-central-1.aws.neon.tech/worlds_identity/auth',
 WORLDS_CLIENT_ID:'JFHXaKKNmqXgxVeccXcsLlMRJxAxFnfH',
 WORLDS_RESOURCE:WORLDS_PRODUCTION_ORIGIN+'/api',
} as const);

function matchesProductionDatabase(value:string|undefined,role:string,direct=false){
 if(!value)return false;
 try{
  const url=new URL(value);
  return ['postgres:','postgresql:'].includes(url.protocol)&&
   (direct?url.hostname:url.hostname.replace(/-pooler\./,'.'))===WORLDS_PRODUCTION_DATABASE_HOST&&
   decodeURIComponent(url.pathname)==='/'+WORLDS_PRODUCTION_DATABASE&&
   decodeURIComponent(url.username)===role;
 }catch{return false;}
}

export function isITWorldsProductionDatabase(value:string|undefined){
 return matchesProductionDatabase(value,WORLDS_PRODUCTION_ROLE);
}

export function isITWorldsProductionMigrationDatabase(value:string|undefined){
 return matchesProductionDatabase(value,'neondb_owner',true);
}

export function parseWorldsLinkTarget(value:string|undefined):{subject:string;localUserId:string}|null {
 if(!value)return null;
 try{
  const target=JSON.parse(value) as Record<string,unknown>|null;
  if(!target||Object.keys(target).length!==2||typeof target.subject!=='string'||
    !target.subject.trim()||target.subject.length>512||typeof target.localUserId!=='string'||
    !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(target.localUserId))return null;
  return {subject:target.subject,localUserId:target.localUserId};
 }catch{return null;}
}

type ProductionTargetEnv={
 DATABASE_URL?:string;WORLDS_PILOT_ONLY?:boolean;WORLDS_AUTH_ENABLED?:string;WORLDS_ORIGIN?:string;
 WORLDS_ISSUER?:string;WORLDS_CLIENT_ID?:string;WORLDS_RESOURCE?:string;WORLDS_LINK_ENABLED?:string;WORLDS_REAUTH_VERIFIED?:string;
};
export function isITWorldsProductionTarget(env:ProductionTargetEnv){
 const values=env as Record<string,string|boolean|undefined>;
 const linkMode=env.WORLDS_LINK_ENABLED;
 return isITWorldsProductionDatabase(env.DATABASE_URL)&&
  Object.entries(WORLDS_PRODUCTION_VARS).every(([name,value])=>values[name]===value)&&
  (linkMode==='false'||linkMode==='true')&&env.WORLDS_REAUTH_VERIFIED===linkMode&&
  env.WORLDS_PILOT_ONLY!==true;
}
