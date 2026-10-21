# Editable library editor and native code review

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

> Report ID: `UI-LIBRARY-REVIEW-20261021` · Status: `reviewed-important-findings-resolved / native-workflow-unverified` · Geometry application: `not-applicable` · Indexed: 2026-10-21  
> Source revision: Web/App `4f35c345e0707c44e383cca027e119207f93259c` plus uncommitted implementation in permanent `work/ui`  
> Scope: accepted [implementation plan](https://github.com/kimjeon-il/Pando/blob/836cc4e570446ac3e3c8bc3034aa788886145221/docs/superpowers/plans/2026-10-21-editable-library.md), root editor/adapter/UI, isolated geometry startup/storage, native repository/working drafts/GitHub sync. Separate publication implementation excluded.
Changes requested for three Important findings; no Critical finding identified. The implementation follows the planned ownership split: committed library service, isolated unsaved source editor, native revision store, and separate geometry document. Exact dates remain source fields, normal project imports copy geometry, native GitHub operations keep authentication outside JavaScript, and publishing has an explicit command. Nevertheless, external geometry/date edits cannot currently pass the native acceptance contract; remote source validation can occur after activation; and the metadata form silently drops existing precision values. These prevent full specification compliance.

## Verdict and method
## Important findings
### R1. External source correction cannot pass raw-draft equality after canonical normalization
### R2. Remote synchronization advances the active head before full source/index validation
### R3. Saving an unrelated metadata edit erases current date-precision values
## Minor observations
## Verification boundaries
## Revision
## Bounded post-fix review, 2026-10-21
### R4. Known-committed warning is lost before the UI can present it

---
[작성 당시 원문(무손실 압축)](../../../archive/blobs/8a443ce9da9c812d47911ca525f234e523db935d4c5c18d9aea7a59cce895946.gz) · 원본 SHA-256 `8a443ce9da9c812d47911ca525f234e523db935d4c5c18d9aea7a59cce895946`.
