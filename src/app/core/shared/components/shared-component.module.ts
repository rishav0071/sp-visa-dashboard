import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';

import { SerchfilterComponent } from './serchfilter/serchfilter.component';
import { PaginationModule } from './pagination/pagination.module';

const COMONENTS = [
  SerchfilterComponent,
]

const MODULES = [
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  DirectivesModule,
  PipesModule,
  PaginationModule
]

@NgModule({
  declarations: [
    ...COMONENTS
  ],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...COMONENTS
  ]
})
export class SharedComponentModule { }
