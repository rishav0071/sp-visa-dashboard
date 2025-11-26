import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { EmployeeNamePipe } from './employee-name.pipe';
import { FormatTextPipe } from './format-text.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { SearchNamePipe } from './search-name.pipe';

const PIPE = [
  // EmployeeNamePipe,
  FormatTextPipe,
  ShortNamePipe,
  SearchNamePipe
]

@NgModule({
  declarations: [
    ...PIPE,
    ],
  imports: [
    CommonModule
  ],
  exports: [
    ...PIPE
  ]
})
export class PipesModule { }
