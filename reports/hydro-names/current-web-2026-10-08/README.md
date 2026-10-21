# 현재 웹 수계 무명 인벤토리 (2026-10-08 UTC)

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

대상은 `https://kimjeon-il.github.io/Pando/`의 실제 내려받은 **hydro v0.13.1**이다. 웹 `main` 조사 기준은 `fd6744f5e72a0c1a107452dbde6d416ab57237db`. 배포 build-meta와 hydro manifest가 이 SHA의 파일과 byte-for-byte 일치한다. dataRevision은 `data-3665a413a39994ae112a4eac75d78341`, buildId는 `0.36.0-build-f5040d34a1f5`. 배포 자체의 Git commit SHA는 공개 build-meta에 없으므로 main SHA와 동일한 배포 commit이라고 단정하지 않는다. 표시 관련 worker/property 코드 3개도 배포와 main이 일치한다.
- 강: **MAIN_RIV 기준 논리 묶음 3,818개**, geometry feature **15,193개**.
  - 의미 있는 대표명 **363개**. 모두 한국어 표기가 들어 있다.
  - 대표명 미해결 **3,455개**: `미명명 수계 <ID>` **3,444개** + `river-<숫자>` **11개**.
  - 이 중 **3,450개**는 배포된 name/mainstemNameKo/aliases/tributaryNames에 의미 있는 이름이 없다.
  - **5개**는 대표명이 placeholder지만 관련명/지류명은 있다. 본류명 검증 전 자동 승격 금지.
- 호수: 논리 객체/geometry feature **1,355개**. 한국어 명칭 **745개**, `lake-<숫자>` placeholder **610개**. 후자 610개의 원천 name_ko/name_en/name_original은 모두 공란.
- 따라서 이번 배포에는 **의미 있는 외국어명이 존재하지만 한국어명만 빠진 별도 대표명 그룹은 0개**다. 빈값과 숫자 placeholder를 구별하지 않으면 호수 610개와 강 11개를 명명된 것으로 오집계한다.
- 전체 논리 객체 5,173, geometry feature 16,548. 독립된 자연 하천 개수라고 해석하면 안 된다.
`inventory.json.gz` / `inventory.csv.gz`: 전수 목록. `priority-candidates.json`: 강의 표시 본류 길이순 30개 + 호수 표시 면적순 30개. `summary.json`: 수치·기준·입력 SHA-256. 압축하지 않은 목록은 스크립트 재실행으로 생성된다.

## 확정 요약
## ID와 원천 구조
## 표시 문제와 실제 누락 구분
## manifest 통계 차이의 재현 가능한 원인
## 우선 조사 방향
## 재현

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/1dc5bf7cbbab91e6d6e72707cfc95139a96d7764da70773ecd5d7e488eb54378.gz) · 원본 SHA-256 `1dc5bf7cbbab91e6d6e72707cfc95139a96d7764da70773ecd5d7e488eb54378`.
