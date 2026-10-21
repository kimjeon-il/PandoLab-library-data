# 코드 변경과 검사 자동 선택·실행 연동

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-CHECK-AUTOMATION-20261019` · 상태: `local-validation / known-product-failures / unpublished` · 지도 반영: `not-applicable` · 색인일: 2026-10-20
>
> 원문 최종 수정: 2026-10-20
>
> 조사 기준: 웹·앱 `work/ui`, 기준 커밋 `ac7cb2d8b31107203c64930e7c65b901cf504780` + 이 보고서와 같은 변경의 검사 자동화 소스
>
> 원본·출처: [구현 계획](https://github.com/kimjeon-il/Pando/blob/d6530fcbb9261c902c21f6ba8c17d3d9d6cea849/docs/superpowers/plans/2026-10-19-check-automation.md), [실행 계약](https://github.com/kimjeon-il/Pando/blob/d6530fcbb9261c902c21f6ba8c17d3d9d6cea849/docs/architecture/check-automation.md), [검증 근거](../../../archive/blobs/5b0fd793bab65f5059b4b580123f110632503f489a735a98dec8c0d3604eeafc.gz)
로컬과 CI의 검사 목록·변경 감지·선행 조건·실행 경로를 연결했다. 제품 기대값을 코드에서 자동 복사하거나 실패한 기대값을 자동 수정하는 기능은 포함하지 않는다. 자동 실행 시점은 push/PR이며 로컬에서는 명령을 실행한다. 저장 감시기와 Git hook은 설치하지 않았다.
기존 `work/ui`의 Tauri 권한 파일, CRLF 차이 및 이전 미추적 Worker·브라우저 검증 자료를 보존했다. 제품 렌더러·C++·프로젝트 형식은 이 변경에서 수정하지 않았다. `main` 통합·push·공개 배포도 수행하지 않았다.
`scripts/contracts/application-checks.json`은 검사 가족, 명시적 HTTP/자료 연결, 수동 측정 사유와 선행 명령을 소유한다. `plan-application-checks.mjs`가 현재 테스트를 발견하고 기존 AST·제품 자산 소유자를 사용해 역방향 의존성을 계산한다. 현재 발견된 파일은 단위 검사 465개, 브라우저 spec 151개다. 이는 등록 파일 수이며 통과한 검사 수가 아니다.
`run-application-checks.mjs`를 `pnpm.cmd run check:affected`와 CI가 함께 호출한다. `--list`는 실행 대상과 선정 근거만 출력한다. 로컬은 merge-base 이후 커밋·index·작업 트리·미추적 파일을 포함하고, push는 before/head, PR은 merge-base/head를 비교한다. 비교 기록이 없으면 마지막 커밋만 검사하는 이전 fallback 대신 실패한다.

## 대상과 기준일
## 근거와 방법
## 확인 결과와 한계
## 데이터 반영
## 판본

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/aa431d81cf7dcbf6881a25b61950e881ecd301141178fd4a10a2082161b535da.gz) · 원본 SHA-256 `aa431d81cf7dcbf6881a25b61950e881ecd301141178fd4a10a2082161b535da`.
