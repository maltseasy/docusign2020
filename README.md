# Acorn Qualification App

[Docusign 2020](https://docusign2020.devpost.com/) Virtual Audit Qualification App Submission

[Submission Link](https://devpost.com/software/acorn-qualification-app)

[Colab Submission Link](https://devpost.com/software/collaboration-bonus-super-app?ref_content=user-portfolio&ref_feature=in_progress)

## Live App Demo

[Link](http://54.162.48.160/)

## Video Demo

[Link](https://www.youtube.com/watch?v=iS5WwBtIYYU)

## Collaboration Partners

- [Pre-Assessment-App (App 1)](https://devpost.com/software/pre-assessment-app)
- [Greenblocks (App 3)](https://devpost.com/software/greenblocks-bwse37)

## Running the repo

### Downloading the source code

#### Clone the repository:

```
git clone https://github.com/aryanmisra/docusign2020
cd docusign2020
```

#### To run Acorn locally:

```
npm install
cd client
npm install
cd ../
npm run dev
```

## Instructions - Step-by-step Walkthrough:

#### Company Application List (Landing Page)

![Landing page](https://github.com/aryanmisra/docusign2020/blob/master/pics/1.png)

- Company information is pulled from our Dynamics 365 Database, following the standard FSC Schema


#### Company Requirement Details + Notes/Flagging

![Requirements](https://github.com/aryanmisra/docusign2020/blob/master/pics/2.png)

- Notes can be added to each company requirement
- Flags can be used to mark individual company requirements


#### Esri Map Overlay

![Map Overlay](https://github.com/aryanmisra/docusign2020/blob/master/pics/3.png)

- Four map layers provide the auditor with a wide array of relevant geospatial information
- View Deforestation Clusters, Corruption Perception Index (CPI), COVID-19 Case, and Travel Advisory data around the company locations to understand risks
- Choose from over 10 Basemap layers to understand the geographic area surrounding the company's locations


#### Review and Sign

![Review + Sign](https://github.com/aryanmisra/docusign2020/blob/master/pics/4.png)

- A company will be automatically flagged if the company it is based in has a low Corruption Perception Index or is near major deforestation regions
- View flagged notes
- Once you're ready to sign, use the Docusign eSignature API integrated within our webapp to sign the documents online


## Contributors to Acorn Qualification

- [Alex Yu](https://github.com/uyxela)
- [Aryan Misra](https://github.com/aryanmisra/)

