import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-model-layout',
  template:`
  <div class="modal-layout">
      <app-model-layout-header (closemodellayout)="closemodel($event)"></app-model-layout-header>
      <div class="modal-body"><ng-container *ngComponentOutlet="data.component"></ng-container></div>
  </div>`,
  styles: ['']
})
export class ModelLayoutComponent implements OnInit {
  myContent: any;
  constructor(public dialogRef: MatDialogRef<ModelLayoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.myContent = {name:'nope'};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closemodel(data:boolean){
    if(data){
      this.onNoClick();
    }
  }

  submit(){
    this.dialogRef.updateSize('80%');
  }

  getdatadetails(data:any){
    if(data){
      this.onNoClick();
    }
  }

}
