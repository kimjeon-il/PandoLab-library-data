import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {parseTemporal} from '../assets/js/modules/temporal.js';
import {territorialEntityExistsAt} from '../assets/js/modules/territorial-library.js';

const root=new URL('../',import.meta.url);
const read=path=>JSON.parse(readFileSync(new URL(path,root)));
const research=JSON.parse(readFileSync(process.argv[2]));
const selected=research.targets.filter(row=>row.status==='applied');
assert.equal(selected.length,66);
const sourceIndex=read('assets/data/territorial-entities/generated/v2/index.json');
const worldRoot='assets/data/builtin-world/generated/v1/';
const worldIndex=read(worldRoot+'index.json');
let assertions=0;
for(const row of selected){
  const source=read('assets/data/territorial-entities/source/countries/'+row.id.replace(':','-')+'.json');
  assert.equal(source.lifetime.validFrom,row.date,row.id); assertions++;
  const entry=sourceIndex.entities.find(value=>value.entityId===row.id);
  assert.equal(entry.lifetime.validFrom,row.date,row.id); assertions++;
  const identity=worldIndex.sourceIdentities.find(value=>value.sourceEntityIds.includes(row.id));
  assert.ok(identity,'Missing scoped source binding '+row.id);
  const worldId=identity.projectEntityId;
  const worldEntry=worldIndex.entities.find(value=>value.entityId===worldId);
  assert.ok(worldEntry,'Missing scoped world country '+row.id);
  const world=JSON.parse(gunzipSync(readFileSync(new URL(worldRoot+worldEntry.file,root))));
  assert.equal(world.timelineRecords.lifetimes.find(value=>value.entityId===worldId).validFrom,row.date,row.id); assertions++;
  const [year,month,day]=parseTemporal(row.date).startKey;
  const before=new Date(Date.UTC(year,month-1,day-1)).toISOString().slice(0,10);
  assert.equal(territorialEntityExistsAt(source,before),false,row.id+' before'); assertions++;
  assert.equal(territorialEntityExistsAt(source,row.date),true,row.id+' at'); assertions++;
  assert.equal(territorialEntityExistsAt(source,'2026-10-25'),true,row.id+' current'); assertions++;
}
console.log(JSON.stringify({scope:'approved applied records only',records:selected.length,assertions,pin:read('config/library-data.json').revision}));
