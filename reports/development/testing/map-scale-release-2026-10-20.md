# 지도 표시·UI 검사 정리와 웹·Windows 게시 검증

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-MAP-SCALE-RELEASE-20261020` · 상태: `pages-live-verified / windows-native-verified / separate-ci-failures` · 지도 반영: `not-applicable` · 색인일: 2026-10-20
>
> 원문 최종 수정: 2026-10-20
>
> 조사 기준: 소스 `1fd837329837`·`5342dd4f1025`·`4bcd15a19f55`, 최종 게시 자산 `6cdec40b549acccf23a8583c4ba531c8aac1b44a` (검색 헤더 `c0242d78abea`, 공통 메뉴 모서리 `908691ea4df8`)
>
> 원본·출처: [구현과 로컬 검증](map-scale-readiness-2026-10-20.md), `.superpowers/sdd/map-scale-release-20261020/` 실행 근거
사용자가 UI 검사 잔여 실패 수정, `work/ui → main` 통합, 웹 Pages 배포와 기존 Windows 실행 파일 갱신을 승인했다. 기준 main은 `8cb2883e4bd09ba014965b3ce7bec1d5770c1b33`이다. 기존 UI 브랜치의 검색·메뉴·반응형 개선과 지도 품질·준비 판정 변경을 통합 대상으로 삼는다. GIS 원본 자료와 시간 기록은 이번 변경 대상이 아니다.
검색창의 CSS 기본값 `0px` 두 곳은 동등한 `0`으로 정리했다. 추가 UI 묶음 검사에서 발견한 범위 선택창의 인라인 좌표 스타일은 CSS 사용자 속성으로 분리했고, 두 편집 버튼에 공통 `.ui-button` 계약을 적용했다. 실제 범위 드래그에서는 지도 입력 컨트롤러가 포인터를 가져가는 기존 오류를 재현했다. 기존 입력 판정에서 범위 선택창을 조작 대상으로 인식하도록 수정하고, 사각형 크기·지도 이동 없음·취소 후 프로젝트 보존을 회귀 검사했다.
원격 push, Pages workflow, 실제 사이트 파일과 동작, 네이티브 빌드와 실제 WebView2 실행은 각각 확인한다. 브라우저 검사를 네이티브 실행 증거로 취급하지 않는다. 실행 파일은 설치 패키지나 ZIP 대신 기존 `apps/web-shell/run-windows.bat` 경로의 GNU debug EXE를 갱신한다.

## 대상과 기준일
## 근거와 방법
## 확인 결과와 한계
## 통합·웹 배포
### 포커스 수정 후 중간 게시
### 검색·보기 수정 최종 게시
## 기존 UI 정비 방향을 유지한 검색·보기 수정
## Windows 실행 파일
## 별도 원격 CI 결과
## 데이터 반영과 판본

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/0c78f971940081c3bb876c08a54b8bd182dbbde453e7bd7e0cb30af265efbe6d.gz) · 원본 SHA-256 `0c78f971940081c3bb876c08a54b8bd182dbbde453e7bd7e0cb30af265efbe6d`.
