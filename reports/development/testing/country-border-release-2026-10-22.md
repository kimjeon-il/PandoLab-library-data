# 국경선 마스크 수정 배포 — 2026-10-22

- main: f235c24af71e22dc29e77eed1dc54106226d1cf2. 국경 수정 a18f609d를 9a9f625d로 선별 반영하고 게시 메타데이터를 갱신했다. UI의 다른 미병합 이력은 범위에 포함하지 않았다.
- 원격 전파: work/ui a18f609da9d5ea9b2105b0486a6c7c0dcb3d3411 / work/objects e06a58f4550f723070a85a1ce9a9b91506688cad / work/gis b0aa666b94c68d95a738d7e7fa14ecd33b850f03 / work/places 263d2a58747376a228aaa129108f636a3e56d606.
- 다섯 브랜치를 atomic push했으며 ls-remote로 원격 HEAD를 확인했다. 국경 렌더러 blob f8e61e71d56df216ee97b45e7b222d7083b8bbb7, 스타일 blob c74bdd3a344c8d40f0351fa2507c0475eb9b2a0d가 모두 같다.
- 각 브랜치의 기존 자료 핀과 WASM 조합을 유지했다. main/objects/gis/places의 HTML·빌드 메타데이터만 생성했다. UI의 미커밋 배포 관련 8개 파일은 보존했고 그 작업의 생성기를 사용한 추가 메타데이터 생성은 하지 않았다.
- Pages workflow_dispatch skip_checks=true: https://github.com/kimjeon-il/Pando/actions/runs/39685012898 . status completed, conclusion success, headSha main 위 커밋과 일치.
- https://kimjeon-il.github.io/Pando/ 의 index.html(58,696B), assets/js/build-meta.js(58,011B), assets/js/modules/gpu-stroke-renderer.js(48,172B), assets/js/modules/map-interaction-style.js(10,580B)를 HTTP 200으로 읽었고 각각 배포 커밋의 SHA-256과 일치했다.
- 이번 통합에서는 테스트·린트·벤치마크를 반복하지 않았다. 직전 구현의 집중 검사 10개 및 변경 파일 ESLint 통과 근거를 유지한다. 네이티브 앱 빌드·실제 WebView 실행·라이브 지도 전체 조작·성능 측정은 이번 배포 확인 범위가 아니다.
