# 웹·앱 공통 열람 규칙 연결 수정

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-POLICY-FIX-20261019` · 상태: `focused-verified / published / existing-ci-failures` · 지도 반영: `not-applicable` · 색인일: 2026-10-19
> 원문 최종 수정: 2026-10-19
> 조사 기준: 제품 `83dfdf70f40effa48634dfed566ed6dbba1ae1f7`, 작업 기준 `0bb54fa7207ce06975d6b8d0474ebcc617542ff9`, 최초 수정 `5a07e8b276a4284114990eddee0d08ef6e85b80e`, 최종 제품 `44fb6d41977123b5220cde8078f1e9a7e38b2728`
> 근거: [추가 조사](independent-view-policy-audit-2026-10-19.md), 실제 공통 소유자와 Core/WASM, 관련 회귀 검사
추가 조사에서 확인한 R1~R8을 수정한다. 상설 UI 워크트리의 기존 Core/WASM·프로젝트 설정·시점 비교·편집 작업은 보존하고 이 배포에 섞지 않는다. GIS 자료와 C++ 엔진은 변경하지 않는다.
웹 초기 프레임이 문서 열기보다 먼저 준비될 수 있으므로 선택·프로젝트 포트는 이미 생성된 단일 DocumentSession을 읽도록 했다. 임시 `session`을 읽다 실패하던 연결을 제거했다. 라벨의 시점 snapshot과 라벨 갱신도 실제 MapHost/RenderingDomain으로 연결한다. 공통 resize의 `workspaceUiB`는 실제 WorkspaceSurfaces에 연결하고 visualViewport 리스너는 시작·종료 시 중복되지 않게 등록·해제한다. 수명 종료 시 host·관찰자·렌더러를 해제한다. 지명 소유자에도 renderingDomain을 초기 null 값으로 복사하지 않고 getter로 연결하며, 내장 지명 발행 오류가 발생하면 브라우저 회귀 검사가 실패한다.
`shared-view-policy.spec.mjs`에서 웹·앱의 실제 공통 메서드와 렌더 내부 값을 관찰한다. 알고리즘 대역 없이 선택 설정·패스·경위선·25% 슬라이더·지형 끄기·다음 달 버튼·공통 host/observer·복구 진단의 동작을 검사한다. 수정 전 웹에서 8건의 실패를 확인했다.

## 수정 범위
## 검증 방법과 수정 전 실패
## 조사 해석 정정 및 추가 리뷰
## 실행 결과
## 한계 및 배포
## 최종 후속 게시 확인
## 전체 CI의 기존 실패와 구분
## 판본

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/595b02b4bf325d2de5c82bc3bb597a1eaed7e652ed2bdf57495b37fca88591d3.gz) · 원본 SHA-256 `595b02b4bf325d2de5c82bc3bb597a1eaed7e652ed2bdf57495b37fca88591d3`.
