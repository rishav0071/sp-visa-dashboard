import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutePath } from '../config';
import { isLoggedIn } from '../shared/@subject/subjects';
import { changedRouting } from '../shared/function/changedRouting';

@Injectable({
  providedIn: 'root'
})
export class permissionGuard implements CanActivate {
  constructor(
    private router:Router,
    private changedrouting:changedRouting
    ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | any {
      const tokenchecked:boolean = isLoggedIn();
      if(!tokenchecked){
        // return false
      }else{
        // return true
        // this.router.navigate([RoutePath.main + '/' + RoutePath.dashboard])
      }
      // return true
  }
  
}
