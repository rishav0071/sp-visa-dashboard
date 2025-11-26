import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModelLayoutComponent } from './model-layout/model-layout.component';
import { ModelLayoutHeaderComponent } from './model-layout/model-layout-header.component';
import { DirectivesModule } from '../directives/directives.module';
import { ButtonLoaderModule } from '../components/button-loader/button-loader.module';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    ModelLayoutComponent,
    ModelLayoutHeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    ButtonLoaderModule,
    NgSelectModule
  ],
  exports: [
    ModelLayoutComponent,
    ModelLayoutHeaderComponent,
  ]
})
export class DialogModalModule { }
