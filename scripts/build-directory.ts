import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
// An explicit artifact lets release checks inspect the exact directory being uploaded.
export const buildDirectory=process.env.IT_WORLDS_DIST?resolve(process.env.IT_WORLDS_DIST):fileURLToPath(new URL('../dist/',import.meta.url));
