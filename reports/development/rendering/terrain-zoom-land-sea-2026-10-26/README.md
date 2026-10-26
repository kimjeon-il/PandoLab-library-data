# 地形 배율 전환과 viewer hover 오류 원인 조사

작성일: 2026-10-26. 조사한 공개 빌드: 6a13356609dedd25c258f7f00a8aedbff4f18450. 앱 저장소·자료 정본의 변경 및 배포는 수행하지 않았다.

## 1. 배율에 따른 지형 표시 공백

원인은 GPU 지형 준비의 고배율 전환 정책이다. gpu-terrain-preparation.js:404는 CSS 화면축척 504 초과에서 기존 LOD의 대체 타일 목록을 비운다. 같은 파일 459~460은 새 목표 타일이 하나라도 없거나 필요한 tint가 준비되지 않으면 지형 draw 목록 전체를 빈 배열로 반환한다. 이후 기존 육지·바다 기본색만 남는다. 타일이 준비되거나 다른 배율에서 요구 범위가 바뀌면 지형이 다시 표시된다. 창 크기와 DPR에 따라 실제 줌 숫자는 달라진다.

공개 웹에서 호스트 카메라 제어 8회와 실제 마우스 휠 8회를 기록했다. 실제 휠 2.2배 구간에서는 목표 LOD 3의 39개 중 26개만 준비돼 terrainRenderedLevel=-1, terrainReady=false였고 지형이 빠졌다. 3배에서는 필요한 21개 모두 준비돼 LOD 3이 다시 표시됐다. 카메라 API 제어에서는 40개 중 25개 준비 상태를 관찰했다. 이 수치는 고정된 성능 SLA가 아니라 당시 전환 상태다.

재현 중 육지 마스크 자원은 계속 동일한 physical-canonical 자원이었다. 따라서 이 재현은 육지 마스크 형상이나 국가 LOD 변경으로 설명되지 않는다. 지형 타일 실패 응답은 0건이었다. 픽셀 로그는 각 전환의 첫 3프레임이며, 나중에 수집한 readiness와 반드시 같은 프레임은 아니다. 전체 지형 공백은 스크린샷·반환 draw 목록·동일 마스크 기록으로 별도 확인했다.

작은 합성 자료로 원인을 고정했다. 기존 타일 1개를 올린 상태에서 새 목표 2개 중 1개만 준비하면 현재 구현은 0개를 그린다. 메모리에서만 두 조건을 바꾼 대조 실험은 기존 대체 타일과 준비된 목표 타일을 유지했다. 실제 파일은 바꾸지 않았다. 기존 관련 zoom transition 단위 검사 2개도 통과했으며, 이 검사 자체가 고배율의 빈 목록을 기대하고 있다. 수정하려면 대체 표시를 유지하는 동작과 회귀 기대값을 함께 바꿔야 한다.

권장 수정 방향: 현재 준비된 화면 커버리지를 유지하고 새 LOD 타일로 교체한다. 고배율에서 대체 타일을 무조건 비우는 조건과 모든 목표가 준비될 때까지 전체를 숨기는 조건을 정리한다. 국경·정본 좌표·육지 마스크를 재생성할 문제로 보지 않는다.

## 2. PL-MAP-HOVER-001

viewer-map.js:114에서 정상 territorialScope를 생성하고 다른 소비자에 전달하지만, 273의 objectPicking.connect는 objectModelB에 objectPresentation을 전달한다. 그 객체의 territorialScope getter는 viewer에서 초기화되지 않아 undefined다. object-picking.js:79가 territorialScope.displayFeature를 읽으며 보고된 TypeError를 낸다. 단순 로딩 지연이나 누락된 터키 형상으로 판정하지 않는다.

공개 웹의 실제 함수에 같은 위치의 조회를 수행하면 동일한 오류가 났다. 전달받은 scope 타입은 undefined, 이미 존재하는 정본 scope의 displayFeature 타입은 function이었다. 별도 브라우저 응답에서 연결만 objectModelB:{territorialScope}로 바꾸면 같은 조회가 TUR 객체를 반환했다. 소스 파일과 서비스 상태를 교체하거나 두 번째 scope를 생성하지 않았다. 일반 mousemove의 console 오류는 이 실험에서는 없었으며, 실제 소비 함수 직접 호출로 같은 예외를 재현했다.

권장 수정 방향: 선택기도 이미 생성한 정본 territorialScope를 받게 한다. optional chaining으로 오류를 숨기거나 objectPresentation 안에 별도 resolver를 생성하는 방식은 사용하지 않는다.

## 증거와 실행 범위

- probe.mjs / zoom-probe.json: 카메라 API 전환과 렌더·타일·마스크·픽셀 기록.
- wheel-probe.mjs / wheel-zoom-probe.json: 실제 휠 전환 비교.
- atomic-terrain-probe.mjs / atomic-terrain-result.json: 작은 타일 fixture의 현재 구현/메모리 대조.
- hover-probe.mjs / hover-result.json: 실제 viewer 의존성 연결 대조.
- zoom-*.png / wheel-zoom-*.png: 각 조건의 화면 증거.
- findings.json: 원인과 실제 실행 결과 요약.

전체 검사·전체 GIS 생성·지명/국명/존속기간 전수 검사·네이티브 빌드는 실행하지 않았다. 브라우저는 종료했고 앱 Git은 clean이다. 자료·SDK·빌드의 전체 복사본을 만들지 않았다. 임시 작업 사본은 없으며, 이 범위의 작은 스크립트·JSON·이미지는 재현과 원격 보관의 증거로 유지한다. 배포·실행 중인 사용자 탭은 조작하지 않고 상태 관찰만 했다.
