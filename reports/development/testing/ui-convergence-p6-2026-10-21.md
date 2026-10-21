# UI 구조 통일 P6 — 공통 구조 정리·최소 회귀 검증

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-CONVERGENCE-P6-20261021` · 상태: `focused-unit-browser-app-stage-verified / native-webview-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-21  
> 원문 최종 수정: 2026-10-21  
> 코드 조사 기준: `work/ui` `7f1cad96333a2f81bc68e8ef22a3fdefba8fc18d` (P5 이후), P6 `4f80c53`, 최종 생성물 `4df41af`  
> 수정 범위: 본 P6 커밋의 6개 소스·테스트 파일, 보고서와 색인. `main`에 직접 반영하거나 배포하지 않음.  
> 근거: [P0 조사](ui-convergence-p0-audit-2026-10-20.md) · [P4 보고](ui-convergence-p4-2026-10-21.md) · [P5 보고](ui-convergence-p5-2026-10-21.md)
사용자 지시에 따라 전체 테스트 스위트 대신 변경된 UI 구조와 보정 도구에 직접 관련된 검사만 선정했다. 기존 P0에서 확인한 9개 사례의 최종 소스 구조를 재검토했다.
P5의 시작 버튼 활성 상태는 각 도구의 `syncUi()`가 `[data-ref-section="match"]`의 `hidden`을 읽어 결정한다. 그런데 편집기 `setEditorTab()`은 하위 section의 `hidden`만 갱신하며, 각 도구의 MutationObserver는 편집기 루트와 직접적인 `childList`만 관찰한다. 따라서 최초 `placement` 상태에서 `match`를 눌러도 버튼 상태를 갱신할 이벤트가 없었다.
- `reference-image-controller.js`: 탭 클릭·키보드 탐색 모두 거치는 `setEditorTab()`에서 `reference-image-tab-changed` CustomEvent를 한 번 발행한다.
- `reference-image-line-refine-controller.js`, `reference-image-live-wire-controller.js`: 해당 이벤트로 기존 `scheduleSync()`를 호출하고, 종료 때 리스너를 제거한다. 작업 상태·명령·저장·지도 계산은 바꾸지 않았다.

## 범위
## 확인된 회귀와 수정
## 단계별 최소 검증 결과
### 회귀 진단 및 변경 내용
## 산출물·릴리스 상태와 잔여 항목

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/16be2f3473e0befa4c2ca6613b9439a066b813535bab5f5f0bfa84277bd0f180.gz) · 원본 SHA-256 `16be2f3473e0befa4c2ca6613b9439a066b813535bab5f5f0bfa84277bd0f180`.
