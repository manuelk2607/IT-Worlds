import {checkDeployment} from './check.ts';
try{
 const base=process.argv[2];if(!base||process.argv.length!==3)throw new Error('Usage: node --experimental-strip-types cli.ts http://127.0.0.1:8810/');
 const results=await checkDeployment(base);
 for(const result of results)console.log(`${result.ok?'PASS':'FAIL'}: ${result.name}: ${result.detail}`);
 process.exitCode=results.every(result=>result.ok)?0:1;
}catch(error){console.error(error instanceof Error?error.message:'Invalid invocation.');process.exitCode=2;}
