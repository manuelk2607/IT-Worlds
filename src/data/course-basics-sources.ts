import type {Source} from './content.ts';
const source=(url:string,title:string,publisher:string,version:string,section:string):Source=>({url,evidenceUrl:url,title,publisher,version,section,reviewedAt:'2026-10-23',description:section});
export const basicsSources={
 basicsSafeInteger:source('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger','Number.isSafeInteger','MDN Web Docs','Living documentation · accessed 2026-10-23','Safe integer range; exact representation; examples'),
 basicsBinary:source('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString','Number.toString','MDN Web Docs','Living documentation · accessed 2026-10-23','Radix; binary representation; precision'),
 basicsJson:source('https://www.rfc-editor.org/rfc/rfc8259.html','The JavaScript Object Notation Data Interchange Format','IETF · RFC Editor','RFC 8259 · December 2017','1–5 · values, objects and arrays'),
 basicsParse:source('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse','JSON.parse','MDN Web Docs','Living documentation · accessed 2026-10-23','Return value; SyntaxError; valid JSON'),
 basicsFiles:source('https://nodejs.org/download/release/v22.22.0/docs/api/fs.html','File system','Node.js contributors','Node.js 22.22.0','mkdtempSync; writeFileSync; readFileSync; rmSync'),
 basicsGit:source('https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository','Recording changes to the repository','Scott Chacon and Ben Straub · Pro Git','Pro Git · second edition','File lifecycle; staging modified files; committing'),
 basicsLinear:source('https://xlinux.nist.gov/dads/HTML/linearSearch.html','Linear search','NIST · Dictionary of Algorithms and Data Structures','Updated 21 April 2022','Definition; sequential examination'),
 basicsBinarySearch:source('https://xlinux.nist.gov/dads/HTML/binarySearch.html','Binary search','NIST · Dictionary of Algorithms and Data Structures','Updated 21 April 2022','Sorted array; halving the interval; O(log n)'),
 basicsDebug:source('https://sre.google/sre-book/effective-troubleshooting/','Effective troubleshooting','Google · Chris Jones','Site Reliability Engineering · 2016','Chapter 12 · theory; observations; controlled hypothesis testing'),
};
