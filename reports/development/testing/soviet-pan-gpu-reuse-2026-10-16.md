# DEV-081 — 1989년 소련 지도 이동 시 GPU·메시 재사용 조사

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 조사 ID: `DEV-081` · 상태: `verified-web-only` · 지도 반영: `not-applicable` · 기록일: 2026-10-16
> 조사 소스: `work/objects`, 테스트 작성 `46ecfc84575d032d911b2fb4a531cbcbb926e3ac`, 실행 커밋 `da831da3e0e9286f18a0ca5253255ee38d519e73`
> 실행 증거: [GitHub Actions 38857758047](https://github.com/kimjeon-il/Pando/actions/runs/38857758047) · `soviet-camera` Job 116832942319, Playwright 1/1 통과
실제 역사 프로젝트의 월을 `1989-06`으로 설정하고, `state:soviet-union` 엔터티가 존재하며 다중 폴리곤 지오메트리가 로드됐음을 확인했다. 지도는 평면 투영으로 바꾸고 소련을 선택·초점 이동한 뒤 초기 GPU/Worker 작업을 준비, 한 차례 카메라 이동으로 워밍업하고 안정화했다. 동일 선택 상태에서 마우스로 세 차례 평면 pan `(30,12), (-28,-8), (22,10)` 픽셀을 수행했다. 기능·형상·기간 자료는 수정하지 않았다.
테스트 환경: GitHub-hosted Ubuntu 24.04, Playwright Chromium(WebGL2), 뷰포트 1440×900. 이 CI는 **특정 사용자 PC의 실제 GPU/드라이버가 활성화됐다는 증거가 아니며**, WebGL2 API 경로에서의 재사용 검증이다. 실물 GPU 신원 및 드라이버 메모리는 측정하지 않았다.
`SOVIET_1989_PAN_GPU_REUSE` 로그 (해당 실행의 before/after 누적 카운터):
GPU 기본 메시의 `meshVariantBytes`는 미리보기 3,755,216B, 정본 32,634,708B로 측정 전후 동일했다. 웹 콘솔의 `pageerror`는 0건이었다. 위 관측에 대해 테스트 assertion 1개가 통과했다.
`viewRenderCount` 증가는 의도한 화면 재렌더링이며 GPU 메시 재생성·재업로드를 뜻하지 않는다. 대상 조건에서 별도 메시에 대한 캐시 미스나 버퍼 생성·업로드가 증가했다는 근거는 없다. **웹 평면 WebGL2의 일반 pan 경로는 수정 불필요**.

## 대상 및 방법
## 실제 관측값
## 정적 코드 검토와 추가 조사 범위
## 판정 및 변경

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/fd2f949534b59af32ed939eae4c25ed846528ac48e8b9ce5962622b470a66c0b.gz) · 원본 SHA-256 `fd2f949534b59af32ed939eae4c25ed846528ac48e8b9ce5962622b470a66c0b`.
