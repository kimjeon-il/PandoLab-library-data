# 국가·하위단위 통합 후 함수·API 정리 조사

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

조사일: 2026-10-03. 기준 커밋: `28e37086d7851bd3368afd86cf5a1c03c66ff2bb`.
조사 시 `main`, `origin/main`, `origin/codex/territorial-entity-repository`가 같은 커밋이었다. 시작 작업 트리는 깨끗했다.
이번 작업은 코드와 호출 경로 조사다. 제품 코드 수정, 테스트 실행, 커밋·푸시·배포는 하지 않았다.
Store/Repository 통합은 이미 들어갔다. 새 저장소를 만드는 작업이 필요하지 않다. 남은 정리는 기존 공통 owner를 사용하는 진입점을 하나로 줄이고, 사용되지 않는 API와 타입별 presentation 중복을 제거하는 작업이다.
현재 공통 owner:
- 읽기·행정 계층: `territorial-entity-repository.js`의 `get`, `list`, `children`, `parent`, `siblings`, `ancestors`, `descendants`, `root`, `administrativeCountry`.
- 물리 저장 쓰기: `territorial-entity-store.js`의 `setField`, `setLocked`, `appendEntities`, `removeEntities`, `replaceCollections`.
- 메타데이터 명령·이력: `territorial-service.js`의 `updateMetadata`, `setColorBatch`, `setLocked`, `setLockedBatch`와 document mutation runner.
- 선택 상태: selection domain / `selection-ui-controller.js`.
- 삭제 시 연관 자료 정리: `territorial-interaction-policy.js`의 `removeTerritorialEntities`.
- 국가와 하위단위의 공간 제약을 함께 계산하는 편집 계획: `territorial-edit-plan.js`.
- Polygon winding: `country-geometry.js`. 이름은 국가용이지만 실제 계약은 일반 Polygon/MultiPolygon에 적용된다.
앞선 정리에서 제거한 `administrativeChildren` 등의 Repository 별칭, 서비스의 `runGeometryTransaction`·`validateRelations`, presentation의 `runTerritorialUnitTransaction`·`validateTerritorialUnitRelations`를 다시 정리 대상으로 세지 않았다.

## 1. 결론과 현재 통합 상태
## 2. 조사 범위와 판단 방식
## 3. 실행 호출처가 없는 함수 16개
## 4. 기존 공통 owner로 호출처를 이동한 뒤 삭제할 진입점
## 5. 표시 이름·색상·국기·계층 계산을 통일할 지점
### 이름
### 색상·상속
### 국기
## 6. 실제 책임보다 이름이 좁은 함수·상태
## 7. 이름 변경 전에 처리해야 하는 실제 계약 차이

---
[작성 당시 원문(무손실 압축)](../../archive/blobs/12996ab4789915fed75cfb20f743ef54244fb84ad4f838a6da3aaf7844e06c3c.gz) · 원본 SHA-256 `12996ab4789915fed75cfb20f743ef54244fb84ad4f838a6da3aaf7844e06c3c`.
