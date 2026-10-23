import {createSearchIndex} from '../../lib/search-index.ts';
export function GET() {return Response.json(createSearchIndex('en'));}
