# 실제 학습 모델과 다양한 고지도 조건의 보조 학습

> 보고서 ID: `UI-REF-TRAINED-20261023` · 상태: `investigating` · 지도 반영: `not-applied` · 색인일: 2026-10-23  
> 원문 최종 수정: 2026-10-23  
> 조사 기준: `work/ui` 코드 `f9fe57e3c00dc37fd7be63074bc3de749116a396` / 공통 WASM 변경 없음  
> 원본·출처: 아래 출판사 PDF, Semap 고정 판본 및 함께 보존한 권리·해시 기록

## 대상과 기준일

사용자 요청은 실제 학습 가중치 추가이며, 후속 지시는 유사한 지도의 수량보다 다양한 조건의 지도를 우선하는 것이다. 이 회차는 학습 파이프라인과 실제 PyTorch/ONNX 가중치를 추가한다. 앱의 승인된 경계 추출 모델 배포나 역사적 귀속 확정은 아니다.

첫 단계는 USGS 2014–2017년 US Topo 5장이다. 연도는 발행일이며 역사 경계의 효력일로 해석하지 않는다. 두 번째 단계는 실제 고지도의 수계·도로 보조 라벨이다. 개별 고지도의 정확한 연대·제작 계열·언어는 확인되지 않았으므로 미상으로 유지했다. 기관 수를 독립 지도 제작 계열 수로 세지 않았다.

## 근거와 방법

- [USGS 재사용 조건](https://www.usgs.gov/faqs/are-usgs-topographic-maps-copyrighted)에 따라 원본 PDF와 지도별 제3자 표기·본문을 함께 보존했다. 자료를 일괄 Public Domain으로 표시하지 않는다. 앱 코드의 `usgs-source-catalog.json`에 URL·발행일·SHA256·크기를 고정했다.
- `corpus/usgs-publisher/sources/`: Pajarito Peak, Detroit, East Brownsville, Eastport, Guthrie 원본 5장. PDF 선택 레이어의 국제·주/카운티 경계·수계·교통·도곽과 글리프 상자를 2560px 장변의 실제 지도 래스터 및 비트필드 마스크로 변환했다. 사진/음영기복 레이어는 끈 출판사 지도 표현을 사용했다.
- 글자에 가려진 선은 미상으로 두며 해안은 감독하지 않았다. 긴 글자 span 상자가 지도 내부를 덮는 오류를 실제 자료에서 발견하여 글리프 단위로 고치고 재생성했다. 원본 PDF는 변경하지 않았다.
- [Semap 고정 판본 19048095](https://zenodo.org/records/19048095), Petitpierre, Gomez Donoso, Kriesel, EPFL. 저자 라벨 CC BY 4.0이며 원 지도별 권리는 `corpus/semap-diverse/sources/license_images.md`를 따른다. 비상업/권리 불명 기관은 제외했다. 원본 패치와 원본 PNG 라벨 및 저자 README·분할 목록을 보존했다.
- 합성 이미지와 원래 validation/test 자료를 제외하고 저자의 real/train 자료에서 원본 항목당 한 패치만 골랐다. 7개 허용 기관 중 실제 선택된 기관은 Boston Leventhal, e-rara, Library of Congress, NYPL, Princeton, Leiden의 6개다. 전체 수집 24개 중 라벨이 전혀 없는 7개는 학습 타일을 만들지 않는다. 실제 추가 학습은 서로 다른 원본 17개 / 타일 65개이며 USGS 5장 / 150개 타일과 혼합했다.
- 고지도 수계/도로 라벨은 `hydro`/`transport`만 감독한다. 명시적으로 라벨된 built/non-built 픽셀만 두 채널의 음성 근거로 쓰고 background/contours는 무시했다. 국경·행정경계·해안·문자·도곽 정답을 이 자료에서 만들어내지 않았다. 해당 채널은 고지도 패치에서 미상이다.
- ZIP HTTP Range로 선택한 원본 멤버만 내려받아 2GB 이미지 ZIP, 258MB 라벨 ZIP 및 816MB 외부 모델 전체 다운로드를 피했다. 범위 응답·길이·ZIP CRC·개별 로컬 SHA256은 확인했다. 부분 다운로드한 전체 ZIP의 MD5를 검증했다고 주장하지 않는다. 작은 README·권리표·분할 ZIP은 고정 MD5까지 확인했다.
- 실제 스캔 다양성은 [원본 접촉 시트](corpus/semap-diverse/source-diversity-inspection.jpg)에서 확인했다. 판화, 착색 지도, 시가지도, 낡은 종이, 도곽과 장식이 섞여 있다. 색/흑백 필드는 입력 chroma 추정값이며 원래 인쇄 기법의 검증값은 아니다. 단순 재색칠·회전 증강을 새 원본으로 세지 않았다.

학습은 PandoLab 고정 Python 환경과 GTX1650, PyTorch `2.14.1+cu126`, torchvision `0.29.1+cu126`, CUDA AMP, 배치 1에서 실행했다. MobileNetV3-large ImageNet V2 인코더와 기존 U-Net/context 구조를 사용했다. seed는 20261022이다. 지명 OCR 언어팩 추가와 분할 모델 학습의 문자권 성능은 별개다.

첫 USGS 단계는 12 epoch / 1800개 배치를 처리했고 학습 손실은 1.8973 → 1.1049였다. 이 단계는 AMP 건너뛰기를 따로 계수하지 않았으므로 정확한 갱신 횟수는 미상이다. 이를 1800번의 성공 갱신이라고 해석하지 않는다.

실제 이 체크포인트에서 혼합 학습을 초기화했다. 혼합 4 epoch는 배치 860개, 성공 갱신 855개, AMP 건너뛰기 5개다. 학습 손실로 선택한 체크포인트는 epoch 1 / 배치 430개 / 성공 갱신 425개이며 손실 2.087218915다. 마지막 epoch 손실 2.087435129보다 약간 낮아 앞선 체크포인트를 선택했다. 서로 다른 코퍼스·양성 가중치의 두 단계 손실을 같은 지표의 향상으로 비교하지 않는다. 모든 자료는 train이고 validationLoss는 null이다.

## 확인 결과와 한계

실제 결과물:

| 결과 | 값 |
|---|---|
| [학습 체크포인트](models/diverse-v1/boundary.pt) SHA256 | `305c0c63a3942f55f2dc8ca0a91698b6eff7b16d5e5df35d4c0e091cd4a53fef` |
| [ONNX](models/diverse-v1/boundary.onnx) | 16,697,571 bytes / 약 15.92MiB |
| ONNX SHA256 | `2cab8ce3fc4ebd321b39e24fcd90c2f8c29b635e9e3e5b0f3254af759f63071e` |
| [Manifest](models/diverse-v1/boundary.manifest.json) | `trainingOnly=true`, `evaluationStatus=pending`, `releaseApproved=false` |
| 출력 | 1×7×512×512 logits, 모두 유한값 |
| [실제 ORT WASM CPU 검사](models/diverse-v1/onnx-wasm-parity.json) | Windows Headless Chromium, 1 thread, 외부 요청 0 |
| PyTorch 대비 최대/평균 절대 오차 | 0.000125885 / 0.000026983 |
| 해당 단일 타일 모델 로드/추론 | 약 833ms / 673ms |

[학습 요약·해시·패키지 버전](models/diverse-v1/training-summary.json), [첫 학습 로그](models/usgs-publisher-v1/training.log), [혼합 학습 로그](models/diverse-v1/training.log), [출력 진단 5장](models/diverse-v1/diagnostics/diagnostics.json), [고지도 진단 17개](models/diverse-v1/auxiliary-diagnostics/diagnostics.json)를 보존했다. 첫 단계 체크포인트는 혼합 학습의 실제 초기화 입력이므로 재현에 필요한 자료다.

이 검사는 실제 학습 가중치의 실행과 학습 원본에서의 출력을 증명한다. 독립 검증 정확도는 아니다. 육안 검사에서 USGS 경계는 대체로 포착되지만 획이 두꺼워지거나 주변에 여분의 응답이 있다. 고지도에서는 그림자·건물 장식·문자 주변을 물이나 도로로 잘못 분류하고, 희미하게 표현된 물·도로를 누락하는 사례가 크다. 출판사 레이어와 공개 라벨을 사용한 1차 학습 모델이며 출시 기준을 달성했다고 판단하지 않는다.

특히 고지도 자료가 국경·행정경계의 다양한 제작 계열을 감독한 것은 아니다. 그 다양성을 확보할 실제 경계 라벨, 아랍어/페르시아어/우르두어·그리스어·한중일 지도의 검수된 분할 라벨, 독립 제작 계열의 검증·시험 자료가 남아 있다. 해안 채널은 아예 미학습이다. 감독이 없는 채널을 음성 정답으로 처리하지 않고 출력을 억제했다.

검증: 코퍼스·원본·출판사/Semap 도구 Python 28개, 모델/손실/감독·AMP/초기화 회귀 6개, 승인 manifest·패키지·타일 Node 검사 3개가 통과했다. 실제 ONNX checker와 실제 ORT WASM 추론도 통과했다. 전체 저장소 검사, Windows WebView2의 새 모델 프로파일, Android 성능, 8MP 전체 분석 메모리/180초 기준, 독립 경계 정밀도/재현율, 역사적 기준 형상 및 화면 오차 기준은 실행하지 않았다.

## 데이터 반영

모든 원본·라벨·가중치·진단은 외부 자료 저장소에 저장한다. 앱 Git에는 도구·계약·테스트·개발 계획만 들어간다. 활성 `reference-analysis/v1` 배포 모델 경로에는 미승인 가중치를 설치하지 않는다. 기존 승인 게이트는 그대로 유지하며 실제 국가·행정구역 형상을 바꾸지 않았다. `work/ui → main` 통합과 앱 모델 배포는 하지 않았다.

정리: 실제 학습 모델 검사에 대체된 미사용 무작위 인터페이스 모델 `D:/dev/worktrees/ui/build-native/reference-analysis/interface-smoke.onnx` 하나를 경로·용도·SHA256 확인 후 삭제해 정확히 16,642,355 bytes를 회수했다. 설치 wheel은 캐시/중복 파일을 남기지 않았다. 외부 원본과 재현 입력, 관련 없는 Worker 미추적 파일, 상설 워크트리는 보존했다.

## 판본

이 보고서는 실제 학습 모델 추가 회차다. 이전 UI/패키징 보고서의 미학습 시점 기록을 소급 수정하지 않는다. 후속 독립 평가가 완료되면 별도 보고서로 연결한다. 현재 전체 자동 분석 계획은 미완료다.
