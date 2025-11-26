import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS_TEXT } from '../const/app.constant';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  CONSTANTS = CONSTANTS_TEXT;
  constructor(
    private localService: LocalstorageService,
    private httpClient: HttpClient
  ) {}

  // One Post methoed
  postAll(url: string, Body?: any, options?: any): Observable<any> {
    return this.httpClient.post(url, Body, options);
  }

  // One get methoed
  getAll(url: string, params?: any): Observable<any> {
    if (params != null) {
      return this.httpClient.get(url + params);
    } else {
      return this.httpClient.get(url);
    }
  }
  // One delete methoed
  deleteOne(url: string, id?: any): Observable<any> {
    return this.httpClient.delete(url + '/' + id);
  }

  // Delete with body method
  deleteWithBody(url: string, body?: any): Observable<any> {
    const options = {
      body: body,
    };
    return this.httpClient.delete(url, options);
  }

  // One put methoed
  putApi(url: string, id: string, Body?: any): Observable<any> {
    return this.httpClient.put(url + '/' + id, Body);
  }
  putBodyApi(url: string, Body: any): Observable<any> {
    return this.httpClient.put(url, Body);
  }
  // One put methoed
  putOnlyUrlApi(url: string, Body?: any): Observable<any> {
    return this.httpClient.put(url, Body);
  }

  //patch method
  patchApi(url: string, id: string, Body?: any): Observable<any> {
    return this.httpClient.patch(url + '/' + id, Body);
  }

  // patch only url method
  patchOnlyUrlApi(url: string, Body?: any): Observable<any> {
    return this.httpClient.patch(url, Body);
  }

  // Error Handling
  // private errorHandler(response: any) {
  //   let message:string = '';
  // if(response.status === StatusCode.ValidationCode){
  //   if(response.error.message){
  //     message = response.error.message;
  //   }else if(response.error.error){
  //     let arr = errorarray(response.error.error);
  //     if(arr.length){
  //       message = arr[0];
  //     }
  //   }
  // }else if(response.status === StatusCode.BadRequest){
  //   message = response.error.message;
  // }else if(response.status === StatusCode.NotFound){
  //   message = response.error.message;
  // }else if(response.status === StatusCode.Conflict){
  //   message = response.error.message;
  // }else if(response.status === StatusCode.InternalServerError){
  //       message = INTERNET_CONNECTION_ERROR.servererror;
  // }else if (response.status == StatusCode.Unknown) {
  //      message = INTERNET_CONNECTION_ERROR.internetcheck;
  // }else{
  //      message = INTERNET_CONNECTION_ERROR.someerror;
  // }

  // this.localService.showmessage(this.CONSTANTS.error, message);
  // }
  // .pipe(catchError(this.errorHandler.bind<any>(this)));
}
