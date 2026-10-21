# OBJ-089 — 공유 국경선 선분 공간 인덱스 압축: 실측 결과

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: OBJ-089 · 2026-10-17 · 상태: verified-web-paired · 지도 반영: not-applicable
> 소스 기준: main `78ab111e34966bc2573bfdd192c75954f322d771` → `work/perf-boundary-index-20261017`
> 제품 수정: `assets/js/modules/boundary-spatial-index.js`, `assets/js/modules/boundary-topology.js`
> 검증: [동일 러너 A/B #39025083891](https://github.com/kimjeon-il/Pando/actions/runs/39025083891) · [집중 단위/Worker 계약 #39025081105](https://github.com/kimjeon-il/Pando/actions/runs/39025081105)
과거 OBJ-088의 약 360MiB 공유 국경선 Worker JS 힙은 누적된 오래된 세계만으로 설명되지 않는다.
현대 254개 국가의 선분 544,163개를 위한 파생 구조 중 공간 인덱스와 선분 유지 그래프가 해제 기반 측정으로 약 192.84MiB였다.
기존 `createBoundarySpatialIndex()`는 각 선분에 대해 Map entry, bbox, JS 문자열 격자 키 및 각 셀의 Set 멤버십을 보유했다.
새 구현은 **불변의 단일 국가 형상 버전**에 한하여 `loadPacked(segments, boxes)`를 실행한다.
- 대량 선분: 셀 키는 안전 범위에서 충돌 없는 정수 키, 셀의 선분 참조는 Uint32Array postings, 실제 bbox는 Float64Array + Uint32Array offsets로 보관.
- 원본 선분 객체는 복사하지 않고 기존 `segments` 배열에 대한 참조를 유지. 조회 순서, 중복 제거, 다중 bbox, 날짜변경선, 4,096셀 초과 fallback 계약 보존.
- 128개 미만인 소규모·수정 가능 인덱스는 기존 삽입/삭제 경로를 계속 사용. 형상 변경은 기존 revision 단위로 **새 준비 상태**를 만들며, 이미 빌드한 packed index를 부분 수정하지 않음.
- 렌더용 선분 배열 약 61MiB 및 나머지 약 101MiB의 별도 보유 구조는 이번 변경에 포함하지 않음.

## 원인과 구현
## 동일 실행기 실제 A/B
## 동등성·회귀·남은 조건

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/9f64cd95c6fa48257fc96f74f466fae9cbe9a72618991d113524d21b4a291aae.gz) · 원본 SHA-256 `9f64cd95c6fa48257fc96f74f466fae9cbe9a72618991d113524d21b4a291aae`.
