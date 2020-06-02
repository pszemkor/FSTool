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