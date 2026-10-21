# 새 프로젝트 생성 통합과 보기 상태 저장 분리

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-PROJECT-CREATION-20261019` · 상태: `focused-verified / baseline-test-failures / android-device-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-19  
> 조사 기준: 웹·앱 `work/ui` / `44fb6d41977123b5220cde8078f1e9a7e38b2728` + 작업 전 미커밋 변경 + 이번 수정  
> 원본·출처: 공통 ProjectSession·ProjectDomain·C++ ProjectCodec, 생성 UI, `.superpowers/sdd/2026-10-19-project-creation-storage/` 실행 기록
승인한 새 프로젝트 생성·저장 범위 계획을 구현했다. 작업 중 추가 지시인 **분포도 기존 유지**를 반영하여 분포 모델·편집·표시 모드·경계 표시·저장 기능은 유지했다. 분포 설정은 기존 read-model의 `distributionSettings` 필드를 schema14 최상위 저장 필드로 사용하며, 제거한 `defaultView`에 중복 포장하지 않는다.
기존 `work/ui` 상설 워크트리의 미커밋·미추적 작업을 보존했다. 원격 확인 후 자동 stash 없이 `origin/main`의 ff-only 반영을 시도했으나 겹치는 WIP 때문에 Git이 거부했다. 기준 SHA와 기존 작업 위에서 진행했으며 최신 main 통합 검증으로 표현하지 않는다. 작업 전 상태·소스 사본·바이너리 해시는 실행 기록의 `baseline-status.txt`, `baseline.patch`, `baseline/`, `baseline-binary-hashes.json`에 보존했다.
- **새 프로젝트** 한 창에서 시작 연월, 선택적 기간, 초기 지도 범위, 내장 지도/빈 지도 소스를 정한 뒤 생성한다. 기본값은 로컬 현재 월·기간 제한 없음·세계 전체·내장 지도다. 별도의 프로젝트 설정 버튼·설정 모드와 기본 화면 캡처/초기화 동작을 제거했다. 취소·검증 실패는 현재 문서를 바꾸지 않는다.
- 공통 C++ 문서와 현재 Web/native 형식은 **schema14**, 필수 `projectSetup { initialMonth, timelineRange, initialMapBounds, sourceMode }`를 사용한다. 초기 월은 여기 한 번만 저장한다. `defaultView`, `project.configure`, `project.default-view`와 해당 typed command·호출부·obsolete 테스트를 제거했다. 현재 파일만 지원하며 schema13 이전 개발 파일을 변환하지 않는다.

## 대상과 기준
## 변경과 정본 소유자
## 근거와 검증
## 한계와 판본

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/55f4350803d0c5b683a01139a861e9857e79ebaf3180b1393fe5f44b1f66bec9.gz) · 원본 SHA-256 `55f4350803d0c5b683a01139a861e9857e79ebaf3180b1393fe5f44b1f66bec9`.
