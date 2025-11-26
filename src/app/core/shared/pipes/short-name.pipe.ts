import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shortName"
})
export class ShortNamePipe implements PipeTransform {
  transform(fullName: string | undefined): any {
    if(fullName){
        return fullName
        .split(" ")
        .map(n => n[0])
        .join("").toUpperCase();
    }else{
        return fullName
    }
    }
   
}
