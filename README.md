# PandoLab terrain DEM v0.13.0

Immutable public ETOPO 2022 30 arc-second Ice Surface elevation tiles and Natural Earth Cross-blended Hypso tint for the [PandoLab world map](https://github.com/kimjeon-il/world-map).

The latest manifest and tint are under `terrain/v0.13.2/`. They reuse the unchanged LOD 0–5 elevation and hillshade tiles under `terrain/v0.13.0/`. The v0.13.2 tint uses canonical country land masks and nearby valid land colors to prevent white coastal background from washing out small islands. Source hashes, generation statistics and representative island samples are included with the release. This repository contains derived display data only; it does not store the original GeoTIFF or the build dependencies. The generator and verifier live in the application repository at `tools/build-terrain-dem.py` and `tools/verify-terrain-dem.py`.

Sources: [NOAA ETOPO 2022](https://www.ncei.noaa.gov/products/etopo-global-relief-model) and [Natural Earth Cross-blended Hypso](https://www.naturalearthdata.com/downloads/10m-raster-data/10m-cross-blend-hypso/). See the linked providers for source terms and attribution. Published version directories are immutable; corrections require a new version directory and URL.

