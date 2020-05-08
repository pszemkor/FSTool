export class ClassificationResult {
  clfName: string;
  accuracy: number;
  f1: number;
  recall: number;
}

export class SelectedFeature {
  index: number;
  name: string;
  score: number;
}

export class ResultImg {
  name: string;
  image: string;
}

export class FeatureSelectionResults {
  algoName: string;
  resultImgs: ResultImg[];
  featuresRank: SelectedFeature[];
  classificationResults: ClassificationResult[];
}


export const TEST_RESULT: FeatureSelectionResults = {
  algoName: 'Random Forest',
  resultImgs: [{
    name: 'Some image',
    image: '/assets/img/classifiers.png'
  }],
  featuresRank: [
    {
      index: 1,
      name: 'Feat1',
      score: 0.343,
    },
    {
      index: 2,
      name: 'Feat2',
      score: 0.243,
    },
    {
      index: 3,
      name: 'Feat3',
      score: 0.143,
    },
  ],
  classificationResults: [
    {
      clfName: 'SVM',
      accuracy: 88.12,
      f1: 98.0,
      recall: 78.0,
    },
    {
      clfName: 'Neural Network',
      accuracy: 87.12,
      f1: 100.0,
      recall: 56.0,
    },
  ]
};
