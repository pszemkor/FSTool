from warnings import filterwarnings

import matplotlib.pyplot as plt
import rpy2.robjects as ro
import seaborn as sns
from rpy2.robjects import pandas2ri
from rpy2.robjects import r
from rpy2.robjects.conversion import localconverter
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, recall_score
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC

from data import read_data
from feature_util import get_best_k_features

filterwarnings('ignore')


def test_classifiers(data, labels):
    X_train, X_test, Y_train, Y_test = train_test_split(data, labels,
                                                        test_size=0.2,
                                                        random_state=42)
    svm = SVC()
    nn = MLPClassifier()
    rf = RandomForestClassifier()
    classifiers = {"svm": svm, "nn": nn, "rf": rf}
    cls_params = {"svm": {'kernel': ('linear', 'rbf', 'sigmoid', 'poly'),
                          'C': [.001, .01, .1, .5, 1, 2, 5, 10]},
                  "nn": {'activation': ['relu', 'tanh', 'logistic'],
                         'hidden_layer_sizes': [(100,), (10, 50, 2), (50, 100, 2), (10, 10, 20, 2), (200,), (300, 2),
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
        print('f1: ', f1_score(Y_test, pred, average="macro"))
        print('recall: ', recall_score(Y_test, pred, average="macro"))
        print('accuracy: ', accuracy_score(Y_test, pred))
        print('best params: ', cv.best_params_)


def correlaion_based_fs(method, threshold=0.9):
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


if __name__ == '__main__':
    algo = 'corr_kendall'
    path = 'data.csv'
    target = 'SEX'
    k = 10
    data, labels = read_data(path, target)
    if algo == "rf":
        forest = ExtraTreesClassifier(n_estimators=250, random_state=0)
        train_features, test_features, train_labels, test_labels = train_test_split(data, labels,
                                                                                    test_size=0.2,
                                                                                    random_state=42)
        forest.fit(train_features, train_labels)
        first_k_features = get_best_k_features(forest, train_features, k)

        test_classifiers(data[first_k_features], labels)
    elif algo == "mcfs":
        # utils = rpackages.importr('utils')
        # packnames = ('rmcfs',)
        # utils.install_packages(StrVector(packnames))

        r.library("rmcfs")
        r.library("dplyr")
        r('path <- "{}"'.format(path))
        r('df <- read.table(path, header = TRUE, sep = ",")')
        r('data <- select(df, - INITIALS)')
        r('result <- mcfs(SEX ~ ., data, cutoffPermutations = 10, seed = 2, threadsNumber = 16)')

        r('RI <- result$RI')
        r('ID <- result$ID')

        result = r['result']
        ri = r['RI']

        with localconverter(ro.default_converter + pandas2ri.converter):
            pd_df = ro.conversion.rpy2py(ri)

        print(pd_df)
    elif algo == "corr_spearman":
        selected_features = correlaion_based_fs("spearman")
        test_classifiers(data[selected_features], labels)

    elif algo == "corr_kendall":
        selected_features = correlaion_based_fs("kendall")
        test_classifiers(data[selected_features], labels)

    elif algo == "pearson":
        selected_features = correlaion_based_fs("pearson")
        test_classifiers(data[selected_features], labels)

    else:
        raise Exception("Unknown algorithm")
