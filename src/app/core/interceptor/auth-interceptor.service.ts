// Import necessary modules and services
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { catchError, filter, switchMap, take, retryWhen, mergeMap, finalize } from 'rxjs/operators';

// Import authentication and token-related services
import { CONSTANTS_TEXT } from '../const/app.constant';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { LocalstorageService } from '../service/localstorage.service';
import { INTERNET_CONNECTION_ERROR, StatusCode } from '../enum';
import { ApiURL } from '../service/api';

// Define a constant for the token header key
const TOKEN_HEADER_KEY = 'authorization';

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

@Injectable()
export class AuthIntercepeterInterceptor implements HttpInterceptor {

  // Declare variables for storing data
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Inject the services in the constructor
  constructor(
    private _authService: AuthService, // Service for authentication
    private tokenService: TokenService, // Service for handling tokens
    private _localstorageService: LocalstorageService, // Service for local storage
  ) { }

  // Intercept HTTP requests
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = request; // Store the original httpRequest in a variable
    const token = this.tokenService.getToken(); // Get the token from the token service
    // If a token exists, add it to the request headers
    //@ts-ignore
    if (token != null && request.headers.lazyUpdate == null) {
      authReq = this.addTokenHeader(request, token);
    }

    return next.handle(authReq).pipe(catchError(error => {
      // refresh token error handle
      // && authReq.url.includes(ApiURL.refreshToken)
      if (error instanceof HttpErrorResponse) {
        this.isRefreshing = false;
        if (error.status === StatusCode.ValidationCode) {
          this._localstorageService.logout();
        }

        if (error.status === StatusCode.InternalServerError) {
          this._localstorageService.showMessage(CONSTANTS_TEXT.error, error.error.errorMessage)
        } else {
          this._localstorageService.showMessage(CONSTANTS_TEXT.error, error.error.statusDescription)
        }

        return throwError(error);
      }
      // Handle 401 Unauthorized errors
      // !authReq.url.includes('/otp/') && !authReq.url.includes('/socket.io/') 
      if (error instanceof HttpErrorResponse && error.status === StatusCode.ValidationCode) {
        return this.handle401Error(authReq, next);
      }

      // Handle other errors
      if (error.status == StatusCode.NonStandard) {
        this._localstorageService.showMessage(CONSTANTS_TEXT.warning, error.error.message);
        this._localstorageService.logout()
      } else {
        let message = INTERNET_CONNECTION_ERROR.someerror;
        if (error.status === StatusCode.InternalServerError) {
          message = INTERNET_CONNECTION_ERROR.servererror;
        } else if (error.status == StatusCode.Unknown) {
          message = INTERNET_CONNECTION_ERROR.someerror;
        } else if (typeof error == 'string') {
          message = error;
        } else {
          message = error.error.message;
        }
        if (Array.isArray(message)) {
          this._localstorageService.showMessage(CONSTANTS_TEXT.error, message[0])
        } else {
          this._localstorageService.showMessage(CONSTANTS_TEXT.error, message)
        }
      }

      // Pass the error along
      return throwError(error);
    }));
  }

  // Handle 401 Unauthorized errors by refreshing the token
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.tokenService.getRefreshToken();
      // if token is true the call the refresh token api for new token
      if (token) {
        // return this._authService.refreshToken(token).pipe(switchMap((res: any) => {
        //   this.isRefreshing = false;
        //   this.tokenService.saveToken(res.data.accessToken);
        //   this.refreshTokenSubject.next(res.data.accessToken);
        //   return next.handle(this.addTokenHeader(request, res.data.accessToken));
        // }),
        //   catchError(error => {
        //     // handle the error
        //     this.isRefreshing = false;
        //     this._localstorageService.logout();
        //     return throwError(error);
        //   })
        // );
      }
    }

    // Wait for a new token and then retry the original request
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  // Add the token to the request headers
  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
}

// Define providers for the interceptor
export const TokenInterceptorServiceProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthIntercepeterInterceptor, multi: true }
];
