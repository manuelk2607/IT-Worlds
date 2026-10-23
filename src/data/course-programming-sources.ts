import type {Source} from './content.ts';
function handbook(page:string,title:string,section:string):Source {
 const url=`https://www.typescriptlang.org/docs/handbook/2/${page}.html`;
 return {title,publisher:'Microsoft · TypeScript',url,evidenceUrl:url,version:'Handbook · accessed 2026-10-23',section,reviewedAt:'2026-10-23',description:section};
}
function runtime(path:string,title:string,section:string):Source {const url='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/'+path;return {title,publisher:'MDN Web Docs',url,evidenceUrl:url,version:'Living reference · accessed 2026-10-23',section,reviewedAt:'2026-10-23',description:section};}
export const programmingSources={
 tsFinite:runtime('Number/isFinite','Number.isFinite','Return value; non-coercing finite-number checks'),
 tsInteger:runtime('Number/isInteger','Number.isInteger','Return value; integer checks'),
 tsFilter:runtime('Array/filter','Array.prototype.filter','Return value; shallow copy; callback'),
 tsMap:runtime('Array/map','Array.prototype.map','Return value; mapping elements'),
 tsFind:runtime('Array/find','Array.prototype.find','Return value; undefined when no match'),
 tsSet:runtime('Set','Set','Description; unique values; size'),
 tsEveryday:handbook('everyday-types','TypeScript · Everyday Types','Primitives; arrays; object types; unions; type aliases'),
 tsFunctions:handbook('functions','TypeScript · More on Functions','Function types; optional parameters; generic functions'),
 tsObjects:handbook('objects','TypeScript · Object Types','Optional and readonly properties; arrays; readonly arrays'),
 tsNarrowing:handbook('narrowing','TypeScript · Narrowing','typeof; discriminated unions; never; exhaustiveness'),
 tsPromises:{title:'Promise',publisher:'MDN Web Docs',url:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',evidenceUrl:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',version:'Living reference · accessed 2026-10-23',section:'Description · states; then/catch; error propagation',reviewedAt:'2026-10-23',description:'Promise states and asynchronous results'},
 nodeTests:{title:'Node.js · Test runner',publisher:'Node.js contributors',url:'https://nodejs.org/download/release/v22.22.0/docs/api/test.html',evidenceUrl:'https://raw.githubusercontent.com/nodejs/node/v22.22.0/doc/api/test.md',version:'Node.js 22.22.0',section:'Synchronous and asynchronous tests; assertions',reviewedAt:'2026-10-23',description:'Built-in test runner and assertions'},
} satisfies Record<string,Source>;
