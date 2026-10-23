# SDD ledger — plan: exact-calculation-optimization (approved conversation plan)

> 압축 열람본: 도입부 발췌. 전체 출처·결론·미확인 내용은 연결한 원문을 따른다.



Spec: Audit all first-party calculation paths; preserve exact values, order, serialization, errors, locks, cancellation, Undo/Redo and source bytes. No approximation. Reuse work/objects and fixed build directories. Inventory first, test changes before implementation, paired current-baseline A/B measurements, one fresh whole-branch review, then main integration, all permanent branches, push and Pages/live proof.

Baseline: 3b5939a9c83d887ccab24ce8309c6b9f62e1cc9f; data fa2de64ac125e768e9ce54137a07591be8d5f506; Node v24.21.0; Windows. All worktrees initially clean at f8895d46; remote main gained attribution change 3b5939a9, reviewed and fast-forwarded main and objects before implementation. D free 11723051008 bytes.

Ruling: Use inline execution; no exploratory implementer agents. executing-plans explicitly requires one fresh whole-branch reviewer after implementation.
Ruling: Preserve ledger and evidence; repository/user preservation instruction overrides skill's automatic workspace deletion.
Ruling: Current baseline replaces historical fixed-SHA P6/P9 benchmarks. Full training/GIS regeneration is not justified by a static audit; preserve pending models and historical geometry.

Task 1: complete — extension audit expanded to 2,276 tracked source/build/template files; 900 first-party, 550 generated/vendor/fixtures, 826 verification. Includes Android/launchers/workflows. All directories included, static review scope explicit. triage.md records subsystem rulings. No claim of exhaustive dynamic profiling.
Task 2: implementation complete — import RED 6 vs 4 bounds calls then GR

[무손실 압축 원문](../../../../archive/blobs/ca6851ec84eedc1dec0e2fc210b55be7fcc2f686e3e7d7ed9cba2435a8b5eb5b.gz)
