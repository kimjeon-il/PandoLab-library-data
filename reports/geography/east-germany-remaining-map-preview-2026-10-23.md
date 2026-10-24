# 동독 남은 구간 — 벡터 탐색과 첫 지도 정합본

> 보고서 ID: GEO-DDR-MAP-PREVIEW-20261023 · 상태: investigating / preview-ready · 지도 반영: not-applied
> 기준일: 1989-04-25 · 코드: e945add7 · 고정 자료: 00aa69a52b4b2d56fcfbd7e5b8ceba173776527b

사용자 지시대로 기존 벡터를 우선 탐색하고, 종이지도 기반 복원은 **정합본을 먼저 보여준 뒤 사용자 확인을 받고 추적**한다. 이번에는 라체부르크호–메호어호 북쪽의 첫 정합 미리보기를 준비했다. 새 경계선은 그리지 않았고 국가 원본·파생 자료·기간은 변경하지 않았다. 검사·벤치마크·빌드·배포도 실행하지 않았다.

## 첫 정합본

LAiV M-V 공식 TK25AS WMS에서 이미 좌표가 부여된 래스터를 EPSG:25832로 받았다. 범위는 E613016–623016 / N5952750–5962750m, 1800×1800px, 약 5.56m/원본 px다. 직접 GCP를 골라 변환한 것이 아니며 기존 동독선이나 VG25에 맞춰 지도를 이동·회전·왜곡하지 않았다.

기관의 일반 설명은 1981–87년 판본이라고 하지만 GetFeatureInfo로 해당 도엽을 직접 조회한 결과는 다음과 같다. 일반 설명을 개별 도엽 연도로 대신하지 않았다.

| 도엽 | 발행 | 내용 기준 | 확보 상태 |
|---|---|---|---|
| N32082DA Lüdersdorf | 1991 | 1989 | 원지도와 첫 중첩 미리보기 확보 |
| N32082BC Lübeck–Schlutup | 1992 | 1989 | 도엽 정보만 조회 |
| N32082DD Mustin | 1991 | 1989 | 도엽 정보만 조회 |
| N32106BB Neuhaus (Elbe) | 1991 | 1988 | 도엽 정보만 조회 |

발행년과 내용년이 다르며, 1989의 정확한 개정 월일은 제공되지 않았다. **1989-04-25의 정치 경계가 그대로 보존되었다고 아직 확정하지 않았다.** WMS 범례 역시 당시 종이지도 고유 범례로 입증되지 않았으므로 과거 정치 경계 기호 판독에 그대로 적용하지 않는다. 국경·철책·주경계·물가를 구분할 추가 원문 대조가 필요하다.

첫 미리보기의 왼쪽은 기관 정합 원지도, 오른쪽의 주황은 기존 동독 외곽, 파랑은 현재 고정 VG25 후보다. 오른쪽 두 선 모두 새로 추적한 1989년 기준선이 아니다. 원본과 중첩 그림은 동일한 좌표 범위를 사용하고 미리보기의 종횡비를 유지했다.

- 기관 정합을 재사용한 상태이며 독립 체크포인트 잔차는 **미측정**이다.
- 독립 당시 기준선을 벡터화하지 않았으므로 역사적 0.5 CSS px 검사도 **미실시**다.
- 사용자가 정합본을 확인하기 전에는 해당 지도에서 경계를 따지 않는다. 확인 후에도 판본·귀속이 해결된 범위만 적용 후보가 된다.

원지도·범례·고해상도 중첩·1140×840px 미리보기는 외부 자료 체크아웃의 `.working/00aa69a52b4b2d56fcfbd7e5b8ceba173776527b/private-evidence/ddr-map-preview-2026-10-23/`에 보존했다. 이번 서비스의 공개 재사용 조건이 일반 OpenData 페이지와 일치하는지 추가 확인이 필요하여 원본을 자동 공개 보관 경로에 넣지 않았다. 현재는 내부 검토용이다. 공개 앱에 사용할 벡터 파생물의 이용권을 확보했다고 주장하지 않는다.

## 남은 구간 자료 탐색 현황 (첫 탐색, 부재 확정 아님)

| 구간 | 확인한 벡터/지도 후보 | 현재 판단 |
|---|---|---|
| 북부 호수·하천 | 기존 VG25; LAiV TK25AS WMS, 직접 받은 Lüdersdorf 도엽 | 정합본 준비. 당시 도엽 고유 정치 경계·범례·판본 확인과 사용자 검토 전 추적 보류 |
| 엘베·노이하우스 | VG25 현대 주경계; Neuhaus 내용 1988 도엽 조회; BKG VG-Hist | 1993년 이관을 소급하지 않음. 미확정 엘베는 단일 현대선으로 확정하지 않음 |
| 알트마르크·오레·드뢰믈링 | 고정 VG25; Sachsen-Anhalt 역사 지도 아카이브 목록 | 현재 열린 DTK 과거판 다운로드는 2004년 이후라 1989 원도로 쓰지 않음. 당시 TK25 목록은 원문 지도 미확보 |
| 하르츠 나머지 | VG25; Sachsen-Anhalt 보유 당시 TK25 목록; 기존 LGLN 사료 | 개별 미확인 구간에 현대 벡터를 아직 추가 적용하지 않음 |
| 아이히스펠트 남부·벤데바흐·베라·뢴 | VG25; Thüringen 역사 지도/항공사진 제공처 | 적합한 당시 도엽 실제 확보 전. 이동성 하천에 현대선을 소급하지 않음 |
| 바이에른 서쪽·체코 삼중접점 | VG25; GeoSN TK25AS 1976–89 제공 설명과 WMS 목록 | 개별 판본·범위·접합점 확인 전. 도엽 설명만으로 형상 채택하지 않음 |
| 폴란드·체코 국제국경의 미채택 부분 | 기존 채택 DEU LSIB; BKG VG-Hist의 Oder/Neisse 처리 설명 | 적용 가능한 독립 1989 상세 벡터 추가 확보 못함. LSIB 밖을 자동 확장하지 않음 |

전국 역사 벡터 BKG VG-Hist는 실제로 존재한다. 다만 문서상 VG1000에 근거하고 일부는 더 일반화되어 있어 이번 상세 교체선으로 채택하지 않았다. 다운로드 목록은 확인했으나 실제 ZIP 요청은 HTTP400으로 실패하여 원본 형상은 미열람이다. 이 후보의 존재를 해당 구간의 상세 벡터 확보 완료로 계산하지 않는다.

## 출처·증거

- [LAiV 역사 지도 제공 설명](https://www.laiv-mv.de/Geoinformation/Karten/Historische-Karten/), [GeoPortal.MV 서비스 설명](https://www.geoportal-mv.de/portal/Suche/Metadatenuebersicht/Details/WMS%20Historische%20Topographische%20Karten%201:25%20000%20MV%20(WMS_MV_TK25-AS)/b9466e6c-715d-4c4c-b79f-af2fb3a9d426)
- [WMS GetCapabilities](https://www.geodaten-mv.de/dienste/tk25as_laiv_wms?REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.3.0), 원본 XML·GetMap URL/해시는 근거 폴더의 capture-manifest.json, 실제 도엽 응답은 *-sheet-info.html 및 additional-sheet-info.json
- [LAiV 이용조건, 2024-06-09](https://www.laiv-mv.de/static/LAIV/Geoinformation/Dateien/240609_VGB_AGNB.pdf), [OpenData 제공 설명](https://www.laiv-mv.de/Geoinformation/Open_Data_Angebot/). WMS는 내부 이용·외부 이용을 구별한다. 지도 표기 © GeoBasis-DE/MV 2026 유지.
- [BKG VG-Hist 문서](https://sg.geodatenzentrum.de/web_public/gdz/dokumentation/deu/VG-Hist.pdf), [다운로드 목록](https://daten.gdz.bkg.bund.de/produkte/vg/vg-hist/aktuell/)
- [Sachsen-Anhalt OpenData 지도 판본](https://www.geodatenportal.sachsen-anhalt.de/gfds/de/gdp-open-data.html), [당시 지도 아카이브 목록](https://recherche.landesarchiv.sachsen-anhalt.de/Query/detail.aspx?ID=1408714) — 목록 검색 결과만 확인, 개별 지도 미열람
- [GeoSN TK25AS 설명](https://www.landesvermessung.sachsen.de/tk25-as-topographische-karte-1-25-000-ausgabe-staat-ddr-6608.html), [지도 서비스 목록](https://www.landesvermessung.sachsen.de/topographische-karten-4984.html)
- [Thüringen 역사 지도 다운로드](https://geoportal.geoportal-th.de/gaialight-th/_apps/dladownload/dl-histkart1.html) — 당시 필요한 도엽 확보 완료로 표시하지 않음

[직전 실제 적용](east-germany-remaining-stage2-2026-10-23.md)의 동독 형상과 체코슬로바키아 중첩 문제 상태는 이번 조사로 바뀌지 않았다.

후속: 사용자가 10km·30km 정치본을 확인하고 작업을 승인했다. [북부 두 구간 VG25 적용 보고서](east-germany-ratzeburg-mechow-applied-2026-10-23.md)에서 실제 변경·확인·잔여 보류를 기록한다. 이 미리보기 작성 당시의 미적용 상태와 후속 적용 상태를 구별한다.
