import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import * as library from '../../tools/library-data.mjs';

const git = (cwd, ...args) => execFileSync('git', ['-c', 'maintenance.auto=false', '-c', 'gc.auto=0', '-c', 'core.autocrlf=false', ...args], { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
const put = (root, file, text) => { mkdirSync(dirname(join(root, file)), { recursive: true }); writeFileSync(join(root, file), text); };
function fixture(t) {
  const base = mkdtempSync(join(tmpdir(), 'pando-report-publish-'));
  t.after(() => rmSync(base, { recursive: true, force: true }));
  const shared = join(base, 'library'), root = join(base, 'app'), remote = join(base, 'remote.git'), data = join(shared, '.pando-worktrees/ui');
  for (const folder of [shared, root]) {
    mkdirSync(folder); git(folder, 'init', '-q', '-b', folder === root ? 'work/ui' : 'main');
    git(folder, 'config', 'user.name', 'Fixture'); git(folder, 'config', 'user.email', 'fixture@example.invalid');
  }
  git(base, 'init', '--bare', '-q', remote);
  put(shared, '.gitignore', '.pando-worktrees/\n.pando-store/\nreports/.*\n');
  put(shared, '.gitattributes', '* -text\n'); put(shared, 'assets/data/current.bin', 'published runtime');
  const bytes = Buffer.from('published runtime'), runtime = { stored: 'assets/data/current.bin', encoding: 'identity', bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
  put(shared, 'archive/index.json', JSON.stringify({ branch: 'main', files: { 'assets/data/current.bin': runtime } }) + '\n');
  git(shared, 'add', '.'); git(shared, 'commit', '-qm', 'published data');
  const revision = git(shared, 'rev-parse', 'HEAD'); git(shared, 'remote', 'add', 'origin', remote); git(shared, 'push', '-q', '-u', 'origin', 'main');
  git(shared, 'worktree', 'add', '--detach', data, revision);
  put(data, 'assets/data/current.bin', 'private runtime in progress'); git(data, 'add', '.'); git(data, 'commit', '-qm', 'unfinished private runtime');
  put(root, '.gitignore', '.library-data/\n');
  put(root, 'config/library-data.json', JSON.stringify({ repository: 'example/data', revision, mounts: ['assets/data', 'reports'] }));
  git(root, 'add', '.'); git(root, 'commit', '-qm', 'source');
  mkdirSync(join(root, '.library-data')); symlinkSync(data, join(root, '.library-data/repository'), process.platform === 'win32' ? 'junction' : 'dir');
  const edits = join(shared, 'reports/.edits/ui'); put(edits, 'task/report.md', '# 원문\n'); put(edits, 'other/unfinished.md', '# 다른 작업\n');
  return { root, shared, remote, data, edits, revision, privateHead: git(data, 'rev-parse', 'HEAD'), pin: readFileSync(join(root, 'config/library-data.json'), 'utf8') };
}

test('report completion publishes only the selected originals through shared main and verifies remote bytes', t => {
  const f = fixture(t);
  assert.equal(typeof library.publishLibraryReports, 'function', 'report completion must include publication');
  const result = library.publishLibraryReports({ root: f.root, prefixes: ['reports/task'] });
  assert.equal(result.files, 1);
  assert.equal(git(f.remote, 'rev-parse', 'refs/heads/main'), result.revision);
  assert.equal(git(f.remote, 'show', 'main:reports/task/report.md'), '# 원문');
  assert.equal(git(f.remote, 'show', 'main:assets/data/current.bin'), 'published runtime');
  assert.equal(git(f.data, 'rev-parse', 'HEAD'), f.privateHead);
  assert.equal(readFileSync(join(f.data, 'assets/data/current.bin'), 'utf8'), 'private runtime in progress');
  assert.equal(readFileSync(join(f.root, 'config/library-data.json'), 'utf8'), f.pin);
  assert.equal(readFileSync(join(f.edits, 'other/unfinished.md'), 'utf8'), '# 다른 작업\n');
  assert.equal(existsSync(join(f.shared, 'reports/other/unfinished.md')), false);
  assert.equal(existsSync(join(f.root, '.library-data/materialized')), false, 'report completion must not prepare runtime data');
  assert.equal(library.publishLibraryReports({ root: f.root, prefixes: ['reports/task'] }).revision, result.revision, 'repeating completion creates no extra commit');
  put(f.edits, 'task/report.md', '# 수정\n');
  assert.throws(() => library.checkLibraryReports({ root: f.root, prefixes: ['reports/task'] }), /report|archiv|publish/i);
  library.publishLibraryReports({ root: f.root, prefixes: ['reports/task'] });
  assert.equal(git(f.remote, 'show', 'main:reports/task/report.md'), '# 수정');
});

test('failed push remains a failure with originals intact and retries the same report-only commit', t => {
  const f = fixture(t); assert.equal(typeof library.publishLibraryReports, 'function');
  put(f.remote, 'hooks/pre-receive', '#!/bin/sh\nexit 1\n');
  assert.throws(() => library.publishLibraryReports({ root: f.root, prefixes: ['reports/task'] }), /push|reject|failed/i);
  const saved = git(f.shared, 'rev-parse', 'HEAD');
  assert.equal(git(f.remote, 'rev-parse', 'main'), f.revision);
  assert.equal(readFileSync(join(f.edits, 'task/report.md'), 'utf8'), '# 원문\n');
  unlinkSync(join(f.remote, 'hooks/pre-receive'));
  assert.throws(() => library.publishLibraryReports({ root: f.root, prefixes: ['reports/other'] }), /outside.*scope|unpublished.*scope/i);
  assert.equal(git(f.remote, 'rev-parse', 'main'), f.revision, 'another scope must not publish the pending report');
  assert.equal(git(f.shared, 'rev-parse', 'HEAD'), saved);
  assert.equal(readFileSync(join(f.edits, 'other/unfinished.md'), 'utf8'), '# 다른 작업\n');
  assert.equal(library.publishLibraryReports({ root: f.root, prefixes: ['reports/task'] }).revision, saved);
});

test('publication preserves a busy lock and refuses unpublished non-report work on shared main', t => {
  const f = fixture(t); assert.equal(typeof library.publishLibraryReports, 'function');
  const lock = join(f.shared, '.git/pando-library.lock'); writeFileSync(lock, 'another writer');
  assert.throws(() => library.publishLibraryReports({ root: f.root, prefixes: ['reports/task'] }), /running/i);
  assert.equal(readFileSync(lock, 'utf8'), 'another writer'); unlinkSync(lock);
  put(f.shared, 'assets/data/current.bin', 'unfinished main runtime'); git(f.shared, 'add', '.'); git(f.shared, 'commit', '-qm', 'unfinished');
  assert.throws(() => library.publishLibraryReports({ root: f.root, prefixes: ['reports/task'] }), /unpublished|non-report|preserv/i);
  assert.equal(git(f.remote, 'rev-parse', 'main'), f.revision);
  assert.equal(readFileSync(join(f.shared, 'assets/data/current.bin'), 'utf8'), 'unfinished main runtime');
});

test('completion requires an explicit report scope and checks actual remote content', t => {
  const f = fixture(t); assert.equal(typeof library.publishLibraryReports, 'function');
  assert.throws(() => library.publishLibraryReports({ root: f.root }), /scope|prefix/i);
  assert.throws(() => library.publishLibraryReports({ root: f.root, prefixes: ['assets/data'] }), /report|scope/i);
  assert.throws(() => library.publishLibraryReports({ root: f.root, prefixes: ['reports/missing'] }), /missing|empty|scope/i);
  library.publishLibraryReports({ root: f.root, prefixes: ['reports/task'] });
  const corrupt = execFileSync('git', ['hash-object', '-w', '--stdin'], { cwd: f.shared, input: 'remote body differs from its archive metadata', encoding: 'utf8' }).trim();
  git(f.shared, 'update-index', '--cacheinfo', `100644,${corrupt},reports/task/report.md`);
  git(f.shared, 'commit', '-qm', 'out-of-band report update'); git(f.shared, 'push', '-q', 'origin', 'main');
  assert.throws(() => library.checkLibraryReports({ root: f.root, prefixes: ['reports/task'] }), /corrupt|mismatch|content|original/i);
});
