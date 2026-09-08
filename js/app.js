'use strict';
    (()=>{
      const posterSeedTag=document.getElementById('prompt-photo-3d-poster-seeds');
      const appDataTag=document.getElementById('app-data');
      const humanPeople={
        'mumu-poster-3d-new-product-launch':{image:'assets/mumu-poster-3d-new-product-launch-v3.png',person:'창가 옆 작은 테이블에서 감귤 탄산차 병을 소개하는 한국인 성인 카페 직원 1명. 은은한 앰버색 앞치마를 입은 따뜻한 3D 애니메이션풍의 오리지널 인물',copy:{'메인 제목':'햇살을 닮은 한 잔','보조 제목':'감귤 탄산차, 오늘 출시','날짜·기간':'2026-09-08 출시','혜택·안내':'출시 기념 1,000원 할인','하단 문구':'매장 한정 · 재료 소진 시 마감'}},
        'mumu-poster-3d-store-opening':{image:'assets/mumu-poster-3d-store-opening-v3.png',person:'갓 구운 빵 바구니를 든 한국인 성인 제빵사 1명. 테라코타와 크림색 작업복을 입은 따뜻한 3D 애니메이션풍의 오리지널 인물',copy:{'메인 제목':'우리 동네, 오늘 첫 굽기','보조 제목':'새로운 베이커리가 문을 엽니다','날짜·기간':'2026-09-20 오픈','혜택·안내':'오픈 3일간 식빵 1개 증정','하단 문구':'오전 8시부터 · 매장 방문 고객 대상'}},
        'mumu-poster-3d-product-promo':{image:'assets/mumu-poster-3d-product-promo-v3.png',person:'세럼 병을 편안하게 소개하는 한국인 성인 뷰티 상담사 1명. 모스그린 니트를 입은 따뜻한 3D 애니메이션풍의 오리지널 인물',copy:{'메인 제목':'매일 한 방울, 맑은 휴식','보조 제목':'가볍게 스며드는 데일리 보습 세럼','날짜·기간':'2026-09-08 ~ 2026-09-14','혜택·안내':'첫 구매 20% 할인','하단 문구':'민감한 피부는 사용 전 확인하세요'}},
        'mumu-poster-3d-business-opening':{image:'assets/mumu-poster-3d-business-opening-v3.png',person:'버건디 리본으로 작은 꽃다발을 묶는 한국인 성인 플로리스트 1명. 질감 있는 니트 조끼를 입은 따뜻한 3D 애니메이션풍의 오리지널 인물',copy:{'메인 제목':'꽃으로 전하는 첫 인사','보조 제목':'우리 동네 작은 꽃가게가 문을 엽니다','날짜·기간':'2026-09-27 개업','혜택·안내':'방문 고객 미니 꽃다발 증정','하단 문구':'수량 한정 · 재료 소진 시 마감'}}
      };
      const seedItems=JSON.parse(posterSeedTag.textContent).map(item=>{
        const update=humanPeople[item.id];
        if(!update)return item;
        return {...item,image:update.image,description:item.description.replace('3D 캐릭터','따뜻한 3D 애니메이션풍 인물'),template:item.template.replaceAll('{{3D 캐릭터}}','{{3D 인물}}').replaceAll('3D 캐릭터','3D 인물'),fields:item.fields.map(field=>field.key==='3D 캐릭터'?{...field,key:'3D 인물',label:'3D 인물',value:update.person}:(update.copy[field.key]?{...field,value:update.copy[field.key]}:field))};
      });
      posterSeedTag.textContent=JSON.stringify(seedItems);
      const infoPosterTemplate='{{목적}}에 사용할 완전히 새로운 2:3 세로형 한글 정보 포스터 한 장을 제작한다.\n\n[실사 장면]\n{{실사 장면}}\n실제 인물과 공간의 자연스러운 표정, 재질과 빛을 살린 고품질 상업·다큐멘터리 사진 스타일로 표현한다.\n\n[이미지에 넣을 문구]\n메인 제목: "{{메인 제목}}"\n보조 문구: "{{보조 문구}}"\n핵심 안내 3개: {{핵심 안내 3개}}\n행동 버튼: "{{행동 버튼}}"\n\n[레이아웃]\n{{레이아웃}}\n제목은 크고 굵은 한글로, 핵심 안내 3개는 서로 다른 단순 선 아이콘과 함께 정돈한다. 작은 화면에서도 정보 순서가 즉시 보이도록 충분한 여백과 명확한 대비를 사용한다.\n\n색상: {{색상}}\n\n[독창성과 글자 규칙]\n- 참고 이미지는 실사 사진과 큰 한글 제목, 짧은 정보 구조를 결합하는 일반 원리만 참고한다. 참고 이미지의 인물, 배치, 곡선, 카드 모양, 색상, 문구, 화면 분할과 고유 구도를 복제하거나 모방하지 않는다.\n- 위 문구만 입력한 한글과 띄어쓰기 그대로 각각 정확히 한 번 표기한다. 지정하지 않은 문구, 임의의 영문, 의미 없는 문자와 가짜 로고는 넣지 않는다.\n- 기존 브랜드, 기관 로고, 워터마크, 일러스트 인물, 3D 캐릭터, 과도한 장식과 읽기 어려운 작은 글자를 넣지 않는다.';
      const infoPosterSeeds=JSON.parse(document.getElementById('prompt-photoreal-info-poster-seeds').textContent).map((item,index)=>({...item,category:'📢 홍보물·포스터',description:item.purpose+'을 위해 실사 장면과 큰 한글 제목, 핵심 안내 3개를 독창적으로 결합한 예시입니다.',template:infoPosterTemplate,fields:[{key:'목적',label:'목적',value:item.purpose,required:true},{key:'메인 제목',label:'메인 제목',value:item.mainTitle,required:true},{key:'보조 문구',label:'보조 문구',value:item.subtitle,required:true},{key:'핵심 안내 3개',label:'핵심 안내 3개',value:item.points,required:true},{key:'행동 버튼',label:'행동 버튼',value:item.cta,required:true},{key:'실사 장면',label:'실사 장면',value:item.scene,required:false},{key:'레이아웃',label:'레이아웃',value:item.layout,required:false},{key:'색상',label:'색상',value:item.palette,required:false}],kind:'image',tool:'도구 자유 선택',favorite:false,copies:0,createdAt:1788845180000+index*60000,updatedAt:1788845180000+index*60000,sample:false,subcategories:[item.subcategory,'실사 정보 포스터'],imageRef:'',ratio:0.6667}));
      const bookCoverStyleTemplate='{{책 분야}} 분야의 2:3 세로형 한국어 책 앞표지 한 장을 완전히 새롭게 제작한다. 책 목업, 책등과 뒷표지 없이 정면의 평면 표지만 만든다.\n\n[표지 문구]\n시리즈: "{{시리즈명}}"\n책 제목: "{{책 제목}}"\n부제: "{{부제}}"\n설명 문구: "{{설명 문구}}"\n저자: "{{저자명}}"\n설명 문구가 "없음"이면 해당 문구 영역을 표지에서 생략한다.\n\n[시각 스타일]\n{{표지 스타일}}\n핵심 상징: {{핵심 상징}}\n레이아웃: {{레이아웃}}\n색상: {{색상}}\n재료와 질감: {{재료·질감}}\n\n[편집 원칙]\n책 제목을 가장 크고 강하게, 부제와 설명 문구는 명확한 읽기 순서로, 저자는 충분한 여백 속에 배치한다. 작은 썸네일에서도 제목을 알아볼 수 있어야 하며 모든 요소는 책의 분야와 독자를 자연스럽게 드러내야 한다.\n\n[글자와 독창성 절대 규칙]\n- 위 문구만 입력된 한글·영문·숫자·띄어쓰기 그대로 각각 정확히 한 번 표기한다. 지정하지 않은 문구, 가짜 출판사와 로고를 넣지 않는다.\n- 참고 표지는 강한 제목 위계, 여백과 중심 상징이라는 일반 원리만 참고한다. 참고 이미지의 제목, 브랜드, 동물, 인물, 배지, 글꼴 처리, 선 위치, 화면 분할과 고유 구도를 복제하거나 가깝게 모방하지 않는다.\n- 워터마크, 오탈자, 추가 문구, 책 목업, 책등, 3D와 광택 효과를 넣지 않는다.\n\n출력 조건: 고해상도 출판용 2:3 앞표지 이미지, 한글이 크고 선명한 완성본.';
      const bookCoverStyleSeeds=JSON.parse(document.getElementById('prompt-book-cover-style-seeds').textContent).map((item,index)=>({...item,category:'📢 홍보물·포스터',description:item.style+'로 만드는 독창적인 한국어 책 표지 예시입니다.',template:bookCoverStyleTemplate,fields:[{key:'책 분야',label:'책 분야',value:item.field,required:true},{key:'책 제목',label:'책 제목',value:item.bookTitle,required:true},{key:'부제',label:'부제',value:item.subtitle,required:true},{key:'설명 문구',label:'설명 문구',value:item.support,required:false},{key:'저자명',label:'저자명',value:item.author,required:true},{key:'시리즈명',label:'시리즈명',value:item.series,required:false},{key:'표지 스타일',label:'표지 스타일',value:item.style,required:false},{key:'핵심 상징',label:'핵심 상징',value:item.symbol,required:false},{key:'레이아웃',label:'레이아웃',value:item.layout,required:false},{key:'색상',label:'색상',value:item.palette,required:false},{key:'재료·질감',label:'재료·질감',value:item.texture,required:false}],kind:'image',tool:'도구 자유 선택',favorite:false,copies:0,createdAt:1788845540000+index*60000,updatedAt:1788845540000+index*60000,sample:false,subcategories:['책 표지','에디토리얼 포스터'],imageRef:'',ratio:0.6667}));
      const risoPhotoMemorySeeds=JSON.parse(document.getElementById('prompt-riso-photo-memory-seeds').textContent).map(item=>({...item,createdAt:1788850600000,updatedAt:1788850600000}));
      const appData=JSON.parse(appDataTag.textContent);appData.seedVersion=Math.max(Number(appData.seedVersion)||1,17);appData.items=[...(appData.items||[]),...JSON.parse(document.getElementById('prompt-crayon-emotion9-seeds').textContent),...JSON.parse(document.getElementById('prompt-bauhaus-one-input-seeds').textContent),...JSON.parse(document.getElementById('prompt-flat-planar-editorial-seeds').textContent),...JSON.parse(document.getElementById('prompt-book-cover-seeds').textContent),...risoPhotoMemorySeeds,...bookCoverStyleSeeds,...infoPosterSeeds].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index);appDataTag.textContent=JSON.stringify(appData);
    })();
    'use strict';
    (()=>{
      const C=window.PromptCore,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],e=C.esc;
      const originalHTML='<!doctype html>\n'+document.documentElement.outerHTML;
      const emotion24Template='첨부한 {{첨부 이미지}}를 기준으로 {{주제}} 카카오톡 감정 표현 이모티콘 24종 시트 한 장을 제작한다.\n\n[인물 절대 규칙]\n- 등장 인물은 {{등장 인물}}만 사용한다. 남성과 여성을 한 시트에 섞지 않는다.\n- 첨부 이미지의 얼굴 인상, 머리 모양, 안경, 의상 색과 알아볼 수 있는 특징을 유지하되 사진을 그대로 복제하지 않고 캐릭터로 재해석한다.\n- 이미지가 여러 장이면 합치지 말고 한 사람당 24종 시트를 별도 파일로 만든다.\n\n[24개 문구]\n{{24개 문구}}\n\n[장면과 감정]\n{{장면·행동}}\n각 칸의 표정, 몸짓과 소품은 해당 문구의 뜻이 한눈에 느껴지도록 모두 다르게 만든다.\n\n[스타일]\n그림 스타일: {{그림 스타일}}\n텍스트 스타일: {{텍스트 스타일}}\n색감: {{색감}}\n\n[구성과 글자 규칙]\n구도: {{구도}}\n배경·외곽선: {{배경·외곽선}}\n- 24개 문구를 입력 순서대로 각각 정확히 한 번만 표기한다.\n- 한글·영문·숫자·기호와 띄어쓰기를 사용자가 입력한 그대로 유지한다.\n- 지정하지 않은 문구와 의미 없는 글자를 넣지 않는다.\n\n출력 조건: {{출력 조건}}\n원치 않는 요소: {{제외 요소}}';
      const emotion24Seeds=JSON.parse($('#prompt-emotion24-topic-seeds').textContent).map((item,index)=>({...item,category:'🧸 스티커·이모티콘',template:emotion24Template,fields:[{key:'첨부 이미지',label:'첨부 이미지',value:item.reference,required:true},{key:'등장 인물',label:'등장 인물',value:item.gender,required:true},{key:'주제',label:'주제',value:item.topic,required:true},{key:'24개 문구',label:'24개 문구',value:item.captions,required:true},{key:'장면·행동',label:'장면·행동',value:'각 문구의 의미에 맞는 서로 다른 표정, 전신 몸짓과 작은 소품을 자동 구성한다',required:false},{key:'그림 스타일',label:'그림 스타일',value:item.style,required:false},{key:'텍스트 스타일',label:'텍스트 스타일',value:item.textStyle,required:false},{key:'색감',label:'색감',value:item.palette,required:false},{key:'구도',label:'구도',value:'1:1 정사각형 캔버스, 4열×6행의 균일한 그리드, 정확히 24칸, 왼쪽 위부터 문구 순서대로 배치',required:false},{key:'배경·외곽선',label:'배경·외곽선',value:'밝고 깨끗한 배경, 칸 구분은 옅게, 캐릭터와 글자에는 메신저에서 잘 보이는 흰 스티커 외곽선',required:false},{key:'출력 조건',label:'출력 조건',value:'1:1 정사각형 고해상도 PNG, 정확히 24개, 작은 채팅 화면에서도 표정과 글자가 선명하게 보이도록 제작',required:false},{key:'제외 요소',label:'제외 요소',value:'남녀 혼합, 한 칸에 여러 사람, 24개보다 많거나 적은 구성, 중복 문구, 중복 자세, 오탈자, 지정하지 않은 문구, 카카오 로고, 기존 캐릭터, 브랜드 요소, 워터마크',required:false}],kind:'image',tool:'도구 자유 선택',favorite:false,copies:0,createdAt:1788844000000+index*60000,updatedAt:1788844000000+index*60000,sample:false,subcategories:['카카오 이모티콘','감정 표현 24세트'],imageRef:'',ratio:1}));
      const seedData=JSON.parse($('#app-data').textContent);if(!seedData.offline)seedData.items=seedData.items.filter(item=>!item.id.startsWith('demo-')&&!item.id.startsWith('mumu-shop-'));const themedStampTemplate='{{주제}}에 어울리는 텍스트 포함 카카오톡 이모티콘 16종 시트를 만들어주세요.\n기준 캐릭터: {{기준 캐릭터}}\n16개 문구: {{16개 문구}}\n장면·행동: {{장면·행동}}\n스타일: {{스타일}}\n텍스트 스타일: {{텍스트 스타일}}\n색감: {{색감}}\n구도: {{구도}}\n배경·외곽선: {{배경·외곽선}}\n출력 조건: {{출력 조건}}\n원치 않는 요소: {{제외 요소}}';const themedStampSeeds=JSON.parse($('#prompt-kakao-theme-seeds').textContent).map((item,index)=>({...item,category:'🧸 스티커·이모티콘',template:themedStampTemplate,fields:[{key:'주제',label:'주제',value:item.theme},{key:'기준 캐릭터',label:'기준 캐릭터',value:item.character},{key:'16개 문구',label:'16개 문구',value:item.captions},{key:'장면·행동',label:'장면·행동',value:item.actions},{key:'스타일',label:'스타일',value:'둥근 비율의 귀여운 오리지널 치비 캐릭터, 세련된 손그림 디지털 일러스트, 표정과 몸짓이 크고 명확한 메신저 이모티콘 스타일'},{key:'텍스트 스타일',label:'텍스트 스타일',value:'각 칸 아래에 지정된 한국어 문구 하나를 크고 둥글게 정확히 표기하고, 두꺼운 흰색 테두리와 문구별 포인트 컬러 그림자를 적용한다'},{key:'색감',label:'색감',value:item.palette},{key:'구도',label:'구도',value:'정사각형 캔버스의 4×4 균일 그리드, 정확히 16칸에 왼쪽 위부터 문구 순서대로 캐릭터 한 장면과 문구 하나씩 배치한다'},{key:'배경·외곽선',label:'배경·외곽선',value:'깨끗한 흰색 배경과 연한 회색 둥근 칸 구분, 캐릭터와 글자 주변에 두꺼운 흰색 스티커 외곽선과 얇은 컬러 키라인을 넣는다'},{key:'출력 조건',label:'출력 조건',value:'1:1 정사각형 고해상도, 16개 문구 모두 포함, 작은 채팅 화면에서도 표정과 한글이 선명하게 보이도록 제작'},{key:'제외 요소',label:'제외 요소',value:'카카오 로고, 기존 카카오 캐릭터, 브랜드 요소, 워터마크, 실존 인물, 지정하지 않은 문구, 오탈자, 중복 장면, 16개를 넘거나 모자라는 구성'}],kind:'image',tool:'도구 자유 선택',favorite:false,copies:0,createdAt:1788653000000+index*60000,updatedAt:1788653000000+index*60000,sample:false,subcategories:['카카오 이모티콘','스티커·라벨'],imageRef:'',ratio:1}));const seedItems=[...JSON.parse($('#prompt-seeds').textContent),...JSON.parse($('#prompt-text-seeds').textContent),...JSON.parse($('#prompt-poster-seeds').textContent),...JSON.parse($('#prompt-stamp-seeds').textContent),...JSON.parse($('#prompt-stamp-text-seeds').textContent),...JSON.parse($('#prompt-logo-seeds').textContent),...JSON.parse($('#prompt-ink-seeds').textContent),...JSON.parse($('#prompt-portrait-seeds').textContent),...JSON.parse($('#prompt-cartoon-seeds').textContent),...JSON.parse($('#prompt-sticker-sheet-seeds').textContent),...JSON.parse($('#prompt-watercolor-poster-seeds').textContent),...JSON.parse($('#prompt-warm-clean-digital-seeds').textContent),...JSON.parse($('#prompt-clear-transparent-watercolor-seeds').textContent),...JSON.parse($('#prompt-card-seeds').textContent),...themedStampSeeds];const initial={...seedData,items:[...seedData.items,...seedItems].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index)};
      const schoolInfographicTemplate='대한민국 초등학교에서 사용할 4:5 세로형 정보·인포그래픽 한 장을 제작한다.\\n\\n[기본 정보]\\n사용 목적: {{사용 목적}}\\n대상: {{대상}}\\n메인 제목: "{{메인 제목}}"\\n보조 문구: "{{보조 문구}}"\\n핵심 정보: {{핵심 정보}}\\n예시 날짜·시간: "{{날짜·시간}}"\\n장소: "{{장소}}"\\n기관명: "{{기관명}}"\\n\\n[시각 구성]\\n구도·레이아웃: {{구도·레이아웃}}\\n아이콘·도형: {{아이콘·도형}}\\n색감·분위기: {{색감·분위기}}\\n\\n[텍스트 규칙]\\n- 메인 제목, 보조 문구, 핵심 정보, 날짜·시간, 장소, 기관명은 입력한 한글·숫자·기호와 띄어쓰기를 그대로 각각 정확히 한 번만 표기한다.\\n- 핵심 정보의 번호와 순서를 유지하고 각 단계가 한눈에 구분되게 한다.\\n- 지정하지 않은 문구, 랜덤 글자, 가짜 로고, QR 코드, 워터마크를 넣지 않는다.\\n- 글자는 작게 뭉개지지 않도록 충분히 크게 배치한다.\\n\\n글꼴: {{글꼴}}\\n글꼴 절대 규칙: SIL Open Font License 등 자유 이용이 확인된 오픈 라이선스 한글 글꼴만 사용한다. 유료 상업용 폰트와 라이선스가 불분명한 폰트는 절대 사용하지 않는다.\\n\\n출력 조건: {{출력 조건}}\\n원치 않는 요소: {{제외 요소}}';
      const schoolInfographicSeeds=JSON.parse($('#prompt-school-info-infographic-seeds').textContent).map(({values,...item})=>({...item,category:'📊 정보·인포그래픽',template:schoolInfographicTemplate,fields:Object.entries(values).map(([key,value])=>({key,label:key,value,required:['사용 목적','대상','메인 제목','보조 문구','핵심 정보','날짜·시간','장소','기관명'].includes(key)})),kind:'image',tool:'도구 자유 선택',favorite:false,copies:0,sample:false,subcategories:[item.subcategory],imageRef:'',ratio:0.8}));
      schoolInfographicSeeds.forEach(item=>{item.template=item.template.replaceAll('4:5','2:3');item.fields.forEach(field=>{field.value=field.value.replaceAll('4:5','2:3')});item.ratio=0.6667});
      initial.items=[...initial.items,...schoolInfographicSeeds].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index);
      const educationPosterTemplate='대한민국 초등학교에서 사용할 {{목적}} 포스터 이미지 한 장을 제작한다.\n\n화면 비율: {{화면 비율}}\n핵심 장면: {{핵심 장면}}\n구도·레이아웃: {{구도·레이아웃}}\n스타일: {{스타일}}\n색감·분위기: {{색감·분위기}}\n\n[이미지에 넣을 문구]\n메인 제목: "{{메인 제목}}"\n보조 제목: "{{보조 제목}}"\n날짜·시간: "{{날짜·시간}}"\n장소: "{{장소}}"\n핵심 안내: "{{핵심 안내}}"\n추가 안내: "{{추가 안내}}"\n기관명: "{{기관명}}"\n\n[텍스트 절대 규칙]\n- 위 문구는 입력한 한글·숫자·기호를 한 글자도 바꾸지 말고 각각 정확히 한 번만 표기한다.\n- 추가 안내 값이 "없음"이면 "없음"이라는 글자까지 포함해 추가 안내 전체를 이미지에서 생략한다.\n- 지정하지 않은 문구, 임의의 영문, 의미 없는 글자, 가짜 로고를 넣지 않는다.\n- 날짜는 연도-월-일 형식을 그대로 유지한다.\n\n글꼴: {{글꼴}}\n글꼴 절대 규칙: SIL Open Font License 등 자유 이용이 확인된 오픈 라이선스 한글 글꼴만 사용한다. 유료 상업용 폰트와 라이선스가 불분명한 폰트는 절대 사용하지 않는다.\n\n출력 조건: {{출력 조건}}\n원치 않는 요소: {{제외 요소}}';
      const educationPosterSeeds=JSON.parse($('#prompt-education-poster-seeds').textContent).map((item,index)=>({...item,category:'📢 홍보물·포스터',template:educationPosterTemplate,fields:[{key:'목적',label:'목적',value:item.purpose,required:true},{key:'화면 비율',label:'화면 비율',value:item.ratioLabel,required:false},{key:'메인 제목',label:'메인 제목',value:item.mainTitle,required:true},{key:'보조 제목',label:'보조 제목',value:item.subTitle,required:true},{key:'날짜·시간',label:'날짜·시간',value:item.dateTime,required:true},{key:'장소',label:'장소',value:item.place,required:true},{key:'핵심 안내',label:'핵심 안내',value:item.details,required:true},{key:'추가 안내',label:'추가 안내',value:item.extra,required:false},{key:'기관명',label:'기관명',value:item.organization,required:true},{key:'핵심 장면',label:'핵심 장면',value:item.scene,required:true},{key:'구도·레이아웃',label:'구도·레이아웃',value:item.layout,required:false},{key:'스타일',label:'스타일',value:item.style,required:false},{key:'색감·분위기',label:'색감·분위기',value:item.palette,required:false},{key:'글꼴',label:'글꼴',value:item.font,required:false},{key:'출력 조건',label:'출력 조건',value:item.output,required:false},{key:'제외 요소',label:'제외 요소',value:item.avoid,required:false}],kind:'image',tool:'도구 자유 선택',favorite:false,copies:0,createdAt:1788835200000+index*60000,updatedAt:1788835200000+index*60000,sample:false,imageRef:''}));
      initial.items=[...initial.items,...educationPosterSeeds].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index);
      initial.items=[...initial.items,...emotion24Seeds].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index);
      initial.items=[...initial.items,...JSON.parse($('#prompt-doodle-ad-seeds').textContent)].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index);
      initial.items=[...initial.items,...JSON.parse($('#prompt-concept-doodle-seeds').textContent)].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index);
      initial.items=[...initial.items,...JSON.parse($('#prompt-kawaii-sticker-seeds').textContent)].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index);
     initial.items=[...initial.items,...JSON.parse($('#prompt-blue-ballpoint-seeds').textContent)].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index);
      initial.items=[...initial.items,...JSON.parse($('#prompt-split-photo-poster-seeds').textContent)].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index);
      initial.items=[...initial.items,...JSON.parse($('#prompt-photo-3d-poster-seeds').textContent)].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index);
      const minimalLineBase=JSON.parse($('#prompt-minimal-line-story-seeds').textContent)[0];
      const minimalLineVariants=JSON.parse($('#prompt-minimal-line-story-variant-seeds').textContent).map(({values,...item})=>({...minimalLineBase,...item,fields:minimalLineBase.fields.map(field=>({...field,value:values[field.key]??field.value}))}));
      initial.items=[...initial.items,minimalLineBase,...minimalLineVariants].filter((item,index,all)=>all.findIndex(candidate=>candidate.id===item.id)===index);
      if(initial.offline)initial.items=seedData.items;
     const dbName='mumu-prompts-'+String(initial.datasetId||'default'),legacyDbName='aikit-local-'+String(initial.datasetId||'default');
      const iconPaths={search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',plus:'<path d="M12 5v14M5 12h14"/>',x:'<path d="m6 6 12 12M18 6 6 18"/>',lock:'<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',bookmark:'<path d="M6 4h12v17l-6-4-6 4z"/>',download:'<path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/>',image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 6-6 4 4 3-3 5 5"/>',copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M15 8V3H3v13h5"/>',arrow:'<path d="m10 5-7 7 7 7M3 12h18"/>',file:'<path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6"/>',check:'<path d="m5 12 4 4L20 5"/>'};
      const icon=name=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+(iconPaths[name]||iconPaths.file)+'</svg>';
      function icons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));}
      icons();$('#search-icon').innerHTML=icon('search');$('#clear-search').innerHTML=icon('x');
            let state={items:[]},filter={kind:'image',category:'전체',query:'',subcategory:'전체',saved:false,sort:'latest',imageMode:'registered'},db=null,storageMode='memory',active=null,editorItem=null,uploadImage='',editorDirty=false,toastTimer,commitQueue=Promise.resolve(),confirmResolve=null;
      const clone=x=>structuredClone(x);
      function toast(message){const host=$$('dialog[open]').at(-1)||document.body;host.append($('#toast'));$('#toast').textContent=message;$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').hidden=true,4000);}
      function storageError(error){console.error('Local storage error:',error?.name||'Error');toast('저장하지 못했습니다. 입력 내용은 유지됩니다. 백업으로 자료를 보관해주세요.');}
      function splitData(items){const images=items.filter(item=>item.image).map(item=>({id:item.id,src:item.image,contentType:(item.image.match(/^data:(image\/[^;]+);/)||[])[1]||'image/*',updatedAt:item.updatedAt}));const textItems=items.map(item=>{const {image,...text}=item;return {...text,imageRef:image?'images/'+item.id:''};});return {items:textItems,images};}
      const snapshot=()=>{const data=splitData(state.items);return {app:'mumu-prompts',version:3,datasetId:initial.datasetId,exportedAt:new Date().toISOString(),items:data.items,images:data.images};};
      function openDatabase(name){return new Promise((resolve,reject)=>{const req=indexedDB.open(name,3);req.onupgradeneeded=()=>{const d=req.result;if(!d.objectStoreNames.contains('meta'))d.createObjectStore('meta');if(!d.objectStoreNames.contains('items'))d.createObjectStore('items',{keyPath:'id'});if(!d.objectStoreNames.contains('images'))d.createObjectStore('images',{keyPath:'id'});};req.onerror=()=>reject(req.error);req.onblocked=()=>reject(Error('저장소 사용 중'));req.onsuccess=()=>resolve(req.result);});}
      async function initStorage(){
        try{db=await openDatabase(dbName);storageMode='indexedDB';}
        catch{try{localStorage.setItem(dbName+'-check','1');localStorage.removeItem(dbName+'-check');storageMode='localStorage';}catch{storageMode='memory';}}
      }
      async function readIndexedData(){const t=db.transaction(['items','images'],'readonly');const read=store=>new Promise((resolve,reject)=>{const r=t.objectStore(store).getAll();r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});const [items,images]=await Promise.all([read('items'),read('images')]);const initialized=await new Promise((resolve,reject)=>{const r=db.transaction('meta').objectStore('meta').get('initialized');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});return items.length||initialized?{app:'mumu-prompts',version:3,datasetId:initial.datasetId,items,images}:undefined;}
      async function readLegacyIndexedData(){if(legacyDbName===dbName)return;try{const legacy=await new Promise((resolve,reject)=>{const req=indexedDB.open(legacyDbName);req.onerror=()=>reject(req.error);req.onsuccess=()=>resolve(req.result);});if(!legacy.objectStoreNames.contains('store')){legacy.close();return;}const value=await new Promise((resolve,reject)=>{const t=legacy.transaction('store','readonly');const r=t.objectStore('store').get('data');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});legacy.close();return value;}catch{return undefined;}}
      async function readStored(){if(storageMode==='indexedDB'){const current=await readIndexedData();return current||await readLegacyIndexedData();}if(storageMode==='localStorage'){const atomic=localStorage.getItem(dbName+'-snapshot');if(atomic)return JSON.parse(atomic);const textRaw=localStorage.getItem(dbName+'-items');if(textRaw){const imageRaw=localStorage.getItem(dbName+'-images');return {...JSON.parse(textRaw),app:'mumu-prompts',version:3,images:imageRaw?JSON.parse(imageRaw):[]};}const legacyRaw=localStorage.getItem(legacyDbName);return legacyRaw?JSON.parse(legacyRaw):undefined;}}
      async function writeStored(items){const data=splitData(items),value={app:'mumu-prompts',version:3,datasetId:initial.datasetId,items:data.items,images:data.images};if(storageMode==='indexedDB')return new Promise((resolve,reject)=>{const t=db.transaction(['items','images','meta'],'readwrite');t.oncomplete=resolve;t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error||Error('저장 취소'));t.objectStore('meta').put(true,'initialized');const itemStore=t.objectStore('items'),imageStore=t.objectStore('images');itemStore.clear();imageStore.clear();data.items.forEach(item=>itemStore.put(item));data.images.forEach(asset=>imageStore.put(asset));});if(storageMode==='localStorage'){localStorage.setItem(dbName+'-snapshot',JSON.stringify(value));}}
      function commit(change,{content=true}={}){const task=commitQueue.catch(()=>{}).then(async()=>{const next=change(clone(state.items));await writeStored(next);state.items=next;if(content){render();schedulePublish();}return next;});commitQueue=task;return task;}
      async function confirmAction(message,label='확인',title='변경 확인'){$('#confirm-title').textContent=title;$('#confirm-message').textContent=message;$('#confirm-yes').textContent=label;$('#confirm').showModal();$('#confirm-no').focus();return new Promise(resolve=>confirmResolve=resolve);}
      function finishConfirm(ok){$('#confirm').close();const r=confirmResolve;confirmResolve=null;r?.(ok);}
      $('#confirm-yes').addEventListener('click',()=>finishConfirm(true));$('#confirm-no').addEventListener('click',()=>finishConfirm(false));$('#confirm').addEventListener('cancel',event=>{event.preventDefault();finishConfirm(false);});
      let menuSignature='';
      function render(){
        $('#backup-stats').textContent='전체 '+state.items.length+'개 · 저장한 자료 '+state.items.filter(i=>i.favorite).length+'개';
        const imageMode=isAdmin&&filter.imageMode==='missing'?'missing':'registered';
        if(filter.imageMode!==imageMode)filter.imageMode=imageMode;
        const source=state.items.filter(i=>i.kind===filter.kind&&(imageMode==='missing'?!i.image:Boolean(i.image)));
         const nextMenu=JSON.stringify([filter.kind,imageMode,isAdmin,filter.category,filter.subcategory,source.map(i=>[i.id,i.category,i.subcategories])]);
         if(nextMenu!==menuSignature){menuSignature=nextMenu;
         const categories=[...C.IMAGE_CATEGORIES];source.forEach(i=>{if(!categories.includes(i.category))categories.push(i.category);});
         const menuSource=source.filter(i=>filter.category==='전체'||i.category===filter.category);
         const subcategories=[...new Set([...(C.CATEGORY_SUBCATEGORIES[filter.category]||[]),...menuSource.flatMap(i=>i.subcategories)])];
         $('#categories').innerHTML=['전체',...categories].map(cat=>'<button class="chip '+(cat===filter.category?'active':'')+'" data-category="'+e(cat)+'" aria-pressed="'+(cat===filter.category)+'">'+e(cat)+'<span>'+source.filter(i=>cat==='전체'||i.category===cat).length+'</span></button>').join('');
         $('#subcategories').hidden=filter.category==='전체'||!subcategories.length;
         $('#subcategories').innerHTML=subcategories.length?'<span class="submenu-label">SUB / '+e(filter.category)+'</span><button class="subchip '+(filter.subcategory==='전체'?'active':'')+'" data-subcategory="전체" aria-pressed="'+(filter.subcategory==='전체')+'">전체 <span>'+menuSource.length+'</span></button>'+subcategories.map(sub=>'<button class="subchip '+(sub===filter.subcategory?'active':'')+'" data-subcategory="'+e(sub)+'" aria-pressed="'+(sub===filter.subcategory)+'">'+e(sub)+'<span>'+menuSource.filter(i=>i.subcategories.includes(sub)).length+'</span></button>').join(''):'';
}
const visible=C.filter(state.items,{...filter,imageMode});$('#loading').hidden=true;
        $('#gallery').innerHTML=visible.map(cardHTML).join('');scheduleLayout();$$('#gallery img').forEach(image=>{if(!image.complete)image.addEventListener('load',scheduleLayout,{once:true});});$('#empty').hidden=visible.length>0;
        let scope=imageMode==='missing'?'이미지 미등록 관리':'이미지 프롬프트';
                if(filter.category!=='전체')scope=e(filter.category);
                if(filter.subcategory!=='전체')scope+=' <span class="crumb">›</span> '+e(filter.subcategory);
                $('#feed-title').innerHTML='<strong>'+scope+'</strong> <span class="small-muted">/</span> '+visible.length+'개'+(filter.query?' · “'+e(filter.query)+'”':'');

        $$('[data-sort]').forEach(b=>{b.classList.toggle('active',b.dataset.sort===filter.sort);b.setAttribute('aria-pressed',String(b.dataset.sort===filter.sort));});
         const restricted=filter.query||filter.category!=='전체'||filter.subcategory!=='전체';$('#clear-filters').hidden=!restricted;$('#clear-search').hidden=!filter.query;
        $('#banner-title').innerHTML='마음에 드는 <em>프롬프트</em>, 내 스타일로 바꿔 쓰세요.';

        const noData=source.length===0;
        const awaitingImages=!isAdmin&&state.items.some(i=>i.kind===filter.kind&&!i.image);
        $('#empty-title').textContent=imageMode==='missing'?'이미지 미등록 프롬프트가 없습니다.':noData?(awaitingImages?'공개할 프롬프트가 없습니다.':'첫 프롬프트를 추가해보세요.'):'검색 결과가 없습니다.';
        $('#empty-copy').textContent=imageMode==='missing'?'모든 프롬프트에 이미지가 등록되어 있습니다.':noData?(awaitingImages?'이미지를 등록한 프롬프트만 일반 사용자에게 표시됩니다.':'이미지와 자주 사용하는 프롬프트를 함께 보관할 수 있습니다.'):'다른 단어를 검색하거나 필터를 초기화해보세요.';
        $('#empty-action').dataset.action=noData?'add':'clear-filters';$('#empty-action').textContent=noData?'프롬프트 추가':'전체 보기';
        const missingCount=state.items.filter(i=>i.kind===filter.kind&&!i.image).length;
        $('#add-nav').hidden=!isAdmin;$('#unimaged-nav').hidden=!isAdmin;$('#unimaged-nav').setAttribute('aria-pressed',String(imageMode==='missing'));$('#unimaged-count').textContent=String(missingCount);$('#backup-nav').hidden=false;$('#remote-refresh').hidden=!!initial.offline;$('#recover-local').hidden=!isAdmin;$('#import-block').hidden=!isAdmin;$('.sort').hidden=!isAdmin;$('#admin-nav').hidden=!!initial.offline;$('#admin-nav').setAttribute('aria-pressed',String(isAdmin));$('#admin-nav').querySelector('.backup-label').textContent=isAdmin?'관리자 ON':'관리자';$('#empty-action').hidden=noData&&!isAdmin;$('#storage-warning').hidden=storageMode!=='memory';
      }

      const GOOGLE={
        clientId:'905691312335-9tnb9chfv144c3durv9va2ksa8p2bc31.apps.googleusercontent.com',
        adminHash:'42a015966b26915d5e6db5a565f1c6c7451cfaa5cb9ee9cfccfd343655ab13b8',
        apiKey:'AIzaSyC2gyK2swVEt8pjsqyR28hWs4RUo8s8AgQ',
        scope:'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email',
        dataFileId:'1CLwYxLDd50RZg7aOHCSnzwmNWVn7BrJx'
      };
      const BUILT_IN_DATA_FILE=GOOGLE.dataFileId;
      const sessionKey=dbName+'-session';
      let isAdmin=!!initial.offline,account=null,accessToken='',tokenClient=null,tokenReject=null;
      async function sha256Hex(text){
        const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));
        return [...new Uint8Array(digest)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
      }
      function adminError(message){const box=$('#admin-error');box.textContent=message||'';box.hidden=!message;}
      function adminNote(message){$('#admin-note').textContent=message||'';}
      function rememberSession(next){
        account=next;
        try{next?sessionStorage.setItem(sessionKey,JSON.stringify(next)):sessionStorage.removeItem(sessionKey);}catch{}
      }
      function restoreSession(){
        if(initial.offline){isAdmin=true;return;}
        try{const raw=sessionStorage.getItem(sessionKey);if(!raw)return;const saved=JSON.parse(raw);
          if(saved&&saved.verified&&saved.token&&saved.expiresAt>Date.now()){account=saved;accessToken=saved.token;isAdmin=true;}
        }catch{}
      }
      function gisReady(){return !!(window.google&&google.accounts&&google.accounts.oauth2);}
      function ensureTokenClient(){
        if(tokenClient)return tokenClient;
        if(!gisReady())throw Error('구글 로그인 스크립트를 불러오지 못했습니다. 인터넷 연결을 확인하고 새로고침해주세요.');
        tokenClient=google.accounts.oauth2.initTokenClient({
          client_id:GOOGLE.clientId,scope:GOOGLE.scope,callback:()=>{},
          error_callback:response=>{const denied=response&&(response.type==='access_denied'||response.error==='access_denied');const message=response&&response.type==='popup_closed'?'로그인 창이 닫혔습니다. 다시 시도해주세요.':denied?'Google OAuth 앱이 테스트 상태라 로그인이 차단되었습니다. Google Cloud Console의 OAuth 동의 화면에서 관리자 계정을 테스트 사용자로 추가한 뒤 다시 시도해주세요.':'로그인에 실패했습니다. 다시 시도해주세요.';adminError(message);const reject=tokenReject;tokenReject=null;reject?.(Error(message));}
        });
        return tokenClient;
      }
      function requestToken(){
        return new Promise((resolve,reject)=>{
          const client=ensureTokenClient();tokenReject=reject;
          client.callback=response=>{
            tokenReject=null;
            if(response&&response.access_token)resolve(response);
            else reject(Error('로그인 승인을 받지 못했습니다.'));
          };
          try{client.requestAccessToken({prompt:account?'':'consent'});}catch(error){tokenReject=null;reject(error);}
        });
      }
      async function fetchEmail(token){
        const response=await fetch('https://www.googleapis.com/oauth2/v3/userinfo',{headers:{Authorization:'Bearer '+token}});
        if(!response.ok)throw Error('구글 계정 정보를 확인하지 못했습니다.');
        const profile=await response.json();
        return String(profile.email||'').toLowerCase();
      }
      async function googleLogin(){
        adminError('');adminNote('구글 로그인 창을 여는 중입니다...');
        const granted=await requestToken();
        adminNote('계정을 확인하는 중입니다...');
        const email=await fetchEmail(granted.access_token);
        if(await sha256Hex(email)!==GOOGLE.adminHash){
          adminNote('');
          try{google.accounts.oauth2.revoke(granted.access_token,()=>{});}catch{}
          return adminError('이 계정에는 관리 권한이 없습니다. 관리자 계정으로 다시 로그인해주세요.');
        }
        accessToken=granted.access_token;
        const expiresAt=Date.now()+(Number(granted.expires_in)||3600)*1000-60000;
        rememberSession({verified:true,token:accessToken,expiresAt});
        isAdmin=true;adminNote('');$('#admin').close();render();renderPublishPanel();
        toast('관리자로 로그인했습니다.');
      }
      function googleLogout(){
        const token=accessToken;
        accessToken='';isAdmin=false;filter.imageMode='registered';driveFolderId='';rememberSession(null);renderPublishPanel();
        try{if(token&&gisReady())google.accounts.oauth2.revoke(token,()=>{});}catch{}
        render();toast('로그아웃했습니다.');
      }
      function openAdmin(){
        adminError('');adminNote(gisReady()?'':'구글 로그인 스크립트를 불러오는 중입니다. 잠시 후 다시 눌러주세요.');
        if(!$('#admin').open)$('#admin').showModal();
        $('#google-login').focus();
      }
      function requireAdmin(){
        if(isAdmin)return true;
        toast('관리자만 추가·수정할 수 있습니다. 프롬프트는 열어서 복사해 쓰실 수 있어요.');
        openAdmin();return false;
      }
      $('#google-login').addEventListener('click',()=>{
        $('#google-login').disabled=true;
        googleLogin().catch(error=>{adminNote('');adminError(error.message||'로그인하지 못했습니다.');})
          .finally(()=>{$('#google-login').disabled=false;});
      });

      const DRIVE_FOLDER='MuMu Prompts 백업',DRIVE_API='https://www.googleapis.com/drive/v3',DRIVE_UPLOAD='https://www.googleapis.com/upload/drive/v3';
      let driveFolderId='';
      function driveError(message){const box=$('#drive-error');box.textContent=message||'';box.hidden=!message;}
      async function driveCall(url,options={}){
        if(!accessToken)throw Error('관리자로 로그인한 뒤 사용할 수 있습니다.');
        const response=await fetch(url,{...options,headers:{Authorization:'Bearer '+accessToken,...(options.headers||{})}});
        if(response.status===401){
          accessToken='';isAdmin=false;rememberSession(null);render();
          throw Error('구글 로그인이 만료되었습니다. 관리자 로그인을 다시 해주세요.');
        }
        if(!response.ok){
          let detail='';try{detail=(await response.json()).error?.message||'';}catch{}
          throw Error('드라이브 요청이 실패했습니다.'+(detail?' ('+detail+')':' 잠시 후 다시 시도해주세요.'));
        }
        return response;
      }
      async function driveEnsureFolder(){
        if(driveFolderId)return driveFolderId;
        const query="mimeType='application/vnd.google-apps.folder' and name='"+DRIVE_FOLDER+"' and trashed=false";
        const found=await(await driveCall(DRIVE_API+'/files?q='+encodeURIComponent(query)+'&fields=files(id)&pageSize=1')).json();
        if(found.files&&found.files.length)return driveFolderId=found.files[0].id;
        const created=await(await driveCall(DRIVE_API+'/files?fields=id',{method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({name:DRIVE_FOLDER,mimeType:'application/vnd.google-apps.folder'})})).json();
        return driveFolderId=created.id;
      }
      async function driveSaveBackup(){
        const folder=await driveEnsureFolder();
        await commitQueue.catch(()=>{});
        const payload=C.safeJSON(await completeSnapshot());
        const boundary='mumu'+Math.random().toString(36).slice(2);
        const metadata={name:'MuMu-Prompts-'+new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')+'.json',parents:[folder],mimeType:'application/json'};
        const body='--'+boundary+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify(metadata)+
          '\r\n--'+boundary+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+payload+'\r\n--'+boundary+'--';
        const saved=await(await driveCall(DRIVE_UPLOAD+'/files?uploadType=multipart&fields=id,name',{method:'POST',
          headers:{'Content-Type':'multipart/related; boundary='+boundary},body})).json();
        return saved;
      }
      async function driveListBackups(){
        const folder=await driveEnsureFolder();
        const query="'"+folder+"' in parents and trashed=false";
        const listed=await(await driveCall(DRIVE_API+'/files?q='+encodeURIComponent(query)+'&fields=files(id,name,size,modifiedTime)&orderBy=modifiedTime desc&pageSize=30')).json();
        return listed.files||[];
      }
      function driveRowHTML(file){
        const when=new Date(file.modifiedTime).toLocaleString('ko-KR');
        const size=file.size?Math.max(1,Math.round(Number(file.size)/1024))+'KB':'';
        return '<div class="drive-row"><b>'+e(file.name)+'</b><span>'+e(when)+(size?' · '+size:'')+'</span><button data-restore="'+e(file.id)+'" data-restore-name="'+e(file.name)+'">복원</button></div>';
      }
      async function refreshDriveList(){
        if(!isAdmin||initial.offline){$('#drive-list').innerHTML='<p class="small-muted">관리자로 로그인하면 백업 목록이 표시됩니다.</p>';return;}
        $('#drive-list').innerHTML='<p class="small-muted">드라이브에서 목록을 불러오는 중입니다...</p>';
        const files=await driveListBackups();
        $('#drive-list').innerHTML=files.length?files.map(driveRowHTML).join(''):'<p class="small-muted">아직 백업이 없습니다. 위 버튼으로 첫 백업을 만들어보세요.</p>';
      }
      async function driveRestore(fileId,name){
        if(!(await confirmAction('“'+name+'” 백업으로 현재 자료를 되돌릴까요? 지금 자료는 이 백업 내용으로 교체됩니다.','되돌리기','드라이브에서 복원')))return;
        const content=await(await driveCall(DRIVE_API+'/files/'+encodeURIComponent(fileId)+'?alt=media')).text();
        const items=C.validateBackup(JSON.parse(content));
        await saveRecovery();await commit(()=>items);
        $('#backup').close();toast(items.length+'개 자료를 복원했습니다.');
      }
      $('#drive-backup').addEventListener('click',async()=>{
        const button=$('#drive-backup');button.disabled=true;driveError('');
        try{if(!requireAdmin())return;const saved=await driveSaveBackup();toast('드라이브에 '+saved.name+' 으로 백업했습니다.');await refreshDriveList();}
        catch(error){driveError(error.message||'백업하지 못했습니다.');}
        finally{button.disabled=false;}
      });
      $('#drive-refresh').addEventListener('click',()=>{driveError('');refreshDriveList().catch(error=>driveError(error.message||'목록을 불러오지 못했습니다.'));});
      $('#drive-list').addEventListener('click',ev=>{
        const button=ev.target.closest('[data-restore]');if(!button)return;
        driveError('');
        driveRestore(button.dataset.restore,button.dataset.restoreName).catch(error=>driveError(error.message||'복원하지 못했습니다.'));
      });

      let layoutPending=0;
      function layoutGallery(){
        const gallery=$('#gallery');if(!gallery)return;
        const styles=getComputedStyle(gallery);
        const rowHeight=parseFloat(styles.gridAutoRows)||4;
        const cards=$$('#gallery .card');
        if(styles.display!=='grid'){cards.forEach(card=>card.style.gridRowEnd='');return;}
        cards.forEach(card=>{
          const gap=parseFloat(getComputedStyle(card).marginBottom)||0;
          card.style.gridRowEnd='span '+Math.max(1,Math.ceil((card.offsetHeight+gap)/rowHeight));
        });
      }
      function scheduleLayout(){cancelAnimationFrame(layoutPending);layoutPending=requestAnimationFrame(layoutGallery);}
      window.addEventListener('resize',scheduleLayout);
      window.addEventListener('load',scheduleLayout);
      if(document.fonts&&document.fonts.ready)document.fonts.ready.then(scheduleLayout).catch(()=>{});

      const PUBLISH_NAME='prompts.json';
      const imageSrc=ref=>/^drive:/.test(ref)?'https://lh3.googleusercontent.com/d/'+ref.slice(6)+'=w1600':ref;
      let publishTimer=0,publishQueue=Promise.resolve(),remoteConflict=false;
      function publishState(message,tone){
        const box=$('#publish-status');if(!box)return;
        box.textContent=message||'';box.hidden=!message;
        box.className='publish-status'+(tone?' '+tone:'');
      }
      async function driveShare(fileId){
        await driveCall(DRIVE_API+'/files/'+encodeURIComponent(fileId)+'/permissions',{method:'POST',
          headers:{'Content-Type':'application/json'},body:JSON.stringify({role:'reader',type:'anyone'})});
      }
      async function driveUpload({name,mime,body,parents,fileId,base64}){
        const boundary='mumu'+Math.random().toString(36).slice(2);
        const metadata=fileId?{name}:{name,parents,mimeType:mime};
        const payload='--'+boundary+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify(metadata)+
          '\r\n--'+boundary+'\r\nContent-Type: '+mime+(base64?'\r\nContent-Transfer-Encoding: base64':'; charset=UTF-8')+
          '\r\n\r\n'+body+'\r\n--'+boundary+'--';
        const url=DRIVE_UPLOAD+'/files'+(fileId?'/'+encodeURIComponent(fileId):'')+'?uploadType=multipart&fields=id,name';
        const response=await driveCall(url,{method:fileId?'PATCH':'POST',
          headers:{'Content-Type':'multipart/related; boundary='+boundary},body:payload});
        return response.json();
      }
      async function uploadImageToDrive(dataUrl){
        const match=dataUrl.match(/^data:(image\/[a-z+]+);base64,(.+)$/);
        if(!match)throw Error('이미지 형식을 확인해주세요.');
        const folder=await driveEnsureFolder();
        const extension=match[1].split('/')[1].replace('jpeg','jpg');
        const saved=await driveUpload({name:'image-'+C.uid()+'.'+extension,mime:match[1],body:match[2],parents:[folder],base64:true});
        await driveShare(saved.id);
        return 'drive:'+saved.id;
      }
      async function findDataFile(){
        if(GOOGLE.dataFileId)return GOOGLE.dataFileId;
        const folder=await driveEnsureFolder();
        const query="'"+folder+"' in parents and name='"+PUBLISH_NAME+"' and trashed=false";
        const found=await(await driveCall(DRIVE_API+'/files?q='+encodeURIComponent(query)+'&fields=files(id)&pageSize=1')).json();
        return found.files&&found.files.length?found.files[0].id:'';
      }
      function publishToDrive(){const task=publishQueue.catch(()=>{}).then(runPublish);publishQueue=task;return task;}
      async function runPublish(){
        if(!isAdmin||initial.offline)return;
        if(remoteConflict)throw Error('게시 자료가 변경되었습니다. 게시 자료 확인에서 먼저 비교해주세요.');
        publishState('사이트에 반영하는 중입니다...','');
        try{
          await commitQueue.catch(()=>{});
          const publishing=clone(state.items);
          const payload=C.safeJSON({app:'mumu-prompts',version:3,datasetId:initial.datasetId,
            publishedAt:new Date().toISOString(),
            items:publishing.map(item=>({...item,favorite:false,copies:0})),images:[]});
          const folder=await driveEnsureFolder();
          let fileId=await findDataFile();
          const saved=await driveUpload({name:PUBLISH_NAME,mime:'application/json',body:payload,
            parents:[folder],fileId:fileId||undefined});
          if(!fileId){fileId=saved.id;await driveShare(fileId);}
          GOOGLE.dataFileId=fileId;
          rememberPublished(publishing);
          try{localStorage.setItem(dbName+'-datafile',fileId);}catch{}
          $('#sync-notice').hidden=true;
          publishState('사이트에 반영했습니다 · '+state.items.length+'개 · '+new Date().toLocaleTimeString('ko-KR'),'ok');
          renderPublishPanel();
        }catch(error){publishState(error.message||'사이트에 반영하지 못했습니다.','bad');}
      }
      function schedulePublish(){
        if(!isAdmin||initial.offline)return;
        clearTimeout(publishTimer);
        publishState('잠시 후 사이트에 반영합니다...','');
        publishTimer=setTimeout(()=>{publishToDrive().catch(error=>publishState(error.message,'bad'));},1200);
      }
      function renderPublishPanel(){
        const box=$('#publish-panel');if(!box)return;
        box.hidden=!isAdmin||initial.offline;
        $('#publish-id').textContent=GOOGLE.dataFileId||'아직 게시하지 않았습니다';
        $('#publish-embed').hidden=!GOOGLE.dataFileId||GOOGLE.dataFileId===BUILT_IN_DATA_FILE;
      }
      async function loadPublished(){
        if(initial.offline||!GOOGLE.dataFileId)return null;
        try{
          const response=await fetch(DRIVE_API+'/files/'+encodeURIComponent(GOOGLE.dataFileId)+'?alt=media&key='+encodeURIComponent(GOOGLE.apiKey),{signal:AbortSignal.timeout(10000)});
          if(!response.ok)return null;
          return C.validateBackup(await response.json());
        }catch{return null;}
      }
      function contentKey(items){return JSON.stringify(items.map(({favorite,copies,...item})=>item).sort((a,b)=>a.id.localeCompare(b.id)));}
      function rememberPublished(items){try{localStorage.setItem(dbName+'-published',contentKey(items));}catch{}}
      async function checkPublished(){
        const remote=await loadPublished();if(!remote)return null;
        const key=contentKey(remote);let base='';try{base=localStorage.getItem(dbName+'-published')||'';}catch{}
        if(key===contentKey(state.items)){rememberPublished(remote);remoteConflict=false;$('#sync-notice').hidden=true;}
        else if(key!==base){remoteConflict=true;$('#sync-notice').hidden=false;publishState('게시 자료와 로컬 자료가 다릅니다. 백업 메뉴에서 확인해주세요.','bad');}
        return remote;
      }
      async function saveRecovery(){
        const value=snapshot();
        if(storageMode==='indexedDB')await new Promise((resolve,reject)=>{const t=db.transaction('meta','readwrite');t.objectStore('meta').put(value,'recovery');t.oncomplete=resolve;t.onabort=()=>reject(t.error);t.onerror=()=>reject(t.error);});
        else if(storageMode==='localStorage')localStorage.setItem(dbName+'-recovery',JSON.stringify(value));
        else throw Error('교체 전 자료를 보관할 저장소가 없습니다. 먼저 JSON으로 백업해주세요.');
      }
      $('#remote-refresh').addEventListener('click',async()=>{
        try{
          if(initial.offline)return toast('이 파일은 오프라인 백업입니다.');
          const remote=await checkPublished();if(!remote)throw Error('게시 자료를 불러오지 못했습니다.');
          if(contentKey(remote)===contentKey(state.items))return toast('게시 자료와 같습니다.');
          if(!(await confirmAction('로컬 '+state.items.length+'개를 게시 자료 '+remote.length+'개로 교체할까요? 현재 자료는 복구용으로 보관합니다.','게시 자료 가져오기')))return;
          await commitQueue.catch(()=>{});await saveRecovery();
          const personal=new Map(state.items.map(i=>[i.id,i]));
          await commit(()=>remote.map(i=>({...i,favorite:personal.get(i.id)?.favorite||false,copies:personal.get(i.id)?.copies||0})),{content:false});
          rememberPublished(remote);remoteConflict=false;render();toast('게시 자료를 가져왔습니다.');
        }catch(error){toast(error.message);}
      });
      $('#recover-local').addEventListener('click',async()=>{
        try{
          if(!requireAdmin())return;
          let data;if(storageMode==='indexedDB')data=await new Promise((resolve,reject)=>{const r=db.transaction('meta').objectStore('meta').get('recovery');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
          else data=JSON.parse(localStorage.getItem(dbName+'-recovery')||'null');
          if(!data)throw Error('복구할 교체 전 자료가 없습니다.');
          const items=C.validateBackup(data);
          if(!(await confirmAction(items.length+'개 자료로 복구할까요? 현재 자료와 복구 자료를 서로 바꿉니다.','복구')))return;
          await commitQueue.catch(()=>{});await saveRecovery();await commit(()=>items,{content:false});render();toast(initial.offline?'교체 전 자료를 복구했습니다.':'복구했습니다. 게시하려면 지금 사이트에 반영을 눌러주세요.');
        }catch(error){toast(error.message);}
      });
      document.addEventListener('error',event=>{
        const img=event.target;if(!(img instanceof HTMLImageElement)||!img.closest('#gallery,#detail-body'))return;
        img.hidden=true;
        if(img.nextElementSibling?.classList.contains('image-error'))return;
        const retry=document.createElement('span');retry.className='image-error';retry.setAttribute('role','button');retry.tabIndex=0;retry.textContent='이미지를 불러오지 못했습니다 · 다시 시도';
        const run=ev=>{ev.preventDefault();ev.stopPropagation();retry.remove();img.hidden=false;const src=img.src;img.removeAttribute('src');img.src=src;};
        retry.addEventListener('click',run);retry.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' ')run(ev);});img.after(retry);scheduleLayout();
      },true);
      async function downloadConfigured(){
        const doc=new DOMParser().parseFromString(originalHTML,'text/html');
        await inlineResources(doc,false);
        const script=doc.querySelector('#app-script');
        if(!script){toast('설정 위치를 찾지 못했습니다.');return;}
        script.textContent=script.textContent.replace(/dataFileId:\s*(?:'[^']*'|"[^"]*")/,"dataFileId:"+JSON.stringify(GOOGLE.dataFileId));
        download('<!doctype html>\n'+doc.documentElement.outerHTML,'index.html','text/html;charset=utf-8');
        toast('이 index.html을 깃허브에 한 번만 덮어쓰면 설정이 끝납니다.');
      }
      $('#publish-now').addEventListener('click',async()=>{try{
        if(!requireAdmin())return;
        if(remoteConflict){if(!(await confirmAction('게시 자료와 이 브라우저 자료가 다릅니다. 이 브라우저의 자료로 공개 사이트를 덮어쓸까요?','이 자료로 게시')))return;remoteConflict=false;}
        await publishToDrive();
      }catch(error){publishState(error.message,'bad');}});
      $('#publish-download').addEventListener('click',()=>downloadConfigured().catch(error=>toast(error.message)));
      function cardHTML(item){return '<article class="card"><button class="card-open" data-open="'+e(item.id)+'" aria-label="'+e(item.title)+' 상세 보기"><div class="card-media">'+mediaHTML(item)+(item.sample?'<span class="sample-tag">예제</span>':'')+'</div><div class="card-footer"><h2 class="card-title">'+e(item.title)+'</h2><div class="card-meta"><span>'+e(item.subcategories[0]||item.category)+'</span></div></div></article>';}
      function mediaHTML(item,eager=false){return item.image?'<img src="'+imageSrc(item.image)+'" alt="'+e(item.title)+'" loading="'+(eager?'eager':'lazy')+'" '+(eager?'fetchpriority="high" ':'')+'decoding="async"'+(item.ratio?' style="aspect-ratio:'+item.ratio.toFixed(4)+'"':'')+'>':'<div class="text-card"><small>IMAGE PROMPT</small><strong>'+e(item.title)+'</strong><p>'+e(item.description.slice(0,90))+'</p></div>';}
      function fieldHTML(field){const long=field.value.length>70||field.value.includes('\n');return '<label class="field detail-field '+(long?'wide':'')+'">'+e(field.label)+'<textarea data-field="'+e(field.key)+'" maxlength="10000" rows="'+(long?5:3)+'" placeholder="'+e(field.label)+'을(를) 내 상황에 맞게 자세히 적어주세요">'+e(field.value)+'</textarea></label>';}
      function growField(box){if(!box||box.tagName!=='TEXTAREA'||box.dataset.resized)return;const height=box.getBoundingClientRect().height;if(box.scrollHeight>height+2)box.style.height=Math.min(box.scrollHeight+2,320)+'px';}
      function fieldGroupsHTML(fields){
        if(!fields.length)return '<p class="small-muted">아래 원문 편집에서 프롬프트를 수정할 수 있습니다.</p>';
        const required=fields.filter(f=>C.fieldRequired(f)),optional=fields.filter(f=>!C.fieldRequired(f));
        let html='';
        if(required.length)html+='<section class="field-group is-required"><div class="field-group-head"><span class="field-flag req">필수</span><b>내 내용으로 바꿀 항목</b><small>'+required.length+'개 · 여기를 바꿔야 다른 결과가 나옵니다</small></div><div class="fields">'+required.map(fieldHTML).join('')+'</div></section>';
        if(optional.length)html+='<details class="field-group is-optional"'+(required.length?'':' open')+'><summary><span class="field-flag opt">선택</span><b>그대로 둬도 되는 항목</b><small>'+optional.length+'개 · 스타일·구도·출력 설정</small></summary><div class="fields">'+optional.map(fieldHTML).join('')+'</div></details>';
        return html;
      }
      function fieldCountLabel(fields){if(!fields.length)return '0개 항목';const required=fields.filter(f=>C.fieldRequired(f)).length;return '필수 '+required+'개 · 선택 '+(fields.length-required)+'개';}
      function similarItems(item,limit=12){
        const sourceSubcategories=new Set(item.subcategories||[]);
        const sourceTags=new Set(item.tags||[]);
        return state.items
          .filter(candidate=>candidate.id!==item.id&&candidate.kind===item.kind&&(isAdmin||Boolean(candidate.image)))
          .map((candidate,index)=>{
            const sharedSubcategories=(candidate.subcategories||[]).filter(value=>sourceSubcategories.has(value)).length;
            const sharedTags=(candidate.tags||[]).filter(value=>sourceTags.has(value)).length;
            const score=(candidate.category===item.category?12:0)+(sharedSubcategories*5)+(sharedTags*3)+(candidate.tool===item.tool?1:0)+(Boolean(candidate.image)===Boolean(item.image)?2:0);
            return {candidate,index,score};
          })
          .sort((a,b)=>b.score-a.score||((b.candidate.updatedAt||0)-(a.candidate.updatedAt||0))||a.index-b.index)
          .slice(0,limit)
          .map(entry=>entry.candidate);
      }
      async function openDetail(id){
        if(active?.dirty&&!(await confirmAction('저장하지 않은 수정 내용이 있습니다. 저장하지 않고 다른 자료를 열까요?','이동')))return;
        const item=state.items.find(i=>i.id===id);
        if(!item)return;
        const similar=similarItems(item);
        const similarMarkup=similar.length
          ?similar.map(i=>'<button class="related-card" data-open="'+e(i.id)+'" aria-label="'+e(i.title)+' 열기">'+(i.image?'<img src="'+imageSrc(i.image)+'" loading="lazy" decoding="async" alt="'+e(i.title)+'">':'<span class="related-mini-text">IMAGE PROMPT</span>')+'<span class="related-card__title">'+e(i.title)+'</span></button>').join('')
          :'<p class="related-empty">아직 비슷한 이미지가 없습니다.</p>';
        active={id,draft:clone(item),dirty:false};
        $('#detail-body').innerHTML='<div class="detail-layout"><div class="detail-primary"><section class="detail-preview" aria-labelledby="selected-image-label"><div class="detail-preview-head"><span id="selected-image-label">선택 이미지</span><small>원본 미리보기</small></div>'+mediaHTML(item,true)+'<p class="preview-caption">'+(item.sample?'이 앱을 위해 별도로 만든 예제입니다. ':'')+'입력값을 바꾸면 프롬프트에 반영됩니다. 미리보기 이미지는 바뀌지 않습니다.</p></section><section class="detail-content" aria-labelledby="detail-title"><div class="detail-title-row"><h2 id="detail-title">'+e(item.title)+'</h2></div><div class="tags"><span class="tag">'+e(item.tool||'도구 자유 선택')+'</span><span class="tag">'+e(item.category)+'</span>'+item.tags.map(t=>'<span class="tag">#'+e(t)+'</span>').join('')+item.subcategories.map(s=>'<span class="tag subtag">/'+e(s)+'</span>').join('')+'</div><p class="detail-description">'+e(item.description)+'</p><div class="section-heading">내 상황에 맞게 바꾸기 <small id="field-count">'+fieldCountLabel(item.fields)+'</small></div><div class="field-groups" id="detail-fields">'+fieldGroupsHTML(item.fields)+'</div><div class="section-heading">최종 프롬프트 <small>입력 내용 자동 반영</small></div><textarea class="prompt-output" id="final-prompt" aria-label="최종 프롬프트" readonly spellcheck="false">'+e(C.resolve(item.template,item.fields))+'</textarea><div class="change-note" id="change-note"></div><button class="primary copy-button" data-action="copy">'+icon('copy')+'최종 프롬프트 복사하기</button><div class="actions">'+(isAdmin?'<button class="secondary" data-action="save-detail">'+icon('check')+'변경 저장</button>':'')+'<button class="secondary" data-action="reset-detail">입력 초기화</button></div>'+(isAdmin?'<details><summary>프롬프트 원문 편집</summary><textarea id="detail-template" class="form-control template-editor" maxlength="50000" aria-label="프롬프트 원문">'+e(item.template)+'</textarea><p class="small-muted" style="margin-top:8px">{{주제}}처럼 표시한 부분은 위에 입력칸이 생깁니다.</p></details><div class="actions"><button class="secondary" data-action="edit">제목·이미지 수정</button><button class="secondary" data-action="duplicate">복제</button><button class="secondary danger" data-action="delete">삭제</button></div>':'<p class="small-muted">입력값을 바꾸고 최종 프롬프트를 복사해 사용하세요. 자료를 고치거나 새로 추가하는 것은 관리자만 할 수 있습니다.</p>')+'</section></div><aside class="related" aria-labelledby="related-title"><div class="related-head"><h3 id="related-title">비슷한 이미지</h3><span class="related-count">'+similar.length+'개 추천</span></div><div class="related-grid">'+similarMarkup+'</div></aside></div>';
        if(!$('#detail').open)$('#detail').showModal();$('#detail').scrollTop=0;updatePrompt();
      }
      function updatePrompt(){if(!active)return;$('#final-prompt').value=C.resolve(active.draft.template,active.draft.fields);const unfilled=active.draft.fields.filter(f=>!f.value.trim()).length;$('#change-note').textContent=(active.dirty?(isAdmin?'수정 중 · 변경 저장을 누르면 다음에도 유지됩니다.':'입력값이 반영되었습니다. 최종 프롬프트를 복사해 사용하세요.'):'')+(unfilled?'　미입력 '+unfilled+'개':'');}
      async function closeDetail(){if(active?.dirty&&!(await confirmAction('저장하지 않은 수정 내용이 있습니다. 저장하지 않고 닫을까요?','닫기')))return;$('#detail').close();active=null;}
      async function favorite(id){await commit(items=>items.map(i=>i.id===id?{...i,favorite:!i.favorite}:i),{content:false});const item=state.items.find(i=>i.id===id);if(active?.id===id){active.draft.favorite=item.favorite;const button=$('[data-detail-favorite]');if(button)button.setAttribute('aria-pressed',String(item.favorite));}toast(item.favorite?'보관함에 저장했습니다.':'보관함에서 해제했습니다.');}
      async function saveDetail(){if(!active)return;const draft=C.validateItem({...active.draft,updatedAt:Date.now()});await commit(items=>items.map(i=>i.id===draft.id?{...draft,favorite:i.favorite,copies:i.copies}:i));active.draft=clone(state.items.find(i=>i.id===draft.id));active.dirty=false;updatePrompt();toast(storageMode==='memory'?'현재 창에 반영했습니다. 파일로 백업해주세요.':'변경 내용을 저장했습니다.');}
      async function copyPrompt(){if(!active)return;const text=$('#final-prompt').value;let copied=false;try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);copied=true;}}catch{}if(!copied){$('#final-prompt').focus();$('#final-prompt').select();copied=document.execCommand('copy');}if(!copied){toast('프롬프트를 선택했습니다. Ctrl+C로 복사해주세요.');return;}toast('프롬프트를 복사했습니다.');const id=active.id;try{await commit(items=>items.map(i=>i.id===id?{...i,copies:i.copies+1}:i),{content:false});}catch{toast('복사했습니다. 복사 횟수는 저장하지 못했습니다.');}}
      function fillCategories(kind,value){const cats=C.IMAGE_CATEGORIES;$('#form-category').innerHTML=[...new Set([...cats,...(value?[value]:[])])].map(c=>'<option value="'+e(c)+'">'+e(c)+'</option>').join('');if(value)$('#form-category').value=value;$('#prompt-builder').hidden=false;fillSubOptions();}
      function fillSubOptions(){const list=$('#subcategory-options');if(!list)return;const picked=$('#form-category').value;list.innerHTML=(C.CATEGORY_SUBCATEGORIES[picked]||[]).map(s=>'<option value="'+e(s)+'">').join('');}
      function openEditor(item=null){editorItem=item?clone(item):null;editorDirty=false;uploadImage=item?.image||'';uploadRatio=item?.ratio||0;const form=$('#item-form');form.reset();resetBuilder();form.elements.kind.value=item?.kind||filter.kind;fillCategories(form.elements.kind.value,item?.category);for(const key of ['title','tool','template','description'])form.elements[key].value=item?.[key]||'';form.elements.subcategories.value=item?.subcategories.join(', ')||'';form.elements.tags.value=item?.tags.map(t=>'#'+t).join(' ')||'';autoFieldStatus('프롬프트를 붙여 넣으면 자동 분석합니다.');updateEditorPreview();$('#editor-title').textContent=item?'프롬프트 수정':'프롬프트 추가';$('#form-submit').innerHTML=icon(item?'check':'plus')+(item?'수정 내용 저장':'보관함에 추가');$('#form-error').hidden=true;refreshUpload();detectedFields();$('#editor').showModal();}
      async function closeEditor(){if(editorDirty&&!(await confirmAction('입력 중인 내용이 있습니다. 저장하지 않고 닫을까요?','닫기')))return;$('#editor').close();editorDirty=false;}
      function refreshUpload(){$('#upload-preview').hidden=!uploadImage;if(uploadImage)$('#upload-preview').src=imageSrc(uploadImage);else $('#upload-preview').removeAttribute('src');$('#upload-label').hidden=!!uploadImage;$('#remove-upload').hidden=!uploadImage;}
      const fieldOverrides=new Map();
      function editorFields(){
        const previous=[...builderSeeds,...(editorItem?.fields||[])];
        return C.fieldsFor($('#form-template').value,previous).map(field=>fieldOverrides.has(field.key)?{...field,required:fieldOverrides.get(field.key)}:field);
      }
      function detectedFields(){
        const box=$('#detected-fields'),fields=editorFields();
        box.hidden=!fields.length;
        if(!fields.length){box.innerHTML='';return;}
        const required=fields.filter(field=>C.fieldRequired(field)).length;
        box.innerHTML='<span class="detect-lead">자동 분류 · <b>필수 '+required+'개</b> · 선택 '+(fields.length-required)+'개 <small>잘못 나뉜 항목은 눌러서 바꾸세요</small></span>'
          +'<span class="detect-chips">'+fields.map(field=>{const req=C.fieldRequired(field);
            return '<button type="button" class="detect-chip '+(req?'req':'opt')+'" data-field-key="'+e(field.key)+'" aria-pressed="'+req+'" title="눌러서 '+(req?'선택':'필수')+'으로 바꾸기"><i>'+(req?'필수':'선택')+'</i>'+e(field.key)+'</button>';}).join('')+'</span>';
      }
      function autoFieldStatus(message,tone=''){$('#auto-field-status').textContent=message;$('#auto-field-status').dataset.tone=tone;}
      function autoCreateFields(fromPaste=false){
        const textarea=$('#form-template'),source=textarea.value,result=C.autoFields(source);
        if(!source.trim()){autoFieldStatus('먼저 프롬프트를 붙여 넣어주세요.','warning');return;}
        const previous=new Map([...(editorItem?.fields||[]),...builderSeeds].map(field=>[field.key,field.value]));
        builderSeeds=result.fields.map(field=>({...field,value:field.value||previous.get(field.key)||''}));
        builderOwned=false;
        if(result.template!==source){textarea.value=result.template;editorDirty=true;}
        detectedFields();updateEditorPreview();
        const count=C.keys(result.template).length;
        const split=(()=>{const fields=editorFields(),required=fields.filter(field=>C.fieldRequired(field)).length;return fields.length?' 필수 '+required+'개 · 선택 '+(fields.length-required)+'개로 나눴습니다.':'';})();
        if(result.convertedCount)autoFieldStatus('바꿔 쓰는 입력칸 '+count+'개를 만들었습니다.'+split+' 아래 분류를 확인한 뒤 저장하세요.','success');
        else if(count)autoFieldStatus('이미 입력칸 '+count+'개가 준비되어 있습니다.'+split,'success');
        else autoFieldStatus('자동으로 찾은 항목이 없습니다. ‘항목명: 값’ 또는 [값] 형식으로 작성해보세요.','warning');
        if(fromPaste&&result.skipped)autoFieldStatus('입력칸은 최대 40개까지 만들 수 있어 나머지 항목은 그대로 두었습니다.','warning');
      }

      const BUILDER_GROUPS=[
        {name:'무엇을 만들까요',items:[
          {key:'목적',ex:'동네 베이커리의 신메뉴를 알리는 인스타그램 피드용 홍보 포스터'},
          {key:'핵심 주제',ex:'갓 구운 크루아상과 따뜻한 라떼가 함께 놓인 원목 테이블'},
          {key:'행동·상황',ex:'손님의 손이 크루아상을 집어 올리는 순간, 김이 살짝 피어오르고 부스러기가 접시 위로 떨어진다'},
          {key:'배경·환경',ex:'아침 햇살이 들어오는 창가 자리, 뒤쪽으로 흐릿하게 보이는 매장 내부와 초록 화분'},
          {key:'외형·디테일',ex:'겉은 진한 황금빛으로 바삭하게 구워지고 속은 결이 살아 있는 크루아상, 크림빛 도자기 잔과 리넨 냅킨'}]},
        {name:'어떻게 보이게 할까요',items:[
          {key:'구도·레이아웃',ex:'음식을 화면 아래 3분의 2에 배치하고, 위쪽 3분의 1은 제목이 들어갈 여백으로 비워 둔다'},
          {key:'카메라',ex:'50mm 렌즈, 45도 위에서 내려다보는 각도, 얕은 심도로 뒤쪽 배경을 부드럽게 흐린다'},
          {key:'조명',ex:'왼쪽 창에서 들어오는 자연광을 주광으로 쓰고, 그림자는 부드럽게, 오른쪽에는 은은한 반사광을 넣는다'},
          {key:'스타일',ex:'잡지 푸드 화보 같은 사실적인 사진. 과장된 보정 없이 실제 촬영한 질감을 살린다'},
          {key:'색감·분위기',ex:'크림색과 진한 커피 브라운을 중심으로 채도는 낮게. 따뜻하고 여유로운 아침의 분위기'}]},
        {name:'마무리',items:[
          {key:'출력 조건',ex:'4:5 세로형, 인스타그램 피드용, 인쇄해도 글자가 또렷한 고해상도'},
          {key:'제외 요소',ex:'흐릿한 초점, 왜곡된 손가락, 잘린 접시, 읽을 수 없는 글자, 잘못된 철자, 브랜드 로고, 워터마크, 지저분한 배경 소품'}]}
      ];
      const TEXT_FIELDS=[
        {key:'이미지 텍스트',ex:'오늘의 크루아상',ex2:'매일 아침 7시 오픈'},
        {key:'텍스트 위치',ex:'상단 중앙, 이미지 위쪽 여백 안에',ex2:'하단 중앙, 아래 여백 안쪽'},
        {key:'텍스트 크기',ex:'화면 가로폭의 60%를 차지할 만큼 크게',ex2:'제목의 3분의 1 크기로 작게'},
        {key:'텍스트 스타일',ex:'굵은 고딕(산세리프), 자간을 좁게',ex2:'얇은 고딕, 자간을 넓게'},
        {key:'텍스트 색상',ex:'진한 커피 브라운',ex2:'흰색'}];
      const TEXT_MAX=5;
      const BUILDER_LABELS={'행동·상황':'담아야 할 상황'};
      let builderSeeds=[],builderOwned=false,textBlocks=1;
      const textKey=(base,index)=>index?base+' '+(index+1):base;
      const isTextKey=key=>TEXT_FIELDS.some(field=>key===field.key||key.startsWith(field.key+' '));
      function builderValueMap(){
        const values=new Map();
        builderPicks().forEach(pick=>{if(pick.value)values.set(pick.key,pick.value);});
        builderSeeds.forEach(field=>{if(!values.has(field.key)&&field.value)values.set(field.key,field.value);});
        (editorItem?.fields||[]).forEach(field=>{if(!values.has(field.key)&&field.value)values.set(field.key,field.value);});
        return values;
      }
      function updateEditorPreview(){
        const template=$('#form-template').value,keys=C.keys(template),values=builderValueMap();
        $('#preview-block').hidden=!template.trim();
        if(!template.trim())return;
        const fields=keys.map(key=>({key,value:values.get(key)||''}));
        $('#form-preview').value=C.resolve(template,fields);
        const unfilled=fields.filter(field=>!field.value).length;
        $('#preview-note').textContent=!keys.length?'바꿔 쓸 부분이 없는 프롬프트입니다.'
          :unfilled?'아직 값을 넣지 않은 '+unfilled+'개 항목은 {{ }} 표시 그대로 남습니다. 상세 화면에서 채워도 됩니다.'
          :'모든 항목이 채워졌습니다. 위 내용 그대로 프롬프트가 만들어집니다.';
      }
      function builderStatus(message){$('#builder-status').textContent=message||'';$('#builder-status').hidden=!message;}
      function syncBuilderTemplate(){
        const picked=builderPicks();
        builderSeeds=picked.map(pick=>({key:pick.key,label:pick.key,value:pick.value}));
        if(!picked.length){
          if(builderOwned){$('#form-template').value='';builderOwned=false;}
          builderStatus('');detectedFields();updateEditorPreview();return;
        }
        if(!builderOwned&&$('#form-template').value.trim()){
          builderStatus('직접 적어둔 프롬프트가 있어 자동 반영을 멈췄습니다. 아래 프롬프트 칸을 비우면 체크한 항목으로 다시 만들어집니다.');
          updateEditorPreview();return;
        }
        builderOwned=true;builderStatus('');
        $('#form-template').value=builderTemplate(picked);
        editorDirty=true;detectedFields();updateEditorPreview();
      }
      function rowHTML(key,label,example){
        return '<div class="builder-row"><label class="builder-check"><input type="checkbox" data-builder="'+e(key)+'">'+e(label)+'</label>'+
          '<input type="text" data-builder-value="'+e(key)+'" maxlength="1000" placeholder="직접 입력하거나 아래 예시를 누르세요" aria-label="'+e(key)+' 입력" hidden>'+
          '<button type="button" class="builder-example" data-example="'+e(key)+'" data-example-text="'+e(example)+'" title="누르면 이 예시가 입력칸에 채워집니다" hidden><b>예시 넣기</b> '+e(example)+'</button></div>';
      }
      function textGroupHTML(){
        let out='<div class="builder-group"><h4>이미지 속 텍스트</h4>';
        for(let index=0;index<textBlocks;index++){
          out+='<div class="text-block"><div class="text-block-head"><span>텍스트 '+(index+1)+'</span>'+
            (index?'<button type="button" class="text-remove" data-remove-text="'+index+'">삭제</button>':'')+'</div>'+
            TEXT_FIELDS.map(field=>rowHTML(textKey(field.key,index),field.key,index&&field.ex2?field.ex2:field.ex)).join('')+'</div>';
        }
        out+='<button type="button" class="text-add" id="text-add"'+(textBlocks>=TEXT_MAX?' disabled':'')+'>＋ 텍스트 추가'+
          (textBlocks>=TEXT_MAX?' (최대 '+TEXT_MAX+'개)':'')+'</button></div>';
        return out;
      }
      function renderBuilder(){
        const blocks=[];
        BUILDER_GROUPS.forEach((group,index)=>{
          blocks.push('<div class="builder-group"><h4>'+e(group.name)+'</h4>'+group.items.map(item=>rowHTML(item.key,item.key,item.ex)).join('')+'</div>');
          if(index===1)blocks.push(textGroupHTML());
        });
        $('#builder-groups').innerHTML=blocks.join('');
      }
      function syncBuilder(){
        $$('#builder-groups .builder-row').forEach(row=>{const box=row.querySelector('[data-builder]'),input=row.querySelector('[data-builder-value]'),example=row.querySelector('[data-example]');input.hidden=!box.checked;if(example)example.hidden=!box.checked;});
      }
      function builderState(){
        const state={};
        $$('#builder-groups .builder-row').forEach(row=>{const box=row.querySelector('[data-builder]');state[box.dataset.builder]={checked:box.checked,value:row.querySelector('[data-builder-value]').value};});
        return state;
      }
      function applyBuilderState(state){
        $$('#builder-groups .builder-row').forEach(row=>{const box=row.querySelector('[data-builder]'),saved=state[box.dataset.builder];if(!saved)return;box.checked=saved.checked;row.querySelector('[data-builder-value]').value=saved.value;});
        syncBuilder();
      }
      function addTextBlock(){
        if(textBlocks>=TEXT_MAX)return;
        const state=builderState();textBlocks++;renderBuilder();applyBuilderState(state);
        syncBuilderTemplate();
        const added=$('[data-builder="'+textKey('이미지 텍스트',textBlocks-1)+'"]');
        if(added){added.checked=true;added.dispatchEvent(new Event('change',{bubbles:true}));added.closest('.text-block').scrollIntoView({block:'nearest'});}
      }
      function removeTextBlock(index){
        const state=builderState(),next={};
        Object.keys(state).forEach(key=>{if(!isTextKey(key))next[key]=state[key];});
        let slot=0;
        for(let i=0;i<textBlocks;i++){
          if(i===index)continue;
          TEXT_FIELDS.forEach(field=>{const from=state[textKey(field.key,i)];if(from)next[textKey(field.key,slot)]=from;});
          slot++;
        }
        textBlocks=Math.max(1,textBlocks-1);renderBuilder();applyBuilderState(next);syncBuilderTemplate();
      }
      function resetBuilder(){
        builderSeeds=[];fieldOverrides.clear();if(builderOwned)$('#form-template').value='';builderOwned=false;builderStatus('');$('#prompt-builder').open=false;
        textBlocks=1;renderBuilder();syncBuilder();
      }
      function builderPicks(){
        return $$('#builder-groups .builder-row').filter(row=>row.querySelector('[data-builder]').checked)
          .map(row=>({key:row.querySelector('[data-builder]').dataset.builder,value:row.querySelector('[data-builder-value]').value.trim()}));
      }
      function builderTemplate(picked){
        const chosen=new Set(picked.map(p=>p.key)),has=key=>chosen.has(key),slot=key=>'{{'+key+'}}';
        const lines=[];
        if(has('목적')&&has('핵심 주제'))lines.push(slot('목적')+'에 사용할 '+slot('핵심 주제')+' 이미지 한 장을 만들어주세요.');
        else if(has('목적'))lines.push(slot('목적')+'에 사용할 이미지 한 장을 만들어주세요.');
        else if(has('핵심 주제'))lines.push(slot('핵심 주제')+' 이미지 한 장을 만들어주세요.');
        else lines.push('이미지 한 장을 만들어주세요.');
        ['행동·상황','배경·환경','외형·디테일','구도·레이아웃','카메라','조명','스타일','색감·분위기'].forEach(key=>{if(has(key))lines.push((BUILDER_LABELS[key]||key)+': '+slot(key));});
        const used=[];
        for(let index=0;index<textBlocks;index++)if(TEXT_FIELDS.some(field=>has(textKey(field.key,index))))used.push(index);
        if(used.length){
          const detail=TEXT_FIELDS.slice(1);
          lines.push('');
          if(used.length===1){
            const index=used[0];
            if(has(textKey('이미지 텍스트',index)))lines.push('이미지에 다음 텍스트를 정확하게 넣어주세요: "'+slot(textKey('이미지 텍스트',index))+'"');
            detail.forEach(field=>{const key=textKey(field.key,index);if(has(key))lines.push(field.key+': '+slot(key));});
          }else{
            lines.push('이미지에 다음 텍스트를 정확하게 넣어주세요.');
            used.forEach((index,order)=>{
              const label='텍스트 '+(order+1),body=textKey('이미지 텍스트',index);
              if(has(body))lines.push(label+': "'+slot(body)+'"');
              detail.forEach(field=>{const key=textKey(field.key,index);if(has(key))lines.push(label+' '+field.key.replace('텍스트 ','')+': '+slot(key));});
            });
          }
          lines.push('철자를 바꾸거나 지정한 문구 외의 글자는 넣지 마세요.');
        }
        if(has('출력 조건'))lines.push('','출력 조건: '+slot('출력 조건'));
        if(has('제외 요소'))lines.push('','원치 않는 요소: '+slot('제외 요소'));
        return lines.join('\n');
      }
      renderBuilder();
      $('#builder-groups').addEventListener('change',ev=>{if(ev.target.dataset.builder!==undefined){syncBuilder();syncBuilderTemplate();if(ev.target.checked)ev.target.closest('.builder-row').querySelector('[data-builder-value]').focus();}});
      $('#builder-groups').addEventListener('input',ev=>{if(ev.target.dataset.builderValue!==undefined)syncBuilderTemplate();});
      $('#builder-groups').addEventListener('keydown',ev=>{if(ev.key==='Enter'&&ev.target.dataset.builderValue!==undefined)ev.preventDefault();});
      $('#builder-groups').addEventListener('click',ev=>{
        const example=ev.target.closest('[data-example]');
        if(example){const input=example.closest('.builder-row').querySelector('[data-builder-value]');input.value=example.dataset.exampleText;input.focus();editorDirty=true;syncBuilderTemplate();return;}
        if(ev.target.closest('#text-add')){addTextBlock();return;}
        const remove=ev.target.closest('[data-remove-text]');
        if(remove)removeTextBlock(Number(remove.dataset.removeText));
      });
      const MAX_IMAGE_EDGE=1400,IMAGE_QUALITY=.82;async function loadBitmap(dataUrl){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(Error('열 수 없는 이미지입니다. 다른 파일을 선택해주세요.'));image.src=dataUrl;});}      let uploadRatio=0;
      async function stashImage(value){
        if(!/^data:/.test(value)||!isAdmin||!accessToken)return value;
        try{if(initial.offline)return value;return await uploadImageToDrive(value);}catch{toast('이미지를 드라이브에 올리지 못해 이 브라우저에만 저장했습니다.');return value;}
      }
      async function imageRatio(dataUrl){try{const image=await loadBitmap(dataUrl);return image.naturalHeight?Number((image.naturalWidth/image.naturalHeight).toFixed(4)):0;}catch{return 0;}}
      async function shrinkImage(dataUrl,type){const image=await loadBitmap(dataUrl);if(type==='image/gif')return dataUrl;const scale=Math.min(1,MAX_IMAGE_EDGE/Math.max(image.naturalWidth,image.naturalHeight));const width=Math.max(1,Math.round(image.naturalWidth*scale)),height=Math.max(1,Math.round(image.naturalHeight*scale));const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const context=canvas.getContext('2d');if(!context)return dataUrl;context.imageSmoothingQuality='high';context.drawImage(image,0,0,width,height);let encoded='';try{encoded=canvas.toDataURL('image/webp',IMAGE_QUALITY);}catch{return dataUrl;}if(!encoded.startsWith('data:image/webp')){try{encoded=canvas.toDataURL('image/jpeg',IMAGE_QUALITY);}catch{return dataUrl;}}if(!C.validImage(encoded)||encoded.length>=dataUrl.length)return dataUrl;return encoded;}async function readImage(file){if(!file)return;if(!['image/png','image/jpeg','image/webp','image/gif'].includes(file.type))throw Error('PNG, JPG, WebP, GIF 이미지를 선택해주세요.');if(file.size>20*1024*1024)throw Error('이미지는 20MB 이하로 선택해주세요.');const data=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(Error('파일을 읽지 못했습니다.'));r.readAsDataURL(file);});if(!C.validImage(data))throw Error('이미지 형식을 확인해주세요.');const shrunk=await shrinkImage(data,file.type);uploadImage=shrunk;uploadRatio=await imageRatio(shrunk);editorDirty=true;refreshUpload();const saved=1-shrunk.length/data.length;if(saved>.05)toast('이미지를 '+Math.round(file.size/1024)+'KB에서 '+Math.round(shrunk.length*.75/1024)+'KB로 줄여서 넣었습니다.');}
      function formError(error){$('#form-error').textContent=error.message||'저장하지 못했습니다. 다시 시도해주세요.';$('#form-error').hidden=false;}
      $('#detail-body').addEventListener('mouseup',ev=>{const box=ev.target;if(box.tagName==='TEXTAREA'&&box.dataset.field!==undefined&&box.style.height&&Math.abs(parseFloat(box.style.height)-box.getBoundingClientRect().height)>2)box.dataset.resized='1';},true);
      $('#detected-fields').addEventListener('click',ev=>{const chip=ev.target.closest('[data-field-key]');if(!chip)return;const key=chip.dataset.fieldKey,field=editorFields().find(f=>f.key===key);fieldOverrides.set(key,!C.fieldRequired(field||{key}));editorDirty=true;detectedFields();});
      $('#item-form').addEventListener('input',()=>editorDirty=true);$('#form-category').addEventListener('change',fillSubOptions);$('#form-template').addEventListener('input',()=>{builderOwned=false;detectedFields();updateEditorPreview();});$('#form-template').addEventListener('paste',()=>requestAnimationFrame(()=>autoCreateFields(true)));$('#auto-fields').addEventListener('click',()=>autoCreateFields(false));
      $('#upload-file').addEventListener('change',async ev=>{try{await readImage(ev.target.files[0]);$('#form-error').hidden=true;}catch(error){formError(error);}});$('#remove-upload').addEventListener('click',()=>{uploadImage='';uploadRatio=0;$('#upload-file').value='';editorDirty=true;refreshUpload();});
      ['dragenter','dragover'].forEach(type=>$('#upload-drop').addEventListener(type,ev=>{ev.preventDefault();$('#upload-drop').classList.add('dragging');}));['dragleave','drop'].forEach(type=>$('#upload-drop').addEventListener(type,ev=>{ev.preventDefault();$('#upload-drop').classList.remove('dragging');}));$('#upload-drop').addEventListener('drop',async ev=>{try{await readImage(ev.dataTransfer.files[0]);}catch(error){formError(error);}});
      $('#item-form').addEventListener('submit',async ev=>{ev.preventDefault();if(!requireAdmin())return;const button=$('#form-submit');button.disabled=true;$('#form-error').hidden=true;try{const f=ev.target.elements;const now=Date.now();const item=C.validateItem({id:editorItem?.id||C.uid(),title:f.title.value.trim(),kind:f.kind.value,category:f.category.value,subcategories:C.subcategories(f.subcategories.value),tool:f.tool.value.trim(),template:f.template.value.trim(),description:f.description.value.trim(),tags:C.tags(f.tags.value),image:await stashImage(uploadImage),ratio:uploadRatio||editorItem?.ratio||0,fields:editorFields(),favorite:editorItem?.favorite??false,copies:editorItem?.copies??0,createdAt:editorItem?.createdAt??now,updatedAt:now,sample:editorItem?.sample??false});await commit(items=>{if(editorItem)return items.map(i=>i.id===item.id?{...item,favorite:i.favorite,copies:i.copies}:i);if(items.length>=1000)throw Error('최대 1,000개까지 보관할 수 있습니다.');return [...items,item];});editorDirty=false;$('#editor').close();if(active?.id===item.id){active.dirty=false;await openDetail(item.id);}filter.kind=item.kind;filter.imageMode=item.image?'registered':'missing';filter.category='전체';filter.subcategory='전체';filter.query='';filter.saved=false;$('#search').value='';render();toast(editorItem?'수정 내용을 저장했습니다.':'프롬프트를 추가했습니다.');}catch(error){formError(error);}finally{button.disabled=false;}});
      function showBackup(){$('#drive-section').hidden=!!initial.offline;$('.file-fallback').open=!!initial.offline;$('#backup-stats').textContent='전체 '+state.items.length+'개 · 저장한 자료 '+state.items.filter(i=>i.favorite).length+'개';$('#import-error').hidden=true;driveError('');$('#drive-backup').disabled=!isAdmin||initial.offline;$('#drive-refresh').disabled=!isAdmin||initial.offline;renderPublishPanel();$('#backup').showModal();refreshDriveList().catch(error=>driveError(error.message||'목록을 불러오지 못했습니다.'));}
      function download(content,name,mime){const blob=new Blob([content],{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
      async function completeSnapshot(){
        const data=clone(snapshot());
        for(const asset of data.images){
          if(asset.src.startsWith('data:'))continue;
          const url=asset.src.startsWith('drive:')?DRIVE_API+'/files/'+encodeURIComponent(asset.src.slice(6))+'?alt=media&key='+encodeURIComponent(GOOGLE.apiKey):asset.src;
          try{
            const response=await fetch(url,{signal:AbortSignal.timeout(20000)});
            if(!response.ok)throw Error();
            const blob=await response.blob();
            asset.src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});
            if(!C.validImage(asset.src))throw Error();
          }catch{throw Error('이미지 '+asset.id+'을 백업하지 못했습니다. 연결을 확인한 뒤 다시 시도해주세요.');}
        }
        if(new Blob([C.safeJSON(data)]).size>190*1024*1024)throw Error('백업 용량이 너무 큽니다. 이미지를 줄여주세요.');
        return data;
      }
      async function inlineResources(doc,offline=true){
        for(const link of doc.querySelectorAll('link[rel="stylesheet"]')){
          const response=await fetch(link.getAttribute('href'));
          if(!response.ok)throw Error('스타일 파일을 읽지 못했습니다.');
          const style=doc.createElement('style');style.textContent=await response.text();link.replaceWith(style);
        }
        for(const style of doc.querySelectorAll('style'))style.textContent=style.textContent.replace(/@font-face\s*\{[^}]*\}/g,'');
        for(const script of doc.querySelectorAll('script[src]')){
          if(script.id==='gis-script'){if(offline)script.remove();continue;}
          const response=await fetch(script.getAttribute('src'));
          if(!response.ok)throw Error('앱 파일을 읽지 못했습니다.');
          script.textContent=(await response.text()).replace(/<\/script/gi,'<\\/script');script.removeAttribute('src');
        }
      }
      function dateLabel(){return new Date().toISOString().slice(0,10);}
      async function exportJSON(){await commitQueue.catch(()=>{});download(C.safeJSON(await completeSnapshot()),'MuMu-Prompts-Backup-'+dateLabel()+'.json','application/json;charset=utf-8');toast('분리된 텍스트·이미지 백업 파일을 저장합니다.');}
      async function exportHTML(){await commitQueue.catch(()=>{});const data={...await completeSnapshot(),datasetId:'portable-'+C.uid(),offline:true};const htmlDoc=new DOMParser().parseFromString(originalHTML,'text/html');htmlDoc.querySelector('#app-data').textContent=C.safeJSON(data);await inlineResources(htmlDoc);download('<!doctype html>\n'+htmlDoc.documentElement.outerHTML,'MuMu-Prompts-'+dateLabel()+'.html','text/html;charset=utf-8');toast('앱과 분리된 자료 구조가 담긴 파일을 저장합니다.');}
      $('#import-file').addEventListener('change',async ev=>{const file=ev.target.files[0];if(!file)return;if(!requireAdmin()){ev.target.value='';return;}$('#import-error').hidden=true;try{if(file.size>200*1024*1024)throw Error('200MB 이하의 백업 파일을 선택해주세요.');const incoming=C.validateBackup(JSON.parse(await file.text()));const replace=$('input[name="import-mode"]:checked').value==='replace';if(replace&&!(await confirmAction('현재 자료 '+state.items.length+'개를 백업 자료 '+incoming.length+'개로 교체합니다. 현재 자료를 백업했는지 확인해주세요.','자료 교체','백업 복원')))return;await saveRecovery();let report;await commit(items=>{report=replace?{items:incoming,added:incoming.length,skipped:0}:C.merge(items,incoming);return report.items;});toast(replace?incoming.length+'개 자료로 복원했습니다.':report.added+'개 추가 · 같은 자료 '+report.skipped+'개 건너뜀');$('#backup-stats').textContent='현재 전체 '+state.items.length+'개';}catch(error){$('#import-error').textContent=error instanceof SyntaxError?'JSON 파일을 읽지 못했습니다. 이 앱의 백업 파일을 선택해주세요.':error.message;$('#import-error').hidden=false;}finally{ev.target.value='';}});
      let searchTimer;$('#search').addEventListener('input',ev=>{filter.query=ev.target.value;clearTimeout(searchTimer);searchTimer=setTimeout(()=>render(),150);});$('#clear-search').addEventListener('click',()=>{clearTimeout(searchTimer);filter.query='';$('#search').value='';render();$('#search').focus();});
      $('#detail-body').addEventListener('input',ev=>{if(!active)return;if(ev.target.dataset.field!==undefined){const f=active.draft.fields.find(f=>f.key===ev.target.dataset.field);if(f)f.value=ev.target.value;growField(ev.target);active.dirty=true;updatePrompt();}else if(ev.target.id==='detail-template'){active.draft.template=ev.target.value;active.draft.fields=C.fieldsFor(ev.target.value,active.draft.fields);$('#detail-fields').innerHTML=fieldGroupsHTML(active.draft.fields);$('#field-count').textContent=fieldCountLabel(active.draft.fields);active.dirty=true;updatePrompt();}});
      function clearFilters(){clearTimeout(searchTimer);filter.category='전체';filter.subcategory='전체';filter.query='';$('#search').value='';render();}
      document.addEventListener('click',async ev=>{const b=ev.target.closest('button');if(!b)return;try{
        if(b.dataset.category){filter.category=b.dataset.category;filter.subcategory='전체';render();return;}if(b.dataset.subcategory){filter.subcategory=b.dataset.subcategory;render();return;}if(b.dataset.sort){filter.sort=b.dataset.sort;render();return;}if(b.dataset.open){await openDetail(b.dataset.open);return;}
        if(['add','edit','duplicate','delete','save-detail','unimaged'].includes(b.dataset.action)&&!requireAdmin())return;switch(b.dataset.action){case 'admin':if(!isAdmin)openAdmin();else if(await confirmAction('관리자 모드를 끝낼까요? 다시 쓰려면 구글 계정으로 로그인해야 합니다.','로그아웃','관리자 로그아웃'))googleLogout();break;case 'close-admin':$('#admin').close();break;case 'home':filter.kind='image';filter.imageMode='registered';clearFilters();window.scrollTo({top:0});break;case 'clear-filters':clearFilters();break;case 'unimaged':filter.imageMode=filter.imageMode==='missing'?'registered':'missing';filter.category='전체';filter.subcategory='전체';render();break;case 'add':openEditor();break;case 'backup':showBackup();break;case 'close-backup':$('#backup').close();break;case 'close-detail':await closeDetail();break;case 'close-editor':await closeEditor();break;case 'copy':await copyPrompt();break;case 'save-detail':await saveDetail();break;case 'reset-detail':if(active.dirty&&!(await confirmAction('입력값과 원문을 마지막으로 저장한 상태로 되돌릴까요?','초기화')))break;active.dirty=false;await openDetail(active.id);break;case 'edit':if(active.dirty&&!(await confirmAction('현재 입력값을 먼저 저장하고 제목·이미지를 수정할까요?','저장 후 수정')))break;if(active.dirty)await saveDetail();openEditor(state.items.find(i=>i.id===active.id));break;case 'duplicate':{const copy=C.validateItem({...clone(active.draft),id:C.uid(),title:(active.draft.title.slice(0,190)+' (복제)'),favorite:false,copies:0,createdAt:Date.now(),updatedAt:Date.now(),sample:false});await commit(items=>{if(items.length>=1000)throw Error('최대 1,000개까지 보관할 수 있습니다.');return [...items,copy];});active.dirty=false;await openDetail(copy.id);toast('현재 입력값으로 복제했습니다.');break;}case 'delete':{const id=active.id;if(await confirmAction('“'+active.draft.title+'” 자료를 삭제할까요? 삭제 전 자료를 보관하며 백업 메뉴에서 복구할 수 있습니다.','삭제','자료 삭제')){await saveRecovery();await commit(items=>items.filter(i=>i.id!==id));active.dirty=false;await closeDetail();toast('자료를 삭제했습니다.');}break;}case 'export-json':await exportJSON();break;case 'export-html':await exportHTML();break;}
      }catch(error){if(error.name==='QuotaExceededError'||error.name==='UnknownError')storageError(error);else toast(error.message||'작업을 완료하지 못했습니다. 다시 시도해주세요.');}});
      $('#detail').addEventListener('cancel',ev=>{ev.preventDefault();closeDetail();});$('#editor').addEventListener('cancel',ev=>{ev.preventDefault();closeEditor();});
      window.addEventListener('beforeunload',ev=>{if(active?.dirty||editorDirty){ev.preventDefault();ev.returnValue='';}});
      async function start(){
        restoreSession();
        try{GOOGLE.dataFileId=localStorage.getItem(dbName+'-datafile')||GOOGLE.dataFileId;}catch{}
        await initStorage();
        try{
          const stored=await readStored();
          state.items=C.validateBackup(stored??initial);
          if(!stored)await writeStored(state.items);
          render();renderPublishPanel();
          if(stored&&!initial.offline)checkPublished().catch(()=>{});
          if(!stored&&!initial.offline){
            const published=await loadPublished();
            if(published&&commitQueue===startupQueue&&!active&&!editorDirty){
              await writeStored(published);state.items=published;rememberPublished(published);render();
            }
          }
        }catch(error){
          state.items=C.validateBackup(initial);storageMode='memory';render();
          toast('저장 자료를 열지 못했습니다. 기존 저장소는 유지됩니다. 백업으로 복구해주세요.');
        }
      }
      const startupQueue=commitQueue;
      start();
    })();
