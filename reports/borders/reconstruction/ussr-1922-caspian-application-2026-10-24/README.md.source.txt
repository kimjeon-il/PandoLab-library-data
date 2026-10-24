# 1922-12-30 USSR — provisional full four-founder reconstruction

Current review file: `ussr-four-founders.normalized-provisional.geojson`.
SHA-256: `f9695322104f54439cba67730973578358e0826702eb7376739bc6fc15d33c85`.

This is a local, unsimplified, source-backed review derivative. It is not deployed, not a user-approved final result, and not a claim of surveyed historical precision. The intended later display target is 1:10,000,000 detail; no final matched-scale simplification has yet been accepted.

## Construction and reproducibility
Run `build_ne_context_mask.py`, `assemble_west_land.py`, `assemble_parent_exterior.py`, `assemble_founders.py`, then `node normalize-founders.mjs` from this directory with system Python GIS packages and the existing Pando spherical core. The scripts use preserved masters elsewhere in geometry-v2 and Natural Earth 5.1.1 in the repository. Original source pixels, source rasters, local registration records and rejected/superseded candidates remain preserved.

The parent is assembled from reviewed historical exterior arcs and the modern Natural Earth physical coastline context. It includes the separately retained antimeridian mainland component and a declared island policy. Ukraine and Belarus use their reviewed regional boundaries. The corrected Transcaucasian northern source arc splits that founder from RSFSR. RSFSR is the complementary parent area. Shared arcs are therefore exact rather than independently simplified. App Peipus and regional physical-water conventions are preserved; no new surveyed lake/sea sovereignty line is invented.

## Principal sources and rights records
- Belarus: BSSR CEC 1924 map, explicitly showing the 1920–1924 boundary; Commons public-domain source. Independent Krutalevich 1966 and Gawin 2018 diagrams corroborate the Mozyr neck/lobe, not each bend. https://commons.wikimedia.org/wiki/File:Biełaruś._Беларусь_(1924).jpg
- Ukraine: Ukrainian NKVD January 1922 primary map, Harvard HURI scan. October 1922 governorate mergers were internal, according to the contemporary decree. HURI modern GIS was research comparison only, not traced or incorporated; no public redistribution license is assumed for that GIS. Primary scan reuse terms remain distinct from underlying historical-map age. https://www.gis.huri.harvard.edu/resource/january-1922
- Crimea: Crimean Statistical Office 1922 map, public-domain Commons source, independently supplies Perekop land cut and allocation evidence. https://commons.wikimedia.org/wiki/File:Map_of_Crimea_(1922).jpg
- Estonia: official 1922 county dataset, attribution to Rahvusarhiiv and Maa-ja Ruumiamet (Estonian Land and Spatial Development Board); Tartu treaty map checks land/lake roles. https://geoportaal.maaruum.ee/docs/haldus_asustus/ajaloolised/Maakond_1922.zip
- Latvia: official military Geodesy/Topography Department second-edition 1921 map, 1:800,000, Latvian National Library. Scan reuse terms are not presumed unrestricted merely because the historical original is old. https://dom.lndb.lv/data/obj/1039220.html
- Finland: historical municipality GIS from Ilpo Tammi / Digitized Finnish Dialect Atlas, CC BY 4.0 (Zenodo DOI 10.5281/zenodo.17347221), checked against period atlases. Displaced southeast and Petsamo sectors replaced with primary 1923 atlas / 1921 survey traces. See russia-external/FINLAND-DELIVERY.md and ladoga records.
- Caucasus: 1902 Ivanenkov map, independent 1913 Tiflis province map, and 1926 Bibliographic Institute Leipzig map. Corrected northern political-color trace and 1913 pre-transfer Shatili/Tusheti protrusion replace the quarantined wrong interior-Dagestan trace. See transcaucasia/FROZEN-PROVISIONAL-HANDOFF.json. https://ida.aule.ee/geo/kuban1902.pdf
- Central Asia, western China and Sayan: Stieler/Habenicht 1902–1905 atlas sheets, with period treaty/history continuity checks. Rumsey digital scans carry separate collection/CC BY-NC-SA terms; underlying age does not erase scan-use conditions. See each source directory's records; do not assert the whole composite is unrestricted CC BY-SA. Bregel 2003 is a copyrighted reference-only regional/date check, not traced geometry.
- Eastern Chinese disputed sectors: documented Russian-claim alternatives from detailed CIA boundary diagrams, checked against historical boundary studies. These are provisional 1922 claim-continuity inferences, not evidence of actual occupation or an agreed 1922 river thalweg.
- Physical coastline and modern contextual land: Natural Earth 5.1.1, public domain. Only reconstructed USSR/founders purport to represent 1922; surrounding modern reference features do not.

The old schematic Soviet_Union_1922.svg is retained in v1 but is not the source of this replacement's detailed land frontiers. A blanket new license is not imposed over mixed-source rights. Preserve component attribution and consult source-specific records before redistribution beyond this private review.

## Scope and uncertainty
North Sakhalin is included as Russian juridical territory under Japanese occupation; south Sakhalin and all Kurils are excluded. Franz Josef Land/Victoria are excluded. Wrangel is retained as a disputed Russian claim. Fringe Arctic islands follow the explicitly declared macro NE baseline: individual 1922 title is not independently established for every tiny island. Do not interpret claim geometry as control.

Source-feature registration joins and physical coast attachments are disclosed in the linked reports. Notable inter-map adjustments include Sanchara about 10.21 km, western-China sheet joins up to 13.91 km, and Atrek river-to-ridge tie about 9.11 km. They are source-placement reconciliation, not measured historical error bounds. The independent 1913 Caucasus middle joins use actual overlapping source-line intersections, without a fabricated connecting segment. Unchanged coast attachments remain presentation approximations, including about 9.81 km at Astara and 10.02 km at historical Atrek mouth. The two northern TSFSR coast attachments are only 307 m and 455 m.

Raw OGR geometry: all five valid, six child pair overlaps zero, parent minus child union symmetric-difference area zero. Production core: all five normalized and validator issues empty. Normalization removes raw closure/duplicate-vertex issues; source masters remain unchanged. Independent full QA is recorded separately and must be consulted before calling this reviewed complete.

## Independent full QA, 16:44 UTC
`../../qa-v2/final-region-qa.json` and `../../qa-v2/final-point-topology.json` independently confirm all five production-core validations, zero six-way child overlaps, island inclusion/exclusion masks, full Khorezm/Bukhara exclusion and exact frozen Ukraine/Belarus preservation. Normalized parent-versus-child union has only 1.11e-16 square-degree collinear arithmetic residue at three coast attachment points, not a territorial gap. Shatili and Omalo are inside TSFSR; Makhachkala, Derbent and Vladikavkaz are RSFSR; Kars is outside.

The frozen northern TSFSR file contains an older SECOND_READER_PENDING property. That status is explicitly superseded by `transcaucasia/FROZEN-PROVISIONAL-HANDOFF.json` and the review addendum in `north-1913-middle-assembly-report.json`, not by silently changing the preserved geometry file. Accepted means provisional source-role/topology review, not survey validation.

## Separate display derivative now selected
After matched-projection/extent comparison, conservative joint generalization of dense Ukraine inland and Dniester source arcs was selected. Other already-appropriate arcs and the NE coastline are untouched. `ussr-four-founders.display-10m-provisional.geojson`, SHA `09016e357ef96f2e1d8f6d130ff8ae8ccd8cc9ebb8bca6befced785905d173c2`, is the separate 1:10M-oriented display review derivative. See DISPLAY-REVIEW.md and display-selection.json for visual choice, protections and full independent QA. The unsimplified master remains the source of record; this does not upgrade historical positional accuracy or authorize deployment.

## Final review artifacts
Seven selected-display PNG/SVG views are in `../display-review/`; their manifest records frozen geometry input and rendered output hashes. Independent final handoff is `../../qa-v2/final-artifact-handoff.json`. Antimeridian closure lines are representation seams, not political borders; the renderer suppresses those artificial split-edge strokes without altering geometry or fills. Source and display GeoJSON hashes above remain unchanged.
