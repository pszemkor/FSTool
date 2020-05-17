import sys, os
import json
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .response import mock

sys.path.append(os.path.abspath('../'))
sys.path.append(os.path.abspath('..'))
from execution.CommandExecutor import CommandExecutor


@api_view(['GET', 'POST'])
def fs_request(request):
    if request.method == "POST":
        print(request.data)
        executor = CommandExecutor(request.data)

        # print(request.data)
        execute = executor.execute()
        print(json.dumps(execute))
        return JsonResponse(execute, safe=False)
