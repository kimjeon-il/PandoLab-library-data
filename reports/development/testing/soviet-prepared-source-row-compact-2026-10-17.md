# OBJ-095 — 장기 보유 공유 국경 원본 선분의 링 메타데이터 압축

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 조사·구현: 2026-10-17 · 상태: `verified-web-paired-and-12cycle` · 지도·GIS 원본 데이터 수정: 없음
> baseline: `work/perf-contact-wire-lifetime-20261017` `0059af35094609390d8ce03f76339e5ef8c27948` (OBJ-094)
> candidate: `work/perf-source-row-owners-20261017`, 제품 소스: `assets/js/modules/boundary-topology.js`, `assets/js/modules/country-contact-core.js`
> CI: [68개 집중 테스트 + 동일 러너 Worker 메모리 A/B #39038555583](https://github.com/kimjeon-il/Pando/actions/runs/39038555583) · [실제 인접 국가 CPU A/B #39038607376](https://github.com/kimjeon-il/Pando/actions/runs/39038607376) · [12회 왕복 및 순수 pan #39038672944](https://github.com/kimjeon-il/Pando/actions/runs/39038672944)
[OBJ-093](soviet-prepared-source-owners-2026-10-17.md)에서 독립 Chromium 3개의
GC 해제 순서를 교차했을 때 국가별 source-row 객체 배열과 per-country index의
**합산** 해제 효과가 약 27.48~27.49MiB였다.
이는 모두 중복 낭비된 객체 바이트가 아니라, 실제 source-ref / 편집 후보 조회에 필요한
행 객체와 공간 인덱스 참조가 공유하는 retained graph다. OBJ-094는 별도의
C++ 변환 배열 상주 약 23.8MiB를 이미 제거한 기준이다.
`prepareBoundaryFeature()`가 보유하는 source edge 각각은 원래
`featureId`, `polygonIndex`, `ringIndex`, `segmentIndex`,
`endVertexIndex`, `a`, `b`, `interiorSide` 필드를 갖는 JS 객체였다.

## 목표, 실제 소유권, 변경하지 않은 것
## 집중 기능 계약
## 동일 러너 현대 복귀 메모리 A/B
## 실제 국경 접촉 CPU
## 미완료 및 다음 단계

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/31041315b352f0a06d06310e122f00680301341be34b3ec0176884418066b26c.gz) · 원본 SHA-256 `31041315b352f0a06d06310e122f00680301341be34b3ec0176884418066b26c`.
