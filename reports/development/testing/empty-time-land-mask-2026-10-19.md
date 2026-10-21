# 객체가 없는 시점의 육지 소실 원인 조사

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-EMPTY-TIME-LAND-20261019` · 상태: `reproduced / cause-confirmed / not-fixed / native-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-19
> 조사 기준: `work/ui`·main `264fff61b7f4138c9f19d56d2ef8bc917dce5730`, 게시 소스 `e401fa2980dad6662a915e4c9779206adcc2f0db`, build `0.36.0-build-da7b744937ec`
> 근거: 사용자 화면, 공개 사이트의 실제 시점 이동과 픽셀, [진단 JSON](empty-time-land-mask-2026-10-19.evidence.json), 공통 영토 읽기 모델과 두 렌더 경로
별도의 소유 Edge 브라우저에서 공개 사이트를 열고 Canvas Worker를 강제했다. 사용자 브라우저는 조작하지 않았다. 지도 창은 1280×800 CSS px, 지구본 배율 16, 홍콩 중심이며 실제 육지 좌표 `[114.15,22.35]`를 비교했다. 원본 사이트의 Worker 소스나 응답을 바꾸지 않고 전달 메시지의 개수와 공개 디버그 상태를 관찰했다.
9월에도 다른 지역의 루트 형상 5개가 남으므로 전 세계 객체가 모두 0개라고 해석하지 않는다. 제보 지역을 덮는 형상이 빠지는 것이 핵심이다. 모든 단계에서 document revision/checkpoint는 0, dirty/documentDirty/presentationDirty는 false였다. 시점 cursor만 10월→9월→10월로 바뀌고 다시 원래 육지가 복구됐다. runtime pageerror는 없었다. 지형 타일이 미완성이거나 문서가 삭제된 증거는 없다.
육지 바탕과 지형의 육지/바다 선택 마스크가 물리 지형의 독립적인 육지 자료를 따르지 않고, 해당 시점에 표시되는 영토 객체 형상을 사용한다.
1. `territorial-entity-store.js`는 C++가 해당 시점으로 해석한 `documentModel.territorialViews()`를 제공한다. `territorial-entity-repository.js`와 `builtin-session.js:builtinTerritorialScene()`은 그 객체를 받아 루트·하위 표시 형상을 구성한다.

## 재현
## 원인
## 하단 개수 표시
## 수정 방향과 범위
## 구현 후속

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/9e1228b96748b47d62b1dcb73870768acb766398c09c2cfed7ee678fb94170a0.gz) · 원본 SHA-256 `9e1228b96748b47d62b1dcb73870768acb766398c09c2cfed7ee678fb94170a0`.
