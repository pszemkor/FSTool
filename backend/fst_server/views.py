import sys, os
from django.http import HttpResponse
from rest_framework.decorators import api_view

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
