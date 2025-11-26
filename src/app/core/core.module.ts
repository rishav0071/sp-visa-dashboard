import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from './shared/components/shared-component.module';

const MODULES =[
  SharedComponentModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES,
  ],
  exports:[
    ...MODULES
  ]
})
export class CoreModule { }
