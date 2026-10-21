# 하위 객체 해안 점선 재발과 수정 유실 여부 조사

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-COAST-RECURRENCE-20261019` · 상태: `deployment-parity-confirmed / recurrence-not-reproduced / not-fixed` · 지도 반영: `not-applicable` · 색인일: 2026-10-19
> 원문 최종 수정: 2026-10-19
> 조사 기준: 웹·앱 소스 `264fff61b7f4138c9f19d56d2ef8bc917dce5730`, 공개 build `0.36.0-build-da7b744937ec`
> 원본·출처: 사용자 홍콩 점선 화면, Git 이력, 공개 파일 응답, 별도 소유 Edge의 실제 내장 지도 Worker 계측
사용자는 해안 점선 재발과 이전 수정 유실 여부 조사를 요청했고, 구현은 우선 계획만 작성하도록 지시했다. 이후 경계 위치·해안 등 판정은 상위/하위가 공유하고 계층에 따라 선 모양만 달라야 한다고 명확히 했다. 제품 코드·형상·저장 형식은 변경하지 않았다.
- 수정 커밋 `740e6669`부터 현재 HEAD까지 `boundary-topology.js`, `country-shared-boundary-packet.js`, `country-shared-boundary-worker.js`, `canvas-scene-composition-core.js`, `gpu-map-renderer.js`, `child-coast-boundary.spec.mjs`의 diff를 확인했다. 결과는 비어 있다.
- 공개 사이트에서 앞의 경계 관련 4개 파일을 다시 GET하고 HTTP 200, 현재 Git blob과 SHA-256 일치를 확인했다. 작업 디렉터리의 CRLF 변환과 구별하기 위해 비교 기준을 Git blob으로 삼았다.
- 별도로 띄운 Edge의 새 컨텍스트에서 WebGL을 비활성화하고 실제 Canvas Worker를 사용했다. 공개 응답은 수정하지 않고 Worker 메시지를 관찰했다. 내장 지도, 1280×800 CSS px, 색채 지형, 홍콩 중심 지구본 배율 16에서 상세 DEM 준비 후 경계 패킷을 기록했다.
- 원시 계측 스크립트와 PNG는 `D:\dev\release-evidence\diagnose-coast-recurrence.mjs`, `coast-audit-initial.png`, `coast-audit-restored.png`에 있다. 요약과 파일 hash는 [기계 판독 근거](child-coast-recurrence-audit-2026-10-19.evidence.json)에 보존한다.

## 대상과 기준
## 근거와 방법
## 확인 결과와 한계
### 수정 유실 여부
### 현재 재현 결과
### 실제로 나뉜 경계 규칙
### 이전 검증이 놓친 범위
## 데이터 반영과 후속 작업
## 판본
## 구현 후속

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/9c2a08b1a1f1ab1be936c83aad88abc99c9e2fc8de4ef6915ddd125c28bd14be.gz) · 원본 SHA-256 `9c2a08b1a1f1ab1be936c83aad88abc99c9e2fc8de4ef6915ddd125c28bd14be`.
