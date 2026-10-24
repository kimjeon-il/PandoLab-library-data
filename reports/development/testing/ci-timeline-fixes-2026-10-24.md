# CI path resolution and timeline camera fixes — 2026-10-24

Sources: accepted conversation plan; main b2fbb0cf; original UI 9b1c2162.
Pre-flight: no shared product interfaces between the planner and viewer camera fixes.
Workspace: existing D:/dev/worktrees/ui. No new clone, worktree, build path or plan document.
Ruling: use this small external report as the execution ledger instead of generating a separate plan workspace; the accepted storage constraints require reuse.
Synchronization: fetched origin; merged main, preserving unpublished training commits and d401965fdbbcb53b54602b1d8736554b8ebc7dda.
Pin review: main has updated hydro names and binary metadata; this task retains the branch pairing rather than publishing or replacing private training data.
Task 1: CI regression tests, canonical relocation resolver, focused planner validation — pending.
Task 2: browser camera regressions, preserve existing camera owner during builtin month replacement, focused Web/editor validation — pending.
No main integration, remote publication, native build, GIS regeneration, or shutdown is part of this task.
Task 1: staged module resolution regressions failed before the fix, then all 21 planner/runner cases passed. Full original-range selection exposed a second existing catalog gap for nested Python; extended the declared P4 Python ownership to match its actual workflow, with its own failing regression first.

Original published CI range selection succeeded using current main source and patched planner/catalog. Only planned, not a full-suite execution.
{"comparison":{"event":"push","base":"15046c820c393e9822b9e148d972291d101822f1","requestedBase":"15046c82","head":"b2fbb0cfb47648dc797ae954e313d77ab5026d3d","workingTree":false,"files":[".github/workflows/gis-hydro-osm-batch01-research.yml",".github/workflows/gis-hydro-osm-batch02-research.yml",".github/workflows/gis-hydro-osm-batch03-research.yml","README.md","apps/web-shell/editor.html","assets/css/components/map-viewport.css","assets/css/ui-viewer.bundle.css","assets/css/ui.bundle.css","assets/js/build-meta.js","assets/js/modules/app-task-presentation.js","assets/js/modules/app-task-stage-model.js","assets/js/modules/physical-resources.js","index.html","tests/browser/workflow-v17.spec.mjs","tests/unit/hydro-tile-window.test.mjs","tests/unit/product-html.test.mjs","tests/unit/task-stage-model.test.mjs","tests/unit/task-stage-presentation.test.mjs","tools/gis/verify_osm_hydro_batch01_anchors.py","tools/gis/verify_osm_hydro_batch02_points.py","tools/gis/verify_osm_hydro_batch03_points.py","ui/fragments/map-attribution.html"]},"unitsSelected":76,"browserSelected":145,"external":["gis-python"],"executed":false}

Final review fixed root config/workflow URL dependency regression; added behavior regression and removed redundant early normalization. Final published CI selection replay: {"unitsSelected":76,"browserSelected":145,"external":["gis-python"],"executed":false}
Task 1: complete (7216c640de3f17d90135f3489a668ba615ff5b53). Canonical staged-path resolution, query/fragment handling, current P4 Python coverage, and root configuration/workflow URL dependencies verified.
Task 2: complete (a1dc7ed03d81160171e1dfef58cf3928bce8f1c9). Before fix Edge test showed rotation reset and globeZoom 1.7300383074759393 -> 1. After fix all camera snapshots unchanged across month/year/direct/current/automatic changes, desktop + narrow mobile, failed reads and superseded reads. Existing file-opening/date controls and editor camera/save/Undo/Redo state passed.
Final: 45 focused Node tests passed; 4 real Edge browser tests passed (3.1m); changed-file ESLint and git diff --check passed. Existing projection fixture now uses the viewer's supported globe mode; dedicated rejection/reprojection coverage remains intact.
Final review: one P2 root-config URL edge issue fixed RED -> GREEN; no other actionable findings.
Remaining limits: remote CI was not dispatched, native apps were not rebuilt, and no main integration/deployment/push was performed. A broad local comparison includes private unpublished training changes (e.g. tools/reference-analysis/README.md lacks classification); the exact published CI range 15046c82..b2fbb0cf instead succeeded, selecting 76 units and 145 browser specs without executing the full suite.
Storage: no new worktree, dependency install, runtime data copy, staging copy, native build, report restore, or large evidence copy. D free before 17217925120 bytes, before commits 17217630208 bytes.
