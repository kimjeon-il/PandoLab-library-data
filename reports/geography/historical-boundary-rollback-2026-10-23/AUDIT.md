# Historical boundary rollback audit

Canonical candidate changes only East Germany's content-addressed entity pointer. The old object bytes are preserved exactly, not reconstructed. Source data repository commit: 36818f327b5d7a423dbf51db79106197786b69f6; path: objects/3e52e30668bbc6db2908b178e34fad4a96c17c204e715fed02e260340a30d1b1.json. Current baseline commit: 1373ef67d0a5ca8baf34edf493daa18fef37b9c7. Full SHA256 identities, shape validation and comparison list are in audit.json.

## Scope and preservation

East Germany changes from 8,708 to 4,108 coordinate pairs, retaining 6 polygons and 1 hole. The original is valid under Shapely. The exact entity ID, version ID, names, aliases, lifetime, version dates, lineage, parent, instantiation and metadata are unchanged. Only geometry, geometry-related sourceId/notes/boundarySupplement, and sourceInfo differ. Restoring the whole original object therefore removes now-inapplicable precision-source claims while preserving every identity and timeline property. The library index object and all 280 other entity references are unchanged. All referenced object bytes were independently SHA256-checked.

## USSR, Czechoslovakia and analogous states

Compared all 23 long-form historical state IDs against the original per-entity source files in app commit 5213223aa10b8f145203a0643a4ff18b0c2c0d2d (2026-10-06). Only East Germany differs in occupied shape. Czechoslovakia is exactly the same 1,355-coordinate shape; Yugoslavia versions are exactly the same 2,797/2,797/1,157-coordinate shapes; all 15 Soviet republics and other compared states have unchanged shapes.

USSR is the same 40,054-coordinate shape but original ring winding was later corrected. App commits 967cb6d0 and 973b4aba correct 231 reversed spherical exterior rings without changing vertices. Reverting this repair would resurrect sea-filling rendering behavior, not restore a simpler boundary. This candidate preserves the corrected current USSR object 56833e583a221bd8be4cc444de131c637e36a6504055c24f8ca7f644108abfeb and unchanged Czech object 87e1acabc7a3a630fd928cdb2e0a42ea4866f122dfc153d01de384cd201bad6f.

Earlier historical-library-pilot.json history was inspected back to initial app commit cd817d3a33a060d0ff10bc2cc30a3e67051c1be6 (2026-08-26). It contains successor-union recipes, not an older simpler stored Czech geometry. USSR's later recipe alteration in 1fee82666b6c1bbd2649c9ec332bccdd3759af51 (2026-09-07) includes the Baikonur lease hole in Soviet territory; this is a substantive correctness fix, not a precision expansion. No justification was found to undo it.

## Reproducibility follow-through

The app recipe tools/historical-library/east-germany-1989.recipe.json still contains added precision supplements. The first supplement was added by cca8b8e14948dfdebf90fa9040e8d99978aad1bf (2026-10-22). Its parent contains the original recipe. Publication should prevent an explicit recipe regeneration from silently reintroducing the rejected detailed geometry; inspect current recipe operation/inputs and disable only later supplements, retaining original inputs and current storage wiring. After follow-up authorization, the recipe was restored byte-for-byte from cca8b8e1^ while preserving its identical current output path. Existing research scripts and source evidence were retained. The two focused test files were aligned with the restored baseline; general provenance-update testing was retained via a synthetic fixture.

## Local work only

Initial candidate work wrote only this fresh directory. Authorized follow-up changed three app files: the DDR recipe, tests/unit/territorial-recipe-cli.test.mjs, and tests/test_v0300_east_germany_library.py. No refs, commits, remote objects, or publication state were changed. prepare-candidate.py reproduces the canonical candidate and JSON audit from immutable Git objects.

Validation: Node focused recipe tests: 6 passed, 0 failed, 1 skipped (no native C++ recipe binary configured). Five Python original-boundary tests passed against the candidate DDR object with currently mounted Germany geometry, including valid area/containment, identity/dates, reference points/West Berlin exclusion, partition and exact shared external vertices. git diff --check passed.
