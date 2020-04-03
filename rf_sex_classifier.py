#!/usr/bin/env python
import matplotlib.pyplot as plt
import numpy as np
import pandas
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.model_selection import train_test_split


class RandomForest:
    def __init__(self, path, target):
        d, labels = self.read_data(path, target)
        self.split(d, labels)
        self.forest = ExtraTreesClassifier(n_estimators=250, random_state=0)

    def split(self, d, labels):
        self.train_features, self.test_features, \
        self.train_labels, self.test_labels = train_test_split(d, labels,
                                                               test_size=0.2,
                                                               random_state=42)

    def read_data(self, path, target):
        data = pandas.read_csv(path)
        df = pandas.DataFrame(data=data)
        labels = df[target].values
        features = list(filter(lambda x: x not in {target}, df.columns))
        d = df[features]
        d = d.dropna(axis=1)
        d = np.array(d)
        labels = np.array(labels)
        return d, labels

    def train_model(self):
        self.forest.fit(self.train_features, self.train_labels)

    def show_importance(self):
        importances = self.forest.feature_importances_
        std = np.std([tree.feature_importances_ for tree in self.forest.estimators_],
                     axis=0)
        indices = np.argsort(importances)[::-1]
        print("Feature ranking:")
        for f in range(self.train_features.shape[1]):
            print("%d. feature %s (%f)" % (f + 1, self.train_features.columns[indices[f]], importances[indices[f]]))
        self.show_plot(importances, indices, std)

    def show_plot(self, importances, indices, std):
        plt.figure()
        plt.title("Feature importances")
        plt.bar(range(self.train_features.shape[1]), importances[indices],
                color="r", yerr=std[indices], align="center")
        plt.xticks(range(self.train_features.shape[1]), indices)
        plt.xlim([-1, self.train_features.shape[1]])
        plt.show()
