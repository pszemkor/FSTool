export class SelectorSettings{
  rf_n_estimators: number;
  it_iterations: number;
  it_case: string;
  it_control: string;
  it_subset_size: number;
  it_alpha: number;
  rmcfs_cutoff_permutations: number;
  correlation_threshold: number;
}

export class ClassifierSettings{
  rf_n_estimators: number;
  knn_neighbours: number;
  svm_c: number;
  mlp_nodes: number;
}
