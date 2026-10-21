# OBJ-082 — 소련 시점 왕복 메모리 소유권 계측

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 상태: `verified-web-diagnostics` · 2026-10-16 · 대상: `work/objects` `62bc9cc43f6566c87b9b7755d5043482fb79baf4` · 변경 범위: **테스트 및 계측만**
>
> 검증: [GitHub Actions #38921610426](https://github.com/kimjeon-il/Pando/actions/runs/38921610426), 단위 검사 3/3·ESLint·실제 Chromium Playwright 1/1 성공. [원시 JSON 아티팩트](https://github.com/kimjeon-il/Pando/actions/runs/38921610426/artifacts/12055760425) (보관 14일).
> 기존 Qt 앱, 지도 원본, 제품 JS/C++/WASM, `main` 배포는 수정하지 않았음.
- GitHub-hosted Ubuntu Chromium WebGL2/SwiftShader, 뷰포트 1440×900. 실제 Windows WebView2/Android/물리 GPU VRAM 실측은 아님.
- 메인 JS: CDP `Runtime.getHeapUsage`. Worker별 JS: 별도 CDP `Target` 세션을 열어 `Runtime.getHeapUsage` 수집. 모든 비교 구간에 Worker 및 메인 V8 GC 요청.
- Worker별 WASM: 최초 `Runtime.queryObjects(WebAssembly.Memory.prototype)`로 살아 있는 메모리를 찾고 **약한 참조(WeakRef)**로 동일 인스턴스의 `buffer.byteLength`를 추적. 그 크기는 할당된 선형 WASM 메모리이지 C++ 실사용 힙, OS RSS/PSS가 아님. 기존 Worker 및 Emscripten 출력물에는 어떤 추적 코드도 추가하지 않음. 최초 계측 이후 새 WASM 메모리 인스턴스가 생성된다면 이 방식은 자동으로 발견하지 못할 수 있음.
- Chromium PSS: `/proc/[pid]/smaps_rollup` 합계 및 browser/renderer/gpu/utility 역할별 분해. **개별 Worker PSS는 식별 불가**. 공유 메모리 안분·그래픽 드라이버 내부 할당과 브라우저 할당기는 별도 한계.

## 계측 방식과 해석 한계
## 실제 1989년 소련 재현 및 GC 후 결과
## 소유자별 핵심 결과
### 1. 공유 국경선 Worker — 현재 최우선 메모리 추적 대상
### 2. 메인 스레드와 편집 Worker
### 3. WASM 선형 메모리
### 4. 반복 복귀 시 GPU Stroke 자원 유지
## 검증 및 후속 측정 순서
## 실패 기록 구분

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/2d6f912efdb040867324a7938be544ffc988a07ad2f579c678a87ccd542a7480.gz) · 원본 SHA-256 `2d6f912efdb040867324a7938be544ffc988a07ad2f579c678a87ccd542a7480`.
