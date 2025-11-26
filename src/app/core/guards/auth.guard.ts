import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RoutePath } from '../config';
import { PermissionService } from '../shared/function/permissionHandler';
import { AuthService } from '../service/auth.service';
import { LocalstorageService } from '../service/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private _authService: AuthService,
    private _localstorageService: LocalstorageService
  ) {

  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const tokenchecked: boolean = this._authService.loggedIn();
    if (!tokenchecked) {
      this.router.navigate([RoutePath.Empty]);
      return false
    } else {
      // return true
      // this.router.navigate([RoutePath.dashboard])
      const currentPageId = route.data['pageId'];
      const currentPageType = route.data['type'];

      const permissionList = await await this.permissionService.getData();
      // console.log("currentPageId is", currentPageId);
      // console.log("currentPageType is", currentPageType);
      // console.log("permissionList is", permissionList);
      // console.log("current permission", permissionList[currentPageId]);
      if (!permissionList[currentPageId]) {
        return true;
      }

      if (permissionList[currentPageId] && permissionList[currentPageId].permission) {
        return true
      } else {
        // console.log("unauthorised route");
        this.router.navigate(['/unauthorised']);
        return false
      }
    }
  }

}
