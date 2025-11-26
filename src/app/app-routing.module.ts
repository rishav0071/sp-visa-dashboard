import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoutePath } from './core/config';
import { LayoutComponent } from './pages/main-layout/layout/layout.component';
import { permissionGuard } from './core/guards/perminsion.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundGuard } from './core/guards/not-found.guard';
import { MASTER_DATA_LAYOUT_ROUTE } from './core/config/routes/master-data-route';
import { USER_DATA_LAYOUT_ROUTE } from './core/config/routes/user.route';
const routes: Routes = [
  {
    path: RoutePath.Empty,
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: RoutePath.user,
    component: LayoutComponent,
    children: USER_DATA_LAYOUT_ROUTE,
    // canActivate: [AuthGuard],
    data: { pageId: ['user'], type: ['parent'] },
  },
  {
    path: RoutePath.master_data,
    component: LayoutComponent,
    children: MASTER_DATA_LAYOUT_ROUTE,
    // canActivate: [AuthGuard],
    data: { pageId: ['master-data'], type: ['parent'] },
  },
  {
    path: RoutePath.unauthorised,
    loadChildren: () =>
      import('./pages/unauthorized/unauthorized.module').then(
        (m) => m.UnauthorizedModule
      ),
  },
  {
    path: RoutePath.pageNot_found,
    loadChildren: () =>
      import('./pages/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: '**',
    redirectTo: RoutePath.pageNot_found,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
