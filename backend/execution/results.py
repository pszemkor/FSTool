import json


class ResultImg:
    def __init__(self, name, image):
        self.name = name
        self.image = image


class SelectedFeature:
    def __init__(self, index, name, score):
        self.index = index
        self.name = name
        self.score = score


class ClassificationResult:
    def __init__(self, clfName, accuracy, f1, recall):
        self.clfName = clfName
        self.accuracy = accuracy
        self.f1 = accuracy
        self.recall = recall


class FSResponse:
    def __init__(self, algoName, resultImgs, featuresRank, classificationResults):
        self.algoName = algoName
        self.resultImgs = resultImgs
        self.featuresRank = featuresRank
        self.classificationResults = classificationResults

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)
