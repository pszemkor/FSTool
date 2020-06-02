import sys, os
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from fst_server.models import Classifier
from execution.CommandExecutor import CommandExecutor
from execution.ModelEvaluator import ModelEvaluator

sys.path.append(os.path.abspath('../'))
sys.path.append(os.path.abspath('..'))
from execution.CommandExecutor import CommandExecutor

@api_view(['GET', 'POST'])
def fs_request(request):
    if request.method == "POST":
        print(request.data)
        executor = CommandExecutor(request.data)
        execute = executor.execute()
        json = execute.toJSON()
        print(json)
        return HttpResponse(json)


@api_view(['GET', 'POST'])
def get_models(request):
    models = []
    if request.method == 'GET':
        for classifier in Classifier.objects.all():
            clf_without_blob = {
                'id': classifier.id,
                'name': classifier.name,
                'details': classifier.details,
                'creation_timestamp': classifier.creation_timestamp
            }
            models.append(clf_without_blob)
    return JsonResponse({'models': models})


@api_view(['GET', 'POST'])
def classify(request):
    if request.method == "POST":
        print(request.data)
        modelID = request.data['modelID']
        evaluator = ModelEvaluator(request.data)
        evaluation_results = evaluator.execute()
        to_json = {
            'classifier': Classifier.objects.get(id=modelID).name,
            'results': evaluation_results
        }
        return JsonResponse(to_json)
