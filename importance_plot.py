import matplotlib.pyplot as plt
import numpy as np


def show_importance(forest, train_features, k):
    importances = forest.feature_importances_
    std = np.std([tree.feature_importances_ for tree in forest.estimators_],
                 axis=0)
    indices = np.argsort(importances)[::-1]
    print("Feature ranking:")
    x = []
    y = []
    i = 0
    for f in range(train_features.shape[1]):
        if i == k:
            break
        i += 1
        print("%d. feature %s (%f)" % (f + 1, train_features.columns[indices[f]], importances[indices[f]]))
        x.append(train_features.columns[indices[f]])
        y.append(importances[indices[f]])
        print(x[-1], y[-1])

    x_pos = [i for i, _ in enumerate(x)]
    plt.barh(x_pos, y, color='green')
    # xerr=std**2
    plt.ylabel("Feature")
    plt.xlabel("Importance")
    plt.title(str(k) + " selected features")
    plt.yticks(x_pos, x)
    plt.show()
