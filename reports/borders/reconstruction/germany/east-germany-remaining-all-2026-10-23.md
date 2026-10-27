# 동독 1989년 국경 — 1:1,000만 핵심 적용 기록

> 기존 ID: GEO-DDR-LSIB-VG25 / GEO-DDR-NORTHERN / GEO-DDR-ALL-FOLLOWUP 등 8단계 통합 · 상태: `work/gis local-applied / provisional` · 2026-10-28 축척 초과 조사 정리

## 보존할 역사·적용 사실

- 적용 기준일: **1989-04-25 참고 형상**. 동독 존속기간은 1949-10-07~1990-10-02. 해당 참고일의 전체 내독경계·국제국경을 독립 사료로 최종 검증한 것은 아니다.
- 대외 경계는 기존 독일 객체에 채택된 **LSIB**에서 폴란드·체코 접경의 검증 가능한 접촉 구간을 재사용했다. 미채택 국제선, 서베를린·해안·해상 외곽 및 타국 객체를 무조건 교체하지 않았다.
- 내독 육상 국경은 **BKG VG25**와 옛 경계가 현행 주경계로 이어지는 공식 설명을 대조해 일부 구간을 보충했다. 샤알제, 메호어호·라체부르크호, 호른부르크, 글라제하우젠·무스틴, 바이에른–튀링겐·작센 일부, 뢴·하르츠·바케니츠 등의 적용은 기존 코드의 정본 레시피를 따른다.
- 북부 두 호수의 귀속 및 공유 접합은 유지한다. 후속 지도에서 판독한 엘베–노이하우스·슈나켄부르크 부분은 **당시 동독 지도에 기록된 미획정 하천 경계 주장**의 잠정 복원으로 해석한다. 국가 간 확정 법적 경계와 혼동하지 않는다.
- 1993년 노이하우스 이관과 벤데바흐 등 이동성 하천 변화는 현대 경계선을 자동으로 1989년까지 소급하지 않는다. 미확인 구간은 완료로 표시하지 않는다.

## 적용 검증·원본 제약

- 주요 입력: [US Department of State LSIB](https://geodata.state.gov/), [BKG VG25 WFS](https://sgx.geodatenzentrum.de/wfs_vg25) (EPSG:25832, CC BY 4.0, 당시 고정 입력 SHA256 `f19cc29909e93a40cf047576d5e5215b9319969fbf373a5e23b52de5c3f0d573`), [LGLN 측량 기록](https://www.lgln.niedersachsen.de/download/80437/NaVKV_2010_2_3.pdf), [GRENZHUS](https://www.grenzhus.de/wakenitz-und-trave/), [Schaalsee](https://www.schaalsee.de/).
- **중요:** LAiV TK25AS 공식 원도/WMS에서 유래한 엘베 일부 좌표는 외부 사용권이 **미해결**이다. 공개 배포 허용으로 변경하지 않는다. [공급자 역사 지도](https://www.laiv-mv.de/Geoinformation/Karten/Historische-Karten/) 안내와 개별 서비스 제한사항을 별도 확인해야 한다.
- 최종 실적(당시 기록): 시작 4,108 → 최종 **8,708개 정점**, 폴리곤 6개 유지, 전체 형상 유효, 나머지 데이터·타국 원본 해시와 외부 허용 창 보존. 정점 증가는 1:10m 정확도나 작업 필요성을 입증하는 지표가 아니다. 형상 대칭차 약 42.04km²는 **수정 면적**이며 국제 영토 취득/역사적 위치 오차가 아니다.
- 내장 세계의 기존 체코슬로바키아 겹침 처리(약 78.553km² 제외)는 이번 단계 전부터 존재했으며, 전체 원본과 내장 세계가 완전히 일치한다고 주장하지 않는다. 독립 1989 정치 경계선에 대한 0.5px 정량 검증도 완료하지 않았다.
- 최종 보존 증거: [형상 유효성](east-germany-remaining-all-2026-10-23/final-geometry-proof.json), [런타임 연결](east-germany-remaining-all-2026-10-23/final-runtime-proof.json), [배포용 범위](east-germany-remaining-all-2026-10-23/final-compiled-scope-proof.json), [원본 이용조건 메타데이터](east-germany-remaining-all-2026-10-23/map-phase-licensing-legend-sources.json).
- 실제 국가 정본·지오메트리 버전·생성 레시피·라이브러리 런타임은 이 연구자료 정리로 변경하지 않는다. 보고서의 당시 `work/gis only` 상태를 현재 main 배포 완료로 소급해서도 안 된다.

세부 표석·호안·하천선 추적, 반복 GPKG/전후 JSON·지도 스크린샷·측량 원문 복사본·중복 단계 보고서를 현행 라이브러리에서 폐기했다. 과거 Git 커밋은 그대로 남으며 현행 운영 형상은 삭제 대상이 아니다.
