# 상위·하위·지방 객체의 표시 규칙 통합

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-OBJECT-DISPLAY-20261019` · 상태: `focused-verified / android-device-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-19  
> 조사 기준: 웹·앱 공통 `work/ui` / `44fb6d41977123b5220cde8078f1e9a7e38b2728` + 보존한 미커밋 변경 위의 이번 수정  
> 원본·출처: 아래 정본 모듈 및 `.superpowers/sdd/2026-10-19-unified-object-display/` 실행 기록
사용자 요청은 상위·하위·지방 판정 중 불필요하게 나뉜 표시 규칙을 찾아 공통 ‘객체’ 설정으로 통합하는 것이다. 영토 소유권, 실제 부모 관계, 유효기간, 일반/지방 모델 구분을 삭제하는 작업은 아니다.
기존 상설 UI 워크트리를 사용했다. 기존 프로젝트 설정·편집·비교 화면 등의 미커밋 변경을 작업 전 보관한 기준과 비교했으며, 자동 stash·초기화·분야 간 변경 이동은 하지 않았다. 원격 `work/ui`의 생성물 변경 1개 커밋은 겹치는 미완료 작업 위로 병합하지 않았다. `main` 통합·커밋·푸시·배포는 이번 작업에서 실행하지 않았다.
정본은 `layer-presentation.js`, `map-display-catalog.js`, `object-query.js`, `object-catalog.js`, `object-search-model.js`, `app-map-settings.js`, `map-content-presentation.js`, `territorial-fill-style.js`와 공통 C++ presentation/command/document-session 소유자다. 웹·앱은 같은 보기 fragment와 같은 상태/렌더링 규칙을 사용한다. 제거한 메뉴를 CSS로 숨기거나 과거 키를 alias로 남기지 않았다.
실제 합성 역할은 `territorialPaintRole`로 판정한다. 상위 일반 객체의 기본 면, 부모 소유권을 따르는 일반 하위 면, 독립적으로 겹치는 지방 면은 서로 다른 그리기 역할이다. 일반 자식의 부모 색상·불투명도 상속, 지방의 독립 면, 내부/외부 경계 위상과 선택 순서는 보존했다. `countriesVisible` 같은 저수준 기본 면 패킷 이름과 국가 자료 파일명은 별도의 사용자 보기 설정이 아니다.

## 대상과 범위
## 조사 결과와 적용
## 저장 형식과 자료 보존
## 검증
## 한계와 판본

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/cd1a613fc4863108d2055ceb67b1e2afbc40ea10222e8e06b54944487dd21d63.gz) · 원본 SHA-256 `cd1a613fc4863108d2055ceb67b1e2afbc40ea10222e8e06b54944487dd21d63`.
