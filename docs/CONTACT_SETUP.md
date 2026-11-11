# 93seconds 문의 접수 연결

## 현재 구현

- 상단과 하단의 ‘프로젝트 문의하기’ 버튼으로 같은 문의 창을 엽니다.
- 이름, 답변받을 이메일, 제작 유형, 문의 내용을 입력하고 개인정보 수집·이용에 동의합니다.
- 제출 내용을 Formspree로 POST하고, 서비스가 수신 성공을 응답한 경우에만 완료 화면을 표시합니다.
- 연결 오류·서버 오류 시 작성 내용을 유지합니다. 자동 재전송은 하지 않습니다.
- 전송 중 중복 제출을 방지하며, 개인정보는 브라우저 저장소·GitHub 저장소에 저장하지 않습니다.
- 운영자가 보낸 공개 제출 주소 `https://formspree.io/f/xnpdqjov`를 연결했습니다.
- **공개 연락처 `rkdtls789@gmail.com`, 보관 기간 ‘접수일로부터 30일 보관 후 삭제’를 반영해 제출을 활성화했습니다.**

## 무료 범위와 한계

2026-11-11 확인한 공식 요금표 기준:

- Free: 월 50건 접수, 이메일 알림, 관리함의 30일간 접수 기록, AJAX 제출 지원.
- 무료 플랜은 장기 보관용 데이터베이스가 아닙니다.
- 장기 관리함 보관, 대시보드 내보내기, Google Sheets 연동 등은 요금제별 제한이 있습니다.
- 사이트의 자체 완료 화면은 AJAX 성공 후 로컬에서 표시하므로 유료 ‘Thank You 페이지 리디렉션’ 기능을 사용하지 않습니다.
- 파일 업로드·자동회신·유료 플러그인·API 키를 사용하는 기능은 넣지 않았습니다.
- 이메일로 수신한 내용은 Gmail의 저장·삭제 설정에 따릅니다. Formspree의 30일 조회 제한이 Gmail 메일까지 자동 삭제한다는 뜻이 아닙니다.

접수량이 늘거나 30일 이상 별도 기록이 필요하면, 계정 플랜과 보관 방식을 다시 정해야 합니다. 이 작업에서 유료 플랜이나 결제를 신청하지 않았습니다.

## 계정에서 확인할 내용

1. Formspree 계정에서 현재 플랜이 Free인지 확인합니다. 요금표 상단의 유료 플랜 대신 아래의 Free Forever 항목을 확인할 수 있습니다.
2. ‘93seconds 문의’ 폼의 수신 이메일(Target Email 또는 Workflow의 이메일 알림)을 받을 Gmail로 설정하고 인증 메일을 확인합니다.
3. 공개 개인정보 문의 이메일은 `rkdtls789@gmail.com`이며 보관 기간은 접수일로부터 30일입니다. 정한 기간에 맞춰 Formspree와 Gmail의 접수 내용을 관리합니다. 사이트 코드가 Gmail 메일을 자동 삭제하지는 않습니다.
4. 연결 확인용 테스트 문의 1건을 제출했고 Formspree의 HTTP 200 및 `ok: true` 응답을 받았습니다. Formspree 관리함과 Gmail에서 ‘[93seconds] 문의 폼 연결 확인용 테스트’를 확인합니다. 스팸함도 확인합니다. 공개 개인정보 연락처 설정은 Formspree의 수신 이메일 설정을 변경하지 않으므로 수신 주소도 계정에서 확인해야 합니다.

비밀번호, Gmail 앱 비밀번호, Formspree API 키는 이 사이트에 필요하지 않습니다. 공개 제출 주소는 비밀키가 아니며 브라우저 코드에서 보이는 것이 정상입니다.

## 반영된 설정

공개 연락처와 보관 문구를 설정하고 제출 버튼 활성화를 확인했습니다. 실제 서비스는 테스트 요청을 수락했습니다. 관리함 표시와 Gmail 도착 여부는 계정 소유자의 확인이 남아 있습니다.

```js
export const contactConfig = Object.freeze({
  endpoint: "https://formspree.io/f/xnpdqjov",
  privacyContact: "rkdtls789@gmail.com",
  retentionPolicy: "접수일로부터 30일 보관 후 삭제",
});
```

개발 검증에서는 가짜 응답으로 성공·오류·중복 방지를 확인했습니다. 이후 실제 서비스에 테스트 1건을 제출해 접수 성공 응답과 현재 사이트 출처에 대한 CORS 허용 응답을 확인했습니다. 실제 Gmail 수신은 아직 확인하지 않았습니다.

## 운영 설정

- 제출 주소가 속한 Formspree 폼에서 이메일 알림이 켜져 있는지 확인합니다.
- Restrict to Domain 기능을 사용하면 `gimiyoni6378-dot.github.io`를 등록합니다. 이 제한은 추가 보호이며, 서버의 스팸 차단을 대체하지 않습니다.
- 빈 `_gotcha` 허니팟 필드를 전송하며, 봇이 값을 채우면 브라우저에서도 제출을 차단합니다.
- Formspree에서 CAPTCHA를 요구하도록 설정했다면, AJAX 제출과 호환되도록 별도 CAPTCHA 위젯/토큰 연동이 필요할 수 있습니다. 실제 제출 테스트에서 확인합니다. 비밀키는 Formspree 대시보드에만 입력해야 합니다.
- 무료 접수량과 스팸함을 정기적으로 확인합니다. 이 코드에는 별도 서버·데이터베이스나 무제한 저장 기능이 없습니다.
- 정책 문구는 현재 운영 범위를 설명하는 기본 안내입니다. 외부 서비스의 개인정보 처리·국외 처리 조건 등은 실제 서비스 운영에 맞게 확인하고 안내를 보완하세요.

## 공식 자료

- [폼 생성·이메일 알림·관리함 저장](https://help.formspree.io/articles/building-your-form/building-an-html-form/)
- [요금표](https://formspree.io/plans)
- [무료 플랜 접수량·보관 제한](https://help.formspree.io/articles/account-management/account-limits/)
- [스팸 방지 설정](https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings/)
