# 국가 고유 기본색 확정표

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

확정일: 2026-10-04. 기본 객체 207개와 역사 라이브러리의 최상위 일반 객체 11개를 대상으로 한다. 214개에 색을 지정하고 4개는 미지정으로 둔다.
값의 기준 파일은 [country-default-colors.json](./country-default-colors.json)이다. 이 문서의 표는 해당 JSON에서 생성했다. `pnpm build:country-default-colors`로 앱이 사용하는 표시 자료를 생성한다.
앱은 지정색이 없는 국가에 이 기본색을 적용하고, 지정색 초기화 시 기본색으로 돌아간다. 저장된 사용자 지정색은 유지한다. 국가색 표시를 끄면 기본색과 지정색 모두 숨겨 기존 지도·지형 표현을 사용한다. 미지정 네 지역과 새로 만든 국가는 색을 부여하지 않는다. 하위단위는 기존 상위 색상 상속 규칙을 따른다. 라이브러리 객체는 원본 library ID로 기본색을 결정하므로 이름을 바꿔도 색이 유지된다.
- 사용자가 확정한 색과 미지정 지시를 우선한다.
- 기본 국가의 기존 HOI4 1936 MapChart 참조색을 유지하고, 없는 국가는 Millennium Dawn 정치지도 color로 보충한다.
- 역사 국가에는 해당 역사 객체에 대응하는 참조색만 사용한다. 현대 러시아와 소련, 체코와 체코슬로바키아는 별개다.
- color_ui와 게임 렌더링의 채도·명도 보정은 적용하지 않는다.
- null은 고유색 미지정이며 회색이나 임의의 대체색을 넣지 않는다.
- 하위단위의 독립 색상은 이번 국가 기본색 확정 범위에 포함하지 않는다.
남극, 비르 타윌, 시아첸 빙하, 사우던 파타고니안 아이스 필드는 고유색을 지정하지 않는다.
- [HOI4 1936 MapChart 프리셋](https://www.mapchart.net/txt/mapchartSave__hearts_of_iron_iv_provinces__1936.txt): 참조색이며 게임 원본 RGB와 완전 일치하는지는 미확인.
- [Millennium Dawn 원본](https://github.com/MillenniumDawn/Millennium-Dawn/blob/ec95c501d9488c4bc407463c0f09bdd9747943ad/common/countries/colors.txt): 정치지도용 color를 사용하며 color_ui는 사용하지 않음.

## 적용 기준
## 사용자 지정색
## 출처
## 기본 객체
## 역사 국가

---
[작성 당시 원문(무손실 압축)](../../archive/blobs/992dd4e3118c98fdd019d8d1a46b635cb201a5786aa6f11c3916c188d88ab07d.gz) · 원본 SHA-256 `992dd4e3118c98fdd019d8d1a46b635cb201a5786aa6f11c3916c188d88ab07d`.
