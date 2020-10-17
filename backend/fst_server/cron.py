from time import sleep
import datetime
from fst_server.models import Job, HPCSettings, JobResult
import requests
from django.db.models import Q


def update_jobs():
    print("[INFO] Performing updates...")
    for queued_job in Job.objects.filter(Q(status="QUEUED") | Q(status="RUNNING")):
        current_job_id = queued_job.job_id
        print("[INFO] Job Id:", current_job_id)
        settings = HPCSettings.objects.all()
        if len(settings) != 1:
            print("[ERROR] Missing proxy")
            continue
        user_settings = settings[0]
        header = {'Content-type': 'application/json', "PROXY": user_settings.proxy_certificate}
        response = requests.get('https://rimrock.plgrid.pl/api/jobs/' + current_job_id, headers=header)
        if not response.ok:
            print("[ERROR] {}: {}", current_job_id, response.reason)
            continue
        response_content = response.json()
        print(response_content)
        status = response_content['status']
        if status == "FINISHED":
            # download relevant files and store in database
            print("[INFO] Update finished job")
            dir_name = current_job_id[:current_job_id.index('.')]
            results_path = 'https://data.plgrid.pl/list/prometheus/net/scratch/people/{}/{}/'.format(
                user_settings.user_name, dir_name)
            print(results_path)
            files_list_response = requests.get(results_path, headers={"PROXY": user_settings.proxy_certificate})
            print(files_list_response)
            if not files_list_response.ok:
                print("[ERROR] Could not retrieve results from the server")
                status = "FAILURE"
                Job.objects.filter(pk=current_job_id).update(status=status)
                continue
            # iterate over files and downloads
            files = files_list_response.json()
            for file in files:
                if not file['is_dir']:
                    print("[INFO] updating file:", file)
                    report_response = requests.get(results_path + file['name'], headers={"PROXY": user_settings.proxy_certificate})
                    if not report_response.ok:
                        print("[ERROR] Could not retrieve the report of the processing from the server")
                        status = "FAILURE"
                        break
                    print(report_response.content)

        Job.objects.filter(pk=current_job_id).update(status=status)
        print("[INFO] Status of {} updated from {} to {}".format(current_job_id, queued_job.status, status))
    print("[INFO] Jobs updated successfully")
