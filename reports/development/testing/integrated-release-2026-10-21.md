# 통합 main의 원격 게시와 Windows 실행 파일 갱신

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `DEV-INTEGRATED-RELEASE-20261021` · 상태: `pages-live-verified / windows-native-verified / separate-ci-failure` · 지도 반영: `not-applicable` · 색인일: 2026-10-21
> 최종 Web·App 소스: `01bb7eead0dbf947fb0fe305491e477186141fe7` · UI 수정: `389d1bf934c3ff538bd30ca2ce3d6998dbe8333a`
> 빌드 ID: `0.36.0-build-389d1bf934c3` · 자료: `data-7bc7903eb13f89dd317166807b636446`
> 근거: `D:/Codex/evidence/integrated-release-20261021-c082b63a/`, main의 `.superpowers/sdd/integrated-release-20261021/`. 근거 폴더 이름은 최초 게시 커밋이며, `-final` 파일과 마지막 `native-result.json`은 위 최종 소스다.
사용자 요청에 따라 [DEV-ALL-BRANCH-20261021](all-branch-integration-2026-10-21.md)의 통합 main `c082b63a`를 원격에 일반 push했다. 실제 Windows 검사에서 발견한 모바일 작업 패널 결함을 `389d1bf9`에서 수정하고, 자산·메타데이터 receipt를 `01bb7eea`에서 갱신해 다시 push·게시했다. 최종 Web과 App은 같은 커밋이다. 형상·저장 형식·고정 의존성은 변경하지 않았다.
모바일에서는 작업을 시작한 후 기존 `completeToolStart`가 `closeMobileSheets()`를 호출해 새 고정 작업 패널까지 닫았다. 실제 WebView의 클릭·패널 클래스 변경과 호출 스택으로 확인했다. 기존 workspace 소유자가 고정 작업 패널을 유지하도록 수정했고, 새 상태 관리자나 별도 작업창을 추가하지 않았다.
일반 브라우저의 조기 화면 확인만으로는 비동기 완료 뒤 닫히는 순서가 가려졌다. 기존 브라우저 검사에 실제 presentation 소유자의 늦은 완료 순서를 노출하는 검사 경계만 추가했다. 수정 전 패널 닫힘으로 실패했고 수정 후 통과했다. 관련 단위 검사 **8/8**, 새 브라우저 회귀 **1/1**, 변경 JS·검사의 ESLint와 diff 검사도 통과했다. 전체 로컬 회귀는 실행하지 않았다.

## 게시 대상과 추가 수정
## Web 게시와 실사이트
## Windows 빌드 환경
## Windows 실행 파일과 실제 WebView
## 별도 CI와 미검증 범위
## 판본과 보존

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/e56bba01d02455c96f3cbc4f6a111c0459f526c8e56c32ec38a2708ea5f5e471.gz) · 원본 SHA-256 `e56bba01d02455c96f3cbc4f6a111c0459f526c8e56c32ec38a2708ea5f5e471`.
