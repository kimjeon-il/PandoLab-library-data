The **Semantic Segmentation Map Dataset (Semap)** contains 1,439 manually annotated map samples. Specifically, the dataset includes 356 image patches from the Historical City Maps Semantic Segmentation Dataset (HCMSSD, [1]), 78 samples extracted from 19th-century European cadastres [2–4], three from Paris city atlases [5], and 1,002 newly annotated samples, drawn from the Aggregated Dataset on the History of Cartography (ADHOC Images, [6]).

Additionally, it comprises 12,122 synthetically generated image samples and corresponding labels.

Both datasets are part of R. Petitpierre's PhD thesis [7] and related paper [8]. Extensive details on annotation and synthetic generation procedures are provided in that work.

## Organization of the data
The data is organized as shown below. The file structure differentiates real annotated images from synthetic data.

```
project_root/
├── images/ 
│   ├── real/ 
│   │   ├── berkeleylib_000004-0_2662_1421.jpg 
│   │   └── bnf_006136-1_1060_1608.jpg 
│   └── synthetic/
│       ├── 2_output_1.jpg 
│       └── 6_output_3.jpg 
├── labels/ 
│   ├── real/ 
│   │   ├── berkeleylib_000004-0_2662_1421.png 
│   │   └── bnf_006136-1_1060_1608.png 
│   └── synthetic/ 
│       ├── 2_output_1.png 
│       └── 6_output_3.png 
├── partitions/ 
│   ├── train.txt 
│   ├── val.txt
│   └── test.txt
└── model/ 
    ├── best_mIoU_iter_138828.pth 
    ├── mask2former_swin-l-in22k-384x384-pre_8xb2-160k_ade20k-640x640.py 
    └── training.log 
```

### Label syntax

The labels are stored as single-channel PNG images. The pixel values indicate the semantic class:

```
0  background
1  contours
2  built
3  non-built
4  water
5  road network
```

### Partitions

The data is divided into training, validation, and test sets. Each partition file lists the raw file names of the corresponding images and labels, one per line. Example:

```
davidrumsey_030108-0_6817_567  
bnf_001250-7_6345_1736         
...                            
14_output_214                  
12_output_591   
```

Synthetic samples are listed at the end of each file to facilitate their exclusion when finetuning on real data.

### Model weights

A Mask2Former model with a Swin-L backbone, trained as described in [7,8], is provided for convenience and reproducibility. The implementation used is distributed by OpenMMLab [9]. The repository includes:

- `best_mIoU_iter_138828.pth` — model weights (Pytorch format)
- `mask2former_swin-l-in22k-384x384-pre_8xb2-160k_ade20k-640x640.py` — exact training configuration
- `training.log` — training log

## Descriptive statistics

- Number of semantic classes: 5 + background
- Number of manually annotated image samples: 1,439
- Number of synthetically-generated samples: 
- Image sample size:
	- min: 768 × 768 pixels
	- max: 1000 × 1000 pixels

## Use and Citation

For any mention of this dataset, please cite :

```
@misc{semap_petitpierre_2025,
  author = {Petitpierre, R{\'{e}}mi and Gomez Donoso, Damien and Kriesel, Ben},
  title = {{Semantic Segmentation Map Dataset (Semap)}},
  year = {2025},
  publisher = {EPFL},
  doi = {10.5281/zenodo.16164781}}
```

```
@misc{generalizable_segmentation_petitpierre_2026,
  author = {Petitpierre, R{\'{e}}mi},
  title = {{Generalizable Multiscale Segmentation of Heterogeneous Map Collections}},
  year = {2026},
  publisher = {arXiv},
  doi = {10.48550/arXiv.2603.05037}}
```

```
@phdthesis{studying_maps_petitpierre_2025,
  author = {Petitpierre, R{\'{e}}mi},
  title = {{Studying Maps at Scale: A Digital Investigation of Cartography and the Evolution of Figuration}},
  year = {2025},
  school = {EPFL},
  doi={10.5075/epfl-thesis-11559}}
```

## Corresponding author

Rémi PETITPIERRE - [remi.petitpierre@epfl.ch](mailto:remi.petitpierre@epfl.ch) - [ORCID](https://orcid.org/0000-0001-9138-6727) - [Github](https://github.com/RPetitpierre/) -  [Scholar](https://scholar.google.com/citations?user=4aMZmocAAAAJ&hl=en) - [ResearchGate](https://www.researchgate.net/profile/Remi-Petitpierre)

## Work ethics

80% of the data were annotated by RP. The remainder were annotated by DGD and BK, two master's students from EPFL, Switzerland. The students were paid for their work using public funding, and were offered the possibility to be associated with the publication of the data.

## License

This project is licensed under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en) License. See the `license_images` file for details about the respective reuse policy of digitized map images.

## Liability

We do not assume any liability for the use of this dataset.

## Version notes

- 1.0.0 – Stable release
- 1.0.1 – Minor correction to filename consistency
- 1.0.2 – Added separate README file for ease of download

## References
1. Petitpierre, R. (2021). Historical City Maps Semantic Segmentation Dataset. V1.0. [https://doi.org/10.5281/zenodo.5513639](url)
1. di Lenardo I, Barman R, Pardini F, et al. (2021) Une approche computationnelle du cadastre napoléonien de Venise. Humanités numériques 3. [https://doi.org/10.4000/revuehn.1786](url)
1. Petitpierre R, Rappo L and di Lenardo I (2023) Recartographier l’espace napoléonien. In: Humanistica 2023, Genève, Switzerland, June 2023. Géographie. Association francophone des humanités numériques. Available at: [https://hal.science/hal-04109214](url)
1. Li S, Cerioni A, Herny C, et al. (2024) Vectorization of historical cadastral plans from the 1850s in the Canton of Geneva. Geneva, Switzerland: Swiss Territorial Data Lab. Available at: [https://tech.stdl.ch/PROJ-CADMAP/](url)
1. Chazalon J, Carlinet E, Chen Y, et al. (2021) ICDAR 2021 Competition on Historical Map Segmentation. [https://doi.org/10.48550/arXiv.2105.13265](url)
1. Petitpierre, R. (2025). Aggregated Database on the History of Cartography (ADHOC). V1.0.0. [https://doi.org/10.5281/zenodo.16277852](url)
1. Petitpierre R (2025) Studying Maps at Scale: A Digital Investigation of Cartography and the Evolution of Figuration. PhD thesis. École Polytechnique Fédérale de Lausanne. [https://doi.org/10.5075/epfl-thesis-11559](url)
1. Petitpierre R (2026) Generalizable Multiscale Segmentation of Heterogeneous Map Collections. https://doi.org/10.48550/arXiv.2603.05037
1. OpenMMLab (2025) MMSegmentation. v1.2.2. [https://github.com/open-mmlab/mmsegmentation](url)
