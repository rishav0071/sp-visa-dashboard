import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModalModule } from '../dialog-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { InstructionModule } from '../../components/instruction/instruction.module';
import { ButtonLoaderModule } from '../../components/button-loader/button-loader.module';
import { NgxEditorModule } from 'ngx-editor';
import { UserModalComponent } from './user-modal/user-modal.component';

const COMPONENT = [UserModalComponent];

const MODULES = [DialogModalModule, DirectivesModule, NgxEditorModule];

@NgModule({
  declarations: [...COMPONENT],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    InstructionModule,
    ButtonLoaderModule,
    ...MODULES,
  ],
  schemas: [
    NO_ERRORS_SCHEMA, // Add NO_ERRORS_SCHEMA here
  ],
  exports: [...COMPONENT, ...MODULES],
})
export class MasterDataModule {}
