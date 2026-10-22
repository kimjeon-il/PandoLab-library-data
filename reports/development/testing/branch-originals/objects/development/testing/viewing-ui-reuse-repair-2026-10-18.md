# 웹 열람 UI 공유 누락 조사와 복원 검증

> 압축 열람본: 도입부 발췌. 전체 출처·결론·미확인 내용은 연결한 원문을 따른다.



> 보고서 ID: `UI-VIEWING-REPAIR-20261018` · 상태: `verified-web-release / native-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-18
> 원문 최종 수정: 2026-10-18
> 조사 기준: 배포본 `2574f1e0e9b47b054e8c38d2c392aad8e79698c7`, `work/ui` 기준 `02a5c5baf569e9bf583e23febedb32baf848e7d2` 위 수정
> 원본·출처: 사용자 배포 화면, 같은 저장소의 앱 시작점과 실제 UI 소유자

## 대상과 기준일

웹의 편집 제거 과정에서 기존 UI를 재사용하지 않고 다시 만든 부분, 설정 누락, 지도 위 글자 가림, 이동 지연을 조사했다. 이전 제품 분리 보고서의 UI 재사용 설명은 아래 범위로 정정한다. 공통 엔진 사용은 사실이지만 모든 화면과 입력을 그대로 재사용한 상태는 아니었다.

## 공유 여부 대조

| 영역 | 발견한 차이 | 이번 수정과 현재 소유자 |
| --- | --- | --- |
| 설정 | 환경설정 진입점과 대화상자 누락 | 기존 대화상자 DOM 복원. 기존 바인딩을 `preferences-dialog.js`로 추출하여 앱/웹 함께 사용. 테마·강조색·상태표시줄·경계선 설정의 미리보기/취소/저장 공유 |
| 보기 | 별도 details 목록과 제한된 켜기/끄기 UI | 앱 `mapDisplaySurface`를 동일하게 사용. 기존 `app-map-settings.js`가 이름·깃발·경계·색·투명도·지명 언어·분포를 표시. 웹은 명시적 열람 상태 포트 사용 |
| 검색 | 텍스트 버튼 목록 재구현, 결과 아이콘·이동 버튼·지우기 누락 | 기존 `object-search-controller`, `object-search-model`, `search-toolbar-presentation`, `icon-utils` 사용. 동일 검색 패널 DOM |
| 날짜 | HTML month 입력으로 대체, 연/월 이동과 기원전 입력 누락 | 기존 `timeline-controls.js`와 동일 날짜 컨트롤 DOM. 앱의 ‘기준 편집’ 문구만 앱 호스트가 제공 |
| 객체 정보 | 임의 h2/dl 및 내부 종류 문자열 | 기존 객체 제목 표시를 `object-property-presentation.js`로 추출, 앱/웹 공유. 기존 정보 행 스타일과 surface-editor 배치 사용. 웹은 읽기 전용 필드 목록 조립 |
| 선택 색상 | 사용자 설정 대신 기본 스타일 고정 | 기존 `resolveMapInteractionStyle`에 현재 설정과 강조색 연결 |
| 카메라 이동 | 별도 감도·극점·경도 처리 | 기존 계산을 `camera-pan.js`로 추출해 양쪽 사용. 제품별 포인터/편집 제스처 등록은 별도 |
| 지명 글자 | 매 프레임 tspan 전부 삭제/생성 | 앱의 SVG 행 갱신을 `label-text-presentation.js`로 추출해 재사용. 다국어 행 간격과 클래스도 공유 |
| 내장 지명 | 조회 결과를 웹 호스트가 별도 보관 | 공통 place-runtime의 resolve/retained 소유자를 통

[무손실 압축 원문](../../../../../../../archive/blobs/a3e9eb46e35b094a7213834476c53aaff9d5080f7e009b21f79d17c44437dbdd.gz)
