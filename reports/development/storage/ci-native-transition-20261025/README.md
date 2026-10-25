# CI 빌드 전환과 로컬 컴파일 환경 정리

> 보고서 ID: DEV-CI-NATIVE-20261025 · 상태: 로컬 정리·실행 검증 완료 · 지도 원본 반영: not-applied
> 원문 최종 수정: 2026-10-25

Windows MSVC x64와 Android ARM64 CI 앱, 동일 debug 서명 업데이트, 공통 WASM 계산과 실제 GIS 파일 입출력을 검증했다. 승인된 로컬 컴파일 환경과 사용이 끝난 검증 파일을 실제 삭제했고, 컴파일러 없는 PATH에서 Windows 앱·WASM 계산·ADB·GPU CUDA를 다시 확인했다. App·라이브러리 공유와 고유 원문은 보존했다. 원격 보관은 아래 선택 범위에 대한 발행·검증 명령으로 확인한다.

## 구현과 식별값

- 앱 저장소 브랜치: `work/ui`, 구현 커밋 `ba211b44313397c61bb538874a2c9b14ba377d96`. `main` 통합과 제품 배포는 수행하지 않았다. 기존 UI 변경 `cf9258bad`를 커밋했고 스토리지 변경을 정상 병합했다(`fc2592e1743dafc37dbcccfac36ee389ea6746fa`). 다른 채팅의 미완성 변경은 별도로 보존했다.
- 실제 검증한 네이티브 생산 소스: `ddced2c32f9e57c3b9e681535d1226bfd1d95f79`, Rust `1.99.1`. 이후 이 작업의 변경은 검증 도구·정리 도구·문서에 한정한다. 병행 채팅의 후속 렌더러·도메인 변경 전체를 이 보고서에서 검증했다고 주장하지 않는다.
- [Windows CI / native tests](https://github.com/kimjeon-il/Pando/actions/runs/40174200092): 성공. 입력 SHA-256 `c2ec0f9808a6c43399e35cac4a9c58e09d0c2f587c8d67ed5f8df2bc53dceb0d`. EXE SHA-256 `7b0a1f8b34dea033f6c4f5bda5c9638dc3b8e71bfe6d9372da118090a9bd30e2`.
- [Android ARM64 CI](https://github.com/kimjeon-il/Pando/actions/runs/40174205428): 성공. 입력 SHA-256 `b78b86e61b3e9ee8348a920f90f4c64164b8b32346f79672324d21996629e5c3`. APK SHA-256 `c4fe3bd0b05521b79b08b197cbdd1977c166d180bd949cf01425f7bbeba00daa`.
- 승인된 debug 인증서 SHA-256: `2fab34b4d4e070915c515741689fb5349c8606cc03c8295b273d359bd4e67bdd`. keystore와 암호는 보고서에 넣지 않는다.

`packaged-artifacts.mjs`가 요청·조회·검증을 소유하며 CI 전용 생산 코드는 `native-producer.mjs`에 둔다. 개발 모드는 명시적인 Cargo `development` feature와 `http://127.0.0.1:4175`를 사용하고 화면·지도 자료를 앱에 내장하지 않는다. 개발 입력 해시는 네이티브 소스·설정·권한·도구 버전·실제 생산 코드를 포함하고 일반 JS/CSS·자료 pin 변경은 제외한다. 오프라인 모드는 전체 staging·자료 pin을 추가로 검증한다. 산출물은 7일 보관하며 새로운 영구 CI 빌드 캐시는 추가하지 않았다.

`dev:windows`, `dev:android`, `build:*`, `test:native`는 검증된 CI 산출물 또는 대응 CI 작업을 이용한다. 로컬 컴파일·SDK 자동 설치 경로는 제거했다. Android는 명시한 ARM64 실기기와 ADB reverse를 사용한다. 다중 기기는 대상을 요구하고 서명이 다르면 설치를 중단한다. 실행 파일의 입력 해시·플랫폼·모드·바이트를 검증하며 진행 중인 다운로드와 실행 중인 파일은 기존 정상 산출물을 덮어쓰지 않는다. 네이티브 산출물은 공용 불변 blob과 작업트리별 참조로 공유한다.

## 실행 검증과 한계

1. Windows 실제 CI 앱을 컴파일러가 없는 PATH에서 실행했다. GeoJSON 가져오기, 일반 GIS 변환·편집, 일괄 작업 및 형상 Undo/Redo, GeoPackage 저장·재열기와 원본 보존을 확인했다. 저장 파일 23,314,432바이트, SHA-256 `24512d3187083a17e4116ab9bc26a62ec9555b004977a0e55b05aa8b71bcdaa9`. 파일 선택 검증은 사용자가 허용한 대상 PID 전용 `native-file-dialog.ps1`의 일회성 RemoteSigned 자식 프로세스만 사용했고 전역·사용자 정책은 변경하지 않았다.
2. Samsung S22+ / Android 16 / ARM64 실기기에서 같은 흐름을 확인했다. 조밀한 정점은 터치 선택기에서 선택한 뒤 이동했다. Samsung 가로 화면 IME가 Save 버튼을 가려 자동화가 막힌 것을 확인하여, IME 표시 시에만 닫도록 검증 도구를 수정했다. 같은 검증 세션의 대기 저장을 이어서 완료한 뒤 실제 파일 선택기로 재열고 모델·형상을 확인했다. 저장 파일 23,314,432바이트, SHA-256 `725555127afe1f72330af6f4634fe3557be54ae571763026b4056ccad8bc3d7a`. 증거: [실기기 흐름](evidence/android-workflow-complete.json).
3. 최초 설치돼 있던 예전 앱은 사용자가 직접 삭제했다. 그 앱의 데이터 보존을 주장하지 않는다. 이후 승인된 debug 키로 설치한 새 앱에 대한 같은 서명 업데이트에서 localStorage 표식·설치 시각·앱 식별값 보존을 확인했다. [업데이트 증거](evidence/android-update-proof.json).
4. 두 실제 네이티브 WebView에서 동일 WASM `42de440a76a0fe27e6b2085dea23c3ad702fef84819d6cd143c6ae925fd2ec8a`, 공통 소스 `dd222091475843be993912db749c47b4ddf4fe89e23c3a97fe234058b2de5278`를 확인했다. 폴리곤 합집합·차집합·교집합·정규화, wrapping 40사례, 렌더링 형상 패킷 및 배율 141/504/550/642/900 결과가 일치했다. [계산 비교](evidence/native-computation-parity.json). 모든 입력·상황의 동등성을 입증하는 전수 검사는 아니다.
5. Android CDP 스크린샷은 GPU 지도 레이어를 누락했다. 이를 실제 렌더링 결함으로 해석했던 진단은 철회했다. 기기 자체 screencap에서는 세계 지도·경계·색상·라벨이 정상 표시되며 실제 제출은 canonical 4,534,188 indices, 누락/실패 overlay 없음이었다. [기기 화면](evidence/android-native-screen.png). 이전 백그라운드 메모리 부족 종료 1건은 관측했으나 통제된 저장·재열기 중에는 재현되지 않았다. 이를 감추는 제품 우회 코드는 추가하지 않았다.
6. 모바일 왼쪽 도구막대·햄버거 위치 수정은 사용자가 후속 작업으로 미뤘다. 이번 단계에서 그 배치 문제를 해결했다고 주장하지 않는다.

관련 로컬 검사 60건, 최종 정리 도구 회귀 검사 13건 및 해당 파일 ESLint가 통과했다. CI Rust 검사는 6+22+7=35건, 네이티브 계약 JS 검사는 13건 통과했다. C++ 소스·배포 WASM 일치 검사는 통과했으며 이번 작업으로 로컬 WASM 재컴파일이나 설치 패키지를 만들지 않았다.

## 재배치와 삭제 증거

- 고유 AVD 자동저장 프로젝트 16,707,514바이트와 뷰 302바이트를 라이브러리 `private-evidence/development/ci-native-transition-20261025/avd`에 내보내 독립 해시를 대조했다. 원래 AVD 설정과 기존 스크린샷도 보존했다. 개인 프로젝트 내용은 이 공개 보고서에 넣지 않는다.
- 기존 컴파일 환경의 고유 설정·설치 로그·Python/CMake 원문 22,544,342바이트는 같은 드라이브의 `private-evidence/development/ci-native-transition-20261025/legacy-toolchain-configs`로 이동했다. 원본 SHA-256·파일 ID를 검증했다. [재배치 목록](evidence/relocations.json.gz).
- 사용이 끝난 네이티브 CI view 3벌과 고아 blob은 제거했다. 파일 ID와 마지막 링크 기준 nominal payload 감소는 131,800,772바이트다. 현재 Windows/Android view는 유지했다. [개별 삭제 증거](evidence/native-retired.json).
- 승인된 compiler manifest 123,913항목 처리를 완료했다. 실제 삭제량은 30,624,943,871바이트다. 차이 339바이트는 미리 보존·이동한 `.emscripten` 원문이며 삭제량에서 제외했다. 과거 승인 차단 이력이 있는 `sccache` 11파일 / 22,095바이트는 목록에서 제외했고 부모 경로 삭제로 우회하지 않았다.
- 적용 전 전체 바이트를 해시했다. 정확한 manifest 해시와 최초 검사 시각을 묶은 로컬 receipt로 재사용하되 파일 ID·크기·mtime·OS change-time·링크 수·모드가 바뀌면 다시 해시한다. 모든 절대 경로·junction·소비자를 확인하고 250파일 write-ahead journal로 중단 재개와 삭제량 단일 계산을 보장한다. [해시 목록](evidence/compiler-manifest-approved.json.gz), [요청](evidence/compiler-requests.json.gz), [receipt](evidence/compiler-preview-proof.json.gz), [범위별 용량](evidence/compiler-groups.json.gz), [압축 원문 무결성 색인](evidence/audit-index.json).

GIS 및 UI 자료 준비 잠금이 생기면 삭제를 중단하고 같은 manifest/journal로 재개했다. 반복 UI 잠금은 이번 검증에서 시작한 개발 서버 PID15316의 자료 준비로 확인했다. 실기기 검증이 끝난 그 서버만 원래 실행 세션에서 종료하고, 소유 프로세스 종료를 확인한 뒤 남은 자체 lease를 정리했다. 다른 채팅의 프로세스·잠금은 제거하지 않았다.

사용이 끝난 main/UI App staging 두 벌은 현재 CI 앱이 소비하지 않음을 확인했고, 3,630개 색인 파일의 해시가 일치하며 미분류 파일이 없음을 검증한 뒤 기존 staging 소유자의 삭제 함수를 사용했다. stage 3,634파일과 고아 App blob 1,688개를 제거했다. 현재 네이티브 실행 파일 3개는 blob과 같은 파일 ID·읽기 전용 상태를 유지한다. [staging 삭제](evidence/old-stages-retired.json), [공유·pin 보존](evidence/storage-preservation.json).

검증용 GeoPackage·전체 모델 snapshot·로그·프로필·임시 스크립트·중복 manifest가 있던 작업 폴더는 1,206파일 / 372,819,528바이트를 제거했다. 원문 해시와 크기·파일 ID를 사전 확인하고, 필요한 증거의 압축·해제 해시를 대조한 후 기존 preview/apply/journal 경로로 삭제했다. 마지막 감사용 요청·manifest 2파일 / 696,292바이트도 압축 원문을 확인한 뒤 제거했다. [검증 사본 삭제](evidence/verification-scratch-cleanup.json), [감사 색인](evidence/verification-scratch-audit.json), [마지막 임시 파일 삭제](evidence/audit-staging-cleanup.json).

과거 PID25160의 602,756바이트 journal은 현재 것과 digest가 다르고 소유 PID가 없음을 확인했다. 이를 `private-evidence/development/ci-native-transition-20261025/legacy-generated-retirement.pending.json`으로 이동해 SHA-256·파일 ID를 보존했다. 현재 완료 journal과 원래 경로의 과거 임시 journal은 남아 있지 않다. [완료 후 점검](evidence/after-retirement.json).

## 실제 삭제량과 여유 공간

| 제거 대상 | 경로별 논리 바이트 | 마지막 링크 기준 nominal 바이트 |
| --- | ---: | ---: |
| 컴파일러·SDK·target | 30,624,943,871 | 28,045,239,202 |
| 과거 네이티브 view와 고아 blob | 263,760,950 | 131,800,772 |
| 과거 App staging과 고아 blob | 736,887,990 | 144,804,776 |
| 종료된 검증 작업 폴더 | 372,819,528 | 372,819,528 |
| 마지막 감사 임시 파일 | 696,292 | 696,292 |
| **전환 작업 전체 누계** | **31,999,108,631** | **28,695,360,570** |

이 마지막 재개 단계의 추가 논리 삭제량은 30,791,990,337바이트다. 전체 누계에는 재개 전 삭제한 compiler 943,357,344바이트와 과거 네이티브 view/blob이 포함된다. 하드링크의 view 이름과 blob 이름을 모두 지웠으면 경로별 논리 바이트에는 각각 포함하고, 파일 ID의 마지막 링크 제거만 nominal 바이트에 계산한다.

2026-10-25 19:17:19 KST, 정리 후·보고서 발행 전 실측:

| 드라이브 | 정리 전 여유 바이트 | 정리 후 여유 바이트 | 실측 증가 |
| --- | ---: | ---: | ---: |
| C: | 24,709,091,328 | 26,684,960,768 | **1,975,869,440** |
| D: | 33,564,229,632 | 58,881,142,784 | **25,316,913,152** |

마지막 링크의 파일 크기는 실제 NTFS 할당 클러스터 용량과 다르며 sparse AVD 등의 영향이 있다. 실제 드라이브 증가는 다른 프로세스·Git 보관 작업의 동시 쓰기에도 영향을 받는다. 이후 보고서 발행으로 생기는 Git 객체는 위 측정 이후의 사용량이다. [정확한 측정과 합산](evidence/final-storage-metrics.json).

## 보존 대상

GPU Python 약 4.61GB와 CUDA 학습 실행 경로, Qt/MinGW·Java·다른 프로젝트의 공용 도구, C 사용자 공용 Gradle 캐시 약 610MB는 승인된 보존 대상이다. 현재 ADB platform-tools 한 벌 17,548,112바이트와 현재 네이티브 실행 payload 74,671,857바이트는 개발에 계속 사용한다. 이 실행 payload는 view와 blob이 같은 파일 ID를 공유하므로 두 벌의 물리 사본이 아니다.

고유 원문 24개 / 39,252,158바이트를 완료 후 SHA-256으로 재검증했고, 같은 드라이브에서 옮긴 설정 원문은 파일 ID도 대조했다. AVD 설정 원문 1,295바이트와 과거 journal 602,756바이트도 별도로 보존했다. 개인 프로젝트와 원문 로그 내용은 공개 보고서에 넣지 않는다.

라이브러리 원문·Git 이력·상설 브랜치·작업트리를 유지했다. main/UI/objects/places pin은 최초와 같으며, 병행 GIS 작업 커밋 `b1bc394bd`가 설정한 GIS revision `1879138b54b2c9f8c173bf5575b108e3f1f8139b`도 그대로 보존했다. 이를 main의 pin으로 덮어쓰지 않았다. 다른 채팅의 미완성 소스·미추적 Worker 산출물은 건드리지 않았다. App blob/라이브러리 공유는 활성 상태이며 compiler 설정은 `active:false`, compiler 환경 빈 객체다.

삭제 후 현재 Windows/Android CI bundle의 입력·바이트를 다시 검증했고, 컴파일러가 없는 PATH로 Windows 앱을 기동해 현재 frontend의 enhanced 준비 상태와 공통 WASM 정규화를 확인했다. ADB 실행 및 Torch 2.14.1+cu126 / CUDA true / GTX1650 확인도 통과했다. 임시 앱·관찰 기능을 끈 검증 서버·프로필은 종료·삭제했다. [최소 PC 실행 검증](evidence/minimal-pc-verification.json). 실기기는 재연결하지 않았고 추가 기기 검증을 요구하지 않았다. 기기가 현재 연결되지 않아 기기 측 debug mapping 제거는 실행하지 않았다(파일 payload 0바이트). [런타임 정리](evidence/runtime-cleanup.json).

이전 작업에서 차단된 약 292MB의 모델·WebView profile·실패 GPKG·스크립트와 22,095바이트 sccache는 이번 정리로 우회 삭제하지 않는다. 이전 객체 scratch는 이미 없음을 확인했으며 이번 삭제 실적으로 계산하지 않는다. 이전 빈 폴더 제거 차단도 재시도하지 않았다.

## 원격 보관

발행 대상은 `reports/development/storage/ci-native-transition-20261025` 한 범위다. `node tools/library-data.mjs --publish-reports --include-prefix=reports/development/storage/ci-native-transition-20261025`로 원문 보관·라이브러리 main 커밋·push·원격 바이트 검증을 수행하고, 같은 범위의 `--check-reports`로 다시 확인한다. 확인된 라이브러리 커밋은 최종 응답에 기록한다. 앱 main 통합·배포, 다른 작업의 미완성 보고서 발행은 포함하지 않는다.
