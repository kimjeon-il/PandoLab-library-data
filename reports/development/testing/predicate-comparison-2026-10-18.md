# main·지리 판정 실험 정확성 및 제한 성능 비교

> 압축 열람본: 도입부 발췌. 전체 출처·결론·미확인 내용은 연결한 원문을 따른다.



> 보고서 ID: PERF-PREDICATE-20261018 · 상태: verified-bounded-comparison / keep-main · 지도 반영: not-applicable
> 최종 수정: 2026-10-18
> 기준: `bb48e2cbb729bed9a794c1f3f843b5cb028e1227` (작업 시작 시 HEAD, main, origin/main 동일)
> 증거: [수집 목록·해시](evidence/predicate-comparison-2026-10-18/index.json), [native 원본](evidence/predicate-comparison-2026-10-18/native.json), [1도 변형 원본](evidence/predicate-comparison-2026-10-18/native-main-1deg.json), [WASM 원본](evidence/predicate-comparison-2026-10-18/wasm.json)

## 결정

**제품에는 실험을 적용하지 않는다.** 확인한 실험 가운데 결과 보존과 주요 경로 성능 조건을 함께 만족하는 후보가 없었다. 현재 `shared/core/src/geometrypredicates.cpp`와 packaged WASM은 변경하지 않았다. 이번 변경은 재실행 도구, 고정 테스트 입력과 결과 보고서다.

브랜치 동기화 과정에서 실험 브랜치의 충돌 파일은 main 구현으로 통일되어 있었다. 따라서 현재 브랜치 파일끼리 비교하지 않고, Git 이력에 보존된 실험 원본 SHA의 계산 파일을 각각 main과 비교했다. 브랜치의 고유 커밋 수가 서로 다른 알고리즘 개수를 뜻하지는 않는다. 이번 비교 대상은 확인된 네 가지 원본과 main에서 파생한 작은 변형이다.

## 고정 소스와 방법

비교 파일은 모두 `shared/core/src/geometrypredicates.cpp`다. 각 실행 JSON에 SHA-256을 기록했다.

| 후보 | 원본 커밋 | Git source blob |
| --- | --- | --- |
| main 및 대조 실행 | `bb48e2cbb729bed9a794c1f3f843b5cb028e1227` | `a255376fde6b99643c322a5fde91b41f3033d8d2` |
| geo-containment-index | `0362f3ddda0475dc68fb78cf2647a3f804287371` | `de572dd0dda3a84de4a24a64e84a52e016efe12e` |
| geographic-2d-index | `c07acc763061900ea421f4d3104a5ecd36bfccae` | `125a8a2f7fc8319fbf8a99568af9a1ca5b96677c` |
| geographic-broadphase | `00b5616f2348a78b01dfe8188d3cab504d895cca` | `64ab11241a4d555ad21a50a8b3edd1c6c042fa9f` |
| geographic-direct-smoke | `2c24855ef49df249527389eaaaa55877cea93fd6` | `ad4220cd24aacd06b85e7be3ca60ad7831a4ae38` |
| main-1

[무손실 압축 원문](../../../archive/blobs/557944cca00a5bae32e2d7050ea666e97ede4027decb3b9581338f950570f3ac.gz)
