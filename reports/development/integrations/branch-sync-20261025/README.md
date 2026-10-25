# 원격 변경 통합 및 상설 브랜치 동기화

> 보고서 ID: `DEV-INTEGRATION-SYNC-20261025` · 상태: `complete` · 지도 자료 변경: `not-applied` · 색인일: 2026-10-25  
> 원문 최종 수정: 2026-10-25  
> 조사 기준: Web/App 소스 커밋 `c7549c04d7fa6a22242ebb166474ac19374efd3c`  
> 원본·출처: [자동 Pages 배포 #40192183265](https://github.com/kimjeon-il/Pando/actions/runs/40192183265), 이 범위의 JSON 명세와 화면 첨부

## 대상과 기준일

2026-10-25의 Pando `main`, `work/ui`, `work/objects`, `work/gis`, `work/places` 로컬·원격 및 기존 상설 워크트리 동기화다. 역사 형상 연구나 GIS 재생성은 포함하지 않는다.

## 근거와 방법

- 시작 main `9a727a61c2b4cf1afb958152a259d063843eaf7b`에 없는 원격 GIS 문서 커밋 `8c5b00afcc23493f45bb80e48870466056f334e0`를 이력 그대로 병합했다. 추가 내용은 북슐레스비히 원본·시각 증거 보존 게이트에 대한 문서 1줄이다.
- `c7549c04d7fa6a22242ebb166474ac19374efd3c`로 각 워크트리를 fast-forward하고, 다섯 origin 브랜치를 하나의 non-force atomic push로 갱신했다. 최종 실제 `ls-remote`, 로컬 ref, 워크트리 HEAD·브랜치·tracked 상태·핀·각 자료 마운트를 대조했다. 강제 푸시, reset, stash, 새 브랜치나 워크트리는 사용하지 않았다.
- 기존 canonical library 준비 API로 검증된 main의 immutable 자료를 재사용했다. 모든 런타임 핀과 마운트는 `e6b41735c1f6ebc174a14ecba887093346c8481b`다. 준비 전후 private 런타임 편집은 0개였고, 보고서의 다섯 owner ref는 준비 전후 그대로 유지됐다. 보고서 판본은 런타임 핀과 독립적으로 보존했다.
- UI의 미추적 Worker 11개 폴더, 내부 140개 파일을 전후 내용 해시로 대조했다. 파일 2,147,645바이트는 동일하며 커밋·삭제하지 않았다. 집계 SHA-256은 `f9ae73d6391d0f7af90045594908e00df7f1e0569a614e3cbbd3f2b4127dfb6a`다.
- 문서 외 변경이 없으므로 [이전 통합 집중 검증](../main-20261025/README.md)을 재사용했다. `generate-build-metadata.mjs --check`를 새로 실행해 통과했다. Web/App 소스와 생성물·자료 핀은 이전 main과 동일하다. 기존 실행 파일 SHA-256 `7b0a1f8b34dea033f6c4f5bda5c9638dc3b8e71bfe6d9372da118090a9bd30e2`를 확인했으며 앱 빌드·패키징·교체는 하지 않았다. 전체 테스트, 전체 C++ 빌드, GIS 검증·재생성은 실행하지 않았다.

## 확인 결과와 한계

- 로컬 브랜치 5개, 실제 원격 브랜치 5개, 상설 워크트리 HEAD 5개가 모두 최종 main SHA와 같다. [최종 refs·마운트 증거](branch-sync-final.json), [미완료 파일 보존 증거](branch-sync-preservation.json).
- main push로 시작된 기존 Web-only Pages workflow가 최종 SHA에서 성공했다. GitHub Pages deployment `7313019930`의 상태도 success다. 별도 workflow dispatch는 실행하지 않았다.
- [최종 게시 명세](pages-evidence.json)는 4,408파일, 643,379,745바이트이며 baseline 자료 commit은 위의 e6b41735다. 명세는 독립 게시 자료가 overlay된 최종 산출물이다. 실제 사이트의 index, build metadata, viewer, renderer, 공통 자료 정책, 자료 채널, 폰트 및 Worker 파일 2개 등 10개 파일이 HTTP 200이고 명세 SHA-256과 일치했다. 전체 사이트를 다시 내려받지는 않았다.
- 캐시 없는 새 Edge 브라우저(1440×900, WebGL2)에서 viewer 세계지도 표시를 확인했다. 표시 가능한 영토 254개, canonical mesh 준비 완료, renderer 차단 없음, 화면 readiness ready, 진단·page error·콘솔 경고·HTTP 오류 모두 0개다. 배경 첫 프레임 약 18.88초, 국가 첫 공개 약 20.62초였다. 이 한 번의 라이브 smoke 값은 고정 성능 보장이 아니다. [응답·진단 기록](branch-sync-live.json), [실제 화면](branch-sync-live.png).
- metadata의 assetRevision `0.36.0-build-f17a3f6cee8c`는 기존 검증된 산출물 정체성을 유지한다. 새 배포 SHA는 workflow·deployment·최종 파일 명세로 별도 검증했다.
- 이번 추가 변경은 문서뿐이므로 실제 WebView 재실행이나 사용자 사용성 검증을 새로 하지 않았다. 이전 집중 검증 결과와 이번 라이브 Web 확인을 구분한다.

## 데이터 반영과 정리

지도 자료 편집은 `not-applied`다. 코드·기존 승인 자료의 통합 및 브랜치 동기화만 수행했다. 이전 private 보고서·편집본, 공유 blob 원본, 상설 워크트리는 유지한다.

기존 준비 도구가 더 이상 핀·마운트·실행 중 소비자가 없는 다음 runtime view를 내용 검증 후 정리했다. 각 경로는 `D:/dev/PandoLab-library-data/.pando-cache/materialized/<owner>/127e51c3457df87786ecf3aa5ad98ded690928df`다.

| owner | 제거한 자료의 논리 바이트 | 관리 메타데이터 예상 바이트 |
| --- | ---: | ---: |
| ui | 719,838,777 | 574,823 |
| objects | 719,838,777 | 574,828 |
| places | 719,838,777 | 574,827 |

자료 바이트는 고정 archive index의 reports 제외 1,970개 파일 합계이며, 관리 메타데이터는 canonical manifest 직렬화 형식으로 산출한 예상치다. 대부분 공유 blob에 대한 hardlink 제거이므로 논리 바이트를 물리 디스크 회수량으로 해석하지 않는다. 준비 직전 D 여유 공간 58,918,653,952바이트, 준비·증거 생성 후 측정은 아래 정리 결과에 기록한다. 공유 blob과 현재 e6 runtime view는 활성 핀·마운트의 소비 대상이므로 유지한다.

작업 전용 스크립트·스냅샷·내려받은 명세·화면의 로컬 임시 복사본 10개 파일 2,582,004논리 바이트와 빈 디렉터리 1개를 증거 보관 후 제거했다. 보호 대상 미추적 Worker는 제외했다. 임시 복사본 정리 전후 D 여유 공간 실측 증가는 2,600,960바이트, runtime 준비 직전부터 정리 직후까지의 순증가는 1,740,800바이트다. 보고서 게시 전의 순간 실측이며 다른 디스크 쓰기의 영향도 받을 수 있다. [대상별 크기·정리 결과](cleanup.json)를 별도로 기록했다.

## 판본과 보관

새 통합·동기화 기록이며 이전 통합 보고서를 덮어쓰지 않는다. 보관 범위는 `reports/development/integrations/branch-sync-20261025`다. 이 범위만 publish-reports 및 원격 바이트 재검증을 수행한다.
