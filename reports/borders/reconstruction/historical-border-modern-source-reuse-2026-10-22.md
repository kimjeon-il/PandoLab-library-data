# 체코슬로바키아·소련·유고·동독의 현대 경계 자료 재사용 조사

> ID: `GEO-HIST-REUSE-20261022` · 상태: `source-indexed / provisional` · 지도 반영: `not-applied`  
> 조사일: 2026-10-22 · 코드: `work/gis`, `6ad20d2a4c2ba67d3014695f05e139c1b8dc8ea2`  
> 자료 핀: `36818f327b5d7a423dbf51db79106197786b69f6` · Web/App 공통 원본 메타데이터 열람.  
> 사용자 추가 조건: 독일 정부 행정구역 벡터도 사용 후보에 포함한다. 검사·벤치마크·빌드·GIS 재생성·정본 수정·배포 미실행.

## 결론

네 국가 모두 **역사적으로 같은 노선이 유지된 부분만** 현대 상세 벡터로 보충하는 방식을 사용할 수 있다. 국가 전체나 기존 버전의 전 존속기간에 현대 선을 소급 적용하는 것은 부적절하다. 이번 결과는 적용 가능성 선별이며, 실제 대응 선분과 시대별 귀속·하천 규칙·접합을 확인한 교체 허가 목록은 아니다.

동독은 독일 BKG **VG25 / ATKIS Basis-DLM**을 상세 후보로 우선한다. BKG **VG-Hist**는 당시 귀속과 날짜를 확인하는 보조자료로 유용하지만 VG1000에 기반한 일반화 형상이므로 상세 국경 마스터로 바로 쓰지 않는다. 독일 밖의 나머지 후보는 보존된 미국 LSIB 11.4를 활용할 수 있다.

## 현재 원본과 전송 자료 구분

| 객체 | 현재 원본 | 조사상 문제 |
|---|---|---|
| 체코슬로바키아 | Natural Earth CZE+SVK 합집합, `1918–1992` 단일 저확실도 버전 | 시대별 영토 변화가 이 버전 하나에 복원된 상태가 아니다. 수정 구간의 적용 시기부터 분리해야 한다. |
| 소련 | Natural Earth 후계국 15개 합집합+바이코누르 보완, `1922–1991` 단일 저확실도 버전 | 전쟁 전후·해체 후 변경이 섞일 수 있으므로 한 번에 전체 선을 교체할 수 없다. |
| 유고 | 왕국 `1918–1941`, 사회주의 연방 `1945–1992`, 연방공화국 `1992–2003`의 근사 합집합 | 세 버전의 외부 국경이 다르다. 특히 왕국 서쪽 경계와 후기 경계는 분리해야 한다. |
| 동독 | `1989-04-25` 참고 형상: NE Admin1+BKG VG250+베를린 장벽 자료 | 전 존속기간 자료가 아니다. 노이하우스·서베를린 보정이 있지만 LSIB/VG25 전면 보충은 아니다. |

LSIB 11.4의 발행일은 2025-02-24이며, 개별 선형의 관측·법적 효력일을 뜻하지 않는다. 기존 2026-10-21 보충 목록도 완전 교체 목록이 아니다. `partially-supplemented`는 기존 NE 선과 교차하는 지점 사이의 일부만 교체했다는 뜻이다. 이 상태를 역사적 동일성 증거로 사용하지 않았다.

## 국가별 선별

### 동독: 우선 진행 후보

- **체코슬로바키아 접경:** 현대 DEU/CZE 중 작센 구간이 후보다. 독일 1999년 국경 문서 조약 제4조는 작센 구간이 1980년 DDR–CSSR 조약 및 **1988-11-18 상태**의 국경 문서에 기초한다고 명시한다. 체코 의회 1994년 제출 자료도 같은 문서 승계를 확인한다. 이는 현재 동독 원본의 `1989-04-25`와 연결되는 강한 문헌 근거다. 현대 독일–체코 전체를 복사하면 바이에른 구간까지 섞이므로 반드시 작센 부분만 추출한다. 하천의 이동 경계와 고정 경계를 구분해야 한다. [D1][D2]
- **폴란드 접경:** 오데르–나이세 육상 구간은 1950/1951년 문서와 1990년 확인 자료를 대조할 후보다. 현재 LSIB 적용분은 대략 위도 **51.8366–53.2529°**의 중부 한 구간이며, 북쪽 하구·남쪽 나이세 전체가 이미 교체된 것은 아니다. 이 범위는 기존 목록의 접합점 요약일 뿐 역사 선분의 검증 결과가 아니다. 1989년 오데르만 해역 조약은 현재 동독 원본 기준일보다 늦어 별도 취급한다. [D3]
- **옛 동서독 경계:** 현대 국제국경이 아니므로 LSIB에는 해당 선이 없다. VG25의 현재 주 경계 중 유지된 구간을 후보로 삼고 역사 문서로 판정한다. **노이하우스뿐 아니라 Neu Bleckede·Neu Wendischthun·Stiepelse·Bohldamm 등 1993년 이관 구역도 확인**해야 한다. 현 노이하우스 시군 하나를 더하는 것으로 모든 1993년 이관 범위를 복원했다고 가정하면 안 된다. [D4]
- **엘베·서베를린:** BKG 부록은 일부 엘베 주 경계를 법적으로 미확정인 기술적 구분선으로 설명한다. `RDG=2` 선은 역사적 합의 국경으로 승격하지 않는다. 서베를린은 현대 Berlin 주 전체를 빼는 대신 기존 1989년 장벽·정치 경계 근거를 유지한다. [G3]

판단: 작센–체코의 고정 육상 구간, 변동 없는 옛 동서독 주 경계부터 상세 대조하는 것이 가장 명확하다. 폴란드의 하천·하구, 엘베 미확정 구간은 별도 선별한다.

### 체코슬로바키아: 후기 형상에서 부분 재사용

현재 보충 목록에 `CZE/DEU`, `AUT/CZE`, `AUT/SVK`, `CZE/POL`, `POL/SVK`, `HUN/SVK`, `SVK/UKR`의 LSIB 부분 적용분이 모두 있다. 따라서 후보 벡터 자체는 확보돼 있다.

- **독일 접경:** 특히 작센 구간은 위 DDR–CSSR 문서와 연계할 수 있다. 바이에른 구간은 1937년 문서·1983–1989년 재측량 이력이 있으나 이것만으로 모든 옛 시점에 현대 좌표가 동일하다고 확정하지 않는다. [D1][D2]
- **폴란드 접경:** 1958년 획정 조약을 기준 사건으로 분리한다. 서명일과 효력일은 다르므로 실제 버전 날짜는 비준 교환 자료로 확정해야 한다. 슬로바키아–폴란드에는 해체 뒤 **2002년 서명된 국지 변경 조약**도 있어 해당 위치는 현재 선을 소급하지 않는다. [C1][C2]
- **헝가리 접경:** 1947년 브라티슬라바 교두보 이전을 고려해야 한다. 특히 해체 후 **1997년 Ipeľ·Slaná·Roňava 하천 변경**이 확인돼 현대 SVK/HUN을 통째로 옛 CSK 외곽으로 사용할 수 없다. 2018년 자료에 장래 변경으로 소개된 2016년 서명 조약은 그 자료만으로 발효를 확정하지 않는다. [C2][C3]
- **오스트리아 접경:** 1973년 서명·1975-06-24 발효 조약의 변경 구간, 이후 현대 체코/오스트리아의 변경 법령을 구분한다. 현대 조약의 개정이 항상 영토 변경을 뜻하는 것은 아니므로 조문·부도를 읽지 않은 개정 항목은 보류한다. [C4]
- **우크라이나 접경:** 1945년 자카르파탌야 이양 조약을 기준 사건으로 고려한다. 당시 서명·발효·현장 이양과 국경 세부를 구분해야 하므로 전간기까지 현재 SVK/UKR 선을 연장하지 않는다. [C5]

판단: 후기 체코슬로바키아의 변동 없는 **독일 접경의 고정 구간**이 우선 후보. 나머지도 부분 활용 가능하나 하천 정비·전후 교환·해체 후 변경 위치를 먼저 제외한다. CZE/SVK 내부 경계는 국가 외곽선에 추가하지 않는다.

### 유고: 사회주의 연방과 연방공화국을 구분

- **사회주의 연방의 북서부:** AUT/SVN은 1919년·1955년과 1965년 국경 조약, HUN/SVN은 트리아농·1947년 및 후속 문서의 승계 근거가 있다. 현재 슬로베니아의 외부 국경이 옛 SFRJ 외부 국경을 승계했다는 공식 설명도 있다. 단 현대 HUN/SVN에는 **2016년 Ledava 하천 변경**이 있어 변경 구간을 제외한다. [Y1][Y2]
- **이탈리아 접경:** 1975년 오시모 조약은 **1977-04-03 발효**. 후기 SFRJ의 후보로 삼을 수 있지만 왕국이나 1945년 초기 버전에 그대로 쓰면 안 된다. 현대 선에는 **2014년 서명된 Čubnica/Barbucina 정비 구간 협정**이 추가돼 있다. 슬로베니아 측 목록과 이탈리아 의회 비준 처리 연혁이 달라 효력·현장 이양일을 별도 확정해야 한다. 이 위치는 일단 제외한다. [Y2][Y3][Y4]
- **알바니아·불가리아·그리스·루마니아·크로아티아/헝가리 접경:** 현재 목록에 부분 보충 벡터가 있다. 다만 이번 회차에 해당 역사 조약과 당시 하천·도서 귀속을 모두 대조하지 않았으므로 **추가 조사 후보**다. Kosovo 관련 일부는 기존 국가 코드와 LSIB 쌍이 맞지 않아 현대 보충에서도 보류됐다. 코드 불일치를 고친 것만으로 역사 경계를 승인하지 않는다.
- **1992–2003 연방공화국:** 당시 외부 국경은 세르비아·몬테네그로·코소보 합집합의 외곽에 한정한다. 현대 BIH/SRB·BIH/MNE·HRV/MNE는 자료가 있어도 분쟁·영토 교환·전후 문서를 확인해야 한다. HRV/SRB는 기존 보충에서 분쟁 보호로 보류됐고, Prevlaka는 육상·해상 해석 차이까지 확인되므로 이번 단순 재사용에서 제외한다. [Y5]

판단: 후기 SFRJ의 **AUT/SVN 고정 육상 구간**, Ledava를 제외한 HUN/SVN, 변경 위치를 제외한 ITA/SVN부터 후보화한다. 왕국의 이탈리아 접경과 FRY 분쟁 구간은 별도 작업이다. SFRJ 내부 공화국 경계나 FRY 내부 세르비아–몬테네그로 경계를 새 국제국경으로 그리지 않는다.

### 소련: 외부 경계의 국가·시대별 선별 필요

| 현대 자료에 대응하는 외부 구간 | 판단과 기간상 주의 |
|---|---|
| NOR/RUS | 1978년 미 국무부 경계 연구와 노르웨이 정부 문서가 1826년 노선 및 전후 경계의 연속성을 설명한다. 소련의 실제 접경 시기는 전후부터이며, 1922년부터 이 선을 소련 국경으로 쓰지 않는다. 후기 소련의 고정 육상 구간이 우선 후보. [S1][S2] |
| FIN/RUS | 1947년 Jäniskoski–Niskakoski 이양이 확인된다. 전쟁 전·후를 한 형상으로 처리하지 않으며 강·호수 구간은 당시 규칙과 대조한다. [S3] |
| POL/RUS·LTU/POL·BLR/POL·POL/UKR | 1951년 영토 교환과 1957년 발트해 인접 구간 조약을 고려한 후기 후보. 두 사건을 폴란드 접경 전체에 동일한 변경일로 적용하지 않는다. [S4][S5] |
| SVK/UKR·HUN/UKR·ROU/UKR·MDA/ROU | 현대 부분 보충 자료는 있다. 전후 영토 이양, 다뉴브·프루트·티서의 하천 규칙과 이후 변경 위치가 미확정이므로 추가 조사. |
| GEO/TUR·ARM/TUR·AZE/TUR | 현대 부분 보충 자료가 있다. 카르스 관련 문서·하천 경계·후속 변경을 구간별 대조할 후보이며 이번 조사에서 전체 동일성을 확정하지 않음. |
| IRN/TKM | 1954년 국경 문제 해결 조약과 1957년 경계 문서를 고려해야 함. 전 기간 재사용 불가. ARM/IRN은 기존 위상 접합 실패, AZE/IRN은 분쟁 보호로 현대 보충부터 보류됨. [S6] |
| AFG/TKM·AFG/UZB·AFG/TJK | 부분 보충 자료는 있지만 1946년 국경 협정과 하천 규칙·당시 하도를 확인해야 한다. 이번 회차에서는 문헌 후보로만 유지. [S7] |
| MNG/RUS | 자료 있음. 편입 시기·구간별 조약·삼중접점은 이번 회차에 확정하지 않았으므로 추가 조사. |
| CHN/RUS·CHN/KAZ·CHN/KGZ·CHN/TJK | **현대 전체 선 복사 금지.** 1991년 협정만으로 현재 노선을 설명할 수 없고, 소련 해체 뒤 1994/1997/1998/1999/2002/2004년 합의·후속 획정이 존재한다. 변하지 않은 선만 따로 입증한 뒤 사용할 수 있다. 1차 교체에서는 이 중국 접경 전체를 보류한다. [S8][S9] |
| PRK/RUS | 현재 목록도 날짜별 역사 형상 보호 때문에 보류. 별도 북러·중러북 삼중접점 자료 없이 해제하지 않는다. |

판단: **후기 소련의 노르웨이 고정 육상 구간**, 이어 핀란드·폴란드의 시대 변화가 정리된 구간 순서가 합리적이다. 중국 접경·미확인 하천·현대 분쟁 구간은 남긴다. 후계국 상호 간 국제국경을 소련 외부 국경으로 추가하지 않는다.

## 독일 정부 자료의 선택과 권리

| 자료 | 형식·시점·용도 | 한계 |
|---|---|---|
| BKG VG25 | 국가–주–시군 및 별도 경계선, GeoPackage·WFS. 문서 2026-07-08 / 제품 2025-12-31. Basis-DLM 기반 1:25,000. [G1] | WFS 상품 페이지는 2024-12-31을 표시해 문서와 판본이 다름. 사용 시 실제 내려받은 판본을 고정해야 함. 공개 서비스 페이지의 이용권은 **CC BY 4.0**, BKG 출처·수정 표시 필요. VG250의 dl-de/by-2-0를 자동 승계하면 안 됨. |
| BKG VG-Hist | 2026-01 제품 / 문서 2026-08-06. 1945년 이후 시점별 Kreis 및 상위 소속 속성, SHP/GPKG, EPSG:5243. [G2] | 형상은 VG1000에 기반하며 더 일반화된 곳도 있음. 날짜·귀속 참고용이고 0.5px 상세 기준선 아님. 국가 전체 다운로드·레이어 원본 열람·변환 미실행. |
| 주정부 Basis-DLM·행정경계 | 독일 주별 부족 구간 보충 후보 | '정부 벡터'라는 명칭만으로 정밀도 확정 불가. 작센 안내 중에는 1:300,000으로 일반화했다는 제품도 있어 VG25/Basis-DLM 원자료와 구별해야 함. [G4] |

VG 자료는 국가 경계·주 경계·해안선·수역을 다른 속성으로 구분한다. 법적 미확정선 `RDG=2`, 해상 경계, 해안선을 모두 같은 육상선으로 합치지 않는다. 현대 해안은 1989년 해안·해상 국경을 증명하지 않는다. 이번 조사는 **육상 경계 재사용**을 다루며 LSIB나 VG25를 근거로 역사 해안선·영해 경계를 함께 교체하지 않는다. [G3]

## 실제 적용에 필요한 조건

1. 객체의 전체 버전 대신 **역사적 국가/버전·외부 접경·부분 구간·적용 기간**을 지정한다. 서로 다른 효력일을 국가 전체의 일괄 변경일로 만들지 않는다.
2. LSIB/VG25에서 확인된 구간만 원형을 보존해 채택한다. 교차점 사이만 보충된 기존 현대 자료와 미교체 끝부분을 구분한다.
3. 실제 역사 지도/국경 문서와 동일 구간을 대조한다. 기본 상세 사료는 1:25,000이며 좁은 불일치만 더 세밀하게 본다. 동적 하천·귀속·월경지·삼중접점은 화면 오차보다 우선한다.
4. 같은 역사 시점의 인접 객체·부모/하위 영토에서 공유하는 선은 일관되게 반영한다. 현재 국가들의 고정 자료를 수정해 과거 형상에 맞추지 않는다.
5. 기존 현대 보충 도구의 `datePrecision === current` 보호를 통째로 제거하지 않는다. 역사 교체가 승인되면 기존 원본 소유자에서 명시적으로 승인한 구간·기간만 처리하도록 설계한다.

## 수행 범위와 보존 근거

- 수행: 기존 JSON의 이름·기간·출처·버전 및 2026-10-21 보충 목록 열람, 공식 조약·기관 페이지/PDF 조사. 상세 벡터의 신규 다운로드·변환·교차 계산은 하지 않음.
- **미실행:** 역사 선형 중첩, 양방향 화면 편차, 2560 CSS px / flatZoom=64 / 0.5px 검사, 위상 검증, 테스트·린트·빌드·벤치마크. 어느 후보도 `historically-verified`나 `screen-delta-checked`로 승격하지 않음.
- 정본 형상·기간·소스 핀·런타임·웹/앱·Git 브랜치는 변경하지 않음. 보고서와 조사 근거만 외부 자료 작업본에 저장. 공용 전체 자료를 다시 저장/커밋하는 `--store`는 다른 작업본까지 포함하므로 이번 조사에서는 실행하지 않음.
- 기존 자료 요약: [existing-source-metadata.json.gz](historical-border-modern-source-reuse-2026-10-22/existing-source-metadata.json.gz). 기하 좌표를 제외한 메타데이터와 기존 보충 기록의 선별본이며 신규 GIS 검증 결과가 아님.
- 원문 보존 목록·수신 여부·원본 SHA: [capture-provenance.json](historical-border-modern-source-reuse-2026-10-22/capture-provenance.json). 실패한 요청은 보존 성공으로 집계하지 않음.

## 출처

- [G1 BKG VG25 문서](https://sgx.geodatenzentrum.de/web_public/gdz/dokumentation/deu/vg25.pdf), [공개 WFS·이용 조건](https://gdz.bkg.bund.de/index.php/default/wfs-verwaltungsgebiete-1-25-000-stand-31-12-wfs-vg25.html), [라이선스 원문](https://sgx.geodatenzentrum.de/web_public/gdz/lizenz/deu/nutzungsbedingungen_vg25.pdf).
- [G2 BKG VG-Hist 문서, 2026-08-06](https://sgx.geodatenzentrum.de/public/gdz/dokumentation/deu/vg-hist.pdf), pp.4–8.
- [G3 BKG VG 공통 부록, 2026-02-27](https://sgx.geodatenzentrum.de/web_public/gdz/dokumentation/deu/anlagen_vg.pdf), 경계 속성·해상·엘베 미확정 구간.
- [G4 작센 행정경계 제품 안내](https://www.landesvermessung.sachsen.de/verwaltungsgrenzen-digital-6839.html).
- [D1 독일 Bundestag 14/4707, 1999 국경 문서 조약 제4조 및 설명](https://dserver.bundestag.de/btd/14/047/1404707.pdf).
- [D2 체코 의회 1994년 정부 제출안 1405](https://psp.cz/eknih/1993ps/tisky/t140500.htm).
- [D3 독일 정부, 독일–폴란드 국경 확인 결의와 1950/1951/1989 문서](https://www.bundesregierung.de/breg-de/service/newsletter-und-abos/bulletin/entschliessung-des-deutschen-bundestages-zur-deutsch-polnischen-grenze-788380).
- [D4 독일 1993년 노이하우스 등 이관 조약 제1조](https://www.gesetze-im-internet.de/gr_ndstvtr_mv_nd/BJNR151400993.html), [뤼네부르크 공식 연혁](https://www.landkreis-lueneburg.de/ueber-den-landkreis/wissenswertes-ueber-den-landkreis/kreisgeschichte/30-jahre-rueckgliederung.html).
- [C1 체코 의회, 1958년 폴란드 국경 획정](https://www.psp.cz/eknih/1954ns/tisky/t0255_00.htm), [폴란드 공식 조약](https://eli.gov.pl/eli/DU/1959/159/ogl/pol).
- [C2 슬로바키아 내무부, 1993년 이후 국경 변화, 2018 발표](https://www.minv.sk/swift_data/source/verejna_sprava/hranice_prezentacie/Statne%20hranice%20Slovenskej%20republiky%20od%20roku%201993.pdf).
- [C3 페트르잘카 자치구, 브라티슬라바 교두보 확장 연혁](https://www.petrzalka.sk/wp-content/uploads/2020/02/MU-Ba-Petrzalka-broz-100-vyr-pripojenia-Petrzalky-k-CSR-komplet-2kor.pdf).
- [C4 오스트리아 RIS, 1973년 체코슬로바키아 국경 조약·후속 승계](https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10000572), [체코–오스트리아 후속 변경 관련 공식 의회 자료](https://www.parlament.gv.at/dokument/XXII/I/361/fname_014018.pdf).
- [C5 체코 국립기록원, 1945년 자카르파탌야 조약](https://na.gov.cz/labyrint/1945-rok-zlomu/listopad/22-11-1945), [미 국무부 FRUS의 해당 조약 기록](https://history.state.gov/historicaldocuments/frus1945v04/d511).
- [Y1 슬로베니아 정부 지리정보기관, 국경의 승계 근거](https://www.e-prostor.gov.si/podrocja/drzavna-meja/evidenca-drzavne-meje/), [경찰의 국가별 국경 성립 설명](https://www.policija.si/eng/areas-of-work/state-border-control/schengen-regime-in-slovenia/internal-schengen-border).
- [Y2 슬로베니아 측 공식 국경 조약 목록, 1965/1975/1983 및 2014/2016 변경](https://www.e-prostor.gov.si/podrocja/drzavna-meja/drugo/razno/mednarodni-sporazumi/), [Ledava 조약 제1조](https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2016-02-0033/zakon-o-ratifikaciji-pogodbe-med-republiko-slovenijo-in-madzarsko-o-prilagoditvi-crte-drzavne-meje-zaradi-vodnogospodarske-ureditve-potoka-ledava-bhudmup).
- [Y3 UNTC 오시모 조약 발효 기록](https://treaties.un.org/Pages/showDetails.aspx?clang=_en&objid=08000002800cda20).
- [Y4 이탈리아 의회, 2014년 Čubnica/Barbucina 협정 비준 처리](https://www.senato.it/legislature/17/leggi-e-documenti/disegni-di-legge/scheda-ddl?did=47380). 검색 색인에서 2017-03-29 최종 의결 확인, 본문 접근은 로봇 차단이 있어 조약 발효일 확정에 사용하지 않음.
- [Y5 몬테네그로 정부, Prevlaka 육상·해상 경계 해석 차이](https://www.gov.me/en/article/pmqs-pm-krivokapic-open-issue-of-prevlaka-cannot-be-an-obstacle-for-montenegros-further-progress-towards-eu-membership).
- [S1 미 국무부 IBS 24, Norway–USSR, 1978](https://library.law.fsu.edu/Digital-Collections/LimitsinSeas/pdf/ibs024.pdf).
- [S2 노르웨이 정부, 북부 국경 연혁](https://www.regjeringen.no/en/documents/meld.-st.-7-20112012/id663433/?ch=2).
- [S3 핀란드 Finlex, 1947년 Jäniskoski–Niskakoski 이양](https://www.finlex.fi/fi/valtiosopimukset/sopimussarja/1947/9).
- [S4 UNTC, 1951년 소련–폴란드 영토 교환](https://treaties.un.org/Pages/showDetails.aspx?objid=0800000280133e54).
- [S5 UN 해양법 조약 목록의 1957년 발트해 인접 국경 조약과 발효일](https://www.un.org/depts/los/LEGISLATIONANDTREATIES/STATEFILES/RUS.htm).
- [S6 UNTC, 1954년 소련–이란 국경 문제 해결](https://treaties.un.org/Pages/showDetails.aspx?objid=0800000280133026), [미 국무부 FRUS의 비준·경계 변경 기록](https://history.state.gov/historicaldocuments/frus1955-57v12/d307).
- [S7 UNTS 31, 1946년 아프가니스탄–소련 국경 협정](https://treaties.un.org/doc/Publication/UNTS/Volume%2031/v31.pdf).
- [S8 중국 외교부, 소련·해체 후 후계국과의 경계 조약 원문 목록](https://www.mfa.gov.cn/ziliao_674904/tytj_674911/tyfg_674913/200904/t20090409_9867602.shtml).
- [S9 카자흐스탄 외교부, 1992–1998 획정 및 2002 표지 작업 기록](https://www.gov.kz/org/mfa/press/article/details/594?lang=en).


## 동독 후속 반영

동독의 일부 LSIB/VG25 적용은 [GEO-DDR-LSIB-VG25-20261022](germany/east-germany-boundaries-2026-10-22.md)를 따른다. 이 조사 원문의 다른 국가 후보는 여전히 미반영이며, 후속 작업이 전체 역사 경계 검증을 뜻하지 않는다.
