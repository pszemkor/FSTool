import pandas as pd


def read_data(path, target):
    data = pd.read_csv(path)
    df = pd.DataFrame(data=data)
    labels = df[target].values
    features = list(filter(lambda x: x not in {target, 'INITIALS'}, df.columns))
    d = df[features]
    d = d.dropna(axis=1)
    return d, labels
