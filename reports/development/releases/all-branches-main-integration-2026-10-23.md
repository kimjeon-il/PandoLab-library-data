# UI·GIS 전체 변경 main 통합 검증 — 2026-10-23

> 보고서 ID: DEV-MAIN-20261023 · 상태: integrated-local / focused-verification · 원격 게시: 이 기록 작성 시 대기
> 검증 코드: f8895d4631556f1ceb80fb988f1c8f6bad8cd689 · 런타임 자료 핀: fa2de64ac125e768e9ce54137a07591be8d5f506
> 원본: UI13505cd2, GIScce91df1, 자료UI80fefc44 및 GIS990dd4be. 웹과 앱은 같은 소스와 자료를 사용한다.

## 통합 내용

UI 학습 도구·가중치·원본·비교 증거와 GIS 동독 경계 보완·원본·파생 자료를 모두 보존했다. 원래 브랜치 이력은 merge로 유지했다. 자료 인덱스는 공통 조상36818f32 기준으로 항목별 병합했고, 유일한 의미 충돌인 OCR 목록은 main/UI의30개 항목을 유지했다. GIS의 이전17개 목록으로 줄이지 않았다. 압축 원본·마스터·기존 보고서의 바이트는 변경하지 않았다. 기존 역사적 불확실성도 유지한다.

생성 HTML·Worker·빌드 메타데이터는 통합 소스에서 정본 생성기로 만들었다. Windows checkout의 CRLF 변환으로 고정 vendor SHA가 깨지는 문제를 재현했고, 해당 디렉터리만 -text로 지정했다. 실제 manifest 길이와SHA 검사에서 RED→GREEN을 확인했다. ONNX 브라우저 검증 스크립트의 전역 참조를 globalThis로 명시해 ESLint 오류도 해결했다.

## 실제 검사

- Python55개: training/corpus/source/publisher/Semap/macro/model42개, 동독 형상13개 통과.
- Node45개: geometry/package/inference21개, GIS import/native recipe/shared-edge21개, 추가 vendor-byte 회귀1개, 타일·모델 승인 게이트2개 통과. 중복 재실행은 별도 성공 수로 더하지 않았다.
- C++ 실행의 첫3221225781은 DLL 경로 누락이었다. 기존 Git MinGW 및 Python GIS DLL 경로와PROJ_DATA를 지정한 재검사5개가 모두 통과했다.
- 변경 JavaScript의 집중 ESLint, 빌드 메타데이터 검사가 통과했다.
- Pages staging:1703파일 /205173830바이트. 앱 full-world staging:1830파일 /333490896바이트,258엔티티. 앱 stage 검증 통과.
- 앱 HTML의 실제 동독 가져오기·형상·출처·Undo/Redo 검사 통과. 별도 확장 실행에서 실제 GPKG 내보내기 후 웹 뷰어 재열기와 형상·정밀도 감사 보존을 확인했다. 웹 오류0. 증거 JSON의 GPKG 크기:57470976바이트.
- 별도 읽기 전용 검토에서 중요/치명적 통합 누락은 발견되지 않았다.

## 보존과 한계

UI 미추적103개 파일의 사전 해시를 기록했으며 통합 중 모두 동일했다. 작업 브랜치 전파 후에도 다시 확인한다. stash/reset/clean/강제 푸시는 사용하지 않는다.

학습 체크포인트는 training-only / pending / releaseApproved=false를 유지한다. 재학습이나 독립 정확도 평가·정식 모델 승격은 하지 않았다. 실제 Windows WebView2/Android 실행 및 포터블 패키지는 이번에 검증하지 않았다. 앱 사용자 흐름 검사는 production 앱 HTML·Worker·Core 경로를 브라우저에서 실행했다. 독립적인1989 역사 벡터 정확도나0.5px 검증 통과를 주장하지 않는다.

이 보고서의 보관 커밋은 보고서만 추가한다. 모든 비보고서 자료가 동일함을 비교한 뒤 이미 검증한 런타임 핀fa2de64ac125e768e9ce54137a07591be8d5f506을 유지해 불필요한 전체 자료 재복제를 피한다. 최종 브랜치·원격SHA와 배포 결과는 작업 완료 응답 및 GitHub Actions 기록을 따른다.

## 증거

- [웹·앱 형상 보존 JSON](all-branches-main-integration-2026-10-23/web-app-proof.json)
- [앱 가져오기 화면](all-branches-main-integration-2026-10-23/app-web-shell-import.png)
- [웹 GPKG 재열기 화면](all-branches-main-integration-2026-10-23/web-viewer-file.png)
