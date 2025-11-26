import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user-component/user.component';
import { RoutePath } from 'src/app/core/config';

const routes: Routes = [
  {
    path: RoutePath.Empty,
    component: UserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
