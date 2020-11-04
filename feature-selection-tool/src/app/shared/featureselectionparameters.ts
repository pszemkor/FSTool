export class FeatureSelectionParameters {
  algorithms: string[];
  classifiers: string[];
  hpc: boolean;
  target: string;
  k: number;
  metric: string;
  csvBase64: string | ArrayBuffer;
}
