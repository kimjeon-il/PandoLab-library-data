# 웹 열람·앱 편집 분리 배포 검증

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-PRODUCT-RELEASE-20261018` · 상태: `pages-live-verified / native-device-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-18
> 소스: `2574f1e0` (`feat: separate web viewing from native editing`)
> 배포 승인: 사용자의 “배포까지 ㄱㄱ” 지시
웹은 기존 UI를 유지한 열람 화면, Windows·Android 앱은 별도 편집 시작점을 사용한다. 웹 화면에 뷰어 표기를 추가하지 않았다. 휴대폰 패널과 Android 방향 정책 소스도 같은 커밋에 포함된다. 이번 공개 배포 대상은 GitHub Pages 웹이며 APK·Windows 설치 파일 발행은 수행하지 않는다.
상설 `work/ui`의 미완성 프로젝트 설정·프로젝트 날짜 비교·모바일 정점 도구 변경은 별도 작업 기록의 배포 제외 지시에 따라 커밋에서 분리했다. 원본 작업 파일은 변경하지 않고 Git index에 이번 작업만 반영했다. 미완성 변경을 stash/reset하거나 삭제하지 않았다. `main`의 기존 미추적 `reports/annex-reproduction-20261015.png`도 보존했다.
앞선 [작업 사본 검증](web-app-product-split-2026-10-18.md)은 미완성 변경이 함께 있는 개발 상태의 기록이다. 실제 릴리스는 배포 대상만 추출한 소스로 WASM을 다시 빌드하고 아래 검사를 새로 실행했다. 해당 이전 보고서의 Core SHA·파일 수·기존 정적 검사 실패를 이번 릴리스 결과로 사용하지 않는다.
- 버전: `0.36.0-build-20261018-product-split`
- 데이터 revision: `data-1d70896e8c76322bd4df52bff683d4d8`
- Core source SHA: `7aa0b76e1d69612455145b65d258e02046a505bcfb69dfd51086d6450b06430a`
- WASM SHA: `c823967e8a89e2b65261c731e0d3ee78f5d13cee52b055671b67c93d0ff8dfdf`
- 기존 `904a5cf6` 기준에서 배포 제외 변경을 제거하고 분포 날짜 문자열 직렬화 수정만 공통 C++에 포함했다.

## 배포 범위
## 릴리스 식별
## 실행한 검사
## 공개 배포
## 별도 CI 실패
## 남은 검증 범위

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/72d4f6f7537155f9124f3c6960516a6465ecf4a9a662d30b41a360cd9602e2e9.gz) · 원본 SHA-256 `72d4f6f7537155f9124f3c6960516a6465ecf4a9a662d30b41a360cd9602e2e9`.
