# OBJ-094 — C++ 공유 국경 접촉 변환 배열의 수명 단축

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 2026-10-17 · 상태: `verified-focused-paired-and-12cycle` · 지도 반영: `not-applicable`
> 기준 제품: `work/perf-singleton-edges-20261017` `f2370babfccf3dd07dca26f11aeecab4434189ca` (OBJ-092)
> 적용 브랜치: `work/perf-contact-wire-lifetime-20261017` · 제품 수정: **`assets/js/modules/country-contact-core.js` 한 파일**
> 근거: [OBJ-093 독립 3회 GC 진단](soviet-prepared-source-owners-2026-10-17.md)
> 실측: [동일 러너 A/B #39037593995](https://github.com/kimjeon-il/Pando/actions/runs/39037593995) · [12회 왕복 및 GPU pan #39037223209](https://github.com/kimjeon-il/Pando/actions/runs/39037223209)
> 지도/역사 원본 형상, 편집 규칙, C++/WASM, `main` 미수정
OBJ-093에서 현재 현대 세계 254개 국가의 `preparedStore`와 상위 공간 인덱스를 분리했다.
중복된 국가 source segment **544,163개**를 인덱스가 별도로 복제하는 것은 아니다.
반면 `country-contact-core.js`의 `wireRows: WeakMap`은 준비 객체 251개에 대한
변환 배열 **519,900개**를 C++ batch 호출 이후에도 Worker 메모리에 유지했다.
이는 세 독립 Chromium 컨텍스트의 파괴적 GC 해제 실험에서 모두
Worker V8 used heap **23.81MiB** 감소로 관측된 명확한 후보였다.
제품 수정은 `encodedRows(prepared)`를 **현재 동기 C++ contact batch 호출에서만**
필요한 배열을 만드는 함수로 단순화하고 Worker 수명 전체에서 `WeakMap`을
유지하지 않게 하는 것이다. `computeCountrySharedContacts`는 호출 안의
고유 `features` 배열을 통해 각 prepared 객체를 **한 번만** 인코딩하므로

## 1. 정확한 최적화 지점
## 2. 동일 러너 제품 A/B: 실제 소련 1989-06 → 현대 복귀
## 3. 실제 인접 국가의 반복 C++ 계산 CPU
## 4. 12회 시간대 왕복 및 GPU 리소스
## 5. 최종 판정 및 한계

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/899a90147685e18a1ea3181923ceb4b4d1ab61478be0a4fbbb311a1835829681.gz) · 원본 SHA-256 `899a90147685e18a1ea3181923ceb4b4d1ab61478be0a4fbbb311a1835829681`.
