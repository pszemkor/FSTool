from warnings import filterwarnings

filterwarnings('ignore')
import sys
import os

import base64
from io import StringIO
import csv

import pandas as pd
import numpy as np

import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, recall_score
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC

from random import sample
from collections import defaultdict
from statistics import median
from pandarallel import pandarallel
import json


def check_classifiers(data, labels, requested_classifiers):
    X_train, X_test, Y_train, Y_test = train_test_split(data, labels,
                                                        test_size=0.2,
                                                        random_state=42)
    result = []

    classifiers = {"svm": SVC(), "nn": MLPClassifier(), "rf": RandomForestClassifier()}
    svm_params = {'kernel': ('linear', 'rbf', 'sigmoid', 'poly'),
                  'C': [.001, .01, .1, .5, 1, 2, 5, 10]}

    nn_params = {'activation': ['relu', 'tanh', 'logistic'],
                 'hidden_layer_sizes': [(100,), (50,), (100, 50), (10, 50, 2), (50, 100, 2)],
                 'solver': ['adam'],
                 'learning_rate': ['adaptive'],
                 'warm_start': [True, False]}

    rf_params = {'n_estimators': [100, 200, 300, 400, 500],
                 'criterion': ['gini', 'entropy']}
    cls_params = {'svm': svm_params, 'rf': rf_params, 'nn': nn_params}

    for k, v in classifiers.items():
        if k not in requested_classifiers:
            continue
        cv = GridSearchCV(v, cls_params[k], cv=5)
        cv.fit(X_train, Y_train)
        pred = cv.predict(X_test)
        print("***** {} *****".format(k))
        f1 = f1_score(Y_test, pred, average="macro")
        accuracy = accuracy_score(Y_test, pred)
        recall = recall_score(Y_test, pred, average="macro")
        c_res = ClassificationResult(k, round(accuracy, 4), round(f1, 4), round(recall, 4))
        print(c_res)
        result.append(c_res)
    #         save_classifier(cv, data, k)
    return result


class CorrelationBasedFS:
    def __init__(self, kind, results_path):
        self.kind = kind
        self.results_path = results_path

    # todo: select ONLY k features
    def execute(self, data, k, labels, requested_classifiers):
        cols = self.correlation_based_fs(self.kind, data)
        selected_features = []
        classification_results = check_classifiers(data[cols], labels, requested_classifiers)
        for i, f in enumerate(cols):
            # todo write correlation as score
            selected_features.append(SelectedFeature(i, f, 1))
        # todo: fill diagrams
        diagrams = []
        return selected_features, diagrams, classification_results

    def correlation_based_fs(self, method, data, threshold=0.9):
        corr = data.corr(method=method)
        to_drop = []
        for i, f1 in enumerate(data.columns):
            for j, f2 in enumerate(data.columns):
                if i > j and abs(corr.iloc[i, j]) > threshold:
                    to_drop.append(f1)

        # todo: handle this heatmap in a separate thread
        plt.subplots(figsize=(50, 50))
        sns.heatmap(corr, vmax=1.0, center=0, square=True, linewidths=.5, cbar_kws={"shrink": .70})
        plt.savefig(os.path.join(self.results_path, self.kind) + ".png")
        # plt.show()
        return list(set(data.columns) - set(to_drop))


class RandomForestFS:
    def __init__(self, results_path):
        self.results_path = results_path

    def execute(self, data, k, labels, requested_classifiers):
        forest = ExtraTreesClassifier(n_estimators=250, random_state=0)
        train_features, test_features, train_labels, test_labels = train_test_split(data, labels,
                                                                                    test_size=0.2,
                                                                                    random_state=42)
        forest.fit(train_features, train_labels)
        selected_features, image_path = get_best_k_features(forest, train_features, k, self.results_path)
        columns = list(map(lambda sf: sf.name, selected_features))
        classification_results = check_classifiers(data[columns], labels, requested_classifiers)
        diagrams = [ResultImg("plt", image_path)]
        return selected_features, diagrams, classification_results


class CommandExecutor:
    def __init__(self, results_path):
        self.results_path = results_path
        self.available_classifiers = ['svm', 'nn', 'rf']
        # todo: move this mapping to frontend
        self.available_cmds = {'RF': RandomForestFS(results_path),
                               'Spearman\'s correlation': CorrelationBasedFS('spearman', results_path),
                               'Kendall correlation': CorrelationBasedFS('kendall', results_path),
                               'Pearson correlation': CorrelationBasedFS('pearson', results_path)}

    def execute(self, df, k, labels, algorithm_name):
        requested_classifiers = self.available_classifiers
        command_obj = self.available_cmds[algorithm_name]
        selected_features, diagrams, cv_results = command_obj.execute(df, k, labels, requested_classifiers)
        results = FSResponse(algorithm_name, diagrams, selected_features, cv_results)
        with open(os.path.join(self.results_path, 'report.json'), 'w+') as f:
            f.write(results.toJSON())
        return results


class ResultImg:
    def __init__(self, name, image):
        self.name = name
        self.image = image


class FSResponse:
    def __init__(self, algoName, resultImgs, featuresRank, classificationResults):
        self.algoName = algoName
        self.resultImgs = resultImgs
        self.featuresRank = featuresRank
        self.classificationResults = classificationResults

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


class SelectedFeature:
    def __init__(self, index, name, score):
        self.index = index
        self.name = name
        self.score = score


class ClassificationResult:
    def __init__(self, clfName, accuracy, f1, recall):
        self.clfName = clfName
        self.accuracy = accuracy
        self.f1 = accuracy
        self.recall = recall

    def __str__(self):
        return "Classifier: {}; Accuracy: {}; F1: {}; Recall: {}".format(self.clfName, self.accuracy, self.f1,
                                                                         self.recall)


def get_best_k_features(forest, train_features, k, results_path, plot=True):
    importances = forest.feature_importances_
    indices = np.argsort(importances)[::-1]

    # std = np.std([tree.feature_importances_ for tree in forest.estimators_],
    #              axis=0)

    print("*************** Features ranking ***************")
    selected_features = []
    x = []
    y = []
    i = 0
    for f in range(train_features.shape[1]):
        if i == k:
            break
        i += 1
        print("%d. feature: %s (%f)" % (f + 1, train_features.columns[indices[f]], importances[indices[f]]))
        x.append(train_features.columns[indices[f]])
        y.append(importances[indices[f]])
        selected_features.append(SelectedFeature(i, train_features.columns[indices[f]], importances[indices[f]]))

    if plot:
        x_pos = [i for i, _ in enumerate(x)]
        plt.barh(x_pos, y, color='green')
        # xerr=std**2
        plt.ylabel("Feature")
        plt.xlabel("Importance")
        plt.title(str(k) + " selected features")
        plt.yticks(x_pos, x)
        plt.savefig(os.path.join(results_path, 'rf_plot.png'))
    return selected_features, '/assets/img/rf_plot.png'


def read_data(base64_data: str, target):
    df = __extract_dataframe(base64_data)
    labels = df[target].values
    del df[target]
    df = df[df.select_dtypes([np.number]).columns].dropna(axis=1)
    return df, labels


def __extract_dataframe(base64_data):
    i = base64_data.find(",")
    data_str = base64.b64decode(base64_data[i + 1:]).decode('utf-8')
    return pd.read_csv(StringIO(data_str))


def read(filename):
    base64_csv = None
    with open(os.path.join(os.getcwd(), filename)) as data:
        base64_csv = data.read()
    return base64_csv


# READ ARGUMENTS
args = sys.argv
scratch_path = args[1]
job_id = args[2]
results_path = os.path.join(scratch_path, job_id)
os.mkdir(results_path)
target = args[3]
algorithm_name = args[4]
input_data_filename = args[5]
data = read(input_data_filename)
df, labels = read_data(data, target)
k = int(args[6])
# remove ABS from dataset
cols = [c for c in df.columns if c.lower()[:3] != 'abs']
df = df[cols]
executor = CommandExecutor(results_path)
executor.execute(df, k, labels, algorithm_name)
