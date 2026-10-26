import {pathToFileURL} from 'node:url';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const {chromium,expect}=await import(pathToFileURL(process.cwd()+'/node_modules/@playwright/test/index.mjs'));
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--use-angle=d3d11']});
const results=[];
try{for(const correctedPort of [false,true]){
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/modules/viewer-map.js*',async route=>{
  const response=await route.fetch(),source=await response.text(),anchor='  objectPicking.connect({projectState:{state},objectModelB:objectPresentation,';
  assert.ok(source.includes(anchor));
  const injected='  window.__hoverProbe={passed:objectPresentation,canonicalScope:territorialScope,picking:objectPicking,phase:()=>state.countryVisualPhase};\n';
  const wired=correctedPort?anchor.replace('objectModelB:objectPresentation','objectModelB:{territorialScope}'):anchor;
  await route.fulfill({response,body:source.replace(anchor,injected+wired)});
 });
 await page.goto('https://kimjeon-il.github.io/Pando/?debug=1');
 await expect(page.locator('#viewerStatus')).toHaveAttribute('data-ready','true',{timeout:120000});
 await expect.poll(()=>page.evaluate(()=>window.__hoverProbe?.phase()),{timeout:120000}).not.toBe('pending');
 const before=await page.evaluate(()=>({passedScope:typeof window.__hoverProbe.passed.territorialScope,canonicalDisplayFeature:typeof window.__hoverProbe.canonicalScope.displayFeature,phase:window.__hoverProbe.phase()}));
 const point=await page.evaluate(()=>window.__PANDOLAB_MAP_HOST__.project([32,39]));const box=await page.locator('#map').boundingBox();
 await page.mouse.move(box.x+point[0],box.y+point[1]);await page.waitForTimeout(1200);
 const direct=await page.evaluate(point=>{try{return {refs:window.__hoverProbe.picking.territorialObjectsAt(point,[32,39]).map(row=>row.ref)}}catch(e){return{error:e.message,stack:e.stack}};},point);
 const result={correctedPort,before,direct,errors};results.push(result);console.log(JSON.stringify(result));await page.close();
 }}finally{await browser.close();}
assert.match(results[0].direct.error,/displayFeature/);assert.equal(results[1].direct.error,undefined);assert.ok(results[1].direct.refs.length>0);
const result={productionFilesModified:false,results};writeFileSync(new URL('hover-result.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
