import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import {resolvePublicDataChannel} from '../../../assets/js/modules/publication-data-channel.js';
import {libraryCheckout,libraryConfig} from '../../../tools/library-data.mjs';
const scratch=path.resolve('.superpowers/sdd/exact-calculation-optimization');
const revision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const url='https://kimjeon-il.github.io/Pando/';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const blob=file=>execFileSync('git',['show',`HEAD:${file}`],{maxBuffer:12*1024*1024});
const expectedMeta=JSON.parse(blob('assets/js/build-meta.js').toString().match(/Object\.freeze\(([\s\S]*)\);\s*$/)[1]);
const pointerFile='assets/data/library-channel/current.json';
const pointerExpected=execFileSync('git',['-C',libraryCheckout(),'show',`${libraryConfig().revision}:${pointerFile}`]);
const pointerResponse=await fetch(new URL(pointerFile,url),{cache:'no-store'}),pointerBytes=Buffer.from(await pointerResponse.arrayBuffer());
assert.equal(pointerResponse.status,200);assert.equal(hash(pointerBytes),hash(pointerExpected),'independently published pointer matches the data pin');
const pointer=JSON.parse(pointerBytes);
const channel=await resolvePublicDataChannel({baseUrl:url,buildMeta:expectedMeta,cacheStorage:null,
  expectedRevision:pointer.revision,expectedManifestSha256:pointer.manifestSha256});
const assets=[];
for(const file of ['index.html','assets/js/build-meta.js','assets/wasm/pandoeditor-core.js','assets/wasm/pandoeditor-core.wasm','assets/wasm/pandoeditor-core.manifest.json']) {
  const expected=blob(file),target=new URL(file,url);target.searchParams.set('proof',revision);
  const response=await fetch(target,{cache:'no-store'}),bytes=Buffer.from(await response.arrayBuffer());
  const row={file,status:response.status,bytes:bytes.length,expectedSha256:hash(expected),observedSha256:hash(bytes)};assets.push(row);
  fs.writeFileSync(path.join(scratch,'live-http-proof.json'),JSON.stringify(assets,null,2)+'\n');
  assert.equal(response.status,200,file);assert.equal(row.observedSha256,row.expectedSha256,file+' committed bytes');
}
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--use-angle=d3d11']});
try {
  const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage();
  const errors=[],consoleErrors=[];page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')consoleErrors.push(message.text());});
  const target=new URL(url);target.searchParams.set('debug','1');target.searchParams.set('proof',revision);
  await page.goto(target.href,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForFunction(()=>document.querySelector('#viewerStatus')?.getAttribute('data-ready')==='true',null,{timeout:120000});
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  const state=await page.evaluate(()=>({buildId:window.PANDOLAB_BUILD_META.buildId,dataRevision:window.PANDOLAB_BUILD_META.dataRevision,
    ready:document.querySelector('#viewerStatus').getAttribute('data-ready'),month:document.querySelector('#timelineMonthButtonText').textContent,
    entities:window.__PANDOLAB_VIEWER__.documentSnapshot().territorialEntities.length}));
  assert.equal(state.buildId,expectedMeta.buildId);assert.equal(state.dataRevision,channel.meta.dataRevision);assert.ok(state.entities>200);
  assert.deepEqual(errors,[],'live page errors');
  await page.screenshot({path:path.join(scratch,'live-viewer.png')});
  const release={schema:'pando-exact-calculation-release-v1',revision,url,workflowUrl:'https://github.com/kimjeon-il/Pando/actions/runs/39945738101',
    verifiedAt:new Date().toISOString(),assets,state,publicChannel:{pointer,sourceRevision:channel.sourceRevision,status:channel.status},pageErrors:errors,consoleErrors};
  fs.writeFileSync(path.join(scratch,'release.json'),JSON.stringify(release,null,2)+'\n');
  console.log(JSON.stringify(release,null,2));
}finally{await browser.close();}
