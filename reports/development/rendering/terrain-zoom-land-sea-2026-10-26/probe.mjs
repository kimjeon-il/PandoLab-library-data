import {pathToFileURL} from 'node:url';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const scope=new URL('.',import.meta.url),root=process.cwd();
const {chromium,expect}=await import(pathToFileURL(root+'/node_modules/@playwright/test/index.mjs'));
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--use-angle=d3d11']});
const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[],responses=[];
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(/terrain|physical-land/.test(r.url()))responses.push({url:r.url(),status:r.status()});});
await page.addInitScript(()=>{
 localStorage.setItem('pandolab-user-preferences',JSON.stringify({version:2,backgrounds:{viewer:{terrainVisible:true,terrainStyle:'physical'}}}));
 window.__landFrames=[];window.__pixelFrames=[];window.__probeTag='startup';window.__probeCapture=0;
 const base=WebGL2RenderingContext.prototype.flush;
 WebGL2RenderingContext.prototype.flush=function(...args){
  const result=base.apply(this,args);
  if(window.__probeCapture>0&&window.__PANDOLAB_MAP_HOST__){
   window.__probeCapture--;const rect=this.canvas.getBoundingClientRect(),points=[];
   for(const [name,coord] of [['Turkey',[32,39]],['BlackSea',[34,43]],['Caspian',[51,42]],['Mediterranean',[18,35]],['Italy',[12,42]],['Arabia',[45,25]]]){
    const xy=window.__PANDOLAB_MAP_HOST__.project(coord);if(!xy)continue;
    const x=Math.floor(xy[0]*this.canvas.width/rect.width),y=this.canvas.height-Math.floor(xy[1]*this.canvas.height/rect.height)-1;
    if(x<0||y<0||x>=this.canvas.width||y>=this.canvas.height)continue;
    const rgba=new Uint8Array(4);this.readPixels(x,y,1,1,this.RGBA,this.UNSIGNED_BYTE,rgba);points.push({name,rgba:[...rgba]});
   }
   window.__pixelFrames.push({tag:window.__probeTag,points});
  }
  return result;
 };
});
await page.route('**/modules/gpu-base-scene-pass.js*',async route=>{
 const response=await route.fetch(),source=await response.text(),anchor='export function drawGpuBaseScene(input, passes) {';
 assert.ok(source.includes(anchor));
 const probe='\n const trace={tag:window.__probeTag,terrainVisible:input.terrainVisible,terrainStyle:input.terrainStyle,quality:input.surfacePresentation,scale:input.frame.cssScale,frameId:input.frame.frameId,land:input.prepared.physicalLandItems.map(({packet})=>({key:packet.key,sourceKey:packet.sourceKey,positions:packet.positions?.length,indices:packet.indices?.length,style:packet.style})),deferred:[...input.prepared.deferredOverlayKeys],failed:[...input.prepared.failedOverlayKeys]};window.__landFrames.push(trace);if(window.__landFrames.length>100)window.__landFrames.shift();\n';
 await route.fulfill({response,body:source.replace(anchor,anchor+probe)});
});
try{
 await page.goto('https://kimjeon-il.github.io/Pando/?debug=1');
 await expect(page.locator('#viewerStatus')).toHaveAttribute('data-ready','true',{timeout:120000});
 await expect.poll(()=>page.evaluate(()=>window.__PANDOLAB_VIEWER__.rendererStats().canonicalMeshReady),{timeout:120000}).toBe(true);
 await page.locator('#objectsVisible').evaluate(e=>{if(e.checked)e.click();});
 const cases=[];
 for(const zoom of [1,1.4,1.8,2.2,3,4,1.4,1]){
  await page.evaluate(zoom=>{
   window.__probeTag='zoom-'+zoom;window.__probeCapture=3;
   const old=window.__PANDOLAB_MAP_HOST__.getViewState();const view={flatCenter:old.flatCenter,flatZoom:old.flatZoom,globeRotation:[-35,-40,0],globeZoom:zoom};
   window.__PANDOLAB_MAP_HOST__.setViewState({projection:'globe',view});window.__PANDOLAB_MAP_HOST__.requestRepaint('terrain-diagnostic');
  },zoom);
  await page.waitForTimeout(2500);
  const result=await page.evaluate(()=>({tag:window.__probeTag,metrics:Object.fromEntries(Object.entries(window.__PANDOLAB_VIEWER__.rendererStats()).filter(([k])=>/terrain|surface|meshQuality|activeMesh|projectRender|countriesPublished|projectGeneration|framebuffer|stencil/i.test(k))),land:window.__landFrames.slice(-3),pixels:window.__pixelFrames.filter(x=>x.tag===window.__probeTag).slice(-2)}));
  cases.push({zoom,...result});console.log(JSON.stringify({zoom,metrics:result.metrics,land:result.land.at(-1),pixels:result.pixels.at(-1)}));
  if([1,2.2,4].includes(zoom))await page.screenshot({path:new URL('zoom-'+zoom+'.png',scope).pathname.slice(1)});
 }
 const out={sourceCommit:await page.evaluate(()=>PANDOLAB_BUILD_META.sourceCommit),cases,errors,responses,at:new Date().toISOString()};
 writeFileSync(new URL('zoom-probe.json',scope),JSON.stringify(out,null,2)+'\n');
}finally{await browser.close();}
