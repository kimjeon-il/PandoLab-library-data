# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: distribution.spec.mjs >> distribution controls stay inside the single view submenu on desktop and mobile
- Location: tests\browser\distribution.spec.mjs:65:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('#distributionMenuGroup')
Expected: visible
Received: hidden
Timeout:  8000ms

Call log:
  - Expect "toBeVisible" with timeout 8000ms
  - waiting for locator('#distributionMenuGroup')
    2 × locator resolved to <section id="distributionMenuGroup" aria-labelledby="distributionViewSettingsTitle" class="layer-style-editor distribution-menu-group hidden">…</section>
      - unexpected value "hidden"
    16 × locator resolved to <section id="distributionMenuGroup" aria-labelledby="distributionViewSettingsTitle" class="layer-style-editor distribution-menu-group">…</section>
       - unexpected value "hidden"

```

```yaml
- banner:
  - navigation "편집 기록":
    - button "프로젝트 변경 실행 취소"
    - button "프로젝트 변경 다시 실행"
  - navigation "문서 및 도움말":
    - button "파일 메뉴 열기": 파일
    - button "보기"
    - button "설정"
    - button "도움말"
- main:
  - link "© OpenStreetMap":
    - /url: https://www.openstreetmap.org/copyright
  - link "바이코누르 원본·파생 데이터 (ODbL)":
    - /url: https://github.com/kimjeon-il/PandoLab-library-data/blob/0b080946cda3c9150ac07693b6c5b03951313027/reports/geography/ne-selected-20261023/odbl-source-and-derivative.zip
    - text: 원본·파생 데이터
  - img
  - img: 아프가니스탄 앙골라 아르헨티나 남극 오스트레일리아 베냉 불가리아 바하마 벨라루스 볼리비아 브라질 보츠와나 중앙아프리카 공화국 캐나다 칠레 중화인민공화국 콩고 민주 공화국 쿡제도 콜롬비아 체코 덴마크 알제리 이집트 에리트레아 에스파냐 핀란드 프랑스 미크로네시아 연방 조지아 기니 가이아나 온두라스 인도네시아 인도 이라크 아이슬란드 일본 카자흐스탄 키르기스스탄 캄보디아 대한민국 라오스 마다가스카르 멕시코 말리 몽골 니제르 네팔 뉴질랜드 오만 필리핀 파푸아뉴기니 러시아 서사하라 소말릴란드 세이셸 튀니지 미국 남아프리카 공화국 프랑스령 남방 및 남극 그린란드 사우스조지아사우스샌드위치제도 세인트헬레나 미국령 군소제도
  - button "추가"
  - button "이미지 추가"
  - button "검색"
  - button "전체 지도 보기"
  - text: 미저장 평면지도
  - status: 현재 화면 준비 완료 · 저배율 표시
```

# Test source

```ts
  37  |   const distribution = page.locator('#distributionMenuTrigger');
  38  |   if (await distribution.getAttribute('aria-expanded') !== 'true') await distribution.evaluate(button => button.click());
  39  |   await expect(distribution).toHaveAttribute('aria-expanded', 'true');
  40  | }
  41  | 
  42  | async function autosavedDistributions(page) {
  43  |   return page.evaluate(async () => {
  44  |     const database = await new Promise((resolve, reject) => {
  45  |       const request = indexedDB.open('pandolab-editor', 2);
  46  |       request.onsuccess = () => resolve(request.result);
  47  |       request.onerror = () => reject(request.error);
  48  |     });
  49  |     try {
  50  |       return await new Promise((resolve, reject) => {
  51  |         const transaction = database.transaction('projects', 'readonly');
  52  |         const request = transaction.objectStore('projects').get('active-project');
  53  |         request.onsuccess = () => resolve({
  54  |           layers: request.result?.distributionLayers || [],
  55  |           entries: request.result?.distributionEntries || [],
  56  |         });
  57  |         request.onerror = () => reject(request.error);
  58  |       });
  59  |     } finally {
  60  |       database.close();
  61  |     }
  62  |   });
  63  | }
  64  | 
  65  | test('distribution controls stay inside the single view submenu on desktop and mobile', async ({ page }) => {
  66  |   test.setTimeout(90_000);
  67  |   await page.route('**/modules/app-property-selection.js*', async route => {
  68  |     const source = await (await route.fetch()).text();
  69  |     await route.fulfill({ contentType: 'text/javascript', body: source.replace('window.PANDOLAB_DISTRIBUTIONS = Object.freeze({',
  70  |       'window.__removeDistributionEntry = id => dependencies.objectModelA.distributionService.removeEntry(id);window.PANDOLAB_DISTRIBUTIONS = Object.freeze({') });
  71  |   });
  72  |   await page.setViewportSize({ width: 1440, height: 900 });
  73  |   const errors = await openApp(page);
  74  |   const group = page.locator('#distributionMenuGroup');
  75  |   const settings = page.locator('#distributionViewSettings');
  76  |   const style = page.locator('#layerStylePanel-distributions');
  77  |   await expect(group).toBeHidden();
  78  |   await expect(style).toBeHidden();
  79  |   await expect(settings.locator('#layerStylePanel-distributions')).toHaveCount(1);
  80  |   await page.locator('#mapDisplayBtn').click();
  81  |   await expect(group).toBeHidden();
  82  |   await expect(style).toBeHidden();
  83  |   await expect(page.locator('.view-menu-popups > #layerStylePanel-distributions')).toHaveCount(0);
  84  |   await page.locator('#mapDisplayBtn').click();
  85  | 
  86  |   await createDistribution(page, '보기 메뉴 검사');
  87  |   await page.locator('#mapDisplayBtn').click();
  88  |   await expect(group).toBeHidden();
  89  |   await page.locator('#mapDisplayBtn').click();
  90  |   await page.locator('#actionsTabBtn').click();
  91  |   await selectUiOption(page, '#distributionTerritorialUnitInput', 'DEU');
  92  |   await page.locator('#distributionValueInput').fill('0');
  93  |   await page.locator('#addTerritorialDistributionBtn').click();
  94  |   await expect(page.locator('#distributionEntryList .distribution-entry-row')).toHaveCount(1);
  95  |   await page.locator('#mapDisplayBtn').click();
  96  |   await expect(page.locator('#mapDisplaySurface')).toHaveClass(/view-menu-desktop/);
  97  |   await expect(group).toBeVisible();
  98  |   await expect(page.locator('#distributionMenuTrigger')).toHaveCount(1);
  99  |   await expect(style).toBeHidden();
  100 |   await expect(page.locator('.view-menu-popups > #layerStylePanel-distributions')).toHaveCount(0);
  101 |   await page.locator('#distributionMenuTrigger').click();
  102 |   await expect(settings).toBeVisible();
  103 |   await expect(style).toBeVisible();
  104 |   await expect(style.locator('[data-layer-style-opacity="distributions"]')).toBeVisible();
  105 |   await expect(style.locator('[data-layer-style-blend-mode="distributions"]')).toBeVisible();
  106 |   await expect(page.locator('#distributionOverlapRadio')).toBeVisible();
  107 |   await page.locator('#distributionSingleRadio').locator('..').click({ timeout: 5_000 });
  108 |   await expect(page.locator('#distributionActiveLayerInput').locator('..')).toBeVisible({ timeout: 30_000 });
  109 |   await expect(page.locator('#distributionSingleRadio')).toBeChecked();
  110 |   await expect(page.locator('#distributionLegend')).toBeVisible();
  111 |   await expect(page.locator('#distributionBoundaryVisibleInput')).toBeVisible();
  112 | 
  113 |   await page.locator('[data-map-display-row="objects"]').click();
  114 |   await expect(page.locator('#layerStylePanel-objects')).toBeVisible();
  115 |   await expect(style).toBeHidden();
  116 | 
  117 |   await page.setViewportSize({ width: 390, height: 844 });
  118 |   await expect(page.locator('#mapDisplaySurface')).not.toHaveClass(/view-menu-desktop/);
  119 |   await expect(settings.locator('#layerStylePanel-distributions')).toHaveCount(1);
  120 |   await expect(style).toBeVisible();
  121 |   await page.setViewportSize({ width: 1440, height: 900 });
  122 |   await openDistributionViewMenu(page);
  123 |   await page.locator('#distributionBoundaryVisibleInput').focus();
  124 |   await page.evaluate(async () => {
  125 |     const layer = window.PANDOLAB_DISTRIBUTIONS.listLayers()[0];
  126 |     await window.__removeDistributionEntry(window.PANDOLAB_DISTRIBUTIONS.listEntries(layer.id)[0].id);
  127 |   });
  128 |   await expect(group).toBeHidden();
  129 |   await expect(page.locator('#mapDisplayBtn')).toBeFocused();
  130 |   await page.locator('#undoBtn').click();
  131 |   await page.locator('#mapDisplayBtn').click();
  132 |   await expect(group).toBeVisible();
  133 |   await page.locator('#redoBtn').click();
  134 |   if (await page.locator('#mapDisplayBtn').getAttribute('aria-expanded') !== 'true') await page.locator('#mapDisplayBtn').click();
  135 |   await expect(group).toBeHidden();
  136 |   await page.locator('#undoBtn').click();
> 137 |   await expect(group).toBeVisible();
      |                       ^ Error: expect(locator).toBeVisible() failed
  138 |   await page.setViewportSize({ width: 390, height: 844 });
  139 |   await expect(page.locator('#mapDisplaySurface')).toHaveClass(/mobile-open/);
  140 |   await page.locator('#distributionBoundaryVisibleInput').focus();
  141 |   await page.evaluate(async () => {
  142 |     const layer = window.PANDOLAB_DISTRIBUTIONS.listLayers()[0];
  143 |     await window.__removeDistributionEntry(window.PANDOLAB_DISTRIBUTIONS.listEntries(layer.id)[0].id);
  144 |   });
  145 |   await expect(group).toBeHidden();
  146 |   await expect(page.locator('#mobileMenuBtn')).toBeFocused();
  147 |   expect(errors).toEqual([]);
  148 | });
  149 | 
  150 | test('single display follows distribution selection without another view menu change', async ({ page }) => {
  151 |   test.setTimeout(90_000);
  152 |   page.setDefaultTimeout(15_000);
  153 |   await page.setViewportSize({ width: 1440, height: 900 });
  154 |   // Exercise this display contract with the two real countries it uses rather
  155 |   // than spending its action budget preparing every unrelated world object.
  156 |   const countries = JSON.parse(readFileSync(new URL('../../assets/data/countries-ne-5.1.1.geojson', import.meta.url), 'utf8')).features;
  157 |   const saved = staticAutosaveProject({}, ['DEU', 'FRA'].map(id => {
  158 |     const country = countries.find(feature => feature.id === id);
  159 |     return createTerritorialFeature({ id, entityKind: 'general',
  160 |       name: country.properties.name, geometry: country.geometry });
  161 |   }));
  162 |   await page.addInitScript(value => localStorage.setItem('pandolab-editor-project', JSON.stringify(value)), saved);
  163 |   const errors = await openApp(page);
  164 | 
  165 |   for (const [name, countryName, unitId] of [['분포 A', '독일', 'DEU'], ['분포 B', '프랑스', 'FRA']]) {
  166 |     await createDistribution(page, name);
  167 |     await page.locator('#actionsTabBtn').click();
  168 |     await expect(page.locator(`#distributionTerritorialUnitInput option[value="${unitId}"]`)).toHaveText(countryName);
  169 |     await selectUiOption(page, '#distributionTerritorialUnitInput', unitId);
  170 |     await page.locator('#distributionValueInput').fill('10');
  171 |     await page.locator('#addTerritorialDistributionBtn').click();
  172 |     await expect(page.locator('#distributionEntryList .distribution-entry-row')).toHaveCount(1);
  173 |     const stored = await page.evaluate(name => {
  174 |       const layer = window.PANDOLAB_DISTRIBUTIONS.listLayers().find(layer => layer.name === name);
  175 |       return window.PANDOLAB_DISTRIBUTIONS.listEntries(layer.id);
  176 |     }, name);
  177 |     expect(stored).toHaveLength(1);
  178 |     expect(stored[0]).toMatchObject({ mode: 'territorial', territorialUnitId: unitId, value: 10 });
  179 |   }
  180 |   const ids = await page.evaluate(() => window.PANDOLAB_DISTRIBUTIONS.listLayers().map(layer => layer.id));
  181 |   expect(ids).toHaveLength(2);
  182 |   await page.locator('#mapDisplayBtn').click();
  183 |   await page.locator('#distributionMenuTrigger').click();
  184 |   await page.locator('#distributionSingleRadio').locator('..').click();
  185 |   await expect(page.locator('#distributionSingleRadio')).toBeChecked();
  186 |   await page.locator('#mapDisplayBtn').click();
  187 | 
  188 |   const renderedLayerIds = () => page.locator('#map path.distribution-shape')
  189 |     .evaluateAll(nodes => nodes.map(node => node.__data__.layer.id));
  190 |   for (const id of ids) {
  191 |     expect(await page.evaluate(layerId => window.PANDOLAB_DISTRIBUTIONS.select(layerId), id)).toBe(true);
  192 |     await expect.poll(renderedLayerIds).toEqual([id]);
  193 |   }
  194 |   await page.locator('#mapDisplayBtn').click();
  195 |   await page.locator('#distributionMenuTrigger').click();
  196 |   await selectUiOption(page, '#distributionActiveLayerInput', ids[0]);
  197 |   await expect.poll(renderedLayerIds).toEqual([ids[0]]);
  198 |   // The select's external popover closes the view menu; reopen it for the next command.
  199 |   await page.locator('#mapDisplayBtn').click();
  200 |   await page.locator('#distributionMenuTrigger').click();
  201 |   await page.locator('#distributionOverlapRadio').locator('..').click();
  202 |   await expect.poll(renderedLayerIds).toEqual(ids);
  203 |   await page.locator('#distributionBoundaryVisibleInput').locator('..').click();
  204 |   await expect(page.locator('#distributionBoundaryVisibleInput')).not.toBeChecked();
  205 |   await expect.poll(renderedLayerIds).toEqual(ids);
  206 |   await page.locator('#distributionBoundaryVisibleInput').locator('..').click();
  207 |   await expect(page.locator('#distributionBoundaryVisibleInput')).toBeChecked();
  208 |   expect(errors).toEqual([]);
  209 | });
  210 | 
  211 | test('a numeric distribution stores signed values and survives undo and redo', async ({ page }) => {
  212 |   test.setTimeout(180_000);
  213 |   await page.setViewportSize({ width: 1440, height: 900 });
  214 |   const countries = JSON.parse(readFileSync(new URL('../../assets/data/countries-ne-5.1.1.geojson', import.meta.url), 'utf8')).features;
  215 |   const germany = countries.find(feature => feature.id === 'DEU');
  216 |   const saved = staticAutosaveProject({}, [createTerritorialFeature({ id: 'DEU', entityKind: 'general',
  217 |     name: germany.properties.name, geometry: germany.geometry })]);
  218 |   await page.addInitScript(value => localStorage.setItem('pandolab-editor-project', JSON.stringify(value)), saved);
  219 |   const errors = await openApp(page);
  220 | 
  221 |   await createDistribution(page, '인구 변화');
  222 |   await page.locator('#distributionUnitInput').fill('명');
  223 |   await page.locator('#distributionUnitInput').blur();
  224 |   await expect.poll(() => page.evaluate(() => window.PANDOLAB_DISTRIBUTIONS.listLayers()[0]?.unit),
  225 |     { timeout: 30_000 }).toBe('명');
  226 |   await page.locator('#distributionColorTrigger').click();
  227 |   await page.locator('#distributionColorPopover [data-color-value="#3b82f6"]').click();
  228 |   await expect.poll(() => page.evaluate(() => window.PANDOLAB_DISTRIBUTIONS.listLayers()[0]?.color),
  229 |     { timeout: 30_000 }).toBe('#3b82f6');
  230 |   await expect(page.locator('#distributionColorInput')).toHaveValue('#3b82f6');
  231 |   await page.locator('#actionsTabBtn').click();
  232 | 
  233 |   const territorialUnitId = 'DEU';
  234 |   await expect(page.locator('#distributionTerritorialUnitInput option[value="DEU"]')).toHaveCount(1);
  235 |   await selectUiOption(page, '#distributionTerritorialUnitInput', territorialUnitId);
  236 |   await page.locator('#distributionValueInput').fill('-2.5');
  237 |   await page.locator('#addTerritorialDistributionBtn').click();
```