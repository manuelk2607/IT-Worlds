import {createDemoServer,faults,type Fault} from './demo.ts';
const fault=process.argv[2]??'none';
if(!faults.includes(fault as Fault))throw new Error(`Choose one fault: ${faults.join(', ')}`);
const server=createDemoServer(fault as Fault);
server.listen(8810,'127.0.0.1',()=>console.log(`Teaching service: http://127.0.0.1:8810/; fault=${fault}`));
for(const signal of ['SIGINT','SIGTERM']as const)process.on(signal,()=>{server.close();server.closeAllConnections();});
server.on('error',()=>{console.error('Unable to start the local teaching service. Is port 8810 already in use?');process.exitCode=1;});
