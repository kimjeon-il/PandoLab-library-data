# PERF-P0-001 — Pando 기준 코드와 기존 성능 계측 통합 조사

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 2026-10-17 · 상태: verified-focused-ci-and-one-return · 지도 반영: not-applicable
> 범위: 현재 웹 Pando, 객체/시점 C++·WASM, Worker V8/WASM, Chromium PSS, GPU 추적치 및 Windows WebView2 기존 증거
> 검토 시점의 `main` 및 `work/objects`: **`2279b94f0713f08070a0c5e146be5566de35fc45` (ahead=0 / behind=0)**
**객체 브랜치의 유효한 제품 개선을 다시 cherry-pick/merge할 필요 없음.** 두 브랜치는 같은 Git 객체를 가리키며, 다음 변경은 이미 기준 `main`에 포함된다.
- OBJ-083: C++ `DocumentSession::setTimelineCursor` 세계 해석 3회 중복을 결과 재사용으로 줄임. 원본 WASM과 동일 소스에서 생성한 바이너리·JS 런타임에 반영. 기존 `objects-cursor-focused-acceptance.yml` 집중 C++ 1/1, JS 29/29, WASM 9/9 및 브라우저 검사 증거 보존.
- 저장 최적화: 시점 변경은 별도 `active-view` 저장, 전체 프로젝트 autosave를 증가시키지 않음. 월·문서 revision·checkpoint·Undo 분리 계약 유지.
- OBJ-088/089: 역사 세계의 공유 국경선 Worker 메모리 원인 분해 및 `createBoundarySpatialIndex()` 압축. JS used heap 360.06→194.68MiB (−165.38MiB), 전체 Chromium PSS 2007.59→1841.82MiB (−165.77MiB) 한 쌍의 실측. 동일한 현대 세계 254개, 원본 선분 544163개, 공유 선분 68616개, 접촉 339건 보존.
- 12회 왕복 검사: 공유 국경 Worker JS 초반4회 227.74MiB, 후반4회 227.75MiB (중앙값). 마지막 추가 30초 유휴 시 194.87MiB. 동일 12회에서 Worker WASM 선형 버퍼 387.5MiB 유지, 전체 autosave 0. 추적된 Stroke 버퍼 수치는 GPU VRAM이 아님.

## 판정
## 기존 테스트 자산의 소유권
## 발견한 계측 운영 위험
## 새 공통 계측 계약과 사용법
## 구현 및 실제 검증 결과
## 이 단계의 종료 조건과 후속

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/78748cc1a724c5beca8823dfad9d18c6ed52244ec84c7452e9aad724d369f228.gz) · 원본 SHA-256 `78748cc1a724c5beca8823dfad9d18c6ed52244ec84c7452e9aad724d369f228`.
