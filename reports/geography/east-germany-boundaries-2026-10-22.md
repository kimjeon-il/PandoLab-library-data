# 동독 경계 보충과 전후 비교 — 2026-10-22

> 압축 열람본: 도입부 발췌. 전체 출처·결론·미확인 내용은 연결한 원문을 따른다.



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

[무손실 압축 원문](../../archive/blobs/72d8e3caf83cf80a2f045d787b95165b53da1df4ffd81b9713739b7bb6585cb6.gz)
