# 거시지도 조건 확장 학습 — 아시아 대륙·흑백 전도

> 보고서 ID: `UI-REF-MACRO-CONDITIONS-20261023` · 상태: `investigating` · 지도 반영: `not-applied`  
> 코드: `f4e24681d77df9290afd5eb934b1d56b1bcc7cad` · 초기 자료 핀: `71a67904db2beb933735727ad6c19adde082d2bd`  
> 독립 평가·출시 승인 미완료. 원본·라벨·가중치는 외부 자료 저장소에 보관.

## 범위와 원본

기존 세계지도·캐나다 전도에 실제 [CIA 아시아 대륙 지도 2013](https://maps.lib.utexas.edu/maps/middle_east_and_asia/asia_pol_2013.pdf)와 [NRCan 흑백 캐나다 전도](https://ftp.maps.canada.ca/pub/nrcan_rncan/Geographical-maps_Carte-geographique/SmallScaleReferenceMaps/english_canada/b&w/Canadab&w.pdf)를 추가했다. CIA 원본은 대학 도서관 재현물의 실제 다운로드 SHA256을 대조하고 인쇄 코드 `803612AI (G00543) 8-13`, 1:48,000,000, Azimuthal Equal-Area Projection을 보존했다. 연도는 2013으로 기록하며 PDF 생성일을 발행일로 바꾸지 않았다. CIA 출처·사용 조건과 지도 자체의 영토 표현 주의 문구를 유지한다.

캐나다 흑백판은 같은 제작 계열·같은 원본 그룹의 인쇄 변형이다. 컬러판과 `duplicateGroup=nrcan-canada-national`을 공유한다. 원본 그룹은 **3개**, 입력 판본은 **4개**, 실제 감독이 있는 계산 타일은 **96개**다. 96개 지도를 확보했다거나 흑백판을 독립적인 평가 지도라고 세지 않는다. 기존 원본 그룹 샘플러가 컬러·흑백을 묶어 캐나다의 비중을 두 배로 늘리지 않는다. 지도 언어는 모두 영어이며 비라틴·고대 문자·역사 시기 일반화를 검증하지 않았다.

[고정 코퍼스](../corpus/macro-political/corpus.conditions.training.json)는 기존 두 원본의 manifest 옆에 둔다. 기존 원본 PDF와 `corpus.training.json`은 보존했다. 앱의 `macro-source-catalog.json`에 URL·권리·크기·해시·범위·색상/선형 규칙을 고정했다. 캐나다 발행일은 미상이며 저작권 표기 2024를 발행일로 단정하지 않는다. 같은 공식 자료 모음의 이용 조건과 Crown/NRCan 크레딧을 유지한다.

## 감독의 한계

실제 인쇄 색면 사이의 틈 또는 범례와 일치하는 선형에서 얻은 **출처 파생 약한 감독**이다. 독립 검수 정답이 아니다. 글자·범례·해안·같은 색 경계·애매한 부분은 미상으로 두며, 아시아의 인도·파키스탄·중국 분쟁 표현 주변은 넓게 제외했다. 역사적 귀속과 주권을 확정하지 않는다.

특히 아시아의 전체 국경 양성 마스크는 **1,526픽셀**, 선택 진단 타일의 양성은 **258픽셀**뿐이다. 굵은 실제 경계 상당 부분이 미상으로 남는 매우 성긴 감독이다. 아래 아시아 Dice 0.9981은 이 작은 감독 집합의 fitting이며, 전체 경계를 거의 모두 추출했다는 뜻이 아니다. 육안 진단에서도 완전한 경계망을 입증하지 못했다. 이 지도에서 목표 경계 정밀도·재현율을 달성했다고 주장하지 않는다.

## 실제 학습·추론

GTX 1650 CUDA에서 macro-v1 실제 체크포인트를 초기화로 사용해 8회 추가 학습했다. batch 1, LR 1e-5, 인코더 동결 2회, 원본 그룹 균등 샘플링이다. 768개 배치를 시도해 **764번 실제 optimizer 갱신**, AMP 건너뛰기 4번을 기록했다. 최저 학습 손실로 epoch 7을 선택했고 손실은 0.481696735, `validationLoss=null`이다. 자료 구성이 다른 이전 학습 손실과 직접 비교하지 않는다.

| 산출물 | SHA256 |
|---|---|
| [PT](../models/macro-v2/boundary.pt) | `b5c60836159048d59825bee921870a7b3cc226393d40f96d385b8d596423edf4` |
| [ONNX](../models/macro-v2/boundary.onnx) | `fa006251ebedd5892ea7e9485c83f83b8b4f1d8dc29f38148a0d846d257829e5` |
| 초기화 macro-v1 | `821ac74bce26018c1da8d5ae273dc33a9a17f02f76c25039e94e44ea8247f218` |

[학습 요약](../models/macro-v2/training-summary.json), [원본 로그](../models/macro-v2/training.log), [실제 입력·전후 진단](../models/macro-v2/diagnostics/diagnostics.json)을 보존했다. ONNX 크기는 16,697,571 bytes다. ONNX checker와 실제 로컬 ORT WASM CPU 추론이 통과했다. Windows Headless Chromium 151, 1 thread, 유한한 1×7×512×512 출력, PyTorch 최대 절대 오차 0.0004405975, 외부 요청 0이다. 측정한 한 타일의 모델 로드는 약 430.8ms, 추론은 675.5ms였다. [실행 근거](../models/macro-v2/onnx-wasm-parity.json). 전체 8MP 또는 Android 성능이 아니다.

## 같은 선택 학습 타일의 전후 비교

감독이 있는 픽셀만 threshold 0.55, 허용 거리 0px로 비교했다. 계획의 원본 선폭 기반 경계 평가나 독립 지도 정확도와 다른 진단이다.

| 선택 학습 타일 / 채널 | Pixel Dice 전 → 후 |
|---|---|
| cia-world-political-2021 / international | 0.6481 → 0.8764 |
| nrcan-canada-national / international | 0.2261 → 0.3171 |
| nrcan-canada-national / administrative | 0.3265 → 0.4716 |
| cia-asia-political / international | 0.8019 → 0.9981 |
| nrcan-canada-monochrome / international | 0.2424 → 0.3449 |
| nrcan-canada-monochrome / administrative | 0.5586 → 0.5302 |

[수치·정의](../models/macro-v2/training-comparison.json). 캐나다 컬러판의 재현율은 국제 경계 0.8028→0.7635, 행정 경계 0.9928→0.8877로 내려갔다. 흑백판 행정 경계는 Dice 0.5586→0.5302, 정밀도 0.4898→0.4008로 후퇴했다. 흑백판 국제 경계 정밀도도 0.2257에 머문다. 출력 육안 검토에서 두꺼운 반응·국제/행정 혼동이 남아 있음을 확인했다. 개선된 일부 fitting만 근거로 승격하지 않는다.

## 구현·검사·운영

기존 수입기에 안전한 `--manifest-name`을 추가했다. 동일한 입력을 다시 준비해도 기존 manifest 순서와 바이트를 유지해 학습 fingerprint를 바꾸지 않는다. 원본으로 이미지·마스크·라벨을 다시 계산해 일치할 때만 이전 producer 해시를 원래 생성 이력으로 보존한다. 다른 감독·경로 탈출·기존 파일 덮어쓰기는 거부한다. 실제 확장 코퍼스 CLI 재실행도 통과했다.

회귀 검사: 코퍼스·원본·macro Python 22개, 모델/샘플링 Python 9개, 패키지·승인 게이트·타일 Node 4개, 총 **35개 통과**. 관련 검사의 범위만 실행했다. 별도 읽기 전용 코드·증거 검토에서 중요 지적은 없었다. 실제 진단 수치와 PT/ONNX 해시도 재확인했다.

작업 시작 시 현재 코드 핀 71a67904와 실제 자료 체크아웃/보고서 연결 fa2de64a가 달랐다. 두 보관본의 macro-v1과 기존 manifest가 동일함을 확인하고 기존 library-data 소유자로 현재 핀을 준비했다. 신규 근거 14개 /3,017,621 bytes만 해시·독점 생성 조건으로 올바른 작업본에 복사했다. 기존 원자료와 다른 분야의 GIS/WASM 내용은 교체하지 않았다. fetch가 시작한 불필요한 자동 Git 재압축은 해당 자식 프로세스 관계를 확인해 중단했고 자료 복원과 학습은 완료했다.

사용자가 수정한 CHECK-BUDGET도 확인했다. 명령 분류 11개와 Main 조기 통과 8개, 실제 hook 프로세스 3개를 검사했다. 일반 읽기/부분 검사는 허용되고 승인 없는 전체 검사는 거부됐다. 실제 전체 테스트를 실행하거나 승인·횟수 장부를 바꾸지 않았다. 로컬 추론 검사용 서버는 종료했다. 캐시 정리의 실제 경로·삭제량은 별도 cleanup-result JSON을 따른다.

## 남은 출시 조건

`trainingOnly=true`, `evaluationStatus=pending`, `releaseApproved=false`를 유지한다. 국경·행정 경계만 감독이 있고 해안·수계·교통·문자·도곽은 미학습으로 억제한다. 앱의 활성 모델 경로, 국가·행정구역 객체, main 및 배포를 바꾸지 않았다.

다음은 독립적으로 검수한 거시지도 라벨, 성긴 아시아 감독 보완, 국제/행정 혼동 및 흑백 오검출 보완, 역사 지도·비라틴 지도군 확보, 실제 Windows WebView2·Android의 전체 오프라인 흐름 및 메모리/시간 검증이다. 이를 완료한 것으로 보고하지 않는다.

정리 결과: 두 실제 정리 기록에서 미사용 runtime materialized 캐시 6개 / 5393505740 bytes(약 5.02 GiB)를 삭제했다. 원본과 작업 트리/실행에서 쓰는 캐시는 보존했다. 파일 집합이 보관본과 달라 미사용 복제본임을 증명하지 못한 캐시는 삭제하지 않았다. [운영 검증 근거](../models/macro-v2/operation-verification.json). 완료된 build-native/macro-source-preview.png 삭제는 실행 정책의 blocked by policy 거부로 수행하지 못했다.
