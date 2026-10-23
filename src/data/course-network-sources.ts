import type{Source}from'./content.ts';
const doc=(url:string,title:string,publisher:string,version:string,section:string):Source=>({url,evidenceUrl:url,title,publisher,version,section,reviewedAt:'2026-10-23',description:section});
export const networkSources={
 netUrl:doc('https://developer.mozilla.org/en-US/docs/Web/API/URL','URL interface','MDN Web Docs','Living documentation · accessed 2026-10-23','Constructor; origin; hostname; port; pathname; searchParams; hash'),
 netCidr:doc('https://www.rfc-editor.org/rfc/rfc4632.html','Classless Inter-domain Routing','IETF · RFC Editor','RFC 4632 · August 2006','3.1 · Basic concept and prefix notation'),
 netTcp:doc('https://www.rfc-editor.org/rfc/rfc9293.html','Transmission Control Protocol','IETF · RFC Editor','RFC 9293 · August 2022','2.2 · Key TCP concepts; reliable ordered byte stream'),
 netUdp:doc('https://www.rfc-editor.org/rfc/rfc768.html','User Datagram Protocol','IETF · RFC Editor','RFC 768 · August 1980','Introduction; ports; delivery and duplicate protection'),
 netTls:doc('https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security','Transport Layer Security','MDN Web Docs','Living documentation · accessed 2026-10-23','Encryption, integrity, authentication; handshake; server authentication'),
 netCache:doc('https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching','HTTP caching','MDN Web Docs','Living documentation · accessed 2026-10-23','Freshness; validation; ETag; no-cache versus no-store; private responses'),
};
