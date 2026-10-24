# 동독 경계 보충과 전후 비교 — 2026-10-22
> 내독 육상 보류 목록은 [후속 조사·적용](east-germany-vg25-followup-2026-10-22.md)으로 일부 갱신됨. 국제국경·기존 검증 기록은 이 판본을 따른다.

> ID: GEO-DDR-LSIB-VG25-20261022 · 상태: local-applied / provisional · main·원격·배포: 미반영
> 작업: work/gis, 기반 2bb8bc58967b. 자료 기준 pin 36818f327b5d7a423dbf51db79106197786b69f6에서 생성. 최종 자료 revision은 앱 config/library-data.json에 기록.

동독의 **1989-04-25 참고 형상**을 보충했다. 전 존속기간 전체를 역사적으로 검증한 자료가 아니다. 국가별 원본과 현대 DEU/POL/CZE 객체, 존속기간(1949-10-07~1990-10-02), 해안선·서베를린은 유지했다.

## 적용과 보류

|구간|처리|
|---|---|
|폴란드 접경|현재 독일에 채택된 LSIB 유래 선형을 재사용. 기존 선과 교차하는 63개 arc; 기존 채택 범위는 대략 위도 51.8366~53.2529°의 중부다.|
|체코 접경|같은 독일 객체의 작센 외곽만 재사용, 59개 arc. 바이에른은 포함하지 않았다.|
|옛 내독경계|샤알제(Schaalsee) 호수 통과부 3개 arc만 VG25. 현 주경계와 옛 국경의 동일성을 설명하는 관리기관 문헌과 공식 1:50,000 호수 지도를 대조했다.|
|보류|엘베 미확정 경계·하구, 노이하우스/Neu Bleckede/Neu Wendischthun/Stiepelse/Bohldamm 이관 지역, 주변 샤알제 육상, Geisa/Point Alpha·Heldburgerland/Rodachtal·하르츠·베라 등 나머지 내독경계. 튀링겐 상세 도엽은 접근 제한으로 실물을 확인하지 못했다.|
|유지|해안·해상·서베를린 및 현대 독일에도 LSIB가 적용되지 않은 폴란드/체코 구간. 기존 형상의 정확성이 확인됐다는 뜻은 아니다.|

VG25 창은 [10.903,53.54,10.958,53.659]. 옛 NE 우회부를 포함하도록 창을 잡았지만 새 호수 통과선은 실제 교차점 사이에만 들어간다. 세부 범위는 geometry-proof.json과 recipe를 따른다.

## 사진자료

각 이미지의 **왼쪽 기존판 / 가운데 수정판 / 오른쪽 중첩**은 중심·배율·패널 크기가 같다. 파랑은 경계, 주황 점선은 기존 경계다. 제품 화면 캡처와 별개인 원본 좌표 비교도다.

- [전체와 보류 위치](east-germany-boundaries-2026-10-22/comparison-overview.png)
- [폴란드 LSIB 비교](east-germany-boundaries-2026-10-22/comparison-poland.png)
- [체코 LSIB 비교](east-germany-boundaries-2026-10-22/comparison-czech.png)
- [샤알제 VG25 확대 비교](east-germany-boundaries-2026-10-22/comparison-schaalsee.png)

국제국경 비교는 평면지도 2560 CSS px·flatZoom=64와 같은 455.11px/°. 샤알제는 변화 확인용 3300px/° 확대도이며 제품 상한보다 확대했다. **독립적인 당시 벡터와 비교하지 않았으므로 역사적 0.5px 통과를 주장하지 않는다.**

## 구현·확인

- 기존 C++ GEOS/PROJ recipe에서 NE 기준 형상을 만든 뒤 교차점 사이만 대체한다. 원래 NE 외곽 clip은 상세선을 지우지 않도록 선행한다. LSIB 정점의 double 정밀도를 보존한다. VG25 원본은 보존하고 표시 입력만 0.0002°로 파생했다.
- 폴리곤 6→6, 좌표 4108→5752; 타국 원본 SHA 동일, 유효성·접합·보류 구간/구멍 보존 확인. 창 밖은 수치 반올림 3e-12° 범위로 유지.
- 실제 가져오기에서 발견한 면적 사실상 0의 삼각형 4개는 기존 Boolean 결과 정규화의 감사 경로로 처리한다. 엄격한 원본 검사는 유지. 폐기는 닫힌 3점 shell·폭≤2e-12°·면적≤0.1m² 등 제한 및 명시적 감사 기록에만 허용한다. 감사는 imports 내부에 저장한다.
- 최종 집중 확인: native/launcher 8개, 역사 형상 Python 6개, 가져오기·수치 조각 관련 6개 통과. 전체 검사·벤치마크는 미실행.
- 앱 웹셸 가져오기/Undo/Redo, 실제 GPKG 인코딩 후 웹 파일뷰어 재개방 및 형상·감사 기록 동일성 확인. Windows 네이티브 실행파일/실제 WebView 실행은 미확인.

## 출처·보존

- LSIB 11.4 (2025-02-24 자료)의 **기존 독일 채택본**: [US DOS](https://geodata.state.gov/). 독일 객체 sourceId/원본 hash와 적용 arc는 고정한 adopted-german-lsib-exterior.geojson에 보존.
- [BKG VG25 WFS](https://sgx.geodatenzentrum.de/wfs_vg25), 2026-10-22 실제 응답 EPSG:25832, CC BY 4.0. 문서/카탈로그 판본이 달라 관측일로 단정하지 않음. 원본·해시는 bkg-vg25-provenance.json 및 recipe에 보존.
- [Schaalsee 관리기관의 국경 연속성 설명](https://www.schaalsee.de/flipbook/naturschutzprojekte/12/), [SH 공식 호수 지도](https://umweltanwendungen.schleswig-holstein.de/Seen/seen/schaalsee_seedorfer_tief/schaalsee_nord-west_einz.gif) (1:50,000, 배경 지도 제작연도 미확인).
- 사전 조사와 조약/1993년 이관/미확정 엘베 근거는 [현대 자료 재사용 조사](../historical-border-modern-source-reuse-2026-10-22.md)를 따른다.
- before/after-source, geometry-proof, web-app-proof, 비교 PNG, 압축 출처·GPKG 증거는 같은 이름의 하위 폴더. 국가 원본·원 GIS는 외부 자료 저장소, 생성기·계약·테스트만 앱 저장소에 둔다.
- Recipe SHA-256: ded2be76070035763363afe67c333118adb34762ff7f81346822d2909bac8797.

초기 후보의 넓은 VG25 창은 근거 범위가 부족해 최종본에서 제거했다. 초기 앱 확인의 구형 JS history 기대 및 정적 편집모드 날짜 기대는 현 C++ 계약으로 갱신했다. 완료 표시는 위 최종 결과에만 적용한다.
