import subprocess

from sklearn.ensemble import ExtraTreesClassifier
from sklearn.model_selection import train_test_split

from data import read_data
from importance_plot import show_importance

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
        subprocess.run(["Rscript", "sex_classifier.R"])
    else:
        raise Exception("Unknown algorithm")
