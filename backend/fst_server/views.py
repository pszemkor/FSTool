import json
import os
import sys
import tempfile
from datetime import datetime
import requests
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from fst_server.logger import get_logger
from fst_server.models import Classifier, HPCSettings, Job, FSResult, Image
from fst_server.classify import ModelEvaluator
from rest_framework.decorators import api_view

sys.path.append(os.path.abspath('../'))
sys.path.append(os.path.abspath('..'))

logger = get_logger()


@api_view(['POST'])
def fs_request(request):
    prefix = "/featureselection: "
    logger.debug(prefix)
    settings = HPCSettings.objects.all()
    logger.debug(prefix + "Getting HPCSettings")
    data = request.data
    if len(settings) != 1:
        return HttpResponse("Missing settings", status=500)

    user_settings = settings[0]
    workdir = '/net/scratch/people/{}'.format(user_settings.user_name)
    logger.info(prefix + "Uploading FS script")
    upload_fs_script(user_settings, workdir)

    logger.info(prefix + "Uploading data")
    name_of_file = upload_csv(data, user_settings, workdir)

    logger.info(prefix + "Uploading configuration")
    configuration_file = upload_configuration(data, name_of_file, user_settings, workdir)

    logger.info(prefix + "Uploading script.slurm")
    script = upload_slurm_script(configuration_file, request, user_settings.grant_id)

    logger.info(prefix + "Sending request")
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
        logger.error(prefix + response.reason)
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


@api_view(['POST'])
def classify(request):
    modelID = request.data['modelID']
    model = Classifier.objects.get(pk=modelID)
    evaluator = ModelEvaluator(model.cls_pickle)
    prediction_results = evaluator.predict(request.data['csvBase64'])

    return JsonResponse({"classifier": model.name, "results": prediction_results})


@api_view(['POST', 'GET'])
def settings(request):
    if request.method == 'POST':
        count = HPCSettings.objects.count()
        if count >= 1:
            HPCSettings.objects.all().delete()
        print(request.data)
        user_name = request.data['user_name']
        proxy_certificate = request.data['proxy_certificate']
        host = request.data['host']
        grant = request.data['grant_id']

        hpc_settings = HPCSettings.objects.create(user_name=user_name, grant_id=grant,
                                                  proxy_certificate=proxy_certificate, host=host)
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
    fs_results = FSResult.objects.filter(job_id=job_id)
    job_results = []
    for fs_result in fs_results:
        result_dict = dict()
        json_report = json.loads(fs_result.response_json.replace("'", "\""))
        related_imgs = Image.objects.filter(fs_result=fs_result.id)

        result_dict['report'] = json_report
        result_dict['algoName'] = fs_result.algo_name
        result_dict["resultImgs"] = [{"image": im.id, "name": job_id} for im in related_imgs]

        job_results.append(result_dict)
    print(job_results)
    return JsonResponse(job_results, safe=False)


@api_view(['GET'])
def images(request, image_id):
    return HttpResponse(Image.objects.get(pk=image_id).image_binary, 'image/png')


def upload_fs_script(user_settings, workdir):
    print(os.getcwd())
    upload_file("fstool.py", user_settings, workdir)


def upload_slurm_script(configuration_file, request, grant_id):
    with open('execution/script.slurm') as f:
        script = f.read().format('${SCRATCH}', '${SLURM_JOBID}', configuration_file, grant_id)
    return script


def upload_csv(data, user_settings, workdir):
    fd, filename = tempfile.mkstemp()
    content = data['csvBase64']
    return create_and_upload(content, fd, filename, user_settings, workdir)


def upload_configuration(data, data_path, user_settings, workdir):
    params = {'k': data['k'],
              'algorithms': data['algorithms'],
              'classifiers': data['classifiers'],
              'target': data['target'],
              'metric': data['metric'],
              'case': 'F',
              'control': 'M',
              'data_path': data_path}
    fd, filename = tempfile.mkstemp()
    content = json.dumps(params)
    return create_and_upload(content, fd, filename, user_settings, workdir)


def create_and_upload(content, fd, filename, user_settings, workdir):
    try:
        with os.fdopen(fd, 'w') as tmp:
            tmp.write(content)

        name_of_file = upload_file(filename, user_settings, workdir)
    finally:
        os.remove(filename)

    return os.path.basename(name_of_file)


def upload_file(filename, user_settings, workdir):
    with open(filename) as tmp:
        path = 'https://data.plgrid.pl/upload/prometheus' + workdir + '/'
        name_of_file = tmp.name
        file_upload_response = requests.post(path, files=dict(file=tmp),
                                             headers={"PROXY": user_settings.proxy_certificate})
        if not file_upload_response.ok:
            logger.error(file_upload_response.reason)
            raise ConnectionError('Cannot upload file')
    return name_of_file
