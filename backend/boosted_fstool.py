from warnings import filterwarnings

filterwarnings('ignore')
import pandas as pd
import numpy as np
import sys
import matplotlib.pyplot as plt
from sklearn.model_selection import StratifiedKFold
import random
import networkx as nx
from random import sample
from collections import defaultdict
from pandarallel import pandarallel
import csv
import time
from pathlib import Path
import copy

# READ ARGUMENTS
args = sys.argv

N_SPLITS = 5
RANDOM_STATE = 10
ITERATIONS = 50
FEATURES_SUBSET_SIZE = 10
TARGET = 'PATIENT'
CASE = 'case'
CONTROL = 'control'
SUBSET = 0  # in range 0 to N_SPLITS-1
KIND = args[1]
NAME = args[2]


def iind(matrix, alpha=0.5):
    p = alpha
    matrix = matrix[matrix.sum(axis=1) > 0.0]
    s = matrix.values.sum()
    if s == 0:
        raise Exception('Sum of matrix is equal to 0')
    matrix = matrix / s
    m1 = matrix.sum(axis=1)
    m2 = matrix.sum(axis=0)
    outer_p = np.outer(m1, m2)
    factor = 1 / (p - 1)
    s = np.divide(np.power(matrix, p), np.power(outer_p, (p - 1))).sum().sum()
    dividend = np.log(s)
    divisor = (np.log(np.sum(np.power(m2, (2 - p)))))
    return dividend / divisor


def leave_one_out(m_case, m_control, feature_subset, row_num):
    a = m_case.iloc[[row_num], feature_subset]
    b = m_control.iloc[:, feature_subset]
    partial_res = iind(a.append(b, ignore_index=True)) - iind(m_control.iloc[:, feature_subset])
    results = []

    for i, feature_num in enumerate(feature_subset):
        c = feature_subset.copy()
        c.remove(feature_num)
        a1 = m_case.iloc[[row_num], c]
        b1 = m_control.iloc[:, c]
        ind = iind(a1.append(b1, ignore_index=True)) - iind(m_control.iloc[:, c])
        results.append(ind)
    res = np.subtract(np.array([partial_res]), np.array([results]))
    return res[0]


def apply_iind(m_case, m_control, feature_subset, row_num, k):
    try:
        results = leave_one_out(m_case, m_control, feature_subset, row_num)
    except Exception as e:
        results = np.repeat(np.nan, k)

    return np.r_[np.array(feature_subset), results]


def plot_dict(d, labels, title=""):
    vals = []
    for k, v in d.items():
        vals.append((labels[k], v))
    vals = list(sorted(vals, key=lambda x: x[1], reverse=True))
    vals = list(zip(*vals))
    if len(vals) == 0:
        return
    x = list(vals[0])
    y = list(vals[1])

    plt.figure(figsize=(15, 15))
    plt.bar(range(len(y)), y, align='center')
    plt.xticks(range(len(x)), x, rotation=90)
    plt.title(title)
    plt.show()
    return x, y


def get_score(feature_ind_vals, feature_ind_to_name, all_measurements, plot=False):
    feature_median = dict()
    for feature_ind, vals in feature_ind_vals.items():
        median = np.median(vals)
        if feature_ind not in all_measurements:
            all_measurements[feature_ind] = vals
        else:
            all_measurements[feature_ind].extend(vals)
        feature_median[feature_ind] = median

    if plot:
        plot_dict(feature_median, feature_ind_to_name, "patient")
    return feature_median


def apply_iind_wrapper(m, m2, features_count, ind, k):
    feature_subset = sample(range(0, features_count), k)
    return apply_iind(m, m2, feature_subset, ind, k)


def get_features_subset(components, k):
    feature_subset = []
    copied = copy.deepcopy(components)
    random.shuffle(copied)
    shuffled_components = []
    for component in copied:
        random.shuffle(component)
        shuffled_components.append(component)

    N = len(shuffled_components)
    next = [0 for _ in range(N)]
    i = -1
    while len(feature_subset) < k:
        i = (i + 1) % N
        component = shuffled_components[i]
        if next[i] >= len(component):
            continue
        feature_subset.append(component[next[i]])
        next[i] += 1
    return feature_subset


def ensembled_it(m, m2, ind, k, components):
    feature_subset = get_features_subset(components, k)
    return apply_iind(m, m2, feature_subset, ind, k)


def collect_statistics(col, feature_ind_vals, k):
    control_res = col.tolist()
    for row_num, feature_num in enumerate(control_res):
        if row_num == k:
            break
        ind_val = control_res[row_num + k]
        if not np.isnan(ind_val):
            feature_ind_vals[int(feature_num)].append(ind_val)


def save_feats(k, patient_id, feats):
    with open('k{}_patient{}.csv'.format(k, patient_id), 'w') as out:
        csv_out = csv.writer(out)
        csv_out.writerow(['feat', 'score'])
        for row in feats:
            csv_out.writerow(row)


def save_names(feats_to_names):
    with open('feat_to_name.csv', 'w') as f:
        w = csv.DictWriter(f, feats_to_names.keys())
        w.writeheader()
        w.writerow(feats_to_names)


def collect_ind_to_name(m):
    feature_ind_to_name = dict()
    for i, feature_name in enumerate(m.columns):
        feature_ind_to_name[i] = feature_name
    save_names(feature_ind_to_name)
    return feature_ind_to_name


def get_cases_and_controls(X_train, y_train):
    X_train[TARGET] = y_train
    m_cases = X_train[X_train[TARGET] == CASE]
    m_controls = X_train[X_train[TARGET] == CONTROL]
    del m_cases[TARGET]
    del m_controls[TARGET]
    return m_cases, m_controls


def info_based(X_train, y_train, features_subset_size, iters, subset, components=None):
    start = time.time()

    m_cases, m_controls = get_cases_and_controls(X_train, y_train)
    feature_ind_to_name = collect_ind_to_name(m_cases)

    FEATURES_COUNT = m_cases.shape[1]
    print('FEATURES COUNT', FEATURES_COUNT)
    all_measurements = dict()
    for patient_ind, ind_row in enumerate(m_cases.iterrows()):
        print("Starting for k = ", features_subset_size, ", patient = ", ind_row[0], "(i={})...".format(patient_ind))
        d = pd.DataFrame(-1, index=np.arange(2 * features_subset_size), columns=[i + 1 for i in range(iters)])
        d = d.transpose()
        if not components:
            d = d.parallel_apply(
                lambda col: apply_iind_wrapper(m_cases, m_controls, FEATURES_COUNT, patient_ind, features_subset_size),
                axis=1)
        else:
            print('Running boosted it...')
            d = d.parallel_apply(
                lambda col: ensembled_it(m_cases, m_controls, patient_ind, features_subset_size,
                                         components), axis=1)

        path = './{}/{}/{}/{}/{}'.format(NAME, KIND, iters, features_subset_size, subset)
        d_to_write = d.to_frame()
        d_to_write.columns = d_to_write.columns.astype(str)
        # ./(date|name)/(fvl|res)/(iterations)/(features_subset_size)/(subset)/patient_id(absolute in whole dataset).
        # i.e. ./18_10_2020/fvl/200000/15/2/13.parquet
        Path(path).mkdir(parents=True, exist_ok=True)
        d_to_write.to_parquet(path + '/{}.parquet'.format(ind_row[0]))
        print("Result saved for k = ", features_subset_size, ", patient = ", ind_row[0], "...")
        # collect results


class FeatureSelector:
    """Extracts subset of most informative features and provides rank of all features from train samples."""

    def __init__(self, name):
        self.name = name
        self.features = features
        self.features_importances = []

    def get_features_importances(self):
        return self.features_importances

    def get_name(self):
        return self.name

class ITSelector(FeatureSelector):
    def __init__(self, iterations, features_subset_size):
        super().__init__('ITSelector')
        self.iterations = iterations
        self.features_subset_size = features_subset_size

    def fit(self, X_train, y_train, subset_no):
        self.features_importances = info_based(X_train, y_train, self.features_subset_size, self.iterations, subset_no)


class BoostedITSelector(FeatureSelector):
    def __init__(self, iterations, features_subset_size):
        super().__init__('BoostedITSelector')
        self.iterations = iterations
        self.features_subset_size = features_subset_size

    def fit(self, X_train, y_train, subset_no):
        G = nx.Graph()
        cor_matrix = X_train.corr(method='kendall')
        THRESHOLD = 0.7
        for i in range(len(cor_matrix.columns)):
            for j in range(i + 1, len(cor_matrix.columns)):
                if abs(cor_matrix.iloc[i, j]) > THRESHOLD:
                    G.add_edge(i, j)
        # Pandarallel cannot pickle generator
        components = list(map(lambda x: list(x), nx.connected_components(G)))

        self.features_importances = info_based(X_train, y_train, self.features_subset_size, self.iterations, subset_no,
                                               components)


class FeatureSelectorsAggregator:
    """Aggregates partial feature selections obtained from FeatureSelectors."""

    def __init__(self, feature_selectors):
        self.name = 'FeatureSelectorsAggregator'
        self.feature_selectors = feature_selectors

    def get_selectors_names(self):
        return [selector.__class__.__name__ for selector in self.feature_selectors]

    def get_features(self):
        """
        Returned value: 'selectors_features_subset': str -> list[tuples(string, float)]
        Key: selector name
        Values: features sorted by importance (descending)
        """
        selectors_features_subset = {}
        for f_selector in self.feature_selectors:
            selector_name = f_selector.__class__.__name__
            names_importances = list(zip(self.features_names, self.features_importances[selector_name]))
            names_importances = sorted(names_importances, key=lambda x: x[1], reverse=True)
            selectors_features_subset[selector_name] = names_importances

        return selectors_features_subset

    def fit(self, X_train, y_train, subset_no):
        self.X_train = X_train
        self.features_names = list(X_train.columns.values)
        selector_f_importances = {}
        for f_selector in self.feature_selectors:
            f_selector.fit(X_train, y_train, subset_no)
            selector_f_importances[f_selector.__class__.__name__] = f_selector.get_features_importances()

        self.features_importances = selector_f_importances


class CVEvaluator:
    """Evaluate performance of feature selection and classification model with leave-one-out cross validation
        with n subsets (folds) of the whole dataset. For each iteration find the best classificator
        for current train/test split by performing GridSearchCV on the current train data and asses its performance
        on current test set. The results for each split are averaged and are the approximation of the performance
        of the final model.

        If n = 1, the best model is created by selecting features with FeatureSelectorsAggregator
        and performing GridSearchCV on the whole dataset to find the most accurate/sensitive classifier.
        """

    def __init__(self, n_splits, fs_aggregator, labels, data, kind, clfs):
        """
        Init CVEvaluator.

        Args:
            n_splits: Number of subsets.
            fs_aggregator: FeatureSelectorsAggregator for feature selection at each split.
            labels: list of strings representing labels.
            data: Pandas dataframe containing samples in rows with len(features) columns each.
            kind: healthy, fvl, res.
            clfs: classifiers to be used for classification task.
        """
        self.n_splits = n_splits
        self.fs_aggregator = fs_aggregator
        self.labels = labels
        self.data = data
        self.kind = kind
        self.clfs = clfs

    def perform_evaluation(self):
        skf = StratifiedKFold(n_splits=self.n_splits, random_state=RANDOM_STATE, shuffle=True)
        for i, index in enumerate(skf.split(self.data, self.labels)):
            train_index, test_index = index
            X_train, X_test = self.data[self.data.index.isin(train_index)], self.data[self.data.index.isin(test_index)]
            y_train, y_test = [self.labels[i] for i in train_index], [self.labels[i] for i in test_index]

            self.fs_aggregator.fit(X_train, y_train, i)

        return None

pandarallel.initialize(progress_bar=False)

df = pd.read_csv('../data/hcl/{}.csv'.format(KIND), index_col=0)
labels = list(df[TARGET].values)
df = df[df.select_dtypes([np.number]).columns].dropna(axis=1)
# del df[TARGET]
features = list(df.columns)


fs_selectors = [BoostedITSelector(ITERATIONS, FEATURES_SUBSET_SIZE)]
fs_classifiers = []
fs_aggregator = FeatureSelectorsAggregator(fs_selectors)
cv_evaluator = CVEvaluator(N_SPLITS, fs_aggregator, labels, df, KIND, fs_classifiers)
selectors_reports = cv_evaluator.perform_evaluation()
