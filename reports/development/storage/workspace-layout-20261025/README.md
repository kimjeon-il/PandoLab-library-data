# 웹·앱 공통 소스와 작업트리 구조 최적화

> 보고서 ID: DEV-STORAGE-LAYOUT-20261025 · 원문 최종 수정: 2026-10-26  
> 소스: bda4e40810b89385cc40cc9af5efe4af5918c8de · paired runtime: 63aebba20cf60cad314022c8aeb24c87922ceb6d  
> 대상: D:/dev/PandoLab 및 D:/dev/worktrees의 상설4작업트리

## 결과

5개 로컬·원격 브랜치를 같은 소스로 맞추고 main Pages를 배포했다. 제품 진입점은 apps/viewer와 apps/editor, 공통 JS·CSS·UI 조각·Worker·정적 자원은 shared/frontend로 옮겼다. 공통 C++·WASM 소스, 라이브러리 원문과 GIS 마운트는 기존 소유권과 논리 경로를 유지한다. sourcePath/publicPath 매핑으로 서비스 URL은 유지하며 소스 폴더에 생성 HTML·CSS·Worker closure를 다시 쓰지 않는다.

수정 가능한 소스는5개 파일 ID가 각각 독립이다. 의존 관계 디렉터리도 각각 독립이며 pnpm11.19.0 공용 virtual store의 패키지 바이트를 공유한다. 동일 입력의 viewer 산출물1772파일은 공용 frontend 디렉터리 한 곳을5작업트리가 참조한다. 자료 인덱스는5개 뷰가 동일 읽기 전용 파일 ID를 공유한다. Windows/ARM64 Android 실행기는10개 참조가2개 디렉터리만 사용한다. 전체 node_modules를 하나로 묶거나 변경 가능한 소스를 하드링크로 공유하지 않았다.

Windows/CI 텍스트 줄바꿈 및 Worker 비동기 수집 순서 때문에 동일 커밋의 캐시가 갈라지는 문제를 재현하고 수정했다. 라이선스·NOTICE 내용은 바꾸지 않고 생성 바이트만 Git의 LF로 정규화한다. 바이너리는 원문 그대로 유지한다.

## 실제 검증

- P2 CI40221021171:9자료 family와 WASM 검증 성공. 원문을 읽기 전용 공유 저장소에서 분리해 쓰고, 결과는 라이브러리 Git에 보관한 뒤 앱 Git에는 paired pin만 기록한다. 결과 증거는 앱 Git 대신 고정된 라이브러리 revision의 원문을 해시로 검사한다.
- 최종 frontend 회귀7/7, P2 회귀29/29 성공. 앞선 경로·staging·native·Pages·저장소 선별 검사와 worker/command/version 아키텍처 검사는 evidence에 명령·출력을 보존했다.
- 최종 Pages40223727324 성공. Windows viewer 산출물1771파일이 CI 산출물과 일치한다. 별도 게시되는 library-channel/current.json은 최종 Pages manifest 기준으로 검증했다.
- 실제 https://kimjeon-il.github.io/Pando/ 의18개 HTML·Worker·WASM·자료 manifest 응답은 크기·SHA-256이 CI manifest와 같다.
- 실제 사이트 desktop1280×800과 mobile640×360: 초기 로딩, 지도 이동·확대, 대한민국 검색, BCE/CE 월 전환, editor 저장 상태 격리를 확인했다. 모바일은 hasTouch/isMobile과 실제 CDP touch drag/pinch를 사용했고 화면 자체의 pinch 확대가 아닌 지도 확대임을 확인했다. 두 환경 모두 page error0.
- Windows는 컴파일러 없는 PATH에서 실제 가져오기·편집·Undo/Redo·GeoPackage 저장/재열기와 JS/CSS reload를 검증한 원본 로그가 있다. 저장 파일23298048bytes, SHA-256 d55553a43a5aa60698d4b17983e4089c6de598fda5c608883b54ba2d9b260e8a. 현재 실행기의 무결성과 --build-info도 다시 확인했다.
- 네이티브 바이너리의 실제 빌드 소스는3897ad26c295dc9082b5cb64282395f990d8bb01이다. 개발용 native 입력 hash가 같아 재사용한 것이며 최종 커밋에서 새로 컴파일했다고 표시하지 않는다. Android 인증서SHA-256은2fab34b4d4e070915c515741689fb5349c8606cc03c8295b273d359bd4e67bdd이다.
- 컴파일러 활성 상태는 false. SDK를 복원하지 않았다. GPU Python의 기존 Torch2.14.1+cu126 패키지와 CUDA driver1기기 접근, ADB 한 벌의 실행을 확인했다. 학습을 새로 실행하지 않았다.

## 이동·삭제·공간 측정

수치와 대상별 결과는 completion-record.json을 따른다. 논리 삭제 바이트와 마지막 파일 링크가 제거된 바이트, 실제 C/D 여유 변화는 다른 값이다. 하드링크와 junction을 따라 합산한 폴더 크기는 물리 사용량이 아니다.

원래 미추적 Worker140파일2147645bytes, 구 editor 원문151파일301059488bytes, 과거 검증77파일1652414bytes를 라이브러리 private-evidence/worktree-storage/workspace-layout-20261025/ui 아래에 출처·원래 해시와 함께 재배치했다. 다른3작업트리의 구 native schema12파일2882541bytes도 원문을 보존했고 동일 바이트는552295bytes의 파일 ID 집합으로 공유해2330246bytes의 중복을 줄였다. 이 재배치는 논리 삭제량에 넣지 않는다.

폐기한 것은 전환을 마친 구 pnpm 그래프, 정확히 재현된 구 CSS/Worker 산출물, 종료한 App staging, 검증 후 보관된 P2 작업 뷰2개, 참조가 끝난 frontend cache와 불변 pool 사본이다. 현재 task 임시 다운로드·WebView profile·검증용 GeoPackage·journal은 아래 최종 정리 결과에 추가한다.

1회 이전 blob GC790개는 CLI 축약 출력에 파일수와 실제 여유 변화49074176bytes만 남아 논리 바이트 총합을 재구성하지 않았다. 따라서 전체 논리 삭제량과 파일 ID 바이트 감소는 확인된 하한으로 보고한다. 이를 보완하려고 폐기 캐시를 재생성하지 않았다.

실제 드라이브 여유는 source 준비·공용 캐시/Git·다른 작업을 포함한 측정 기간의 순변화이며 삭제량을 그대로 공간 확보량으로 표현하지 않는다. 측정 시각과 실제 C/D 값은 completion-record.json에 기록한다.

## 보존 대상과 이유

- GPU Python: 기존 조사값4611846406bytes, UI/build-native/python 고정 경로. 분석·학습 실행 환경으로 보존했으며 재설치하지 않았다.
- 기존 GIS 원자료/평가 증거: 기존 조사277811013bytes. 지도 원문·마스터·평가 입력이므로 제외했다.
- 다른 GIS 작업의 이전 private edition4개: 색인상 전체2976317314bytes, 그중 private320798294bytes. 미보관 변경1601파일이 있어 삭제하지 않았다. 각 revision과 경로는 completion-record.json의 oldGIS에 있다.
- 구 editor/Worker/검증 원문: 위 private-evidence 경로. 정확한 복구가 확인되지 않은 고유 원문과 평가 증거이며 폐기 캐시로 취급하지 않았다.
- 현재 runtime: revision63aebba2의 파일2080개829738497bytes를5뷰가 읽기 전용 하드링크로 공유한다. 현재 viewer cache와 native2개, pnpm 공용 store는 실제 브랜치 참조/개발 실행 경로가 있다. 이 범주들의 논리 크기는 서로 같은 파일 ID를 포함하므로 합산 물리 크기가 아니다.
- 보고서 편집 원문은 reports/.edits/ui의 이 범위 한 곳에만 둔다. 현재 --check-reports 완료 검사의 필수 입력이며 다른 작업트리에 복제하지 않는다. 발행 정본은 라이브러리 루트 reports의 불변 원문이다.
- 기존 심사 차단 sccache22095bytes와 별도 보호 항목은 우회 삭제하지 않았다. Qt·Java·다른 프로젝트 공용 도구·모든 상설 브랜치/작업트리·Git 이력은 유지했다.

## 한계와 판정

전체 단위검사와 aggregate runtime-boundaries는 CHECK-BUDGET 후크가 계속 거부하여 실행하지 않았다. 그 검사들이 통과했다고 주장하지 않는다. 별도 GIS 원문 검사2건은 기대 해시/국기와 현재 자료 간 불일치가 남아 있다. 영향받는 원본3개는 시작 pin e6와 b0d에서 SHA-256이 같아 이 폴더 이동으로 생긴 원문 변경이 아니다. 역사 형상이나 검사 기대값을 임의로 바꾸지 않았다.

실기기 Android 검증과 모바일 editor UI 재설계는 승인된 범위에서 제외했다. 이번 자료 발행은 기존 인증된 로컬 Node/Git으로 완료했다. 향후 Actions에서 자료를 변경해 자동 발행하려면 저장소 한정 PANDOLAB_LIBRARY_WRITE_TOKEN이 필요하다. 광범위한 호스트 토큰을 임의로 등록하지 않았다. C++/Rust/Android 컴파일은 CI 소유를 유지한다.

신규 소스 정리 보고서의 완료 판정은 이 범위에 한정한 --publish-reports 후 --check-reports의 원격 바이트 검증 결과로 확정한다. 보고서 발행은 runtime pin을 바꾸지 않는다. 실행 중 판단과 비용은 decisions.md, 원본 로그·hash 목록·실제 화면·GeoPackage 증거는 verification.evidence.json.gz와 verification.index.json에 있다. 압축 증거는 gunzip 후 JSON files 배열의 base64를 복원해 각 SHA-256을 검증할 수 있다.

## 최종 임시 정리와 측정

검증 증거269파일의 원문44453538bytes를 SHA-256 검증한19611714bytes 압축본으로 보관했다. 현재 --check-reports의 입력인 편집 원문은 이 범위 한 벌이며, 검증용 다운로드·WebView profile·GeoPackage 원본·review 사본·journal 등 임시1287파일 276412027bytes를 삭제했다. task workspace가 실제로 없어졌고5개 소스 작업트리는 모두 깨끗하다.

확인된 논리 삭제 하한: **4097750280bytes**. 마지막 링크 제거 및 증거 원문의 동일 파일 ID 공유로 확인된 payload 감소 하한: **430669313bytes**. 이 합계에는 앞서 총바이트가 출력되지 않은790개 pool 객체를 억지로 더하지 않았다. 그 단계의 실제 여유 증가49074176bytes는 별도 증거값이다.

측정: 2026-10-25T19:42:53.758Z (임시 정리 후, 보고서 발행 전).

| 드라이브 | 시작 여유 bytes | 정리 후 여유 bytes | 기간 순변화 bytes |
| --- | ---: | ---: | ---: |
| C:/ | 26354470912 | 23991504896 | -2362966016 |
| D:/ | 58914938880 | 57021022208 | -1893916672 |

정리 기간 전체 순여유가 감소한 사실도 그대로 기록한다. 이를 삭제 실패나 삭제 바이트 자체로 환산하지 않는다. 새로운 자료·공용 캐시·Git 보관과 동시 시스템 활동을 포함한 순변화이며 원인별 전체 드라이브 차이는 이 기록만으로 단정하지 않는다.

자료 b0d→63 변경을 다시 대조해 선언된 생성물과 P2 receipt 밖의 원문 변경이 없음을 확인했다. 원문 source 바이트와 미완성 GIS 판본은 보존했고, 최종 웹·앱 code/pin 조합과 기존 source Git 이력은 유지했다.

## 기존 앱 판본과 외부 실행 경로

공용 native 디렉터리에는 현재5작업트리의10개 참조가 사용하는3897 생산물2개 외에, CI 전환 때 실제 검증한 ddced2c3 생산물2개가 있다. 합계74671857bytes이며 이 중 Android APK는 Samsung S22+ / Android16 실기기 검증에 사용한 기존 앱 판본이다. 현재 앱 보존 요청과 그 검증 판본의 원문으로 유지했고, 서로 다른 바이트/입력 판본을 중복 사본으로 지우지 않았다. 현재5브랜치가 사용하는 개발 입력은3897 쌍으로 일치한다. 상세 파일 hash/용도는 launcher-and-baselines.json에 있다.

바탕화면 PandoLab.lnk가 이미 제거한 apps/web-shell/run-windows.ps1 및 로컬 GNU debug 실행기를 가리키는 것을 확인했다. 같은 바로가기를 현재 Node.exe → D:/dev/PandoLab/apps/editor/dev.mjs --native=windows 호출로 갱신하고 icon과 working directory도 새 위치로 수정했다. 실행 정책 Bypass 인수는 이어받지 않았다. 변경 전/후 속성을 보존했으며 현재 컴파일러 없는 개발 진입점과 공용 CI 실행기를 사용한다. 이 수정은 바로가기를 갱신한 것이며 휴대폰 재연결이나 SDK 설치를 하지 않았다.
