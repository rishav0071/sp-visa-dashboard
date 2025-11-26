import { Observable, of } from "rxjs";
import { login, verfiyotp } from "src/app/core/shared/typings/app.typings";

export class AuthServiceMock {

  constructor() { }

  otpSend(object:login):Observable<{success:boolean,message:string}>{
    return of({success:true,message:'succes',})
  }
 
  verfiyOtp(object:verfiyotp):Observable<{success:boolean,message:string, data:{role:string, token:string}}>{
    return of({success:true,message:'succes', data:{role:'admin',token:'tokentesting'}})
  }

  resendOtp(body:login):Observable<{success:boolean,message:string}>{
    return of({success:true,message:'succes'})
  }
 
}
