# 참고 이미지 UI P5 — 회귀 검증과 조작 영역 수정

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `DEV-REF-UI-P5-20261018` · 상태: `historical-feature-verification / follow-up-linked` · 지도 반영: `not-applicable` · 색인일: 2026-10-18
>
> 원문 검증일: 2026-10-18 · 후속 연결: 2026-10-19
>
> 조사 기준: 웹·앱 공통 기준 커밋 `94bbb47fbbf59fa666dbccc4af85ef536ba64dac` + 이 보고서와 함께 제출한 P5 변경
>
> 원본·출처: [Draft PR #134](https://github.com/kimjeon-il/Pando/pull/134), [실행 요약·소스 해시](reference-image-ui-p5-evidence.json)
최신 `work/ui` 반영과 편집기 진입·가로 화면·공통 입력 안내의 후속 수정은 [2026-10-19 UI 통합 검증](reference-image-ui-integration-2026-10-19.md)에 기록했다. 아래의 수치와 통합 대기 사항은 2026-10-18 당시 기록으로 유지한다.
P1–P4에서 변경한 참고 이미지 도킹 패널, 목록·탭, 직접 조작, 기준점·선 보정·자동 맞춤의 안내·미리보기·취소를 검증했다. P4에서 최소 검사만 수행하고 P5로 남긴 실제 브라우저·반응형·키보드·앱 영향 확인이 대상이다.
검증 대상은 승인된 기존 `feature/reference-image-p1-layout-20261018` 브랜치다. 실행 도중 `work/ui`에 들어온 별도 웹 뷰어·앱 편집기 분리는 아래의 통합 후속 사항으로 구분했다. 이 결과를 최신 `work/ui`, 배포된 웹, Windows 또는 Android 네이티브 앱 전체의 검증으로 해석하지 않는다.
- Linux에서 Node `24.19.0`, pnpm `11.25.0`, Playwright `1.62.1`, Chromium `151.0.7922.34`를 사용했다. 저장소의 CI 설정은 Node 22 / pnpm 11.19.0이다.
- 참고 이미지 검사는 기존 `staticAutosaveProject()`와 PNG fixture를 사용했다. 실제 파일 입력, IndexedDB, 이미지 디코딩, 매핑, 지도 입력, 탭·패널·취소 동작을 실행했다. 무관한 전체 세계지도 초기화를 해당 도구 검사의 준비 조건으로 삼지 않았다.

## 대상과 기준일
## 근거와 방법
## 발견한 문제와 수정
## 실행 결과
### 앱 staging
### 대표 화면과 기계 판독 증거
## 확인 한계와 최신 기준 브랜치 후속 사항
## 데이터 반영과 판본

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/f61a138268cdeabdb301bdf9845ac7f85ad5a575deeda2e409525916909665dd.gz) · 원본 SHA-256 `f61a138268cdeabdb301bdf9845ac7f85ad5a575deeda2e409525916909665dd`.
