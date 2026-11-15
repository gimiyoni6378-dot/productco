# 프로젝트 디자인 참고

사용자가 선호하며 재사용을 요청한 **아이보리 시네마 무드**는 [docs/DESIGN_MOOD.md](docs/DESIGN_MOOD.md)에 정리되어 있습니다. 관련 디자인 요청에서는 이 문서와 `#programs`의 실제 구현을 참고하세요. 현재 사용자 요청이 항상 우선합니다.

## 프로젝트 SEO/AEO 도구

- SEO 도구 스킬은 `.agents/skills/seo*`, GEO Optimizer 스킬은 `.agents/skills/geo-optimizer`에 있습니다. 이 저장소를 Codex에서 열면 프로젝트 스킬로 사용합니다.
- Codex SEO의 고정된 upstream 소스는 `.agents/vendor/codex-seo`에 있습니다. 스크립트를 실행할 때 `CODEX_SEO_ROOT`를 이 경로로 설정합니다. 사용법과 다른 PC 설정은 [docs/SEO_TOOLS.md](docs/SEO_TOOLS.md)를 참고합니다.
- Google API/OAuth 토큰과 외부 서비스 자격 증명은 로컬 사용자 설정에만 저장하고 Git에 올리지 않습니다. 유료 AI 인용 조회 전에는 비용을 확인합니다.
- GEO Optimizer의 파일 변경은 미리보기부터 확인하고, 사용자가 적용을 요청한 경우에만 씁니다.
