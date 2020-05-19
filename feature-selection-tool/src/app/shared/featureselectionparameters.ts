export class FeatureSelectionParameters {
  algoType: string;
  rf: boolean;
  svm: boolean;
  nn: boolean;
  csv: string;
}

export const AlgoType = [
  'RF',
  // 'MCFS',
  'Kendall correlation',
  'Spearman\'s correlation',
  'Pearson correlation',
];
