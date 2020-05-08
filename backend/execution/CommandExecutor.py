from warnings import filterwarnings

import matplotlib.pyplot as plt
# import rpy2.robjects as ro
import seaborn as sns
# from rpy2.robjects import pandas2ri
# from rpy2.robjects import r
# from rpy2.robjects.conversion import localconverter
# from rpy2.robjects.packages import importr
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, recall_score
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC

from backend.execution.data import read_data
from backend.execution.feature_util import get_best_k_features
import sys, os

sys.path.append(os.path.abspath('../'))

filterwarnings('ignore')

R_PLOT_DIR = '../../../r_plot/'


# def plot_r(filename, plot_script):
#     grdevices = importr('grDevices')
#     grdevices.png(file=filename, width=700, height=700)
#     r(plot_script)
#     grdevices.dev_off()


class CommandExecutor:
    def __init__(self, request):
        self.request = request

    def execute(self):
        algo = 'rf'
        path = 'data.csv'
        target = 'SEX'
        k = 10
        data, labels = read_data(path, target)
        selected_features = []
        classification_results = []
        algoName = self.request['algoName']

        if algo == "rf":
            forest = ExtraTreesClassifier(n_estimators=250, random_state=0)
            train_features, test_features, train_labels, test_labels = train_test_split(data, labels,
                                                                                        test_size=0.2,
                                                                                        random_state=42)
            forest.fit(train_features, train_labels)
            selected_features = get_best_k_features(forest, train_features, k)

            self.check_classifiers(data[selected_features], labels)
        elif algo == "mcfs":
            pass
        elif algo == "corr_spearman":
            selected_features = self.correlaion_based_fs("spearman", path, target)
            classification_results = self.check_classifiers(data[selected_features], labels)

        elif algo == "corr_kendall":
            selected_features = self.correlaion_based_fs("kendall", path, target)
            classification_results = self.check_classifiers(data[selected_features], labels)

        elif algo == "pearson":
            selected_features = self.correlaion_based_fs("pearson", path, target)
            classification_results = self.check_classifiers(data[selected_features], labels)

        else:
            raise Exception("Unknown algorithm")

        return {'algoName': algoName, 'featuresRank': selected_features,
                'classificationResults': classification_results}

    def check_classifiers(self, data, labels):
        X_train, X_test, Y_train, Y_test = train_test_split(data, labels,
                                                            test_size=0.2,
                                                            random_state=42)
        result = []
        svm = SVC()
        nn = MLPClassifier()
        rf = RandomForestClassifier()
        classifiers = {"svm": svm, "nn": nn, "rf": rf}
        cls_params = {"svm": {'kernel': ('linear', 'rbf', 'sigmoid', 'poly'),
                              'C': [.001, .01, .1, .5, 1, 2, 5, 10]},
                      "nn": {'activation': ['relu', 'tanh', 'logistic'],
                             'hidden_layer_sizes': [(100,), (10, 50, 2), (50, 100, 2), (10, 10, 20, 2), (200,),
                                                    (300, 2),
                                                    (300,)],
                             'solver': ['adam'],
                             'learning_rate': ['adaptive', 'invscaling', 'adaptive', 'constant'],
                             'warm_start': [True, False]},
                      "rf": {'n_estimators': [50, 100, 200, 300, 400, 500],
                             'criterion': ['gini', 'entropy']}
                      }

        for k, v in classifiers.items():
            cv = GridSearchCV(v, cls_params[k], cv=5)
            cv.fit(X_train, Y_train)
            pred = cv.predict(X_test)
            print("***** ", k, " ****")
            f1 = f1_score(Y_test, pred, average="macro")
            accuracy = accuracy_score(Y_test, pred)
            recall = recall_score(Y_test, pred, average="macro")
            print('f1: ', f1)
            print('recall: ', recall)
            print('accuracy: ', accuracy)
            print('best params: ', cv.best_params_)
            result.append({'f1': f1, 'recall': recall, 'accuracy': accuracy, 'clfName': k})

        return result

    def correlaion_based_fs(self, method, path, target, threshold=0.9):
        data, labels = read_data(path, target)
        corr = data.corr(method=method)

        to_drop = []
        for i, f1 in enumerate(data.columns):
            for j, f2 in enumerate(data.columns):
                if i > j and abs(corr.iloc[i, j]) > threshold:
                    to_drop.append(f1)
        plt.subplots(figsize=(50, 50))
        sns.heatmap(corr, vmax=1.0, center=0, square=True, linewidths=.5, cbar_kws={"shrink": .70})
        plt.show()
        return list(set(data.columns) - set(to_drop))
