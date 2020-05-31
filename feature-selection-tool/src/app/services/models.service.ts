import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorMessageProcessorService } from './error-message-processor.service';
import { baseURL } from '../shared/baseurl';
import { Model } from '../shared/model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor(private http: HttpClient,
    private errorProcessor: ErrorMessageProcessorService) { }

  getAvailableModels() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<Model[]>(baseURL + "/models")
      .pipe(catchError(this.errorProcessor.handleError));
  }
}

