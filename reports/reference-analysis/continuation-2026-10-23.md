# 참조 이미지 자동 분석 — 언어팩·방향 복원·경계 검토 후속 구현

> 압축 열람본: 도입부 발췌. 전체 출처·결론·미확인 내용은 연결한 원문을 따른다.



> 보고서 ID: `UI-REF-ANALYSIS-20261023` · 상태: `implementation-partial / corpus-and-native-unverified` · 지도 반영: `not-applied` · 색인일: 2026-10-23  
> 원문 최종 수정: 2026-10-23  
> 조사 기준: `work/ui`, 기준 HEAD `2bb8bc58967b2740bfd71f919210d3783d7802d4`의 미커밋 작업본  
> 이전 판본: [UI-REF-ANALYSIS-20261022](implementation-2026-10-22.md)

> 후속 판본: [UI-REF-PANELS-20261023](panels-package-2026-10-23.md). 이 문서의 당시 결과는 보존하며, 독립 검색·삽입도·프로젝트 첨부 저장에 관한 최신 상태는 후속 판본을 따른다.

## 대상과 기준일

사용자가 추천 언어팩 추가와 나머지 구현 진행을 요청한 후속 기록이다. 실제 국가·행정구역·역사 귀속은 변경하지 않는다. 새 일반 선·영역 생성과 검토 기능의 개발 검증이다.

## 근거와 방법

Tesseract.js 7.0.0, ONNX Runtime Web 1.30.0, tessdata_fast `87416418657359cb625c412a48b6e1d6d41c29bd`를 유지했다. 인식 팩 29종과 OSD를 로컬 자산으로 준비했다. 인식 팩은 `eng,deu,deu_latf,lat,fra,spa,ita,por,nld,kor,kor_vert,chi_tra,chi_sim,jpn,chi_tra_vert,chi_sim_vert,jpn_vert,ara,fas,urd,ell,grc,rus,ukr,heb,hye,kat,hin,ben`이다. 세로쓰기 팩을 별도 언어 수로 세지 않는다.

실제 모델 초기화·인식을 한 팩씩 실행하고 Worker를 종료했다. 이 검사는 언어별 고지도 인식률 측정이 아니다. 런타임/라이선스 파일 21개와 OCR 팩 30개, 합계 51파일·101,247,960바이트의 SHA256/크기를 확인했다. 외부 요청은 없었다.

실제 보관 지도는 IBS17 China–Korea Border, 1962-06-29의 852×675 JPEG이며 SHA256은 `23ab23c7a8d16782038ca237dbff9f5e7b7a2123286af9c03a37dd0e7bcbf844`이다. 원출처: https://library.law.fsu.edu/Digital-Collections/LimitsinSeas/pdf/ibs017.pdf . 이 지도를 90도 돌려 읽고 인식 상자를 불러온 원본 픽셀 좌표로 복원했다. OSD가 신뢰도 0.22로 방향을 잘못 제시한 실제 실패를 확인해, 낮은 신뢰도에서는 네 방향의 OCR 근거를 비교하도록 구현했다. 기본 언어 모델과 방향 알고리즘의 전체 자료군 성능은 아직 미측정이다.

보고서 원문 첨부파일을 포함하도록 인벤토리를 고쳤다. 이번 스캔은 원본 후보 4개·보고서 증거 후보 76개·출처 참조 37개다. 보고서의 FWS 2012 안내 PDF도 후보에 포함했다. 대다수 증거 파일은 앱·비교 스크린샷이며 검토된 고지도 원본이나 경계 정답으로 취급하지 않는다. 원본 후보의 이용 조건

[무손실 압축 원문](../../archive/blobs/f58677938b14557174f3301d2d50567eaca2e81b3fa45a07d9c60ca467a329b6.gz)
