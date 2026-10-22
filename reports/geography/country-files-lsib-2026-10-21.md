# 국가별 원본 분리와 LSIB 11.4 육상 국경 보충

> 압축 열람본: 도입부 발췌. 전체 출처·결론·미확인 내용은 연결한 원문을 따른다.



> 보고서 ID: `GEO-WORLD-20261021` · 상태: `implemented-partially / provisional` · 지도 반영: `work-gis-only` · 색인일: 2026-10-21  
> 조사·수정 기준: `work/gis`, 원본 커밋 `4c7f30453fc5de61efd1ab0fb03d7fdaa92fe3a7`  
> Web/App 공통 라이브러리 자료 수정. main 병합·push·배포 및 앱 실행파일 빌드 없음.

## 대상과 기준일

국가·지역 객체 281개를 각각 `source/countries/state-*.json`으로 분리했다. 이름·존속기간·날짜별 형상은 해당 객체가 소유한다. 
계보 262개는 `source/lineages/`의 참조 전용 schema 2 파일이다. `source/views/world.json`은 258개 객체/버전의 표시 선택 목록이며 공통 기준일이 없다. 
날짜 없는 가져오기는 객체에 명시한 대표 버전을 사용하고 `sourceReferenceDate: null`을 기록한다. 날짜를 지정하면 해당 객체의 기간으로만 조회한다. 
역사 뷰어의 날짜 있는 출력 쿼리는 별도 `historical-publication.recipe.json`에 둔다. 출력 날짜를 전 세계 관측일이나 국가 수립일로 사용하지 않는다.

LSIB 11.4 발행일은 2025-02-24이다. 이 날짜는 각 경계의 법적 효력일이나 현지 관측일로 확정되지 않았다. 날짜가 있는 역사 형상을 현대 LSIB로 교체하지 않았다.

## 근거와 방법

- 원본: [미 국무부 LSIB 공식 목록](https://geodata.state.gov/geonetwork/srv/api/records/3bdb81a0-c1b9-439a-a0b1-85dac30c59b2), [공식 배포 ZIP](https://data.geodata.state.gov/LSIB.zip). 미국 정부 관점의 자료이며 법적·역사적 정답을 보증하지 않는다.
- 원본 395개 벡터와 전체 속성은 `tools/historical-library/sources/lsib-11.4/boundaries.geojson.gz`에 별도 보존했다. 43,179,013 bytes. 원본 ZIP/SHP/DBF/master 해시와 권리·판본은 같은 폴더의 `provenance.json`, upstream README/XML에 기록했다.
- 분쟁 보호 근거: [Natural Earth v5.1.1](https://github.com/nvkelso/natural-earth-vector/tree/v5.1.1/10m_cultural)의 분쟁선과 0.15도 주변 구간, 별도로 지정한 보호 국가 쌍. 이 완충은 보수적인 제외 규칙이며 분쟁의 정확한 범위 판정이 아니다.
- 기존 공유 경계와 LSIB가 실제 교차하는 지점 사이만 양쪽 국가에 동일하게 적용했다. 해안 접점이나 삼합점을 임의의 직선으로 연결하지 않았다. 교차점 밖의 옛 끝부분은 유지했다.
- 후보 위상 검토는 Shapely, 최종 제품 형상 정규화는 기존 C++ 계산 코어를 사용했다. 별도의 런타임 형상 소유자는 추가하지 않았다.
- 원본 좌표는 보존하고 표시 파생본만 0.0004도 허용치로 단순화했다. 고

[무손실 압축 원문](../../archive/blobs/52110267275117ef3736f83188a89db604a1d5330f6a3558bc8e947144e57753.gz)
