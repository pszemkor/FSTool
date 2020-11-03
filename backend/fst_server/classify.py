import base64
import json
import pickle
from io import StringIO

import pandas as pd


class ModelEvaluator:
    def __init__(self, pickled_model):
        self.model = pickle.loads(pickled_model)

    def predict(self, data):
        selected_features = self.model.selected_features
        df = DataReader().read_data(data)
        df = df[selected_features]
        predict_proba = self.model.predict_proba(df)
        predict = self.model.predict(df)
        results = []
        for i, p in enumerate(predict):
            result = {"id": i, "prediction": p, "probability": round(max(predict_proba[i]), 3)}
            results.append(result)
        return results


class DataReader:
    def read_data(self, base64_data: str):
        df = self.__extract_dataframe(base64_data)
        return df

    def __extract_dataframe(self, base64_data):
        i = base64_data.find(",")
        data_str = base64.b64decode(base64_data[i + 1:]).decode('utf-8')
        return pd.read_csv(StringIO(data_str))
