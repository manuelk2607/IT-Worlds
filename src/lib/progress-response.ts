import type {ProgressItem} from './progress.ts';
interface ProgressState{user:{id:string}|null;items:ProgressItem[]}
// A request can finish after sign-out or after another account became active.
export function acceptProgressResponse(state:ProgressState,requestUserId:string,item:ProgressItem):boolean{
 if(state.user?.id!==requestUserId)return false;
 state.items=[...state.items.filter(current=>current.kind!==item.kind||current.contentId!==item.contentId),item];
 return true;
}
