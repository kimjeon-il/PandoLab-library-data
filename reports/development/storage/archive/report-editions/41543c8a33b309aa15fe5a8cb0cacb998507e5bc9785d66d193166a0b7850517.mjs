import { chromium, expect } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const directory = resolve('.superpowers/button-release-20261022');
mkdirSync(directory, { recursive: true });
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const base = 'https://kimjeon-il.github.io/Pando/';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const files = ['index.html', 'assets/js/build-meta.js', 'assets/css/ui-viewer.bundle.css',
  'assets/css/app.css', 'assets/css/viewer.css', 'assets/js/modules/timeline-controls.js'];
const hashes = await Promise.all(files.map(async path => {
  const response = await fetch(`${base}${path}?release=${commit}`, { cache: 'no-store' });
  if (!response.ok) throw Error(`${path}: HTTP ${response.status}`);
  const actual = Buffer.from(await response.arrayBuffer());
  const expected = execFileSync('git', ['show', `HEAD:${path}`], { maxBuffer: 8 * 1024 * 1024 });
  if (sha(actual) !== sha(expected)) throw Error(`${path}: deployed bytes differ from ${commit}`);
  return { path, status: response.status, bytes: actual.length, sha256: sha(actual) };
}));
const channel = await fetch(`${base}assets/data/library-channel/current.json?release=${commit}`, { cache: 'no-store' });
if (!channel.ok) throw Error(`data channel HTTP ${channel.status}`);
const channelJson = await channel.json();
if (channelJson.schema !== 'pandolab-data-channel' || channelJson.schemaVersion !== 1) throw Error('Invalid data channel');
const font = await fetch(`${base}assets/fonts/pretendard-v1.3.9/PretendardVariable.woff2`, { cache: 'no-store' });
if (!font.ok) throw Error(`font HTTP ${font.status}`);
console.log(`Live file parity PASS: ${hashes.length} files, channel/font HTTP 200`);

const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await cdp.send('Network.enable');
await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
const errors = [], warnings = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => {
  if (message.type() === 'error') errors.push(message.text());
  if (message.type() === 'warning') warnings.push(message.text());
});
const metrics = [];
try {
  await page.goto(`${base}?release=${commit}`, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#viewerStatus')).toHaveAttribute('data-ready', 'true', { timeout: 120000 });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
    const row = await page.locator('.timeline-step').evaluateAll(buttons => buttons.map(button => {
      const b = button.getBoundingClientRect(), s = button.querySelector('svg').getBoundingClientRect();
      return { id: button.id, width: b.width, height: b.height,
        dx: s.x + s.width / 2 - b.x - b.width / 2, dy: s.y + s.height / 2 - b.y - b.height / 2 };
    }));
    for (const button of row) {
      if (button.width !== (width < 800 ? 40 : 36) || button.height !== (width < 800 ? 40 : 36)
        || Math.abs(button.dx) > 1 || Math.abs(button.dy) > 1) throw Error(`Bad live button ${JSON.stringify(button)}`);
    }
    await page.locator('#timelineMonthButton').click();
    await expect(page.locator('#timelineYearInput')).toBeFocused();
    await expect(page.locator('#timelinePopover')).toBeVisible();
    await page.screenshot({ path: resolve(directory, `live-web-${width}.png`) });
    await page.keyboard.press('Escape');
    await expect(page.locator('#timelinePopover')).toBeHidden();
    metrics.push({ width, buttons: row });
  }
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('#viewerStatus')).toHaveAttribute('data-ready', 'true', { timeout: 120000 });
  await expect(page.locator('#timelineMonthButton')).toBeVisible();
  if (errors.length || warnings.some(value => /preload.*not used|preloaded.*not used/i.test(value)))
    throw Error(`Live diagnostics ${JSON.stringify({ errors, warnings })}`);
  console.log('Live browser PASS: fresh context, disabled cache, desktop/mobile date controls and reload');
  writeFileSync(resolve(directory, 'live-result.json'), JSON.stringify({ commit, base, hashes,
    channel: { status: channel.status, schema: channelJson.schema, mode: channelJson.mode || 'published' },
    fontStatus: font.status, metrics, errors, warnings }, null, 2));
} finally {
  await browser.close();
}
