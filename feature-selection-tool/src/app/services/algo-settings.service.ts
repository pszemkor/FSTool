import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ErrorMessageProcessorService} from './error-message-processor.service';
import {baseURL} from '../shared/baseurl';
import {catchError} from 'rxjs/operators';
import {ClassifierSettings, SelectorSettings} from '../shared/algosettings';

@Injectable({
  providedIn: 'root'
})
export class AlgoSettingsService {

  constructor(private http: HttpClient,
              private errorProcessor: ErrorMessageProcessorService) {
  }

  getSelectorSettings() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<SelectorSettings>(baseURL + 'selector-settings', httpOptions)
      .pipe(catchError(this.errorProcessor.handleError));
  }


  postSelectorSettings(settings: SelectorSettings) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<SelectorSettings>(baseURL + 'selector-settings', settings, httpOptions)
      .pipe(catchError(this.errorProcessor.handleError));
  }

  getClassifierSettings() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<ClassifierSettings>(baseURL + 'classifier-settings', httpOptions)
      .pipe(catchError(this.errorProcessor.handleError));
  }


  postClassifierSettings(settings: ClassifierSettings) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ClassifierSettings>(baseURL + 'classifier-settings', settings, httpOptions)
      .pipe(catchError(this.errorProcessor.handleError));
  }
}
