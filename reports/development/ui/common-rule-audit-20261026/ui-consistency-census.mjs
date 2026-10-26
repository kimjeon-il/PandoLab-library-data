import {readFileSync,writeFileSync,readdirSync,lstatSync,mkdirSync} from 'node:fs';
import {resolve,join,relative} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync,spawn} from 'node:child_process';
import {buildFrontendIndex} from '../scripts/lib/frontend-layout.mjs';
import {collectCssRules} from '../scripts/lib/css-analysis.mjs';
import {parseJavaScript,walkJavaScript} from '../scripts/lib/source-analysis.mjs';

const root=process.cwd(),out='D:/dev/PandoLab-library-data/reports/.edits/ui/development/ui/common-rule-audit-20261026';
mkdirSync(out,{recursive:true});
const index=buildFrontendIndex(root),catalog=new Map([...index].map(([url,row])=>[row.sourcePath,url]));
const paths=[...catalog.keys()].filter(path=>/\.(?:css|js)$/.test(path));
function htmlFiles(base){if(!lstatSync(base).isDirectory())return[];return readdirSync(base,{withFileTypes:true}).flatMap(row=>{const next=join(base,row.name);if(row.isSymbolicLink())throw Error('Do not traverse linked source');return row.isDirectory()?htmlFiles(next):row.name.endsWith('.html')?[relative(root,next).replaceAll('\\','/')]:[];});}
paths.push(...htmlFiles(join(root,'shared/frontend/ui')), ...htmlFiles(join(root,'apps/viewer/templates')), ...htmlFiles(join(root,'apps/editor/templates')));
const inventory=[],factories=[],inline=[],styles=[],duplicates=[],files=[],parseErrors=[];
const interesting=/^(?:button|input|select|textarea|summary)$/;
const interactiveRoles=/^(?:button|tab|menuitem|checkbox|switch|radio|option|treeitem|slider)$/;
const componentClasses=/\b(?:workspace-surface|surface-header|surface-body|surface-content|ui-dialog-card|ui-card|ui-section|ui-toolbar|ui-menu-list|ui-field)\b/;
const textValue=node=>node?.type==='Literal'?String(node.value):node?.type==='TemplateLiteral'?node.quasis.map(part=>part.value.cooked).join('${dynamic}'):null;
const kindOf=(tag,attrs,body='')=>{
  const classes=attrs.class||'',role=attrs.role||'';
  if(/ui-custom-color-plane/.test(classes))return'color-plane-exception';
  if(/ui-selectable-row/.test(classes))return'selection-row';
  if(/tree-state-toggle|layer-visibility/.test(classes))return'layer-visibility';
  if(role==='tab')return'tab';
  if(role==='menuitem'||/menu-item|file-menu-btn/.test(classes))return'menu-row';
  if(/swatch|color-chip|flag-preview|image-preview|image-thumb/.test(classes))return'swatch-or-media';
  if(/command-row|editor-action-row|action-list-row/.test(classes))return'action-row';
  if(tag==='button'&&(/icon-btn|ui-icon-button|sheet-close-btn|ui-icon-toggle/.test(classes)))return'icon-button';
  if(tag==='button')return'text-or-unclassified-button';
  if(interactiveRoles.test(role))return'role:'+role;
  if(!interesting.test(tag))return'component-container';
  return tag==='input'?`input:${attrs.type||'text'}`:tag;
};
function tags(source,file,comments=[]){
  const rows=[];
  for(const match of source.matchAll(/<(button|input|select|textarea|summary|a|div|span)\b([^<>]*?)>/g)){
    if(comments.some(comment=>match.index>=comment.range[0]&&match.index<comment.range[1]))continue;
    const attrs={};for(const attr of match[2].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g))attrs[attr[1]]=attr[2]??attr[3];
    if(!interesting.test(match[1])&&!interactiveRoles.test(attrs.role||'')&&!/^(?:dialog|tabpanel|tablist|menu|listbox|tree|toolbar)$/.test(attrs.role||'')&&!componentClasses.test(attrs.class||''))continue;
    const line=source.slice(0,match.index).split('\n').length;
    const row={file,line,tag:match[1],id:attrs.id||'',classes:attrs.class||'',role:attrs.role||'',type:attrs.type||'',label:attrs['aria-label']||attrs.title||'',nativeSelect:/\bdata-native-select\b/.test(match[2]),dynamic:/\$\{/.test(match[2]),kind:kindOf(match[1],attrs),hasCommonButton:/\bui-button\b/.test(attrs.class||'')};
    rows.push(row);if(attrs.style)inline.push({file,line,kind:'literal-style',target:row.id||row.classes||row.tag,value:attrs.style});
  }
  return rows;
}
const skin=/^(?:padding(?:-.+)?|border(?:-.+)?|background(?:-.+)?|box-shadow|font(?:-.+)?|line-height|color)$/;
const dimensions=/^(?:padding(?:-.+)?|margin(?:-.+)?|gap|row-gap|column-gap|width|min-width|max-width|height|min-height|max-height|border-radius|top|right|bottom|left|inset(?:-.+)?|outline-offset)$/;
const controlSelector=/(?:button|input|select|textarea|\.btn\b|icon-btn|ui-icon|control|field|menu-item|action-row|tab\b|swatch|chip|toggle)/;
for(const file of [...new Set(paths)].sort()){
  const source=readFileSync(join(root,file),'utf8'),ext=file.split('.').at(-1);
  files.push({file,kind:ext,bytes:Buffer.byteLength(source),sha256:createHash('sha256').update(source).digest('hex'),publicPath:catalog.get(file)||null});
  if(ext==='css'){
    const rules=collectCssRules(source,{filePath:file});
    const layer=file.includes('/tokens/')?'tokens':file.includes('/primitives/')?'primitives':file.includes('/components/')?'components':file.includes('/layout/')?'layout':file.includes('/features/')?'features':file.includes('/utilities/')?'utilities':'product-entry';
    for(const rule of rules)for(const declaration of rule.declarations){
      const flags=[];const {property,value,line}=declaration;
      if(layer!=='tokens'&&!property.startsWith('--')){
        if(declaration.important)flags.push('important');
        if(dimensions.test(property)&&/(?:^|[^\w-])-?(?:\d*\.)?\d+px\b/i.test(value))flags.push('raw-px');
        if(!/\burl\(/i.test(value)&&/(?:#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\()/i.test(value))flags.push('raw-color');
        if(/(^|[\s>+~,(])#[A-Za-z_][\w-]*/.test(rule.prelude))flags.push('id-selector');
        if(layer==='layout'&&skin.test(property))flags.push('layout-skin');
        if(layer==='features'&&skin.test(property))flags.push('feature-skin');
        if(layer==='product-entry'&&controlSelector.test(rule.prelude)&&skin.test(property))flags.push('product-control-skin');
      }
      styles.push({file,line,layer,selector:rule.prelude,context:rule.context,property,value,important:declaration.important,controlCandidate:controlSelector.test(rule.prelude),flags});
    }
    continue;
  }
  if(ext==='html'){inventory.push(...tags(source,file));continue;}
  if(!/(?:createElement|<(?:button|input|select|textarea|summary)\b|\.style\.|innerHTML|setAttribute\(['"]role)/.test(source))continue;
  try{
    const code=parseJavaScript(source,{filePath:file});inventory.push(...tags(source,file,code.getAllComments()));
    const variables=new Map();for(const scope of code.scopeManager.scopes)for(const variable of scope.variables)for(const def of variable.defs)if(def.node?.type==='VariableDeclarator')variables.set(def.node,variable);
    walkJavaScript(code,node=>{
      if(node.type==='CallExpression'&&node.callee.type==='MemberExpression'&&node.callee.property.name==='createElement'){
        const tag=node.arguments[0]?.type==='Literal'?node.arguments[0].value:null;
        {
          const declaration=node.parent?.type==='VariableDeclarator'?node.parent:null,variable=variables.get(declaration),attrs={};
          for(const reference of variable?.references||[]){const member=reference.identifier.parent,assignment=member?.parent;if(member?.type!=='MemberExpression')continue;
            if(assignment?.type==='AssignmentExpression'){
              const key=member.property?.name,value=textValue(assignment.right);if(value!==null&&['className','id','type','title'].includes(key)){
                const attr=key==='className'?'class':key;attrs[attr]=assignment.operator==='+='?(attrs[attr]||'')+value:value;
              }
            }
            if(member.property?.name==='setAttribute'&&assignment?.type==='CallExpression'){
              const key=textValue(assignment.arguments[0]),value=textValue(assignment.arguments[1]);if(value!==null&&['role','class','id','type','title','aria-label'].includes(key))attrs[key]=value;
            }
            if(member.property?.name==='classList'&&assignment?.type==='MemberExpression'&&assignment.property?.name==='add'&&assignment.parent?.type==='CallExpression'){
              attrs.class=(attrs.class||'')+' '+assignment.parent.arguments.map(textValue).filter(value=>value!==null).join(' ');
            }
          }
          if(!tag||interesting.test(tag)||interactiveRoles.test(attrs.role||'')||/^(?:dialog|tabpanel|tablist|menu|listbox|tree|toolbar)$/.test(attrs.role||'')||componentClasses.test(attrs.class||''))
            factories.push({file,line:node.loc.start.line,tag:tag||'dynamic-tag',role:attrs.role||'',variable:declaration?.id?.name||'',classes:attrs.class||'',id:attrs.id||'',kind:tag?kindOf(tag,attrs):'generic-factory',hasCommonButton:/\bui-button\b/.test(attrs.class||'')});
        }
      }
      if(node.type==='AssignmentExpression'&&node.left.type==='MemberExpression'&&node.left.object.type==='MemberExpression'&&node.left.object.property.name==='style'){
        const target=source.slice(node.left.object.object.range[0],node.left.object.object.range[1]);
        const property=node.left.property.name||node.left.property.value;
        if(/width|height|padding|radius|font|background|color|display|align|justify|cssText/i.test(property||''))inline.push({file,line:node.loc.start.line,kind:'style-assignment',target,property,value:source.slice(node.right.range[0],node.right.range[1])});
      }
    });
  }catch(error){parseErrors.push({file,error:error.message});}
}
const groups=new Map();for(const row of styles){const key=[row.file,row.context,row.selector,row.property].join('\0');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(row);}
for(const rows of groups.values())if(rows.length>1&&new Set(rows.map(row=>row.value)).size>1)duplicates.push({file:rows[0].file,selector:rows[0].selector,property:rows[0].property,context:rows[0].context,definitions:rows.map(({line,value,important})=>({line,value,important}))});
const count=(rows,key)=>Object.fromEntries([...new Set(rows.map(row=>row[key]))].sort().map(value=>[value,rows.filter(row=>row[key]===value).length]));
const result={sourceCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),dataPin:JSON.parse(readFileSync('config/library-data.json')).revision,files,inventory,factories,inline,styles,duplicates,parseErrors};
writeFileSync(join(out,'source-census.json'),JSON.stringify(result,null,2)+'\n');
const csv=(name,rows,keys)=>writeFileSync(join(out,name),keys.join(',')+'\n'+rows.map(row=>keys.map(key=>'"'+String(Array.isArray(row[key])?row[key].join(';'):row[key]??'').replaceAll('"','""')+'"').join(',')).join('\n')+'\n');
csv('controls.csv',inventory,['file','line','kind','tag','id','classes','label','role','nativeSelect','dynamic','hasCommonButton']);
csv('dynamic-factories.csv',factories,['file','line','kind','tag','variable','id','classes','hasCommonButton']);
csv('style-candidates.csv',styles.filter(row=>row.flags.length),['file','line','layer','selector','context','property','value','flags','controlCandidate']);
const summary={sourceCommit:result.sourceCommit,files:count(files,'kind'),htmlDefinitions:inventory.length,definitionKinds:count(inventory,'kind'),dynamicFactories:factories.length,factoryKinds:count(factories,'kind'),inlineCandidates:inline.length,cssDeclarations:styles.length,styleCandidates:styles.filter(row=>row.flags.length).length,cssFlags:count(styles.flatMap(row=>row.flags.map(flag=>({flag}))),'flag'),duplicateProperties:duplicates.length,parseErrors};
writeFileSync(join(out,'source-summary.json'),JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify(summary));
const checkNames=['ui-architecture','ui-components','ui-layering','ui-spacing','ui-information-architecture'];
if(process.argv.includes('--source-only'))process.exit(0);
const checks=await Promise.all(checkNames.map(name=>new Promise(resolve=>{
  const child=spawn(process.execPath,['scripts/check-'+name+'.mjs'],{cwd:root,windowsHide:true});let stdout='',stderr='';
  child.stdout.on('data',bytes=>stdout+=bytes);child.stderr.on('data',bytes=>stderr+=bytes);child.once('error',error=>{resolve({name,error:error.message});});
  child.once('close',code=>{writeFileSync(join(out,'check-'+name+'.txt'),stdout+stderr);resolve({name,code,lines:(stdout+stderr).split('\n').filter(Boolean).length,summary:(stdout+stderr).split('\n').filter(Boolean).slice(-2)});});
})));
writeFileSync(join(out,'checks.json'),JSON.stringify(checks,null,2)+'\n');console.log(JSON.stringify({checks}));
