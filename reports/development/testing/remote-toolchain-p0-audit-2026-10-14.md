# P0 — 원격 개발 체계·도구 의존성·성능 기준 조사 (2026-10-14)

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `DEV-070` · 상태: `investigating / static inventory captured, current performance NOT_RUN` · 지도 반영: `not-applicable`  
> 기준 저장소: `kimjeon-il/Pando` / `main` = `work/objects` `f2cfe79e874c71a22e0fff78580e76a3f139cd31`  
> 범위: 빌드 진입점, 생성·검증 스크립트, 루트 GitHub Actions, 기존 성능 측정 증거. 코드·데이터·워크플로 수정 없음.
GitHub에 보존된 현재 Git 트리와 파일·워크플로 정의 및 **이미 실행된** GitHub Actions 작업 로그를 읽었다. 새 CMake/Qt 빌드, 전체 테스트, 브라우저 실행, 실기기 실행, GIS 생성물 재생성은 **수행하지 않았다**. 이전 보고서의 결과는 실행한 당시의 코드·입력·기기를 명시한 과거 측정값일 뿐 이번 기준 커밋의 성능 합격 근거가 아니다. 단순히 두 언어에서 비슷한 연산을 한다는 이유만으로 중복 구현이라고 확정하거나 파일을 삭제하지 않는다.
버전 혼재: `application-architecture.yml`, `ui-architecture.yml`은 Node 22, `shared-core.yml`, `web-app-parity.yml`은 Node 24를 지정한다. `pnpm` 자체는 11.19.0으로 선언되어 있다. 웹은 GitHub Pages의 **커밋된 정적 파일**을 게시하며, Pages 빌드 작업이 모든 생성물을 최신 소스에서 재구성하는 것은 아니다.
1. **필수 Node** — `native/app/CMakeLists.txt:152-157`: `find_program(PANDO_GEOMETRY_NODE_EXECUTABLE NAMES node REQUIRED)` 후 `native/tools/m97/cut-kernel-generate.mjs --check`가 `pandoeditor_editor`의 선행 의존성으로 실행된다. 본문 원본 계산 소스가 JavaScript인 현재 상태에서 검증기만 임의 삭제하면 위험하다.
2. **Qt 테스트의 필수 Node** — 같은 CMake의 M974 테스트 구간은 `find_program(M974_NODE_EXECUTABLE node REQUIRED)`를 사용한다. 앱 본체 의존성 제거와 `BUILD_TESTING=ON` 완전 무Node 테스트는 구별해서 추진해야 한다.

## 조사 방법과 판정 원칙
## 1. 필수 도구 및 실행 경계
## 2. Node/Python이 실제로 앱 빌드를 차단하는 지점
## 3. 생성기·미러·중복 구현 후보
## 4. CI 운영 및 정리 후보
## 5. 성능 기준 현황: 이전 측정과 현재 커밋 분리
### 최소 계측 요건 (후속 검증에 한정)
## 6. P1로 이관할 문제와 작업 중단 경계

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/82271573cdcd670a3d8d9c5445dc3a3227b0d54985bd4764a093969013431b47.gz) · 원본 SHA-256 `82271573cdcd670a3d8d9c5445dc3a3227b0d54985bd4764a093969013431b47`.
