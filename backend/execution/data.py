import numpy as np
import pandas as pd
import sys,os
sys.path.append(os.path.abspath('../'))


def read_data(path, target):
    data = pd.read_csv(path)
    df = pd.DataFrame(data=data)
    labels = df[target].values
    del df[target]
    df = df[df.select_dtypes([np.number]).columns].dropna(axis=1)
    return df, labels
