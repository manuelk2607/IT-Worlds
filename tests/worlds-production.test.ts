import {test} from 'node:test';
import assert from 'node:assert/strict';
import {productionReleaseArgs} from '../scripts/worlds-production.ts';
import {isITWorldsProductionDatabase,isITWorldsProductionTarget,WORLDS_PRODUCTION_VARS} from '../worker/worlds-production.ts';

const database='postgresql://it_worlds_app@ep-broad-unit-baisjndz-pooler.c-8.eu-central-1.aws.neon.tech/IT-Worlds';
const jwk='{"kid":"fixture","kty":"OKP","crv":"Ed25519","x":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}';

test('production Worlds target is exact and never accepts owner, another database, host or pilot',()=>{
 assert.equal(isITWorldsProductionDatabase(database),true);
 for(const invalid of [database.replace('it_worlds_app','neondb_owner'),database.replace('/IT-Worlds','/neondb'),database.replace('ep-broad-unit-baisjndz','ep-other')])assert.equal(isITWorldsProductionDatabase(invalid),false);
 assert.equal(isITWorldsProductionTarget({...WORLDS_PRODUCTION_VARS,DATABASE_URL:database}),true);
 assert.equal(isITWorldsProductionTarget({...WORLDS_PRODUCTION_VARS,DATABASE_URL:database,WORLDS_PILOT_ONLY:true}),false);
 assert.equal(isITWorldsProductionTarget({...WORLDS_PRODUCTION_VARS,DATABASE_URL:database,WORLDS_CLIENT_ID:'other'}),false);
});

test('production release supplies every exact binding and a valid pinned session-event key',()=>{
 const args=productionReleaseArgs(database,jwk);
 for(const [name,value] of Object.entries(WORLDS_PRODUCTION_VARS))assert.ok(args.includes(`${name}:${value}`));
 assert.ok(args.includes(`WORLDS_HUB_SESSION_EVENT_JWK:${jwk}`));
 assert.throws(()=>productionReleaseArgs(database,'{}'),/public JWK/);
 assert.throws(()=>productionReleaseArgs(undefined,jwk),/production runtime database/);
 assert.doesNotThrow(()=>productionReleaseArgs(undefined,undefined,true));
});
