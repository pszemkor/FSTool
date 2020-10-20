export class FeatureSelectionParameters {
  algoType: string;
  rf: boolean;
  svm: boolean;
  nn: boolean;
  hpc: boolean;
  target: string;
  csvBase64: string | ArrayBuffer;
}

export const AlgoType = [
  'RF',
  // 'MCFS',
  'Kendall correlation',
  'Spearman\'s correlation',
  'Pearson correlation',
];
