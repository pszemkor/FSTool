import sys, os
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view

from fst_server.models import Classifier

sys.path.append(os.path.abspath('../'))
sys.path.append(os.path.abspath('..'))


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
def get_classifiers(request):
    if request.method == 'GET':
        classifiers = []
        for classifier in Classifier.objects.all():
            clf_without_blob = {
                'name': classifier.name,
                'details': classifier.details,
                'creation_timestamp': classifier.creation_timestamp
            }
            classifiers.append(clf_without_blob)
    return JsonResponse({'classifiers': classifiers})
