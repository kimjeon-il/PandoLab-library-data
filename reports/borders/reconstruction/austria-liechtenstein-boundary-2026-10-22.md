# 오스트리아–리히텐슈타인 국경과 스위스 삼중접점

> ID: GEO-AUT-LIE-20261022 · 상태: implemented / screen-delta-checked · 지도 반영: work-gis-only
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

공식 국가 폴리곤들의 공유선에서 추출한 두 끝점과 LSIB 끝점의 거리는 LV95 변환 후 약 0.195m·0.192m다. LSIB의 AUT/LIE·AUT/CHE·CHE/LIE 끝점은 동일 좌표를 공유한다. 국경 전체와 접합부의 후속 확인 결과는 아래 실행 결과를 따른다. 과거 날짜의 법적 국경 정확도를 검증한 것은 아니다.

## 실행 기록

자료 캐시를 같은 리비전의 다른 작업트리와 공유하므로, 본 조사 기록을 먼저 별도 자료 리비전으로 저장한 후 국가 파일을 수정한다. 검사는 관련 Python 테스트 파일 1회와 대상 3국 수치·지도 확인으로 한정한다. 문제 발견 시 해당 구간 적용을 중단하고 즉시 보고한다.

## 구현과 최종 확인

- 구현 코드: 5498d7bf90c6 (work/gis). 기존 생성기의 `--target AUT/LIE` 경로와 3국 공동 적용을 추가했다. 기존 일반 교체 경로는 같은 다국가 위상 검사 소유자를 사용한다.
- AUT/LIE 전체와 북·남 양쪽 AUT/CHE·CHE/LIE 가지 4개를 함께 교체했다. 인접 경계는 각 끝에서 최초의 실제 교차 접합점까지만 변경했다. 국가 ID·기간·부모 관계·나머지 모델 메타데이터·섬/구멍 수는 보존했다. C++ 정규화한 검토 사본과 실제 적용 파일의 바이트가 일치했다. 원래 b1f02ed6 자료 캐시의 대상 파일은 보존됐다.
- 공식 원본과 원본 LSIB 전체선 비교: 표본 최대 0.004653 CSS px, 표본 사이를 포함한 연속 상한 0.027409 CSS px.
- 최종 표시 형상과 공식 벡터의 양방향 화면 거리: 너비 2560 CSS px, flatZoom=64, 표본 간격 0.001도 및 반 간격 상한을 포함해 5구간 모두 0.5px 이하. 최댓값은 AUT/LIE 0.408809px, 나머지는 0.405133 / 0.350862 / 0.399783 / 0.391721px 이하. 실제 표본 최대는 0.181253px. PROJ 변환의 공시 정확도 1m는 별도 좌표 변환 한계이며 법적 경계 정확도를 보증하지 않는다.
- C++ 정규화 이후 3쌍의 면적 겹침 0, 3국 합집합 차이 0(경위도 평면 면적 단위). 국경 전체와 두 삼중접점에 동일 공유선을 사용한다.
- 관련 테스트 고유 9사례 확인. 최초 파일 실행 8사례 통과 후 실제 후보에서 접합점과 기존 정점이 약 7.7e-14도 차이로 중복되는 오류를 발견했다. 1e-11도 이내 수치 중복만 병합하도록 수정했다. 재실행에서 기존 8사례는 통과했고, 추가 사례의 닫힌 링 끝점 중복을 세던 테스트 기대값을 수정한 뒤 해당 사례만 다시 실행해 통과했다. 전체 테스트·린트·벤치마크는 미실행이다.
- 독립 코드 검토 1회: Important/Critical 지적 없음. 검토자는 검사·빌드·파일 수정을 실행하지 않았다.
- 국가별 편집용 청크, 현재 세계 파생본, 277개 내장 국가 파일과 전송 묶음, Web/App 목록 해시·크기 메타데이터를 재생성했다. 초기 로컬 연결에서 옛 목록 크기 때문에 로딩이 차단됐으며, 정식 메타데이터 생성기로 갱신해 해결했다. WASM·Windows 실행파일 재빌드는 하지 않았다.
- 로컬 웹 뷰어: 새 자료 정상 로딩 후 리히텐슈타인 검색·이동 확인. 앱 웹 화면: 평면지도 검색·이동 및 확대 표시 확인, 2560 CSS px 화면 근거 저장. 네이티브 Windows 실행파일 자체와 원격 배포본은 미확인이다.
- main 병합·원격 푸시·배포는 수행하지 않았다. 기존 기술 보류 37항목 중 AUT/LIE 1항목을 해소했고, 나머지 36항목 및 다른 보류 구간은 이번에 조사·교체하지 않았다.

### 근거 파일

- [정규화 후 5구간 정량 결과](../validation/diagnostics/aut-lie-2026-10-22/staged-review.json)
- [원본 전체선 정량 비교](../validation/diagnostics/aut-lie-2026-10-22/official-source-screen.json)
- [대상 후보·입력 해시](../validation/diagnostics/aut-lie-2026-10-22/aut-lie-candidate.json)
- [Pando에서 실행한 검토 사본](../validation/diagnostics/aut-lie-2026-10-22/review-target.py) — 외부 저장소에서는 실행하지 않음.
- [앱 평면지도 전체 화면](../validation/images/aut-lie-flat-2560-2026-10-22.jpg) / [삼중접점 부분 확대](../validation/images/aut-lie-junctions-2026-10-22.jpg)

원본 SHP ZIP·STAC·좌표 변환본·출처/권리는 `tools/historical-library/sources/swissboundaries3d-2025-01/`에 보존했다. 제품 형상은 LSIB이며 swisstopo는 독립 대조 근거로만 사용했다. 최종 자료 리비전은 해당 브랜치의 `config/library-data.json`을 따른다.
