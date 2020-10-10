import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorMessageProcessorService} from './error-message-processor.service';
import {Job, JobStatus} from '../shared/job';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  jobs: Job[] = [
    {
      id: '1',
      name: 'Test job',
      // creation_timestamp: Date;
      status: JobStatus.Running,
    },
    {
      id: '2',
      name: 'Another test job ',
      // creation_timestamp: Date;
      status: JobStatus.Finished,
    },
    {
      id: '3',
      name: 'Failed job ',
      // creation_timestamp: Date;
      status: JobStatus.Error,
    },
    {
      id: '4',
      name: 'Good job ',
      // creation_timestamp: Date;
      status: JobStatus.Finished,
    },
  ];

  constructor(private http: HttpClient,
              private errorProcessor: ErrorMessageProcessorService) {
  }

  getAvailableJobs() {
    // return this.http.get<Job[]>(baseURL + 'jobs')
    //   .pipe(catchError(this.errorProcessor.handleError));

    this.jobs[0].id = (Math.trunc(Math.random() * 10)).toString();

    return new Observable(observer => {
      observer.next(this.jobs);
      observer.complete();
    });
  }
}
