import { chromium, expect } from '@playwright/test';
import { appendFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const directory = resolve('.superpowers/button-release-20261022');
const events = [];
const record = value => { events.push(value); appendFileSync(resolve(directory, 'native-events.log'), JSON.stringify(value) + '\n'); };
let browser;
for (let i = 0; i < 80; i++) {
  try { browser = await chromium.connectOverCDP('http://127.0.0.1:9224', { timeout: 1000 }); break; }
  catch { await new Promise(done => setTimeout(done, 250)); }
}
if (!browser) throw Error('No native debug endpoint');
const context = browser.contexts()[0];
const page = context.pages()[0] || await context.waitForEvent('page');
page.on('console', message => record({ type: message.type(), text: message.text(), location: message.location() }));
page.on('pageerror', error => record({ type: 'pageerror', message: error.message, stack: error.stack }));
page.on('requestfailed', request => record({ type: 'requestfailed', url: request.url(), error: request.failure() }));
await page.waitForURL(/^https?:\/\/tauri\.localhost\//);
await expect.poll(() => page.locator('#app').getAttribute('data-readiness'), { timeout: 180000 }).toMatch(/enhanced|error/);
const state = await page.evaluate(() => ({ readiness: document.getElementById('app').dataset.readiness,
  startup: globalThis.__PANDOLAB_STARTUP_METRICS__, body: document.body.innerText,
  diagnostics: Object.keys(globalThis).filter(key => /PANDO.*(ERROR|DIAG)/.test(key)),
}));
writeFileSync(resolve(directory, 'native-failure-state.json'), JSON.stringify({ state, events }, null, 2));
await page.screenshot({ path: resolve(directory, 'native-failure.png') });
console.log(JSON.stringify({ readiness: state.readiness, events: events.filter(row => ['error', 'pageerror'].includes(row.type)) }, null, 2));
await browser.close();
