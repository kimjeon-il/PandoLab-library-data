# Main-pinned Web publication

Date: 2026-10-26
Scope: Pando main data pin, Web/Worker identity, retirement of independent publication, app publication action.

## Progress ledger

- Baseline app main: 7d773ed2f6dde0b26accde5f39edc5d81ec068b9.
- Working baseline: f5d62d47b; 22 unrelated public GIS verification commits preserved and excluded from this task's main integration.
- Data pin unchanged: 68380579a7c7a1bd8ec97683b7517502c1389c3c.
- RED: staging lacked source/data commits; Worker URL lacked data pin; live verification module missing.
- GREEN: 17 focused frontend/native bridge/Worker/live verifier tests passed.
- Decisions: reuse work/gis; source and display geometries unchanged; no full GIS generation or package build; main pin is sole public owner; remove app direct publication and unused channel cache reader.
- Pending: storage and staging tests, focused browsers, independent review, main cherry-pick, live deployment, remote report publication and cleanup.

D drive baseline free bytes: 61101727744.

## Implementation verification

- Work commit: 97478813a774dda342362bb5063b2b6ab0a7fc70.
- Main cherry-pick: f539078ef04b3ce9b44822dbde44e7ee0271b151.
- Focused tests: 17 frontend/Worker/native JS bridge/live transfer checks; 19 existing storage/report/staging checks; 2 new runtime-push and stale-storage regressions; 18 editor staging/development/source-layout checks.
- Component browser: 5 initially passed, one counter assertion failed after reload reset; corrected assertion to exercise explicit GitHub sync before reload, then that case passed. No production workaround.
- Actual local viewer and editor web shell: 1922-12 USSR geometry and canonical rendering ready; Hungary lifetime 1000; Faroe before/at 1948-04-01; page errors 0; obsolete channel requests 0.
- Independent read-only review: no Critical/Important findings; reviewer did not run tests.
- No local Rust toolchain found; Rust/native command removal reviewed, but no local Rust compilation or native-device verification claimed. No SDK download or native package rebuild.
- Ruling: retained normal archive storage semantics for historical release bytes; old originals are preserved, but the viewer no longer publishes or selects them.

## Published behavior and remaining checks

- First publication run 40302055803 succeeded, including actual public transfer verification. Local and CI file inventories match exactly: 1,770 files / 220,945,208 bytes. Main commit f539078ef04b3ce9b44822dbde44e7ee0271b151; source data 68380579a7c7a1bd8ec97683b7517502c1389c3c.
- Fresh and warm-cache automated public browsers both rendered the 1922 USSR frame with the expected geometry reference, Hungary lifetime 1000, no old channel requests and no page/console errors. Local editor web shell retained Faroe date boundary behavior.
- An existing Edge tab also exposed a separate startup/timeline cancellation: changing month while initial resources were still loading produced PL-WATER-001 with underlying PL-CORE-STALE, Builtin selection admission crossed a project replacement (project-domain.js:266). After a normal reload the present-day frame rendered; a later manual timeline move left a country render gap in that tab. The source files project-domain.js and physical-resources.js are unchanged from prior main. No correction is claimed for this separate race.
- Shared C++ CI 40302055988 passed its selected native tests but failed package-shared-core-assets --check: WASM binary artifact stale, compiled 42de440a76a0fe27e6b2085dea23c3ad702fef84819d6cd143c6ae925fd2ec8a versus committed 999708dede6cd3f86b4ef05aa8d71d30a9f2ded347c1d4c07dd466370c796219. C++ and WASM sources/assets were not changed by this publication task; no regeneration or waived check. Architecture CI was still in progress at this checkpoint.
- Follow-up test fix 5f0732dab: make the local rejected-push hook executable on Linux as well as Windows. Focused rejected-push regression passed again. Main counterpart 6a13356609dedd25c258f7f00a8aedbff4f18450; final automatic deployment pending verification.
- Removed 222,016,935 logical bytes of task-owned verification copies and dead server leases. Measured D free-space gain during the main cleanup was 225,644,544 bytes; final free bytes will be recorded below. Source, data pin, prior library releases, other GIS work, permanent worktrees and native caches are preserved.
