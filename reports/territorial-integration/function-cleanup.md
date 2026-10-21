# Territorial 함수 정리 구현

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

기준: `main` / `28e37086d7851bd3368afd86cf5a1c03c66ff2bb`, 2026-10-03.
조사 원본 `function-audit.md`는 수정하지 않았다. 커밋·푸시·배포는 하지 않았다.
- 조사한 미사용 함수 16개와 dead DI `countrySubunitExtent`를 제거했다.
- `territorialUnitById`, 세 `countryEntityById`, `countryFeatureById` 조회 별칭을 제거했다. 업무 읽기는 Repository, 현재 raw 자료가 필요한 저장·렌더·Worker 경계는 Store를 사용한다.
- country/unit 선택 wrapper, metadata commit, 색상 reset, 삭제 entrypoint를 현재 공통 ref 명령으로 교체했다. 기존 이름의 forwarding alias는 남기지 않았다.
- `isCountryLocked`, `lockedCountryIds`, `requireCountriesUnlocked`를 제거했다. 현재 ref 잠금 읽기와 `requireObjectsUnlocked` 작업 guard가 종류·존재 여부·잠금을 검사한다.
- 과거 territorial geometry kernel의 Region merge를 현재 편집 계획으로 옮기고 factory와 미사용 메서드·Worker operation을 제거했다. 실제 endpoint snap은 유지했다.
- 중복 행정 계층·색상 상속 Map을 제거했다. 실제 geometry union cache와 렌더러의 투명도·겹침 처리는 각 owner에 남겼다.
- Generic Feature에 과거 `ownerId` / land binding 의미를 실행하던 삭제·변환 분기를 제거했다. 원본 source provenance는 보존한다.
- 제거한 함수나 옛 선택·삭제 구조를 요구하던 정적 테스트는 제거했다. 현재 명령의 결과·잠금·rollback·Undo를 검사하는 단위 테스트와 실제 브라우저 흐름으로 확인한다.
- COUNTRY / SUBUNIT / REGION 메타데이터의 허용 필드, 잠금, no-op, 기간 validation을 통일했다. 부모·소속 변경은 별도 관계·형상 명령에 남긴다.
- 국가 기간은 Repository가 읽는 raw properties에 저장한다. canonical baseline과 편집 snapshot이 같은 geometry를 공유하더라도 변경된 metadata를 비교하므로 Undo와 저장 delta에서 누락되지 않는다.

## 현재 책임과 진입점
## 제거·교체
## 공통 계약에서 함께 수정한 차이
## 이름 정리
## 유지한 현재 내부 경계
## 집중 확인

---
[작성 당시 원문(무손실 압축)](../../archive/blobs/36c4b10244f2a8ebd7eb4e3180caea3cd18a905066ecd6ab4e9ae62f268ba97b.gz) · 원본 SHA-256 `36c4b10244f2a8ebd7eb4e3180caea3cd18a905066ecd6ab4e9ae62f268ba97b`.
