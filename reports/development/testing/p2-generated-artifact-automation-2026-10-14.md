# P2 — C++ 생성물 자동화 실행·검증 결과 (2026-10-14)

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `DEV-073` · 상태: `implemented / scoped CI verified` · 지도 반영: `not-applicable`  
> 작업 브랜치: `work/objects` · 개발 원본 커밋: `0b64bee12c40448d721901e5213e2c339f078b27`  
> 자동화 수정: `c9b8a8089bd82cc1bea395890f5a07893fe772d7`, `9be6a0631f949d6b45e32e8b7d447aeabbf8ae54`  
> 생성물 게시: `2fdd2997c54794e5a9a12da6a266e4fd229a4e15` (GitHub Actions 봇).
이 작업은 공통 C++ 코어를 웹용 WASM 및 네이티브 C++로 빌드·검증하고, 기존 Qt용 JavaScript 지오메트리·참조 계산 생성기를 삭제하지 않은 채 같은 원본·해시 추적 파이프라인에 연결한 것이다.
- `scripts/p2-artifact-plan.mjs`: `shared/**` 원본 지문 및 `assets/wasm` 쌍, Qt 지오메트리, Qt 참조 계산 번들의 독립적인 원본·생성물 해시를 점검해 필요한 생성기를 선택한다. 예상하지 못한 산출물 staging을 거부한다.
- `.github/workflows/generated-artifacts-p2.yml`: `work/objects`에서 변경을 감지해 기존 Emscripten/CMake, Qt 지오메트리, esbuild 생성기를 실행하고, 실제 컴파일된 JS/WASM의 ABI·소스 정체성·바이트 해시·선별된 단위 검사를 확인한다.
- `cmake/P2NativeBuildReceipt.cmake` 및 P1 원격 CI: 별도 Qt 설치 없이 네이티브 C++ core와 map-engine 아카이브의 바이너리 SHA-256/크기, 정확한 입력별 해시 및 명시된 의존 관계를 기록한다.
- `tests/unit/p2-artifact-plan.test.mjs`: C++ 소스 변경 시 WASM만 불일치 처리하는지, Qt 계산 소스 변경 및 참조 번들 변경이 서로 독립적인지, 잘못된 경로·예기치 않은 게시를 거부하는지 검사한다.
- `docs/development/generated-artifacts-p2.md`: 사용자·클라우드 개발자를 위한 실행 계약 및 후속 단계 기술.

## 범위와 구현
## 실제 원격 실행 증거
## 보호·후속 검증 경계

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/75f2a372b28833cbab22cf871e44cd65ad1c33b1b3c7ebcc257e222fc803dda3.gz) · 원본 SHA-256 `75f2a372b28833cbab22cf871e44cd65ad1c33b1b3c7ebcc257e222fc803dda3`.
