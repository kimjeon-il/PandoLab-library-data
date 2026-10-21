# 사이첸빙하 시아 라–빌라폰드 라 구간 지형검증

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

검토일: 2026-10-08  
브랜치: \`research/siachen-rgi7-outline\`  
판정: **지형 데이터 대조 완료 / AGPL 정밀 보정 미실시 / 기존 국경·실효지배 도형 변경 없음**
- **Copernicus DEM GLO-30 Public**(2021 AWS COG): \`Copernicus_DSM_COG_10_N35_00_E076_00_DEM.tif\`, 약 30m 공간해상도, 표면고도 모델(DSM).
  - [공식 AWS 자료 소개](https://registry.opendata.aws/copernicus-dem/)
  - [Copernicus DEM 제품 안내](https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM)
  - 사용 원본: https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_N35_00_E076_00_DEM/Copernicus_DSM_COG_10_N35_00_E076_00_DEM.tif
  - 다운로드 입력 SHA-256: \`362c08afd374afb88ac380a34b3ac3536e750f2d339d259075f01e659073473f\` (40,237,865 byte).
  - 주요 측량원: TanDEM-X 2011~2015, 일부 과거 자료로 공백 보간. 관측 연도·고도 기준계가 다른 출처와 완전히 일치하지 않으므로 현재의 현장 측량으로 간주하지 않는다.
- **OSM AGPL 근사선:** OpenStreetMap relation 13559521, 2026-10-04 스냅샷을 바탕으로 공개 재구성한 190점 LineString. [출처](https://www.openstreetmap.org/relation/13559521) / [자료 파일](siachen_agpl_osm_candidate.geojson). ODbL 1.0.
- **빙하 비교자료:** RGI 7.0 \`RGI2000-v7.0-G-14-20040\` (2002-07-10 촬영·관측일), [자료 파일](siachen_glacier_rgi7.geojson).

## 1. 입력 자료
## 2. 방법과 검증
## 3. 시아 라~빌라폰드 라 구간 결과
## 4. 통로 좌표의 비교
## 5. 주요 추가 검토 구간
## 6. 판단 및 다음 단계
## 7. 생성한 결과 파일

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/63c955ec41cd3023b357f502d25cc9fffb921acbaf06c8645a0289f3d98893bd.gz) · 원본 SHA-256 `63c955ec41cd3023b357f502d25cc9fffb921acbaf06c8645a0289f3d98893bd`.
