import numpy as np
import pandas as pd
import sys, os
import base64
from io import StringIO

sys.path.append(os.path.abspath('../'))


def read_data(base64_data: str, target):
    df = __extract_dataframe(base64_data)
    labels = df[target].values
    del df[target]
    df = df[df.select_dtypes([np.number]).columns].dropna(axis=1)
    return df, labels


def read_evaluation_data(base64_data):
    df = __extract_dataframe(base64_data)
    df = df[df.select_dtypes([np.number]).columns].dropna(axis=1)
    return df


def __extract_dataframe(base64_data):
    i = base64_data.find(",")
    data_str = base64.b64decode(base64_data[i + 1:]).decode('utf-8')
    return pd.read_csv(StringIO(data_str))
