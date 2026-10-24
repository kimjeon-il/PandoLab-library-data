import { chromium, expect } from '@playwright/test';
import { appendFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const directory = resolve('.superpowers/button-release-20261022');
const proof = process.env.PANDO_NATIVE_TRANSPORT_PROOF_FILE;
const prefix = proof ? 'native-transport-proof' : 'native-ui';
const deadline = Date.now() + 45000;
let browser;
while (Date.now() < deadline) {
  try { browser = await chromium.connectOverCDP('http://127.0.0.1:9224', { timeout: 2000 }); break; }
  catch { await new Promise(done => setTimeout(done, 500)); }
}
if (!browser) throw Error('Native WebView debug endpoint did not open');
const context = browser.contexts()[0];
let page = context.pages().find(candidate => /tauri\.localhost/.test(candidate.url())) || context.pages()[0];
if (!page) page = await context.waitForEvent('page', { timeout: 10000 });
await page.waitForURL(/^https?:\/\/tauri\.localhost\//, { timeout: 15000 });
if (!/^https?:\/\/tauri\.localhost\//.test(page.url())) throw Error(`Unexpected native page ${page.url()}`);
if (proof) await page.route('http://tauri.localhost/assets/data/builtin-world/generated/v1/transport/**', route => route.fulfill({ path: proof, contentType: 'application/octet-stream' }));
page.on('console', message => { if (message.type() === 'error') appendFileSync(resolve(directory, `${prefix}-errors.log`), message.text() + '\n'); });
await expect.poll(async () => await page.locator('#app').getAttribute('data-readiness') || '', { timeout: 180000 }).toMatch(/enhanced|error/);
await expect(page.locator('#app')).toHaveAttribute('data-readiness', 'enhanced');
const metrics = await page.locator('.ui-button:is(.icon-btn, .ui-icon-button, .sheet-close-btn)').evaluateAll(buttons => buttons
  .filter(button => button.querySelector('svg') && button.getBoundingClientRect().width > 0
    && getComputedStyle(button).visibility !== 'hidden' && !button.closest('[hidden], .hidden'))
  .map(button => {
    const b = button.getBoundingClientRect(), s = button.querySelector('svg').getBoundingClientRect();
    return { id: button.id || button.className, width: b.width, height: b.height,
      dx: s.x + s.width / 2 - b.x - b.width / 2, dy: s.y + s.height / 2 - b.y - b.height / 2 };
  }));
if (metrics.length < 4) throw Error('Native button sample is unexpectedly empty');
for (const button of metrics) if (button.width !== 36 || button.height !== 36
  || Math.abs(button.dx) > 1 || Math.abs(button.dy) > 1) throw Error(`Native button alignment ${JSON.stringify(button)}`);
const runtime = await page.evaluate(() => ({
  url: location.href, assetRevision: globalThis.PANDOLAB_BUILD_META.assetRevision,
  dataRevision: globalThis.PANDOLAB_BUILD_META.dataRevision,
  resourceProfile: globalThis.PANDOLAB_BUILD_META.resourceProfile,
  native: typeof globalThis.__TAURI_INTERNALS__?.invoke === 'function',
  layout: document.getElementById('app').dataset.layout,
}));
if (!runtime.native || runtime.resourceProfile !== 'full-world') throw Error('Native full-world host is required');
await page.screenshot({ path: resolve(directory, `${prefix}-windows.png`) });
writeFileSync(resolve(directory, `${prefix}-result.json`), JSON.stringify({ runtime, metrics, injectedTransportForDiagnosis: !!proof }, null, 2));
console.log(`Native WebView UI PASS: ${metrics.length} icon buttons are 36px and within 1px of center`);
// Disconnect without closing the application. Its canonical probe owns exit.
await new Promise((done, reject) => {
  const timeout = setTimeout(() => reject(Error('Native probe did not exit after UI sampling')), 45000);
  browser.once('disconnected', () => { clearTimeout(timeout); done(); });
});
