# 앱 편집 집중과 프로젝트 저장 범위 변경 검증

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-EDITOR-FOCUS-20261019` · 상태: `focused-verified / android-device-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-19  
> 원문 최종 수정: 2026-10-19  
> 조사 기준: 웹·앱 `work/ui` 기준 커밋 `44fb6d41977123b5220cde8078f1e9a7e38b2728` + 기존 WIP와 이번 미커밋 변경  
> 원본·출처: [승인 계획](https://github.com/kimjeon-il/Pando/blob/836cc4e570446ac3e3c8bc3034aa788886145221/docs/superpowers/plans/2026-10-19-editor-focus-project-storage.md), [실행 원장](../../../.superpowers/sdd/2026-10-19-editor-focus-project-storage/progress.md)
Windows·Android 앱을 편집 중심으로 만들고, 공통 Web/Core 프로젝트 포맷을 12로 변경한 로컬 구현이다. 웹은 지형 배경을 유지한다. 기존 work/ui의 프로젝트 설정·비교·편집 WIP를 보존했다. main 통합, 커밋·푸시·공개 배포는 하지 않았다. 원격 work/ui의 generated-only 후속 커밋을 겹치는 WIP 위에 병합하지 않고, 현재 소스에서 산출물을 다시 생성했다.
새 문서는 새 UUID를 사용하고 저장·재열기는 ID를 유지한다. editorState.lastViewedMonth와 physicalSettings는 프로젝트 저장물에서 제거했다. 실제 형상 의존 physicalSourceInfo는 유지한다. 구형 v11 읽기·변환 경로를 추가하지 않았다. 거절된 자동저장이 어느 슬롯에 있든, 읽기 오류 재시도와 유효 v12 슬롯 동시 존재까지 포함해 승격·삭제·백그라운드 덮어쓰기를 차단한다. 보호 중 자동저장은 멈추므로 작업은 파일로 저장해야 한다.
파일을 명시적으로 열면 작성한 기본 월·표시를 적용하고 지도 범위를 맞춘다. 앱은 평면, 웹은 지구본으로 연다. 시작 시 이어가기는 일치하는 documentId의 작업상태를 사용한다. 기본 화면 복귀는 배경 선호를 변경하지 않는다. 기본 월을 제외하는 탐색 범위 변경은 Core에서 거절한다.
앱 지형 메뉴·서비스 생성·manifest/DEM 요청·렌더러 지형 준비·타일 포장은 차단했다. 공통 렌더러와 WASM은 유지하며 별도 앱 지도 엔진을 만들지 않았다. full-world의 내장 수계·지명은 오프라인으로 포장하되 초기 off, 명시적 활성화 때 로드한다. small-project는 미포장 내장 자료를 제공하지 않는다. 프로젝트 수계·지명은 별개로 유지한다. 참조 이미지/트레이싱은 첫 사용 시 초기화하며 새 앱은 평면, 경위선·그림자 off로 시작한다.

## 대상과 기준일
## 구현과 저장 계약
## 근거와 방법
## 확인 결과와 한계
## 데이터 반영과 판본

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/c64d525aa8a1b5d39712382493a6ea84a95561320c8be05681ec819720cee29f.gz) · 원본 SHA-256 `c64d525aa8a1b5d39712382493a6ea84a95561320c8be05681ec819720cee29f`.
