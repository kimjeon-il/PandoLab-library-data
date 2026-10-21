# OBJ-088 — 소련 시점 왕복 후 공유 국경선 Worker 360MiB JS 힙 참조 소유권 분해

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: OBJ-088 · 상태: verified-web-diagnostics · 지도 반영: not-applicable · 색인일: 2026-10-17  
> 원문 최종 수정: 2026-10-17 · 제품 코드 기준: main e85b3e158d5c02e4aa028283db5b83a1750f4b1a  
> 검사/계측만 변경: work/integration-ui-objects-20261016 · 소스 구성은 pinned main 제품 파일과 동일 · Qt 앱, Android, Windows WebView2, GIS 데이터 수정 없음  
> 성공한 Chromium 1차 참조 소유권 검사: [Actions #39003118598](https://github.com/kimjeon-il/Pando/actions/runs/39003118598) · [원시 artifact #12090057528](https://github.com/kimjeon-il/Pando/actions/runs/39003118598/artifacts/12090057528)  
> 성공한 Chromium 세부 파생 구조 검사: [Actions #39003624922](https://github.com/kimjeon-il/Pando/actions/runs/39003624922) · [원시 artifact #12090580298](https://github.com/kimjeon-il/Pando/actions/runs/39003624922/artifacts/12090580298)
이전 [OBJ-087](soviet-main-12cycle-memory-2026-10-17.md)은 같은 월로 왕복하는 12회 실험에서 공유 국경선 Worker JS 힙이 현대 시점 약 360MiB로 안정화한다는 사실을 보였지만, 왜 그렇게 큰지 판단하지 못했다. 이번에는 실제 소련 1989-06에서 현대 세계로 복귀하고 공유 국경선 계산 종료 및 추가 18초 무입력 상태를 확인한 다음, 별도 Chromium 컨텍스트에서 참조를 **하나씩 해제**한 뒤 Worker별 CDP GC와 Runtime.getHeapUsage를 반복했다.
- 제품 Worker 원본: [country-shared-boundary-worker.js](https://github.com/kimjeon-il/Pando/blob/e85b3e158d5c02e4aa028283db5b83a1750f4b1a/assets/js/workers/country-shared-boundary-worker.js).

## 조사 대상·재현 및 계측 기준
## 입력 및 파생 자료의 실제 개수
## 1차: 최상위 retaining root 두 개의 해제 순서
## 2차: preparedStore 구성요소별 해제 효과
## 최적화 우선순위와 구현 시 계약
## 범위·판정·후속

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/00df9929b7d1c30393efe0b4e609ab54849dabce90e599b254552cc0191208d3.gz) · 원본 SHA-256 `00df9929b7d1c30393efe0b4e609ab54849dabce90e599b254552cc0191208d3`.
