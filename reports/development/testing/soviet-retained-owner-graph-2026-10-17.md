# OBJ-091 — 공유 국경선 Worker 잔여 보유 객체 소유권 분해

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 조사일: 2026-10-17 · 상태: `verified-isolated-chromium` · 제품 변경: **없음**
> 기준 소스: `main a417b3f1242edf2a7ab639903a1ba3c6817ba66d` / OBJ-090 최종 병합 버전
> 조사 브랜치: `work/perf-retained-owners-20261017` · [격리 계측 CI](https://github.com/kimjeon-il/Pando/actions/runs/39032118412)
기존 OBJ-089/OBJ-090의 압축/지연 선분 계산 후 현재 소련 1989-06 → 현대 복귀 Worker JS used heap은
동일 러너 비교에서 **133.41MiB**, Worker WASM 선형 버퍼는 **57.63MiB**였다.
OBJ-088의 **101MiB**는 과거 360MiB 상태에서 나머지 필드를 파괴적으로 해제한 뒤
`boundaryState` 전체를 제거할 때의 **조건·순서 종속 GC 해제량**이다.
현재 133MiB에서 곧바로 독립된 'contacts 101MiB'로 귀속하거나 메모리를 차감하면 안 된다.
현재 제품의 유지 객체는:
- `boundaryState.contacts`: 나라 쌍마다 원본 경계 분할 선분을 보유.
- `boundaryState.contactsByOwner`: 위 접촉의 소유 국가별 역참조.
- `boundaryState.edges`: 좌표 단위 키로 정리한 화면 공유 경계 결과와 각 접촉의 기여 자료.
- `preparedStore.byId`: 국가별 원본 형상/선분/압축 공간 인덱스.
- `preparedStore.spatialIndex`: 국가 후보 조회용 상위 공간 인덱스; 대부분 `byId`의 준비 객체를 *참조*함.
- Worker `latestMessage`: 마지막 형상 입력. 준비 상태와 같은 지오메트리를 공유할 수 있어 중복 독립 heap이 아님.
`scripts/research/instrument-shared-boundary-retainers.mjs`는 **GitHub Actions의 폐기되는 checkout 안에서만**
기존 팩토리 함수의 내부 Map을 검사할 수 있는 객체를 임시 반환한다.
**저장소에 커밋한 제품 JS, C++/WASM, generated-world 데이터, `main`은 변경하지 않는다.**

## 출발 기준과 계층 구분
## 수행 방법
## 실제 독립 컨텍스트 3개 GC 결과
## 최적화 후보와 계약

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/233d0a97067058076cb184b91cd62bb7c83dcd45573ba03382c0aa25cbd9ac7b.gz) · 원본 SHA-256 `233d0a97067058076cb184b91cd62bb7c83dcd45573ba03382c0aa25cbd9ac7b`.
