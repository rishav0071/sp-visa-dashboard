import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModalModule } from '../dialog-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from "@ng-select/ng-select";
import { DirectivesModule } from '../../directives/directives.module';
import { InstructionModule } from '../../components/instruction/instruction.module';

import { ButtonLoaderModule } from '../../components/button-loader/button-loader.module';

// const COMPONENT = [
// ]

const MODULES = [
  DialogModalModule,
  DirectivesModule,
  FormsModule,
  ReactiveFormsModule,
  NgSelectModule,
  InstructionModule,
  ButtonLoaderModule
]

@NgModule({
  declarations: [
  //  ...COMPONENT,
  ],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports:[
    // ...COMPONENT,
    ...MODULES
  ]
})
export class MasterDataDialogModule {}
