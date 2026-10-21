# DEV-085 — 1989년 소련 대형 경계 편집 준비 지연 선분 생성 최적화

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `DEV-085` · 상태: `verified-web-ci` · 지도 반영: `not-applicable` · 기록일: 2026-10-16  
> 대상: `work/integration-ui-objects-20261016` · 최초 구현 `89cbf8dfd4eafb58bd95091f13dbee894b69cc8b` · 검증용 보완 `04218239f5aefe1f12d5f28f48b96e5c7f80b85d`  
> 조사 대상: Web 및 공통 WebView 경계 준비 경로. Qt 앱·역사 GIS 원본·`main` 변경 없음.
기존 `boundary-preparation.js`의 `sync()`는 대형 국가의 경계 편집에 앞서 모든 경계 소스의 선분 객체와 1도 공간 인덱스를 선제 생성했다. `prepare()`는 그 후 선택 객체의 선분별로 전역 인덱스를 질의했다. 시점 전환 이후 첫 편집은 Worker 생성·세계 형상 전달·불필요한 세그먼트 초기화·C++ 토폴로지 계산·패킷 구조화 복제가 한 번에 겹칠 수 있었다.
지금은 최초 동기화에서 Polygon/MultiPolygon의 **링별 보수적 경계 범위**만 구축한다. 상세 선분은 (1) 선택 객체, (2) 선택 경계와 실제 공간 인덱스가 접촉 가능한 후보에 대해서만 생성한다. 먼 객체의 좌표 선분과 전역 선분 인덱스를 만들지 않는다. 범위는 거짓 양성을 허용하므로 기존 C++ 교차/분할/공유 경계 계산을 대체하지 않는다. 데이터가 새로 접경하게 되거나 잠금·소속·형상이 바뀌면 캐시가 무효화된다.
`map-edit-preparation-operations.js`는 Worker 동기화와 토폴로지·표시 준비 소요시간, 상세 선분화한 객체 수를 보고한다. `app-geometry-preview.js`는 Worker 왕복과 메인 스레드 패킷 채택 시간을 별도로 기록한다. 결과 객체·고정점·취소·편집/Undo 소유권은 변경하지 않았다.
실제 역사 프로젝트의 `1989-06`, `state:soviet-union`, 1440×900, Ubuntu 24.04 Playwright Chromium WebGL2(호스팅 환경 소프트웨어 GPU) 기준이다.
변경 전: [CI 38881802861](https://github.com/kimjeon-il/Pando/actions/runs/38881802861), 소련 메모리 job, `SOVIET_EDIT_ENTRY`. 변경 후: [CI 38884567696](https://github.com/kimjeon-il/Pando/actions/runs/38884567696), 동일 테스트 및 출력. 관측된 차이는 **1,176.9ms(약 29%)**이지만 각각 독립적인 1회 측정이므로 통제된 성능 개선율로 확정하지 않는다. 시작 단계나 환경 차이 및 메인 스레드 경합의 영향을 배제하지 않았다.

## 원인과 수정
## 실측 및 검증
## 남은 범위와 한계

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/c0ebb20ea533f0249e2177a79ade31baae7330ea2a71d502d95c88b7dde1aa90.gz) · 원본 SHA-256 `c0ebb20ea533f0249e2177a79ade31baae7330ea2a71d502d95c88b7dde1aa90`.
