# 라이브러리 중앙화·공유 저장소 통합과 전체 변경 배포

> 보고서 ID: DEV-RELEASE-20261025 · 상태: completed (Web / library storage) · 색인일: 2026-10-25
> 원문 최종 수정: 2026-10-25
> 조사 기준: Web / App source commit 93b6e1b17477080687e31b3eaa16f2596b9c7010
> 근거: live-release.json, live-release.png, pages-evidence.json, cleanup.json; 최종 실행 증거는 아래 판본 기록 참조

## 대상과 기준일

사용자가 다른 채팅의 현재 변경까지 포함한 커밋·푸시·배포를 승인했다. main, work/ui, work/gis, work/objects, work/places의 당시 변경을 각각 커밋해 보존하고 상설 UI 작업트리에서 통합한 뒤 main으로 fast-forward했다. 후속 Windows 저장 동기화 수정 및 현재 지구본 계약에 맞춘 DEM 테스트 수정까지 6f5dc697에 포함했다. 설치 패키지의 제작 완료를 뜻하지 않는다.

## 근거와 방법

- 라이브러리 준비·공유 저장·복원·정리·보고서 경로 집중검사 9개 통과. 보고서 보호 참조는 유지보수의 Git 상태 기준선을 잡기 전에 등록하며, 미리보기는 참조를 수정하지 않는다.
- GIS 로더·C++ 실제 WASM·배포 staging 관련 38개 검사와 전환 시기·수면 배경·자료 출처 관련 13개 검사 통과.
- App staging·개발 재로드 관련 25개 검사와 Python 보고서 경로·쓰기 계약 7개 검사 통과. App 실제 개발 서버에서 1,842 files / 324,426,527 bytes, error=null 확인.
- 실제 브라우저: 내장 국가/달력 전환 2개, 플러그인 가져오기·종류 변환·좌표 편집·Undo/Redo·GeoPackage 재열기, 경계 검토 흐름 통과. 좌표 편집 영역과 복사 영역이 함께 숨겨지던 통합 오류를 원본 UI template 및 속성 controller에서 수정했다.
- 네이티브 일반 실행 옵션·원자적 파일 복사·쓰기 가능한 handle 동기화 계약 4개는 개별 Rust 실행으로 통과했다. 전체 Cargo 검사는 당시 실행 중인 App의 WebView2Loader.dll 잠금(os error 32)으로 완료하지 못했다. 네이티브 설치 패키지는 만들지 않았다.
- [Pages workflow](https://github.com/kimjeon-il/Pando/actions/runs/40136605891) build/deploy 성공. 실제 https://kimjeon-il.github.io/Pando/ 의 metadata 원문 SHA-256이 커밋과 동일하고, 새 release를 소비해 현재 지도 및 1953-06 한국의 state:KOR:38th-parallel-1948 형상을 선택함을 확인했다. pageerror=[]이다.

## 저장 및 삭제 결과

원문 정본은 D:/dev/PandoLab-library-data/reports, 다른 판본은 .variants, 독립 편집은 .edits, 원본 증거는 private-evidence에 보존한다. 불변 파일은 .pando-store/blobs/<sha256> 한 벌을 읽기 전용으로 공유하며 runtime view는 .pando-cache/materialized/<owner>/<revision>이다. main/UI/GIS의 같은 자료가 실제로 동일한 읽기 전용 파일 ID를 공유한다.

검증된 기존 마이그레이션 74bb763e-dfdf-45a3-9ebf-310b19c87104: 15,024 files / 10,553,802,221 logical bytes 삭제, 파일 ID 기준 payload 감소 7,265,687,829 bytes, 당시 실측 D: 여유 증가 4,468,162,560 bytes. 모든 14,455 원래 로컬 Git 객체를 보존하고 독립 검증했다. 전체 원본 감사 기록은 로컬 private-evidence/storage-migrations에 남기며 이 공개 범위에 포함하지 않는다.

이번 통합에서 사용 종료된 산출물:

| 대상 | 삭제한 논리 바이트 | 실측 드라이브 여유 변화 |
| --- | ---: | ---: |
| 이전 고정 Pages stage (1,701 files) | 204,439,982 | 별도 실측 없음 |
| 자료 게시 작업본 (917 files) | 187,435,145 | 별도 실측 없음 |
| 게시 조립 복사본 (917 files) | 187,435,145 | +189,718,528 |
| 이전 main runtime view (2,655 files, metadata 포함) | 946,938,529 | -7,102,464 |
| 개별 Rust 검증 실행 파일 3개 | 22,920,402 | 별도 실측 없음 |
| 완료된 도우미 스크립트 6개 | 25,137 | 별도 실측 없음 |
| 검증 종료된 최종 Pages stage | 643598606 | 653529088 |

논리 바이트와 드라이브 변화는 서로 다른 지표이다. 이전 main runtime 본문은 이미 pool과 hardlink를 공유했으므로 그 링크 제거로 중복 payload가 추가 감소했다고 주장하지 않는다. 실측 드라이브 변화에는 동시에 실행된 다른 채팅의 네이티브 빌드 등이 포함된다.

이전 main view의 미보관 5 files / 57,863 bytes는 해시를 확인하고 private-evidence/runtime-edits/main/36210d5fde7d4d2301d0ff1335cf728e23b24195 로 실제 이동했다. 독립 writable 파일을 유지했고 provenance.json을 남겼다. 캐시 본문의 로컬 Git/pool 복구 가능성 및 pin·mount·server·writer 부재 확인 후 옛 view를 삭제했다.

상설 작업트리, 현재 pin의 공유 runtime view, 실행 중 App/개발 서버, 학습 환경 및 현재 빌드 캐시는 소비자가 있어 유지한다. 보고서 원문·고유 증거·독립 편집본은 캐시로 분류해 삭제하지 않는다. 실험 모델은 승격하지 않으며 training/evaluation 제한을 유지한다.

## 데이터 반영

- 코드 main 및 work/ui: 93b6e1b17477080687e31b3eaa16f2596b9c7010. 6f5dc697의 native 저장 flush 수정, c9abf867의 WASM 게시 및 집중 테스트 수정, 93b6e1b1의 산출물 staging 테스트 fixture 수정을 포함한다. c9abf867과 93b6e1b1 사이 변경은 테스트 파일 하나이며 게시 Web 실행 바이트는 동일하다. work/gis는 6f5dc697, work/objects는 cb94162a, work/places는 cdf5f7c8의 보존 snapshot을 원격에 게시했다. 이후 다른 채팅이 새로 작성 중인 cutover 테스트와 기능 변경은 해당 채팅의 미완성 작업으로 보존한다.
- WASM은 같은 소스 fingerprint·ABI 1·Emscripten 4.0.20으로 생성된 원격 CI 산출물을 기존 패키징 도구로 검증해 채택했다. Windows 산출물과 코드 section의 171 bytes가 달랐으며 원인은 확정하지 않았다. 최종 WASM SHA-256은 42de440a76a0fe27e6b2085dea23c3ad702fef84819d6cd143c6ae925fd2ec8a이다. source fingerprint 검증이나 엄격한 산출물 비교를 생략하지 않았다.
- 고정 DEM 테스트는 원본 L0/L1 타일의 v0.13.0 캐시를 v0.13.3 계약 URL에 연결하며, 저장소 URL 접두사를 제거하고 실제 DEM 렌더러·detail tile·cache bytes를 확인한다. Windows staging 회귀검사는 짧은 임시 경로 문자열 대신 realpath 계약을 비교한다. 원래 hydro normalization 검사는 hash로 보호된 frozen 코드를 사용하고, 실제 C++ 저장·Undo/Redo 결과를 비교한다.
- 산출물 staging fixture는 폐기된 .working 및 작업트리별 materialized 경로 대신 libraryMaterializedRoot/libraryReportRoot를 사용한다. 원격 실패를 로컬에서 재현한 뒤 수정했으며 관련 파일의 검사 24개가 모두 통과했다. 제품의 symlink 허용 검사나 게시 보호 조건은 약화하지 않았다.
- 통합 runtime pin: 127e51c3457df87786ecf3aa5ad98ded690928df. GIS C++/WASM fingerprint: dd222091475843be993912db749c47b4ddf4fe89e23c3a97fe234058b2de5278. worker closure 410e9a64 계열로 갱신했다.
- 공개 자료 채널 게시 commit: 78f4dfd580eb1569bfd4dc552ad1fb48b836c34f. release 5225b03dc132fc13750aac1526afd02f4ec4ef975407ef1afb4fa04b2357b5a3 (source pin 127e51c3...), schema 2. 기존 release 이력 3개 모두 무결성을 검사했다.
- 최종 Web artifact: 4,400 files / 643,598,606 bytes, native/App/shared source 제외. 로컬 stage는 검증 종료 후 삭제하고 해시 색인만 이 범위에 보관한다.

## 확인 결과와 한계

이 작업은 저장·통합·배포와 해당 소비 경로를 검증했다. 역사 경계의 독립 정확도 또는 학습 모델의 일반화 성능을 새로 입증하지 않는다. Windows flush 수정은 실제 파일을 사용하는 개별 Rust 회귀검사를 통과했다. App의 전체 네이티브 실행·저장 UI 검증은 별도 작업과 원격 Windows 검사 결과를 구분해 판단한다.

## 판본

2026-10-25 최초 완료 기록. 런타임 pin과 이 보고서의 보관 revision은 독립적이다.

## 최종 배포 확인 (2026-10-25 08:05 KST)

[최종 Pages 실행 40140421888](https://github.com/kimjeon-il/Pando/actions/runs/40140421888)의 build/deploy가 모두 성공했다. final-live-release.json/png는 93b6e1b1 공개 사이트에서 새로 취득한 증거다. metadata SHA-256 e5b2e12d8130b945c25c2d5535d36806818d706f1f7fe5c6de85f26dc3fb2683 및 WASM SHA-256 42de440a…가 해당 Git 커밋과 동일하다. 활성 release의 manifest hash가 채널과 같고 실제 내장 지도 catalog schema가 2임을 확인했다. 현재 지도와 1953-06 KOR 형상 전환이 통과했고 pageerror=[]이다. release manifest 자체의 schemaVersion 1과 builtin catalog의 schemaVersion 2를 구분한다.

final-pages-evidence.json은 원격 최종 staging의 실제 4,400 files / 643,598,606 bytes 및 각각의 hash 색인이다. 배포 대상에 native/App/shared source는 포함되지 않았다. 기존 최초 배포 증거도 시점이 다른 증거로 보존했다.

원격 검사가 모두 성공한 것은 아니다. [공유 C++ CI 40139700393](https://github.com/kimjeon-il/Pando/actions/runs/40139700393)는 같은 소스를 재빌드한 WASM eb9f7a11…과 게시본 42de440a…의 바이트 일치 검사에서 실패했다. 두 파일은 길이·JS 및 data/type/import/export section이 같고, 8개 함수의 EH try 중첩·label depth 등에 해당하는 code section 183 bytes가 달랐다. 소스 fingerprint·ABI·컴파일러와 strict byte 검사는 유지했다. 두 바이너리의 의미적 동등성이 입증됐다고 주장하지 않는다. 관찰은 pointer-key DenseMap에 의한 EH 코드 생성 비결정성을 다루는 [LLVM #204883](https://github.com/llvm/llvm-project/issues/204883), [수정 PR #205184](https://github.com/llvm/llvm-project/pull/205184)와 일치하지만 이 빌드의 원인으로 확정하지 않았다. SDK 업그레이드 및 새 컴파일러 도입은 이 저장 정리·배포 범위에 추가하지 않았다.

[DEM CI 40139700391](https://github.com/kimjeon-il/Pando/actions/runs/40139700391)는 실제 DEM tile/cache/renderer 전환 assertion을 통과한 뒤 color screenshot 촬영 중 timeout이 발생했다. 같은 테스트의 Canvas Worker case를 GIS 작업트리의 기존 고정 DEM source cache로 재실행하여 20.1s에 통과했다. canvas-dem-delayed-preview.png, canvas-dem-detail-color.png, canvas-dem-detail-gray.png를 보존한다. 이 로컬 통과를 실패한 원격 실행의 통과로 바꿔 기록하지 않는다. Windows 전체 App CI는 기록 시각에 네이티브 빌드 중이며, 개별 native 저장 계약과 App staging/개발 서버 확인 결과를 전체 UI 검증으로 확대하지 않는다. 원격 산출물 P2의 수정된 plan 테스트는 성공했으며 후속 generate 단계가 진행 중이다.

## 최종 정리

공용 pool에 다른 hardlink가 없는 135 blobs / 45,279,837 bytes를 추가 확인했다. 각 파일의 SHA-256을 파일명과 비교하고 로컬 Git 객체를 직접 읽어 124 blobs / 45,162,641 bytes의 정확한 복구를 확인한 뒤 삭제했다. 삭제 직전 중앙 잠금 아래 활성 write lease 부재와 nlink=1을 다시 확인했다. 이 단계의 실측 D: 여유 증가는 45,334,528 bytes이며 동시 빌드 영향을 포함할 수 있다.

나머지 11 blobs / 117,196 bytes는 삭제하지 않고 private-evidence/storage-finalization/20261025/unindexed-originals/<sha256>로 같은 드라이브에서 이동해 원본 hash를 검증했다. 원래 pool 위치, 복구 판정 및 이동 출처는 같은 폴더의 unlinked-store.json에 남겼다. 이 기록과 고유 원본은 로컬 비공개 증거로 보존한다.

다운로드한 CI WASM 2세트, 원격 DEM 진단 사본, 중복 Pages 색인 사본, 종료된 로컬 테스트 출력 및 일회성 도우미 3개를 모두 제거했다. final-cleanup.json의 추가 삭제량은 55,375,394 logical bytes, 해당 단계 실측 D: 여유 증가는 55,402,496 bytes이다. 고정 Pages 작업 폴더를 새로운 완전 복사본으로 보관하지 않는다. 사용 종료된 이 범위의 독립 편집본도 원격 게시·재검증 및 중앙 원문 hash 확인 후 제거하며 중앙 원문과 Git 보관본을 읽는 경로를 확인한다.
