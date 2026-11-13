# 93seconds

배우 포트폴리오·시네마틱 영상 제작을 소개하는 정적 홈페이지입니다.
HTML, CSS, JavaScript로 구성하며 `main` 변경 시 GitHub Pages로 배포됩니다.

## 구성
- `index.html`: 브랜드 소개, 작품, 제작 과정, 서비스, FAQ, 문의
- `styles.css`: 반응형 디자인과 타이핑 효과
- `script.js`: 헤드 타이핑, 작품 카드 내 영상 재생
- `contact.js` / `contact-config.js`: 문의 창과 Formspree 제출 연결
- `analytics.js` / `analytics-consent.css`: GA4 동의, 유입·페이지·문의 이벤트
- `assets/motion/`: 모션 효과

## 검색을 위한 HTML 구성
- 서비스와 브랜드를 설명하는 페이지 제목·메타 설명
- 현재 공개 URL을 가리키는 canonical과 Open Graph 정보
- 기존 메인 H1과 섹션별 H2, 서비스별 H3
- 실제 HTML에 포함된 서비스 설명·FAQ 및 주요 영역으로 연결하는 탐색 링크
- 순서가 있는 제작 과정 목록, 각 섹션과 제목의 명시적 연결

홈페이지에 브랜드명, 사이트 URL, 로고, 공개 이메일을 담은 `Organization` JSON-LD와 Google 검색결과의 사이트 이름을 지정하는 `WebSite` JSON-LD를 추가했습니다.
Google Search Console URL 접두어 속성은 등록되어 있으며 sitemap도 제출된 상태입니다.
검색엔진의 실제 색인이나 검색 순위는 이 코드만으로 확인하거나 보장할 수 없습니다.
도메인을 변경하면 canonical과 Open Graph URL도 함께 갱신해야 합니다.

## Google Analytics 4
- 측정 ID: `G-ZY5622LZME`
- 방문자가 분석을 허용한 경우에만 Analytics 태그가 로드됩니다. 거절한 경우에는 분석 요청과 쿠키를 만들지 않습니다.
- GA4 자동 페이지 조회와 향상된 측정으로 페이지 조회, 유입 경로, 스크롤·외부 링크 클릭을 확인합니다. 추가 이벤트: `section_navigation`, `contact_form_open`, 문의 접수 성공 시 `generate_lead`, 접수 오류 시 `contact_form_error`.
- 디버깅: URL 끝에 `?ga_debug=1`을 붙여 방문한 뒤 분석을 허용하면 DebugView에서 이벤트를 확인할 수 있습니다. 문의 성공 이벤트는 Formspree가 접수를 확인한 경우에만 전송되며, 문의 필드 값은 Analytics로 보내지 않습니다.
- 개인정보처리방침의 Analytics 설명과 동의 문구를 운영 공개 전에 검토하세요.

## 오픈 전 확인
1. [문의 접수 연결 안내](docs/CONTACT_SETUP.md)를 따라 수신 이메일 인증·공개 개인정보 연락처·보관 기간 설정
2. 공개할 작품마다 카드의 `data-video`에 공개 가능한 영상 URL, `data-video-thumbnail`에 해당 작품의 공개 썸네일 URL 입력
3. 영상 공개일을 정한 뒤 `data-video-upload-date`에 ISO 날짜 입력 (예: `2026-11-12`); 이후 VideoObject 구조화 데이터에 사용
4. 참고 이미지를 실제 작업 이미지로 교체하고 사용 권한 확인
5. 서비스 설명과 FAQ의 실제 운영 내용 확인

작품 카드에서 영상이 연결되면 카드 안에 플레이어가 나타나며, 다른 작품을 재생하면 이전 영상은 멈춥니다.
브랜딩 무드 작품은 Cloudinary 영상 URL이 연결되어 있고, 아직 연결하지 않은 세 작품에는 카드에 영상 준비 중 안내가 표시됩니다.
가격·납기·운영 주소·실적·고객 후기는 제공되지 않아 작성하지 않았습니다.

작품 카드를 누르면 모달 없이 카드 안에서 영상이 재생됩니다. 작품별 썸네일이 입력되면 플레이어 포스터로 사용됩니다. 검색엔진용 영상 구조화 데이터는 실제 영상 URL, 썸네일 URL, 공개일이 준비된 뒤 추가해야 합니다.

## 로컬 확인
저장소에서 `python -m http.server 8765` 실행 후 `http://localhost:8765` 접속.

문의 양식을 활성화했습니다. 공개 개인정보 문의 이메일은 rkdtls789@gmail.com이며 보관 기간은 접수일로부터 30일입니다. Formspree 테스트 접수는 성공했고, 운영자 Gmail의 실제 도착 확인은 남아 있습니다. Formspree 무료 플랜의 접수량·보관 제한과 운영자/개발자별 작업은 [문의 접수 연결 안내](docs/CONTACT_SETUP.md)에 정리했습니다.
