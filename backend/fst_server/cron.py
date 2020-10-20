from time import sleep
import datetime
from fst_server.models import Job, HPCSettings, JobResult, Image
import requests
from django.db.models import Q
import json
import sys
import logging
from fst_server.logger import get_logger
logger = get_logger()

def update_jobs():
    logger.info("Performing updates...")
    for queued_job in Job.objects.filter(Q(status="QUEUED") | Q(status="RUNNING")):
        current_job_id = queued_job.job_id
        logger.info("Job Id:", current_job_id)
        settings = HPCSettings.objects.all()
        if len(settings) != 1:
            logger.error("Missing proxy")
            continue
        user_settings = settings[0]
        header = {'Content-type': 'application/json', "PROXY": user_settings.proxy_certificate}
        response = requests.get('https://rimrock.plgrid.pl/api/jobs/' + current_job_id, headers=header)
        if not response.ok:
            logger.error("{}: {}", current_job_id, response.reason)
            continue
        response_content = response.json()
        logging.debug(response_content)
        status = response_content['status']
        if status == "FINISHED":
            status = update_finished_job(current_job_id, status, user_settings)

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
    files_list_response = requests.get(results_path, headers=header_with_proxy)
    logging.debug('files:', files_list_response)
    if not files_list_response.ok:
        logger.error("Could not retrieve results from the server")
        return "FAILURE"

    files = files_list_response.json()
    job_result = None
    images = []
    for file in files:
        if not file['is_dir']:
            filename: str = file['name']
            logger.debug("File:", filename)
            report_response = requests.get(results_path.replace("/list/", "/download/") + filename,
                                           headers=header_with_proxy)
            if not report_response.ok:
                logger.error("Could not retrieve the report of the processing from the server")
                return "FAILURE"
            # save main report
            if filename == 'report.json':
                report_string = str(json.loads(report_response.text.replace("\n", "")))
                logger.info("Report: ", report_string)
                job_result = JobResult.objects.create(job_id=current_job_id, response_json=report_string)
            elif filename.endswith(".png"):
                image_bytes = report_response.content
                images.append(image_bytes)

            logging.debug('File response content:', report_response.content)

    [Image.objects.create(job_result=job_result, image_binary=i) for i in images]

    return status
