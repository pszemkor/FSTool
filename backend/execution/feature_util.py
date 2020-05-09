import matplotlib.pyplot as plt
import numpy as np
import sys, os

sys.path.append(os.path.abspath('../'))


def get_best_k_features(forest, train_features, k, plot=True):
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
        selected_features.append(
            {'index': i, 'name': train_features.columns[indices[f]], 'score': importances[indices[f]]})

    if plot:
        x_pos = [i for i, _ in enumerate(x)]
        plt.barh(x_pos, y, color='green')
        # xerr=std**2
        plt.ylabel("Feature")
        plt.xlabel("Importance")
        plt.title(str(k) + " selected features")
        plt.yticks(x_pos, x)
        # plt.show()
        plt.savefig(r'../../rf_plot.png')
    return selected_features, x
