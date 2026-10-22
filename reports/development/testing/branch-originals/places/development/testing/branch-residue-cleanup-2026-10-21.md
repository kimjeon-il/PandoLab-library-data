# places 브랜치의 잔여 파일 정리

> 압축 열람본: 도입부 발췌. 전체 출처·결론·미확인 내용은 연결한 원문을 따른다.



> 보고서 ID: `DEV-CLEANUP-PLACES-20261021` · 상태: `local-focused-verified / uncommitted / unpublished` · 지도 반영: `not-applicable` · 색인일: 2026-10-21  
> 원문 최종 수정: 2026-10-21  
> Web/App 공통 기준: `6fc982bfe1b3f13c0ce9988af0a73d1358f0be2b` + 이번 미커밋 정리 및 기존 작업 상태  
> 원본·근거: [정리·보관 목록](/D:/dev/release-evidence/PandoLab/branch-cleanup-20261021/places-result.json), [작업 전 상태](/D:/dev/release-evidence/PandoLab/branch-cleanup-20261021/places-preflight.json)

## 범위와 보관 방식

사용자가 승인한 상설 main·objects·gis·places 정리 계획을 적용했다. 필요한 완료 증거는 외부 보관하고, 재사용 빌드·SDK·의존성·앱 실행물·현재 자료·원본 지도/문헌·미완성 작업은 유지했다. 새 워크트리, stash/reset/clean, 커밋·push·통합·배포는 수행하지 않았다. UI 기능 수정은 다른 브랜치로 옮기지 않았다.

이 브랜치에서 **178개 항목**, **108,288,342바이트**를 작업 폴더에서 제거했다. 여기에는 구형 테스트 21개, 옛 Worker 실행 묶음의 파일 102개, 옛 세계지도 객체 24개와 완료된 진단·검증 자료 등이 포함된다. junction 항목은 링크 자체만 제거하고 공유 대상은 따라가지 않았다.

외부 보관소는 `D:/dev/release-evidence/PandoLab/branch-cleanup-20261021/`이다. `files/places/`에 원래 경로를 유지하고 각 파일을 SHA-256으로 검증했다. 동일 내용은 외부 보관소 안에서만 hardlink로 중복 제거했으며, 작업 파일과 보관본을 hardlink로 연결하지 않았다. 링크는 대상 경로를 목록에 기록했다. 결과 JSON에는 파일별 크기·SHA-256·제거 사유·원래 위치가 남아 있다. 소스 수정 전 판본은 `source-before/`, 보고서 수정 전 바이트는 `modified-files-before/`에 있다. 이는 작업 폴더 정리량이며 디스크 전체 순증가·순감소량을 뜻하지 않는다.

## 생성 자산 목록 수정

현재 world manifest에 없는 옛 객체 18개가 P2 검증 기록의 디렉터리 전체 출력 목록에 남아 있었다. 사용자가 목록 수정까지 승인했다.

- 기존 생성 자산 소유자인 `scripts/lib/p2-artifact-graph.mjs`와 graph 설정에서 world-bundle 출력 범위를 **현재 manifest 및 현재 자산 5개**로 제한했다. 옛 객체를 모두 출력으로 간주하는 디렉터리 선택을 제거했다.
- 기존 staging의 검증 기록 작성 코드를 `recordArtifactReceipts`로 모아 같은 소유자가 기록하도록 했다. 선택한 family의 검증 완료 후 호출하며, 출력 누락 시 기록하지 않는다. unrelated family

[무손실 압축 원문](../../../../../../../archive/blobs/75bdc1385c1239c0fb866a1d646d2707d59c8280126148e879a141da4fb16aa6.gz)
