// Disposable offline UI fixture; never connects to Google or production storage.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const item={id:'test-only-prompt',title:'회귀 검사 프롬프트',kind:'image',category:'🎨 일러스트·캐릭터',description:'저장·삭제·복원 검증용 자료',tool:'테스트',template:'{{주제}}를 그려주세요.',fields:[{key:'주제',value:'고양이'}],tags:[],subcategories:[],image:'',createdAt:1,updatedAt:1};
let html=read('index.html').replace('<script type="application/json" id="app-data"></script>','<script type="application/json" id="app-data">'+JSON.stringify({app:'mumu-prompts',version:3,datasetId:'disposable-browser-test-v1',offline:true,items:[item],images:[]})+'</script>');
html=html.replace(/<script[^>]*id="gis-script"[^>]*><\/script>/,'');
html=html.replace(/<script id="([^"]+)" src="([^"]+)"><\/script>/g,(_,id,src)=>'<script id="'+id+'">'+read(src).replace(/<\/script/gi,'<\\/script')+'</script>');
html=html.replace(/<link rel="stylesheet" href="([^"]+)">/g,(_,src)=>'<style>'+read(src).replace(/@font-face\s*\{[^}]*\}/g,'')+'</style>');
const port=Number(process.argv[2]||8088);
http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(html);}).listen(port,'127.0.0.1',()=>console.log('Disposable offline test: http://localhost:'+port));
