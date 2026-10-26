import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const root=process.cwd(),dir=path.dirname(fileURLToPath(import.meta.url));
const {chromium,expect}=await import(pathToFileURL(path.join(root,'node_modules/@playwright/test/index.mjs')).href);
const browser=await chromium.launch({headless:true,args:process.platform==='win32'?['--use-angle=d3d11']:[]});
const publicMode=process.argv.includes('--public');
const base=publicMode?'https://kimjeon-il.github.io/Pando/':'http://127.0.0.1:4173/';
const errors=[];
try{
 const viewer=await browser.newPage({viewport:{width:1440,height:900}});
 viewer.on('pageerror',e=>errors.push(e.message));
 const requests=new Set();viewer.on('request',r=>{if(r.url().includes('/library-releases/'))requests.add(r.url());});
 await viewer.goto(base+'?debug=1');
 await expect(viewer.locator('#viewerStatus')).toHaveAttribute('data-ready','true',{timeout:120000});
 const initial=await viewer.evaluate(()=>({title:document.title,
  hun:window.__PANDOLAB_VIEWER__.documentSnapshot().territorialEntities.find(x=>x.id==='HUN')?.properties.metadata.historicalTimeline.lifetime}));
 assert.deepEqual(initial.hun,{validFrom:'1000',validTo:null});
 const setMonth=async month=>{
  await viewer.locator('#timelineMonthButton').click();
  const [year,m]=month.split('-');await viewer.locator('#timelineYearInput').fill(year);
  await viewer.locator('#timelineMonthInput').selectOption(String(Number(m)));
  await viewer.locator('#timelineGoBtn').click();
  await expect(viewer.locator('#timelinePopover')).toBeHidden({timeout:120000});
  await expect(viewer.locator('#viewerStatus')).toHaveAttribute('data-ready','true',{timeout:120000});
  await expect.poll(()=>viewer.evaluate(()=>window.__PANDOLAB_VIEWER__.documentState().timelineCursor),{timeout:45000}).toBe(month);
 };
 const faroe='d34b00a1-9b13-8000-8000-00000046524f';
 if(!publicMode){
 await setMonth('1948-03');
 assert.equal(await viewer.evaluate(id=>window.__PANDOLAB_VIEWER__.documentSnapshot().territorialEntities.some(x=>x.id===id),faroe),false);
 await setMonth('1948-04');
 assert.equal(await viewer.evaluate(id=>window.__PANDOLAB_VIEWER__.documentSnapshot().territorialEntities.some(x=>x.id===id),faroe),true);
 }
 await setMonth('1922-12');
 const sovietRef=await viewer.evaluate(()=>window.__PANDOLAB_VIEWER__.documentSnapshot().timelineRecords.geometryBindings.find(x=>x.entityId==='state:soviet-union')?.geometryRef?.id);
 assert.equal(sovietRef,'historical-world:21db5bdce7286e2190f76e732cc1463f9202bd65c801ac8bf62cad7e2755c1ec');
 await expect.poll(()=>viewer.evaluate(()=>{
  const s=window.__PANDOLAB_VIEWER__.rendererStats();
  return !!s.canonicalMeshReady&&!s.projectRenderBlocked&&s.projectGeneration>0&&s.countriesPublishedGeneration===s.projectGeneration;
 }),{timeout:120000,message:'Wait for the actual country frame, not only dataset readiness'}).toBe(true);
 const rendered=await viewer.evaluate(()=>{const s=window.__PANDOLAB_VIEWER__.rendererStats();return{canonicalMeshReady:s.canonicalMeshReady,projectRenderBlocked:s.projectRenderBlocked,projectGeneration:s.projectGeneration,countriesPublishedGeneration:s.countriesPublishedGeneration,mapReadiness:s.mapReadiness};});
 await viewer.screenshot({path:path.join(dir,publicMode?'held-52-public-soviet-1922.png':'held-52-web-soviet-1922.png')});
 console.log(JSON.stringify({viewer:initial,faroeBoundaryPassed:true,sovietRef}));
 if(publicMode){
  const pointer=await(await fetch(base+'assets/data/library-channel/current.json',{cache:'no-store'})).json();
  assert.equal(pointer.revision,'dddc4aad6278c1e40eecb3f1188b55cfcaea630afb47127374c8db9ead5471dd');
  const releaseUrl=base+'assets/data/library-releases/'+pointer.revision+'/manifest.json';
  const raw=Buffer.from(await(await fetch(releaseUrl,{cache:'no-store'})).arrayBuffer());
  assert.equal(createHash('sha256').update(raw).digest('hex'),pointer.manifestSha256);
  const release=JSON.parse(raw);assert.equal(release.sourceRevision,'68380579a7c7a1bd8ec97683b7517502c1389c3c');
  const url=new URL(release.assets.builtinWorld.url,base),index=await(await fetch(url)).json();
  const sourceToProject=new Map(index.sourceIdentities.flatMap(e=>e.sourceEntityIds.map(id=>[id,e.projectEntityId])));
  const entries=JSON.parse(fs.readFileSync(path.join(dir,'held-52-followup.json'))).entries;
  const checked=await Promise.all(entries.map(async e=>{
   const row=index.entities.find(x=>x.entityId===sourceToProject.get(e.id));
   const data=Buffer.from(await(await fetch(new URL(row.file,url))).arrayBuffer());
   assert.equal(createHash('sha256').update(data).digest('hex'),row.sha256);
   assert.deepEqual(JSON.parse(gunzipSync(data)).identity.properties.metadata.historicalTimeline.lifetime,{validFrom:e.date,validTo:null});
   return{id:e.id,date:e.date,sha256:row.sha256};
  }));
  assert.ok([...requests].some(u=>u.includes(pointer.revision)));assert.deepEqual(errors,[]);
  const result={url:base,pointer,sourceRevision:release.sourceRevision,selectedRecords:checked.length,checked,
   viewerMonth:'1922-12',sovietRef,newReleaseRequestedByBrowser:true,observedReleaseRequests:requests.size,
   rendered,screenshot:'held-52-public-soviet-1922.png',errors,checkedAt:new Date().toISOString()};
  fs.writeFileSync(path.join(dir,'held-52-public-verification.json'),JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify({...result,checked:undefined}));
 }else{
 const editor=await browser.newPage({viewport:{width:1440,height:900}});
 editor.on('pageerror',e=>errors.push(e.message));
 await editor.goto('http://127.0.0.1:4175/?debug=1');
 await expect(editor.locator('#app')).toHaveAttribute('data-readiness','enhanced',{timeout:120000});
 await editor.locator('#createMenuBtn').click();
 await editor.locator('#addFromLibraryBtn').click();
 await expect(editor.locator('#territorialLibraryModal')).toBeVisible();
 await editor.locator('#territorialLibrarySearchInput').fill('헝가리');
 await expect(editor.locator('[data-library-entity-id="state:HUN"]')).toContainText('1000–현재');
 await editor.locator('#territorialLibrarySearchInput').fill('페로');
 const row=editor.locator('[data-library-entity-id="state:FRO"]');
 await expect(row).toContainText('1948–현재');await row.click();
 await editor.locator('#territorialLibraryReferenceDateInput').fill('1948-03-31');
 await expect(row).toContainText('기록된 존속 기간 밖');
 await expect(editor.locator('#territorialLibraryAddBtn')).toBeDisabled();
 await editor.locator('#territorialLibraryReferenceDateInput').fill('1948-04-01');
 await expect(row).not.toContainText('기록된 존속 기간 밖');
 await expect(editor.locator('#territorialLibraryAddBtn')).toBeEnabled({timeout:45000});
 await editor.screenshot({path:path.join(dir,'held-52-app-faroe.png')});
 assert.deepEqual(errors,[]);
 const result={viewer:{hungary:initial.hun,faroeBeforeMonthAbsent:true,faroeStartMonthPresent:true,sovietMonth:'1922-12',sovietRef,screenshot:'held-52-web-soviet-1922.png'},
  appWebShell:{hungaryDisplay:'1000–현재',faroeDisplay:'1948–현재',before:'1948-03-31',beforeAddDisabled:true,at:'1948-04-01',atAddEnabled:true,screenshot:'held-52-app-faroe.png'},
  errors,nativeExecutableRebuilt:false,nativeDeviceTested:false,checkedAt:new Date().toISOString()};
 fs.writeFileSync(path.join(dir,'held-52-browser-verification.json'),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify(result));
 }
}finally{await browser.close();}
