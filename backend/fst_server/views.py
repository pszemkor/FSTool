import os
import json
import os
import sys
import tempfile
from datetime import datetime

import requests
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from execution.ModelEvaluator import ModelEvaluator
from fst_server.models import Classifier, HPCSettings, Job, JobResult, Image
from rest_framework.decorators import api_view

sys.path.append(os.path.abspath('../'))
sys.path.append(os.path.abspath('..'))
from execution.CommandExecutor import CommandExecutor


@api_view(['POST'])
def fs_request(request):
    # todo: should take it into account
    # if request.data['hpc']:
    settings = HPCSettings.objects.all()
    data = request.data
    if len(settings) != 1:
        return HttpResponse("Missing settings", status=500)
    user_settings = settings[0]
    fd, filename = tempfile.mkstemp()
    name_of_file = ""
    workdir = '/net/scratch/people/{}'.format(user_settings.user_name)
    try:
        with os.fdopen(fd, 'w') as tmp:
            tmp.write(data['csvBase64'])
        with open(filename) as tmp:
            # todo: 'prometheus' should be passed as a parameter
            path = 'https://data.plgrid.pl/upload/prometheus' + workdir + '/'
            name_of_file = tmp.name
            file_upload_response = requests.post(path, files=dict(file=tmp),
                                                 headers={"PROXY": user_settings.proxy_certificate})
            if not file_upload_response.ok:
                return HttpResponse("Could not upload file", status=500)

    finally:
        os.remove(filename)

    script = ""
    with open('execution/script.slurm') as f:
        script = f.read()
        # todo: the target should be parametrized
        script = script.format('${SCRATCH}', '${SLURM_JOBID}', request.data['target'], request.data['algoType'],
                               os.path.basename(name_of_file), '10')

    response = requests.post('https://rimrock.plgrid.pl/api/jobs',
                             json={'host': user_settings.host,
                                   'working_directory': workdir,
                                   'script': script},
                             headers={'Content-type': 'application/json',
                                      "PROXY": user_settings.proxy_certificate})
    response_content = response.json()
    if response.ok:
        Job.objects.create(job_id=response_content['job_id'], status=response_content['status'],
                           start_time=datetime.now().strftime("%I:%M%p on %B %d, %Y"))
    else:
        return HttpResponse(response.reason, status=500)
    return HttpResponse(status=200)


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


@api_view(['POST', 'GET'])
def settings(request):
    if request.method == 'POST':
        count = HPCSettings.objects.count()
        if count >= 1:
            HPCSettings.objects.all().delete()
        user_name = request.data['user_name']
        proxy_certificate = request.data['proxy_certificate']
        host = request.data['host']
        hpc_settings = HPCSettings.objects.create(user_name=user_name, proxy_certificate=proxy_certificate, host=host)
        return JsonResponse(model_to_dict(hpc_settings))
    else:
        return JsonResponse(model_to_dict(HPCSettings.objects.first()) if HPCSettings.objects.first() else {})


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


@api_view(['GET'])
def job_result(request, job_id):
    job_result = JobResult.objects.get(pk=job_id)
    result = json.loads(job_result.response_json.replace("'", "\""))
    related_imgs = Image.objects.filter(job_result=job_id)
    result["resultImgs"] = [{"image": im.id, "name": job_id} for im in related_imgs]
    return JsonResponse(result)


@api_view(['GET'])
def images(request, image_id):
    return HttpResponse(Image.objects.get(pk=image_id).image_binary, 'image/png')
