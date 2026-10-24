export interface RouteStep {id:string;url:string;title:string}
export function routeProgress(steps:readonly RouteStep[],read:ReadonlySet<string>){
 return {completed:steps.filter(step=>read.has(step.id)).length,total:steps.length,next:steps.find(step=>!read.has(step.id))};
}
