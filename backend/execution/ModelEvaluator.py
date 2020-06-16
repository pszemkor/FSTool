from warnings import filterwarnings
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, recall_score
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC
import sys, os
import pickle

from fst_server.models import Classifier
import json

sys.path.append(os.path.abspath('../'))
from .data import read_evaluation_data

filterwarnings('ignore')


# todo: this class needs refactor -> apply command pattern to fs approaches, apply SRP rule
class ModelEvaluator:
    def __init__(self, request):
        self.request = request

    def execute(self):
        data = read_evaluation_data(self.request['csvBase64'])

        cls_loaded = Classifier.objects.get(id=int(self.request['modelID']))
        decoder = json.decoder.JSONDecoder()
        features = decoder.decode(cls_loaded.selected_features)

        cv = pickle.loads(cls_loaded.cls_pickle)
        print(data)
        print(features)
        # todo select only those features that were used in training
        y = cv.predict(data[features])
        print(y)

        clf_results = [{'id': i, 'prediction': 'Female' if res == "F" else 'Male'} for i, res in enumerate(y)]

        return clf_results
