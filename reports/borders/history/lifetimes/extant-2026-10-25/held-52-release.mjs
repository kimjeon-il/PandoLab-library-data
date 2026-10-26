import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=process.cwd(),dir=path.dirname(fileURLToPath(import.meta.url));
const local=p=>import(pathToFileURL(path.join(root,p)).href);
const {assembleLibraryRelease,verifyLibraryRelease}=await local('tools/assemble-library-release.mjs');
const {libraryCheckout,librarySharedCheckout,libraryConfig,withLibraryLock}=await local('tools/library-data.mjs');
const hash=b=>createHash('sha256').update(b).digest('hex');
const git=(cwd,args,input)=>execFileSync('git',['-c','maintenance.auto=false','-c','gc.auto=0',...args],{cwd,input,encoding:'utf8',maxBuffer:16*1024*1024}).trim();
const sourceRevision=libraryConfig(root).revision;
assert.equal(sourceRevision,'68380579a7c7a1bd8ec97683b7517502c1389c3c');
const source=execFileSync('git',['show',sourceRevision+':library.json'],{cwd:libraryCheckout(root)});
const revision=hash(source),output=path.resolve('build-native/library-publication');
const evidence=path.join(dir,'held-52-release.json');
if(process.argv.includes('--assemble')){
 assert.equal(fs.existsSync(output),false,'Preserve an existing publication instead of overwriting it');
 const disk=fs.statfsSync('D:/');assert.ok(disk.bavail*disk.bsize>5*1024**3);
 const built=assembleLibraryRelease({root,output,revision,sourceRevision});
 const archive=JSON.parse(git(libraryCheckout(root),['show',sourceRevision+':archive/index.json']));
 for(const relative of Object.keys(built.manifest.files)){
  const file='assets/data/'+relative;
  assert.ok(archive.files[file],`Missing pinned input: ${file}`);
  assert.equal(hash(fs.readFileSync(path.join(root,file))),archive.files[file].sha256,`Source pairing mismatch: ${file}`);
 }
 const verified=verifyLibraryRelease({output,revision});
 const result={sourceRevision,revision,output,files:built.fileCount,logicalBytes:Object.keys(built.manifest.files).reduce((n,p)=>n+fs.statSync(path.join(output,'assets/data/library-releases',revision,p)).size,0),
  pairedSourceHashesVerified:true,verified,publication:'assembled; not yet pushed',createdAt:new Date().toISOString()};
 fs.writeFileSync(evidence,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}else if(process.argv.includes('--publish')){
 const result=JSON.parse(fs.readFileSync(evidence));assert.equal(result.revision,revision);assert.equal(result.sourceRevision,sourceRevision);
 const manifest=JSON.parse(fs.readFileSync(path.join(output,'assets/data/library-releases',revision,'manifest.json')));
 const files=['assets/data/library-channel/current.json','assets/data/library-releases/'+revision+'/manifest.json',
  ...Object.keys(manifest.files).map(p=>'assets/data/library-releases/'+revision+'/'+p)];
 withLibraryLock(root,()=>{
  const shared=librarySharedCheckout(root);assert.equal(git(shared,['branch','--show-current']),'main');
  assert.equal(git(shared,['status','--porcelain']),'','Preserve unrelated library checkout edits');
  git(shared,['fetch','--filter=blob:none','origin','main']);git(shared,['merge','--ff-only','FETCH_HEAD']);
  const prior=git(shared,['rev-parse','HEAD']);
  for(const file of files){
   const target=path.resolve(shared,file);assert.ok(target.startsWith(path.resolve(shared,'assets/data')+path.sep));
   for(let parent=path.dirname(target);parent!==path.resolve(shared);parent=path.dirname(parent))
    if(fs.existsSync(parent))assert.ok(fs.lstatSync(parent).isDirectory()&&!fs.lstatSync(parent).isSymbolicLink(),'Publication must not traverse a link');
   const bytes=fs.readFileSync(path.join(output,file));
   if(fs.existsSync(target)){
    assert.ok(fs.lstatSync(target).isFile()&&!fs.lstatSync(target).isSymbolicLink());
    if(file==='assets/data/library-channel/current.json'){
     const previous=execFileSync('git',['show',prior+':'+file],{cwd:shared});assert.deepEqual(fs.readFileSync(target),previous,'Preserve an edited channel pointer');
     fs.writeFileSync(target,bytes);
    }else assert.deepEqual(fs.readFileSync(target),bytes,'Immutable published bytes differ');
   }
   else{fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,bytes);}
  }
  git(shared,['--literal-pathspecs','add','--sparse','--pathspec-from-file=-','--pathspec-file-nul'],files.join('\0')+'\0');
  git(shared,['-c','user.name=Pando library publisher','-c','user.email=library-publisher@users.noreply.github.com','commit','-m','Publish approved lifetime and Soviet European boundary library '+revision]);
  const commit=git(shared,['rev-parse','HEAD']);git(shared,['push','origin','HEAD:main']);
  const remote=git(shared,['ls-remote','origin','refs/heads/main']).split(/\s/)[0];assert.equal(remote,commit);
  result.publication='pushed';result.libraryMainCommit=commit;result.previousLibraryMain=prior;result.publishedAt=new Date().toISOString();
  fs.writeFileSync(evidence,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
 });
}else throw Error('Explicit --assemble or --publish required');
