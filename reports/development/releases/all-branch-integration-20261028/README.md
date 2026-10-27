# 모든 브랜치 main 통합과 재전파

> 보고서 ID: BRANCH-INTEGRATION-20261028 · 상태: synchronized-and-preserved
> 기준일: 2026-10-28 (Asia/Seoul)
> 최종 main: 23d66fc22cf3fa713c9ceff9443eefa401cd96a1
> 자료 핀: 429467eb60cbdc55a1dabb0f91270f1a3a9c046a

## 대상과 방법

fetch --all --no-prune 뒤 실제 로컬·원격 브랜치를 전수 확인했다. main, work/ui, work/objects, work/gis, work/places의 5개 이름만 존재했고 별도 브랜치는 없었다. 모든 상설 작업트리를 유지했다.

GIS 작업트리를 원격 eea327cf9까지 fast-forward한 뒤, 깨끗한 main에서 work/ui와 work/gis를 기존 이력 그대로 merge했다. Objects·Places는 이미 포함된 조상이었다. 이번 작업에서 cherry-pick·이력 재작성·강제 reset·stash·강제 checkout·강제 push를 사용하지 않았다. 양쪽에서 먼저 반영된 같은 시점 전환 수정도 그대로 유지됐다. 실제 병합 충돌은 없었다.

이후 각 상설 작업트리에서 main으로 fast-forward했다. 다음 명령 한 번으로 다섯 원격 브랜치를 원자적으로 갱신했다.

git push --atomic origin main:main main:work/ui main:work/objects main:work/gis main:work/places

## 보존 증거

- 시작 시 로컬·원격 끝 커밋 10개 모두 최종 main의 조상임을 확인했다. branch-preservation.json에 원래 ref와 SHA를 보관했다.
- 작업 전후 UI의 미완료 파일 79개의 SHA-256 목록이 모두 일치했다. 해당 네이티브·아이콘 변경은 커밋하지 않았다. 다른 네 작업트리는 깨끗했다.
- 실제 git ls-remote --heads와 로컬 브랜치 5개, 작업트리 HEAD 5개가 모두 위 최종 SHA였다.
- 다섯 config/library-data.json의 핀과 실제 assets/data junction 대상이 모두 429467eb에 일치했다. 기존 준비 모듈로 고정 캐시·마운트를 연결했고 보고서 판본은 기존 소유권 계약대로 보존했다.

## 포함된 변경과 자료

기존 UI의 네이티브 stage evidence·집중 CI 계약 수정, GIS의 과도한 북슐레스비히 세부 조사 도구·검사·workflow 정리, 네덜란드 해안 조사 범위와 검사 정리, 국가 존속기간 자료를 포함했다. 자료 저장소의 기존 f79836c5와 새 429467eb의 library.json을 비교했을 때 변경된 국가 객체는 17개이고 삭제된 객체는 없었다. 준비된 기존 산출물을 사용했으며 GIS를 재생성하거나 마운트 자료를 앱 Git에 추가하지 않았다.

## 집중 검증과 배포

관련 4개 파일의 단위 검사 19개가 통과했다. CI 검사 소유자 계약 13개·네이티브 빌드 인자 계약 3개, 새 네덜란드 사건·자료 구분 검사 3개를 실행했다. 실제 네이티브 컴파일이나 실행 파일 갱신은 하지 않았다. Web·공통 프런트엔드 소스는 직전 71c1b1795 배포와 동일하여 기존 브라우저 검증을 재사용했다. 전체 테스트·전체 아키텍처 검사·C++ 빌드·GIS 전체 검증은 실행하지 않았다.

main 푸시로 시작된 [Pages 40591293314](https://github.com/kimjeon-il/Pando/actions/runs/40591293314)의 build·deploy가 성공했다. 내려받은 pages-evidence.json 및 live.json을 보관했고, 별도로 verify-pages-deployment.mjs를 실행해 공개 사이트의 코드 SHA 23d66fc22·자료 SHA 429467eb와 핵심 응답 10개의 바이트·해시가 일치함을 확인했다. 결과는 independent-live.json이다.

## CI와 범위의 한계

통합 전에 GIS의 P2 40531710912는 builtin-world-compiler.mjs에서 undefined의 domain을 읽는 기존 생성 오류로 실패한 상태였다. 이번 동기화와 기존 실패를 구분했다. 이번 푸시로 자동 시작된 P1/P2/아키텍처 검사 중 일부는 최종 대조 시 아직 진행 중이므로 전체 CI 성공으로 보고하지 않는다. P3와 Pages의 성공, Git 동기화·보존 확인은 각각 별도 근거다. 후속 CI가 새 커밋을 만들 경우는 이 시점의 브랜치 SHA 확인 이후의 변경이다.

상설 브랜치·작업트리를 삭제하지 않았다. 별도 앱 패키징이나 수동 배포 workflow도 실행하지 않았다. 자료 준비 첫 실행에는 기존 저장소 보존·중복 pack 검사 시간이 포함됐으며, 이후 준비는 같은 공유 잠금 아래에서 소유자별 기존 준비 함수를 사용해 불필요한 중복 pack 유지보수를 반복하지 않았다.
