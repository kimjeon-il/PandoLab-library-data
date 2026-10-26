import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {pathToFileURL} from 'node:url';
const root=process.cwd(), newline=String.fromCharCode(10);
const local=relative=>import(pathToFileURL(path.join(root,relative)).href);
const {reportPath}=await local('tools/report-paths.mjs');
const {withLibraryOutputs}=await local('tools/library-data.mjs');
const {territorialSourceRoot,territorialDataRoot,entityFileName,readTerritorialSource}=await local('tools/territorial-entity-sources.mjs');
const {selectTerritorialChunkBytes}=await local('tools/territorial-chunk-compression.mjs');
const {territorialIndexEntry}=await local('apps/editor/frontend/js/modules/territorial-index-entry.js');
const {normalizeTerritorialLibraryEntity}=await local('apps/editor/frontend/js/modules/territorial-library.js');
const {parseTemporal,temporalContains}=await local('shared/frontend/js/modules/temporal.js');
const scope='reports/borders/history/lifetimes/extant-2026-10-25';
const research=JSON.parse(fs.readFileSync(reportPath(scope+'/research.json',{root,access:'read'}),'utf8'));
const entries=JSON.parse(fs.readFileSync(reportPath(scope+'/held-52-followup.json',{root,access:'read'}),'utf8')).entries;
assert.equal(entries.length,25);
assert.equal(new Set(entries.map(e=>e.id)).size,25);
const hash=value=>createHash('sha256').update(value).digest('hex');
const protectedHash=entity=>{
 const copy=structuredClone(entity);
 delete copy.lifetime;
 if(copy.sourceInfo)delete copy.sourceInfo.lifetimeEvidence;
 return hash(JSON.stringify(copy));
};
const indexFile=path.join(territorialDataRoot,'generated/v2/index.json');
const index=JSON.parse(fs.readFileSync(indexFile,'utf8'));
const fileFor=id=>path.join(territorialSourceRoot,'countries',entityFileName(id));
const baselinePath=reportPath(scope+'/held-52-baseline.json',{root,access:process.argv.includes('--apply')?'write':'read'});
if(process.argv.includes('--apply')){
 if(fs.existsSync(baselinePath))throw Error('A baseline already exists; preserve it and verify the recorded application before another write.');
 const outputs=new Map(), replacements=new Map(), records=[];
 for(const entry of entries){
  const filename=fileFor(entry.id), entity=JSON.parse(fs.readFileSync(filename,'utf8'));
  assert.equal(entity.entityId,entry.id);
  assert.equal(entity.lifetime.validFrom,null,entry.id+' already has an approved start; do not overwrite');
  assert.equal(entity.lifetime.validTo,null);
  const before=protectedHash(entity);
  records.push({id:entry.id,expected:entry.date,lifetimeBefore:entity.lifetime,protectedSha256:before});
  entity.lifetime={...entity.lifetime,validFrom:entry.date};
  const precision=parseTemporal(entry.date,{nullable:false}).precision;
  entity.sourceInfo={...entity.sourceInfo,lifetimeEvidence:{
   reportId:research.id,reportPath:scope,researchedAt:'2026-10-26',calendar:'proleptic-gregorian',precision,
   criterion:entry.criterion,sourceUrls:entry.sources.map(s=>s.url),
   sourceNotes:entry.sources.map(s=>({url:s.url,supports:s.supports,access:s.access})),userSelected:!['policy-derived','research-supported'].includes(entry.state)
  }};
  assert.equal(protectedHash(entity),before);
  const normalized=normalizeTerritorialLibraryEntity(entity);
  const decoded=Buffer.from(JSON.stringify(normalized,null,2)+newline);
  const old=index.entities.find(e=>e.entityId===entry.id);
  assert.ok(old,entry.id+' missing index entry');
  const chunkPath=path.join(territorialDataRoot,'generated/v2',old.file);
  const {stored}=selectTerritorialChunkBytes(decoded,fs.readFileSync(chunkPath));
  const replacement=territorialIndexEntry(normalized,{sha256:hash(stored),compressedBytes:stored.length,decodedBytes:decoded.length});
  assert.equal(replacement.file,old.file);
  outputs.set(filename,Buffer.from(JSON.stringify(entity,null,2)+newline));
  outputs.set(chunkPath,stored);replacements.set(entry.id,replacement);
 }
 const updated={...index,entities:index.entities.map(e=>replacements.get(e.entityId)||e)};
 outputs.set(indexFile,Buffer.from(JSON.stringify(updated,null,2)+newline));
 const baseline={id:research.id,scope:'followup-selected-25',baseLibraryRevision:JSON.parse(fs.readFileSync(path.join(root,'config/library-data.json'),'utf8')).revision,
  appBase:'edfe64dd2',createdAt:new Date().toISOString(),records,selectedBytesWritten:[...outputs.values()].reduce((n,b)=>n+b.length,0),
  dataState:'preflight-passed; source and chunk writes pending'};
 fs.writeFileSync(baselinePath,JSON.stringify(baseline,null,2)+newline);
 withLibraryOutputs({root,paths:[...outputs.keys()]},()=>{for(const [filename,bytes]of outputs)fs.writeFileSync(filename,bytes);});
 baseline.dataState='source-chunk-index-written';
 fs.writeFileSync(baselinePath,JSON.stringify(baseline,null,2)+newline);
 console.log(JSON.stringify({writtenRecords:records.length,files:outputs.size,logicalBytes:baseline.selectedBytesWritten,baseline:baselinePath}));
}else if(!process.argv.includes('--verify'))throw Error('Explicit --apply or --verify required');
const baseline=JSON.parse(fs.readFileSync(baselinePath,'utf8'));
const generated=JSON.parse(fs.readFileSync(indexFile,'utf8'));
let temporalAssertions=0;
for(const before of baseline.records){
 const raw=JSON.parse(fs.readFileSync(fileFor(before.id),'utf8'));
 assert.equal(protectedHash(raw),before.protectedSha256,before.id+' protected fields changed');
 const source=readTerritorialSource(before.id);
 const indexed=generated.entities.find(e=>e.entityId===before.id);
 const compressed=fs.readFileSync(path.join(territorialDataRoot,'generated/v2',indexed.file));
 assert.equal(hash(compressed),indexed.sha256);
 const chunk=JSON.parse(gunzipSync(compressed));
 assert.deepEqual(chunk,source);
 assert.deepEqual(indexed.lifetime,source.lifetime);
 assert.equal(source.lifetime.validFrom,before.expected);
 assert.equal(source.lifetime.validTo,null);
 const point=parseTemporal(before.expected,{nullable:false});
 const [year,month,day]=point.startKey;
 const start=[year,String(month).padStart(2,'0'),String(day).padStart(2,'0')].join('-');
 const preceding=new Date(Date.UTC(year,month-1,day)-86400000).toISOString().slice(0,10);
 for(const entity of [source,chunk,indexed]){
  assert.equal(temporalContains(entity.lifetime,preceding),false,before.id+' alive before start');
  assert.equal(temporalContains(entity.lifetime,start),true,before.id+' absent at start');
  assert.equal(temporalContains(entity.lifetime,'2026-10-26'),true,before.id+' closed current interval');
  temporalAssertions+=3;
 }
}
const result={selectedRecords:baseline.records.length,sourceChunkIndexEqual:true,protectedFieldsPreserved:true,openEnds:true,temporalAssertions,checkedAt:new Date().toISOString()};
const verificationPath=reportPath(scope+'/held-52-verification.json',{root,access:'write'});
fs.writeFileSync(verificationPath,JSON.stringify(result,null,2)+newline);
console.log(JSON.stringify(result));

