#!/usr/bin/env python
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier
from sklearn.model_selection import train_test_split
import numpy as np
import pandas

import matplotlib.pyplot as plt

data = pandas.read_csv('HCL Matched Normals 6.26.18.csv')
df = pandas.DataFrame(data=data)

labels = df['SEX'].values
features = list(filter(lambda x: x not in {'INITIALS', 'SEX'}, df.columns))
d = df[features]
d = d.dropna(axis=1)
d = np.array(d)
labels = np.array(labels)

train_features, test_features, train_labels, test_labels = train_test_split(d, labels, test_size=0.2, random_state=42)

rf = RandomForestClassifier()
rf.fit(train_features, train_labels)

predictions = rf.predict(test_features)


def normalizeLabels(labels):
    sex = {'F': 1, 'M': 0}
    return np.array(list(map(lambda x: sex[x], labels)))


normalized_predictions = normalizeLabels(predictions)
normalized_labels = normalizeLabels(test_labels)
errors = abs(normalized_predictions - normalized_labels)
mape = 100 * (errors / len(normalized_labels))
accuracy = 100 - np.mean(mape)
print('Accuracy:', round(accuracy, 2), '%.')

# ## FEATURE IMPORTANCE

forest = ExtraTreesClassifier(n_estimators=250,
                              random_state=0)

forest.fit(train_features, train_labels);

importances = forest.feature_importances_

std = np.std([tree.feature_importances_ for tree in forest.estimators_],
             axis=0)
indices = np.argsort(importances)[::-1]

# Print the feature ranking
print("Feature ranking:")

for f in range(train_features.shape[1]):
    print("%d. feature %s (%f)" % (f + 1, train_features.columns[indices[f]], importances[indices[f]]))

# Plot the feature importances of the forest
plt.figure()
plt.title("Feature importances")
plt.bar(range(train_features.shape[1]), importances[indices],
        color="r", yerr=std[indices], align="center")
plt.xticks(range(train_features.shape[1]), indices)
plt.xlim([-1, train_features.shape[1]])
plt.show()
