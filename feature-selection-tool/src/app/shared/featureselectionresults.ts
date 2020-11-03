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

export class FeatureImportance {
  name: string;
  importance: number;
}

export class ClassificationMetrics {
  kind: string;
  f1_score: number;
  precision: number;
  recall: number;
  support: number;
}

export class ClassifierReport {
 classifier_name: string;
 class_metrics: Map<string, ClassificationMetrics>;
 accuracy: number;
 macro_avg: ClassificationMetrics;
 weighted_avg: ClassificationMetrics;
}

export class FoldReport {
  features_importances: FeatureImportance[];
  reports: any;
  classifier_reports: ClassifierReport[];
}

export class FeatureSelectionReport {
  fold_reports: FoldReport[];
  selected_features: FeatureImportance[];
}

export class FeatureSelectionResults {
  algoName: string;
  resultImgs: ResultImg[];
  report: FeatureSelectionReport;
  // featuresRank: SelectedFeature[];
  // classificationResults: ClassificationResult[];
}

export class JobResult {
  selectorsResults: FeatureSelectionResults[];
}
