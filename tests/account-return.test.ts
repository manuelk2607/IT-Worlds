import assert from 'node:assert/strict';
import { test } from 'node:test';
import {accountPath, allowAccountReturn, learningReturnPath, worldsLoginHref} from '../src/lib/account-return.ts';

test('a lesson or quiz return preserves locale, selection and anchor through the account page',()=>{
  for (const destination of ['/themen/netzwerke/#einstiegsartikel', '/en/quiz/?frage=addressing&thema=network#quiz']) {
    const locale=destination.startsWith('/en/')?'en':'de';
    const entry=new URL(worldsLoginHref(locale,destination),'https://app.test');
    const next=entry.searchParams.get('next');
    assert.equal(entry.pathname,'/auth/start');
    assert.equal(entry.searchParams.get('ui_locales'),locale);
    assert.equal(allowAccountReturn(next,locale),accountPath(locale,destination));
    assert.equal(new URL(next!,'https://app.test').searchParams.get('next'),destination);
    const reauth=new URL(worldsLoginHref(locale,destination,true),'https://app.test');
    assert.equal(reauth.pathname,'/auth/login');
    assert.equal(reauth.searchParams.get('reauth'),'1');
    assert.equal(reauth.searchParams.get('next'),next);
  }
});

test('nested or external redirects, path escapes, callbacks and noncanonical parameters are not return destinations',()=>{
  for (const destination of ['https://evil.test/','//evil.test/','/\\evil.test/','/\t/evil.test/',
    '/themen/%2e%2e/','/themen/%2F%2Fevil.test/','/auth/callback?code=secret','/api/session',
    '/konto/?next=https://evil.test','/quiz/?'+ 'a'.repeat(1200)]) {
    assert.equal(learningReturnPath(destination),null);
    assert.equal(accountPath('de',destination),'/konto/');
    assert.equal(allowAccountReturn('/konto/?'+new URLSearchParams({next:destination}),'de'),null);
  }
  assert.equal(allowAccountReturn('/konto/?next=%2Fquiz%2F&next=%2Flernen%2F','de'),null);
  assert.equal(allowAccountReturn('/en/konto/?next=%2Fquiz%2F','de'),null);
});
