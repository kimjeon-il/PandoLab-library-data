# 동독 남은 육상 구간 추가 적용 — 2026-10-23

> 보고서 ID: GEO-DDR-STAGE2-20261023 · 상태: local-applied / provisional · 지도 반영: work/gis only
> 조사·작업 기반: 앱/웹 94d021ce · 자료 f8114d67 · 기준일 1989-04-25

**글라제하우젠 동쪽 육상 3개 선분과 무스틴–그로스투로 숲 2개 선분을 고정 VG25로 추가 교체했다.** 원본·국가 gzip·내장 세계 전송 묶음·메시·메타데이터를 함께 갱신했다. main 병합·푸시·배포는 하지 않았다. 현대 독일·폴란드·체코 객체, 기존 LSIB, 해안·서베를린·존속기간은 보존했다.

| 적용 구간 | 허용 창 (경도/위도) | 근거와 제외 범위 |
|---|---|---|
| 글라제하우젠 동쪽 육상 | 10.17–10.19 / 51.453–51.474 | 니더작센 Das Eichsfeld(2002), 인쇄 p.17/PDF p.18의 1990-10-03 경계 승계 명시와 인쇄 p.18/PDF p.19의 1990년 7월 통행로 개요. 기존 북부 아이히스펠트 창과 접하는 부분만 적용. 벤데바흐·베라 제외. |
| 무스틴–그로스투로 숲 | 10.915–10.945 / 53.679–53.694 | 라우엔부르크 군의 옛 내독경계=현재 SH/MV 주경계 명시, 1990-09-12 샤알제 법령 §2(2)4의 공통 서쪽 주경계, 1945년 교환지 연혁 대조. 현행 공식 DTK25로 육상임을 육안 선별. 쿨피너 제·바서크뤼거 제와 다른 호안·하천 제외. |

## 근거와 판본

- [니더작센 Das Eichsfeld](https://www.mk.niedersachsen.de/download/57145/Peter_Aufgebauer_u.a._Eichsfeld_-_Ein_deutscher_Grenzraum._Niedersaechsische_Landeszentrale_fuer_politische_Bildung._Niedersachsen_-_vom_Grenzland_zum_Land_in_der_Mitte._Folge_6_._Hannover_2002._PDF_2.196_KB_124_Seiten_..pdf): 2002년 간행, 수록 통행로 개요는 1990년 7월. 직전 조사 폴더 원본 SHA d3c78d03…b9d 재사용. 개요도는 측량 벡터가 아니다.
- [라우엔부르크 군 샤알제 사업 설명](https://www.kreis-rz.de/Adressen/Zweckverband-Schaalsee-Landschaft-.php?ModID=9&FID=327.1042.1) 및 [군 연혁](https://www.kreis-rz.de/Politik-und-Verwaltung/Der-Kreis-Herzogtum-Lauenburg/), [1990년 법령](https://www.gesetze-im-internet.de/natpschaalseev/DDNR514770990.html). 보호구역 전체 외곽을 정치 경계로 쓰지 않았다.
- [SH DTK25](https://service.gdi-sh.de/WMS_SH_DTK25_OpenGBD), CC BY4.0, © GeoBasis-DE/LVermGeo SH: 현재 1:25,000 지형도의 육상/수계 선별만 수행. 역사 기준 지도로 취급하지 않음.
- [GRENZHUS 2023 소식지](https://www.grenzhus.de/wp-content/uploads/2023/12/Newsletter-2023_Nummer-1.pdf) PDF p.8과 [2024 소식지](https://www.grenzhus.de/wp-content/uploads/2025/01/Newsletter-2024_final.pdf) PDF p.8은 1973년 획정·호안과 수역의 구별을 보여준다. 이 때문에 나머지 북부 호안은 일괄 교체하지 않았다.
- DVW Hessen/Thüringen 1/2015 PDF p.38의 불변 경계 설명은 바이에른/튀링겐 레헤스텐 사례다. 아이히스펠트의 직접 근거로 사용하지 않았다. TLBG 56호 원문은 CAPTCHA로 확보하지 못했으며 검색 요약만으로 적용하지 않았다.

선형은 새 지도에서 따지 않고 기존 BKG VG25 고정 캡처 SHA F19CC299…D573, EPSG:25832, CC BY4.0의 표시 파생본(0.0002°)을 재사용했다. 기존 C++ 생성기의 실제 교차점 사이 접합을 유지했다. **문헌상 경계 연속성에 따른 provisional 보충이며, 독립된 1989년 벡터와 0.5 CSS px 정량 대조는 미실시다.**

## 내장 세계에서 발견한 기존 별도 문제

개별 라이브러리 gzip은 동독 원본과 일치한다. 날짜별 내장 세계는 기존 unknown-peer-overlap 정책 때문에 **체코슬로바키아 원본과 겹치는 동독 국제국경 주변 약 78.553km²를 제외**한다. 제거 범위는 경도 12.2391–14.4898 / 위도 50.1713–51.0372다. 이번 생성 전 고정 자료 f8114d67의 내장 세계에도 있던 동작이다. 이번 두 육상 창은 내장 세계와 원본의 선형이 일치하며, 직전 내장 세계 대비 창 밖 경계는 부동소수점 수준으로 보존된다. 원본 전부가 내장 세계에 무변형으로 전달된다고 주장하지 않는다. 이 문제를 해결하려면 체코슬로바키아의 역사 경계와 공유 선형·귀속 정책을 함께 다뤄야 하므로 이번 두 육상 창 교체에 섞지 않았다. [연결 증거](east-germany-remaining-stage2-2026-10-23/runtime-proof.json) · [범위 증거](east-germany-remaining-stage2-2026-10-23/compiled-scope-proof.json).

## 실제 변경과 최소 확인

6개 폴리곤 유지, 좌표 7809→7845. 대칭차 0.585105km²(역사적 오차나 영토 획득량이 아님). 허용 창 밖 경계 차이는 부동소수점 수준(1.78e-15°). ID·기간·참조일·가져오기 정책과 DEU/POL/CZE 원본 해시 동일.

형상 회귀 9개와 실제 가져오기/메시 회귀 1개 통과. 새 회귀는 생성 전 두 구간 변경량 0으로 실패했고 생성 후 통과했다. 웹·앱 단일 통합 사례 통과: 앱 가져오기·Undo/Redo·원본 보존, 동일 GPKG의 웹 재개방에서 형상과 감사 기록 일치. 브라우저 오류 없음. 준비 메시 326개 중 324개 재사용. 전체 검사·벤치마크·Windows 실행파일 재빌드는 하지 않았다. 브라우저 앱 웹셸 확인과 Windows 네이티브 앱 확인은 구분한다.

## 비교 자료와 보존

[전후·중첩 상세 그림](east-germany-remaining-stage2-2026-10-23/comparison-stage2-detail.png) · [제품 최대 표시 기준 상당 그림](east-germany-remaining-stage2-2026-10-23/comparison-stage2-display-baseline.png). 실제 좌표 도해이며 제품 화면 캡처와 구분한다. 상세 그림은 10000px/°, 제품 기준 2560×64/360≈455.1px/°보다 약 22배 추가 확대다. 현행 DTK25 원본과 후보 중첩, 전후 원본 gzip, 출처 URL·판본·SHA, 생성 로그·검사·연결 증거는 [근거 폴더](east-germany-remaining-stage2-2026-10-23/)에 보관했다. 원본 기준은 recipe의 beforeStage2Supplement로 SHA 고정했다.

## 남은 구간과 이유

- 벤데바흐·베라 등 하천: 하도 이동과 후속 측량을 1989 기준으로 분리할 근거가 부족함.
- 오레·드뢰믈링, 이번 창 밖 하르츠·아이히스펠트·포인트 알파: 현대 주경계를 그대로 소급할 해당 구간 사료 대조가 미완료.
- 바케니츠·라체부르크·메호어 제와 샤알제 주변 나머지 호안: 물가·수역·정치 경계의 구별과 시기별 도면 확인 필요.
- 엘베 미확정 경계·하구, 노이하우스 등 1993년 이관지, 안전한 교차점 접합이 없는 바이에른 서쪽/삼중접점, 미채택 국제 LSIB 구간은 기존 예외 유지.

[호른부르크 적용 보고서](east-germany-remaining-applied-2026-10-23.md)의 실적은 유지하며, 그 문서의 남은 북부 육상·아이히스펠트 중 위 두 창에 한해서 이번 보고서가 후속 상태를 대체한다.
