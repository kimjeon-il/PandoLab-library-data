# 현대 정착지 후보 정제: ID별 근거 검토

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

최초 검토일: 2026-10-03; 지역별 후속 검토일: 2026-10-04. 원본은 공식 GeoNames 2026-10-01 스냅샷이다.
기준 cities500 스냅샷을 교체하지 않으며 지도 데이터·Worker·UI·배포 manifest를 변경하지 않는다.
- `candidate()`의 전 세계 1차 정의를 유지한다. 수도·PPLA/PPLA2 및 인구 기준 일반 정착지 정책은 기존 [감사 문서](place-data-audit.md)와 같다.
- 구·읍·면·동·borough·ward 등 내부 미세 지명은 출처와 객체 ID가 확인된 경우에만 별도 정제본에서 제외한다.
- 이름 키워드, 같은 이름, 가까운 좌표, 인구 0을 삭제·병합의 근거로 사용하지 않는다.
- `auto-review`는 표시 확정이 아니다. 최종 rank/minZoom/지역 중심성은 계산하지 않는다.
- 중요한 PPLA3·저인구 정착지는 `inclusion-review`로만 남긴다. 이번 단계에서 자동 승격하거나 국가별 대량 예외표를 만들지 않는다.
근거·판단의 canonical 입력은 `reports/places/candidate-reviews.json`이다. source SHA-256 및 각
ID의 이름·국가·코드·좌표가 원본과 맞지 않으면 다시 검토해야 하므로 생성은 실패한다.
판단은 `exclude`(확인 제외), `hold`(불확실 보류), `retain`(원래 후보 유지),
`inclusion-review`(필터 밖 예외 검토)로 구분한다. 원본 속성을 바꾸는 override가 아니다.
python -X utf8 tools/build-place-candidates.py review
python -X utf8 -m unittest discover -s tests -p test_place_candidates.py -v
- 원래 `.cache/candidates.ndjson`과 `geonames-statistics.json`은 그대로 보존한다.
- `.cache/refined-candidates.ndjson`은 이번 확인 제외·보류 ID만 뺀 별도 후보 풀이다. 나머지는 미검토 원본 후보다.
- `candidate-review-summary.json`과 아래 표는 같은 source·검토 입력에서 네트워크 없이 생성한다.

## 유지한 규칙
## 산출물과 재현
### 유럽 5개 권역의 확정 제외 최초 적용
### 유럽 보류 190건 1차 재검증 (2026-10-04)
### 유럽 잔여 보류 137건 2차 재검증 (2026-10-04)
## 이전 감사 해석 정정
## 두 번째 검토 묶음: 한국의 옛 중심·중복점과 일본 합병 지명
## 세 번째 검토 묶음: 중국 동명 도시·내부 구와 인구 범위
## 네 번째 검토 묶음: 서유럽 1차 정체 검토
### 확인 방식과 판단 수준

---
[작성 당시 원문(무손실 압축)](../../archive/blobs/07b99997addd1674e739dcae7cbe97c67ef702e18f7d31a1df8200c6ebd2edd2.gz) · 원본 SHA-256 `07b99997addd1674e739dcae7cbe97c67ef702e18f7d31a1df8200c6ebd2edd2`.
