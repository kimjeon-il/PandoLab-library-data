# Terrain continuity and hover implementation

Base: 6a13356609dedd25c258f7f00a8aedbff4f18450; work/ui.

Approved scope: scale changes choose source detail, never hide valid terrain. WebGL + Canvas; wire viewer picker to its existing canonical scope. Focused tests and browser verification only; no native build or application main integration/push/deployment.

Pre-flight: work/ui was clean; fast-forwarded reviewed main. Data pin 63aebba -> 6838057 changes 80 runtime entries (builtin-world, territorial-entities, prepared-polygons manifest) and 3 report entries. No shared C++/WASM changes. Use the already-public pairing; no GIS generation. Runtime pin remains 68380579a7c7a1bd8ec97683b7517502c1389c3c. D free before: 61078970368 bytes.

RED: GPU transition returns zero draws at high scale; reverse transition blanks at scale 641. Canvas coverage fails without the retired protocol flag. Canvas fixture used an obsolete generated file; use canonical policy exports.

Report ownership: continue the existing main-owned investigation edition through the report helper; no application main files are changed.

## Implementation and focused evidence

- GPU and Canvas: removed scale-based fallback eligibility and empty draw lists. Removed terrainAllowFallback producer/consumer/fixture field. Keep generation admission, source LOD and cache retention.
- Viewer picker uses its existing territorialScope. Actual viewer composition test failed with the exact displayFeature exception before wiring fix, then passed land/ocean hover and zoom with unchanged document checkpoint.
- Exhausted target requests report through onTileFailure without clearing valid DEM coverage. Corrupt decode/source errors still use onUnusable. Separate notification dedup flags reset on source reset and explicit retry. A reproduced late-decode-after-network-error regression was verified RED then GREEN.
- 41 focused GPU/Canvas/DEM/picking unit tests passed; all eight changed files pass focused ESLint and git diff --check. Full suite and check-js global scan were not run.
- Actual WebGL overview and detail wheel zoom tests passed with held next-LOD responses, nonempty visible coverage on every sampled transition frame, and real terrain draw colors.
- Independent read-only review of the change found no actionable issues. Subsequent failure-dedup refinement was checked with a targeted failing regression and the focused unit suite. Browser fixture modernization is still being finalized for dedicated-worker request routing and editor-shell checks.

## Completion scope extended by the user

The user subsequently authorized main integration and Pages deployment. Keep the reviewed data pin and other permanent branches unchanged; only this task commit is eligible for main.

Additional verification: 14 focused Worker asset/staging tests passed using tiny temporary fixtures and existing cleanup hooks. Editor-shell test uses the real File menu/project picker, the lazily initialized project state, and the canonical entity repository (not the numeric rendering index) to await project replacement. The final viewer test disables label pointer capture for the click so the polygon-body selection path is exercised.

The first final browser batch exposed test synchronization assumptions (stale prior-camera metrics and a lazily bound file picker). These were corrected without changing application behavior. An earlier file fixture used a retired hiddenObjectIds field; the new test uses the current saved-project fixture without that field.

## Final local validation and release

- Source/task/main/work-ui commit: ccaeaf521abc7d402eb661351cba8b3fa16c9f3b; both remote refs verified.
- Final browser batch: 5/5 passed (WebGL overview/detail transition, Canvas land/ocean color and coverage during held Worker tile responses, editor file replacement/hover/zoom, viewer hover and explicit polygon-body click). Dedicated-worker requests are gated at BrowserContext, not Page. Camera baseline waits for its actual target LOD.
- Unit tests: 55 passed (41 terrain/DEM/picking + 14 Worker/staging); focused ESLint and diff check passed. Full suite, native executable builds and GIS generation were not run.
- Pages deployment 40322069368 completed successfully. Its live verifier checked 10 code/data identity/manifest responses. A separate fresh HTTP check matched all four changed deployed JavaScript/Worker assets byte-for-byte to pages-evidence.json.
- fixed-webgl-overview.png, fixed-webgl-detail.png and fixed-canvas-zoom.png preserve the final transition screenshots (2,570,899 bytes moved, no duplicate copies). Source files and checksums are in implementation-verification.json.
- P2 source-matched-artifact publication is independently blocked by P2_LIBRARY_WRITE_TOKEN_REQUIRED (storage-repository-only Actions secret is not configured). This did not block Pages deployment. Do not substitute a broader token or weaken checks.
- Cleanup: test browser and owned development server were closed. Automatic approval review rejected the original combined cleanup and then an explicit deletion of two task-owned intermediate JSON reports with blocked by policy. The separate evidence moves succeeded. The two JSON files total 11,304 bytes and remain preserved; no alternate tool was used to bypass deletion rejection.

## Public browser proof

The actual public viewer at commit ccaeaf521abc7d402eb661351cba8b3fa16c9f3b accepted hover and a polygon-body click on TUR with no page/hover/click errors. Its canonical selection contains territorial:entity:TUR, and content/presentation checkpoints, dirty state and Undo availability were unchanged. The first fresh-page click probe ran before the presented country phase was ready; the successful probe awaited that existing guard via a read-only observation port. No production behavior was replaced. release/live-browser.json and release/live-map.png record the successful run; release/changed-assets-live.json separately verifies the unmodified published bytes.

Both app main and work/ui are clean and point to the same verified remote commit. Other permanent branches and runtime pins were preserved. No native package was generated; the app check was its browser web shell.

## Independent CI limitations

Shared C++ contracts run 40322069445 failed with `WASM binary artifact stale`. No shared/cpp or shared/frontend/static/wasm file changed in this task. The same stale-binary failure was already reported by pre-task run 40302055988. This task did not rebuild or replace native/WASM artifacts. P2 run 40322069681 separately requires the storage-only publication secret. Pages 40322069368, public-browser proof, P1 40322069938, P3 40322070076 and P4 40322069754 passed. Application Architecture was still running at the final snapshot; do not represent the entire CI set as green.
