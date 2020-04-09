import matplotlib.pyplot as plt
import rpy2.robjects as ro
import seaborn as sns
from rpy2.robjects import pandas2ri
from rpy2.robjects import r
from rpy2.robjects.conversion import localconverter
from rpy2.robjects.packages import importr
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, recall_score
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC

from data import read_data
from feature_util import get_best_k_features


R_PLOT_DIR  = 'r_plot/'


def plot_r(filename, plot_script):
        grdevices = importr('grDevices')
        grdevices.png(file=filename, width=700, height=700)
        r(plot_script)
        grdevices.dev_off()


def test_classifiers(data, labels):
    X_train, X_test, Y_train, Y_test = train_test_split(data, labels,
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
        cv = GridSearchCV(v, cls_params[k], cv=5)
        cv.fit(X_train, Y_train)
        pred = cv.predict(X_test)
        print(k)
        print('f1: ', f1_score(Y_test, pred, average="macro"))
        print('recall: ', recall_score(Y_test, pred, average="macro"))
        print('accuracy: ', accuracy_score(Y_test, pred))


def correlations(method, threshold=0.8):
    data, labels = read_data(path, target)
    corr = data.corr(method=method)

    highly_corr = []
    for i, f1 in enumerate(data.columns):
        for j, f2 in enumerate(data.columns):
            if i > j and abs(corr.iloc[i, j]) > threshold:
                highly_corr.append(f1)
                highly_corr.append(f2)
                print((f1, "     " + f2, corr.iloc[i, j]))
    corr = data[highly_corr].corr(method=method)

    s = set(data.columns) - set(highly_corr)
    print(len(s), s)
    plt.subplots(figsize=(20, 20))
    sns.heatmap(corr, cmap='YlGnBu')
    plt.show()


if __name__ == '__main__':
    algo = 'corr_kendall'
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
        r('result <- mcfs(SEX ~ ., data, cutoffPermutations = 10, seed = 2, threadsNumber = 16)')

        r('RI <- result$RI')
        r('ID <- result$ID')

        result = r['result']
        ri = r['RI']

        with localconverter(ro.default_converter + pandas2ri.converter):
            pd_df = ro.conversion.rpy2py(ri)

        print(pd_df)

        plot_r(R_PLOT_DIR + 'ri.png','plot(result, type = "ri", size = 50, plot_permutations = TRUE)')
        plot_r(R_PLOT_DIR + 'id.png','plot(result, type = "id", size = 50)')
        plot_r(R_PLOT_DIR + 'features.png','plot(result, type = "features", size = 10)')
        plot_r(R_PLOT_DIR + 'classifiers.png','plot(result, type = "cv", measure = "wacc")')


    elif algo == "corr_spearman":
        correlations("spearman")
    elif algo == "corr_kendall":
        correlations("kendall")
    elif algo == "pearson":
        correlations("pearson")
    else:
        raise Exception("Unknown algorithm")
