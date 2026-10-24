# 참조 이미지 — 독립 지명 검색·삽입도·격자점·프로젝트 첨부 저장

> 보고서 ID: `UI-REF-PANELS-20261023` · 상태: `implementation-partial / windows-runtime-verified` · 지도 반영: `not-applied` · 색인일: 2026-10-23  
> 원문 최종 수정: 2026-10-23  
> 조사 기준: Web/App 공통 `work/ui` HEAD `08314289e08e814a1b13e805a8473003d5203ca6`의 미커밋 작업본  
> 원본·출처: 이 폴더 `corpus/sources/`, `source-inventory-dimensions.json`, 앱 구현 계획 및 아래 자료 링크  
> 이전 판본: [UI-REF-ANALYSIS-20261023](continuation-2026-10-23.md). 본 문서는 남은 단계의 후속 구현과 검증 기록이다.

## 대상과 기준일

지역 힌트 없는 오프라인 정합과 지도 전체 경계 추출 계획의 후속 구현이다. 기존 국가·행정경계·역사 귀속을 변경하지 않는다. 실제 모델 성능과 역사적 정확성은 개발 흐름 검증과 구분한다.

## 근거와 방법

- 기존 place runtime의 `reference` 검색은 화면 이동·현재 화면 범위·표시 언어·현재 월과 독립적이다. 원어·역사명 검색을 유지하며 프로젝트 라벨 identity catalog를 수정하거나 결과를 선택 보관함에 넣지 않는다. 기존 Worker RPC·스케줄러·취소 경로를 사용한다.
- 원본 Blob의 SHA256과 잘라 보는 원본 픽셀 사각형으로 같은 바이트를 공유한다. 본 지도·삽입도는 별도 목록 항목과 보정을 가진다. 원본의 수동 기준점은 유지한다. 중복 디코더와 두 보조 도구의 독립 디코드 캐시를 제거했다.
- 저해상도 직선 도곽과 명시적인 범례 OCR 표기로 후보를 만든다. 후보 본 지도가 하나로 명확하면 자동 정합을 이어가고, 여러 후보는 검토한다. 학습된 지도 영역 분류기나 모든 역사 지도 투영의 처리를 구현한 것으로 해석하지 않는다.
- RTL·아랍/페르시아 숫자·도분초를 해석하되 전사는 보존한다. 명시적인 N/S/E/W와 실제 격자선 교점을 대응한다. 충돌하는 좌표 표기는 제외한다. 미상 자오선·측지 기준은 추정하지 않는다. 그리니치/WGS84를 원본에서 확인한 경우에만 검토한 격자점을 추가한다. 곡선·비스듬한 격자 및 다른 측지 기준은 미구현이다.
- 첨부 자산은 엄격한 C++ 문서 스키마 밖의 패키지 경계에서 관리한다. GeoPackage에 원본 BLOB을 해시당 한 번 저장하고 각 이미지 항목의 영역·배치·기준점을 따로 저장한다. 파일/자동저장/콜드 스타트 복원, 이미지 준비 실패의 Core/이미지 롤백, 첨부 편집 후 늦은 저장 ACK가 새 편집을 지우지 않는 조건을 검증했다. Web 뷰어가 편집기 실행 모듈을 참조하지 않는 경로도 검사했다.

## 확인 결과와 한계

- 최종 관련 Node 검사 304개 통과(`focused-units-native-final-20261023.log`). 별도 전체 지도 패키징·프로브 검사 7개 통과. 해당 패키징 fixture에 필수 OCR manifest가 빠져 있던 실패를 확인하고 실제 새 계약으로 갱신했다. 변조 자산을 거부하는 검사는 유지했다.
- Python 코퍼스·평가·수집·분석용 축소 입력 검사 12개 통과. 다운로드 중단·출력 게시 실패 시 이번 실행이 독점 생성한 임시 파일과 불완전 sidecar를 제거하고, 기존 원본·다른 프로세스의 `.part` 파일은 보존한다.
- 브라우저에서 데스크톱/모바일 늦은 OCR 취소, 실제 Core 경계 편집/Live-Wire/일괄 생성/Undo/Redo/저장 후 재열기, 삽입도 분리/실제 GeoPackage 저장/목록 비우기/파일 재열기를 각각 확인했다. 이 흐름의 추론 fixture는 실제 학습 모델 성능 증거가 아니다.
- 검증용 native probe의 브라우저 경로는 실제 로컬 Tesseract·place Worker·공유 원본 패키지를 실행했고 외부 요청이 없었다. 전체 지도 readiness와 네이티브 report 전송은 이 브라우저 검사에서 fixture이며 WebView2 결과로 대신 주장하지 않는다.
- 독립 코드 검토에서 프로젝트 교체 중 편집 차단이 이미지 복원을 막던 문제, 뷰어 의존 경로에 편집기 store가 들어가던 문제를 발견하고 재현 검사 후 수정했다. 실제 브라우저 재시작은 첨부 자산이 Core admission으로 넘어가던 별도 누락을 찾아 수정했다.
- Windows 전체 지도 앱은 기존 고정 Cargo/stage 경로에서 실제 빌드됐다. 첫 전체 native OCR probe는 실패했다(`windows-native-runtime-2026-10-23.json`). 같은 앱의 전체 지도 검사는 실제 WebGL2·254개 객체·207개 주권 root·외부 차단 요청 0건으로 통과했다(`windows-world-debug-2026-10-23.json`). 전체 참조 분석을 통과했다는 의미는 아니다.
- native CDP 재현 결과 분석 Worker 안에서 URL로 직접 시작한 내부 Tesseract Worker만 `net::ERR_ABORTED`로 중단됐다. 주 스레드의 실제 OCR/OSD는 동작했다(`windows-ocr-debug-2026-10-23.json`). 내부 Worker를 로컬 Blob bootstrap으로 시작한 재현은 동일 보관 지도에서 70개 블록과 OSD를 실제 읽었다(`windows-nested-blob-worker-2026-10-23.json`). 공통 OCR 소유자에 같은 bootstrap을 적용하고 성공/인식 실패/초기화 실패 모두 URL을 해제하도록 수정했다. 초기화 오류는 언어·원인을 포함한 코드로 전달한다.
- 수정 후 29개 팩의 실제 순차 초기화/인식, 실제 지도 OCR·회전 복원·전용 분석 Worker·native probe 계약의 브라우저 검사 5개가 다시 통과했다. 이는 문자권별 역사 활자의 정확도 평가가 아니다. 수정된 전체 Windows 앱은 재빌드 중이며 최종 native 결과를 별도 JSON과 후속 체크포인트에 기록한다.
- 후속 독립 검토에서 Tesseract 초기화 중 언어 파일 실패 시 factory가 미완료로 남는 문제와 초기화 후 Worker crash가 인식 작업으로 전달되지 않는 문제를 재현했다. 고정 배포본에 raw Worker 노출 hook 하나를 검증 생성하고, 기존 OCR 소유자가 초기화 전부터 취소·오류 race와 종료를 맡도록 수정했다. 실제 배포 bundle에 fake Worker를 연결한 언어 로드 실패·초기화 실패·초기화 중 취소·초기/인식 중 raw 오류 검사 모두 종료·URL 해제·리스너 제거를 확인했다. 관련 OCR 단위 검사 14개가 통과했고 최종 독립 검토에서 Important 잔여 지적은 없었다. 전역 Worker 교체나 별도 OCR 프로토콜 구현은 추가하지 않았다.
- 이 수정의 실제 native probe는 OCR·지명 검색·이미지 패키지 다음 단계까지 진행한 뒤, 없는 모델 manifest에 native asset 서버가 HTTP200 HTML을 반환해 JSON 해석에서 실패했다(`windows-native-runtime-fixed-2026-10-23.json`). 모델 소유자에서 이 로컬 HTML 응답을 `PL-REF-MODEL-MISSING`으로, 손상된 JSON은 원인을 보존한 `PL-REF-MODEL-MANIFEST`로 전달하도록 수정했다. 실제 Worker에 같은 HTML 응답을 주는 브라우저 회귀와 세 가지 단위 검사 모두 통과했다. 최종 native 실행은 `windows-native-runtime-final-2026-10-23.json`에 기록하며 기존 실패 증거를 덮어쓰지 않는다.
- **최종 Windows 전체 지도 빌드 및 실제 native probe 통과.** `windows-native-runtime-final-2026-10-23.json`의 `ok=true`, `releaseReady=false`. 실제 852×675 지도에서 OCR 항목 61개, 화면 이동/다른 월/표시 언어 설정과 독립적인 Seoul 검색 결과 1개, 이미지 항목 2개가 원본 1개를 공유하는 패키지 복원, 모델 미준비 코드 `PL-REF-MODEL-MISSING`, 차단 요청 0건을 확인했다. 실제 WebGL2와 254개 모델 객체·207개 주권 root·258개 source 국가도 통과했다. `elapsedMs=4993.1`은 전체 지도 readiness 이후의 작은 지도 probe 시간이며 8MP 전체 분석·Android 성능 목표의 증거로 사용하지 않는다.
- 최종 브라우저 고유 시나리오 9개가 통과했다(실제 29팩/지도/회전/Worker OCR, probe 계약, 데스크톱/모바일 취소, 실제 Core 경계 편집/저장 재시작, 삽입도 GeoPackage 왕복). 마지막 native 오류 수정 후 관련 probe/Worker 두 시나리오와 HTML 응답 회귀를 다시 통과했다. 변경 JS ESLint와 runtime asset/metadata hash 검사도 통과했다. 자료 저장 owner의 별도 검사 6개도 통과했다. 연결된 Android 기기는 없다(`adb devices -l`, 2026-10-23).
- 빌드 중 메모리 압력으로 추가 Node 검사 프로세스가 시작 단계에서 메모리 할당 실패한 기록이 있다. 해당 실행은 통과로 계산하지 않았다. 이후 별도 포트 4287에서 데스크톱/모바일 취소·경계 편집 재시작·삽입도 실제 GeoPackage 왕복·실제 OCR probe를 포함한 브라우저 검사 5개는 통과했다.

## 실제 지도 자료와 학습 상태

| 자료 | 확보한 파일 | 상태 |
| --- | --- | --- |
| [LOC Tehran, 1889](https://www.loc.gov/item/2009582796/) | 공식 2048×1964 축소 JPEG, 783466 bytes, SHA256 `35c31b490ee4aab6c775540f18e59660d5b354deefdf9ec8568952bea80d875d` | 페르시아어, LOC 재사용 안내 기록. 원본 대형 스캔과 구별. 무라벨 |
| [Survey of India manuscript collection](https://zenodo.org/records/3596387) | 기탁 원본 17180×14414 JPEG, 26226792 bytes, SHA256 `cfdf4de3992c84ae3d45dc84e187c536298908b0712e74ce326d3ea775c57fc3` | 우르두어. 기탁자 CC BY 4.0, 공개 MD5 일치. 기탁 파일명은 지역·연대 미확정. Commons의 Ferozepur/1870은 이차 정보로 미확정 유지 |
| 위 우르두어 원본의 앱 입력 | 3087×2590 JPEG, SHA256 `103806f1b4390e8d74c47c7595422d0beed33c1d818540ea332481018468aa19` | 원본은 유지. JPEG 축소 디코드 사용. 가로/세로 원본 픽셀 비율·같은 제작 계열 ID 기록. 학습 정답 아님 |
| [LOC Egypt provincial survey, 1905](https://blogs.loc.gov/maps/2023/04/early-20th-century-survey-of-egypt-provincial-series-now-online/) | 후보 주소만 catalog에 기록 | 아랍어 지적도. 항목별 권리·원본 확인이 남아 수집에서 제외 |

자료 목록은 원본 후보, 공식 축소본, 앱 분석용 파생본, 보고서 스크린샷을 구별한다. 확보했다고 라벨을 검수한 것으로 처리하지 않는다. 모든 새 자료의 `reviewedLabels`/`trainingReady`는 false다.

공개 조사에서 [Semap](https://zenodo.org/records/19048095), [HCMSSD](https://zenodo.org/records/5513639), [MapSeg](https://zenodo.org/records/4817662), [Czech Map Border](https://corpora.kiv.zcu.cz/map_border/), [HisMap](https://zenodo.org/records/21707982)을 확인했다. 일부는 건물/필지 경계·토지피복·도곽/격자 라벨이며 국경/행정경계를 분리한 이번 7개 채널의 검수 정답과 다르다. Semap 원본별 권리와 일부 자료의 비상업 조건도 별도 검토가 필요하다. 이를 국경 모델의 정답으로 자동 치환하거나 대형 가중치를 불필요하게 내려받지 않았다.

## 남은 단계

1. 실제 도엽별 도시 기호·전사·독립 확인점·7채널 경계 라벨을 작성·검수하고, 같은 제작 계열·도엽·재스캔이 train/validation/test를 가로지르지 않는 평가군을 고정한다.
2. 실제 라벨로 MobileNetV3 U-Net을 학습·평가·ONNX 내보내기하고 문자권/지도군별 위치 정확도와 경계 정밀도·재현율 목표를 확인한다. 무작위 가중치나 임시 라벨을 출시 모델로 채택하지 않는다.
3. Android 실제 기기에서 외부 요청 없이 전체 흐름을 검증하고 8MP/추가 메모리 384MiB/180초 목표를 측정한다. 현재 연결된 Android 기기가 없고, 대형 원본 crop의 디코드 메모리도 아직 검증되지 않았다.
4. 역사적 정확성 및 2560 CSS px/0.5 CSS px 검증은 독립적인 시대별 형상이 확보된 경우에만 별도로 수행한다. 이번에는 실행하거나 통과한 것으로 보고하지 않는다.

## 데이터 반영과 판본

코드는 영구 `work/ui`의 미커밋 작업본이다. 원본·sidecar·보고서는 외부 자료 저장소에 기록한다. main 통합·push·게시를 수행하지 않았다. 임시 파일은 작업 종료 시 정리하며 현재 실행/증분 빌드에 필요한 캐시는 유지한다.

이번 종료된 native 테스트 프로필 `webview2-benchmark-reference-debug`와 `webview2-benchmark-reference-analysis`의 직접 삭제는 자동 승인 검토에서 정책상 차단됐다. 삭제·우회하지 않았고 회수량은 0 bytes로 기록했다(`probe-profile-cleanup-20261023.json`). 이전 실행에서 확보한 5.56GB 정리는 이번 회수량으로 중복 계산하지 않는다.
