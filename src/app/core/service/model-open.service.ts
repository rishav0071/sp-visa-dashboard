import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ModelLayoutComponent } from '../shared/dialog-modal/model-layout/model-layout.component';

@Injectable({
  providedIn: 'root'
})
export class ModelOpenService {
  public dataModelClose$:Subject<any> = new Subject();

  constructor(public dialog: MatDialog,
    ) { }

    openModel(modelName:any,outClosed:boolean | undefined = undefined){
      if(this.dialog.openDialogs && this.dialog.openDialogs.length > 0){
        return;
      }
      let dialogRef = this.dialog.open(ModelLayoutComponent, modelName);
      if(outClosed == undefined){
        dialogRef.disableClose = true;
      }else{
        dialogRef.disableClose = false;
      }
      dialogRef.afterClosed().subscribe(result => {
        if(result && result.status){
          this.closemodelback(result);
        }
      });
    }

    closemodelback(res:any){
      this.dataModelClose$.next(res);
    }
}
