# 현대 정착지 후보 데이터: GeoNames 1차 필터 감사

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

기준 코드: `01e80f04e48a825bf91775097585bf1d9723f2b6` (2026-10-02).
이번 산출물은 후보 추출·품질 감사이며, 배포 지명 데이터나 최종 자동표시 순위가 아니다.
기존 `assets/data/places/manifest.json`, Worker, 지도 렌더링, UI는 변경하지 않는다.
[공식 GeoNames dump](https://download.geonames.org/export/dump/)의 `cities500.zip`을 우선한다.
`allCountries.zip`은 공식 fallback 및 원천 누락 대조용이며, 원본 ZIP과 NDJSON 후보는
`reports/places/.cache/`에만 둔다. 둘 다 공식에서 수집되며 미러는 사용하지 않았다.
[공식 README](https://download.geonames.org/export/dump/readme.txt)는 UTF-8 탭 구분 19개 필드,
WGS84 좌표, CC BY 4.0을 명시한다. 데이터 정확성·완전성은 보장하지 않는다.
`cities500` 자체가 이미 인구 500 초과 또는 PPLA4까지 행정중심을 추린 원본이므로
아래 '원본 전체'는 GeoNames 전체 DB 행 수와 같지 않다. 전체 DB 대조 수치는 별도로 표기한다.
canonical 포함 정의는 `tools/build-place-candidates.py`의 `candidate()` 하나다.
featureClass == P AND (
  featureCode in {PPLC, PPLG, PPLA, PPLA2}
  OR (featureCode == PPL AND population >= 50,000)
)
코드의 의미는 [공식 feature code 표](https://www.geonames.org/export/codes.html)에 따른다.
PPLC·PPLG의 inclusionReason은 `capital`이며 PPLG가 반드시 법적 수도라는 뜻은 아니다.
PPLA·PPLA2는 인구가 0이어도 유지한다. PPLA3 이상이나 다른 P 코드는 인구가 커도 포함하지 않는다.
일반 PPL은 5만 미만을 제외한다. 이름, 국가, 인접성은 포함 조건이 아니다.
누락 인구는 0으로 정규화하되 원본의 빈 인구 필드 건수를 별도로 센다.

## 출처와 정책
## 재현과 결과 파일
## 사람이 검토한 결과와 다음 단계
### 기술적 판정
### 한국: 전체 113개를 확인한 sanity check
### 나머지 5개 국가: 표본 해석
### 세계 과다 수록과 중복 의심
### 세계 과소 수록과 낮은 인구
### 다음 단계에서 필요한 판단
### 검증·실패·보존 범위

---
[작성 당시 원문(무손실 압축)](../../archive/blobs/12d055358dd2c9c728afe07f0e687ca7fe08dce67995ec0dc8dbbefbf6f47068.gz) · 원본 SHA-256 `12d055358dd2c9c728afe07f0e687ca7fe08dce67995ec0dc8dbbefbf6f47068`.
