import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ErrorMessageProcessorService} from './error-message-processor.service';
import {HPCSettings} from '../shared/hpcsettings';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HPCSettingsService {

  hpcSettings: HPCSettings = {
    username: 'plgfilipsl',
    host: 'prometheus.cyfronet.pl',
    grantId: 'plggimmunome',
    proxyBase64String: 'SOMETESTPROXY'
  };

  constructor(private http: HttpClient,
              private errorProcessor: ErrorMessageProcessorService) {
  }

  getSettings() {
    // return this.http.get<HPCSettings>(baseURL + "hpc-settings")
    //   .pipe(catchError(this.errorProcessor.handleError));
    return new Observable(observer => {
      observer.next(this.hpcSettings);
      observer.complete();
    });
  }


  postSettings(settings: HPCSettings) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // };
    // return this.http.post<HPCSettings>(baseURL + 'hpc-settings', settings, httpOptions)
    //   .pipe(catchError(this.errorProcessor.handleError));
    this.hpcSettings = settings;
    return new Observable(observer => {
      observer.next(this.hpcSettings);
      observer.complete();
    });
  }
}
