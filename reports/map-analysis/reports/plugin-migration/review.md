# Independent map plugin migration review

> Report ID: MAP-PLUGIN-REVIEW-20261025 · Status: verified-scoped · Map application: not-applied · Indexed: 2026-10-25
> Last revised: 2026-10-25
> Code: work/ui working tree; sources: task plan, signed analysis, native proof and focused check outputs.

Date: 2026-10-25 (Asia/Seoul)
Scope: Pando work/ui; plugin analysis/revision/export and removal of the retired application feature.
Code baseline: ba09f55f1523319f40fd749d02f66a6ca5666dfe; subsequent unrelated integrations were preserved.

A fresh read-only reviewer found no Critical issues and two Important issues. Both were reproduced and fixed in one pass:

1. Stored jobs previously carried a self-hash but could be recalculated using changed plugin/core code. Current jobs capture a path-independent identity of plugin runtime helpers, raster adapter, CLI, dependency lock and shared numerical/provenance/RPC owners, together with the verified core manifest. Revision, previews and export reject absent or changed identities. The running process also rejects files changed after load. Analysis rechecks image, data pin, OCR/place manifests and model identity before completion. An installed-plugin export of an older job was rejected with PL-MAP-RUNTIME-CHANGED; its original hash remained unchanged and no output directory appeared. Older evidence was preserved without restamping.
2. A single-page PDF with the CLI-shaped page:null input failed despite the documented optional page. The adapter now selects page 1 only after the multipage explicit-page guard. A real one-page PyMuPDF fixture reproduced the failure before the fix; all five raster tests passed afterward.

Focused Node tests: 105 passed. Python raster tests: 5 passed. Application project/surface/staging contracts: 49 passed. Check selector/runner tests: 24 passed. Publication boundary/current registry contracts: 15 passed, with the changed workflow registry later checked again (7 passed). Frozen calibration/trace/refinement fixture comparisons: 7/3/3 cases, zero mismatches. Actual untrained Node/WASM interface test: 1 passed. Scoped ESLint passed.

Current CI commands were updated to renamed pure plugin tests and ordinary GeoJSON import. Retired Android panel smoke assertions were replaced with the existing file-menu interaction. YAML parsed and all explicit test paths existed. Remote CI execution and an explicit verification-build run of that CI script were not performed; native local application evidence is separate.

The final ordinary browser test used final-canada-export/features.geojson and exercised actual import, an explicit user-selected conversion to the existing river editor, a pointer geometry edit, batch/edit Undo/Redo and GeoPackage save/reopen (12.0 seconds). Plugin output remains generic and does not assign a river type, country, name or lifetime automatically. Phone tests use their visible editor intent and guarded physical ADB taps. The camera test explicitly preserves all four current view fields and applies its test framing after selection focus. Earlier test-camera and timing failures are not reported as application fixes.

Reviewer exclusions were explicitly retained as limits: independent model/historical/geographic accuracy is outside this workflow proof; unrelated integrated GIS/storage work was not reviewed; final Android post-cutover completion requires its own successful native artifact, not the earlier pre-cutover result; generic-to-river conversion is an explicit test user choice. No model approval, application main integration or deployment is authorized by this review.
