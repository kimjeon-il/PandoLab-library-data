# UI 공통 규칙 통합 P0 — 구조·상태·회귀 기준 조사

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-CONVERGENCE-P0-20261020` · 상태: `source-audited / focused-runtime-baseline-not-rerun` · 지도 반영: `not-applicable` · 색인일: 2026-10-20  
> 원문 최종 수정: 2026-10-20  
> 조사 기준: 웹 `8cb2883e4bd09ba014965b3ce7bec1d5770c1b33` / Tauri WebView 앱 `8cb2883e4bd09ba014965b3ce7bec1d5770c1b33` (`work/ui`; 조사 시작 시 `main`과 동일)  
> 원본·출처: `ui/templates/`, `ui/fragments/`, `assets/js/modules/`, `assets/css/`, `tests/browser/`, `tests/unit/`, `docs/architecture/ui-architecture.md`, `docs/architecture/ui-components.md`  
> 본 단계: 코드 변경 **없음**. P1–P6 구현 전에 기존 구조와 기능 보존 계약을 동결하기 위한 읽기 전용 소스 조사.
2026-10-20 기준 최신 웹(viewer)과 WebView 기반 Tauri 편집 앱(editor)을 조사했다. **구 Qt 앱은 대상이 아니다.** 웹 진입점은 `ui/templates/web.html` → 생성물 `index.html`, 앱 편집 진입점은 `ui/templates/editor.html` → 생성물 `apps/web-shell/editor.html`이다. 공통 스타일은 `scripts/lib/ui-source-catalog.mjs`가 등록한 원본으로 구성하고 `scripts/build-ui-bundle.mjs`가 웹/앱 CSS bundle을 생성한다. 향후 수정에서 생성 HTML/CSS만 직접 고치지 않는다.
공통 계약은 `docs/architecture/ui-architecture.md`와 `docs/architecture/ui-components.md`를 우선한다. **상태 단일 소유, 고정된 DOM 및 단일 핸들러를 우선하되, 실사용 기능이 동일하지 않은 구조를 무조건 같은 DOM으로 바꾸지 않는다.** 지오메트리·저장·Core 명령·Undo 계산은 본 계획 범위 밖이다.

## 1. 대상과 판단 기준
## 2. 항목별 현행 동작과 변경 금지 계약
### U01 객체 컨텍스트 메뉴
### U02 프로젝트 생성
### U03 환경설정 모달 포커스
### U04 검색창
### U05 가로 화면
### U06 삭제 버튼
### U07 지도 편집 작업창
### U08 참조 이미지 Surface

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/35e83df5317f5c5fd9c85fb7ee184fbb9ca63a871985d39e1d4cf9e6283e995c.gz) · 원본 SHA-256 `35e83df5317f5c5fd9c85fb7ee184fbb9ca63a871985d39e1d4cf9e6283e995c`.
