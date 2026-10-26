import {pathToFileURL} from 'node:url';
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const {chromium,expect}=await import(pathToFileURL(process.cwd()+'/node_modules/@playwright/test/index.mjs'));
const scope=new URL('.',import.meta.url);
const origin='http://127.0.0.1:4173';
const health=await (await fetch(origin+'/__shell/health')).json();
assert.equal(health.root.replaceAll('\\','/').toLowerCase(),process.cwd().replaceAll('\\','/').toLowerCase());
assert.equal(health.product,'viewer');assert.equal(health.error,null);
const replace=(source,anchor,value)=>{assert.equal(source.split(anchor).length,2,anchor);return source.replace(anchor,value);};
function variant(source,name){
 if(name==='current')return source;
 if(name==='c'){
  let mixed=variant(source,'b');
  mixed=replace(mixed,'-riseEast * 2.0, -riseNorth * 2.0','-riseEast * 1.6, -riseNorth * 1.6');
  mixed=mixed.replaceAll('0.27 + 0.73','0.32 + 0.68');
  mixed=replace(mixed,'illumination = 0.55','illumination = 0.70');
  mixed=replace(mixed,'+ 0.20 * max','+ 0.12 * max');
  mixed=replace(mixed,'+ 0.15 * max','+ 0.10 * max');
  mixed=replace(mixed,'+ 0.10 * max(0.0, dot(normal, vec3(-0.5','+ 0.08 * max(0.0, dot(normal, vec3(-0.5');
  mixed=replace(mixed,'mix(0.58, 0.88,','mix(0.68, 0.87,');
  mixed=replace(mixed,'mix(baseColor,heightColor,0.6)','mix(baseColor,heightColor,0.25)');
  mixed=mixed.replaceAll('0.38, 1.3','0.42, 1.25');
  return replace(mixed,'    return baseColor * clamp(shade / flatSurfaceShade, 0.42, 1.25);',
   '    baseColor = clamp((baseColor - vec3(0.5)) * 1.08 + vec3(0.5), 0.0, 1.0);\n    return baseColor * clamp(shade / flatSurfaceShade, 0.42, 1.25);');
 }
 if(name==='a'){
  source=replace(source,'    if (uPhysicalStyle < 0.5) return vec3(shade);',`    float neutralShade = 0.42 + 0.58 * 0.70710678;
    shade = clamp(neutralShade + (shade - neutralShade) * 2.0, 0.14, 1.0);
    if (uPhysicalStyle < 0.5) return vec3(shade);`);
  return replace(source,'    return baseColor * clamp(shade / flatSurfaceShade, 0.5, 1.2);',`    baseColor = clamp((baseColor - vec3(0.5)) * 1.22 + vec3(0.5), 0.0, 1.0);
    return baseColor * clamp(shade / flatSurfaceShade, 0.35, 1.3);`);
 }
 source=replace(source,'    vec3 normal = normalize(vec3(-riseEast, -riseNorth, 1.0));','    vec3 normal = normalize(vec3(-riseEast * 2.0, -riseNorth * 2.0, 1.0));');
 source=replace(source,'    return 0.42 + 0.58 * max(0.0, dot(normal, light));',`    float illumination = 0.55 * max(0.0, dot(normal, light))
      + 0.20 * max(0.0, dot(normal, vec3(-0.70710678, 0.0, 0.70710678)))
      + 0.15 * max(0.0, dot(normal, vec3(0.0, 0.70710678, 0.70710678)))
      + 0.10 * max(0.0, dot(normal, vec3(-0.5, -0.5, 0.70710678)));
    float neutralShade = 0.27 + 0.73 * 0.70710678;
    return clamp(neutralShade + ((0.27 + 0.73 * illumination) - neutralShade) * 1.3, 0.16, 1.0);`);
 source=replace(source,'    if (uPhysicalStyle < 0.5) return vec3(shade);',`    float height = max(0.0, elevation(encodedPixel));
    float neutralShade = 0.27 + 0.73 * 0.70710678;
    if (uPhysicalStyle < 0.5) {
      float tone = mix(0.58, 0.88, smoothstep(0.0, 6000.0, height));
      return vec3(tone * clamp(shade / neutralShade, 0.38, 1.3));
    }`);
 source=replace(source,'    float flatSurfaceShade = 0.42 + 0.58 * 0.70710678;',`    if (uLandPass > 0.5) {
      vec3 heightColor = mix(vec3(0.43,0.62,0.39), vec3(0.68,0.72,0.44), smoothstep(0.0,1000.0,height));
      heightColor = mix(heightColor,vec3(0.72,0.57,0.39),smoothstep(1000.0,2500.0,height));
      heightColor = mix(heightColor,vec3(0.72,0.68,0.62),smoothstep(2500.0,4500.0,height));
      heightColor = mix(heightColor,vec3(0.96,0.95,0.90),smoothstep(4500.0,6500.0,height));
      baseColor = mix(baseColor,heightColor,0.6);
    }
    float flatSurfaceShade = neutralShade;`);
 return replace(source,'    return baseColor * clamp(shade / flatSurfaceShade, 0.5, 1.2);','    return baseColor * clamp(shade / flatSurfaceShade, 0.38, 1.3);');
}
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--use-angle=d3d11']});
const results=[];
const selectedNames=(process.env.ONLY_VARIANTS || 'current,a,b,c').split(',');
try{
 for(const name of selectedNames){
  const context=await browser.newContext({viewport:{width:1000,height:760},deviceScaleFactor:1,colorScheme:'light'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',message=>{if(message.type()==='error' && /shader|compile|link.*program/i.test(message.text()))errors.push(message.text());});
  await page.addInitScript(()=>{
    localStorage.setItem('pandolab-user-preferences',JSON.stringify({version:2,backgrounds:{viewer:{terrainVisible:true,terrainStyle:'physical'}}}));
  });
  await page.route('**/modules/terrain-dem-shaders.js*',async route=>{
    const response=await route.fetch();await route.fulfill({response,body:variant(await response.text(),name)});
  });
  await page.goto(origin+'/?renderer=webgl2&debug=1',{waitUntil:'domcontentloaded'});
  await expect(page.locator('#viewerStatus')).toHaveAttribute('data-ready','true',{timeout:120000});
  await page.evaluate(()=>{
    for(const id of ['objectsVisible','riversVisible','lakesVisible','labelsVisible','graticuleVisible']){
      const input=document.getElementById(id);if(input?.checked)input.click();
    }
    const host=window.__PANDOLAB_MAP_HOST__;
    host.setViewState({projection:'globe',view:{flatCenter:[85,31],flatZoom:1,globeRotation:[-85,-31,0],globeZoom:5.5}});
    host.requestRepaint('terrain-style-preview');
  });
  const ready=()=>page.evaluate(()=>{
    const s=window.__PANDOLAB_VIEWER__.rendererStats();
    return s.renderer==='webgl2'&&s.terrainReady&&s.terrainTargetTilesLoaded===s.terrainTargetTileCount&&s.terrainDetailedShade;
  });
  await expect.poll(ready,{timeout:150000}).toBe(true);
  await page.addStyleTag({content:'body * {visibility:hidden!important} canvas.gpu-map-canvas {visibility:visible!important}'});
  for(const style of ['physical','political']){
    await page.locator(style==='physical'?'#terrainPhysicalRadio':'#terrainPoliticalRadio').evaluate(input=>input.click());
    await expect.poll(ready,{timeout:60000}).toBe(true);
    await page.evaluate(()=>window.__PANDOLAB_MAP_HOST__.requestRepaint('terrain-style-capture'));
    await page.waitForTimeout(600);
    const file=`${name}-${style}.png`;
    await page.locator('canvas.gpu-map-canvas').first().screenshot({path:new URL(file,scope).pathname.slice(1)});
    results.push({name,style,file,view:await page.evaluate(()=>window.__PANDOLAB_MAP_HOST__.getViewState()),stats:await page.evaluate(()=>{
      const s=window.__PANDOLAB_VIEWER__.rendererStats();return {renderer:s.renderer,terrainReady:s.terrainReady,level:s.terrainTargetLevel,tiles:s.terrainTargetTilesLoaded,count:s.terrainTargetTileCount,detailed:s.terrainDetailedShade};
    }),errors});
    console.log(name,style,JSON.stringify(results.at(-1).stats));
  }
  assert.deepEqual(errors,[]);await context.close();
 }
 const page=await browser.newPage({viewport:{width:1800,height:820},deviceScaleFactor:1});
 for(const [name,title,description] of [['a','01 · 대비 강화','현재 색감을 유지하면서 색·명암 차이를 확대'],['b','02 · 고도 구분 + 입체 음영','고도별 색·밝기 + 2배 경사 강조 + 여러 방향의 음영'],['c','03 · 혼합형','기존 색감 75% 유지 + 완만한 고도 구분 + 입체 음영']].filter(([name])=>selectedNames.includes(name))){
  const src=style=>'data:image/png;base64,'+readFileSync(new URL(`${name}-${style}.png`,scope)).toString('base64');
  await page.setContent(`<!doctype html><html lang="ko"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#f4f3ef;color:#24313c;font-family:'Malgun Gothic',sans-serif}.head{height:112px;padding:24px 32px;display:flex;justify-content:space-between;align-items:center}h1{font-size:30px;margin:0 0 8px}p{font-size:17px;margin:0;color:#566572}.tag{font-size:16px;padding:10px 14px;border:1px solid #bdc6cc;border-radius:20px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:0 28px}.card{overflow:hidden;border:1px solid #c8ced0;border-radius:10px;background:white}.label{height:42px;padding:10px 15px;font-size:17px;font-weight:700}img{display:block;width:100%;height:auto}.foot{padding:15px 30px;font-size:14px;color:#566572}</style><div class="head"><div><h1>${title}</h1><p>${description}</p></div><div class="tag">히말라야 · 티베트 · 인도 저지대</div></div><div class="grid"><div class="card"><div class="label">색채</div><img src="${src('physical')}"></div><div class="card"><div class="label">흑백</div><img src="${src('political')}"></div></div><div class="foot">동일한 원본 고도 · 동일한 지역과 배율 · 표시 방식만 변경한 시안 / 앱에는 미적용</div></html>`);
  await page.evaluate(()=>Promise.all([...document.images].map(image=>image.decode())));
  await page.screenshot({path:new URL(`option-${name}.png`,scope).pathname.slice(1),fullPage:true});
 }
 writeFileSync(new URL(selectedNames.length===1?'render-evidence-'+selectedNames[0]+'.json':'render-evidence.json',scope),JSON.stringify({at:new Date().toISOString(),origin,health,results},null,2)+'\n');
}finally{await browser.close();}
