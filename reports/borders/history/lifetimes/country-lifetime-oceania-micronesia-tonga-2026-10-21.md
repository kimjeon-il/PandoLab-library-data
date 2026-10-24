# GEO-LIFE-009 — 오세아니아 국가 존속기간 1차 조사 (2026-10-21)

> **상태:** `investigating` · **지도 반영:** `not-applied` · **정본 예정:** `work/gis/reports/borders/history/lifetimes/country-lifetime-oceania-micronesia-tonga-2026-10-21.md`  
> **조사 범위:** 1801-01-01 이후 · **지역:** 오세아니아 · **단계:** 국가별 1차 조사 (4개국)  
> **원격 저장:** 차단으로 미완료. 본 파일은 조사 결과의 임시 보존본이다. 원격 저장 성공·검증 완료를 주장하지 않는다.

## 1. 사전 중복·색인 검사

- `work/gis`의 `reports/borders/history/lifetimes/country-lifetime-rotation-progress.md`, `reports/README.md`, `GEO-LIFE-001` 및 `GEO-LIFE-008`을 확인했다. 순환 커서는 남아메리카 다음인 **오세아니아**이다.
- 국가 색인: `assets/data/territorial-entities/generated/v2/index.json`, blob SHA `a26630cd820eb2ec05e1c87fb847aa8cdcf3dacf`. 선정한 4개국은 모두 `entityKind=general`, `lifetime.validFrom=null`, `lifetime.validTo=null`이다.
- 기존 조사국 `state:AUS`, `state:COK` 등은 제외했다. `state:FJI`, `state:KIR`, `state:NRU`, `state:PNG`, `state:TUV`, `state:VUT`, `state:WSM` 등에는 이미 시작일이 입력되어 있어 본 배치에서 제외했다.
- 코드 주의: `state:SOL`은 '솔로몬제도'가 아닌 **소말릴란드**로 확인된다. 객체는 반드시 ID와 이름을 함께 확인한다.

## 2. 조사 결과

| ID | 국가 | 확인한 사건(시점별 법적 성격을 분리함) | 1차 판정 |
| --- | --- | --- | --- |
| `state:FSM` | 미크로네시아 연방 | **1979-05-10:** 헌법에 기초한 자치국가 체제 출범. **1986-11-03:** 자유연합협정(Compact) 발효 및 미국의 독립 승인. **1990-12-22:** UN 안보리 결의 683을 통해 신탁통치협정 적용 종료 확인. | 현지 정부의 1979년 '독립' 표현과 미국 역사실의 1986년 독립 승인이 다르므로, 국가 정부 성립과 국제적 주권 인정·유엔 조치를 분리. `validFrom` 미확정. |
| `state:MHL` | 마셜제도 | **1979-05-01:** 헌법 발효·자치공화국 정부 출범. **1986-10-21:** 자유연합협정 발효·주권 독립 및 미국 승인. **1990-12-22:** UN 안보리 결의 683. | 1986년은 독립국 지위의 강한 후보일이나 1979년 정치체의 성립·계속성을 분리. `validFrom` 미확정. |
| `state:PLW` | 팔라우 | **1981-01-01:** 헌법 발효·공화국 헌정 개시. **1994-10-01:** 자유연합협정 발효 및 독립. **1994-11-10:** UN 안보리 결의 956 채택. | 1994-10-01은 정부·미 국무부·UN에서 일치하는 독립 시점. 1981년의 헌정 기구와 11월 UN 후속 조치를 구분. `validFrom` 적용은 2차 유보. |
| `state:TON` | 통가 | **1845년:** 제도 통합 왕국(미 국무부 연혁). **1875년:** 입헌군주제로 전환. **1900년:** 영국과 보호국 관계, 영국이 대외관계 관할. **1970-06-04:** 보호국 지위 종료, 대외적 독립·완전주권 회복. **1972-10-04:** 미국이 대사 임명을 통해 독립 주권을 인정. | **1970년을 '왕국 최초 성립일'로 취급하지 말 것.** 보호지위 중 통가 왕국의 법적 계속성과 `lifetime` 연속성을 검토. 미국의 1972년 승인은 1970년 종료일과 별개. |

위 날짜는 문헌에서 확인한 **사건일**이며, 객체의 단일 `lifetime.validFrom` 확정이 아니다. `validTo`는 네 국가 모두 색인상 `null`이다.

## 3. 핵심 판정 쟁점

1. **1986년/1990년 층위 차이:** 미국 대통령 포고령 5564는 마셜제도 1986-10-21과 미크로네시아 연방 1986-11-03에 대해 자유연합협정의 발효 및 미국 측 신탁통치 의무 종료를 선언한다. UN 안보리의 결의 683은 **1990-12-22**에 별도로 신탁통치협정 적용 종료를 결정했다. 미국 정부의 포고령과 UN 안보리 결의는 서로 다른 행위로 취급한다.
2. **팔라우 1981년/1994년:** 헌법 발효로 헌정체가 조직되었다는 사실은 1994-10-01 국제적 독립과 구분한다. UN 결의 956의 채택일 1994-11-10을 독립 시작일로 소급해 기록하지 않는다.
3. **자유연합(Free Association):** 미국의 재정·안보 책임이라는 이유로 독립국의 법적 소멸을 추론하지 않는다.
4. **통가:** 1900~1970년 영국 보호국 관계는 기존 통가 왕국의 자동 소멸을 뜻하지 않는다. 보호 지위가 끝난 1970년의 날짜로 왕국 최초 건국일을 덮어쓰지 않는다.
5. **북마리아나제도:** 같은 미국 관리 신탁통치 지역이었더라도, 미국 주권 아래 헌정적 연합(territory/commonwealth)으로 진입했기 때문에 독립국 4개 대상과 합치지 않는다.

## 4. 출처 및 교차검증

### 미크로네시아 연방 (FSM)

- 미크로네시아 연방 정부 — 자유연합 및 독립 서술: https://gov.fm/cofa/
- 미크로네시아 연방 정부 — 1979년 헌법 발효 기념: https://gov.fm/happy-fsm-constitution-day/
- 미국 국무부 역사실 — 1986-11-03 독립 승인: https://history.state.gov/countries/micronesia
- 미국 국립문서기록관리청 — 대통령 포고령 5564 원문, 1986-11-03: https://www.archives.gov/federal-register/codification/proclamations/05564.html
- UN 안보리 결의 683, 1990-12-22: https://digitallibrary.un.org/record/103696

### 마셜제도 (MHL)

- 마셜제도 주미대사관 — 독립 1986-10-21 및 헌법 1979-05-01: https://www.rmiembassyus.org/country-profile
- 마셜제도 주미대사관 — 정부 역사 및 자유연합: https://www.rmiembassyus.org/about-2
- 미국 국무부 역사실 — 1986-10-21 승인: https://history.state.gov/countries/marshall-islands
- 미국 대통령 포고령 5564: https://www.archives.gov/federal-register/codification/proclamations/05564.html
- UN 안보리 결의 683: https://digitallibrary.un.org/record/103696

### 팔라우 (PLW)

- 팔라우 정부 — 1994-10-01 독립: https://www.palaugov.pw/about-palau/
- 미국 국무부 역사실 — 1994-10-01 미국 승인: https://history.state.gov/countries/palau
- WIPO Lex에 수록된 팔라우 헌법 제15조(1981-01-01 시행): https://www.wipo.int/wipolex/en/legislation/details/8110
- UN 안보리 결의 956(1994-11-10): https://digitallibrary.un.org/record/163867/

### 통가 (TON)

- 영국 의회 상원 토론 기록(1970-04-28) — 보호 지위 종료 1970-06-04: https://hansard.parliament.uk/Lords/1970-04-28/debates/cf4770ea-35f0-4d7d-9d3a-b1efbfcf57cb/TongaBillHl
- 뉴질랜드 Tonga Act 1970 — 1970-06-04 이후 독립 주권국임을 명시한 서문과 시행 규정: https://www.legislation.govt.nz/act/public/1970/16/en/latest/
- 미국 국무부 역사실 — 왕국 1845/1875, 보호국 1900, 1970년 종료 및 1972년 미국 승인: https://history.state.gov/countries/tonga

각 국가에 대해 **서로 다른 행정 주체 또는 1차 법령·국제기구 기록을 최소 2개 대조**했다. 다만 헌법·조약의 모든 원문, 국가 동일성·실효지배 및 정확한 `validFrom` 법률 판단은 아직 전수 검증하지 않았다. 1801년 이전 사건 조사는 하지 않았다.

## 5. 검증 제한과 후속 실행

- 자료 조사 이외의 **GIS 형상 비교·지도 확대배율 시각 검수·위상·인접국·앱/웹 테스트는 미실행**. 그 항목을 통과로 기록하지 않는다.
- 국가 존속기간/lifetime, 역사 형상, 웹·앱 코드, `main`, 배포 변경 **0건**.
- 보고서 원격 저장을 두 차례 시도했지만 안전 검사로 차단됐다. 따라서 **원격 커서와 `reports/README.md`는 아직 이전 상태**다. 이 파일을 `work/gis/reports/borders/history/lifetimes/country-lifetime-oceania-micronesia-tonga-2026-10-21.md`에 등록하고 색인·진행기록을 갱신하기 전까지 원격 완료로 표기하지 않는다.
- **이번 조사 지역:** 오세아니아. **이번 신규 1차 조사:** FSM, MHL, PLW, TON 4개국. **잠정 다음 지역:** 유럽. 다음 회차에는 우선 해당 보고서의 원격 등록 상태를 확인하고 미등록이면 복구한 다음, 유럽 A–D·GEO-LIFE-004 처리국을 제외한 미완료 국가 2~4개를 선정한다.
- 오세아니아 전체 1차 조사 또는 2차 교차검증 완료를 뜻하지 않는다.