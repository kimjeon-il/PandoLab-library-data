// Scoped recovery from the pre-existing archive checkout's unrelated history.
// Run from the app worktree; only storage/Git operations run against the library.
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const root=process.cwd(),{withLibraryLock,libraryCheckout}=await import(pathToFileURL(root+'/tools/library-data.mjs'));
const result=withLibraryLock(root,()=>{
 const checkout=libraryCheckout(root),options=['-c','maintenance.auto=false','-c','gc.auto=0','-c','core.autocrlf=false'];
 const git=(args,input)=>execFileSync('git',[...options,...args],{cwd:checkout,input,encoding:'utf8',maxBuffer:32*1024*1024}).trim();
 const configPath=root+'/config/library-data.json',original=readFileSync(configPath,'utf8'),config=JSON.parse(original);
 const base=config.revision,pending=git(['rev-parse','HEAD']),prefix='assets/data/terrain-preview/v0.13.3-p2/';
 assert.equal(base,'68380579a7c7a1bd8ec97683b7517502c1389c3c');
 assert.equal(pending,'bbb65fff15606d0c56d8827a880d845597f7b4e4');
 assert.equal(git(['status','--porcelain']),'');assert.equal(git(['config','--get','core.sparseCheckout']),'true');
 const readIndex=r=>JSON.parse(git(['show',r+':archive/index.json']));
 const index=readIndex(base),source=readIndex(pending),selected=Object.keys(source.files).filter(p=>p.startsWith(prefix));
 assert.equal(selected.length,9);assert.ok(!Object.keys(index.files).some(p=>p.startsWith(prefix)));
 git(['fetch','--filter=blob:none','origin','work/ui']);
 const remote=git(['rev-parse','FETCH_HEAD']);
 // Preserve the unrelated detached checkout history before moving any checkout.
 const protectedRef='refs/pando/preserved/ui-runtime';
 const refs=git(['for-each-ref','--format=%(objectname)',protectedRef]);
 if(refs)assert.equal(refs,pending);else git(['update-ref',protectedRef,pending,'']);
 const changes=new Map();
 const parse=raw=>raw.split('\0').filter(Boolean).map(line=>{
  const match=line.match(/^(\d+) (\w+) ([a-f0-9]+)\t(.+)$/s);assert.ok(match,line);
  return {mode:match[1],type:match[2],oid:match[3],name:match[4]};
 });
 for(const path of selected){
  const entry=source.files[path];index.files[path]=entry;
  const stored=parse(git(['ls-tree','-z',pending,'--',entry.stored]));assert.equal(stored.length,1);
  changes.set(entry.stored,stored[0]);
 }
 index.branch='work/ui';index.sourceRevision=git(['-C',root,'rev-parse','HEAD']);
 changes.set('archive/index.json',{mode:'100644',type:'blob',oid:git(['hash-object','-w','--stdin'],JSON.stringify(index)+'\n')});
 const rewrite=(tree,edits)=>{
  const entries=new Map(parse(git(['ls-tree','-z',tree])).map(e=>[e.name,e]));
  const groups=new Map();
  for(const [path,entry]of edits){const slash=path.indexOf('/');if(slash<0)entries.set(path,{...entry,name:path});else{
   const dir=path.slice(0,slash);if(!groups.has(dir))groups.set(dir,new Map());groups.get(dir).set(path.slice(slash+1),entry);
  }}
  for(const [dir,children]of groups){const old=entries.get(dir);assert.ok(!old||old.type==='tree');
   const empty=old?old.oid:git(['mktree'],''),oid=rewrite(empty,children);entries.set(dir,{mode:'040000',type:'tree',oid,name:dir});
  }
  return git(['mktree','-z'],[...entries.values()].map(e=>`${e.mode} ${e.type} ${e.oid}\t${e.name}\0`).join(''));
 };
 const tree=rewrite(git(['rev-parse',base+'^{tree}']),changes);
 const revision=git(['-c','user.name=Pando library publisher','-c','user.email=library-publisher@users.noreply.github.com',
  'commit-tree',tree,'-p',base,'-p',remote], 'Store selected terrain preview p2 on the current UI data pairing\n');
 const committed=readIndex(revision);
 const before=readIndex(base).files;
 for(const path of new Set([...Object.keys(before),...Object.keys(committed.files)]))
  if(!path.startsWith(prefix))assert.deepEqual(committed.files[path],before[path],path);
 git(['update-ref','refs/pando/runtime/ui',revision]);
 git(['push','origin',revision+':refs/heads/work/ui']);
 assert.equal(git(['ls-remote','--exit-code','origin','refs/heads/work/ui']).split(/\s+/)[0],revision);
 assert.equal(readFileSync(configPath,'utf8'),original,'App data pin changed concurrently');
 git(['checkout','--detach',revision]);
 config.revision=revision;writeFileSync(configPath,JSON.stringify(config,null,2)+'\n');
 return {revision,base,remoteParent:remote,preservedPending:pending,protectedRef,files:selected,nonSelectedEntriesUnchanged:true};
});
writeFileSync(new URL('preview-storage-recovery.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
