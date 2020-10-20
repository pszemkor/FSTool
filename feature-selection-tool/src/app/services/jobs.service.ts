import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorMessageProcessorService} from './error-message-processor.service';
import {Job} from '../shared/job';
import {baseURL} from '../shared/baseurl';
import {catchError} from 'rxjs/operators';
import {FeatureSelectionResults} from "../shared/featureselectionresults";

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(private http: HttpClient,
              private errorProcessor: ErrorMessageProcessorService) {
  }

  getAvailableJobs() {
    return this.http.get<Job[]>(baseURL + 'jobs')
      .pipe(catchError(this.errorProcessor.handleError));
  }

  getJobResult(jobId: string) {
    return this.http.get<FeatureSelectionResults>(baseURL + 'jobs/result/' + jobId)
      .pipe(catchError(this.errorProcessor.handleError));
  }


}
