import { Injectable } from '@angular/core';
import { ApiURL } from './api';
import { HttpService } from './http.service';
import { LocalstorageService } from './localstorage.service';
import { login, verfiyotp } from '../shared/typings/app.typings';
// import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService, private _localstorageService: LocalstorageService,) { }
  TOKEN_KEY = 'auth_token'; // declare variable

  login(loginObject: login) { 
   return this.httpService.postAll(ApiURL.login, loginObject)
  }

  // inject the services in constructor for api call
  // otpSend(object: login) {
  //   return this.httpService.postAll(ApiURL.otpsend, object)
  // }

  // for varify otp and we paas an object in body , url
  // verfiyOtp(body: verfiyotp) {
  //   return this.httpService.postAll(ApiURL.VerfiyOtp, body)
  // }

  // refresh token api call and passing the refreshtoken , token
  // refreshToken(token: string) {
  //   return this.httpService.postAll(ApiURL.refreshToken, { refreshToken: token })
  // }

  loggedIn() {
    return !!this._localstorageService.getItem('Token')
  }

  // log out
  logout() {
    // return this.httpService.patchOnlyUrlApi(ApiURL.logout)
  }


}
