# %%

from warnings import filterwarnings

filterwarnings('ignore')
import pickle
import pandas as pd
import numpy as np
import base64
import json
import os
from typing import List, Tuple
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

    def __init__(self, n_splits, fs_aggregator, labels, data, kind, clfs, config):
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
        self.config: Configuration = config

    def perform_evaluation(self):
        skf = StratifiedKFold(n_splits=self.n_splits, random_state=RANDOM_STATE, shuffle=True)
        selector_reports = {name: SelectorReport(name) for name in self.fs_aggregator.get_selectors_names()}

        features_rank_per_fold = defaultdict(list)
        for i, index in enumerate(skf.split(self.data, self.labels)):
            train_index, test_index = index
            X_train, X_test = self.data[self.data.index.isin(train_index)], self.data[self.data.index.isin(test_index)]
            y_train, y_test = [self.labels[i] for i in train_index], [self.labels[i] for i in test_index]

            self.fs_aggregator.fit(X_train, y_train, i)
            selector_features = self.fs_aggregator.get_features()
            for selector_name, selected_features in selector_features.items():
                fold_report, features_rank = self.get_fold_report(X_train, X_test, y_train, y_test, selected_features)
                selector_reports[selector_name].add_fold_report(fold_report)
                features_rank_per_fold[selector_name].append(features_rank)

        for selector_name, selector_ranks in features_rank_per_fold.items():
            max_rank = {}
            for fold_rank in selector_ranks:
                # computing the sum of metric_vals for every feature
                for f_name, rank_val in fold_rank.items():
                    max_rank[f_name] = max_rank.get(f_name, 0) + rank_val

            final_features_rank = sorted(list(max_rank.items()), key=lambda item: item[1], reverse=True)
            selector_reports[selector_name].set_selected_features(final_features_rank[:self.config.k])
        return selector_reports

    def get_fold_report(self, X_train, X_test, y_train, y_test, selected_features):
        fold_report = FoldReport(selected_features[:self.config.k])
        features_name = [name for name, i in selected_features]
        X_train, X_test = X_train[features_name], X_test[features_name]
        metric_vals = []
        for clf in self.clfs:
            clf.fit(X_train, y_train)
            y_predicted = clf.predict(X_test)
            report = classification_report(y_test, y_predicted, output_dict=True)
            fold_report.add_classification_report(str(clf).upper(), report)
            metric_val = report['weighted avg'][self.config.metric]
            metric_vals.append(metric_val)
        avg_metric = sum(metric_vals) / len(metric_vals)
        N = len(selected_features)
        features_rank = {}
        for rank, (name, importance) in enumerate(selected_features):
            rank_val = avg_metric * (N - rank + 1)
            features_rank[name] = rank_val

        return fold_report, features_rank


class SelectorReport:
    def __init__(self, selector_name):
        """
        'weighted_importance_per_fold' := metric_val * (N - rank + 1)
        'metric_val' is an average value of computed metrics by selected classifiers in a given fold

        selector_name: name of the selector used to perform feature selection
        fold_reports: List[FoldReport] - is a list of reports created for every fold
        selected_features: List[(str, float)] - list of pairs: feature name, sum of weighted_importance_per_fold
        """
        self.selector_name: str = selector_name
        self.fold_reports: List[FoldReport] = []
        self.selected_features: List[Tuple[str, float]] = []

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
        self.features_importances: List[str, float] = features_importances
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
        self.metric = conf_dict['metric']


def write_pickles(selector_path: str, selector_name: str, df: pd.DataFrame, features: list, labels: list,
                  classifiers: list):
    for cls in classifiers:
        cls.fit(df[features], labels)
        pickle.dump(cls,
                    open(os.path.join(selector_path, "{}-{}.p".format(selector_name, cls.__class__.__name__)), "wb"))


def write_graphs(selector_path: str, report: SelectorReport):
    # write fold-specific information
    for i, fold_report in enumerate(report.fold_reports):
        lists = [list(t) for t in zip(*fold_report.features_importances)]
        x = lists[0]
        y = lists[1]
        x_pos = [i for i, _ in enumerate(x)]
        plt.barh(x_pos, y, color='green')
        plt.ylabel("Feature")
        plt.xlabel("Importance")
        plt.title("Features selected features in the fold: " + str(i))
        plt.yticks(x_pos, x)
        plt.savefig(os.path.join(selector_path, 'fold_{}.png'.format(i)))


pandarallel.initialize(progress_bar=False)
# READ ARGUMENTS
# args = sys.argv
# scratch_path = args[1]
# job_id = args[2]
# config_path = args[3]
scratch_path = '/Users/przemyslawjablecki/FeatureSelection'
job_id = '123'
config_path = '/Users/przemyslawjablecki/FeatureSelection/config.json'
config = Configuration(config_path)

results_path = os.path.join(scratch_path, job_id)
os.mkdir(results_path)

target = config.target
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
             'rmcfs': MCFSSelector()}

fs_selectors = [selectors[alg] for alg in config.algorithms]
fs_aggregator = FeatureSelectorsAggregator(fs_selectors)
cv_evaluator = CVEvaluator(N_SPLITS, fs_aggregator, labels, df, KIND, [KNeighborsClassifier(n_neighbors=3)], config)
selectors_reports = cv_evaluator.perform_evaluation()
classifiers = [KNeighborsClassifier(n_neighbors=3)]

for selector in fs_selectors:
    selector_name = selector.__class__.__name__
    report: SelectorReport = selectors_reports[selector_name]
    features = list(map(lambda item: item[0], report.selected_features))
    selector_path = os.path.join(results_path, selector_name)
    os.mkdir(selector_path)

    write_graphs(selector_path, report)
    write_pickles(selector_path, selector_name, df, features, labels, classifiers)

# import requests
#
# results_path = 'https://data.plgrid.pl/download/prometheus/net/scratch/people/plgprzjab/RandomForestSelector-KNeighborsClassifier.p'
# header_with_proxy = {
#     "PROXY": 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUR5VENDQXJHZ0F3SUJBZ0lFRXF1bUFUQU5CZ2txaGtpRzl3MEJBUXNGQURCNE1Rc3dDUVlEVlFRR0V3SlEKVERFUU1BNEdBMVVFQ2hNSFVFd3RSM0pwWkRFVE1CRUdBMVVFQ2hNS1ZYcDVkR3R2ZDI1cGF6RVFNQTRHQTFVRQpDaE1IVUV3dFIzSnBaREVjTUJvR0ExVUVBeE1UVUhKNlpXMTVjMnhoZHlCS1lXSnNaV05yYVRFU01CQUdBMVVFCkF4TUpjR3huY0hKNmFtRmlNQjRYRFRJd01UQXlOekUxTURVME5Gb1hEVEl3TVRBek1ERTFNVEEwTkZvd2dZd3gKQ3pBSkJnTlZCQVlUQWxCTU1SQXdEZ1lEVlFRS0V3ZFFUQzFIY21sa01STXdFUVlEVlFRS0V3cFZlbmwwYTI5MwpibWxyTVJBd0RnWURWUVFLRXdkUVRDMUhjbWxrTVJ3d0dnWURWUVFERXhOUWNucGxiWGx6YkdGM0lFcGhZbXhsClkydHBNUkl3RUFZRFZRUURFd2x3Ykdkd2NucHFZV0l4RWpBUUJnTlZCQU1UQ1RNeE16SXpPVEEwTVRDQ0FTSXcKRFFZSktvWklodmNOQVFFQkJRQURnZ0VQQURDQ0FRb0NnZ0VCQUx6SXIrRVdNRXJ3c3FIa1FPcFlabWxZejFKMAo4cndKbU9yUW9BbjZMMjc0azBFSytiVHVRVjRBSHBlQW9VbVNUNzEzMyt2ai9YbG9EM25DOEpuZTcxQ0JpSUc2CjBobFZmeFpQZXdyZGVjRVM1TVFuOHRXR2FKOHB6UnNBWHZyOXV1OStHQVBjOUx3SlVPWXBwdjVsNlhaZVdFL08KN2lrZHJ4VDM5ZG9kUE1BWFE1dUJ3L0FNMTc3N2ptMDg0ZWQxMU5ad2JqUHNpck1LSUhsYjdRRDhtUkpVUHpGbgpNNXZXRUg5RUxsaXpuWVdTRmNMeGNRWVBOUVI1em9MaEd4Y2UzZk1OM0JNYnUvbUl0aitSOUNQWjhPUFpqYmt6ClhjUDg0YlRkN2grNWw2N29kQzN6ajBiMEhqb2xHNjBCZnI2TjFVb0NETmYzRkllVWFsVis0VWZXSzAwQ0F3RUEKQWFOR01FUXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUhBd0l3RGdZRFZSMFBBUUgvQkFRREFnU3dNQjBHQ0NzRwpBUVVGQndFT0FRSC9CQTR3RERBS0JnZ3JCZ0VGQlFjVkFUQU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUF3RlpXCnNDaTFQdWJQMWVuZ21ybjRHQ0VBOFBidHY3UXJ3SVl4ZjdiU1hZcFRITnJkY01ubFEyeEpWdmVISExnL3ltVGUKQnh6K1hyQUpNMjNWSVplQ3FPNDRLVHd4VmpjeENTMzVqWFRFRHkvbjBCRm9QaXlYN0dRb0R4V283VXhkc25GZQp0SXFzeXhxWWc4TkRrMkd6UkNZTHh6WEdtaEpxQjVGbmhpWFhsUk1XQ1JMZEgrVzZ1NFVsS0U1Z3BIbFcwWUNGClZUQUxTcXF3Uzkrdm5YeVVTZXZidEIvYVMrMzcwRG9jcmFCa3RpWC9ScnBTMEFkY1daVUFJR053TlZZckZzTEQKRTZ5TEx0TEFLeWo2VW12b3lmWm02QkNIUk1lZitOZ2ptWWpsYlZkckplOFRsUkdmVHhBb0tib2EwUVkyWHloUQpEWFd5OWlpb2kxY0F5V2ZBOVE9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCi0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLQpNSUlFdmdJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLZ3dnZ1NrQWdFQUFvSUJBUUM4eUsvaEZqQks4TEtoCjVFRHFXR1pwV005U2RQSzhDWmpxMEtBSitpOXUrSk5CQ3ZtMDdrRmVBQjZYZ0tGSmtrKzlkOS9yNC8xNWFBOTUKd3ZDWjN1OVFnWWlCdXRJWlZYOFdUM3NLM1huQkV1VEVKL0xWaG1pZktjMGJBRjc2L2JydmZoZ0QzUFM4Q1ZEbQpLYWIrWmVsMlhsaFB6dTRwSGE4VTkvWGFIVHpBRjBPYmdjUHdETmUrKzQ1dFBPSG5kZFRXY0c0ejdJcXpDaUI1ClcrMEEvSmtTVkQ4eFp6T2IxaEIvUkM1WXM1MkZraFhDOFhFR0R6VUVlYzZDNFJzWEh0M3pEZHdURzd2NWlMWS8Ka2ZRajJmRGoyWTI1TTEzRC9PRzAzZTRmdVpldTZIUXQ4NDlHOUI0NkpSdXRBWDYramRWS0Fnelg5eFNIbEdwVgpmdUZIMWl0TkFnTUJBQUVDZ2dFQVZleXVDSy8xdVJaRzUrS2hIVWl4REQvczFTWC9tVkJ3OW1lUWdCb01YdURxCi9RN0d5dkFxZG1OdGlSMTF5NnU1ZVk1SEwvR3NYQWJlREZpSzlDNEJGTTV3V0VPMC91em9GRHFHMFZJdTZZNzAKNnNjWUF0SFRhcVkzQVpRd3B1SzNvK3ZyZUU2b1liR0h6Y3FsaEdMVVdSamw3eVZMUnhHSXIrMlFTLzlFdUZUVwpNdEJHQWZ3RzkxdDQxZVVSbmpkUW5CSURWU3AwTGN3d2NJZFhBMGRHc1FtNWMwbTB1N3lnbXNTUy9scUJvYW1KCmFaUjF5Zk91NTBKNE1tR2ZydUZUSUxpVlB3TjI1Z0xBQjFZQlYyQ2JSbDd0MHRvWndKMjZlc1Iwbzc5T25xUjEKa3ZIOC9LSzY4SGcvZ0s4MXZLT0NGaC9tWVBZanVEMVk1YzNVVU1IaERRS0JnUURodzdFdUxMNkdiaVRwSzUxcQpBLysvV0x6R0FSWmI2N3llMUs5clhTOHlEUzBMcjdFWFlKd2FRdy9TcEh3cU1YM2lCS1FrSzZGZHNaR1VHTmkrCkRadFQyR2szSFgrZ0NjaUx0bEoxb2s4alptbWtaalo4RXY4RGtHanVRcXI2MjVnZEZhRjN6b083M3ZSNDVPZlIKaEdDTkVxaHNnT2RxYzhQbjNiTk8rSlBYTXdLQmdRRFdFUjk5NUxtVVBLUUNNdkNEdzQvRnFnaElmTjUyTGtMSQovNTh6QXpWeUFMSUQwdGFLM0lKMEJaZ1lPT3R3Q0FucFR2bGMxSEYwbWtxR2YwUkdqQjVVTXRTVnlobXJFVGRECkFOMytkSjRtYTJNTnRNcTBYdlZZUVVrT0NpWVFreUJoZDZ4YUVEb2w1SHk4SkkwQVdRQ1NKOHlYQVBmWjhpbTAKTE5CODllUHpmd0tCZ1FEY3J1dTlGU1BRU0U1d1ZwL3pCNkd4SzA2cnhsaFMxaVowbzdZdG50TUplL095WHJVZgpBdUxVa1FVZ2hJU1N3Zm9wT3h3djl5NHZaZW5GK0Z1MXU1cy81R1ZFNk9MZVQzSG5qL3NlM2QrNTNOd2JSWWF3CjFlak5WUllkQUxJZHNSWUtLQ0REK2V5dmNvdEt1WWNaT09zZ08wTERmV1c0bXh5K3crb0lvZGZ5SFFLQmdGU3QKU1V1L1lqbGxFMnRiUXhDY0Z3OFZoMWxGSzZxTCtoY1FKcVZESzYwQTRXbnB5THY5SmcxRytUYjdyUVlQNS92RwpKWlcyNDNwQVhpSjl6VUFxeFFTQlp0NHBwNldubGJpSGEwandVRzdhSThDVU4ycko5VHNIK0NINW1iME10YzVZClRIRUQ0anlDK1dSakFQT1dRVWVQUHJxc3cxNFBFTGdZMGcvY0pHTjVBb0dCQU1JNm9MVUMzdE5aQkhNUUVSRUUKOFZiZjVWY3BGbGNiV2hlZXBZcFoyT1E3eVlHcXBBR2dSaWhQZ3d4Z1ZYdWZmTmJNT1Y3MmxYcEQwTU9KUXYycgpqY2FhNG5KZmp3azUzUkN3TGFNbUp5dGlMZlAvZVNlaEJnaFNUK1FmbThtb3hlTm1VRHBIVTNLWFNRRHFFRmM4CkFkcks4aU94bE1IL1N1MTBteVVwVk0rMwotLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tCi0tLS0tQkVHSU4gQ0VSVElGSUNBVEUtLS0tLQpNSUlFK1RDQ0F1R2dBd0lCQWdJSU1ESkNpUURMejFnd0RRWUpLb1pJaHZjTkFRRUxCUUF3TXpFTE1Ba0dBMVVFCkJoTUNVRXd4RURBT0JnTlZCQW9UQjFCTUxVZHlhV1F4RWpBUUJnTlZCQU1UQ1ZOcGJYQnNaU0JEUVRBZUZ3MHkKTURBME1EWXhOekl5TXpKYUZ3MHlNVEEwTURZeE56SXlNekphTUhneEN6QUpCZ05WQkFZVEFsQk1NUkF3RGdZRApWUVFLRXdkUVRDMUhjbWxrTVJNd0VRWURWUVFLRXdwVmVubDBhMjkzYm1sck1SQXdEZ1lEVlFRS0V3ZFFUQzFICmNtbGtNUnd3R2dZRFZRUURFeE5RY25wbGJYbHpiR0YzSUVwaFlteGxZMnRwTVJJd0VBWURWUVFERXdsd2JHZHcKY25wcVlXSXdnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFESXVNRzZOeU5LamhRNAppbllTN1RjQzlrYjQvWW5mYWpqRUR0WHExUDhOVE0vd1JGTG9CYUc5Ukp6TUJqelplMWFiR1FsK01tdFNpS2pWCkRHck51eEJkRHVDMlFSNHZ5K3htbVFHODJuSjZzMkhjVGlsUWVLeHQzaDhlL3ZNUjN1eWxkWEVXTzJ5YStRU2sKQ2g2d2k5QlJRd0lmSkNiRDNwNnp5SmNrVGZhbUNjQXpKZHdCODhjYzQ0M0pocmMvaDRYWHArU0JYTmdKbFc5MApPdUF0ZHdYejZiMGNhRHJCZDBXMkhYMUdCRitLdlV4UzE0anVCVkRIcW9QSHg1TXFDQVhteHR0T2FpN3lCbjZrCktQMXFOL09BVlZ4WHlDWncxYkJWZDRLQUcreG9OMEZwSndKVXNESHpGU21qU2c1c1pyenBTUEVFWkRTK05WYzkKdGVlcGJKbUxBZ01CQUFHamdjc3dnY2d3SFFZRFZSME9CQllFRkdxK0YwSGgxVFczWjBQMUZ6OFRUcXFPUHJ1cApNQXdHQTFVZEV3RUIvd1FDTUFBd0dnWURWUjBnQkJNd0VUQVBCZzByQmdFRUFZS1dMUUVCQVFFQ01EY0dBMVVkCkh3UXdNQzR3TEtBcW9DaUdKbWgwZEhBNkx5OXdiR2R5YVdRdGMyTmhMbmRqYzNNdWQzSnZZeTV3YkM5amNtd3UKWkdWeU1COEdBMVVkSXdRWU1CYUFGS2tUVVZsclJFdC9uS0gzT2N6WUFmeFVWVUF0TUJNR0ExVWRKUVFNTUFvRwpDQ3NHQVFVRkJ3TUNNQTRHQTFVZER3RUIvd1FFQXdJRXNEQU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FnRUFJeTZyClZUUDMzaGN0ZWpyYmJNcllWUGwzZElTVnlsczd2cEJpZkNlZEJwNDNkazRkbEtqS0lIWGkrQXpLMGVObUFybEUKQkdWNGNoQTVVbnJyL08wM3UwcXJWVVJTYlB5RmhLT2xWVDZ2RUdiNStYQ1VuL01YYktHaVFQYnNTWWdSaCtPRApWWG51aldCb3BINWhEN3lJNHI4b1hEVmtNS21MTGVvTzdUdE9ORE5JZENBczArdGtBV0JHT294K0RlVFhDd1NuCnBUWWFHaVBjbWRCalMzcEVIbUtsWUw3bkhPOXpMK2lkcmFZdUg5cWJJUkthWFZqS3BvcnhwRXZybndURUppTXcKWlV1VVdEK3B6TTR3NldmdDZ1TUo0UzAxd3A5aW9yRnJtSDUzQ2lLb1ZsSTFiSU9uR0NUY2JDZ3Q3MlBZQ2xlbwp2SkM4bGduZ3gxTHFVM1F2VXQrdExjWVoydDZWaTZzY1hOeTU5eHZJTWxDQitBSitHMmJ6bWJad1JTKzdiYVNhCjdncWFSemVWOFJkSkptWVNIVERxc0IrSUJUYlM0N3lKSWc1YkoxZWpFZ1RVS3BVOHowTE1sdTVKMUNqYkUya1gKODVyVmVHWmlLSzc0NkF5MDJXSjBoY0Qvc2dGcGdBb1h4MzE0MUxxTGpkcXpyZG9CZWZvczExZUJwc3VRMlAzQQpWMDYzVGJ6QllPcU9ydEdCYkk0TUJCOEIzak1lRzB1aE53R3pkZlR6ZTFIUGlzMkcxK0tiUWxRYjVwREE0ME90CmxPNzdZS0dLVkZHRlRHSVdZd2dDWk8rZW91WThUbzZ6bUJoTXZGbmVHV1Ywdis4RFlON3Avb3JhUG0ySEU0eW8KTGNTUTI3bTJkbjVqYzRyU1lpdDNSZzR1MVpidWJ0L2c5Qm9IRE5BPQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=='}
# file = requests.get(results_path, headers=header_with_proxy)
# from io import BytesIO
# from django.db import models
# import ast
# # b = models.BinaryField()
# c = pickle.loads(file.content)
# print(c.__class__.__name__)
