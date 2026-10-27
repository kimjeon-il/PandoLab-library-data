# 플랫폼 공통 코드 통합 — 실행 기록

기준 코드: c61e6e84fc06beadb9bba739a091bb5bbaa6bbe2, work/ui. 자료 핀 f79836c5509fce8053a81421b02798dc7bfb4f8b와 기존 마운트를 유지한다. 초기 tracked/untracked 변경 없음. D 여유 57,910,288,384바이트.

승인 범위: 지도 연결 → 파일 I/O → 라이브러리 주입 → 시작 설정. 단계별 집중 검증·커밋·푸시. Windows 및 Android 실기기 검증 후에만 main 통합·브랜치 전파·Pages 배포. EXE/APK 출시 패키지, 전체 GIS, 전체 검사 제외.

## 진행

- [x] 1. 공통 지도 소유자 연결 계약·검증 및 실제 웹/앱 연결
- [x] 2. 브라우저/네이티브 파일 포트와 저장 목적지 준비
- [x] 3. 라이브러리 접근 주입·작은 테스트 자료
- [x] 4. 공통 시작 설정·생명주기
- [x] 집중 브라우저·실기기 검증 및 독립 검토
- [x] 검증 커밋 main 통합·브랜치 전파·Pages 실제 응답 검증
- 보고서 선택 범위 게시·원격 확인: 최종 본문 후 완료 명령 실행, 검증된 커밋은 완료 응답에 기록
- [ ] 임시 출력 정리: 자동 승인 검토의 삭제 차단으로 C 드라이브 146,289,987바이트 잔여

## 사전 인터페이스 검토

1→4: 공통 지도 소유자의 필수 포트와 불변 지원 정보는 시작 설정에서 제공한다. 가변 프로젝트·선택·자료 상태는 기존 소유자에 남긴다.

2→4: 브라우저 파일 선택기는 사용자 클릭에서 인코딩 전에 호출한다. 준비된 write/abort 포트를 시작 시 주입하며 Rust 전송 명령은 유지한다.

3→4: 라이브러리 조회/편집 포트를 플랫폼 경계에서 구성한다. UI는 Tauri 전역을 탐지하지 않는다. revision과 원격 승인 검증은 기존 소유자가 유지한다.

Ruling: 승인한 대화 계획을 명세로 사용하며 별도 계획 파일·작업공간을 만들지 않는다. 외부 기존 통합 보고서 범위의 이 파일을 실행 원장으로 쓴다.

Ruling: 지도 객체의 초기화 의존성이 서로 달라 모든 connect를 한 번에 강제 실행하지 않는다. 공통 포트 계약·선택·필수 검증은 공유하며 기존 생성/연결/초기화 순서를 보존한다. 제품 진입점은 제품별 값 어댑터만 제공한다.

## 1단계 검증

공통 소유자 17개의 허용/필수 포트 목록을 한 곳으로 이동했다. 웹·앱의 기존 연결 순서와 편집 전용 연결은 보존한다. 실제 picking 조회, 필수 scope 누락, 중복 연결을 검증했다. 브라우저에서 eager getter 읽기와 연결 후 추가되는 countries 포트의 가시성 문제를 각각 재현하고 회귀를 추가해 수정했다. 공통/앱 조립·capability 검사 20개 통과, Viewer 실제 프로젝트 교체·데스크톱/모바일 빈 메뉴·문서 불변성 1개 통과. 증거 platform-map-browser.json. 첫 실패는 platform-map-browser-red.json에 보존한다.

## 2단계 검증

브라우저 어댑터가 입력·취소 이벤트, 파일 선택기, 다운로드 URL 및 스트림 중단을 소유한다. 공통 파일 컨트롤러는 필수 주입 포트를 사용하고 prepareProjectSave를 인코딩보다 먼저 호출한다. 네이티브는 기존 청크 명령을 사용하고 File/저장 영수증을 경계에서 정규화한다. 저장 전 인코딩 실패의 prepare/abort 누락을 RED로 확인한 후 수정했다. native 전송/취소/256MiB 상한/URI 및 파일 컨트롤러 관련 집중 검사 통과. 실제 Viewer에서 저장 파일 열기·잘못된 파일·취소·늦은 읽기와 앱 모바일 Canvas 시작/지형 요청 없음 2개 통과(platform-files-browser.json). Rust·WASM 재빌드 없음. 실기기 저장/재열기 증거로 대체하지 않는다.

## 3단계 검증

UI 조립부의 Tauri 탐지·저장소 선택을 없앴다. 앱 조립 진입점이 조회 포트를 구성하며 네이티브 실행기가 명시적인 invoke를 가진 지연 저장소 팩토리를 제공한다. 형상 편집과 자료실은 같은 저장소를 사용한다. 지원하지 않는 Android에 Windows 저장소 편집을 허용하지 않는다. HTTP/네이티브의 기존 조회·승인·동기화 실패 시 로컬 보존 규칙을 유지했다. 실제 전체 index 및 KOR gzip을 읽던 repository 테스트를 작은 정본 계약의 합성 정치체로 교체했다. 해당 신규 접근 함수 미구현 RED 확인 후 라이브러리·조립 검사 27개 통과. 실제 앱 자료실에서 승인된 소련 5객체 가져오기와 1922년 카스피해 표시 1개 통과(platform-library-browser.json). 첫 실행은 타 작업의 살아 있는 라이브러리 잠금으로 시작하지 못했으며 잠금을 건드리지 않고 해제 후 재실행했다.

## 4단계 검증

생성된 불변 빌드 영수증과 자산 URL 규칙을 runtime-context에서 공유한다. 제품 조립부가 자료 소유자에 명시적으로 전달하며 라이브러리·프로젝트 상태는 각 기존 소유자에 남긴다. 시작 Promise를 하나로 통합하고 비동기 ready hook 완료와 폐기 여부를 확인한 후에만 ready를 게시한다. 프로젝트 미리보기 Worker URL은 플랫폼 자산 경계에서 주입한다.

미리보기 테스트가 구형 배포 URL fixture로 대기하는 문제를 재현했으며, 해당 소유 테스트 프로세스만 종료하고 명시적 Worker URL의 작은 fixture로 수정했다. 이후 미리보기·저장·생명주기·조립 집중 검사 81개, 별도 시작·지원 정보 검사 18개가 통과했다. 검증용 작은 지도의 구형 schema2 표기를 현재 ObjectRef 계약으로 갱신했고 실제 Core Worker 로딩을 확인했다. 원본 GIS는 수정하지 않았다. 최종 실제 staging 2개, 변경 JS/MJS eslint, git diff --check 통과.

플랫폼 공통 브라우저 검증 9개 통과(platform-final-browser.json). 프로젝트 저장/일시 보기, 모바일 Canvas, picking, Viewer hover/카메라, 메뉴/교체, GeoPackage 열기/취소/늦은 응답, 날짜 제어/실패/최신 요청, 실제 라이브러리 가져오기를 포함한다. 마지막 Worker 주입 후 앱 저장/미리보기 경로 1개를 다시 실행해 통과했다(platform-preview-browser.json). 이 결과는 실기기 증거가 아니다.

Android SM-S906N이 연결·ADB 승인 상태로 확인되었다. 네이티브 실기기 검증은 아래에 별도로 기록한다. 로컬 Rust/WASM 재빌드, 출시 패키지 생성, 전체 검사·GIS 생성 없음.

## 실기기 검증과 후속 수정

Windows 개발 실행기는 CI 40498060480에서 받아 네이티브 입력 2596d458378169db5e51d5756fc3d7d6ce0c7fe4e722186f598c6b4cdbeafd50과 실행파일 SHA-256 53bc5ce9c7ba2bedde1f7b1ac19a12fab941e02541a5c0bcfff81a7407b643ba를 확인했다. C 드라이브의 검증 전용 WebView 프로필을 실제 프로세스 인자에서 확인한 후 사용했다. 로컬 컴파일 없음.

실제 실행 전 planner가 현행 waterbody-caspian.json.gz를 state-* 제한으로 거부하는 오류를 재현했다. 작은 fixture RED 후 현행 state|waterbody 파일만 허용하도록 수정했다. 경로 탈출·원격 경로·query 거부와 무결성 검사는 유지했다. Android는 기존 4175 서버를 재사용할 때 signal listener만 남아 Node가 조기 종료하는 오류도 재현했다. 기존 실행기에 명시적 종료 대기를 넣고 종료 시 timer/listener를 제거했다. 두 범위 집중 검사 6개·eslint·diff 검사 통과. 독립 검토에서 차단사항 없음.

Windows에서 작은 현재 스키마 3객체의 이름 수정, UI Undo/Redo, 실제 OS 저장, 실제 OS 열기를 확인했다. 65,536바이트 GeoPackage의 SQLite header·SHA-256·형상·정치체·기간 기록 일치·dirty=false를 확인했다. begin/append/finish write와 begin/read chunk를 실제 호출했다. 창 제어 플러그인이 대상 대신 Codex 화면을 반환해 입력을 중단하고 사용자가 OS 대화상자를 선택했다. 초기 대기 시간 초과는 성공으로 처리하지 않았으며 같은 실제 세션의 완료 저장 영수증과 실제 재열기로 최종 확인했다. 증거 platform-native-windows.json/png.

Android 개발 실행기는 CI 40498060435, 네이티브 입력 befff65f02aebb852868a80f48ed2c6ec4fae2fef9fac4f6766044210cb1ce57, APK SHA-256 77919a533ba409e009945384dfdc0bb16f7a17e06eb20b008759d18e87cd34a1이다. 기존 서명 인증서 일치 확인 후 데이터 보존 업데이트를 사용했다. 이름 수정·UI Undo/Redo는 통과했으나 저장창에서 renderer가 시스템에 종료됐다. 두 번째는 자동 UI 탐색 없이도 동일했다. lmkd 기록은 renderer RSS 1,272,120KiB, oom_score_adj=701, low watermark와 swap 부족을 명시한다. 사용자가 다른 앱을 닫은 뒤 재확인 중이며 저장/재열기 통과를 아직 주장하지 않는다.

네이티브 prepareProjectSave는 한 번 사용하는 write/abort 계약이며, 기존 Rust finish_document_write의 OS 대화상자 순서는 유지한다. 브라우저는 사용자 활성화를 위해 선택기를 인코딩 전에 호출한다.

P1 및 P3의 80bed7391 CI는 성공했다. P2 40498015664는 저장소 전용 PANDOLAB_LIBRARY_WRITE_TOKEN Actions secret이 비어 P2_LIBRARY_WRITE_TOKEN_REQUIRED에서 중단됐다. 권한 검사를 약화하거나 다른 자격증명을 복사하지 않았다. 전체 변경범위 검사 목록 생성 명령은 CHECK-BUDGET hook이 광범위 검사로 거부했으며 실행되지 않았다. 해당 명령을 우회하지 않고 위 파일/시나리오 집중 검사만 수행했다.

Android 재확인: 사용자가 다른 앱을 닫은 후 현재 개발 실행기를 재사용했다. 실제 이름 변경·UI Undo/Redo·OS 저장·OS 열기가 통과했다. 65,536바이트 GeoPackage SHA-256 fc21fd03f0f0802ecbe15ecbca7b6ebe97d2ac969992113db44a187895652d7a, SQLite header, 형상·정치체·기간 기록 일치를 확인했다. native write/read 청크 호출을 확인했다(platform-native-android.json/png). Android 파일 대화상자 선택은 사용자 수동으로 수행했다. 저메모리 강제 종료 위험은 별도 한계로 남기며, 메모리가 부족한 상태에서 저장이 안전함을 주장하지 않는다. native console에는 기존 inline event handler CSP 거부 경고도 남아 있다. 보호를 완화하지 않았으며 이번 저장/재열기 결과와 별도로 기록한다.

최종 네이티브 입력·실행파일/APK 해시는 JS 수정 후에도 같았다. P1 40500380146와 P3 40500380482는 최종 3d95849d2에서 성공했다. 앱 main을 c61e6e84f에서 검증한 작업 커밋 5개가 포함된 3d95849d2로 fast-forward하고 푸시했다. 자료 핀은 f79836c5509fce8053a81421b02798dc7bfb4f8b 그대로다. 별도 자료 재생성·재게시 없이 Pages의 실제 staging·전송 무결성 검사를 실행한다. P2 누락 자격증명 문제는 해결됐다고 주장하지 않는다.

## 배포·최종 상태

3d95849d2 Pages 40500970813이 성공했고 공개 코드·자료의 실제 전송 파일 10개가 일치했다. 공개 Viewer에서 실제 254개 객체, 2026-10 자동 월, hover/click/zoom 후 pageerror 없음도 확인했다. 처음 공개 확인기는 앱용 readiness를 기다려 시간 초과됐으며, Viewer의 실제 준비 계약으로 수정해 재확인했다(platform-live-web.json/png, platform-pages-live.json, platform-pages-evidence.json).

main의 Application Architecture 40500970728에서 새 startup 메타데이터 seed의 중첩 URL을 shell/modules로 잘못 해석하는 선택기 오류가 드러났다. 실제 startup 원문을 작은 의존 fixture에 넣어 동일 오류를 RED로 재현했다. startup의 기존과 같은 URL을 직접 import.meta.url 기준으로 표현해 해결했고, shell/Node/verification 경로 회귀 4개, 실제 staging 1개와 eslint·diff 검사가 통과했다. 검사기나 누락 의존성 보호는 약화하지 않았다. 독립 검토에서 차단사항 없음. 보완 커밋 e11111ff2를 work/ui에 남기고 main과 모든 상설 브랜치에 다시 전파했다. native 파일 프로토콜과 해석되는 자산 URL은 앞선 실기기 검증과 동일하다.

이번 커밋: dc6807412, 8d45f26c5, 86b26de9e, 80bed7391, 3d95849d2, e11111ff2. 기존 GIS 4개 커밋을 main에 임의 혼입하지 않고 각 GIS 병합의 선조로 보존했다. branch-specific 자료 핀 변경 없음. 전역 Git 작성자 설정이 실행 도중 사라져 보완 커밋 첫 시도는 실패했다. 바로 앞 작업 커밋의 기존 작성자 이름/메일을 해당 Git 명령에만 지정해 커밋했고 전역 설정은 바꾸지 않았다.

정리: 검증용 네이티브 프로세스·개발 서버·ADB reverse/forward를 종료했다. 준비 완료한 Windows/Android 네이티브 개발 캐시 74,276,657바이트는 현재 ui의 검증된 native-artifacts 포인터와 다음 개발 실행기가 소비하므로 보존한다. 새 설치 출시 패키지나 로컬 Rust/WASM 빌드는 없다.

C 드라이브의 테스트 WebView 프로필·결과 복사본·임시 실행 스크립트·합성 프로젝트·Pages evidence 복사본은 총 146,289,987 논리 바이트다. 절대경로와 링크 없음·실행 소비자 종료를 확인하고 제거를 시도했지만 자동 승인 검토가 blocked by policy로 차단했다. 명령 전체가 실행되지 않아 삭제량은 0이며, 다른 도구로 우회하지 않았다. 세부 거부 사유는 제공되지 않았다. 해당 파일은 향후 필요해서 보관하는 것이 아니라 삭제 차단 잔여물이다. 보관할 고유 JSON/스크린샷/배포 manifest는 이 보고서 범위에 해시 일치를 확인해 모았다. Android 검증 산출물도 장치에 남아 있으며 과거 10월25일 파일은 이번 정리 대상으로 잡지 않았다.

D 여유: 시작 57,910,288,384바이트, 정리 전 최종 관측 57,762,136,064바이트. 관측 감소는 148,152,320바이트이며 다른 채팅의 활동을 포함하므로 모두 이번 작업에 귀속하지 않는다. 이번 작업에서 직접 확인된 큰 추가물은 위 재사용 개발 실행기 70.84MiB이다. 삭제 성공량 0, 차단된 임시 출력은 C 드라이브에 있다.


최종 Pages 40502218615: build/deploy 및 공개 전송 해시 검사 성공. 공개 sourceCommit=e11111ff20c3c58d5b0e830ffbfb4ff53cbc9343, dataCommit=f79836c5509fce8053a81421b02798dc7bfb4f8b, 실제 전송 파일 10개 확인(platform-final-pages/). 공개 Viewer 재확인에서도 준비 완료, 254개 객체, 포인터 이동·클릭·확대 후 pageErrors=[]였다(platform-live-final.json/png). 네이티브 입력 해시는 최종 소스에서도 이전 실기기 검증과 같으며 두 URL 표현이 http 개발·https 네이티브 origin에서 동일함을 확인했다.

최종 원격 브랜치: main/ui/objects/places=e11111ff20c3c58d5b0e830ffbfb4ff53cbc9343, gis=d58586a40c5ac5b7efb5a2d7827be60abd844821. GIS의 기존 773779f85 이력이 선조로 유지된다. 모든 상설 워크트리 clean. main Application Architecture 40502218470은 경로 검사 목록 생성에 성공했으며, 후속 자동 검사는 이 기록 시점에 진행 중이다. 로컬 전체 검사를 대신 돌리지 않았다.

최종 D 여유 관측 57,759,342,592바이트(약 53.79GiB). 시작 대비 감소 150,945,792바이트로 동시 작업 영향을 포함한다. 이 보고서 범위의 총 파일은 22개, 약 3.41MB다. 보고서 원문·스크린샷·JSON은 라이브러리의 독립적인 보고서 보관 명령으로 게시하며 runtime 자료 핀은 바꾸지 않는다. 출시 EXE/APK 생성, 전체 GIS 재생성·전체 로컬 테스트 없음.

## 보고서 게시 중 발견된 자동 재압축 충돌 보완

첫 publish-reports 명령은 선택한 보고서를 쓰기 전에 withCheckoutLock의 자동 compactDuplicatePacks가 실행돼 중단됐다. 다른 작업의 refs/HEAD/작업 상태가 바뀌었다는 보호 검사에서 멈췄으며, 기존 객체는 보호됐다. 잠금이나 보호 검사를 제거하지 않았다. 보고서 publication/check에만 compact:false를 전달해 독립적인 pack maintenance를 호출하지 않도록 수정했다. runtime preparation과 prefetch의 기존 중복 pack 정리는 유지한다. 처음 넓게 제거했던 시도는 기존 중복 제거 회귀에서 실패했고, 해당 동작을 복원한 뒤 모두 재확인했다.

작은 fixture에서 별도 maintenance journal을 그대로 보존하며 보고서만 원격 보관하고 runtime pin을 유지하는 RED/GREEN을 확인했다. 기존 게시·실패 재시도·잠금·미완성 타 범위 보호·원격 원문 검증·report-only 원격 main 채택 검사 6개가 통과했다. 최종 보고서 journal·runtime 중복 제거·선택 blob prefetch 3개도 통과했다. eslint·diff 검사와 독립 검토 통과. 503a2145c를 work/ui/main 및 다른 상설 브랜치에 반영했다. 이 보완은 보고서 작업 도구이며, 앞서 실기기로 확인한 런타임 코드·네이티브 입력·자료 핀은 바꾸지 않는다.

最終 완료 기록: Pages 40504372438의 sourceCommit=503a2145c42401be6a8b0b66f998b2a8ee43e7cc와 dataCommit=f79836c5509fce8053a81421b02798dc7bfb4f8b, 실제 전송 파일 10개 일치를 확인했다(platform-pages-503a2145c/). 공개 Viewer를 새 세션으로 열어 254개 객체와 errors=[]를 다시 확인했다(platform-live-503a2145c.json). main/ui/objects/places는 503a2145c, GIS는 동시 작업의 추가 이력도 보존한 5b2416b17이다. 최종 소스의 Architecture 검사 목록 생성은 통과했으며 후속 자동 검사는 이 기록 시점 진행 중이다.

이번 보완까지 작업 커밋 총 7개를 보존·푸시했다. P2 쓰기 토큰 누락, Android 저메모리 renderer 종료 위험, 기존 네이티브 inline-handler CSP 경고, C 임시 출력 삭제 정책 차단은 남은 문제다. 앱 기능의 실기기 저장·재열기 성공과 이 한계를 구별한다. 최종 D 여유 관측 57,555,025,920바이트(약 53.60GiB), 시작 대비 -355,262,464바이트로 동시 작업 영향을 포함한다. 고유 자료·학습 환경·진행 작업 삭제 없음. 이 최종 보고서를 선택 scope의 publish-reports와 fresh check-reports로 보관·원격 확인한다.
