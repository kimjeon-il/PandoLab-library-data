# OBJ-084 — 1989년 소련 편집·시점 왕복 Worker·WASM 메모리 잔류 계측

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `OBJ-084` · 상태: `verified-web-diagnostics` · 지도 반영: `not-applicable` · 색인일: 2026-10-17  
> 원문 최종 수정: 2026-10-17 · 대상: `work/objects` · WebGL2/Worker/WASM (Qt 앱 제외)  
> 테스트 구현: [`fcd3990`](https://github.com/kimjeon-il/Pando/commit/fcd39905623cda2f6de3bcfba5cc760296351091) → [`a3e2a2a`](https://github.com/kimjeon-il/Pando/commit/a3e2a2ac437dc873e1b0180d7cc020ad3051405c)  
> 최종 검증: [Actions #38982808991](https://github.com/kimjeon-il/Pando/actions/runs/38982808991) · ESLint 성공, 단위 3/3, 실제 Chromium Playwright 1/1 성공  
> 원시 증거: [measurement.json ZIP artifact #12081614264](https://github.com/kimjeon-il/Pando/actions/runs/38982808991/artifacts/12081614264) · 보관 기한은 Actions 정책 적용
이전 [OBJ-082](soviet-memory-owner-attribution-2026-10-16.md)는 소련 시점 왕복 시 Chromium PSS 잔류와 공유 국경선 Worker JS 힙·WASM 증가를 관측했지만, 지연된 미리보기 작업을 완전히 배제하지 못했다. 이번에는 동일 분기를 기준으로 **1989-06 소련 선택 → 해안선 편집 진입 → 취소 → 2026-10 복귀**를 3회 반복하고, 매회 복귀 직후·추가 약 6초·약 30초 뒤에 측정했다. 세 번째 복귀 후 프로젝트 미리보기 Worker의 종료까지 기다려 GC 이후 한 번 더 계측했다.
- Chromium WebGL2(소프트웨어 SwiftShader), GitHub-hosted Ubuntu, 뷰포트 1440×900. `?perf=1&renderer=webgl2` 사용. Windows WebView2·Android 실기기·물리 GPU VRAM은 측정하지 않았다.

## 대상 및 재현
## 반복 실험 — 주요 관측 수치
## 소유자별 판정
### 1. 프로젝트 미리보기 Worker: 반복되는 일시적 고점
### 2. 공유 국경선 Worker: 큰 정상 보유 상태가 반복됨
### 3. 편집 Worker·Core WASM·GPU
## 검증 결과 및 범위
## 다음 조사 및 최적화 순서
## 변경·보존 범위

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/ffe2de69e1ca2f592d40100ce96d1f68c78f214f832c937309d067a010c0c3b3.gz) · 원본 SHA-256 `ffe2de69e1ca2f592d40100ce96d1f68c78f214f832c937309d067a010c0c3b3`.
