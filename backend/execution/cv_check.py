import json
import pickle

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import f1_score, accuracy_score, recall_score
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC

from backend.execution.results import ClassificationResult
from backend.fst_server.models import Classifier


def check_classifiers(data, labels, requested_classifiers):
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
        save_classifier(cv, data, k)
    return result


def save_classifier(cv, data, simple_name):
    Classifier(name=extract_fullname(simple_name), cls_pickle=pickle.dumps(cv),
               selected_features=json.dumps(list(data.columns))).save()


def extract_fullname(k):
    name = ''
    if k == 'rf':
        name = 'Random Forest'
    elif k == 'svm':
        name = k.upper()
    elif k == 'nn':
        name = 'Neural Network'
    else:
        name = k
    return name
