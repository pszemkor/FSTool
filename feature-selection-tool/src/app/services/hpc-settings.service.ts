import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ErrorMessageProcessorService} from './error-message-processor.service';
import {HPCSettings} from '../shared/hpcsettings';
import {baseURL} from '../shared/baseurl';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HPCSettingsService {

  private settingsDict: {};

  constructor(private http: HttpClient,
              private errorProcessor: ErrorMessageProcessorService) {
  }

  getSettings() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<HPCSettings>(baseURL + 'settings', httpOptions)
      .pipe(catchError(this.errorProcessor.handleError));
  }


  postSettings(settings: HPCSettings) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.settingsDict = {
      user_name: settings.user_name,
      host: settings.host,
      proxy_certificate: settings.proxy_certificate,
    };

    return this.http.post<HPCSettings>(baseURL + 'settings', this.settingsDict, httpOptions)
      .pipe(catchError(this.errorProcessor.handleError));
  }
}
