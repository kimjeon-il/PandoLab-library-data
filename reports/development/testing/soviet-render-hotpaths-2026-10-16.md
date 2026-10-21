# DEV-082 — 1989년 소련 WebGL 강조선 및 상호작용 패스 최적화

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 상태: `verified-web` · 지도 데이터 반영: `not-applicable` · 2026-10-16
> 대상 소스: `work/objects` `06ed2806258f830ee8501d2d295c439374b1de34`
> 범위: 브라우저 웹 및 신규 WebView 기반 앱이 공유하는 JS/WebGL 경로. **Qt 앱 분석·변경·검증 제외.**
실제 역사적 세계 프로젝트를 `1989-06`으로 변경하고 `state:soviet-union` 객체를 조회했다. Chromium WebGL2에서 평면 지도 이동을 선택 전후 각각 실행했다. 실제 사용자 Windows·Android WebView에서의 풀월드 실측은 수행하지 않았다. GitHub-hosted Ubuntu Chromium에서 보고된 GL 렌더러는 `ANGLE / Vulkan SwiftShader`로 **소프트웨어 구현**이다.
- 초기 GPU 순수 이동: [38857758047](https://github.com/kimjeon-il/Pando/actions/runs/38857758047) · GPU 메시 캐시 미스·추가 업로드 없음
- 선택 강조선 최초 비교/진단: [38860534996](https://github.com/kimjeon-il/Pando/actions/runs/38860534996) · SVG 대체 및 미선택 워밍업 중 지연 업로드 발견; 프로파일 테스트의 엄격한 영(0) 업로드 주장은 초기화 진행 상황과 혼재돼 실패했으며, 생산 코드 회귀 증거로 분류하지 않음
- 역사적 국가 GPU 선택 강조선 수정 `20ebad1e`: [38861614415](https://github.com/kimjeon-il/Pando/actions/runs/38861614415) · 선택용 경계 39,819 GPU 세그먼트, 안정화 후 선택 SVG fallback 0, 지도 이동 중 버퍼 추가 업로드 0B
- 빈 상호작용 채움 마스크·프레임버퍼 생략 `399240da`: [38862006365](https://github.com/kimjeon-il/Pando/actions/runs/38862006365) · 단위 계약 검사 및 Chromium 실제 역사 세계 이동/선택 2개 검사 **모두 통과**

## 재현·증거
## 확인한 원인과 수정 내용
### 1. 역사적 대형 국가의 GPU 선택 강조선 미연결
### 2. 상호작용 채움이 없어도 실행되는 전체 국경·수계 마스크
## 검증 범위와 후속 병목
## 적용 및 보존

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/af2f2c24724a009152332327ec9f9b5fd705a726736fa132939dfcc7d18cf432.gz) · 원본 SHA-256 `af2f2c24724a009152332327ec9f9b5fd705a726736fa132939dfcc7d18cf432`.
