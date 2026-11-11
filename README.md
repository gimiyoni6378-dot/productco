# 93seconds

배우 포트폴리오·시네마틱 영상 제작을 소개하는 정적 홈페이지입니다.
HTML, CSS, JavaScript로 구성하며 `main` 변경 시 GitHub Pages로 배포됩니다.

## 구성
- `index.html`: 브랜드 소개, 작품, 제작 과정, 서비스, FAQ, 문의
- `styles.css`: 반응형 디자인과 타이핑 효과
- `script.js`: 헤드 타이핑, 영상 모달
- `contact.js` / `contact-config.js`: 문의 창과 Formspree 제출 연결
- `assets/motion/`: 모션 효과

## 검색을 위한 HTML 구성
- 서비스와 브랜드를 설명하는 페이지 제목·메타 설명
- 현재 공개 URL을 가리키는 canonical과 Open Graph 정보
- 기존 메인 H1과 섹션별 H2, 서비스별 H3
- 실제 HTML에 포함된 서비스 설명·FAQ 및 주요 영역으로 연결하는 탐색 링크
- 순서가 있는 제작 과정 목록, 각 섹션과 제목의 명시적 연결

구조화 데이터(JSON-LD), Search Console 등록 및 사이트맵 제출은 이후 작업입니다.
검색엔진의 실제 색인이나 검색 순위는 이 코드만으로 확인하거나 보장할 수 없습니다.
도메인을 변경하면 canonical과 Open Graph URL도 함께 갱신해야 합니다.

## 오픈 전 확인
1. [문의 접수 연결 안내](docs/CONTACT_SETUP.md)를 따라 수신 이메일 인증·공개 개인정보 연락처·보관 기간 설정
2. 준비 중인 세 작품의 `data-video`에 공개 가능한 영상 URL 입력
3. 참고 이미지를 실제 작업 이미지로 교체하고 사용 권한 확인
4. 서비스 설명과 FAQ의 실제 운영 내용 확인

브랜딩 무드 카드에는 Cloudinary 영상이 연결되어 있습니다.
다른 작품 카드는 참고 이미지이며 영상이 준비 중임을 화면에 표시합니다.
가격·납기·운영 주소·실적·고객 후기는 제공되지 않아 작성하지 않았습니다.

## 로컬 확인
저장소에서 `python -m http.server 8765` 실행 후 `http://localhost:8765` 접속.

문의 양식은 구현되어 있으며 실제 접수는 설정이 완료된 뒤 활성화됩니다. Formspree 무료 플랜의 접수량·보관 제한과 운영자/개발자별 작업은 [문의 접수 연결 안내](docs/CONTACT_SETUP.md)에 정리했습니다.
