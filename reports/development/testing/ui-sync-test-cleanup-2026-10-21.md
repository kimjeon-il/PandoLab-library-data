# UI 작업 상태 복원과 폐기된 테스트 정리

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-SYNC-CLEANUP-20261021` · 상태: `local-focused-verified / unpublished / native-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-21  
> 원문 최종 수정: 2026-10-21  
> 수정 기준: Web/App 공통 `work/ui` 커밋 `7f1cad96333a2f81bc68e8ef22a3fdefba8fc18d` + 미커밋 변경  
> 근거: [브랜치 정책](../../../docs/branch-policy.md), [P5 원래 구현 기록](ui-convergence-p5-2026-10-21.md), 아래 로컬 백업·검사 로그
기존 로컬 HEAD `d8d424d70584a7336e2a85351c1a3d684377e3f0`에서 원격 `work/ui`의 `7f1cad96`까지 fast-forward했다. 현재 `main`의 `6fc982bf`가 포함되며, 그 위의 원격 P5 UI 변경도 보존한다. 이번 수정·정리는 main 병합, push, 배포를 수행하지 않았다.
사용자가 승인한 임시 보존본은 `D:/dev/release-evidence/PandoLab/ui-main-sync/d8d424d7-20261021/`에 있다. 원래 존재했던 972개 파일의 127,085,081바이트를 복사하고 SHA-256을 대조했으며, 원래 테스트 삭제 상태는 `tracked.patch`와 유지한 stash `2f30668c77588b5f1fb823de3f5de81a527f2837`에 남아 있다. stash를 pop/drop하지 않았다.
- 원래 수정된 자동 생성 permission 6개는 백업과 동일한 바이트로 복원했다.
- 예전 GIS 파생 파일 12개와 미추적 생성 캐시 954개는 외부 백업에 보존했다. 새로운 국가별 builtin-world/LSIB 자료를 예전 파생본으로 덮어쓰지 않았다. 원본 GIS 입력이나 수작업 형상 변경은 없었다.
- 원래 873개 테스트 삭제를 일괄 적용하지 않았다. 이후 사용자가 승인한 불필요 테스트 정리에 따라 아래 21개만 제거하고 현재 회귀·자료·CI 검사는 유지했다. 작업 전 삭제 상태도 백업에서 복구 가능하다.

## 동기화와 보존
## 실제 UI 수정
## 테스트 정리 기준과 남긴 검사
### 제거한 파일
## 실행한 검증과 한계

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/275684895c6b41b2985c4eb7f673ca7ab4f8c340bd155bffdcff5172c09ceeba.gz) · 원본 SHA-256 `275684895c6b41b2985c4eb7f673ca7ab4f8c340bd155bffdcff5172c09ceeba`.
