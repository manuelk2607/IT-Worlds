import type{Source}from'./content.ts';
const doc=(url:string,title:string,publisher:string,version:string,section:string):Source=>({url,evidenceUrl:url,title,publisher,version,section,reviewedAt:'2026-10-24',description:section});
const living='Living documentation · accessed 2026-10-24';
export const devopsSources={
 devopsCloud:doc('https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf','The NIST Definition of Cloud Computing','NIST · Peter Mell and Timothy Grance','SP 800-145 · September 2011','2 · Essential characteristics; SaaS, PaaS and IaaS service models'),
 devopsInstall:doc('https://docs.npmjs.com/cli/v11/commands/npm-ci/','npm ci','npm documentation contributors','npm CLI 11','Description · lockfile agreement; clean frozen installation'),
 devopsHash:doc('https://nodejs.org/download/release/v22.22.0/docs/api/crypto.html#cryptocreatehashalgorithm-options','Crypto · createHash','Node.js contributors','Node.js 22.22.0','createHash; hash.update; hash.digest; SHA-256 examples'),
 devopsWorkflow:doc('https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows','Workflows','GitHub',living,'About workflows; events; jobs; steps'),
 devopsWorkflowSafety:doc('https://docs.github.com/en/actions/reference/security/secure-use','Secure use of GitHub Actions','GitHub',living,'Least privilege; untrusted context input; action source verification and commit pinning'),
 devopsContainer:doc('https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/','What is a container?','Docker',living,'Isolated processes; containers versus virtual machines'),
 devopsImage:doc('https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/','What is an image?','Docker',living,'Immutable image; layers; files and dependencies'),
 devopsRun:doc('https://docs.docker.com/engine/containers/run/','Running containers','Docker',living,'Image references; digests; filesystem mounts; command and exit status'),
 devopsRunFlags:doc('https://docs.docker.com/reference/cli/docker/container/run/','docker container run','Docker',living,'--read-only; --rm; --mount; --network'),
 devopsNoNetwork:doc('https://docs.docker.com/engine/network/drivers/none/','None network driver','Docker',living,'Network none; loopback-only device'),
 devopsVolume:doc('https://docs.docker.com/engine/storage/volumes/','Volumes','Docker',living,'Lifecycle; persistence outside a container; named and anonymous volumes'),
 devopsBuildSecrets:doc('https://docs.docker.com/build/building/secrets/','Build secrets','Docker',living,'Build arguments and environment variables; temporary secret mounts'),
 devopsSecrets:doc('https://developers.cloudflare.com/workers/configuration/secrets/','Secrets','Cloudflare','Documentation updated 2026-10-15','Background; local development; do not commit secrets to Git'),
 devopsSlo:doc('https://sre.google/sre-book/service-level-objectives/','Service level objectives','Google · Chris Jones, John Wilkes and Niall Murphy','Site Reliability Engineering · 2016','4 · Indicators; objectives; agreements; measurement windows'),
 devopsMonitoring:doc('https://sre.google/sre-book/monitoring-distributed-systems/','Monitoring distributed systems','Google · Rob Ewaschuk','Site Reliability Engineering · 2016','6 · Four golden signals; symptoms and causes; low-noise alerts'),
 devopsRollback:doc('https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/','Rollbacks','Cloudflare','Documentation updated 2026-07-15','Previous versions; active deployment; connected resources unchanged; data compatibility'),
};
