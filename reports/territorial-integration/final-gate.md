# Territorial entity integration gate

> 압축 열람본: 아래는 도입부와 항목 목록의 발췌이며 전체 결론을 대신하지 않습니다.

The accompanying generated JSON/Markdown inventories every recognized production
country collection, unit collection and country override access, including local
destructuring, returned/getter aliases and mutations of shared elements.
Each entry names its exact file/function/line, read or write route, canonical owner
and reason. No entire application module is exempted.
- Rendering, spatial-index preparation and Worker inputs read explicit snapshots.
  They do not publish document mutations.
- Serializer, decoder and import preparation build detached DTOs before validated
  Store publication. The GeoPackage worker deletes countriesData only from its
  freshly spread settings copy.
- Existing project migrations are called by current validation and implement the
  documented minimum schema-3 to current schema-6 contract. They mutate cloned
  input, not live storage. Removing this active format support would change the
  requested preserved input contract, so it is not treated as a temporary Store
  compatibility adapter. No migration, alias or compatibility wrapper was added.
- The Repository's explicit read-provider constructor is an active pure projection

## Ownership and call-path findings
## Retained, active boundaries
## Gate and analysis limits
## Place browser evidence and limitation
## Final cleanup

---
[작성 당시 원문(무손실 압축)](../../archive/blobs/3530b6156015e63eb66f9a4c23090a164aef7ecceac6fd92728818a9e29f33b7.gz) · 원본 SHA-256 `3530b6156015e63eb66f9a4c23090a164aef7ecceac6fd92728818a9e29f33b7`.
