# 모든 브랜치 main 통합 — 2026-10-26

현재 main ccaeaf521을 기준으로 로컬·원격의 미병합 이력을 통합한다. 기존 지형·hover·클릭 수정과 최신 자료 핀68380579를 보존한다. 미커밋 수정·다른 워크트리를 수정하거나 실제 프로필 정리를 실행하지 않는다.

초기 상태는 baseline.json에 기록했다. GIS 원격31개, Objects4개 고유 커밋이 대상이며 UI는 동일하고 Places는 이미 조상이다. Objects의 오래된 핀63aebba는 작업 브랜치용 유지이며 main을 되돌리는 의도가 아니므로 통합 결과에서는 최신68380579를 유지한다.

독립 사전 검토에서 GIS의 Windows staging 경로 검사 문제를 확인했다. 기존 합성 회귀 테스트로 실패를 확인한 뒤, 이 문제에 한해 최소 통합 수정을 적용한다. 전체 GIS 재생성·동종 자료 전체 검사·네이티브 앱 빌드는 실행하지 않는다.

## 통합 결과

최종 main dc70cbf0480f48fa3672d9979cb11927af6719ea에 모든 로컬·원격 브랜치 이력이 포함된다. GIS31개와 Objects5개의 분기 전용 커밋을 포함했고, Windows staging 수정 및 Objects 병합 커밋3개를 더했다. `main..브랜치` 미병합 수는 전부0이다. 다른 작업 브랜치에 쓰기 작업을 하지 않았다.

Objects 병합에서 텍스트 충돌은 없었지만 구판 자료 핀63aebba가 자동 적용되는 것을 확인했다. 해당 한 필드만 최신 main의68380579로 유지했다. 최신 지형·hover·클릭을 포함한 앱·웹 전체 소스, 자료 핀, Pages workflow는 ccaeaf521과 byte-identical이다.

Windows 합성 테스트에서 staging 경로 오류를 재현한 뒤 platform-safe relative/isAbsolute 검사로 수정했다. sibling/root/absolute 이탈 회귀를 추가했고 관련14개, Objects 임시파일·합성SQLite 검사를 포함해 총44개가 통과했다. 마지막 확인 중 Objects의821ee920d가 새로 커밋·푸시되어 추가로 병합했고, 관련30개를 다시 통과시켰다. lint와 diff 검사도 통과했다. 실제 GIS 재생성·실제 C프로필 청소는 실행하지 않았다.

GEOS/PROJ 네이티브 검사는 동일 GIS소스43412a2fe의 원격40323665189가 통과한 것을 재확인했다. 로컬 네이티브 빌드·전체GIS생성·전체검사는 하지 않았다.

작업 시작 시 모든 워크트리는 clean이었다. 마무리 중 UI에서 시간선 관련 미커밋 수정이 새로 생겨 별도 진행 작업으로 보존했다. UI의 파일·인덱스·HEAD에 쓰기 작업을 하지 않았으며, 관찰한 경로와 해시는 integration.json에 기록했다. 미커밋 변경을 임의로 커밋·공개하지 않았다. Objects의 동시 작업에서 새로 만들어진 공개 커밋은 최종main에 포함했다.

## 경계와 보존

이 결과의 ref·미커밋 상태는 integration.json의 observedAt 시점 관찰이다. 다른 채팅에서 계속 작성하는 UI 변경은 자동으로 커밋하거나 브랜치에 반영하지 않는다. 소스 브랜치의 자료 핀과 보고서 소유자 revision도 main 값으로 덮어쓰지 않았다. 기존 main의 별도 P2 토큰 미설정·Shared C++ WASM source/binary 해시 문제는 이번 통합 범위에서 변경하지 않았다.

## 실제 공개 배포 확인

Pages40326591353의 build/deploy가 모두 성공했고, 현재 공개 사이트의 코드·자료 identity/manifest10개를 다시 받아 해시를 확인했다. sourceCommit은 dc70cbf0480f48fa3672d9979cb11927af6719ea, dataCommit은68380579다. 직전 지형·hover·클릭 배포ccaeaf521과 frontendInputSha256 동일 여부는 false이다. 실제 배포 증거는 release/에 보관했다.

frontendInputSha256은 scripts/lib/frontend-build.mjs:107에서 sourceCommit과 생성된 build-meta/HTML 등까지 포함한다. 따라서 통합 후 identity hash가 달라지는 것은 정상이며 소스가 되돌아갔다는 의미가 아니다. 원본 앱·웹 소스의 Git diff는 비어 있고, 현재 공개 viewer-map/gpu-terrain-preparation/gpu-map-renderer3개 모듈의 바이트 해시도 직전 수정 배포와 동일하다. 현재 Canvas Worker까지4개 실응답이 최종 배포 산출물의 해시와 맞는 것을 별도로 확인했다(release/runtime-module-live.json).
