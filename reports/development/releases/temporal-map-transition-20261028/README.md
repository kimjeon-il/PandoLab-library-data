# 시점 전환 수정 웹 배포

> 보고서 ID: UI-TEMPORAL-RELEASE-20261028 · 상태: deployed-web-verified
> 최종 수정: 2026-10-28 · 앱 실행 파일: 갱신하지 않음
> main: 71c1b179537037d70fb65e4a7972e88ac831ff7d
> work/ui 작업 커밋: 6bac4c43acaa082ca92d0adbb32eeb4be7347549
> 자료 핀: f79836c5509fce8053a81421b02798dc7bfb4f8b (유지)

## 범위와 통합

이전 지도를 유지한 뒤 준비된 다음 시점 화면으로 교체하는 수정 14개 파일을 커밋했다. work/ui에 기존 main 미반영 네이티브 CI 커밋이 별도로 있어, 이번 커밋만 main에 cherry-pick했다. 두 커밋의 이번 수정 파일은 git diff --exit-code로 동일함을 확인했다. 별도 네이티브 CI 변경은 main 배포에 섞지 않았다.

main과 work/ui를 각각 원격에 정상 푸시했다. main 작업트리는 깨끗하며, 다른 채팅의 미완료 파일 79개는 작업 전후 SHA-256 목록이 동일하다. 강제 reset·stash·강제 push나 다른 상설 브랜치 동기화는 하지 않았다.

## 집중 검증과 생성

- 작업 브랜치와 main에서 관련 단위 검사 64개 통과. main 최종 실행 약 3.76초.
- 앞선 로컬 WebGL·Canvas2D·Canvas Worker 전환 검사 3개 결과를 재사용했다. 이번 커밋 사이 해당 소스·검사 파일 내용이 동일하다.
- main 기준 생성물 1,107개 준비 완료. frontendInputSha256: 553ca4f9cb02e0b043c23b28ea5eb04336c397ea244e8755f65a91202cf27c91.
- 전체 테스트·C++ 빌드·GIS 재생성·앱 패키징은 추가 실행하지 않았다. 실제 WebView의 이전 미검증 상태는 유지한다.

## 배포와 공개 파일

GitHub Pages 실행 [40586690965](https://github.com/kimjeon-il/Pando/actions/runs/40586690965)의 build·deploy가 모두 성공했다. Pages 산출물은 1,776개 파일, 222,426,431바이트이며 위 main SHA와 자료 핀을 기록한다.

공개 주소는 https://kimjeon-il.github.io/Pando/ 이다. 기존 verify-pages-deployment.mjs로 코드·자료 식별 파일 10개를 독립 확인했고, 변경된 JS 모듈 7개의 실제 공개 응답 크기·SHA-256도 Pages 증거와 일치했다. pages-evidence.json, live.json, independent-live.json에 근거를 보관한다. workflow 성공만으로 라이브 검증을 대신하지 않았다.

## 공개 브라우저 전환

새 Chromium 문맥의 WebGL2, 960×640 화면에서 공개 배포본을 열었다. 테스트를 위해 국가 메시 준비 지연과 기존 이름 앵커의 대기 수 관찰만 삽입했다. WebGL 컨텍스트 옵션은 제품 기본값을 유지했다.

현재 화면 준비 완료와 이름 앵커 준비를 확인한 뒤 2026년 보기에서 1953년 6월로 이동했다. 준비 중 이전 지도 실제 합성 이미지의 변경 채널 수는 0, 최대 차이는 0이었다. 이전 이름과 날짜가 유지됐고, 지연을 해제한 뒤 1953-06으로 지도·날짜가 교체됐다. pageerror는 0건이었다. live-browser.json과 live-held.png, live-completed.png가 최종 근거다. live-before-map.png는 비교에 사용한 지도 영역 원본이다.

초기 라이브 검사 시도도 구분한다. 첫 시도는 전체 networkidle 대기가 30초를 넘어 중단됐고, 두 번째 시도는 PNG 파일 바이트 동일성 비교에서 중단됐다. 두 번째는 원본 비교 버퍼를 보관하지 않아 실패 원인을 확정하지 않았다. 당시 화면은 live-failed.png와 live-failed-current.png에 남겼다. 최종 시도는 화면에 필요한 자료 준비를 기준으로 진행하고 PNG를 해석한 실제 픽셀도 비교해 위 결과를 얻었다. 앞선 실패를 최종 성공 결과처럼 기록하지 않는다. 실제 사용자 사용성 검증은 수행하지 않았다.

## 관련 구현 기록

로컬 구현·집중 검사 내역: reports/development/rendering/temporal-map-transition-20261028/README.md (라이브러리 보관 커밋 e3ced5a4144431f326e1f031408141f5d10185b1).
