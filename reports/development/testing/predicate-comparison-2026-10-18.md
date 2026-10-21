# main·지리 판정 실험 정확성 및 제한 성능 비교

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: PERF-PREDICATE-20261018 · 상태: verified-bounded-comparison / keep-main · 지도 반영: not-applicable
> 최종 수정: 2026-10-18
> 기준: `bb48e2cbb729bed9a794c1f3f843b5cb028e1227` (작업 시작 시 HEAD, main, origin/main 동일)
> 증거: [수집 목록·해시](../../../archive/blobs/dbaa525774709c3842135f74c48165dd39342226eb8206cb688f910555106527.gz), [native 원본](../../../archive/blobs/2bb3085f08a4ca69cfa30ec0ef0732b02bf365f5b3cf129c70dd855a5bd4fcd9.gz), [1도 변형 원본](../../../archive/blobs/0a09447d1b30f297c3cd46e39cbc57472ac0f31e81635b4f777c8eaaa06f4790.gz), [WASM 원본](../../../archive/blobs/ef92837e14228c4b431fc95236aac09f7e5f6a66c4b7b652862a05e28afbae0b.gz)
**제품에는 실험을 적용하지 않는다.** 확인한 실험 가운데 결과 보존과 주요 경로 성능 조건을 함께 만족하는 후보가 없었다. 현재 `shared/core/src/geometrypredicates.cpp`와 packaged WASM은 변경하지 않았다. 이번 변경은 재실행 도구, 고정 테스트 입력과 결과 보고서다.
브랜치 동기화 과정에서 실험 브랜치의 충돌 파일은 main 구현으로 통일되어 있었다. 따라서 현재 브랜치 파일끼리 비교하지 않고, Git 이력에 보존된 실험 원본 SHA의 계산 파일을 각각 main과 비교했다. 브랜치의 고유 커밋 수가 서로 다른 알고리즘 개수를 뜻하지는 않는다. 이번 비교 대상은 확인된 네 가지 원본과 main에서 파생한 작은 변형이다.
비교 파일은 모두 `shared/core/src/geometrypredicates.cpp`다. 각 실행 JSON에 SHA-256을 기록했다.
현재 main은 이미 링별 위도 인덱스와 자식 영역의 조기 판정 경로를 갖고 있다. 과거 실험의 파일 전체 교체는 이 개선 일부를 잃는다. main-1deg는 긴 선분을 별도 처리하는 32° 기준을 유지하면서 인덱스 해상도만 바꾼 제한 조합 실험이다. 제품 파일을 수정하지 않고 임시 빌드 파일에서만 생성했다.

## 결정
## 고정 소스와 방법
## 정확성 결과와 배제 이유
## Native 성능
## WASM 추가 확인
## 재실행
## 확인 범위와 남은 제한

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/557944cca00a5bae32e2d7050ea666e97ede4027decb3b9581338f950570f3ac.gz) · 원본 SHA-256 `557944cca00a5bae32e2d7050ea666e97ede4027decb3b9581338f950570f3ac`.
