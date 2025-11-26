import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MaterialCommanModule } from 'src/app/core/shared/Material/material-comman.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/core/shared/directives/directives.module';


const COMPONENTS = [
  WelcomeComponent,
  AuthLayoutComponent
]

@NgModule({
  declarations: [
  ...COMPONENTS
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialCommanModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class AuthModule { }
