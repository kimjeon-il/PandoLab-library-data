# 라이브러리 조사·보고서·학습 자료 주제별 재배치

> ID: DEV-LIBRARY-ORGANIZATION-20261025 · 작성일: 2026-10-25 · 상태: focused-verified / library-published / source-worktree-applied

공개 재배치 커밋: 6fcdf285c228a8fbd9b585e9917eb633807ac13b. 앱 main 통합·배포·네이티브 빌드는 수행하지 않았다.

## 구조와 범위

reports/의 14개 상위 분류를 borders / hydro / places / terrain / map-analysis / development의 6개 주제로 통합했다. 루트와 주제 안내는 한글이며 원문 ID·작성일·검증 범위를 유지한다. 국경은 history·reconstruction·data·validation, 수계는 names·calibration·connectivity·releases, 지도 분석은 corpus·models·reports, 개발은 ui·rendering·performance·ci·integrations·releases·storage·native로 구분한다. 시아첸 자료는 국경 조사에 함께 두고 지형 색인에서 연결한다. 런타임·지형 배포·GIS 원자료 마운트·내부 Git/캐시 경로는 유지했다.

실제 조사 파일 4102개 중 3896개 경로를 이동했다. 브랜치별 미보관 편집본 249개도 소유자별로 이동했다. [공개 전체 대응표](mapping.json)와 공개 이동 결과(result.json)를 보관한다. 비공개 대응표·각 판본 revision·원문 대조 결과는 공유 라이브러리 private-evidence/report-organization에만 보관한다.

## 보존과 도구

물리 파일 3994개의 원문 해시가 같고 108개는 링크·경로 메타데이터 수정 대상으로 별도 기록했다. 모델·이미지·동결 JSON·원자료는 Git blob OID와 보관 SHA를 대조했다. 공개 자료 및 4개 비공개 판본의 전체 비보고서 tree·index 항목을 비교했고 불일치 0건이다. 5개 자료 핀과 비공개 런타임 체크아웃, 미보관 편집본을 보존했다. main 체크아웃의 보고서 커밋 이동은 의도된 변경이다.

검토에서 압축 원문과 요약본의 SHA 혼입을 발견해 생성 코드를 수정했다. 이미 생성된 비공개 판본의 색인 733개 항목은 원문 바이트를 바꾸지 않고 실제 원문의 SHA·길이로 수정했다. 해당 로컬 수정 커밋은 고정 refs/pando/reports/<owner>로 보호하며 푸시하지 않았다. 재대조 불일치 0건이다.

기존 tools/library-data.mjs에 --organize-reports(목록/충돌/공간 미리보기), --apply(잠금/기록된 단계 재개/이동/검증/공개 커밋·푸시)를 추가했다. 실행 중 작업·충돌·미분류·링크를 거부하고 실제 writer의 출력 경로와 읽기용 입력 경로를 구분했다. 부분 중단은 기록에서 재개했다. 정상 반복 실행은 이동·커밋을 추가하지 않는다.

새 소유자는 독립 보고서 main 메타데이터로 초기화한다. 런타임 준비·저장은 보고서 revision을 되돌리지 않고, 선택 보관은 실제 처리한 파일만 판본에 반영한다. Node/Python helper와 현재 생성기·플러그인·CI·작성 규칙을 기존 5개 작업공간에 적용했다. 예전 경로 별칭은 제거하고 과거 로그·commit 고정 URL은 보존했다. CI 보관은 논리 보고서 경로를 지정하며 artifact 업로드는 분기별 읽기 경로를 명시적으로 해석한다.

앱 소스는 다른 채팅의 미커밋 저장공간·학습 변경을 기반으로 한다. 불완전하거나 다른 작업이 섞인 앱 커밋을 만들지 않고 이번 변경만 [소스 패치](source-change.patch)에 보존했다. 5개 작업공간의 실제 변경도 유지한다.

## 검증

관련 Node 42개, Python 5개 통과. 재배치·충돌·잠금·중단/재개·반복 실행·푸시 실패·비공개 판본·압축 원문·fresh owner를 작은 Git fixture로 검증했다. 관련 ESLint, 5개 작업공간 git diff --check, 변경 workflow YAML 45벌 파싱 통과. Node/Python 실제 작성 경로가 같은 소유자 영역임을 확인했고 GitHub 플러그인으로 원격 6개 분류 README를 읽었다. 전체 테스트·GIS 재생성·네이티브 빌드는 실행하지 않았다.

## 공간과 완료 기록

전체 복사·압축 전체 복원·Git 재압축 없이 같은 드라이브 이동과 blob을 재사용했다. 최종 보고서 게시 전 동일 범위(.git/.pando-store/reports/archive index)의 하드링크 중복 제외 파일 크기는 5508239892 → 5516045077 bytes, 증가 7805185 bytes였다. 이 값은 실제 클러스터 할당량이 아니다. 할당량 조회는 Windows 실행 정책에 차단되어 우회하지 않았으며 allocatedBytes=null로 기록했다. 같은 측정 구간 D: 여유 33425190912 → 32981397504 bytes(동시 GIS 작업 포함). 재배치 apply 자체 구간은 33239498752 → 33122807808 bytes였다. 세부 수치는 [검증 기록](verification.json)에 둔다.

이 보고서·앞서 잠금으로 미게시된 완료 보고서·개발 색인만 선택해 보관·커밋·푸시 후 실제 원격 원문을 검사한다. 최종 게시 revision은 명령 결과와 완료 응답을 따른다. 작업 임시 비교본은 게시 후 제거하며, 소스·유일한 원문·보존 증거·활성 캐시는 유지한다.
