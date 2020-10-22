# %%

from warnings import filterwarnings

filterwarnings('ignore')

import pandas as pd
import numpy as np
import base64
import json
import os
import sys
import matplotlib.pyplot as plt
from io import StringIO
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import classification_report
from sklearn.linear_model import LassoCV, ElasticNetCV
from sklearn.feature_selection import SelectKBest, chi2

from rpy2.robjects import r, pandas2ri
import rpy2.robjects as ro
from rpy2.robjects.conversion import localconverter

from random import sample
from collections import defaultdict
from pandarallel import pandarallel
import csv
import time
from pathlib import Path

# %% md

## Data preparation

# %%

# MAKE FVL and RES datasets
for kind in ['fvl', 'res']:
    target = 'PATIENT'
    cases = pd.read_csv('../data/hcl/{}_cases.csv'.format(kind), index_col=0)
    cases[target] = 'case'
    controls = pd.read_csv("../data/hcl/{}_controls.csv".format(kind), index_col=0)
    controls[target] = 'control'

    df = pd.concat([cases, controls], ignore_index=True, sort=False)
    labels = list(df[target].values)

    # remove ABS from dataset
    cols = [c for c in df.columns if c.lower()[:3] != 'abs']
    df = df[cols]

    df = df[df.select_dtypes([np.number]).columns].dropna(axis='columns')
    non_na_features = list(df)

    df = df[non_na_features]
    df[target] = labels
    df.to_csv('../data/hcl/{}.csv'.format(kind))


# %% md

## Info based

# %%

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


# %%

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


# %%

def apply_iind(m_case, m_control, features_num, row_num, k):
    feature_subset = sample(range(0, features_num), k)
    try:
        results = leave_one_out(m_case, m_control, feature_subset, row_num)
    except Exception as e:
        results = np.repeat(np.nan, k)

    return np.r_[np.array(feature_subset), results]


# %%

def plot_dict(d, labels, title=""):
    vals = []
    for k, v in d.items():
        vals.append((labels[k], v))
    vals = list(sorted(vals, key=lambda x: x[1], reverse=True))
    vals = list(zip(*vals))
    if len(vals) == 0:
        print("vals = '[]'")
        return
    x = list(vals[0])
    y = list(vals[1])

    plt.figure(figsize=(15, 15))
    plt.bar(range(len(y)), y, align='center')
    plt.xticks(range(len(x)), x, rotation=90)
    plt.title(title)
    plt.show()
    return x, y


# %%

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

    #     imp_list = list(map(lambda x: x[0], sorted(feature_median.items(), key=lambda x: x[1], reverse=True)))

    return feature_median


# %%

def func_(col, m, m2, features_count, i, k):
    return apply_iind(m, m2, features_count, i, k)


def collect_statistics(col, feature_ind_vals, k):
    control_res = col.tolist()
    for row_num, feature_num in enumerate(control_res):
        if row_num == k:
            break
        ind_val = control_res[row_num + k]
        if not np.isnan(ind_val):
            feature_ind_vals[int(feature_num)].append(ind_val)


# %%

pandarallel.initialize(progress_bar=False)


# %%

def save_feats(k, patient_id, feats):
    with open('k{}_patient{}.csv'.format(k, patient_ind), 'w') as out:
        csv_out = csv.writer(out)
        csv_out.writerow(['feat', 'score'])
        for row in feats:
            csv_out.writerow(row)


def save_names(feats_to_names):
    with open('feat_to_name.csv', 'w') as f:
        w = csv.DictWriter(f, feats_to_names.keys())
        w.writeheader()
        w.writerow(feats_to_names)


# %%

def collect_ind_to_name(m):
    feature_ind_to_name = dict()
    for i, feature_name in enumerate(m.columns):
        feature_ind_to_name[i] = feature_name
    save_names(feature_ind_to_name)
    #     print(feature_ind_to_name)
    return feature_ind_to_name


# %%


# %%

def info_based(X_train, y_train, features_subset_size, iters, subset, save, read):
    X_train[TARGET] = y_train
    m_cases = X_train[X_train[TARGET] == CASE]
    m_controls = X_train[X_train[TARGET] == CONTROL]
    del m_cases[TARGET]
    del m_controls[TARGET]

    start = time.time()
    feature_ind_to_name = collect_ind_to_name(m_cases)
    FEATURES_COUNT = m_cases.shape[1]
    print('FEATURES COUNT', FEATURES_COUNT)

    all_measurements = dict()
    importance_per_patient = dict()
    for patient_ind, ind_row in enumerate(m_cases.iterrows()):
        # Perform FS algorithm
        print("Starting for k = ", features_subset_size, ", patient = ", ind_row[0], "(i={})...".format(patient_ind))

        if not read:
            d = pd.DataFrame(-1, index=np.arange(2 * features_subset_size), columns=[i + 1 for i in range(iters)])
            d = d.transpose()
            d = d.parallel_apply(
                lambda col: func_(col, m_cases, m_controls, FEATURES_COUNT, patient_ind, features_subset_size), axis=1)

        path = './{}/{}/{}/{}/{}'.format(DATE, KIND, iters, features_subset_size, subset)
        if save:
            d_to_write = d.to_frame()
            d_to_write.columns = d_to_write.columns.astype(str)
            # ./date/(fvl|res)/(iterations)/(features_subset_size)/(subset)/patient_id(absolute in whole dataset).
            # i.e. ./18_10_2020/fvl/200000/15/2/13.parquet
            Path(path).mkdir(parents=True, exist_ok=True)
            d_to_write.to_parquet(path + '/{}.parquet'.format(ind_row[0]))
            print("Result saved for k = ", features_subset_size, ", patient = ", ind_row[0], "...")
        if read:
            d = pd.read_parquet(path + '/{}.parquet'.format(ind_row[0])).iloc[:, 0]

        # collect results
        feature_ind_vals = defaultdict(list)
        d.apply(lambda row: collect_statistics(row, feature_ind_vals, features_subset_size))
        get_score(feature_ind_vals, feature_ind_to_name, all_measurements)

    all_measurements_medians = dict()
    for feature_ind, vals in all_measurements.items():
        all_measurements_medians[feature_ind] = median = np.median(vals)
    end = time.time()
    print('Elapsed: ', end - start)

    return [all_measurements_medians[i] for i in range(0, FEATURES_COUNT)]


#     selected_fs, iind_val = plot_dict(all_measurements_medians, feature_ind_to_name, "median of all measurements; features_subset_size = " + str(features_subset_size))
#     iind_median = np.median(iind_val)
#     selected_fs_reduced = list(map(lambda x: x[0],filter(lambda x: x[1] >= iind_median, zip(selected_fs, iind_val))))

#     if selected_fs_reduced:
#         print("Selected features count: ", len(selected_fs_reduced))
#         print(selected_fs_reduced)
#     else:
#         print("selected_fs_reduced was empty for k = ", features_subset_size)


# %% md

# Feature selection and classification benchmark

# %%

N_SPLITS = 5
RANDOM_STATE = 10
ITERATIONS = 50000
FEATURES_SUBSET_SIZE = 10
TARGET = 'PATIENT'
CASE = 'case'
CONTROL = 'control'
DATE = '18_10_2020'

# CHANGE FOR EACH NOTEBOOK
SUBSET = 0  # in range 0 to N_SPLITS-1
KIND = 'fvl'


# %%

class FeatureSelector:
    """Extracts subset of most informative features and provides rank of all features from train samples."""

    def __init__(self, name):
        self.name = name
        self.features = features

    def get_features_importances(self):
        return self.features_importances

    def get_name(self):
        return self.name


# %%

class RandomForestSelector(FeatureSelector):
    def __init__(self, n_estimators=500):
        super().__init__('RandomForestSelector')
        self.forest = RandomForestClassifier(n_estimators=n_estimators, random_state=RANDOM_STATE)

    def fit(self, X_train, y_train, subset_no):
        self.forest.fit(X_train, y_train)
        self.features_importances = self.forest.feature_importances_


# %%

class LassoSelector(FeatureSelector):
    def __init__(self):
        pass

    def fit(self, X_train, y_train, subset_no):
        lasso = LassoCV(random_state=RANDOM_STATE).fit(X_train, [1 if p == 'case' else 0 for p in y_train])
        self.features_importances = np.abs(lasso.coef_)


# %%

class ElasticNetSelector(FeatureSelector):
    def __init__(self):
        pass

    def fit(self, X_train, y_train, subset_no):
        elastic = ElasticNetCV(random_state=RANDOM_STATE).fit(X_train, [1 if p == 'case' else 0 for p in y_train])
        self.features_importances = np.abs(elastic.coef_)


# %%

class MCFSSelector(FeatureSelector):
    def __init__(self):
        pass

    def fit(self, X_train, y_train, subset_no):
        r.library("rmcfs")
        r.library("dplyr")

        original_features = X_train.columns.values
        X_train.columns = ['f' + str(i + 1) for i, _ in enumerate(X_train.columns.values)]
        X_train[TARGET] = y_train

        with localconverter(ro.default_converter + pandas2ri.converter):
            r_from_pd_df = ro.conversion.py2rpy(X_train)

        r.assign('df1', r_from_pd_df)
        r('result <- mcfs(PATIENT ~ ., df1, cutoffPermutations = 30, seed = 2, threadsNumber = 16)')
        r('RI <- result$RI')
        result = r['result']
        ri = r['RI']

        with localconverter(ro.default_converter + pandas2ri.converter):
            pd_from_r_df = ro.conversion.rpy2py(ri)

        features_to_ri = dict()

        for _, row in pd_from_r_df.iterrows():
            features_to_ri[row['attribute']] = row['RI']

        del X_train[TARGET]
        X_train.columns = original_features
        self.features_importances = [features_to_ri['f' + str(i + 1)] for i in range(0, len(original_features))]


# %%

class ITSelector(FeatureSelector):
    def __init__(self, iterations, features_subset_size):
        super().__init__('ITSelector')
        self.iterations = iterations
        self.features_subset_size = features_subset_size

    def fit(self, X_train, y_train, subset_no):
        self.features_importances = info_based(X_train, y_train, self.features_subset_size, self.iterations, subset_no,
                                               False, True)


# %%

class SelectKBestSelector(FeatureSelector):
    def __init__(self):
        pass

    def fit(self, X_train, y_train, subset_no):
        model = SelectKBest(chi2, k='all').fit(X_train, y_train)
        self.features_importances = model.scores_


class FeatureSelectorsAggregator:
    """Aggregates partial feature selections obtained from FeatureSelectors."""

    def __init__(self, feature_selectors):
        self.name = 'FeatureSelectorsAggregator'
        self.feature_selectors = feature_selectors

    def set_k(self, k):
        self.k = k

    def get_selectors_names(self):
        return [selector.get_name() for selector in self.feature_selectors]

    def get_features_importances(self):
        return self.features_importances

    def get_features_subset(self):
        """
        Returned value: 'selectors_features_subset': str -> list[tuples(string, float)]
        Key: selector name
        Values: features sorted by importance (descending)
        """
        selectors_features_subset = {}
        for f_selector in self.feature_selectors:
            selector_name = f_selector.get_name()
            names_importances = list(zip(self.features_names, self.features_importances[selector_name]))
            names_importances = sorted(names_importances, key=lambda x: x[1], reverse=True)[:self.k]
            selectors_features_subset[selector_name] = names_importances

        return selectors_features_subset

    def fit(self, X_train, y_train, subset_no):
        self.X_train = X_train
        self.features_names = list(X_train.columns.values)
        seletector_f_importances = {}
        for f_selector in self.feature_selectors:
            f_selector.fit(X_train, y_train, subset_no)
            seletector_f_importances[f_selector.get_name()] = f_selector.get_features_importances()

        self.features_importances = seletector_f_importances

    # def plot_importances(self):
    #     if TARGET in self.X_train:
    #         del self.X_train[TARGET]
    #     feature_importance = pd.Series(index=self.X_train.columns, data=self.features_importances).dropna()
    #     feature_importance.sort_values().tail(90).plot(kind='bar', figsize=(18, 6))
    #     plt.show()


# %%

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
            clf: classifier to be used for classification task.
        """
        self.n_splits = n_splits
        self.fs_aggregator = fs_aggregator
        self.labels = labels
        self.data = data
        self.kind = kind
        self.clfs = clfs

    def perform_evaluation(self):
        skf = StratifiedKFold(n_splits=self.n_splits, random_state=RANDOM_STATE, shuffle=True)
        selector_reports = {name: SelectorReport(name) for name in self.fs_aggregator.get_selectors_names()}

        for i, index in enumerate(skf.split(self.data, self.labels)):
            train_index, test_index = index
            X_train, X_test = self.data[self.data.index.isin(train_index)], self.data[self.data.index.isin(test_index)]
            y_train, y_test = [self.labels[i] for i in train_index], [self.labels[i] for i in test_index]

            self.fs_aggregator.fit(X_train, y_train, i)
            f_subset = self.fs_aggregator.get_features_subset()
            for selector_name, selected_features in f_subset.items():
                fold_report = self.get_fold_report(X_test, X_train, selected_features, selector_name, y_test, y_train)
                selector_reports[selector_name].add_fold_report(fold_report)

        for name, selector_report in selector_reports.items():
            for fold_report in selector_report.fold_reports:
                features_importances = fold_report.features_importances
                N = len(features_importances)



    def get_fold_report(self, X_test, X_train, selected_features, selector_name, y_test, y_train):
        fold_report = FoldReport(selected_features)
        features_name = [name for name, i in selected_features]
        X_train, X_test = X_train[features_name], X_test[features_name]
        for clf in self.clfs:
            clf.fit(X_train, y_train)
            y_predicted = clf.predict(X_test)
            report = classification_report(y_test, y_predicted, output_dict=True)
            fold_report.add_classification_report(str(clf).upper(), report)
        return fold_report



class SelectorReport:
    def __init__(self, selector_name):
        """
        'weighted_importance_per_fold' := metric_val * (N - rank + 1)
        'metric_val' is an average value of computed metrics by selected classifiers in a given fold

        selector_name: name of the selector used to perform feature selection
        fold_reports: List[FoldReport] - is a list of reports created for every fold
        selected_features: List[(str, float)] - list of pairs: feature name, sum of weighted_importance_per_fold
        """
        self.selector_name = selector_name
        self.fold_reports = []
        self.selected_features = []

    def add_fold_report(self, fold_report):
        self.fold_reports.append(fold_report)

    def set_selected_features(self, selected_features):
        self.selected_features = selected_features


class FoldReport:
    def __init__(self, features_importances):
        """
        features_importances: List(str, float) - list of features and its importances within a fold
        reports: dict: str -> classification_report
        """
        self.features_importances = features_importances
        self.reports = {}

    def add_classification_report(self, clf_name, clf_report):
        self.reports[clf_name] = clf_report


class DataReader:
    def read_data(self, base64_data: str, target):
        df = self.__extract_dataframe(base64_data)
        labels = df[target].values
        del df[target]
        df = df[df.select_dtypes([np.number]).columns].dropna(axis=1)
        return df, labels

    def __extract_dataframe(self, base64_data):
        i = base64_data.find(",")
        data_str = base64.b64decode(base64_data[i + 1:]).decode('utf-8')
        return pd.read_csv(StringIO(data_str))

    def read(sekf, filename):
        with open(os.path.join(os.getcwd(), filename)) as data:
            base64_csv = data.read()
        return base64_csv


class Configuration:
    def __init__(self, path):
        with open(path, 'r') as conf:
            read = conf.read()
            print(read)
            conf_dict = json.loads(read)
        self.k = conf_dict['k']
        self.classifiers = conf_dict['classifiers']
        self.algorithms = conf_dict['algorithms']
        self.target = conf_dict['target']
        self.data_path = conf_dict['data_path']
        self.case = conf_dict['case']


pandarallel.initialize(progress_bar=False)
# READ ARGUMENTS
args = sys.argv
scratch_path = args[1]
job_id = args[2]
config_path = args[3]
scratch_path = '/Users/przemyslawjablecki/FeatureSelection'
job_id = '123'
config_path = '/Users/przemyslawjablecki/FeatureSelection/config.json'
config = Configuration(config_path)

results_path = os.path.join(scratch_path, job_id)
os.mkdir(results_path)
target = config.target
algorithm_name = config.algorithms[0]
input_data_filename = config.data_path
data = DataReader().read(input_data_filename)
df, labels = DataReader().read_data(data, target)
features = list(df.columns)
k = int(config.k)

selectors = {'rf': RandomForestSelector(),
             'it': ITSelector(ITERATIONS, FEATURES_SUBSET_SIZE),
             'skbest': SelectKBestSelector(),
             'lasso': LassoSelector(),
             'elastic': ElasticNetSelector(),
             'pearson': RandomCorrelatedRemovalSelector(),
             'rmcfs': MCFSSelector(),
             'kendall': RandomCorrelatedRemovalSelector()}

fs_selectors = [selectors[alg] for alg in config.algorithms]
fs_aggregator = FeatureSelectorsAggregator(fs_selectors)
fs_aggregator.set_k(k)
neigh = KNeighborsClassifier(n_neighbors=3)
cv_evaluator = CVEvaluator(N_SPLITS, fs_aggregator, labels, df, KIND, neigh)
cv_evaluator.perform_evaluation()
