# 배율에 따른 국가 폴리곤·육지 표시 통합

> 보고서 ID: DEV-RENDER-SURFACE-20261025 · 상태: implemented / verification-limited · 지도 반영: local-work-ui
> 원문 최종 수정: 2026-10-25
> 조사 기준: application commit c70f51c598a23141f5a5a4b0e1cc1921c47884ca
> 원본: 사용자 그리스 화면, Pando 렌더러 소스, 아래 검사 로그·화면

## 대상과 기준

work/ui 상설 워크트리에서 구현. main 93b6e1b17477080687e31b3eaa16f2596b9c7010이 포함된 상태를 확인했다. 기존 미커밋 자료·다른 작업의 변경은 보존했다. runtime pin은 127e51c3457df87786ecf3aa5ad98ded690928df 그대로다. main 병합·배포·실행 파일 패키징·GIS 재생성은 범위 밖이다.

## 구현

기존 country-mesh-zoom-policy와 renderer가 하나의 surfacePresentation을 결정한다. CSS px/radian 504 이하에서 검증된 단순화본을 허용하고 642 이상은 정밀본만 허용한다. 사이 구간은 직전 표시 품질, 첫 진입은 정밀본이다. 선택·편집·대상 이동도 정밀본을 요청한다. DPR/성능/드래그는 허용 품질을 낮추지 않는다.

국가 채움·공유 경계·클릭 판정·육지·지형 클립·Canvas Worker가 같은 결정을 소비한다. 물리 육지는 국가 목록과 독립된 canonical 원본을 유지한다. preview는 국가 원본에서 유지한 정점을 물리 육지에도 적용하고, 두 파생본을 공동 인증한다. 국가 삭제·숨김이 물리 육지의 존재를 바꾸지 않는다. 별도 배율 상수나 상태 관리자를 추가하지 않았다.

인증은 ID, Polygon별 외곽/구멍 역할, 링 방향과 순서, 공유 원본 edge의 양쪽 유지 결과, 기존 strict topology 검사와 화면 오차를 결합한다. lon/lat 직선 오차와 전체 원본 great-circle subarc의 해석적 극값을 함께 제한한다. 최대 위도와 연결 편차를 포함한 보수적 equirectangular bound도 적용한다. 이는 렌더링 오차 검사이며 역사 정확성 인증이 아니다.

고배율 준비 중에는 물리 배경과 안내만 보이고 국가·지역 채움, 경계, territorial picking/label은 보류한다. 초기화는 표시가 금지된 preview frame을 기다리지 않는다. 국가/육지 전환은 preview land GPU upload가 완료된 뒤 허용한다. 경계 패킷에 sourceQuality를 묶어 이전 품질 경계가 남는 것을 차단했다. 프로젝트/형상/물리 자료 revision과 컨텍스트별 업로드 상태를 구분한다.

## 검증 결과

- 집중 단위 검사 64개 통과: 정책·공동 인증·GPU/Canvas 육지·지역 채움 보류·표시 형상 picking·시작 흐름 39개, Canvas Worker/지형 독립성 25개. 최종 구면 bound 보완은 해당 인증 7개를 다시 실행해 통과했다.
- 브라우저 3개 통과: 정밀 요청을 지연시킨 그리스 고배율 WebGL2와 Canvas, public Web 지구본. pending은 국가 색 없이 physical background, 준비 후 정밀 국가와 정밀 육지로 전환, 저배율로 돌아와 인증 상태에 따른 선택을 확인했다. browser/의 pending/ready PNG는 실제 렌더 결과다.
- 생성물 검사, 변경 JS의 ESLint, 변경 diff whitespace 검사 통과. 마지막 구면 bound 및 경계 source ordering 보완 뒤에는 관련 단위/생성물 검사를 수행했으며 브라우저 전체 3개를 반복 실행하지 않았다.
- 실제 Windows WebView2 development 앱(네이티브 입력 c2ec0f9808a6c43399e35cac4a9c58e09d0c2f587c8d67ed5f8df2bc53dceb0d, 현재 UI 개발 서버 4175)에서 세계지도 및 준비 완료 상태를 확인했고, 확대 중 배경만 표시하는 상태에서도 지도 이동/확대가 동작했다. 다만 동시 사용자 입력과 다른 작업의 앱 재시작/개발 서버 재로딩이 반복되어 동일한 그리스 고배율의 최종 준비 완료 전환을 네이티브에서 끝까지 독립 검증하지 못했다. App HTML의 자동 브라우저 검증과 실제 WebView 검증을 혼동하지 않는다.
- 실제 사용자 사용성 평가는 하지 않았다. C++ 빌드·전체 테스트·GIS 검증은 실행하지 않았다.

## 기존 실패 분리

인접 검사 9개 파일의 실패를 변경 전 production JS로 in-memory 복원해 대조했다(기존 워크트리나 WIP를 reset/복사하지 않음). baseline 66개 중 44 통과/22 실패. 이 중 이번에 영향받은 낡은 startup 3건과 Canvas projected geometry 1건은 현재 계약의 실제 동작 검사로 정리했다. 나머지 18건은 기존 label-input 6, map-click-async-command 5, territorial-command-storage 5, unified-object-display 2로 이번 변경 전에도 실패했다. 이 18건을 다시 광범위 실행하거나 수정하지 않았다. baseline.log와 adjacent-initial.log를 보존한다.

## 한계와 후속 범위

현재 제공 preview는 S642 화면 오차 한계를 초과하므로 공동 인증을 거부하고 canonical을 사용한다. 최종 개발 화면의 첫 거부 값은 약 0.5439261 CSS px였다. 이는 전체 지도의 최대 오차 측정치가 아니라 최초 초과 사례다. 원본 GIS나 preview 데이터는 재생성하지 않았다. 유효한 후보의 공동 파생/공유 경계/구면 반례는 단위 fixture로 확인했으며, 기본 제공 자료의 실제 저배율 preview 재활성화가 검증되었다고 주장하지 않는다.

완료된 구현과 자동 검사, 제한된 WebView 관찰을 위와 같이 분리한다. main 통합·웹 배포·새 앱 산출물은 수행하지 않았다.
## 정리 결과

검증용 Chromium은 종료했다. 임시 로그 5개는 본 scope에 복사했으며 진행 메모는 본문으로 대체했다. 아래 재현 가능한 구버전 Worker 산출물 4개는 현재 소스/개발 서버 metadata에서 참조되지 않고 Windows 앱 프로세스도 종료된 상태임을 확인했다. 그러나 자동 승인 검토가 계산 경로 방식과 명시적 절대 경로 방식의 PowerShell 삭제를 모두 `blocked by policy`로 거부했다. 다른 도구로 우회하지 않았다. 삭제 성공 0바이트, 삭제로 인한 드라이브 여유 공간 변화 0바이트(삭제 명령 실행 전 거부), 보존 916,533 logical bytes다. 현재 실행상 소비자는 없으며 보존 이유는 삭제 차단이다.

- assets/worker-runtime/633554467082d4d7f4c930309493b369: 241,259 bytes
- assets/worker-runtime/654aef82659672d64856eaaf7e6057e7: 185,986 bytes
- assets/worker-runtime/9c930c494a3f5a4259cb27d81833d2de: 188,642 bytes
- assets/worker-runtime/f3cabab577433dc1795b3b71ce1946ce: 190,863 bytes
- build-native/polygon-quality-baseline.log: 48,596 bytes
- build-native/polygon-quality-browser.log: 825 bytes
- build-native/polygon-quality-direct-tests.log: 3,906 bytes
- build-native/polygon-quality-progress.md: 1,089 bytes
- build-native/polygon-quality-tests.log: 52,680 bytes
- build-native/polygon-quality-worker-tests.log: 2,687 bytes

위 경로는 D:/dev/worktrees/ui/ 기준이며 source, 데이터 캐시, SDK, 상설 worktree, 다른 작업의 WIP를 삭제하지 않았다. 새로 유지하는 현재 Worker closure 685aeeeb5fb04787dd68270b742afbef와 bc695ce8055ff7a91fa0cb61a3546ac6은 현행 build metadata와 실행 경로가 소비하는 추적된 제품 산출물이다.
