# OBJ-092 — 단일 접촉 공유 국경선 edge 레코드 압축

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 날짜: 2026-10-17 · 상태: `verified-focused-paired-and-12cycle`
> 제품 기준: `main 48fe06df9ec7ce47b4f0640d1f43817deb3a964a` (OBJ-090 + OBJ-091 계측 통합)
> 코드 변경: `assets/js/modules/country-shared-boundary-packet.js` (공유 경계 Worker의 `edges` 관리), 국가/역사 지형 원본·C++/WASM 변경 없음
> 근거: [OBJ-091 실측](soviet-retained-owner-graph-2026-10-17.md) · [단위/접촉 CI #39032938617](https://github.com/kimjeon-il/Pando/actions/runs/39032938617) · [같은 러너 메모리 A/B #39032861530](https://github.com/kimjeon-il/Pando/actions/runs/39032861530)
OBJ-091에서 현대 세계의 **68,616개 shared edge**가 실제로 모두 **접촉 기여자 1개씩**임을 확인했다.
기존 `edges`에서는 각각 `{contributions: new Map(),value}`를 생성하고,
339개 국가 간 접촉을 하나의 기여 `Map` 원소로 저장했다. 같은 segment 객체는
`contacts`와 `edges.value`에서 공유했고, 별도 복제된 value는 0개였다.
기존 Map은 여러 기여가 같은 좌표로 겹칠 경우에만 필요하다.
따라서 최초 단일 기여 경계는 `{contact, value}`라는 작은 레코드만 보유한다.
실제로 다른 국가 쌍의 기여가 추가되면 그때 `contributions: Map`으로 승격하며,
다중 기여 중 하나가 삭제되어 다시 하나만 남으면 직접 segment 참조로 축소한다.
마지막 기여가 삭제되면 `edges` 항목 전체를 제거한다.
제품의 `contacts`, `contactsByOwner`, prepared source/packed 인덱스, C++ 접촉 후보
계산, `segments()`와 GPU stroke 패킷은 그대로 유지한다.
Ubuntu 24.04 Chromium WebGL2/SwiftShader, 1440×900, 소련 1989-06 → 현대 2026-10,

## 원인과 자료구조 변경
## 동일 GitHub 러너 A/B 실측
## 회귀 계약과 남은 조사

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/444b3bf297d58809651b982742dfdc454f80cb7382d8f3433c23503195c2c6cd.gz) · 원본 SHA-256 `444b3bf297d58809651b982742dfdc454f80cb7382d8f3433c23503195c2c6cd`.
