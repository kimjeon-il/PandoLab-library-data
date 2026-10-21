# C++ CI 2건과 Windows WebGL UI 시간 초과 수정

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `DEV-CORE-CI-WEBGL-20261020` · 상태: `native-ci-verified / webgl-ui-verified / separate-artifact-ci-failure` · 지도 반영: `not-applicable` · 색인일: 2026-10-20
>
> 원문 최종 수정: 2026-10-20
>
> 조사 기준: main `a5f3208c782728b4540c3072bc784ef55933c1c3` · 수정 `b234955311d11c592d3d3eba78c4a3b1524867f1`
[이전 배포 검증](map-scale-release-2026-10-20.md)에 남긴 C++ 두 실패와 headless WebGL UI 시간 초과를 각각 재현했다. `work/ui`의 기존 테스트 삭제 작업을 보존하고, `work/objects`에서 최신 main과 두 작업 범위를 함께 검증했다. objects의 미완료 보고서 색인 한 행은 원본·patch로 보존한 뒤 최신 색인에 다시 적용했다. 별도 작업을 커밋하지 않았다.
원래 CI와 같은 `web_content_command_tests`, `web_territorial_command_tests`를 GNU 13.1.0 Release / assertion 활성 상태에서 실행해 두 실패를 그대로 재현했다(`ctest-red.log`). 제품 검증을 완화하지 않고 테스트의 현재 입력 계약을 고쳤다.
- content fixture는 기본 `ProjectDocument.exchangeMetadata`에 이미 들어 있는 `projectSetup`을 출처 baseline에 등록하지 않았다. 일반 객체를 처음 만들면서 비승격 inline geometry 검증이 활성화되어 `missing opaque baseline`으로 거부됐다. 기존 `GeometryProvenanceCodecAccess::admitProjectSetupMetadata`를 통해 fixture를 준비한다. baseline 검증을 생략하거나 임의의 private hash 함수를 노출하지 않았다.
- territorial golden은 현재 `TimelineRecordSchemaVersion=2`와 다른 v1 직렬화를 기대했다. 두 literal을 v2와 명시적 빈 `propertyBindings`로 갱신했다. 기록 ID 충돌, archived geometry v7·증분 v8, 월별 할당, 생성·삭제·원자성·Undo/Redo 검사는 유지했다. 과거 형식 읽기나 별도 호환 경로를 추가하지 않았다.

## 대상과 방법
## 원인과 수정
### 네이티브 C++
### Windows headless WebGL
## 생성물과 원격 검증
## 근거와 판본
## 반영 범위

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/6be7b0227e6f1fcec01bf324115ac5683f91b15436be54954387c5f3a719c632.gz) · 원본 SHA-256 `6be7b0227e6f1fcec01bf324115ac5683f91b15436be54954387c5f3a719c632`.
