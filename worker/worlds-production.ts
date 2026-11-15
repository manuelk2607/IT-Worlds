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
 WORLDS_LINK_ENABLED:'true',
 WORLDS_REAUTH_VERIFIED:'true',
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

type ProductionTargetEnv={
 DATABASE_URL?:string;WORLDS_PILOT_ONLY?:boolean;WORLDS_AUTH_ENABLED?:string;WORLDS_ORIGIN?:string;
 WORLDS_ISSUER?:string;WORLDS_CLIENT_ID?:string;WORLDS_RESOURCE?:string;WORLDS_LINK_ENABLED?:string;WORLDS_REAUTH_VERIFIED?:string;
};
export function isITWorldsProductionTarget(env:ProductionTargetEnv){
 const values=env as Record<string,string|boolean|undefined>;
 return isITWorldsProductionDatabase(env.DATABASE_URL)&&
  Object.entries(WORLDS_PRODUCTION_VARS).every(([name,value])=>values[name]===value)&&
  env.WORLDS_PILOT_ONLY!==true;
}
