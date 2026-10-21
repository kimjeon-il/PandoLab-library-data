# Independent library publication code review

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> Report ID: `UI-LIBRARY-PUBLISH-REVIEW-20261021` · Status: `changes-requested` · Geometry application: `not-applicable` · Indexed: 2026-10-21  
> Source revision: `4f35c345e0707c44e383cca027e119207f93259c` plus uncommitted publication implementation in permanent `work/ui`  
> Scope: `.superpowers/sdd/2026-10-21-editable-library/review-publication.patch`, implementation ledger, current publication code and direct consumers. Editor/native findings are in the separate editor/native review.
Changes requested: four Important findings, no Critical finding. Reviewed pinned private checkout/raw content hashes, generators, release assembly, both Actions workflows, public channel/cache handling, immutable Worker asset generation, and dynamic world-count checks. The existing nine publication test files (20 passing tests) and output checks were not rerun. The declared local results remain implementation evidence, not live GitHub or native WebView proof.
The implementation correctly pins the private Git commit and exact manifest bytes, hashes source objects, stages only public generated data, disables persisted credentials on the private checkout, keeps executable asset revisions separate, and rejects reachable invalid channel metadata rather than silently selecting an older cached release. Publication requires an explicit dispatch. Dynamic count checks generally continue to tie derived counts to the selected source and retain hash, binary-header, unique-ID, and geometry checks.

## Verdict and evidence
## Important findings
### P1. Real current-world snapshot identity cannot be materialized
### P2. A second data publication removes prior immutable releases from deployed Pages
### P3. Shared Worker publication lookup breaks the small-project native shell
### P4. Name and flag edits of current countries do not reach the generated public project
## Ruled out and other boundaries
## Revision

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/3e970e0a241c21384597acfe4c18e279fe3a1f3755d3ac0e07c190e32c191d66.gz) · 원본 SHA-256 `3e970e0a241c21384597acfe4c18e279fe3a1f3755d3ac0e07c190e32c191d66`.
