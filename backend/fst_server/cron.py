import json
import logging
import django
django.setup()

import requests
from django.db.models import Q

from fst_server.logger import get_logger
from fst_server.models import Job, HPCSettings, Image, Classifier, FSResult

logger = get_logger()


def update_jobs():
    logger.info("Performing updates...")
    for queued_job in Job.objects.filter(Q(status="QUEUED") | Q(status="RUNNING")):
        current_job_id = queued_job.job_id
        logger.info("Job Id: " + current_job_id)
        settings = HPCSettings.objects.all()
        if len(settings) != 1:
            logger.error("Missing proxy")
            continue
        user_settings = settings[0]
        header = {'Content-type': 'application/json', "PROXY": user_settings.proxy_certificate}
        response = requests.get('https://rimrock.plgrid.pl/api/jobs/' + current_job_id, headers=header)
        if not response.ok:
            logger.error("{}: {}".format(current_job_id, response.reason))
            continue
        response_content = response.json()
        logging.debug(response_content)
        status = response_content['status']
        if status == "FINISHED":
            try:
                status = update_finished_job(current_job_id, status, user_settings)
            except Exception as e:
                logger.error(str(e))
                status = "FAILURE"

        Job.objects.filter(pk=current_job_id).update(status=status)

        logger.info("Status of {} updated from {} to {}".format(current_job_id, queued_job.status, status))
    logger.info("Jobs updated successfully")


def update_finished_job(current_job_id, status, user_settings):
    # download relevant files and store in database
    logger.info("Update finished job")
    dir_name = current_job_id[:current_job_id.index('.')]
    results_path = 'https://data.plgrid.pl/list/prometheus/net/scratch/people/{}/{}/'.format(
        user_settings.user_name, dir_name)
    header_with_proxy = {"PROXY": user_settings.proxy_certificate}

    directories = get_directories_list(results_path, header_with_proxy)
    logger.info("Directories: " + str(directories))

    for dir in directories:
        selector_name = dir['name']
        if dir['is_dir'] and selector_name not in {".", ".."}:
            persist_selector_results(current_job_id, selector_name, results_path, header_with_proxy)

    return status


def get_directories_list(path, headers):
    logger.info("Listing directory: " + path)
    dir_list = requests.get(path, headers=headers)
    if not dir_list.ok:
        raise Exception("Could not retrieve results from the server")
    dir_list_json = dir_list.json()
    logger.debug('Files:' + str(dir_list_json))
    return dir_list_json


def persist_selector_results(current_job_id, selector_name, results_path, header_with_proxy):
    images = []
    classifiers = []
    reports = []
    logger.debug("Selector name: " + str(selector_name))
    dir_path = results_path + selector_name + "/"
    selector_results = get_directories_list(dir_path, header_with_proxy)

    for file in selector_results:
        if not file['is_dir']:
            filename = file['name']
            handle_file(dir_path, filename, header_with_proxy, reports, images, classifiers)

    if len(reports) != 1:
        raise Exception("Report not found")
    fs_result = FSResult.objects.create(job_id=current_job_id, algo_name=selector_name,
                                        response_json=reports[0])
    [Classifier.objects.create(name=name, cls_pickle=p, fs_result=fs_result) for name, p in classifiers]
    [Image.objects.create(fs_result=fs_result, image_binary=i) for i in images]


def handle_file(dir_path, filename, header_with_proxy, reports, images, classifiers):
    file_path = dir_path.replace("/list/", "/download/") + filename
    report_response = requests.get(file_path, headers=header_with_proxy)
    logger.debug("File:" + file_path)
    if not report_response.ok:
        raise Exception("Could not retrieve a file from the server")
    if filename == 'report.json':
        report_string = str(json.loads(report_response.text.replace("\n", "")))
        logger.info("Report: " + report_string)
        reports.append(report_string)
    elif filename.endswith(".png"):
        image_bytes = report_response.content
        images.append(image_bytes)
        logger.info("Saving image")
    elif filename.endswith(".p"):
        serialized_classifier = report_response.content
        logger.info("Persisting trained model")
        classifiers.append((filename[:-2], serialized_classifier))


update_jobs()
with open("/tmp/tmp.txt", "w+") as f:
    f.write("hello")
