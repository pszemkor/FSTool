from django.http import JsonResponse
from rest_framework.decorators import api_view


class FSResponse:
    def __init__(self):
        self.results = {'results': [{'random-forest': {'features': [1, 2, 3, 4], 'sth': 2}},
                                    {'mcfs': {'features': [1, 7, 3, 4], 'sth': 3}}]}


@api_view(['GET', 'POST'])
def fs_request(request):
    if request.method == 'GET':
        return JsonResponse(FSResponse().results)
    if request.method == "POST":
        print(request.data)
        return JsonResponse(FSResponse().results)

