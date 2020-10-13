from time import sleep
import datetime
from fst_server.models import Job, HPCSettings
import requests


def update_jobs():
    for queued_job in Job.objects.filter(status="QUEUED"):
        current_job_id = queued_job.job_id
        settings = HPCSettings.objects.all()
        if len(settings) != 1:
            print("[ERROR] Missing proxy")
            continue
        user_settings = settings[0]
        header = {'Content-type': 'application/json', "PROXY": user_settings.proxy_certificate}
        response = requests.get('https://rimrock.plgrid.pl/api/jobs/' + current_job_id, headers=header)
        print(response)
        if not response.ok:
            print("[ERROR] {}: {}", current_job_id, response.reason)
            continue
        response_content = response.json()
        status = response_content['status']
        Job.objects.filter(pk=current_job_id).update(status=status)
        print("[INFO] Status of {} updated from {} to {}".format(current_job_id, queued_job.status, status))
    print("[INFO] Jobs updated successfully")
