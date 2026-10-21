# DEV-086 — 1989년 소련 편집 메모리·반복 회귀 검증

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> ID: DEV-086 · 상태: verified-web-ci-with-observability-limits · 지도 반영: not-applicable · 2026-10-16  
> 브랜치: work/integration-ui-objects-20261016 · 구현: 38762f5809c06137baaf0bd0d789ca0b7a5771c3, 22d6ec250caba2592b30af03942fb2e8582ddbc8  
> 선행 보고: [DEV-083 초기 원인](soviet-initialization-memory-2026-10-16.md), [DEV-085 편집 준비 최적화](soviet-boundary-preparation-2026-10-16.md). Qt 앱·역사 GIS 원본·main 변경 없음.
- **경계 토폴로지 캐시 예산:** 기존 최대 8개 보관 정책에 **추정 32MiB** 예산을 추가했다. 새 편집에 필요한 하나의 캐시는 예산을 초과해도 유지하며, 나머지 오래된 토폴로지와 불필요한 원본 상세 선분 배열을 제거한다. 최근 사용 결과는 캐시 사용 순서에 반영한다.
- **시점 전환 캐시 무효화:** 해당 월에 필요했던 편집 경계 토폴로지를 시점 변경 시 해제한다. 전체 프로젝트 재저장·Worker 재시작·전체 세계자료 전송을 강제하지 않고, 다음 실제 편집에서 정본 소스를 재확인한다.
- **소유권 계측:** 편집 Worker의 경계 원본 수, 상세 선분화 객체 수, 캐시 항목 수, 노드·선분·핸들 수, 추정 바이트, 축출 횟수를 읽기 전용 진단으로 기록한다. 추정치는 V8 실제 heap 계측이나 WASM/GPU 메모리 보유량을 의미하지 않는다.
정본 역사 세계의 1989-06, state:soviet-union, Ubuntu 24.04 GitHub-hosted Playwright Chromium WebGL2 1440×900, SwiftShader **소프트웨어 GPU**. 소련 해안선 편집을 3회 열고 취소하고, 현재 월과 1989년을 왕복했다. Main CDP 힙, 메인 스레드 GC, Chromium 프로세스 PSS, WebGL 버퍼 계측, Worker 수·캐시, 편집점 DOM 및 원본 지문을 검증했다.
- Main GC는 **전용 Worker, WASM, GPU, 드라이버의 메모리 회수를 보장하지 않는다.** Chromium PSS는 프로세스 간 공유물리 페이지를 안분한 합계이므로 JS 힙과 합산하거나 GPU VRAM으로 해석할 수 없다.

## 적용한 개선
## 환경과 측정 한계
## 반복 편집 실측
## 판정·잔여 문제
## 회귀 증거

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/f6acff843f011251f64f725605c5cc8f76f217957d8637f70f525816ec4db7c3.gz) · 원본 SHA-256 `f6acff843f011251f64f725605c5cc8f76f217957d8637f70f525816ec4db7c3`.
