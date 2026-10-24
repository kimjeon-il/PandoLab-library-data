# 웹 날짜 도구 배포와 상설 작업 브랜치 전파

> 보고서 ID: UI-DATE-RELEASE-20261022 · 상태: pages-live-verified / task-propagated / objects-core-prerequisite-blocked · 지도 반영: not-applicable
> 원문 최종 수정: 2026-10-22
> 조사 기준: main 2ea0c1e663d2a72ee17c257a2be90de94f50d729 / 앱 HTML 동일 커밋의 브라우저 검증
> 원본·출처: https://github.com/kimjeon-il/Pando/actions/runs/39702862344 및 인접 evidence 디렉터리

## 대상과 기준일

웹 하단 상태표시줄 제거, 독립 날짜 도구와 연도·월 입력창, SVG 화살표, 내부 구분선 없는 배치를 배포했다. 앱 상태표시줄은 유지했다. 앱 실행 파일 갱신과 네이티브 WebView 검증은 이번 작업 대상이 아니다.

## 근거와 방법

work/ui 원본 0fd3f088을 main에 선별 반영한 소스 커밋은 b1160be0213d이며, main 소스와 자료 핀으로 재생성한 배포 커밋은 2ea0c1e663d2이다. 기존 참고 이미지 기능 등 다른 미통합 UI 작업은 main에 섞지 않았다. Pages workflow_dispatch는 skip_checks=false로 실행했다.

- main 관련 단위 및 Pages 준비 검사: 24/24 통과.
- main 브라우저 검사: 날짜 도구와 앱 상태표시줄 2/2 통과. 1440/1024/800/390/320 CSS px, 기원전·연도 0 오류·Escape·바깥 클릭·검색 확장 겹침·문서 불변성을 확인했다.
- work/ui: 관련 17개와 동시 원격 앱 진단 4개, 합계 21개 통과.
- work/gis 및 work/places: 각각 관련 단위 17개와 메타데이터 재생성 검사 통과.
- work/objects: 제품 HTML·공유 UI 계약 2개와 메타데이터 검사 통과. 날짜·사용자 설정 검사 파일 2개는 기존 Core prerequisite 불일치로 import 단계에서 차단됐다.

## 배포와 라이브 확인

- Pages run 39702862344: success. 배포 ID 7240990658, 대상 SHA 2ea0c1e663d2a72ee17c257a2be90de94f50d729.
- 사이트: https://kimjeon-il.github.io/Pando/
- 최종 산출물: 1701개 파일, 202696903 bytes. metadataCheck=passed.
- 변경 파일 7개가 HTTP 200이며 Git 커밋 및 업로드 산출물의 SHA-256과 모두 일치했다. live-file-hashes.json 참조.
- 새 in-app browser 탭에서 지도 준비 완료 후 2026년 10월 → 9월 → 10월 이동, 입력창 열기와 Escape 닫기를 확인했다. 캡처된 오류·경고 없음. live-browser.json 및 live-date-tool.png 참조.

## 브랜치 전파

work/ui에는 배포 main을 병합하고 작업 도중 추가된 원격 aaed8a7a 앱 진단 커밋도 보존했다. 나머지 세 브랜치는 자료/WASM 조합이 달라 전체 main 병합 대신 이번 UI 커밋만 선별 적용했다. GIS의 전체 main 시험 병합은 미완료 변경이 없는 초기 상태에서 안전하게 abort했다.

| 브랜치 | 최종 원격 SHA | 자료 핀 | 이번 UI 소스 |
| --- | --- | --- | --- |
| work/ui | 5b37d0a23b76b9f1143e8e5bfa5eca9737417219 | 7e7a015ebddada00d97d899e11c9ebcc1847452a | 31개 main과 동일 |
| work/objects | 4df51620a5bb92d40e9ee881d768801c192dc0ae | ea843c09e790245cbcfe35a44051b2d67534ee4e | 31개 main과 동일 |
| work/gis | 3d2c0d82ce46a16eaa73b3ed720ca1fbd45c9d95 | a09a1de5ee0e7fd6d6f8627c84f887068ca4eba9 | 31개 main과 동일 |
| work/places | f9e53554c3b601b84dec052a00339fc868086bad | cd0698ab2886e7468cf10571186c76941e56709a | 31개 main과 동일 |

모든 원격/로컬 head 일치, 작업 트리 clean, 기존 로컬·원격 커밋 포함, 각 자료 핀과 WASM/manifest blob 보존을 확인했다. branch-baselines.json 및 branch-propagation.json 참조. 생성 파일은 각 브랜치의 원본 소스 커밋과 자료 핀으로 다시 만들었다.

## 확인 결과와 한계

work/objects의 기존 소스 digest는 e3358a716040d593d44d4b127c2c0dac5147aa27b1c0e797a69cf758373b50f4, 패키지 digest는 10aa3ff4e05037670655332ec1755b075254edfe09ede1b09e233a4fb3137684다. 원격 C++ 정리 커밋을 동기화한 뒤 이미 불일치했으며, 이번 UI 전파로 shared/ 또는 assets/wasm/는 변경하지 않았다. 고정 빌드 폴더의 기존 Core도 현재 digest와 달라 재사용 검증을 통과하지 못했다. 검사를 우회하거나 WASM을 교체하지 않았고, 이 두 검사 파일을 통과했다고 보고하지 않는다.

다른 작업 브랜치별 전체 브라우저/네이티브 검사, 전체 테스트, GIS 재생성은 실행하지 않았다. 실제 사용자 사용성 검증도 별도다. 보고서와 원문 증거는 외부 자료 저장소의 .working 원본에 보존했으며, 자료 저장소 전체를 --store하거나 자료 핀을 갱신하지 않았다.

## 데이터 반영

런타임 지도 자료·GIS·자료 핀 변경 없음. 이번 반영은 UI 코드·테스트와 생성 HTML/메타데이터에 한정한다.

## 판본

2026-10-22 최초 배포 및 전파 기록.
