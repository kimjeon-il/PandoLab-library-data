# UI 구조 통일 P4 — 참조 이미지 공통 Surface 통합

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-CONVERGENCE-P4-20261021` · 상태: `implemented / focused-browser-verified / staged-app-verified / native-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-21
> 원문 최종 수정: 2026-10-21
> 수정 기준: `work/ui`의 `0ce82bbd53dd610095c16525016e6490595daec7`에서 최신 `main`의 `4f35c345e0707c44e383cca027e119207f93259c`로 fast-forward한 뒤 적용한 P4 변경
> 검증 대상: 위 기준 커밋에 이 보고서와 함께 기록한 P4 소스·생성물·테스트 변경
> 근거: [P0 구조 조사](ui-convergence-p0-audit-2026-10-20.md), [공통 UI 구조](https://github.com/kimjeon-il/Pando/blob/75499e014542747def35653a73b753e208ed0d31/docs/architecture/ui-architecture.md), [브랜치 정책](https://github.com/kimjeon-il/Pando/blob/75499e014542747def35653a73b753e208ed0d31/docs/branch-policy.md)
사용자가 지시한 P4, 즉 참조 이미지 패널의 공통 Surface 통합을 구현했다. 기존 P0–P3 결과를 보존하고, 작업 전 최신 `main`의 22개 커밋을 `work/ui`에 fast-forward했다. 공개 웹은 viewer이고 참조 이미지 편집 도구는 앱 편집기에서 제공하므로, 공개 웹과 앱 편집기 검증을 구분했다.
고정 구조는 `surface-header` → `surface-body` → `surface-footer`이다. 본문에는 이미지 목록과 편집 영역, footer에는 작업 요약과 완료·취소 및 보조 작업 영역을 둔다. 패널 설치·재설치, 접기·펼치기, 모바일 편집 전환 과정에서 이 구조와 제어 요소의 identity·부모를 유지한다.
데스크톱 오른쪽 도킹과 지도 가용 폭, 키보드·포인터 너비 조절, 접기, 모바일 하단 시트와 작업 중 요약 모드를 보존했다. `gis-form-grid`에 의존하던 본문은 일반 Surface 본문으로 정리하고, 이름·불투명도·회전·보정 방식·혼합 입력을 기존 공통 `ui-field field-group`으로 구성했다. 이름과 삭제 버튼은 Layout에서 가로 배열을 명시한다.

## 범위와 구현 결과
### 공통 검사와 생성물
## 검증 결과
### 실제 앱 패키지 실행
### 검사 과정에서 확인하고 처리한 사항
## 재현 명령
## 남은 단계와 반영 범위

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/880d190bb71db9fe9a756c1d7e5f743f9b337718e8aec438fcea471a6570b6c3.gz) · 원본 SHA-256 `880d190bb71db9fe9a756c1d7e5f743f9b337718e8aec438fcea471a6570b6c3`.
