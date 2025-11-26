import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { getApiParamSet } from '../shared/function/function';
import { ApiURL } from './api';

@Injectable({
    providedIn: 'root'
})
export class progressService {

    constructor(private httpService: HttpService) { }

    getBodyMeasurementData(params: { page: number, limit: number, customerId: string, from: string, to: string }) {
        return this.httpService.getAll(ApiURL.bodyMeasurment, getApiParamSet(params));
    }

    getScaleData(params: { page: number, limit: number, customerId: string, from: string, to: string }) {
        return this.httpService.getAll(ApiURL.smartScale, getApiParamSet(params));
    }
    
    getWaterLogData(params: { page: number, limit: number, customerId: string, from: string, to: string }) {
        return this.httpService.getAll(ApiURL.waterLog, getApiParamSet(params));
    }

    getWeightData(params: { page: number, limit: number, customerId: string}) {
        return this.httpService.getAll(ApiURL.weightLog, getApiParamSet(params));
    }

    getWeightAndBmiData(params:{customerId:string}){
        return this.httpService.getAll(ApiURL.weightLogDetails,getApiParamSet(params));
    }
}
