from warnings import filterwarnings

filterwarnings('ignore')

import pickle
import pandas as pd
import numpy as np
import base64
import json
import os
import sys
import copy
import seaborn as sns
from typing import List, Dict
import matplotlib.pyplot as plt
from io import StringIO
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import classification_report
from sklearn.linear_model import LassoCV, ElasticNetCV
from sklearn.feature_selection import SelectKBest, chi2
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier
from rpy2.robjects import r, pandas2ri
import rpy2.robjects as ro
from rpy2.robjects.conversion import localconverter
import networkx as nx
from random import sample
from collections import defaultdict
from pandarallel import pandarallel
import csv
import time

N_SPLITS = 5
RANDOM_STATE = 10
ITERATIONS = 50000
FEATURES_SUBSET_SIZE = 10
TARGET = ''
CONTROL = 'M'
CASE = 'F'
DATE = '18_10_2020'
THRESHOLD = 0.7
KIND = 'fvl'
SUBSET = 0  # in range 0 to N_SPLITS-1


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


def info_based(X_train, y_train, features_subset_size, iters, components=None):
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
            d = d.parallel_apply(
                lambda col: ensembled_it(m_cases, m_controls, patient_ind, features_subset_size,
                                         components), axis=1)
        # collect results
        feature_ind_vals = defaultdict(list)
        d.apply(lambda row: collect_statistics(row, feature_ind_vals, features_subset_size))
        get_score(feature_ind_vals, feature_ind_to_name, all_measurements)

    all_measurements_medians = dict()
    for feature_ind, vals in all_measurements.items():
        median = np.median(vals)
        all_measurements_medians[feature_ind] = median
    end = time.time()

    print('Elapsed: ', end - start)
    return [all_measurements_medians[i] for i in range(0, FEATURES_COUNT)]


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


class RandomForestSelector(FeatureSelector):
    def __init__(self, n_estimators=500):
        super().__init__('RandomForestSelector')
        self.forest = RandomForestClassifier(n_estimators=n_estimators, random_state=RANDOM_STATE)

    def fit(self, X_train, y_train, subset_no):
        self.forest.fit(X_train, y_train)
        self.features_importances = self.forest.feature_importances_


class LassoSelector(FeatureSelector):
    def __init__(self):
        pass

    def fit(self, X_train, y_train, subset_no):
        lasso = LassoCV(random_state=RANDOM_STATE).fit(X_train, [1 if p == 'case' else 0 for p in y_train])
        self.features_importances = np.abs(lasso.coef_)


class ElasticNetSelector(FeatureSelector):
    def __init__(self):
        pass

    def fit(self, X_train, y_train, subset_no):
        elastic = ElasticNetCV(random_state=RANDOM_STATE).fit(X_train, [1 if p == 'case' else 0 for p in y_train])
        self.features_importances = np.abs(elastic.coef_)


class MCFSSelector(FeatureSelector):
    def __init__(self):
        pass

    def fit(self, X_train, y_train, subset_no):
        print('.libPaths( c( "{}" , .libPaths() ) )'.format(scratch_path))
        r('.libPaths( c( "{}" , .libPaths() ) )'.format(scratch_path))
        # r('options(install.packages.compile.from.source = "always")')
        r('install.packages("rmcfs", repos="https://cloud.r-project.org/")')
        r.library("rmcfs")
        r.library("dplyr")

        original_features = X_train.columns.values
        X_train.columns = ['f' + str(i + 1) for i, _ in enumerate(X_train.columns.values)]
        X_train[TARGET] = y_train

        with localconverter(ro.default_converter + pandas2ri.converter):
            r_from_pd_df = ro.conversion.py2rpy(X_train)

        r.assign('df1', r_from_pd_df)
        r('result <- mcfs({} ~ ., df1, cutoffPermutations = 30, seed = 2, threadsNumber = 16)'.format(TARGET))
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
        print("RMCFS:FEATURE:IMPORTANCES", self.features_importances)


class ITSelector(FeatureSelector):
    def __init__(self, iterations, features_subset_size):
        super().__init__('ITSelector')
        self.iterations = iterations
        self.features_subset_size = features_subset_size

    def fit(self, X_train, y_train, subset_no):
        self.features_importances = info_based(X_train, y_train, self.features_subset_size, self.iterations)


class BoostedITSelector(FeatureSelector):
    def __init__(self, iterations, features_subset_size):
        super().__init__('BoostedITSelector')
        self.iterations = iterations
        self.features_subset_size = features_subset_size

    def fit(self, X_train, y_train, subset_no):
        G = nx.Graph()
        cor_matrix = X_train.corr(method='kendall')
        G.add_nodes_from([i for i in range(len(cor_matrix.columns))])
        for i in range(len(cor_matrix.columns)):
            for j in range(i + 1, len(cor_matrix.columns)):
                if abs(cor_matrix.iloc[i, j]) > THRESHOLD:
                    G.add_edge(i, j)
        components = nx.connected_components(G)
        all_components = list()
        for c in components:
            all_components.append(list(c))

        self.features_importances = info_based(X_train, y_train, self.features_subset_size, self.iterations,
                                               all_components)


class SelectKBestSelector(FeatureSelector):
    def __init__(self):
        pass

    def fit(self, X_train, y_train, subset_no):
        model = SelectKBest(chi2, k='all').fit(X_train, y_train)
        self.features_importances = model.scores_


class CorrelationSelector(FeatureSelector):
    def __init__(self, method_name):
        self.method_name = method_name

    def fit(self, X_train, y_train, subset_no):
        df = X_train.copy()
        classes = list(set(y_train))
        mapping = {class_name: number for number, class_name in enumerate(classes)}
        mapped_classes = [mapping[c] for c in y_train]
        df[TARGET] = mapped_classes
        correlation = df.corr(method=self.method_name)
        cor_target = abs(correlation[TARGET])
        self.features_importances = list(
            sorted([float('-inf') if np.isnan(val) else abs(val) for val, name in zip(cor_target, df.columns)],
                   reverse=True))


class KendallSelector(CorrelationSelector):
    def __init__(self):
        super().__init__('kendall')


class PearsonSelector(CorrelationSelector):
    def __init__(self):
        super().__init__('pearson')


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

    def __init__(self, n_splits, fs_aggregator, labels, data, clfs, config):
        """
        Init CVEvaluator.

        Args:
            n_splits: Number of subsets.
            fs_aggregator: FeatureSelectorsAggregator for feature selection at each split.
            labels: list of strings representing labels.
            data: Pandas dataframe containing samples in rows with len(features) columns each.
            clfs: classifiers to be used for classification task.
        """
        self.n_splits = n_splits
        self.fs_aggregator = fs_aggregator
        self.labels = labels
        self.data = data
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

            final_features_rank = sorted(list(max_rank.items()), key=lambda item: item[1], reverse=True)[:self.config.k]
            k_selected_features = [FeatureStats(name, importance) for name, importance in final_features_rank]
            selector_reports[selector_name].set_selected_features(k_selected_features)
        return selector_reports

    def get_fold_report(self, X_train, X_test, y_train, y_test, selected_features):
        fold_report = FoldReport(
            [FeatureStats(name, importance) for name, importance in selected_features[:self.config.k]])
        features_name = [name for name, i in selected_features]
        X_train, X_test = X_train[features_name], X_test[features_name]
        metric_vals = []
        print('classifiers:', self.clfs)
        for clf in self.clfs:
            clf.fit(X_train, y_train)
            y_predicted = clf.predict(X_test)
            report = classification_report(y_test, y_predicted, output_dict=True)
            fold_report.add_classification_report(str(clf).upper(), report)
            metric_val = report['weighted avg'][self.config.metric]
            metric_vals.append(metric_val)
        print('metric_vals', metric_vals)
        avg_metric = sum(metric_vals) / len(metric_vals)
        N = len(selected_features)
        features_rank = {}
        for rank, (name, importance) in enumerate(selected_features):
            rank_val = avg_metric * (N - rank + 1)
            features_rank[name] = rank_val

        return fold_report, features_rank


class FeatureStats:
    def __init__(self, name, importance):
        self.name = name
        self.importance = importance


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
        self.selected_features: List[Dict[str, float]] = []

    def add_fold_report(self, fold_report):
        self.fold_reports.append(fold_report)

    def set_selected_features(self, selected_features):
        self.selected_features = selected_features

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


class FoldReport:
    def __init__(self, features_importances):
        """
        features_importances: List(str, float) - list of features and its importances within a fold
        reports: dict: str -> classification_report
        """
        self.features_importances: List[FeatureStats] = features_importances
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
            conf_dict = json.loads(read)
        self.k = conf_dict['k']
        self.classifiers = conf_dict['classifiers']
        self.algorithms = conf_dict['algorithms']
        self.target = conf_dict['target']
        self.data_path = conf_dict['data_path']
        self.case = conf_dict['case']
        self.control = conf_dict['control']
        self.metric = conf_dict['metric']


def write_correlation_heatmap(selector_path, features, df):
    cor = df[features].corr()
    sns.set(font_scale=4)
    plt.subplots(figsize=(50, 50))
    sns.heatmap(cor, vmax=1.0, center=0, square=True, linewidths=.5, cbar_kws={"shrink": .70})
    plt.savefig(os.path.join(selector_path, 'correlation_heatmap.png'), bbox_inches='tight')
    plt.clf()


def write_pickles(selector_path: str, selector_name: str, df: pd.DataFrame, features: list, labels: list,
                  classifiers: list):
    for cls in classifiers:
        cls.fit(df[features], labels)
        cls.selected_features = features
        pickle.dump(cls,
                    open(os.path.join(selector_path, "{}-{}.p".format(selector_name, cls.__class__.__name__)), "wb"))


def write_report(selector_path, report):
    json_repr = report.to_json()
    with open(os.path.join(selector_path, "report.json"), "w+") as f:
        f.write(json_repr)


def write_graphs(selector_path: str, report: SelectorReport):
    # write fold-specific information
    for i, fold_report in enumerate(report.fold_reports):
        x = []
        y = []
        for feature_stats in fold_report.features_importances:
            x.append(feature_stats.name)
            y.append(feature_stats.importance)
        x_pos = [i for i, _ in enumerate(x)]
        plt.barh(x_pos, y, color='green')
        plt.ylabel("Feature", fontsize=get_font_size(len(x)))
        plt.xlabel("Importance")
        plt.title("Features selected features in the fold: " + str(i))
        plt.yticks(x_pos, x)
        plt.savefig(os.path.join(selector_path, 'fold_{}.png'.format(i)), bbox_inches='tight')
        plt.clf()


def get_font_size(rows):
    if rows < 25:
        return 15
    else:
        return 8


pandarallel.initialize(progress_bar=False)
# READ ARGUMENTS
args = sys.argv
scratch_path = args[1]
job_id = args[2]
config_path = args[3]

config = Configuration(config_path)
results_path = os.path.join(scratch_path, job_id)
os.mkdir(results_path)

TARGET = config.target
CASE = config.case
CONTROL = config.control
input_data_filename = config.data_path
data = DataReader().read(input_data_filename)
df, labels = DataReader().read_data(data, TARGET)
features = list(df.columns)
k = int(config.k)

available_selectors = {'rf': RandomForestSelector(),
                       'it': ITSelector(ITERATIONS, FEATURES_SUBSET_SIZE),
                       'skbest': SelectKBestSelector(),
                       'lasso': LassoSelector(),
                       'elastic': ElasticNetSelector(),
                       'rmcfs': MCFSSelector(),
                       'kendall': KendallSelector(),
                       'pearson': PearsonSelector(),
                       'boosted_it': BoostedITSelector(ITERATIONS, FEATURES_SUBSET_SIZE)}

available_classifiers = {'rf': RandomForestClassifier(n_estimators=300),
                         'svm': SVC(probability=True),
                         'knn': KNeighborsClassifier(n_neighbors=3),
                         'nn': MLPClassifier((k, 100, len(set(labels))))}

fs_selectors = [available_selectors[algo] for algo in config.algorithms]
fs_classifiers = [available_classifiers[clsf] for clsf in config.classifiers]
fs_aggregator = FeatureSelectorsAggregator(fs_selectors)
cv_evaluator = CVEvaluator(N_SPLITS, fs_aggregator, labels, df, fs_classifiers, config)
selectors_reports = cv_evaluator.perform_evaluation()

for selector in fs_selectors:
    selector_name = selector.__class__.__name__
    report: SelectorReport = selectors_reports[selector_name]
    features = list(map(lambda item: item.name, report.selected_features))
    selector_path = os.path.join(results_path, selector_name)
    os.mkdir(selector_path)

    write_graphs(selector_path, report)
    write_pickles(selector_path, selector_name, df, features, labels, fs_classifiers)
    write_report(selector_path, report)
    write_correlation_heatmap(selector_path, features, df)
