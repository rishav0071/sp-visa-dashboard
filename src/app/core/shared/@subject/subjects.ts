import { BehaviorSubject, Subject } from "rxjs";
import { CONSTANTS_TEXT } from "../../const/app.constant";
import { sildeMenu } from "../typings/app.typings";
// import { Profile, WeightBmi } from "../typings/profile.typings";
let contant = CONSTANTS_TEXT;
//loader
let _loading:BehaviorSubject<boolean> = new BehaviorSubject(false);

export let Loading$ = _loading.asObservable();
export function IsLoading(data: boolean) {
    _loading.next(data)
}

// token
let _authToken: BehaviorSubject<any> = new BehaviorSubject(localStorage.getItem(contant.token) !== null ? localStorage.getItem(contant.token) : null);
export let token$ = _authToken.asObservable();
export function tokenSet(token: string,refreshToken:string) {
    localStorage.setItem(contant.token, token)
    localStorage.setItem(contant.refresh, refreshToken)

    return  _authToken.next(token)
}

// export  currentAuthTokenValue() {
//     return <string>localStorage.getItem(contant.token)
// }

  export function isLoggedIn(): boolean {
    return localStorage.getItem(contant.token) !== null;
  }



//filter chip form
let _chipFilterReset = new Subject<boolean>();
export let chipFilterReset$ = _chipFilterReset.asObservable();
export function chipFilterResetForm(data: boolean) {
  _chipFilterReset.next(data)
}

// sibling menu data
let data!:any;
 let _siblingsMenu: BehaviorSubject<any> = new BehaviorSubject(data);
export let siblingMenu$ = _siblingsMenu.asObservable();
export function getSiblingsMenu(sendMenu: any) {
  _siblingsMenu.next(sendMenu)
}


// sibling menu data
 let _secoundTimeback: BehaviorSubject<boolean> = new BehaviorSubject(false);
export let backButton$ = _secoundTimeback.asObservable();
export function getbackbutton(back: boolean) {
  _secoundTimeback.next(back)
}

// Profile data
//@ts-ignore
let _profileData = new BehaviorSubject<Profile>({});
export let getProfileData$ = _profileData.asObservable()
export function setProfileData(data:any){
  _profileData.next(data)
}

// All Employee data
let _employeesList = new BehaviorSubject<Array<{id:string,displayName:string}>>([])
export let getEmployeesList$ = _employeesList.asObservable()
export function setEmployeesList(data:Array<{id:string,displayName:string}>){
  _employeesList.next(data)
}

// All Reportee data
let _reporteeList = new BehaviorSubject<Array<{id:string,displayName:string}>>([])
export let getReporteeList$ = _reporteeList.asObservable()
export function setReporteeList(data:Array<{id:string,displayName:string}>){
  _reporteeList.next(data)
}

// Progress Data
// let _progressData = new BehaviorSubject<WeightBmi[]>([]);
// export let getWeightAndBmiData$ = _progressData.asObservable()
// export function setProgressData(data: WeightBmi | WeightBmi[]) {
//   if (Array.isArray(data)) {
//     _progressData.next(data);
//   } else {
//     _progressData.next([data]);
//   }
// }

// Notification count
let _notificationCount = new BehaviorSubject<number>(0);
export let getNotificationCount$ = _notificationCount.asObservable()
export function setNotificationCount(data: number) {
  _notificationCount.next(data);
}


// Notification count
let _LoginSuccessfully = new BehaviorSubject<boolean>(false);
export let getLoginSuccessfully$ = _LoginSuccessfully.asObservable()
export function setLoginSuccessfully(data: boolean) {
  _LoginSuccessfully.next(data);
}


let _ModelSubmit = new BehaviorSubject<any>({loader:false});
export let getModelTrigger$ = _ModelSubmit.asObservable()
export function setModelTrigger(data:any) {
  _ModelSubmit.next(data);
}

let _ApiCallTrigger = new BehaviorSubject<{status:string}>({status:''});
export let getApiTrigger$ = _ApiCallTrigger.asObservable()
export function setApiTrigger(value:{status:string}) {
  _ApiCallTrigger.next(value);
}