import { Routes } from '@angular/router';
import { RoutePath } from '../router.config';
import { AuthGuard } from '../../guards/auth.guard';

export const USER_DATA_LAYOUT_ROUTE: Routes = [
  {
    path: RoutePath.user,
    // canActivate: [AuthGuard],
    data: { pageId: ['user'], type: ['child'] },
    loadChildren: () =>
      import('../../../pages/modules/user/user.module').then(
        (m) => m.UserModule
      ),
  },
];
