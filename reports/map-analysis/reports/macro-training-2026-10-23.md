# 거시지도 중심 추가 학습

> 보고서 ID: `UI-REF-MACRO-20261023` · 상태: `investigating` · 지도 반영: `not-applied` · 색인일: 2026-10-23  
> 원문 최종 수정: 2026-10-23  
> 조사 기준: `work/ui` 코드 `bdfd230ba396228e417f2210e3e11e143887de26` / 공통 WASM·런타임 UI 변경 없음  
> 원본·출처: CIA 2021 세계 정치지도, NRCan 캐나다 전도. 원본 PDF와 메타데이터·권리·해시 보존.

## 대상과 기준일

사용자의 “미시지도보단 거시지도 위주로 학습” 요청을 이번 학습의 우선 조건으로 적용했다. 전체 세계와 국가 단위가 확인된 실제 원본 2개로 시작한다. 기존 Semap 시가지 패치와 US Topo 상세 도엽은 이번 추가 학습에 사용하지 않았다. 44개 타일은 두 원본의 계산 단위이며 44개의 새로운 지도로 세지 않는다. 각 타일에는 원본 전체의 축소 문맥도 함께 입력한다.

자료 수가 이전 회차보다 적은 이유는 원본 전체의 지리 범위와 출처·감독 근거가 확인된 거시지도를 우선했기 때문이다. 이 회차로 대륙별·문자권별·제작 계열별·역사 시기별 다양성을 확보했다고 주장하지 않는다.

## 근거와 방법

| 원본 | 범위와 판본 | 학습 감독 |
|---|---|---|
| CIA Political Map of the World, February 2021 | 세계 전체, Robinson, 표기 축척 1:35,000,000 | 실제 인쇄된 국가 색면 사이의 명확한 흰 틈에서 얻은 보수적 국경 감독 |
| Natural Resources Canada, Canada national reference map | 캐나다 전도. 포털 모음 연도 2022, PDF 저작권 표기 2024. 발행일은 미상 유지 | 원본 범례와 대응하는 국제·주/준주 경계의 색·굵기·점선 패턴 |

CIA 원본의 [공식 URL](https://www.cia.gov/the-world-factbook/static/a3923845c9726ba40450a039d3f3b96b/world_pol.pdf)은 현재 은퇴 안내로 리디렉션한다. [고정된 원본 재현물과 출처 메타데이터](https://commons.wikimedia.org/wiki/File:CIA_World_Map_Political_2021.pdf)를 사용했고, 게시된 크기 23,624,840 bytes와 SHA1 `e520e8ddedf44a8496e30e250ace8e26432c3cd0`을 확인했다. 파일의 실제 지도 내용과 원본 vector fill을 확인했다. [CIA 이용 조건](https://www.cia.gov/site-policies/)의 저작권 예외·출처 표시 조건을 기록하고 지도 표기와 크레딧을 보존했다. 특정 영토 주장에 대한 제품의 승인으로 해석하지 않는다.

캐나다 지도는 [공식 PDF](https://ftp.maps.canada.ca/pub/nrcan_rncan/Geographical-maps_Carte-geographique/SmallScaleReferenceMaps/english_canada/colour/Canada.pdf), [공식 자료 모음](https://open.canada.ca/data/en/dataset/e9ffaaa6-c8f0-4c88-be9a-5d019a919ad8)의 Open Government Licence - Canada 조건을 확인했다. Natural Resources Canada·Atlas of Canada와 Crown 표기를 보존했다. 모음의 연도를 개별 PDF 발행일로 덮어쓰지 않았다.

출처·SHA256·규칙은 앱의 `tools/reference-analysis/macro-source-catalog.json`, 원본은 `corpus/macro-political/sources/`에 있다. 세계 원본 SHA256은 `78881fcb06202245a3c195cf480bb4c9bd1ff1fbb913685cf0ff16f0ca264204`, 캐나다 원본은 `954101b51bce0f3313394e960e4bb1b4570d03c4b03b2f2b08166073afea731a`이다. 검토한 아시아·오세아니아·아프리카 PDF 중 사용할 의미 벡터를 분리하지 못한 자료는 수집 목록으로만 남기고 학습 수에 넣지 않았다.

이 마스크는 **출처 파생 약한 감독(`source-derived-weak`)**이다. 독립 검수 정답이 아니다. 세계지도에서는 서로 다른 국가 색면 사이의 실제 흰 틈만 양성, 확실한 색면 안쪽만 음성으로 쓰며 바다·해안·같은 색 사이의 틈·글자 가림·그 밖의 애매한 부분은 미상으로 둔다. 해안 가까운 색면, 동일 색상과 분쟁 표현의 한계는 남아 있다. 지도에 그려진 표현을 학습하며 주권·역사적 귀속을 확정하지 않는다.

캐나다 지도는 원본의 실제 경계 선형을 다시 래스터화하고 해당 색이 입력 영상에 보이는 부분만 채택한다. PyMuPDF 경로 추출이 클리핑·가림을 완전하게 재현한다고 가정하지 않는다. 현재 원본을 육안 검토했지만 임의의 미래 PDF까지 인증하지 않는다. 범례와 미분류 경계 표현, 글자 영역은 감독에서 제외한다. 검증기는 원본 PDF·메타데이터 해시와 함께 이미지·마스크·유효성·양성 수를 다시 계산해 비교한다. 파일 해시와 정답을 함께 바꾼 조작도 원본 변환과 다르면 거부한다.

`--macro-only`는 범위 필드만 믿지 않고 원본 범위와 결합된 `macro-vector-supervision` 계약을 요구한다. 코드 검토에서 기존 도시 패치에 country라는 범위만 붙여도 통과하던 문제가 재현되어 수정했다. 기본 자료와 보조 자료 모두 같은 검사를 받는다. 다른 출처 형식은 범위를 검증하는 계약이 추가될 때까지 이 옵션에 들어올 수 없다. 비용은 향후 정상적인 거시지도도 수입기 작업이 필요할 수 있다는 점이다.

## 실행 결과와 한계

GPU 8회 학습, batch 1, LR 0.00001, 인코더 동결 2회 후 미세조정, 원본 단위 균등 샘플링으로 시작했다. 초기화는 실제 `models/diverse-v2/boundary.pt`이며 SHA256은 `9b6f0de59f91073226154191daa1f98e1295b99ab5006bb033182ca82ea3f553`이다. 이번 데이터에는 국경·행정경계만 감독이 있다. 해안·수계·교통·문자·도곽은 미학습으로 표시하고 출력을 억제한다. 이전 모델의 나머지 기능이 개선됐다고 해석하지 않는다.

실제 GPU 학습 8회를 완료했다. 총 352개 시도 배치, 성공 갱신 349번, AMP 건너뛰기 3번이다. 학습 손실은 2.811404124에서 1.144307216으로 내려갔고, 학습 손실이 가장 낮은 마지막 epoch 7 체크포인트를 선택했다. 다른 코퍼스 구성인 이전 회차의 손실과 직접 비교하지 않는다. 모든 자료는 train이며 `validationLoss=null`이다.

| 실행 결과 | 값 |
|---|---|
| [체크포인트](../models/macro-v1/boundary.pt) SHA256 | `821ac74bce26018c1da8d5ae273dc33a9a17f02f76c25039e94e44ea8247f218` |
| [ONNX](../models/macro-v1/boundary.onnx) SHA256 | `48dc77b43e4bdad2555bb757a46f2da818f50b897686c1461f1a9efc5ece4155` |
| ONNX 크기 | 16,697,571 bytes |
| [실제 ORT WASM CPU 검사](../models/macro-v1/onnx-wasm-parity.json) | Windows Headless Chromium 151, 1 thread, 외부 요청 0 |
| 출력 | 1×7×512×512 logits, 모두 유한값 |
| PyTorch 최대/평균 절대 오차 | 0.000276804 / 0.000022477 |
| 해당 단일 타일 로드/추론 | 약 313ms / 654ms |

동일 원본의 국경 양성이 가장 많은 타일 1개씩을 이전 체크포인트와 비교했다. 감독이 있는 픽셀만 기준값 0.55, 허용 거리 0px로 비교한 학습용 pixel Dice다. 전체 지도 정확도나 계획의 경계 허용 거리 평가 지표가 아니다.

| 선택한 학습 타일 | 이전 → 이후 Dice | 관찰 |
|---|---|---|
| 세계지도 국경 | 0.0000 → 0.6481 | 이전의 거의 무응답에서 실제 경계에 반응. 감독상 재현율은 0.5144로 누락이 남음 |
| 캐나다 국제 경계 | 0.0000 → 0.2261 | 반응이 생겼지만 선이 두꺼워지고 행정경계·주변 선을 혼동. 감독상 정밀도 0.1316 |
| 캐나다 행정 경계 | 0.0000 → 0.3265 | 감독상 재현율 0.9928이나 여분 응답이 커 정밀도 0.1954 |

[전후 수치·정의](../models/macro-v1/training-comparison.json), [출력 진단](../models/macro-v1/diagnostics/diagnostics.json), [학습 로그](../models/macro-v1/training.log), [버전·해시·학습 요약](../models/macro-v1/training-summary.json)을 보존했다. [세계지도 감독 범위](../corpus/macro-political/cia-world-political-2021-supervision.png)와 [캐나다 감독 범위](../corpus/macro-political/nrcan-canada-national-supervision.png)도 기록했다. 전후 이미지는 진단 폴더의 두 JPG에서 확인할 수 있다. 출처에서 얻은 약한 감독 자체가 놓친 경계도 있기 때문에 이 수치를 전체 실제 경계 성능으로 확대 해석하지 않는다.

코퍼스·출처 Python 35개, 모델·샘플링·범위 Python 9개, 승인 게이트·패키지·타일 Node 3개, 총 47개가 통과했다. 범위 위장 문제는 실패 재현 후 고쳤고 실제 기존 Semap 도시 원본의 위장 입력도 거부됨을 확인했다. 별도 코드 검토의 중요 지적 1개를 수정했으며 보류한 경미 지적은 없다. 실제 ONNX checker와 WASM 수치 비교도 통과했다.

학습 손실과 원본 타일 비교는 fitting이며 독립 정확도가 아니다. 독립적인 거시지도 경계 정답, 여러 언어와 역사 시기의 자료, 실제 Windows WebView2·Android 성능 검증은 남아 있다. 역사적 정확도·0.5 CSS px 기준을 검사했다고 주장하지 않는다.

## 데이터 반영과 판본

모델·원본·마스크·진단·보고서는 외부 자료 저장소에 보관한다. 앱 Git에는 코드·카탈로그·테스트·개발 계획 및 자료 핀만 둔다. `trainingOnly=true`, `evaluationStatus=pending`, `releaseApproved=false`를 유지하며 활성 모델 경로와 국가·행정구역 객체는 바꾸지 않는다. `main` 통합·배포는 이번 실험 모델 작업에서 하지 않는다.

정리: 범례 제외를 반영하며 학습 전 초안 파생물 11개 / 1,813,297 bytes를 지우고 다시 만들었다. 이는 재생성이므로 순 확보 공간으로 세지 않는다. 중복 원본 미리보기 5개는 사용 종료와 원본 PDF·훈련 영상·현재 감독 미리보기 보존을 확인한 뒤 삭제해 총 3,418,351 bytes를 회수했다. [경로·크기·SHA256 기록](../models/macro-v1/preview-cleanup.json)을 남겼다. 검사용 로컬 서버도 종료했다. 다른 작업의 미추적 Worker 파일과 상설 워크트리는 보존했다.

이 보고서는 [다양한 고지도 추가 학습](diversity-training-2026-10-23.md)의 거시지도 우선 후속이다. 이전 체크포인트와 결과는 초기화·비교 재현에 필요한 입력이다. 이번 파일럿의 제한을 개선된 독립 성능이나 전체 계획 완료로 표시하지 않는다.
