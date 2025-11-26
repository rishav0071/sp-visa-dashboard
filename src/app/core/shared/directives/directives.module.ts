import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { NoLeadingSpaceDirective } from './no-leading-space.directive';
import { EmailLowerCaseDirective } from './email-lower-case.directive';
import { NoSpecialCharactersDirective } from './no-special-characters.directive';

const COMPONENTS = [
  NumbersOnlyDirective,
  NoLeadingSpaceDirective,
  EmailLowerCaseDirective,
  NoSpecialCharactersDirective
]
@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class DirectivesModule { }
