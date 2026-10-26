import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {execFileSync} from 'node:child_process';
import {pathToFileURL,fileURLToPath} from 'node:url';
const root=process.cwd(),dir=path.dirname(fileURLToPath(import.meta.url));
const api=await import(pathToFileURL(path.join(root,'tools/library-data.mjs')).href);
const {shareContentFile}=await import(pathToFileURL(path.join(root,'tools/library-content.mjs')).href);
const shared=api.librarySharedCheckout(root),hash=b=>createHash('sha256').update(b).digest('hex');
const git=(args,input)=>execFileSync('git',['--no-lazy-fetch',...args],{cwd:shared,input,encoding:'utf8',maxBuffer:16*1024*1024}).trim();
const baseline=JSON.parse(fs.readFileSync(path.join(dir,'held-52-baseline.json')));
const publication=JSON.parse(fs.readFileSync(path.join(dir,'held-52-release.json')));
assert.match(baseline.baseLibraryRevision,/^[0-9a-f]{40}$/);
const oldView=path.resolve(shared,'.pando-cache/materialized/gis',baseline.baseLibraryRevision);
const stage=path.resolve(root,'build-native/library-publication');
const free=()=>{const d=fs.statfsSync('D:/');return d.bavail*d.bsize;};
const result={freeBytesBefore:free(),removed:[],preserved:'All permanent worktrees, source pins, original evidence, source geometry and shared Git objects'};
const roots=execFileSync('git',['worktree','list','--porcelain'],{cwd:root,encoding:'utf8'}).split(/\r?\n/).filter(s=>s.startsWith('worktree ')).map(s=>s.slice(9));
const live=pid=>{try{process.kill(pid,0);return true;}catch(e){return e.code!=='ESRCH';}};
api.withLibraryLock(root,()=>{
 if(fs.existsSync(oldView)){
  assert.equal(fs.realpathSync(oldView).toLowerCase(),oldView.toLowerCase());
  for(const app of roots){
   for(const mount of api.libraryConfig(app).mounts){
    const p=path.resolve(app,mount);if(!fs.existsSync(p))continue;
    const target=fs.realpathSync(p);assert.ok(target!==oldView&&!target.startsWith(oldView+path.sep),'A worktree still mounts the old view');
   }
   for(const p of api.libraryRuntimeLeasePaths(app))if(fs.existsSync(p)){
    const lease=JSON.parse(fs.readFileSync(p));
    assert.ok(!live(lease.pid)||!lease.materialized?.includes(oldView),'A running workflow still consumes the old view');
   }
  }
  assert.equal(api.libraryWriteLeases(shared).some(l=>l.alive&&l.view===oldView),false);
  const record=JSON.parse(fs.readFileSync(path.join(oldView,'.cache-owner.json')));
  const indexes=[publication.sourceRevision,baseline.baseLibraryRevision].map(revision=>({revision,index:JSON.parse(git(['show',revision+':archive/index.json']))}));
  let privateBytes=0;
  for(const [logical,e]of Object.entries(record.files))if(e.storage==='private'){
   const p=path.resolve(oldView,logical);assert.ok(p.startsWith(oldView+path.sep));
   assert.ok(fs.lstatSync(p).isFile()&&!fs.lstatSync(p).isSymbolicLink());
   const bytes=fs.readFileSync(p);assert.equal(hash(bytes),e.sha256);
   const archived=indexes.find(x=>x.index.files[logical]?.sha256===e.sha256);assert.ok(archived,'Unarchived private work must remain: '+logical);
   const entry=archived.index.files[logical];
   const stored=execFileSync('git',['--no-lazy-fetch','show',archived.revision+':'+entry.stored],{cwd:shared,maxBuffer:Math.max(entry.bytes+1024*1024,1024*1024)});
   assert.deepEqual(entry.encoding==='gzip'?gunzipSync(stored):stored,bytes,'Archived private bytes are not locally recoverable');
   shareContentFile(shared,p);record.files[logical]={...e,storage:'shared'};privateBytes+=bytes.length;
  }
  fs.writeFileSync(path.join(oldView,'.cache-owner.json'),JSON.stringify(record)+'\n');
  const bytes=Object.values(record.files).reduce((n,e)=>n+e.bytes,0);
  api.removeRuntimeView(shared,oldView,record);
  result.removed.push({path:oldView,logicalBytes:bytes,archivedPrivateBytes:privateBytes,reason:'Superseded GIS runtime view; no mounts/live consumers; private bytes match locally readable archived originals'});
 }
 if(fs.existsSync(stage)){
  assert.ok(stage.startsWith(path.resolve(root,'build-native')+path.sep));assert.equal(fs.realpathSync(stage).toLowerCase(),stage.toLowerCase());
  const manifest=JSON.parse(fs.readFileSync(path.join(stage,'assets/data/library-releases',publication.revision,'manifest.json')));
  const expected=new Map(Object.entries(manifest.files).map(([p,h])=>['assets/data/library-releases/'+publication.revision+'/'+p,h]));
  for(const p of ['assets/data/library-channel/current.json','assets/data/library-releases/'+publication.revision+'/manifest.json'])expected.set(p,hash(fs.readFileSync(path.join(stage,p))));
  const tree=git(['ls-tree','-r','--format=%(objectname) %(path)',publication.libraryMainCommit,'--','assets/data/library-channel/current.json','assets/data/library-releases/'+publication.revision]);
  const objects=new Map(tree.split('\n').map(line=>[line.slice(41),line.slice(0,40)]));
  let bytes=0,count=0;const checked=[];
  const visit=(directory,relative='')=>{for(const e of fs.readdirSync(directory,{withFileTypes:true})){
   assert.ok(!e.isSymbolicLink(),'Publication cleanup must not traverse links');
   const rel=relative+e.name,p=path.join(directory,e.name);
   if(e.isDirectory())visit(p,rel+'/');else{
    assert.ok(e.isFile()&&expected.has(rel),'Unexpected staging work must remain');
    const data=fs.readFileSync(p);assert.equal(hash(data),expected.get(rel));
    const oid=createHash('sha1').update('blob '+data.length+'\0').update(data).digest('hex');assert.equal(objects.get(rel),oid);
    checked.push(oid);bytes+=data.length;count++;expected.delete(rel);
   }
  }};visit(stage);assert.equal(expected.size,0);
  const readable=git(['cat-file','--batch-check=%(objectname) %(objecttype)'],checked.join('\n')+'\n').split('\n');
  assert.equal(readable.length,checked.length);assert.ok(readable.every(line=>line.endsWith(' blob')));
  fs.rmSync(stage,{recursive:true});
  result.removed.push({path:stage,logicalBytes:bytes,files:count,reason:'Completed publication staging; every file matches a locally readable blob in pushed library main'});
 }
});
result.freeBytesAfter=free();result.driveFreeBytesChange=result.freeBytesAfter-result.freeBytesBefore;
result.removedLogicalBytes=result.removed.reduce((n,x)=>n+x.logicalBytes,0);result.checkedAt=new Date().toISOString();
fs.writeFileSync(path.join(dir,'held-52-cleanup.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
