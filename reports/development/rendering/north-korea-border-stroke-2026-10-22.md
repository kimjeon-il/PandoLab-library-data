# 북중 국경 선 굵기 차이 진단 — 2026-10-22

- 범위: 현재 main 자료의 PRK/CHN 공유 경계 캐시와 현재 GPU stroke renderer의 선분 밀도별 알파 출력. 역사적 정확성 검사는 아님.
- 입력: assets/data/world/current.json의 source 및 compatibility.sharedBoundaries.canonical; assets/js/modules/gpu-stroke-renderer.js, gpu-stroke-geometry.js.
- 실행: node --test .codex-remote-attachments/north-korea-border-render.test.mjs, 1회 실행, 1개 통과. 전체 검사 미실행.
- 실제 공유 경계: 2,425개 선분, 방향 무관 양 끝 좌표가 완전히 같은 중복 0개.
- 기준 너비 2560 CSS px / flatZoom 64의 평면 투영 계산에서 1px 미만 선분 1,880개. 사용자 캡처의 실제 배율은 미확인.
- 통제 재현: 0.72 CSS px, DPR 1, WebGL2, 640px 직선을 한 선분과 1px 간격 640개 선분으로 비교. 경로 자체는 동일.
- round + AA: 알파 합/가로 길이 0.811764706 -> 1.003921569 px, 약 23.67% 증가. 이는 알파 면적 지표이며 선 굵기나 화면 전체 개선율이 아님.
- miter + AA: 양쪽 모두 0.811764706 px. round + AA 꺼짐: 양쪽 모두 1px. GPU 오류 없음.
- 결론: 현재 GPU의 round 이음부 AA 합성은 선분 밀도에 따라 색 누적을 만든다. 완전히 같은 선분의 캐시 중복은 이 북중 자료에서 발견되지 않았다.
- 한계: 사용자 사진의 정확한 위치·날짜·배율에서 앱 전체를 재현한 것은 아님. 근접하지만 불일치하는 좌표, 부분 중첩, 전체 실행 중 중복 렌더링은 이번 검사로 배제하지 않았다. 제품 코드 수정·배포 없음.
- 증거: 같은 이름의 -evidence/ 아래 실행 JSON, 캡처, 사용한 검사 원문. 캡처는 통제용 직선이며 실제 북중 지도 캡처가 아님.
