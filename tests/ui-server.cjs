// Isolated design preview. No Google requests and no production storage.
// node tests/ui-server.cjs 8093 admin   (or: 8094 public)
'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const port=Number(process.argv[2]||8093),admin=process.argv[3]!=='public';
const nodes=new Map();
const context={window:{},document:{getElementById(id){if(!nodes.has(id))nodes.set(id,{textContent:''});return nodes.get(id);}}};
vm.createContext(context);
vm.runInContext(read('data/seeds.js'),context);
vm.runInContext(read('js/core.js'),context);
const bundled=context.window.PromptCore.validateBackup(JSON.parse(nodes.get('app-data').textContent));
const items=bundled.filter(item=>item.image.startsWith('assets/')).slice(0,12);
if(items.length<4)throw Error('Design fixture needs bundled images');
items.push(...[1,2].map(i=>({...items[0],id:'ui-missing-'+i,title:'이미지 등록 대기 테스트 '+i,image:'',createdAt:i,updatedAt:i})));
const fixture={app:'mumu-prompts',version:3,datasetId:'ui-gallery-fixture-'+(admin?'admin':'public'),offline:true,items,images:[]};
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const relative=pathname==='/'?'index.html':pathname.slice(1);
    // Serve only the app and its assets, never local backups or repository metadata.
    if(!/^(index\.html|tokens\.css|favicon\.svg|(?:js|styles|data|assets|fonts)\/[\w./-]+)$/.test(relative))throw Error('Not found');
    const file=path.resolve(root,relative);
    if(!file.startsWith(root+path.sep)||!fs.statSync(file).isFile())throw Error('Not found');
    let content=fs.readFileSync(file);
    if(relative==='index.html')content=content.toString().replace('<script type="application/json" id="app-data"></script>','<script type="application/json" id="app-data">'+JSON.stringify(fixture).replace(/</g,'\\u003c')+'</script>').replace(/<script[^>]*id="gis-script"[^>]*><\/script>/,'');
    if(relative==='js/app.js'&&!admin)content=content.toString().replace('let isAdmin=!!initial.offline','let isAdmin=false').replace('if(initial.offline){isAdmin=true;return;}','if(initial.offline){isAdmin=false;return;}');
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(content);
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Isolated ${admin?'admin':'public'} preview: http://localhost:${port}`));
