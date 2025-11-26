import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getApiParamSet } from '../shared/function/function';
import { paginationFilter} from '../shared/typings/app.typings';
import { ApiURL } from './api';
import { HttpService } from './http.service';
// import {  } from '../shared/typings/interface.typing';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // public sliderdataChanged$: BehaviorSubject<any> = new BehaviorSubject(null);
  // public accreditationfilled$: BehaviorSubject<any> = new BehaviorSubject(null);
  // public getgroupData$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private httpservice: HttpService) { }

  // common 
  // getCountryList() {
    // return this.httpservice.getAll(ApiURL.countries)
  // }

  // getStateList(params: { countryGeoId?: string }) {
  //   return this.httpservice.getAll(ApiURL.states, getApiParamSet(params))
  // }
  
}
