# OBJ-096 — 소련 대형 경계 실제 편집·확정·취소 CPU 및 원본 참조 회귀

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 조사일: 2026-10-17 · 현재 상태: `source-move-verified / end-to-end-blocked-by-core-document-prepare-timeout`
> 제품 기준: `work/perf-source-row-owners-20261017` `45c5032198ad3e2d1dd636a5280d856d475cdfd1` (OBJ-092~095 포함)
> 테스트 작업 브랜치: `work/perf-soviet-edit-acceptance-20261017`
> 실행: [GitHub Actions 실브라우저 #39040496743](https://github.com/kimjeon-il/Pando/actions/runs/39040496743)
> 제품 JS·C++/WASM, GIS 원본·`main` 변경 없음. 테스트/보고서 전용.
기존 [DEV-085](soviet-boundary-preparation-2026-10-16.md)는
1989-06 소련 해안선 편집 **모드 진입 및 즉시 취소**에 대해 화면 표시,
Worker 편집 준비, 소스 지연 선분화, CPU 대기시간을 계측했다.
[OBJ-094](soviet-contact-wire-lifetime-2026-10-17.md)는 현대 국가
러시아–중국 쌍의 **직접 C++ 접촉 함수** 5회에 대해 데이터 동등성 및
호출 시간을 비교했다. [OBJ-095](soviet-prepared-source-row-compact-2026-10-17.md)는
12회 **시점 왕복**, packed source-ref 및 GPU pan 등을 검증했다.
그러나 이들은 **실제 소련 국가의 경계 정점을 움직인 후**
미리보기 결과를 버리거나 확정하고, Undo/Redo와 원본 경계 참조
복구까지 동일 Chromium에서 반복 검증한 완결형 시나리오는 아니다.
Chromium WebGL2/SwiftShader, 1440×900, 1989-06을 고정하고
역사 세계 내 `state:soviet-union`의 실제 형상을 사용한다.
테스트는 `tests/browser/soviet-real-edit-commit-cancel.spec.mjs`이다.
1. 완전한 웹 초기화 및 소련 존재, 도형 직렬화 fingerprint 확보.

## 1. 왜 추가 검증이 필요한가
## 2. 검증 경로
## 3. 판정 기준과 경계
## 4. 실제 실행 결과 — Worker 이동 정상, Core 문서 후보 생성 제한시간 초과
### 4.1 독립적인 실제 소련 Worker 이동 (확정)
### 4.2 실제 UI 드래그 → 국경 편집 → Core 후보 준비: 반복된 차단 지점
## 5. 결론 및 남은 필수 작업

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/76eda7e5292ca55f0ec1e150b7136cd5774f4c689be0b1bdf89e59644c96aab3.gz) · 원본 SHA-256 `76eda7e5292ca55f0ec1e150b7136cd5774f4c689be0b1bdf89e59644c96aab3`.
