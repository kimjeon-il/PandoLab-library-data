# 폐기 지도 조사 이력 제거 결과 (2026-10-28)

412,479,243 bytes의 기존 Git 압축 복구자료는 삭제 대상이다. 폐기 자료 이력과 현재 Git 객체 전환, 앱 핀 및 공개 배포는 완료했다. 이전 객체 폴더의 물리 삭제는 자동 승인 검토의 `blocked by policy` 거절로 미완료다. 의도적 정리 보류로 분류하지 않는다.

## 범위와 보존

- 기존 폐기 보고서 425개와 지정 GIS 원자료 등을 포함한 논리 대상 458개, 과거 별칭 883개 및 물리 경로 1,330개. 정확한 목록은 `purge-manifest.json`.
- 357개 commit을 처리했다. 기존 main, work, 과거 정리 브랜치와 지역 보호 참조를 유지했다. 앱 코드 이력은 재작성하지 않았다.
- 비공개 끊어진 트리에서 같은 폐기 범위의 보고서 5개(15,659 bytes)를 추가 식별했다. 폐기 전용 blob 856개가 현재 object store에 없다. 공유 자료 blob은 보존한다.
- 원본 blob 16,009개 중 14,915개 보존, 폐기 856개, 폐기 항목을 제거한 archive index 238개. 설명되지 않는 누락 0. 비공개 미발행 원본은 별도 keep-pack으로 보호한다.
- 현행 참조·작업트리·핀 21개 시점에서 비대상 파일의 mode와 blob ID가 동일하다. archive index만 폐기 항목을 제거했다. GIS 재생성이나 형상 일반화는 하지 않았다.
- 동결된 보고서 증거 내부의 과거 SHA는 원래 기록으로 남긴다. 실행 중 Git 조회에 쓰는 SHA와 현재 핀은 새 ID로 갱신했다. 대응표는 `commit-map.txt`.

## 반영

라이브러리 원격 참조 7개를 정확한 이전 SHA lease와 atomic push로 전환하고 원격 일치를 확인했다. 로컬 69개 참조와 5개 자료 작업트리, 보고서 소유 revision을 전환했다. 전환 직후 라이브러리 main은 `90035ff3334de0cf119793dedd0f2a6ce496a5a5`이며, 이 보고서 발행은 별도 후속 commit이다.

모든 현재 앱 핀은 `893176014602bd95e83112c4dcc3f5f7822f68f4`이다. 앱 원격 main은 `764048c8f323d4bdab89ea84ae465590945bbe57`, GIS는 `ff6518e03052efe9b4897b1e52c397113c079ce0`이다. 나머지 참조는 `app-commits.json`과 `app-remote-verification.json`에 기록한다. UI 원격에는 핀 변경만 게시했다. UI 로컬 미공개 5개 commit 및 기존 미커밋·미추적 작업은 유지했다.

## 실제 확인

- Git 독립 object store에서 alternates 제거 후 `fsck --full --no-dangling` 성공. 설치 후 connectivity 확인 성공.
- 합성 이력/공유 객체 회귀 검사 4/4, 수정 조회 코드와 앱 자료 계약 검사 18/18, 선택 파일 ESLint 및 diff whitespace 확인 성공.
- 새 핀의 웹 1,776개 파일(222,444,585 bytes), 앱 1,785개 파일(249,161,819 bytes) 산출물 확인. 앱은 메모리에서 map-data 실제 자료를 구성하여 별도 패키지나 설치 파일을 만들지 않았다.
- [Pages 실행 40646130597](https://github.com/kimjeon-il/Pando/actions/runs/40646130597)의 build/deploy와 원격 바이트 확인 성공. 별도 로컬 HTTP 재확인에서 핵심 파일 10개의 길이·SHA256, 코드/자료 identity 일치. 공개 지도에서 현재 시점의 국가·지형·도시 표시를 화면으로 확인했다.
- 별도 Application Architecture workflow는 이 작업의 관련 검사 범위에 포함하지 않았다. 전체 CI 성공으로 표현하지 않는다.

## 저장공간과 차단된 삭제

해시가 일치한 폐기 캐시 경로 495개(673,333,125 logical bytes)와 더 이상 참조하지 않는 pool 33개(44,888,875 logical bytes)를 제거했다. 15개 캐시 view의 ID와 현재 마운트·lease 경로를 갱신했다. 논리 bytes는 하드링크 중복을 포함할 수 있으며 실제 확보 용량과 같지 않다.

남아 있는 아래 산출물은 삭제 검토 차단 또는 미완료 삭제의 재개 기록이다. 저장소의 활성 참조나 alternates는 이전 객체 폴더를 사용하지 않는다.

| 경로 | 논리 bytes | 현 상태/구체적 사유 |
|---|---:|---|
| `.pando-store/history-rewrite/retired-objects` | 3,801,894,256 | 이전 객체 전체. 비대상 보존을 대조했으나 물리 삭제가 자동 승인 검토에서 차단됨. 412MB 복구 pack의 대부분도 이곳으로 분리됨 |
| `.pando-store/history-rewrite/superseded-compaction-journal.json` | 2,390,268 | 이미 대체된 compaction의 재실행을 막기 위해 비파괴 이동. 차단된 삭제 상태 추적 |
| `.git/pando-repack-cd9eaa3e-40f1-4936-b64c-50ae7610f643` | 4,204 | 이전 rev staging 잔여물. 원래 차단된 삭제 명령에 포함됨 |
| `D:/build/cache/pandolab/workspaces/0cb65fcaf5738f6d/pages` | 222,444,585 | 검사가 끝난 로컬 Pages 사본. 별도 삭제 명령도 자동 승인 검토에서 차단됨 |
| `.pando-store/history-rewrite`의 나머지 작은 파일 | `remaining-storage.json` 참조 | 승인된 전환의 manifest, 스크립트, tool 및 미완료 물리 삭제를 재개/검토할 기록. 보고서 사본과 구별 |

실행 직전 D: 여유 공간 약 57,111,797,760 bytes에서 마지막 측정 53,795,454,976 bytes로 감소했다. 새 object store와 차단된 이전 사본, 검증 사본 및 동시 작업이 포함된 관측치이며 정리로 확보한 공간이라고 주장하지 않는다. 최종 관측값은 `remaining-storage.json`을 따른다.

GitHub 원격 브랜치와 태그에서 폐기 이력을 제거한 결과이며, 서비스 내부의 과거 SHA 캐시나 다른 사용자의 복제본 삭제를 확인한 것은 아니다.
