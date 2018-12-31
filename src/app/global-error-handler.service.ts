//import { ErrorDisplayComponent } from './error-display/error-display.component';
import {Injectable, ErrorHandler, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      // Backend returns unsuccessful response codes such as 404, 500 etc.
      console.log('Backend returned status code: ' + error.status);
      console.log('Response body:' + error.message);
      alert('Error occured -> ' + error.error.message);
    } else {
      // A client-side or network error occurred.
      console.log('An error occurred:', error.message);
    }
  }
}
