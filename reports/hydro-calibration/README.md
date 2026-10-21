# 판도연구소 수계 자료 캘리브레이션 보고서

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

이 보고서는 Natural Earth 전 세계 기본 수계를 유지한 상태에서 HydroRIVERS/HydroLAKES 보충 후보를 유럽·북미·호주의 Natural Earth 1:10m 보충 레이어와 같은 화면 밀도로 맞춘 1차 분석 결과입니다. 아래의 원래 비교 결과와 이미지는 보존했으며, 이후 성능 우선 절대 밀도 기준을 채택한 v0.12.1 적용 결과는 `후속 적용` 절에 별도로 기록합니다.
지역별 밀도를 억지로 맞추는 대신 전 세계에 같은 중요도·면적 기준을 적용했습니다.
- 강 중요도: `ORD_STRA + 4×log10(DIS_AV_CMS) - 0.5×log10(UPLAND_SKM)`
- 강 단계 임계값: `14.4744 → 12.4307 → 11.2137 → 10.7957`
- 호수 최소 면적: `50㎢`, 표시 단계 `250㎢ → 100㎢ → 50㎢`
- 총 객체: 17,672개
- 원본 좌표: 4,532,876개
- 압축 자산: 17,458,770 bytes (약 16.65MiB)
- pack 789개, 공간 인덱스 타일 809개, 최대 pack 약 1.64MiB
- Natural Earth 기본 수계 잔여 중복: 강 0.68%, 호수 0.19%
- 한반도 범위: Natural Earth 강 8개 + Hydro 강 18개, Natural Earth 호수 1개 + Hydro 호수 5개
선택된 원본 좌표는 줄이지 않았습니다. 같은 ID의 Natural Earth 강 조각과 같은 표시 단계의 Hydro reach만 MultiLineString/연결 수계 단위로 묶었습니다. 실행 자산의 상세 수치는 [`performance-v0.12.1.json`](../../archive/blobs/1c2cc03b65dea1a4e18ffa9bc90627ef15dfc857bcc0be13d0098559207b62a5.gz)에 기록합니다.
**보류 · 현재 제약으로는 전 세계 교체에 사용할 수 없습니다.**
- 통과: `riverFinalWithin15Percent`
- 미통과: `intermediateScreenWithin25Percent`
- 미통과: `lakeFinalWithin20Percent`
- 통과: `baseOverlapBelow2Percent`
- 통과: `representativeFeaturesPresent`
세 기준 지역에 지역별 예외값을 두지 않고 같은 공식과 같은 단계 임계값을 사용했습니다. 비교 비율은 실제 표시 조합인 `(Natural Earth 기본 + Hydro 보충) / (Natural Earth 기본 + Natural Earth 보충)`이며 1.0에 가까울수록 같은 밀도입니다. 미통과 항목이 하나라도 있으면 런타임 자료를 교체하지 않습니다.

## 후속 적용 — v0.12.1 성능 우선 기준
## 결론
## 최적 탐색값 (합격 기준 미달)
## 지역별 결과
### 유럽
### 북미
### 호주
### 한반도
## 연결 체인과 전 세계 예상치
## 대표 수계 확인

---
[작성 당시 원문(무손실 압축)](../../archive/blobs/f6cdfdec374d33034f41b94787bfd6294905801207398204ec5d6d361009f3ce.gz) · 원본 SHA-256 `f6cdfdec374d33034f41b94787bfd6294905801207398204ec5d6d361009f3ce`.
