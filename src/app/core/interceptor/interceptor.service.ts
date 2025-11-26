import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retry, catchError, finalize, mergeMap, retryWhen, throwIfEmpty, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { INTERNET_CONNECTION_ERROR, StatusCode } from '../enum';
import { errorarray } from '../shared/function/function';
import { LocalstorageService } from '../service/localstorage.service';
import { CONSTANTS_TEXT } from '../const/app.constant';
// import { isLoading, showToast, shareUserData } from "./shared";

const retryStrategy = (
  {
    maxRetryAttempts = 0,
    scalingDuration = 1000,
    excludedStatusCodes = [401, 500, 404]
  }: {
    maxRetryAttempts?: number;
    scalingDuration?: number;
    excludedStatusCodes?: number[];
  } = {}
) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find(e => e === error.status)) {
        return throwError(error);
      }
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => {

    })
  );
};



@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router,private localstorage: LocalstorageService ) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
   
    let req = this.addAuthenticationToken(request)
   
    return next.handle(req)
      .pipe(
        tap((data: any) => {
          if (data?.body?.status == "Success" || data?.body?.status == true) {
            // IsLoading(false)
          }
        }),
        retryWhen(retryStrategy()),
        catchError((response: HttpErrorResponse) => {
          let errorMessage = '';
          if (response.error instanceof ErrorEvent) {
            // client-side error
            return throwError(response.error.message);
          } else {
            // server-side error
            let message: any = '';
            if (response.status === StatusCode.ValidationCode) {
              if (response.error.message) {
                message = response.error.message;
              } else if (response.error.error) {
                let arr = errorarray(response.error.error);
                if (arr.length) {
                  message = arr;
                }
              }
            } else if (response.status === StatusCode.BadRequest) {
              message = response.error.message;
            } else if (response.status === StatusCode.NotFound) {
              message = response.error.message;
            } else if (response.status === StatusCode.Conflict) {
              message = response.error.message;
            }else if (response.status === StatusCode.InternalServerError) {
              message = INTERNET_CONNECTION_ERROR.servererror;
            } else if (response.status == StatusCode.Unknown) {
              message = INTERNET_CONNECTION_ERROR.internetcheck;
            }else if(typeof response == 'string'){
              message = response;
            } else {
              message = INTERNET_CONNECTION_ERROR.someerror;
            }
            if (response.status === 0) {
              return throwError({ status: 0 })
            } else {
              if(Array.isArray(message)){
                this.localstorage.showMessage(CONSTANTS_TEXT.error,message[0])
              }else{
                this.localstorage.showMessage(CONSTANTS_TEXT.error,message)
              }
            }
          }
          return throwError(errorMessage);
        }),
     
      )
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    return request;
  }
}


