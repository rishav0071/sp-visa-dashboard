import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media/media.component';
import { NgImageSliderModule } from 'ng-image-slider';



@NgModule({
  declarations: [
    MediaComponent
  ],
  imports: [
    CommonModule,
    NgImageSliderModule
  ],
  exports:[
    MediaComponent
  ]
})
export class MediaSliderModule { }
