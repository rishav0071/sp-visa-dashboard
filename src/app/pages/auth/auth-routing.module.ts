import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePath } from 'src/app/core/config';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: RoutePath.Empty, component: AuthLayoutComponent,
    children: [
      { path: RoutePath.login, component: WelcomeComponent },
      {
        path: RoutePath.Empty,
        redirectTo: RoutePath.login,
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
