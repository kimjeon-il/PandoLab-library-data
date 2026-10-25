# Library Git duplicate cleanup - 2026-10-26

Completed cleanup of the shared library Git object storage. Original files, runtime pins and every locally available Git object were preserved. No history expiration or remote-only recovery was used.

- Git object storage: 9203509113 -> 3478330149 bytes; net payload reduction 5725178964 bytes. File-ID payload reduction is the same.
- Actual D drive free space at cleanup checkpoints: 55402504192 -> 61128232960 bytes; increase 5725728768 bytes. This differs from payload bytes because filesystem allocation and other activity are separate measurements.
- Whole-task free space at report creation: 61127401472 bytes, change 5722472448 bytes from 55404929024. Publication can add small report objects afterward; final live measurement is reported separately.
- Removed 785 verified Git storage files, 6573348087 gross bytes. Replacement packs and index changes account for the difference from net reduction. This includes a 1034158080-byte interrupted download whose complete bytes matched a prefix of a fully verified retained pack.
- Packed duplicate entries: 20878 -> 0. All 17465 local objects, including unreachable objects, remain available. refs, HEADs, reflogs and worktree states matched before/after cleanup.
- All 36992 non-Git originals/edits/runtime files, 5596523544 unique file-ID bytes, retained their original SHA-256, size and file ID. The full hash baseline and executed audit sources remain once in private evidence; they contain no duplicate source payloads.
- A retired 31-byte fetch keep marker was moved unchanged into private audit evidence. Its associated pack was replaced; no original metadata bytes were discarded. The earlier Git KiB display rounded its size to zero.
- Actual consumer check: three pinned archived originals matched 15 mounted reads across all five checkouts. The existing completed report scope was queried successfully again; packed duplication remained zero.
- Prevention: library prepare/read/store/report publish/check share one Git storage owner, compact overlapping packs within the write lock, verify retained payloads before deletion, preserve promisor partitions and unreachable objects, resume safe interrupted inventories, and remove proven failed-download prefixes and replaced-pack keep markers. No background watcher, whole-library backup or per-fetch whole-repository repack was added.
- Focused verification: 47 related checks passed, followed by four marker/recovery safety checks and lint. No unrelated full suite, native compilation, data regeneration or device verification was run.
- Final source commit: b07ea7700c39fad5f4e7e0109581a9f04b4c0954; all five permanent local and remote branches were synchronized without force push. Final Pages run 40240870294 passed at b07ea7700c39fad5f4e7e0109581a9f04b4c0954, including the keep-marker follow-up.
- Preserved: all originals/private editions, current shared runtime views, library/app histories, permanent worktrees, native apps, GPU Python/CUDA and ADB. Remaining Git packs contain distinct local objects; count-objects reports prune-packable=0 and garbage=0.

See cleanup-result.json, consumer-reads.json, verification.json and test logs. Private evidence: private-evidence/storage-migrations/library-git-dedup-20261026.
