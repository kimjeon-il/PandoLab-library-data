# 웹·앱 공통 지도 구성 통합

> 보고서 ID: `DEV-SHARED-MAP-20261028` · 상태: `integrated-and-deployed` · 배포: `7b08f5ba6` · 색인일: 2026-10-28
> 원문 최종 수정: 2026-10-28
> 기준: Pando `23d66fc22cf3fa713c9ceff9443eefa401cd96a1`, 기존 `work/ui`

## 범위와 결과

웹 Viewer와 편집 앱 웹셸의 보기 메뉴 자료 준비, 지도 소유자 연결, 영역 조회기,
프레임 표시 자원, 입력 연결을 기존 공통 소유자로 통합했다. 문서·선택·영역 형상은
기존 정본 소유자를 사용한다. 자료·WASM 핀, 좌표, 저장 형식은 변경하지 않았다.
선행 아이콘·설치·네이티브 계약의 미커밋/미추적 수정은 작업 커밋에서 제외하고 보존했다.

- 보기 메뉴: 승인된 활성화 이후에만 기존 수계·지명 로더를 실행하고 실패를 전달한다.
- 공통 연결: 117개 owner-to-owner 매핑을 map-owner-ports에서 제공한다. 연결 시점에
  getter를 값으로 복사하지 않아 늦게 초기화된 출처와 현재 상태를 그대로 조회한다.
- 초기화: query/spatial/label/anchor/projection 단계를 기존 공통 구성 소유자에 모았다.
  Viewer도 objectPresentation의 정본 영역 조회기와 실제 SelectionDomain을 사용한다.
- 표시 자원: 9그룹을 공통화하고 프레임당 한 번 참조를 갱신한다. 편집 전용 미리보기,
  내부 경계 계산, 드래프트·지표는 앱에서 명시적으로 주입하며 Viewer에 추가하지 않았다.
  기존 resource-update-policy와 렌더러별 의존성 키·캐시 소유권을 유지했다.
- 입력: 기존 capability 포트와 명시적 편집 훅을 사용한다. 오류는
  (error, user message, code, duration) 계약으로 전달하고 dispose 시 hover 예약을 취소한다.

## 실제 회귀와 수정

공통 포트 병합 과정에서 Viewer의 임시 pending-anchor Set/Map이 살아 있는 공통 getter를
가려 계산 중 상태가 보이지 않는 회귀를 재현했다. 임시 중복 상태를 제거하고 공통 포트를
직접 사용하도록 수정했다. 실제 catalog의 '계산 중' 표시를 두 제품 모두 확인했다.
독립 코드 검토가 지적한 이 P2는 실패 재현 후 수정·재검증했다.

실제 Chromium 터치 입력에서는 지도에 올바른 두 객체가 조회되어도 pointerdown/up과
터치 이벤트 뒤 click이 생성되지 않아 선택이 누락되는 경우가 있었다. 공통 입력의
select 모드가 pointer release에서 직접 선택하도록 수정했다. 기존 컨트롤러가 뒤늦은
합성 click을 억제하며 편집 도구·이미지 배치·오버레이 통과 규칙은 기존 소유자에 남겼다.
실제 컨트롤러·gate를 연결한 단위 회귀와 양 제품의 WebGL/Canvas 터치로 확인했다.

## 집중 검증

| 구분 | 실제 결과 |
|---|---|
| 공통 구성·capability·보기·입력·lifecycle·저장 모드 | 83개 통과 |
| 기존 native-storage 및 report-paths | 9개 통과. 실기기 검증 아님 |
| 보고서 접근/게시 작은 Git fixture | 선택한 2개 통과 |
| 기존 실제 picking 브라우저 회귀 | 웹 hover/body click, 앱 프로젝트 열기/확대 2개 통과 |
| 합성 공통 지도 브라우저 | WebGL/Canvas × 마우스/터치 4개 통과(각각 Viewer와 앱 웹셸) |
| 변경 JS/MJS ESLint 및 git diff --check | 통과 |

합성 검증은 작은 겹침 객체 A/B의 현행 objectRef/timeline 계약, 실제 C++ 수락과
GeoPackage 인코더를 사용했다. 지도 이동, 겹침 후보 선택, 선택에 따른 dirty/history
불변, pending-anchor 표시, pageerror 없음, 앱의 지형 요청 없음까지 확인했다.
WebGL 마우스에서는 두 제품의 1914-06→07→08 이동 후 카메라 유지도 확인했다.
앱 웹셸에서 이름 수정·Undo/Redo·SQLite 저장 바이트·재열기 후 값/dirty를 확인했다.

단위 검사는 중복 재실행을 빼고 총 94개, 브라우저는 총 6개다. Chromium 터치는
Android 실기기 검증이 아니며 Windows WebView2·Android 네이티브 검증은 수행하지 않았다.
전체 테스트·실제 세계지도 전수 보존 검사·GIS 생성·네이티브 빌드·설치 패키지 생성은
수행하지 않았다. 자료 핀은 `429467eb60cbdc55a1dabb0f91270f1a3a9c046a`로 유지했다.

광범위 scripts/check-runtime-boundaries.mjs 및 CI 검사 목록 생성 명령은 자동 승인 검토의
`CHECK-BUDGET: whole-suite or broad-scope checks require an exact owner grant`로
차단되었다. 우회하지 않았다. 파일별 capability/구성 검사는 위 표와 같이 통과했다.
이 두 광범위 검사와 실제 네이티브 기기 검증은 미실행으로 구분한다.

## 작업 커밋과 크기

앱 work/ui의 로컬 작업 커밋:

- `e71eb3f11`: 보기 메뉴 자료 준비 통합.
- `d34cd05c6`: 보고서 접근과 독립 Git 유지보수 분리.
- `80dfdedb6`: 공통 지도 포트·표시 자원·입력 구성과 회귀 검증.

선택한 변경 파일의 논리 바이트 비교(기준 커밋→완료 파일, 선행 네이티브/아이콘 제외):
실행 코드 499,575→490,219(-9,356), 문서 4,122→5,357(+1,235),
테스트 68,898→91,379(+22,481). 합계 증가는 회귀 테스트·문서이며 실행 코드는 감소했다.
앱 푸시·main 통합·브랜치 전파·배포는 이번 범위에 포함하지 않았다.

## 저장공간·유지보수·정리

기존 공유 캐시와 고정 출력 경로를 재사용했다. 새로운 대형 fixture/패키지/전체 자료
복사와 빌드는 없었다. stock 브라우저 서버의 자료 준비가 공유 Git 재압축에서
시간초과한 뒤 동일 핀의 완성된 캐시를 직접 사용하는 기존 preview 구현으로 검증했다.
임시 서버는 종료했고, 남은 서버/리스는 없다.

보고서 helper도 독립 Git 유지보수를 자동 실행하는 문제가 있어 hydrateReports에
기존 게시·확인과 같은 compact:false를 적용했다. 작은 fixture에서 접근 전후 journal
바이트·원문 보존과 runtime 미생성을 확인했다. 공유 Git의 별도 유지보수를 복구하거나
다른 writer의 lock/journal/pack을 삭제하지 않았다.

남은 유지보수 기록: .git/pando-git-compaction.pending.json 2,390,268바이트,
단계 packs-installed. .git/pando-repack-cd9eaa3e-40f1-4936-b64c-50ae7610f643에
.rev 파일 1,260+2,944=4,204바이트가 남아 있다. 원본 변경이 감지된 재압축의 명시적
복구에 필요한 보호 기록이므로 보존한다. 보고서 접근·게시와는 분리했다.

소비가 끝난 작업 임시 파일 6개, 논리 17,936바이트를 삭제했다:
C:/Users/taeeu/.codex/tmp/의 pando-extract-map-ports.mjs(4,442),
pando-share-rendering.mjs(7,184), pando-shared-map-files.json(1,708),
pando-shared-map-progress.md(2,524), pando-shared-map-server.mjs(2,033),
D:/dev/worktrees/ui/test-results/.last-run.json(45).
절대경로·파일 유형·링크 아님과 서버 소비 종료를 재확인한 뒤 삭제했다. 삭제 차단은 없었다.

D 여유는 시작 57,063,284,736바이트, 종료 정리 직후 57,112,670,208바이트였다.
관측 차이 +49,385,472바이트는 공유 드라이브 전체 변화로, 이 작업의 회수량으로
주장하지 않는다(C 임시 파일 17,891바이트, D 임시 파일 45바이트 삭제).
대형 기존 캐시는 현재 자료/개발 작업 소비자가 있어 유지했다.

## 보고서 보관 범위

`reports/development/integrations/shared-map-composition-20261028`만
publish-reports 및 check-reports 대상으로 지정한다. 원격 보관 커밋과 실제 검증 결과는
작업 완료 응답에서 기록한다. 다른 보고서·runtime 자료·비공개 앱 커밋은 공개하지 않는다.


## 후속: ② 보기 → ① 지도 연결 → ③ 입력·선택 → ④ 플랫폼 계약

작업 커밋: `4b953d376` (로컬 work/ui). 기준 `80dfdedb652af86728fb7f1ed0dbe461c853e5ef`.
아래 결과는 이번 실행이며 이전 절의 94개/6개 결과와 중복 합산하지 않는다.

### 단계별 완료

- ② 보기: 기존 공통 HTML·메뉴·자료 준비 소유자를 유지했다. 미로딩/비표시/기본 자료와
  실패 후 재시도의 기존 집중 검사가 통과했다. 실제 양 제품에서 객체 표시를 껐다 켜도
  메뉴가 남고 빈 분포는 숨겨지며 checkpoint/presentationCheckpoint/dirty/canUndo가
  바뀌지 않았다. 웹의 지형 메뉴는 유지하고 앱에는 메뉴·요청이 없다.
- ① 지도 연결: 같은 공통 포트가 교체된 정본 조회기와 새 프로젝트 상태를 읽으며,
  pending 단계에는 옛 객체를 조회하지 않고 빈 교체 자료를 반영함을 확인했다.
  프레임당 한 번 자원 갱신과 편집 전용 연결 분리 검사도 유지했다.
- ③ 입력·선택: 터치 release는 한 번만 선택하고 늦은 합성 click은 무시한다.
  revision 변경/dispose 뒤 release는 선택하지 않으며 재연결은 입력 한 벌만 설치한다.
  이미지/드래프트/오버레이 우선순위, 50ms hover 예약, 비동기 취소/카메라·프로젝트
  세대 변경/예상 밖 오류 진단도 집중 확인했다.
- ④ 플랫폼 계약: 실제 파일 컨트롤러+createNativeStorage+Core/GPKG를 연결해
  Windows 경로와 Android content URI의 저장/재열기, 중복 저장 억제, 읽기·쓰기 취소와
  전송 실패에서 원문/dirty 보존을 확인했다. 브라우저 취소는 인코딩 전에 끝나며
  성공 시 write→close→저장 확인 순서를 지킨다.

필수 파일 접근 메서드가 빠져도 생성 시 받아들이던 결함을 실패 재현하고 기존
file-controller 생성 경계에 7줄을 추가했다. 모든 제품에 openProjectFile,
editor에 openGisFiles/prepareProjectSave/saveExportFile을 요구한다.
bind/dispose는 계속 선택적이며 제공되면 함수여야 한다. 공개 API·저장 형식·플랫폼
추상화·중복 컨트롤러·구형 포맷 호환 코드는 추가하지 않았다.

기존 테스트의 실제 실패도 수정했다. viewing-ui-contract의 폐기된 ui/fragments 필터와
file-menu-routes의 사라진 editor.html 참조는 현행 source root/생성 HTML로 바꿨고,
원래 메뉴와 제품별 기능 차이 assertions는 보존했다. 작은 core-selection fixture의
세 timeline 배열은 entityId 대신 현행 objectRef를 사용한다. 실제 Core 선택의 원래
30개 snapshot 비교도 그대로 통과했다. 첫 세 단계의 제품 구현을 다시 추출하지 않았다.

### 이번 검증과 제한

- 메뉴·capability·공통 구성·입력·플랫폼 경계·async hover·Core 선택·파일/메뉴·
  네이티브 전송·startup 포트의 14개 집중 파일: 93개 통과, 실패/skip 0.
- shared-map-composition 브라우저: WebGL/Canvas × 마우스/터치 4개 통과(3.8분).
  각 경우 Viewer와 앱 웹셸에서 메뉴/이동/겹침 선택을 확인했다. WebGL 마우스에서는
  시점 이동 카메라 유지와 앱 편집·Undo/Redo·SQLite 저장/재열기도 확인했다.
  pageerror가 없고 앱의 지형 요청도 없었다.
- 변경 JS/MJS ESLint, 선택 파일 git diff --check 통과.
- 독립 읽기 전용 코드 검토: 수정이 필요한 발견 사항 없음.
- 선행 아이콘·설치 WIP 79개 파일의 시작/종료 SHA-256 동일. 자료·WASM 핀 변경 없음.

네이티브 계약 검사에서 Core/GPKG와 native-storage JS는 실제 구현이고 IPC만 메모리
대역이다. Windows/Android 바이너리·OS picker·실기기 동등성은 입증하지 않는다.
앞서 차단된 광범위 검사/CI 목록 명령은 재시도하지 않았다. 전체 검사·GIS 생성·
네이티브 재빌드·설치·앱 푸시·main 통합·배포는 수행하지 않았다.

### 저장공간·정리

준비된 기존 자료 핀 캐시와 preview/build snapshot을 재사용해 메모리에서 제공했다.
자동 자료 준비·Git 재압축·세계지도 복사·새 빌드 폴더 생성은 없었다.
제품 코드 +451바이트(3,616→4,067), 관련 테스트 +9,889바이트(58,823→68,712),
아키텍처 문서 +310바이트(5,276→5,586)이며 작은 합성 자료만 사용했다.

작업 전용 서버 PID 8664는 명령행을 재확인 후 종료했다. 소비 종료·절대경로·파일과
부모가 링크가 아님을 확인하고 임시 파일 5개, 논리 26,098바이트를 삭제했다:
C:/Users/taeeu/.codex/tmp/의 pando-shared-map-followup-baseline.json(11,883),
pando-shared-map-followup-progress.md(2,799), pando-shared-map-followup-server.mjs(2,215),
pando-shared-map-followup-unit.log(9,156), D:/dev/worktrees/ui/test-results/.last-run.json(45).
삭제 차단/실패 0개. C 논리 26,053바이트와 D 논리 45바이트다.
D 여유는 시작 57,111,564,288→정리 직후 57,098,715,136바이트이며 관측 차이
-12,849,152바이트는 공유 드라이브 전체 변화로 개별 정리 회수량과 구분한다.
대형 생성물은 남기지 않았다. 이전 Git 재압축 복구 기록은 범위 밖으로 보존했다.

최초 보고서 접근/게시 시 다른 GIS 이력 정리 프로세스 PID 22296이 공유 잠금을
소유하고 있어 정상 잠금 오류로 중단됐다. 다른 작업의 lock/프로세스는 건드리지 않았다.
게시 재시도용 이 단락만 임시 보존하며, 원격 확인 후 삭제한다.
최종 게시 성공 여부와 라이브러리 SHA는 완료 응답에 기록한다.


## 모든 브랜치 main 통합·재전파·공개 배포 완료

이 절이 현재 완료 상태다. 앞선 절의 로컬 전용/게시 대기/유지보수 상태는 각 실행 당시의
기록이며, 이번 통합 결과와 구분한다. 사용자가 선택한 범위는 커밋된 변경만 통합하고
로컬·원격을 함께 동기화하는 것이다. UI의 아이콘·설치 WIP 79개 파일은 제외했다.

### 실행 직전 상태와 통합 판정

계획 이후 다른 완료 작업이 라이브러리 이력을 정리하고 5개 브랜치의 핀을 모두
`893176014602bd95e83112c4dcc3f5f7822f68f4`로 재고정했다. 새 핀의 GitHub 원격 commit
접근을 확인하고 이 변경을 보존했다. 폐기된 옛 핀이나 자료 이력으로 되돌리지 않았다.

통합 전 main은 764048c8f, UI는 8a1d20b4f, GIS는 ff6518e03,
objects는 7daaa5455, places는 0ce14dda2였다. 기존 6개 작업 커밋에 더해 완료된
재고정/이력 정리 커밋도 보존하도록 GIS→UI→objects→places 순으로 main에 병합했다.
각각 ed2fef2ca, 119846fac, 1215fee2e, 7b08f5ba6 병합 커밋이다.
파일 충돌은 없었으며 도구/테스트 자동 병합 내용을 별도로 확인했다.

- GIS의 명시적 보고서 retirement·원격 부재 확인과 UI의 hydrateReports compact:false
  및 관련 회귀 검사를 모두 유지했다.
- apps/editor/frontend, apps/viewer, shared/frontend 및 공통 브라우저 검사 파일은
  검토한 UI tip과 바이트가 동일하다.
- 모든 통합 전 branch HEAD가 최종 main의 조상임을 확인했다. 소스/fixture의
  불필요한 전체 복사·새 작업공간·stash/reset/clean/강제 push는 없었다.
- 독립 읽기 전용 검토에서 통합으로 생긴 수정 필요 사항은 발견되지 않았다.

### 브랜치와 핀 확인

main과 work/ui, work/gis, work/objects, work/places 모두 로컬·원격 SHA가
`7b08f5ba6306fe13d4555018ba5ee88395cf6fc8`이다. 네 상설 브랜치는 최종 main으로
fast-forward한 뒤 5개 ref를 한 번의 atomic push로 반영했다. 각 워크트리의
핀·실제 assets/data 마운트는 해당 owner의 완성된 8931760 캐시를 유지한다.
따라서 추가 자료 준비·대형 복사·Git 재압축은 필요하지 않았다.
UI WIP 79개 파일은 통합 전/재전파 후 SHA-256 동일을 확인했고 다른 워크트리는 깨끗하다.

### 집중 검사와 공개 확인

- 통합 main에서 메뉴·지도 구성·입력·선택·파일 계약·실제 Core/GPKG·보고서 게시/
  retirement/경로·작은 이력 정리 fixture·USSR 보고서 영수증의 113개 집중 검사 통과.
- 통합 main의 작은 2객체 fixture 브라우저 4개 통과(3.8분): WebGL/Canvas × 마우스/터치,
  각 경우 웹과 앱 웹셸을 확인했다. 메뉴/시점 이동/편집·Undo/Redo/저장·재열기 포함.
- 변경 범위 lint와 git diff --check 통과. 전체 검사·실제 GIS 재생성·네이티브 재빌드/
  설치 패키지 생성은 수행하지 않았다.
- Pages [실행 40649318412](https://github.com/kimjeon-il/Pando/actions/runs/40649318412)의
  build/deploy가 성공했다. 아티팩트 12799161692의 증거 ZIP(89,810바이트)은
  SHA-256 ea3620c2a58183b8e39fdb45d286e751f3ccaece077027819b1f5243336455c6과 일치했다.
  207,622,058바이트 사이트 패키지는 다운로드하지 않았다.
- 별도 최신 공개 요청으로 verify-pages-deployment를 실행해 코드 7b08f5ba6,
  자료 8931760 및 선택 자산 10개의 전송 해시를 확인했다. 자료 전체 의미 검사는 아니다.
- 실제 공개 웹에서 기본 지도 로딩, 빈 분포 메뉴 숨김, 객체 표시 off/on 뒤 메뉴 유지와
  표시 복원, 지도 drag 이동, 겹침 후보 목록의 프랑스 선택 및 파란 선택 경계를 확인했다.
  해당 탭의 error 로그는 빈 배열이었다.

첨부 정본: [배포 증거](pages-evidence-7b08f5ba6.json) 537,266바이트,
[최신 공개 전송 확인](pages-live-check-7b08f5ba6.json) 147바이트,
[공개 프랑스 선택 화면](live-main-7b08f5ba6.png) 118,125바이트.
3개 합계 655,538바이트이며 배포 identity/전송/실제 선택 증거로 보존한다.

### 별도 CI의 남은 상태

Pages와 집중 검사가 통과했다고 전체 CI 통과로 표시하지 않는다.
C++ [실행 40649318396](https://github.com/kimjeon-il/Pando/actions/runs/40649318396)은
9개 native contract 중 아래 5개 assertion에서 실패했다.

| 검사 | 실패 지점 |
|---|---|
| document_session_tests | document-session-tests.cpp:170, seed 재인코딩 동일성 |
| web_content_codec_tests | web-content-codec-tests.cpp:50, DTO 재인코딩 동일성 |
| web_content_command_tests | web-content-command-tests.cpp:144, raw annotation 존재/내용 |
| web_territorial_command_tests | web-territorial-command-tests.cpp:177, geometry 월 분할 |
| web_object_command_tests | web-object-command-tests.cpp:54, INVALID_DATE: format |

직전 C++ [실행 40586690980](https://github.com/kimjeon-il/Pando/actions/runs/40586690980)도
같은 5개 지점과 메시지로 실패했다. 이번 main 통합은 shared/core·shared/tests·
테스트 fixture·shared-core workflow를 변경하지 않았다. 이 오류를 숨기기 위해
검사를 삭제/완화하거나 C++를 범위 밖 수정하지 않았다.
Application Architecture 실행 40649318399는 완료 상태 cancelled였다.
취소 원인은 추정하지 않았고 전체 검사를 별도로 재실행하지 않았다.

### 출력 정리와 공간

작업 전용 서버 PID 11380의 명령행/소비 종료를 확인하고 중지했다. 이후 아래 9개
임시 출력을 절대경로·일반 파일·부모 링크 아님을 확인하고 삭제했다. 삭제 차단/실패는 없다.

| 임시 출력 | 논리 바이트 |
|---|---:|
| C tmp pando-all-branch-integration-baseline.json | 12,625 |
| C tmp pando-all-branch-integration-progress.md | 2,594 |
| C tmp pando-all-branch-integration-unit.log | 11,189 |
| C tmp pando-all-branch-integration-server.mjs | 1,944 |
| C tmp pando-all-branch-core-ci-failure.log | 24,732 |
| C tmp pando-all-branch-pages-live-check.json | 147 |
| C tmp pando-all-branch-pages-evidence.json | 537,266 |
| C tmp pando-all-branch-pages-evidence.zip | 89,810 |
| D:/dev/PandoLab/test-results/.last-run.json | 45 |
| 합계 | 680,352 |

C tmp는 C:/Users/taeeu/.codex/tmp/다. 증거 JSON은 보고서 정본과 해시 동일을 확인한 뒤
임시 사본을 정리했다. 이전 게시 대기 문서 5,743바이트는 보고서에 합쳤으며,
원격 보관 확인 직후 삭제한다. 기록 시점까지의 삭제 논리는 C 680,307+D 45바이트다.
D 여유는 시작 53,792,088,064→정리 직후 53,787,471,872바이트였다.
관측 변화 -4,616,192바이트는 공유 드라이브 변화로 개별 삭제 회수량과 구분한다.
신규 대형 생성물은 없다. 활성 핀/마운트의 기존 캐시와 SDK·증분 캐시는 유지했다.

이번 갱신도 이 보고서 범위만 publish-reports/check-reports로 보관하며,
원격 검증 SHA는 작업 완료 응답에 기록한다.
