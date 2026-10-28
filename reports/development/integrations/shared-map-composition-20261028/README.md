# 웹·앱 공통 지도 구성 통합

> 보고서 ID: `DEV-SHARED-MAP-20261028` · 상태: `implementation-verified` · 배포: `not-deployed` · 색인일: 2026-10-28
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
