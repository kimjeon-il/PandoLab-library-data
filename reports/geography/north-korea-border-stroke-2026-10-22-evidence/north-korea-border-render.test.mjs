import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { gunzipSync } from 'node:zlib';
import { chromium } from '@playwright/test';

const root = process.cwd();
const output = path.join(root, '.codex-remote-attachments/north-korea-border-render');

test('inspect only PRK/CHN data and stroke alpha accumulation', { timeout: 60000 }, async () => {
  await fs.mkdir(output, { recursive: true });
  const manifest = JSON.parse(await fs.readFile('assets/data/world/current.json', 'utf8'));
  const world = JSON.parse(await fs.readFile(path.join('assets/data', manifest.source.url), 'utf8'));
  const countries = world.features.filter(feature => ['PRK', 'CHN'].includes(String(feature.id)));
  assert.equal(countries.length, 2, 'Current world must contain one PRK and one CHN');
  const cache = JSON.parse(gunzipSync(await fs.readFile(path.join('assets/data', manifest.compatibility.sharedBoundaries.canonical))));
  const border = cache.segments.filter(segment => ['PRK', 'CHN'].every(id => segment.ownerIds.includes(id)));
  assert.ok(border.length, 'Pinned shared cache must contain the PRK/CHN border');
  const keys = new Set();
  let duplicates = 0;
  const lengths = [];
  for (const segment of border) {
    const key = [segment.start.join(','), segment.end.join(',')].sort().join('|');
    if (keys.has(key)) duplicates++;
    keys.add(key);
    lengths.push(Math.hypot(segment.end[0] - segment.start[0], segment.end[1] - segment.start[1]) * 2560 * 64 / 360);
  }
  const report = { data: { countryIds: countries.map(feature => feature.id), sharedSegments: border.length,
    exactDuplicateSegments: duplicates, subpixelSegmentsAt2560pxZoom64: lengths.filter(length => length < 1).length,
    extent: border.reduce((box, segment) => {
      for (const point of [segment.start, segment.end]) { box[0] = Math.min(box[0], point[0]); box[1] = Math.min(box[1], point[1]); box[2] = Math.max(box[2], point[0]); box[3] = Math.max(box[3], point[1]); }
      return box;
    }, [180, 90, -180, -90]) } };
  const server = http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (pathname === '/') { response.setHeader('Content-Type', 'text/html'); response.end('<!doctype html><html><body></body></html>'); return; }
      const filename = path.resolve(root, '.' + pathname);
      if (!filename.startsWith(root + path.sep)) { response.writeHead(403); response.end(); return; }
      response.setHeader('Content-Type', filename.endsWith('.js') || filename.endsWith('.mjs') ? 'text/javascript' : 'application/octet-stream');
      response.end(await fs.readFile(filename));
    } catch { response.writeHead(404); response.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11'] });
    const page = await browser.newPage({ viewport: { width: 900, height: 500 }, deviceScaleFactor: 1 });
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    report.gpu = await page.evaluate(async border => {
      const { createGpuStrokeRenderer } = await import('/assets/js/modules/gpu-stroke-renderer.js');
      const { createRenderDevice } = await import('/assets/js/modules/render-device.js');
      const canvas = document.createElement('canvas'); canvas.width = 768; canvas.height = 128; document.body.append(canvas);
      const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: true });
      if (!gl) throw Error('WebGL2 unavailable');
      const errors = [];
      const renderer = createGpuStrokeRenderer({ onError: error => errors.push(String(error.error?.message || error.stage)) });
      if (!renderer.initialize(createRenderDevice({ gl, canvas, version: 2 }))) throw Error('Stroke renderer initialization failed: ' + errors.join(';'));
      const frame = { viewport: [768, 128], translate: [0, 64], scale: 180 / Math.PI, dpr: 1,
        rowX: [1, 0, 0], rowY: [0, 1, 0], rowZ: [0, 0, 1], flatCenter: [0, 0], mode: 1, worldOffsets: [0] };
      const render = (name, step, aa, join) => {
        const values = [];
        for (let x = 64; x < 704; x += step) values.push(x, -0.25, Math.min(x + step, 704), -0.25);
        gl.viewport(0, 0, 768, 128); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
        const result = renderer.drawBatches([{ key: name, startsEnds: new Float32Array(values), style: {
          color: '#ffffff', alpha: 1, width: 0.72, cap: 'butt', join, antiAlias: aa, dash: [0, 0] } }], frame);
        if (!result.succeeded) throw Error('Stroke draw failed: ' + JSON.stringify(result));
        const pixels = new Uint8Array(768 * 128 * 4); gl.readPixels(0, 0, 768, 128, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        let totalAlpha = 0, maxAlpha = 0;
        for (let y = 0; y < 128; y++) for (let x = 96; x < 672; x++) { const alpha = pixels[(y * 768 + x) * 4 + 3]; totalAlpha += alpha / 255; maxAlpha = Math.max(maxAlpha, alpha); }
        const image = document.createElement('img'); image.src = canvas.toDataURL(); image.style.cssText = 'display:block;background:#ad8976;margin:4px'; image.title = name; document.body.append(image);
        return { equivalentAlphaWidthPx: totalAlpha / 576, maximumAlpha: maxAlpha };
      };
      const result = { sparseRound: render('sparse-round', 640, true, 'round'), denseRound: render('dense-round', 1, true, 'round'),
        sparseMiter: render('sparse-miter', 640, true, 'miter'), denseMiter: render('dense-miter', 1, true, 'miter'),
        sparseNoAA: render('sparse-no-aa', 640, false, 'round'), denseNoAA: render('dense-no-aa', 1, false, 'round'), errors };
      canvas.remove(); renderer.dispose();
      return result;
    }, border);
    await page.screenshot({ path: path.join(output, 'stroke-comparison.png'), fullPage: true });
    console.log(JSON.stringify(report, null, 2));
    await fs.writeFile(path.join(output, 'result.json'), JSON.stringify(report, null, 2) + '\n');
    assert.equal(report.data.exactDuplicateSegments, 0);
    assert.deepEqual(report.gpu.errors, []);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
