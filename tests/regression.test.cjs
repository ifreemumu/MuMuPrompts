const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
function harness(){
  const nodes=new Map(),saved=new Map(),timers=[];
  function node(id){if(!nodes.has(id))nodes.set(id,{textContent:'',value:'',innerHTML:'',hidden:false,dataset:{},style:{},classList:{toggle(){},add(){},remove(){}},addEventListener(){},setAttribute(){},removeAttribute(){},querySelector(){return node('child');},querySelectorAll(){return [];},append(){},focus(){},showModal(){},close(){}});return nodes.get(id);}
  const document={documentElement:{outerHTML:read('index.html')},getElementById:node,querySelector:s=>node(s.slice(1)),querySelectorAll:()=>[],addEventListener(){},body:{append(){}}};
  const storage={getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)};
  const context={document,window:{addEventListener(){}},structuredClone,crypto:require('node:crypto').webcrypto,console,Blob,TextEncoder,AbortSignal,
    localStorage:storage,sessionStorage:storage,setTimeout:(fn,delay)=>{timers.push({fn,delay});return timers.length;},clearTimeout(){},requestAnimationFrame(){return 1;},cancelAnimationFrame(){},fetch:async()=>{throw Error('Network disabled in tests');}};
  vm.createContext(context);
  vm.runInContext(read('data/seeds.js'),context);
  vm.runInContext(read('js/core.js'),context);
  const exposed=`window.testAPI={C,initial,writeStored,readStored,commit,snapshot,completeSnapshot,saveRecovery,loadPublished,checkPublished,contentKey,publishToDrive,rememberPublished,inlineResources, start,
    configure(options){if(options.items)state.items=options.items;if(options.mode)storageMode=options.mode;if(options.admin!==undefined)isAdmin=options.admin;if(options.offline!==undefined)initial.offline=options.offline;if(options.token)accessToken=options.token;},
    get items(){return state.items;},get conflict(){return remoteConflict;},get dbName(){return dbName;}};`;
  vm.runInContext(read('js/app.js').replace(/      start\(\);\s*\}\)\(\);\s*$/,exposed+'\n})();'),context);
  assert.ok(context.window.testAPI,'App test harness must load');
  return {api:context.window.testAPI,context,saved,timers,nodes};
}
test('all app scripts compile',()=>{for(const file of ['js/app.js','js/core.js','data/seeds.js'])new vm.Script(read(file));});
test('every bundled seed placeholder exists before the loader runs',()=>{
  const html=read('index.html');
  const loader=html.indexOf('id="seed-script"');
  for(const id of Object.keys(JSON.parse(read('data/seeds.js').match(/const seeds=(\{[\s\S]*?\});\nfor\(/)[1]))){
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
test('backup refuses missing image content',async()=>{
  const {api}=harness();api.configure({items:api.C.validateBackup(api.initial).slice(0,1)});
  await assert.rejects(api.completeSnapshot(),/백업하지 못했습니다/);
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
