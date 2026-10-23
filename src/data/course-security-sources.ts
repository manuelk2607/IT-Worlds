import type{Source}from'./content.ts';
const doc=(slug:string,title:string,section:string):Source=>{const url=`https://cheatsheetseries.owasp.org/cheatsheets/${slug}_Cheat_Sheet.html`;return{url,evidenceUrl:url,title,publisher:'OWASP Foundation',version:'Cheat Sheet Series · accessed 2026-10-23',section,reviewedAt:'2026-10-23',description:section};};
export const securitySources={
 securityThreat:doc('Threat_Modeling','Threat modeling','Four key questions; system modeling; trust boundaries; mitigation and validation'),
 securityAuth:doc('Authentication','Authentication','Introduction; password managers; MFA; throttling; authentication errors'),
 securityInput:doc('Input_Validation','Input validation','Syntax and semantics; allowlists; structured data; validation versus authorization and encoding'),
 securityAuthorization:doc('Authorization','Authorization','Least privilege; deny by default; validate every request; testing'),
 securityXss:doc('Cross_Site_Scripting_Prevention','Cross-site scripting prevention','Framework escape hatches; context-aware output; safe sinks; textContent'),
 securityCsrf:doc('Cross-Site_Request_Forgery_Prevention','Cross-site request forgery prevention','Built-in defenses; synchronizer tokens; SameSite limitations; origin checking'),
 securityLogging:doc('Logging','Security logging','Event attributes; data to exclude; log injection; verification; restricted log access'),
};
