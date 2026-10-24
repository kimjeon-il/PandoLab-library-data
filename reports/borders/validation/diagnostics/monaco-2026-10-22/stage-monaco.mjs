import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {applyLsibSupplement} from '../../tools/apply-lsib-supplement.mjs';
const root=process.cwd(), cache=path.join(root,'build-native/lsib-supplement/monaco-review');
const candidate=JSON.parse(fs.readFileSync('build-native/lsib-supplement/monaco-candidate.json','utf8'));
for(const change of candidate.changes){
  const name=`state-${change.entityId.split(':')[1]}.json`;
  const bytes=fs.readFileSync(path.join(root,'assets/data/territorial-entities/source/countries',name));
  if(createHash('sha256').update(bytes).digest('hex')!==change.inputFileSha256)throw Error('Source changed');
  for(const mode of ['before','staged']){
    const folder=path.join(cache,mode,'countries');fs.mkdirSync(folder,{recursive:true});
    const file=path.join(folder,name);
    if(mode==='before'&&fs.existsSync(file)&&!fs.readFileSync(file).equals(bytes))throw Error('Original evidence differs');
    fs.writeFileSync(file,bytes);
  }
}
console.log(JSON.stringify(applyLsibSupplement(candidate,{root:path.join(cache,'staged')})));
