export interface Network{name:string;cidr:string;network:string;last:string;addresses:number;start:number;end:number}
const format=(value:number)=>[24,16,8,0].map(shift=>Math.floor(value/2**shift)%256).join('.');
export function network(name:string,cidr:string):Network{
 const match=/^(\d+\.\d+\.\d+\.\d+)\/(0|[1-9]\d?)$/.exec(cidr);if(!match)throw new Error('Expected canonical dotted IPv4 address and /0 to /32');
 const parts=match[1]!.split('.');if(parts.some(part=>String(Number(part))!==part||Number(part)>255))throw new Error('Invalid IPv4 octet');
 const prefix=Number(match[2]);if(prefix>32)throw new Error('Prefix outside /0 to /32');
 const address=parts.reduce((sum,part)=>sum*256+Number(part),0),addresses=2**(32-prefix),start=Math.floor(address/addresses)*addresses,end=start+addresses-1;
 return{name,cidr,network:format(start),last:format(end),addresses,start,end};
}
export function plan(value:unknown):Network[]{
 if(!Array.isArray(value)||!value.length||value.length>64)throw new Error('Expected 1 to 64 networks');const names=new Set<string>();
 const networks=value.map((v:unknown)=>{if(!v||typeof v!=='object'||!('name'in v)||typeof v.name!=='string'||!v.name.trim()||v.name.length>60||names.has(v.name)||!('cidr'in v)||typeof v.cidr!=='string')throw new Error('Invalid or duplicate network');names.add(v.name);return network(v.name,v.cidr);});
 for(let i=0;i<networks.length;i++)for(let j=i+1;j<networks.length;j++){const a=networks[i]!,b=networks[j]!;if(a.start<=b.end&&b.start<=a.end)throw new Error(`Overlapping networks: ${a.name} / ${b.name}`);}
 return networks;
}
