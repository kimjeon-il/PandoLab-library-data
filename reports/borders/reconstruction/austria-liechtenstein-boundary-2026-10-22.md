# 오스트리아–리히텐슈타인 국경 — 1:1,000만 핵심 기록

> GEO-AUT-LIE-20261022 · 2026-10-28 범위 축소 · 기존 구현: `work/gis only` / 현재 배포 확인 아님

## 유지할 결과

오스트리아(AUT)–리히텐슈타인(LIE) 공유 국경과 북쪽·남쪽 스위스(CHE) 접점의 교정 적용을 기록한다. 세 국가의 객체 ID·존속기간·부모·기존 이력과 다른 국경은 변경하지 않았다. 적용 당시 C++ 정규화 대상의 공유 국경 세 쌍에서 중첩 면적은 0, 세 국가 합집합 변경량은 0으로 보고됐다. 당시 결과는 [최종 위상 기록](../validation/diagnostics/aut-lie-2026-10-22/staged-review.json) 참조.

선택한 현행 자료는 [미국 국무부 LSIB 11.4](https://data.geodata.state.gov/LSIB.zip) (2025-02-24 발행)이고, [swisstopo swissBOUNDARIES3D](https://www.swisstopo.admin.ch/en/terms-of-use-free-geodata-and-geoservices) 2025-01 벡터를 독립 보조 자료로 대조했다. swisstopo 원본 ZIP의 당시 SHA-256은 `3c0e0bd73fe32e4fa6a103ae5e4d008466b52eeaa2d00e7ab42aa2a453c2cc5a`; 좌표계 EPSG:2056이다. 발행일은 법적 국경 변경일이 아니다.

정밀 삼중접점의 0.2m 단위 차이, 서브픽셀 수치 비교, 검토용 고밀도 후보 벡터·화면 이미지·진단 Python은 1:10m 역사 영토 표시 목적에 불필요하여 현행 보고 자료에서 폐기했다. 위상·정체성 확인은 유지하되 독립 역사 기준선에 대한 검증으로 확대 해석하지 않는다. 실제 국가 정본·생성 레시피 및 운영 자료는 변경하지 않는다.
