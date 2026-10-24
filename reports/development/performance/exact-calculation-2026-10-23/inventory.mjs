import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {parseJavaScript} from '../../../scripts/lib/source-analysis.mjs';

const root=process.cwd(), scratch=path.resolve('.superpowers/sdd/exact-calculation-optimization');
const baseline='3b5939a9c83d887ccab24ce8309c6b9f62e1cc9f';
const files=execFileSync('git',['ls-tree','-r','--name-only','-z',baseline],{encoding:'utf8'}).split('\0').filter(Boolean);
const source=/\.(?:[cm]?js|ts|tsx|jsx|c|cc|cpp|cxx|h|hpp|py|rs|ps1|sh|bat|glsl|vert|frag|cmake|kt|java|kts|gradle|html|yml|yaml|in)$/i;
const sources=files.filter(f=>source.test(f)||f.endsWith('CMakeLists.txt'));
const packed=execFileSync('git',['cat-file','--batch'],{input:sources.map(file=>baseline+':'+file+'\n').join(''),maxBuffer:128*1024*1024});
let offset=0;
const records=[];
for(const file of sources) {
  const end=packed.indexOf(10,offset),header=packed.toString('utf8',offset,end);
  const match=/^[a-f0-9]+ blob (\d+)$/.exec(header);
  if(!match)throw Error(file+': '+header);
  const size=Number(match[1]),bytes=packed.subarray(end+1,end+1+size),text=bytes.toString('utf8');
  offset=end+1+size+1;
  let owner=file, category='first-party', reason='Static calculation/scan/allocation/I-O inventory reviewed; no proven exact-preserving improvement selected.';
  if(/^(?:assets\/worker-runtime|tests\/fixtures|assets\/(?:js\/vendor|vendor|wasm)|apps\/web-shell\/src-tauri\/gen)\//.test(file)||/\.min\./.test(file)){
    category='generated-or-third-party';
    owner=file.replace(/^assets\/worker-runtime\/[^/]+\//,'');
    reason=owner!==file?'Versioned Worker closure; modify canonical source and regenerate.':'Pinned vendor or historical test fixture; not a first-party optimization target.';
    if(file.startsWith('assets/wasm/')){owner='shared/core + shared/wasm';reason='Generated Emscripten binding; shared source is canonical.';}
    if(file.startsWith('apps/web-shell/src-tauri/gen/')){owner='apps/web-shell/src-tauri/android + tauri config';reason='Generated native project; customize canonical Android templates.';}
  } else if(/^(?:tests|shared\/tests)\//.test(file)) {category='verification';reason='Test/support code, not a production calculation owner.';}
  else if(/(?:build-meta\.js|\.bundle\.js)$/.test(file)||['index.html','apps/web-shell/editor.html'].includes(file)){category='generated-or-third-party';owner='scripts/generate-build-metadata.mjs';reason='Generated asset; canonical generator owns changes.';}
  const signals={loops:(text.match(/\b(?:for|while)\s*\(/g)||[]).length+(text.match(/\bfor .+ in /g)||[]).length,
    scans:(text.match(/\.(?:find|findIndex|filter|some|every|includes|indexOf)\s*\(/g)||[]).length,
    copies:(text.match(/\b(?:structuredClone|deepcopy|JSON\.(?:parse|stringify))\s*\(|\.(?:slice|map|flatMap)\s*\(/g)||[]).length,
    io:(text.match(/\b(?:readFileSync|writeFileSync|readFile|writeFile|fetch|open|load|save)\s*\(/g)||[]).length,nestedScans:0};
  let parseError;
  if(category==='first-party'&&/\.[cm]?js$/.test(file))try{
    const code=parseJavaScript(text,{filePath:file,sourceType: /\brequire\(|module\.exports/.test(text)?'commonjs':'module'});
    const walk=(node,depth=0)=>{if(!node)return;
      const member=node.type==='CallExpression'&&node.callee.type==='MemberExpression'&&!node.callee.computed?node.callee.property.name:'';
      const iterative=/^(?:map|filter|find|findIndex|some|every|includes|indexOf|forEach|reduce|flatMap)$/.test(member);
      if(iterative&&depth)signals.nestedScans++;
      const next=depth+Number(iterative||/^(?:For|While|DoWhile)/.test(node.type));
      for(const key of code.visitorKeys[node.type]||[]){const value=node[key];if(Array.isArray(value))value.forEach(child=>walk(child,next));else walk(value,next);}
    };walk(code.ast);
  }catch(error){parseError=String(error);reason='Parser review required; source scanned as text.';}
  records.push({file,owner,category,status:category==='first-party'?'reviewed-static':'unnecessary',reason,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),signals,...(parseError?{parseError}:{})});
}
const report={schema:'pando-exact-calculation-inventory-v1',baseline,node:process.version,scope:'Exact baseline Git blobs, all tracked source extensions across all directories. Static triage is not a claim of exhaustive dynamic profiling.',records};
fs.writeFileSync(path.join(scratch,'inventory.json'),JSON.stringify(report,null,2)+'\n');
const top=records.filter(r=>r.category==='first-party').sort((a,b)=>b.signals.nestedScans-a.signals.nestedScans||b.signals.scans-a.signals.scans);
fs.writeFileSync(path.join(scratch,'ranked.txt'),top.map(r=>`${r.signals.nestedScans}\t${r.signals.scans}\t${r.signals.loops}\t${r.file}`).join('\n'));
console.log(JSON.stringify({counts:Object.fromEntries([...new Set(records.map(r=>r.category))].map(k=>[k,records.filter(r=>r.category===k).length])),parseErrors:records.filter(r=>r.parseError).map(r=>({file:r.file,error:r.parseError})),top:top.slice(0,35).map(({file,signals})=>({file,signals}))},null,2));
