import subprocess

from sklearn.ensemble import ExtraTreesClassifier
from sklearn.model_selection import train_test_split

from data import read_data
from importance_plot import show_importance

from rpy2.robjects import r


if __name__ == '__main__':
    # print("Select algorithm: [mcfs, rf]")
    # algo = input()
    # print("Select training data path: ")
    # path = input()
    # print("Type target label")
    # target = input()
    algo = 'mcfs'
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
        show_importance(forest, train_features, k)
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
