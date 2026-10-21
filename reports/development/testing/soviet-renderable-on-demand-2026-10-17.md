# OBJ-090 — 공유 국경선 렌더링 선분 지연 생성 및 Worker 메모리 A/B

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 2026-10-17 · 상태: verified-web-paired-and-12cycle · 지도 반영: not-applicable
> 변경 전 기준 제품: `main` `6b0c501dd09029ef237e90c1ef55fdb82bdf315f` (OBJ-089 packed source index 적용)
> 변경 브랜치: `work/perf-renderable-on-demand-20261017` · 제품 변경: **3개 JavaScript 모듈**, 원본 GIS/역사 경계·C++/WASM 변경 없음
> 실측: [동일 러너 A/B #39030467405](https://github.com/kimjeon-il/Pando/actions/runs/39030467405) · [지리/접촉/편집 집중 검증 #39030167527](https://github.com/kimjeon-il/Pando/actions/runs/39030167527)
과거 [OBJ-088](soviet-shared-border-retained-owners-2026-10-17.md)에서는 현대 공유 경계 Worker의
`preparedStore.values()[].renderableSegments`를 별도로 제거할 때 JS 힙 약 **61.32MiB**가 해제되는 것이 관측됐다.
원래 `prepareBoundaryFeature()`는 모든 254개 국가에 대해
`buildRenderableBoundarySegments(feature.geometry)`를 호출하고,
총 약 **543,386개**의 렌더링용 선분을 중첩 JS 배열 형태로 상시 보유했다.
실제 유일한 제품 소비 경로는 `prepareCountrySharedBoundaryPacket()`의
**상위 국가(root) 외곽선 차감**이다. 단순 카메라 pan/zoom에는 국가별 전 선분 배열이 필요하지 않다.
- `geographic-boundary.js`: 기존 `appendGeometry/appendEdge`의 정본을 그대로 사용해
  `forEachRenderableBoundarySegment()` 방문 방식 추가. 지구 날짜변경선 분할, 인공 극점, 폐곡선·구멍 처리 변경 없음.
- `boundary-topology.js`: 국가 준비 객체에 **지연 iterable/view**만 유지.

## 1. 원인과 변경된 소유 경계
## 2. 단일 러너, 동일 현대 세계 A/B
## 3. 기능 검증·제외 범위
## 4. 최종 장기 게이트 및 다음 조사

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/9f5551d09c4366871c2df4c85f0941e6f3232bbb7b2d4e8dc6350955109f781f.gz) · 원본 SHA-256 `9f5551d09c4366871c2df4c85f0941e6f3232bbb7b2d4e8dc6350955109f781f`.
