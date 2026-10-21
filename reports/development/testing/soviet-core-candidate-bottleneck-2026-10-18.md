# OBJ-097 — 1989 소련 실제 경계 확정의 Core 후보 준비 지연 귀속

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 기록: 2026-10-18 (KST) · 상태: `verified-deep-cxx-parent-containment-bottleneck / product-unchanged`
> 조사 브랜치: `work/perf-core-candidate-diagnostics-20261018`
> 기준 제품: `work/perf-soviet-edit-acceptance-20261017` (`OBJ-092~095` 포함)
> 지도 원본·제품 JS/C++/WASM·`main` **영구 변경 없음**.
> 계측은 GitHub Actions의 폐기 가능한 checkout에서만 임시 소스를 패치하며, 30초 제한시간 해제는 진단 실행에만 적용된다.
[OBJ-096](soviet-real-edit-cpu-reference-2026-10-17.md)에서 1989-06 소련 해안선 실제 UI 정점 이동 후
`map-edit-worker`의 `boundary-move` **30.8ms**, `territorial-edit` **1,236.7ms**가 정상 응답했다.
`territorial-edit`의 미리보기 검증 차단 플래그는 `false`였으나
뒤이은 `core.document-prepare`는 30,000ms 기본 RPC 제한시간 내 완료되지 않았고
UI는 `PL-TERRITORIAL-EDIT` 오류를 표시했다.
`app-territorial-drafts.js`의 `previewTerritorialEdit()`은 `territorial.patch`
단일 하위 작업을 담은 `territorial.edit` 명령을 `projectDomain.prepareCommand()`에 전달한다.
1. `project-domain.js`: 기존 명령 큐 완료를 기다린 후 `commandOwner.prepare()` 호출.
2. `core-document-client.js`: `core.document-prepare` RPC를 Core Worker로 전송(제품 기본 제한시간 30초).
3. `core-worker-runtime.js`: Core Worker 문서 직렬 실행 큐에 등록.
4. `core-document-runtime.js`: WASM `DocumentSession.prepareCommand(envelope)` 동기 호출.

## 1. 실제 문제
## 2. 기본 제품 C++ 처리 경로 (정적 소스 확인)
## 3. Worker 큐 지연 vs 동기 WASM 계산: 직접 실측
## 4. 첫 C++ 심층 결과: 정확한 차단 함수
## 5. 최종 내부 원인: 소련과 구성 공화국의 지리적 포함관계 검사
### 안전한 다음 최적화 지점
## 6. 최종 결론

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/817ed636688de697cb38914c33bbf9255ca8165b084d82ae9990e4c1057a762f.gz) · 원본 SHA-256 `817ed636688de697cb38914c33bbf9255ca8165b084d82ae9990e4c1057a762f`.
