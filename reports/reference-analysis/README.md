# 참조 이미지 자동 분석 기록

- 최신 학습 방향: [UI-REF-MACRO-20261023 — 세계지도·국가 전도만으로 학습](macro-training-2026-10-23.md). 실제 거시지도 원본 2개 / 44개 타일, GPU 8회·349번 성공 갱신. 새 국경 반응과 굵기·국제/행정 혼동을 함께 기록했다. 약한 감독의 소규모 실험이며 독립 평가 전 미승인 모델이다.

- 최신 학습 후속: [UI-REF-DIVERSITY-20261023 — 실제 고지도 82개·9개 기관으로 계속 학습](diversity-training-2026-10-23.md). 실제 GPU 6회 / 2,801번 성공 갱신과 ONNX WASM 실행 확인. 고지도 수계 fitting 개선·교통 누락 증가 등 후퇴도 함께 기록했으며 독립 평가 전 미승인 실험 모델이다.

- 실제 학습 모델: [UI-REF-TRAINED-20261023 — USGS·다양한 고지도 보조 학습](trained-model-2026-10-23.md). 실제 PT/ONNX 및 WASM 추론 확인. 고지도 수계·도로 오검출/누락, 다문자·독립 경계 평가와 Android 검증이 남아 있어 미승인 실험 모델이다.

- 최신 후속 구현: [UI-REF-PANELS-20261023 — 독립 검색·삽입도·격자점·첨부 저장](panels-package-2026-10-23.md). 전체 계획 미완료. 실제 라벨·학습 모델·Android 평가가 남아 있다.
- 이전 구현: [UI-REF-ANALYSIS-20261023 — 언어팩·방향 복원·경계 검토](continuation-2026-10-23.md). 해당 시점 검증 기록이며 최신 검증으로 해석하지 않는다.
- 최초 구현: [UI-REF-ANALYSIS-20261022](implementation-2026-10-22.md).
- 자료: `corpus/sources/*.source.json`은 수집 원본/공식 축소본의 출처·권리·해시, `analysis-inputs.json`은 앱 입력 파생본과 원본 좌표 비율이다. 학습 정답은 아니며 `trainingReady=false`를 유지한다.

압축 보관본과 전체 원문은 PandoLab의 report-paths 소유자를 통해 저장한다. 검증 코드는 앱 저장소에서 실행하고 이 자료 저장소에서 실행하지 않는다.
