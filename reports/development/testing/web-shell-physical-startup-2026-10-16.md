# DEV-084 — 신규 WebView 전체 세계지도 물리 자료 로딩 경량화

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 검증 상태: `verified-windows-paired-30s` · 지도 반영: `not-applicable` · 2026-10-16
> 대상: `work/integration-ui-objects-20261016` (F 단계 구현 `91f8fa1`, generated module map `0c1b37f`, CI 연결 `91b6380`)
> Qt 앱 수정·조사는 제외. 전용 Windows WebView/Android WebView의 정본 웹 UI 로딩 경계만 변경.
**2-3D (물리·지명 데이터 패키징/활성화):**
기존 웹 소유의 DEM 래스터/수계/지명 로더를 앱에서도 사용한다.
현행 패키징 계획은 기본 세계·역사 자료 **597개**와 추가 물리·지명 자료
**13개**(지형 preview manifest와 타일 8개, 수계 manifest 및 packfile, 지명 manifest 및 packfile)를 포함한다.
파일 콘텐츠는 정본 manifest의 바이트 수·SHA-256로 검증한 뒤 앱에 복사한다.
별도 엔진·도형 데이터 중복 구현은 없다.
[Windows WebView 검증 38877295611](https://github.com/kimjeon-il/Pando/actions/runs/38877295611) 통과 및
[Android arm64 APK 빌드 38877295960](https://github.com/kimjeon-il/Pando/actions/runs/38877295960) 통과.
**개별 물리 레이어의 최종 픽셀 표현과 Android 실기기 로딩은 검증 범위에 포함되지 않았다.**
**2-3E (프로젝트/GIS 대형 파일):**
웹 메뉴는 공통 파일 컨트롤러를 유지하고, 네이티브 파일 교환은
`apps/web-shell/native-storage.js`와 Rust `document_transfer.rs`에서
**256KiB Base64 청크**로 스트리밍하며 최대 **256MiB** 문서 용량을 지원한다.
단일 전체 파일을 Base64 문자열로 한 번에 넘기지 않도록 임시 파일(spool)을 사용한다.
Windows의 Rust 저장·명령 계약 검증 및 Android APK **빌드**는 완료됐다.
실제 OS 파일 선택창에서 수십~수백 MiB 프로젝트를 열고 재저장하는 E2E 및 Android

## 단계별 현황
## 검증 결과 및 제한
## 2-3F Windows A/B 실측 결과 — 동일 러너 비교 (2026-10-16)
## 후속 검증

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/f95894f0e0daf73ceb186cad3932a7de1ec6f9c84c530f6124deb002be6f204d.gz) · 원본 SHA-256 `f95894f0e0daf73ceb186cad3932a7de1ec6f9c84c530f6124deb002be6f204d`.
