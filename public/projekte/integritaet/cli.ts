import{snapshot,compare,parseManifest}from'./core.ts';import{readBounded}from'./input.ts';
try{
 const [mode,directory,manifest,...extra]=process.argv.slice(2);if(!directory||extra.length||!['create','verify'].includes(mode??'')||(mode==='create'&&manifest)||(mode==='verify'&&!manifest))throw new Error('Usage: cli.ts create directory | verify directory manifest.json');
 const actual=await snapshot(directory);
 if(mode==='create')console.log(JSON.stringify(actual,null,2));
 else{const expected:unknown=JSON.parse((await readBounded(manifest!)).toString('utf8'));const result=compare(parseManifest(expected),actual);console.log(JSON.stringify(result,null,2));if(result.added.length||result.changed.length||result.removed.length)process.exitCode=1;}
}catch(error){console.error(error instanceof Error?error.message:'Invalid input');process.exitCode=2;}
