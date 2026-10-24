import fs from 'node:fs';
import path from 'node:path';
import {libraryConfig,libraryMaterializedRoot,safeChild} from '../../../tools/library-data.mjs';
const roots=process.argv.slice(2);
const changes=[];
for(const root of roots) {
  const config=libraryConfig(root),cache=libraryMaterializedRoot(root),base=path.dirname(cache);
  if(fs.readFileSync(path.join(cache,'.complete'),'utf8').trim()!==config.revision)throw Error('Unprepared runtime '+cache);
  for(const mount of config.mounts.filter(m=>m!=='reports')) {
    const output=safeChild(root,mount),target=safeChild(cache,mount);
    if(!fs.lstatSync(output).isSymbolicLink())throw Error('Preserve unexpected non-link '+output);
    const previous=fs.realpathSync(output),rel=path.relative(base,previous);
    if(rel.startsWith('..')||path.isAbsolute(rel))throw Error('Preserve unowned mount '+previous);
    if(previous===fs.realpathSync(target))continue;
    // Only replace our owned junction. Its old cache and every working byte
    // remain intact; never recurse into either target.
    fs.unlinkSync(output);fs.symlinkSync(target,output,'junction');
    changes.push({root,mount,previous,target,revision:config.revision});
  }
}
fs.writeFileSync('.superpowers/sdd/exact-calculation-optimization/runtime-mount-propagation.json',JSON.stringify({changes,reports:'Existing original report working copies preserved. Other worktrees lazily prepare their own new report revision when needed; no repeated 808MB copy.'},null,2));
console.log(JSON.stringify({updated:changes.length,roots}));
