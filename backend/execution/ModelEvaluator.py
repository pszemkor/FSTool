from warnings import filterwarnings
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, recall_score
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC
import sys, os
import pickle

from fst_server.models import Classifier

sys.path.append(os.path.abspath('../'))
from .data import read_data
from .feature_util import get_best_k_features
from .results import *

filterwarnings('ignore')


# todo: this class needs refactor -> apply command pattern to fs approaches, apply SRP rule
class CommandExecutor:
    def __init__(self, request):
        self.request = request

    def execute(self):
        target = 'SEX'
        k = 10
        data, labels = read_data(self.request['csvBase64'], target)
        selected_features = []
        classification_results = []
        algo = self.request['algoType']
        requested_classifiers = self.extract_req_clsf()
        resultImgs = []
        if algo == "RF":
            classification_results, resultImgs, selected_features = self.execute_rf_fs(data, k, labels,
                                                                                       requested_classifiers)
        elif algo == "mcfs":
            # todo: mcfs is currently unavailable for windows
            pass
        elif algo == "Spearman's correlation":
            selected_features, classification_results = self.correlation("spearman", self.request['csvBase64'], data,
                                                                         labels, target,
                                                                         requested_classifiers)
            resultImgs.append(ResultImg('Plot', '/assets/img/heatmap_spearman.png'))
        elif algo == "Kendall correlation":
            selected_features, classification_results = self.correlation("kendall", self.request['csvBase64'], data,
                                                                         labels, target,
                                                                         requested_classifiers)
            resultImgs.append(ResultImg('Plot', '/assets/img/kendalls_heatmap.png'))

        elif algo == "Pearson correlation":
            selected_features, classification_results = self.correlation("pearson", self.request['csvBase64'], data,
                                                                         labels, target,
                                                                         requested_classifiers)
        else:
            raise Exception("Unknown algorithm")

        return FSResponse(algo, resultImgs, selected_features, classification_results)

    def execute_rf_fs(self, data, k, labels, requested_classifiers):
        forest = ExtraTreesClassifier(n_estimators=250, random_state=0)
        train_features, test_features, train_labels, test_labels = train_test_split(data, labels,
                                                                                    test_size=0.2,
                                                                                    random_state=42)
        forest.fit(train_features, train_labels)
        selected_features, image_path = get_best_k_features(forest, train_features, k)
        columns = list(map(lambda sf: sf.name, selected_features))
        classification_results = self.check_classifiers(data[columns], labels, requested_classifiers)
        resultImgs = [ResultImg("plt", image_path)]
        return classification_results, resultImgs, selected_features

    def correlation(self, kind, data_base64, data, labels, target, requested_classifiers):
        cols = self.correlaion_based_fs(kind, data_base64, target)
        selected_features = []
        classification_results = self.check_classifiers(data[cols], labels, requested_classifiers)
        for i, f in enumerate(cols):
            # todo write correlation as score
            selected_features.append(SelectedFeature(i, f, 1))
        return selected_features, classification_results

    def check_classifiers(self, data, labels, requested_classifiers):
        X_train, X_test, Y_train, Y_test = train_test_split(data, labels,
                                                            test_size=0.2,
                                                            random_state=42)
        result = []
        classifiers = {"svm": SVC(), "nn": MLPClassifier(), "rf": RandomForestClassifier()}
        svm_params = {'kernel': ('linear', 'rbf', 'sigmoid', 'poly'),
                      'C': [.001, .01, .1, .5, 1, 2, 5, 10]}

        nn_params = {'activation': ['relu', 'tanh', 'logistic'],
                     'hidden_layer_sizes': [(100,), (10, 50, 2), (50, 100, 2)],
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
            result.append(ClassificationResult(k, round(accuracy, 4), round(f1, 4), round(recall, 4)))

            cls = Classifier(name='Test name clf', cls_pickle=pickle.dumps(cv))
            cls.save()

        return result

    def correlaion_based_fs(self, method, data_base64, target, threshold=0.9):
        data, labels = read_data(data_base64, target)
        corr = data.corr(method=method)

        to_drop = []
        for i, f1 in enumerate(data.columns):
            for j, f2 in enumerate(data.columns):
                if i > j and abs(corr.iloc[i, j]) > threshold:
                    to_drop.append(f1)
        # plt.subplots(figsize=(50, 50))
        # sns.heatmap(corr, vmax=1.0, center=0, square=True, linewidths=.5, cbar_kws={"shrink": .70})
        # plt.show()
        return list(set(data.columns) - set(to_drop))

    def extract_req_clsf(self):
        result = []
        if self.request['svm']:
            result.append('svm')
        if self.request['nn']:
            result.append('nn')
        if self.request['rf']:
            result.append('rf')
        return result
