// Negative protocol checks only; no claim of mail delivery or successful recovery.
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {Client} from './live-accounts.ts';
const value=process.env.IT_WORLDS_TEST_BASE_URL;
assert.equal(process.env.IT_WORLDS_TEST_BRANCH,'development');assert(value);
const base=new URL(value);assert.equal(base.hostname,'localhost');assert.equal(base.protocol,'http:');
const client=new Client(base);
try{
 assert.equal((await client.request('/api/auth/reset-password',{newPassword:'disposable-test-password-123',token:'invalid-'+randomUUID()})).status,400);
 assert.equal((await client.request('/api/auth/request-password-reset',{email:'not-an-email',redirectTo:base.origin+'/konto/'})).status,400);
 assert.equal((await client.request('/api/auth/request-password-reset',{email:`it-worlds-no-account-${randomUUID()}@example.invalid`,redirectTo:base.origin+'/konto/'})).status,200);
 assert.equal((await client.request('/api/auth/reset-password',{newPassword:'disposable-test-password-123',token:'invalid'},'https://untrusted.example.invalid')).status,403);
 console.log('PASS: invalid/expired reset token, malformed email, unknown-account neutral response and cross-origin rejection. Mail reception and successful token recovery remain unverified.');
}catch{console.error('FAIL: development reset boundary checks; no payloads logged.');process.exitCode=1;}
