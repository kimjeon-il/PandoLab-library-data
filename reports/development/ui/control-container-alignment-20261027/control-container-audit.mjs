import fs from 'node:fs';
import path from 'node:path';
import {buildFrontendIndex,frontendAsset} from '../scripts/lib/frontend-layout.mjs';
import {buildUiBundles} from '../scripts/build-ui-bundle.mjs';
import {renderProductHtml} from '../scripts/lib/product-html.mjs';
import {collectCssRules} from '../scripts/lib/css-analysis.mjs';
import {createP3PreviewServer} from '../scripts/p3-preview-server.mjs';
const root=process.cwd(),out='D:/dev/PandoLab-library-data/reports/.edits/ui/development/ui/control-container-alignment-20261027';
fs.mkdirSync(out,{recursive:true});
const index=buildFrontendIndex(root),read=file=>fs.readFileSync(path.join(root,file),'utf8');
const bundles=buildUiBundles(root,{readSource:file=>frontendAsset(root,file,{index}).bytes.toString('utf8')});
const products=renderProductHtml(read);
const sprite=products.editor.match(/<svg class="icon-sprite"[^>]*>[\s\S]*?<\/svg>/)[0];
const sources=[];
for(const entry of index.values())if(entry.publicPath.endsWith('.css')){
 for(const rule of collectCssRules(read(entry.sourcePath))) {
  const declarations=rule.declarations.filter(d=>/^(width|height|min-width|min-height|grid-template-columns|grid-auto-columns|flex|flex-basis)$/.test(d.property)&&d.value.includes('--ui-control-height'));
  if(declarations.length)sources.push({file:entry.sourcePath,selector:rule.prelude,context:rule.context,declarations});
 }
}
fs.writeFileSync(path.join(out,'source-candidates.json'),JSON.stringify(sources,null,2));
const use=name=>`<svg class='ui-icon' viewBox='0 0 24 24' aria-hidden='true'><use href='#icon-${name}'/></svg>`;
const button=(classes,label,name)=>`<button class='ui-button ${classes}' aria-label='${label}'>${use(name)}</button>`;
const row=(name,html)=>`<section class='audit-sample' data-sample='${name}'><h2>${name}</h2>${html}</section>`;
const controls=row('map-toolbar',`<div class='ui-toolbar ui-floating-surface ui-floating-toolbar map-command-toolbar'>${button('icon-btn create-menu-command','추가','plus')}<div class='map-command-search'>${read('shared/frontend/ui/fragments/map-search-control.html')}</div>${read('shared/frontend/ui/fragments/map-fit-control.html')}</div>`)+
 row('distribution-delete',`<div class='surface-editor'><div class='ui-row ui-card distribution-entry-row'><span><strong>영역</strong><small>영역 참조</small></span><input type='number' value='25' aria-label='값'>${button('icon-btn distribution-entry-delete','분포 삭제','close')}</div></div>`)+
 row('search-input',`<div class='ui-search-field'>${use('search')}<input type='search' value='조사' aria-label='검색어'>${button('ui-icon-button ui-search-clear','지우기','close')}</div>`)+
 row('library-time',`<div class='territorial-library-time-control'><input class='ui-input' value='1989' aria-label='연도'>${button('icon-btn territorial-library-time-suggest','시점 제안','calendar')}</div>`)+
 row('toast',`<div class='action-status ui-toast'><span></span><strong>완료</strong>${button('icon-btn notification-close','알림 닫기','close')}</div>`)+
 row('relation',`<div class='editor-relation-row'><span class='editor-relation-flag'>국기</span><span>상위 객체</span><span class='editor-relation-actions'>${button('icon-btn editor-relation-focus','관계 위치','fit-map')}${button('icon-btn editor-relation-remove','관계 삭제','close')}</span></div>`)+
 row('toolbar',`<div class='ui-toolbar ui-floating-toolbar'>${button('icon-btn','기준1','plus')}${button('icon-btn','기준2','search')}</div>`);
const fixtureCss=`html,body{height:auto;overflow:auto}.app-root{display:block;height:auto;min-height:100vh;overflow:visible}.audit-sample{padding:12px;margin:8px;border:1px solid #aaa;overflow:visible}.audit-sample h2{font:14px/1.4 sans-serif;margin:0 0 8px}.audit-sample .map-command-toolbar,.audit-sample .action-status{position:relative;inset:auto;transform:none;width:max-content}`;
const css=[read('shared/frontend/css/app.css').replaceAll('../fonts/','/assets/fonts/'),bundles.main,bundles.modal,read('apps/viewer/css/viewer.css'),fixtureCss].join('\n');
fs.writeFileSync(path.join(out,'audit.css'),css);
const assets=new Map([['assets/audit.css',{bytes:Buffer.from(css)}]]);
const font=frontendAsset(root,'assets/fonts/pretendard-v1.3.9/PretendardVariable.woff2',{index});assets.set(font.publicPath,{bytes:font.bytes});
for(const product of ['viewer','editor'])for(const layout of ['wide','mobile','phone-landscape']){
 const name=`${product}-${layout}.html`;
 const html=`<!doctype html><html lang='ko'><head><meta name='viewport' content='width=device-width,initial-scale=1'><title>원본 CSS 컨테이너 조사 표본</title><link rel='stylesheet' href='/assets/audit.css'></head><body>${sprite}<div class='app-root ${product==='viewer'?'viewer-root':''}' data-layout='${layout}'><p>원본 CSS 배치 표본 · 실제 프로젝트 상태 아님</p>${controls}</div></body></html>`;
 fs.writeFileSync(path.join(out,name),html);assets.set('assets/'+name,{bytes:Buffer.from(html)});
}
const server=createP3PreviewServer(root,{assets:()=>assets});server.listen(4187,'127.0.0.1',()=>console.log(JSON.stringify({port:4187,candidateRules:sources.length})));
for(const signal of ['SIGINT','SIGTERM'])process.once(signal,()=>server.close(()=>process.exit(0)));
