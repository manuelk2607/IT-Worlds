import {auditFetch} from './audit-fetch.ts';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import {buildDirectory} from './build-directory.ts';
import assert from 'node:assert/strict';
const dist = buildDirectory;
const sitemap = await readFile(join(dist,'sitemap.xml'),'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>new URL(match[1]));
const robots = await readFile(join(dist,'robots.txt'),'utf8');
assert(urls.length>0 && new Set(urls.map(url=>url.href)).size===urls.length,'Sitemap URLs missing/duplicated');
const origin=urls[0].origin;
// Read the local build before live requests, so a subsequent rebuild cannot mix versions.
const pages=new Map(await Promise.all(urls.map(async url=>[url.href,await readFile(join(dist,url.pathname,'index.html'),'utf8')] as const)));
const liveChecks:(()=>Promise<void>)[]=[];
if(process.argv.includes('--live')){
  const http = await auditFetch(origin.replace('https:', 'http:')+'/', {redirect:'manual'});
  assert.equal(http.status,308,'HTTPS redirect missing');
  assert.equal(http.headers.get('location'),origin+'/');
}
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert(!/^Disallow:\s*\/\s*$/m.test(robots),'Public crawling blocked');
function attribute(tag:string,name:string){return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];}
const titles=new Set<string>();
for(const url of urls){
  assert(url.protocol==='https:'&&url.origin===origin&&!url.search&&!url.hash,'Non-canonical sitemap URL');
  const html=pages.get(url.href)!;
  const links=html.match(/<link\b[^>]*>/g)??[];
  const metas=html.match(/<meta\b[^>]*>/g)??[];
  const canonical=links.filter(tag=>attribute(tag,'rel')==='canonical');
  assert(canonical.length===1&&attribute(canonical[0],'href')===url.href,`Canonical: ${url.pathname}`);
  assert.equal((html.match(/<h1\b/g)??[]).length,1,`Heading: ${url.pathname}`);
  const title=html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert(title&&title.length>10&&!titles.has(title),`Missing/duplicate title: ${url.pathname}`);titles.add(title);
  const description=metas.find(tag=>attribute(tag,'name')==='description');
  assert(description&&(attribute(description,'content')??'').length>=40,`Description: ${url.pathname}`);
  const rule=metas.find(tag=>attribute(tag,'name')==='robots');
  assert(rule&&!attribute(rule,'content')?.includes('noindex'),`Public noindex: ${url.pathname}`);
  const dePath=url.pathname.replace(/^\/en(?=\/|$)/,'')||'/';
  for(const [language,path]of [['de',dePath],['en',`/en${dePath}`],['x-default',dePath]])
    assert(links.some(tag=>attribute(tag,'hreflang')===language&&attribute(tag,'href')===new URL(path,origin).href),`Language link: ${url.pathname}`);
  const structured=html.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  assert(structured&&Array.isArray(JSON.parse(structured)['@graph']),`Structured data: ${url.pathname}`);
  const image=metas.find(tag=>attribute(tag,'property')==='og:image');assert(image);
  const imagePath=join(dist,new URL(attribute(image,'content')!).pathname);
  const png=await readFile(imagePath);assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
  if(process.argv.includes('--live'))liveChecks.push(async()=>{
    const response=await auditFetch(url,{redirect:'manual',headers:{'User-Agent':'Googlebot'}});
    assert.equal(response.status,200,`Crawler HTTP: ${url.pathname}`);
    assert(!response.headers.get('x-robots-tag')?.includes('noindex'),`Header noindex: ${url.pathname}`);
    assert((await response.text())===html,`Public HTML differs: ${url.pathname}`);
  });
}
for(const path of ['konto','fortschritt','en/konto','en/fortschritt','en/404']){
  const html=await readFile(join(dist,path,'index.html'),'utf8');assert(/name="robots"[^>]*content="noindex, follow"/.test(html));
}
assert(/name="robots"[^>]*content="noindex, follow"/.test(await readFile(join(dist,'404.html'),'utf8')));
for(const file of ['images/social-de.png','images/social-en.png'])assert((await stat(join(dist,file))).size>1000);
if(liveChecks.length){
 let next=0;
 await Promise.all(Array.from({length:4},async()=>{while(next<liveChecks.length){const check=liveChecks[next++]!;await check();}}));
}
console.log(`PASS: ${urls.length} canonical, bilingual, indexable learning pages; sitemap, robots, titles, descriptions, headings, JSON-LD and preview images valid${process.argv.includes('--live')?'; public crawler responses match the build':''}.`);
