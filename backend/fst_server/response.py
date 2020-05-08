class ResultImg:
    def __init__(self):
        self.name = "result.jpg"
        self.image = "0101010110011"


class SelectedFeature:
    def __init__(self):
        self.index = 1
        self.name = "C4--1"
        self.score = .12


class ClassificationResult:
    def __init__(self):
        self.clfName = "svm"
        self.accuracy = .99
        self.f1 = 0.8
        self.recall = 1.0


class FSResponse:
    def __init__(self):
        self.algoName = "random forest"
        self.resultImgs = [ResultImg()]
        self.featuresRank = [SelectedFeature()]
        self.classificationResults = [ClassificationResult()]


mock = {
    "algoName": "random forest",
    "resultImgs": [
        {
            "name": "result.jpg",
            "image": "0101010110011"
        }
    ],
    "featuresRank": [
        {
            "index": 1,
            "name": "C4--1",
            "score": 0.12
        }
    ],
    "classificationResults": [
        {
            "clfName": "svm",
            "accuracy": 0.99,
            "f1": 0.8,
            "recall": 1.0
        }
    ]
}