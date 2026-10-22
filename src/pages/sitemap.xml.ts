import { SITE_URL, publicPaths } from '../lib/seo.ts';
import { localePath } from '../lib/locale.ts';
export function GET() {
  const entries = publicPaths.flatMap(path=>(['de','en'] as const).map(locale=>{
    const de=new URL(path,SITE_URL).href;
    const en=new URL(`/en${path}`,SITE_URL).href;
    const url=new URL(localePath(locale,path),SITE_URL).href;
    return `<url><loc>${url}</loc><xhtml:link rel="alternate" hreflang="de" href="${de}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${de}"/></url>`;
  }));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
