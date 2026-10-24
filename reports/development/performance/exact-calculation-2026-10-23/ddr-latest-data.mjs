import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
const baseline='3b5939a9c83d887ccab24ce8309c6b9f62e1cc9f';
const old=process.argv.includes('--baseline');
const git=file=>execFileSync('git',['show',`${baseline}:${file}`],{maxBuffer:20*1024*1024});
const scratch=path.resolve('.superpowers/sdd/exact-calculation-optimization');
const corePath=old?path.join(scratch,'ddr-baseline-core.mjs'):path.resolve('assets/wasm/pandoeditor-core.js');
if(old)fs.writeFileSync(corePath,git('assets/wasm/pandoeditor-core.js'));
const {default:factory}=await import(pathToFileURL(corePath).href);
const core=await factory({wasmBinary:old?git('assets/wasm/pandoeditor-core.wasm'):fs.readFileSync('assets/wasm/pandoeditor-core.wasm')});
globalThis.PandoLabSphericalCore=core;
await import('../../../assets/js/vendor/polygon-clipping.min.js');
const {createTerritorialFeature}=await import('../../../assets/js/modules/territorial-units.js');
const moduleUrl=(file,replacements={})=>{
  const source=git(file).toString('utf8').replace(/(['"])(\.\.?\/[^'"]+)\1/g,(_,q,s)=>q+(replacements[s]||new URL(s,pathToFileURL(path.resolve(file))).href)+q);
  return 'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
};
const {calculateLibraryBatch}=old?await import(moduleUrl('assets/js/modules/map-edit-library-calculation.js',{'./import-service.js':moduleUrl('assets/js/modules/import-service.js')}))
  :await import('../../../assets/js/modules/map-edit-library-calculation.js');
const source=JSON.parse(fs.readFileSync('assets/data/territorial-entities/source/countries/state-deutsche-demokratische-republik.json'));
const current=JSON.parse(fs.readFileSync('assets/data/territorial-entities/generated/current-world.geojson')).features.filter(f=>['DEU','CZE','POL'].includes(f.id));
const feature=createTerritorialFeature({id:'DDR-regression',name:'동독',entityKind:'general',geometry:source.geometryVersions[0].geometry});
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
let outcome;
try{const result=await calculateLibraryBatch({countries:[feature],units:[]},current,[],globalThis.polygonClipping,async()=>{});outcome={ok:true,resultSha256:hash(result)};}
catch(error){outcome={ok:false,code:error.code||null,message:error.message,causeCode:error.cause?.code||null,causeMessage:error.cause?.message||null};}
const result={variant:old?'baseline':'candidate',coreSource:core.coreSourceSha256,dataRevision:JSON.parse(fs.readFileSync('config/library-data.json')).revision,inputSha256:hash({source,current,feature}),outcome};
fs.writeFileSync(path.join(scratch,old?'ddr-latest-baseline.json':'ddr-latest-candidate.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
