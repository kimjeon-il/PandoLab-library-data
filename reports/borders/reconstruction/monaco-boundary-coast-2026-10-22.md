# 모나코–프랑스 국경·해안 — 1:1,000만 적용 기록

> GEO-MCO-20261022 · 2026-10-28 범위 축소 · 기존 구현: `work/gis only` / 현재 배포 확인 아님

## 핵심 형상·사건

현재 모나코(MCO)와 프랑스(FRA)의 육상 공유선 및 양쪽 해안 접점을 함께 교정했다. 기존 모나코 대표 형상이 지나치게 넓었던 문제가 있어, 당시 적용 결과 모나코 면적은 약 2.0765km²가 됐다. 실제 C++ 정규화 자료에서 FRA/MCO 중첩 면적은 0, 공유선은 일치하며 국가 ID·기간·다른 형상 버전은 유지했다. [압축된 형상 정합 기록](../validation/diagnostics/monaco-2026-10-22/normalized-review.json)은 해당 적용 당시의 자료로, 역사 정확도 인증이 아니다.

육상 자료는 [미국 국무부 LSIB 11.4](https://geodata.state.gov/geonetwork/srv/api/records/3bdb81a0-c1b9-439a-a0b1-85dac30c59b2), 해안 자료는 [프랑스 IGN BD TOPO v3](https://www.data.gouv.fr/dataservices/api-geoplateforme-diffusion-dobjets-wfs) (Open Licence 2.0)이다. 조립에 사용한 IGN 만조선은 현대 현황이며 과거 시점까지 그대로 소급하지 않는다. [Mareterra](https://mareterra.com/en/) 매립은 형성·개장 시점(2024-12-04 개장)을 구분하며, 개장일을 해안 형성일이나 국경 변경일로 대체하지 않는다.

모나코의 1,795개 해안 정점을 따라가는 반복 검증, 0.05px 편차 증거, GIS 후보 중간 산출물·로그·스크린샷은 1:10m 표시 범위를 초과하여 삭제했다. 다만 모나코 같은 작은 국가 자체와 그 공유 경계·핵심 해안 형상은 삭제하지 않는다. 법적 해상 경계와 독립된 과거 해안 위치는 이번 작업에서 확정하지 않았다.
