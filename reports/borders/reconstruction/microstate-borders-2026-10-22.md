# 안도라–프랑스·산마리노·바티칸·레소토 국경 교체
> ID: GEO-MICRO-20261022 · 상태: implemented / focused-review · 지도 반영: work-gis-only
> 수정: 2026-10-22 · 코드: be60e5aa (GIS 구현 829bb3e8, 생성 순서 3c3e891b) · 입력 자료: f00766401e390ac401ce02f3bfed783bba952527
> 최종 자료 판본은 해당 브랜치 config/library-data.json 참조.

## 반영
- AND/FRA: 미국 LSIB 11.4 전체 국경과 ESP 양 끝 접속 4개 구간. 삼국 접점은 같은 좌표를 공유한다.
- ITA/VAT, LSO/ZAF: 폐곡선과 주변국 구멍을 동시에 교체. VAT는 LSIB 140점을 유지했다.
- ITA/SMR: 사용자 추가 조사 지시에 따라 IGM DBSN 경계 2,233점을 사용했다. 이탈리아의 VAT 변경도 함께 유지했다.
- 원본 국가 ID·존속기간·부모·기존 날짜별 형상·섬/구멍 수와 대상 전체 육지 합집합을 보존했다. 8개 국가가 바뀌었다.

## 산마리노 자료 선택
LSIB 원본과 산마리노 SIT 국경선은 일부 지점에서 0.570417 CSS px 차이가 났다. 이탈리아 IGM의 같은 지점은 SIT와 0.0095375px 차이다. IGM META_IST=20은 IGM·ISTAT·지적 기관 계열 자료다. IGM 선 전체와 SIT의 양방향 거리 상한은 0.485518px(표본 최대 0.462763px, 간격 0.0001°)이다. 원측량의 독립성·역사적 정확성을 확정한 결과는 아니다.
IGM 자료에 ODbL-1.0 출처·저작자·원본 응답·사용 조건을 보존했다. SIT는 비교에만 사용했다. EPSG:4258→4326 변환의 명목 정확도 1m와 SIT 서버 변환의 미확정 오차는 선형 비교와 별개다.

## 확인
- 단일 관련 Python 파일 최종 실행: 14/14 통과. 폐곡선 방향/시작점, 이탈리아 두 구멍 누적, 접점, 자료 해시·현재 버전 제한, IGM 선택·출처를 포함한다. 전체 검사·린트·벤치마크는 실행하지 않았다.
- 실제 C++ 정규화 후 AND/FRA/ESP, ITA/VAT, LSO/ZAF 및 후속 ITA/SMR의 합집합 차이와 중첩 면적은 모두 0이다. 메타데이터와 날짜별 버전을 비교했다.
- 2560 CSS px / flatZoom=64: LSIB→표시 파생선의 연속 거리 상한 최대 0.409272px. 이 수치는 실제 국경의 정확도를 보증하지 않는다.
- 독립 검토 1회에서 발견한 진단 보고서의 IGM/LSIB 출처 오표기는 구간별 sourceId·참조 manifest 기록으로 수정했다.
- 배포 자료 281개 청크·258개 현재 선택·277개 국가 파일/전송 묶음과 canonical/preview 메쉬·PCG·공유 경계 캐시·고정 polygon 메쉬를 갱신했다. WASM·Windows 실행파일은 재빌드하지 않았다.
- 앱에서 발견한 이전 ESP 경계 캐시는 파생 자료 생성으로 교체했다. 이어서 확인한 대용량 외곽선 WASM 입력 제한은 기존 패킷 생성기에서 요청을 나눠 처리하도록 수정했다. 재현 회귀 1개와 캐시/구멍 경계 기존 사례 2개가 통과했다. 회귀의 최초 실패는 실제 입력 제한이며, 표시 정밀도 예상값은 현재 C++ microdegree 규약을 사용했다.
- Web 뷰어 로딩·산마리노 이동, 앱 웹 셸의 네 대상 선택·확대·상세 표시를 확인했다. 수정 후 be60e5aa 빌드의 상세 표시 오류 로그는 0개다. 스크린샷 viewport는 2560×1440이며 편집 패널이 열린 실제 지도 너비는 더 작다. 정량 비교는 별도의 2560 CSS px 기준이다. 네이티브 앱 실행·원격 게시 확인은 미실행이다.

## 남은 한계
바티칸은 LSIB 계산 면적 약 0.496920㎢와 공식 설명 0.44㎢가 다르다. 면적 숫자에 맞춰 형상을 변형하지 않았으며, 치외법권 부동산을 별도 추가하지 않았다. 공식 조약 공보·부도 원문은 보존했으나 독립 기준선으로 정량 검증하지 않았다.
AND와 LSO도 독립적인 현행/역사 기준선 대비 0.5px 통과를 주장하지 않는다. 자료의 발행일을 국경 변경일·국가 존속 시작일로 사용하지 않았다.

## 근거·증거
- 미국 LSIB 11.4(2025-02-24): https://geodata.state.gov/geonetwork/srv/api/records/3bdb81a0-c1b9-439a-a0b1-85dac30c59b2
- IGM DBSN(공식 안내 갱신 2025-06-27): https://igmi.esercito.difesa.it/servizi/database-di-sintesi-nazionale/
- META_IST: https://igmi.esercito.difesa.it/porta-magna/documentazione/specifiche_dbsn/
- 산마리노 SIT: https://mappeonline.pa.sm/arcgis/rest/services/Cartografia/castelli_GR/MapServer/1
- 안도라 2020판: https://www.cartografia.ad/mapa-topografic-d-andorra-1-50-000
- 바티칸: https://www.vaticanstate.va/en/state-and-government/general-informations/geography.html
- 조약 부도: https://www.vatican.va/archive/aas/documents/AAS-21-1929-ocr.pdf (225쪽)
원자료: tools/historical-library/sources/reviewed-boundaries-2026-10-22/ 및 기존 lsib-11.4/
후보·정량 결과·진단 코드: diagnostics/microstate-borders-2026-10-22/

화면 증거: images/microstate-*-flat-2026-10-22.png, images/microstate-viewer-final-2026-10-22.png
산마리노 비교 그림: images/smr-reference-comparison-2026-10-22.png
