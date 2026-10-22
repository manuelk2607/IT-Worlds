import test from 'node:test';
import assert from 'node:assert/strict';
import { redirectToHttps } from '../src/lib/transport.ts';
test('production HTTP redirects permanently to HTTPS while keeping path/query and local development',()=>{
  const response=redirectToHttps(new Request('http://it-worlds.maki26.workers.dev/en/quiz/?thema=netzwerke'))!;
  assert.equal(response.status,308);
  assert.equal(response.headers.get('location'),'https://it-worlds.maki26.workers.dev/en/quiz/?thema=netzwerke');
  assert.equal(redirectToHttps(new Request('https://it-worlds.maki26.workers.dev/')),null);
  assert.equal(redirectToHttps(new Request('http://localhost:8787/')),null);
  assert.equal(redirectToHttps(new Request('http://127.0.0.1:8787/')),null);
});
