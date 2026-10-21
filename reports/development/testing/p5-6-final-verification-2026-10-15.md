# P5-6 — 공통 C++ 계산 단일 정본 통합 및 앱·웹 종료 검증

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `DEV-075` · 작성: 2026-10-15 · 상태: `implemented / scoped integration CI verified` · 지도 변경: `not-applicable`  
> 기준 통합본: `main` `691ec5d8184f840aa87477d2d340dfbf0fa5d7b9`  
> 검증용 `work/objects` 커밋: `8f2c8d367570177170926fbb77e90c806692d44d`(P1·P3·P5), `9389df049f0c162578b7483245ece10b71db96ca`(객체 타임라인)  
> 두 검증 커밋은 워크플로 주석만 추가했다. 프로덕션 웹·앱 코드 및 WASM 바이너리는 기준 `main`과 동일하다.
- 공통 계산의 소유자를 `shared/` C++로 일원화한다. Qt 앱은 공통 네이티브 라이브러리, 웹은 동일한 C++ 소스에서 생성한 WASM을 호출한다.
- P5-6 소유권 감사에서 9개 영역을 확인한다: `date/calendar`, `timeline/records`, `timeline/resolution`, `timeline/edit`, `spherical/ring-area`, `boundary/refinement`, `boundary/splitting`, `country/contact`, `boundary/packet`.
- 중복 계산 JS는 검증 후 제거하되, HTML/CSS, 브라우저 UI, Worker 요청/증분 캐시 상태, GPU 버퍼 생성 및 렌더러 통합, 원본 참조 연결 등 플랫폼 어댑터는 유지한다.
- 러시아 214폴리곤/36,756좌표 편집: 매니페스트의 실제 163,133바이트와 과거 기록 165,597바이트 불일치를 교정하고 메타데이터 무결성 검사를 추가했다. 2단계 도형 확정, 비동기 Undo 및 RPC `type: request` 요청 계측을 최신 UI/Worker 계약에 맞게 검사한다.
- Windows Qt: `CountryView.color`의 조건부 표현식 참조 수명 문제를 수정하고 결과 색상을 **값**으로 보관한다. 명시색/기본색, 메모 수정, 취소된 Stale 작업, Undo·Redo를 검사하고 일시적인 진단 로그를 제거했다.
- 바뀐 `shared/` 소스의 WASM 및 소스 해시 매니페스트를 재생성하고, 통합 중 병합된 `projectcodec`/`webstorage` 변경도 출처 해시와 일치하는지 점검했다.

## 완료된 변경 범위
## 최종 통합본 CI 증거
## 실제 공유 국경선 CPU 측정
## 러시아 편집의 기능/응답성 분리
## 범위 외·제약 및 종료 조건

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/c390f0d07ef1da0298e3adf2051bf409950545ac968b412effae8faaadec974a.gz) · 원본 SHA-256 `c390f0d07ef1da0298e3adf2051bf409950545ac968b412effae8faaadec974a`.
