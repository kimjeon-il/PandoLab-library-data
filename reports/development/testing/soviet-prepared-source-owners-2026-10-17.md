# OBJ-093 — 공유 국경선 국가별 준비 자료의 참조 소유권과 재사용 비용

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 2026-10-17 · 상태: `verified-source-and-3-isolated-gc-orders`
> 기준 제품: `work/perf-singleton-edges-20261017` `f2370babfccf3dd07dca26f11aeecab4434189ca` (OBJ-092 적용)
> 조사 브랜치: `work/perf-prepared-owners-20261017`
> CI: [실제 소련→현대 준비 자료 독립 GC 세 순서 #39036298519](https://github.com/kimjeon-il/Pando/actions/runs/39036298519)
> **제품 JS·C++/WASM·지도 데이터·`main` 변경 없음.**
`country-shared-boundary-worker.js`의 `boundaryState`가 `preparedStore`를 소유하고,
`createPreparedBoundaryStore()`는 `byId`와 상위 `spatialIndex`를 유지한다.
- `byId`의 국가 준비 객체는 `feature`, `geometry`, `segments`, `bounds`, 국가별 `spatialIndex`, 지연 렌더링 선분 view를 포함한다.
- 상위 `spatialIndex`는 동일한 국가 준비 객체를 인덱싱한다. 별도의 국가별 source segment 전체 사본을 구축하지 않는다. 기존 OBJ-091에서는 254개 prepared geometry가 마지막 메시지 geometry 254개와 모두 동일 객체였다.
- `boundarySourceSegments()`는 원본 geometry 좌표 배열 `a`, `b`를 공유하는 JS source-row 객체를 생성한다. 원본 좌표 외에도 polygon/ring/segment 번호와 winding/interior 정보를 보관한다.
- `createBoundarySpatialIndex().loadPacked()`는 128개 이상 선분의 불변 국가 형상에 TypedArray box offsets, bounds, postings, visited와 cell-offset Map을 보관한다. `packed.values`는 국가 준비 객체의 **동일한** `segments` 배열을 참조하며 복제하지 않는다.

## 1. 최신 제품 코드에서 확인한 참조 그래프
## 2. 계측 설계
## 3. 작업 판정 기준
## 4. 현재 검증 상태
## 5. Chromium 실측 (2026-10-17, 세 컨텍스트)

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/0ddb107395dd87bacf6af85012ba0a3768bff96db4848d48edaa240826a0732b.gz) · 원본 SHA-256 `0ddb107395dd87bacf6af85012ba0a3768bff96db4848d48edaa240826a0732b`.
