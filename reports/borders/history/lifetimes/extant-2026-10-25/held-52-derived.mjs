import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {pathToFileURL} from 'node:url';
const root=process.cwd(),local=p=>import(pathToFileURL(path.join(root,p)).href);
const {withLibraryOutputs}=await local('tools/library-data.mjs');
const {parseTemporal,temporalContains}=await local('shared/frontend/js/modules/temporal.js');
const dir=path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/,'$1');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex');
const entries=read(path.join(dir,'held-52-followup.json')).entries;
const baseline=read(path.join(dir,'held-52-baseline.json'));
const index=read('assets/data/builtin-world/generated/v1/index.json');
const sourceIndex=read('assets/data/territorial-entities/generated/v2/index.json');
const oldEntries=new Map(baseline.worldEntries.map(e=>[e.entityId,e]));
const selectedIds=new Set(entries.map(e=>e.id));
const sourceToProject=new Map(index.sourceIdentities.flatMap(e=>e.sourceEntityIds.map(id=>[id,e.projectEntityId])));
const selectedProjects=new Set(entries.map(e=>sourceToProject.get(e.id)));
assert.equal(selectedProjects.size,25);
const changed=index.entities.filter(e=>oldEntries.get(e.entityId)?.sha256!==e.sha256);
assert.deepEqual(new Set(changed.map(e=>e.entityId)),selectedProjects,'No unrelated country packet may change');
const transport=fs.readFileSync(path.join('assets/data/builtin-world/generated/v1',index.transport.url));
let assertions=0;
const rows=[],packets=new Map();
for(const e of entries){
 const projectId=sourceToProject.get(e.id),entry=index.entities.find(x=>x.entityId===projectId);
 const bytes=fs.readFileSync(path.join('assets/data/builtin-world/generated/v1',entry.file));
 assert.equal(hash(bytes),entry.sha256);
 assert.deepEqual(transport.subarray(entry.offset,entry.offset+entry.compressedBytes),bytes);
 const packet=JSON.parse(gunzipSync(bytes));packets.set(projectId,packet);
 const original=packet.identity.properties.metadata.historicalTimeline.lifetime;
 assert.deepEqual(original,{validFrom:e.date,validTo:null});
 const lifetime=packet.timelineRecords.lifetimes.find(x=>x.entityId===projectId);
 const key=parseTemporal(e.date,{nullable:false}).startKey;
 const instant=[key[0],String(key[1]).padStart(2,'0'),String(key[2]).padStart(2,'0')].join('-');
 const before=new Date(Date.UTC(key[0],key[1]-1,key[2])-86400000).toISOString().slice(0,10);
 for(const interval of [original,lifetime]){
  assert.equal(temporalContains(interval,before),false);
  assert.equal(temporalContains(interval,instant),true);
  assert.equal(temporalContains(interval,'2026-10-26'),true);assertions+=3;
 }
 rows.push({id:e.id,projectId,date:e.date,file:entry.file,sha256:entry.sha256,firstGeometryCoverage:entry.coverage[0]||null});
}
const soviet=index.entities.find(x=>x.entityId==='state:soviet-union');
assert.equal(soviet.sha256,baseline.soviet.entry.sha256,'Approved Soviet packet must remain byte-identical');
const manifestPath=path.resolve('assets/data/prepared-polygons/generated/v2/manifest.json');
const manifest=read(manifestPath),meshIdentity=hash(JSON.stringify(manifest.meshes));
for(const packet of packets.values())for(const {geojson:g} of packet.geometries){
 const digest=hash(JSON.stringify([g.type,g.coordinates]));
 assert.ok(manifest.meshes[digest],`Selected geometry already needs a missing mesh: ${digest}`);
}
// Geometry bytes and the mesh algorithm are unchanged. Refresh only the exact
// changed metadata inputs, keeping all 384 existing mesh records and binaries.
for(const entry of changed){
 const old='assets/data/builtin-world/generated/v1/'+oldEntries.get(entry.entityId).file;
 const next='assets/data/builtin-world/generated/v1/'+entry.file;
 assert.ok(Object.hasOwn(manifest.inputHashes,old));delete manifest.inputHashes[old];
 manifest.inputHashes[next]=entry.sha256;
}
for(const e of sourceIndex.entities.filter(e=>selectedIds.has(e.entityId))){
 const file='assets/data/territorial-entities/generated/v2/'+e.file;
 assert.ok(Object.hasOwn(manifest.inputHashes,file));manifest.inputHashes[file]=e.sha256;
}
manifest.inputHashes['assets/data/builtin-world/generated/v1/index.json']=hash(fs.readFileSync('assets/data/builtin-world/generated/v1/index.json'));
assert.equal(hash(JSON.stringify(manifest.meshes)),meshIdentity);
if(process.argv.includes('--refresh-metadata'))withLibraryOutputs({root,paths:[manifestPath]},()=>fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n'));
else assert.deepEqual(read(manifestPath),manifest,'Prepared input metadata must already be refreshed');
const result={selectedRecords:25,changedWorldPackets:changed.length,worldTemporalAssertions:assertions,
 selectedTransportRangesEqual:true,sovietPacketUnchanged:true,sovietGeometryRefs:baseline.soviet.geometryRefs,
 existingMeshesReused:Object.keys(manifest.meshes).length,newMeshBinaries:0,meshMetadataSha256:hash(fs.readFileSync(manifestPath)),rows,checkedAt:new Date().toISOString()};
fs.writeFileSync(path.join(dir,'held-52-world-verification.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({...result,rows:undefined,sovietGeometryRefs:undefined}));
