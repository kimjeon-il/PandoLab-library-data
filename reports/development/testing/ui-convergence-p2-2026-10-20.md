# UI 공통 규칙 통합 P2 — 검색창 DOM 고정·휴대전화 가로 배치 분리

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-CONVERGENCE-P2-20261020` · 상태: `implemented / focused-browser-verified / Windows-native-unverified / Android-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-20  
> 원문 최종 수정: 2026-10-20  
> 조사·수정 기준: `work/ui`, P0 정본 `fadc3e37175be814e5e81550252e8d5200b82808`; 최종 검증 대상 `dd6fa136ad1c13fe9a02ba541cd11ce033f25f4a`  
> 근거: [P0 구조 조사](ui-convergence-p0-audit-2026-10-20.md), [GitHub Actions P3 검증 #39404852545](https://github.com/kimjeon-il/Pando/actions/runs/39404852545)
P0에서 확정한 U04(검색 패널)와 U05(휴대전화 가로 UI)를 대상으로, 사용자에게 보이는 기존 기능·조작·저장·도메인 상태를 유지하며 공통 UI 구조와 CSS 책임을 정리했다. 웹은 공개 viewer, 앱은 Tauri WebView 편집기를 대상으로 한다. Qt 데스크톱 앱·GIS·Core·프로젝트 저장 포맷·Undo 계산은 수정하지 않았다.
- `assets/js/modules/search-toolbar-presentation.js`: 기존 `#objectSearchSurface`를 `#objectSearchBtn` 도구바의 자식으로 옮겼다가 원위치시키는 주석 anchor 및 append/after 처리 제거. 한 panel과 input/results만 유지.
- 데스크톱 열린 상태의 `.map-command-search` 실제 bounding rectangle을 계산해 panel CSS 변수에 표시 좌표·폭·높이 전달. UI 전환 중 `ResizeObserver`가 확장되는 slot과 toolbar를 관찰하여 같은 표면을 계속 정렬.
- `assets/css/components/map-search.css`: 데스크톱의 동일한 검색 panel을 fixed overlay로 표현하고 모바일/phone-landscape에서는 기존 공유 하단 시트/측면 도크 규칙 유지. 검색 결과의 위쪽 팝업 배치를 기존처럼 유지.

## 목적과 작업 범위
## 구현 결과
### 검색 UI: DOM 이동 제거
### 휴대전화 가로 UI: 역할별 스타일 재배치
## 검증 결과
### 검증 항목 구체화
## 확인된 한계와 다음 단계
## 저장·데이터 반영
## 판본

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/f38325a27e8de2414ad743f44f90c07d16c03b63921bcd8285b639729eb3547f.gz) · 원본 SHA-256 `f38325a27e8de2414ad743f44f90c07d16c03b63921bcd8285b639729eb3547f`.
