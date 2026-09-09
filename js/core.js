'use strict';
    window.PromptCore=(()=>{
      const IMAGE_CATEGORIES=['🎨 일러스트·캐릭터','📸 인물·사진','🏞️ 풍경·배경','📦 제품·상품컷','📢 홍보물·포스터','📱 SNS 콘텐츠','💻 UI·웹 화면','🧸 스티커·이모티콘','📊 정보·인포그래픽'];
      const WRITER_CATEGORIES=['긴 글','짧은 글','업무·학교','기타 템플릿'];
      const REMOVED_SAMPLE_IDS=new Set(['demo-cafe-poster','demo-fall-picnic','demo-poodle-character','demo-skincare-product','demo-art-workshop','demo-bookstore-poster','mumu-shop-bakery-open','mumu-shop-bookstore-curation']);
      const CATEGORY_SUBCATEGORIES={'🎨 일러스트·캐릭터':['캐릭터','동화·그림책','수채화·드로잉','장면·컨셉아트'],'📸 인물·사진':['프로필·증명사진','패션·화보','일상 스냅','단체·가족'],'🏞️ 풍경·배경':['자연·계절','도시·여행','건축·공간','배경화면'],'📦 제품·상품컷':['제품 단독컷','음식·메뉴','패키지·목업','상품 진열'],'📢 홍보물·포스터':['매장·업종 홍보','행사·이벤트','카드뉴스·안내문','배너·광고'],'📱 SNS 콘텐츠':['인스타그램','유튜브 썸네일','쓰레드·X','프로필·커버'],'💻 UI·웹 화면':['웹사이트','앱 UI','랜딩페이지','아이콘·로고'],'🧸 스티커·이모티콘':['카카오 이모티콘','스티커·라벨','굿즈·인쇄물'],'📊 정보·인포그래픽':['통계·차트','다이어그램·도해','타임라인·연표','비교·순위표']};
      const CATEGORY_ALIASES={'🎨 일러스트':'🎨 일러스트·캐릭터','장면·배경·아트':'🎨 일러스트·캐릭터','세계·장면':'🎨 일러스트·캐릭터','인물·캐릭터':'🎨 일러스트·캐릭터','사람·캐릭터':'🎨 일러스트·캐릭터','✨ 특수효과':'🎨 일러스트·캐릭터','📸 사진':'📸 인물·사진','🧑 인물':'📸 인물·사진','🏞️ 풍경':'🏞️ 풍경·배경','🏠 공간':'🏞️ 풍경·배경','🖼️ 배경화면':'🏞️ 풍경·배경','📦 제품':'📦 제품·상품컷','제품·상품컷':'📦 제품·상품컷','제품·쇼핑':'📦 제품·상품컷','📢 광고·마케팅':'📢 홍보물·포스터','📰 포스터·카드뉴스':'📢 홍보물·포스터','광고·캠페인':'📢 홍보물·포스터','홍보·이벤트':'📢 홍보물·포스터','매장·업종 홍보':'📢 홍보물·포스터','상점·공간':'📢 홍보물·포스터','정보·인포그래픽':'📊 정보·인포그래픽','정보·정리':'📊 정보·인포그래픽','📰 인포그래픽':'📊 정보·인포그래픽','브랜드·로고':'📢 홍보물·포스터','브랜드·아이덴티티':'📢 홍보물·포스터','📱 SNS':'📱 SNS 콘텐츠','썸네일·SNS':'📱 SNS 콘텐츠','소셜·썸네일':'📱 SNS 콘텐츠','💻 UI·웹':'💻 UI·웹 화면','블로그':'긴 글','SNS·쓰레드':'짧은 글','학교·업무':'업무·학교','기타 글쓰기':'기타 템플릿'};
      const SUBCATEGORY_ALIASES={'동화':'동화·그림책','수채화':'수채화·드로잉','낙서':'수채화·드로잉','3D':'장면·컨셉아트','네온':'장면·컨셉아트','홀로그램':'장면·컨셉아트','글리치':'장면·컨셉아트','인물':'프로필·증명사진','프로필':'프로필·증명사진','포트레이트':'프로필·증명사진','패션':'패션·화보','인물 화보':'패션·화보','자연':'자연·계절','계절':'자연·계절','풍경':'자연·계절','도시':'도시·여행','여행':'도시·여행','인테리어':'건축·공간','사무실':'건축·공간','건축':'건축·공간','PC':'배경화면','iPhone':'배경화면','iPad':'배경화면','Android':'배경화면','제품':'제품 단독컷','제품 광고':'제품 단독컷','음식':'음식·메뉴','패키지':'패키지·목업','목업':'패키지·목업','상품·진열':'상품 진열','카페':'매장·업종 홍보','카페·베이커리':'매장·업종 홍보','서점·문화공간':'매장·업종 홍보','홍보물':'매장·업종 홍보','오픈·이벤트':'행사·이벤트','안내문':'카드뉴스·안내문','인포그래픽':'다이어그램·도해','도해':'다이어그램·도해','차트':'통계·차트','그래프':'통계·차트','통계':'통계·차트','타임라인':'타임라인·연표','연표':'타임라인·연표','비교':'비교·순위표','순위':'비교·순위표','광고 이미지':'배너·광고','배너':'배너·광고','포스터':'','Threads':'쓰레드·X','유튜브':'유튜브 썸네일','카카오톡':'카카오 이모티콘','스티커':'스티커·라벨','굿즈':'굿즈·인쇄물','복원':'보정·복원','제거':'배경 제거·교체','합성':'합성·확장'};
      const normalizeCategory=value=>CATEGORY_ALIASES[value]||value;
      const normalizeSubcategory=value=>SUBCATEGORY_ALIASES[value]!==undefined?SUBCATEGORY_ALIASES[value]:value;
      const uid=()=>typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
      const esc=(value)=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
      function keys(template){return [...new Set(Array.from(template.matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g),m=>m[1].trim()))];}
      const OPTIONAL_FIELD_HINTS=['스타일','색','팔레트','구도','레이아웃','배치','조판','배경','조명','명암','카메라','촬영','각도','크롭','질감','재질','종이','마감','외곽선','선화','채색','타이포','글꼴','폰트','비율','크기','위치','출력','해상도','제외','금지','원치 않는','네거티브','규칙','처리','분위기','무드','여백','장식','그래픽 요소','완성도','점검','형식','방식','기법','옵션','참고','유지','버전','공통','품질','서명','워터마크'];
      const REQUIRED_FIELD_HINTS=['제목','주제','문구','카피','글귀','이름','상호','브랜드','메뉴명','제품명','음식명','음료','내용','설명','가격','주소','전화','문의','영업','기간','날짜','대상','정보','데이터','헤드라인','슬로건','태그라인','캡션','버튼','CTA','라벨','섹션','단계','특징','혜택','성분','목적','장면','핵심','메인','인물','캐릭터','텍스트'];
      const LONG_VALUE_HINT=60;
      function fieldRequired(field){
        if(typeof field?.required==='boolean')return field.required;
        const key=String(field?.key??field?.label??'');
        if(OPTIONAL_FIELD_HINTS.some(hint=>key.includes(hint)))return false;
        if(REQUIRED_FIELD_HINTS.some(hint=>key.includes(hint)))return true;
        return String(field?.value??'').trim().length<=LONG_VALUE_HINT;
      }
      function fieldsFor(template,old=[]){return keys(template).map(key=>{const prev=old.find(f=>f.key===key),field={key,label:key,value:prev?.value??(key==='제외 요소'?old.find(f=>f.key==='원치 않는 요소')?.value:undefined)??''};if(typeof prev?.required==='boolean')field.required=prev.required;return field;});}
      function resolve(template,fields){const values=new Map(fields.map(f=>[f.key,f.value]));return template.replace(/\{\{\s*([^{}]+?)\s*\}\}/g,(original,key)=>values.get(key.trim())||original);}
      const AUTO_FIELD_SKIP=new Set(['사용자 입력','제작 지시','마스터 프롬프트','master prompt','출력 방식','최종 출력','최종 목표','기본 역할','추가 기능','제목 해석 원칙','장면 구성 원칙','한글 표현 규칙','레이아웃 원칙','예시','예를 들어','참고','주의','아래','위의','입력된']);
      const autoAlias=value=>String(value??'').normalize('NFKC').replace(/\s+/g,' ').trim().toLocaleLowerCase('ko');
      function autoKey(value){
        const key=String(value??'').normalize('NFKC').replace(/\{\{|\}\}|\[|\]/g,'').replace(/[*_`#]/g,'').replace(/^\s*(?:(?:[-•]+|[①-⑳]|\d+[.)])\s*)/,'').replace(/^\s*사용자\s*입력\s*/i,'').replace(/\s*[:：]\s*$/,'').replace(/\s+/g,' ').trim();
        if(!key||key.length>100||key.length>40||AUTO_FIELD_SKIP.has(key.toLocaleLowerCase('ko'))||/https?:\/\//i.test(key)||/[.!?。！？=<>]/.test(key)||/(?:하세요|하십시오|합니다|됩니다|않습니다|바랍니다|해야 한다|해야 합니다|할 수 있다|할 수 있습니다)$/.test(key))return '';
        return key;
      }
      function autoSeed(value,key){
        const seed=String(value??'').replace(/^\s*\*\*|\*\*\s*$/g,'').trim();
        if(!seed||autoAlias(seed)===autoAlias(key)||/(?:원하는|희망하는).{0,30}입력|(?:이미지|내용|주제).{0,20}첨부|첨부.{0,20}(?:입력|선택)|입력(?:하거나)?.{0,20}(?:하세요|하십시오)|수정(?:하세요|하십시오)|선택(?:하세요|하십시오)/.test(seed))return '';
        return seed.slice(0,10000);
      }
      function autoFields(source){
        const original=String(source??'').replace(/\r\n?/g,'\n');
        if(!original.trim())return {template:original,fields:[],convertedCount:0,existingCount:0,skipped:0};
        const found=new Map(),aliases=new Map();let skipped=0;
        const add=(rawKey,value='',alias='')=>{
          const key=autoKey(rawKey);if(!key)return '';
          let field=found.get(key);
          if(!field){if(found.size>=40){skipped++;return '';}field={key,label:key,value:''};found.set(key,field);}
          const seed=autoSeed(value,key);if(seed&&!field.value)field.value=seed;
          aliases.set(autoAlias(key),key);if(alias)aliases.set(autoAlias(alias),key);
          return key;
        };
        const existing=keys(original);existing.forEach(key=>add(key));
        const lines=original.split('\n'),contexts=[];let inInputs=false,sawInputs=false;
        const sectionStart=/사용자\s*입력/i,sectionEnd=/^\s*(?:#{1,6}\s*)?(?:(?:[②-⑳]|[2-9]\d*[.)])\s*)?(?:제작\s*지시|master\s*prompt|마스터\s*프롬프트|출력\s*방식|최종\s*출력|기본\s*역할|구성\s*원칙)/i;
        lines.forEach(line=>{if(sectionStart.test(line)){inInputs=true;sawInputs=true;}else if(inInputs&&sectionEnd.test(line))inInputs=false;contexts.push(inInputs);});
        const previousLabel=index=>{for(let i=index-1;i>=0&&i>=index-3;i--){if(!lines[i].trim())continue;return autoKey(lines[i]);}return '';};
        const labelBefore=(before,allowPlain)=>{
          let text=before.replace(/\*+\s*$/,'').trimEnd();
          const colon=Math.max(text.lastIndexOf(':'),text.lastIndexOf('：'));
          if(colon>=0&&!text.slice(colon+1).trim())text=text.slice(0,colon);else if(!allowPlain)return '';
          const spaced=[...text.matchAll(/\s{2,}/g)].pop();if(spaced)text=text.slice(spaced.index+spaced[0].length);
          text=text.slice(Math.max(text.lastIndexOf(']'),text.lastIndexOf('|'),text.lastIndexOf('•'))+1).replace(/^.*?사용자\s*입력\s*/i,'').trim();
          return autoKey(text);
        };
        const bracket=/\*\*\[([^\]\n]{1,1000})\]\*\*|\[([^\]\n]{1,1000})\]/g;
        const convertedLines=lines.map((line,index)=>{
          let out='',cursor=0,match;
          bracket.lastIndex=0;
          while((match=bracket.exec(line))){
            out+=line.slice(cursor,match.index);const inner=(match[1]??match[2]).trim(),after=line.slice(match.index+match[0].length);let key=aliases.get(autoAlias(inner))||'';
            if(/^\s*\(/.test(after)){out+=match[0];cursor=match.index+match[0].length;continue;}
            if(!key&&(contexts[index]||!sawInputs)){
              const before=line.slice(0,match.index);key=labelBefore(before,!after.trim()||/\s{2,}\S[^\n]*$/.test(before));
              if(!key&&!line.slice(0,match.index).replace(/\*+/g,'').trim()&&!after.replace(/\*+/g,'').trim())key=previousLabel(index);
              if(!key&&autoKey(inner)&&!autoSeed(inner,inner))key=autoKey(inner);
            }
            if(key){key=add(key,inner,inner);out+=key?'{{'+key+'}}':match[0];}else out+=match[0];
            cursor=match.index+match[0].length;
          }
          return out+line.slice(cursor);
        });
        const inline=/^(\s*(?:(?:[-*•]|[①-⑳]|\d+[.)])\s*)?)([^:：\n]{1,50})\s*[:：]\s*(.+?)\s*$/;
        const finalLines=convertedLines.map((line,index)=>{
          if(!(contexts[index]||!sawInputs)||line.includes('{{'))return line;
          const match=line.match(inline);if(!match)return line;
          const key=autoKey(match[2]),value=match[3].trim();
          if(!key||!value||/^(?:https?:\/\/|data:)/i.test(value))return line;
          const stored=add(key,value,value);return stored?match[1]+match[2].trim()+': {{'+stored+'}}':line;
        });
        return {template:finalLines.join('\n'),fields:[...found.values()],convertedCount:Math.max(0,found.size-existing.length),existingCount:existing.length,skipped};
      }
      function tags(input){return [...new Set(String(input).split(/[\s,#]+/).filter(Boolean))].slice(0,20);}
      function subcategories(input){return [...new Set(String(input).split(/[,;|]+/).map(v=>v.trim()).filter(Boolean))].slice(0,20);}
      function filter(items,{kind='image',category='전체',subcategory='전체',query='',saved=false,sort='latest',imageMode='all'}={}){
        const words=query.normalize('NFKC').toLocaleLowerCase('ko').trim().split(/\s+/).filter(Boolean).map(w=>w.replace(/^#/,''));
        const matched=items.filter(item=>(saved||item.kind===kind)&&(!saved||item.favorite)&&(imageMode==='all'||(imageMode==='registered'?Boolean(item.image):!item.image))&&(category==='전체'||item.category===category)&&(subcategory==='전체'||item.subcategories.includes(subcategory))&&words.every(w=>[item.title,item.category,item.tool,item.description,item.template,...item.tags,...item.subcategories,...item.fields.map(f=>f.value)].join(' ').normalize('NFKC').toLocaleLowerCase('ko').includes(w)));
        const now=Date.now(),registeredAt=item=>Math.min(Number(item.imageAddedAt)||Number(item.createdAt)||0,now),updatedAt=item=>Math.min(Number(item.updatedAt)||registeredAt(item),now);
        if(sort==='popular')return matched.sort((a,b)=>b.copies-a.copies||registeredAt(b)-registeredAt(a)||updatedAt(b)-updatedAt(a));
        return matched.sort((a,b)=>registeredAt(b)-registeredAt(a)||updatedAt(b)-updatedAt(a)||a.title.localeCompare(b.title,'ko'));
      }
      function validImage(image){return typeof image==='string'&&(image===''||/^drive:[A-Za-z0-9_-]{10,120}$/.test(image)||/^assets\/[A-Za-z0-9._-]{1,120}\.(?:png|jpe?g|webp|gif)$/.test(image)||(image.length<=29*1024*1024&&/^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/.test(image)));}
      function validateItem(item){
        if(!item||typeof item!=='object'||Array.isArray(item))throw Error('올바른 프롬프트 자료가 아닙니다.');
        const string=(key,max,required=false)=>{const v=item[key];if(typeof v!=='string'||v.length>max||(required&&!v.trim()))throw Error('자료의 '+key+' 항목을 확인해주세요.');return v;};
        const id=string('id',180,true),title=string('title',200,true),kind=string('kind',10,true),categoryInput=string('category',80,true),template=string('template',50000,true),description=string('description',3000),tool=string('tool',80);
        const category=normalizeCategory(categoryInput);
        // Repair the known unedited starter record without changing user-edited values.
        if(id==='mumu-curated-window-reader'&&item.updatedAt===1788650060000&&Array.isArray(item.fields)&&!item.fields.some(f=>f.key==='제외 요소'&&f.value)){
          item={...item,fields:[...item.fields.filter(f=>f.key!=='제외 요소'),{key:'제외 요소',value:item.fields.find(f=>f.key==='원치 않는 요소')?.value||'유명인 닮은 얼굴, 읽을 수 있는 책 글자, 로고, 워터마크, 추가 인물'}]};
        }
        const image=typeof item.image==='string'?item.image:'';
        const imageRef=typeof item.imageRef==='string'?item.imageRef:'';
        const ratio=Number.isFinite(item.ratio)&&item.ratio>0&&item.ratio<20?Number(item.ratio):0;
        const subcategories=[...new Set(Array.isArray(item.subcategories)?item.subcategories.filter(v=>typeof v==='string').map(v=>normalizeSubcategory(v.trim())).filter(Boolean):[])].slice(0,20);
        if(subcategories.some(v=>v.length>80))throw Error('하위 메뉴 이름은 80자 이하로 입력해주세요.');
        if(!['image','writer'].includes(kind)||!validImage(image))throw Error('자료 종류 또는 이미지 형식이 올바르지 않습니다.');
        if(!Array.isArray(item.tags)||item.tags.length>20||item.tags.some(t=>typeof t!=='string'||t.length>100))throw Error('해시태그 형식이 올바르지 않습니다.');
        if(!Array.isArray(item.fields)||item.fields.length>40||item.fields.some(f=>!f||typeof f.key!=='string'||f.key.length>100||typeof f.value!=='string'||f.value.length>10000))throw Error('프롬프트 입력칸 형식이 올바르지 않습니다.');
        if(keys(template).length>40||keys(template).some(k=>k.length>100))throw Error('입력칸은 최대 40개, 항목 이름은 최대 100자까지 가능합니다.');
        return {id,title,kind,category,template,description,tool,image,imageRef,ratio,subcategories,tags:item.tags.slice(),fields:fieldsFor(template,item.fields),favorite:item.favorite===true,copies:Number.isSafeInteger(item.copies)&&item.copies>=0?item.copies:0,createdAt:Number.isFinite(item.createdAt)&&item.createdAt>=0?item.createdAt:Date.now(),updatedAt:Number.isFinite(item.updatedAt)&&item.updatedAt>=0?item.updatedAt:Date.now(),imageAddedAt:Number.isFinite(item.imageAddedAt)&&item.imageAddedAt>=0?item.imageAddedAt:0,sample:item.sample===true};
      }
      function validateBackup(data){
        if(!data||!['aikit-local','mumu-prompts'].includes(data.app)||![1,2,3].includes(data.version)||!Array.isArray(data.items)||data.items.length>1000)throw Error('이 앱에서 저장한 JSON 백업을 선택해주세요. 최대 1,000개까지 불러올 수 있습니다.');
        let rawItems=data.items;
        if(data.version>=2){const images=new Map((Array.isArray(data.images)?data.images:[]).map(asset=>[asset.id,typeof asset.src==='string'?asset.src:typeof asset.data==='string'?asset.data:'']));rawItems=rawItems.map(item=>({...item,image:typeof item.image==='string'?item.image:images.get(item.id)||''}));}
        const items=rawItems.map(validateItem);if(new Set(items.map(i=>i.id)).size!==items.length)throw Error('중복된 자료 ID가 있어 불러올 수 없습니다.');return items;
      }
      function merge(current,incoming){const result=current.map(i=>structuredClone(i));let added=0,skipped=0;for(const item of incoming){const old=result.find(i=>i.id===item.id);if(old&&JSON.stringify(old)===JSON.stringify(item)){skipped++;continue;}result.push({...structuredClone(item),id:old?uid():item.id});added++;}if(result.length>1000)throw Error('합친 자료가 1,000개를 넘습니다. 일부 자료를 정리해주세요.');return {items:result,added,skipped};}
      function safeJSON(data){return JSON.stringify(data).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');}
      return {IMAGE_CATEGORIES,WRITER_CATEGORIES,CATEGORY_SUBCATEGORIES,normalizeCategory,normalizeSubcategory,uid,esc,keys,fieldsFor,fieldRequired,resolve,autoFields,tags,subcategories,filter,validImage,validateItem,validateBackup,merge,safeJSON};
    })();
