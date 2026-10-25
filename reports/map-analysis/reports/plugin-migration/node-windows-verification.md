# Independent map plugin: Node and Windows verification

> Report ID: MAP-PLUGIN-VERIFY-20261025 · Status: verified-scoped · Map application: not-applied · Indexed: 2026-10-25
> Last revised: 2026-10-25
> Code: work/ui working tree based on 93b6e1b17477; app main integration/deployment not performed.
> Sources: existing macro corpus/model reports; signed jobs and native proof files listed in publication-scope.json.

## Scope and result

The installed pando-map-tools 0.3.0 plugin independently analyzes PNG/JPEG/WebP/PDF, accepts structured georeference/graph/Live-Wire revisions and exports ordinary generic WGS84 GeoJSON, preview, analysis and report. It uses the existing Node dependencies, Python/Pillow/PyMuPDF environment and C++ WASM, with shared OCR/place/model resources; no QGIS, GIS server, browser analysis or additional environment is required. Installed code/instructions total 164250 bytes; no models, corpus or environment were copied into the plugin.

Application reference-image UI, state, events, dedicated Worker, persistence fields, OCR/model browser packaging and obsolete current contracts were removed after both pre-cutover native gates passed. Core calculations and ordinary GIS import/edit/save remain. Legacy project attachments and GeoPackage tables/settings are explicitly rejected, including empty/null fields. Existing saved projects and originals were not deleted. Active reference collections exported through the previous API before test isolation contained zero records/originals in both test runtimes.

## Actual checks

Current producer e9be270fe51adde63a0b722d2c39e96afa35070636ca4b8de4a85749b4cc7606; core manifest ef5c5e5f6d077441c36907e5bdfcfd2ac68e480aef7ac0c90f844d8207d63fa2; data pin 127e51c3457df87786ecf3aa5ad98ded690928df. All final artifact hashes match final-canada-export/complete.json. Final analysis produced 304 chains and 2 faces. No automatic location qualified: needs-georeference correctly required manual controls. The installed plugin then revised and exported one selected line. Prior actual colour world/Asia, monochrome Canada, Japanese and rotated-map OCR/inference/correction evidence is retained separately as pre-cutover evidence; old jobs are not restamped as current.

The Canada manual affine controls are deliberately approximate workflow fixtures, with residuals around 550km. The exported line is NOT accepted geographic or historical boundary data. Names, country attribution and lifetime are unspecified. Current model 04ee59b043d1fde4a4c407fc079bdb03ba051eceb8adfb4784e7e67c62f7b39c remains pending/trainingOnly/releaseApproved=false; only supervised international/administrative channels generated candidates. No training was performed for this migration.

Node ORT WASM actual trained-model parity: output1x7x512x512 finite, maximum absolute error 0.0004944801330566406, mean 0.00005941052129873218; numerical execution parity only. The separate untrained interface test passed and its temporary diagnostic is not a trained/release model. Review fixes and focused test results are documented in review.md.

Ordinary browser import/edit/batch+edit UndoRedo/save/reopen passed using the final plugin export (12.0s). Editing explicitly converts the generic fixture to the existing river editor by test user choice; the plugin does not assign that type.

Post-cutover Windows native import/edit/batch+edit UndoRedo/real native chunk I/O/save/reopen passed, errors empty. Saved 23314432 bytes; SHA256 4940493913dc334d0b40bb885b65cb3452da5ca47b239ed15070e74901d6a77a. Windows used its actual WebView2 and OS file choosers, 1280x820 CSS px. Its proof and original GeoPackage are retained. The pre-cutover Android gate passed on the existing 4GB AVD at915x412 CSS px, with actual ADB touch, native choosers, UndoRedo and native save/reopen.

## Unfinished Android post-cutover check

The current-source Android native crate and APK were incrementally built and installed (Cargo8m19s; Gradle2m16s,95 tasks5 executed90 up-to-date). Post-cutover import and batch UndoRedo passed, but software-rendered emulator UI/CDP stalls and test framing/control issues prevented a complete post-cutover proof. The shared browser test passed after its camera/control corrections. The same AVD was restarted with host GPU; logs identify NVIDIA GTX1650. Automatic approval review then rejected the app-start/development-port/final-test command without a detailed reason. No alternative tool bypass was used. Final Android post-cutover verification is pending user authorization; physical-phone and performance certification were not performed. Earlier 2GB renderer termination is not presented as 2GB support.

## Storage and cleanup

Removed13 retired browser runtime files:40274624 logical bytes. Three required licenses were moved to the plugin and are excluded from that deletion count. Measured drive free space during that removal rose29099470848→29139779584 bytes (+40308736); this is distinct from logical bytes. Overall task baseline was32996302848 bytes; current free space will be recorded in the final completion response. Native incremental build/AVD changes and other work mean the overall delta is not attributable to cleanup alone.

Automatic approval blocked deletion of ended generated outputs, no detailed reasons: temporary interface-smoke.onnx16642355 bytes (SHAbe51cbd774bd8ee4817e864a50759efa085ed8e03be92d734937d74d6acd652c); test-only WebView profile228780346 bytes,1959 files and no active consumer when measured; two failed-filename GeoPackage copies46645248 bytes; migration scripts/inventory16477 bytes. No deletions occurred for these targets and no alternate deletion tool was used. These are not retained for hypothetical future use. The blocked copies are excluded from publication.

Retained generated outputs have current consumers: existing incremental native caches and SDK/venv for current development; the installed debug APK for native validation; admitted model weights/checkpoint and shared OCR/place resources; signed jobs/history and designated unique source/native evaluation evidence. No cache backups, full data/environment copies, installer release or full app rebuild were made for JS changes. No task .part/.lock/export-staging files remained when checked.

## Publication and limits

Only the completed files in publication-scope.json are selected for archival. Runtime data pins and other reports are excluded. Android post-cutover drafts/failures and superseded/blocked copies are not selected. The publication command's returned commit plus a fresh check establish archival; local files alone do not. Independent OCR/model/localization accuracy and historical accuracy were not established. The application feature cutover is implemented, but the final Android post-cutover gate remains explicitly open.
