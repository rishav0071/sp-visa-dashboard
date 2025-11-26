import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaInsComponent } from './textarea-ins/textarea-ins.component';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [TextareaInsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule
  ],
  exports:[TextareaInsComponent,MatTooltipModule]
})
export class InstructionModule { }
