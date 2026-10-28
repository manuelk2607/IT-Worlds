import type{ProgressItem}from'./progress.ts';
/** `solved` means an already recorded correct solution, not a prediction of general competence. */
export function practiceQuizEvidence(items:readonly ProgressItem[],ids:readonly string[]){
 const allowed=new Set(ids),answered=new Map<string,ProgressItem>();
 for(const item of items)if(item.kind==='question'&&item.completed&&allowed.has(item.contentId))answered.set(item.contentId,item);
 const records=[...answered.values()];return{answered:records.length,correct:records.filter(item=>item.solved).length,review:records.filter(item=>!item.solved).map(item=>item.contentId)};
}
