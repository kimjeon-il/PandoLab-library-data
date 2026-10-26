import {pathToFileURL} from 'node:url';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const {chromium,expect}=await import(pathToFileURL(process.cwd()+'/node_modules/@playwright/test/index.mjs'));
const scope=new URL('.',import.meta.url);
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--use-angle=d3d11']});
const context=await browser.newContext({viewport:{width:1100,height:760},deviceScaleFactor:1});
const page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));
let holdTiles=false,releaseTiles;
const tileGate=new Promise(resolve=>{releaseTiles=resolve;});
const heldTiles=[];
await context.route('**/terrain/v*/**/*.webp*',async route=>{
 const match=new URL(route.request().url()).pathname.match(/\/(\d+)\/\d+-\d+\.webp$/);
 if(holdTiles&&match&&Number(match[1])>1){heldTiles.push(route.request().url());await tileGate;}
 if(!page.isClosed())await route.continue();
});
await page.addInitScript(()=>{
 localStorage.setItem('pandolab-user-preferences',JSON.stringify({version:2,backgrounds:{viewer:{terrainVisible:true,terrainStyle:'physical'}}}));
 window.__holdCountryMesh=true;window.__countryMeshGate=new Promise(resolve=>{window.__releaseCountryMesh=resolve;});
 window.__probeFrames=[];window.__pixelFrames=[];window.__probeTag='startup';window.__probeCapture=0;
 const flush=WebGL2RenderingContext.prototype.flush;
 WebGL2RenderingContext.prototype.flush=function(...args){
  const result=flush.apply(this,args);
  if(window.__probeCapture>0&&window.__PANDOLAB_MAP_HOST__){
   window.__probeCapture--;const rect=this.canvas.getBoundingClientRect(),points=[];
   for(const [name,coord] of [['Turkey',[32,39]],['BlackSea',[34,43]],['Mediterranean',[20,35]]]){
    const xy=window.__PANDOLAB_MAP_HOST__.project(coord);if(!xy)continue;
    const x=Math.floor(xy[0]*this.canvas.width/rect.width),y=this.canvas.height-Math.floor(xy[1]*this.canvas.height/rect.height)-1;
    if(x<0||y<0||x>=this.canvas.width||y>=this.canvas.height)continue;
    const rgba=new Uint8Array(4);this.readPixels(x,y,1,1,this.RGBA,this.UNSIGNED_BYTE,rgba);points.push({name,rgba:[...rgba]});
   }
   window.__pixelFrames.push({tag:window.__probeTag,points});
  }return result;
 };
});
await page.route('**/modules/gpu-map-renderer.js*',async route=>{
 const response=await route.fetch();let source=await response.text();
 const countryAnchor="      const nextDependencies = { source: 'country-mesh',";
 assert.equal(source.split(countryAnchor).length,2);
 source=source.replace(countryAnchor,'      if(window.__holdCountryMesh){window.__countryGateReached=true;await window.__countryMeshGate;}\n'+countryAnchor);
 const anchor='      const result = drawGpuBaseScene({ gl, frame: activeFrameContext,';
 assert.equal(source.split(anchor).length,2);
 source=source.replace(anchor,'      window.__startupTerrainTrace={published:countriesPublishedGeneration,generation:projectGeneration,readiness:currentTerrainReadiness(),tiles:preparedTerrain.map(tile=>({key:tile.spec.key,level:tile.spec.level}))};\n'+anchor);
 if(process.env.PROBE_UNGATED==='1')source=source.replace('&& (countriesPublishedGeneration === projectGeneration || currentTerrainReadiness().terrainReady)','');
 await route.fulfill({response,body:source});
});
await page.route('**/modules/gpu-base-scene-pass.js*',async route=>{
 const response=await route.fetch(),source=await response.text(),anchor='export function drawGpuBaseScene(input, passes) {';
 assert.equal(source.split(anchor).length,2);
 await route.fulfill({response,body:source.replace(anchor,anchor+'\n window.__probeFrames.push({tag:window.__probeTag,terrainVisible:input.terrainVisible,scale:input.frame.cssScale,quality:input.surfacePresentation.quality,land:input.prepared.physicalLandItems.map(({packet})=>packet.key),...window.__startupTerrainTrace});if(window.__probeFrames.length>100)window.__probeFrames.shift();\n')});
});
const snapshot=async tag=>{
 await page.evaluate(tag=>{window.__probeTag=tag;window.__probeCapture=3;window.__PANDOLAB_MAP_HOST__.requestRepaint('startup-probe');},tag);
 await page.waitForTimeout(600);
 return page.evaluate(()=>({tag:window.__probeTag,frame:window.__probeFrames.at(-1),pixels:window.__pixelFrames.filter(x=>x.tag===window.__probeTag).at(-1),countryGateReached:!!window.__countryGateReached}));
};
const setZoom=async zoom=>page.evaluate(zoom=>{
 const host=window.__PANDOLAB_MAP_HOST__;host.setViewState({projection:'globe',view:{flatCenter:[30,40],flatZoom:1,globeRotation:[-30,-40,0],globeZoom:zoom}});host.requestRepaint('startup-probe-zoom');
},zoom);
const cases=[];
try{
 await page.goto('https://kimjeon-il.github.io/Pando/?renderer=webgl2&debug=1',{waitUntil:'domcontentloaded'});
 console.log('startup navigated');
 await expect.poll(()=>page.evaluate(()=>!!window.__PANDOLAB_MAP_HOST__&&!!window.__startupTerrainTrace),{timeout:120000}).toBe(true);
 console.log('startup background drawing');
 await setZoom(1);
 await expect.poll(()=>page.evaluate(()=>window.__startupTerrainTrace?.readiness.terrainReady),{timeout:120000}).toBe(true);
 cases.push(await snapshot('before-objects-low'));
 console.log('low baseline ready');
 holdTiles=true;
 await setZoom(3);
 await expect.poll(()=>page.evaluate(()=>window.__startupTerrainTrace?.readiness.terrainLevel),{timeout:30000}).toBeGreaterThan(1);
 cases.push(await snapshot('before-objects-high'));
 await page.screenshot({path:new URL('startup-before-objects-high'+(process.env.PROBE_UNGATED?'ungated':'')+'.png',scope).pathname.slice(1)});
 await setZoom(1);cases.push(await snapshot('before-objects-low-again'));
 await page.evaluate(()=>{window.__holdCountryMesh=false;window.__releaseCountryMesh();});
 await expect.poll(()=>page.evaluate(()=>{const s=window.__PANDOLAB_VIEWER__.rendererStats();return s.countriesPublishedGeneration===s.projectGeneration;}),{timeout:120000}).toBe(true);
 await page.locator('#objectsVisible').evaluate(e=>{if(e.checked)e.click();});
 await setZoom(3);cases.push(await snapshot('after-objects-high'));
 await page.screenshot({path:new URL('startup-after-objects-high'+(process.env.PROBE_UNGATED?'ungated':'')+'.png',scope).pathname.slice(1)});
 const out={ungated:process.env.PROBE_UNGATED==='1',sourceCommit:await page.evaluate(()=>window.PANDOLAB_BUILD_META?.sourceCommit),cases,heldTiles,errors,at:new Date().toISOString()};
 writeFileSync(new URL('startup-zoom-result'+(process.env.PROBE_UNGATED?'-ungated':'')+'.json',scope),JSON.stringify(out,null,2)+'\n');
 console.log(JSON.stringify(out));
}finally{releaseTiles();await browser.close();}
