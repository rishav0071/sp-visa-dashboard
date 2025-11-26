import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningComponent } from './warning/warning.component';
import { DialogModalModule } from '../dialog-modal.module';

const MODULES = [
  DialogModalModule,
]

@NgModule({
  declarations: [
    WarningComponent
  ],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports:[...MODULES,WarningComponent]
})
export class WarningModule { }
