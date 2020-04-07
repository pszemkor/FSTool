import subprocess

from sklearn.ensemble import ExtraTreesClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, recall_score
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC

from data import read_data
from feature_util import get_best_k_features


def test_classifiers(data, labels):
    train_features, test_features, train_labels, test_labels = train_test_split(data, labels,
                                                                                test_size=0.2,
                                                                                random_state=42)
    svm = SVC()
    nn = MLPClassifier()
    rf = RandomForestClassifier()
    classifiers = {"svm": svm, "nn": nn, "rf": rf}
    cls_params = {"svm": {'kernel': ('linear', 'rbf'), 'C': [1, 5, 10]},
                  "nn": {'activation': ['relu', 'tanh', 'logistic'],
                         'hidden_layer_sizes': [(100,), (10, 50), (50, 100)],
                         'solver': ['sgd', 'adam'], 'learning_rate': ['adaptive']},
                  "rf": {'n_estimators': [50, 100, 200, 300]}}

    for k, v in classifiers.items():
        cv = GridSearchCV(v, cls_params[k])
        cv.fit(train_features, train_labels)
        pred = cv.predict(test_features)
        print(k)
        print('f1: ', f1_score(test_labels, pred, average="macro"))
        print('recall: ', recall_score(test_labels, pred, average="macro"))
        print('accuracy: ', accuracy_score(test_labels, pred))


from rpy2.robjects import r


if __name__ == '__main__':
    algo = 'rf'
    path = 'data.csv'
    target = 'SEX'
    k = 20
    if algo == "rf":
        forest = ExtraTreesClassifier(n_estimators=250, random_state=0)
        data, labels = read_data(path, target)
        train_features, test_features, train_labels, test_labels = train_test_split(data, labels,
                                                                                    test_size=0.2,
                                                                                    random_state=42)
        forest.fit(train_features, train_labels)
        first_k_features = get_best_k_features(forest, train_features, k)

        test_classifiers(data[first_k_features], labels)

    elif algo == "mcfs":
        r.library("rmcfs")
        r.library("dplyr")
        r('path <- "{}"'.format(path))
        r('df <- read.table(path, header = TRUE, sep = ",")')
        r('data <- select(df, - INITIALS)')
        r('result <- mcfs(SEX ~ ., data, cutoffPermutations = 5, seed = 2, threadsNumber = 16)')

        r('RI <- result$RI')
        r('ID <- result$ID')

        result = r['result']
        ri = r['RI']
        print('RI',ri)


    else:
        raise Exception("Unknown algorithm")
