# 상설 작업공간 생성물 정리 결과

> 보고서 ID: DEV-STORAGE-20261025-GENERATED · 상태: partial-blocked · 지도 반영: not-applied
> 원문 최종 수정: 2026-10-25 · 조사 기준: Web/App work/objects aaa994b19 (선행 구현 5b8b173c)
> 근거: 적용 직전 파일 ID/해시 조사, 실제 적용 manifest, 로컬 Git 전 객체 목록, 소비 경로 실행 결과. 상세 목록은 audit/ 및 result.json.

## 대상과 승인 범위

D:/dev/PandoLab 및 D:/dev/worktrees/{ui,objects,gis,places}. 승인한 GPU 학습 환경과 현재 Windows/Android 빌드 조합을 보존하고, 종료된 생성물 삭제·고유 증거 재배치·불변 바이트 공유·Git 중복 압축을 실행했다. 모든 상설 브랜치와 작업트리, UI 미완성 변경 202개, 런타임 pin 127e51c3457df87786ecf3aa5ad98ded690928df를 유지했다.

## 실제 처리

| 처리 | 논리 바이트 | 근거/현재 위치 |
|---|---:|---|
| 종료된 Cargo 조합·프로브·profile | 3,434,582,981 삭제 | manifest-cargo; 현재 의존성 883개 보존 |
| 소비자 없는 Cargo build 산출물 | 544,768,071 삭제 | manifest-cargo-orphans; immediate build 폴더 3개 |
| 종료된 작은 생성물 | 16,403,643 삭제 | manifest-small |
| 실행 파일 없는 과거 Qt runtime view 5개 | 435,941,407 삭제 | qt-applied; 이미 공유된 링크이므로 동일한 물리 절약량을 의미하지 않음 |
| 미참조 App blob 965개 | 91,587,526 삭제 | blob-prune; 현재 마운트·stage·lease 확인 |
| 고유 비교 증거·P9·프로브 소스 | 2,079,447,910 이동 | D:/dev/PandoLab-library-data/private-evidence/worktree-storage/generated-cleanup-20261025; 원래 브랜치·상대 경로 유지 |
| 활성 CMake 3.31.6 | 83,281,291 이동 | D:/build/toolchains/cmake/3.31.6; 기존 configure cache 5개 갱신 |

이동 파일은 전부 크기·SHA-256을 다시 대조했다. 고유 증거 중 2,106개는 라이브러리 blob과 읽기 전용 파일 ID를 공유하며, 마지막 별도 링크 제거 기준 153,165,529바이트를 줄였다. 수정 중인 파일이나 학습 원본은 공유하지 않았다.

## Git 압축

앱 공용 .git/objects는 2,217,912,196 → 1,696,817,265바이트, 순감소 521,094,931바이트다. 미참조 객체를 포함한 66,430개 전체의 OID·종류·크기를 압축 전후 정확히 비교했고 refs·HEAD·reflog·각 작업트리 상태도 압축 단계 내에서 동일했다. 원격 재다운로드, 이력 만료, unreachable prune을 복구 근거로 쓰지 않았다. 새 pack 집합·무결성과 MIDX 검증 후 대체된 pack·느슨한 중복을 제거했다. 압축 뒤 task-owned 소스 커밋이 정상적으로 작은 새 객체를 추가했다.

기존 저장 책임자 library-storage.mjs의 전 객체 repack을 재사용했다. cat-file의 --unordered/--buffer로 열거한 결과는 기존 순서와 별개로 정렬 후 전 레코드가 일치했다. [Git cat-file 공식 문서](https://git-scm.com/docs/git-cat-file), [pack-objects 공식 문서](https://git-scm.com/docs/git-pack-objects).

## 용량 측정

단위 GB는 10^9바이트, GiB는 2^30바이트다. 측정 시각 2026-10-25T04:58:30.574Z. junction·symbolic link 밖은 순회하지 않았다.

| 작업공간 | 전 GB | 후 GB |
|---|---:|---:|
| D:/dev/PandoLab | 3.534 | 2.886 |
| D:/dev/worktrees/gis | 1.325 | 0.669 |
| D:/dev/worktrees/objects | 2.693 | 1.882 |
| D:/dev/worktrees/places | 0.358 | 0.358 |
| D:/dev/worktrees/ui | 20.695 | 15.735 |

- 작업공간 논리 합계: 28.605 → 21.530 GB, 감소 7.075 GB.
- 작업공간 내 파일 ID 고유 payload: 23.600 → 17.968 GB. 이 값에는 외부 라이브러리로 이동한 바이트도 포함되므로 드라이브 절약량으로 쓰지 않는다.
- 명시적 생성물 삭제 4.432 GB, blob 삭제 0.092 GB, 이동 2.163 GB. 이동은 같은 드라이브에서 수행했으므로 그 자체는 여유 공간을 늘리지 않는다.
- 확인된 마지막 링크 제거·blob 제거·증거 공유·Git 순감소 합계는 최소 3.667 GB다. 중단 재개 첫 manifest의 1,908바이트 회계 차이는 원문 목록 전부 부재를 확인했으나 이 최소 물리 합계에 더하지 않았다.
- 실제 D: 여유 공간: 29,540,343,808 → 33,215,664,128바이트, +3.675 GB (3.423 GiB). NTFS 할당 단위·다른 프로세스·이후 보고서 발행의 영향이 있어 논리 삭제량과 동일하지 않다.

## 보존 대상과 현재 사용처

| 대상 | 현재 GB | 실제 용도 |
|---|---:|---|
| Cargo target | 8.831 | 현재 Windows 개발 실행·테스트 및 Android ARM64/x86 조합의 fingerprint 의존성·incremental |
| GPU Python 환경 | 4.611 | Torch CUDA 학습·numpy/Pillow·QGIS MCP import; 승인에 따라 보존, 전후 바이트 동일 |
| Android generated/build | 1.386 | 다른 UI 작업의 미완료 native WebView gate와 ARM64/x86 개발 |
| Emscripten SDK | 1.331 | 현재 공통 C++ WASM configure/build 경로 |
| 앱 Git 전체 | 1.704 | 전체 로컬 이력·브랜치·미참조 객체 복구 |
| 오프라인 App 실행 파일 | 기존 유지 | dev.ps1 --preserve-existing가 실제로 사용 |
| 원본 GIS ZIP·학습 지도·라벨·평가 결과 | 기존 유지 | 원본/고유 증거. 이름·나이·ignored 여부로 삭제하지 않음 |
| 이 보고서 감사 첨부 | 약 0.012 | before/after 파일 ID 목록, 정확한 manifest와 Git 객체 보존 증명. gzip 해제 후 원본 해시 검증 |

## 실제 검증과 한계

- 초기 관련 단위검사 47개 및 최종 변경 범위 18개 통과. 실제 unreachable 객체와 worktree 상태 보존 Git 회귀검사도 마지막에 다시 통과. 변경 파일 ESLint 통과. 최종 독립 코드 검토 Critical/Important 0개.
- 실제 C++/Rust/CMake 캐시 11개 검증: 반복·다른 작업트리 hit와 header/options/env/source 변경 miss. 2GiB 상한과 현재 target/incremental 조합 유지.
- Web 개발 서버 HTTP 200과 HTML/WASM/runtime 자료 SHA-256 일치. 실제 App map-data staging·읽기 전용 공유·해시 일치·stage 제거 확인. 설치 패키지나 공개 WASM을 새로 만들지 않았다.
- 현재 App 실행 파일 --build-info 확인. 캐시된 Rust 단위 실행 파일의 Cargo 밖 직접 실행은 DLL entrypoint 오류로 실패했으므로 native unit 통과로 보고하지 않는다.
- Torch 2.14.1+cu126, CUDA available=true, numpy/Pillow/QGIS MCP import 확인. QGIS 데스크톱은 실행 중이 아니어서 실제 QGIS 연결은 미검증이다.
- 이동한 원문 전부의 SHA-256/크기, 공유 subset의 readonly·동일 파일 ID, Cargo 보존 883개 동일, UI WIP 해시 및 status 202개 동일, 모든 pin 동일을 최종 확인했다. 완료된 migration/repack journal과 staging은 남아 있지 않다.

## 삭제가 차단된 잔여 항목

자동 승인 검토에서 다음 삭제 명령을 거부했다. 상세 거부 사유는 제공되지 않았으며 다른 도구나 상위 폴더 삭제로 우회하지 않았다. 따라서 전체 삭제 완료 상태는 partial-blocked다.

- 이전 작업에서 거부된 292,084,426바이트: interface-smoke.onnx, 현재 map-plugin webview-profile, 실패한 GPKG 사본 2개, map-plugin 작업 스크립트. 상세 기존 목록: reports/map-analysis/reports/plugin-migration/node-windows-verification.md.
- 이번 컴파일 nonce 검증 캐시 11개 22,095바이트: D:/build/cache/pandolab/sccache. 검사 전 캐시는 비어 있었으며 소비가 종료됐지만 삭제 명령이 거부됐다. 실제 compiler incremental/SDK와는 별개다.
- 종료된 폴더의 빈 디렉터리 제거 명령이 거부됐다. 파일 payload 0바이트이며 permanent worktree를 제거하려던 명령이 아니다.
- 이번 작업 scratch 72,664,867바이트: D:/dev/worktrees/objects/.superpowers/sdd/2026-10-25-generated-cleanup. 필요한 감사 기록은 압축·해제 해시 검증했고 나머지는 종료된 preview/request였으나 삭제 명령이 거부됐다. 유용성 때문에 보존한 항목으로 분류하지 않는다.

## 반영 및 보관

코드 구현과 최종 보완은 work/objects의 5b8b173c, aaa994b19로 커밋하고 origin/work/objects에 push했다. main 통합·다른 범주의 WIP 이동·배포는 이번 정리에서 실행하지 않았다. 이 보고서 범위만 --publish-reports와 --check-reports로 발행·원격 원문 검증하며 런타임 pin은 변경하지 않는다.

최초 원격 발행 직후 D: 여유 공간 재측정: 33,190,952,960바이트, 시작 대비 +3,650,609,152바이트(3.651GB). 위 3.675GB 표본 이후 보고서 원본/감사 첨부의 Git 보관 등으로 약 24.7MB가 사용됐다. 이 최종 메모 발행의 작은 추가 Git 객체와 다른 프로세스의 할당은 이 시각 이후 수치에 영향을 줄 수 있다.
