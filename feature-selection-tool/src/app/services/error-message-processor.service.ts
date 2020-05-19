import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageProcessorService {

  constructor() { }

  public handleError(errorResponse: HttpErrorResponse | any) {
    let errorMessage: string;
    
    if (errorResponse instanceof ErrorEvent) {
      errorMessage = errorResponse.error.message;
    } else {
      errorMessage = `${errorResponse.status || ''} ${errorResponse.statusText || ''} Server error`;
    }

    return throwError(errorMessage);
  }
}
