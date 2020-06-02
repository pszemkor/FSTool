import numpy as np
import pandas as pd
import sys, os
import base64
from io import StringIO

sys.path.append(os.path.abspath('../'))


def read_data(base64_data, target):
    prefix = 'data:text/csv;base64,'
    data_str = base64.b64decode(base64_data[len(prefix):]).decode('utf-8')
    csv_data = StringIO(data_str)
    df = pd.read_csv(csv_data)
    labels = df[target].values
    del df[target]
    df = df[df.select_dtypes([np.number]).columns].dropna(axis=1)
    return df, labels


def read_evaluation_data(base64_data):
    prefix = 'data:text/csv;base64,'
    data_str = base64.b64decode(base64_data[len(prefix):]).decode('utf-8')
    csv_data = StringIO(data_str)
    df = pd.read_csv(csv_data)
    return df
