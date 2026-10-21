# 라이브러리 외부 분리 — 2026-10-21

> ID: `DEV-LIBRARY-MIGRATION-20261021` · 상태: `published / web-live-verified / native-unverified` · 지도 반영: `not-applicable`
> 원문 최종 수정: 2026-10-21 (한국) · 이번 갱신은 기존 증거 정리이며 새 검사 결과가 아님.

## 이전 결과

`kimjeon-il/PandoLab-library-data`에 객체·런타임 자료·GIS 원자료·보고서를 보관하고, Pando에는 앱·웹 코드와 생성기·계약·fixture·테스트를 남겼다. 원본 코드 기준은 `75499e014542747def35653a73b753e208ed0d31`이다. 이전 후 코드와 자료를 모두 push했다.

| 브랜치 | 반영 코드 | 짝인 자료 |
| --- | --- | --- |
| main | `73a53411` | `ac0f5306` |
| work/ui | `3f6ffc83` | `f4ae4d70` |
| work/objects | `9a8349db` | `0ef646d9` |
| work/gis | `2cd77335` | `a09a1de5` |
| work/places | `4a7ee7a8` | `cd0698ab` |

표는 보고서 최종 보관 전 자료·WASM 조합이다. 보고서 보관으로 main 자료 핀이 추가 변경될 수 있다. 기존 Git 이력과 관련 없는 작업·원본 파일은 보존했다. 활성 참조는 새 저장소로 변경했고, 원본 로그와 동결 fixture의 역사적 URL은 보존했다.

## 압축과 지형

- main 이전 대상 4,518개: 원본 701,256,514 bytes → 경로별 압축 크기 합 474,463,359 bytes. 같은 내용은 archive blob을 공유한다. 기존 지형·추가 편집 객체 표현은 이 비교에 포함하지 않는다.
- 자료 main 전체 트리: 1,389,329,035 bytes, 고유 Git blob 합 1,387,007,759 bytes. Git 과거 이력·로컬 캐시 크기는 별개다. 지형이 854,964,279 bytes로 가장 크다.
- 긴 보고서는 발췌 열람본과 무손실 압축 원문을 연결한다. 전체 출처·결론·미확인 내용은 원문을 따른다. 런타임 바이트·해시·좌표를 보존했으며 GIS 재계산·단순화를 하지 않았다.
- 지형은 `terrain/v0.13.3/` 한 벌만 현재 트리에 유지한다. LOD0~5는 배율 단계이며 중복 판본이 아니다. 타일 픽셀은 재압축하지 않았다. terrain 게시 커밋은 `7f1be1f7`이다.

## 이미 확보한 배포·실행 증거

웹 소스 `73a53411a955a0b58110d9b1150ec5122ba9a4f1`의 [Pages 실행 39584435702](https://github.com/kimjeon-il/Pando/actions/runs/39584435702)가 성공했다. [공개 웹](https://kimjeon-il.github.io/Pando/)에서 지도 준비 완료, 객체 254개, WebGL2, 공식 지형 v0.13.3의 6/6 타일 로딩과 page error 0건을 기록했다. 선택·편집 기능 검증을 뜻하지 않는다.

웹 HTML·build-meta·세계지도 manifest·국가 index와 자료 서버 지형 manifest·LOD5 표본 타일은 HTTP 200 및 원본 해시 일치를 확인했다. 폐기한 v0.13.0 manifest는 404였다. 아직 독립 게시하지 않은 library-channel manifest의 404는 기본 자료 사용 경로이며, 독립 게시 성공 증거는 아니다.

웹 staging은 1,699파일 / 189,259,753 bytes, 앱 full-world staging은 2,026파일 / 229,801,150 bytes였다. staging 기준 코드는 `06faf630`이며 네이티브 빌드·실행 결과가 아니다.

## 범위와 남은 사항

이전에 Pando에서 자료 helper·Pages staging·P2 캐시 관련 최소 회귀 검사를 수행했다. 이 보고서 갱신에서는 재실행하지 않았다. 자료 저장소에서 테스트·validator·GIS 재생성을 실행하지 않았다.

네이티브 앱 재빌드·실행은 미검증이다. 독립 자료 게시에는 Pando의 `PANDOLAB_LIBRARY_WRITE_TOKEN` 설정이 별도로 필요하다. 로컬 바로가기 생성은 명령 후크 차단으로 미완료다. 보고서 commit 후 요청된 후속 웹 배포는 위 기존 배포와 구분해 작업 응답에 기록한다.

원본 증거는 `D:/dev/release-evidence/PandoLab/`의 `library-live-parity.json`, `library-live-browser.json`, `library-migration-live.png`, `library-capacity.json`, `library-migration-state.json`, staging 증거와 focused 검사 로그에 보존했다. 기존 자료·branch별 원본은 같은 위치의 `library-migration-originals/`에 보존했다.
