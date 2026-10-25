# 상설 작업트리 중복 정리와 활성 캐시 공유

> 보고서 ID: DEV-STORAGE-WORKTREE-20261025 · 상태: completed-with-limitations · 지도 반영: not-applied · 2026-10-25
> 코드 기준: 6db1f2e2aa2cd6b91552377c4907bc92dd7f3143 (work/objects) · 자료 pin: 127e51c3457df87786ecf3aa5ad98ded690928df
> 원본·출처: 같은 묶음의 result.json, 로컬 private-evidence/worktree-storage/20261025의 감사 원본. 단위는 명시하지 않으면 bytes.

## 대상과 실행

main/work-ui/work-objects/work-gis/work-places를 먼저 로컬·origin 모두 93b6e1b17477080687e31b3eaa16f2596b9c7010으로 동기화했다. 이후 구현은 상설 work/objects에서 진행했다. 상설 브랜치·작업트리·개별 build/target 경로와 자료/WASM 조합은 보존했다.

App staging 3630개 (592083214)와 source identity가 있는 과거 Qt 6.8.3 SDK view 6787개 (435941407)를 읽기 전용 동일 파일 ID로 전환했다. 논리 경로는 유지되므로 이 값은 논리 삭제량이 아니다. 라이브러리와 같은 바이트는 기존 .pando-store/blobs를 재사용하고 App/SDK 전용 불변 바이트는 D:/build/cache/pandolab/blobs에 한 벌 보관한다.

다섯 pnpm view는 독립 node_modules와 동일 D:/.pnpm-store/v11을 사용한다. GIS/Places의 디렉터리 전체 junction을 제거하고 잠금파일/설치 소유권별 view로 재배치했다. 모든 lockfile을 유지했다. 처음 사용한 force 옵션이 타 플랫폼 optional package도 설치한 것을 최종 측정에서 발견해 native platform resolution으로 바로잡았다. pnpm이 skipped로 판정한 host-incompatible 파일만 로컬 store hash/파일 ID 대조 후 제거했고, 이번 작업에서 새로 받은 store payload는 미참조 link count=1인 것만 제거했다. 기존 타 프로젝트 캐시는 일괄 prune하지 않았다. Windows esbuild 0.25.10은 다섯 작업트리에서 실제 transform smoke가 통과하고 타 플랫폼 설치 잔여는 0이다.

## 삭제와 용량을 구분한 결과

| 구분 | 파일 수 | 논리 bytes | 설명 |
|---|---:|---:|---|
| 라이브러리와 중복된 App blob | 803 | 253035104 | 해당 view를 원래 라이브러리 불변 blob으로 전환 후 삭제 |
| 사용 종료된 검증 전용 blob | 55 | 4316009 | 실제 Objects stage 제거 후 link count=1 및 hash 재검증 |
| 개별 파일 로그가 남은 비호환 pnpm view | 90 | 259882693 | 같은 로컬 pnpm store의 hash/ID로 복구 가능함 확인 후 삭제 |
| 이번에 생성된 비호환 패키지 store payload | 82 | 235406913 | 생성 시점·기존 감사 ID·nlink=1·hash 확인 |
| 위 삭제 로그 합계 | | 752640719 | 순 용량 변화가 아니며, 중간에 생성된 사본도 포함 |

나머지 네 view의 비호환 패키지는 pnpm의 정상 prune으로 제거됐다. pnpm 출력이 개별 byte 수를 주지 않아 위 합계에 더하지 않았다. 실제 검증용 Objects stage 1842개, payload 324570881도 사용 종료 후 제거했으며 이 수치는 원래 캐시 절감량과 분리한다. 컴파일 프로브·다운로드·완료 journal 및 자체 임시 스크립트도 제거했다.

선택 캐시의 논리 합계는 24,839,301,262에서 25760145004로 변했다. 독립 pnpm view와 불변 pool의 논리 엔트리가 추가돼 논리 합계가 늘어도 물리 payload 공유는 유지된다. 같은 범위의 고유 파일 ID 합계는 이전 21353097225, 현재 raw 20822579607이며, 이미 존재했던 라이브러리 blob 253035104를 현재 문맥에서만 새 할당으로 중복 계산하지 않도록 보정한 현재 값은 20569544503다. 따라서 파일 ID 기준 중복 감소는 **783552722**다. 이는 NTFS 실제 allocation 측정치와 다르다. 이전부터 공유되던 3,486,204,037은 신규 절감으로 계산하지 않았다.

실제 D: 여유는 첫 staging 적용 직전 **28796796928**, 최종 정리 후 보고서 작성 checkpoint **29542658048**, 차이는 **+745861120**다 (2026-10-25T02:56:45.635Z). 이 수치는 pnpm 설치/정리, 도구와 감사 증거 등 동시 디스크 변화를 포함한다. App 중복 blob 삭제 단독 +254,701,568, Qt 공유 단독 +359,976,960, task-created pnpm store 정리 단독 +235,618,304로 별도 측정했다. 보고서 Git 게시가 만드는 소량의 후속 변화는 이 checkpoint에 포함하지 않는다.

## 검증과 한계

관련 단위·staging 검사는 **37/37** 통과했다. 독립 리뷰가 찾은 강제 종료 후 stage lease 잔류와 pending journal의 유일 복구 blob GC 문제는 실제 child 종료 및 단일 복구 blob 회귀 검사 RED→GREEN으로 수정했다. 활성/알 수 없는 잠금은 보존한다. 같은 prefix인 다른 cache directory를 정상 서버로 오인하지 않는 검사도 포함했다.

실제 map-data stage 1842개 모두 SHA-256과 읽기 전용 공유 ID를 확인했다. 개발 서버에서 index, WASM, physical-land manifest가 모두 HTTP 200이고 원문 hash가 일치했다. 검증 stage와 서버를 종료·제거하고 다른 main/UI view 원문 읽기를 유지했다. UI 시각 검증이나 설치 패키지를 이번 결과에 포함하지 않는다.

공식 sccache 0.19.0 ZIP SHA-256은 28be8c61f6b2c89b9eb2869f6af7f78e6f992e78a8abae0ce855fcc129cbeac1이다. 도구는 D:/build/toolchains/sccache/0.19.0, 캐시는 D:/build/cache/pandolab/sccache의 **2GiB 상한**, 전용 loopback port 42427이다. Rust 의존성/네이티브 C++ 반복 및 다른 작업트리 output에서 실제 적중, source/header/options/env 변경의 miss, 실행 결과·dep-info·CMake launcher 유지까지 11개 프로브를 확인했다. Rust workspace incremental과 native target은 독립적으로 유지했다. 아직 코드가 통합되지 않은 브랜치 및 bare 직접 명령은 docs/worktree-storage.md의 명시적 wrapper 진입점을 사용한다.

Emscripten 4.0.20은 내부 Clang wrapper가 호출되고 유효한 WASM object가 생성됨을 3회 확인했다. 그러나 sccache가 기본 -Xclang 인수를 지원하지 않아 세 번 모두 bypass였다. 이를 cache hit나 속도 개선으로 주장하지 않는다. 컴파일 옵션을 제거하지 않았고 게시 WASM을 재생성하지 않았다.

## 보존 대상과 판단

- UI Cargo target 12,704,693,484 논리/9,514,691,986 파일 ID bytes: 현재 WebView/Android 개발의 독립 incremental 상태. 다른 target을 같은 쓰기 가능한 폴더로 합치지 않았다.
- UI build-native 4,669,807,801 중 Python Lib 4,607,779,288: 실제 QGIS MCP Python 프로세스가 사용하는 환경. Android app/build 1,073,330,078도 현재 고정 증분 경로다.
- Objects Emscripten SDK, 고정 CMake/컴파일러와 Qt SDK 고유 bytes: 실제 build/probe 및 과거 source-identified replay 경로/로컬 SDK 원본을 보존한다. 동일 bytes만 공유했으며 별도 SDK를 새로 복제하지 않았다. source identity가 없는 두 작은 Qt runtime 폴더는 소유권 미확인으로 보호했다.
- 기존 .superpowers/browser trace/GIS gpkg/학습·평가 증거는 고유 원본 또는 별도 진행 중인 작업으로 보호했다. 현재 UI map-plugin 작업은 이번 정리 중에도 계속 진행됐다. 동기화 시점 219개 WIP는 보존했고 최종 경로 수는 219개이며 세 원래 경로의 동시 변경을 감사에 기록했다. Git NUL status의 234개 레코드에는 rename의 추가 원래 경로 15개가 포함돼 별도 변경 파일로 세지 않았다. 해당 UI 소스에 본 정리가 쓰거나 커밋하지 않았다.
- 이 작업의 private 감사 metadata는 69702927이며 현재 보고서의 전후 hash/파일 ID·복구/원문 보존 근거다. 원문/build/repository 전체 백업은 만들지 않았다.

판단: Rust cwd는 원래 키를 보존해 workspace 사이 적중을 강요하지 않았다(경로/디버그 의미 보존, 해당 작업은 cache miss 가능). Qt는 고유 SDK bytes와 replay 경로를 보존했다(임의 in-place 변경은 독립 사본이 필요). 실제 적용·설치·컴파일 증거는 리뷰어의 재실행 대신 직접 검증 로그로 책임졌다(누락 검증을 통과로 확대하지 않음). WASM은 unsupported 인수를 보존해 cache speedup을 포기했다.

리뷰의 minor 한 건은 CMake cache로 주입된 C 전용 launcher 충돌 검사다. 현재 root는 CXX만 활성화해 해당 C 경로를 실행하지 않는다. 추후 C target을 추가할 때 보완해야 하며 현재 C++ 검증을 C 검증이라고 주장하지 않는다.

## 원격 보관

이 묶음만 canonical --publish-reports와 fresh --check-reports로 보관한다. runtime pin은 그대로 두고, 완료된 이 scope만 게시한다. 실제 라이브러리 commit/remote byte 검증 receipt는 완료 응답에 기록한다.

공식 근거: [sccache 0.19.0](https://github.com/mozilla/sccache/releases/tag/v0.19.0), [Rust caching 제약](https://github.com/mozilla/sccache/blob/v0.19.0/docs/Rust.md), [pnpm install](https://pnpm.io/cli/install), [pnpm store](https://pnpm.io/cli/store). 현재 설치한 pnpm은 11.19.0이며 최신 문서의 12.x force 동작 변경을 이 버전에 소급하지 않았다.
