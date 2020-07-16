from sklearn.ensemble import ExtraTreesClassifier
from sklearn.model_selection import train_test_split

from execution.cv_check import check_classifiers
from execution.feature_util import get_best_k_features
from execution.results import ResultImg, SelectedFeature


class CorrelationBasedFS:
    def __init__(self, kind):
        self.kind = kind

    # todo: select ONLY k features
    def execute(self, data, k, labels, requested_classifiers):
        cols = self.correlation_based_fs(self.kind, data)
        selected_features = []
        classification_results = check_classifiers(data[cols], labels, requested_classifiers)
        for i, f in enumerate(cols):
            # todo write correlation as score
            selected_features.append(SelectedFeature(i, f, 1))
        # todo: fill diagrams
        diagrams = []
        return selected_features, diagrams, classification_results

    def correlation_based_fs(self, method, data, threshold=0.9):
        corr = data.corr(method=method)
        to_drop = []
        for i, f1 in enumerate(data.columns):
            for j, f2 in enumerate(data.columns):
                if i > j and abs(corr.iloc[i, j]) > threshold:
                    to_drop.append(f1)

        # todo: handle this heatmap in a separate thread
        # plt.subplots(figsize=(50, 50))
        # sns.heatmap(corr, vmax=1.0, center=0, square=True, linewidths=.5, cbar_kws={"shrink": .70})
        # plt.show()
        return list(set(data.columns) - set(to_drop))


class RandomForestFS:
    def execute(self, data, k, labels, requested_classifiers):
        forest = ExtraTreesClassifier(n_estimators=250, random_state=0)
        train_features, test_features, train_labels, test_labels = train_test_split(data, labels,
                                                                                    test_size=0.2,
                                                                                    random_state=42)
        forest.fit(train_features, train_labels)
        selected_features, image_path = get_best_k_features(forest, train_features, k)
        columns = list(map(lambda sf: sf.name, selected_features))
        classification_results = check_classifiers(data[columns], labels, requested_classifiers)
        diagrams = [ResultImg("plt", image_path)]
        return selected_features, diagrams, classification_results
