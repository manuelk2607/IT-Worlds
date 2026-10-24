import type{Source}from'./content.ts';
const doc=(url:string,title:string,publisher:string,version:string,section:string):Source=>({url,evidenceUrl:url,title,publisher,version,section,reviewedAt:'2026-10-23',description:section});
const rfc=(number:number,title:string,version:string,section:string):Source=>({...doc('https://www.rfc-editor.org/rfc/rfc'+number+'.html',title,'IETF · RFC Editor',version,section),reviewedAt:'2026-10-24'});
export const networkSources={
 netIpv6:rfc(4291,'IPv6 addressing architecture','RFC 4291 · February 2006','2.2–2.3 · Hexadecimal groups; zero compression; prefix notation'),
 netIpv6Text:rfc(5952,'IPv6 text representation','RFC 5952 · August 2010','4.1–4.3 · Leading zeros; longest zero run; first run on ties; lowercase'),
 netIpv6Examples:rfc(3849,'IPv6 documentation address prefix','RFC 3849 · July 2004','2–3 · 2001:db8::/32; documentation use'),
 netIpv4Examples:rfc(5737,'IPv4 documentation address blocks','RFC 5737 · January 2010','3–4 · TEST-NET-1, TEST-NET-2, TEST-NET-3; documentation use'),
 netUrl:doc('https://developer.mozilla.org/en-US/docs/Web/API/URL','URL interface','MDN Web Docs','Living documentation · accessed 2026-10-23','Constructor; origin; hostname; port; pathname; searchParams; hash'),
 netCidr:{...doc('https://www.rfc-editor.org/rfc/rfc4632.html','Classless Inter-domain Routing','IETF · RFC Editor','RFC 4632 · August 2006','3.1; 5.1–5.2 · Prefix notation; longest match; default routes'),reviewedAt:'2026-10-24'},
 netTcp:doc('https://www.rfc-editor.org/rfc/rfc9293.html','Transmission Control Protocol','IETF · RFC Editor','RFC 9293 · August 2022','2.2 · Key TCP concepts; reliable ordered byte stream'),
 netUdp:doc('https://www.rfc-editor.org/rfc/rfc768.html','User Datagram Protocol','IETF · RFC Editor','RFC 768 · August 1980','Introduction; ports; delivery and duplicate protection'),
 netTls:doc('https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security','Transport Layer Security','MDN Web Docs','Living documentation · accessed 2026-10-23','Encryption, integrity, authentication; handshake; server authentication'),
 netCache:doc('https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching','HTTP caching','MDN Web Docs','Living documentation · accessed 2026-10-23','Freshness; validation; ETag; no-cache versus no-store; private responses'),
};
