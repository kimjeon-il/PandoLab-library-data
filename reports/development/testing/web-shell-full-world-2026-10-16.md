# 공통 웹 초기화 및 전체 세계 데이터 패키징 — 2-3A~C

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `DEV-080` · 상태: `investigating` · 지도 반영: `not-applicable` · 색인일: 2026-10-16
> 원문 최종 수정: 2026-10-16
> 조사 기준: `work/ui`, 2026-10-16
> 원본·출처: [앱 실행법](https://github.com/kimjeon-il/Pando/blob/75499e014542747def35653a73b753e208ed0d31/apps/web-shell/README.md), [세계 데이터 manifest](../../../assets/data/world/current.json)
2-3A: 전체 세계지도 앱은 `apps/web-shell/startup.js`에서 웹의 `assets/js/bootstrap.js`를 호출한다.
기존 웹 `data-loader-worker.js`가 빠른 미리보기 → 원본 국가 packet → 정본 메시를 로딩한다.
`assets/js/app.js`는 Tauri가 미리 주입한 platform 기능만 선택적으로 넘기고, 웹에서는 기존 기본값 `{}`를 사용한다.
소형 15좌표 검증 프로필은 변형하지 않고 따로 유지한다.
2-3B: `apps/web-shell/stage.mjs`의 `full-world` 프로필은 정본 manifest에서 포함 파일을 자동 산출한다.
정본 258개국용 다섯 메시/국가 자산, 공유 국경선 캐시, 역사 프로젝트, 국가·지역 라이브러리,
미리 계산한 정밀 다각형 메시의 현재 참조 파일만 포함한다.
개별 pin을 가진 파일은 staging 전에 압축 크기와 SHA-256을 대조한다.
전체 세계 패키징 한도는 256 MiB, 소형 시험 한도는 80 MiB로 분리한다.
2-3C: 실행 모드의 `stage-profile.json`과 빌드된 자산 리비전을 일치시키고,
로컬 origin 이외 모든 네트워크 요청을 계속 차단한다.
`full-world` 프로필만 로컬 `assets/data/` 요청을 허용한다.
웹의 기본 역사 자료 공급자를 재사용하며 전체 세계와 시험 데이터의 IndexedDB 이름을 분리한다.
수계·지형·내장 지명은 비활성화된 상태로 유지한다.
- 실제 저장소 `assets/data/world/current.json`의 국가 수는 258.
- published metadata + world/historical/library/prepared manifest에서 해석된 대상은 **597개 파일**.

## 목적과 구현
## 검증 근거
### 독립 실행 환경 검증 추가 (2026-10-16)
## Windows 실제 전체 세계자료 패키징·WebView 실행 검증 (2026-10-16)
## 후속 단계

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/2c877b5202f07b0d13887fd16f9b18975bcc0b516e9b7fb9864eeb8b9db09661.gz) · 원본 SHA-256 `2c877b5202f07b0d13887fd16f9b18975bcc0b516e9b7fb9864eeb8b9db09661`.
