import os
import sys
from warnings import filterwarnings

from .commands import RandomForestFS, CorrelationBased

sys.path.append(os.path.abspath('../'))
from .data import read_data
from .results import *

filterwarnings('ignore')


class CommandExecutor:
    def __init__(self, request):
        self.request = request
        self.available_classifiers = ['svm', 'nn', 'rf']
        # todo: move this mapping to frontend
        self.available_cmds = {'RF': RandomForestFS(),
                               'Spearman\'s correlation': CorrelationBased('spearman'),
                               'Kendall correlation': CorrelationBased('kendall'),
                               'Pearson correlation': CorrelationBased('pearson')}

    def execute(self):
        # todo move selection to form
        target = 'SEX'
        k = 10

        data, labels = read_data(self.request['csvBase64'], target)
        algorithm_name = self.request['algoType']
        requested_classifiers = list(filter(lambda clf: self.request[clf], self.available_classifiers))

        cmd = self.available_cmds[algorithm_name]
        cv_results, diagrams, selected_features = cmd.execute(data, k, labels, requested_classifiers)
        return FSResponse(algorithm_name, diagrams, selected_features, cv_results)
