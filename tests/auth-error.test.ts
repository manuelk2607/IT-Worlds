import test from 'node:test';
import assert from 'node:assert/strict';
import { authErrorMessage } from '../src/lib/auth-error.ts';
test('normalised SDK errors and returned API errors have accurate localised feedback',()=>{
  assert.match(authErrorMessage({status:401,code:'invalid_credentials'},'de'),/Passwort stimmen nicht/);
  assert.match(authErrorMessage({status:401,code:'INVALID_EMAIL_OR_PASSWORD'},'en'),/incorrect/);
  assert.match(authErrorMessage({status:429},'en'),/Too many/);
  assert.match(authErrorMessage(new TypeError('Failed to fetch'),'de'),/nicht erreichbar/);
});
