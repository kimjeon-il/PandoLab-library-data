import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const root=process.cwd(),source=readFileSync(root+'/shared/frontend/js/modules/gpu-terrain-preparation.js','utf8').replaceAll('\r\n','\n');
const current=(await import(pathToFileURL(root+'/shared/frontend/js/modules/gpu-terrain-preparation.js'))).createGpuTerrainPreparation;
const modified=source.replace('missingSpecs.length && cssScale <= MAP_SURFACE_LOW_SCALE','missingSpecs.length').replace('const drawSpecs = cssScale > MAP_SURFACE_LOW_SCALE && (missingSpecs.length || !tintReady)\n        ? [] : [...fallbackSpecs, ...targetSpecs];','const drawSpecs = [...fallbackSpecs, ...targetSpecs];').replaceAll("from './", "from '"+pathToFileURL(root+'/shared/frontend/js/modules/').href);
assert.notEqual(source,modified);
const experiment=(await import('data:text/javascript;base64,'+Buffer.from(modified).toString('base64'))).createGpuTerrainPreparation;
async function run(factory){
 const oldFetch=globalThis.fetch,oldBitmap=globalThis.createImageBitmap,requests=[],jobs=[];
 const settle=async()=>{for(let i=0;i<20;i++)await Promise.resolve();};
 const gl={createTexture:()=>({}),createBuffer:()=>({})};for(const key of ['deleteTexture','bindTexture','pixelStorei','texParameteri','texImage2D','bindBuffer','bufferData','deleteBuffer'])gl[key]=()=>{};
 globalThis.fetch=(url,{signal})=>new Promise((resolve,reject)=>{requests.push({url,resolve});signal.addEventListener('abort',()=>reject(Object.assign(new Error('abort'),{name:'AbortError'})),{once:true});});
 globalThis.createImageBitmap=async blob=>({...blob,close(){}});
 const owner=factory({tileUrl:s=>'http://fixture/'+s.key,isMobile:()=>false,invalidate:()=>{},geoDistance:()=>0});
 owner.setContext({gl,ready:true,projectGeneration:1,contextGeneration:1,scheduler:{enqueueUpload:j=>{jobs.push(j);return Promise.resolve();}}});
 owner.setManifest({representation:'raster-rgba-v1',gutter:0,levels:[{id:0,width:1024,height:512,columns:1,rows:1,tileSize:1024},{id:1,width:2048,height:1024,columns:2,rows:1,tileSize:1024}]});
 const frame=scale=>({mode:1,scale,dpr:1,viewport:[800,600],viewState:{projection:'flat',projectionCenter:[0,0]}});
 const view={visible:true,physicalStyle:'political',projection:'flat',flatCenter:[0,0],width:800,height:600,devicePixelRatio:1,cacheBudgetBytes:128*1024*1024};
 const resolveRequest=async req=>{req.resolve({ok:true,blob:async()=>({width:1024,height:req.url.includes('/0/')?512:1024})});await settle();for(const job of jobs.splice(0))while(!job.step().done){}await settle();};
 try{
  owner.prepare(frame(100),view);await settle();await resolveRequest(requests[0]);
  const low=owner.prepare(frame(100),view);const pending=owner.prepare(frame(600),view);
  const high=requests.filter(r=>r.url.includes('/1/'));assert.equal(high.length,2);
  await resolveRequest(high[0]);const partial=owner.prepare(frame(600),view);const partialStats=owner.stats();
  await resolveRequest(high[1]);const complete=owner.prepare(frame(600),view);
  return{lowTiles:low.length,pendingTiles:pending.length,partialTiles:partial.length,partialLoaded:partialStats.terrainTargetTilesLoaded,targetTiles:partialStats.terrainTargetTileCount,completeTiles:complete.length,completeReady:owner.stats().terrainReady};
 }finally{owner.dispose();await settle();globalThis.fetch=oldFetch;if(oldBitmap)globalThis.createImageBitmap=oldBitmap;else delete globalThis.createImageBitmap;}
}
const baseline=await run(current),inMemoryExperiment=await run(experiment);
assert.equal(baseline.lowTiles,1);assert.equal(baseline.pendingTiles,0);assert.equal(baseline.partialTiles,0);assert.equal(baseline.completeTiles,2);
assert.ok(inMemoryExperiment.pendingTiles>0);assert.ok(inMemoryExperiment.partialTiles>0);
const result={baseline,inMemoryExperiment,productionFilesModified:false};writeFileSync(new URL('atomic-terrain-result.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
