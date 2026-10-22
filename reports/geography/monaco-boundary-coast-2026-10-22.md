# 모나코–프랑스 국경과 모나코 해안 교정

> 압축 열람본: 도입부 발췌. 전체 출처·결론·미확인 내용은 연결한 원문을 따른다.



> 보고서 ID: GEO-MCO-20261022 · 상태: implemented / focused-review · 지도 반영: work-gis-only
> 수정: 2026-10-22 · 구현 코드: fae66fb9 · 입력 자료: b5ebf0fb6fc134ef3e6d27331f65ca28af69eed2
> 최종 자료 판본은 해당 브랜치 config/library-data.json 참조. main 병합·push·배포 없음.

## 대상과 자료

사용자 승인에 따라 현재 대표 형상의 FRA/MCO 육상 국경, 모나코 해안 전체 및 프랑스 측 필수 접합부를 교정했다. 국가 ID·존속기간·버전 ID·부모·이름·과거 형상은 유지했다. 프랑스의 이전 안도라 교정 및 다른 국경 보충 기록도 보존했다.

- 육상: 미국 국무부 LSIB 11.4, 발행 2025-02-24. 원본 선 260점과 원본 master 해시를 보존했다. https://geodata.state.gov/geonetwork/srv/api/records/3bdb81a0-c1b9-439a-a0b1-85dac30c59b2
- 해안: IGN BD TOPO v3 WFS의 `limite_terre_mer`, 만조선 `Plus hautes eaux`. Monaco `TRONLAIS0000002478911964`, 서쪽 `TRONLAIS0000002478911965`, 동쪽 `TRONLAIS0000002478912821`. 모나코 해안은 1,795점이다. EPSG:4326 응답을 직접 사용했다. https://www.data.gouv.fr/dataservices/api-geoplateforme-diffusion-dobjets-wfs
- 해안 속성의 확인일 2021-11-01, DB 수정일 2024-09-23, 수집일 2026-10-22를 구분한다. `published: null`이며 수정일을 발행일·측량일로 바꾸지 않았다. 데이터의 FR 국가 코드 속성을 영토 귀속 근거로 쓰지 않았다.
- IGN 라이선스는 Licence Ouverte / Open Licence 2.0이다. 저작자·수집일·접점 수정과 원본 응답 해시를 기록했다. https://www.ign.fr/institut/des-donnees-et-logiciels-ouverts-au-service-de-la-nation
- 육상 비교: IGN `commune`의 Cap-d'Ail·La Turbie·Beausoleil·Roquebrune-Cap-Martin. 탐색 단계에서 끝점을 투영해 추출한 국경 호와 LSIB의 연속 거리 상한 약 0.120 CSS px였다. 이 추출은 정식 양국 승인선 검증이 아니다.

CNIG의 2022년 기록은 양국이 공동 디지털 국경선을 만들었고 2023년 DB 반영 및 후속 승인을 예정했다고 설명한다. 후속 정식 승인 여부는 이번에 확정하지 않았다. https://cnig.gouv.fr/monaco-a25929.html

Mareterra 사업 원문은 해상 구조물 완료를 2019년 12월, 간척지 형성을 2020년, 개장을 2024-12-04로 구분한다. 2024년 개장일을 국경·해안 형성일이나 국가 존속 시작일로 입력하지 않았다. 현재 형상만 교정하며 새 역사 버전은 만들지 않았다.

[무손실 압축 원문](../../archive/blobs/7d19c689376a07bb20f5ede15cd8d4c448b97f6d94fe080d21ef9f0b83740996.gz)
