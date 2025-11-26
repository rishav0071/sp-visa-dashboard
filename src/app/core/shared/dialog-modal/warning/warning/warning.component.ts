import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CONSTANTS_TEXT } from 'src/app/core/const/app.constant';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<WarningComponent>,) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('480px');
  }

  close(){
    this.dialogRef.close();
  }

  yes(){
    if(this.data?.confirm?.id){
      if(this.data?.confirm?.data){
        this.dialogRef.close({status:true,type:this.data.confirm.type,id:this.data.confirm.id,data:this.data?.confirm?.data})
      }else{
        this.dialogRef.close({status:true,type:this.data.confirm.type,id:this.data.confirm.id})
      }
    }else{
      if(this.data?.confirm?.data){
        this.dialogRef.close({status:true,type:this.data.confirm.type,data:this.data?.confirm?.data})
      }else{
      this.dialogRef.close({status:true,type:this.data.confirm.type})
      }
    }
  }

}
