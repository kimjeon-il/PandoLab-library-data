# 오스트리아–리히텐슈타인 국경과 스위스 삼중접점

> ID: GEO-AUT-LIE-20261022 · 상태: investigating · 지도 반영: not-applied
> 기준 코드: f91c165318b778ea0ecae68ddf02348468bc3f6d · 입력 자료: b1f02ed6cafc991d82eaaa42ae00d64c9ac83b87

## 승인 범위

AUT/LIE 국경과 양 끝의 AUT/CHE·CHE/LIE 접합부만 교체한다. 국가 ID·기간·다른 국경은 보존한다. work/gis에서만 작업하며 main 병합·푸시·배포는 포함하지 않는다.

## 조사 근거

- LSIB 11.4, 2025-02-24 공개. 발행일은 법적 국경 변경일이 아니다. 원본: https://data.geodata.state.gov/LSIB.zip
- swisstopo swissBOUNDARIES3D 2025-01, 생성 2024-12-18. Liechtenstein 객체의 원자료 연도 2024, 개정 2025-01. 공식 벡터 원본: https://data.geo.admin.ch/ch.swisstopo.swissboundaries3d/swissboundaries3d_2025-01/swissboundaries3d_2025-01_2056_5728.shp.zip
- 원본 ZIP SHA256: 3c0e0bd73fe32e4fa6a103ae5e4d008466b52eeaa2d00e7ab42aa2a453c2cc5a. 좌표계 LV95/LN02(EPSG:2056), 국가 폴리곤 원본 열람.
- swisstopo OGD는 출처 표시를 조건으로 이용·가공·재배포 가능: https://www.swisstopo.admin.ch/en/terms-of-use-free-geodata-and-geoservices
- 오스트리아 BEV VGD 2024-10-01: https://data.bev.gv.at/geonetwork/srv/api/records/f7b698de-7f87-482c-97dd-33ebaf32fe40 (메타데이터 열람, 원본 미열람, 이번 수치 대조에는 미사용).

## 확인 결과와 한계

기존 AUT/LIE 공유선은 14개 변이며 LSIB와 교차점이 없다. 기존 끝점과 LSIB 끝점의 차이는 평면 지도 너비 2560 CSS px·flatZoom=64 기준 북쪽 약 5.61px, 남쪽 약 11.90px다. 이는 자료 간 차이이며 법적 오차가 아니다.

공식 국가 폴리곤들의 공유선에서 추출한 두 끝점과 LSIB 끝점의 거리는 LV95 변환 후 약 0.195m·0.192m다. LSIB의 AUT/LIE·AUT/CHE·CHE/LIE 끝점은 동일 좌표를 공유한다. 국경 전체 선형·최대 화면 이탈·후보 위상·로컬 지도는 아직 미확인이다.

## 실행 기록

자료 캐시를 같은 리비전의 다른 작업트리와 공유하므로, 본 조사 기록을 먼저 별도 자료 리비전으로 저장한 후 국가 파일을 수정한다. 검사는 관련 Python 테스트 파일 1회와 대상 3국 수치·지도 확인으로 한정한다. 문제 발견 시 해당 구간 적용을 중단하고 즉시 보고한다.
