# 참조 이미지 자동 분석 기록

- 최신 후속 구현: [UI-REF-PANELS-20261023 — 독립 검색·삽입도·격자점·첨부 저장](panels-package-2026-10-23.md). 전체 계획 미완료. 실제 라벨·학습 모델·Android 평가가 남아 있다.
- 이전 구현: [UI-REF-ANALYSIS-20261023 — 언어팩·방향 복원·경계 검토](continuation-2026-10-23.md). 해당 시점 검증 기록이며 최신 검증으로 해석하지 않는다.
- 최초 구현: [UI-REF-ANALYSIS-20261022](implementation-2026-10-22.md).
- 자료: `corpus/sources/*.source.json`은 수집 원본/공식 축소본의 출처·권리·해시, `analysis-inputs.json`은 앱 입력 파생본과 원본 좌표 비율이다. 학습 정답은 아니며 `trainingReady=false`를 유지한다.

압축 보관본과 전체 원문은 PandoLab의 report-paths 소유자를 통해 저장한다. 검증 코드는 앱 저장소에서 실행하고 이 자료 저장소에서 실행하지 않는다.
