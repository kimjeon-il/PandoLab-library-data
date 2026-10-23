# 실제 학습 모델과 다양한 고지도 조건의 보조 학습

> 압축 열람본: 도입부 발췌. 전체 출처·결론·미확인 내용은 연결한 원문을 따른다.



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
- 합성 이미지와 원래 validation/test 자료를 제외하고 저자의 real/train 자료에서 원본 항목당 한 패치만 골랐다. 7개 허용 기관 중 실제 선택된 기관은 Boston Leventhal, e-rara, Library of Congress, NYPL, Princeton, Leiden의 6개다. 전체 수집 24개 중 라벨이 전혀 없는 7개는 학습

[무손실 압축 원문](../../archive/blobs/e0ea28fd962d6e3f35ae8a5fe23dd4c6e2404f7121e5d30af68a8074b1cdf2ca.gz)
