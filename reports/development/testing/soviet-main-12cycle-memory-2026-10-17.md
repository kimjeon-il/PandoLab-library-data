# OBJ-087 — 현행 main 동일 소스 1989년 소련 시점 왕복 12회 장기 메모리 검증

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: OBJ-087 · 상태: verified-web-diagnostics · 지도 반영: not-applicable · 색인일: 2026-10-17  
> 원문 최종 수정: 2026-10-17 · 제품 기준: main **e85b3e158d5c02e4aa028283db5b83a1750f4b1a**  
> 대상: WebGL2/Chromium 1440×900, 1989-06 소련 ↔ 현대 2026-10 **12회 왕복 × 3회 실행**. Qt 앱·Windows WebView2·Android 실기기 제외  
> 실측 실행: [① 성공 #38988743997](https://github.com/kimjeon-il/Pando/actions/runs/38988743997) · [② 12회 완료/진단 단언 실패 #38989499065](https://github.com/kimjeon-il/Pando/actions/runs/38989499065) · [③ 최종 성공 #38990251532](https://github.com/kimjeon-il/Pando/actions/runs/38990251532)  
> 원시 JSON: [① artifact 12083743891](https://github.com/kimjeon-il/Pando/actions/runs/38988743997/artifacts/12083743891) · [② artifact 12084732717](https://github.com/kimjeon-il/Pando/actions/runs/38989499065/artifacts/12084732717) · [③ artifact 12084912621](https://github.com/kimjeon-il/Pando/actions/runs/38990251532/artifacts/12084912621) (GitHub Actions 보관기한 적용)
현재 main과 동일한 제품 커밋 e85b3e1에서 출발한 기존 통합 브랜치 work/integration-ui-objects-20261016에 **테스트·계측 헬퍼·CI 워크플로만** 추가했다. CI는 기준 main 커밋에서 검사 커밋까지 테스트 경로 외 변경이 없음을 확인했다. main 직접 수정·병합·Pages 배포는 없다.

## 검증 대상과 기준
## 장기 수렴성 결과
## 상주 Worker 메모리와 조건별 차이
## 누수와 다른 CPU/GPU 재계산 비효율
## 판정 및 다음 조사
## 변경 및 증거 보존

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/969be86b950d3663a497e80e4fb7c6c0c10546f7add2579bd976511dff73ba1c.gz) · 원본 SHA-256 `969be86b950d3663a497e80e4fb7c6c0c10546f7add2579bd976511dff73ba1c`.
