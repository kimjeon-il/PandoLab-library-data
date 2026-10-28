# 폐기 지도자료 이력 제거 실행 기록

승인: 라이브러리 폐기 지도자료 전체, main·네 work 핀 갱신 및 Pages 재배포. 앱 코드 이력은 재작성하지 않는다.

- 실행 전 검사: local Git objects 약 5.05GB uncompressed; 보수적 추가 사용 상한 11GiB + 5GiB 여유, D: 약 57GB 여유.
- Ruling: 고정 staging의 정리 결과용 bare 저장소는 전환 검증용 실제 산출물이다. 전체 원본 백업 복제는 만들지 않는다.
- Ruling: UI 로컬 커밋과 WIP는 원격에 섞지 않는다. 원격 UI에는 핀 전용 커밋만 게시하고 로컬은 기존 커밋을 유지해 새 핀을 합친다.
- 진행: 명시적 삭제 manifest, 합성 검사와 재작성 출력 준비.

- Final review: orphan tree 경로 누락을 확인하고 공유 blob 경로 회귀검사를 RED -> GREEN으로 수정. 합성 검사 4/4 및 ESLint 통과.
- Ruling: Git partial-clone 재압축이 미참조 promisor 객체를 보존하므로, 보존 graph의 18,427개 객체 ID만 명시해 pack 생성. 비공개 원본 219개 객체를 별도 keep-pack에 보존.
- 폐기 blob 856개 부재, 독립 object store와 fsck 성공. 21개 시점의 비대상 파일 Git blob 동일.
- 추가 범위: 비공개 끊어진 트리의 폐기 보고서 5개(15,659 bytes), 오래된 캐시의 해시 일치 폐기 경로 495개(673,333,125 logical bytes).

- 원격 7개 참조 leased atomic 전환 확인. HTTP 500 1회 뒤 parent가 원래 없는 공통 root에만 임시 경계를 지정해 aggressive edge 전송(약 101MB) 성공; 이력 부모는 생략하지 않음. 임시 shallow 표시는 제거.
- 원본 blob 16,009개 중 유지 14,915개, 폐기 856개, 필터된 archive index 238개. 설명되지 않는 누락 0.
- 캐시 495개 경로(673,333,125 logical bytes), 미사용 pool 33개(44,888,875 logical bytes) 삭제. 15개 view와 모든 현재 pin/mount 및 lease 경로 전환.
- 차단: 자동 승인 검토가 이전 object store의 물리 삭제를 blocked by policy로 거절. 이 폴더를 다른 도구로 삭제하지 않음. 이전 compaction journal은 재실행 방지를 위해 stage로 비파괴 이동.
