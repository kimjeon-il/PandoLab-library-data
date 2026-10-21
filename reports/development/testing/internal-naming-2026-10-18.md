# 기존 동작을 유지하는 내부 명칭 정리

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: DEV-NAMING-20261018 · 상태: verified-naming / baseline-test-failures · 지도 반영: not-applicable
> 최종 수정: 2026-10-18
> 기준: `bb48e2cbb729bed9a794c1f3f843b5cb028e1227` + `work/ui` 작업 변경
기능과 코드 경로를 제거하지 않고 승인된 내부 명칭만 바꾼다. UI 문구·정렬·검색 지연·확정/취소·계산·이력·저장 형식은 유지한다. 기존 보고서와 고정 fixture는 수정하지 않았다.
모듈은 `app-object-catalog.js`, `object-search-controller.js`, `object-search-model.js`, `map-surface-host.js`로 옮겼다. 관련 import·테스트 파일명·DOM ID·CSS 선택자·공통 앱/웹 입력 연결도 함께 갱신했다. CSS bundle은 원본 스타일에서 다시 생성했다. 이전 이름의 production alias는 추가하지 않았다.
객체 카탈로그의 새 provider 이름과 기존 상수 포트 이름이 겹치므로 상수 포트는 `objectDefinitions`로 구분했다. 카탈로그 조회 포트는 `objectCatalogView`, 표시 갱신 포트는 `objectDisplay`, 렌더 시 검색 갱신 콜백은 `objectSearch`다. 검색어와 표시 갱신 revision의 책임은 합치지 않았다.
C++ 사용자 레이어 조회·변경 API도 `userLayer`, `userLayers`, `addUserLayer`, `removeUserLayer`, `moveUserLayer` 등으로 통일했다. `MoveCountryToUserLayer`는 기존 소속 이동을 그대로 수행한다. `layer.add`, `layer.remove`, `layer.move`, `layer.visibility`, `layer.lock`, `country.move` 등 명령 ID와 모든 codec 문자열·저장 필드는 유지한다.
Native 프로필, 기존 codec과 레이어 명령, 지도 실행과 실패 시 재초기화, 수계 설정 변환, 폴더 모델의 기존 분기도 그대로 남아 있다. 실제 국가 자료의 `Country*`와 GIS·분포·GPU 레이어 이름은 변경하지 않았다. 과거 oracle의 export명·소스 경로는 그 원본을 불러오는 테스트 경계에서만 유지한다.

## 변경 범위
## 검증
## 범위 밖
## 후속 배포 승인

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/2cf2c599f7d952df6fa5083902970636c3840908b56b1534607ef51040b5502e.gz) · 원본 SHA-256 `2cf2c599f7d952df6fa5083902970636c3840908b56b1534607ef51040b5502e`.
