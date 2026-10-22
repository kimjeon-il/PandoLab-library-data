# 참조 이미지 자동 분석 구현 체크포인트

> 압축 열람본: 도입부 발췌. 전체 출처·결론·미확인 내용은 연결한 원문을 따른다.



> 보고서 ID: `UI-REF-ANALYSIS-20261022` · 상태: `implementation-partial / corpus-and-native-unverified` · 지도 반영: `not-applied` · 색인일: 2026-10-22  
> 원문 최종 수정: 2026-10-22  
> 조사 기준: 웹·앱 공통 `work/ui` 기준 `2bb8bc58967b2740bfd71f919210d3783d7802d4`의 미커밋 작업본  
> 원본·출처: 이 폴더의 corpus-inventory.json, 기존 Korea/Schleswig 보고서, 아래 원출처

## 대상과 기준일

앱 내부 오프라인 OCR·자동 정합·경계 의미 분류·공유 경계망·새 일반 객체 생성을 위한 개발 체크포인트다. 역사 귀속 확정이나 실제 국가 경계 데이터 반영이 아니다. 이후 사용자 요청으로 현대·고대 그리스어 ell/grc를 포함했다. 추가 추천 언어팩은 아직 설치하지 않았다.

## 근거와 방법

- 실제 OCR 원본: `tools/historical-library/sources/korea/ibs017-1962-map.jpg`, SHA256 `23ab23c7a8d16782038ca237dbff9f5e7b7a2123286af9c03a37dd0e7bcbf844`, 852×675. IBS17, 1962-06-29: https://library.law.fsu.edu/Digital-Collections/LimitsinSeas/pdf/ibs017.pdf . 지도에는 서로 다른 시점의 분쟁선과 범례가 있어 단일 시점 경계 정답으로 확정하지 않았다. 앱 재배포용 학습자료 권리는 별도 검토가 필요하다.
- 독일 원자료 출처: SLUB Kartenforum WMS https://wms.kartenforum.slub-dresden.de/map/10006008 , `df_dk_0010001_0718`, https://www.deutschefotothek.de/documents/obj/71051522 . 기존 보고서의 발행/개정 시점 혼동과 자료 권리는 해결하지 않았다. 기존 현대 교구 기반 예비 선형을 역사 경계 정답으로 사용하지 않았다.
- 원자료 후보 3개 중 나머지 AAS PDF와 페이지 이미지는 문서 후보이며 지도 학습자료로 판정하지 않았다. 39개 인벤토리 항목은 출처 참조를 포함한 목록이며 39개 학습 지도가 아니다. 현재 검토된 경계 라벨/독립 확인점/학습 완료 모델은 없다.
- Tesseract.js 7.0.0, ONNX Runtime Web 1.30.0, tessdata_fast `87416418657359cb625c412a48b6e1d6d41c29bd`로 고정했다. 로컬 Worker·WASM·언어팩 17개(OSD 포함), 버전·해시·라이선스를 생성 도구가 기록한다. Apache/MIT 라이선스 원문은 코드 런타임 자산에 포함한다.

## 확인 결과와 한계

기존 컨트롤러가 유일한 분석/검토 상태를 소유한다. 전용 Worker는 기존 RPC·스케줄러를 사용한다. 전역 지명 검색은 현재 지도 화면과 독립적이며 동명 후보를 유지한다. 자동 추천에 최소 6개 대응·20% 분포·원본 픽셀 교차검증 P9

[무손실 압축 원문](../../archive/blobs/bc9a4044de30516370a1d72695e9758a319dbe67308956608e9fa37fc3823719.gz)
