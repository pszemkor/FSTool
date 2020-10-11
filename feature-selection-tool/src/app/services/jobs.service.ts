import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorMessageProcessorService} from './error-message-processor.service';
import {Job, JobStatus} from '../shared/job';
import {Observable} from 'rxjs';
import {baseURL} from "../shared/baseurl";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  jobs: Job[] = [
    {
      job_id: '1',
      start_time: 'Test job',
      // creation_timestamp: Date;
      status: JobStatus.Running,
    },
    {
      job_id: '2',
      start_time: 'Another test job ',
      // creation_timestamp: Date;
      status: JobStatus.Finished,
    },
    {
      job_id: '3',
      start_time: 'Failed job ',
      // creation_timestamp: Date;
      status: JobStatus.Error,
    },
    {
      job_id: '4',
      start_time: 'Good job ',
      // creation_timestamp: Date;
      status: JobStatus.Finished,
    },
  ];

  constructor(private http: HttpClient,
              private errorProcessor: ErrorMessageProcessorService) {
  }

  getAvailableJobs() {
    return this.http.get<Job[]>(baseURL + 'jobs')
      .pipe(catchError(this.errorProcessor.handleError));
  }
}
