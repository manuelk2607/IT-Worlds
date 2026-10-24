import type { Source } from './content.ts';
function pg(page: string, section: string): Source {
 const url = `https://www.postgresql.org/docs/18/${page}.html`;
 return {title: `PostgreSQL · ${section}`,publisher:'PostgreSQL Global Development Group',version:'PostgreSQL 18',section,url,evidenceUrl:url,reviewedAt:'2026-10-23',description:section};
}
function doc(url: string,title: string,publisher: string,version: string,section: string): Source {
 return {url,evidenceUrl:url,title,publisher,version,section,reviewedAt:'2026-10-23',description:section};
}
export const foundationSources = {
 dbTables:pg('tutorial-table','2.3 · Creating a new table'),
 dbConstraints:pg('ddl-constraints','5.5 · NOT NULL, CHECK, primary and foreign keys'),
 dbJoin:pg('tutorial-join','2.6 · Inner and left outer joins'),
 dbAggregate:pg('tutorial-agg','2.7 · Aggregate functions; GROUP BY; HAVING'),
 dbNull:pg('functions-comparison','9.2 · NULL comparisons'),
 dbTransaction:pg('tutorial-transactions','3.4 · BEGIN, COMMIT, ROLLBACK; savepoints'),
 dbIsolation:{...pg('transaction-iso','13.2 · Read Committed snapshots; concurrent UPDATE condition recheck; Serializable and retries'),reviewedAt:'2026-10-24'},
 dbIndex:pg('indexes-intro','11.1 · Index use and maintenance costs'),
 dbExplain:{...pg('using-explain','14.1 · Plan trees; estimates versus measured execution; EXPLAIN output versus SELECT results'),reviewedAt:'2026-10-24'},
 dbWindow:pg('tutorial-window','3.5 · Window functions; partitioning'),
 dbPrepare:pg('sql-prepare','PREPARE · parameters; EXECUTE'),
 dbBackup:pg('backup-dump','25.1 · SQL dump and restore'),
 apiFetch:doc('https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch','Using Fetch','MDN Web Docs','Living documentation · accessed 2026-10-23','Checking response status; cancelling requests; credentials and CORS'),
 apiNarrow:doc('https://www.typescriptlang.org/docs/handbook/2/narrowing.html','Narrowing','Microsoft · TypeScript','Handbook · accessed 2026-10-23','typeof; in operator; type predicates'),
 apiProblems:doc('https://www.rfc-editor.org/rfc/rfc9457.html','Problem Details for HTTP APIs','IETF · RFC Editor','RFC 9457 · July 2023','3.1 · type, status, title, detail; 5 · security'),
 apiBola:doc('https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/','Broken Object Level Authorization','OWASP Foundation','API1:2023','Is the API vulnerable?; How to prevent'),
 apiSemantics:doc('https://www.rfc-editor.org/rfc/rfc9110.html','HTTP Semantics · methods and preconditions','IETF · RFC Editor','RFC 9110 · June 2022','9.2–9.3 · method semantics; 13.1.1 · If-Match; 15 · status codes'),
};
