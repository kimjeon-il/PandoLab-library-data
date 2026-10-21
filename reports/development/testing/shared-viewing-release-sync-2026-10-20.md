# 공통 지도 변경 배포와 작업 브랜치 통합

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> 보고서 ID: `UI-RELEASE-SYNC-20261020` · 상태: `pages-content-verified / histories-integrated / ci-failures-recorded / native-unverified` · 지도 반영: `not-applicable` · 색인일: 2026-10-20
>
> 조사 기준: 구현 `edfd2a394f30`, 플랫폼 독립 생성 수정 `f761825cb342`, 브랜치 통합 `a4bbd1161803`, 원격 생성물 병합 `4da0a5e0353d`
>
> 원문 최종 수정: 2026-10-20 · [검증 근거](../../../archive/blobs/a220cc9722ebd0c4d571467ecb05cc9d22782b62c0b3046a16d3032472ab3d3f.gz)
사용자의 커밋·push·배포·다른 작업 브랜치 전파 요청과, 각 브랜치가 main보다 앞선 커밋도 모두 통합하라는 후속 요청을 처리했다. 기존 조사·편집 작업은 미커밋 상태로 보존한다. UI 재설계, 지도 형상 변경, 네이티브 내부 수정은 하지 않았다.
상설 워크트리와 원격 상태를 확인하고 검증된 UI 커밋 7개를 main에 fast-forward했다. 최초 Linux Pages staging은 물리 육지 gzip의 OS 헤더 차이로 실패했다. Windows 정본의 헤더 값 10을 생성기에서 고정하고, OS 값 3·10·255를 모의한 회귀 검사의 실패→성공을 확인했다. 기존 압축 자산·manifest·지도 좌표는 바뀌지 않았다.
Pages [39332711936](https://github.com/kimjeon-il/Pando/actions/runs/39332711936)는 `f761825cb3426ae47a69e967ba891822f44dcf91`에서 build·deploy에 성공했다. 공개 HTML·메타데이터·웹 배포에 포함된 Worker 의존성 90개와 물리 mesh를 실제 HTTP 응답으로 대조했다. 메타데이터의 앱 전용 Worker 목록은 웹 staging 목록과 교차해 검사하며, 웹에 없는 편집 자산을 배포 누락으로 취급하지 않는다.
Microsoft Edge 1280×800의 실제 Canvas Worker 경로에서 준비 완료 후 객체 수 254→5→254, 시점 왕복, 고유 색상 OFF, 문서 snapshot·dirty·Undo/Redo 불변, 내용 해시 Worker URL, console/page 오류 없음을 확인했다. 초기 미완료 상태를 기준으로 삼은 임시 probe의 불일치는 버리고 실제 `data-ready=true`를 기준으로 다시 확인했다. 이 공개 화면 검사는 개인 사용자의 기존 탭 캐시를 직접 검사했다는 증거가 아니다.

## 대상과 기준일
## 근거와 방법
## 브랜치 통합과 미완성 작업 보존
## 확인 결과와 한계
## 데이터 반영과 판본

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/35617729a71f845f763dcecab13e2fb1e3870f1380d47438945571a02aa76f99.gz) · 원본 SHA-256 `35617729a71f845f763dcecab13e2fb1e3870f1380d47438945571a02aa76f99`.
