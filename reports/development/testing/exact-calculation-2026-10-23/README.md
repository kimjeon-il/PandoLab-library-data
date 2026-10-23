# 내부 계산 전수 정적 조사 및 결과 동일 최적화 — 2026-10-23

> 보고서 ID: DEV-EXACT-CALC-20261023 · 상태: deployed / focused-verification / CI-incomplete · 지도 반영: not-applicable (계산 변경)  
> 원문 최종 수정: 2026-10-23  
> 비교 기준: Web/App 3b5939a9c83d887ccab24ce8309c6b9f62e1cc9f / 자료 fa2de64ac125e768e9ce54137a07591be8d5f506  
> 최종 코드: 43a1f29d7be0a30b57462a10624343eaebbc5017 / 자료 71a67904db2beb933735727ad6c19adde082d2bd

## 범위와 조사 한계

기준 Git blob에서 2,276개 소스·빌드·템플릿을 한 번에 읽어 분류했다. 자체 코드 900개, 생성물·외부 코드·과거 fixture 550개, 검사 코드 826개다. Web/App, Rust/Kotlin, C++/WASM, Worker, GIS 생성기, 학습·평가 및 빌드·자료 준비를 포함한다. 모든 자체 파일의 정적 계산·탐색·복사·I/O 신호를 목록화했다. 모든 경로를 실제 프로파일링하거나 최적화했다는 뜻은 아니다. inventory-final.json의 reviewed는 정적 조사이며, candidate/equivalence difficult는 미반영이다. 생성물은 canonical owner를 기록했다.

## 최종 채택

- 국가 가져오기: 동일한 입력/union의 bounds를 비교마다 다시 순회하지 않고 첫 사용 때 계산한다. 저장 슬롯은 한 작업에만 존재한다. 빈 비교·같은 ID 건너뛰기, 국가 순서, 교차·차집합, 부동소수점 합산 순서, 최종 검증을 유지한다.
- 시간축 C++: 기존 normalizeTimelineRecords 검증 뒤 읽기 전용 행 인덱스를 만든다. 객체별 원래 행 순서와 첫 일치 규칙, catalog 순서, 속성 적용 순서, 검증 callback/예외를 유지한다. 결과 vector가 완성된 뒤 조상 조회를 인덱싱한다. 포인터는 해당 호출의 불변 스냅샷 안에서만 유효하다.
- 파서 재사용은 세 번 측정한 이득이 작고 일관되지 않아 제거했다. 최종 source-analysis.mjs는 기준과 같은 Git blob이다. 학습 텐서/파일 캐시, GPU 수학 변경, 도형 단순화, 정확도·검증 생략은 적용하지 않았다. 학습 가중치와 pending 상태를 변경하지 않았다.

## 변경량 및 저장 용량

계산 owner 두 파일은 +36/-13으로 23줄 순증했다. 반복 계산 제거를 위한 작업 단위 조회 인덱스가 추가됐다. 측정 도구 12,287B, 고정 과거 경계 fixture 346,182B, 새 Worker 버전 묶음 42파일/294,379B가 추가됐으며 WASM은 3,064,342B에서 3,069,894B로 5,552B 늘었다. 계산 속도 개선이며 코드 줄 수 또는 저장 용량 감소를 달성한 것은 아니다(change-size.json). 사용자가 변경량과 자료 증가를 지적하여 추가 CI 정리로 범위를 넓히는 작업은 중단했다. 기존 CI 문제를 우회하거나 제품 계약을 되돌리지 않았다.

## 실제 측정

Windows / Node v24.21.0 / AMD Ryzen 5 3500 6-Core Processor              . 같은 입력으로 warm-up 후 기준/후보 순서를 번갈아 10쌍 측정했다. 이전 P6/P9 고정 SHA 결과를 재사용하지 않았다. 각 쌍의 구조·직렬화 전체가 같다. 시간축 정상·오류 219개 비교, 입력 JSON 불변 및 geometry 저장소 예외 동일성 검사를 통과했다. 아래는 중앙값 ms이며 실제 브라우저 FPS 수치가 아니다.

| 입력 | 기준 ms | 후보 ms | 변화 |
|---|---:|---:|---:|
| timeline-16 | 9.58 | 9.70 | 1.2% |
| timeline-256 | 152.40 | 148.22 | -2.7% |
| timeline-2048 | 1406.61 | 1208.91 | -14.1% |
| import-id-replace | 99.42 | 21.10 | -78.8% |
| import-territory-replacement | 264.51 | 183.72 | -30.5% |

가져오기 타이밍 입력은 128개 기존 국가와 20,001 정점의 겹치지 않는 경계다. bounds 순회는 256회에서 129회로 줄었다. 중첩/삭제/나머지 보존은 별도 실제 geometry 테스트에서 검증했다. 시간축은 16/256/2048개 객체, 6개 연도 버전과 계층/속성 기록을 썼다. 16개에서 첫 관측 +1.19%(0.114ms)는 10쌍 추가 재측정에서 +0.034%(0.003ms)로 재현되지 않았다. 작은 입력의 개선을 주장하지 않는다. WASM 독립 선형 메모리 용량은 양쪽 모두 작은 입력 16,777,216B, 큰 입력 24,248,320B로 같았다. JS 임시 할당을 기록했다. 네이티브/GPU 최고 메모리, 실제 기기 FPS와 최대 객체 수는 측정하지 않았다. 최종 CI 산출물로 재측정한 revision a39beb2d와 최종 두 owner의 Git blob 및 WASM SHA가 같다는 근거는 performance-provenance.json에 있다. 초기 Windows 측정은 별도 원문으로만 남긴다.

## 검증

- 최종 자료 71a67904 및 CI canonical WASM에서 집중 Node/App 계약 137개 통과; 네이티브 document_session_tests / temporal_editing_tests 통과. CI의 native 9개 계약도 초기 ABI 확인 전 단계에서 통과한 원문을 보존한다.
- 최신 원래 recipe의 동독 자료 가져오기·원본·history·Undo/Redo, Web 날짜 rollover/수동 1953년, App editor의 날짜별 이름·geometry·잠금·확정된 Undo/Redo 브라우저 3개 검사 통과(browser-canonical-final.log). 이전 상세 경계의 roundoff 검사는 346,182B 압축 fixture로 고정해 보존했다. 현재 source r1 검사와 분리하여 자료 선택 변경으로 유효한 precision 회귀가 사라지지 않게 했다.
- 실제 최신 DDR 입력도 이전 코드/이전 WASM과 최적화 코드의 직렬화 결과 SHA-256 b594c967550a215057736b6f2c2533a04e789fe2a8a3419b2891d36a5d63e302가 같다(ddr-latest-baseline/candidate.json).
- ESLint, git diff --check, WASM source/ABI/hash 짝, 생성 metadata 검사 통과. 게시 staging/product/Worker 계약 최종 27통과/1skip(publication-canonical-final.log). Windows symlink 생성 권한에 따른 skip은 통과로 표기하지 않는다. 초기 CRLF fixture 비교 실패는 제품 변경 없이 테스트 줄바꿈만 정규화했다.
- 독립 reviewer는 최종 채택 코드에서 actionable finding을 발견하지 않았다. 이후 parser 실험을 제거했다.
- Worker 구조 검사 project-file-reader 직접 전송 지적 2건은 기준 소스와 이전 파서 396개 모듈에서도 같다. 제품 코드를 이 작업에서 바꾸지 않았다.
- 오래된 geometry UI 시나리오는 비동기 Undo 직후 lock을 읽는 지점에서 실패했다. 이 시나리오를 통과했다고 하지 않으며, 현재 계약의 확정 상태 polling 시나리오로 해당 시간축/잠금/Undo 경로를 별도 검증했다. 네이티브 WebView2/Android 실행은 하지 않았다.

## 동시 main 변경 보존과 배포

통합 직전 b15d9fa3 및 후속 4137265e의 별도 승인 자료 갱신을 발견했다. 최종 71a67904 자료의 모나코·바이코누르, baseline 및 동독 원래 recipe 복원을 보존한다. 첫 갱신은 archive logical entry 5,839 -> 5,999, 변경 316개(비보고서 311개), 삭제 0개였다. 후속 복원에서 149개 entry가 갱신됐다. 최적화에 의한 도형 변경으로 표시하지 않는다. 중간 1373ef67 DDR 실패는 이전/최적화 코드가 동일하게 실패했고, 최종 복원 자료에서 둘 다 성공한다. 중간 실패 원문은 ddr-data-1373 파일에 보존했다.

충돌은 생성 HTML/build metadata에만 있었고 합친 canonical 입력에서 재생성했다. 한 번 생성기가 충돌 meta를 입력으로 읽어 실패한 종료 코드를 잘못 처리하여 잘못된 로컬 merge를 만들었으나, 원격 push 전에 canonical HTML과 parseable meta seed에서 재생성하고 own unpublished merge를 수정했다. 최종 tree conflict marker 부재와 metadata/hash 검사, 실제 브라우저 검사를 확인했다.

Windows 긴 경로 때문에 새 release 파일 590개가 불완전하게 checkout된 문제는 해당 누락된 committed 파일만 복원하고 core.longpaths를 켜서 해결했다. 기존 미커밋 변경은 없었으며 reset/clean/force push를 쓰지 않았다. 상설 작업 공간을 재사용하고 다른 작업을 폐기하지 않았다. 다른 4개 워크트리는 준비된 71a67904 runtime cache에 owned junction만 바꿨다. 기존 cache와 report 원문 작업본은 보존했고 불필요한 808MB report 원문 복사를 각 워크트리에 반복하지 않았다. 보고서를 새로 다루는 워크트리는 통상 node tools/library-data.mjs로 자기 report revision을 준비한다.

초기 Windows WASM 70e4cb44는 source/ABI가 같아도 Linux CI 재빌드 f04925bb와 code section 바이트가 달랐다. CI 39942940366이 실제 빌드한 JS/WASM artifact를 받아 source ee4dd6e8 / ABI 1 / compiler 4.0.20을 다시 검증하고 canonical pair로 교체했다. 검증을 약화하지 않았고 최종 동일성·성능·실제 DDR·브라우저 검사를 이 산출물에서 재실행했다. 정확한 host 차이 원인은 단정하지 않는다. 초기 Application CI의 미등록 button-consistency/editable-library-ui/korean-boundaries 3개는 기존 책임 분류에 등록했다. 등록 누락 회귀는 RED 3개 -> GREEN 0개로 검증했다.

공개 사이트는 baseline 자료 핀 외에 저장소에서 독립 게시한 library channel c609a4f1을 정상 선택한다. 최초 live 검사가 이를 baseline dataRevision과 잘못 비교한 오류는 검증 스크립트에서 수정했다. 저장소 71a67904의 pointer 바이트와 실제 사이트 pointer가 같고 manifest SHA-256 fbad789d를 canonical channel reader로 확인한 뒤 화면 판본과 대조했다. 코드 파일 5개는 final commit bytes와 직접 비교한다.

Pages: https://kimjeon-il.github.io/Pando/

Workflow: https://github.com/kimjeon-il/Pando/actions/runs/39945738101

원격 및 로컬 브랜치: 43a1f29d7be0a30b57462a10624343eaebbc5017. 실제 HTML/build-meta/WASM/manifest 해시 근거는 release.json.

## 최종 자동검사 미해결 항목

최종 SHA의 Pages 39945738101은 성공했고 라이브 코드 5개 파일이 해당 Git blob과 같으며 254개 entity가 준비됐고 page/console error가 없다. 그러나 전체 CI 통과는 아니다.

- Shared C++ core 39945738421: native 9개는 통과했으나 동일 소스의 Linux 재빌드 SHA dc0fdb7b가 배포·실행 검증된 f04925bb와 다르다. 같은 크기의 WASM에서 192개 위치가 다르고 역어셈블에서 try/delegate 묶음 차이를 관측했다. 동일 compiler/source/ABI만으로 재현성 통과라고 하지 않는다. 검증 강도를 낮추지 않았고 반복 artifact를 덮어 배포하지 않았다(linux-build-reproducibility.json).
- Application Architecture 39945738424: staging된 shell static import를 원본 경로 apps/assets로 찾는 검사기 경로 해석 실패다. 해당 검사기·import 소스는 기준과 동일한 Git blob이다.
- Objects timeline regression 39945738025: 165개 중 161개 통과/4개 실패. territorial-timeline-storage fixture는 과거 record schemaVersion 1을 제공하고 propertyBindings가 빠져 현재 schema 2 검증 전에 거절된다. 테스트와 validator는 기준과 동일 blob이다.
- Objects cursor acceptance 39945738205: 소련 선택은 통과했으나 temporal roundtrip은 과거 active-view 키/projectSavedAt을 기대해 실패했다. 현재 저장 키는 active-view:<documentId>이며 해당 저장 코드와 테스트는 기준과 같은 blob이다. 이를 실제 reopen 성공이라고 주장하지 않는다.

ci-contract-provenance.json 및 ci-*-failure.log에 근거를 보존한다. 사용자 지적 이후 범위 밖 계약 정리·재현성 수리를 추가로 확장하지 않았다. 실험한 미채택 검사 한 개만 원상복원했고 소스 워크트리는 clean이다.

## 원문·재현

정적 조사 방법 inventory.mjs, 조사 목록 inventory-final.json, 채택/보류 판단 triage.md, 전후 원문 로그, 10쌍 성능 JSON, 독립 review.md를 같은 보고서 logical prefix에 보존한다. originals.json에 원문 SHA-256과 크기를 기록했다. 저장 helper가 JSON/log 등 원문을 archive/index.json과 무손실 압축 blob으로 보관한다. 재현 도구는 앱 저장소 tools/exact-calculation-performance.mjs이며 자료 저장소에서 검사를 실행하지 않는다. 데이터 핀은 보고서 저장만을 이유로 바꾸지 않는다.
