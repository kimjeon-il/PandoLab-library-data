# 참고 이미지 UI — 최신 work/ui 통합 검증

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `DEV-REF-UI-SYNC-20261019` · 상태: `focused-verified / existing-base-check-failure / native-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-19
>
> 조사 기준: 기존 feature HEAD `5e70dcf1fc130cb39b4b441b721ec9902048ace5`에 최신 `work/ui`의 `d99274160b97b8e47c884d44b3e49af3747ee04f`를 반영한 작업 트리
>
> 원격 통합 커밋: `9813535db9138bc00e55777049503cb79dd380bd`. 이후 원격 CI에서 확인한 이전 함수명 기반 검사 한 개를 입력 포트 동작 검사로 보완했다.
>
> 원본·출처: [Draft PR #134](https://github.com/kimjeon-il/Pando/pull/134), [실행 결과·입력 및 공유 자산 해시](../../../archive/blobs/541026253f13f4185be95a570ce84845f28a88e7863c10446ce490561decd08e.gz), [이전 P5 기록](reference-image-ui-p5-2026-10-18.md)
최신 UI와 충돌하지 않도록 기존 `feature/reference-image-p1-layout-20261018`에 `work/ui`를 반영했다. 실제 텍스트 충돌을 해소하고, 새 편집기 문서 경로와 휴대폰 가로 레이아웃을 적용했다. 독립 검토에서 확인한 Space 지도 이동 안내 갱신 누락도 수정했다.
이번 추가 생산 수정은 `map-input-presentation.js`, `app-global-input-bindings.js`, `assets/css/layout/reference-images.css` 세 파일이다. 브라우저 spec 세 개를 canonical 편집기 진입으로 전환했고, 가로 화면 두 사례와 공통 편집 안내 한 사례를 추가했다. 기존 P1–P5의 보정 계산, 저장 형식과 원본 Blob, Undo/Redo 계약은 관련 조작 검사로 확인했다.
검증은 Linux의 Node 24.19.0, pnpm 11.25.0, Playwright 1.62.1, Chromium 151.0.7922.34에서 실행했다. 저장소 CI는 Node 22 / pnpm 11.19.0이다. 단위 수는 파일별 직접 실행의 실제 case 요약으로 집계했으며, UI 계약 명령에 포함된 파일 단위 reporter 수를 추가 case로 세지 않았다.

## 결과와 범위
## 충돌과 수정 근거
### 최신 입력 포트와 단계 안내의 공존
### canonical 편집기 문서로 진입
### 휴대폰 가로 화면의 버튼 접근과 접힘
### Space 지도 이동 시 공통 편집 안내 갱신
### 원격 CI의 이전 함수명 검사 보완
## 최종 UI 추가분과 검증 시점
## 환경 복원과 남은 한계

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/32f1da309687092f62e95744637ef358789d7ab84e876535ab06ba4e6c2d0234.gz) · 원본 SHA-256 `32f1da309687092f62e95744637ef358789d7ab84e876535ab06ba4e6c2d0234`.
