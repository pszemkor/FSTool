# FSTool
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

A tool for comparison and integration of feature selection algorithms for modeling of response to targeted therapy for patients with hairy cell leukemia.
### Table of Contents  
- [Project description](#desc)  
- [Technological stack](#techstack)
- [Setup](#setup)  
  * [Deployment](#deploy)
  * [Settings](#settings)
- [Presentation of functionalities](#overview)
  * [Algorithms selection](#algo)
  * [Hyperparameters selection](#hyper)
  * [Jobs overview](#jobs)
  * [Ranking of selected features](#rank)
  * [Results overview](#results)
  * [HPC settings](#hpc)
- [Acknowledgements](#ack)
- [Contributors](#contributors)
- [Supervisors](#supervisors)

## Problem description <a name="desc"></a>
The goal of this project was to conduct research on feature selection algorithms, as well as to build a convenient tool for their comparison and integration.

The tool will be used for scientific applications, such as modelling response to the targeted therapy for patients with hairy cell leukemia.

The outcome of the project is a dockerized web application that allows users to schedule feature selection and classification computations on HPC clusters in PLGrid infrastructure.

## Technological stack <a name="techstack"></a>
* Python scientific libraries: <a href="https://pandas.pydata.org/">pandas</a>, <a href="https://numpy.org/">NumPy</a>, <a href="https://scikit-learn.org/">scikit-learn</a>, <a href="https://seaborn.pydata.org/">seaborn</a>, <a href="https://github.com/nalepae/pandarallel">pandarallel</a>, <a href="https://matplotlib.org/">matplotlib</a>
* Django
* SQLite
* Angular
* Docker
* Jupyter Notebook

## Setup <a name="setup"></a>
In this chapter the process of the setup is presented. 

### Deployment <a name="deploy"></a>
In order to deploy the application, docker-compose is required. Once this requirement is satisfied all you need to do is moving to the main directory of the project and run the following command:
```
docker-compose up --build
```

### Settings <a name="settings"></a>
Before start working with this project you have to apply for the affiliation and the grant on https://portal.plgrid.pl/. 
Having completed the previous you have to generate base64 proxy token. 
1. You have to access the HPC cluster via ssh.
2. Generate x.509 certificate:
```
grid-proxy-init
```
3. Prepare the token:
```
cat \tmp\[x509_certificate_name] | base64 | tr -d "\n"
```
4. Go to the "HPC Settings" tab
5. Paste the token and fill the form
6. Hit "Update settings"

## Presentation of functionalities <a name="overview"></a>
#### Algorithms selection <a name="algo"></a>
<img width="637" alt="algorithms_selection" src="https://user-images.githubusercontent.com/37248877/101282533-146aba80-37d6-11eb-9c5b-fb2984c54036.png">

#### Hyperparameters selection <a name="hyper"></a>
<img width="1304" alt="algo_settings (1)" src="https://user-images.githubusercontent.com/37248877/101282575-4845e000-37d6-11eb-9161-fda2df7ef364.png">

#### Jobs overview <a name="jobs"></a>
<img width="1306" alt="jobs" src="https://user-images.githubusercontent.com/37248877/101282543-1fbde600-37d6-11eb-99d1-4c7878a6d6aa.png">

#### Ranking of selected features <a name="rank"></a>
<img width="1429" alt="ranking" src="https://user-images.githubusercontent.com/37248877/101282545-2187a980-37d6-11eb-92ec-fdf86c8d25bc.png">

#### Results overview <a name="results"></a>
<img width="1429" alt="algo_selection" src="https://user-images.githubusercontent.com/37248877/101282549-277d8a80-37d6-11eb-9b0c-130ea52f5e93.png">

#### HPC Settings <a name="hpc"></a>
<img width="1304" alt="hpc_settings" src="https://user-images.githubusercontent.com/37248877/101282594-5bf14680-37d6-11eb-8f4f-a70017e84939.png">

## Acknowledgements <a name="ack"></a>
This research was supported in part by PLGrid Infrastructure.


## Contributors <a name="contributors"></a>
* <a href="https://github.com/pszemkor">Przemysław Jabłecki</a>
* <a href="https://github.com/filipsl"> Filip Ślazyk</a>

## Supervisors <a name="supervisors"></a>
* Michał Seweryn, PhD  (author of the information theoretical approach algorithm)
* Maciej Malawski, PhD
