from django.http import JsonResponse
from rest_framework.decorators import api_view
from .response import mock

@api_view(['GET', 'POST'])
def fs_request(request):
    if request.method == "POST":
        print(request.data)
        return JsonResponse(mock, safe=False)
