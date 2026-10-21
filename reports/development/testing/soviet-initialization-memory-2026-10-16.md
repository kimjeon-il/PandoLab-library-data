# DEV-083 — 1989년 소련 초기 준비시간·메모리 원인 조사

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 조사 상태: `verified-web-diagnostics` · 지도 자료 반영: `not-applicable` · 2026-10-16
> 대상: `kimjeon-il/Pando`의 `work/objects` · 조사 실행 소스 SHA: `f45c096b9224906c318a809c6a1bbb51f2d8d43c`, `d3528a0db64bf8eeef690e552f4790db0ce33116`, `cadf96f57bb43804c556d5cabb00a9bb466ff4ef`
> **Qt 앱은 조사·수정·성능 검증에서 제외.** 브라우저 웹 및 신규 Windows/Android WebView 웹 UI 앱의 공통 렌더링·저장 경로만 분석함.
대형 객체의 느린 초기 준비시간과 메모리 사용은 단일 GPU 메시보다 **시점 변경에 따른 전체 프로젝트 자동 저장, 그 후속 전체 프로젝트 미리보기 검사/재직렬화, 역사적 경계선 편집 준비**가 서로 겹치는 구조로 설명된다. 소련 선택 GPU 버퍼 자체는 2.73MiB이며 단순 지도 이동에서 증분 재업로드되지 않는다. 현재의 장기간 잔류 메모리를 **누수로 확정하지 않는다**. 전체 Chromium PSS에는 다수 Worker, WASM, 브라우저 내부, software GPU 실행 비용 등이 포함되고 Worker별 WASM heap은 직접 분리되지 않았다.
- 실제 역사 세계 정본 프로젝트의 `1989-06`, `state:soviet-union`을 사용. 진입·선택·GPU 활성·편집 모드, 시점 복귀까지 확인.
- GitHub-hosted Ubuntu 24.04 Playwright Chromium WebGL2, 뷰포트 1440×900. 실제 렌더러 신원은 ANGLE/Vulkan **SwiftShader software GPU**. Windows WebView2/Android WebView 물리 GPU·VRAM 실측 아님.
- Main JS 메모리는 CDP `Runtime.getHeapUsage` 또는 `performance.memory`; Chromium 전체 메모리는 Linux `/proc/*/smaps_rollup` **PSS 합계**(공유 물리 페이지 안분). 양자는 범위가 다름. 메인 페이지 GC는 전용 Worker·WASM·GPU 리소스를 전부 회수한다고 보장하지 않음.

## 결론
## 실행 대상과 신뢰 범위
## 1. 초기 시점 전환 및 GPU 선택 준비
## 2. 가장 확실한 중복 작업 — 날짜만 바꿔도 전체 자동 저장
## 3. 자동 저장의 후속 작업 — 전체 프로젝트 미리보기 준비
## 4. 실제 해안선 편집 초기 준비 (자동 저장 격리)
## 개선 우선순위 (아직 제품 코드 변경하지 않음)
## 자료·검증의 한계
## 실측 원본

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/115d372f098d4762d7ab709171f284d3d4383e652d0f26e81f2b1d2f66b9d606.gz) · 원본 SHA-256 `115d372f098d4762d7ab709171f284d3d4383e652d0f26e81f2b1d2f66b9d606`.
