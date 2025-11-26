import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePath } from 'src/app/core/config';
import { PageNotComponent } from './page-not/page-not.component';

const routes: Routes = [
 {path:RoutePath.Empty,component:PageNotComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
