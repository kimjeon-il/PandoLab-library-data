# 10월 21일 작업 브랜치의 main 통합

> 압축 열람본: 도입부 발췌. 전체 출처·결론·미확인 내용은 연결한 원문을 따른다.



> 보고서 ID: `DEV-ALL-BRANCH-20261021` · 상태: `integrated / focused-verified / local-only` · 지도 반영: `not-applicable` · 색인일: 2026-10-21
> 원문 최종 수정: 2026-10-21
> 기준: 통합 전 main·origin/main `f9197bd6cfdcb2824c4de0799e7308b3efd6a360`; 원격 fetch 후 아래 고정 참조를 통합
> 근거: main 워크트리의 ignored `.superpowers/sdd/all-branch-integration-20261021/`

## 범위와 통합

사용자는 다른 수정사항도 함께 main에 전부 병합하도록 요청했다. 모든 로컬·origin 브랜치의 main 미포함 커밋과 상설 워크트리 상태를 조사했다. 미커밋 실험·대량 테스트 삭제·생성물은 확정된 커밋에 섞지 않았다.

| 참조 | main 미포함 커밋 | 반영 내용 |
| --- | ---: | --- |
| `work/ui` `955134d4` | 2 | 초기 지도·프로젝트 교체 표시 연속성, 형상 중복 복사 제거, 웹 지구본 전용 |
| `origin/work/ui` `0ce82bbd` | 2 | 편집 작업과 삭제 동작의 고정 DOM 위치, 관련 UI 검사·생성물 |
| `work/objects`, `origin/work/objects` `bc3b5044` | 4 | C++ fixture 2건, Windows D3D11 WebGL 검사, 소스 일치 WASM·연결 생성물과 검증 기록 |
| `work/gis`, `work/places`와 각 원격, 원격 reference-image 브랜치 | 0 | 이미 main에 포함 |

main을 `955134d4`로 fast-forward한 뒤 원격 UI를 `63dcdb2a`, objects를 `b82c8ea5`로 병합했다. 제품 원본에는 충돌이 없었다. 생성된 HTML·build metadata와 P2 receipt에만 충돌이 있어 원본을 합친 뒤 기존 생성기로 다시 만들었다. receipt는 family별 변경을 결합하고 통합본의 필요한 generator/validator와 기존 P2 지문 계산으로 갱신했다. 마지막 fetch 후 모든 로컬·origin 브랜치 끝점이 main의 조상이고 미포함 커밋 수가 0임을 확인했다.

형상 저장소 성능 수정이 generator closure에도 포함돼 territorial/current-world/historical-world/prepared-mesh의 입력 지문이 바뀌었다. 해당 네 생성기와 검증을 실제 실행했다. 이 과정에서 역사 프로젝트 gzip의 OS 헤더가 Linux 3, Windows 10으로 달라진다는 기존 생성기 문제를 재현했다. 차이는 압축 파일의 9번 바이트 하나였고, 압축 해제한 JSON 바이트·프로젝트·형상은 동일했다. `8c0c9bb4`에서 기존 게시 형식인 OS 헤더 3을 생성기에 고정하고 회귀 assertion을 추가했다. 수정 후 정본을 대상으로 역사 생성기의 `--check`가 통과했고, prepared-mesh 입력·메시도 실제 decoder로 다시 검사했다. 기존 게시 자료의 바이트를 유지

[무손실 압축 원문](../../../../../../../archive/blobs/14074ce7cc0fa733b719e6a807a70b7406182eebfccdd73fd93ef694fd034e7d.gz)
