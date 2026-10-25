# Map analysis d057da5e-a3e5-4f61-82f6-7fafd42e80d9

Source: /workspace/scratch/0740c0ee206a/canada-main.job.json.input/nrcan-canada-public-main.pdf
SHA256: 358cfad7e8329f019c820bc0b9e83b482e721eb09ebf6106d2e1580623f0b1b4
Date: unconfirmed (unverified)
Source evidence: {"id":"nrcan-canada-public-main","url":"https://raw.githubusercontent.com/kimjeon-il/PandoLab-library-data/a5165a0a0c2a9ce921d30d1a536039b63be5d046/reports/map-analysis/corpus/macro-political/sources/nrcan-canada-monochrome.pdf","originalUrl":"https://ftp.maps.canada.ca/pub/nrcan_rncan/Geographical-maps_Carte-geographique/SmallScaleReferenceMaps/english_canada/b&w/Canadab&w.pdf","sourcePage":"https://open.canada.ca/data/en/dataset/e9ffaaa6-c8f0-4c88-be9a-5d019a919ad8","provider":"Natural Resources Canada","title":"Canada monochrome reference map - pinned public preservation copy","format":"pdf","license":"Open Government Licence - Canada; attribution: Natural Resources Canada; Contains information licensed under the Open Government Licence – Canada.","rightsReviewed":true,"selectionReason":"Official nationwide monochrome map; original official server returned HTTP 503; user provided immutable public byte-preserving archive, independently checked against expected bytes and SHA256. No new publication.","expectedBytes":841931,"sha256":"358cfad7e8329f019c820bc0b9e83b482e721eb09ebf6106d2e1580623f0b1b4","maximumBytes":67108864,"bytes":841931,"acquiredAt":"2026-10-25T08:19:12.107432+00:00","annotations":null,"reviewedLabels":false,"trainingReady":false}

Model: 04ee59b043d1fde4a4c407fc079bdb03ba051eceb8adfb4784e7e67c62f7b39c
Model status: pending; output is provisional.
Unobserved classes: coast, hydro, transport, text, frame
Data revision: 127e51c3457df87786ecf3aa5ad98ded690928df
Historical accuracy: unverified. Names, ownership and validity are unspecified.

Checks: shared C++ projection/topology; structured revision signature; selected closed faces only.
Georeference diagnostics: {"crossValidationP95Pixels":null,"folded":false,"imageCoverage":0.19069753181051666,"ok":true,"reason":"insufficient-distributed-controls","recommended":false}

Import features.geojson with Pando’s ordinary GIS import as generic objects; edit, Undo/Redo and save.
Independent model accuracy and historical source accuracy were not established by this export.

## Reviewed scope and unresolved error

Only line:294 was visually compared with the original Alberta–Saskatchewan boundary and selected. All other lines and all faces remain unselected. This is a provisional line fragment, not a nationwide boundary dataset. Georeference review records inspection, not acceptance of accuracy.

The supplied six UV points were applied unchanged. Whitehorse, Winnipeg and Vancouver UVs visibly offset city-symbol centres; no silent point correction was made. Affine fit on this curved nationwide map has substantial remaining distortion. RMS residual: 380794.331 m; maximum: 549988.974 m. No accuracy target passed.

Residuals (metres):
- whitehorse: 418949.815
- yellowknife: 267922.541
- iqaluit: 334223.842
- ottawa: 423738.702
- winnipeg: 170225.042
- vancouver: 549988.974

Registration-only revision used the installed revise command; runtime cache hit; no OCR or boundary-tile inference progress occurred. Segmentation signature and canonical JSON SHA256 of both rawGraph and graph matched before/after.

{
  "before": {
    "segmentationSignature": "55542432879ee0f77a743bb7e4ccf41fe9d8242a02954633087aa2e767223170",
    "rawGraphSha256": "df5f41acc09f398ff6cd7592a8c4fb8f0a8d528a9045e80b81d158ccca235e4f",
    "pixelGraphSha256": "df5f41acc09f398ff6cd7592a8c4fb8f0a8d528a9045e80b81d158ccca235e4f"
  },
  "after": {
    "segmentationSignature": "55542432879ee0f77a743bb7e4ccf41fe9d8242a02954633087aa2e767223170",
    "rawGraphSha256": "df5f41acc09f398ff6cd7592a8c4fb8f0a8d528a9045e80b81d158ccca235e4f",
    "pixelGraphSha256": "df5f41acc09f398ff6cd7592a8c4fb8f0a8d528a9045e80b81d158ccca235e4f"
  },
  "allEqual": true,
  "diagnostics": {
    "hardMaxMeters": 0,
    "hardPointCount": 0,
    "imageCoverage": 0.24136133680821706,
    "maxMeters": 549988.9744908363,
    "residuals": [
      {
        "id": "whitehorse",
        "meters": 418949.81487143674,
        "pinned": false
      },
      {
        "id": "yellowknife",
        "meters": 267922.54087636404,
        "pinned": false
      },
      {
        "id": "iqaluit",
        "meters": 334223.8417326569,
        "pinned": false
      },
      {
        "id": "ottawa",
        "meters": 423738.7015784976,
        "pinned": false
      },
      {
        "id": "winnipeg",
        "meters": 170225.04223484427,
        "pinned": false
      },
      {
        "id": "vancouver",
        "meters": 549988.9744908363,
        "pinned": false
      }
    ],
    "rmsMeters": 380794.3311801795,
    "softPointCount": 6,
    "warnings": [
      "high-residual"
    ]
  },
  "quality": {
    "crossValidationP95Pixels": null,
    "folded": false,
    "imageCoverage": 0.19069753181051666,
    "ok": true,
    "reason": "insufficient-distributed-controls",
    "recommended": false
  },
  "revisionCommand": "control-points only; CLI emitted runtime/revise result, no OCR/boundaries progress",
  "selected": "line:294; Alberta-Saskatchewan boundary segment; no faces"
}

Runtime: Map Toolkit 0.4.1; Node 24.22.1; code ec658aa7132c0f57e5beddf6f5f83c8b3ae99db7. English analysis elapsed 21.799 s, actual 12-tile model inference. Prior automatic Cyrillic analysis 47.221 s retained. Registration/review/export CLI outputs retained in session tool records; their individual elapsed times were not separately instrumented.

Original PDF: one page; copyright 2024; PDF creation 2024-02-28; depicted date unconfirmed. Official NRCan source acquisition failed HTTP503; initial archive revision HTTP404; corrected pinned archive bytes and SHA256 verified. Model remains pending/trainingOnly/releaseApproved=false.

This report adds audit findings after engine export; complete.json was regenerated for the final delivered bytes; the original engine completion manifest is preserved separately.
