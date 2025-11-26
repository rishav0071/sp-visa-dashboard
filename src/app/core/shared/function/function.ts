import * as moment from 'moment';
import { ManageMemberFilter } from '../typings/app.typings';
import { zhCN } from 'date-fns/locale';
import * as saveAs from 'file-saver';
import { CONSTANTS_TEXT } from '../../const/app.constant';
import { RoutePath } from '../../config';

export function getApiParamSet(object: any) {
    var queryParam = "";
    if (object != null) {
        if (typeof (object) === 'string' || typeof (object) === 'number') {
            queryParam = '/' + object;
        } else {
            if (object != undefined) {
                queryParam = "?";
            }
            Object.getOwnPropertyNames(object).forEach((val, index) => {
                if (index > 0) {
                    queryParam += "&"
                }
                queryParam += val + "=" + object[val];
            })
        }
    }
    return queryParam ? queryParam : null;
}


export function errorarray(data:any) {
    var aa = [];
    for (const [key, value] of Object.entries(data)){
        if(Array.isArray(value)){
            if(value.length){
                aa.push(value[0]); 
            }
        }
    }
    return aa
}

export function commonFormateDate(date:string,formate?:string){
    if(formate){
      return moment(new Date(date)).format(formate).toLocaleString()
    }else{
      return moment(date).format('DD MMM YYYY')
    }
}

// // pick first alphabet of each word of name
export function pickFirstAlphabetOfEachWord(name:string){
  const words=name.split(" ")
  const initials=words.map(word=>word.charAt(0))
  return initials.join('');
}

//for page redirection to profile
 export function redirectPage(id:string|undefined){
  if(id){
    // const url=RoutePath.manage_users+'/'+RoutePath.manage_members+'/'+RoutePath.profile+'/'+id
    // window.open(url, '_blank');
  }
 }




