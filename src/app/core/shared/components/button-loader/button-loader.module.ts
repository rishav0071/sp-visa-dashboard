import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietrecipieComponent } from './button-loader.component';

@NgModule({
  declarations: [DietrecipieComponent],
  imports: [
    CommonModule
  ],
  exports:[
    DietrecipieComponent
  ]
})
export class ButtonLoaderModule { }
