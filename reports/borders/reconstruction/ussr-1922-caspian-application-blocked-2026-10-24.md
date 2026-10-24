# 1922년 소련·카스피해 적용 — 승인 입력 전송 실패로 보류

> ID: `GEO-USSR-CASPIAN-BLOCKED-20261024` · 상태: `investigating / input-transfer-blocked` · 지도 반영: `not-applied`  
> 원문 수정·기록일: 2026-10-24 UTC  
> Pando `work/gis`: `f9e653a9833b1134f1b2d600f46e72b211f6e787`  
> 실행 자료 핀: `36210d5fde7d4d2301d0ff1335cf728e23b24195`; 자료 보관 기준 `work/gis`: `a09a1de5ee0e7fd6d6f8627c84f887068ca4eba9`

## 대상과 승인 범위

목표 역사 날짜는 **1922-12-30**, 실제 적용일은 **없음**이다. 소련 부모·RSFSR·Ukrainian SSR·Byelorussian SSR·TSFSR 경계 및 승인 카스피해 역사 수역이 대상이다. 카스피해 현대 형상은 보존한다. 카스피해·아랄해·북극을 제외한 해안선은 현대 기준선을 쓴다. 아랄해·북극 미확정 후보는 반영하지 않는다. 국가 동일성·불명확한 형상 종료일을 임의 생성하지 않고 존속기간과 형상 유효기간을 분리한다. 1801년을 가상 건국일로 넣지 않는다.

카스피해는 여러 시기 원도를 합친 1922년 전후 지도학적 근사 복원이며 정확한 1922년 실측 호안이 아니다. 현대 비교는 Natural Earth 5.1.1이며 2026년 실측이 아니다. NOT_COAST는 하구 수역 구분선이며 해안·육지·둑이 아니다. 근사·추정·NE 재사용·출처 충돌을 기록에 보존한다.

## 입력과 전송 실패

다음 ID·해시는 사용자 인계값이며 이번 환경에서 바이트와 대조하지 못했다.

- 소련 Library `libfile_8cf6b665a27881918da5d42874c0619d` v1, backing `file_00000000aa548230a80064207d3d5fe9`, `ussr-1922-v2-reviewed-master-20261023.zip`. Master SHA-256 `f9695322104f54439cba67730973578358e0826702eb7376739bc6fc15d33c85`; display `09016e357ef96f2e1d8f6d130ff8ae8ccd8cc9ebb8bca6befced785905d173c2`. 개략 Commons SVG 사용 금지.
- 카스피해 Library `libfile_0c41aacce8d8819197019919c7640343` v0, backing `file_0000000078ec8230b28ae107609a2fe1`, `caspian-shoreline-completed-candidate-20261024.zip`. 최종 경로 `caspian-completion/assembled-completion-candidate`; 경계망 SHA-256 `f6fce5c05021ae8fa080d8bf350a73aa1f4d4e1016e2a1dfffcc49809fc7361e`; 수역 `polygon-check/waterbody-polygon-candidate.geojson`. partial/rehearsal 금지.
- 승인 그림 `libfile_411e29d81e888191b4b4062543420dbc` v0, `caspian-near1922-vs-modern-ne511.png`: 이번에 열지 않았다.

소비 환경에서 최신 Library skill과 materialization 문서를 읽고 현재 bundled helper 및 companion을 새 private 디렉터리에 설치했다. 정확한 Library/backing ID와 명시적 목적지 `/workspace/approved-inputs`로 두 ZIP의 prepare_materialize를 호출했다. 준비 응답은 두 항목의 전송을 반환했고 unavailable 항목은 없었다. 지원 helper로 각 전송을 실행했지만 모두 exit 1, `library file transfer failed: download failed`였다. 파일 부재를 확인하고 같은 소비 환경의 명시적 목적지로 지원 흐름 안에서 **한 번** 재준비·재전송했으나 두 ZIP 모두 동일하게 실패했다. 최종 ZIP 수는 0이다.

실제 적용은 **미실행/차단**이다. 도구는 HTTP 상태나 하위 네트워크 사유를 제공하지 않았다. 권한 심사 거부라고 추정하지 않는다. 일반 다운로드 API·다른 URL·부모 환경 경로로 우회하거나 추가 재시도하지 않았다.

## 독립 확인

AGENTS.md, branch-policy, historical-border-reconstruction-policy, library-data 문서, report helper, README/TEMPLATE를 확인했다. 체크아웃에 `.agents/skills`는 없었다. 최신 코드/자료 원격 work/gis와 깨끗한 시작 상태를 확인했다. 자료 저장소에서는 검사·테스트·생성기를 실행하지 않았다. 아래 읽기·표본 관찰은 Pando 작업 디렉터리에서 수행했다.

핀 자료의 부모 `state:soviet-union`은 존속기간 `1922`–`1991`, 단일 형상 `state:soviet-union:1922-1991-baikonur-r1` (`approximate`, `1922`–`1991`)이다. 러시아·우크라이나·벨로루시 구성 공화국은 기존 부모 ID를 참조하며 존속기간 `1922-12-30`–`1991-12-25`, 단일 형상은 `1991-01-01`–`1991-12-25`이다. 이는 기존 값 관찰이며 역사적 날짜의 독립 검증이 아니다. TSFSR 대응 source/countries 파일은 이 핀 목록에서 발견하지 못했다. 코드에서 lifetime과 geometryVersions 유효기간은 분리되며 같은 객체의 형상 기간 겹침은 거부된다.

수역 표본 (51E,42N)은 기존 소련 및 현대 RUS/KAZ/IRN/AZE/TKM의 모든 형상 밖이며 hydro/lakes_base.geojson의 1,355개 피처에도 포함되지 않았다. 이 한 점은 전체 수역 포함 정책을 입증하지 않는다. 국가에서 카스피해를 일괄 차감하지 않았고 기간별 호수/국가 렌더링 통합은 보류다.

코드의 핀은 자료 main 계열이고 보관 대상 work/gis는 다른 이력이다. 기존 원문 보고서 색인도 다르므로 main의 색인을 work/gis로 전파하지 않고 새 보고서 경로만 선택 보관한다.

## 일반화·검증 보류

추가 인계에 따르면 README의 1:1,000만 목표·북부 300m 단순화 기재와 달리 added-island-outlines 및 일부 경계망에는 simplification_m: 0이 남아 있다. 이번 환경에서는 독립 확인하지 못했으며 **전체 단순화 완료라고 판정하지 않았다**.

재개 시 원본 후보·출처 경계망을 보존하고 별도 표시/런타임 수역을 NE 1:10M 표현 목표 및 기존 렌더링 배율에서 비교·일반화한다. 고정 2km를 일괄 적용하지 않는다. 주요 윤곽·연결 수로·68개 도서 구멍·NOT_COAST 역할을 유지하고 위상·편차·면적·정점 수 전후를 검증한다. 인계된 외곽 1개·구멍 68개·경계 266개·비끝점 교차 0개는 이번 실행의 통과 결과가 아니다.

원본 보고서/검증 기록 연결, 입력 해시 대조, 부모-구성 공화국 합집합·겹침·틈, 현대 해안 접합, 기간별 현대 카스피해 보존, 수역/국가 실제 렌더링, 표시 일반화는 모두 **미실행**이다. 지원 전송 복구 후 원본 날짜/대상을 확인하고 형상 종료일·TSFSR 동일성이 불명확하면 구체적 제안과 확인 질문을 제시해야 한다.

## 데이터 반영

GIS 형상·기간·객체·관계·런타임 파일·자료 핀은 변경하지 않았다. 산출물은 이 실패/재개 조건 보고서뿐이다. main 병합, 다른 브랜치 전파, 배포, 실행 파일/패키지 생성은 하지 않았다.


---
2026-10-24 follow-up: local approved ZIPs applied on work/gis. Original blocked record above is preserved. See ussr-1922-caspian-application-2026-10-24/README.md for checks, source rights, user-selected coverage through1925-05-12 and remaining modern-world merge limitation.
