import { SITE_URL } from './seo.ts';
export function redirectToHttps(request: Request): Response | null {
  const url=new URL(request.url);
  if(url.protocol!=='http:'||url.hostname!==new URL(SITE_URL).hostname)return null;
  url.protocol='https:';
  url.port='';
  return Response.redirect(url,308);
}
