import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {auditWorkerArchitecture,checkWorkerArchitecture} from '../../../scripts/check-worker-architecture.mjs';
const baseline='3b5939a9c83d887ccab24ce8309c6b9f62e1cc9f';
const git=file=>execFileSync('git',['show',`${baseline}:${file}`],{encoding:'utf8'});
const changed=new Set(execFileSync('git',['diff','--name-only',baseline,'--','assets/js/modules','assets/js/workers'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim().split('\n'));
const sources=new Map();
for(const directory of ['assets/js/modules','assets/js/workers'])for(const name of fs.readdirSync(directory).filter(n=>n.endsWith('.js'))){
  const file=directory+'/'+name;sources.set(file,changed.has(file)?git(file):fs.readFileSync(file,'utf8'));
}
// The checker text is unchanged; compare baseline inputs and the old parser too.
let oldParser=git('scripts/lib/source-analysis.mjs');
oldParser=oldParser.replace("from 'eslint'",`from '${pathToFileURL(path.resolve('node_modules/eslint/lib/api.js')).href}'`);
const parserUrl='data:text/javascript;base64,'+Buffer.from(oldParser).toString('base64');
let oldAudit=git('scripts/check-worker-architecture.mjs').replace("'./lib/source-analysis.mjs'",JSON.stringify(parserUrl));
oldAudit=oldAudit.slice(0,oldAudit.indexOf('\nif (process.argv[1]'));
const oldModule=await import('data:text/javascript;base64,'+Buffer.from(oldAudit).toString('base64'));
const before=oldModule.auditWorkerArchitecture(sources),after=checkWorkerArchitecture(process.cwd());
if(JSON.stringify(before)!==JSON.stringify(after))throw Error('Architecture findings changed');
const report={baseline,before,after,productCheck:'unchanged baseline failures',parsedBaselineModules:sources.size};
fs.writeFileSync('.superpowers/sdd/exact-calculation-optimization/baseline-worker-findings.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report));
