# 국가별 원본 분리와 LSIB 11.4 육상 국경 보충

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `GEO-WORLD-20261021` · 상태: `implemented-partially / provisional` · 지도 반영: `work-gis-only` · 색인일: 2026-10-21  
> 조사·수정 기준: `work/gis`, 원본 커밋 `4c7f30453fc5de61efd1ab0fb03d7fdaa92fe3a7`  
> Web/App 공통 라이브러리 자료 수정. main 병합·push·배포 및 앱 실행파일 빌드 없음.
국가·지역 객체 281개를 각각 `source/countries/state-*.json`으로 분리했다. 이름·존속기간·날짜별 형상은 해당 객체가 소유한다. 
계보 262개는 `source/lineages/`의 참조 전용 schema 2 파일이다. `source/views/world.json`은 258개 객체/버전의 표시 선택 목록이며 공통 기준일이 없다. 
날짜 없는 가져오기는 객체에 명시한 대표 버전을 사용하고 `sourceReferenceDate: null`을 기록한다. 날짜를 지정하면 해당 객체의 기간으로만 조회한다. 
역사 뷰어의 날짜 있는 출력 쿼리는 별도 `historical-publication.recipe.json`에 둔다. 출력 날짜를 전 세계 관측일이나 국가 수립일로 사용하지 않는다.
LSIB 11.4 발행일은 2025-02-24이다. 이 날짜는 각 경계의 법적 효력일이나 현지 관측일로 확정되지 않았다. 날짜가 있는 역사 형상을 현대 LSIB로 교체하지 않았다.
- 원본: [미 국무부 LSIB 공식 목록](https://geodata.state.gov/geonetwork/srv/api/records/3bdb81a0-c1b9-439a-a0b1-85dac30c59b2), [공식 배포 ZIP](https://data.geodata.state.gov/LSIB.zip). 미국 정부 관점의 자료이며 법적·역사적 정답을 보증하지 않는다.
- 원본 395개 벡터와 전체 속성은 `tools/historical-library/sources/lsib-11.4/boundaries.geojson.gz`에 별도 보존했다. 43,179,013 bytes. 원본 ZIP/SHP/DBF/master 해시와 권리·판본은 같은 폴더의 `provenance.json`, upstream README/XML에 기록했다.

## 대상과 기준일
## 근거와 방법
## 확인 결과와 한계
## 데이터 반영과 검증
## 최종 실행 기록
## 전부 보류한 경계
## 부분 보충 후 남은 옛 구간
## 판본

---
[작성 당시 원문(무손실 압축)](../../archive/blobs/d97f12fb4d95bf9172bfb620852dc7996be9670817ed36453de0f78f088ef631.gz) · 원본 SHA-256 `d97f12fb4d95bf9172bfb620852dc7996be9670817ed36453de0f78f088ef631`.
