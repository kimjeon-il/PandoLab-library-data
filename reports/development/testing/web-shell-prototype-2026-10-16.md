# Windows·Android 웹 기반 시험용 앱

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `DEV-078` · 상태: `investigating` · 지도 반영: `not-applicable` · 색인일: 2026-10-16
> 원문 최종 수정: 2026-10-16
> 조사 기준: 통합 저장소 `work/ui` / `c8063caa219d3dc8e25be637b398f50db4689c21` + 미커밋 구현
> 원본·출처: [구현 기록](https://github.com/kimjeon-il/Pando/blob/7edbf231501cad51346dc5d2d626ba8acb31379b/docs/superpowers/plans/2026-10-16-web-shell-prototype.md), [실행 방법](https://github.com/kimjeon-il/Pando/blob/7edbf231501cad51346dc5d2d626ba8acb31379b/apps/web-shell/README.md)
Tauri 2가 현재 웹 UI·WebGL 렌더러·Core Worker·WASM을 실행하는 시험용 앱이다. 기존 Qt 앱을 교체하지 않으며, 기본 세계·DEM·수계·지명 자료를 받지 않는다. 가상 국가 2개와 하위 객체 1개, 입력 좌표 15개를 실제 문서 모델에 전달한다. 앱의 일반 파일 가져오기도 객체 20개·좌표 100개·1 MiB 이하로 제한한다.
웹 실행 자료는 `apps/web-shell/stage.mjs`가 같은 저장소의 웹 소스에서 생성한다. 전체 세계 자료를 제외한 UI·폰트·현재 코덱 등을 포함한 실행 자료는 891개 파일, 55,742,324바이트다. 포터블·설치 프로그램·main 반영·푸시·배포는 이번 범위에 포함하지 않는다.
- fixture SHA-256: `f1b518fc094ea1de67182351d5b3680885ab76265271154cfe9af8963b76d323`.
- 공통 코어 원본 SHA-256: `18634595bb1b792fd9ddf8cb88e63a2b214b6f1d54f0ff66eac43c2a2c1f46e7`.
- 실행 자료별 SHA-256은 생성된 `apps/web-shell/dist/shell/stage-evidence.json`에 남긴다. 실제 실행 파일·APK·변경 소스 해시는 `build-native/web-shell/evidence.json`으로 별도 기록한다.
- Windows UAC를 사용자가 확인할 수 없어 MSVC 설치는 취소됐으며 재시도하지 않았다. 기존 MinGW 13.1·사용자 범위 Rust GNU 1.99.1·별도 GNU ld 2.47로 Tauri 빌드를 완료했다. 도구는 `D:/build/toolchains/`에서 재사용하며 Qt·시스템 환경은 바꾸지 않았다. 사용하지 않는 Windows GNU cdylib의 자동 전체 심볼 export만 차단했다.

## 대상과 기준
## 근거와 실행
## 재실행
## 알려진 한계
## 판본
### 게시 준비 검증

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/5d15df017f5a135bd49f2db54231424330d1081e5cee74c8852b63d14e355765.gz) · 원본 SHA-256 `5d15df017f5a135bd49f2db54231424330d1081e5cee74c8852b63d14e355765`.
