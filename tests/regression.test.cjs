const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
function harness(){
  const nodes=new Map(),saved=new Map(),timers=[];
  function node(id){if(!nodes.has(id))nodes.set(id,{textContent:'',value:'',innerHTML:'',hidden:id==='detail',dataset:{},style:{},listeners:{},isConnected:true,classList:{toggle(){},add(){},remove(){}},addEventListener(type,fn){this.listeners[type]=fn;},setAttribute(){},removeAttribute(){},querySelector(){return node('child');},querySelectorAll(){return [];},append(){},focus(){document.activeElement=this;},showModal(){this.open=true;},close(){this.open=false;}});return nodes.get(id);}
  const document={documentElement:{outerHTML:read('index.html')},getElementById:node,querySelector:s=>s==='dialog[open]'?[...nodes.values()].find(n=>n.open)||null:node(s.slice(1)),querySelectorAll:()=>[],listeners:{},addEventListener(type,fn){this.listeners[type]=fn;},body:{append(){}}};
  const storage={getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)};
  const context={document,window:{scrollY:0,scrollTo({top}){this.scrollY=top;},addEventListener(){}},getComputedStyle:()=>({display:'block'}),structuredClone,crypto:require('node:crypto').webcrypto,console,Blob,TextEncoder,AbortSignal,
    localStorage:storage,sessionStorage:storage,setTimeout:(fn,delay)=>{timers.push({fn,delay});return timers.length;},clearTimeout(){},requestAnimationFrame(){return 1;},cancelAnimationFrame(){},fetch:async()=>{throw Error('Network disabled in tests');}};
  vm.createContext(context);
  vm.runInContext(read('data/seeds.js'),context);
  vm.runInContext(read('data/recent-seeds.js'),context);
  vm.runInContext(read('js/core.js'),context);
  const exposed=`window.testAPI={C,initial,writeStored,readStored,commit,snapshot,completeSnapshot,saveRecovery,loadPublished,checkPublished,contentKey,publishToDrive,rememberPublished,inlineResources, start,render,cardHTML,clearFilters,openDetail,closeDetail,get active(){return active;},
    setFilter(values){Object.assign(filter,values);},get filter(){return filter;},
    configure(options){if(options.items)state.items=options.items;if(options.mode)storageMode=options.mode;if(options.admin!==undefined)isAdmin=options.admin;if(options.offline!==undefined)initial.offline=options.offline;if(options.token)accessToken=options.token;},
    get items(){return state.items;},get conflict(){return remoteConflict;},get dbName(){return dbName;}};`;
  vm.runInContext(read('js/app.js').replace(/      start\(\);\s*\}\)\(\);\s*$/,exposed+'\n})();'),context);
  assert.ok(context.window.testAPI,'App test harness must load');
  return {api:context.window.testAPI,context,saved,timers,nodes};
}
test('all app scripts compile',()=>{for(const file of ['js/app.js','js/core.js','data/seeds.js','data/recent-seeds.js'])new vm.Script(read(file));});
test('every bundled seed placeholder exists before the loader runs',()=>{
  const html=read('index.html');
  const loader=html.indexOf('id="seed-script"');
  for(const id of Object.keys(JSON.parse(read('data/seeds.js').match(/const seeds=(\{[\s\S]*?\});\r?\nfor\(/)[1]))){
    assert.ok(html.indexOf('id="'+id+'"')<loader,id+' must precede the seed loader');
  }
});
test('starter images exist and fields have valid defaults',()=>{
  const {api}=harness();
  const items=api.C.validateBackup(api.initial);
  assert.ok(items.length>40);
  for(const item of items){if(item.image.startsWith('assets/'))assert.ok(fs.existsSync(path.join(root,item.image)),item.image);}
  const reader=items.find(i=>i.id==='mumu-curated-window-reader');
  assert.ok(reader.fields.find(f=>f.key==='제외 요소').value);
});
test('recent image prompts are bundled with their final images',()=>{
  const {api}=harness();
  const items=api.C.validateBackup(api.initial);
  for(const id of ['mumu-curated-phonefree-100days-classroom','mumu-curated-phonefree-100days-outdoor','mumu-curated-phonefree-100days-tracker']){
    const item=items.find(candidate=>candidate.id===id);
    assert.ok(item,id+' must be bundled');
    assert.equal(item.fields.length,13);
    assert.ok(fs.existsSync(path.join(root,item.image)),item.image);
  }
  assert.equal(items.find(item=>item.id==='mumu-stamp-crayon-emotion9-woman').image,'assets/mumu-crayon-emotion9-woman-v2.png');
});

test('short prompt fields start compact and grow with their content',()=>{
  const app=fs.readFileSync(path.join(root,'js','app.js'),'utf8');
  const css=fs.readFileSync(path.join(root,'styles','app.css'),'utf8');
  assert.match(app,/rows="1"/);
  assert.match(app,/box\.style\.height='auto'/);
  assert.match(app,/requestAnimationFrame\(\(\)=>\$\$\('#detail-fields textarea'\)\.forEach\(growField\)\)/);
  assert.match(css,/\.field textarea\{min-height:48px;max-height:320px;/);
});
test('backup validation preserves old sample IDs and empty datasets',()=>{
  const {api}=harness();const item={...api.initial.items[0],id:'demo-cafe-poster'};
  assert.equal(api.C.validateBackup({app:'mumu-prompts',version:3,items:[item]}).length,1);
  assert.equal(api.C.validateBackup({app:'mumu-prompts',version:3,items:[]}).length,0);
});
test('image mode keeps unregistered prompts out of the public feed',()=>{
  const {api}=harness();const [registered]=api.C.validateBackup(api.initial).filter(item=>item.image);
  const missing={...registered,id:'missing-image-test',title:'이미지 미등록 테스트',image:''};
  assert.deepEqual(api.C.filter([registered,missing],{imageMode:'registered'}).map(item=>item.id),[registered.id]);
  assert.deepEqual(api.C.filter([registered,missing],{imageMode:'missing'}).map(item=>item.id),[missing.id]);
});
test('public render cannot expose the missing-image view or admin tools',()=>{
  const {api,nodes}=harness();const item=api.C.validateBackup(api.initial).find(i=>i.image);
  api.configure({admin:false,items:[item,{...item,id:'private-missing',title:'Private missing prompt',image:''}]});
  api.setFilter({imageMode:'missing'});api.render();
  assert.equal(api.filter.imageMode,'registered');
  assert.equal(nodes.get('admin-toolbar').hidden,true);
  assert.ok(!nodes.get('gallery').innerHTML.includes('private-missing'));
  assert.ok(!nodes.get('categories').innerHTML.includes('chip-count">2<'));
});
test('admin missing-image view and filtered empty state remain distinct',()=>{
  const {api,nodes}=harness();const item=api.C.validateBackup(api.initial).find(i=>i.image);
  api.configure({admin:true,items:[item,{...item,id:'private-missing',image:''}]});
  api.setFilter({imageMode:'missing'});api.render();
  assert.equal(nodes.get('admin-toolbar').hidden,false);
  assert.equal(nodes.get('view-description').hidden,false);
  assert.ok(nodes.get('gallery').innerHTML.includes('private-missing'));
  api.setFilter({query:'no-match-unique-query'});api.render();
  assert.equal(nodes.get('empty-title').textContent,'조건에 맞는 프롬프트가 없습니다.');
  api.clearFilters();
  assert.equal(api.filter.query,'');assert.equal(api.filter.imageMode,'missing');
  assert.equal(nodes.get('empty').hidden,true);
});
test('gallery cards close their interactive wrapper and prioritize the first image',()=>{
  const {api}=harness();const item=api.C.validateBackup(api.initial).find(i=>i.image);
  assert.match(api.cardHTML(item,0),/loading="eager" fetchpriority="high"/);
  assert.match(api.cardHTML(item,1),/loading="lazy"/);
  assert.match(api.cardHTML(item,0),/<\/button><\/article>$/);
  assert.doesNotMatch(api.cardHTML(item,0),/card-arrow|↗/);
});
test('image ratio metadata reserves space without overriding the loaded image ratio',()=>{
  const {api}=harness();const item=api.C.validateBackup(api.initial).find(i=>i.image);
  for(const ratio of [2/3,1,16/9]){
    assert.ok(api.cardHTML({...item,ratio}).includes('style="aspect-ratio:auto '+ratio.toFixed(4)+'"'));
  }
  assert.ok(!api.cardHTML({...item,ratio:0}).includes('aspect-ratio:'));
});
test('detail is a page and returning restores gallery scroll and focus',async()=>{
  assert.match(read('index.html'),/<section id="detail"[^>]*role="main"[^>]*hidden>/);
  assert.doesNotMatch(read('index.html'),/<dialog id="detail"/);
  const {api,nodes,context}=harness();const items=api.C.validateBackup(api.initial).filter(i=>i.image).slice(0,2);
  api.configure({items,admin:false});context.window.scrollY=640;
  const trigger=context.document.getElementById('test-gallery-card');trigger.focus();
  context.document.getElementById('detail').showModal=()=>{throw Error('Detail must not open as a modal');};
  await api.openDetail(items[0].id);
  assert.equal(nodes.get('detail').hidden,false);assert.equal(context.window.scrollY,0);
  assert.ok(nodes.get('detail-body').innerHTML.includes('detail-primary'));
  context.window.scrollY=1200;await api.openDetail(items[1].id);
  assert.equal(context.window.scrollY,0);
  await api.closeDetail();
  assert.equal(nodes.get('detail').hidden,true);assert.equal(api.active,null);
  assert.equal(context.window.scrollY,640);assert.equal(context.document.activeElement,trigger);
});
test('detail keeps unsaved edits when the leave confirmation is cancelled',async()=>{
  const {api,nodes}=harness();const items=api.C.validateBackup(api.initial).slice(0,2);api.configure({items});
  await api.openDetail(items[0].id);api.active.dirty=true;
  const closing=api.closeDetail();nodes.get('confirm-no').listeners.click();await closing;
  assert.equal(nodes.get('detail').hidden,false);assert.equal(api.active.dirty,true);
  const switching=api.openDetail(items[1].id);nodes.get('confirm-no').listeners.click();await switching;
  assert.equal(api.active.id,items[0].id);
  const leaving=api.closeDetail();nodes.get('confirm-yes').listeners.click();await leaving;
  assert.equal(nodes.get('detail').hidden,true);
});
test('Escape leaves the detail page but does not dismiss a nested dialog',async()=>{
  const {api,nodes,context}=harness();const item=api.C.validateBackup(api.initial)[0];api.configure({items:[item]});
  await api.openDetail(item.id);
  const event={key:'Escape',target:nodes.get('detail'),preventDefault(){this.defaultPrevented=true;}};
  nodes.get('editor').showModal();context.document.listeners.keydown(event);
  assert.equal(nodes.get('detail').hidden,false);assert.equal(event.defaultPrevented,undefined);
  nodes.get('editor').close();context.document.listeners.keydown(event);
  assert.equal(nodes.get('detail').hidden,true);assert.equal(event.defaultPrevented,true);
});
test('single-key fallback storage round-trips images and empty deletion',async()=>{
  const {api}=harness();api.configure({mode:'localStorage'});
  const items=api.C.validateBackup(api.initial).slice(0,2);
  await api.writeStored(items);
  assert.equal(api.C.validateBackup(await api.readStored())[0].image,items[0].image);
  await api.writeStored([]);assert.equal((await api.readStored()).items.length,0);
});
test('failed writes retain the prior state and snapshot',async()=>{
  const {api,context}=harness();const items=api.C.validateBackup(api.initial).slice(0,1);api.configure({mode:'localStorage',items});await api.writeStored(items);
  context.localStorage.setItem=()=>{throw Error('QuotaExceededError');};
  await assert.rejects(api.commit(()=>[]));assert.equal(api.items.length,1);assert.equal((await api.readStored()).items.length,1);
});
test('copy statistics do not schedule publication',async()=>{
  const {api,timers}=harness();api.configure({mode:'localStorage',admin:true,items:api.C.validateBackup(api.initial).slice(0,1)});
  await api.commit(items=>items.map(i=>({...i,copies:i.copies+1})),{content:false});assert.equal(timers.length,0);
  await api.commit(items=>items.map(i=>({...i,title:'Changed'})));assert.equal(timers.filter(t=>t.delay===1200).length,1);
});
test('backup preserves an inaccessible image reference instead of losing the dataset',async()=>{
  const {api}=harness();api.configure({items:api.C.validateBackup(api.initial).slice(0,1)});
  const backup=await api.completeSnapshot();
  assert.equal(api.C.validateBackup(backup).length,1);
  assert.equal(backup.backupWarnings.length,1);
});
test('inline images survive portable backup',async()=>{
  const {api}=harness();const item={...api.initial.items[0],image:'data:image/png;base64,YQ=='};api.configure({items:[item]});
  const backup=await api.completeSnapshot();assert.equal(api.C.validateBackup(backup)[0].image,item.image);
});
test('remote conflict is detected without mutating local content',async()=>{
  const {api,context}=harness();const items=api.C.validateBackup(api.initial).slice(0,1);api.configure({items});
  context.fetch=async()=>({ok:true,json:async()=>({app:'mumu-prompts',version:3,items:[{...items[0],title:'Remote changed'}]})});
  await api.checkPublished();assert.equal(api.conflict,true);assert.equal(api.items[0].title,items[0].title);
});
test('offline mode does not fetch published data',async()=>{
  const {api,context}=harness();let requests=0;context.fetch=async()=>{requests++;throw Error();};api.configure({offline:true});assert.equal(await api.loadPublished(),null);assert.equal(requests,0);
});
test('signed-in admins can fetch published data when the public API-key request fails',async()=>{
  const {api,context}=harness();const items=api.C.validateBackup(api.initial).slice(0,1);let requests=0,auth='';
  api.configure({token:'test-only-token'});
  context.fetch=async(_url,options={})=>{requests++;if(requests===1)return {ok:false,status:403};auth=options.headers.Authorization;return {ok:true,status:200,json:async()=>({app:'mumu-prompts',version:3,items})};};
  const remote=await api.loadPublished();assert.ok(remote.some(item=>item.id===items[0].id));assert.equal(auth,'Bearer test-only-token');
});
test('recovery snapshot retains pre-replacement data',async()=>{
  const {api,saved}=harness();api.configure({mode:'localStorage',items:api.C.validateBackup(api.initial).slice(0,2)});await api.saveRecovery();await api.commit(()=>[],{content:false});assert.equal(JSON.parse(saved.get(api.dbName+'-recovery')).items.length,2);
});
test('startup preserves locally edited data despite newer remote data',async()=>{
  const {api,context}=harness();const items=api.C.validateBackup(api.initial).slice(0,1).map(i=>({...i,title:'Local unpublished edit'}));
  api.configure({mode:'localStorage'});await api.writeStored(items);
  context.fetch=async()=>({ok:true,json:async()=>({app:'mumu-prompts',version:3,items:api.initial.items.slice(0,1)})});
  await api.start();assert.equal(api.items[0].title,'Local unpublished edit');
});
test('startup never reseeds a deliberately empty dataset',async()=>{
  const {api}=harness();api.configure({mode:'localStorage',offline:true});await api.writeStored([]);await api.start();assert.equal(api.items.length,0);
});
test('publication requests execute sequentially',async()=>{
  const {api,context}=harness();api.configure({mode:'localStorage',admin:true,token:'test-only-token',items:api.C.validateBackup(api.initial).slice(0,1)});
  let active=0,max=0,uploads=0;
  context.fetch=async(url,options)=>{
    if(url.includes('/upload/')){uploads++;active++;max=Math.max(max,active);await new Promise(resolve=>setImmediate(resolve));active--;return {ok:true,status:200,json:async()=>({id:'test-file'})};}
    return {ok:true,status:200,json:async()=>({files:[{id:'test-folder'}]})};
  };
  await Promise.all([api.publishToDrive(),api.publishToDrive()]);assert.equal(uploads,2);assert.equal(max,1);
});
test('publication preserves image references in the published payload',async()=>{
  const {api,context}=harness();const item={...api.C.validateBackup(api.initial)[0],image:'drive:test-image-file'};
  api.configure({mode:'localStorage',admin:true,token:'test-only-token',items:[item]});let payload='';
  context.fetch=async(url,options)=>{
    if(url.includes('/upload/')){payload=options.body;return {ok:true,status:200,json:async()=>({id:'test-file'})};}
    return {ok:true,status:200,json:async()=>({files:[{id:'test-folder'}]})};
  };
  await api.publishToDrive();const published=JSON.parse(payload.match(/\r\n\r\n(\{\"app\":\"mumu-prompts\"[\s\S]*\})\r\n--mumu/)[1]);
  assert.equal(published.images[0].src,'drive:test-image-file');
  assert.equal(api.C.validateBackup(published)[0].image,'drive:test-image-file');
});
