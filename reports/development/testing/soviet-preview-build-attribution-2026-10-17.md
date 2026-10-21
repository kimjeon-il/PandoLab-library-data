# OBJ-085 — 1989년 소련 반복 편집 후 미리보기 Worker 60초 지연 원인

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `OBJ-085` · 상태: `verified-web-diagnostics` · 지도 반영: `not-applicable` · 색인일: 2026-10-17  
> 원문 최종 수정: 2026-10-17 · 대상: `work/objects` (제품 변경 없음) · 비교: 2026-10-17 `main`  
> 재현·계측 변경: [`0c037818`](https://github.com/kimjeon-il/Pando/commit/0c037818670491ce805d7703f414456e93c8747d)  
> 실측: [Soviet memory attribution Actions #38985221569](https://github.com/kimjeon-il/Pando/actions/runs/38985221569) **성공** · [원시 JSON](https://github.com/kimjeon-il/Pando/actions/runs/38985221569/artifacts/12082554953) (Actions 보관기한 적용)
앞선 [OBJ-084](soviet-memory-retention-roundtrip-2026-10-17.md)의 Chromium PSS 30초 유휴 측정에서는 지연된 `project-preview-worker.js`가 여전히 실행 중이었다. 이번에는 실제 Worker의 `key`/`validate`/`build` **요청·응답·종료 시점만** 브라우저 테스트의 `window.Worker` 래퍼로 기록했다. 제품 Worker, C++/WASM, 역사 형상은 수정하지 않았고 메시지의 큰 `entities`/캐시 객체를 진단 로그로 유지하지 않았다.
재현은 기존과 동일하다: 2026-10 현대 → 1989-06 소련 선택 → 해안선 편집 진입·취소 → 2026-10 복귀를 **3회** 반복. 매회 복귀·추가 6초·추가 30초, 마지막 Worker 종료 후 GC 단계도 측정했다. GitHub-hosted Ubuntu Chromium(WebGL2/SwiftShader, 1440×900) 기준이며 Windows WebView2/Android/물리 GPU 실측은 아니다.
시점·작업 기록과 함께 `project-preview-cache.js`의 경고 **`미리보기 Worker 시간 초과`**를 실제 캡처했다. 이 표본에서는 254개 객체의 미리보기가 60초 내 생성되지 않았다. 앞선 65~67초의 Worker 생존시간을 `key` 해시·WASM 초기화 자체의 60초 지연으로 설명하는 것은 틀리며, 병목은 **`build` 요청 내부**에 존재한다. `build` 내부에서 가장 느린 구간은 아직 측정되지 않았으므로 단순화 알고리즘, 검증, 메시, 직렬화 중 특정 함수를 원인으로 확정하지 않는다.

## 조사 목표와 기준
## 확정 결과: 장시간 지연은 `build`
## Chromium 메모리와 자동저장
## 현재 `main`과 다른 점 — 중복 최적화 금지
## 다음 독립 조사와 완료 기준
## 범위 및 판정

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/c22317b7eb2cc75c389f196207905b681162efd5a2d51b138d2ff75587c67568.gz) · 원본 SHA-256 `c22317b7eb2cc75c389f196207905b681162efd5a2d51b138d2ff75587c67568`.
