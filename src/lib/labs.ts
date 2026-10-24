export function halfAdder(a:boolean,b:boolean){return {sum:Number(a!==b),carry:Number(a&&b)};}
export function gameStep(x:number,y:number,dx:number,dy:number){const nextX=Math.max(0,Math.min(380,x+dx*10)),nextY=Math.max(0,Math.min(200,y+dy*10));const overlaps=(a:number,b:number)=>a<210&&a+20>180&&b<175&&b+20>45;const px=overlaps(nextX,y)?x:nextX;return {x:px,y:overlaps(px,nextY)?y:nextY};}
