# 원격 브랜치 main 통합 — 2026-10-24

최종 코드 b2fbb0cfb47648dc797ae954e313d77ab5026d3d. 원격 main15046c82에 없던 work/ui2커밋(010fb6b0까지)과 work/gis16커밋(f9e653a9까지)을 병합하고 origin/main에 푸시했다. work/objects와 work/places의 변경은 이미 포함돼 있었다. 마지막 원격 조회에서 네 브랜치 모두 main에 없는 커밋0개다.

충돌 없이 합쳤으며 최신 자료 핀36210d5f와 immutable Worker 짝을 유지했다. UI 로컬9b1c2162와 미공개 학습527ddf3b는 변경·공개하지 않았다. 상설 워크트리와 모든 기존 작업을 보존했다. 통합물의 캐시 식별자는0.36.0-build-merge-f9e653a9-010fb6b0로 canonical 생성기에서 새로 만들었다.

UI36개, 수계 배율/App staging17개, 총53개 집중 Node검사와 실제 편집기 브라우저1개가 통과했다. 대상 ESLint, Python3파일AST, workflow3개YAML, canonicalCSS/metadata와 diff검사도 통과했다. 전체 검사나 GIS재생성, Rust/Android재빌드는 하지 않았다. Playwright 초기 선택자의 시작 앵커가 전체 테스트 경로와 맞지 않아No tests found가 났고, 동일 테스트 이름의 부분 매칭으로 바로잡아 실제1개를 실행했다. 제품 assertion은 바꾸지 않았다.

Pages40068814959의 build/deploy가 성공했다. 공개 viewer자산5개와 수계Worker의5개파일이 HTTP200이며 커밋 해시와 일치한다. 수계Range는206,Content-Range bytes0-7/12006475,Content-Length8,본문8바이트가 고정자료와 같다. 앱 편집기 전용 모듈은 공개Pages에 의도적으로 포함되지 않으므로 웹 검사는 viewer closure를 대상으로 했다.

전체CI통과는 아니다. Application Architecture40068814948은 기존과 같은 apps/assets/js/modules/reference-image-analysis-client.js 경로 해석 실패다. 검사기·assertion은 약화하지 않았다. Shared C++ CI는 최종 조회 당시 진행 중이며 통과라고 하지 않는다.

기존 main자료 checkout이 오래된 상태여서 보고서 보관만을 위해 전체자료를 갱신하거나 복사하지 않았다. 증거는 기존 외부 원문 소유자에 한 벌만 보존했다. 자료 준비는 최신main의 활성36210d5f판본만 추가했고 다른 워크트리에서 사용하는71a/d401캐시는 보존했다. 새 브랜치·워크트리·저장소복제본·빌드폴더는 만들지 않았다.
