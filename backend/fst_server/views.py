import sys, os
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from fst_server.models import Classifier, HPCSettings, Job
from execution.ModelEvaluator import ModelEvaluator
from django.forms.models import model_to_dict

sys.path.append(os.path.abspath('../'))
sys.path.append(os.path.abspath('..'))
from execution.CommandExecutor import CommandExecutor
import json
import requests


@api_view(['GET', 'POST'])
def fs_request(request):
    if request.method == 'POST':
        # Rimrock's hello world =]
        settings = HPCSettings.objects.all()
        if len(settings) != 1:
            return HttpResponse("Missing settings", status=500)
        user_settings = settings[0]
        sample_data = {'host': user_settings.host,
                       'script': '#!/bin/bash\n#SBATCH -A plgimmunome\n \echo hello\nexit 0'}
        header = {'Content-type': 'application/json', "PROXY": user_settings.proxy_certificate}
        response = requests.post('https://rimrock.plgrid.pl/api/jobs', json=sample_data, headers=header)
        response_content = response.json()
        if response.ok:
            Job.objects.create(job_id=response_content['job_id'], status=response_content['status'])
        else:
            return HttpResponse(response.reason, status=500)
        return HttpResponse(response.text)


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
        modelID = request.data['modelID']
        evaluator = ModelEvaluator(request.data)
        evaluation_results = evaluator.execute()
        to_json = {
            'classifier': Classifier.objects.get(id=modelID).name,
            'results': evaluation_results
        }
        return JsonResponse(to_json)


@api_view(['POST'])
def settings(request):
    count = HPCSettings.objects.count()
    if count >= 1:
        HPCSettings.objects.all().delete()
    user_name = request.data['user_name']
    proxy_certificate = request.data['proxy_certificate']
    host = request.data['host']
    hpc_settings = HPCSettings.objects.create(user_name=user_name, proxy_certificate=proxy_certificate, host=host)
    return JsonResponse(model_to_dict(hpc_settings))


@api_view(['GET', 'POST'])
def jobs(request):
    if request.method == 'GET':
        return JsonResponse(list(Job.objects.all().values()), safe=False)
    job_id = request.data['job_id']
    status = request.data['status']
    start_time = request.data['start_time']
    end_time = request.data['end_time']
    return JsonResponse(
        model_to_dict(Job.objects.create(job_id=job_id, status=status, start_time=start_time, end_time=end_time)))
