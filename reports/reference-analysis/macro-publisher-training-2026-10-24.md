# 거시지도 제작 계열 확장 학습

> 보고서 ID: `REF-MACRO-004` · 상태: `investigating` · 지도 반영: `not-applied` · 색인일: 2026-10-24
> 원문 최종 수정: 2026-10-24
> 조사 기준: work/ui, storage main integration `98f59a884bea0abf76d9834ae0135929eca3bcf1`

## 대상과 출처

기존 세계·아시아·캐나다 전도에 Geoscience Australia의 Australia Folio Map edition 3, GEOCAT 73102를 추가한다. 국가 전도·Simple Conic 투영·지형 색조·도로·철도·하천이 함께 있는 다른 제작 계열이다. 원본 3개에서 4개, 입력 판본 4개에서 5개, 학습 타일 96개에서 123개로 늘었다. 캐나다 컬러/흑백은 같은 원본 그룹이다. 모두 Latin/eng이며 다른 문자권·고지도 다양성을 확보한 결과로 해석하지 않는다.

공식 원본: https://www.ga.gov.au/bigobj/GA20891.pdf
공식 참조 지도 안내: https://www.ga.gov.au/scientific-topics/national-location-information/topographic-maps-data/theme-and-reference-maps/reference-maps
원본 SHA256: `c68ddeef790eacafd1ade0f8353fe8818e3b1e3f01083fdb9bbe0a93e4c3ae57`, 1,333,408 bytes.
원본에 Commonwealth of Australia (Geoscience Australia) 2011 및 CC BY 3.0 Australia가 인쇄되어 있다. 2011은 저작권 표기이며 발행일은 미확인으로 남긴다. 2006 인구자료 연도를 지도 발행일로 간주하지 않는다. 원본·출처·전체 인쇄 notices를 보존했다. 일반 저작권 페이지는 브라우저로 확인했으나 직접 보관 요청은 HTTP403으로 실패하여 HTML 보관 성공을 주장하지 않는다.

## 방법과 실제 확인

회전된 PDF를 메모리에서만 무회전으로 읽고 이미지·벡터 획·문자 제외 영역을 함께 무손실 회전한다. 출력 좌표는 보이는 이미지 기준이다. 90/180/270도, 문자열로 가린 구간, 정규화된 제외 범위, 원본 바이트 보존을 fixture로 검사했다. 실제 지도와 전체 supervision 중첩을 육안 확인했다. 범례 주 경계선의 색·폭·실선을 구분해 administrative 양성 6,904픽셀을 얻었다. 도로·철도·하천과 도곽은 양성으로 바꾸지 않았으며 범례/정부 로고를 포함하는 하단 범위를 제외했다. 독립적인 경계 정답은 아니다.

새 `corpus.publishers.training.json`은 기존 자료를 복사하지 않고 기존 seam recipe와 새 원본을 참조한다. 준비 전 기존 45개 파일이 동일했으며, 이후 기존 코퍼스/이전 모델 64개 해시를 고정·확인했다. fingerprint는 `f4c21c66dc3384cb025d4b400e1a4641bbdd61bb211dcc9a2113c8848d68c432`다.

GTX1650, 실제 macro-v3 초기화, 원본 그룹 균형, 6 epochs, batch1, learning-rate1e-5, encoder freeze2 epochs를 사용한다. 선택은 training loss 기준이며 독립 validation loss는 없다. 최종 수치와 동일 정답 비교는 학습 완료 후 아래에 추가한다.

관련 Python 검사 33개가 통과했다(macro7, corpus12, sources5, model9). 저장공간 변경은 main에서 관련 저장 검사7개와 Pages staging 검사7개가 통과했고 자료 핀을 바꾸지 않고 원격 main에 반영됐다. 전체 앱 빌드를 실행하지 않았다.

## 한계와 반영

가중치는 trainingOnly, evaluationStatus=pending, releaseApproved=false이며 활성 앱 모델과 역사 귀속에 적용하지 않는다. 이 실험의 선택 타일 통계는 source-derived weak target fitting이다. 독립 지도/제작 계열별 정확도, 추가 문자권, 역사적 정확성, 전체 이미지 및 Windows/Android 성능·오프라인 전체 흐름은 미검증이다. 기존 캐나다 regression은 비교 결과와 함께 그대로 보고한다.

증거는 `models/macro-v4/` 및 `corpus/macro-political/`에 저장한다. 런타임 자료 핀과 보고서 원본 소유자는 유지한다. 작업 전 D: 여유는 약27.85GiB, 최대 추가 예산0.5GiB다. 설치 환경과 고정 출력 경로를 재사용한다.

## 최종 학습 및 동일 정답 비교

6회 학습 완료: 전체 738배치, 실제 갱신729회, AMP 건너뜀9회. 선택된5회차(0-based epoch4)는615배치/607갱신/8건너뜀, training loss0.5267204682770865, validation loss=null이다. 총 수행량과 선택 체크포인트의 누적량을 구분한다.

| 지도/채널 | 이전 Dice | 새 Dice | 이전→새 정밀도 | 이전→새 재현율 |
|---|---:|---:|---:|---:|
| cia-asia-political-seams-r4/international | 0.9974 | 0.9972 | 1.0000→1.0000 | 0.9949→0.9945 |
| cia-world-political-2021/international | 0.9654 | 0.9690 | 0.9797→0.9900 | 0.9515→0.9489 |
| ga-australia-general-reference/administrative | 0.1837 | 0.3566 | 0.1063→0.2306 | 0.6747→0.7867 |
| nrcan-canada-monochrome/international | 0.3601 | 0.3268 | 0.2250→0.2349 | 0.9014→0.5371 |
| nrcan-canada-monochrome/administrative | 0.4710 | 0.6579 | 0.3233→0.6141 | 0.8671→0.7084 |
| nrcan-canada-national/international | 0.2912 | 0.3050 | 0.1734→0.1923 | 0.9068→0.7365 |
| nrcan-canada-national/administrative | 0.3782 | 0.4366 | 0.2356→0.2999 | 0.9582→0.8023 |

위 수치는 threshold0.55에서 선택한 실제 학습 타일의, 관측된 픽셀만 집계한 fitting이다. 전체 지도·독립 정확도가 아니다. 호주 administrative와 캐나다 administrative fitting은 개선됐지만 캐나다 흑백 international Dice/재현율은 후퇴했다. 아시아 Dice도 소폭 하락했다. 호주 선택 크롭의 실제 육안 비교에서 도로/철도와 주 경계의 혼동 및 굵은 오검출이 여전히 남는다. 캐나다는 international/administrative 분류 혼동이 남는다. 일부 수치 개선으로 이 오류가 해소됐다고 하지 않는다.

실제 ONNX 구조 검사와 로컬 Chromium ORT WASM CPU 실행: 출력[1, 7, 512, 512], 모두 유한, PyTorch 최대 절대오차0.0003781318664550781, 외부 요청0회, 단일 desktop 타일 추론687.5ms. 전체 지도·Android·WebView2 성능 결과가 아니다. 임시 추론 서버를 종료했다.

새 코드와 실제 GA 소스/마스크는 별도 읽기 전용 검토에서 문제를 찾지 않았다. 최종 모델 해시·집계·보존은 실행자가 실제 파일과 대조하며, 보관 뒤 원시 바이트 복원도 별도로 확인한다. 저장공간 규정 변경 main98f59a88의 Pages build/deploy 성공과 실제 build-meta.js HTTP200/로컬 main 바이트 일치를 확인했다. Application Architecture 작업은 cancelled이며 전체 CI 성공으로 보고하지 않는다.

학습/검증 원본 및 이전 모델64개 해시가 그대로다. 검토용 임시 PNG528,211bytes는 보존 원본에서 동일 바이트 재생성을 확인한 뒤 삭제했다. 최종 감독 마스크 중첩·비교 그림·최선 PT·ONNX·수치 텐서는 이번 실험 검토 근거로 유지한다. 추가 가상환경·모델 복사본·앱 패키지는 생성하지 않았다.

## 최종 보관 검증

범위 보관 snapshot `1019444257e25c02b3087dad901d80903dbb0c58`에서 실제 원문73개를 Git 보관본으로부터 복원하여 원시 바이트가 일치함을 확인했다. 새 논리 파일31개이며 비대상 archive 항목6,027개가 유지됐다. 보고서 원본 소유자와 런타임 핀이 그대로다. archive-verification.json 자체도 후속 보관 후 원문 대조한다. 최종 별도 검토에서도 실제 PT/ONNX 해시·fingerprint·64개 기존 파일·7개 비교 행·학습 집계의 모순을 찾지 않았다.
