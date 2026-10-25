# Map Toolkit 일반 ChatGPT Work 클라우드 실행 검증

> 보고서 ID: `DEV-INTEGRATION-MAP-WORK-001` · 상태: `passed-with-limitations` · 지도 반영: `not-applied` · 색인일: 2026-10-25  
> 원문 최종 수정: 2026-10-25  
> 조사 기준: 패키지 준비 시 앱 소스 HEAD `93b6e1b17477080687e31b3eaa16f2596b9c7010` 및 당시 미커밋 플러그인 이전 코드. 정확한 파일별 바이트는 [입력 명세](input-manifest.json)로 식별한다.  
> 후속 진단 도구 수정 검사: `work/ui`, HEAD `3acf5ec0518d8f21285826a339fe59a6e496c6f2` 위 작업본. 동시 진행 작업의 커밋은 이 검증의 클라우드 스냅샷으로 간주하지 않는다.  
> 짝 자료 핀: `127e51c3457df87786ecf3aa5ad98ded690928df` · 플러그인 버전 `0.3.0`

## 대상과 판정

**일반 ChatGPT Work 클라우드에서 기존 엔진 실행 → 실제 지도 처리 → 검토한 선 내보내기 → 다음 턴 재열기·수정 → 필수 파일 반환까지 통과했다.** 사용자 PC는 패키지 준비와 반환 파일의 독립 해시 확인에만 사용했다. 클라우드 OCR·정합·추론을 PC 실행으로 대신하지 않았다.

검증 대화는 [환경 진단 결과](https://chatgpt.com/c/6add96e3-28c0-83ec-a4ef-abb94b145fb8)다. `chatgptWorkCloud`로 생성했으며, 해당 Work 대화의 실제 실행기는 durable 호스트의 `01a17195-7c0c-74f7-a9bd-3f3031e850ba`, 작업 폴더는 `/workspace/scratch/c120a2f2b9b5`다. 별도의 Codex Cloud 작업·API·서버·Remote/SSH를 만들거나 대체 사용하지 않았다. 실행 도구는 Work의 `functions.exec → tools.exec_command`였고 실제 명령과 종료 출력을 [work-execution.json](work-execution.json)에 보관했다.

| 검사 | 판정 | 확인 근거 |
| --- | --- | --- |
| Work Linux·Node·Python·파일·설치 | passed | 실제 셸과 npm 설치 성공 |
| Pillow/PyMuPDF·OCR·WASM·ONNX·지명 검색 | passed | 모의 응답 없이 기존 엔진 실행 |
| 실제 지도 분석·기준점 수정·선 내보내기 | passed | 새 작업, 검토한 `line:91` 하나 선택 |
| 같은 대화 다음 턴 지속성 | passed | revision 2→4, OCR·추론 데이터와 기존 내보내기 해시 불변 |
| GeoJSON·분석 JSON·PNG 반환 | passed | PC 실제 다운로드 후 원본 크기·SHA256 일치 |
| 선택적 전체 결과 ZIP 다운로드 | unavailable | 반복 시도·새 링크·새로고침 후에도 PC 저장 파일을 관측하지 못함. 계산 실패와 분리하며 통과 근거로 쓰지 않음 |

이번 판정은 최소 클라우드 실행 가능성에 한정한다. 모바일 플러그인 목록 등록, 휴대폰 UX, 플러그인 제품 완성, 일반 지도 성능, 독립 정확도, 역사적 정확성, Pando 가져오기·앱 검증은 수행하지 않았다.

## 입력과 권리

지도는 기존 NRCan Atlas of Canada의 캐나다 전체 흑백 지도다. 역사 경계를 입증하는 자료로 사용하지 않았다. 카탈로그 연도 2022, 인쇄 저작권 2024, 발행일 미확인을 구분한다. 기존 검토 입력에서는 Whitehorse·Yellowknife·Iqaluit·Ottawa·Winnipeg·Vancouver 여섯 기준점만 가져왔다. 이전 작업 JSON을 이어 쓰거나 서명 검사를 우회하지 않았다.

- [원본 PDF](https://ftp.maps.canada.ca/pub/nrcan_rncan/Geographical-maps_Carte-geographique/SmallScaleReferenceMaps/english_canada/b&w/Canadab&w.pdf), [공식 메타데이터](https://open.canada.ca/data/en/dataset/e9ffaaa6-c8f0-4c88-be9a-5d019a919ad8), [Open Government Licence - Canada](https://open.canada.ca/en/open-government-licence-canada)
- 원본 PDF: 841,931바이트, SHA256 `358cfad7e8329f019c820bc0b9e83b482e721eb09ebf6106d2e1580623f0b1b4`
- 분석용 기존 JPEG: 922,108바이트, SHA256 `67825bcd24499cd6e08e2dab561e1d455ee12d6869ae290f4e4e7a4e74320e3b`
- 원본 출처·권리는 [input-provenance.json](input-provenance.json)에 보존했다. PDF 해시와 래스터 해시는 별개다.

전체 저장소·Windows 가상환경·학습 환경을 복제하지 않았다. 기존 WASM과 로더의 소스 식별 입력, 공통 모듈, 정확한 잠금 버전의 Node 의존성, `eng`·`osd`, 현재 지명 자료, macro-v6 ONNX와 진단 텐서만 패키징했다. 패키지의 218개 파일을 설치 후와 최종 처리 후 재해시해 일치를 확인했다.

입력 ZIP은 26,845,976바이트, SHA256 `e8dc7a9746bc11744e44093c86ddb4e1d40231c98206c6d0f0f0bb75b887f277`이다. `probe.json` SHA256은 `be8b4e3c82510a4b71d60fec20986c5fb411b75a787d010cb45a4af7a4608327`이다. 언어팩·모델·지명 자료·라이브러리 라이선스의 정확한 파일 식별은 입력 명세를 따른다.

## 실제 실행과 자원

환경은 Linux 6.18.55 x86_64, Node v24.22.1, Python 3.12.14, Pillow 12.3.0, PyMuPDF 1.26.6이었다. 초기 디스크 여유 약 28.83GiB, cgroup 메모리 한도 8GiB였다. npm/PyPI 인증 없는 읽기 요청과 임시 파일 쓰기·읽기·삭제가 성공했다. [환경 JSON](environment.json), [환경 실행 근거](environment-execution.json)를 분리했다.

`npm install --ignore-scripts --no-audit --no-fund --package-lock=false`로 명세의 정확한 버전과 overrides를 사용해 31개 패키지를 설치했다. 시스템 제공 Python을 `PANDO_MAP_PYTHON`으로 연결했고 기존 `PANDO_MAP_WORKSPACE`를 사용했다.

| 단계 | 종료 코드 | 벽시계 시간 | 최대 자식 프로세스 RSS |
| --- | --- | --- | --- |
| npm 설치 | 0 | 21.140초 | 185,272KiB |
| components | 0 | 2.982초 | 298,036KiB |
| map | 0 | 13.535초 | 554,972KiB |
| export | 0 | 1.042초 | 94,832KiB |
| 다음 턴 resume | 0 | 1.064초 | 94,836KiB |

표의 RSS는 해당 명령을 둘러싼 프로세스 측정값이며 전체 서비스 메모리가 아니다. 관측 cgroup peak는 2,211,770,368바이트로, 서비스의 다른 프로세스도 포함한다. 한 장·축소 입력의 관측값을 휴대폰이나 큰 원본의 성능 목표 달성으로 확대하지 않는다.

고정 표본에서 실제 Tesseract는 ATHENS·LONDON을 인식했고 문자 상자와 회전 좌표 복원 검사를 통과했다. 기존 WASM은 affine 투영 `[0.5,0.5] → [15,15]`를 계산했다. 기존 전역 지명 색인은 London에 대해 `builtin:place:geonames:2643743`, `[-0.12574,51.50853]`를 반환했다.

실제 macro-v6 ONNX를 ONNX Runtime WASM CPU 1스레드로 실행했다. 출력은 `1×7×512×512`, 값은 모두 유한했고 기준 텐서 대비 최대 절대오차 `0.0004944801330566406`, 평균 절대오차 `0.00005941052129873218`로 허용치 `0.005`를 통과했다. 모델 SHA256은 `04ee59b043d1fde4a4c407fc079bdb03ba051eceb8adfb4784e7e67c62f7b39c`이다.

모델의 `trainingOnly: true`, `evaluationStatus: pending`, `releaseApproved: false`를 유지했다. 학습 관측 채널은 international·administrative이며 coast·hydro·transport·text·frame은 미관측으로 남는다. 출력 텐서의 7채널 존재가 모든 종류의 추출 성능을 입증하지 않는다.

## 지도·검토·지속성

기존 설정 `maxPixels: 1000000`, 영어 OCR로 새 작업을 만들었다. OCR 150개, 경계 chain 304개, face 후보 2개가 생성됐다. **자동 정합은 `needs-georeference`였다.** 위치를 임의 확정하지 않고 검토한 여섯 기준점을 구조화된 수정으로 적용해 `needs-review`로 진행했다. 이 수동 정합을 정밀도 합격으로 판정하지 않았다.

Work 실행기가 원본과 미리보기를 실제로 열어 비교한 뒤 Hay River 남쪽 굵은 행정경계 파선에 대응하는 `line:91`을 제안했다. 일부 계단 모양 오차가 남음을 기록하고 해당 선만 검토 대상으로 선택했다. 국가 귀속·이름·유효기간을 자동 지정하지 않았다. GeoJSON은 LineString 1개, 좌표 26개다.

다음 턴에 같은 작업 파일을 다시 읽어 기준점 수정과 재내보내기를 실행했다. revision은 2→4, segmentation signature는 `9f92659569febd90c53989fd8096cd243b15f96a2aed70f2ac29932767e97d89`로 유지됐고 OCR·segmentation 전체가 같았다. 원래 export 파일의 해시가 바뀌지 않았으며 resume-export의 네 산출물도 complete.json과 일치했다. [실행 영수증](cloud-receipts.json)과 원시 명령 출력에 근거를 보존했다.

## 반환 파일 독립 확인

브라우저의 파일 뷰어에서 JSON/PNG 형식을 선택해 실제 PC 파일을 저장했고 GeoJSON은 직접 다운로드했다. 자동화의 download 이벤트는 포착되지 않았으나 실제 Downloads 파일의 바이트로 확인했다. 확인 후 단일 보고서 소유자 폴더로 이동해 검증 사본을 누적하지 않았다. [검증 기록](download-verification.json)에 크기·전체 SHA256·좌표 검사·PNG 크기를 기록했다.

| 산출물 | 크기 | SHA256 |
| --- | --- | --- |
| [features.geojson](cloud/features.geojson) | 8,305바이트 | `bb0e8c31d66fdbaa79c8234a3acb04b7fa6065b33dfcbb853a9039fe69c5012c` |
| [analysis.json](cloud/analysis.json) | 603,434바이트 | `ec2c8a86a007f1a3b83ef8ffda932c45ecfd3fb29c450c2ec3c7f75edbfc2516` |
| [preview.png](cloud/preview.png) | 2,176,827바이트 | `212e19e6023f2fc35117d7ca71926acc4038fff62b5be62ac87274c1c0ece10d` |

GeoJSON의 26개 좌표는 모두 유한하며 경위도 범위 안에 있다. PNG는 2200×1701이다. 이는 이 선의 파일 유효성 검사이며 공유 경계·구멍·섬·날짜변경선 전반의 제품 검증은 아니다.

집계 ZIP은 클라우드에서 6,643,963바이트, SHA256 `b3eee9baa1284c106657697acc973c56c938f6ed5a4ceaf9dc3e2a1f0458d342`로 생성됐지만 PC 다운로드는 확인하지 못했다. [클라우드 manifest](cloud/artifact-hashes.json)는 ZIP 안 34개 항목의 해시를 나열하나, PC에서 ZIP 전체를 독립 확인했다고 주장하지 않는다.

## 진단 도구 수정과 검증 범위

패키지를 동결한 뒤 검토에서 진단 실행기의 두 문제를 발견했다. 반복 export/resume이 기존 성공 영수증을 발견하기 전에 작업을 변경할 수 있었고, 묶음의 provenance.json이 analyze 옵션에 전달되지 않았다. 현재 canonical 도구는 단계 산출물 존재를 실행 전에 거부하며 provenance를 명시적으로 전달한다. 의존성의 dependencies/devDependencies 위치 조회도 현재 package.json 계약에 맞췄다. 회귀 테스트는 수정 전 실패를 재현하고 수정 후 관련 6개가 모두 통과했다.

**실제 클라우드 증거는 원래 입력 ZIP 스냅샷의 결과다.** 현지 패키지를 중간에 고치거나 서명을 우회하지 않았다. 따라서 내려받은 원래 GeoJSON/analysis의 sourceEvidence는 null이다. 원출처·이용 조건·PDF/래스터 해시는 이 보고서와 외부 출처 파일에 별도로 보존한다. 후속 출처 전달·재실행 보호 수정은 로컬 단위검사로 확인했으며 클라우드에서 재실행했다고 표시하지 않는다. 제품 엔진의 수치 알고리즘을 다시 구현하지 않았다.

관련 단위검사와 `git diff --check`만 실행했다. 기존 Windows components 사전 점검은 [local-preflight](local-preflight/)로 구분하고 클라우드 근거에 섞지 않았다. 전체 검사·앱 빌드·재학습·main 통합·배포는 수행하지 않았다. 소스·미완성 작업과 자료 핀을 보존했다.

## 정리와 보관 이유

[PC 정리 기록](local-cleanup.json): 해시 확인된 펼친 패키지 40,498,156바이트, ZIP 26,845,976바이트, 임시 첨부 사본 두 개 각 26,845,976바이트를 제거했다. 합계 **121,036,084바이트(약 115.4MiB)**다. 자동 승인 검토가 삭제를 차단해 우회하지 않았으며, 사용자가 직접 실행한 뒤 네 경로가 모두 없는 것을 확인했다. 기존 원본·모델·라벨·체크포인트·환경은 삭제하지 않았다.

삭제 전후 실측 D: 여유는 `33,482,088,448 → 33,549,885,440`바이트, 차이는 `67,796,992`바이트다. C:는 `24,485,863,424 → 24,593,453,056`바이트, 차이는 `107,589,632`바이트다. 파일 논리 크기·할당량·동시 작업의 영향이 달라 두 값을 동일시하지 않는다. 작업 시작 D: 여유 `33,487,364,096`바이트도 별도로 기록했다.

[클라우드 정리 기록](cloud-cleanup.json): 설치 의존성을 포함한 펼친 패키지, JSON 뷰어용 전달 사본, 이전 결과 ZIP 두 개를 제거했다. 논리 합계 **250,923,303바이트(약 239.3MiB)**, 실측 여유 증가 **255,434,752바이트**다. 링크를 따라가지 않았고 분석 실행 프로세스가 없음을 확인했다. 보호된 일부 시스템 프로세스의 파일 설명자 검사 제한은 숨기지 않았다.

PC에 남기는 약 2.8MiB의 주요 생성물은 실제 반환을 확인한 분석 JSON·GeoJSON·PNG와 실행/출처/해시 증거다. 코드·언어팩·모델을 보고서에 중복 보관하지 않는다. Work의 업로드 ZIP은 이 대화의 입력 첨부이고, 원본 결과와 최종 ZIP·manifest는 현재 사용자 반환물과 다운로드 진단 증거이므로 보존했다. 보고서 게시로 생기는 Git 객체는 증거의 정본 이력이다.

## 다음 단계와 보관 완료

클라우드 최소 실행이 가능하다는 근거를 확보했다. 모바일 일반 플러그인 등록·배포와 제품 기능 완성은 별도 범위이며 이번에 시작하지 않았다. 자동 정합 보완 필요, 모델 미검증, 동결 스냅샷의 출처 전달 누락, 선택적 ZIP 전달 미확인을 후속 항목으로 남긴다.

완료 범위는 `reports/development/integrations/map-toolkit-cloud-probe`다. 이 범위만 기존 `--publish-reports`와 `--check-reports` 명령으로 보관·원격 검증한다. 검증된 라이브러리 커밋은 명령 출력과 작업 최종 응답에 기록한다. 보고서의 원격 보관을 앱 main 통합이나 배포로 간주하지 않는다.
