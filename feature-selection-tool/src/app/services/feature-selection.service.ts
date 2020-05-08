import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FeatureSelectionParameters } from '../shared/featureselectionparameters'

@Injectable({
  providedIn: 'root'
})
export class FeatureSelectionService {

  constructor(private http: HttpClient) { }

  postRequest(params: FeatureSelectionParameters) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(baseURL + 'featureselection/')
    return this.http.post<FeatureSelectionParameters>(baseURL + 'featureselection/', params, httpOptions);
  }
}

